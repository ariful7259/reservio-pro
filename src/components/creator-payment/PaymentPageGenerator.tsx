
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink, Palette, CreditCard, Smartphone } from 'lucide-react';

const PaymentPageGenerator = () => {
  const { toast } = useToast();
  const [pageData, setPageData] = useState({
    serviceName: '',
    description: '',
    price: '',
    currency: 'BDT',
    category: '',
    deliveryTime: '',
    advancePayment: '',
    customUrl: '',
    logoUrl: '',
    backgroundColor: '#ffffff',
    primaryColor: '#6366f1',
    fontStyle: 'modern',
    layout: 'centered',
    enableEscrow: true,
    autoReleaseTime: '7', // days
    requireAdvanceVerification: false
  });
  
  const [generatedPage, setGeneratedPage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setPageData(prev => ({ ...prev, [field]: value }));
  };

  const generatePaymentPage = async () => {
    if (!pageData.serviceName || !pageData.price) {
      toast({
        title: "অসম্পূর্ণ তথ্য",
        description: "সার্ভিসের নাম এবং মূল্য অবশ্যই দিতে হবে",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const pageId = Math.random().toString(36).substring(2, 8);
      const customUrl = pageData.customUrl || pageData.serviceName.toLowerCase().replace(/\s+/g, '-');
      const link = `https://basabari.com/pay/${customUrl}-${pageId}`;
      setGeneratedPage(link);
      setIsGenerating(false);
      
      toast({
        title: "পেমেন্ট পেজ তৈরি সফল!",
        description: "আপনার কাস্টম পেমেন্ট পেজ তৈরি হয়েছে",
      });
    }, 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedPage);
    toast({
      title: "লিংক কপি হয়েছে!",
      description: "পেমেন্ট পেজ লিংক ক্লিপবোর্ডে কপি করা হয়েছে",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Section */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>পেমেন্ট পেজ তৈরি করুন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceName">সার্ভিসের নাম *</Label>
                <Input
                  id="serviceName"
                  placeholder="যেমন: লোগো ডিজাইন সার্ভিস"
                  value={pageData.serviceName}
                  onChange={(e) => handleInputChange('serviceName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">ক্যাটেগরি</Label>
                <Select value={pageData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="ক্যাটেগরি নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">ডিজাইন</SelectItem>
                    <SelectItem value="development">ডেভেলপমেন্ট</SelectItem>
                    <SelectItem value="writing">লেখালেখি</SelectItem>
                    <SelectItem value="marketing">মার্কেটিং</SelectItem>
                    <SelectItem value="video">ভিডিও এডিটিং</SelectItem>
                    <SelectItem value="consultation">পরামর্শ</SelectItem>
                    <SelectItem value="education">শিক্ষা</SelectItem>
                    <SelectItem value="other">অন্যান্য</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">সার্ভিসের বিবরণ</Label>
              <Textarea
                id="description"
                placeholder="আপনার সার্ভিস সম্পর্কে বিস্তারিত লিখুন..."
                value={pageData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="price">মূল্য *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="5000"
                  value={pageData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="currency">কারেন্সি</Label>
                <Select value={pageData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BDT">BDT (৳)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deliveryTime">ডেলিভারি সময়</Label>
                <Input
                  id="deliveryTime"
                  placeholder="যেমন: ৩ দিন"
                  value={pageData.deliveryTime}
                  onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="advancePayment">অ্যাডভান্স পেমেন্ট (%)</Label>
                <Input
                  id="advancePayment"
                  type="number"
                  placeholder="50"
                  value={pageData.advancePayment}
                  onChange={(e) => handleInputChange('advancePayment', e.target.value)}
                />
              </div>
            </div>

            {/* Escrow Settings */}
            <Card className="border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Escrow সেটিংস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableEscrow">Escrow Protection চালু করুন</Label>
                    <p className="text-sm text-muted-foreground">পেমেন্ট নিরাপদে ধরে রাখা হবে</p>
                  </div>
                  <Switch
                    id="enableEscrow"
                    checked={pageData.enableEscrow}
                    onCheckedChange={(checked) => handleInputChange('enableEscrow', checked)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="autoReleaseTime">অটো রিলিজ সময় (দিন)</Label>
                  <Select value={pageData.autoReleaseTime} onValueChange={(value) => handleInputChange('autoReleaseTime', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">৩ দিন</SelectItem>
                      <SelectItem value="7">৭ দিন</SelectItem>
                      <SelectItem value="14">১৪ দিন</SelectItem>
                      <SelectItem value="30">৩০ দিন</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireAdvanceVerification">অ্যাডভান্স পেমেন্ট ভেরিফিকেশন</Label>
                    <p className="text-sm text-muted-foreground">কাজ শুরুর আগে নিশ্চিতকরণ প্রয়োজন</p>
                  </div>
                  <Switch
                    id="requireAdvanceVerification"
                    checked={pageData.requireAdvanceVerification}
                    onCheckedChange={(checked) => handleInputChange('requireAdvanceVerification', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customization */}
            <Card className="border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-600" />
                  কাস্টমাইজেশন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="backgroundColor">ব্যাকগ্রাউন্ড কালার</Label>
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={pageData.backgroundColor}
                      onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryColor">প্রাইমারি কালার</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={pageData.primaryColor}
                      onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fontStyle">ফন্ট স্টাইল</Label>
                    <Select value={pageData.fontStyle} onValueChange={(value) => handleInputChange('fontStyle', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="layout">Layout Style</Label>
                    <Select value={pageData.layout} onValueChange={(value) => handleInputChange('layout', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centered">Centered</SelectItem>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="card">Card Style</SelectItem>
                        <SelectItem value="full-width">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="logoUrl">লোগো URL (ঐচ্ছিক)</Label>
                  <Input
                    id="logoUrl"
                    placeholder="https://example.com/logo.png"
                    value={pageData.logoUrl}
                    onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="customUrl">কাস্টম URL (ঐচ্ছিক)</Label>
                  <Input
                    id="customUrl"
                    placeholder="my-service"
                    value={pageData.customUrl}
                    onChange={(e) => handleInputChange('customUrl', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={generatePaymentPage}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? 'তৈরি হচ্ছে...' : 'পেমেন্ট পেজ তৈরি করুন'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        {generatedPage ? (
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">আপনার পেমেন্ট পেজ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Generated Link */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">পেজ তৈরি সফল! 🎉</h4>
                <div className="bg-white border rounded p-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate">{generatedPage}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(generatedPage, '_blank')}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-center flex items-center justify-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  মোবাইল প্রিভিউ
                </h4>
                <div className="max-w-sm mx-auto">
                  <div className="bg-gray-800 rounded-[2rem] p-2">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden">
                      <div 
                        className="p-4 text-white"
                        style={{ backgroundColor: pageData.primaryColor }}
                      >
                        {pageData.logoUrl && (
                          <img src={pageData.logoUrl} alt="Logo" className="h-8 w-auto mb-2" />
                        )}
                        <h3 className="font-bold text-lg">{pageData.serviceName || 'সার্ভিসের নাম'}</h3>
                        <p className="text-sm opacity-90">{pageData.description || 'সার্ভিসের বিবরণ এখানে থাকবে'}</p>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">মূল্য:</span>
                          <span className="text-xl font-bold" style={{ color: pageData.primaryColor }}>
                            {pageData.currency === 'BDT' ? '৳' : pageData.currency === 'USD' ? '$' : '€'}
                            {pageData.price || '0'}
                          </span>
                        </div>
                        {pageData.deliveryTime && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">ডেলিভারি:</span>
                            <span className="text-sm">{pageData.deliveryTime}</span>
                          </div>
                        )}
                        {pageData.enableEscrow && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">Escrow Protected</span>
                            </div>
                            <p className="text-xs text-blue-600 mt-1">
                              আপনার টাকা নিরাপদে থাকবে কাজ সম্পন্ন না হওয়া পর্যন্ত
                            </p>
                          </div>
                        )}
                        <Button 
                          className="w-full"
                          style={{ backgroundColor: pageData.primaryColor }}
                        >
                          এখনই অর্ডার করুন
                        </Button>
                        
                        {/* Payment Methods */}
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-2">পেমেন্ট মেথড:</p>
                          <div className="flex flex-wrap justify-center gap-2">
                            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">bKash</span>
                            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Nagad</span>
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Rocket</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">VISA</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Mastercard</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">প্রিভিউ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Smartphone className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>পেমেন্ট পেজ তৈরি করুন প্রিভিউ দেখার জন্য</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PaymentPageGenerator;
