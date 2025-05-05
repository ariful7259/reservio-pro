import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, Home, PaintBucket, Truck, Briefcase, Wrench, Wallet, Lightbulb, 
  HelpCircle, Play, User, LogOut, Plus, MessageSquare, ChevronDown, Rocket, 
  ShieldCheck, Fingerprint, Users, Award, LogIn, Book, Calendar, Heart, 
  MapPin, List, ShoppingBag, Star, Store, File, Gavel, UserCheck, Building, 
  Home as HomeIcon, DollarSign, FileText, Calculator, Share2, 
  HelpCircle as HelpIcon, MessageCircle, Info, AirVent, Hammer, Pipette, HousePlus, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const SidebarDrawer = () => {
  const [activePostType, setActivePostType] = useState('rent');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    logout,
    isAdmin
  } = useAuth();
  const {
    toast
  } = useToast();
  
  // সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories = [
    { 
      name: "পেইন্টিং", 
      icon: <PaintBucket className="h-6 w-6 text-pink-500" />,
      path: "/services/category/painting" 
    },
    { 
      name: "প্যাকার্স & মুভার্স", 
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      path: "/services/category/packers-movers" 
    },
    { 
      name: "হোম ক্লিনিং", 
      icon: <Home className="h-6 w-6 text-green-500" />,
      path: "/services/category/home-cleaning" 
    },
    { 
      name: "এসি রিপেয়ার", 
      icon: <AirVent className="h-6 w-6 text-purple-500" />,
      path: "/services/category/ac-repair" 
    },
    { 
      name: "ইলেকট্রিশিয়ান", 
      icon: <Hammer className="h-6 w-6 text-yellow-500" />,
      path: "/services/category/electrician" 
    },
    { 
      name: "কার্পেন্ট্রি", 
      icon: <Wrench className="h-6 w-6 text-amber-500" />,
      path: "/services/category/carpentry" 
    },
    { 
      name: "প্লাম্বিং", 
      icon: <Pipette className="h-6 w-6 text-teal-500" />,
      path: "/services/category/plumbing" 
    },
    { 
      name: "হোম রেনোভেশন", 
      icon: <HousePlus className="h-6 w-6 text-indigo-500" />,
      path: "/services/category/home-renovation" 
    }
  ];

  // সার্ভিস ক্যাটাগরি প্রদর্শন - বাটন ক্লিক অনুযায়ী
  const displayedCategories = showAllCategories ? serviceCategories : serviceCategories.slice(0, 4);
  
  const profileMenuItems = [{
    icon: <User className="h-5 w-5" />,
    name: "ব্যক্তিগত তথ্য",
    path: "/profile-management"
  }, {
    icon: <MessageSquare className="h-5 w-5" />,
    name: "নোটিফিকেশন",
    path: "/notifications",
    badge: 2
  }, {
    icon: <Wallet className="h-5 w-5" />,
    name: "ওয়ালেট",
    path: "/wallet"
  }, {
    icon: <ShieldCheck className="h-5 w-5" />,
    name: "সিকিউরিটি",
    path: "/security"
  }, {
    icon: <Fingerprint className="h-5 w-5" />,
    name: "KYC ভেরিফিকেশন",
    path: "/kyc-verification"
  }, {
    icon: <Lightbulb className="h-5 w-5" />,
    name: "ইউটিলিটিস",
    path: "/utilities"
  }, {
    icon: <HelpCircle className="h-5 w-5" />,
    name: "হেল্প এন্ড সাপোর্ট",
    path: "/help"
  }, {
    icon: <ShieldCheck className="h-5 w-5" />,
    name: "অ্যাডমিন ড্যাশবোর্ড",
    path: "/admin-dashboard",
    show: isAdmin
  }];

  // আমার সার্ভিসের ড্রপডাউন আইটেম
  const myServicesMenuItems = [{
    icon: <Book className="h-5 w-5" />,
    name: "আমার বুকিংস",
    path: "/my-services?tab=bookings"
  }, {
    icon: <Calendar className="h-5 w-5" />,
    name: "আমার অ্যাপয়েন্টমেন্টস",
    path: "/my-services?tab=appointments"
  }, {
    icon: <Heart className="h-5 w-5" />,
    name: "আমার শর্টলিস্ট",
    path: "/my-services?tab=shortlists"
  }, {
    icon: <MapPin className="h-5 w-5" />,
    name: "যোগাযোগকৃত প্রোপার্টি",
    path: "/my-services?tab=contactedProperties"
  }, {
    icon: <List className="h-5 w-5" />,
    name: "আমার লিস্টিংস",
    path: "/my-services?tab=listings"
  }, {
    icon: <ShoppingBag className="h-5 w-5" />,
    name: "আমার শপ",
    path: "/my-services?tab=shop"
  }, {
    icon: <Star className="h-5 w-5" />,
    name: "স্মার্ট রেকমেন্ডেশন",
    path: "/my-services?tab=recommendations"
  }, {
    icon: <Store className="h-5 w-5" />,
    name: "বিক্রেতা ড্যাশবোর্ড",
    path: "/my-services?tab=sellerDashboard"
  }];

  // লিগ্যাল অ্যাসিস্ট্যান্স এন্ড লোন মেনু আইটেম
  const legalAssistanceMenuItems = [
    {
      icon: <File className="h-5 w-5 text-red-500" />,
      name: "রেন্টাল এগ্রিমেন্ট",
      path: "/services/rental-agreement"
    },
    {
      icon: <Gavel className="h-5 w-5 text-red-500" />,
      name: "পুলিশ ইনটিমেশন",
      path: "/services/police-intimation"
    },
    {
      icon: <UserCheck className="h-5 w-5 text-red-500" />,
      name: "টেনান্ট ভেরিফিকেশন",
      path: "/services/tenant-verification"
    },
    {
      icon: <Building className="h-5 w-5 text-red-500" />,
      name: "প্রপার্টি লিগাল অ্যাসিস্ট্যান্স",
      path: "/services/property-legal-assistance"
    },
    {
      icon: <HomeIcon className="h-5 w-5 text-red-500" />,
      name: "হোম লোন",
      path: "/services/home-loan"
    },
    {
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
      name: "হোম ডিপোজিট লোন",
      path: "/services/home-deposit-loan"
    }
  ];

  // ইউটিলিটিস মেনু আইটেম
  const utilitiesMenuItems = [
    {
      icon: <Calculator className="h-5 w-5 text-red-500" />,
      name: "নো ইয়োর রেন্ট",
      path: "/utilities/know-your-rent"
    },
    {
      icon: <FileText className="h-5 w-5 text-red-500" />,
      name: "ক্রিয়েট রেন্ট রিসিপ্টস",
      path: "/utilities/create-rent-receipts"
    },
    {
      icon: <Share2 className="h-5 w-5 text-red-500" />,
      name: "ক্লিক এন্ড আর্ন",
      path: "/utilities/click-and-earn"
    }
  ];

  // হেল্প এন্ড সাপোর্ট মেনু আইটেম
  const helpAndSupportMenuItems = [
    {
      icon: <HelpIcon className="h-5 w-5 text-red-500" />,
      name: "সাপোর্ট টপিকস",
      path: "/help/support-topics"
    },
    {
      icon: <Book className="h-5 w-5 text-red-500" />,
      name: "ব্লগ",
      path: "/help/blog"
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-red-500" />,
      name: "ফিডব্যাক",
      path: "/help/feedback"
    },
    {
      icon: <Info className="h-5 w-5 text-red-500" />,
      name: "অ্যাবাউট আস",
      path: "/help/about-us"
    }
  ];

  const videoAds = [{
    thumbnail: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    title: "নতুন সার্ভিস উপলব্ধ",
    description: "আমাদের নতুন সার্ভিস দেখুন এবং বুক করুন",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }, {
    thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    title: "সাপ্তাহিক অফার",
    description: "সাপ্তাহিক অফার শেষ হতে আর ২ দিন বাকি",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }, {
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    title: "ইলেক্ট্রনিক্স সেল",
    description: "সকল ইলেক্ট্রনিক্স পণ্যে ২০% ছাড়",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }];
  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন"
    });
    navigate("/login");
  };

  return <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">মেনু খুলুন</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[85%] max-w-[350px] h-[100vh] overflow-y-auto left-0 right-auto">
        <DrawerHeader className="border-b pb-4">
          {isAuthenticated && user ? <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar || ""} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <DrawerTitle className="text-lg">{user.name}</DrawerTitle>
                <p className="text-sm text-muted-foreground">{user.phone || user.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ml-auto">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {profileMenuItems.filter(item => !item.hasOwnProperty('show') || item.show).map((item, index) => <DropdownMenuItem key={index} asChild>
                      <Link to={item.path} className="flex items-center gap-2 w-full">
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && <Badge variant="destructive" className="ml-auto">{item.badge}</Badge>}
                      </Link>
                    </DropdownMenuItem>)}
                </DropdownMenuContent>
              </DropdownMenu>
            </div> : <div className="flex items-center justify-between w-full">
              <DrawerTitle className="text-lg">Reservio</DrawerTitle>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  <LogIn className="h-4 w-4 mr-2" />
                  লগইন
                </Button>
                <Button onClick={() => navigate("/signup")}>
                  সাইন আপ
                </Button>
              </div>
            </div>}
        </DrawerHeader>
        
        <div className="px-4 space-y-6 py-4">
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium text-lg">বিজ্ঞাপন পোস্ট করুন</h3>
            <p className="text-sm text-gray-600">আপনার পণ্য, সেবা, বা প্রপার্টি বিজ্ঞাপন দিতে এখনই পোস্ট করুন</p>
            <Link to="/create-post">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                বিজ্ঞাপন পোস্ট করুন
              </Button>
            </Link>
          </div>
          
          {/* সার্ভিস ক্যাটাগরি গ্রিড লেআউট */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">সার্ভিস ক্যাটাগরি</h3>
            <div className="grid grid-cols-2 gap-3">
              {displayedCategories.map((category, index) => (
                <Link 
                  key={index} 
                  to={category.path}
                  className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    {category.icon}
                  </div>
                  <span className="text-sm text-center">{category.name}</span>
                </Link>
              ))}
            </div>
            
            {/* আরও দেখুন বাটন */}
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center gap-1 text-primary"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? "কম দেখুন" : "আরও দেখুন"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">নতুন ভিডিও</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {videoAds.map((ad, index) => <CarouselItem key={index}>
                    <div className="rounded-lg overflow-hidden border">
                      <div className="aspect-video bg-black flex items-center justify-center relative">
                        <video className="w-full h-full object-cover" poster={ad.thumbnail} controls>
                          <source src={ad.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button variant="outline" size="icon" className="bg-black/30 text-white border-white hover:bg-black/50 hover:text-white" onClick={e => {
                        e.stopPropagation();
                        const video = e.currentTarget.closest('.aspect-video')?.querySelector('video');
                        if (video) {
                          if (video.paused) {
                            video.play();
                          } else {
                            video.pause();
                          }
                        }
                      }}>
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium mb-2">{ad.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{ad.description}</p>
                        <Button variant="default" size="sm" className="w-full" onClick={() => window.location.href = '/services'}>
                          বুক করুন
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>)}
              </CarouselContent>
              <CarouselPrevious className="left-1 h-8 w-8" />
              <CarouselNext className="right-1 h-8 w-8" />
            </Carousel>

            {isAuthenticated && <div className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">আমার সার্ভিস</h3>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex items-center justify-between">
                      <span>আমার সার্ভিস দেখুন</span>
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    <DropdownMenuGroup>
                      {myServicesMenuItems.map((item, index) => <DropdownMenuItem key={index} asChild>
                          <Link to={item.path} className="flex items-center gap-2 w-full py-2" onClick={() => {
                      navigate(item.path);
                    }}>
                            {item.icon}
                            <span>{item.name}</span>
                          </Link>
                        </DropdownMenuItem>)}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {isAdmin}
              </div>}

              {/* নতুন কোলাপ্সিবল মেনু সেকশন */}
              <div className="space-y-2 mt-4">
                <Collapsible className="border rounded-md">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-medium">লিগ্যাল অ্যাসিস্ট্যান্স এন্ড লোন</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-2">
                      {legalAssistanceMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="border rounded-md">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <Wrench className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-medium">ইউটিলিটিস</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-2">
                      {utilitiesMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible className="border rounded-md">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <HelpCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-medium">হেল্প এন্ড সাপোর্ট</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-2">
                      {helpAndSupportMenuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              {/* রেফারেল সিস্টেম অংশ - আমার সার্ভিসের নিচে স্থানান্তরিত */}
              <div className="space-y-4 p-4 border rounded-lg bg-gradient-to-r from-primary/10 to-purple-100 border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">রেফারেল সিস্টেম</h3>
                    <p className="text-sm">বন্ধুদের আমন্ত্রণ জানিয়ে উপার্জন করুন</p>
                  </div>
                </div>
                <Link to="/referral">
                  <Button className="w-full gap-2" variant="outline">
                    <Award className="h-4 w-4" />
                    রেফারেল পেতে ক্লিক করুন
                  </Button>
                </Link>
              </div>
          </div>
        </div>
        
        <DrawerFooter>
          {isAuthenticated ? <>
              <Separator className="mb-4" />
              <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                লগ আউট
              </Button>
            </> : <>
              <Separator className="mb-4" />
              <Button className="w-full" onClick={() => navigate("/login")}>
                <LogIn className="h-4 w-4 mr-2" />
                লগইন করুন
              </Button>
            </>}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>;
};
