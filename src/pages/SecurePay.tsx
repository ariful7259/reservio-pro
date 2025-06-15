import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Users, CreditCard, CheckCircle, Star, ArrowRight, 
  Lock, Zap, Globe, Phone, Mail, MessageSquare, AlertTriangle,
  TrendingUp, Award, Clock, UserCheck, Upload, FileText,
  Palette, Smartphone, Video, Image, Code, Bell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SecurePay = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "১০০% নিরাপদ এসক্রো সিস্টেম",
      description: "আপনার টাকা সম্পূর্ণ নিরাপদ থাকবে যতক্ষণ না সার্ভিস ডেলিভারি হয়",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      title: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
      description: "bKash, Nagad, Rocket, VISA - সব ধরনের পেমেন্ট গেটওয়ে সাপোর্ট",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "রিয়েল-টাইম মেসেজিং",
      description: "ক্রিয়েটর ও বায়ারের মধ্যে তাৎক্ষণিক যোগাযোগ ব্যবস্থা",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-600" />,
      title: "বিস্তারিত টেমপ্লেট",
      description: "৫০+ প্রো টেমপ্লেট - Facebook, Google, YouTube, Instagram Ads",
      color: "bg-pink-50 border-pink-200"
    },
    {
      icon: <Upload className="h-8 w-8 text-orange-600" />,
      title: "ফাইল আপলোড সিস্টেম",
      description: "নিরাপদে ফাইল শেয়ার করুন - ইমেজ, ভিডিও, ডকুমেন্ট",
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "মাল্টি-রোল ড্যাশবোর্ড",
      description: "ক্রিয়েটর, বায়ার এবং অ্যাডমিনের জন্য আলাদা ড্যাশবোর্ড",
      color: "bg-indigo-50 border-indigo-200"
    }
  ];

  const paymentGateways = [
    { name: "bKash", icon: "💳", color: "bg-pink-100" },
    { name: "Nagad", icon: "🏦", color: "bg-orange-100" },
    { name: "Rocket", icon: "🚀", color: "bg-purple-100" },
    { name: "VISA", icon: "💎", color: "bg-blue-100" },
    { name: "Mastercard", icon: "🏧", color: "bg-red-100" },
    { name: "PayPal", icon: "🌐", color: "bg-yellow-100" }
  ];

  const templates = [
    { name: "Facebook Ads", icon: <Video className="h-5 w-5" />, count: "12+" },
    { name: "Google Ads", icon: <Globe className="h-5 w-5" />, count: "8+" },
    { name: "YouTube Ads", icon: <Video className="h-5 w-5" />, count: "10+" },
    { name: "Instagram Ads", icon: <Image className="h-5 w-5" />, count: "15+" },
    { name: "LinkedIn Ads", icon: <Users className="h-5 w-5" />, count: "6+" },
    { name: "TikTok Ads", icon: <Smartphone className="h-5 w-5" />, count: "9+" }
  ];

  const fileTypes = [
    { type: "ইমেজ", formats: "JPG, PNG, GIF, WebP", icon: <Image className="h-5 w-5" /> },
    { type: "ভিডিও", formats: "MP4, AVI, MOV, WebM", icon: <Video className="h-5 w-5" /> },
    { type: "ডকুমেন্ট", formats: "PDF, DOC, PPT, XLS", icon: <FileText className="h-5 w-5" /> },
    { type: "কোড", formats: "HTML, CSS, JS, PSD", icon: <Code className="h-5 w-5" /> }
  ];

  const howItWorks = [
    {
      step: "১",
      title: "সার্ভিস অর্ডার করুন",
      description: "আপনার পছন্দের সার্ভিস বেছে নিন এবং অর্ডার করুন"
    },
    {
      step: "২", 
      title: "এসক্রোতে পেমেন্ট",
      description: "আপনার টাকা নিরাপদে এসক্রো অ্যাকাউন্টে জমা হবে"
    },
    {
      step: "৩",
      title: "সার্ভিস রিসিভ করুন",
      description: "ক্রিয়েটর আপনার কাজ সম্পন্ন করে ডেলিভারি দেবে"
    },
    {
      step: "৪",
      title: "কনফার্ম ও পেমেন্ট রিলিজ",
      description: "সন্তুষ্ট হলে কনফার্ম করুন, ক্রিয়েটর পেমেন্ট পেয়ে যাবে"
    }
  ];

  const stats = [
    { number: "৫০,০০০+", label: "সফল ট্রানজেকশন" },
    { number: "৯৯.৯%", label: "নিরাপত্তার হার" },
    { number: "২৪/৭", label: "কাস্টমার সাপোর্ট" },
    { number: "১০০+", label: "সার্ভিস ক্যাটেগরি" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-6 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-6">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            SecurePay
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            বাংলাদেশের প্রথম সম্পূর্ণ নিরাপদ এসক্রো পেমেন্ট প্ল্যাটফর্ম। 
            ডিজিটাল সার্ভিসের জন্য ১০০% সুরক্ষিত লেনদেন।
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => navigate('/securepay/creator')}
            >
              <Users className="h-5 w-5 mr-2" />
              ক্রিয়েটর হিসেবে শুরু করুন
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-2"
              onClick={() => navigate('/securepay/buyer')}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              বায়ার হিসেবে যোগ দিন
            </Button>
          </div>

          <div className="flex justify-center gap-2 flex-wrap">
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              <CheckCircle className="h-4 w-4 mr-1" />
              ১০০% নিরাপদ
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
              <Lock className="h-4 w-4 mr-1" />
              এসক্রো সুরক্ষা
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
              <Zap className="h-4 w-4 mr-1" />
              তাৎক্ষণিক পেমেন্ট
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
              <MessageSquare className="h-4 w-4 mr-1" />
              রিয়েল-টাইম চ্যাট
            </Badge>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            নতুন <span className="text-blue-600">ফিচার সমূহ</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`${feature.color} hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white rounded-lg p-3 shadow-md">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Gateway Section */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <CreditCard className="h-8 w-8 mx-auto mb-4 text-green-600" />
              সাপোর্টেড পেমেন্ট গেটওয়ে
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {paymentGateways.map((gateway, index) => (
                <div key={index} className={`${gateway.color} p-4 rounded-lg text-center hover:shadow-md transition-all`}>
                  <div className="text-2xl mb-2">{gateway.icon}</div>
                  <div className="font-medium">{gateway.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates Section */}
        <Card className="mb-16 bg-gradient-to-r from-pink-50 to-purple-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <Palette className="h-8 w-8 mx-auto mb-4 text-pink-600" />
              প্রিমিয়াম টেমপ্লেট কালেকশন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {templates.map((template, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-all border">
                  <div className="text-pink-600 mb-2 flex justify-center">{template.icon}</div>
                  <div className="font-medium text-sm">{template.name}</div>
                  <div className="text-xs text-gray-500">{template.count} টেমপ্লেট</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card className="mb-16 bg-gradient-to-r from-orange-50 to-yellow-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <Upload className="h-8 w-8 mx-auto mb-4 text-orange-600" />
              ফাইল আপলোড সিস্টেম
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fileTypes.map((file, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-all border">
                  <div className="text-orange-600 mb-3 flex justify-center">{file.icon}</div>
                  <div className="font-medium text-lg mb-2">{file.type}</div>
                  <div className="text-sm text-gray-500">{file.formats}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                সর্বোচ্চ ১০০ MB পর্যন্ত নিরাপদ আপলোড
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Messaging Section */}
        <Card className="mb-16 bg-gradient-to-r from-purple-50 to-indigo-50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <MessageSquare className="h-8 w-8 mx-auto mb-4 text-purple-600" />
              রিয়েল-টাইম মেসেজিং সিস্টেম
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">তাৎক্ষণিক চ্যাট</h3>
                <p className="text-sm text-gray-600">ক্রিয়েটর ও বায়ারের মধ্যে সরাসরি যোগাযোগ</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">ফাইল শেয়ারিং</h3>
                <p className="text-sm text-gray-600">চ্যাটের মাধ্যমে ফাইল পাঠান ও গ্রহণ করুন</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Bell className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">নোটিফিকেশন</h3>
                <p className="text-sm text-gray-600">প্রতিটি মেসেজের জন্য তাৎক্ষণিক নোটিফিকেশন</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            কীভাবে <span className="text-purple-600">কাজ করে?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-auto mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Security Section */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4">
                <Shield className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">নিরাপত্তা আমাদের অগ্রাধিকার</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              আমাদের এসক্রো সিস্টেম নিশ্চিত করে যে আপনার টাকা সম্পূর্ণ নিরাপদ থাকবে। 
              শুধুমাত্র সার্ভিস সফলভাবে ডেলিভারি হওয়ার পর পেমেন্ট রিলিজ হবে।
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <Lock className="h-4 w-4 mr-2" />
                SSL এনক্রিপশন
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                <UserCheck className="h-4 w-4 mr-2" />
                KYC ভেরিফিকেশন
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                <AlertTriangle className="h-4 w-4 mr-2" />
                ফ্রড প্রোটেকশন
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">আজই শুরু করুন SecurePay দিয়ে</h2>
            <p className="text-xl mb-6 opacity-90">
              নিরাপদ পেমেন্ট সিস্টেমের সাথে আপনার ডিজিটাল ব্যবসা এগিয়ে নিন
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate('/securepay/creator')}
              >
                ক্রিয়েটর ড্যাশবোর্ড
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/securepay/admin')}
              >
                অ্যাডমিন প্যানেল
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurePay;
