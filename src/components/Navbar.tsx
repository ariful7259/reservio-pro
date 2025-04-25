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
  Filter,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarDrawer } from '@/components/SidebarDrawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import SearchBar from '@/components/ui/search-bar';
import NavbarMenu from '@/components/ui/navbar-menu';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.includes("/admin-dashboard");
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const navLinks = [
    { title: 'হোম', path: '/', icon: <Home className="h-5 w-5" /> },
    { title: 'রেন্ট', path: '/rentals', icon: <Building className="h-5 w-5" /> },
    { title: 'পোস্ট করুন', path: '/create-post', icon: <Plus className="h-5 w-5" /> },
    { title: 'সার্ভিস', path: '/services', icon: <Search className="h-5 w-5" /> },
    { title: 'মার্কেটপ্লেস', path: '/shopping', icon: <ShoppingBag className="h-5 w-5" /> },
  ];

  // Profile menu items
  const profileMenuItems = isAuthenticated ? [
    { icon: <User className="h-5 w-5" />, name: "প্রোফাইল", path: "/profile-management" },
    { 
      icon: <Shield className="h-5 w-5" />, 
      name: "অ্যাডমিন ড্যাশবোর্ড", 
      path: "/admin-dashboard",
      show: isAdmin 
    },
    { 
      icon: <LogOut className="h-5 w-5" />, 
      name: "লগআউট", 
      path: "#",
      onClick: () => {
        logout();
        toast({
          title: "লগআউট সফল",
          description: "আপনি সফলভাবে লগআউট হয়েছেন",
        });
        navigate("/login");
      } 
    },
  ] : [
    { icon: <LogIn className="h-5 w-5" />, name: "লগইন", path: "/login" },
  ];

  // New community features menu items
  const communityFeatures = [
    { 
      icon: <FileIcon className="h-4 w-4 text-blue-500" />, 
      name: "স্টোরি শেয়ারিং", 
      path: "/stories",
      description: "অভিজ্ঞতা শেয়ার করুন" 
    },
    { 
      icon: <CalendarIcon className="h-4 w-4 text-green-500" />, 
      name: "ইভেন্ট ক্যালেন্ডার", 
      path: "/events",
      description: "কমিউনিটি ইভেন্টগুলো দেখুন" 
    },
    { 
      icon: <MessageCircle className="h-4 w-4 text-purple-500" />, 
      name: "ফোরাম", 
      path: "/forums",
      description: "কমিউনিটি আলোচনা" 
    },
    { 
      icon: <UsersRound className="h-4 w-4 text-orange-500" />, 
      name: "গ্রুপ বুকিং", 
      path: "/group-booking",
      description: "এক��াথে সার্ভিস/প্রোডাক্ট নিন" 
    },
  ];

  // Digital creator solutions
  const creatorSolutions = [
    { 
      icon: <Store className="h-4 w-4 text-primary" />, 
      name: "অনলাইন স্টোর", 
      path: "/create-store",
      description: "নিজের ব্র্যান্ডের ওয়েবসাইট তৈরি করুন"
    },
    { 
      icon: <Mail className="h-4 w-4 text-blue-500" />, 
      name: "ইমেইল অটোমেশন", 
      path: "/email-automation",
      description: "গ্রাহকদের সাথে অটোমেটিক যোগাযোগ"
    },
    { 
      icon: <BookOpen className="h-4 w-4 text-amber-500" />, 
      name: "কোর্স বিল্ডার", 
      path: "/course-builder",
      description: "আয় করুন অনলাইন শিক্ষা দিয়ে"
    },
    { 
      icon: <Calendar className="h-4 w-4 text-red-500" />, 
      name: "ইভেন্ট হোস্টিং", 
      path: "/event-hosting",
      description: "অনলাইন ও অফলাইন ইভেন্ট ম্যানেজমেন্ট"
    },
    { 
      icon: <MessageSquare className="h-4 w-4 text-orange-500" />, 
      name: "১:১ সেশন", 
      path: "/one-on-one",
      description: "পারসোনাল কনসালটেশন সেবা"
    },
    { 
      icon: <DollarSign className="h-4 w-4 text-green-500" />, 
      name: "ডিজিটাল প্রোডাক্ট", 
      path: "/digital-products",
      description: "ইবুক, টেমপ্লেট, সফটওয়্যার বিক্রয়"
    },
    { 
      icon: <Users className="h-4 w-4 text-yellow-500" />, 
      name: "পেইড কমিউনিটি", 
      path: "/paid-community",
      description: "মেম্বারশিপ কমিউনিটি তৈরি করুন"
    },
    { 
      icon: <BarChart className="h-4 w-4 text-purple-500" />, 
      name: "অডিয়েন্স অ্যানালিটিক্স", 
      path: "/audience-analytics",
      description: "গ্রাহক আচরণ ও বিক্রয় বিশ্লেষণ"
    },
    { 
      icon: <Globe className="h-4 w-4 text-cyan-500" />, 
      name: "মাল্টি-চ্যানেল", 
      path: "/multi-channel",
      description: "সব প্ল্যাটফর্ম থেকে বিক্রয় করুন"
    },
    { 
      icon: <Briefcase className="h-4 w-4 text-indigo-500" />, 
      name: "রিসেলার প্রোগ্রাম", 
      path: "/reseller-program",
      description: "এফিলিয়েট নেটওয়ার্ক তৈরি করুন"
    },
    { 
      icon: <FileText className="h-4 w-4 text-teal-500" />, 
      name: "কন্টেন্ট প্ল্যানার", 
      path: "/content-planner",
      description: "সোশ্যাল মিডিয়া ও কন্টেন্ট ম্যানেজমেন্ট"
    },
    { 
      icon: <Cpu className="h-4 w-4 text-gray-500" />, 
      name: "পেমেন্ট গেটওয়ে", 
      path: "/payment-gateway",
      description: "সহজে পেমেন্ট কালেকশন করুন"
    },
    { 
      icon: <Shield className="h-4 w-4 text-emerald-500" />, 
      name: "কপি প্রোটেকশন", 
      path: "/drm",
      description: "কন��টেন্ট চুরি ও কপি হওয়া ঠেকান"
    },
    { 
      icon: <Video className="h-4 w-4 text-rose-500" />, 
      name: "ভিডিও হোস্টিং", 
      path: "/video-hosting",
      description: "প্রোফেশনাল ভিডিও সার্ভিস"
    },
    { 
      icon: <Zap className="h-4 w-4 text-amber-500" />, 
      name: "এফিলিয়েট টুল", 
      path: "/affiliate",
      description: "এফিলিয়েট মার্কেটিং ম্যানেজমেন্ট"
    }
  ];

  // Service categories
  const serviceCategories = [
    { name: "ডাক্তার", path: "/services/category/medical" },
    { name: "ডেন্টাল", path: "/services/category/dental" },
    { name: "মেন্টাল হেলথ", path: "/services/category/mental-health" },
    { name: "সেলুন", path: "/services/category/salon" },
    { name: "পার্লার", path: "/services/category/parlour" },
    { name: "ল", path: "/services/category/legal" },
    { name: "রিপেয়ার", path: "/services/category/repair" },
    { name: "হোম সার্ভিস", path: "/services/category/home-service" },
    { name: "বিউটি", path: "/services/category/beauty" },
    { name: "কনসালটেন্সি", path: "/services/category/consultancy" },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const bottomNavVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.2
      }
    }
  };

  if (isAdminPage) {
    return null;
  }

  return (
    <>
      <motion.div 
        className="bg-background/80 backdrop-blur-md border-b border-border/50 fixed top-0 left-0 right-0 z-50"
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
      >
        <header className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <SidebarDrawer />
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Reservio</span>
            </Link>
          </div>
          
          <div className="w-full max-w-md mx-4 relative">
            <SearchBar />
          </div>
          
          <div className="flex items-center gap-2">
            <NavbarMenu 
              trigger={
                <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50 rounded-xl">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">কমিউনিটি</span>
                </Button>
              }
              items={communityFeatures}
              title="কমিউনিটি ফিচার"
            />
            
            <NavbarMenu 
              trigger={
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full overflow-hidden bg-background/80 backdrop-blur-sm hover:bg-background border border-border/50"
                >
                  {user ? (
                    <img 
                      src={user.avatar || "https://i.pravatar.cc/150?img=1"} 
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              }
              items={profileMenuItems}
              title={user ? user.name : "অ্যাকাউন্ট"}
            />
          </div>
        </header>
      </motion.div>
      
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 h-16 z-40"
        initial="hidden"
        animate="visible"
        variants={bottomNavVariants}
      >
        <div className="grid grid-cols-5 h-full">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            
            if (link.title === 'পোস্ট করুন') {
              return (
                <Popover key={link.path}>
                  <PopoverTrigger asChild>
                    <div className="flex flex-col items-center justify-center relative cursor-pointer">
                      <motion.div 
                        className="bg-primary rounded-full h-10 w-10 flex items-center justify-center mb-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="h-6 w-6 text-primary-foreground" />
                      </motion.div>
                      <span className="text-xs mt-1 text-primary font-medium">{link.title}</span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl" align="center">
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
                            <Users className="h-8 w-8 text-amber-500" />
                            <span className="text-sm">কমিউনিটি</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 max-h-[70vh] overflow-auto">
                          <div className="grid grid-cols-1 gap-1 p-1">
                            {communityFeatures.map((feature, index) => (
                              <DropdownMenuItem key={index} asChild className="p-2">
                                <Link to={feature.path} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    {feature.icon}
                                    <span className="font-medium">{feature.name}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground pl-6">{feature.description}</p>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
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
                        <DropdownMenuContent className="w-56 max-h-[70vh] overflow-auto">
                          <div className="grid grid-cols-1 gap-1 p-1">
                            {creatorSolutions.map((solution, index) => (
                              <DropdownMenuItem key={index} asChild className="p-2">
                                <Link to={solution.path} className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2">
                                    {solution.icon}
                                    <span className="font-medium">{solution.name}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground pl-6">{solution.description}</p>
                                </Link>
                              </DropdownMenuItem>
                            ))}
                          </div>
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
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.div>
                <span className="text-xs mt-1">{link.title}</span>
                {isActive && (
                  <motion.div 
                    className="absolute top-0 h-1 w-10 rounded-full bg-primary"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
