
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, Home, ChevronRight, Building, Search, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const PropertyPostSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="space-y-4">
      {/* User Profile Section */}
      <div className="bg-gradient-to-r from-pink-400 to-red-400 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-red-500 font-bold text-lg">AI</span>
            </div>
            <span className="font-semibold text-lg">Ariful Islam</span>
          </div>
          <ChevronRight className="h-6 w-6" />
        </div>
      </div>

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
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="mb-3">
          <h3 className="text-lg font-medium text-gray-900">Because <span className="text-green-600">Your Home</span></h3>
          <h3 className="text-lg font-medium text-gray-700">Deserves The Best.</h3>
          <div className="flex items-center justify-end mt-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs">👥</span>
              </div>
              <div>
                <span className="font-medium">3Lacs+ Services</span>
                <br />
                <span className="text-xs">booked in last 3 months</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative rounded-lg overflow-hidden mb-3">
          <img 
            src="/lovable-uploads/635ccd95-277b-4cd8-9ff0-2311c51194d7.png"
            alt="Service"
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-xs">📦</span>
                </div>
                <span className="font-medium">Packers and Movers</span>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
