
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferralPage = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const referralCode = "REFER123";
  const referralLink = `https://market.com/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "কপি সম্পন্ন হয়েছে",
      description: "রেফারেল লিংক কপি করা হয়েছে",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">রেফারেল প্রোগ্রাম</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>আপনার রেফারেল লিংক শেয়ার করুন</CardTitle>
            <CardDescription>
              বন্ধুদের সাথে শেয়ার করুন এবং প্রতিটি সাইন আপে ৳১০০ বোনাস পাবেন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="flex-1"
              />
              <Button variant="outline" onClick={copyToClipboard}>
                {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="invites">
          <TabsList className="mb-4">
            <TabsTrigger value="invites">আমন্ত্রণ</TabsTrigger>
            <TabsTrigger value="earnings">আয়</TabsTrigger>
            <TabsTrigger value="leaderboard">লিডারবোর্ড</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invites">
            <Card>
              <CardHeader>
                <CardTitle>আমন্ত্রিত বন্ধুরা</CardTitle>
                <CardDescription>
                  আপনি ৫ জন বন্ধুকে আমন্ত্রণ জানিয়েছেন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">করিম হোসেন</p>
                      <p className="text-xs text-muted-foreground">৩ দিন আগে যোগদান করেছেন</p>
                    </div>
                    <span className="text-green-600 font-medium">৳১০০ অর্জিত</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div>
                      <p className="font-medium">রহিম আলী</p>
                      <p className="text-xs text-muted-foreground">১ সপ্তাহ আগে যোগদান করেছেন</p>
                    </div>
                    <span className="text-green-600 font-medium">৳১০০ অর্জিত</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>মোট আয়</CardTitle>
                <CardDescription>
                  আপনার রেফারেল থেকে মোট আয়
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-4">৳৩৫০</div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-medium mb-2">আরও ৳৬৫০ অর্জন করলে আপনি পাবেন:</p>
                  <p className="text-sm mb-1">✓ বিশেষ ব্যাজ</p>
                  <p className="text-sm mb-1">✓ ১০% কমিশন রেট</p>
                  <p className="text-sm">✓ বিশেষ প্রমোশন</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>টপ রেফারাররা</CardTitle>
                <CardDescription>
                  এই মাসের সেরা রেফারাররা
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center">
                      <div className="bg-amber-100 text-amber-800 font-bold w-6 h-6 rounded-full flex items-center justify-center mr-2">1</div>
                      <p className="font-medium">সালমান খান</p>
                    </div>
                    <span className="font-medium">৩৫ রেফারেল</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center">
                      <div className="bg-gray-100 text-gray-800 font-bold w-6 h-6 rounded-full flex items-center justify-center mr-2">2</div>
                      <p className="font-medium">মারিয়া বেগম</p>
                    </div>
                    <span className="font-medium">২৮ রেফারেল</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center">
                      <div className="bg-amber-50 text-amber-800 font-bold w-6 h-6 rounded-full flex items-center justify-center mr-2">3</div>
                      <p className="font-medium">আবদুল করিম</p>
                    </div>
                    <span className="font-medium">২৪ রেফারেল</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReferralPage;
