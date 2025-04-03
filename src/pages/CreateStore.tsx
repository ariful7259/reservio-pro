
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Globe, 
  Layout, 
  PenTool, 
  ShoppingBag, 
  CreditCard, 
  Search, 
  Settings,
  Plus,
  Check,
  ChevronRight,
  DollarSign,
  Store,
  ArrowRight,
  ChevronDown,
  SmartphoneIcon,
  Code,
  Smartphone,
  MousePointer,
  BarChart,
  Layers,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const CreateStore = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('templates');
  const [domainName, setDomainName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [showFeatureDetails, setShowFeatureDetails] = useState(false);

  // Website templates
  const templates = [
    {
      id: 1,
      name: "ওয়ানপেজ স্টোর",
      image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1474&auto=format&fit=crop",
      category: "ই-কমার্স",
      price: "৳৫,০০০",
      features: ["প্রোডাক্ট লিস্টিং", "পেমেন্ট গেটওয়ে", "মোবাইল রেসপন্সিভ"],
      isPopular: true
    },
    {
      id: 2,
      name: "ডিজিটাল প্রোডাক্ট শোকেস",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
      category: "ডিজিটাল প্রোডাক্ট",
      price: "৳৭,০০০",
      features: ["ফাইল ডাউনলোড", "সাবস্ক্রিপশন মডেল", "এনালিটিক্স"],
      isPopular: false
    },
    {
      id: 3,
      name: "পোর্টফোলিও ওয়েবসাইট",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1469&auto=format&fit=crop",
      category: "পোর্টফোলিও",
      price: "৳৪,০০০",
      features: ["প্রজেক্ট শোকেস", "কন্টাক্ট ফর্ম", "ব্লগ সেকশন"],
      isPopular: false
    },
    {
      id: 4,
      name: "মাল্টি-ভেন্ডর মার্কেটপ্লেস",
      image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1470&auto=format&fit=crop",
      category: "মার্কেটপ্লেস",
      price: "৳১২,০০০",
      features: ["ভেন্ডর রেজিস্ট্রেশন", "কমিশন সিস্টেম", "অর্ডার ম্যানেজমেন্ট"],
      isPopular: true
    },
    {
      id: 5,
      name: "সার্ভিস বুকিং সাইট",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop",
      category: "সার্ভিস",
      price: "৳৮,০০০",
      features: ["অ্যাপয়েন্টমেন্ট বুকিং", "পেমেন্ট প্রসেসিং", "ক্যালেন্ডার ইন্টিগ্রেশন"],
      isPopular: false
    },
    {
      id: 6,
      name: "ই-লার্নিং প্ল্যাটফর্ম",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1374&auto=format&fit=crop",
      category: "ই-লার্নিং",
      price: "৳১০,০০০",
      features: ["কোর্স স্ট্রাকচার", "ভিডিও প্লেয়ার", "কুইজ সিস্টেম"],
      isPopular: false
    },
  ];

  // Pricing plans
  const pricingPlans = [
    {
      id: 1,
      name: "বেসিক",
      price: "৳১০,০০০/বছর",
      features: [
        "৫ পেজ ওয়েবসাইট",
        "৫০ প্রোডাক্ট লিস্টিং",
        "বিকাশ পেমেন্ট ইন্টিগ্রেশন",
        "মোবাইল রেসপন্সিভ ডিজাইন",
        "বেসিক SEO অপটিমাইজেশন",
        "১GB স্টোরেজ"
      ],
      isPopular: false
    },
    {
      id: 2,
      name: "অ্যাডভান্সড",
      price: "৳২০,০০০/বছর",
      features: [
        "১০ পেজ ওয়েবসাইট",
        "২০০ প্রোডাক্ট লিস্টিং",
        "মাল্টিপল পেমেন্ট ইন্টিগ্রেশন",
        "এডভান্সড SEO অপটিমাইজেশন",
        "ক্যাটালগ ম্যানেজমেন্ট",
        "৫GB স্টোরেজ",
        "ফ্রি ১টি ডোমেইন"
      ],
      isPopular: true
    },
    {
      id: 3,
      name: "প্রো",
      price: "৳৩৫,০০০/বছর",
      features: [
        "আনলিমিটেড পেজ",
        "আনলিমিটেড প্রোডাক্ট লিস্টিং",
        "প্রিমিয়াম পেমেন্ট ইন্টিগ্রেশন (স্ট্রাইপ, পেপাল)",
        "এডভান্সড এনালিটিক্স ড্যাশবোর্ড",
        "ইনভেন্টরি ম্যানেজমেন্ট",
        "কাস্টম ফিচার ডেভেলপমেন্ট",
        "২০GB স্টোরেজ",
        "ফ্রি ২টি ডোমেইন"
      ],
      isPopular: false
    }
  ];

  // Domains section - sample domain extensions
  const domainExtensions = ['.com', '.net', '.org', '.bd', '.shop', '.store', '.online'];

  // Features list for the Features section
  const storeFeatures = [
    {
      icon: <Layout className="h-8 w-8 text-primary" />,
      title: "স্মার্ট থিম বিল্ডার",
      description: "ড্র্যাগ এন্ড ড্রপ ইন্টারফেস ব্যবহার করে আপনার সাইট ডিজাইন করুন, কোডিং জ্ঞান ছাড়াই।",
      details: [
        "ইন্টুইটিভ ড্র্যাগ-এন্ড-ড্রপ ইন্টারফেস",
        "৫০+ প্রি-ডিজাইনড সেকশন",
        "রিয়েল-টাইম ভিজুয়াল এডিটিং",
        "রেসপন্সিভ প্রিভিউ (মোবাইল, ট্যাবলেট, ডেস্কটপ)",
        "হান্ড্রেডস অফ কাস্টমাইজেশন অপশন"
      ],
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      title: "অ্যাডভান্সড ই-কমার্স টুলস",
      description: "প্রোডাক্ট ক্যাটালগ, শপিং কার্ট, এবং পেমেন্ট প্রসেসিং সিস্টেম অন্তর্ভুক্ত।",
      details: [
        "আনলিমিটেড প্রোডাক্ট ক্যাটালগ",
        "মাল্টি-কারেন্সি সাপোর্ট",
        "ডিসকাউন্ট এবং প্রোমো কোড সিস্টেম",
        "ইনভেন্টরি ম্যানেজমেন্ট",
        "অটোমেটিক ট্যাক্স ক্যালকুলেশন"
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1470&auto=format&fit=crop"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "কাস্টম ডোমেইন",
      description: "আপনার ব্র্যান্ডের জন্য একটি অনন্য ডোমেইন নাম নিবন্ধন করুন বা আপনার বিদ্যমান ডোমেইন ব্যবহার করুন।",
      details: [
        "ডোমেইন রেজিস্ট্রেশন সার্ভিস",
        "কাস্টম ডোমেইন কনফিগারেশন",
        "ফ্রি SSL সার্টিফিকেট",
        "ডোমেইন ম্যানেজমেন্ট টুল",
        "আনলিমিটেড সাবডোমেইন"
      ],
      image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=1470&auto=format&fit=crop"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-primary" />,
      title: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
      description: "বিকাশ, নগদ, রকেট, ভিসা, মাস্টারকার্ড এবং আরও অনেক পেমেন্ট পদ্ধতি গ্রহণ করুন।",
      details: [
        "৩০+ দেশীয় ও আন্তর্জাতিক পেমেন্ট গেটওয়ে",
        "সিকিউর পেমেন্ট প্রসেসিং",
        "বিকাশ, নগদ, রকেট ইন্টিগ্রেশন",
        "ভিসা, মাস্টারকার্ড, আমেরিকান এক্সপ্রেস",
        "অটোমেটিক রিফান্ড প্রসেসিং"
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop"
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: "SEO অপটিমাইজেশন",
      description: "সার্চ ইঞ্জিন র্যাঙ্কিং বাড়াতে বিল্ট-ইন SEO টুলস ব্যবহার করুন।",
      details: [
        "অটোমেটিক সাইটম্যাপ জেনারেশন",
        "কি-ওয়ার্ড অপটিমাইজেশন টুল",
        "মেটা ট্যাগ কাস্টমাইজেশন",
        "কাস্টম URL স্ট্রাকচার",
        "পেইজ স্পিড অপটিমাইজেশন"
      ],
      image: "https://images.unsplash.com/photo-1571750008453-307bb0f440ec?q=80&w=1470&auto=format&fit=crop"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "মোবাইল অপটিমাইজেশন",
      description: "সকল ডিভাইসে পারফেক্ট দেখাবে আপনার ওয়েবসাইট, মোবাইল থেকে ডেস্কটপ পর্যন্ত।",
      details: [
        "অটোমেটিক রেসপন্সিভ ডিজাইন",
        "টাচ-ফ্রেন্ডলি ইন্টারফেস",
        "এক্সিলারেটেড মোবাইল পেজেস (AMP)",
        "মোবাইল-ফাস্ট লোডিং অপটিমাইজেশন",
        "প্রগ্রেসিভ ওয়েব অ্যাপ ফিচার"
      ],
      image: "https://images.unsplash.com/photo-1526406915894-7bcd65f60845?q=80&w=1524&auto=format&fit=crop"
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "কিভাবে আমি আমার নিজস্ব ওয়েবসাইট শুরু করতে পারি?",
      answer: "১টি থিম বেছে নিন, কাস্টমাইজ করুন, আপনার ডোমেইন সেট করুন, এবং আপনার পণ্য বা সার্ভিস যোগ করুন। আমাদের প্ল্যাটফর্ম সম্পূর্ণ নো-কোড সলিউশন অফার করে যাতে আপনি সহজেই শুরু করতে পারেন।"
    },
    {
      question: "আমার ওয়েবসাইটের জন্য হোস্টিং কি আলাদাভাবে কিনতে হবে?",
      answer: "না, আমাদের সকল প্ল্যানে হোস্টিং অন্তর্ভুক্ত। আপনাকে শুধু একটি প্ল্যান বেছে নিতে হবে এবং আমরা সবকিছু সেটআপ করে দিব, কোন অতিরিক্ত হোস্টিং ফি লাগবে না।"
    },
    {
      question: "আমি কি আমার বিদ্যমান ডোমেইন ব্যবহার করতে পারি?",
      answer: "হ্যাঁ, আপনি আপনার বিদ্যমান ডোমেইন ব্যবহার করতে পারেন। আমরা আপনাকে DNS সেটিংস আপডেট করার জন্য সাহায্য করব। অথবা, আপনি আমাদের মাধ্যমে একটি নতুন ডোমেইন কিনতে পারেন।"
    },
    {
      question: "আমি কি নিজে ওয়েবসাইট ডিজাইন করতে পারব?",
      answer: "অবশ্যই! আমাদের থিম বিল্ডার আপনাকে সম্পূর্ণ নিয়ন্ত্রণ দেয়। কোন কোডিং জ্ঞান ছাড়াই ড্র্যাগ-এন্ড-ড্রপ এডিটর ব্যবহার করে আপনি আপনার ওয়েবসাইট কাস্টমাইজ করতে পারবেন।"
    },
    {
      question: "আমি কোন প্ল্যান বেছে নেব?",
      answer: "এটি নির্ভর করে আপনার প্রয়োজনের উপর। বেসিক প্ল্যান একটি সাধারণ ওয়েবসাইট বা ছোট ই-কমার্স স্টোরের জন্য উপযুক্ত। বড় ব্যবসার জন্য আমাদের অ্যাডভান্সড বা প্রো প্ল্যান বেশি উপযুক্ত হবে।"
    }
  ];

  const handleDomainSearch = () => {
    if (!domainName) {
      toast({
        title: "অনুগ্রহ করে একটি ডোমেইন নাম লিখুন",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "ডোমেইন খোঁজা হচ্ছে",
      description: `${domainName}.com অনুসন্ধান করা হচ্ছে...`,
    });
    
    // Simulate domain search
    setTimeout(() => {
      toast({
        title: "ডোমেইন পাওয়া গেছে!",
        description: `${domainName}.com উপলব্ধ আছে। এখনই নিবন্ধন করুন।`,
      });
    }, 1500);
  };

  const handleSelectTemplate = (id: number) => {
    setSelectedTemplate(id);
    toast({
      title: "থিম নির্বাচিত হয়েছে",
      description: "আপনার থিম নির্বাচিত হয়েছে। পরবর্তী ধাপে যেতে ক্লিক করুন।",
    });
  };

  const handleSelectPlan = (id: number) => {
    toast({
      title: "প্ল্যান নির্বাচিত হয়েছে",
      description: "আপনার প্ল্যান নির্বাচিত হয়েছে। চেকআউট পেজে যাওয়ার জন্য ধন্যবাদ।",
    });
  };

  const handleStartFreeTrial = () => {
    toast({
      title: "ফ্রি ট্রায়াল শুরু হয়েছে!",
      description: "আপনার ১৫ দিনের ফ্রি ট্রায়াল শুরু হয়েছে। শুভেচ্ছা!",
    });
  };

  const handleViewFeatureDetails = (title: string) => {
    setSelectedFeature(title);
    setShowFeatureDetails(true);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12 mt-4">
        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">নতুন ফিচার</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          আপনার অনলাইন স্টোর তৈরি করুন
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-8">
          ওয়েবসাইট ডিজাইন, হোস্টিং, ডোমেইন, এবং ই-কমার্স ফিচার - সবকিছু এক জায়গায়। কোডিং জ্ঞান ছাড়াই আপনার অনলাইন বিজনেস শুরু করুন।
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" onClick={handleStartFreeTrial}>
            <Rocket className="mr-2 h-5 w-5" />
            ১৫ দিনের ফ্রি ট্রায়াল শুরু করুন
          </Button>
          <Button size="lg" variant="outline">
            ডেমো দেখুন <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Domain Search Section */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle className="text-2xl">আপনার ব্র্যান্ডের জন্য একটি ডোমেইন নাম নিবন্ধন করুন</CardTitle>
          <CardDescription>
            আপনার ব্যবসার জন্য একটি ইউনিক ডোমেইন নাম খুঁজুন এবং নিবন্ধন করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Input 
                type="text" 
                placeholder="আপনার ডোমেইন নাম লিখুন" 
                className="pr-16 text-lg h-12"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <select className="h-full bg-transparent text-muted-foreground pr-7 pl-2 border-l">
                  {domainExtensions.map((ext) => (
                    <option key={ext} value={ext}>{ext}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button onClick={handleDomainSearch} className="w-full md:w-auto whitespace-nowrap h-12 px-8">
              <Search className="mr-2 h-5 w-5" />
              ডোমেইন খুঁজুন
            </Button>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {domainExtensions.map((ext) => (
              <div key={ext} className="flex justify-between items-center p-3 border rounded-lg">
                <span>{ext}</span>
                <Badge variant="outline">৳৯৫০/বছর</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Selection & Pricing */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">ওয়েবসাইট সেটআপ করুন</h2>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center items-center mb-8">
            <TabsList className="mx-auto">
              <TabsTrigger value="templates" className="px-6">থিম বেছে নিন</TabsTrigger>
              <TabsTrigger value="pricing" className="px-6">প্ল্যান বেছে নিন</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className={`overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`}
                  onClick={() => handleSelectTemplate(template.id)}>
                  <div className="relative aspect-video">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="object-cover w-full h-full"
                    />
                    {template.isPopular && (
                      <Badge className="absolute top-2 right-2 bg-primary">জনপ্রিয়</Badge>
                    )}
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Check className="h-12 w-12 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <span className="font-bold text-primary">{template.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {template.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{feature}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              {selectedTemplate && (
                <Button size="lg" onClick={() => setActiveTab('pricing')}>
                  পরবর্তী ধাপে যান <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pricing">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => (
                <Card key={plan.id} className={`overflow-hidden border ${plan.isPopular ? 'border-primary' : ''}`}>
                  <CardHeader className={`pb-4 ${plan.isPopular ? 'bg-primary/10' : ''}`}>
                    {plan.isPopular && (
                      <Badge className="w-fit mb-2 bg-primary">সর্বাধিক জনপ্রিয়</Badge>
                    )}
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={plan.isPopular ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan.id)}
                    >
                      {plan.isPopular ? 'এখনই শুরু করুন' : 'প্ল্যান বেছে নিন'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Enhanced Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">অনলাইন স্টোরের ফিচারসমূহ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {storeFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="flex flex-col border hover:shadow-md transition-all overflow-hidden hover:border-primary/50"
            >
              <div className="p-6 flex-grow">
                <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="p-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex justify-between items-center"
                  onClick={() => handleViewFeatureDetails(feature.title)}
                >
                  <span>বিস্তারিত দেখুন</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Feature Detail Modal - Triggered by button click */}
        {showFeatureDetails && selectedFeature && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowFeatureDetails(false)}>
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {storeFeatures.filter(f => f.title === selectedFeature).map((feature, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowFeatureDetails(false)}>
                      <span className="sr-only">Close</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-muted-foreground mb-6">{feature.description}</p>
                      <div className="space-y-4">
                        <h4 className="font-semibold">বৈশিষ্ট্যসমূহ:</h4>
                        <ul className="space-y-3">
                          {feature.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <Button className="w-full mt-4">
                          এখনই শুরু করুন <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Interactive Feature Showcase */}
        <div className="mt-12 bg-gradient-to-b from-primary/5 to-primary/0 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-primary">ড্র্যাগ এন্ড ড্রপ ইন্টারফেস</Badge>
              <h3 className="text-2xl font-bold mb-4">কোডিং জ্ঞান ছাড়াই আপনার নিজস্ব ওয়েবসাইট তৈরি করুন</h3>
              <p className="text-muted-foreground mb-6">
                ইন্টুইটিভ ড্র্যাগ-এন্ড-ড্রপ ইন্টারফেস ব্যবহার করে মিনিটের মধ্যে আপনার ওয়েবসাইট ডিজাইন করুন।
                প্রি-ডিজাইনড টেমপ্লেট এবং কম্পোনেন্ট থেকে বেছে নিন, আপনার পছন্দমত কাস্টমাইজ করুন, এবং লাইভ দেখুন।
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5 text-primary" />
                  <span>সহজ ইন্টারফেস</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <span>১০০+ কম্পোনেন্ট</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span>মোবাইল অপটিমাইজড</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span>কোড না লিখেই</span>
                </div>
              </div>
              <Button className="w-fit">
                ইন্টারফেস দেখুন <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <div className="relative z-10 border bg-white shadow-lg rounded-lg overflow-hidden transform rotate-2 hover:rotate-0 transition-transform">
                <div className="h-8 bg-gray-100 border-b flex items-center px-4 gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop" 
                  alt="ড্র্যাগ এন্ড ড্রপ ইন্টারফেস"
                  className="w-full rounded-b-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 border bg-white shadow-lg rounded-lg overflow-hidden w-24 h-24 z-0">
                <div className="p-2">
                  <ShoppingCart className="h-8 w-8 text-primary mx-auto" />
                  <p className="text-xs text-center mt-1">শপিং কার্ট</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 border bg-white shadow-lg rounded-lg overflow-hidden w-24 h-24 z-0">
                <div className="p-2">
                  <BarChart className="h-8 w-8 text-primary mx-auto" />
                  <p className="text-xs text-center mt-1">এনালিটিক্স</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* E-Commerce Features Showcase */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1470&auto=format&fit=crop" 
              alt="ই-কমার্স ফিচার"
              className="rounded-lg w-full h-auto shadow-xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <Badge className="mb-4 bg-amber-500 hover:bg-amber-600">ই-কমার্স ফিচার</Badge>
            <h3 className="text-2xl font-bold mb-4">একটি পূর্ণাঙ্গ ই-কমার্স অভিজ্ঞতা তৈরি করুন</h3>
            <p className="text-muted-foreground mb-6">
              আপনার অনলাইন স্টোরে অত্যাধুনিক ই-কমার্স ফিচারগুলি ব্যবহার করুন। প্রোডাক্ট ম্যানেজমেন্ট, 
              ইনভেন্টরি ট্র্যাকিং, এবং সিকিউর পেমেন্ট সিস্টেম দিয়ে আপনার ব্যবসা পরিচালনা করুন।
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">প্রোডাক্ট ম্যানেজমেন্ট</h4>
                  <p className="text-sm text-muted-foreground">সহজেই আপনার প্রোডাক্ট যোগ করুন, ক্যাটেগরি অনুযায়ী সাজান, এবং প্রাইস আপডেট করুন।</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">পেমেন্ট অপশন</h4>
                  <p className="text-sm text-muted-foreground">বিকাশ, নগদ, রকেট, ভিসা, মাস্টারকার্ড সহ ৩০+ পেমেন্ট মেথড সাপোর্ট।</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">ইনভেন্টরি ম্যানেজমেন্ট</h4>
                  <p className="text-sm text-muted-foreground">রিয়েল-টাইম ইনভেন্টরি ট্র্যাকিং, স্টক অ্যালার্ট, এবং সাপ্লাই চেইন মনিটরিং।</p>
                </div>
              </div>
            </div>
            
            <Button className="mt-8">
              ই-কমার্স ডেমো দেখুন <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Reseller Section */}
      <Card className="mb-16 overflow-hidden border-primary">
        <div className="md:flex">
          <div className="md:w-3/5 p-6 md:p-8">
            <Badge className="bg-amber-500 hover:bg-amber-600 mb-4">রিসেলিং অপশন</Badge>
            <h2 className="text-2xl font-bold mb-4">এই প্রোডাক্ট রিসেল করে আয় করুন</h2>
            <p className="text-lg text-muted-foreground mb-6">
              আমাদের রিসেলার প্রোগ্রামে যোগ দিন এবং অনলাইন স্টোর সলিউশন রিসেল করে ৩০-৫০% কমিশন আয় করুন। আপনার ক্লায়েন্টদের অফার করুন আধুনিক ওয়েবসাইট সলিউশন।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>৩০-৫০% কমিশন</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>ব্র্যান্ডেড রিসেলিং</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>মার্কেটিং সাপোর্ট</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>২৪/৭ কাস্টমার সাপোর্ট</span>
              </div>
            </div>
            <Button>
              <DollarSign className="mr-2 h-5 w-5" />
              রিসেলার হিসেবে রেজিস্টার করুন
            </Button>
          </div>
          <div className="md:w-2/5 bg-primary/10 p-6 md:p-8 flex items-center justify-center">
            <div className="text-center">
              <Store className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">রিসেলার প্যাকেজ</h3>
              <p className="mb-4">৫টি অনলাইন স্টোর লাইসেন্স</p>
              <div className="text-2xl font-bold text-primary mb-2">৳৪৫,০০০</div>
              <p className="text-sm text-muted-foreground mb-4">বার্ষিক রিনিউয়াল ৩০% ছাড়ে</p>
              <Button variant="outline">বিস্তারিত দেখুন</Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">সাধারণ জিজ্ঞাসা</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* CTA Section */}
      <div className="text-center py-12 px-4 bg-gradient-to-b from-primary/10 to-transparent rounded-lg">
        <h2 className="text-2xl font-bold mb-4">আজই শুরু করুন আপনার অনলাইন ব্যবসা</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          কোন সেটআপ ফি নেই, ১৫ দিনের ফ্রি ট্রায়াল, এবং ৩০ দিনের মানি-ব্যাক গ্যারান্টি।
        </p>
        <Button size="lg" onClick={handleStartFreeTrial}>
          <Rocket className="mr-2 h-5 w-5" />
          এখনই শুরু করুন
        </Button>
      </div>
    </div>
  );
};

export default CreateStore;

