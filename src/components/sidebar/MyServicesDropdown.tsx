
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
    }
  ];

  return (
    <div className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50">
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
            {myServicesMenuItems.map((item, index) => (
              <DropdownMenuItem key={index} asChild>
                <Link 
                  to={item.path} 
                  className="flex items-center gap-2 w-full py-2" 
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
