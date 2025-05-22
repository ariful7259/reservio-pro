
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, Truck, CreditCard, BarChart3, Instagram, Globe, ShoppingCart, Upload, Facebook, RefreshCw, Paintbrush, Layout, Layers, PanelLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import IndustryTemplates from '@/components/store/IndustryTemplates';

export const StoreFeaturesList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("store");
  
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
    {
      title: 'ড্র্যাগ এন্ড ড্রপ ডিজাইনার',
      description: 'কোড লেখা ছাড়াই আপনার স্টোর ডিজাইন করুন',
      icon: <Paintbrush className="h-5 w-5" />,
      isNew: true,
    },
    {
      title: 'রেডিমেড টেমপ্লেট',
      description: '২০+ প্রফেশনাল টেমপ্লেট থেকে বেছে নিন',
      icon: <Layout className="h-5 w-5" />,
      isNew: true,
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
    {
      title: 'ড্র্যাগ এন্ড ড্রপ এডিটর',
      description: 'সহজে এবং দ্রুত আপনার লিংক পেজ ডিজাইন করুন',
      icon: <Paintbrush className="h-5 w-5" />,
      isNew: true,
    },
  ];

  const editorFeatures = [
    {
      title: 'ড্র্যাগ এন্ড ড্রপ',
      description: 'সহজে এলিমেন্ট নাড়াচাড়া করুন',
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: 'প্রি-ডিজাইনড ব্লক',
      description: 'হেডার, ফুটার, গ্যালারি ইত্যাদি ব্লক',
      icon: <PanelLeft className="h-5 w-5" />,
    },
    {
      title: 'সেকশন টেমপ্লেট',
      description: 'বিভিন্ন সেকশনের টেমপ্লেট',
      icon: <Layout className="h-5 w-5" />,
    },
    {
      title: 'মোবাইল অপ্টিমাইজেশন',
      description: 'সব ডিভাইসে সঠিকভাবে দেখাবে',
      icon: <Paintbrush className="h-5 w-5" />,
    },
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">আপনার ডিজিটাল প্রেজেন্স তৈরি করুন</h2>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="store">অনলাইন স্টোর</TabsTrigger>
          <TabsTrigger value="linkinbio">লিংক ইন বায়ো</TabsTrigger>
          <TabsTrigger value="editor">ড্রাগ-এন্ড-ড্রপ এডিটর</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {storeFeatures.map((feature, index) => (
              <Card key={index} className={cn("overflow-hidden transition-all hover:shadow-md", 
                feature.isPremium ? "border-amber-200" : "",
                feature.isNew ? "border-green-200" : ""
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      feature.isPremium ? "bg-amber-50 text-amber-600" : 
                      feature.isNew ? "bg-green-50 text-green-600" : "bg-primary/10 text-primary"
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
                        {feature.isNew && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            নতুন
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
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">আপনার শিল্প/ব্যবসার জন্য রেডিমেড টেমপ্লেট</h3>
            <IndustryTemplates />
          </div>

          <div className="mt-8 text-center">
            <Link to="/create-store/new">
              <Button size="lg" className="px-8 py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300">
                আপনার স্টোর তৈরি করুন
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">কোনও ক্রেডিট কার্ড প্রয়োজন নেই - ফ্রি প্ল্যান দিয়ে শুরু করুন</p>
          </div>
        </TabsContent>
        
        <TabsContent value="linkinbio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linkInBioFeatures.map((feature, index) => (
              <Card key={index} className={cn("overflow-hidden transition-all hover:shadow-md", 
                feature.isPremium ? "border-amber-200" : "",
                feature.isNew ? "border-green-200" : ""
              )}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-full",
                      feature.isPremium ? "bg-amber-50 text-amber-600" : 
                      feature.isNew ? "bg-green-50 text-green-600" : "bg-primary/10 text-primary"
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
                        {feature.isNew && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            নতুন
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
          
          <div className="text-center mt-8">
            <Link to="/create-linkinbio">
              <Button size="lg" className="px-8 py-6 text-lg font-medium rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all duration-300">
                লিংক ইন বায়ো পেজ তৈরি করুন
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">মিনিটের মধ্যে আপনার লিংক পেজ তৈরি করুন</p>
          </div>
        </TabsContent>
        
        <TabsContent value="editor" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {editorFeatures.map((feature, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-slate-50 rounded-lg p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="ড্র্যাগ এন্ড ড্রপ এডিটর"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold mb-2">ড্র্যাগ এন্ড ড্রপ এডিটর</h3>
              <p className="text-muted-foreground mb-4">
                এখন কোডিং জ্ঞান ছাড়াই আপনার ওয়েবসাইট ডিজাইন করুন। আমাদের ড্র্যাগ এন্ড ড্রপ এডিটর ব্যবহার করে সহজেই আপনার পছন্দমতো ডিজাইন করুন।
                বিভিন্ন প্রি-ডিজাইনড ব্লক ব্যবহার করে আপনার ওয়েবসাইটকে আকর্ষণীয় করে তুলুন।
              </p>
              <Button className="bg-primary/90 hover:bg-primary">
                এডিটর দেখুন
              </Button>
            </div>
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
