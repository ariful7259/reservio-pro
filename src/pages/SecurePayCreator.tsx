
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, DollarSign, TrendingUp, Eye, Settings, Plus, 
  Star, Calendar, Download, CreditCard, Shield, AlertTriangle,
  CheckCircle, Clock, FileText, Palette, Smartphone, Monitor,
  Tablet, Globe, Facebook, Youtube, Instagram, Linkedin
} from 'lucide-react';

const SecurePayCreator = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const stats = [
    {
      title: 'মোট আয়',
      value: '৳৪৫,২৫০',
      change: '+১২%',
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'এই মাসে অর্ডার',
      value: '২৮',
      change: '+৮%',
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'রেটিং',
      value: '৪.৯',
      change: '+০.২',
      icon: <Star className="h-5 w-5 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'পেন্ডিং পেমেন্ট',
      value: '৳৮,৫০০',
      change: 'এসক্রোতে',
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      service: 'লোগো ডিজাইন',
      buyer: 'আহমেদ হাসান',
      amount: '৳৩,০০০',
      status: 'completed',
      date: '২৫ নভেম্বর, ২০২৪'
    },
    {
      id: 'ORD002', 
      service: 'ওয়েবসাইট ডিজাইন',
      buyer: 'ফাতেমা খান',
      amount: '৳১৫,০০০',
      status: 'in_progress',
      date: '২৩ নভেম্বর, ২০২৪'
    },
    {
      id: 'ORD003',
      service: 'ভিডিও এডিটিং',
      buyer: 'করিম উদ্দিন',
      amount: '৳৫,০০০',
      status: 'escrow',
      date: '২০ নভেম্বর, ২০২৪'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Facebook Ads Landing',
      category: 'Social Media',
      preview: 'https://via.placeholder.com/300x200',
      platform: 'Facebook',
      icon: <Facebook className="h-5 w-5 text-blue-600" />
    },
    {
      id: 2,
      name: 'YouTube Creator Page',
      category: 'Video Marketing',
      preview: 'https://via.placeholder.com/300x200',
      platform: 'YouTube',
      icon: <Youtube className="h-5 w-5 text-red-600" />
    },
    {
      id: 3,
      name: 'Instagram Business',
      category: 'Social Commerce',
      preview: 'https://via.placeholder.com/300x200',
      platform: 'Instagram',
      icon: <Instagram className="h-5 w-5 text-pink-600" />
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">চলমান</Badge>;
      case 'escrow':
        return <Badge className="bg-purple-100 text-purple-800">এসক্রোতে</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-600" />
            ক্রিয়েটর ড্যাশবোর্ড
          </h1>
          <p className="text-muted-foreground mt-2">
            আপনার সার্ভিস ম্যানেজ করুন এবং আয় ট্র্যাক করুন
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            নতুন সার্ভিস যোগ করুন
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
                  <p className="text-sm text-muted-foreground">{stat.change}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  {stat.icon}
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
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">ওভারভিউ</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2 px-4 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">সার্ভিস</span>
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2 px-4 py-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">আয়</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 px-4 py-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">টেমপ্লেট</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 px-4 py-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">সেটিংস</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  সাম্প্রতিক অর্ডার
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{order.service}</h4>
                        <p className="text-sm text-muted-foreground">
                          {order.buyer} • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.amount}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>দ্রুত অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন সার্ভিস যোগ করুন
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  পেমেন্ট উইথড্র করুন
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  পাবলিক প্রোফাইল দেখুন
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  রিপোর্ট জেনারেট করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>আমার সার্ভিস সমূহ</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                নতুন সার্ভিস
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">এখনো কোনো সার্ভিস যোগ করা হয়নি</h3>
                <p className="text-muted-foreground mb-4">
                  আপনার প্রথম সার্ভিস যোগ করে ক্রিয়েটর যাত্রা শুরু করুন
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  সার্ভিস যোগ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>আয়ের চার্ট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mb-4" />
                  <div className="text-center">
                    <p>আয়ের চার্ট এখানে দেখানো হবে</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>উইথড্র করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">৳৩৬,৭৫০</p>
                  <p className="text-sm text-muted-foreground">উইথড্র করার জন্য উপলব্ধ</p>
                </div>
                <Button className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  উইথড্র করুন
                </Button>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>bKash:</span>
                    <span>***0123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nagad:</span>
                    <span>***4567</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ল্যান্ডিং পেজ টেমপ্লেট</CardTitle>
              <p className="text-sm text-muted-foreground">
                আপনার সার্ভিসের জন্য প্রি-মেড টেমপ্লেট ব্যবহার করুন
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video bg-gray-100 relative">
                      <img 
                        src={template.preview} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {template.icon}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{template.category}</p>
                      <div className="flex gap-2">
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

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>প্রোফাইল সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">প্রোফাইল সেটিংস এখানে থাকবে</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">পেমেন্ট মেথড সেটিংস এখানে থাকবে</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurePayCreator;
