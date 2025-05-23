
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Sparkles, Facebook, BellRing, BarChart3, Truck, MapPin, Package, ArrowUpRight } from 'lucide-react';

const TrackingIntegrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pixels');
  const [facebookPixelId, setFacebookPixelId] = useState('');
  const [googleTagId, setGoogleTagId] = useState('');
  const [tiktokPixelId, setTiktokPixelId] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('pathao');
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSavePixels = () => {
    toast({
      title: "ট্র্যাকিং পিক্সেল সংরক্ষিত",
      description: "আপনার পিক্সেল আইডি গুলো সফলভাবে সংরক্ষণ করা হয়েছে",
    });
  };

  const handleConnectCourier = () => {
    if (!apiKey) {
      toast({
        title: "API কী দিন",
        description: "কুরিয়ার সার্ভিসের সাথে সংযোগ করতে API কী দিন",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "কুরিয়ার সংযুক্ত",
      description: `${getCourierName(selectedCourier)} সার্ভিসের সাথে সফলভাবে সংযুক্ত হয়েছে`,
    });
  };

  const getCourierName = (code: string) => {
    const couriers: Record<string, string> = {
      'pathao': 'পাঠাও',
      'ecourier': 'eCourier',
      'steadfast': 'Steadfast',
      'redx': 'RedX',
      'paperfly': 'Paperfly'
    };
    return couriers[code] || code;
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <BarChart3 className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-medium">ট্র্যাকিং ও কুরিয়ার ইন্টিগ্রেশন</h3>
            <p className="text-sm text-muted-foreground">
              আপনার স্টোরের সাথে বিভিন্ন ট্র্যাকিং পিক্সেল এবং কুরিয়ার সার্ভিস সংযোগ করুন। অর্ডার ট্র্যাকিং সিস্টেম সেট করুন।
            </p>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-3">
          <TabsTrigger value="pixels">ট্র্যাকিং পিক্সেল</TabsTrigger>
          <TabsTrigger value="courier">কুরিয়ার সার্ভিস</TabsTrigger>
          <TabsTrigger value="orders">অর্ডার ট্র্যাকিং</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pixels" className="mt-0 space-y-6">
          {/* ফেসবুক পিক্সেল */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <Facebook className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">ফেসবুক পিক্সেল</CardTitle>
              </div>
              <Badge className="bg-blue-100 text-blue-700">জনপ্রিয়</Badge>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                ফেসবুক পিক্সেল আইডি ব্যবহার করে আপনার স্টোরে ভিজিটর ট্র্যাকিং এবং কনভার্শন মনিটর করুন।
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Input 
                  type="text" 
                  placeholder="ফেসবুক পিক্সেল আইডি দিন (উদাহরণ: 123456789012345)" 
                  value={facebookPixelId}
                  onChange={(e) => setFacebookPixelId(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* গুগল ট্যাগ */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">গুগল ট্যাগ</CardTitle>
              <Badge className="bg-red-100 text-red-700">জরুরি</Badge>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                গুগল অ্যানালিটিক্স এবং অন্যান্য গুগল মার্কেটিং টুল ব্যবহারের জন্য গুগল ট্যাগ আইডি সেট করুন।
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Input 
                  type="text" 
                  placeholder="গুগল ট্যাগ আইডি (উদাহরণ: GTM-XXXXXX)" 
                  value={googleTagId}
                  onChange={(e) => setGoogleTagId(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* টিকটক পিক্সেল */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">টিকটক পিক্সেল</CardTitle>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> ট্রেন্ডিং
              </Badge>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                টিকটক মার্কেটিং ক্যাম্পেইন চালানোর জন্য টিকটক পিক্সেল সেট করুন।
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Input 
                  type="text" 
                  placeholder="টিকটক পিক্সেল আইডি" 
                  value={tiktokPixelId}
                  onChange={(e) => setTiktokPixelId(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSavePixels}>ট্র্যাকিং পিক্সেল সেভ করুন</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="courier" className="mt-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Truck className="h-5 w-5" /> কুরিয়ার সার্ভিস ইন্টিগ্রেশন
              </CardTitle>
              <CardDescription>
                আপনার স্টোরে সহজে প্রডাক্ট শিপিং এর জন্য কুরিয়ার সার্ভিসের সাথে সংযোগ করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">বাংলাদেশের জনপ্রিয় কুরিয়ার সার্ভিস</h4>
                
                <RadioGroup value={selectedCourier} onValueChange={setSelectedCourier} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    { id: 'pathao', name: 'পাঠাও' },
                    { id: 'ecourier', name: 'eCourier' },
                    { id: 'steadfast', name: 'Steadfast' },
                    { id: 'redx', name: 'RedX' },
                    { id: 'paperfly', name: 'Paperfly' }
                  ].map(courier => (
                    <div key={courier.id} className={`flex items-center border rounded-md p-3 ${selectedCourier === courier.id ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <RadioGroupItem value={courier.id} id={courier.id} />
                      <Label htmlFor={courier.id} className="flex-grow ml-3 cursor-pointer">
                        {courier.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="mt-4">
                  <Label htmlFor="apiKey">API কী</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="apiKey"
                      placeholder={`${getCourierName(selectedCourier)} API কী`}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <Button onClick={handleConnectCourier}>সংযোগ করুন</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted flex justify-between items-center border-t p-4">
              <div className="text-sm text-muted-foreground">
                <ArrowUpRight className="h-4 w-4 inline mr-1" />
                API কী পেতে সংশ্লিষ্ট কুরিয়ার সার্ভিসের ওয়েবসাইট দেখুন
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">স্বয়ংক্রিয় কুরিয়ার নির্বাচন</CardTitle>
                <Switch id="auto-courier" />
              </div>
              <CardDescription>
                ক্রেতার ঠিকানা অনুযায়ী সবচেয়ে সাশ্রয়ী বা দ্রুত কুরিয়ার স্বয়ংক্রিয়ভাবে নির্বাচন করুন
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Package className="h-5 w-5" /> অর্ডার ট্র্যাকিং সিস্টেম
              </CardTitle>
              <CardDescription>
                ক্রেতাদের জন্য লাইভ অর্ডার ট্র্যাকিং সিস্টেম সেট করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-primary" />
                  <div>
                    <h4 className="font-medium">SMS অ্যালার্ট</h4>
                    <p className="text-sm text-muted-foreground">অর্ডার স্ট্যাটাস পরিবর্তনের SMS নোটিফিকেশন</p>
                  </div>
                </div>
                <Switch id="sms-notifications" />
              </div>
              
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <h4 className="font-medium">লাইভ ট্র্যাকিং ম্যাপ</h4>
                    <p className="text-sm text-muted-foreground">কুরিয়ারের অবস্থান লাইভ ম্যাপে দেখানো</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Sparkles className="h-3.5 w-3.5 mr-1" /> প্রিমিয়াম
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-secondary" />
                  <div>
                    <h4 className="font-medium">ডেলিভারি অ্যানালিটিক্স</h4>
                    <p className="text-sm text-muted-foreground">গড় ডেলিভারি সময় এবং পারফরম্যান্স রিপোর্ট</p>
                  </div>
                </div>
                <Switch id="delivery-analytics" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end bg-muted p-4 border-t">
              <Button>ট্র্যাকিং অপশন সেভ করুন</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackingIntegrations;
