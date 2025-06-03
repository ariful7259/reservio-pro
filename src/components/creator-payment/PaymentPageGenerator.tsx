
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Link, 
  Eye, 
  Settings,
  Copy,
  Palette,
  CreditCard,
  Smartphone,
  QrCode
} from 'lucide-react';

const PaymentPageGenerator = () => {
  const { toast } = useToast();
  const [pageData, setPageData] = useState({
    title: '',
    description: '',
    price: '',
    serviceName: '',
    creatorName: '',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#3b82f6'
  });

  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!pageData.title || !pageData.price || !pageData.serviceName) {
      toast({
        title: "সব ফিল্ড পূরণ করুন",
        description: "পেমেন্ট পেজ তৈরি করতে সব তথ্য দিন",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate page generation
    setTimeout(() => {
      const linkId = Math.random().toString(36).substring(2, 8);
      const link = `https://yourapp.com/pay/${linkId}`;
      setGeneratedLink(link);
      setIsGenerating(false);
      
      toast({
        title: "পেমেন্ট পেজ তৈরি হয়েছে!",
        description: "আপনার পেমেন্ট লিংক সফলভাবে তৈরি হয়েছে"
      });
    }, 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "লিংক কপি হয়েছে",
      description: "পেমেন্ট লিংক ক্লিপবোর্ডে কপি হয়েছে"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Link className="h-6 w-6" />
          Payment Page Generator
        </h2>
        <p className="text-muted-foreground">
          আপনার সার্ভিসের জন্য কাস্টম পেমেন্ট পেজ তৈরি করুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>পেজ তথ্য</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">পেজ টাইটেল</Label>
              <Input
                id="title"
                placeholder="যেমন: ওয়েবসাইট ডিজাইন সার্ভিস"
                value={pageData.title}
                onChange={(e) => setPageData(prev => ({...prev, title: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceName">সার্ভিসের নাম</Label>
              <Input
                id="serviceName"
                placeholder="যেমন: প্রিমিয়াম ওয়েবসাইট ডিজাইন"
                value={pageData.serviceName}
                onChange={(e) => setPageData(prev => ({...prev, serviceName: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="creatorName">আপনার নাম</Label>
              <Input
                id="creatorName"
                placeholder="যেমন: জন ডো"
                value={pageData.creatorName}
                onChange={(e) => setPageData(prev => ({...prev, creatorName: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">মূল্য (৳)</Label>
              <Input
                id="price"
                type="number"
                placeholder="5000"
                value={pageData.price}
                onChange={(e) => setPageData(prev => ({...prev, price: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">বিবরণ</Label>
              <Textarea
                id="description"
                placeholder="আপনার সার্ভিস সম্পর্কে বিস্তারিত লিখুন..."
                value={pageData.description}
                onChange={(e) => setPageData(prev => ({...prev, description: e.target.value}))}
              />
            </div>

            {/* Color Customization */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Palette className="h-4 w-4" />
                কাস্টমাইজেশন
              </h4>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bgColor">ব্যাকগ্রাউন্ড</Label>
                  <Input
                    id="bgColor"
                    type="color"
                    value={pageData.backgroundColor}
                    onChange={(e) => setPageData(prev => ({...prev, backgroundColor: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textColor">টেক্সট রঙ</Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={pageData.textColor}
                    onChange={(e) => setPageData(prev => ({...prev, textColor: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buttonColor">বাটন রঙ</Label>
                  <Input
                    id="buttonColor"
                    type="color"
                    value={pageData.buttonColor}
                    onChange={(e) => setPageData(prev => ({...prev, buttonColor: e.target.value}))}
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleGenerate} 
              className="w-full" 
              disabled={isGenerating}
            >
              {isGenerating ? 'তৈরি করা হচ্ছে...' : 'পেমেন্ট পেজ তৈরি করুন'}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>প্রিভিউ</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="border rounded-lg p-6 min-h-[400px]"
              style={{ 
                backgroundColor: pageData.backgroundColor,
                color: pageData.textColor 
              }}
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">
                  {pageData.title || 'আপনার সার্ভিসের টাইটেল'}
                </h3>
                
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2">
                    {pageData.serviceName || 'সার্ভিসের নাম'}
                  </h4>
                  <p className="text-sm opacity-80">
                    {pageData.description || 'আপনার সার্ভিসের বিবরণ এখানে থাকবে...'}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm opacity-80">প্রদানকারী:</p>
                  <p className="font-medium">
                    {pageData.creatorName || 'আপনার নাম'}
                  </p>
                </div>

                <div className="text-3xl font-bold">
                  ৳{pageData.price || '0'}
                </div>

                <Button 
                  style={{ backgroundColor: pageData.buttonColor }}
                  className="w-full text-white"
                  disabled
                >
                  এখনই পেমেন্ট করুন
                </Button>

                <div className="flex justify-center gap-4 text-xs opacity-60">
                  <div className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    <span>কার্ড</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Smartphone className="h-3 w-3" />
                    <span>মোবাইল ব্যাংকিং</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generated Link Section */}
      {generatedLink && (
        <Card>
          <CardHeader>
            <CardTitle>আপনার পেমেন্ট লিংক</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={generatedLink} readOnly className="flex-1" />
              <Button onClick={handleCopyLink} variant="outline">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <QrCode className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">QR Code</h4>
                  <p className="text-sm text-muted-foreground">
                    QR কোড জেনারেট করুন
                  </p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-medium">সেটিংস</h4>
                  <p className="text-sm text-muted-foreground">
                    পেজ কাস্টমাইজ করুন
                  </p>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-medium">পেমেন্ট মেথড</h4>
                  <p className="text-sm text-muted-foreground">
                    সব ধরনের পেমেন্ট
                  </p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentPageGenerator;
