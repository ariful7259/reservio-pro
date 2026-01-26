import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Link2, Loader2, Copy, Share2, CheckCircle } from 'lucide-react';
import QRCode from 'react-qr-code';
import { addMinutes, addHours, addDays, format } from 'date-fns';
import { bn } from 'date-fns/locale';

type ExpiryOption = '15m' | '1h' | '24h' | '7d';

interface SendByLinkTabProps {
  currentBalance: number;
}

export const SendByLinkTab: React.FC<SendByLinkTabProps> = ({
  currentBalance
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: ''
  });
  const [expiryOption, setExpiryOption] = useState<ExpiryOption>('24h');
  const [generatedLink, setGeneratedLink] = useState('');
  const [qrData, setQrData] = useState('');
  const [requestId, setRequestId] = useState('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);

  const getExpiryDate = (option: ExpiryOption): Date => {
    const now = new Date();
    switch (option) {
      case '15m': return addMinutes(now, 15);
      case '1h': return addHours(now, 1);
      case '24h': return addHours(now, 24);
      case '7d': return addDays(now, 7);
      default: return addHours(now, 24);
    }
  };

  const getExpiryLabel = (option: ExpiryOption): string => {
    switch (option) {
      case '15m': return '১৫ মিনিট';
      case '1h': return '১ ঘণ্টা';
      case '24h': return '২৪ ঘণ্টা';
      case '7d': return '৭ দিন';
      default: return '২৪ ঘণ্টা';
    }
  };

  const handleGenerate = async () => {
    const amount = parseFloat(formData.amount);
    
    if (!amount || amount <= 0) {
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

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not found');

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      const expiry = getExpiryDate(expiryOption);
      setExpiresAt(expiry);

      const tempId = crypto.randomUUID();

      const paymentData = {
        type: 'send_payment',
        request_id: tempId,
        sender_id: user.id,
        sender_name: profile?.full_name || 'User',
        amount: amount,
        description: formData.description || 'Payment Link',
        expires_at: expiry.toISOString()
      };

      const qrPayload = JSON.stringify(paymentData);

      // Save to database
      const { data: savedRequest, error: saveError } = await supabase
        .from('send_payment_requests')
        .insert({
          id: tempId,
          sender_id: user.id,
          amount: amount,
          description: formData.description || 'Payment Link',
          qr_code_data: qrPayload,
          expires_at: expiry.toISOString(),
          status: 'active'
        })
        .select()
        .single();

      if (saveError) throw saveError;

      setRequestId(savedRequest.id);
      setQrData(qrPayload);

      // Generate link
      const encodedData = btoa(qrPayload);
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/wallet?claim=${encodedData}`;
      setGeneratedLink(link);

      toast({
        title: 'সফল!',
        description: 'পেমেন্ট লিংক তৈরি হয়েছে'
      });
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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({
      title: 'কপি হয়েছে',
      description: 'লিংক ক্লিপবোর্ডে কপি হয়েছে'
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'পেমেন্ট লিংক',
          text: `৳${formData.amount} টাকা নিন`,
          url: generatedLink
        });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const handleReset = () => {
    setGeneratedLink('');
    setQrData('');
    setRequestId('');
    setExpiresAt(null);
    setFormData({ amount: '', description: '' });
  };

  if (generatedLink) {
    return (
      <div className="p-4 space-y-4">
        <div className="text-center space-y-2">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="font-semibold text-lg">পেমেন্ট লিংক তৈরি হয়েছে!</h3>
          <p className="text-2xl font-bold text-primary">৳{parseFloat(formData.amount).toLocaleString()}</p>
          {expiresAt && (
            <p className="text-sm text-muted-foreground">
              মেয়াদ: {format(expiresAt, 'dd MMM yyyy, hh:mm a', { locale: bn })}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <div className="bg-card p-4 rounded-xl shadow-lg border">
            <QRCode value={qrData} size={180} level="H" />
          </div>
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">পেমেন্ট লিংক:</p>
          <p className="text-sm break-all font-mono">{generatedLink.substring(0, 60)}...</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={handleCopy} className="w-full">
            {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
            {copied ? 'কপি হয়েছে' : 'কপি করুন'}
          </Button>
          <Button onClick={handleShare} className="w-full">
            <Share2 className="h-4 w-4 mr-2" />
            শেয়ার করুন
          </Button>
        </div>

        <Button variant="ghost" onClick={handleReset} className="w-full">
          নতুন লিংক তৈরি করুন
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="linkAmount">পরিমাণ (৳)</Label>
        <Input
          id="linkAmount"
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
        <Label htmlFor="linkDescription">বিবরণ (ঐচ্ছিক)</Label>
        <Textarea
          id="linkDescription"
          placeholder="উদাহরণ: পণ্য কেনা, সার্ভিস পেমেন্ট"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={2}
        />
      </div>
      <div>
        <Label>লিংকের মেয়াদ</Label>
        <Select value={expiryOption} onValueChange={(v) => setExpiryOption(v as ExpiryOption)}>
          <SelectTrigger>
            <SelectValue placeholder="মেয়াদ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15m">{getExpiryLabel('15m')}</SelectItem>
            <SelectItem value="1h">{getExpiryLabel('1h')}</SelectItem>
            <SelectItem value="24h">{getExpiryLabel('24h')}</SelectItem>
            <SelectItem value="7d">{getExpiryLabel('7d')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleGenerate} className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            তৈরি হচ্ছে...
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4 mr-2" />
            লিংক তৈরি করুন
          </>
        )}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        ⚠️ যিনি এই লিংক খুলবেন তিনি টাকা নিতে পারবেন। লিংক শেয়ার করার আগে নিশ্চিত হোন।
      </p>
    </div>
  );
};
