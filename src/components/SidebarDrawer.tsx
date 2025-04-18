import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Home, 
  PaintBucket, 
  Truck, 
  Briefcase, 
  Wrench,
  Wallet,
  Lightbulb,
  HelpCircle,
  Play,
  User,
  LogOut,
  Plus,
  MessageSquare,
  ChevronDown,
  Rocket,
  ShieldCheck,
  Fingerprint,
  Users,
  Award,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export const SidebarDrawer = () => {
  const [activePostType, setActivePostType] = useState('rent');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { toast } = useToast();
  
  const profileMenuItems = [
    { icon: <User className="h-5 w-5" />, name: "ব্যক্তিগত তথ্য", path: "/profile-management" },
    { icon: <MessageSquare className="h-5 w-5" />, name: "নোটিফিকেশন", path: "/notifications", badge: 2 },
    { icon: <Wallet className="h-5 w-5" />, name: "ওয়ালেট", path: "/wallet" },
    { icon: <ShieldCheck className="h-5 w-5" />, name: "সিকিউরিটি", path: "/security" },
    { icon: <Fingerprint className="h-5 w-5" />, name: "KYC ভেরিফিকেশন", path: "/kyc-verification" },
    { icon: <Lightbulb className="h-5 w-5" />, name: "ইউটিলিটিস", path: "/utilities" },
    { icon: <HelpCircle className="h-5 w-5" />, name: "হেল্প এন্ড সাপোর্ট", path: "/help" },
    { 
      icon: <ShieldCheck className="h-5 w-5" />, 
      name: "অ্যাডমিন ড্যাশবোর্ড", 
      path: "/admin-dashboard",
      show: isAdmin 
    },
  ];

  const videoAds = [
    {
      thumbnail: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      title: "নতুন সার্ভিস উপলব্ধ",
      description: "আমাদের নতুন সার্ভিস দেখুন এবং বুক করুন",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
      title: "সাপ্তাহিক অফার",
      description: "সাপ্তাহিক অফার শেষ হতে আর ২ দিন বাকি",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      title: "ইলেক্ট্রনিক্স সেল",
      description: "সকল ইলেক্ট্রনিক্স পণ্যে ২০% ছাড়",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "��পনি সফলভাবে লগআউট হয়েছেন",
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
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
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
                  {profileMenuItems
                    .filter(item => !item.hasOwnProperty('show') || item.show)
                    .map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <Link to={item.path} className="flex items-center gap-2 w-full">
                        {item.icon}
                        <span>{item.name}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="ml-auto">{item.badge}</Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
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
            </div>
          )}
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
          
          <div className="space-y-2">
            <h3 className="font-medium">নতুন ভিডিও</h3>
            <Carousel className="w-full">
              <CarouselContent>
                {videoAds.map((ad, index) => (
                  <CarouselItem key={index}>
                    <div className="rounded-lg overflow-hidden border">
                      <div className="aspect-video bg-black flex items-center justify-center relative">
                        <video 
                          className="w-full h-full object-cover"
                          poster={ad.thumbnail}
                          controls
                        >
                          <source src={ad.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="bg-black/30 text-white border-white hover:bg-black/50 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              const video = e.currentTarget.closest('.aspect-video')?.querySelector('video');
                              if (video) {
                                if (video.paused) {
                                  video.play();
                                } else {
                                  video.pause();
                                }
                              }
                            }}
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium mb-2">{ad.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{ad.description}</p>
                        <Button variant="default" size="sm" className="w-full" 
                          onClick={() => window.location.href = '/services'}>
                          বুক করুন
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1 h-8 w-8" />
              <CarouselNext className="right-1 h-8 w-8" />
            </Carousel>
          </div>
        </div>
        
        <DrawerFooter>
          {isAuthenticated ? (
            <>
              <Separator className="mb-4" />
              <Button 
                variant="outline" 
                className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                লগ আউট
              </Button>
            </>
          ) : (
            <>
              <Separator className="mb-4" />
              <Button 
                className="w-full"
                onClick={() => navigate("/login")}
              >
                <LogIn className="h-4 w-4 mr-2" />
                লগইন করুন
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
