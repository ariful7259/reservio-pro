
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, Truck, CreditCard, BarChart3, Instagram, Globe, ShoppingCart, Upload, Facebook, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export const StoreFeaturesList: React.FC = () => {
  const storeFeatures = [
    {
      title: 'পণ্য ম্যানেজমেন্ট',
      description: 'সহজে পণ্য যোগ করুন, স্টক মনিটর করুন, ক্যাটাগরি সেটআপ করুন',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: 'পেমেন্ট গেটওয়ে',
      description: 'বিকাশ, নগদ, রকেট, কার্ড, ক্যাশ অন ডেলিভারি সাপোর্ট',
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: 'কুরিয়ার ইন্টিগ্রেশন',
      description: 'পাঠাও, eCourier, Steadfast, RedX ইন্টিগ্রেশন',
      icon: <Truck className="h-5 w-5" />,
      isPremium: true,
    },
    {
      title: 'ট্র্যাকিং পিক্সেল',
      description: 'ফেসবুক, গুগল অ্যাডস, টিকটক পিক্সেল সাপোর্ট',
      icon: <BarChart3 className="h-5 w-5" />,
      isPremium: true,
    },
    {
      title: 'সোশ্যাল মিডিয়া ইন্টিগ্রেশন',
      description: 'ফেসবুক, ইন্সটাগ্রাম, টিকটক ইন্টিগ্রেশন',
      icon: <Facebook className="h-5 w-5" />,
    },
    {
      title: 'কাস্টম ডোমেইন',
      description: 'আপনার নিজস্ব ডোমেইন ব্যবহার করুন',
      icon: <Globe className="h-5 w-5" />,
      isPremium: true,
    },
    {
      title: 'বাল্ক আপলোড',
      description: 'এক্সেল ফাইল দিয়ে একসাথে অনেক পণ্য আপলোড করুন',
      icon: <Upload className="h-5 w-5" />,
      isPremium: true,
    },
    {
      title: 'অটো রিঅর্ডার',
      description: 'পণ্য স্টক কমে গেলে অটো রিঅর্ডার নোটিফিকেশন',
      icon: <RefreshCw className="h-5 w-5" />,
    },
  ];

  const linkInBioFeatures = [
    {
      title: 'আনলিমিটেড লিংক',
      description: 'যত খুশি লিংক যোগ করুন',
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: 'সোশ্যাল আইকন',
      description: 'সকল সোশ্যাল মিডিয়া আইকন',
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      title: 'কাস্টম ডিজাইন',
      description: 'নিজের মত করে ডিজাইন করুন',
      icon: <Upload className="h-5 w-5" />,
      isPremium: true,
    },
    {
      title: 'অ্যানালিটিক্স',
      description: 'কে কোন লিংকে ক্লিক করছে ট্র্যাক করুন',
      icon: <BarChart3 className="h-5 w-5" />,
      isPremium: true,
    },
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">আপনার ডিজিটাল প্রেজেন্স তৈরি করুন</h2>
      
      <Tabs defaultValue="store" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="store">অনলাইন স্টোর</TabsTrigger>
          <TabsTrigger value="linkinbio">লিংক ইন বায়ো</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storeFeatures.map((feature, index) => (
              <Card key={index} className={cn("overflow-hidden transition-all hover:shadow-md", feature.isPremium ? "border-amber-200" : "")}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      feature.isPremium ? "bg-amber-50 text-amber-600" : "bg-primary/10 text-primary"
                    )}>
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.title}</h3>
                        {feature.isPremium && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                            প্রিমিয়াম
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/create-store/new">
              <Button size="lg" className="px-8">আপনার স্টোর তৈরি করুন</Button>
            </Link>
          </div>
        </TabsContent>
        
        <TabsContent value="linkinbio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkInBioFeatures.map((feature, index) => (
              <Card key={index} className={cn("overflow-hidden transition-all hover:shadow-md", feature.isPremium ? "border-amber-200" : "")}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      feature.isPremium ? "bg-amber-50 text-amber-600" : "bg-primary/10 text-primary"
                    )}>
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.title}</h3>
                        {feature.isPremium && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                            প্রিমিয়াম
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link to="/create-linkinbio">
              <Button size="lg" className="px-8">লিংক ইন বায়ো পেজ তৈরি করুন</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-slate-50 rounded-lg p-4 mt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-100 rounded-full text-green-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">আমরা আপনাকে সাহায্য করব</h3>
            <p className="text-sm text-muted-foreground mt-1">
              আপনার অনলাইন ব্যবসা শুরু করতে আমাদের এক্সপার্ট টিম রেডি আছে। কোন প্রশ্ন থাকলে যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreFeaturesList;
