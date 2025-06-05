
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Copy, Link, QrCode, Share2, Eye, Settings,
  CreditCard, Shield, Zap, Globe, Download
} from 'lucide-react';

const PaymentLinkGenerator = () => {
  const { toast } = useToast();
  const [linkData, setLinkData] = useState({
    title: '',
    description: '',
    amount: '',
    templateId: '',
    paymentMethods: ['bkash', 'nagad', 'rocket']
  });
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = () => {
    const link = `https://securepay.app/pay/${Date.now()}`;
    setGeneratedLink(link);
    toast({
      title: "পেমেন্ট লিংক তৈরি হয়েছে",
      description: "আপনার পেমেন্ট লিংক সফলভাবে জেনারেট হয়েছে",
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "লিংক কপি হয়েছে",
      description: "পেমেন্ট লিংক ক্লিপবোর্ডে কপি হয়েছে",
    });
  };

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: '💳', color: 'bg-pink-100' },
    { id: 'nagad', name: 'Nagad', icon: '🏦', color: 'bg-orange-100' },
    { id: 'rocket', name: 'Rocket', icon: '🚀', color: 'bg-purple-100' },
    { id: 'visa', name: 'VISA', icon: '💎', color: 'bg-blue-100' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="h-5 w-5 text-blue-600" />
            পেমেন্ট লিংক জেনারেটর
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">লিংক তৈরি</TabsTrigger>
              <TabsTrigger value="preview">প্রিভিউ</TabsTrigger>
              <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">সার্ভিস টাইটেল</Label>
                    <Input
                      id="title"
                      placeholder="যেমন: লোগো ডিজাইন সার্ভিস"
                      value={linkData.title}
                      onChange={(e) => setLinkData({...linkData, title: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">বর্ণনা</Label>
                    <textarea
                      id="description"
                      className="w-full p-2 border rounded-md h-20"
                      placeholder="সার্ভিসের বিস্তারিত বর্ণনা..."
                      value={linkData.description}
                      onChange={(e) => setLinkData({...linkData, description: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">মূল্য (৳)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="৩০০০"
                      value={linkData.amount}
                      onChange={(e) => setLinkData({...linkData, amount: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>পেমেন্ট মেথড নির্বাচন করুন</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`${method.color} p-3 rounded-lg text-center cursor-pointer hover:shadow-md transition-all ${
                            linkData.paymentMethods.includes(method.id) ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => {
                            const methods = linkData.paymentMethods.includes(method.id)
                              ? linkData.paymentMethods.filter(m => m !== method.id)
                              : [...linkData.paymentMethods, method.id];
                            setLinkData({...linkData, paymentMethods: methods});
                          }}
                        >
                          <div className="text-lg mb-1">{method.icon}</div>
                          <div className="text-sm font-medium">{method.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>নিরাপত্তা ফিচার</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm">এসক্রো সুরক্ষা সক্রিয়</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">তাৎক্ষণিক পেমেন্ট</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">SSL এনক্রিপশন</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleGenerateLink} className="w-full">
                <Link className="h-4 w-4 mr-2" />
                পেমেন্ট লিংক জেনারেট করুন
              </Button>

              {generatedLink && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">জেনারেটেড লিংক:</p>
                        <p className="font-mono text-sm bg-white p-2 rounded border break-all">
                          {generatedLink}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={handleCopyLink}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                      <h2 className="text-2xl font-bold mb-2">
                        {linkData.title || 'সার্ভিস টাইটেল'}
                      </h2>
                      <p className="mb-4">
                        {linkData.description || 'সার্ভিসের বর্ণনা এখানে দেখাবে'}
                      </p>
                      <div className="text-3xl font-bold mb-4">
                        ৳{linkData.amount || '0'}
                      </div>
                      <Button className="bg-white text-blue-600 hover:bg-gray-100">
                        <CreditCard className="h-4 w-4 mr-2" />
                        এখনই পেমেন্ট করুন
                      </Button>
                    </div>
                    
                    <div className="flex justify-center gap-2 flex-wrap">
                      {linkData.paymentMethods.map((methodId) => {
                        const method = paymentMethods.find(m => m.id === methodId);
                        return method ? (
                          <Badge key={methodId} variant="outline">
                            {method.icon} {method.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">১২৫</div>
                    <div className="text-sm text-gray-600">ভিউ</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">৮</div>
                    <div className="text-sm text-gray-600">পেমেন্ট</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">৬.৪%</div>
                    <div className="text-sm text-gray-600">কনভার্শন রেট</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentLinkGenerator;
