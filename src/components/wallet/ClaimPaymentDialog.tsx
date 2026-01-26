import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Gift, Loader2, AlertTriangle, CheckCircle, User, Clock } from 'lucide-react';
import { format, isPast, parseISO } from 'date-fns';
import { bn } from 'date-fns/locale';
import { PaymentReceiptDialog } from './PaymentReceiptDialog';

interface ClaimPaymentData {
  type: string;
  request_id: string;
  sender_id: string;
  sender_name: string;
  amount: number;
  description?: string;
  expires_at: string;
}

interface ClaimPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claimData: ClaimPaymentData | null;
  onSuccess: () => void;
}

interface PaymentReceiptData {
  transactionId: string;
  amount: number;
  recipientName: string;
  recipientPhone?: string;
  description?: string;
  timestamp: Date;
  newBalance: number;
}

export const ClaimPaymentDialog: React.FC<ClaimPaymentDialogProps> = ({
  open,
  onOpenChange,
  claimData,
  onSuccess
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [requestValid, setRequestValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<PaymentReceiptData | null>(null);

  useEffect(() => {
    if (open && claimData) {
      checkRequest();
    }
  }, [open, claimData]);

  const checkRequest = async () => {
    if (!claimData) return;
    
    setChecking(true);
    setErrorMessage('');
    setRequestValid(false);

    try {
      // Check expiry
      if (isPast(parseISO(claimData.expires_at))) {
        setErrorMessage('এই পেমেন্ট লিংকের মেয়াদ শেষ হয়ে গেছে');
        return;
      }

      // Check if request exists and is active
      const { data: request, error } = await supabase
        .from('send_payment_requests')
        .select('*')
        .eq('id', claimData.request_id)
        .single();

      if (error || !request) {
        setErrorMessage('এই পেমেন্ট রিকোয়েস্ট পাওয়া যায়নি');
        return;
      }

      if (request.status !== 'active') {
        if (request.status === 'claimed') {
          setErrorMessage('এই টাকা ইতোমধ্যে অন্য কেউ নিয়ে গেছে');
        } else if (request.status === 'cancelled') {
          setErrorMessage('প্রেরক এই রিকোয়েস্ট বাতিল করেছেন');
        } else {
          setErrorMessage('এই পেমেন্ট রিকোয়েস্ট আর সক্রিয় নেই');
        }
        return;
      }

      // Check sender has sufficient balance
      const { data: senderWallet } = await supabase
        .from('wallets')
        .select('balance')
        .eq('user_id', claimData.sender_id)
        .single();

      if (!senderWallet || senderWallet.balance < claimData.amount) {
        setErrorMessage('প্রেরকের ওয়ালেটে যথেষ্ট ব্যালেন্স নেই');
        return;
      }

      setRequestValid(true);
    } catch (error) {
      console.error('Check error:', error);
      setErrorMessage('রিকোয়েস্ট যাচাই করতে সমস্যা হয়েছে');
    } finally {
      setChecking(false);
    }
  };

  const handleClaim = async () => {
    if (!claimData) return;
    
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'লগইন করুন',
          description: 'টাকা নিতে প্রথমে লগইন করুন',
          variant: 'destructive'
        });
        return;
      }

      // Prevent sender from claiming their own payment
      if (user.id === claimData.sender_id) {
        toast({
          title: 'ত্রুটি',
          description: 'আপনি নিজের পাঠানো টাকা নিতে পারবেন না',
          variant: 'destructive'
        });
        return;
      }

      // Get sender's wallet
      const { data: senderWallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', claimData.sender_id)
        .single();

      if (!senderWallet || senderWallet.balance < claimData.amount) {
        toast({
          title: 'ত্রুটি',
          description: 'প্রেরকের ওয়ালেটে যথেষ্ট ব্যালেন্স নেই',
          variant: 'destructive'
        });
        return;
      }

      // Get or create receiver's wallet
      let { data: receiverWallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!receiverWallet) {
        const { data: newWallet, error: walletError } = await supabase
          .from('wallets')
          .insert({ user_id: user.id, balance: 0 })
          .select()
          .single();

        if (walletError) throw walletError;
        receiverWallet = newWallet;
      }

      // Get receiver's profile
      const { data: receiverProfile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single();

      // Create sender transaction (debit)
      const { data: senderTx, error: senderTxError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: senderWallet.id,
          transaction_type: 'send',
          amount: claimData.amount,
          recipient_id: user.id,
          description: claimData.description || `${receiverProfile?.full_name || 'User'} টাকা নিয়েছেন (লিংক)`,
          payment_method: 'wallet',
          status: 'completed',
          metadata: { 
            claim_type: 'link',
            request_id: claimData.request_id,
            recipient_name: receiverProfile?.full_name
          }
        })
        .select()
        .single();

      if (senderTxError) throw senderTxError;

      // Create receiver transaction (credit)
      const { error: receiverTxError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: receiverWallet.id,
          transaction_type: 'receive',
          amount: claimData.amount,
          sender_id: claimData.sender_id,
          description: claimData.description || `${claimData.sender_name} থেকে টাকা পেয়েছেন (লিংক)`,
          payment_method: 'wallet',
          status: 'completed',
          metadata: { 
            claim_type: 'link',
            request_id: claimData.request_id,
            sender_name: claimData.sender_name
          }
        });

      if (receiverTxError) throw receiverTxError;

      // Update sender's wallet balance
      const { error: senderBalanceError } = await supabase
        .from('wallets')
        .update({ balance: senderWallet.balance - claimData.amount })
        .eq('id', senderWallet.id);

      if (senderBalanceError) throw senderBalanceError;

      // Update receiver's wallet balance
      const newBalance = receiverWallet.balance + claimData.amount;
      const { error: receiverBalanceError } = await supabase
        .from('wallets')
        .update({ balance: newBalance })
        .eq('id', receiverWallet.id);

      if (receiverBalanceError) throw receiverBalanceError;

      // Update request status
      await supabase
        .from('send_payment_requests')
        .update({
          status: 'claimed',
          claimed_by: user.id,
          claimed_at: new Date().toISOString()
        })
        .eq('id', claimData.request_id);

      // Set receipt data
      setReceiptData({
        transactionId: senderTx.id,
        amount: claimData.amount,
        recipientName: claimData.sender_name,
        description: claimData.description,
        timestamp: new Date(),
        newBalance: newBalance
      });

      toast({
        title: 'সফল!',
        description: `৳${claimData.amount.toLocaleString()} টাকা পেয়েছেন`
      });

      onOpenChange(false);
      setReceiptOpen(true);
      onSuccess();
    } catch (error: any) {
      console.error('Claim error:', error);
      toast({
        title: 'ত্রুটি',
        description: error.message || 'টাকা নিতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!claimData) return null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              টাকা নিন
            </DialogTitle>
          </DialogHeader>

          {checking ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">যাচাই করা হচ্ছে...</p>
            </div>
          ) : !requestValid ? (
            <div className="flex flex-col items-center py-6 space-y-4">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <p className="text-center text-muted-foreground">{errorMessage}</p>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                বন্ধ করুন
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <p className="text-3xl font-bold text-primary">
                  ৳{claimData.amount.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3 bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">প্রেরক</p>
                    <p className="font-medium">{claimData.sender_name}</p>
                  </div>
                </div>
                
                {claimData.description && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">বিবরণ</p>
                    <p className="text-sm">{claimData.description}</p>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2 border-t">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">মেয়াদ</p>
                    <p className="text-sm">
                      {format(parseISO(claimData.expires_at), 'dd MMM yyyy, hh:mm a', { locale: bn })}
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={handleClaim} className="w-full" disabled={loading} size="lg">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    প্রক্রিয়াধীন...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    টাকা নিন
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <PaymentReceiptDialog
        open={receiptOpen}
        onOpenChange={setReceiptOpen}
        receiptData={receiptData}
      />
    </>
  );
};
