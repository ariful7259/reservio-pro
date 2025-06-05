
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, CreditCard, MessageSquare, Star, AlertTriangle,
  Clock, CheckCircle, FileText, Shield, Search, Filter,
  ThumbsUp, ThumbsDown, Upload, Download, User, Calendar
} from 'lucide-react';

const SecurePayBuyer = () => {
  const [activeTab, setActiveTab] = useState('orders');

  // Mock data
  const orderHistory = [
    {
      id: 'ORD001',
      service: 'লোগো ডিজাইন',
      creator: 'ডিজাইন এক্সপার্ট',
      amount: '৳৩,০০০',
      status: 'completed',
      date: '২৫ নভেম্বর, ২০২৪',
      rating: 5,
      canRate: false
    },
    {
      id: 'ORD002',
      service: 'ওয়েবসাইট ডিজাইন', 
      creator: 'ওয়েব মাস্টার',
      amount: '৳১৫,০০০',
      status: 'in_progress',
      date: '২৩ নভেম্বর, ২০২৪',
      rating: null,
      canRate: false
    },
    {
      id: 'ORD003',
      service: 'ভিডিও এডিটিং',
      creator: 'ভিডিও প্রো',
      amount: '৳৫,০০০',
      status: 'delivered',
      date: '২০ নভেম্বর, ২০২৪',
      rating: null,
      canRate: true
    }
  ];

  const stats = [
    {
      title: 'মোট অর্ডার',
      value: '১২',
      icon: <ShoppingCart className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'সম্পন্ন অর্ডার',
      value: '৮',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'মোট খরচ',
      value: '৳৩৮,৫০০',
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'গড় রেটিং',
      value: '৪.৮',
      icon: <Star className="h-5 w-5 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">চলমান</Badge>;
      case 'delivered':
        return <Badge className="bg-yellow-100 text-yellow-800">ডেলিভারি সম্পন্ন</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800">বিরোধ</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            বায়ার ড্যাশবোর্ড
          </h1>
          <p className="text-muted-foreground mt-2">
            আপনার অর্ডার ট্র্যাক করুন এবং সার্ভিস রেটিং দিন
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            সার্ভিস খুঁজুন
          </Button>
          <Button size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            নতুন অর্ডার করুন
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
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-1 h-auto p-1">
          <TabsTrigger value="orders" className="flex items-center gap-2 px-4 py-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">অর্ডার ইতিহাস</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2 px-4 py-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">মেসেজ</span>
          </TabsTrigger>
          <TabsTrigger value="disputes" className="flex items-center gap-2 px-4 py-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">বিরোধ</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2 px-4 py-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">পেমেন্ট</span>
          </TabsTrigger>
        </TabsList>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>অর্ডার ইতিহাস</CardTitle>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                ফিল্টার
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{order.service}</h4>
                          {getStatusBadge(order.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {order.creator}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {order.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {order.id}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:items-end gap-2">
                        <p className="text-lg font-bold">{order.amount}</p>
                        {order.rating && (
                          <div className="flex items-center gap-1">
                            {renderStars(order.rating)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline">
                        বিস্তারিত দেখুন
                      </Button>
                      {order.canRate && (
                        <Button size="sm" variant="outline">
                          <Star className="h-4 w-4 mr-1" />
                          রেটিং দিন
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          কনফার্ম করুন
                        </Button>
                      )}
                      {order.status === 'in_progress' && (
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          মেসেজ করুন
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>মেসেজ সিস্টেম</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">কোনো মেসেজ নেই</h3>
                <p className="text-muted-foreground mb-4">
                  ক্রিয়েটরদের সাথে যোগাযোগ করতে মেসেজ করুন
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                বিরোধ সমাধান
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">কোনো বিরোধ নেই</h3>
                <p className="text-muted-foreground mb-4">
                  সমস্যা হলে বিরোধ তুলতে পারেন
                </p>
                <Button variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  বিরোধ তুলুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট মেথড</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-medium">bKash</p>
                        <p className="text-sm text-muted-foreground">***0123</p>
                      </div>
                    </div>
                    <Badge variant="outline">প্রাথমিক</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">Nagad</p>
                        <p className="text-sm text-muted-foreground">***4567</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  নতুন পেমেন্ট মেথড যোগ করুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>লেনদেনের ইতিহাস</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">লোগো ডিজাইন</p>
                      <p className="text-sm text-muted-foreground">২৫ নভেম্বর, ২০২৪</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">-৳৩,০০০</p>
                      <Badge className="bg-green-100 text-green-800">সফল</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">ওয়েবসাইট ডিজাইন</p>
                      <p className="text-sm text-muted-foreground">২৩ নভেম্বর, ২০২৪</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-yellow-600">-৳১৫,০০০</p>
                      <Badge className="bg-yellow-100 text-yellow-800">এসক্রোতে</Badge>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  সব ট্রানজেকশন ডাউনলোড করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurePayBuyer;
