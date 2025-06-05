import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, DollarSign, TrendingUp, Eye, Settings, Plus, 
  Star, Calendar, Download, CreditCard, Shield, AlertTriangle,
  CheckCircle, Clock, FileText, Palette, Smartphone, Monitor,
  Tablet, Globe, Facebook, Youtube, Instagram, Linkedin,
  MessageSquare, Upload, Bell, Send, Image, Video
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

  const recentMessages = [
    {
      id: 1,
      buyer: 'আহমেদ হাসান',
      message: 'লোগো ডিজাইনের কাজ কেমন চলছে?',
      time: '৫ মিনিট আগে',
      unread: true
    },
    {
      id: 2,
      buyer: 'ফাতেমা খান',
      message: 'ওয়েবসাইটের ফাইল পাঠিয়েছি',
      time: '১০ মিনিট আগে',
      unread: false
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Facebook Ads Landing',
      category: 'Social Media',
      preview: 'https://via.placeholder.com/300x200',
      platform: 'Facebook',
      icon: <Facebook className="h-5 w-5 text-blue-600" />,
      downloads: 156
    },
    {
      id: 2,
      name: 'YouTube Creator Page',
      category: 'Video Marketing',
      preview: 'https://via.placeholder.com/300x200',
      platform: 'YouTube',
      icon: <Youtube className="h-5 w-5 text-red-600" />,
      downloads: 89
    },
    {
      id: 3,
      name: 'Instagram Business',
      category: 'Social Commerce',
      preview: 'https://via.placeholder.com/300x200',
      platform: 'Instagram',
      icon: <Instagram className="h-5 w-5 text-pink-600" />,
      downloads: 234
    },
    {
      id: 4,
      name: 'Google Ads Campaign',
      category: 'Search Marketing',
      preview: 'https://via.placeholder.com/300x200',
      platform: 'Google',
      icon: <Globe className="h-5 w-5 text-green-600" />,
      downloads: 198
    }
  ];

  const paymentGateways = [
    { name: 'bKash', status: 'connected', balance: '৳১২,৫০০' },
    { name: 'Nagad', status: 'connected', balance: '৳৮,৭০০' },
    { name: 'Rocket', status: 'pending', balance: '৳০' },
    { name: 'VISA', status: 'not_connected', balance: '৳০' }
  ];

  const fileUploads = [
    {
      id: 1,
      name: 'client_logo_design.psd',
      type: 'image',
      size: '45.2 MB',
      uploadedAt: '২ ঘন্টা আগে',
      status: 'completed'
    },
    {
      id: 2,
      name: 'promotional_video.mp4',
      type: 'video',
      size: '89.5 MB',
      uploadedAt: '১ দিন আগে',
      status: 'processing'
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

  const getPaymentStatus = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">সংযুক্ত</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">পেন্ডিং</Badge>;
      case 'not_connected':
        return <Badge className="bg-red-100 text-red-800">সংযুক্ত নয়</Badge>;
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
            <Bell className="h-4 w-4 mr-2" />
            নোটিফিকেশন (৩)
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
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 gap-1 h-auto p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 px-4 py-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">ওভারভিউ</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2 px-4 py-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">মেসেজ</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 px-4 py-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">টেমপ্লেট</span>
          </TabsTrigger>
          <TabsTrigger value="files" className="flex items-center gap-2 px-4 py-2">
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">ফাইল</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2 px-4 py-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">পেমেন্ট</span>
          </TabsTrigger>
          <TabsTrigger value="earnings" className="flex items-center gap-2 px-4 py-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">আয়</span>
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

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  সাম্প্রতিক মেসেজ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className={`p-3 border rounded-lg ${msg.unread ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{msg.buyer}</h4>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                      {msg.unread && (
                        <Badge className="bg-blue-100 text-blue-800 mt-2">নতুন</Badge>
                      )}
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  সব মেসেজ দেখুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>রিয়েল-টাইム মেসেজিং</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="font-medium">কনভার্সেশন</h3>
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${msg.unread ? 'bg-blue-50' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{msg.buyer}</h4>
                          <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                        </div>
                        {msg.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2">
                  <div className="border rounded-lg h-96 flex flex-col">
                    <div className="p-4 border-b flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">আহমেদ হাসান</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                            হ্যালো! আপনার লোগো ডিজাইনের কাজ কেমন চলছে?
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                            হ্যালো! কাজ প্রায় শেষ। আজ সন্ধ্যার মধ্যে ডেলিভারি দিতে পারব।
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="মেসেজ লিখুন..." 
                          className="flex-1 p-2 border rounded-lg"
                        />
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          ফাইল
                        </Button>
                        <Button size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>প্রিমিয়াম ল্যান্ডিং পেজ টেমপ্লেট</CardTitle>
              <p className="text-sm text-muted-foreground">
                ৫০+ প্রোফেশনাল টেমপ্লেট - সব প্ল্যাটফর্মের জন্য অপ্টিমাইজড
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      <div className="absolute bottom-2 left-2">
                        <Badge className="bg-white text-gray-800">
                          {template.downloads} ডাউনলোড
                        </Badge>
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
              <div className="text-center mt-6">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  আরও টেমপ্লেট দেখুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ফাইল আপলোড</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">ফাইল আপলোড করুন</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ইমেজ, ভিডিও, ডকুমেন্ট - সর্বোচ্চ ১০০ MB
                  </p>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    ফাইল বেছে নিন
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Image className="h-4 w-4" />
                    <span>ইমেজ: JPG, PNG, GIF, WebP</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Video className="h-4 w-4" />
                    <span>ভিডিও: MP4, AVI, MOV, WebM</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>ডকুমেন্ট: PDF, DOC, PPT, XLS</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>আপলোডেড ফাইল সমূহ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fileUploads.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {file.type === 'image' && <Image className="h-5 w-5 text-blue-600" />}
                          {file.type === 'video' && <Video className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{file.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {file.size} • {file.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>
                        )}
                        {file.status === 'processing' && (
                          <Badge className="bg-yellow-100 text-yellow-800">প্রসেসিং</Badge>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট গেটওয়ে ইন্টিগ্রেশন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paymentGateways.map((gateway, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{gateway.name}</h3>
                          <p className="text-sm text-muted-foreground">{gateway.balance}</p>
                        </div>
                      </div>
                      {getPaymentStatus(gateway.status)}
                    </div>
                    <div className="flex gap-2">
                      {gateway.status === 'connected' ? (
                        <Button size="sm" variant="outline" className="flex-1">
                          সেটিংস
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1">
                          সংযুক্ত করুন
                        </Button>
                      )}
                      {gateway.status === 'connected' && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
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
                <CardTitle>নোটিফিকেশন সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">নোটিফিকেশন সেটিংস এখানে থাকবে</p>
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
