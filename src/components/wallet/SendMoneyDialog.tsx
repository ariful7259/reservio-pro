import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';

interface SendMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: number;
  onSuccess: () => void;
}

export const SendMoneyDialog: React.FC<SendMoneyDialogProps> = ({
  open,
  onOpenChange,
  currentBalance,
  onSuccess
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

      // Get current user's wallet
      const { data: wallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', user.id)
        .single();

      if (!wallet) throw new Error('Wallet not found');

      // Create transaction
      const { error: txError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: wallet.id,
          transaction_type: 'send',
          amount: amount,
          description: formData.description || 'টাকা পাঠানো হয়েছে',
          payment_method: 'wallet',
          status: 'completed',
          metadata: { recipient_phone: formData.recipientPhone }
        });

      if (txError) throw txError;

      // Update wallet balance
      const { error: balanceError } = await supabase
        .from('wallets')
        .update({ balance: wallet.balance - amount })
        .eq('id', wallet.id);

      if (balanceError) throw balanceError;

      toast({
        title: 'সফল!',
        description: `৳${amount} টাকা পাঠানো হয়েছে`
      });

      setFormData({ recipientPhone: '', amount: '', description: '' });
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            টাকা পাঠান
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'প্রক্রিয়াধীন...' : 'টাকা পাঠান'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};