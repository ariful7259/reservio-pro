
import React, { useState } from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy, Facebook, Twitter, Mail, Share2, CheckCircle2 } from 'lucide-react';
import QRCode from 'react-qr-code';

const InviteTab = () => {
  const { referralData, loading, shareReferral } = useReferralData();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: 'কপি করা হয়েছে!',
      description: 'রেফারেল লিঙ্ক কপি করা হয়েছে।',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareClick = (platform: string) => {
    if (!referralData) return;
    
    // Find the template ID for the platform
    const template = referralData.socialTemplates.find(t => t.platform === platform);
    if (template) {
      shareReferral(platform, template.id);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
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
              <Skeleton className="h-10 w-28" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="flex justify-center">
            <Skeleton className="h-48 w-48" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!referralData) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>ইনভাইট করুন এবং উপার্জন করুন</CardTitle>
          <CardDescription>
            বন্ধুদের আমন্ত্রণ জানিয়ে প্রতি রেফারেলে {referralData.referralRate} টাকা উপার্জন করুন। বন্ধুরাও পাবেন একই পরিমাণ বোনাস!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              value={referralData.referralLink}
              readOnly
              className="flex-1 bg-secondary/10"
            />
            <Button 
              onClick={() => copyToClipboard(referralData.referralLink)}
              className="gap-2"
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'কপি করা হয়েছে!' : 'কপি করুন'}
            </Button>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2">আপনার রেফারেল কোড:</p>
            <div className="flex items-center gap-2">
              <code className="bg-secondary/20 px-3 py-1 rounded-md font-bold text-lg">
                {referralData.referralCode}
              </code>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => copyToClipboard(referralData.referralCode)}
              >
                কপি
              </Button>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-sm mb-3">শেয়ার করুন:</p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="gap-2 bg-[#3b5998] text-white hover:bg-[#3b5998]/80 hover:text-white"
                onClick={() => handleShareClick('facebook')}
              >
                <Facebook className="h-4 w-4" />
                ফেসবুক
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/80 hover:text-white"
                onClick={() => handleShareClick('twitter')}
              >
                <Twitter className="h-4 w-4" />
                টুইটার
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/80 hover:text-white"
                onClick={() => handleShareClick('whatsapp')}
              >
                <Share2 className="h-4 w-4" />
                হোয়াটসঅ্যাপ
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-[#EA4335] text-white hover:bg-[#EA4335]/80 hover:text-white"
                onClick={() => handleShareClick('email')}
              >
                <Mail className="h-4 w-4" />
                ইমেইল
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>QR কোড</CardTitle>
          <CardDescription>
            রেফারেল লিঙ্ক শেয়ার করতে QR কোড স্ক্যান করুন
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-lg">
            <QRCode 
              value={referralData.referralLink}
              size={180}
              level="H"
            />
          </div>
        </CardContent>
      </Card>
      
      {referralData.campaigns.some(c => c.isActive) && (
        <Card className="border-2 border-dashed border-primary/50 bg-primary/5">
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
