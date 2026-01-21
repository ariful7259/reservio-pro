import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface WalletPaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

interface PaymentMetadata {
  order_id?: string;
  order_type?: 'product' | 'service' | 'rental';
  item_name?: string;
  seller_id?: string;
  [key: string]: any;
}

export const useWalletPayment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [walletId, setWalletId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch wallet balance
  const fetchWalletBalance = useCallback(async () => {
    if (!user?.id) return 0;

    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // Create wallet if not exists
        if (error.code === 'PGRST116') {
          const { data: newWallet, error: createError } = await supabase
            .from('wallets')
            .insert({ user_id: user.id, balance: 0, currency: 'BDT' })
            .select()
            .single();

          if (!createError && newWallet) {
            setWalletId(newWallet.id);
            setWalletBalance(0);
            return 0;
          }
        }
        console.error('Error fetching wallet:', error);
        return 0;
      }

      setWalletId(data.id);
      setWalletBalance(Number(data.balance) || 0);
      return Number(data.balance) || 0;
    } catch (error) {
      console.error('Error in fetchWalletBalance:', error);
      return 0;
    }
  }, [user?.id]);

  useEffect(() => {
    fetchWalletBalance();
  }, [fetchWalletBalance]);

  // Check if user can pay from wallet
  const canPayFromWallet = useCallback((amount: number): boolean => {
    return walletBalance >= amount;
  }, [walletBalance]);

  // Get remaining amount after wallet payment
  const getRemainingAmount = useCallback((totalAmount: number): number => {
    return Math.max(0, totalAmount - walletBalance);
  }, [walletBalance]);

  // Process wallet payment
  const processWalletPayment = useCallback(async (
    amount: number,
    description: string,
    transactionType: string = 'payment',
    metadata: PaymentMetadata = {}
  ): Promise<WalletPaymentResult> => {
    if (!user?.id || !walletId) {
      return { success: false, error: 'ওয়ালেট তথ্য পাওয়া যায়নি' };
    }

    if (amount <= 0) {
      return { success: false, error: 'অবৈধ পরিমাণ' };
    }

    if (!canPayFromWallet(amount)) {
      return { success: false, error: 'ওয়ালেটে পর্যাপ্ত ব্যালেন্স নেই' };
    }

    setIsLoading(true);

    try {
      // Create transaction record
      const { data: transaction, error: txError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: walletId,
          amount: -amount,
          transaction_type: transactionType,
          description,
          sender_id: user.id,
          status: 'completed',
          payment_method: 'wallet',
          metadata: metadata as any
        })
        .select()
        .single();

      if (txError) throw txError;

      // Update wallet balance
      const { error: updateError } = await supabase
        .from('wallets')
        .update({ 
          balance: walletBalance - amount,
          updated_at: new Date().toISOString()
        })
        .eq('id', walletId);

      if (updateError) throw updateError;

      // Update local state
      setWalletBalance(prev => prev - amount);

      return { 
        success: true, 
        transactionId: transaction.id 
      };
    } catch (error: any) {
      console.error('Wallet payment error:', error);
      return { 
        success: false, 
        error: error.message || 'পেমেন্ট প্রক্রিয়াকরণে সমস্যা হয়েছে' 
      };
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, walletId, walletBalance, canPayFromWallet]);

  // Process partial wallet payment
  const processPartialWalletPayment = useCallback(async (
    walletAmount: number,
    description: string,
    transactionType: string = 'partial_payment',
    metadata: PaymentMetadata = {}
  ): Promise<WalletPaymentResult> => {
    const amountToDeduct = Math.min(walletAmount, walletBalance);
    
    if (amountToDeduct <= 0) {
      return { success: true, transactionId: undefined }; // No wallet payment needed
    }

    return processWalletPayment(amountToDeduct, description, transactionType, {
      ...metadata,
      is_partial: true,
      wallet_portion: amountToDeduct
    });
  }, [walletBalance, processWalletPayment]);

  // Refund to wallet
  const refundToWallet = useCallback(async (
    amount: number,
    orderId: string,
    description: string = 'অর্ডার রিফান্ড'
  ): Promise<WalletPaymentResult> => {
    if (!user?.id || !walletId) {
      return { success: false, error: 'ওয়ালেট তথ্য পাওয়া যায়নি' };
    }

    setIsLoading(true);

    try {
      // Create refund transaction
      const { data: transaction, error: txError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: walletId,
          amount: amount,
          transaction_type: 'refund',
          description,
          recipient_id: user.id,
          status: 'completed',
          payment_method: 'wallet',
          metadata: { order_id: orderId, refund: true } as any
        })
        .select()
        .single();

      if (txError) throw txError;

      // Update wallet balance
      const { error: updateError } = await supabase
        .from('wallets')
        .update({ 
          balance: walletBalance + amount,
          updated_at: new Date().toISOString()
        })
        .eq('id', walletId);

      if (updateError) throw updateError;

      setWalletBalance(prev => prev + amount);

      toast({
        title: "রিফান্ড সফল",
        description: `৳${amount.toLocaleString('bn-BD')} আপনার ওয়ালেটে যোগ হয়েছে`
      });

      return { success: true, transactionId: transaction.id };
    } catch (error: any) {
      console.error('Refund error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, walletId, walletBalance, toast]);

  // Format price helper
  const formatPrice = useCallback((price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  }, []);

  return {
    walletBalance,
    walletId,
    isLoading,
    canPayFromWallet,
    getRemainingAmount,
    processWalletPayment,
    processPartialWalletPayment,
    refundToWallet,
    refreshBalance: fetchWalletBalance,
    formatPrice
  };
};

export default useWalletPayment;
