import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, Truck, CreditCard, BarChart3, Instagram, Globe, ShoppingCart, Upload, 
  Facebook, RefreshCw, Smartphone, Bell, Shield, Users, MessageSquare, Search,
  Package, Calculator, Palette, Zap, Camera, Video, Music, FileText, Code,
  Settings, Heart, Star, MapPin, Clock, TrendingUp, Megaphone, Gift,
  Headphones, Lock, Cloud, Download, Share, Edit, Mail, Phone, Crown,
  Database, Layers, Target, Eye, Percent, Tag, FileSpreadsheet, Store
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export const StoreFeaturesList: React.FC = () => {
  // ১. বেসিক স্টোর ফিচার
  const basicStoreFeatures = [
    {
      title: 'পণ্য ম্যানেজমেন্ট',
      description: 'আনলিমিটেড পণ্য যোগ, স্টক ট্র্যাকিং, ক্যাটাগরি সেটআপ',
      icon: <ShoppingCart className="h-5 w-5" />,
      emoji: '📦'
    },
    {
      title: 'অর্ডার ম্যানেজমেন্ট',
      description: 'অর্ডার ট্র্যাকিং, স্ট্যাটাস আপডেট, কাস্টমার নোটিফিকেশন',
      icon: <Package className="h-5 w-5" />,
      emoji: '📬'
    },
    {
      title: 'কাস্টমার ম্যানেজমেন্ট',
      description: 'কাস্টমার প্রোফাইল, অর্ডার হিস্ট্রি, উইশলিস্ট ফিচার',
      icon: <Users className="h-5 w-5" />,
      emoji: '👥'
    },
    {
      title: 'ইনভেন্টরি কন্ট্রোল',
      description: 'স্টক অ্যালার্ট, অটো রিঅর্ডার, প্রোডাক্ট ভেরিয়েন্ট সাপোর্ট',
      icon: <RefreshCw className="h-5 w-5" />,
      emoji: '🏷️'
    }
  ];

  // ২. পেমেন্ট ও ফিন্যান্স
  const paymentFeatures = [
    {
      title: 'মাল্টিপল পেমেন্ট গেটওয়ে',
      description: 'বিকাশ, নগদ, রকেট, কার্ড, ক্যাশ অন ডেলিভারি',
      icon: <CreditCard className="h-5 w-5" />,
      isPremium: true,
      emoji: '💳'
    },
    {
      title: 'অটো ইনভয়েস জেনারেটর',
      description: 'প্রফেশনাল ইনভয়েস, ট্যাক্স ক্যালকুলেশন, ডাউনলোড অপশন',
      icon: <Calculator className="h-5 w-5" />,
      emoji: '🧾'
    },
    {
      title: 'রিফান্ড ম্যানেজমেন্ট',
      description: 'অটোমেটিক রিফান্ড প্রসেসিং, রিফান্ড পলিসি কনফিগারেশন',
      icon: <RefreshCw className="h-5 w-5" />,
      isPremium: true,
      emoji: '🔁'
    },
    {
      title: 'কমিশন ট্র্যাকিং',
      description: 'অ্যাফিলিয়েট কমিশন, রেফারেল বোনাস, আর্নিং ড্যাশবোর্ড',
      icon: <TrendingUp className="h-5 w-5" />,
      isPremium: true,
      emoji: '📈'
    }
  ];

  // ৩. মার্কেটিং ও প্রমোশন
  const marketingFeatures = [
    {
      title: 'সোশ্যাল মিডিয়া ইন্টিগ্রেশন',
      description: 'ফেসবুক, ইন্সটাগ্রাম, টিকটক শেয়ারিং',
      icon: <Facebook className="h-5 w-5" />,
      emoji: '🌐'
    },
    {
      title: 'SEO অপটিমাইজেশন',
      description: 'মেটা ট্যাগ, সাইটম্যাপ, গুগল সার্চ ফ্রেন্ডলি',
      icon: <Search className="h-5 w-5" />,
      isPremium: true,
      emoji: '🔍'
    },
    {
      title: 'ইমেইল মার্কেটিং',
      description: 'অটোমেটিক ইমেইল, প্রমোশনাল ক্যাম্পেইন, নিউজলেটার',
      icon: <Mail className="h-5 w-5" />,
      isPremium: true,
      emoji: '✉️'
    },
    {
      title: 'ডিসকাউন্ট ও কুপন সিস্টেম',
      description: 'প্রোমো কোড, সিজনাল অফার, বাল্ক ডিসকাউন্ট',
      icon: <Gift className="h-5 w-5" />,
      emoji: '💸'
    }
  ];

  // ৪. ডেলিভারি ও লজিস্টিক
  const deliveryFeatures = [
    {
      title: 'কুরিয়ার ইন্টিগ্রেশন',
      description: 'পাঠাও, eCourier, Steadfast, RedX সরাসরি বুকিং',
      icon: <Truck className="h-5 w-5" />,
      isPremium: true,
      emoji: '📦'
    },
    {
      title: 'রিয়েল-টাইম ট্র্যাকিং',
      description: 'GPS-ভিত্তিক লাইভ ট্র্যাকিং',
      icon: <MapPin className="h-5 w-5" />,
      isPremium: true,
      emoji: '📍'
    },
    {
      title: 'ডেলিভারি এরিয়া সেটিং',
      description: 'এলাকাভিত্তিক চার্জ, টাইম স্লট নির্বাচন',
      icon: <Clock className="h-5 w-5" />,
      emoji: '🗺️'
    },
    {
      title: 'বাল্ক অর্ডার ম্যানেজমেন্ট',
      description: 'একসাথে অর্ডার প্রসেসিং, ব্যাচ প্রিন্টিং সাপোর্ট',
      icon: <Upload className="h-5 w-5" />,
      isPremium: true,
      emoji: '📑'
    }
  ];

  // ৫. অ্যানালিটিক্স ও রিপোর্টিং
  const analyticsFeatures = [
    {
      title: 'ট্র্যাকিং পিক্সেল',
      description: 'ফেসবুক, গুগল, টিকটক পিক্সেল ইন্টিগ্রেশন',
      icon: <Target className="h-5 w-5" />,
      isPremium: true,
      emoji: '🎯'
    },
    {
      title: 'সেলস ড্যাশবোর্ড',
      description: 'রিয়েল-টাইম সেলস রিপোর্ট, প্রফিট অ্যানালাইসিস',
      icon: <BarChart3 className="h-5 w-5" />,
      emoji: '📉'
    },
    {
      title: 'কাস্টমার বিহেভিয়ার',
      description: 'ভিজিটর ট্র্যাকিং, হিটম্যাপ, কনভার্শন রেট',
      icon: <Eye className="h-5 w-5" />,
      isPremium: true,
      emoji: '👣'
    },
    {
      title: 'পারফরমেন্স রিপোর্ট',
      description: 'প্রোডাক্ট পারফরমেন্স, বিক্রয় ট্রেন্ড',
      icon: <TrendingUp className="h-5 w-5" />,
      emoji: '📑'
    }
  ];

  // ৬. ডিজাইন ও কাস্টমাইজেশন
  const designFeatures = [
    {
      title: 'কাস্টম ডোমেইন',
      description: 'নিজের ডোমেইন যুক্ত করার সুবিধা',
      icon: <Globe className="h-5 w-5" />,
      isPremium: true,
      emoji: '🌐'
    },
    {
      title: 'প্রিমিয়াম থিম',
      description: '১০০+ রেডিমেড থিম, কালার স্কিম ও লেআউট কাস্টমাইজেশন',
      icon: <Palette className="h-5 w-5" />,
      isPremium: true,
      emoji: '🎨'
    },
    {
      title: 'মোবাইল অ্যাপ',
      description: 'অ্যান্ড্রয়েড/আইওএস ডেডিকেটেড অ্যাপ',
      icon: <Smartphone className="h-5 w-5" />,
      isPremium: true,
      emoji: '📱'
    },
    {
      title: 'ড্র্যাগ & ড্রপ এডিটর',
      description: 'কোড ছাড়াই সহজ ডিজাইন এডিটিং',
      icon: <Edit className="h-5 w-5" />,
      emoji: '🧰'
    }
  ];

  // ৭. এডভান্সড ফিচার
  const advancedFeatures = [
    {
      title: 'বাল্ক প্রোডাক্ট আপলোড',
      description: 'এক্সেল/CSV ফাইল দিয়ে একসাথে হাজারো প্রোডাক্ট আপলোড',
      icon: <FileSpreadsheet className="h-5 w-5" />,
      isPremium: true,
      emoji: '📥'
    },
    {
      title: 'মাল্টি-ভেন্ডর সাপোর্ট',
      description: 'একাধিক বিক্রেতা, কমিশন সেটিং ও ম্যানেজমেন্ট',
      icon: <Store className="h-5 w-5" />,
      isPremium: true,
      emoji: '🛒'
    },
    {
      title: 'লাইভ চ্যাট সাপোর্ট',
      description: '২৪/৭ কাস্টমার সাপোর্ট, চ্যাটবট ইন্টিগ্রেশন',
      icon: <MessageSquare className="h-5 w-5" />,
      isPremium: true,
      emoji: '💬'
    },
    {
      title: 'ব্যাকআপ ও সিকিউরিটি',
      description: 'অটো ব্যাকআপ, SSL সার্টিফিকেট, ডেটা এনক্রিপশন',
      icon: <Shield className="h-5 w-5" />,
      isPremium: true,
      emoji: '🔐'
    }
  ];

  // লিংক ইন বায়ো ফিচার
  const linkInBioFeatures = [
    {
      title: 'আনলিমিটেড লিংক',
      description: 'যত খুশি লিংক এবং বাটন যোগ করুন',
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: 'সোশ্যাল আইকন',
      description: 'সকল সোশ্যাল মিডিয়া প্ল্যাটফর্মের আইকন',
      icon: <Instagram className="h-5 w-5" />,
    },
    {
      title: 'কন্টাক্ট ইনফো',
      description: 'ফোন, ইমেইল, ঠিকানা সহজেই যোগ করুন',
      icon: <Phone className="h-5 w-5" />,
    },
    {
      title: 'অ্যানালিটিক্স',
      description: 'কোন লিংকে কতবার ক্লিক হয়েছে দেখুন',
      icon: <BarChart3 className="h-5 w-5" />,
      isPremium: true,
    },
    {
      title: 'কাস্টম ডিজাইন',
      description: 'আপনার ব্র্যান্ড অনুযায়ী রঙ ও ডিজাইন',
      icon: <Palette className="h-5 w-5" />,
      isPremium: true,
    },
    {
      title: 'QR কোড জেনারেটর',
      description: 'আপনার লিংক ইন বায়োর জন্য QR কোড',
      icon: <Camera className="h-5 w-5" />,
    }
  ];

  const renderFeatureCard = (feature: any, index: number) => (
    <Card key={index} className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border", 
      feature.isPremium ? "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50" : "border-gray-200 bg-white"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-full flex-shrink-0 transition-all duration-300",
            feature.isPremium ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white" : "bg-primary/10 text-primary"
          )}>
            {feature.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{feature.emoji}</span>
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              {feature.isPremium && (
                <Badge variant="outline" className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-amber-300 text-xs px-2 py-0.5 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  প্রিমিয়াম
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          🛍️ সম্পূর্ণ ডিজিটাল সলিউশন পান
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm lg:text-base px-4">
          আপনার ব্যবসার জন্য প্রয়োজনীয় সকল ফিচার একসাথে। কোনো ফিচার বাদ পড়বে না!
        </p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border mx-4">
          <p className="text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2">
            <Crown className="h-4 w-4 text-amber-500" />
            <span className="font-medium">🔖 নোট:</span> 
            <Badge className="bg-amber-500 text-white">প্রিমিয়াম</Badge> 
            চিহ্নিত ফিচারগুলো প্রিমিয়াম সাবস্ক্রিপশনের আওতাভুক্ত
          </p>
        </div>
      </div>
      
      <div className="w-full mb-8">
        <Tabs defaultValue="store" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-2">
            <TabsTrigger value="store" className="data-[state=active]:bg-white data-[state=active]:shadow-md font-medium py-3 rounded-lg transition-all duration-300">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">অনলাইন স্টোর</span>
              <span className="sm:hidden">স্টোর</span>
            </TabsTrigger>
            <TabsTrigger value="linkinbio" className="data-[state=active]:bg-white data-[state=active]:shadow-md font-medium py-3 rounded-lg transition-all duration-300">
              <Globe className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">লিংক ইন বায়ো</span>
              <span className="sm:hidden">লিংক</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="store" className="space-y-6 sm:space-y-8">
            {/* Responsive Feature Sections */}
            {/* ১. বেসিক স্টোর ফিচার */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 px-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                🛍️ ১. বেসিক স্টোর ফিচার
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
                {basicStoreFeatures.map((feature, index) => renderFeatureCard(feature, index))}
              </div>
            </div>

            {/* ২. পেমেন্ট ও ফিন্যান্স */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 px-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <CreditCard className="h-4 w-4 text-green-600" />
                </div>
                💰 ২. পেমেন্ট ও ফিন্যান্স
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
                {paymentFeatures.map((feature, index) => renderFeatureCard(feature, index))}
              </div>
            </div>

            {/* ৩. মার্কেটিং ও প্রমোশন */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 px-2">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Megaphone className="h-4 w-4 text-purple-600" />
                </div>
                📣 ৩. মার্কেটিং ও প্রমোশন
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
                {marketingFeatures.map((feature, index) => renderFeatureCard(feature, index))}
              </div>
            </div>

            {/* ৪. ডেলিভারি ও লজিস্টিক */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 px-2">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Truck className="h-4 w-4 text-orange-600" />
                </div>
                🚚 ৪. ডেলিভারি ও লজিস্টিক
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
                {deliveryFeatures.map((feature, index) => renderFeatureCard(feature, index))}
              </div>
            </div>

            {/* ৫. অ্যানালিটিক্স ও রিপোর্টিং */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 px-2">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                </div>
                📊 ৫. অ্যানালিটিক্স ও রিপোর্টিং
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
                {analyticsFeatures.map((feature, index) => renderFeatureCard(feature, index))}
              </div>
            </div>

            {/* ৬. ডিজাইন ও কাস্টমাইজেশন */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 px-2">
                <div className="p-2 bg-pink-100 rounded-full">
                  <Palette className="h-4 w-4 text-pink-600" />
                </div>
                🎨 ৬. ডিজাইন ও কাস্টমাইজেশন
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
                {designFeatures.map((feature, index) => renderFeatureCard(feature, index))}
              </div>
            </div>

            {/* ৭. এডভান্সড ফিচার */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2 px-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <Settings className="h-4 w-4 text-red-600" />
                </div>
                🚀 ৭. এডভান্সড ফিচার
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-2">
                {advancedFeatures.map((feature, index) => renderFeatureCard(feature, index))}
              </div>
            </div>
            
            {/* Call to Action - Fully Responsive */}
            <div className="mt-8 text-center px-4">
              <div className="bg-gradient-to-r from-primary/10 to-purple-100 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">🚀 সব ফিচার একসাথে পাবেন!</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  উপরের সকল ফিচার আপনার স্টোরে স্বয়ংক্রিয়ভাবে যুক্ত হবে। কোনো অতিরিক্ত সেটআপের প্রয়োজন নেই।
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-primary">৮+</div>
                    <div className="text-xs text-gray-600">ফিচার ক্যাটাগরি</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-green-600">২৮+</div>
                    <div className="text-xs text-gray-600">মোট ফিচার</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-purple-600">১৮+</div>
                    <div className="text-xs text-gray-600">প্রিমিয়াম ফিচার</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold text-orange-600">১০+</div>
                    <div className="text-xs text-gray-600">ফ্রি ফিচার</div>
                  </div>
                </div>
              </div>
              <Link to="/create-store/new">
                <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-base bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-600 hover:shadow-lg transition-all duration-300">
                  <Zap className="h-5 w-5 mr-2" />
                  এখনই আপনার স্টোর তৈরি করুন
                </Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="linkinbio" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
              {linkInBioFeatures.map((feature, index) => renderFeatureCard(feature, index))}
            </div>
            
            <div className="text-center mt-8 px-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-2">🔗 সকল লিংক এক জায়গায়!</h3>
                <p className="text-muted-foreground text-sm">
                  আপনার সোশ্যাল মিডিয়া বায়োতে একটি লিংক দিয়ে সব কিছু শেয়ার করুন।
                </p>
              </div>
              <Link to="/create-linkinbio">
                <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-base bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg transition-all duration-300">
                  <Globe className="h-5 w-5 mr-2" />
                  লিংক ইন বায়ো পেজ তৈরি করুন
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* সাহায্য সেকশন - Fully Responsive */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 sm:p-6 mt-8 border mx-2 sm:mx-0">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600 flex-shrink-0">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base sm:text-lg mb-2">💡 আমরা আপনাকে সাহায্য করব</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              আপনার অনলাইন ব্যবসা শুরু করতে আমাদের এক্সপার্ট টিম ২৪/৭ প্রস্তুত আছে। কোন প্রশ্ন বা সমস্যা থাকলে যোগাযোগ করুন।
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Headphones className="h-3 w-3 mr-1" />
                লাইভ চ্যাট
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Phone className="h-3 w-3 mr-1" />
                ফোন সাপোর্ট
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Mail className="h-3 w-3 mr-1" />
                ইমেইল সাপোর্ট
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreFeaturesList;
