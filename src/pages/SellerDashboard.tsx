
import React, { useState } from 'react';
import { 
  BarChart, 
  Download,
  ShoppingBag,
  TrendingUp,
  Users,
  CircleDollarSign,
  Plus,
  FileText,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('this-month');
  
  const stats = {
    'this-month': {
      sales: '৳১৫,৯৫০',
      orders: 42,
      customers: 36,
      growth: 12.5,
      products: 8
    },
    'last-month': {
      sales: '৳১২,৭৫০',
      orders: 35,
      customers: 30,
      growth: 8.3,
      products: 6
    },
    'this-year': {
      sales: '৳৮৫,৮০০',
      orders: 230,
      customers: 145,
      growth: 32.7,
      products: 8
    }
  };
  
  const currentStats = stats[dateRange as keyof typeof stats];
  
  const latestOrders = [
    {
      id: 'ORD-12345',
      customer: 'রাহিম আহমেদ',
      product: 'বিজনেস স্টার্টাপ গাইড',
      date: '২৭ এপ্রিল, ২০২৫',
      amount: '৳৯৯৯',
      status: 'delivered'
    },
    {
      id: 'ORD-12344',
      customer: 'সাবিনা খাতুন',
      product: 'প্রিমিয়াম ওয়েবসাইট টেমপ্লেট',
      date: '২৫ এপ্রিল, ২০২৫',
      amount: '৳২,৫০০',
      status: 'delivered'
    },
    {
      id: 'ORD-12343',
      customer: 'তানভীর হোসেন',
      product: 'ডিজিটাল মার্কেটিং মাস্টার কোর্স',
      date: '২৩ এপ্রিল, ২০২৫',
      amount: '৳৫,৯৯৯',
      status: 'processing'
    },
    {
      id: 'ORD-12342',
      customer: 'ফারিয়া ইসলাম',
      product: 'মেডিটেশন অডিও সিরিজ',
      date: '২১ এপ্রিল, ২০২৫',
      amount: '৳৮৯৯',
      status: 'delivered'
    }
  ];
  
  const topProducts = [
    {
      id: 1,
      name: 'ডিজিটাল মার্কেটিং মাস্টার কোর্স',
      sales: 45,
      revenue: '৳২,৬৯,৯৫৫',
      type: 'course'
    },
    {
      id: 2,
      name: 'বিজনেস স্টার্টাপ গাইড',
      sales: 38,
      revenue: '৳৩৭,৯৬২',
      type: 'ebook'
    },
    {
      id: 3,
      name: 'প্রিমিয়াম ওয়েবসাইট টেমপ্লেট',
      sales: 27,
      revenue: '৳৬৭,৫০০',
      type: 'template'
    }
  ];

  return (
    <div className="container pt-20 pb-16">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">বিক্রেতা ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার ডিজিটাল প্রোডাক্ট সেলস ও পারফরম্যান্স পর্যবেক্ষণ করুন</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/create-digital-product')}
          >
            <Plus className="h-4 w-4 mr-2" />
            নতুন প্রোডাক্ট
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>
      </div>
      
      {/* Date Range Selector */}
      <Tabs defaultValue="this-month" className="mb-6" onValueChange={value => setDateRange(value)}>
        <TabsList>
          <TabsTrigger value="this-month">এই মাস</TabsTrigger>
          <TabsTrigger value="last-month">গত মাস</TabsTrigger>
          <TabsTrigger value="this-year">এই বছর</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট বিক্রয়</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.sales}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{currentStats.growth}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট অর্ডার</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.orders}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.8)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট গ্রাহক</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.customers}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.9)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট প্রোডাক্ট</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.products}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>২ এক্টিভ, {currentStats.products - 2} ড্রাফট</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Chart */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>বিক্রয় পরিসংখ্যান</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            ডাউনলোড
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center border rounded">
            <BarChart className="h-10 w-10 text-muted-foreground opacity-50" />
            <p className="ml-2 text-muted-foreground">সেলস ডাটা চার্ট এখানে দেখানো হবে</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Latest Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/orders')}>
              সব দেখুন <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.product}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{order.amount}</p>
                    <Badge variant={order.status === 'delivered' ? 'outline' : 'secondary'} className="mt-1">
                      {order.status === 'delivered' ? 'ডেলিভারড' : 'প্রসেসিং'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>সেরা বিক্রিত প্রোডাক্ট</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/products')}>
              সব দেখুন <ArrowUpRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {product.type === 'course' ? 'কোর্স' : 
                         product.type === 'ebook' ? 'ইবুক' : 'টেমপ্লেট'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{product.sales} বিক্রি</span>
                    </div>
                  </div>
                  <p className="font-bold text-primary">{product.revenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
