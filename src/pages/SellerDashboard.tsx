
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
import IntegratedDashboard from '@/components/dashboard/IntegratedDashboard';
import MarketplaceDashboard from '@/components/dashboard/MarketplaceDashboard';
import RentalDashboard from '@/components/dashboard/RentalDashboard';
import ServicesDashboard from '@/components/dashboard/ServicesDashboard';
import ContentDashboard from '@/components/dashboard/ContentDashboard';
import { useSellerProfile, SellerType } from '@/hooks/useSellerProfile';
import { toast } from 'sonner';

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
  const { profile, isLoading, error } = useSellerProfile();
  const [alertsCount, setAlertsCount] = useState({ 
    lowStock: 5, 
    pendingOrders: 12, 
    maintenanceRequests: 3, 
    newMessages: 7 
  });
  
  // Handle business type change
  const handleBusinessTypeChange = (type: string | null) => {
    setActiveBusinessType(type);
    if (type) {
      toast.success(`${getBusineassTypeLabel(type)} ব্যবসার ড্যাশবোর্ড লোড হয়েছে`);
    } else {
      toast.success(`সকল ব্যবসার সমন্বিত ড্যাশবোর্ড লোড হয়েছে`);
    }
  };

  // Helper function to get business type label
  const getBusineassTypeLabel = (type: string): string => {
    const businessTypeMap: Record<string, string> = {
      'marketplace': 'মার্কেটপ্লেস',
      'rental': 'রেন্টাল',
      'service': 'সার্ভিস',
      'content': 'ডিজিটাল কন্টেন্ট'
    };
    return businessTypeMap[type] || type;
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

  // Render dashboard content based on active business type
  const renderDashboardContent = () => {
    // Show loading state when seller profile is still loading
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-500">ড্যাশবোর্ড লোড হচ্ছে...</p>
          </div>
        </div>
      );
    }
    
    // Show error message if there's an error loading profile
    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h3 className="font-medium">ড্যাশবোর্ড লোড করতে সমস্যা হয়েছে</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      );
    }

    // Switch dashboard view based on selected business type
    switch (activeBusinessType) {
      case 'marketplace':
        return <MarketplaceDashboard />;
      case 'rental':
        return <RentalDashboard />;
      case 'service':
        return <ServicesDashboard />;
      case 'content':
        return <ContentDashboard />;
      default:
        return <IntegratedDashboard />;
    }
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
      
      {/* Dashboard content based on selected business type */}
      <div className="mt-6">
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default SellerDashboard;
