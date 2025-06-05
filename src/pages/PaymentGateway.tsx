
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, Smartphone, QrCode, BarChart3, History, RefreshCw,
  Settings, Link, Users, TrendingUp, CheckCircle2, AlertCircle,
  Clock, Shield, Code, Bell, UserCheck, Eye, MessageSquare,
  Upload, Palette, Globe, Video, Image, FileText
} from 'lucide-react';

const PaymentGateway = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Payment gateway stats
  const stats = [
    {
      title: 'আজকের পেমেন্ট',
      value: '৳৪ৈ,৫০০',
      change: '+১২%',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'সফল ট্রানজেকশন',
      value: '১৮৫',
      change: '+৮%',
      icon: <CheckCircle2 className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Escrow এ সংরক্ষিত',
      value: '৳২৫,০০০',
      change: '+১৫%',
      icon: <Shield className="h-5 w-5 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'সক্রিয় বিরোধ',
      value: '৩',
      change: '-২%',
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      color: 'bg-red-50 border-red-200'
    }
  ];

  const features = [
    {
      title: 'পেমেন্ট গেটওয়ে ইন্টিগ্রেশন',
      description: 'bKash, Nagad, Rocket, VISA - সব ধরনের পেমেন্ট গেটওয়ে',
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      stats: 'ত৬+ গেটওয়ে সাপোর্ট'
    },
    {
      title: 'রিয়েল-টাইম মেসেজিং',
      description: 'ক্রিয়েটর ও বায়ারের মধ্যে তাৎক্ষণিক যোগাযোগ',
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      stats: '৯৯.৯% আপটাইম'
    },
    {
      title: 'টেমপ্লেট সিস্টেম',
      description: '৫০+ প্রিমিয়াম ল্যান্ডিং পেজ টেমপ্লেট',
      icon: <Palette className="h-8 w-8 text-pink-600" />,
      stats: '৫০+ টেমপ্লেট'
    },
    {
      title: 'ফাইল আপলোড সিস্টেম',
      description: 'নিরাপদে ফাইল শেয়ার করুন - ইমেজ, ভিডিও, ডকুমেন্ট',
      icon: <Upload className="h-8 w-8 text-orange-600" />,
      stats: '১০০ MB লিমিট'
    }
  ];

  const paymentMethods = [
    { name: 'bKash', transactions: '১২,৫০০', success: '৯৯.৮%' },
    { name: 'Nagad', transactions: '৮,৭০০', success: '৯৯.৫%' },
    { name: 'Rocket', transactions: '৫,২০০', success: '৯৯.২%' },
    { name: 'VISA', transactions: '৩,১০০', success: '৯৯.৯%' }
  ];

  const templates = [
    { category: 'Facebook Ads', count: 12, downloads: 1250 },
    { category: 'Google Ads', count: 8, downloads: 890 },
    { category: 'YouTube Ads', count: 10, downloads: 1100 },
    { category: 'Instagram Ads', count: 15, downloads: 1800 }
  ];

  const fileStats = [
    { type: 'Images', uploaded: '২,৫০০', size: '১.২ GB' },
    { type: 'Videos', uploaded: '৮৯০', size: '৫.৮ GB' },
    { type: 'Documents', uploaded: '১,২০০', size: '৫৫০ MB' },
    { type: 'Others', uploaded: '৩৫০', size: '২০০ MB' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-primary" />
            SecurePay - Advanced Features
          </h1>
          <p className="text-muted-foreground mt-2">
            সম্পূর্ণ Creator Payment সিস্টেম - নতুন ফিচার সহ
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস
          </Button>
          <Button size="sm">
            <Link className="h-4 w-4 mr-2" />
            নতুন পেমেন্ট পেজ
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className={`${stat.color} transition-all hover:shadow-md`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.change} গত সপ্তাহ থেকে</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-white rounded-lg p-3 shadow-md">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                  <Badge variant="outline">{feature.stats}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1 h-auto p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 px-4 py-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">ওভারভিউ</span>
          </TabsTrigger>
          <TabsTrigger value="payment-gateway" className="flex items-center gap-2 px-4 py-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">পেমেন্ট গেটওয়ে</span>
          </TabsTrigger>
          <TabsTrigger value="messaging" className="flex items-center gap-2 px-4 py-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">মেসেজিং</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 px-4 py-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">টেমপ্লেট</span>
          </TabsTrigger>
          <TabsTrigger value="file-system" className="flex items-center gap-2 px-4 py-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">ফাইল সিস্টেম</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>সিস্টেম স্ট্যাটাস</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>API Status</span>
                    <Badge className="bg-green-100 text-green-800">অনলাইন</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Database</span>
                    <Badge className="bg-green-100 text-green-800">সংযুক্ত</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment Gateways</span>
                    <Badge className="bg-green-100 text-green-800">৬/৬ সক্রিয়</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Messaging Service</span>
                    <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>দ্রুত অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  নতুন পেমেন্ট গেটওয়ে যোগ করুন
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  মেসেজিং সেটআপ করুন
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Palette className="h-4 w-4 mr-2" />
                  নতুন টেমপ্লেট আপলোড করুন
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  ফাইল স্টোরেজ কনফিগার করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment Gateway Tab */}
        <TabsContent value="payment-gateway" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট গেটওয়ে ইন্টিগ্রেশন</CardTitle>
              <CardDescription>
                সব ধরনের পেমেন্ট মেথড ইন্টিগ্রেট করুন এবং ট্র্যাক করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paymentMethods.map((method, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{method.name}</h3>
                        <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ট্রানজেকশন:</span>
                          <span className="font-medium">{method.transactions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>সাকসেস রেট:</span>
                          <span className="font-medium text-green-600">{method.success}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4" size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        কনফিগার করুন
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messaging Tab */}
        <TabsContent value="messaging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>রিয়েল-টাইম মেসেজিং সিস্টেম</CardTitle>
              <CardDescription>
                ক্রিয়েটর ও বায়ারের মধ্যে তাৎক্ষণিক যোগাযোগ ব্যবস্থা
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">তাৎক্ষণিক চ্যাট</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      WebSocket ভিত্তিক রিয়েল-টাইম মেসেজিং
                    </p>
                    <Badge>৯৯.৯% আপটাইম</Badge>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">ফাইল শেয়ারিং</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      চ্যাটের মাধ্যমে নিরাপদ ফাইল আদান-প্রদান
                    </p>
                    <Badge>৫০ MB লিমিট</Badge>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bell className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">পুশ নোটিফিকেশন</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      তাৎক্ষণিক নোটিফিকেশন সিস্টেম
                    </p>
                    <Badge>সক্রিয়</Badge>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>প্রিমিয়াম টেমপ্লেট কালেকশন</CardTitle>
              <CardDescription>
                ৫০+ প্রোফেশনাল ল্যান্ডিং পেজ টেমপ্লেট
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                          <Palette className="h-6 w-6 text-pink-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{template.category}</h3>
                          <p className="text-sm text-muted-foreground">{template.count} টেমপ্লেট</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>ডাউনলোড:</span>
                          <span className="font-medium">{template.downloads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>রেটিং:</span>
                          <span className="font-medium text-yellow-600">৪.৮ ⭐</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          প্রিভিউ
                        </Button>
                        <Button size="sm" className="flex-1">
                          ব্যবহার করুন
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* File System Tab */}
        <TabsContent value="file-system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ফাইল আপলোড ও ম্যানেজমেন্ট সিস্টেম</CardTitle>
              <CardDescription>
                নিরাপদ ফাইল স্টোরেজ ও শেয়ারিং সিস্টেম
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fileStats.map((file, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          {file.type === 'Images' && <Image className="h-6 w-6 text-orange-600" />}
                          {file.type === 'Videos' && <Video className="h-6 w-6 text-orange-600" />}
                          {file.type === 'Documents' && <FileText className="h-6 w-6 text-orange-600" />}
                          {file.type === 'Others' && <Upload className="h-6 w-6 text-orange-600" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{file.type}</h3>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>আপলোড:</span>
                          <span className="font-medium">{file.uploaded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>স্ট্যাটাস:</span>
                          <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-4" size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        বিস্তারিত দেখুন
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6">
                <Card className="border-2 border-dashed border-orange-300 bg-orange-50">
                  <CardContent className="p-8 text-center">
                    <Upload className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">ফাইল আপলোড জোন</h3>
                    <p className="text-muted-foreground mb-4">
                      ড্র্যাগ ও ড্রপ করুন অথবা ক্লিক করে ফাইল সিলেক্ট করুন
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <Badge variant="outline">JPG, PNG, GIF</Badge>
                      <Badge variant="outline">MP4, AVI, MOV</Badge>
                      <Badge variant="outline">PDF, DOC, PPT</Badge>
                      <Badge variant="outline">সর্বোচ্চ ১০০ MB</Badge>
                    </div>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      ফাইল বেছে নিন
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentGateway;
