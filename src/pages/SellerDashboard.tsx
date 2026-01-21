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
  LineChart,
  Store,
  Loader2,
  Rocket,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useSellerProfile } from '@/hooks/useSellerProfile';
import { Separator } from '@/components/ui/separator';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import BusinessTypeSelector from "@/components/dashboard/business-type-selector/BusinessTypeSelector";
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import AlertNotifications from '@/components/dashboard/AlertNotifications';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportGenerator from '@/components/dashboard/ReportGenerator';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';
import OrdersTab from '@/components/dashboard/OrdersTab';
import CustomersTab from '@/components/dashboard/CustomersTab';
import ProductsTab from '@/components/dashboard/ProductsTab';
import OrderBookingManagement from '@/components/dashboard/OrderBookingManagement';
import IntegratedBookingCalendar from '@/components/dashboard/IntegratedBookingCalendar';
import MarketingToolsSystem from '@/components/dashboard/MarketingToolsSystem';
import CustomerRelationshipManagement from '@/components/dashboard/CustomerRelationshipManagement';
import CreateStoreBuilder from '@/components/store/CreateStoreBuilder';
import ProductManager from '@/components/seller/ProductManager';
import SellerOrderManagement from '@/components/seller/SellerOrderManagement';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, isLoading: profileLoading, isSeller } = useSellerProfile();
  const [dateRange, setDateRange] = useState('this-month');
  const [activeBusinessType, setActiveBusinessType] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [showStoreBuilder, setShowStoreBuilder] = useState(false);
  const [alertsCount, setAlertsCount] = useState({ 
    lowStock: 5, 
    pendingOrders: 12, 
    maintenanceRequests: 3, 
    newMessages: 7 
  });

  // Check if store exists (has business_name in profile)
  const hasStore = profile?.business_name && profile.business_name.trim() !== '';
  
  // Handle business type change
  const handleBusinessTypeChange = (type: string | null) => {
    setActiveBusinessType(type);
  };

  // Handle module change
  const handleModuleChange = (module: string | null) => {
    setActiveModule(module);
  };

  // Business type data
  const businessTypes = [
    { id: 'marketplace', name: 'মার্কেটপ্লেস', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'rental', name: 'রেন্টাল', icon: <Building className="h-5 w-5" /> },
    { id: 'service', name: 'সার্ভিস', icon: <Wrench className="h-5 w-5" /> },
    { id: 'content', name: 'ডিজিটাল কন্টেন্ট', icon: <Pencil className="h-5 w-5" /> }
  ];
  
  // Stats data
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

  // Report download handler
  const handleDownloadReport = () => {
    alert('রিপোর্ট ডাউনলোড প্রসেসিং শুরু হয়েছে');
  };

  // Loading state
  if (profileLoading) {
    return (
      <div className="container pt-20 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">ড্যাশবোর্ড লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // If showing store builder
  if (showStoreBuilder || !hasStore) {
    return (
      <div className="container pt-20 pb-16">
        {/* Welcome Header for new sellers */}
        {!hasStore && !showStoreBuilder && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Rocket className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-2xl font-bold mb-2">অভিনন্দন! 🎉 আপনি এখন একজন অনুমোদিত বিক্রেতা</h1>
                    <p className="text-muted-foreground mb-4">
                      এখন আপনার অনলাইন স্টোর তৈরি করুন এবং বিক্রি শুরু করুন। স্টোর তৈরি করতে মাত্র কয়েক মিনিট সময় লাগবে।
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>আবেদন অনুমোদিত</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Store className="h-4 w-4 text-primary" />
                        <span>স্টোর তৈরি করুন</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ShoppingBag className="h-4 w-4" />
                        <span>বিক্রি শুরু করুন</span>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" onClick={() => setShowStoreBuilder(true)} className="shrink-0">
                    <Store className="h-5 w-5 mr-2" />
                    স্টোর তৈরি করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Store Builder */}
        {(showStoreBuilder || !hasStore) && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">আপনার স্টোর তৈরি করুন</h1>
                <p className="text-muted-foreground">সব তথ্য পূরণ করে আপনার অনলাইন স্টোর লঞ্চ করুন</p>
              </div>
              {hasStore && (
                <Button variant="outline" onClick={() => setShowStoreBuilder(false)}>
                  ড্যাশবোর্ডে ফিরুন
                </Button>
              )}
            </div>
            <CreateStoreBuilder />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container pt-20 pb-16">
      {/* Header section */}
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
            onClick={() => setShowStoreBuilder(true)}
          >
            <Store className="h-4 w-4 mr-2" />
            স্টোর সেটিংস
          </Button>
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
          <Button onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>
      </div>
      
      {/* Business type selector */}
      <BusinessTypeSelector 
        businessTypes={businessTypes} 
        activeType={activeBusinessType}
        onChange={handleBusinessTypeChange} 
      />

      {/* Main Tabs - Always visible */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
          <TabsTrigger value="products">প্রোডাক্ট ও সার্ভিস</TabsTrigger>
          <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
          <TabsTrigger value="orders">অর্ডার ও বুকিং</TabsTrigger>
          <TabsTrigger value="customers">গ্রাহক</TabsTrigger>
        </TabsList>

        {/* Products Tab - Always Accessible */}
        <TabsContent value="products" className="space-y-4">
          <ProductManager />
        </TabsContent>

          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Alert notifications system */}
            <AlertNotifications alertsCount={alertsCount} />
            
            {/* Main statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total sales */}
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
              
              {/* Total orders */}
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
              
              {/* Total customers */}
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
              
              {/* Business stock */}
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
            
            {/* Revenue chart and overall activities */}
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
                    <RevenueChart selectedBusinessType={activeBusinessType} />
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
            
            {/* Orders and products summary - Updated to pass businessType */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <OrderBookingManagement businessType={activeBusinessType} />
              <IntegratedBookingCalendar businessType={activeBusinessType} />
            </div>

            {/* Marketing tools and cross-promotion */}
            <MarketingToolsSystem />
            
            {/* Customer relationship management */}
            <CustomerRelationshipManagement />
          </TabsContent>
          
          {/* Analytics tab - Enhanced */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsTab 
              dateRange={dateRange} 
              onDateRangeChange={setDateRange}
              businessType={activeBusinessType}
            />
          </TabsContent>
          
          {/* Orders and booking tab - Enhanced with real order management */}
          <TabsContent value="orders" className="space-y-6">
            <SellerOrderManagement />
          </TabsContent>
          
          {/* Customers tab - Enhanced */}
          <TabsContent value="customers" className="space-y-6">
            <CustomersTab businessType={activeBusinessType} />
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default SellerDashboard;
