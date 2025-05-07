
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SidebarProvider, SidebarBackdrop } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { adminTheme } from '@/themes/adminTheme';
import { ThemeProvider } from '@/context/ThemeContext';
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
  Layout,
  Activity,
  LineChart,
  QrCode,
  RefreshCcw
} from 'lucide-react';

// Import components
import AdminHeader from '@/components/admin/dashboard/AdminHeader';
import AdminSidebar from '@/components/admin/dashboard/AdminSidebar';
import DashboardMain from '@/components/admin/dashboard/DashboardMain';
import ModulePlaceholder from '@/components/admin/dashboard/ModulePlaceholder';

// Import admin modules
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
import RefundSettings from '@/components/admin/RefundSettings';
import ServiceCardCustomization from '@/components/admin/ServiceCardCustomization';
import OfflineConfiguration from '@/components/admin/OfflineConfiguration';
import LanguageManager from '@/components/admin/LanguageManager';
import RentalCalendarConfiguration from '@/components/admin/RentalCalendarConfiguration';
import ThemeManagement from '@/components/admin/ThemeManagement';
import UserExperienceTracking from '@/components/admin/UserExperienceTracking';
import MonetizationTracking from '@/components/admin/MonetizationTracking';
import ReferralManagement from '@/components/admin/ReferralManagement';
import QRCodeManagement from '@/components/admin/QRCodeManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { section } = useParams();
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState(section || 'dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => {
    const adminContainer = document.getElementById('admin-dashboard-container');
    if (adminContainer) {
      adminContainer.style.backgroundColor = adminTheme.colors.background;
    }
  }, []);
  
  // Dashboard data
  const stats = {
    totalUsers: 2458,
    totalOrders: 1247,
    totalRevenue: "৳ 12,45,890",
    activeListings: 845
  };
  
  const todayStats = {
    newUsers: 24,
    newOrders: 47,
    todayRevenue: "৳ 35,780",
    newListings: 18
  };
  
  const recentTransactions = [
    { id: 'TX-5872', amount: '৳ 2,450', type: 'বিক্রয়', user: 'রহিম আহমেদ', status: 'সম্পন্ন', time: '15 মিনিট আগে' },
    {id: 'TX-5871', amount: '৳ 1,200', type: 'রেন্টাল', user: 'করিম খান', status: 'প্রক্রিয়াধীন', time: '32 মিনিট আগে' },
    { id: 'TX-5870', amount: '৳ 3,500', type: 'সার্ভিস', user: 'নাদিয়া ইসলাম', status: 'সম্পন্ন', time: '1 ঘন্টা আগে' },
    { id: 'TX-5869', amount: '৳ 850', type: 'ডিজিটাল', user: 'সাকিব হাসান', status: 'সম্পন্ন', time: '2 ঘন্টা আগে' },
  ];
  
  const pendingItems = {
    products: 12,
    services: 8,
    rentalListings: 5,
    contentCreators: 3
  };

  const notifications = [
    {
      id: 1,
      title: "নতুন অর্ডার",
      message: "৩টি নতুন অর্ডার এসেছে",
      time: "২ মিনিট আগে",
      read: false
    },
    {
      id: 2,
      title: "নতুন রিভিউ",
      message: "একটি নতুন প্রোডাক্ট রিভিউ পোস্ট করা হয়েছে",
      time: "১০ মিনিট আগে",
      read: false
    },
    {
      id: 3,
      title: "লো স্টক অ্যালার্ট",
      message: "৫টি প্রোডাক্টের স্টক কম",
      time: "৩০ মিনিট আগে",
      read: true
    }
  ];

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
    { id: 'theme-management', name: 'থিম ম্যানেজমেন্ট', icon: <Palette size={18} /> },
    { id: 'user-experience', name: 'ইউজার এক্সপেরিয়েন্স', icon: <Activity size={18} /> },
    { id: 'monetization-tracking', name: 'মোনিটাইজেশন ট্র্যাকিং', icon: <LineChart size={18} /> },
    { id: 'referrals', name: 'রেফারেল সিস্টেম', icon: <Users size={18} /> },
    { id: 'qrcodes', name: 'QR কোড', icon: <QrCode size={18} /> },
    { id: 'refund-settings', name: 'রিফান্ড সেটিংস', icon: <RefreshCcw size={18} /> },
  ];

  // Default refund settings data
  const defaultRefundRules = [
    {
      id: '1',
      title: 'প্রোডাক্ট ক্ষতিগ্রস্ত',
      description: 'প্রোডাক্ট ক্ষতিগ্রস্ত হলে অটোমেটিক রিফান্ড',
      category: 'marketplace',
      timeLimit: 48,
      percent: 100,
      conditions: ['ছবি সহ প্রমাণ দাখিল করতে হবে', '৪৮ ঘন্টার মধ্যে রিপোর্ট করতে হবে'],
      active: true
    },
    {
      id: '2',
      title: 'ভুল প্রোডাক্ট',
      description: 'ভুল প্রোডাক্ট পাঠানো হলে অটোমেটিক রিফান্ড',
      category: 'marketplace',
      timeLimit: 72,
      percent: 100,
      conditions: ['প্রোডাক্টের ছবি তুলতে হবে', 'প্যাকেজিং অক্ষত থাকতে হবে'],
      active: true
    },
    {
      id: '3',
      title: 'সার্ভিস সম্পন্ন না হওয়া',
      description: 'সার্ভিস সম্পন্ন না হলে অটোমেটিক রিফান্ড',
      category: 'service',
      timeLimit: 24,
      percent: 100,
      conditions: ['সার্ভিস প্রোভাইডারের কনফার্মেশন', 'কাস্টমার রিপোর্ট'],
      active: false
    }
  ];

  const defaultRefundConditions = [
    {
      id: '1',
      name: 'ছবি প্রমাণ',
      description: 'ক্ষতিগ্রস্ত প্রোডাক্টের ছবি আপলোড করতে হবে',
      active: true
    },
    {
      id: '2',
      name: 'সময়সীমা',
      description: 'নির্দিষ্ট সময়সীমার মধ্যে রিপোর্ট করতে হবে',
      active: true
    },
    {
      id: '3',
      name: 'মূল্য সীমা',
      description: 'নির্দিষ্ট মূল্যের নিচে অটোমেটিক রিফান্ড হবে',
      active: true
    }
  ];

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
    toast({
      title: `${sidebarItems.find(item => item.id === moduleId)?.name} সিলেক্ট করা হয়েছে`,
      description: "আপনি এখন মডিউলে কাজ করতে পারেন।",
    });
  };

  // List of active module IDs
  const activeModuleIds = [
    'dashboard', 'users', 'marketplace', 'rentals', 'services', 
    'digital', 'categories', 'payments', 'reports', 'analytics', 
    'support', 'settings', 'advanced', 'monetization', 'service-card', 
    'offline-config', 'language-manager', 'calendar-config', 'theme-management',
    'user-experience', 'monetization-tracking', 'referrals', 'qrcodes', 'refund-settings'
  ];

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen flex w-full" id="admin-dashboard-container" style={{ backgroundColor: adminTheme.colors.background }}>
          <AdminSidebar 
            sidebarItems={sidebarItems} 
            activeModule={activeModule} 
            handleModuleChange={handleModuleChange} 
          />
          
          <div className="flex-1 overflow-y-auto">
            <AdminHeader 
              notifications={notifications} 
              showNotifications={showNotifications} 
              setShowNotifications={setShowNotifications} 
            />
            
            <div className="p-6">
              {/* Dashboard module */}
              {activeModule === 'dashboard' && (
                <DashboardMain 
                  stats={stats} 
                  todayStats={todayStats} 
                  recentTransactions={recentTransactions} 
                  pendingItems={pendingItems} 
                />
              )}
              
              {/* User Management module */}
              {activeModule === 'users' && <UserManagementEnhanced />}
              
              {/* Marketplace Management module */}
              {activeModule === 'marketplace' && <MarketplaceManagement />}
              
              {/* Rental Management module */}
              {activeModule === 'rentals' && <RentalManagement />}
              
              {/* Service Management module */}
              {activeModule === 'services' && <ServiceManagement />}
              
              {/* Digital Content Management module */}
              {activeModule === 'digital' && <DigitalContentManagement />}
              
              {/* Category Management module */}
              {activeModule === 'categories' && <CategoryManagement />}
              
              {/* Payment Management module */}
              {activeModule === 'payments' && <PaymentManagement />}
              
              {/* Monetization module */}
              {activeModule === 'monetization' && <MonetizationTab />}
              
              {/* Report Management module */}
              {activeModule === 'reports' && <ReportManagement />}
              
              {/* Analytics module */}
              {activeModule === 'analytics' && <Analytics />}
              
              {/* Support Ticket module */}
              {activeModule === 'support' && <SupportTicket />}
              
              {/* Settings module */}
              {activeModule === 'settings' && <Settings />}
              
              {/* Advanced Features module */}
              {activeModule === 'advanced' && <AdvancedFeatures />}
              
              {/* Service Card Customization module */}
              {activeModule === 'service-card' && <ServiceCardCustomization />}
              
              {/* Offline Configuration module */}
              {activeModule === 'offline-config' && <OfflineConfiguration />}
              
              {/* Language Manager module */}
              {activeModule === 'language-manager' && <LanguageManager />}
              
              {/* Calendar Configuration module */}
              {activeModule === 'calendar-config' && <RentalCalendarConfiguration />}
              
              {/* Theme Management module */}
              {activeModule === 'theme-management' && <ThemeManagement />}
              
              {/* User Experience Tracking module */}
              {activeModule === 'user-experience' && <UserExperienceTracking />}
              
              {/* Monetization Tracking module */}
              {activeModule === 'monetization-tracking' && <MonetizationTracking />}
              
              {/* Referral Management module */}
              {activeModule === 'referrals' && <ReferralManagement />}
              
              {/* QR Code Management module */}
              {activeModule === 'qrcodes' && <QRCodeManagement />}
              
              {/* Refund Settings module */}
              {activeModule === 'refund-settings' && (
                <RefundSettings initialSettings={{
                  enableAutoRefund: true,
                  autoRefundThreshold: 1000,
                  notifyAdminThreshold: 5000,
                  defaultRefundTime: 7,
                  requireEvidence: true,
                  reviewsBeforeEligible: 3,
                  automaticRules: defaultRefundRules,
                  automaticConditions: defaultRefundConditions
                }} />
              )}
              
              {/* Placeholder for modules not implemented yet */}
              {!activeModuleIds.includes(activeModule) && (
                <ModulePlaceholder 
                  moduleName={sidebarItems.find(item => item.id === activeModule)?.name} 
                  icon={sidebarItems.find(item => item.id === activeModule)?.icon}
                  setActiveModule={setActiveModule}
                />
              )}
            </div>
          </div>
        </div>
        
        <SidebarBackdrop />
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default AdminDashboard;
