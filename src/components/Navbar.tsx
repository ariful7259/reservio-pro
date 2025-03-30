
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, 
  Wallet, 
  Calendar, 
  Search, 
  Home,
  Building,
  ShoppingBag,
  Settings,
  ChevronDown,
  PaintBucket,
  Truck,
  Briefcase,
  Wrench,
  User,
  MessageSquare,
  Plus
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Navbar = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const isHomePage = location.pathname === "/";
  
  const navLinks = [
    { title: 'হোম', path: '/', icon: <Home className="h-5 w-5" /> },
    { title: 'রেন্ট', path: '/rentals', icon: <Building className="h-5 w-5" /> },
    { title: 'সার্ভিস', path: '/services', icon: <Search className="h-5 w-5" /> },
    { title: 'মার্কেটপ্লেস', path: '/shopping', icon: <ShoppingBag className="h-5 w-5" /> },
    { title: 'প্রোফাইল', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  const searchCategories = [
    { icon: <Home className="h-5 w-5" />, name: "বাসা", value: "house" },
    { icon: <Building className="h-5 w-5" />, name: "অ্যাপার্টমেন্ট", value: "apartment" },
    { icon: <PaintBucket className="h-5 w-5" />, name: "পেইন্টিং", value: "painting" },
    { icon: <Truck className="h-5 w-5" />, name: "প্যাকিং", value: "packing" },
    { icon: <Briefcase className="h-5 w-5" />, name: "ক্লিনিং", value: "cleaning" },
    { icon: <Wrench className="h-5 w-5" />, name: "রিপেয়ার", value: "repair" },
    { icon: <ShoppingBag className="h-5 w-5" />, name: "পণ্য", value: "products" },
    { icon: <Building className="h-5 w-5" />, name: "অফিস", value: "office" },
  ];

  const bannerImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=1000&auto=format&fit=crop",
  ];

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
          
          {/* Categories above search bar */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <Link to="/rentals" className="hover:text-primary">রেন্ট</Link>
            <Link to="/services" className="hover:text-primary">সার্ভিস</Link>
            <Link to="/shopping" className="hover:text-primary">মার্কেটপ্লেস</Link>
            <Button size="sm" variant="ghost" className="flex items-center gap-1" onClick={() => {}}>
              <Plus className="h-4 w-4" /> পোস্ট করুন
            </Button>
          </div>
          
          <div className="w-full max-w-md mx-4 relative">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="খুঁজুন" 
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-full p-2" align="center">
                <div className="grid grid-cols-4 gap-2">
                  {searchCategories.map((category, index) => (
                    <Button 
                      key={index} 
                      variant="ghost" 
                      className="flex flex-col items-center justify-center h-20 p-1"
                      onClick={() => setSearchTerm(`${category.name}: `)}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                        {category.icon}
                      </div>
                      <span className="text-xs text-center">{category.name}</span>
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Message Icon with Dropdown - moved notification inside */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0">
                    2
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>মেসেজ</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex gap-2 p-2">
                  <DropdownMenuItem className="flex-1 justify-center">
                    <Link to="/notifications" className="w-full text-center">নোটিফিকেশন</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex-1 justify-center">
                    <Link to="/chat" className="w-full text-center">চ্যাট</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex-1 justify-center">
                    <Link to="/feedback" className="w-full text-center">ফিডব্যাক</Link>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-auto">
                  {[
                    { title: 'আপনার অ্যাপয়েন্টমেন্ট ৩০ মিনিট পরে', time: '১০ মিনিট আগে' },
                    { title: 'সাপ্তাহিক অফারঃ ২০% ছাড় সকল সার্ভিসে', time: '২ ঘন্টা আগে' },
                    { title: 'আপনার ওয়ালেট রিচার্জ সফল হয়েছে', time: '১ দিন আগে' },
                  ].map((notification, i) => (
                    <DropdownMenuItem key={i} className="flex flex-col items-start p-3 cursor-pointer">
                      <div className="font-medium text-sm">{notification.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary">
                  <Link to="/notifications" className="w-full text-center">সব দেখুন</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 z-40">
        <div className="grid grid-cols-5 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;

