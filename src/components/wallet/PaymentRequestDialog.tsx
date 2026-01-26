import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import QRCode from 'react-qr-code';
import { 
  QrCode, 
  Link2, 
  Copy, 
  Share2, 
  Check,
  Loader2,
  BanknoteIcon,
  Clock,
  AlertCircle
} from 'lucide-react';
import { format, addHours, addDays, addMinutes } from 'date-fns';
import { bn } from 'date-fns/locale';

interface PaymentRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ExpiryOption = '15m' | '1h' | '24h' | '7d';

export const PaymentRequestDialog: React.FC<PaymentRequestDialogProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expiryOption, setExpiryOption] = useState<ExpiryOption>('24h');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [qrData, setQrData] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      loadUserInfo();
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setExpiryOption('24h');
    setGenerated(false);
    setQrData('');
    setPaymentLink('');
    setCopied(false);
    setExpiresAt(null);
    setRequestId(null);
  };

  const loadUserInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, phone')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUserName(profile.full_name || 'User');
        setUserPhone(profile.phone || '');
      }
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const getExpiryDate = (option: ExpiryOption): Date => {
    const now = new Date();
    switch (option) {
      case '15m':
        return addMinutes(now, 15);
      case '1h':
        return addHours(now, 1);
      case '24h':
        return addHours(now, 24);
      case '7d':
        return addDays(now, 7);
      default:
        return addHours(now, 24);
    }
  };

  const getExpiryLabel = (option: ExpiryOption): string => {
    switch (option) {
      case '15m':
        return '১৫ মিনিট';
      case '1h':
        return '১ ঘণ্টা';
      case '24h':
        return '২৪ ঘণ্টা';
      case '7d':
        return '৭ দিন';
      default:
        return '২৪ ঘণ্টা';
    }
  };

  const handleGenerate = async () => {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      toast({
        title: 'ত্রুটি',
        description: 'সঠিক পরিমাণ লিখুন',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: 'লগইন করুন',
          description: 'পেমেন্ট রিকোয়েস্ট করতে লগইন করুন',
          variant: 'destructive'
        });
        return;
      }

      const expiry = getExpiryDate(expiryOption);
      setExpiresAt(expiry);

      // Create QR data with request ID
      const tempId = crypto.randomUUID();
      const paymentData = {
        type: 'payment_request',
        request_id: tempId,
        user_id: user.id,
        name: userName,
        phone: userPhone,
        amount: amountNum,
        description: description || 'Payment Request',
        expires_at: expiry.toISOString(),
        timestamp: new Date().toISOString()
      };

      const qrPayload = JSON.stringify(paymentData);

      // Save to database
      const { data: savedRequest, error: saveError } = await supabase
        .from('qr_payment_requests')
        .insert({
          id: tempId,
          user_id: user.id,
          amount: amountNum,
          description: description || 'Payment Request',
          qr_code_data: qrPayload,
          expires_at: expiry.toISOString(),
          status: 'active'
        })
        .select()
        .single();

      if (saveError) throw saveError;

      setRequestId(savedRequest.id);
      setQrData(qrPayload);

      // Create payment link (encoded data in URL)
      const encodedData = btoa(qrPayload);
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/wallet?pay=${encodedData}`;
      setPaymentLink(link);

      setGenerated(true);

      toast({
        title: 'সফল!',
        description: 'পেমেন্ট রিকোয়েস্ট তৈরি হয়েছে'
      });
    } catch (error) {
      console.error('Error generating payment request:', error);
      toast({
        title: 'ত্রুটি',
        description: 'পেমেন্ট রিকোয়েস্ট তৈরি করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: 'কপি হয়েছে!',
        description: 'লিংক ক্লিপবোর্ডে কপি হয়েছে'
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'কপি করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'পেমেন্ট রিকোয়েস্ট',
          text: `৳${amount} পেমেন্ট করুন - ${description || 'Payment Request'}`,
          url: paymentLink
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(paymentLink);
        }
      }
    } else {
      copyToClipboard(paymentLink);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BanknoteIcon className="h-5 w-5 text-primary" />
            পেমেন্ট রিকোয়েস্ট
          </DialogTitle>
        </DialogHeader>

        {!generated ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">পরিমাণ (৳)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl font-bold text-center h-14"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">বিবরণ (ঐচ্ছিক)</Label>
              <Textarea
                id="description"
                placeholder="পেমেন্টের কারণ লিখুন..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            {/* Expiry Time Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                মেয়াদ শেষ হবে
              </Label>
              <Select value={expiryOption} onValueChange={(val) => setExpiryOption(val as ExpiryOption)}>
                <SelectTrigger>
                  <SelectValue placeholder="মেয়াদ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">১৫ মিনিট</SelectItem>
                  <SelectItem value="1h">১ ঘণ্টা</SelectItem>
                  <SelectItem value="24h">২৪ ঘণ্টা</SelectItem>
                  <SelectItem value="7d">৭ দিন</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[100, 500, 1000, 5000].map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className="text-xs"
                >
                  ৳{amt}
                </Button>
              ))}
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading || !amount}
              className="w-full gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  তৈরি হচ্ছে...
                </>
              ) : (
                <>
                  <QrCode className="h-4 w-4" />
                  QR ও লিংক তৈরি করুন
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Amount Display */}
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl">
              <p className="text-sm text-muted-foreground">রিকোয়েস্ট পরিমাণ</p>
              <p className="text-3xl font-bold text-primary">৳{parseFloat(amount).toLocaleString()}</p>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>

            {/* Expiry Info */}
            {expiresAt && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <div className="flex-1">
                  <p className="text-xs text-amber-700 dark:text-amber-400">মেয়াদ শেষ হবে</p>
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    {format(expiresAt, 'dd MMMM yyyy, hh:mm a', { locale: bn })}
                  </p>
                </div>
              </div>
            )}

            <Tabs defaultValue="qr" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qr" className="gap-2">
                  <QrCode className="h-4 w-4" />
                  QR কোড
                </TabsTrigger>
                <TabsTrigger value="link" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  লিংক
                </TabsTrigger>
              </TabsList>

              <TabsContent value="qr" className="mt-4">
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <QRCode
                      value={qrData}
                      size={180}
                      level="H"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 text-center">
                    এই QR কোড স্ক্যান করে ৳{parseFloat(amount).toLocaleString()} পেমেন্ট করতে পারবে
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="link" className="mt-4">
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">পেমেন্ট লিংক</p>
                    <p className="text-sm break-all font-mono">{paymentLink.substring(0, 50)}...</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(paymentLink)}
                      className="gap-2"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      কপি করুন
                    </Button>
                    <Button
                      onClick={shareLink}
                      className="gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      শেয়ার করুন
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              variant="outline"
              onClick={resetForm}
              className="w-full"
            >
              নতুন রিকোয়েস্ট করুন
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentRequestDialog;
