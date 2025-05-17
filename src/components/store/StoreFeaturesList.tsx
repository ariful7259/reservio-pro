
import React from 'react';
import { 
  Palette, FileSpreadsheet, CreditCard, Truck, Receipt, ShoppingBag, 
  BellRing, Paintbrush, Search, Users, BarChart3, MessageCircle, 
  Store, Globe, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const StoreFeaturesList: React.FC = () => {
  const storeFeatures = [
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: 'ওয়ান‑ক্লিক থিম ইনস্টলেশন',
      description: 'প্রি‑ডিজাইন্ড টেমপ্লেট লাইব্রেরি থেকে পছন্দের থিম সিলেক্ট করে এক ক্লিকে ফ্রন্টএন্ড লাইভ।'
    },
    {
      icon: <FileSpreadsheet className="h-8 w-8 text-orange-500" />,
      title: 'পণ্য এম্পোর্ট/এক্সপোর্ট (CSV/Excel)',
      description: 'হাজার হাজার প্রোডাক্টের ডাটা একসাথে আপলোড বা ডাউনলোড করার সুবিধা।'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-500" />,
      title: 'ইন্টিগ্রেটেড পেমেন্ট গেটওয়ে',
      description: "বিকাশ, রকেট, নগদ, ক্রেডিট/ডেবিট কার্ড, পে'মেন্ট ওয়ালেটসহ প্রি‑কনফিগার্ড অপশন।"
    },
    {
      icon: <Truck className="h-8 w-8 text-green-500" />,
      title: 'শিপিং জোন ও রেট ম্যানেজার',
      description: 'এলাকা অনুযায়ী শিপিং চার্জ সেটআপ, ফ্রি ডেলিভারি থ্রেশহোল্ড নির্ধারণ।'
    },
    {
      icon: <Receipt className="h-8 w-8 text-purple-500" />,
      title: 'ট্যাক্স ও ইনভয়েস অটো‑জেনারেটর',
      description: 'দেশের কর আইনের সঙ্গে সামঞ্জস্য রেখে স্বয়ংক্রিয় কর গণনা ও ই-ইনভয়েস ইমেইল।'
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-pink-500" />,
      title: 'ওয়ান‑ পেজ চেকআউট',
      description: 'ইউজারের পছন্দমতো পেমেন্ট মেথড, শিপিং এড্রেস ভরে এক ধাপেই অর্ডার প্লেস।'
    },
    {
      icon: <BellRing className="h-8 w-8 text-amber-500" />,
      title: 'স্বয়ংক্রিয় ইমেইল ও পুশ নোটিফিকেশন',
      description: 'অর্ডার কনফার্মেশন, শিপমেন্ট আপডেট, পরিত্যক্ত কার্ট রিমাইন্ডার ইত্যাদি।'
    },
    {
      icon: <Paintbrush className="h-8 w-8 text-indigo-500" />,
      title: 'প্রোডাক্ট কাস্টমাইজেশন উইজেট',
      description: 'রঙ, সাইজ, মডেল, গ্রাভিং অপশন ইত্যাদি রিয়েল‑টাইম প্রিভিউ সহ।'
    },
    {
      icon: <Search className="h-8 w-8 text-teal-500" />,
      title: 'SEO & মার্কেটিং টুলস',
      description: 'মেটা ট্যাগ, URL কাস্টমাইজেশন, সাইটম্যাপ, ব্লগ মডিউল ও ডিসকাউন্ট কুপন ম্যানেজার।'
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: 'রিফারেল ও লয়্যালটি সিস্টেম',
      description: 'বন্ধু_REFER করে রিওয়ার্ড পয়েন্ট, পয়েন্ট দিয়ে ডিসকাউন্ট, এক্সক্লুসিভ অফার।'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-cyan-500" />,
      title: 'রিয়েল‑টাইম অ্যানালিটিক্স ড্যাশবোর্ড',
      description: 'ভিজিটর, বিক্রয়, কনভার্শন রেট, বেস্টসেলার প্রোডাক্ট ও ট্রাফিক সোর্স ট্র্যাকিং।'
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-emerald-500" />,
      title: 'ইন-অ্যাপ লাইভ চ্যাট সাপোর্ট',
      description: 'কাস্টমার সার্ভিসে সরাসরি প্রশ্নোত্তর ও FAQs মডিউল।'
    },
    {
      icon: <Store className="h-8 w-8 text-violet-500" />,
      title: 'মাল্টি-ভেন্ডর মার্কেটপ্লেস সাপোর্ট',
      description: 'ভেন্ডর রেজিস্ট্রেশন, কমিশন সেটিং, সেলস রিপোর্ট।'
    },
    {
      icon: <Globe className="h-8 w-8 text-yellow-600" />,
      title: 'মাল্টি-ল্যাঙ্গুয়েজ ও কারেন্সি',
      description: 'বাংলা, ইংরেজি (অথবা আরো ভাষা) ইন্টারফেস ও বিভিন্ন মুদ্রা প্রদর্শন।'
    },
    {
      icon: <Lock className="h-8 w-8 text-gray-700" />,
      title: 'ব্যাকআপ & সিকিউরিটি',
      description: 'স্বয়ংক্রিয় ডেটা ব্যাকআপ, SSL ইন্টিগ্রেশন, 2FA লগইন।'
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <Badge variant="outline" className="mb-3">Ready‑to‑Create</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">অনলাইন স্টোর তৈরির পূর্ণাঙ্গ ফিচারস</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          নিচে এমন ফিচারগুলো রয়েছে যেগুলো দিয়ে খুব তাড়াতাড়ি আপনার অনলাইন স্টোর অ্যাপ সেটআপ করে শপিং চালু করা যাবে
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storeFeatures.map((feature, index) => (
          <Card key={index} className="border hover:shadow-md transition-all">
            <CardContent className="p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg font-medium mb-6">
          এই ফিচারগুলো ইন্সটল এবং কনফিগার করার সাথে সাথেই আপনার 
          <span className="text-primary font-bold mx-1">স্টোর লাইভ</span> 
          হবে
        </p>
        <Link to="/create-store/new">
          <Button size="lg" className="animate-pulse">আপনার স্টোর তৈরি করুন</Button>
        </Link>
      </div>
    </div>
  );
};

export default StoreFeaturesList;
