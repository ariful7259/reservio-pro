import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Loader2 } from 'lucide-react';

interface SendByPhoneTabProps {
  currentBalance: number;
  onSuccess: () => void;
  onClose: () => void;
}

export const SendByPhoneTab: React.FC<SendByPhoneTabProps> = ({
  currentBalance,
  onSuccess,
  onClose
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientPhone: '',
    amount: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const amount = parseFloat(formData.amount);
      
      if (amount <= 0) {
        toast({
          title: 'ত্রুটি',
          description: 'সঠিক পরিমাণ লিখুন',
          variant: 'destructive'
        });
        return;
      }

      if (amount > currentBalance) {
        toast({
          title: 'অপর্যাপ্ত ব্যালেন্স',
          description: 'আপনার ওয়ালেটে যথেষ্ট টাকা নেই',
          variant: 'destructive'
        });
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      // Find recipient by phone
      const { data: recipientProfile, error: recipientError } = await supabase
        .from('profiles')
        .select('id, full_name, phone')
        .eq('phone', formData.recipientPhone)
        .single();

      if (recipientError || !recipientProfile) {
        toast({
          title: 'ত্রুটি',
          description: 'প্রাপক খুঁজে পাওয়া যায়নি। ফোন নম্বর যাচাই করুন',
          variant: 'destructive'
        });
        return;
      }

      if (recipientProfile.id === user.id) {
        toast({
          title: 'ত্রুটি',
          description: 'নিজেকে টাকা পাঠাতে পারবেন না',
          variant: 'destructive'
        });
        return;
      }

      // Get sender's wallet
      const { data: senderWallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', user.id)
        .single();

      if (!senderWallet) throw new Error('Wallet not found');

      // Get or create recipient's wallet
      let { data: recipientWallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', recipientProfile.id)
        .maybeSingle();

      if (!recipientWallet) {
        const { data: newWallet, error: walletError } = await supabase
          .from('wallets')
          .insert({ user_id: recipientProfile.id, balance: 0 })
          .select()
          .single();

        if (walletError) throw walletError;
        recipientWallet = newWallet;
      }

      // Create sender transaction
      const { error: senderTxError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: senderWallet.id,
          transaction_type: 'send',
          amount: amount,
          recipient_id: recipientProfile.id,
          description: formData.description || `${recipientProfile.full_name} কে টাকা পাঠানো হয়েছে`,
          payment_method: 'wallet',
          status: 'completed',
          metadata: { recipient_phone: formData.recipientPhone, recipient_name: recipientProfile.full_name }
        });

      if (senderTxError) throw senderTxError;

      // Create recipient transaction
      const { error: recipientTxError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: recipientWallet.id,
          transaction_type: 'receive',
          amount: amount,
          sender_id: user.id,
          description: formData.description || 'টাকা পেয়েছেন',
          payment_method: 'wallet',
          status: 'completed',
          metadata: { sender_phone: formData.recipientPhone }
        });

      if (recipientTxError) throw recipientTxError;

      // Update sender's wallet balance
      const { error: senderBalanceError } = await supabase
        .from('wallets')
        .update({ balance: senderWallet.balance - amount })
        .eq('id', senderWallet.id);

      if (senderBalanceError) throw senderBalanceError;

      // Update recipient's wallet balance
      const { error: recipientBalanceError } = await supabase
        .from('wallets')
        .update({ balance: recipientWallet.balance + amount })
        .eq('id', recipientWallet.id);

      if (recipientBalanceError) throw recipientBalanceError;

      toast({
        title: 'সফল!',
        description: `৳${amount} টাকা পাঠানো হয়েছে`
      });

      setFormData({ recipientPhone: '', amount: '', description: '' });
      onClose();
      onSuccess();
    } catch (error: any) {
      toast({
        title: 'ত্রুটি',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <Label htmlFor="recipientPhone">প্রাপকের ফোন নম্বর</Label>
        <Input
          id="recipientPhone"
          type="tel"
          placeholder="০১৭xxxxxxxx"
          value={formData.recipientPhone}
          onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">পরিমাণ (৳)</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          placeholder="০.০০"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />
        <p className="text-sm text-muted-foreground mt-1">
          বর্তমান ব্যালেন্স: ৳{currentBalance.toLocaleString()}
        </p>
      </div>
      <div>
        <Label htmlFor="description">বিবরণ (ঐচ্ছিক)</Label>
        <Textarea
          id="description"
          placeholder="উদাহরণ: পণ্য কেনা, সার্ভিস পেমেন্ট"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            প্রক্রিয়াধীন...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            টাকা পাঠান
          </>
        )}
      </Button>
    </form>
  );
};
