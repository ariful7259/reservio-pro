
import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  ShoppingCart, 
  Tag, 
  CreditCard, 
  Search, 
  Percent, 
  BarChart, 
  Package, 
  Truck, 
  Share, 
  Smartphone as AppIcon, 
  MessageCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const OnlineStoreFeatures = () => {
  const featuresList = [
    {
      icon: <Monitor className="h-8 w-8 text-primary" />,
      title: 'সহজ টেমপ্লেট সিলেকশন',
      description: 'শিল্প-নির্দিষ্ট দ্রুত স্টোর তৈরির টেমপ্লেট'
    },
    {
      icon: <Tag className="h-8 w-8 text-blue-500" />,
      title: 'ড্র্যাগ-এন্ড-ড্রপ বিল্ডার',
      description: 'কোডিং ছাড়াই সহজে পেজ লেআউট কাস্টমাইজ করুন'
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-500" />,
      title: 'মোবাইল-অপটিমাইজড',
      description: 'সমস্ত ডিভাইসে সুন্দরভাবে প্রদর্শিত রেসপনসিভ লেআউট'
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-amber-500" />,
      title: 'সহজ প্রোডাক্ট ম্যানেজমেন্ট',
      description: 'একটি ক্লিকে প্রোডাক্ট আপলোড এবং এডিট করুন'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-purple-500" />,
      title: 'একাধিক পেমেন্ট অপশন',
      description: 'বিকাশ, নগদ, কার্ড এবং ক্যাশ অন ডেলিভারি সাপোর্ট'
    },
    {
      icon: <Search className="h-8 w-8 text-indigo-500" />,
      title: 'বেসিক SEO টুলস',
      description: 'সার্চ ইঞ্জিনে ভালোভাবে র‍্যাঙ্ক করার জন্য সহজ অপটিমাইজেশন'
    },
    {
      icon: <Percent className="h-8 w-8 text-red-500" />,
      title: 'ডিস্কাউন্ট এবং প্রোমোশন',
      description: 'কুপন, সিজোনাল সেল এবং স্পেশাল অফার সেটআপ'
    },
    {
      icon: <BarChart className="h-8 w-8 text-cyan-500" />,
      title: 'বেসিক অ্যানালিটিক্স',
      description: 'বিক্রয়, ভিজিটর এবং রেভেনিউর সহজ ওভারভিউ'
    },
    {
      icon: <Package className="h-8 w-8 text-emerald-500" />,
      title: 'স্টক ম্যানেজমেন্ট',
      description: 'ইনভেন্টরি লেভেল অটোমেটিক আপডেট এবং লো-স্টক নোটিফিকেশন'
    },
    {
      icon: <Truck className="h-8 w-8 text-orange-500" />,
      title: 'অর্ডার ম্যানেজমেন্ট',
      description: 'অর্ডার ট্র্যাকিং এবং অটোমেটিক ইমেল নোটিফিকেশন'
    },
    {
      icon: <Truck className="h-8 w-8 text-lime-500" />,
      title: 'সহজ শিপিং সেটিংস',
      description: 'বিভিন্ন শিপিং মেথড এবং লোকেশন ভিত্তিক শিপিং রেট'
    },
    {
      icon: <Share className="h-8 w-8 text-blue-600" />,
      title: 'সোশ্যাল মিডিয়া ইন্টিগ্রেশন',
      description: 'ফেসবুক, ইনস্টাগ্রাম শপ সাথে সিঙ্ক করার সুবিধা'
    },
    {
      icon: <AppIcon className="h-8 w-8 text-violet-500" />,
      title: 'মোবাইল অ্যাপ ভিউ',
      description: 'ওয়েবসাইটের অ্যাপ-লাইক ভার্সন যা মোবাইলে ভালো অভিজ্ঞতা দেয়'
    },
    {
      icon: <Tag className="h-8 w-8 text-rose-500" />,
      title: 'কাস্টমার রিভিউ সিস্টেম',
      description: 'প্রোডাক্টের রিভিউ, রেটিং এবং ফটো/ভিডিও রিভিউ সিস্টেম'
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-teal-500" />,
      title: 'লাইভ চ্যাট সাপোর্ট',
      description: 'কাস্টমারদের সাথে সরাসরি যোগাযোগের লাইভ চ্যাট সুবিধা'
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">আপনার অনলাইন স্টোর তৈরি করুন</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          সহজে ব্যবহারযোগ্য এবং পাওয়ারফুল ফিচার সহ আপনার ব্যবসা অনলাইনে নিয়ে আসুন
        </p>
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <Badge variant="outline" className="mb-4">নতুন ব্যবসায়ীদের জন্য উপযুক্ত</Badge>
            <h2 className="text-2xl font-bold mb-4">সমস্ত ফিচার একটি সহজ মূল্যে</h2>
            <p className="mb-4">
              আমাদের অনলাইন স্টোর সল্যুশন আপনাকে সম্পূর্ণ ব্যবসায়িক সমাধান প্রদান করে - টেমপ্লেট থেকে শুরু করে পেমেন্ট প্রসেসিং পর্যন্ত।
            </p>
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">৳১০,০০০/বছর</span>
              <span className="text-sm ml-2 text-muted-foreground">১৫ দিনের ফ্রি ট্রায়াল</span>
            </div>
            <div className="flex gap-3">
              <Button size="lg">ফ্রি ট্রায়াল শুরু করুন</Button>
              <Button variant="outline" size="lg">ডেমো দেখুন</Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://i.imgur.com/sZVqRWu.png" 
              alt="অনলাইন স্টোর টেমপ্লেট" 
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8">১৫টি পাওয়ারফুল ফিচার</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {featuresList.map((feature, index) => (
            <Card key={index} className="border hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-4">আপনার ব্যবসা অনলাইনে নিয়ে আসুন</h2>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
          কোনো প্রোগ্রামিং জ্ঞান ছাড়াই আপনার ব্যবসার জন্য একটি পেশাদার ওয়েবসাইট তৈরি করুন
        </p>
        <Button size="lg">শুরু করুন</Button>
      </div>
    </div>
  );
};

export default OnlineStoreFeatures;
