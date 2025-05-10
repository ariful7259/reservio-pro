
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, LogIn, Plus, Store, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import { ServiceCategoriesGrid } from './ServiceCategoriesGrid';
import { VideoCarousel } from './VideoCarousel';
import { UserProfileSection } from './UserProfileSection';
import { GuestSection } from './GuestSection';
import { PostAdSection } from './PostAdSection';
import { MyServicesDropdown } from './MyServicesDropdown';
import { CollapsibleMenuSection } from './CollapsibleMenuSection';
import { ReferralSystem } from './ReferralSystem';
import { SellerDashboardSection } from './SellerDashboardSection';
import { 
  getProfileMenuItems, 
  legalAssistanceMenuItems, 
  utilitiesMenuItems, 
  helpAndSupportMenuItems, 
  collapsibleMenuIcons,
  paymentMenuItems,
  merchantResources
} from './menuData';

export const SidebarDrawer = () => {
  const [activePostType, setActivePostType] = useState('rent');
  const navigate = useNavigate();
  
  const {
    user,
    isAuthenticated,
    logout,
    isAdmin,
    isSeller
  } = useAuth();
  
  const { toast } = useToast();

  const profileMenuItems = getProfileMenuItems(isAdmin);

  const handleLogout = () => {
    logout();
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন"
    });
    navigate("/login");
  };

  // Add BasaBari link to the housing/property section
  // Changed to match the MenuItem type expected by CollapsibleMenuSection
  const housingMenuItems = [
    {
      name: "বাসা বাড়ি",
      icon: <Building className="h-4 w-4 mr-2" />,
      path: "/basa-bari",
      description: "বাসা, রুমমেট, মেস সীট খুঁজুন এবং লিস্ট করুন"
    },
    {
      name: "রেন্টালস",
      icon: <Building className="h-4 w-4 mr-2" />,
      path: "/rentals",
      description: "বাসা, ফ্ল্যাট, অন্যান্য রেন্টাল সম্পত্তি"
    }
  ];

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
            <UserProfileSection profileMenuItems={profileMenuItems} />
          ) : (
            <GuestSection />
          )}
        </DrawerHeader>
        
        <div className="px-4 space-y-6 py-4">
          <PostAdSection />
          
          <div className="space-y-2">
            {/* Video Carousel */}
            <VideoCarousel />
            
            {/* Service Categories Grid - পুনরায় স্থাপিত, এখন ভিডিও ক্যারোসেলের নিচে */}
            <ServiceCategoriesGrid />

            {/* Housing Menu Section */}
            <CollapsibleMenuSection 
              title="হাউজিং এবং সম্পত্তি" 
              icon={<Building className="h-5 w-5 text-blue-500 mr-2" />} 
              items={housingMenuItems} 
            />

            {/* My Services Dropdown - only shown to authenticated users */}
            {isAuthenticated && (
              <MyServicesDropdown />
            )}

            {/* Seller Dashboard Section - For sellers, placed before the collapsible menu sections */}
            {isAuthenticated && isSeller && (
              <SellerDashboardSection />
            )}

            {/* Collapsible Menu Sections */}
            <div className="space-y-2 mt-4">
              {/* নতুন পেমেন্ট মেনু সেকশন */}
              {isAuthenticated && (
                <CollapsibleMenuSection 
                  title="পেমেন্ট এবং ট্রানজেকশন" 
                  icon={collapsibleMenuIcons.payment} 
                  items={paymentMenuItems} 
                />
              )}
              
              {/* বিক্রেতাদের জন্য রিসোর্স মেনু (শুধু বিক্রেতাদের জন্য) */}
              {isAuthenticated && isSeller && (
                <CollapsibleMenuSection 
                  title="বিক্রেতা রিসোর্স" 
                  icon={<Store className="h-5 w-5 text-red-500 mr-2" />} 
                  items={merchantResources} 
                />
              )}

              <CollapsibleMenuSection 
                title="লিগ্যাল অ্যাসিস্ট্যান্স এন্ড লোন" 
                icon={collapsibleMenuIcons.legal} 
                items={legalAssistanceMenuItems} 
              />

              <CollapsibleMenuSection 
                title="ইউটিলিটিস" 
                icon={collapsibleMenuIcons.utilities} 
                items={utilitiesMenuItems} 
              />

              <CollapsibleMenuSection 
                title="হেল্প এন্ড সাপোর্ট" 
                icon={collapsibleMenuIcons.help} 
                items={helpAndSupportMenuItems} 
              />
            </div>
            
            {/* Referral System */}
            <ReferralSystem />
          </div>
        </div>
        
        <DrawerFooter>
          {isAuthenticated ? (
            <>
              <Separator className="mb-4" />
              <Button variant="outline" className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                লগ আউট
              </Button>
            </>
          ) : (
            <>
              <Separator className="mb-4" />
              <Button className="w-full" onClick={() => navigate("/login")}>
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
