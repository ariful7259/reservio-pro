
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
  ChevronDown,
  ChevronUp,
  LogOut,
  Plus,
  Filter,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SidebarDrawer = () => {
  const [isServiceExpanded, setIsServiceExpanded] = useState(false);
  const [activePostType, setActivePostType] = useState('rent');
  const navigate = useNavigate();
  
  // User data
  const user = {
    name: 'আব্দুল্লাহ আল মামুন',
    phone: '+৮৮০১৭১২৩৪৫৬৭৮',
    email: 'abdullah@example.com',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
  };
  
  const serviceCategories = [
    { icon: <PaintBucket className="h-6 w-6" />, name: "পেইন্টিং", path: "/services/painting" },
    { icon: <Truck className="h-6 w-6" />, name: "প্যাকার্স ও মুভার্স", path: "/services/packers-movers" },
    { icon: <Briefcase className="h-6 w-6" />, name: "হোম ক্লিনিং", path: "/services/home-cleaning" },
    { icon: <Wrench className="h-6 w-6" />, name: "এসি রিপেয়ার", path: "/services/ac-repair" },
    // Additional categories that will be shown when expanded
    { icon: <Home className="h-6 w-6" />, name: "গৃহ নির্মাণ", path: "/services/construction" },
    { icon: <Wrench className="h-6 w-6" />, name: "প্লাম্বিং", path: "/services/plumbing" },
    { icon: <Wrench className="h-6 w-6" />, name: "ইলেক্ট্রিশিয়ান", path: "/services/electrician" },
    { icon: <Wrench className="h-6 w-6" />, name: "কার্পেন্টার", path: "/services/carpenter" },
  ];

  const myServicesSubMenus = [
    { icon: <Wallet className="h-5 w-5" />, name: "ওয়ালেট", path: "/wallet" },
    { icon: <Lightbulb className="h-5 w-5" />, name: "ইউটিলিটিস", path: "/utilities" },
    { icon: <HelpCircle className="h-5 w-5" />, name: "হেল্প এন্ড সাপোর্ট", path: "/help" },
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

  const toggleServiceExpand = () => {
    setIsServiceExpanded(!isServiceExpanded);
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
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <DrawerTitle className="text-lg">{user.name}</DrawerTitle>
              <p className="text-sm text-muted-foreground">{user.phone}</p>
            </div>
          </div>
        </DrawerHeader>
        
        <div className="px-4 space-y-6 py-4">
          {/* Post Your Ads Section */}
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
          
          {/* Video Ad Carousel */}
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
          
          {/* Menu Sections */}
          <div className="space-y-3">
            <h3 className="font-medium mb-2">সেকশন</h3>
            <Accordion type="single" collapsible className="w-full">
              {myServicesSubMenus.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <Link to={section.path}>
                    <div className="flex items-center gap-3 py-3 px-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {section.icon}
                      </div>
                      <span>{section.name}</span>
                    </div>
                  </Link>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        <DrawerFooter>
          <Separator className="mb-4" />
          <Button 
            variant="outline" 
            className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => navigate("/logout")}
          >
            <LogOut className="h-4 w-4 mr-2" />
            লগ আউট
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

// Add Carousel from shadcn to use with video ads
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
