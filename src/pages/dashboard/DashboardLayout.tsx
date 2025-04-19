
import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  Store, 
  Package, 
  BarChart3, 
  Users, 
  Calendar, 
  Home, 
  Settings, 
  ChevronRight, 
  MessageSquare, 
  Building, 
  Wrench, 
  Video,
  LogIn,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
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

interface DashboardLayoutProps {
  type?: 'marketplace' | 'rental' | 'service' | 'content';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ type = 'marketplace' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <h2 className="text-xl">ড্যাশবোর্ড ব্যবহারের জন্য লগইন করুন</h2>
        <Button onClick={() => navigate('/login', { state: { from: location.pathname } })}>
          <LogIn className="h-4 w-4 mr-2" />
          লগইন করুন
        </Button>
      </div>
    );
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getMenuItems = (dashboardType: string) => {
    const commonItems = [
      {
        title: 'হোম',
        icon: Home,
        path: `/dashboard/${dashboardType}`,
      },
      {
        title: 'অ্যানালিটিক্স',
        icon: BarChart3,
        path: `/dashboard/${dashboardType}/analytics`,
      },
      {
        title: 'গ্রাহক ব্যবস্থাপনা',
        icon: Users,
        path: `/dashboard/${dashboardType}/customers`,
      },
      {
        title: 'সেটিংস',
        icon: Settings,
        path: `/dashboard/${dashboardType}/settings`,
      },
    ];
    
    let specificItems = [];
    
    switch (dashboardType) {
      case 'marketplace':
        specificItems = [
          {
            title: 'প্রোডাক্ট ম্যানেজমেন্ট',
            icon: Package,
            path: `/dashboard/${dashboardType}/products`,
          },
          {
            title: 'অর্ডার ট্র্যাকিং',
            icon: Package,
            path: `/dashboard/${dashboardType}/orders`,
          },
          {
            title: 'ইনভেন্টরি',
            icon: Package,
            path: `/dashboard/${dashboardType}/inventory`,
          },
          {
            title: 'রিভিউ ম্যানেজমেন্ট',
            icon: MessageSquare,
            path: `/dashboard/${dashboardType}/reviews`,
          },
          {
            title: 'প্রোমোশন টুলস',
            icon: MessageSquare,
            path: `/dashboard/${dashboardType}/promotions`,
          },
        ];
        break;
      case 'rental':
        specificItems = [
          {
            title: 'প্রপার্টি ম্যানেজমেন্ট',
            icon: Building,
            path: `/dashboard/${dashboardType}/properties`,
          },
          {
            title: 'বুকিং ম্যানেজমেন্ট',
            icon: Calendar,
            path: `/dashboard/${dashboardType}/bookings`,
          },
          {
            title: 'পেমেন্ট ট্র্যাকিং',
            icon: Package,
            path: `/dashboard/${dashboardType}/payments`,
          },
          {
            title: 'মেইনটেনেন্স রিকোয়েস্ট',
            icon: Wrench,
            path: `/dashboard/${dashboardType}/maintenance`,
          },
          {
            title: 'অকুপেন্সি রেট',
            icon: BarChart3,
            path: `/dashboard/${dashboardType}/occupancy`,
          },
          {
            title: 'রেটিং এবং রিভিউ',
            icon: MessageSquare,
            path: `/dashboard/${dashboardType}/reviews`,
          },
        ];
        break;
      case 'service':
        specificItems = [
          {
            title: 'সার্ভিস ম্যানেজমেন্ট',
            icon: Wrench,
            path: `/dashboard/${dashboardType}/services`,
          },
          {
            title: 'অ্যাপয়েন্টমেন্ট শিডিউল',
            icon: Calendar,
            path: `/dashboard/${dashboardType}/appointments`,
          },
          {
            title: 'ক্লায়েন্ট ম্যানেজমেন্ট',
            icon: Users,
            path: `/dashboard/${dashboardType}/clients`,
          },
          {
            title: 'পেমেন্ট ট্র্যাকিং',
            icon: Package,
            path: `/dashboard/${dashboardType}/payments`,
          },
          {
            title: 'সার্ভিস পারফরম্যান্স',
            icon: BarChart3,
            path: `/dashboard/${dashboardType}/performance`,
          },
          {
            title: 'প্রমোশন টুলস',
            icon: MessageSquare,
            path: `/dashboard/${dashboardType}/promotions`,
          },
        ];
        break;
      case 'content':
        specificItems = [
          {
            title: 'কন্টেন্ট ম্যানেজমেন্ট',
            icon: Video,
            path: `/dashboard/${dashboardType}/contents`,
          },
          {
            title: 'অডিয়েন্স অ্যানালিটিক্স',
            icon: BarChart3,
            path: `/dashboard/${dashboardType}/audience`,
          },
          {
            title: 'মানিটাইজেশন ট্র্যাকিং',
            icon: Package,
            path: `/dashboard/${dashboardType}/monetization`,
          },
          {
            title: 'কমেন্ট এবং ফিডব্যাক',
            icon: MessageSquare,
            path: `/dashboard/${dashboardType}/comments`,
          },
          {
            title: 'ট্রেন্ড অ্যানালিসিস',
            icon: BarChart3,
            path: `/dashboard/${dashboardType}/trends`,
          },
          {
            title: 'কলাবোরেশন টুলস',
            icon: Users,
            path: `/dashboard/${dashboardType}/collaboration`,
          },
        ];
        break;
      default:
        break;
    }
    
    return [...specificItems, ...commonItems];
  };

  const menuItems = getMenuItems(type);

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen pt-16">
        {/* Mobile menu toggle button */}
        <div className="fixed top-16 left-0 z-40 p-4 lg:hidden">
          <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Sidebar - Desktop always visible, mobile conditionally */}
        <div className={cn(
          "fixed top-16 bottom-0 z-30 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar className="bg-white shadow-sm">
            <SidebarHeader className="border-b border-slate-200 p-4">
              <div className="flex items-center gap-2">
                {type === 'marketplace' && <Store className="h-6 w-6 text-primary" />}
                {type === 'rental' && <Building className="h-6 w-6 text-primary" />}
                {type === 'service' && <Wrench className="h-6 w-6 text-primary" />}
                {type === 'content' && <Video className="h-6 w-6 text-primary" />}
                <h2 className="text-lg font-medium">
                  {type === 'marketplace' && 'মার্কেটপ্লেস ড্যাশবোর্ড'}
                  {type === 'rental' && 'রেন্টাল ড্যাশবোর্ড'}
                  {type === 'service' && 'সার্ভিস ড্যাশবোর্ড'}
                  {type === 'content' && 'কন্টেন্ট ড্যাশবোর্ড'}
                </h2>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>মেনু</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {menuItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton 
                          isActive={location.pathname === item.path}
                          onClick={() => {
                            navigate(item.path);
                            if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                          }}
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
        </div>
        
        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Main content */}
        <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
