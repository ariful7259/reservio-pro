import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import QRCode from 'react-qr-code';
import { QrCode, Scan } from 'lucide-react';

interface QRPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: number;
  onSuccess: () => void;
}

export const QRPaymentDialog: React.FC<QRPaymentDialogProps> = ({
  open,
  onOpenChange,
  currentBalance,
  onSuccess
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [scanData, setScanData] = useState('');

  const handleGenerateQR = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const qrPayload = JSON.stringify({
        type: 'wallet_qr',
        user_id: user.id,
        timestamp: new Date().toISOString()
      });

      setQrCodeData(qrPayload);
    } catch (error: any) {
      toast({
        title: 'ত্রুটি',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleScanPayment = async () => {
    setLoading(true);
    try {
      if (!scanData) {
        toast({
          title: 'ত্রুটি',
          description: 'QR কোড ডেটা লিখুন',
          variant: 'destructive'
        });
        return;
      }

      const qrData = JSON.parse(scanData);

      if (qrData.type === 'payment_request') {
        const amount = parseFloat(qrData.amount);
        
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

        const { data: wallet } = await supabase
          .from('wallets')
          .select('id, balance')
          .eq('user_id', user.id)
          .single();

        if (!wallet) throw new Error('Wallet not found');

        // Create transaction
        await supabase
          .from('wallet_transactions')
          .insert({
            wallet_id: wallet.id,
            transaction_type: 'send',
            amount: amount,
            description: qrData.description || 'QR পেমেন্ট',
            payment_method: 'qr_code',
            status: 'completed',
            metadata: { qr_data: qrData }
          });

        // Update balance
        await supabase
          .from('wallets')
          .update({ balance: wallet.balance - amount })
          .eq('id', wallet.id);

        toast({
          title: 'সফল!',
          description: `৳${amount} টাকা পেমেন্ট সম্পন্ন হয়েছে`
        });

        setScanData('');
        onOpenChange(false);
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: 'ত্রুটি',
        description: 'QR কোড স্ক্যান করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR পেমেন্ট
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">QR তৈরি করুন</TabsTrigger>
            <TabsTrigger value="scan">স্ক্যান করুন</TabsTrigger>
          </TabsList>
          <TabsContent value="generate" className="space-y-4">
            {!qrCodeData ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  আপনার ওয়ালেট QR কোড তৈরি করুন যেন অন্যরা আপনাকে সহজে টাকা পাঠাতে পারে
                </p>
                <Button onClick={handleGenerateQR} className="w-full">
                  QR কোড তৈরি করুন
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg flex justify-center">
                  <QRCode value={qrCodeData} size={200} />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  এই QR কোড স্ক্যান করে আপনাকে টাকা পাঠানো যাবে
                </p>
                <Button
                  onClick={() => setQrCodeData('')}
                  variant="outline"
                  className="w-full"
                >
                  নতুন QR কোড
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="scan" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="qrScan">QR কোড ডেটা</Label>
                <Input
                  id="qrScan"
                  placeholder="QR কোড স্ক্যান করুন বা ডেটা পেস্ট করুন"
                  value={scanData}
                  onChange={(e) => setScanData(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  বর্তমান ব্যালেন্স: ৳{currentBalance.toLocaleString()}
                </p>
              </div>
              <Button onClick={handleScanPayment} className="w-full" disabled={loading}>
                <Scan className="h-4 w-4 mr-2" />
                {loading ? 'প্রক্রিয়াধীন...' : 'পেমেন্ট করুন'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};