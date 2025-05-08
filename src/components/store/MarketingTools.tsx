
import React, { useState } from 'react';
import { Mail, Facebook, Instagram, Twitter, RefreshCcw, CheckCircle2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const MarketingTools = () => {
  const { toast } = useToast();
  const [generatingEmail, setGeneratingEmail] = useState(false);
  const [generatingSocial, setGeneratingSocial] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [socialPost, setSocialPost] = useState('');

  const handleGenerateEmail = () => {
    setGeneratingEmail(true);
    setTimeout(() => {
      setEmailContent(`
প্রিয় গ্রাহক,

আমাদের অনলাইন স্টোরে আপনাকে স্বাগতম। আমরা আনন্দের সাথে আপনাকে জানাচ্ছি যে আমাদের নতুন কালেকশন এসেছে!

এই সপ্তাহে সকল প্রোডাক্টের উপর ১৫% ডিসকাউন্ট পাবেন। কুপন কোড "WELCOME15" ব্যবহার করুন।

আমাদের প্রোডাক্টস দেখতে এখানে ক্লিক করুন।

ধন্যবাদ,
আমার স্টোর টিম
      `);
      setGeneratingEmail(false);
      toast({
        title: "ইমেইল টেম্পলেট তৈরি হয়েছে",
        description: "আপনার ইমেইল টেম্পলেট সফলভাবে তৈরি হয়েছে।",
      });
    }, 1500);
  };

  const handleGenerateSocialPost = () => {
    setGeneratingSocial(true);
    setTimeout(() => {
      setSocialPost(`
🎉 নতুন কালেকশন এসেছে! 🎉

আমাদের নতুন কালেকশন দেখতে আমাদের অনলাইন স্টোরে ভিজিট করুন। এই সপ্তাহে সকল আইটেমের উপর ১৫% ডিসকাউন্ট!

🛍️ www.mystore.com
📱 ফোন: +৮৮০১৭১২৩৪৫৬৭৮
📍 ঢাকা, বাংলাদেশ

#নতুনকালেকশন #অনলাইনশপিং #ডিসকাউন্ট
      `);
      setGeneratingSocial(false);
      toast({
        title: "সোশ্যাল মিডিয়া পোস্ট তৈরি হয়েছে",
        description: "আপনার সোশ্যাল মিডিয়া পোস্ট সফলভাবে তৈরি হয়েছে।",
      });
    }, 1500);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "কপি হয়েছে",
      description: `আপনার ${type} কপি করা হয়েছে।`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="email">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> ইমেইল মার্কেটিং
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Facebook className="h-4 w-4" /> সোশ্যাল মিডিয়া
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>ইমেইল টাইপ</Label>
              <select className="w-full p-2 border rounded-md">
                <option>ওয়েলকাম ইমেইল</option>
                <option>প্রোডাক্ট প্রমোশন</option>
                <option>ডিসকাউন্ট অফার</option>
                <option>অর্ডার কনফার্মেশন</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>ইমেইল সাবজেক্ট</Label>
              </div>
              <Input value="আমাদের নতুন কালেকশন দেখুন + ১৫% ছাড়!" />
            </div>
            
            <div className="space-y-2">
              <Label>কাস্টম প্যারামিটার</Label>
              <Input placeholder="প্রোডাক্ট নাম, ডিসকাউন্ট % ইত্যাদি..." />
            </div>
            
            <Button 
              onClick={handleGenerateEmail} 
              disabled={generatingEmail} 
              className="w-full"
            >
              {generatingEmail ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                  জেনারেট হচ্ছে...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  ইমেইল টেম্পলেট জেনারেট করুন
                </>
              )}
            </Button>
          </div>
          
          {emailContent && (
            <div className="border rounded-md p-4 relative">
              <div className="absolute top-2 right-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(emailContent, 'ইমেইল কন্টেন্ট')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="whitespace-pre-wrap">{emailContent}</div>
            </div>
          )}
          
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              ইমেইল মার্কেটিং টিপস
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <span>•</span>
                <span>সহজ এবং আকর্ষণীয় সাবজেক্ট লাইন ব্যবহার করুন</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>গ্রাহকদের নাম দিয়ে পার্সোনালাইজড ইমেইল পাঠান</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>মোবাইল-অপটিমাইজড টেম্পলেট ব্যবহার করুন</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>স্পষ্ট কল-টু-অ্যাকশন বাটন যোগ করুন</span>
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4 mt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>প্ল্যাটফর্ম</Label>
              <select className="w-full p-2 border rounded-md">
                <option>ফেসবুক</option>
                <option>ইনস্টাগ্রাম</option>
                <option>টুইটার</option>
                <option>লিংকডইন</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>কন্টেন্ট টাইপ</Label>
              <select className="w-full p-2 border rounded-md">
                <option>প্রোডাক্ট প্রমোশন</option>
                <option>ডিসকাউন্ট অফার</option>
                <option>কন্টেন্ট মার্কেটিং</option>
                <option>ইভেন্ট প্রমোশন</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>কীওয়ার্ড</Label>
              <Input placeholder="প্রোডাক্ট নাম, ডিসকাউন্ট %, ইভেন্ট নাম ইত্যাদি..." />
            </div>
            
            <Button 
              onClick={handleGenerateSocialPost} 
              disabled={generatingSocial} 
              className="w-full"
            >
              {generatingSocial ? (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                  জেনারেট হচ্ছে...
                </>
              ) : (
                <>
                  <Facebook className="h-4 w-4 mr-2" />
                  সোশ্যাল মিডিয়া পোস্ট জেনারেট করুন
                </>
              )}
            </Button>
          </div>
          
          {socialPost && (
            <div className="border rounded-md p-4 relative">
              <div className="absolute top-2 right-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(socialPost, 'সোশ্যাল পোস্ট')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="whitespace-pre-wrap">{socialPost}</div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Facebook className="h-6 w-6 text-blue-600" />
                <div>
                  <h4 className="font-medium">ফেসবুক</h4>
                  <p className="text-xs text-muted-foreground">পোস্ট, স্টোরি, গ্রুপ</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Instagram className="h-6 w-6 text-pink-600" />
                <div>
                  <h4 className="font-medium">ইনস্টাগ্রাম</h4>
                  <p className="text-xs text-muted-foreground">ফিড, স্টোরি, রিলস</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Twitter className="h-6 w-6 text-blue-400" />
                <div>
                  <h4 className="font-medium">টুইটার</h4>
                  <p className="text-xs text-muted-foreground">টুইট, রিট্যুইট</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingTools;
