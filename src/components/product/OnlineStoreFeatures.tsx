
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Globe, ShoppingCart, Truck, BarChart3, Smartphone, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const OnlineStoreFeatures = () => {
  const ecommerceFeatures = [
    {
      title: "ট্র্যাকিং সিস্টেম",
      description: "কাস্টমারদের অর্ডার ট্র্যাক করার সুবিধা",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      title: "মাল্টি পেমেন্ট",
      description: "বিকাশ, নগদ, কার্ড, ক্যাশ অন ডেলিভারি",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "পিক্সেল ইন্টিগ্রেশন",
      description: "ফেসবুক, গুগল, টিকটক পিক্সেল",
      icon: <BarChart3 className="h-5 w-5" />,
      premium: true,
    },
    {
      title: "মোবাইল অপটিমাইজড",
      description: "সব ডিভাইসে পারফেক্ট ভিউ",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      title: "কাস্টম ডোমেইন",
      description: "আপনার ব্র্যান্ডের নিজস্ব ডোমেইন",
      icon: <Globe className="h-5 w-5" />,
      premium: true,
    },
    {
      title: "পণ্য ম্যানেজমেন্ট",
      description: "সহজে পণ্য যোগ, এডিট, ডিলিট করুন",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
  ];

  const linkInBioFeatures = [
    {
      title: "আনলিমিটেড লিংক",
      description: "যত খুশি লিংক যোগ করুন",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "ভিজিটর অ্যানালিটিক্স",
      description: "কে, কখন, কোথা থেকে দেখছে",
      icon: <BarChart3 className="h-5 w-5" />,
      premium: true,
    },
    {
      title: "কাস্টমাইজড ডিজাইন",
      description: "নিজের পছন্দমত সাজিয়ে নিন",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      title: "শপিং লিংক",
      description: "পণ্য বিক্রি করুন ডাইরেক্ট ইন্সটাগ্রাম থেকে",
      icon: <ShoppingCart className="h-5 w-5" />,
      premium: true,
    },
  ];

  const advancedFeaturesList = [
    "ফেসবুক শপ সিঙ্ক",
    "ইনভেন্টরি ম্যানেজমেন্ট",
    "কুরিয়ার API ইন্টিগ্রেশন (পাঠাও, eCourier, RedX)",
    "অটো SMS নোটিফিকেশন",
    "রিটার্গেটিং পিক্সেল",
    "কনভার্শন ট্র্যাকিং",
    "বাল্ক প্রোডাক্ট আপলোড",
    "ডিসকাউন্ট কুপন সিস্টেম",
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">আপনার অনলাইন ব্যবসা শুরু করুন</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          সহজে ব্যবহারযোগ্য এবং পাওয়ারফুল ফিচার সহ আপনার ব্যবসা অনলাইনে নিয়ে আসুন
        </p>
      </div>
      
      <Tabs defaultValue="store" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="store">অনলাইন স্টোর</TabsTrigger>
          <TabsTrigger value="linkinbio">লিংক ইন বায়ো</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ecommerceFeatures.map((feature, index) => (
              <Card key={index} className={feature.premium ? "border-amber-200" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${feature.premium ? "bg-amber-50 text-amber-600" : "bg-primary/10 text-primary"}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.title}</h3>
                        {feature.premium && (
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
          
          <div className="bg-slate-50 rounded-lg p-5 mt-6">
            <h3 className="font-medium mb-3">অ্যাডভান্সড ফিচারস</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {advancedFeaturesList.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/create-store/new">
              <Button size="lg" className="px-8">আপনার স্টোর তৈরি করুন</Button>
            </Link>
          </div>
        </TabsContent>
        
        <TabsContent value="linkinbio" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {linkInBioFeatures.map((feature, index) => (
              <Card key={index} className={feature.premium ? "border-amber-200" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${feature.premium ? "bg-amber-50 text-amber-600" : "bg-primary/10 text-primary"}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.title}</h3>
                        {feature.premium && (
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
          
          <div className="bg-slate-50 rounded-lg p-5">
            <h3 className="font-medium mb-2">লিংক ইন বায়ো পেজ কেন তৈরি করবেন?</h3>
            <p className="text-sm text-muted-foreground">
              ইন্সটাগ্রাম, টিকটক, ফেসবুকে শুধুমাত্র একটি লিংক শেয়ার করতে পারেন। লিংক ইন বায়ো পেজের মাধ্যমে একটি লিংকে অনেকগুলো লিংক শেয়ার করুন।
            </p>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/create-linkinbio">
              <Button size="lg" className="px-8">লিংক ইন বায়ো পেজ তৈরি করুন</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnlineStoreFeatures;
