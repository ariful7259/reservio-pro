
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageSquare,
  Search, 
  Home,
  Building,
  ShoppingBag,
  ChevronDown,
  Plus,
  User,
  LogOut
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

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const isHomePage = location.pathname === "/";
  
  const navLinks = [
    { title: 'হোম', path: '/', icon: <Home className="h-5 w-5" /> },
    { title: 'রেন্ট', path: '/rentals', icon: <Building className="h-5 w-5" /> },
    { title: 'পোস্ট করুন', path: '/create-post', icon: <Plus className="h-5 w-5" /> },
    { title: 'সার্ভিস', path: '/services', icon: <Search className="h-5 w-5" /> },
    { title: 'মার্কেটপ্লেস', path: '/shopping', icon: <ShoppingBag className="h-5 w-5" /> },
  ];

  // User profile data
  const user = {
    name: 'আব্দুল্লাহ আল মামুন',
    phone: '+৮৮০১৭১২৩৪৫৬৭৮',
    email: 'abdullah@example.com',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
  };

  // Profile menu items
  const profileMenuItems = [
    { icon: <User className="h-5 w-5" />, name: "ব্যক্তিগত তথ্য", path: "/profile/personal" },
    { icon: <MessageSquare className="h-5 w-5" />, name: "নোটিফিকেশন", path: "/notifications" },
    { icon: <Building className="h-5 w-5" />, name: "সিকিউরিটি", path: "/security" },
    { icon: <ShoppingBag className="h-5 w-5" />, name: "পেমেন্ট মেথড", path: "/profile/payment" },
    { icon: <Plus className="h-5 w-5" />, name: "রেফার ফ্রেন্ড", path: "/profile/refer" },
    { icon: <LogOut className="h-5 w-5" />, name: "লগআউট", path: "/logout" },
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
          
          <div className="w-full max-w-md mx-4 relative">
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
          </div>
          
          <div className="flex items-center gap-2">
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full overflow-hidden">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="h-8 w-8 object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-3 p-3 border-b">
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.phone}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {profileMenuItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Message Icon with Dropdown */}
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
            
            // Special handling for create post button
            if (link.title === 'পোস্ট করুন') {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex flex-col items-center justify-center relative"
                >
                  <div className="bg-primary rounded-full h-10 w-10 flex items-center justify-center mb-1">
                    <Plus className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs mt-1 text-primary font-medium">{link.title}</span>
                </Link>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
