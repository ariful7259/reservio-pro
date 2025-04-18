
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu,
  ChevronRight,
  Wallet,
  Home,
  Building,
  CreditCard,
  Briefcase,
  Tool,
  Scale,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  BadgeAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerTrigger, 
  DrawerContent, 
  DrawerHeader,
  DrawerTitle,
  DrawerFooter 
} from '@/components/ui/drawer';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  {
    title: 'মাই সার্ভিসেস',
    icon: Home,
    path: '/my-services',
    isNew: true,
  },
  {
    title: 'ওয়ালেট',
    icon: Wallet,
    path: '/wallet',
  },
  {
    title: 'রেসিডেনশিয়াল প্ল্যান',
    icon: Building,
    path: '/residential-plans',
  },
  {
    title: 'কমার্শিয়াল প্ল্যান',
    icon: Briefcase,
    path: '/commercial-plans',
  },
  {
    title: 'হোম সার্ভিসেস',
    icon: Tool,
    path: '/home-services',
  },
  {
    title: 'পেমেন্ট অপশন',
    icon: CreditCard,
    path: '/payment-options',
  },
  {
    title: 'লিগ্যাল অ্যাসিস্ট্যান্স এবং লোন',
    icon: Scale,
    path: '/legal-assistance',
  },
  {
    title: 'ইউটিলিটিস',
    icon: Settings,
    path: '/utilities',
  },
  {
    title: 'হেল্প এবং সাপোর্ট',
    icon: HelpCircle,
    path: '/help',
  },
];

export const SidebarDrawer = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন",
    });
    navigate("/login");
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">মেনু খুলুন</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[85%] max-w-[350px] h-[100vh] overflow-y-auto left-0 right-auto">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle className="text-lg">
            {isAuthenticated ? user?.name || 'ব্যবহারকারী' : 'মেনু'}
          </DrawerTitle>
        </DrawerHeader>

        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-gray-500" />
                  <span>{item.title}</span>
                  {item.isNew && (
                    <Badge variant="default" className="ml-2">
                      NEW
                    </Badge>
                  )}
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </nav>
        </div>

        <DrawerFooter>
          <Separator className="my-4" />
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              লগ আউট
            </Button>
          ) : (
            <Button 
              className="w-full"
              onClick={() => navigate("/login")}
            >
              <LogIn className="h-4 w-4 mr-2" />
              লগইন করুন
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarDrawer;
