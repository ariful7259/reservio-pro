import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Home, ChevronRight, Building, Search, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
export const PropertyPostSection = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handlePostClick = (type: string) => {
    const routes = {
      rent: '/create-post?type=rent',
      service: '/create-post?type=service',
      marketplace: '/create-post?type=marketplace'
    };
    navigate(routes[type as keyof typeof routes]);
    toast({
      title: "পোস্ট তৈরি করুন",
      description: `${type === 'rent' ? 'রেন্ট' : type === 'service' ? 'সার্ভিস' : 'মার্কেটপ্লেস'} পোস্ট তৈরি করার পেজে যাচ্ছেন`
    });
  };
  const handleServiceClick = () => {
    navigate('/service-detail?service=packers-movers');
    toast({
      title: "সার্ভিস পেজে যাচ্ছেন",
      description: "Packers and Movers সার্ভিসের বিস্তারিত দেখুন"
    });
  };
  const handleVideoServiceClick = () => {
    navigate('/service-detail?service=packers-movers');
    toast({
      title: "Packers and Movers",
      description: "ভিডিও থেকে সার্ভিস পেজে যাচ্ছেন"
    });
  };
  return <div className="space-y-4">
      {/* Post Property Section */}
      <div className="bg-white rounded-lg p-4 border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">Post your property</span>
              <span className="bg-black text-white px-2 py-1 rounded text-xs font-medium">FREE</span>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handlePostClick('rent')} className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-blue-500" />
                <span>রেন্ট পোস্ট</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePostClick('service')} className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-green-500" />
                <span>সার্ভিস পোস্ট</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePostClick('marketplace')} className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 text-purple-500" />
                <span>মার্কেটপ্লেস পোস্ট</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Service Booking Section */}
      
    </div>;
};