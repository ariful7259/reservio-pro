import React, { useState } from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy, Facebook, Twitter, Mail, Share2, CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useIsMobile } from '@/hooks/use-mobile';

const InviteTab = () => {
  const { referralData, loading, shareReferral } = useReferralData();
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: 'কপি করা হয়েছে!',
      description: 'রেফারেল লিঙ্ক কপি করা হয়েছে।',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-28" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!referralData) return null;

  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">ইনভাইট করুন এবং উপার্জন করুন</CardTitle>
          <CardDescription className="text-sm md:text-base">
            বন্ধুদের আমন্ত্রণ জানিয়ে প্রতি রেফারেলে {referralData.referralRate} টাকা উপার্জন করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              value={referralData.referralLink}
              readOnly
              className="flex-1 bg-secondary/10 animate-slide-in"
            />
            <Button 
              onClick={() => copyToClipboard(referralData.referralLink)}
              className="gap-2 transition-all duration-300 transform active:scale-95"
            >
              {copied ? <CheckCircle2 className="h-4 w-4 animate-scale-in" /> : <Copy className="h-4 w-4" />}
              {copied ? 'কপি করা হয়েছে!' : 'কপি করুন'}
            </Button>
          </div>

          <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { icon: <Facebook className="h-5 w-5" />, label: 'ফেসবুক', color: 'bg-[#3b5998]' },
              { icon: <Twitter className="h-5 w-5" />, label: 'টুইটার', color: 'bg-[#1DA1F2]' },
              { icon: <Share2 className="h-5 w-5" />, label: 'হোয়াটসঅ্যাপ', color: 'bg-[#25D366]' },
              { icon: <Mail className="h-5 w-5" />, label: 'ইমেইল', color: 'bg-[#EA4335]' }
            ].map((item, index) => (
              <Button 
                key={index}
                variant="outline"
                className={`${item.color} text-white hover:opacity-90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg animate-fade-in flex items-center justify-center gap-2 h-12`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.icon}
                {!isMobile && <span>{item.label}</span>}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">QR কোড</CardTitle>
          <CardDescription>রেফারেল লিঙ্ক শেয়ার করতে QR কোড স্ক্যান করুন</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center p-6">
          <div className="bg-white p-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
            <QRCode 
              value={referralData.referralLink}
              size={isMobile ? 150 : 200}
              level="H"
            />
          </div>
        </CardContent>
      </Card>

      {referralData.campaigns?.some(c => c.isActive) && (
        <Card className="border-2 border-dashed border-primary/50 bg-primary/5 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <CardHeader>
            <CardTitle className="text-primary">সক্রিয় ক্যাম্পেইন</CardTitle>
            <CardDescription>
              এই মুহূর্তে বিশেষ রেফারেল ক্যাম্পেইন চলছে! অতিরিক্ত বোনাস জিতুন।
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {referralData.campaigns
              .filter(campaign => campaign.isActive)
              .map(campaign => (
                <div 
                  key={campaign.id} 
                  className={`p-4 rounded-lg ${
                    campaign.isSpecial ? 'bg-amber-50 border border-amber-200' : 'bg-secondary/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {campaign.timeLeft}
                    </span>
                  </div>
                  <p className="text-sm mt-1 mb-2">{campaign.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span>অগ্রগতি: {campaign.currentReferrals}/{campaign.targetReferrals}</span>
                    <span>বোনাস: {campaign.reward}৳</span>
                  </div>
                  <div className="w-full bg-secondary/30 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${(campaign.currentReferrals / campaign.targetReferrals) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InviteTab;
