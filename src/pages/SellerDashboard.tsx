
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSellerProfile } from '@/hooks/useSellerProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { 
  Store, 
  Package, 
  BarChart3, 
  Users, 
  Calendar, 
  Clock, 
  Home, 
  Settings, 
  ChevronRight, 
  MessageSquare, 
  Percent, 
  Boxes, 
  ShoppingCart, 
  TrendingUp,
  Star, 
  Building, 
  Wrench, 
  Video,
  Upload,
  Folder,
  Share2,
  Key,
  DollarSign,
  Receipt,
  LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';

import IntegratedDashboard from '@/components/dashboard/IntegratedDashboard';
import MarketplaceDashboard from '@/components/dashboard/MarketplaceDashboard';
import RentalDashboard from '@/components/dashboard/RentalDashboard';
import ServicesDashboard from '@/components/dashboard/ServicesDashboard';
import ContentDashboard from '@/components/dashboard/ContentDashboard';
import StoreDashboardPreview from '@/components/store/StoreDashboardPreview';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('overview');
  const { isAuthenticated, user } = useAuth();
  const { profile, isLoading, error } = useSellerProfile();
  
  console.log("Auth State:", { isAuthenticated, user });
  console.log("Seller Profile:", { profile, isLoading, error });
  console.log("Current Path:", location.pathname);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "অননুমোদিত অ্যাক্সেস",
        description: "ড্যাশবোর্ড ব্যবহারের জন্য অনুগ্রহ করে লগইন করুন",
        variant: "destructive"
      });
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    if (!isLoading && profile) {
      const currentPath = location.pathname;
      const sellerType = profile.seller_type;
      
      if (currentPath === '/seller-dashboard') {
        navigate(`/seller-dashboard/${sellerType}`, { replace: true });
      }
    }
  }, [isLoading, profile, location.pathname, navigate, isAuthenticated]);

  const getAllowedPaths = (sellerType: string) => {
    const basePaths = ['/seller-dashboard'];
    switch(sellerType) {
      case 'marketplace':
        return [...basePaths, '/seller-dashboard/marketplace'];
      case 'rental':
        return [...basePaths, '/seller-dashboard/rental'];
      case 'service':
        return [...basePaths, '/seller-dashboard/services'];
      case 'content':
        return [...basePaths, '/seller-dashboard/content'];
      default:
        return basePaths;
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <h2 className="text-xl">সেলার ড্যাশবোর্ড ব্যবহারের জন্য লগইন করুন</h2>
        <Button onClick={() => navigate('/login', { state: { from: location.pathname } })}>
          <LogIn className="h-4 w-4 mr-2" />
          লগইন করুন
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen flex-col gap-4">
      <div>Error: {error}</div>
      <Button onClick={() => navigate('/create-store')}>
        ব্যবসা তৈরি করুন
      </Button>
    </div>;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <div>আপনার কোন বিক্রেতা প্রোফাইল নেই। প্রথমে একটি বিক্রেতা প্রোফাইল তৈরি করুন।</div>
        <Button onClick={() => navigate('/create-store')}>
          ব্যবসা তৈরি করুন
        </Button>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen pt-16">
        <DashboardSidebar 
          active={active} 
          setActive={setActive} 
          sellerType={profile.seller_type}
        />
        
        <div className="flex-1 p-4 md:p-6">
          <Routes>
            <Route path="/" element={<IntegratedDashboard />} />
            {profile.seller_type === 'marketplace' && (
              <Route path="/marketplace" element={<MarketplaceDashboard />} />
            )}
            {profile.seller_type === 'rental' && (
              <Route path="/rental" element={<RentalDashboard />} />
            )}
            {profile.seller_type === 'service' && (
              <Route path="/services" element={<ServicesDashboard />} />
            )}
            {profile.seller_type === 'content' && (
              <Route path="/content" element={<ContentDashboard />} />
            )}
            <Route path="/analytics" element={<DashboardAnalytics />} />
            <Route path="/customers" element={<CustomerManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/promotions" element={<PromotionManagement />} />
            <Route path="/reviews" element={<ReviewManagement />} />
            <Route path="/settings" element={<DashboardSettings />} />
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
};

const DashboardSidebar = ({ 
  active, 
  setActive, 
  sellerType 
}: { 
  active: string;
  setActive: (tab: string) => void;
  sellerType: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    {
      title: 'সমন্বিত ড্যাশবোর্ড',
      icon: Home,
      path: '/seller-dashboard',
      exact: true,
      show: true
    },
    {
      title: 'বিক্রেতা ড্যাশবোর্ড',
      icon: Store,
      path: '/seller-dashboard/marketplace',
      show: sellerType === 'marketplace'
    },
    {
      title: 'রেন্টাল ড্যাশবোর্ড',
      icon: Building,
      path: '/seller-dashboard/rental',
      show: sellerType === 'rental'
    },
    {
      title: 'সার্ভিস ড্যাশবোর্ড',
      icon: Wrench,
      path: '/seller-dashboard/services',
      show: sellerType === 'service'
    },
    {
      title: 'কন্টেন্ট ড্যাশবোর্ড',
      icon: Video,
      path: '/seller-dashboard/content',
      show: sellerType === 'content'
    },
    {
      title: 'অ্যানালিটিক্স',
      icon: BarChart3,
      path: '/seller-dashboard/analytics'
    },
    {
      title: 'গ্রাহক ব্যবস্থাপনা',
      icon: Users,
      path: '/seller-dashboard/customers'
    },
    {
      title: 'অর্ডার ও বুকিং',
      icon: ShoppingCart,
      path: '/seller-dashboard/orders'
    },
    {
      title: 'ইনভেন্টরি',
      icon: Boxes,
      path: '/seller-dashboard/inventory'
    },
    {
      title: 'প্রমোশন',
      icon: Percent,
      path: '/seller-dashboard/promotions'
    },
    {
      title: 'রিভিউ',
      icon: Star,
      path: '/seller-dashboard/reviews'
    },
    {
      title: 'সেটিংস',
      icon: Settings,
      path: '/seller-dashboard/settings'
    }
  ];
  
  const filteredMenuItems = menuItems.filter(item => item.show !== false);
  
  return (
    <Sidebar className="bg-white shadow-sm">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          <h2 className="text-lg font-medium">বিক্রেতা কেন্দ্র</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ড্যাশবোর্ড</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    isActive={
                      item.exact 
                        ? location.pathname === item.path
                        : location.pathname === item.path
                    }
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-slate-200 p-4">
        <div className="flex flex-col gap-2">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <MessageSquare className="h-4 w-4" />
            সাপোর্ট
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

const DashboardAnalytics = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold mb-6">অ্যানালিটিক্স</h1>
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">বিক্রয় পরিসংখ্যান</h2>
        <p>এখানে বিস্তারিত বিক্রয় পরিসংখ্যান, রাজস্ব বিশ্লেষণ এবং বিভিন্ন সার্ভিসের তুলনামূলক তথ্য থাকবে।</p>
      </CardContent>
    </Card>
  </div>
);

const CustomerManagement = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold mb-6">গ্রাহক ব্যবস্থাপনা</h1>
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">গ্রাহক তালিকা</h2>
        <p>এখানে গ্রাহকদের তালিকা, তাদের ক্রয় ইতিহাস, যোগাযোগ তথ্য এবং ব্যবহার পরিসংখ্যান থাকবে।</p>
      </CardContent>
    </Card>
  </div>
);

const OrderManagement = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold mb-6">অর্ডার ও বুকিং ব্যবস্থাপনা</h1>
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">সমন্বিত অর্ডার তালিকা</h2>
        <p>এখানে মার্কেটপ্লেস অর্ডার, রেন্টাল বুকিং এবং সার্ভিস অ্যাপয়েন্টমেন্টের সমন্বিত ভিউ থাকবে।</p>
      </CardContent>
    </Card>
  </div>
);

const InventoryManagement = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold mb-6">ইনভেন্টরি ব্যবস্থাপনা</h1>
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">পণ্য ও সেবা ইনভেন্টরি</h2>
        <p>এখানে বিভিন্ন সার্ভিসের পণ্য, সম্পত্তি এবং সেবার সমন্বিত ইনভেন্টরি ব্যবস্থাপনা থাকবে।</p>
      </CardContent>
    </Card>
  </div>
);

const PromotionManagement = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold mb-6">প্রমোশন ব্যবস্থাপনা</h1>
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">ডিসকাউন্ট এবং অফার</h2>
        <p>এখানে ডিসকাউন্ট, কুপন, স্পেশাল অফার এবং রেফারেল প্রোগ্রাম ব্যবস্থাপনা থাকবে।</p>
      </CardContent>
    </Card>
  </div>
);

const ReviewManagement = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold mb-6">রিভিউ ব্যবস্থাপনা</h1>
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">গ্রাহক প্রতিক্রিয়া</h2>
        <p>এখানে বিভিন্ন সার্ভিসের রিভিউ, রেটিং এবং গ্রাহক প্রতিক্রিয়া ব্যবস্থাপনা থাকবে।</p>
      </CardContent>
    </Card>
  </div>
);

const DashboardSettings = () => (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold mb-6">ড্যাশবোর্ড সেটিংস</h1>
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">ড্যাশবোর্ড কাস্টমাইজেশন</h2>
        <p>এখানে ড্যাশবোর্ডের বিভিন্ন সেটিংস, কাস্টমাইজেশন এবং পারসোনালাইজেশন অপশন থাকবে।</p>
      </CardContent>
    </Card>
  </div>
);

export default SellerDashboard;
