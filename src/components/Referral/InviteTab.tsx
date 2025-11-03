import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Share2, Mail, MessageSquare, Check } from 'lucide-react';
import { useReferralData } from '@/hooks/useReferralData';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import QRCode from 'react-qr-code';

export const InviteTab = () => {
  const { referralData, loading } = useReferralData();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (referralData?.referralLink) {
      navigator.clipboard.writeText(referralData.referralLink);
      setCopied(true);
      toast({
        title: 'কপি হয়েছে!',
        description: 'রেফারেল লিংক ক্লিপবোর্ডে কপি করা হয়েছে',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (platform: string) => {
    const text = `আমার রেফারেল লিংক ব্যবহার করে যোগ দিন এবং বোনাস পান: ${referralData?.referralLink}`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      email: `mailto:?subject=আমার সাথে যোগ দিন&body=${encodeURIComponent(text)}`,
      sms: `sms:?body=${encodeURIComponent(text)}`,
    };

    if (platform in urls) {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-60 w-full" />
      </div>
    );
  }

  if (!referralData) return null;

  return (
    <div className="space-y-6">
      {/* Referral Link Section */}
      <Card>
        <CardHeader>
          <CardTitle>আপনার রেফারেল লিংক</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={referralData.referralLink}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={handleCopy} variant="outline" size="icon">
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => handleShare('whatsapp')}
              variant="outline"
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              onClick={() => handleShare('email')}
              variant="outline"
              className="gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              onClick={() => handleShare('sms')}
              variant="outline"
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              SMS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Section */}
      <Card>
        <CardHeader>
          <CardTitle>QR কোড</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCode value={referralData.referralLink} size={200} />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            এই QR কোডটি স্ক্যান করে আপনার বন্ধুরা সরাসরি সাইন আপ করতে পারবে
          </p>
        </CardContent>
      </Card>

      {/* Referral Code Section */}
      <Card>
        <CardHeader>
          <CardTitle>রেফারেল কোড</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground mb-1">আপনার কোড</p>
              <p className="text-2xl font-bold font-mono">{referralData.referralCode}</p>
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(referralData.referralCode);
                toast({
                  title: 'কপি হয়েছে!',
                  description: 'রেফারেল কোড কপি করা হয়েছে',
                });
              }}
              variant="outline"
              size="icon"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
