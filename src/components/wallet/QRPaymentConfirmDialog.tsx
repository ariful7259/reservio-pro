import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  CheckCircle, 
  AlertCircle, 
  User, 
  Wallet,
  Loader2,
  ShieldCheck
} from 'lucide-react';

interface QRPaymentData {
  type: string;
  amount?: number;
  user_id?: string;
  name?: string;
  phone?: string;
  description?: string;
  data?: string;
}

interface QRPaymentConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentData: QRPaymentData | null;
  currentBalance: number;
  onSuccess: () => void;
}

export const QRPaymentConfirmDialog: React.FC<QRPaymentConfirmDialogProps> = ({
  open,
  onOpenChange,
  paymentData,
  currentBalance,
  onSuccess
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  if (!paymentData) return null;

  const amount = paymentData.amount || 0;
  const hasInsufficientBalance = amount > currentBalance;
  const recipientName = paymentData.name || 'অজানা';
  const description = paymentData.description || 'QR পেমেন্ট';

  const handleConfirmPayment = async () => {
    if (hasInsufficientBalance) {
      toast({
        title: 'অপর্যাপ্ত ব্যালেন্স',
        description: 'আপনার ওয়ালেটে পর্যাপ্ত টাকা নেই',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      // Use the atomic wallet debit function
      const { data, error } = await supabase.rpc('process_wallet_debit', {
        p_amount: amount,
        p_transaction_type: 'send',
        p_description: `QR পেমেন্ট - ${description}`,
        p_metadata: {
          recipient_id: paymentData.user_id,
          recipient_name: recipientName,
          qr_payment: true
        }
      });

      if (error) throw error;

      // If recipient has a wallet, credit their account
      if (paymentData.user_id) {
        const { data: recipientWallet } = await supabase
          .from('wallets')
          .select('id, balance')
          .eq('user_id', paymentData.user_id)
          .maybeSingle();

        if (recipientWallet) {
          // Update recipient balance
          await supabase
            .from('wallets')
            .update({ balance: recipientWallet.balance + amount })
            .eq('id', recipientWallet.id);

          // Create receive transaction for recipient
          await supabase
            .from('wallet_transactions')
            .insert({
              wallet_id: recipientWallet.id,
              amount: amount,
              transaction_type: 'receive',
              description: `QR পেমেন্ট গ্রহণ`,
              status: 'completed',
              payment_method: 'qr_code',
              metadata: { qr_payment: true }
            });
        }
      }

      toast({
        title: 'পেমেন্ট সফল!',
        description: `৳${amount.toLocaleString()} ${recipientName} কে পাঠানো হয়েছে`
      });

      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'পেমেন্ট ব্যর্থ',
        description: error.message || 'পেমেন্ট করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <ShieldCheck className="h-5 w-5 text-primary" />
            পেমেন্ট নিশ্চিত করুন
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Amount Display */}
          <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">পেমেন্টের পরিমাণ</p>
            <p className="text-4xl font-bold text-primary">৳{amount.toLocaleString()}</p>
          </div>

          {/* Recipient Info */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">প্রাপক</p>
                <p className="font-medium">{recipientName}</p>
                {paymentData.phone && (
                  <p className="text-xs text-muted-foreground">{paymentData.phone}</p>
                )}
              </div>
            </div>

            {description && (
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">বিবরণ</p>
                <p className="text-sm">{description}</p>
              </div>
            )}
          </div>

          {/* Balance Info */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">বর্তমান ব্যালেন্স</span>
            </div>
            <span className="font-medium">৳{currentBalance.toLocaleString()}</span>
          </div>

          {/* Insufficient Balance Warning */}
          {hasInsufficientBalance && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">অপর্যাপ্ত ব্যালেন্স! আরো ৳{(amount - currentBalance).toLocaleString()} প্রয়োজন</span>
            </div>
          )}

          {/* After Payment Balance */}
          {!hasInsufficientBalance && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-green-700">পেমেন্টের পর ব্যালেন্স</span>
              <span className="font-medium text-green-700">৳{(currentBalance - amount).toLocaleString()}</span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            বাতিল
          </Button>
          <Button
            onClick={handleConfirmPayment}
            disabled={loading || hasInsufficientBalance}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                প্রসেসিং...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                পেমেন্ট করুন
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRPaymentConfirmDialog;
