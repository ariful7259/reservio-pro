
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Copy, ExternalLink, Share2, Eye } from 'lucide-react';

const PaymentLinkCreator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    serviceName: '',
    description: '',
    price: '',
    currency: 'BDT',
    category: '',
    deliveryTime: '',
    advancePayment: '',
    customUrl: ''
  });
  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generatePaymentLink = async () => {
    if (!formData.serviceName || !formData.price) {
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
      const linkId = Math.random().toString(36).substring(2, 8);
      const customUrl = formData.customUrl || formData.serviceName.toLowerCase().replace(/\s+/g, '-');
      const link = `https://basabari.com/pay/${customUrl}-${linkId}`;
      setGeneratedLink(link);
      setIsGenerating(false);
      
      toast({
        title: "পেমেন্ট লিংক তৈরি সফল!",
        description: "আপনার কাস্টম পেমেন্ট লিংক তৈরি হয়েছে",
      });
    }, 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "লিংক কপি হয়েছে!",
      description: "পেমেন্ট লিংক ক্লিপবোর্ডে কপি করা হয়েছে",
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: formData.serviceName,
        text: formData.description,
        url: generatedLink
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>পেমেন্ট লিংক তৈরি করুন</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="serviceName">সার্ভিসের নাম *</Label>
            <Input
              id="serviceName"
              placeholder="যেমন: লোগো ডিজাইন সার্ভিস"
              value={formData.serviceName}
              onChange={(e) => handleInputChange('serviceName', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">সার্ভিসের বিবরণ</Label>
            <Textarea
              id="description"
              placeholder="আপনার সার্ভিস সম্পর্কে বিস্তারিত লিখুন..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">মূল্য *</Label>
              <Input
                id="price"
                type="number"
                placeholder="5000"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currency">কারেন্সি</Label>
              <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
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
          </div>

          <div>
            <Label htmlFor="category">ক্যাটেগরি</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="deliveryTime">ডেলিভারি সময়</Label>
              <Input
                id="deliveryTime"
                placeholder="যেমন: ৩ দিন"
                value={formData.deliveryTime}
                onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="advancePayment">অ্যাডভান্স পেমেন্ট (%)</Label>
              <Input
                id="advancePayment"
                type="number"
                placeholder="50"
                value={formData.advancePayment}
                onChange={(e) => handleInputChange('advancePayment', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customUrl">কাস্টম URL (ঐচ্ছিক)</Label>
            <Input
              id="customUrl"
              placeholder="my-service"
              value={formData.customUrl}
              onChange={(e) => handleInputChange('customUrl', e.target.value)}
            />
          </div>

          <Button 
            onClick={generatePaymentLink}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? 'তৈরি হচ্ছে...' : 'পেমেন্ট লিংক তৈরি করুন'}
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>প্রিভিউ</CardTitle>
        </CardHeader>
        <CardContent>
          {generatedLink ? (
            <div className="space-y-4">
              {/* Generated Link */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">আপনার পেমেন্ট লিংক তৈরি হয়েছে! 🎉</h4>
                <div className="bg-white border rounded p-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground truncate">{generatedLink}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={shareLink}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open(generatedLink, '_blank')}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3 text-center">মোবাইল প্রিভিউ</h4>
                <div className="max-w-sm mx-auto">
                  <div className="bg-gray-800 rounded-[2rem] p-2">
                    <div className="bg-white rounded-[1.5rem] overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
                        <h3 className="font-bold text-lg">{formData.serviceName || 'সার্ভিসের নাম'}</h3>
                        <p className="text-sm opacity-90">{formData.description || 'সার্ভিসের বিবরণ এখানে থাকবে'}</p>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">মূল্য:</span>
                          <span className="text-xl font-bold text-purple-600">
                            {formData.currency === 'BDT' ? '৳' : formData.currency === 'USD' ? '$' : '€'}
                            {formData.price || '0'}
                          </span>
                        </div>
                        {formData.deliveryTime && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">ডেলিভারি:</span>
                            <span className="text-sm">{formData.deliveryTime}</span>
                          </div>
                        )}
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          এখনই অর্ডার করুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>পেমেন্ট লিংক তৈরি করুন প্রিভিউ দেখার জন্য</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentLinkCreator;
