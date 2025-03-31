
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
  Rocket,
  BookOpen,
  Mail,
  Calendar,
  Users,
  BarChart,
  DollarSign,
  MessageSquare
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

  // Profile menu items
  const profileMenuItems = [
    { icon: <User className="h-5 w-5" />, name: "ব্যক্তিগত তথ্য", path: "/profile/personal" },
    { icon: <LogOut className="h-5 w-5" />, name: "লগআউট", path: "/logout" },
  ];

  // Digital creator solutions
  const creatorSolutions = [
    { icon: <Rocket className="h-4 w-4 text-primary" />, name: "অনলাইন স্টোর", path: "/create-store" },
    { icon: <Mail className="h-4 w-4 text-blue-500" />, name: "ইমেইল অটোমেশন", path: "/email-automation" },
    { icon: <BookOpen className="h-4 w-4 text-amber-500" />, name: "কোর্স বিল্ডার", path: "/course-builder" },
    { icon: <Calendar className="h-4 w-4 text-red-500" />, name: "ইভেন্ট হোস্টিং", path: "/event-hosting" },
    { icon: <MessageSquare className="h-4 w-4 text-orange-500" />, name: "১:১ সেশন", path: "/one-on-one" },
    { icon: <DollarSign className="h-4 w-4 text-green-500" />, name: "ডিজিটাল প্রোডাক্ট", path: "/digital-products" },
    { icon: <Users className="h-4 w-4 text-yellow-500" />, name: "পেইড কমিউনিটি", path: "/paid-community" },
    { icon: <BarChart className="h-4 w-4 text-purple-500" />, name: "অডিয়েন্স অ্যানালিটিক্স", path: "/audience-analytics" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Improved search functionality - navigate to search results page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      
      // Display mock search results for demonstration purposes
      console.log(`Searching for: ${searchTerm}`);
      // This would normally connect to a backend API to fetch actual search results
    }
  };

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full overflow-hidden">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>প্রোফাইল</DropdownMenuLabel>
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
          </div>
        </header>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 z-40">
        <div className="grid grid-cols-5 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
            // Special handling for create post button with popover
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="flex flex-col items-center justify-center h-24 gap-2"
                          >
                            <Rocket className="h-8 w-8 text-purple-500" />
                            <span className="text-sm">ডিজিটাল ক্রিয়েটর</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                          {creatorSolutions.map((solution, index) => (
                            <DropdownMenuItem key={index} asChild>
                              <Link to={solution.path} className="flex items-center gap-2">
                                {solution.icon}
                                <span>{solution.name}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
