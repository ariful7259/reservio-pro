
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Store, 
  Layout, 
  ShoppingCart, 
  Globe, 
  DollarSign, 
  Search, 
  Smartphone, 
  Laptop, 
  Tablet, 
  MousePointer, 
  CreditCard, 
  TrendingUp, 
  MessageCircle, 
  Box, 
  Truck, 
  Settings,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const CreateStore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('setup');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const themes = [
    { 
      id: 'minimal', 
      name: 'মিনিমাল', 
      description: 'ক্লিন এবং সাধারণ ডিজাইন',
      image: 'https://images.unsplash.com/photo-1561069934-eee225952461?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    { 
      id: 'fashion', 
      name: 'ফ্যাশন', 
      description: 'ফ্যাশন এবং ক্লোদিং স্টোরের জন্য',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    { 
      id: 'electronics', 
      name: 'ইলেকট্রনিক্স', 
      description: 'গ্যাজেট এবং টেক প্রোডাক্টের জন্য',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    { 
      id: 'food', 
      name: 'ফুড', 
      description: 'রেস্টুরেন্ট এবং ফুড ডেলিভারি সার্ভিসের জন্য',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
  ];

  const features = [
    {
      title: 'স্মার্ট থিম বিল্ডার',
      description: 'ড্র্যাগ এন্ড ড্রপ ইন্টারফেস ব্যবহার করে আপনার সাইট ডিজাইন করুন, কোডিং জ্ঞান ছাড়াই।',
      icon: <Layout className="h-10 w-10 text-primary" />,
      benefits: ['ড্র্যাগ এন্ড ড্রপ এডিটর', 'কাস্টম রঙ এবং ফন্ট', 'মোবাইল প্রিভিউ']
    },
    {
      title: 'অ্যাডভান্সড ই-কমার্স টুলস',
      description: 'প্রোডাক্ট ক্যাটালগ, শপিং কার্ট, এবং পেমেন্ট প্রসেসিং সিস্টেম অন্তর্ভুক্ত।',
      icon: <ShoppingCart className="h-10 w-10 text-blue-500" />,
      benefits: ['অনলাইন অর্ডার ম্যানেজমেন্ট', 'ইনভেন্টরি ট্র্যাকিং', 'কুপন কোড সিস্টেম']
    },
    {
      title: 'কাস্টম ডোমেইন',
      description: 'আপনার ব্র্যান্ডের জন্য একটি অনন্য ডোমেইন নাম নিবন্ধন করুন বা আপনার বিদ্যমান ডোমেইন ব্যবহার করুন।',
      icon: <Globe className="h-10 w-10 text-green-500" />,
      benefits: ['ফ্রি সাবডোমেইন', 'কাস্টম ডোমেইন সেটআপ', 'SSL সার্টিফিকেট']
    },
    {
      title: 'পেমেন্ট গেটওয়ে ইন্টিগ্রেশন',
      description: 'বিকাশ, নগদ, রকেট, ভিসা, মাস্টারকার্ড এবং আরও অনেক পেমেন্ট পদ্ধতি গ্রহণ করুন।',
      icon: <DollarSign className="h-10 w-10 text-amber-500" />,
      benefits: ['মোবাইল ব্যাংকিং', 'ক্রেডিট কার্ড', 'কাস্টম পেমেন্ট মেথড']
    },
    {
      title: 'SEO অপটিমাইজেশন',
      description: 'সার্চ ইঞ্জিন র্যাঙ্কিং বাড়াতে বিল্ট-ইন SEO টুলস ব্যবহার করুন।',
      icon: <Search className="h-10 w-10 text-purple-500" />,
      benefits: ['কীওয়ার্ড অপটিমাইজেশন', 'মেটা ট্যাগ এডিটর', 'সাইট ম্যাপ জেনারেটর']
    },
    {
      title: 'মোবাইল অপটিমাইজেশন',
      description: 'সকল ডিভাইসে পারফেক্ট দেখাবে আপনার ওয়েবসাইট, মোবাইল থেকে ডেস্কটপ পর্যন্ত।',
      icon: <Smartphone className="h-10 w-10 text-red-500" />,
      benefits: ['রেসপন্সিভ লেআউট', 'টাচ অপটিমাইজেশন', 'ফাস্ট লোডিং']
    },
  ];

  const ecommerceFeatures = [
    { icon: <Box className="h-6 w-6 text-primary" />, name: "প্রোডাক্ট ম্যানেজমেন্ট" },
    { icon: <ShoppingCart className="h-6 w-6 text-blue-500" />, name: "শপিং কার্ট" },
    { icon: <CreditCard className="h-6 w-6 text-amber-500" />, name: "পেমেন্ট গেটওয়ে" },
    { icon: <Truck className="h-6 w-6 text-green-500" />, name: "শিপিং ম্যানেজমেন্ট" },
    { icon: <TrendingUp className="h-6 w-6 text-purple-500" />, name: "সেলস এনালিটিক্স" },
    { icon: <MessageCircle className="h-6 w-6 text-red-500" />, name: "কাস্টমার রিভিউ" },
    { icon: <Settings className="h-6 w-6 text-gray-500" />, name: "ইনভেন্টরি ম্যানেজমেন্ট" },
  ];

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    toast({
      title: "থিম সিলেক্টেড",
      description: `${themes.find(t => t.id === themeId)?.name} থিম সিলেক্ট করা হয়েছে।`,
    });
  };

  const handleContinue = () => {
    // Here you would typically save data and proceed to the next step
    toast({
      title: "অপেক্ষা করুন",
      description: "আপনার স্টোর সেটআপ হচ্ছে...",
    });
    setTimeout(() => {
      navigate('/create-store/dashboard');
    }, 1500);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">অনলাইন স্টোর সেটআপ</h1>
      </div>

      <Tabs defaultValue="setup" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Store className="h-4 w-4" /> সেটআপ
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Layout className="h-4 w-4" /> থিম
          </TabsTrigger>
          <TabsTrigger value="domain" className="flex items-center gap-2">
            <Globe className="h-4 w-4" /> ডোমেইন
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" /> প্রোডাক্ট
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ওয়েবসাইট সেটআপ করুন</CardTitle>
              <CardDescription>আপনার অনলাইন স্টোরের বেসিক তথ্য দিন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">স্টোরের নাম</Label>
                <Input id="store-name" placeholder="আপনার স্টোরের নাম লিখুন" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-description">স্টোরের বিবরণ</Label>
                <Input id="store-description" placeholder="আপনার স্টোর সম্পর্কে সংক্ষিপ্ত বিবরণ" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-category">স্টোরের ক্যাটাগরি</Label>
                <select 
                  id="store-category" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">সিলেক্ট করুন</option>
                  <option value="fashion">ফ্যাশন এবং ক্লোদিং</option>
                  <option value="electronics">ইলেকট্রনিক্স</option>
                  <option value="food">ফুড এবং গ্রোসারি</option>
                  <option value="health">হেলথ এবং বিউটি</option>
                  <option value="home">হোম এবং লাইফস্টাইল</option>
                  <option value="digital">ডিজিটাল প্রোডাক্ট</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-phone">মোবাইল নাম্বার</Label>
                <Input id="store-phone" placeholder="আপনার মোবাইল নাম্বার লিখুন" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="store-email">ইমেইল</Label>
                <Input id="store-email" type="email" placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setActiveTab("theme")}>
                পরবর্তী ধাপ
              </Button>
            </CardFooter>
          </Card>

          {/* E-commerce Features Showcase */}
          <div className="pt-8 pb-2">
            <h2 className="text-xl font-bold mb-2">অনলাইন স্টোরের ফিচারসমূহ</h2>
            <p className="text-muted-foreground mb-8">আপনার ব্যবসার জন্য সম্পূর্ণ ই-কমার্স সলিউশন</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Interactive Feature Showcase */}
          <div className="my-12 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">ই-কমার্স ফিচার সমূহ</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {ecommerceFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  {feature.icon}
                  <span className="mt-2 text-center text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Preview Section */}
          <div className="my-12">
            <h3 className="text-lg font-semibold mb-6">মোবাইল অপটিমাইজড ডিজাইন</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex-1 order-2 md:order-1">
                <h4 className="text-xl font-medium mb-4">সকল ডিভাইসে পারফেক্ট দেখাবে</h4>
                <p className="mb-4">আমাদের অনলাইন স্টোর সলিউশন সকল ডিভাইসের জন্য অপটিমাইজড - মোবাইল, ট্যাবলেট, এবং ডেস্কটপে সুন্দর দেখাবে।</p>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <Smartphone className="h-8 w-8 text-primary mb-2" />
                    <span className="text-sm">মোবাইল</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Tablet className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="text-sm">ট্যাবলেট</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Laptop className="h-8 w-8 text-purple-500 mb-2" />
                    <span className="text-sm">ডেস্কটপ</span>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>রেসপন্সিভ লেআউট</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>অটো ইমেজ অপটিমাইজেশন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>মোবাইল-ফ্রেন্ডলি নেভিগেশন</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex-1 order-1 md:order-2 mb-6 md:mb-0">
                <div className="relative mx-auto" style={{ width: '220px', height: '450px' }}>
                  <div className="absolute inset-0 bg-gray-800 rounded-[36px] overflow-hidden border-[12px] border-gray-800">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-lg z-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1561069934-eee225952461?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                      alt="Mobile preview" 
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>থিম সিলেক্ট করুন</CardTitle>
              <CardDescription>আপনার স্টোরের জন্য একটি ডিজাইন থিম বেছে নিন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {themes.map((theme) => (
                  <div 
                    key={theme.id}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedTheme === theme.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleThemeSelect(theme.id)}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={theme.image} 
                        alt={theme.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{theme.name}</h3>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                    </div>
                    {selectedTheme === theme.id && (
                      <div className="p-4 pt-0">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                          সিলেক্টেড
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("setup")}>
                পূর্ববর্তী
              </Button>
              <Button onClick={() => setActiveTab("domain")}>
                পরবর্তী
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ডোমেইন সেটআপ</CardTitle>
              <CardDescription>আপনার স্টোরের জন্য একটি ডোমেইন নাম বেছে নিন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="custom-domain" className="text-base font-medium">কাস্টম ডোমেইন</Label>
                  <p className="text-sm text-muted-foreground mb-2">আপনার নিজস্ব ডোমেইন নাম ব্যবহার করুন</p>
                  <div className="flex gap-2">
                    <Input id="custom-domain" placeholder="example.com" />
                    <Button>যাচাই করুন</Button>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <Label htmlFor="free-domain" className="text-base font-medium">ফ্রি সাবডোমেইন</Label>
                  <p className="text-sm text-muted-foreground mb-2">আমাদের ডোমেইনের অধীনে একটি ফ্রি সাবডোমেইন পান</p>
                  <div className="flex gap-0">
                    <Input id="free-domain" placeholder="yourstore" className="rounded-r-none" />
                    <div className="border rounded-r-md px-3 flex items-center bg-muted">
                      .reservio.app
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("theme")}>
                পূর্ববর্তী
              </Button>
              <Button onClick={() => setActiveTab("products")}>
                পরবর্তী
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>প্রোডাক্ট সেটআপ</CardTitle>
              <CardDescription>আপনার স্টোরে প্রোডাক্ট যোগ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">আপনার স্টোরে প্রোডাক্ট যোগ করতে প্রথমে সেটআপ সম্পন্ন করুন।</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Store className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">স্টোর সেটআপ</h3>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      সম্পন্ন
                    </Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Layout className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">থিম সিলেক্ট</h3>
                    <Badge variant="outline" className={`${selectedTheme ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                      {selectedTheme ? 'সম্পন্ন' : 'বাকি আছে'}
                    </Badge>
                  </div>
                  
                  <div className="border rounded-lg p-4 flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">ডোমেইন সেটআপ</h3>
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                      বাকি আছে
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("domain")}>
                পূর্ববর্তী
              </Button>
              <Button onClick={handleContinue}>
                স্টোর সেটআপ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateStore;
