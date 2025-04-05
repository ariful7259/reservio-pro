
import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Save,
  Lightbulb,
  HelpCircle,
  BarChart2,
  Mail,
  Share2,
  ImagePlus,
  FileText,
  MonitorSmartphone,
  Database,
  AlignLeft,
  CheckCircle,
  Circle,
  LoaderCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StorePreview from '@/components/store/StorePreview';
import ProductCatalogTemplate from '@/components/store/ProductCatalogTemplate';
import PaymentDemo from '@/components/store/PaymentDemo';
import MarketingTools from '@/components/store/MarketingTools';
import IndustryTemplates from '@/components/store/IndustryTemplates';
import StoreDashboardPreview from '@/components/store/StoreDashboardPreview';
import SuccessChecklist from '@/components/store/SuccessChecklist';
import CommunitySupport from '@/components/store/CommunitySupport';

const CreateStore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('setup');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    category: '',
    phone: '',
    email: '',
    domain: '',
    subdomain: '',
    savingProgress: false,
    setupComplete: false,
    themeComplete: false,
    domainComplete: false,
    productsComplete: false,
    marketingComplete: false,
    inventoryComplete: false
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showDemoProducts, setShowDemoProducts] = useState(false);
  const [showPaymentDemo, setShowPaymentDemo] = useState(false);
  const [showMarketingTools, setShowMarketingTools] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);

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
    { icon: <Mail className="h-6 w-6 text-indigo-500" />, name: "ইমেইল মার্কেটিং" },
    { icon: <BarChart2 className="h-6 w-6 text-pink-500" />, name: "রিপোর্টস" },
    { icon: <Share2 className="h-6 w-6 text-emerald-500" />, name: "সোশ্যাল মিডিয়া" },
    { icon: <ImagePlus className="h-6 w-6 text-yellow-500" />, name: "প্রোডাক্ট গ্যালারী" },
    { icon: <FileText className="h-6 w-6 text-cyan-500" />, name: "ইনভয়েসিং" },
  ];

  // Form schema for setup tab
  const setupFormSchema = z.object({
    name: z.string().min(2, {
      message: "স্টোরের নাম অবশ্যই ২ অক্ষরের বেশি হতে হবে",
    }),
    description: z.string().min(10, {
      message: "বিবরণ অবশ্যই ১০ অক্ষরের বেশি হতে হবে",
    }),
    category: z.string().min(1, {
      message: "একটি ক্যাটাগরি নির্বাচন করুন",
    }),
    phone: z.string().min(11, {
      message: "সঠিক মোবাইল নাম্বার দিন",
    }),
    email: z.string().email({
      message: "সঠিক ইমেইল ঠিকানা দিন",
    }),
  });

  // Setup form
  const setupForm = useForm<z.infer<typeof setupFormSchema>>({
    resolver: zodResolver(setupFormSchema),
    defaultValues: {
      name: storeData.name,
      description: storeData.description,
      category: storeData.category,
      phone: storeData.phone,
      email: storeData.email,
    },
  });

  // Effect to auto-save form data
  useEffect(() => {
    if (autosaveEnabled) {
      const saveTimeout = setTimeout(() => {
        saveProgress();
      }, 5000);
      return () => clearTimeout(saveTimeout);
    }
  }, [storeData]);

  const saveProgress = () => {
    if (!autosaveEnabled) return;
    
    setStoreData(prev => ({
      ...prev,
      savingProgress: true
    }));

    // Simulate saving to server
    setTimeout(() => {
      setStoreData(prev => ({
        ...prev,
        savingProgress: false
      }));
      
      toast({
        title: "প্রগতি সেভ হয়েছে",
        description: "আপনার পরিবর্তনগুলো সেভ করা হয়েছে।",
      });
    }, 1000);
  };

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    setStoreData(prev => ({
      ...prev,
      themeComplete: true
    }));
    
    toast({
      title: "থিম সিলেক্টেড",
      description: `${themes.find(t => t.id === themeId)?.name} থিম সিলেক্ট করা হয়েছে।`,
    });
  };

  const handleSetupSubmit = (values: z.infer<typeof setupFormSchema>) => {
    setStoreData(prev => ({
      ...prev,
      name: values.name,
      description: values.description,
      category: values.category,
      phone: values.phone,
      email: values.email,
      setupComplete: true
    }));

    toast({
      title: "সেটআপ সম্পন্ন",
      description: "মৌলিক তথ্য সংরক্ষণ করা হয়েছে।",
    });

    setActiveTab("theme");
  };

  const handleDomainSubmit = () => {
    setStoreData(prev => ({
      ...prev,
      domainComplete: true
    }));

    toast({
      title: "ডোমেইন সেটিংস সংরক্ষণ করা হয়েছে",
      description: "আপনার ডোমেইন কনফিগারেশন সেভ করা হয়েছে।",
    });

    setActiveTab("products");
  };

  const handleAddDemoProducts = () => {
    setShowDemoProducts(true);
    
    setTimeout(() => {
      setStoreData(prev => ({
        ...prev,
        productsComplete: true
      }));

      toast({
        title: "ডেমো প্রোডাক্ট যোগ করা হয়েছে",
        description: "আপনার স্টোরে ১০টি ডেমো প্রোডাক্ট যোগ করা হয়েছে।",
      });
    }, 1500);
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

  // Progress calculation
  const calculateProgress = () => {
    const total = 5; // Total steps
    let completed = 0;
    
    if (storeData.setupComplete) completed++;
    if (storeData.themeComplete) completed++;
    if (storeData.domainComplete) completed++;
    if (storeData.productsComplete) completed++;
    if (storeData.marketingComplete) completed++;

    return Math.floor((completed / total) * 100);
  };

  return (
    <div className="container px-4 pt-16 pb-20">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">সেটআপ প্রগতি</h3>
          <span className="text-sm font-medium">{calculateProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        {storeData.savingProgress && (
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <LoaderCircle className="h-3 w-3 animate-spin" />
            <span>প্রগতি সেভ হচ্ছে...</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">অনলাইন স্টোর সেটআপ</h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowPreview(true)}
          >
            <MonitorSmartphone className="h-4 w-4" />
            <span>প্রিভিউ</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowChecklist(true)}
          >
            <CheckCircle className="h-4 w-4" />
            <span>চেকলিস্ট</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={saveProgress}
          >
            <Save className="h-4 w-4" />
            <span>সেভ করুন</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowSupport(true)}
          >
            <HelpCircle className="h-4 w-4" />
            <span>সাহায্য</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="setup" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-5 mb-6">
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
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> মার্কেটিং
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ওয়েবসাইট সেটআপ করুন</CardTitle>
              <CardDescription>আপনার অনলাইন স্টোরের বেসিক তথ্য দিন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...setupForm}>
                <form onSubmit={setupForm.handleSubmit(handleSetupSubmit)} className="space-y-4">
                  <FormField
                    control={setupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>স্টোরের নাম</FormLabel>
                        <FormControl>
                          <Input placeholder="আপনার স্টোরের নাম লিখুন" {...field} />
                        </FormControl>
                        <FormDescription>
                          এই নামটি আপনার স্টোরের প্রধান লোগো হিসেবে দেখা যাবে।
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={setupForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>স্টোরের বিবরণ</FormLabel>
                        <FormControl>
                          <Input placeholder="আপনার স্টোর সম্পর্কে সংক্ষিপ্ত বিবরণ" {...field} />
                        </FormControl>
                        <FormDescription>
                          SEO অপটিমাইজেশন এর জন্য বিবরণ গুরুত্বপূর্ণ।
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={setupForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>স্টোরের ক্যাটাগরি</FormLabel>
                        <select 
                          {...field}
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
                        <FormDescription>
                          আপনার প্রধান ব্যবসার ক্যাটেগরি সিলেক্ট করুন।
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={setupForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>মোবাইল নাম্বার</FormLabel>
                        <FormControl>
                          <Input placeholder="আপনার মোবাইল নাম্বার লিখুন" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={setupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ইমেইল</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">পরবর্তী ধাপ</Button>
                </form>
              </Form>
            </CardContent>
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">থিম কাস্টমাইজেশন</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>প্রাইমারি কালার</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                      <div className="w-6 h-6 rounded-full bg-green-600"></div>
                      <div className="w-6 h-6 rounded-full bg-red-600"></div>
                      <div className="w-6 h-6 rounded-full bg-purple-600"></div>
                      <div className="w-6 h-6 rounded-full bg-yellow-600"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ফন্ট স্টাইল</Label>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-2 border rounded text-sm">সূর্যমুখী</div>
                      <div className="px-3 py-2 border rounded text-sm">হিন্দ সিলেট</div>
                      <div className="px-3 py-2 border rounded text-sm">নিকোশ</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>হেডার স্টাইল</Label>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-2 border rounded text-sm">স্টাইল ১</div>
                      <div className="px-3 py-2 border rounded text-sm">স্টাইল ২</div>
                      <div className="px-3 py-2 border rounded text-sm">স্টাইল ৩</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("setup")}>
                পূর্ববর্তী
              </Button>
              <Button 
                onClick={() => setActiveTab("domain")} 
                disabled={!selectedTheme}
              >
                পরবর্তী
              </Button>
            </CardFooter>
          </Card>
          
          {/* Theme Preview Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>থিম প্রিভিউ</CardTitle>
              <CardDescription>আপনার নির্বাচিত থিমের প্রিভিউ দেখুন</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-0 overflow-hidden">
              {selectedTheme ? (
                <div className="w-full aspect-video max-h-[500px]">
                  <img 
                    src={themes.find(t => t.id === selectedTheme)?.image} 
                    alt="Theme preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Layout className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">থিম নির্বাচন করা হয়নি</h3>
                  <p className="text-muted-foreground max-w-md">
                    প্রিভিউ দেখতে উপরে থেকে একটি থিম নির্বাচন করুন
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>ইন্ডাস্ট্রি-স্পেসিফিক টেম্পলেট</CardTitle>
              <CardDescription>আপনার ব্যবসার ধরন অনুযায়ী বিশেষ টেম্পলেট</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => setShowTemplates(true)}>টেম্পলেট দেখুন</Button>
              </div>
            </CardContent>
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
                    <Input 
                      id="custom-domain" 
                      placeholder="example.com"
                      value={storeData.domain}
                      onChange={(e) => setStoreData(prev => ({...prev, domain: e.target.value}))} 
                    />
                    <Button>যাচাই করুন</Button>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div>
                  <Label htmlFor="free-domain" className="text-base font-medium">ফ্রি সাবডোমেইন</Label>
                  <p className="text-sm text-muted-foreground mb-2">আমাদের ডোমেইনের অধীনে একটি ফ্রি সাবডোমেইন পান</p>
                  <div className="flex gap-0">
                    <Input 
                      id="free-domain" 
                      placeholder="yourstore" 
                      className="rounded-r-none"
                      value={storeData.subdomain}
                      onChange={(e) => setStoreData(prev => ({...prev, subdomain: e.target.value}))}
                    />
                    <div className="border rounded-r-md px-3 flex items-center bg-muted">
                      .reservio.app
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Card className="bg-muted/40">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium mb-1">বেস্ট প্র্যাকটিস</h3>
                          <p className="text-sm text-muted-foreground">
                            আপনার ব্র্যান্ডের নাম বা কীওয়ার্ড সহ একটি সহজে মনে রাখার মতো ডোমেইন নাম নির্বাচন করুন। বাংলা শব্দের ক্ষেত্রে সেগুলির ইংরেজি প্রতিশব্দ ব্যবহার করুন।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h3 className="font-medium flex items-center gap-2 mb-2 text-blue-700">
                    <Globe className="h-4 w-4" />
                    DNS সেটিংস
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    আপনার কাস্টম ডোমেইন ব্যবহার করতে, আপনার ডোমেইন প্রোভাইডারের DNS সেটিংস আপডেট করতে হবে:
                  </p>
                  <div className="bg-white p-3 rounded border border-blue-200 font-mono text-sm">
                    <div className="mb-2">
                      <span className="text-muted-foreground">CNAME</span> <span className="text-blue-600">www</span> <span className="text-purple-600">stores.reservio.app</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">A</span> <span className="text-blue-600">@</span> <span className="text-purple-600">192.168.1.1</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("theme")}>
                পূর্ববর্তী
              </Button>
              <Button onClick={handleDomainSubmit}>
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
                <p className="mb-4">আপনার স্টোরে প্রোডাক্ট যোগ করার বিভিন্ন উপায় রয়েছে।</p>
                
                {!storeData.productsComplete ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-white hover:shadow-md transition-all cursor-pointer" onClick={handleAddDemoProducts}>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                          <Box className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h3 className="font-medium mb-2">ডেমো প্রোডাক্ট</h3>
                        <p className="text-sm text-muted-foreground">
                          প্রোডাক্ট যোগ করে দেখতে ডেমো প্রোডাক্ট ব্যবহার করুন
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white hover:shadow-md transition-all cursor-pointer" onClick={() => setShowDemoProducts(true)}>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <AlignLeft className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="font-medium mb-2">ম্যানুয়ালি যোগ</h3>
                        <p className="text-sm text-muted-foreground">
                          একটি একটি করে ম্যানুয়ালি প্রোডাক্ট তথ্য যোগ করুন
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-white hover:shadow-md transition-all cursor-pointer">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                          <Database className="h-8 w-8 text-amber-600" />
                        </div>
                        <h3 className="font-medium mb-2">CSV আপলোড</h3>
                        <p className="text-sm text-muted-foreground">
                          CSV ফাইল ব্যবহার করে একসাথে অনেক প্রোডাক্ট আপলোড করুন
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="mb-6">
                    <Card className="bg-green-50 border-green-200 mb-4">
                      <CardContent className="p-4 flex items-center gap-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="font-medium text-green-800">ডেমো প্রোডাক্ট যোগ করা হয়েছে</h3>
                          <p className="text-sm text-green-700">আপনার স্টোরে ১০টি ডেমো প্রোডাক্ট যোগ করা হয়েছে</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Button variant="outline" onClick={() => setShowDemoProducts(true)}>প্রোডাক্টস দেখুন</Button>
                  </div>
                )}
                
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
                    <Badge variant="outline" className={`${storeData.domainComplete ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                      {storeData.domainComplete ? 'সম্পন্ন' : 'বাকি আছে'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">প্রোডাক্ট ক্যাটালগ টেম্পলেট</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">ফ্যাশন লেআউট</h4>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">ইলেকট্রনিকস লেআউট</h4>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">ফুড লেআউট</h4>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer">
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium">ডিজিটাল লেআউট</h4>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button onClick={() => setShowPaymentDemo(true)} variant="outline">পেমেন্ট গেটওয়ে ডেমো দেখুন</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("domain")}>
                পূর্ববর্তী
              </Button>
              <Button 
                onClick={() => setActiveTab("marketing")}
                disabled={!storeData.productsComplete}
              >
                পরবর্তী
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="marketing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>মার্কেটিং এবং সেলস টুলস</CardTitle>
              <CardDescription>আপনার অনলাইন স্টোরের মার্কেটিং প্ল্যান সেটআপ করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => setShowMarketingTools(true)}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium">ইমেইল মার্কেটিং</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      অটোমেটিক ইমেইল ক্যাম্পেইন টুলস
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => setShowMarketingTools(true)}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                      <Share2 className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="font-medium">সোশ্যাল মিডিয়া</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      অটোমেটিক পোস্টিং টুলস
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => setShowDashboardPreview(true)}>
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                      <BarChart2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-medium">এনালিটিক্স</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      সেলস এবং ট্রাফিক ট্র্যাকিং
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">এআই-পাওয়ার্ড কন্টেন্ট জেনারেশন</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>প্রোডাক্ট বিবরণ জেনারেশন</Label>
                    <div className="flex gap-2">
                      <Input placeholder="প্রোডাক্টের নাম লিখুন..." />
                      <Button>জেনারেট</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>SEO অপটিমাইজেশন</Label>
                    <div className="flex gap-2">
                      <Input placeholder="আপনার কীওয়ার্ড লিখুন..." />
                      <Button>অপটিমাইজ</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>সোশ্যাল মিডিয়া পোস্ট</Label>
                    <div className="flex gap-2">
                      <Input placeholder="প্রোডাক্ট বা অফার সম্পর্কে লিখুন..." />
                      <Button>পোস্ট জেনারেট</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  className="w-full mb-2"
                  onClick={() => {
                    setStoreData(prev => ({
                      ...prev,
                      marketingComplete: true
                    }));
                    
                    toast({
                      title: "মার্কেটিং টুলস সেটআপ করা হয়েছে",
                      description: "আপনার স্টোরের জন্য মার্কেটিং টুলস সেটআপ সম্পন্ন হয়েছে।",
                    });
                  }}
                >
                  মার্কেটিং টুলস সেটআপ করুন
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  আপনার অ্যাকাউন্টে আমরা বেসিক মার্কেটিং টুলস সেটআপ করব
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("products")}>
                পূর্ববর্তী
              </Button>
              <Button onClick={handleContinue}>
                স্টোর সেটআপ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Store Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>স্টোর প্রিভিউ</DialogTitle>
            <DialogDescription>
              আপনার স্টোর কেমন দেখাবে তার একটি প্রিভিউ দেখুন
            </DialogDescription>
          </DialogHeader>
          <div className="h-[70vh] overflow-auto">
            <StorePreview 
              theme={selectedTheme || 'minimal'}
              storeName={storeData.name || 'আমার স্টোর'}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>বন্ধ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Catalog Dialog */}
      <Dialog open={showDemoProducts} onOpenChange={setShowDemoProducts}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>ডেমো প্রোডাক্টস</DialogTitle>
            <DialogDescription>
              আপনার স্টোরের জন্য ডেমো প্রোডাক্ট সেটআপ
            </DialogDescription>
          </DialogHeader>
          <ProductCatalogTemplate />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDemoProducts(false)}>বন্ধ করুন</Button>
            {!storeData.productsComplete && (
              <Button onClick={handleAddDemoProducts}>ডেমো প্রোডাক্ট যোগ করুন</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Gateway Demo */}
      <Dialog open={showPaymentDemo} onOpenChange={setShowPaymentDemo}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>পেমেন্ট গেটওয়ে ডেমো</DialogTitle>
            <DialogDescription>
              আপনার স্টোরে যে পেমেন্ট পদ্ধতি থাকবে তার একটি প্রিভিউ
            </DialogDescription>
          </DialogHeader>
          <PaymentDemo />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDemo(false)}>বন্ধ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Marketing Tools Dialog */}
      <Dialog open={showMarketingTools} onOpenChange={setShowMarketingTools}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>মার্কেটিং টুলস</DialogTitle>
            <DialogDescription>
              আপনার বিজনেসকে বাড়াতে মার্কেটিং টুল সেটআপ করুন
            </DialogDescription>
          </DialogHeader>
          <MarketingTools />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMarketingTools(false)}>বন্ধ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Industry Templates Dialog */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>ইন্ডাস্ট্রি-স্পেসিফিক টেম্পলেট</DialogTitle>
            <DialogDescription>
              আপনার ব্যবসার ধরন অনুযায়ী বিশেষ টেম্পলেট
            </DialogDescription>
          </DialogHeader>
          <IndustryTemplates />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplates(false)}>বন্ধ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dashboard Preview Dialog */}
      <Dialog open={showDashboardPreview} onOpenChange={setShowDashboardPreview}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>ড্যাশবোর্ড প্রিভিউ</DialogTitle>
            <DialogDescription>
              আপনার স্টোর ড্যাশবোর্ড কেমন হবে তার একটি ঝলক
            </DialogDescription>
          </DialogHeader>
          <StoreDashboardPreview />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDashboardPreview(false)}>বন্ধ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Success Checklist Dialog */}
      <Dialog open={showChecklist} onOpenChange={setShowChecklist}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>সাকসেস চেকলিস্ট</DialogTitle>
            <DialogDescription>
              আপনার স্টোর সফলভাবে লঞ্চ করার জন্য চেকলিস্ট
            </DialogDescription>
          </DialogHeader>
          <SuccessChecklist />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChecklist(false)}>বন্ধ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Community Support Dialog */}
      <Dialog open={showSupport} onOpenChange={setShowSupport}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>সাপোর্ট এবং সাহায্য</DialogTitle>
            <DialogDescription>
              আপনার স্টোর সেটআপ করতে সাহায্য লাগলে
            </DialogDescription>
          </DialogHeader>
          <CommunitySupport />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSupport(false)}>বন্ধ করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateStore;
