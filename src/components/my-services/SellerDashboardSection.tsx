
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package, 
  Star,
  Eye,
  MessageSquare,
  Calendar,
  BarChart3,
  Settings,
  Plus,
  Activity
} from 'lucide-react';

const SellerDashboardSection = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'মোট বিক্রয়',
      value: '৳১,২৫,০০০',
      change: '+১২%',
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      color: 'text-green-600'
    },
    {
      title: 'মোট অর্ডার',
      value: '১৪৮',
      change: '+৮%',
      icon: <Package className="h-6 w-6 text-blue-500" />,
      color: 'text-blue-600'
    },
    {
      title: 'মোট কাস্টমার',
      value: '৯৬',
      change: '+১৫%',
      icon: <Users className="h-6 w-6 text-purple-500" />,
      color: 'text-purple-600'
    },
    {
      title: 'গড় রেটিং',
      value: '৪.৭',
      change: '+০.২',
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      color: 'text-yellow-600'
    }
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'রহিম উদ্দিন',
      product: 'স্মার্ট ওয়াচ',
      amount: '৳৫,৫০০',
      status: 'pending',
      date: '২৮ এপ্রিল, ২০২৫'
    },
    {
      id: 'ORD002',
      customer: 'ফাতিমা খাতুন',
      product: 'ব্লুটুথ ইয়ারফোন',
      amount: '৳২,৮০০',
      status: 'completed',
      date: '২৭ এপ্রিল, ২০২৫'
    },
    {
      id: 'ORD003',
      customer: 'করিম আহমেদ',
      product: 'মোবাইল কেস',
      amount: '৳৪৫০',
      status: 'shipped',
      date: '২৬ এপ্রিল, ২০২৫'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'সম্পন্ন';
      case 'pending': return 'অপেক্ষমাণ';
      case 'shipped': return 'পাঠানো';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            বিক্রেতা ড্যাশবোর্ড
          </h2>
          <p className="text-muted-foreground">আপনার বিক্রয় পরিসংখ্যান ও ব্যবসায়িক তথ্য</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            নতুন প্রোডাক্ট
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
          <TabsTrigger value="orders">অর্ডার</TabsTrigger>
          <TabsTrigger value="products">প্রোডাক্ট</TabsTrigger>
          <TabsTrigger value="analytics">এনালিটিক্স</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <span className={`text-sm ${stat.color}`}>{stat.change}</span>
                      </div>
                    </div>
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  সাম্প্রতিক অর্ডার
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-bold text-primary">{order.amount}</p>
                      <Badge className={`${getStatusColor(order.status)} text-xs`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  সব অর্ডার দেখুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  দ্রুত পরিসংখ্যান
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">আজকের বিক্রয়</span>
                    <span className="font-bold text-green-600">৳৮,৫০০</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">এই সপ্তাহে অর্ডার</span>
                    <span className="font-bold text-blue-600">২৩টি</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">নতুন কাস্টমার</span>
                    <span className="font-bold text-purple-600">৭জন</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">পেন্ডিং রিভিউ</span>
                    <span className="font-bold text-orange-600">৪টি</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  বিস্তারিত রিপোর্ট
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">অর্ডার ম্যানেজমেন্ট সিস্টেম</p>
              <Button>অর্ডার ম্যানেজমেন্টে যান</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">প্রোডাক্ট ম্যানেজমেন্ট সিস্টেম</p>
              <Button>প্রোডাক্ট ম্যানেজমেন্টে যান</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">বিস্তারিত এনালিটিক্স ও রিপোর্ট</p>
              <Button>এনালিটিক্স ড্যাশবোর্ডে যান</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboardSection;
