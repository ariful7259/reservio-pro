import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import QRCode from 'react-qr-code';
import { ArrowDownToLine, Copy, Check } from 'lucide-react';

interface ReceiveMoneyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ReceiveMoneyDialog: React.FC<ReceiveMoneyDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [qrData, setQrData] = useState('');
  const [copied, setCopied] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    if (open) {
      loadUserInfo();
    }
  }, [open]);

  const loadUserInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // In a real app, you'd get this from user profile
        setUserPhone(user.email || user.id.substring(0, 11));
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const handleGenerateQR = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: 'ত্রুটি',
        description: 'সঠিক পরিমাণ লিখুন',
        variant: 'destructive'
      });
      return;
    }

    const qrPayload = JSON.stringify({
      type: 'payment_request',
      phone: userPhone,
      amount: parseFloat(amount),
      description: description || 'পেমেন্ট রিকোয়েস্ট',
      timestamp: new Date().toISOString()
    });

    setQrData(qrPayload);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userPhone);
    setCopied(true);
    toast({
      title: 'কপি হয়েছে!',
      description: 'আপনার পেমেন্ট আইডি কপি করা হয়েছে'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowDownToLine className="h-5 w-5" />
            টাকা নিন
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!qrData ? (
            <>
              <div>
                <Label htmlFor="receiveAmount">পরিমাণ (৳)</Label>
                <Input
                  id="receiveAmount"
                  type="number"
                  step="0.01"
                  placeholder="০.০০"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="receiveDescription">বিবরণ (ঐচ্ছিক)</Label>
                <Input
                  id="receiveDescription"
                  placeholder="উদাহরণ: পণ্য বিক্রয়"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button onClick={handleGenerateQR} className="w-full">
                QR কোড তৈরি করুন
              </Button>
            </>
          ) : (
            <>
              <div className="bg-white p-4 rounded-lg flex justify-center">
                <QRCode value={qrData} size={200} />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-lg">৳{parseFloat(amount).toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{description || 'পেমেন্ট রিকোয়েস্ট'}</p>
              </div>
              <div className="space-y-2">
                <Label>আপনার পেমেন্ট আইডি</Label>
                <div className="flex gap-2">
                  <Input value={userPhone} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => {
                  setQrData('');
                  setAmount('');
                  setDescription('');
                }}
                variant="outline"
                className="w-full"
              >
                নতুন রিকোয়েস্ট
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};