
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Download,
  ShoppingBag,
  TrendingUp,
  Users,
  CircleDollarSign,
  Plus,
  FileText,
  ArrowUpRight,
  Home,
  Building,
  Wrench,
  Pencil,
  Bell,
  Wallet,
  Calendar,
  MessageSquare,
  AlertTriangle,
  LayoutDashboard,
  ChevronRight,
  PieChart,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import BusinessTypeSelector from '@/components/dashboard/BusinessTypeSelector';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import AlertNotifications from '@/components/dashboard/AlertNotifications';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrderBookingManagement from '@/components/dashboard/OrderBookingManagement';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('this-month');
  const [activeBusinessType, setActiveBusinessType] = useState<string | null>(null);
  const [alertsCount, setAlertsCount] = useState({ 
    lowStock: 5, 
    pendingOrders: 12, 
    maintenanceRequests: 3, 
    newMessages: 7 
  });
  
  // 선택된 비즈니스 유형에 따라 대시보드 콘텐츠를 표시
  const handleBusinessTypeChange = (type: string | null) => {
    setActiveBusinessType(type);
    // type에 따라 로직을 추가할 수 있습니다
  };

  // 모든 비즈니스 유형을 가져옴 (여기서는 mockup 데이터를 사용)
  const businessTypes = [
    { id: 'marketplace', name: 'মার্কেটপ্লেস', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'rental', name: 'রেন্টাল', icon: <Building className="h-5 w-5" /> },
    { id: 'service', name: 'সার্ভিস', icon: <Wrench className="h-5 w-5" /> },
    { id: 'content', name: 'ডিজিটাল কন্টেন্ট', icon: <Pencil className="h-5 w-5" /> }
  ];
  
  const stats = {
    'this-month': {
      sales: '৳১৫,৯৫০',
      orders: 42,
      customers: 36,
      growth: 12.5,
      products: 8,
      appointments: 15,
      properties: 5,
      contentPieces: 12
    },
    'last-month': {
      sales: '৳১২,৭৫০',
      orders: 35,
      customers: 30,
      growth: 8.3,
      products: 6,
      appointments: 12,
      properties: 4,
      contentPieces: 10
    },
    'this-year': {
      sales: '৳৮৫,৮০০',
      orders: 230,
      customers: 145,
      growth: 32.7,
      products: 8,
      appointments: 75,
      properties: 5,
      contentPieces: 42
    }
  };
  
  const currentStats = stats[dateRange as keyof typeof stats];

  return (
    <div className="container pt-20 pb-16">
      {/* হেডার সেকশন */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">বিক্রেতা ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">
            {activeBusinessType ? 
              `আপনার ${businessTypes.find(b => b.id === activeBusinessType)?.name} ব্যবসা পরিচালনা করুন` : 
              'আপনার সকল ব্যবসা একত্রিত ভাবে পরিচালনা করুন'}
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline"
            onClick={() => navigate('/create-digital-product')}
          >
            <Plus className="h-4 w-4 mr-2" />
            নতুন প্রোডাক্ট
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/seller-calendar')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            ক্যালেন্ডার
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>
      </div>
      
      {/* ব্যবসা টাইপ সিলেক্টর */}
      <BusinessTypeSelector 
        businessTypes={businessTypes} 
        activeType={activeBusinessType}
        onChange={handleBusinessTypeChange} 
      />
      
      {/* ড্যাশবোর্ড ট্যাব */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-5 md:grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            অভারভিউ
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <PieChart className="h-4 w-4 mr-2" />
            এনালিটিক্স
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingBag className="h-4 w-4 mr-2" />
            অর্ডার/বুকিং
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 mr-2" />
            গ্রাহক
          </TabsTrigger>
          <TabsTrigger value="products">
            <FileText className="h-4 w-4 mr-2" />
            প্রোডাক্ট/সার্ভিস
          </TabsTrigger>
        </TabsList>
        
        {/* অভারভিউ ট্যাব */}
        <TabsContent value="overview" className="space-y-6">
          {/* অ্যালার্ট নোটিফিকেশন সিস্টেম */}
          <AlertNotifications alertsCount={alertsCount} />
          
          {/* মূল স্ট্যাটিসটিকস */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* মোট বিক্রয় */}
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
            
            {/* মোট অর্ডার */}
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
            
            {/* মোট গ্রাহক */}
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
            
            {/* ব্যবসা উপাদান */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">মোট আইটেম</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {currentStats.products + currentStats.properties + currentStats.contentPieces}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <span>{currentStats.products} প্রোডাক্ট, {currentStats.properties} প্রপার্টি, {currentStats.contentPieces} কন্টেন্ট</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* রেভিনিউ চার্ট এবং সাম্প্রতিক কার্যকলাপ */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-5">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>আয় পরিসংখ্যান</CardTitle>
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
                </CardHeader>
                <CardContent className="px-2">
                  <RevenueChart />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>সাম্প্রতিক কার্যকলাপ</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                  <ActivityFeed />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full gap-1">
                    সব দেখুন <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* অর্ডার এবং প্রোডাক্ট সারসংক্ষেপ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OrderBookingManagement />
            
            {/* টপ প্রোডাক্টস */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>সেরা বিক্রিত আইটেম</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/products')}>
                  সব দেখুন <ArrowUpRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="px-2">
                <ScrollArea className="h-[350px] pr-4">
                  <div className="space-y-4 pr-3">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <Pencil className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">ডিজিটাল মার্কেটিং কোর্স</p>
                          <Badge variant="outline" className="text-xs">কন্টেন্ট</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">৳৫,৯৯৯</p>
                        <p className="text-xs text-muted-foreground">৪২ বিক্রি</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">স্মার্টফোন কভার</p>
                          <Badge variant="outline" className="text-xs">মার্কেটপ্লেস</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">৳৪৯৯</p>
                        <p className="text-xs text-muted-foreground">৩৮ বিক্রি</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <Building className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">গুলশান অ্যাপার্টমেন্ট</p>
                          <Badge variant="outline" className="text-xs">রেন্টাল</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">৳১৫,০০০/মাস</p>
                        <p className="text-xs text-muted-foreground">৯৫% অকুপেন্সি</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <Wrench className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">হোম ক্লিনিং সার্ভিস</p>
                          <Badge variant="outline" className="text-xs">সার্ভিস</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">৳১,২০০</p>
                        <p className="text-xs text-muted-foreground">২৮ বুকিং</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">বিজনেস প্ল্যান টেমপ্লেট</p>
                          <Badge variant="outline" className="text-xs">কন্টেন্ট</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">৳৯৯৯</p>
                        <p className="text-xs text-muted-foreground">২৫ বিক্রি</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">ব্লুটুথ হেডফোন</p>
                          <Badge variant="outline" className="text-xs">মার্কেটপ্লেস</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">৳১,৯৯৯</p>
                        <p className="text-xs text-muted-foreground">২২ বিক্রি</p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* এনালিটিক্স ট্যাব */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>ব্যবসা অনুযায়ী আয়</CardTitle>
                <CardDescription>বিভিন্ন ব্যবসা থেকে আয়ের তুলনামূলক বিশ্লেষণ</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  <p className="ml-2 text-muted-foreground">বিজনেস ক্যাটাগরি অনুযায়ী আয়ের পাই চার্ট এখানে দেখানো হবে</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>আয় প্রবণতা</CardTitle>
                <CardDescription>সময় অনুসারে আয়ের পরিবর্তন</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  <p className="ml-2 text-muted-foreground">সময় অনুযায়ী আয়ের লাইন চার্ট এখানে দেখানো হবে</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>চ্যানেল অ্যানালিটিক্স</CardTitle>
                <CardDescription>কোন চ্যানেল থেকে বেশি আয় আসছে তার বিশ্লেষণ</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart className="h-10 w-10 text-muted-foreground opacity-50" />
                  <p className="ml-2 text-muted-foreground">চ্যানেল অনুযায়ী আয়ের বার চার্ট এখানে দেখানো হবে</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>ট্র্যাফিক সোর্স</CardTitle>
                <CardDescription>আপনার ওয়েবসাইটে ভিজিটরদের উৎস</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>সোশ্যাল মিডিয়া</span>
                    <span>৪২%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>সার্চ ইঞ্জিন</span>
                    <span>৩৮%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '38%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>ডিরেক্ট</span>
                    <span>১৫%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>রেফারেল</span>
                    <span>৫%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>টপ লোকেশন</CardTitle>
                <CardDescription>আপনার গ্রাহকদের অবস্থান</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>ঢাকা</span>
                    <span>৫৫%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>চট্টগ্রাম</span>
                    <span>২০%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>সিলেট</span>
                    <span>১০%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>রাজশাহী</span>
                    <span>৮%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>অন্যান্য</span>
                    <span>৭%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-gray-600 h-1.5 rounded-full" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* আরও ট্যাব কন্টেন্ট - শুধু প্লেসহোল্ডার */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>অর্ডার ও বুকিং ম্যানেজমেন্ট</CardTitle>
              <CardDescription>সকল ব্যবসার অর্ডার এবং বুকিং দেখুন ও পরিচালনা করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-50" />
                <p className="ml-2 text-muted-foreground">অর্ডার ও বুকিং ম্যানেজমেন্ট সিস্টেম এখানে দেখানো হবে</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>গ্রাহক ব্যবস্থাপনা</CardTitle>
              <CardDescription>সকল গ্রাহক তথ্য এবং CRM টুলস</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center">
                <Users className="h-10 w-10 text-muted-foreground opacity-50" />
                <p className="ml-2 text-muted-foreground">কাস্টমার রিলেশনশিপ ম্যানেজমেন্ট সিস্টেম এখানে দেখানো হবে</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>প্রোডাক্ট এবং সার্ভিস ম্যানেজমেন্ট</CardTitle>
              <CardDescription>প্রোডাক্ট, সার্ভিস, প্রপার্টি এবং কন্টেন্ট পরিচালনা করুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center">
                <FileText className="h-10 w-10 text-muted-foreground opacity-50" />
                <p className="ml-2 text-muted-foreground">প্রোডাক্ট ম্যানেজমেন্ট সিস্টেম এখানে দেখানো হবে</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;
