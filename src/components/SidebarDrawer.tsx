
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Home, 
  PaintBucket, 
  Truck, 
  Briefcase, 
  Wrench,
  ShoppingBag,
  Wallet,
  Building,
  Lightbulb,
  HelpCircle,
  Play,
  ChevronDown,
  ChevronUp,
  Calendar,
  Bookmark,
  MessageSquare,
  ListCheck,
  Store,
  BookmarkCheck,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export const SidebarDrawer = () => {
  const [isServiceExpanded, setIsServiceExpanded] = useState(false);
  
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
    { icon: <Calendar className="h-5 w-5" />, name: "আমার বুকিংস", path: "/my-services?tab=bookings" },
    { icon: <Calendar className="h-5 w-5" />, name: "আমার অ্যাপয়েন্টমেন্টস", path: "/my-services?tab=appointments" },
    { icon: <Bookmark className="h-5 w-5" />, name: "আমার শর্টলিস্ট", path: "/my-services?tab=shortlists" },
    { icon: <MessageSquare className="h-5 w-5" />, name: "আমার যোগাযোগকৃত প্রোপার্টি", path: "/my-services?tab=contacted-properties" },
    { icon: <ListCheck className="h-5 w-5" />, name: "আমার লিস্টিংস", path: "/my-services?tab=listings" },
    { icon: <Store className="h-5 w-5" />, name: "আমার শপ", path: "/my-services?tab=shop" },
    { icon: <BookmarkCheck className="h-5 w-5" />, name: "স্মার্ট রেকমেন্ডেশন", path: "/my-services?tab=recommendations" },
  ];

  const rentCategories = [
    { icon: <Building className="h-6 w-6" />, name: "অ্যাপার্টমেন্ট", path: "/rent/apartment" },
    { icon: <Home className="h-6 w-6" />, name: "বাসা", path: "/rent/house" },
    { icon: <Truck className="h-6 w-6" />, name: "গাড়ি", path: "/rent/car" },
    { icon: <Briefcase className="h-6 w-6" />, name: "অফিস স্পেস", path: "/rent/office" },
    { icon: <PaintBucket className="h-6 w-6" />, name: "ইভেন্ট স্পেস", path: "/rent/event-space" },
    { icon: <Wrench className="h-6 w-6" />, name: "ইকুইপমেন্ট", path: "/rent/equipment" },
    { icon: <Building className="h-6 w-6" />, name: "দোকান", path: "/rent/shop" },
    { icon: <Home className="h-6 w-6" />, name: "অন্যান্য", path: "/rent/others" },
  ];

  const menuSections = [
    { icon: <ShoppingBag className="h-5 w-5" />, name: "আমার সার্ভিস", path: "/my-services", subMenu: myServicesSubMenus },
    { icon: <Wallet className="h-5 w-5" />, name: "ওয়ালেট", path: "/wallet" },
    { icon: <Building className="h-5 w-5" />, name: "রেন্ট", path: "/rentals", subMenu: rentCategories },
    { icon: <Lightbulb className="h-5 w-5" />, name: "ইউটিলিটিস", path: "/utilities" },
    { icon: <HelpCircle className="h-5 w-5" />, name: "হেল্প এন্ড সাপোর্ট", path: "/help" },
  ];

  const accountSettingsMenus = [
    { icon: <User className="h-5 w-5" />, name: "ব্যক্তিগত তথ্য", path: "/profile" },
    { icon: <Settings className="h-5 w-5" />, name: "সিকিউরিটি", path: "/security" },
    { icon: <Wallet className="h-5 w-5" />, name: "পেমেন্ট মেথড", path: "/payment-methods" },
    { icon: <Store className="h-5 w-5" />, name: "রেফার ফ্রেন্ড", path: "/refer" },
    { icon: <LogOut className="h-5 w-5" />, name: "লগআউট", path: "/logout" },
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
      <DrawerContent className="w-[85%] max-w-[350px] h-[100vh] overflow-y-auto">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80" alt="Ariful Islam" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <DrawerTitle className="text-lg">Ariful Islam</DrawerTitle>
              <p className="text-sm text-muted-foreground">+৮৮০১৭১২৩৪৫৬৭৮</p>
            </div>
          </div>
        </DrawerHeader>
        
        <div className="px-4 space-y-6 py-4">
          {/* Post Your Ads Button */}
          <Button className="w-full bg-primary hover:bg-primary/90 text-white" size="lg">
            আপনার বিজ্ঞাপন পোস্ট করুন
          </Button>
          
          {/* Video Ad Section */}
          <div className="rounded-lg overflow-hidden border">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <video 
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150&q=80"
                controls
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
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
              <h3 className="font-medium mb-2">নতুন সার্ভিস উপলব্ধ</h3>
              <p className="text-sm text-gray-600 mb-3">আমাদের নতুন সার্ভিস দেখুন এবং বুক করুন</p>
              <Button variant="default" size="sm" className="w-full">
                বুক করুন
              </Button>
            </div>
          </div>
          
          {/* Service Categories */}
          <div>
            <h3 className="font-medium mb-3">সার্ভিস ক্যাটাগরি</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {serviceCategories.slice(0, 4).map((category, index) => (
                  <Link 
                    key={index} 
                    to={category.path}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      {category.icon}
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </Link>
                ))}
              </div>
              
              <Collapsible
                open={isServiceExpanded}
                onOpenChange={setIsServiceExpanded}
                className="w-full"
              >
                <div className="w-full flex justify-center">
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={toggleServiceExpand}
                    >
                      {isServiceExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4" /> কম দেখুন
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" /> আরও দেখুন
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-3">
                  <div className="grid grid-cols-4 gap-3">
                    {serviceCategories.slice(4).map((category, index) => (
                      <Link 
                        key={index} 
                        to={category.path}
                        className="flex flex-col items-center justify-center"
                      >
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {category.icon}
                        </div>
                        <span className="text-xs text-center">{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          
          {/* Account Settings */}
          <div className="space-y-3">
            <h3 className="font-medium mb-2">অ্যাকাউন্ট সেটিংস</h3>
            <div className="space-y-2">
              {accountSettingsMenus.map((item, index) => (
                <Link 
                  key={index} 
                  to={item.path}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors w-full"
                >
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {item.icon}
                  </div>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Menu Sections */}
          <div className="space-y-3">
            <h3 className="font-medium mb-2">সেকশন</h3>
            <Accordion type="single" collapsible className="w-full">
              {menuSections.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  {section.subMenu ? (
                    <AccordionTrigger className="py-3 px-3 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {section.icon}
                        </div>
                        <span>{section.name}</span>
                      </div>
                    </AccordionTrigger>
                  ) : (
                    <Link to={section.path}>
                      <div className="flex items-center gap-3 py-3 px-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {section.icon}
                        </div>
                        <span>{section.name}</span>
                      </div>
                    </Link>
                  )}
                  
                  {section.subMenu && (
                    <AccordionContent>
                      <div className="pl-12 space-y-3 py-2">
                        {section.subMenu.map((subItem, subIndex) => (
                          <Link key={subIndex} to={subItem.path} className="flex items-center gap-2 hover:text-primary">
                            {subItem.icon}
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        <DrawerFooter>
          <Separator className="mb-4" />
          <Button variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            লগআউট
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
