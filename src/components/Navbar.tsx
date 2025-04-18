
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Home,
  Building,
  ShoppingBag,
  ChevronDown,
  Plus,
  User,
  LogOut,
  MessageCircle,
  Bell,
  Wallet,
  Home as HomeIcon,
  Briefcase,
  Settings,
  HelpCircle,
  FileText,
  CreditCard,
  Scale,
  Tool,
  LogIn,
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <SidebarDrawer />
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Reservio</span>
            </Link>
          </div>

          {/* Optimized Search Bar for Mobile */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 relative hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="খুঁজুন"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>

          {/* Mobile Search Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => navigate('/search')}
          >
            <Search className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            {/* Chat Icon with Badge */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-5 w-5" />
              {unreadMessages > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                >
                  {unreadMessages}
                </Badge>
              )}
            </Button>

            {/* Notification Icon with Badge */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/notifications')}
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>

            {/* Login/Profile Button */}
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={() => navigate('/profile')}
                className="hidden md:flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </Button>
            ) : (
              <Button 
                variant="default"
                onClick={() => navigate('/login')}
                className="hidden md:flex items-center gap-2"
              >
                <LogIn className="h-4 w-4" />
                <span>লগইন</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Shown when scrolled */}
      <div className="md:hidden border-t">
        <form onSubmit={handleSearch} className="p-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="খুঁজুন"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
