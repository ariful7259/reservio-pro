
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, Home, Building, ShoppingBag, ChevronDown, Plus, User, LogOut, Rocket, 
  Mail, Calendar, Users, BarChart, DollarSign, MessageSquare, Store, Briefcase, 
  FileText, Video, Globe, Zap, Database, Cpu, Shield, FileText as FileIcon, 
  Calendar as CalendarIcon, MessageCircle, UsersRound, LogIn, Bell, Wallet, QrCode, 
  File, Gavel, UserCheck, Home as HomeIcon, Calculator, Share2, HelpCircle as HelpIcon, 
  Info, Book, Wrench
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SidebarDrawer } from '@/components/SidebarDrawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.includes("/admin-dashboard");
  const {
    user,
    isAuthenticated,
    logout,
    isAdmin
  } = useAuth();
  const {
    toast
  } = useToast();

  const navLinks = [{
    title: 'হোম',
    path: '/',
    icon: <Home className="h-5 w-5" />
  }, {
    title: 'রেন্ট',
    path: '/rentals',
    icon: <Building className="h-5 w-5" />
  }, {
    title: 'পোস্ট করুন',
    path: '/create-post',
    icon: <Plus className="h-5 w-5" />
  }, {
    title: 'সার্ভিস',
    path: '/services',
    icon: <Search className="h-5 w-5" />
  }, {
    title: 'মার্কেটপ্লেস',
    path: '/shopping',
    icon: <ShoppingBag className="h-5 w-5" />
  }];

  const profileMenuItems = isAuthenticated ? [{
    icon: <User className="h-5 w-5" />,
    name: "প্রোফাইল",
    path: "/profile-management"
  }, {
    icon: <Shield className="h-5 w-5" />,
    name: "অ্যাডমিন ড্যাশবোর্ড",
    path: "/admin-dashboard",
    show: isAdmin
  }, {
    icon: <LogOut className="h-5 w-5" />,
    name: "লগআউট",
    path: "#",
    onClick: () => {
      logout();
      toast({
        title: "লগআউট সফল",
        description: "আপনি সফলভাবে লগআউট হয়েছেন"
      });
      navigate("/login");
    }
  }] : [{
    icon: <LogIn className="h-5 w-5" />,
    name: "লগইন",
    path: "/login"
  }];

  const communityFeatures = [{
    icon: <FileIcon className="h-4 w-4 text-blue-500" />,
    name: "স্টোরি শেয়ারিং",
    path: "/stories",
    description: "অভিজ্ঞতা শেয়ার করুন"
  }, {
    icon: <CalendarIcon className="h-4 w-4 text-green-500" />,
    name: "ইভেন্ট ক্যালেন্ডার",
    path: "/events",
    description: "কমিউনিটি ইভেন্টগুলো দেখুন"
  }, {
    icon: <MessageCircle className="h-4 w-4 text-purple-500" />,
    name: "ফোরাম",
    path: "/forums",
    description: "কমিউনিটি আলোচনা"
  }, {
    icon: <UsersRound className="h-4 w-4 text-orange-500" />,
    name: "গ্রুপ বুকিং",
    path: "/group-booking",
    description: "একসাথে সার্ভিস/প্রোডাক্ট নিন"
  }];

  // লিগ্যাল অ্যাসিস্ট্যান্স এন্ড লোন মেনু আইটেম
  const legalAssistanceMenuItems = [
    {
      icon: <File className="h-4 w-4 text-red-500" />,
      name: "রেন্টাল এগ্রিমেন্ট",
      path: "/services/rental-agreement",
      description: "রেন্টাল চুক্তি তৈরি করুন"
    },
    {
      icon: <Gavel className="h-4 w-4 text-red-500" />,
      name: "পুলিশ ইনটিমেশন",
      path: "/services/police-intimation",
      description: "পুলিশ স্টেশনে নোটিফিকেশন দিন"
    },
    {
      icon: <UserCheck className="h-4 w-4 text-red-500" />,
      name: "টেনান্ট ভেরিফিকেশন",
      path: "/services/tenant-verification",
      description: "ভাড়াটিয়া যাচাই করুন"
    },
    {
      icon: <Building className="h-4 w-4 text-red-500" />,
      name: "প্রপার্টি লিগাল অ্যাসিস্ট্যান্স",
      path: "/services/property-legal-assistance",
      description: "আইনি সহায়তা পেতে"
    },
    {
      icon: <HomeIcon className="h-4 w-4 text-red-500" />,
      name: "হোম লোন",
      path: "/services/home-loan",
      description: "সহজ শর্তে ঋণ নিন"
    },
    {
      icon: <DollarSign className="h-4 w-4 text-red-500" />,
      name: "হোম ডিপোজিট লোন",
      path: "/services/home-deposit-loan",
      description: "জামানত জমার জন্য ঋণ নিন"
    }
  ];

  // ইউটিলিটিস মেনু আইটেম
  const utilitiesMenuItems = [
    {
      icon: <Calculator className="h-4 w-4 text-red-500" />,
      name: "নো ইয়োর রেন্ট",
      path: "/utilities/know-your-rent",
      description: "উচিত ভাড়া নির্ধারণ করুন"
    },
    {
      icon: <FileText className="h-4 w-4 text-red-500" />,
      name: "ক্রিয়েট রেন্ট রিসিপ্টস",
      path: "/utilities/create-rent-receipts",
      description: "ভাড়ার রশিদ তৈরি করুন"
    },
    {
      icon: <Share2 className="h-4 w-4 text-red-500" />,
      name: "ক্লিক এন্ড আর্ন",
      path: "/utilities/click-and-earn",
      description: "শেয়ার করে আয় করুন"
    }
  ];

  // হেল্প এন্ড সাপোর্ট মেনু আইটেম
  const helpAndSupportMenuItems = [
    {
      icon: <HelpIcon className="h-4 w-4 text-red-500" />,
      name: "সাপোর্ট টপিকস",
      path: "/help/support-topics",
      description: "সাধারণ সমস্যার সমাধান"
    },
    {
      icon: <Book className="h-4 w-4 text-red-500" />,
      name: "ব্লগ",
      path: "/help/blog",
      description: "নিয়মিত আপডেট পান"
    },
    {
      icon: <MessageCircle className="h-4 w-4 text-red-500" />,
      name: "ফিডব্যাক",
      path: "/help/feedback",
      description: "আপনার মতামত জানান"
    },
    {
      icon: <Info className="h-4 w-4 text-red-500" />,
      name: "অ্যাবাউট আস",
      path: "/help/about-us",
      description: "আমাদের সম্পর্কে জানুন"
    }
  ];

  const creatorSolutions = [{
    icon: <Store className="h-4 w-4 text-primary" />,
    name: "অনলাইন স্টোর",
    path: "/create-store",
    description: "নিজের ব্র্যান্ডের ওয়েবসাইট তৈরি করুন"
  }, {
    icon: <Mail className="h-4 w-4 text-blue-500" />,
    name: "ইমেইল অটোমেশন",
    path: "/email-automation",
    description: "গ্রাহকদের সাথে অটোমেটিক যোগাযোগ"
  }, {
    icon: <BookOpen className="h-4 w-4 text-amber-500" />,
    name: "কোর্স বিল্ডার",
    path: "/course-builder",
    description: "আয় করুন অনলাইন শিক্ষা দিয়ে"
  }, {
    icon: <Calendar className="h-4 w-4 text-red-500" />,
    name: "ইভেন্ট হোস্টিং",
    path: "/event-hosting",
    description: "অনলাইন ও অফলাইন ইভেন্ট ম্যানেজমেন্ট"
  }, {
    icon: <MessageSquare className="h-4 w-4 text-orange-500" />,
    name: "১:১ সেশন",
    path: "/one-on-one",
    description: "পারসোনাল কনসালটেশন সেবা"
  }, {
    icon: <DollarSign className="h-4 w-4 text-green-500" />,
    name: "ডিজিটাল প্রোডাক্ট",
    path: "/digital-products",
    description: "ইবুক, টেমপ্লেট, সফটওয়্যার বিক্রয়"
  }, {
    icon: <Users className="h-4 w-4 text-yellow-500" />,
    name: "পেইড কমিউনিটি",
    path: "/paid-community",
    description: "মেম্বারশিপ কমিউনিটি তৈরি করুন"
  }, {
    icon: <BarChart className="h-4 w-4 text-purple-500" />,
    name: "অডিয়েন্স অ্যানালিটিক্স",
    path: "/audience-analytics",
    description: "গ্রাহক আচরণ ও বিক্রয় বিশ্লেষণ"
  }, {
    icon: <Globe className="h-4 w-4 text-cyan-500" />,
    name: "মাল্টি-চ্যানেল",
    path: "/multi-channel",
    description: "সব প্ল্যাটফর্ম থেকে বিক্রয় করুন"
  }, {
    icon: <Briefcase className="h-4 w-4 text-indigo-500" />,
    name: "রিসেলার প্রোগ্রাম",
    path: "/reseller-program",
    description: "এফিলিয়েট নেটওয়ার্ক তৈরি করুন"
  }, {
    icon: <FileText className="h-4 w-4 text-teal-500" />,
    name: "কন্টেন্ট প্ল্যানার",
    path: "/content-planner",
    description: "সোশ্যাল মিডিয়া ও কন্টেন্ট ম্যানেজমেন্ট"
  }, {
    icon: <Cpu className="h-4 w-4 text-gray-500" />,
    name: "পেমেন্ট গেটওয়ে",
    path: "/payment-gateway",
    description: "সহজে পেমেন্ট কালেকশন করুন"
  }, {
    icon: <Shield className="h-4 w-4 text-emerald-500" />,
    name: "কপি প্রোটেকশন",
    path: "/drm",
    description: "কন্টেন্ট চুরি ও কপি হওয়া ঠেকান"
  }, {
    icon: <Video className="h-4 w-4 text-rose-500" />,
    name: "ভিডিও হোস্টিং",
    path: "/video-hosting",
    description: "প্রোফেশনাল ভিডিও সার্ভিস"
  }, {
    icon: <Zap className="h-4 w-4 text-amber-500" />,
    name: "এফিলিয়েট টুল",
    path: "/affiliate",
    description: "এফিলিয়েট মার্কেটিং ম্যানেজমেন্ট"
  }];

  const serviceCategories = [{
    name: "ডাক্তার",
    path: "/services/category/medical"
  }, {
    name: "ডেন্টাল",
    path: "/services/category/dental"
  }, {
    name: "মেন্টাল হেলথ",
    path: "/services/category/mental-health"
  }, {
    name: "সেলুন",
    path: "/services/category/salon"
  }, {
    name: "পার্লার",
    path: "/services/category/parlour"
  }, {
    name: "ল",
    path: "/services/category/legal"
  }, {
    name: "রিপেয়ার",
    path: "/services/category/repair"
  }, {
    name: "হোম সার্ভিস",
    path: "/services/category/home-service"
  }, {
    name: "বিউটি",
    path: "/services/category/beauty"
  }, {
    name: "কনসালটেন্সি",
    path: "/services/category/consultancy"
  }];

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

  return <>
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
              <input type="text" placeholder="খুঁজুন" className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">কমিউনিটি</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>কমিউনিটি ফিচার</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {communityFeatures.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link to={item.path} className="flex flex-col gap-1 py-2">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">{item.description}</p>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              onClick={() => navigate('/wallet')}
            >
              <Wallet className="h-5 w-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/qr-scanner')}
            >
              <QrCode className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full overflow-hidden">
                  {user ? <img src={user.avatar || "https://i.pravatar.cc/150?img=1"} alt={user.name} className="h-full w-full object-cover" /> : <User className="h-5 w-5" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {user ? user.name : "অ্যাকাউন্ট"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {profileMenuItems.filter(item => !item.hasOwnProperty('show') || item.show).map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    {item.onClick ? <button onClick={item.onClick} className="flex items-center gap-2 w-full">
                        {item.icon}
                        <span>{item.name}</span>
                      </button> : <Link to={item.path} className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 z-40">
        <div className="grid grid-cols-5 h-full">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path;
            if (link.title === 'পোস্ট করুন') {
              return <Popover key={link.path}>
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
                        <Button variant="outline" onClick={() => navigate('/create-post')} className="flex flex-col items-center justify-center h-24 gap-2">
                          <Building className="h-8 w-8 text-primary" />
                          <span className="text-sm">রেন্টাল পোস্ট</span>
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/create-post?type=service')} className="flex flex-col items-center justify-center h-24 gap-2">
                          <Search className="h-8 w-8 text-blue-500" />
                          <span className="text-sm">সার্ভিস পোস্ট</span>
                        </Button>
                        <Button variant="outline" onClick={() => navigate('/create-post?type=marketplace')} className="flex flex-col items-center justify-center h-24 gap-2">
                          <ShoppingBag className="h-8 w-8 text-green-500" />
                          <span className="text-sm">প্রোডাক্ট পোস্ট</span>
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
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
                            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
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
                        
                        {/* নতুন ক্যাটাগরি মেনু বাটন */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                              <Briefcase className="h-8 w-8 text-red-500" />
                              <span className="text-sm">লিগ্যাল অ্যাসিস্ট্যান্স</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 max-h-[70vh] overflow-auto">
                            <div className="grid grid-cols-1 gap-1 p-1">
                              {legalAssistanceMenuItems.map((item, index) => (
                                <DropdownMenuItem key={index} asChild className="p-2">
                                  <Link to={item.path} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      {item.icon}
                                      <span className="font-medium">{item.name}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">{item.description}</p>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
                              <Wrench className="h-8 w-8 text-orange-500" />
                              <span className="text-sm">ইউটিলিটিস</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 max-h-[70vh] overflow-auto">
                            <div className="grid grid-cols-1 gap-1 p-1">
                              {utilitiesMenuItems.map((item, index) => (
                                <DropdownMenuItem key={index} asChild className="p-2">
                                  <Link to={item.path} className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                      {item.icon}
                                      <span className="font-medium">{item.name}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground pl-6">{item.description}</p>
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                      </div>
                    </PopoverContent>
                  </Popover>;
            }
            return <Link key={link.path} to={link.path} className={`flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-gray-500'}`}>
              {link.icon}
              <span className="text-xs mt-1">{link.title}</span>
              {isActive && <div className="absolute top-0 h-1 w-10 rounded-full bg-primary" />}
            </Link>;
          })}
        </div>
      </nav>
    </>;
};

export default Navbar;
