
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Link, 
  Copy, 
  Share2, 
  Eye, 
  Smartphone,
  CreditCard,
  Settings,
  QrCode
} from 'lucide-react';

const PaymentPageGenerator = () => {
  const { toast } = useToast();
  const [pageData, setPageData] = useState({
    serviceName: '',
    description: '',
    price: '',
    advanceAmount: '',
    isAdvancePayment: false,
    customUrl: '',
    acceptedMethods: {
      bkash: true,
      nagad: true,
      rocket: true,
      visa: true,
      mastercard: true,
      stripe: true
    }
  });
  const [generatedUrl, setGeneratedUrl] = useState('');

  const generatePaymentPage = () => {
    if (!pageData.serviceName || !pageData.price) {
      toast({
        title: "অসম্পূর্ণ তথ্য",
        description: "সার্ভিসের নাম এবং মূল্য অবশ্যই দিতে হবে",
        variant: "destructive"
      });
      return;
    }

    const pageId = Math.random().toString(36).substring(2, 8);
    const url = `https://pay.basabari.com/${pageData.customUrl || pageData.serviceName.toLowerCase().replace(/\s+/g, '-')}-${pageId}`;
    setGeneratedUrl(url);
    
    toast({
      title: "পেমেন্ট পেজ তৈরি হয়েছে",
      description: "আপনার কাস্টম পেমেন্ট পেজ সফলভাবে তৈরি হয়েছে",
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast({
      title: "URL কপি হয়েছে",
      description: "পেমেন্ট পেজ URL ক্লিপবোর্ডে কপি করা হয়েছে",
    });
  };

  const paymentMethods = [
    { id: 'bkash', name: 'বিকাশ', color: 'bg-pink-100 text-pink-800' },
    { id: 'nagad', name: 'নগদ', color: 'bg-orange-100 text-orange-800' },
    { id: 'rocket', name: 'রকেট', color: 'bg-purple-100 text-purple-800' },
    { id: 'visa', name: 'Visa', color: 'bg-blue-100 text-blue-800' },
    { id: 'mastercard', name: 'Mastercard', color: 'bg-red-100 text-red-800' },
    { id: 'stripe', name: 'Stripe', color: 'bg-green-100 text-green-800' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            ওয়ান-পেজ পেমেন্ট ল্যান্ডিং তৈরি করুন
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="serviceName">সার্ভিসের নাম *</Label>
            <Input
              id="serviceName"
              placeholder="যেমন: ওয়েব ডিজাইন সার্ভিস"
              value={pageData.serviceName}
              onChange={(e) => setPageData({...pageData, serviceName: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="description">সার্ভিসের বিবরণ</Label>
            <Textarea
              id="description"
              placeholder="আপনার সার্ভিস সম্পর্কে বিস্তারিত..."
              value={pageData.description}
              onChange={(e) => setPageData({...pageData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">মূল্য (৳) *</Label>
              <Input
                id="price"
                type="number"
                placeholder="৫০০০"
                value={pageData.price}
                onChange={(e) => setPageData({...pageData, price: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="advance">অ্যাডভান্স (৳)</Label>
              <Input
                id="advance"
                type="number"
                placeholder="২০০০"
                value={pageData.advanceAmount}
                onChange={(e) => setPageData({...pageData, advanceAmount: e.target.value})}
                disabled={!pageData.isAdvancePayment}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="advance-payment"
              checked={pageData.isAdvancePayment}
              onCheckedChange={(checked) => setPageData({...pageData, isAdvancePayment: checked})}
            />
            <Label htmlFor="advance-payment">অ্যাডভান্স পেমেন্ট সিস্টেম</Label>
          </div>

          <div>
            <Label htmlFor="customUrl">কাস্টম URL (ঐচ্ছিক)</Label>
            <Input
              id="customUrl"
              placeholder="my-service"
              value={pageData.customUrl}
              onChange={(e) => setPageData({...pageData, customUrl: e.target.value})}
            />
          </div>

          <div>
            <Label>পেমেন্ট মেথড নির্বাচন করুন:</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <Switch
                    id={method.id}
                    checked={pageData.acceptedMethods[method.id as keyof typeof pageData.acceptedMethods]}
                    onCheckedChange={(checked) => 
                      setPageData({
                        ...pageData, 
                        acceptedMethods: {...pageData.acceptedMethods, [method.id]: checked}
                      })
                    }
                  />
                  <Label htmlFor={method.id} className="text-sm">{method.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={generatePaymentPage} className="w-full">
            পেমেন্ট পেজ তৈরি করুন
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            মোবাইল প্রিভিউ
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedUrl ? (
            <div className="space-y-4">
              {/* Generated URL */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">পেমেন্ট পেজ তৈরি হয়েছে! 🎉</h4>
                <div className="bg-white border rounded p-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate">{generatedUrl}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyUrl}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="mx-auto max-w-sm">
                <div className="bg-gray-800 rounded-[2rem] p-2">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                      <h3 className="font-bold text-lg">{pageData.serviceName || 'সার্ভিসের নাম'}</h3>
                      <p className="text-sm opacity-90">{pageData.description || 'সার্ভিসের বিবরণ'}</p>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">মূল্য</div>
                        <div className="text-2xl font-bold text-blue-600">৳{pageData.price || '0'}</div>
                        {pageData.isAdvancePayment && pageData.advanceAmount && (
                          <div className="text-sm text-orange-600">অ্যাডভান্স: ৳{pageData.advanceAmount}</div>
                        )}
                      </div>

                      {/* Payment Methods */}
                      <div>
                        <div className="text-sm font-medium mb-2">পেমেন্ট মেথড:</div>
                        <div className="flex flex-wrap gap-1">
                          {paymentMethods.filter(method => 
                            pageData.acceptedMethods[method.id as keyof typeof pageData.acceptedMethods]
                          ).map(method => (
                            <Badge key={method.id} className={`text-xs ${method.color}`}>
                              {method.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        এখনই পেমেন্ট করুন
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Smartphone className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>পেমেন্ট পেজ তৈরি করুন প্রিভিউ দেখার জন্য</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPageGenerator;
