import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from '@/components/ui/sidebar';
import UserManagementEnhanced from '@/components/admin/UserManagementEnhanced';
import MarketplaceManagement from '@/components/admin/MarketplaceManagement';
import RentalManagement from '@/components/admin/RentalManagement';
import CategoryManagement from '@/components/admin/CategoryManagement';
import AdvancedFeatures from '@/components/admin/AdvancedFeatures';
import ServiceManagement from '@/components/admin/ServiceManagement';
import DigitalContentManagement from '@/components/admin/DigitalContentManagement';
import PaymentManagement from '@/components/admin/PaymentManagement';
import ReportManagement from '@/components/admin/ReportManagement';
import Analytics from '@/components/admin/Analytics';
import SupportTicket from '@/components/admin/SupportTicket';
import Settings from '@/components/admin/Settings';
import MonetizationTab from '@/components/admin/MonetizationTab';
import DashboardCharts from '@/components/admin/DashboardCharts';
import { adminTheme } from '@/themes/adminTheme';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Layers, 
  Settings as SettingsIcon, 
  Bell, 
  Package, 
  FileText, 
  UserCog, 
  Building,
  Banknote,
  ShieldCheck,
  Tag,
  BarChart,
  MessageSquare,
  HelpCircle,
  Truck,
  Palette,
  BookOpen,
  LogOut,
  DollarSign,
  Home,
  Menu,
  PanelLeft,
  WifiOff,
  Languages,
  Calendar,
  Layout
} from 'lucide-react';
import ServiceCardCustomization from '@/components/admin/ServiceCardCustomization';
import OfflineConfiguration from '@/components/admin/OfflineConfiguration';
import LanguageManager from '@/components/admin/LanguageManager';
import RentalCalendarConfiguration from '@/components/admin/RentalCalendarConfiguration';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState(section || 'dashboard');
  
  // Apply admin theme on component mount
  useEffect(() => {
    const adminContainer = document.getElementById('admin-dashboard-container');
    if (adminContainer) {
      adminContainer.style.backgroundColor = adminTheme.colors.background;
    }
  }, []);
  
  // Stats data
  const stats = {
    totalUsers: 2458,
    totalOrders: 1247,
    totalRevenue: "৳ 12,45,890",
    activeListings: 845
  };
  
  // Today's stats
  const todayStats = {
    newUsers: 24,
    newOrders: 47,
    todayRevenue: "৳ 35,780",
    newListings: 18
  };
  
  // Recent transactions
  const recentTransactions = [
    { id: 'TX-5872', amount: '৳ 2,450', type: 'বিক্রয়', user: 'রহিম আহমেদ', status: 'সম্পন্ন', time: '15 মিনিট আগে' },
    { id: 'TX-5871', amount: '৳ 1,200', type: 'রেন্টাল', user: 'করিম খান', status: 'প্রক্রিয়াধীন', time: '32 মিনিট আগে' },
    { id: 'TX-5870', amount: '৳ 3,500', type: 'সার্ভিস', user: 'নাদিয়া ইসলাম', status: 'সম্পন্ন', time: '1 ঘন্টা আগে' },
    { id: 'TX-5869', amount: '৳ 850', type: 'ডিজিটাল', user: 'সাকিব হাসান', status: 'সম্পন্ন', time: '2 ঘন্টা আগে' },
  ];
  
  // Pending approvals
  const pendingItems = {
    products: 12,
    services: 8,
    rentalListings: 5,
    contentCreators: 3
  };

  // Sidebar menu items
  const sidebarItems = [
    { id: 'dashboard', name: 'ড্যাশবোর্ড', icon: <BarChart3 size={18} /> },
    { id: 'users', name: 'ব্যবহারকারী', icon: <Users size={18} /> },
    { id: 'marketplace', name: 'মার্কেটপ্লেস', icon: <ShoppingBag size={18} /> },
    { id: 'rentals', name: 'রেন্টাল', icon: <Building size={18} /> },
    { id: 'services', name: 'সার্ভিস', icon: <Truck size={18} /> },
    { id: 'digital', name: 'ডিজিটাল কন্টেন্ট', icon: <BookOpen size={18} /> },
    { id: 'categories', name: 'ক্যাটাগরি', icon: <Layers size={18} /> },
    { id: 'payments', name: 'পেমেন্ট', icon: <Banknote size={18} /> },
    { id: 'monetization', name: 'মানিটাইজেশন', icon: <DollarSign size={18} /> },
    { id: 'reports', name: 'রিপোর্ট', icon: <FileText size={18} /> },
    { id: 'analytics', name: 'অ্যানালিটিক্স', icon: <BarChart size={18} /> },
    { id: 'support', name: 'সাপোর্ট টিকেট', icon: <MessageSquare size={18} /> },
    { id: 'settings', name: 'সেটিংস', icon: <SettingsIcon size={18} /> },
    { id: 'advanced', name: 'অ্যাডভান্স ফিচার', icon: <ShieldCheck size={18} /> },
    { id: 'service-card', name: 'সার্ভিস কার্ড', icon: <Layout size={18} /> },
    { id: 'offline-config', name: 'অফলাইন মোড', icon: <WifiOff size={18} /> },
    { id: 'language-manager', name: 'ভাষা ম্যানেজার', icon: <Languages size={18} /> },
    { id: 'calendar-config', name: 'ক্যালেন্ডার কনফিগ', icon: <Calendar size={18} /> },
  ];
  
  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    toast({
      title: `${sidebarItems.find(item => item.id === moduleId)?.name} সিলেক্ট করা হয়েছে`,
      description: "আপনি এখন মডিউলে কাজ করতে পারেন।",
    });
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full" id="admin-dashboard-container" style={{ backgroundColor: adminTheme.colors.background }}>
        {/* Collapsible Sidebar using shadcn/ui sidebar component */}
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <h2 className="text-xl font-bold flex items-center" style={{ color: adminTheme.colors.primary }}>
              <ShieldCheck className="mr-2" style={{ color: adminTheme.colors.primary }} /> অ্যাডমিন প্যানেল
            </h2>
          </SidebarHeader>
          
          <SidebarContent>
            <div className="p-2">
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={item.name}
                      isActive={activeModule === item.id}
                      onClick={() => handleModuleChange(item.id)}
                      className={`${activeModule === item.id ? '' : 'text-gray-600'}`}
                      style={activeModule === item.id ? {
                        backgroundImage: adminTheme.gradients.primary,
                        boxShadow: adminTheme.shadows.sm
                      } : {}}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              
              <Separator className="my-4" />
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-red-500"
                  onClick={() => navigate('/')}
                >
                  <LogOut size={18} />
                  <span className="ml-2">লগআউট</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="text-blue-500 mt-2"
                  onClick={() => navigate('/')}
                >
                  <Home size={18} />
                  <span className="ml-2">হোম পেইজ</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarContent>
        </Sidebar>
        
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="bg-white shadow-sm border-b px-6 py-3 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-1" /> হোম পেইজে ফিরুন
              </Button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">8</span>
              </Button>
              
              <div className="flex items-center">
                <div className="w-8 h-8 text-white rounded-full flex items-center justify-center"
                  style={{ backgroundImage: adminTheme.gradients.primary }}>
                  A
                </div>
                <span className="ml-2 font-medium">অ্যাডমিন</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {activeModule === 'dashboard' && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">ড্যাশবোর্ড</h1>
                
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="overflow-hidden shadow-md bg-gradient-to-br from-white to-blue-50/30 border-blue-100/50">
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">মোট ব্যবহারকারী</p>
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                        <p className="text-xs text-green-600">+{todayStats.newUsers} আজ</p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: adminTheme.colors.primaryLight, color: adminTheme.colors.primary }}>
                        <Users />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden shadow-md bg-gradient-to-br from-white to-purple-50/30 border-purple-100/50">
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
                        <p className="text-2xl font-bold">{stats.totalOrders}</p>
                        <p className="text-xs text-green-600">+{todayStats.newOrders} আজ</p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: adminTheme.colors.secondaryLight, color: adminTheme.colors.secondary }}>
                        <Package />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden shadow-md bg-gradient-to-br from-white to-green-50/30 border-green-100/50">
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">মোট আয়</p>
                        <p className="text-2xl font-bold">{stats.totalRevenue}</p>
                        <p className="text-xs text-green-600">+{todayStats.todayRevenue} আজ</p>
                      </div>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: adminTheme.colors.accentLight, color: adminTheme.colors.accent }}>
                        <Banknote />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden shadow-md bg-gradient-to-br from-white to-amber-50/30 border-amber-100/50">
                    <CardContent className="p-6 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">সক্রিয় লিস্টিং</p>
                        <p className="text-2xl font-bold">{stats.activeListings}</p>
                        <p className="text-xs text-green-600">+{todayStats.newListings} আজ</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                        <Tag className="text-amber-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Traffic analytics and activity charts */}
                <DashboardCharts />
                
                {/* Recent transactions */}
                <Card className="overflow-hidden shadow-md border border-gray-100">
                  <CardHeader className="pb-2 bg-white">
                    <CardTitle className="text-lg">সাম্প্রতিক ট্রানজেকশন</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-gray-50">
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">আইডি</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">পরিমাণ</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ধরন</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">ব্যবহারকারী</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">স্ট্যাটাস</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">সময়</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentTransactions.map((tx, index) => (
                            <tr key={tx.id} className={index < recentTransactions.length - 1 ? "border-b hover:bg-gray-50" : "hover:bg-gray-50"}>
                              <td className="py-3 px-4">{tx.id}</td>
                              <td className="py-3 px-4 font-medium">{tx.amount}</td>
                              <td className="py-3 px-4">{tx.type}</td>
                              <td className="py-3 px-4">{tx.user}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  tx.status === 'সম্পন্ন' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {tx.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right text-muted-foreground">{tx.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4 mb-4 flex justify-center">
                      <Button 
                        variant="outline"
                        style={{ borderColor: adminTheme.colors.primary, color: adminTheme.colors.primary }}
                      >
                        সব ট্রানজেকশন দেখুন
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Pending approvals */}
                <Card className="overflow-hidden shadow-md border border-gray-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">অনুমোদন প্রয়োজন</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-md">
                        <div className="flex items-center">
                          <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
                          <span>প্রোডাক্ট</span>
                        </div>
                        <div>
                          <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.products}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-md">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-purple-600 mr-2" />
                          <span>সার্ভিস</span>
                        </div>
                        <div>
                          <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.services}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-md">
                        <div className="flex items-center">
                          <Building className="h-5 w-5 text-green-600 mr-2" />
                          <span>রেন্টাল</span>
                        </div>
                        <div>
                          <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.rentalListings}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-amber-50 rounded-md">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-amber-600 mr-2" />
                          <span>কন্টেন্ট ক্রিয়েটর</span>
                        </div>
                        <div>
                          <span className="bg-amber-200 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                            {pendingItems.contentCreators}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4"
                      style={{ 
                        backgroundImage: adminTheme.gradients.primary,
                        boxShadow: adminTheme.shadows.sm
                      }}
                    >
                      সবগুলো দেখুন
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeModule === 'users' && <UserManagementEnhanced />}
            
            {activeModule === 'marketplace' && <MarketplaceManagement />}
            
            {activeModule === 'rentals' && <RentalManagement />}
            
            {activeModule === 'services' && <ServiceManagement />}
            
            {activeModule === 'digital' && <DigitalContentManagement />}
            
            {activeModule === 'categories' && <CategoryManagement />}
            
            {activeModule === 'payments' && <PaymentManagement />}
            
            {activeModule === 'monetization' && <MonetizationTab />}
            
            {activeModule === 'reports' && <ReportManagement />}
            
            {activeModule === 'analytics' && <Analytics />}
            
            {activeModule === 'support' && <SupportTicket />}
            
            {activeModule === 'settings' && <Settings />}
            
            {activeModule === 'advanced' && <AdvancedFeatures />}

            {activeModule === 'service-card' && <ServiceCardCustomization />}
            
            {activeModule === 'offline-config' && <OfflineConfiguration />}
            
            {activeModule === 'language-manager' && <LanguageManager />}
            
            {activeModule === 'calendar-config' && <RentalCalendarConfiguration />}
            
            {!['dashboard', 'users', 'marketplace', 'rentals', 'services', 'digital', 'categories', 
               'payments', 'reports', 'analytics', 'support', 'settings', 'advanced', 'monetization',
               'service-card', 'offline-config', 'language-manager', 'calendar-config'].includes(activeModule) && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="h-24 w-24 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: adminTheme.colors.primaryLight }}>
                  {sidebarItems.find(item => item.id === activeModule)?.icon || 
                    <HelpCircle size={32} style={{ color: adminTheme.colors.primary }} />}
                </div>
                <h2 className="text-2xl font-bold">{sidebarItems.find(item => item.id === activeModule)?.name} মডিউল</h2>
                <p className="mt-2 text-muted-foreground text-center max-w-md">
                  এই মডিউলটি বর্তমানে বিকাশাধীন আছে। শীঘ্রই এটি ব্যবহার করতে পারবেন।
                </p>
                <Button 
                  className="mt-6"
                  style={{ 
                    backgroundImage: adminTheme.gradients.primary,
                    boxShadow: adminTheme.shadows.sm
                  }}
                  onClick={() => setActiveModule('dashboard')}
                >
                  ড্যাশবোর্ডে ফিরে যান
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
