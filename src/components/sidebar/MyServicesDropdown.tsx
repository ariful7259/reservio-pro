
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, Book, Calendar, Heart, MapPin, List, ShoppingBag, Star, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const MyServicesDropdown = () => {
  const navigate = useNavigate();
  
  // আমার সার্ভিসের ড্রপডাউন আইটেম
  const myServicesMenuItems = [
    {
      icon: <Book className="h-5 w-5" />,
      name: "আমার বুকিংস",
      path: "/my-services?tab=bookings",
      description: "আপনার সকল বুকিং দেখুন"
    }, {
      icon: <Calendar className="h-5 w-5" />,
      name: "আমার অ্যাপয়েন্টমেন্টস",
      path: "/my-services?tab=appointments",
      description: "আপনার সকল অ্যাপয়েন্টমেন্ট"
    }, {
      icon: <Heart className="h-5 w-5" />,
      name: "আমার শর্টলিস্ট",
      path: "/my-services?tab=shortlists",
      description: "পছন্দের তালিকা"
    }, {
      icon: <MapPin className="h-5 w-5" />,
      name: "যোগাযোগকৃত প্রোপার্টি",
      path: "/my-services?tab=contactedProperties",
      description: "যোগাযোগ করা সম্পত্তি"
    }, {
      icon: <List className="h-5 w-5" />,
      name: "আমার লিস্টিংস",
      path: "/my-services?tab=listings",
      description: "আপনার সকল লিস্টিং"
    }, {
      icon: <ShoppingBag className="h-5 w-5" />,
      name: "আমার শপ",
      path: "/my-services?tab=shop",
      description: "অনলাইন শপ ম্যানেজমেন্ট"
    }, {
      icon: <Star className="h-5 w-5" />,
      name: "স্মার্ট রেকমেন্ডেশন",
      path: "/my-services?tab=recommendations",
      description: "ব্যক্তিগত সুপারিশ"
    }, {
      icon: <Store className="h-5 w-5" />,
      name: "বিক্রেতা ড্যাশবোর্ড",
      path: "/my-services?tab=sellerDashboard",
      description: "বিক্রেতা প্যানেল"
    }
  ];

  const handleMenuClick = (event: React.MouseEvent, path: string) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Navigating to:', path);
    navigate(path);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h3 className="font-medium">আমার সার্ভিস</h3>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between h-12 px-4 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">আমার সার্ভিস দেখুন</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-72 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <DropdownMenuGroup>
            {myServicesMenuItems.map((item, index) => (
              <DropdownMenuItem 
                key={index} 
                className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 p-0"
                asChild
              >
                <Link 
                  to={item.path}
                  className="flex items-start gap-3 w-full py-3 px-3 no-underline"
                  onClick={(e) => handleMenuClick(e, item.path)}
                >
                  <div className="text-primary mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
