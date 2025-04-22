
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Home,
  Building,
  ShoppingBag,
  ChevronDown,
  Plus,
  LogOut,
  Rocket,
  BookOpen,
  Mail,
  Calendar,
  Users,
  BarChart,
  DollarSign,
  MessageSquare,
  Store,
  Scissors,
  Briefcase,
  FileText,
  Video,
  Globe,
  Zap,
  Database,
  Cpu,
  Shield,
  FileText as FileIcon,
  Calendar as CalendarIcon,
  MessageCircle,
  UsersRound,
  LogIn,
  Bell,
  ShoppingCart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarDrawer } from '@/components/SidebarDrawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useShoppingState } from '@/hooks/useShoppingState';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.includes("/admin-dashboard");
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  const { cart } = useShoppingState();
  // navLinks থেকে 'কমিউনিটি' ও 'প্রোফাইল' বাদ, cart যুক্ত
  const navLinks = [
    { title: 'হোম', path: '/', icon: <Home className="h-5 w-5" /> },
    { title: 'রেন্ট', path: '/rentals', icon: <Building className="h-5 w-5" /> },
    { title: 'পোস্ট করুন', path: '/create-post', icon: <Plus className="h-5 w-5" /> },
    { title: 'মার্কেটপ্লেস', path: '/shopping', icon: <ShoppingBag className="h-5 w-5" /> },
  ];

  // Cart icon কম্পোনেন্ট
  const CartIcon = () => (
    <Button
      variant="outline"
      size="icon"
      className="relative rounded-full"
      onClick={() => navigate('/shopping')}
      aria-label="কার্ট"
    >
      <ShoppingCart className="h-5 w-5" />
      {cart.length > 0 && (
        <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cart.length}
        </span>
      )}
    </Button>
  );

  // Notification dropdown (বেসিক ডেমো)
  const NotificationMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="নোটিফিকেশন">
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>নোটিফিকেশন ও চ্যাট</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* উন্নত চ্যাট/নোটিফিকেশন ফিচার এখানে বসানো যাবে */}
        <DropdownMenuItem>
          <span>কোনো নতুন নোটিফিকেশন নেই</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>চ্যাট</DropdownMenuLabel>
        <DropdownMenuItem>
          <span>চ্যাট আসছে শীঘ্রই!</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // profileMenuItems, creatorSolutions, communityFeatures ইত্যাদি অপ্রয়োজনীয় এখন, তাই profile/কমিউনিটি মেনু রিমুভ করা হয়েছে

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      console.log(`Searching for: ${searchTerm}`);
    }
  };

  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
        <header className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <SidebarDrawer />
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Reservio</span>
            </Link>
          </div>
          <div className="w-full max-w-md mx-4 relative">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="খুঁজুন"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </form>
          </div>
          <div className="flex items-center gap-2">
            {/* Notification & Cart section */}
            <NotificationMenu />
            <CartIcon />
          </div>
        </header>
      </div>

      {/* নিচের ন্যাভ বার */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 z-40">
        <div className="grid grid-cols-5 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            if (link.title === 'পোস্ট করুন') {
              return (
                <Popover key={link.path}>
                  <PopoverTrigger asChild>
                    <div className="flex flex-col items-center justify-center relative cursor-pointer">
                      <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center mb-1">
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs mt-1 text-primary font-medium">{link.title}</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="center">
                    <div className="grid grid-cols-2 gap-2 p-4">
                      <div className="col-span-2">
                        <h3 className="font-semibold text-center mb-2">পোস্ট করুন</h3>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/create-post')}
                        className="flex flex-col items-center justify-center h-24 gap-2"
                      >
                        <Building className="h-8 w-8 text-primary" />
                        <span className="text-sm">রেন্টাল পোস্ট</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/create-post?type=service')}
                        className="flex flex-col items-center justify-center h-24 gap-2"
                      >
                        <Search className="h-8 w-8 text-blue-500" />
                        <span className="text-sm">সার্ভিস পোস্ট</span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/create-post?type=marketplace')}
                        className="flex flex-col items-center justify-center h-24 gap-2"
                      >
                        <ShoppingBag className="h-8 w-8 text-green-500" />
                        <span className="text-sm">প্রোডাক্ট পোস্ট</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex flex-col items-center justify-center ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {link.icon}
                <span className="text-xs mt-1">{link.title}</span>
                {isActive && (
                  <div className="absolute top-0 h-1 w-10 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
          {/* Extra slot for Cart icon at bottom nav */}
          <div className="flex flex-col items-center justify-center">
            <CartIcon />
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
