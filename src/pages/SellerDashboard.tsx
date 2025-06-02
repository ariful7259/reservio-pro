
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
import ReportGenerator from '@/components/dashboard/ReportGenerator';

// Comment out these imports since they were causing build errors and they're not immediately available
// We use forward declarations instead to avoid build errors
/*
import IntegratedBookingCalendar from '@/components/dashboard/IntegratedBookingCalendar';
import OrderTrackingSystem from '@/components/dashboard/OrderTrackingSystem';
import ProductServiceManagement from '@/components/dashboard/ProductServiceManagement';
import CustomerRelationshipManagement from '@/components/dashboard/CustomerRelationshipManagement';
import MarketingToolsSystem from '@/components/dashboard/MarketingToolsSystem';
*/

// Define stub components for use in the meantime
const IntegratedBookingCalendar = () => (
  <Card>
    <CardHeader>
      <CardTitle>ইন্টিগ্রেটেড বুকিং ক্যালেন্ডার</CardTitle>
      <CardDescription>সকল বুকিং এবং অ্যাপয়েন্টমেন্ট একসাথে দেখুন</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center py-10">
      <Calendar className="h-10 w-10 text-gray-400 mr-2" />
      <p>বুকিং ক্যালেন্ডার মডিউল লোড হচ্ছে...</p>
    </CardContent>
  </Card>
);

const OrderTrackingSystem = () => (
  <Card>
    <CardHeader>
      <CardTitle>অর্ডার ট্র্যাকিং সিস্টেম</CardTitle>
      <CardDescription>অর্ডার ট্র্যাক করুন এবং স্ট্যাটাস আপডেট করুন</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center py-10">
      <ShoppingBag className="h-10 w-10 text-gray-400 mr-2" />
      <p>অর্ডার ট্র্যাকিং মডিউল লোড হচ্ছে...</p>
    </CardContent>
  </Card>
);

const ProductServiceManagement = () => (
  <Card>
    <CardHeader>
      <CardTitle>প্রোডাক্ট ও সার্ভিস ম্যানেজমেন্ট</CardTitle>
      <CardDescription>সকল প্রোডাক্ট, সার্ভিস, প্রপার্টি এবং কন্টেন্ট একসাথে ম্যানেজ করুন</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center py-10">
      <Package className="h-10 w-10 text-gray-400 mr-2" />
      <p>প্রোডাক্ট ম্যানেজমেন্ট মডিউল লোড হচ্ছে...</p>
    </CardContent>
  </Card>
);

const CustomerRelationshipManagement = () => (
  <Card>
    <CardHeader>
      <CardTitle>কাস্টমার রিলেশনশিপ ম্যানেজমেন্ট</CardTitle>
      <CardDescription>গ্রাহকদের সম্পর্কে বিস্তারিত তথ্য দেখুন ও পরিচালনা করুন</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center py-10">
      <Users className="h-10 w-10 text-gray-400 mr-2" />
      <p>CRM মডিউল লোড হচ্ছে...</p>
    </CardContent>
  </Card>
);

const MarketingToolsSystem = () => (
  <Card>
    <CardHeader>
      <CardTitle>মার্কেটিং টুলস এবং ক্রস-প্রমোশন</CardTitle>
      <CardDescription>বিভিন্ন ব্যবসা জুড়ে মার্কেটিং ক্যাম্পেইন এবং প্রমোশন পরিচালনা করুন</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center justify-center py-10">
      <MessageSquare className="h-10 w-10 text-gray-400 mr-2" />
      <p>মার্কেটিং টুলস মডিউল লোড হচ্ছে...</p>
    </CardContent>
  </Card>
);

// Missing import declaration
const Package = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [dateRange, setDateRange] = useState('this-month');
  const [activeBusinessType, setActiveBusinessType] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [alertsCount, setAlertsCount] = useState({ 
    lowStock: 5, 
    pendingOrders: 12, 
    maintenanceRequests: 3, 
    newMessages: 7 
  });
  
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
      
      {/* Dashboard tabs */}
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
          
          {/* Orders and products summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OrderBookingManagement />
            
            {/* Integrated booking calendar */}
            <IntegratedBookingCalendar />
          </div>

          {/* Marketing tools and cross-promotion */}
          <MarketingToolsSystem />
          
          {/* Customer relationship management */}
          <CustomerRelationshipManagement />
        </TabsContent>
        
        {/* Analytics tab */}
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
                <CardDescription>সময় অনুযায়ী আয়ের পরিবর্তন</CardDescription>
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

            {/* Report generator component */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>কাস্টমাইজড রিপোর্ট</CardTitle>
                <CardDescription>বিস্তারিত অ্যানালিটিক্স এবং রিপোর্ট ডাউনলোড</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm">জেনারেট করুন এবং ডাউনলোড করুন কাস্টম রিপোর্ট</p>
                  <Button onClick={() => setActiveModule('reports')}>
                    <FileText className="h-4 w-4 mr-2" />
                    রিপোর্ট জেনারেটর
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report generator section - when button is clicked */}
          {activeModule === 'reports' && (
            <div className="mt-4">
              <ReportGenerator />
            </div>
          )}
        </TabsContent>
        
        {/* Orders and booking tab - integrated order tracking system */}
        <TabsContent value="orders" className="space-y-6">
          <OrderTrackingSystem />
          
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>ইন্টিগ্রেটেড বুকিং ক্যালেন্ডার</CardTitle>
                  <CardDescription>সকল বুকিং এবং অ্যাপয়েন্টমেন্ট একসাথে দেখুন</CardDescription>
                </div>
                <Button>বুকিং সিনক্রোনাইজ করুন</Button>
              </div>
            </CardHeader>
            <CardContent>
              <IntegratedBookingCalendar />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customers tab - CRM integration */}
        <TabsContent value="customers" className="space-y-6">
          <CustomerRelationshipManagement />
        </TabsContent>
        
        {/* Products tab - product-service management integration */}
        <TabsContent value="products" className="space-y-6">
          <ProductServiceManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;
