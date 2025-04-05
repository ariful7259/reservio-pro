
import React, { useState } from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, Share2, Facebook, Twitter, Mail, Check, Edit, ImagePlus, Hash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const SocialShareTab = () => {
  const { referralData, loading, shareReferral } = useReferralData();
  const { toast } = useToast();
  const [customMessage, setCustomMessage] = useState('');
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const { user } = { user: { name: 'আপনি' } }; // Mock user data

  const copyToClipboard = (templateId: string, content: string) => {
    const processedContent = content
      .replace('{referralCode}', referralData?.referralCode || '')
      .replace('{referralLink}', referralData?.referralLink || '')
      .replace('{name}', user?.name || '');
    
    navigator.clipboard.writeText(processedContent);
    setCopied({ ...copied, [templateId]: true });
    
    toast({
      title: 'কপি করা হয়েছে!',
      description: 'মেসেজ কপি করা হয়েছে।',
    });
    
    setTimeout(() => {
      setCopied({ ...copied, [templateId]: false });
    }, 2000);
  };

  const handleShare = (platform: string, templateId: string) => {
    if (!referralData) return;
    shareReferral(platform, templateId);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
        <p>টেমপ্লেট লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!referralData) return null;

  return (
    <div className="space-y-6">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>রেফারেল শেয়ার করুন</CardTitle>
          <CardDescription>
            বিভিন্ন সোশ্যাল মিডিয়া প্ল্যাটফর্মে আপনার রেফারেল লিঙ্ক শেয়ার করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="facebook">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="facebook" className="flex items-center gap-2">
                <Facebook className="h-4 w-4" />
                ফেসবুক
              </TabsTrigger>
              <TabsTrigger value="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                টুইটার
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                হোয়াটসঅ্যাপ
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                ইমেইল
              </TabsTrigger>
            </TabsList>
            
            {['facebook', 'twitter', 'whatsapp', 'email'].map(platform => {
              const template = referralData.socialTemplates.find(t => t.platform === platform);
              if (!template) return null;
              
              return (
                <TabsContent key={platform} value={platform} className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm mb-4">{template.content.replace('{referralCode}', referralData.referralCode).replace('{referralLink}', referralData.referralLink).replace('{name}', user?.name || '')}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags?.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => copyToClipboard(template.id, template.content)}
                      >
                        {copied[template.id] ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied[template.id] ? "কপি করা হয়েছে" : "কপি করুন"}
                      </Button>
                      
                      <Button 
                        onClick={() => handleShare(platform, template.id)}
                        className="gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        শেয়ার করুন
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">কাস্টম মেসেজ</p>
                    <Textarea 
                      placeholder="কাস্টম মেসেজ লিখুন... (যেমন: 'হ্যালো বন্ধু, আমি এই অ্যাপটি ব্যবহার করে খুব খুশি! আমার রেফারেল কোড ব্যবহার করে আপনিও জয়েন করুন: {referralCode}')"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      rows={4}
                      className="mb-2"
                    />
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={() => {
                          const processedContent = customMessage
                            .replace('{referralCode}', referralData.referralCode)
                            .replace('{referralLink}', referralData.referralLink)
                            .replace('{name}', user?.name || '');
                          navigator.clipboard.writeText(processedContent);
                          toast({
                            title: 'কপি করা হয়েছে!',
                            description: 'কাস্টম মেসেজ কপি করা হয়েছে।',
                          });
                        }}
                      >
                        <Copy className="h-4 w-4" />
                        কপি করুন
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="gap-2"
                        onClick={() => {
                          let shareUrl = '';
                          const processedContent = customMessage
                            .replace('{referralCode}', referralData.referralCode)
                            .replace('{referralLink}', referralData.referralLink)
                            .replace('{name}', user?.name || '');
                          
                          switch (platform) {
                            case 'facebook':
                              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData.referralLink)}&quote=${encodeURIComponent(processedContent)}`;
                              break;
                            case 'twitter':
                              shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(processedContent)}`;
                              break;
                            case 'whatsapp':
                              shareUrl = `https://wa.me/?text=${encodeURIComponent(processedContent)}`;
                              break;
                            case 'email':
                              shareUrl = `mailto:?subject=${encodeURIComponent('রেফারেল ইনভিটেশন')}&body=${encodeURIComponent(processedContent)}`;
                              break;
                          }
                          
                          if (shareUrl) {
                            window.open(shareUrl, '_blank');
                          }
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                        শেয়ার করুন
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>সোশ্যাল মিডিয়া টিপস</CardTitle>
          <CardDescription>
            আপনার রেফারেল মেসেজের প্রভাব বাড়ানোর টিপস
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Edit className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium">ব্যক্তিগত মেসেজ লিখুন</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                কেন আপনি এই অ্যাপ/সার্ভিস পছন্দ করেন তা বন্ধুদের জানান। ব্যক্তিগত অভিজ্ঞতা শেয়ার করা বেশি কার্যকর।
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <ImagePlus className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-medium">ছবি যোগ করুন</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                আপনার পোস্টে আকর্ষণীয় ছবি যোগ করলে এনগেজমেন্ট বাড়ে। অ্যাপ/সেবা থেকে স্ক্রীনশট শেয়ার করতে পারেন।
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <Hash className="h-4 w-4 text-amber-600" />
                </div>
                <h3 className="font-medium">হ্যাশট্যাগ ব্যবহার করুন</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                প্রাসঙ্গিক হ্যাশট্যাগ ব্যবহার করে আপনার পোস্টের পৌঁছানো বাড়ান। অবশ্যই অতি ব্যবহার এড়ান।
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Share2 className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-medium">সক্রিয় সময়ে পোস্ট করুন</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                সকাল ৯টা - ১১টা এবং বিকাল ৪টা - রাত ৯টার মধ্যে পোস্ট করলে বেশি মানুষ দেখতে পারে।
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialShareTab;
