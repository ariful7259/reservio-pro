
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Tag, 
  Link2, 
  Gauge, 
  Rocket,
  Calendar,
  Percentage,
  Loader2,
  Check,
  BarChart3,
  Globe,
  Share2,
  UploadCloud,
  FileBarChart
} from 'lucide-react';

interface SeoCheckResultProps {
  title: string;
  value: number;
  description: string;
  status: 'good' | 'warning' | 'error';
}

const SeoMarketingTools = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('seo');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [seoData, setSeoData] = useState({
    title: 'আমার অনলাইন দোকান - সেরা পণ্য সবচেয়ে কম দামে',
    description: 'আমাদের দোকানে পাওয়া যায় সেরা মানের পোশাক, ইলেকট্রনিক্স, হোম অ্যাপ্লায়েন্স ও ফ্যাশন আইটেম। ফ্রি ডেলিভারি এবং ৭ দিনের রিটার্ন পলিসি সহ।',
    keywords: 'অনলাইন শপিং, বাংলাদেশে অনলাইন দোকান, সেরা দাম, পোশাক, ইলেকট্রনিক্স',
    ogTitle: 'আমার অনলাইন দোকান - সেরা পণ্য সবচেয়ে কম দামে',
    ogDescription: 'আমাদের দোকানে পাওয়া যায় সেরা মানের পোশাক, ইলেকট্রনিক্স, হোম অ্যাপ্লায়েন্স ও ফ্যাশন আইটেম',
    ogImage: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070&auto=format&fit=crop',
    canonical: '',
    robots: 'index, follow'
  });

  const [discountData, setDiscountData] = useState({
    code: 'WELCOME15',
    percentage: '15',
    startDate: '',
    endDate: '',
    minPurchase: '1000',
    maxDiscount: '500',
    products: 'all',
    description: '১৫% ছাড় পান সকল পণ্যে, সর্বোচ্চ ৫০০ টাকা'
  });
  
  const [urlAnalysisResults, setUrlAnalysisResults] = useState<SeoCheckResultProps[]>([
    {
      title: 'পেজ টাইটেল',
      value: 95,
      description: 'টাইটেল দৈর্ঘ্য ভালো আছে, কীওয়ার্ড ব্যবহার করা হয়েছে',
      status: 'good'
    },
    {
      title: 'মেটা ডিসক্রিপশন',
      value: 85,
      description: 'ডিসক্রিপশন আরো সুনির্দিষ্ট হতে পারে',
      status: 'warning'
    },
    {
      title: 'ইমেজ অল্ট ট্যাগ',
      value: 60,
      description: 'অনেকগুলো ছবিতে অল্ট ট্যাগ যোগ করা হয়নি',
      status: 'warning'
    },
    {
      title: 'URL স্ট্রাকচার',
      value: 90,
      description: 'URL গুলো পরিষ্কার ও SEO-ফ্রেন্ডলি',
      status: 'good'
    },
    {
      title: 'মোবাইল ফ্রেন্ডলিনেস',
      value: 95,
      description: 'ওয়েবসাইট পুরোপুরি রেসপন্সিভ',
      status: 'good'
    }
  ]);

  const handleSeoFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      toast({
        title: "SEO সেটিংস সংরক্ষিত হয়েছে",
        description: "আপনার ওয়েবসাইটের SEO সেটিংস সফলভাবে আপডেট করা হয়েছে।",
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleGenerateDescription = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setSeoData({
        ...seoData,
        description: 'আমাদের অনলাইন স্টোরে পাবেন সেরা মানের দেশি-বিদেশি পণ্য। নামী ব্র্যান্ডের পোশাক, ইলেকট্রনিক্স, এবং হোম অ্যাপ্লায়েন্সের বিশাল কালেকশন। সারা দেশে ফ্রি ডেলিভারি, ৭ দিনের রিটার্ন পলিসি এবং EMI সুবিধা।',
        ogDescription: 'আমাদের অনলাইন স্টোরে পাবেন সেরা মানের দেশি-বিদেশি পণ্য। নামী ব্র্যান্ডের পোশাক, ইলেকট্রনিক্স, এবং হোম অ্যাপ্লায়েন্সের বিশাল কালেকশন।'
      });
      
      toast({
        title: "SEO ডিসক্রিপশন জেনারেট করা হয়েছে",
        description: "AI দিয়ে আপনার জন্য অপ্টিমাইজড ডিসক্রিপশন তৈরি করা হয়েছে।",
      });
      
      setIsGenerating(false);
    }, 1500);
  };
  
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      toast({
        title: "ডিসকাউন্ট কুপন তৈরি করা হয়েছে",
        description: `${discountData.code} কুপন সফলভাবে তৈরি করা হয়েছে।`,
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleRunSeoCheck = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      toast({
        title: "SEO চেক সম্পন্ন হয়েছে",
        description: "আপনার ওয়েবসাইটের SEO অডিট সফলভাবে সম্পন্ন হয়েছে।",
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Search className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium">SEO ও মার্কেটিং টুলস</h3>
          <p className="text-sm text-muted-foreground">
            সার্চ ইঞ্জিন ও মার্কেটিং অপ্টিমাইজেশন করুন। ডিসকাউন্ট কুপন, প্রমোশনাল ক্যাম্পেইন ম্যানেজ করুন। ব্লগ ও সোশ্যাল মিডিয়া ইন্টিগ্রেশন সেট করুন।
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="h-4 w-4" /> SEO সেটিংস
          </TabsTrigger>
          <TabsTrigger value="discounts" className="flex items-center gap-2">
            <Percentage className="h-4 w-4" /> ডিসকাউন্ট কুপন
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> অ্যানালিটিক্স
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SEO সেটিংস</CardTitle>
                  <CardDescription>
                    আপনার স্টোর ও পণ্যের সার্চ ইঞ্জিন র‌্যাংকিং উন্নত করুন
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSeoFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="page-title">পেজ টাইটেল</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="page-title" 
                          value={seoData.title}
                          onChange={(e) => setSeoData({...seoData, title: e.target.value})}
                        />
                        <div className={`text-xs px-2 py-1 rounded-md ${
                          seoData.title.length < 40 ? 'bg-red-100 text-red-700' :
                          seoData.title.length < 50 ? 'bg-amber-100 text-amber-700' :
                          seoData.title.length < 60 ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {seoData.title.length}/60
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        সর্বোত্তম টাইটেল দৈর্ঘ্য: 50-60 অক্ষর
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="meta-description">মেটা ডিসক্রিপশন</Label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={handleGenerateDescription}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                              জেনারেট হচ্ছে...
                            </>
                          ) : (
                            <>
                              <Rocket className="h-3 w-3 mr-2" /> 
                              AI দিয়ে জেনারেট করুন
                            </>
                          )}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Textarea 
                          id="meta-description" 
                          value={seoData.description}
                          onChange={(e) => setSeoData({...seoData, description: e.target.value})}
                          rows={2}
                        />
                        <div className={`text-xs px-2 py-1 rounded-md self-start ${
                          seoData.description.length < 120 ? 'bg-red-100 text-red-700' :
                          seoData.description.length < 155 ? 'bg-amber-100 text-amber-700' :
                          seoData.description.length < 160 ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {seoData.description.length}/160
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        সর্বোত্তম ডিসক্রিপশন দৈর্ঘ্য: 150-160 অক্ষর
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">কীওয়ার্ডস</Label>
                      <Input 
                        id="keywords" 
                        value={seoData.keywords}
                        onChange={(e) => setSeoData({...seoData, keywords: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        কমা দিয়ে কীওয়ার্ড আলাদা করুন
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="og-title">ওপেন গ্রাফ টাইটেল</Label>
                        <Input 
                          id="og-title" 
                          value={seoData.ogTitle}
                          onChange={(e) => setSeoData({...seoData, ogTitle: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="canonical">ক্যাননিকাল URL</Label>
                        <Input 
                          id="canonical" 
                          placeholder="https://example.com/page"
                          value={seoData.canonical}
                          onChange={(e) => setSeoData({...seoData, canonical: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="og-description">ওপেন গ্রাফ ডিসক্রিপশন</Label>
                      <Textarea 
                        id="og-description" 
                        value={seoData.ogDescription}
                        onChange={(e) => setSeoData({...seoData, ogDescription: e.target.value})}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="og-image">ওপেন গ্রাফ ইমেজ URL</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="og-image" 
                          value={seoData.ogImage}
                          onChange={(e) => setSeoData({...seoData, ogImage: e.target.value})}
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          className="shrink-0"
                        >
                          <UploadCloud className="h-4 w-4 mr-2" /> আপলোড
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            সংরক্ষণ হচ্ছে...
                          </>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            সেটিংস সংরক্ষণ করুন
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">সাইটম্যাপ ও রোবোটস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <FileBarChart className="h-5 w-5 text-primary" />
                        XML সাইটম্যাপ
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        সার্চ ইঞ্জিন ক্রলারদের সাইট নেভিগেট করতে সাহায্য করে
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <span>দেখুন</span>
                      </Button>
                      <Button size="sm" className="flex items-center gap-1">
                        <Rocket className="h-4 w-4" />
                        <span>জেনারেট</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        <FileBarChart className="h-5 w-5 text-primary" />
                        robots.txt ফাইল
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        সার্চ ইঞ্জিন ক্রলারদের নিয়ন্ত্রণ করতে নির্দেশনা
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <span>দেখুন</span>
                      </Button>
                      <Button size="sm" className="flex items-center gap-1">
                        <Rocket className="h-4 w-4" />
                        <span>এডিট</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Gauge className="h-5 w-5" />
                    SEO স্কোর চেকার
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="relative h-32 w-32">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle 
                          className="text-gray-200" 
                          strokeWidth="8" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="40" 
                          cx="50" 
                          cy="50" 
                        />
                        <circle 
                          className="text-primary" 
                          strokeWidth="8" 
                          strokeDasharray={`${2 * Math.PI * 40 * 0.85} ${2 * Math.PI * 40 * (1 - 0.85)}`} 
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="40" 
                          cx="50" 
                          cy="50" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                        85<span className="text-sm">/100</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium">সার্বিক SEO স্কোর</p>
                    <p className="text-xs text-muted-foreground">ভালো পারফরম্যান্স, কিছু উন্নতির সুযোগ আছে</p>
                  </div>
                  
                  <div className="space-y-3">
                    {urlAnalysisResults.map((result, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-3 rounded-md bg-accent/5"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${
                            result.status === 'good' ? 'bg-green-500' :
                            result.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                          }`}></div>
                          <span className="font-medium text-sm">{result.title}</span>
                        </div>
                        <span className={`text-sm ${
                          result.status === 'good' ? 'text-green-600' :
                          result.status === 'warning' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {result.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleRunSeoCheck} 
                    disabled={isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        স্ক্যান চলছে...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        SEO চেক রান করুন
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2 className="h-5 w-5" />
                    রিসোর্স লিংকস
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5">
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4 text-primary" />
                      <span className="text-sm">Google Search Console</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="text-sm">Google Analytics</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent/5">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-primary" />
                      <span className="text-sm">Google PageSpeed</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discounts">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ডিসকাউন্ট কুপন তৈরি করুন</CardTitle>
                  <CardDescription>
                    কাস্টমারদের জন্য বিভিন্ন ধরনের ডিসকাউন্ট কুপন তৈরি করুন
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCoupon} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="coupon-code">কুপন কোড</Label>
                        <Input 
                          id="coupon-code" 
                          value={discountData.code}
                          onChange={(e) => setDiscountData({...discountData, code: e.target.value})}
                        />
                        <p className="text-xs text-muted-foreground">
                          বড় হাতের অক্ষর, সংখ্যা ব্যবহার করুন
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="discount-percentage">ডিসকাউন্ট পরিমাণ (%)</Label>
                        <Input 
                          id="discount-percentage" 
                          type="number"
                          value={discountData.percentage}
                          onChange={(e) => setDiscountData({...discountData, percentage: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">শুরুর তারিখ</Label>
                        <Input 
                          id="start-date" 
                          type="date"
                          value={discountData.startDate}
                          onChange={(e) => setDiscountData({...discountData, startDate: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="end-date">শেষের তারিখ</Label>
                        <Input 
                          id="end-date" 
                          type="date"
                          value={discountData.endDate}
                          onChange={(e) => setDiscountData({...discountData, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="min-purchase">ন্যূনতম কেনাকাটা (৳)</Label>
                        <Input 
                          id="min-purchase" 
                          type="number"
                          value={discountData.minPurchase}
                          onChange={(e) => setDiscountData({...discountData, minPurchase: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="max-discount">সর্বোচ্চ ডিসকাউন্ট (৳)</Label>
                        <Input 
                          id="max-discount" 
                          type="number"
                          value={discountData.maxDiscount}
                          onChange={(e) => setDiscountData({...discountData, maxDiscount: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="products">প্রযোজ্য প্রোডাক্টস</Label>
                      <Input 
                        id="products" 
                        value={discountData.products}
                        onChange={(e) => setDiscountData({...discountData, products: e.target.value})}
                        placeholder="সকল পণ্যের জন্য 'all' লিখুন, অথবা নির্দিষ্ট ক্যাটাগরি/পণ্যের নাম লিখুন"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">ডিসকাউন্টের বিবরণ</Label>
                      <Textarea 
                        id="description" 
                        value={discountData.description}
                        onChange={(e) => setDiscountData({...discountData, description: e.target.value})}
                        placeholder="ডিসকাউন্টের বিস্তারিত বিবরণ"
                        rows={2}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSaving}
                      className="mt-2"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          সংরক্ষণ হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Tag className="h-4 w-4 mr-2" />
                          কুপন তৈরি করুন
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    সক্রিয় কুপনসমূহ
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-primary">WELCOME15</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">সক্রিয়</Badge>
                    </div>
                    <p className="text-sm">১৫% ছাড় পান সকল পণ্যে, সর্বোচ্চ ৫০০ টাকা</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>এক্সপায়ারি: ৩০ মে, ২০২৫</span>
                    </div>
                  </div>

                  <div className="border rounded-md p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold text-primary">EID30</span>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">সক্রিয়</Badge>
                    </div>
                    <p className="text-sm">ঈদ উপলক্ষে ৩০% ছাড় ফ্যাশন আইটেমে</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>এক্সপায়ারি: ১০ জুন, ২০২৫</span>
                    </div>
                  </div>

                  <div className="border rounded-md p-3 space-y-2 opacity-50">
                    <div className="flex justify-between">
                      <span className="font-bold line-through">SUMMER20</span>
                      <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">মেয়াদোত্তীর্ণ</Badge>
                    </div>
                    <p className="text-sm">গ্রীষ্মের সেলে ২০% ছাড়</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>মেয়াদ শেষ: ১০ মে, ২০২৫</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    সকল কুপন দেখুন
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                ওয়েবসাইট অ্যানালিটিক্স
              </CardTitle>
              <CardDescription>
                আপনার ওয়েবসাইট, সার্চ ইঞ্জিন র‍্যাংকিং ও কনভার্শন এনালাইসিস
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8 text-center">
                <div>
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Google Analytics কানেক্ট করুন</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    আপনার ওয়েবসাইট ট্র্যাফিক, ইউজার বিহেভিয়ার এবং কনভার্শন ট্র্যাক করতে Google Analytics সেটাপ করুন।
                  </p>
                  <Button className="mx-auto">
                    Analytics কানেক্ট করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoMarketingTools;
