import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, CreditCard, Building, Smartphone } from 'lucide-react';

interface AddMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const paymentSources = [
  {
    type: 'mobile_banking',
    providers: ['বিকাশ', 'নগদ', 'রকেট', 'উপায়'],
    icon: <Smartphone className="h-4 w-4" />
  },
  {
    type: 'bank',
    providers: ['ব্র্যাক ব্যাংক', 'ডাচ-বাংলা ব্যাংক', 'ইসলামী ব্যাংক', 'সিটি ব্যাংক'],
    icon: <Building className="h-4 w-4" />
  },
  {
    type: 'card',
    providers: ['ডেবিট কার্ড', 'ক্রেডিট কার্ড', 'প্রিপেইড কার্ড'],
    icon: <CreditCard className="h-4 w-4" />
  }
];

export const AddMoneyDialog: React.FC<AddMoneyDialogProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sourceType, setSourceType] = useState('');
  const [provider, setProvider] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [savedSources, setSavedSources] = useState<any[]>([]);

  useEffect(() => {
    if (open) {
      loadSavedSources();
    }
  }, [open]);

  const loadSavedSources = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('payment_sources')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedSources(data || []);
    } catch (error) {
      console.error('Error loading payment sources:', error);
    }
  };

  const handleAddMoney = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addAmount = parseFloat(amount);
      
      if (addAmount <= 0) {
        toast({
          title: 'ত্রুটি',
          description: 'সঠিক পরিমাণ লিখুন',
          variant: 'destructive'
        });
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      // Get or create wallet
      let { data: wallet } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', user.id)
        .single();

      if (!wallet) {
        const { data: newWallet, error: walletError } = await supabase
          .from('wallets')
          .insert({ user_id: user.id, balance: 0 })
          .select()
          .single();

        if (walletError) throw walletError;
        wallet = newWallet;
      }

      // Create transaction
      const { error: txError } = await supabase
        .from('wallet_transactions')
        .insert({
          wallet_id: wallet.id,
          transaction_type: 'add_money',
          amount: addAmount,
          description: `${provider} থেকে টাকা যোগ করা হয়েছে`,
          payment_method: sourceType,
          status: 'completed',
          metadata: {
            source_type: sourceType,
            provider: provider,
            account_number: accountNumber
          }
        });

      if (txError) throw txError;

      // Update wallet balance
      const { error: balanceError } = await supabase
        .from('wallets')
        .update({ balance: wallet.balance + addAmount })
        .eq('id', wallet.id);

      if (balanceError) throw balanceError;

      toast({
        title: 'সফল!',
        description: `৳${addAmount} টাকা যোগ করা হয়েছে`
      });

      setAmount('');
      setAccountNumber('');
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

  const selectedSourceType = paymentSources.find(s => s.type === sourceType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            টাকা যোগ করুন
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddMoney} className="space-y-4">
          <div>
            <Label>পেমেন্ট সোর্স</Label>
            <Select value={sourceType} onValueChange={setSourceType}>
              <SelectTrigger>
                <SelectValue placeholder="সোর্স নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {paymentSources.map((source) => (
                  <SelectItem key={source.type} value={source.type}>
                    <div className="flex items-center gap-2">
                      {source.icon}
                      <span>
                        {source.type === 'mobile_banking' && 'মোবাইল ব্যাংকিং'}
                        {source.type === 'bank' && 'ব্যাংক'}
                        {source.type === 'card' && 'কার্ড'}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {sourceType && (
            <>
              <div>
                <Label>প্রোভাইডার</Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="প্রোভাইডার নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedSourceType?.providers.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountNumber">অ্যাকাউন্ট নম্বর</Label>
                <Input
                  id="accountNumber"
                  placeholder="আপনার অ্যাকাউন্ট নম্বর লিখুন"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="addAmount">পরিমাণ (৳)</Label>
                <Input
                  id="addAmount"
                  type="number"
                  step="0.01"
                  placeholder="০.০০"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'প্রক্রিয়াধীন...' : 'টাকা যোগ করুন'}
              </Button>
            </>
          )}

          {savedSources.length > 0 && (
            <div className="pt-4 border-t">
              <Label className="mb-2 block">সেভ করা সোর্স</Label>
              <div className="space-y-2">
                {savedSources.map((source) => (
                  <Button
                    key={source.id}
                    type="button"
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setSourceType(source.source_type);
                      setProvider(source.provider_name);
                      setAccountNumber(source.account_number || '');
                    }}
                  >
                    {source.provider_name} - {source.account_number}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};