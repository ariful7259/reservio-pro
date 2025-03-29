
import React from 'react';
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
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer';
import { Card } from '@/components/ui/card';

export const SidebarDrawer = () => {
  const serviceCategories = [
    { icon: <PaintBucket className="h-6 w-6" />, name: "পেইন্টিং", path: "/services/painting" },
    { icon: <Truck className="h-6 w-6" />, name: "প্যাকার্স ও মুভার্স", path: "/services/packers-movers" },
    { icon: <Briefcase className="h-6 w-6" />, name: "হোম ক্লিনিং", path: "/services/home-cleaning" },
    { icon: <Wrench className="h-6 w-6" />, name: "এসি রিপেয়ার", path: "/services/ac-repair" },
  ];

  const menuSections = [
    { icon: <ShoppingBag className="h-5 w-5" />, name: "আমার সার্ভিস", path: "/my-services" },
    { icon: <Wallet className="h-5 w-5" />, name: "ওয়ালেট", path: "/wallet" },
    { icon: <Building className="h-5 w-5" />, name: "রেন্টাল", path: "/rentals" },
    { icon: <Lightbulb className="h-5 w-5" />, name: "ইউটিলিটিস", path: "/utilities" },
    { icon: <HelpCircle className="h-5 w-5" />, name: "হেল্প এন্ড সাপোর্ট", path: "/help" },
  ];

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">মেনু খুলুন</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] overflow-y-auto" side="left">
        <DrawerHeader>
          <DrawerTitle className="text-xl">মেনু</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 space-y-6">
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
            <div className="grid grid-cols-4 gap-3">
              {serviceCategories.map((category, index) => (
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
          </div>
          
          {/* Menu Sections */}
          <div className="space-y-3">
            <h3 className="font-medium mb-2">সেকশন</h3>
            {menuSections.map((section, index) => (
              <Link key={index} to={section.path}>
                <Card className="p-3 flex items-center gap-3 hover:bg-primary/5 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <span>{section.name}</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        
        <DrawerFooter>
          <Button variant="outline" className="w-full">
            লগআউট
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
