
import React, { useState } from 'react';
import { 
  BarChart, 
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
  Eye,
  ShoppingCart,
  CircleDollarSign,
  ArrowUp,
  ArrowDown,
  LayoutGrid,
  Percent,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import StoreDashboardPreview from '../store/StoreDashboardPreview';

const MarketplaceDashboard = () => {
  const [dateRange, setDateRange] = useState('this-month');
  
  // Mock marketplace data
  const marketplaceStats = {
    'this-month': {
      totalSales: '৳২৪,৫৫০',
      totalOrders: 78,
      products: 24,
      visitors: 1235,
      conversionRate: 3.7,
      growth: 18.5,
    },
    'last-month': {
      totalSales: '৳২০,৮০০',
      totalOrders: 65,
      products: 22,
      visitors: 1050,
      conversionRate: 3.5,
      growth: 12.3,
    },
    'this-year': {
      totalSales: '৳১৫৩,৪৫০',
      totalOrders: 385,
      products: 24,
      visitors: 7820,
      conversionRate: 3.9,
      growth: 32.7,
    }
  };
  
  const currentStats = marketplaceStats[dateRange as keyof typeof marketplaceStats];
  
  // Mock top selling products
  const topProducts = [
    { name: 'স্মার্টফোন', sales: 45, change: 12 },
    { name: 'হেডফোন', sales: 32, change: -5 },
    { name: 'ল্যাপটপ', sales: 28, change: 8 },
    { name: 'স্মার্টওয়াচ', sales: 25, change: 15 },
    { name: 'ব্লুটুথ স্পীকার', sales: 18, change: 3 },
  ];
  
  // Mock recent orders
  const recentOrders = [
    { id: "ORD-001", customer: "রহিম হোসেন", amount: "৳1,250", time: "15 মিনিট আগে", status: "পেন্ডিং" },
    { id: "ORD-002", customer: "ফাতেমা বেগম", amount: "৳2,740", time: "1 ঘন্টা আগে", status: "প্রসেসিং" },
    { id: "ORD-003", customer: "করিম আলী", amount: "৳780", time: "3 ঘন্টা আগে", status: "শিপড" },
    { id: "ORD-004", customer: "আমিনা খাতুন", amount: "৳3,500", time: "5 ঘন্টা আগে", status: "ডেলিভারড" },
    { id: "ORD-005", customer: "জাকির হোসেন", amount: "৳950", time: "8 ঘন্টা আগে", status: "ডেলিভারড" },
  ];
  
  return (
    <div className="space-y-6">
      {/* Dashboard header with title and date range selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold flex items-center">
            <ShoppingBag className="h-6 w-6 text-blue-600 mr-2" />
            মার্কেটপ্লেস ড্যাশবোর্ড
          </h2>
          <p className="text-muted-foreground">আপনার অনলাইন প্রোডাক্ট বিক্রির বিস্তারিত রিপোর্ট</p>
        </div>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">এই মাস</SelectItem>
            <SelectItem value="last-month">গত মাস</SelectItem>
            <SelectItem value="this-year">এই বছর</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট বিক্রয়</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.totalSales}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{currentStats.growth}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট অর্ডার</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.totalOrders}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.8)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ভিজিটর</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.visitors}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.9)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">কনভার্শন রেট</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.conversionRate}%</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>{currentStats.products} প্রোডাক্ট অ্যাক্টিভ</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Percent className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">
            <LayoutGrid className="h-4 w-4 mr-2" />
            ওভারভিউ
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="h-4 w-4 mr-2" />
            প্রোডাক্টস
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 mr-2" />
            অর্ডারস
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview">
          <StoreDashboardPreview />
        </TabsContent>
        
        {/* Products Tab Content */}
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>সেরা বিক্রিত প্রোডাক্ট</CardTitle>
              <CardDescription>আপনার সবচেয়ে বেশি বিক্রিত প্রোডাক্টগুলি</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topProducts.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-5">{idx + 1}.</span>
                      <span>{product.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{product.sales} বিক্রি</span>
                      <span className={`text-xs flex items-center ${
                        product.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.change > 0 ? 
                          <ArrowUp className="h-3 w-3 mr-1" /> : 
                          <ArrowDown className="h-3 w-3 mr-1" />
                        }
                        {Math.abs(product.change)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                সব প্রোডাক্ট দেখুন
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>স্টক পরিস্থিতি</CardTitle>
                <CardDescription>প্রোডাক্ট ইনভেন্টরি স্ট্যাটাস</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">অন-স্টক প্রোডাক্ট</span>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">লো স্টক প্রোডাক্ট</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">আউট অফ স্টক প্রোডাক্ট</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  ইনভেন্টরি আপডেট করুন
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>প্রোডাক্ট ক্যাটাগরি</CardTitle>
                <CardDescription>বিভিন্ন ক্যাটাগরি অনুযায়ী প্রোডাক্ট সংখ্যা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">ইলেকট্রনিক্স</span>
                      <span className="text-sm font-medium">12 প্রোডাক্ট</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">ফ্যাশন</span>
                      <span className="text-sm font-medium">8 প্রোডাক্ট</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">হোম এপ্লায়েন্সেস</span>
                      <span className="text-sm font-medium">4 প্রোডাক্ট</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '17%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  সব ক্যাটাগরি দেখুন
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Orders Tab Content */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
              <CardDescription>সর্বশেষ আপডেটসহ সাম্প্রতিক অর্ডারগুলি</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, idx) => (
                  <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.customer}</p>
                      </div>
                    </div>
                    <div>
                      <Badge variant="outline" className={
                        order.status === "পেন্ডিং" ? "bg-amber-100 text-amber-800 border-amber-200" :
                        order.status === "প্রসেসিং" ? "bg-blue-100 text-blue-800 border-blue-200" :
                        order.status === "শিপড" ? "bg-purple-100 text-purple-800 border-purple-200" :
                        "bg-green-100 text-green-800 border-green-200"
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                      <p className="text-xs text-muted-foreground flex items-center justify-end">
                        <Clock className="h-3 w-3 mr-1" />
                        {order.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                সব অর্ডার দেখুন
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>অর্ডার সামারি</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>পেন্ডিং অর্ডার</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      12
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>প্রসেসিং অর্ডার</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      8
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>শিপড অর্ডার</span>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                      15
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ডেলিভারড অর্ডার</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      43
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>অর্ডার পারফরম্যান্স</CardTitle>
                <CardDescription>আপনার অর্ডার প্রসেসিং এফিশিয়েন্সি</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">অর্ডার প্রসেসিং টাইম</span>
                      <span className="text-sm font-medium">গড়ে 45 মিনিট</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">অন-টাইম ডেলিভারি রেট</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">কাস্টমার স্যাটিসফ্যাকশন রেট</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceDashboard;
