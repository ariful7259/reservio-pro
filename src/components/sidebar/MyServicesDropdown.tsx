
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronDown, Book, Calendar, Heart, MapPin, List, ShoppingBag, Star, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const MyServicesDropdown = () => {
  const navigate = useNavigate();
  
  // আমার সার্ভিসের ড্রপডাউন আইটেম - fully responsive এবং Bengali optimized
  const myServicesMenuItems = [
    {
      icon: <Book className="h-5 w-5 text-blue-500" />,
      name: "আমার বুকিংস",
      path: "/my-services?tab=bookings",
      description: "সকল বুকিং ও রিজার্ভেশন দেখুন",
      count: "৫টি অ্যাক্টিভ",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }, 
    {
      icon: <Calendar className="h-5 w-5 text-green-500" />,
      name: "আমার অ্যাপয়েন্টমেন্টস",
      path: "/my-services?tab=appointments",
      description: "আসন্ন ও পুরাতন অ্যাপয়েন্টমেন্ট",
      count: "৩টি আসন্ন",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }, 
    {
      icon: <Heart className="h-5 w-5 text-red-500" />,
      name: "আমার শর্টলিস্ট",
      path: "/my-services?tab=shortlists",
      description: "পছন্দের সার্ভিস ও প্রোপার্টি",
      count: "১২টি সেভড",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }, 
    {
      icon: <MapPin className="h-5 w-5 text-purple-500" />,
      name: "যোগাযোগকৃত প্রোপার্টি",
      path: "/my-services?tab=contactedProperties",
      description: "যোগাযোগ করা সম্পত্তি তালিকা",
      count: "৮টি প্রোপার্টি",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }, 
    {
      icon: <List className="h-5 w-5 text-orange-500" />,
      name: "আমার লিস্টিংস",
      path: "/my-services?tab=listings",
      description: "পোস্ট করা সার্ভিস ও প্রোপার্টি",
      count: "৬টি লাইভ",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }, 
    {
      icon: <ShoppingBag className="h-5 w-5 text-indigo-500" />,
      name: "আমার শপ",
      path: "/my-services?tab=shop",
      description: "অনলাইন শপিং ও অর্ডার",
      count: "২টি অর্ডার",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    }, 
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      name: "স্মার্ট রেকমেন্ডেশন",
      path: "/my-services?tab=recommendations",
      description: "ব্যক্তিগত সুপারিশ ও অফার",
      count: "নতুন ৪টি",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }, 
    {
      icon: <Store className="h-5 w-5 text-teal-500" />,
      name: "বিক্রেতা ড্যাশবোর্ড",
      path: "/my-services?tab=sellerDashboard",
      description: "বিক্রয় পরিসংখ্যান ও ম্যানেজমেন্ট",
      count: "আজ ৩ সেল",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
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
        
        <DropdownMenuContent className="w-80 bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto">
          <DropdownMenuGroup>
            {myServicesMenuItems.map((item, index) => (
              <DropdownMenuItem 
                key={index} 
                className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 p-0 m-1"
              >
                <div 
                  className={`flex items-start gap-3 w-full py-3 px-3 cursor-pointer rounded-lg ${item.bgColor} ${item.borderColor} border hover:shadow-sm transition-all duration-200`}
                  onClick={(e) => handleMenuClick(e, item.path)}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900 text-sm truncate">{item.name}</div>
                      <div className="text-xs text-gray-500 ml-2 flex-shrink-0">{item.count}</div>
                    </div>
                    <div className="text-xs text-gray-600 leading-relaxed">{item.description}</div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          
          {/* Footer section */}
          <div className="border-t border-gray-100 mt-2 pt-2 px-3 pb-2">
            <div className="text-xs text-gray-500 text-center">
              সব সার্ভিস একসাথে ম্যানেজ করুন
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
