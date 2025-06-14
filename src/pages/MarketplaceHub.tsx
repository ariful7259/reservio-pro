
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Grid, Plus } from 'lucide-react';
import DigitalProductsMarketplace from './DigitalProductsMarketplace';
import CartComponent from '@/components/product/CartComponent';
import WishlistComponent from '@/components/product/WishlistComponent';
import PostDigitalProduct from '@/components/product/PostDigitalProduct';
import { useShoppingState } from '@/hooks/useShoppingState';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import BrowseTabContent from "@/components/marketplace/BrowseTabContent";
import CartTabContent from "@/components/marketplace/CartTabContent";
import WishlistTabContent from "@/components/marketplace/WishlistTabContent";
import SellTabContent from "@/components/marketplace/SellTabContent";
// Wish2EarnTabContent removed

const MarketplaceHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const { cart, wishlist, getCartItemsCount } = useShoppingState();
  const isMobile = useIsMobile();
  
  // Update the page title based on the active tab
  useEffect(() => {
    const titles: Record<string, string> = {
      'browse': 'ডিজিটাল প্রোডাক্টস মার্কেটপ্লেস',
      'cart': 'শপিং কার্ট',
      'wishlist': 'উইশলিস্ট',
      'sell': 'প্রোডাক্ট বিক্রয় করুন'
      // Removed wish2earn title
    };
    
    document.title = titles[activeTab] || 'মার্কেটপ্লেস';
  }, [activeTab]);
  
  return (
    <div className="container min-h-screen pt-20 sm:pt-24 pb-20 px-3 sm:px-4">
      <MarketplaceHeader 
        onTabChange={setActiveTab}
        wishlistCount={wishlist.length}
        cartCount={getCartItemsCount()}
      />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3 sm:space-y-4">
        <TabsList className="w-full h-auto p-1 grid grid-cols-4 gap-1">
          <TabsTrigger 
            value="browse" 
            className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm"
          >
            <Grid className="h-4 w-4" />
            <span className="hidden xs:inline sm:hidden">ব্রাউজ</span>
            <span className="hidden sm:inline">ব্রাউজ করুন</span>
          </TabsTrigger>
          <TabsTrigger 
            value="cart" 
            className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden xs:inline">কার্ট</span>
            <Badge variant="outline" className="text-[10px] h-4 px-1 ml-0 sm:ml-1">
              {getCartItemsCount()}
            </Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="wishlist" 
            className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden xs:inline sm:hidden">লিস্ট</span>
            <span className="hidden sm:inline">উইশলিস্ট</span>
            <Badge variant="outline" className="text-[10px] h-4 px-1 ml-0 sm:ml-1">
              {wishlist.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger 
            value="sell" 
            className="flex flex-col sm:flex-row items-center gap-1 py-2 px-2 text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden xs:inline">বিক্রি</span>
            <span className="hidden sm:inline">বিক্রি করুন</span>
          </TabsTrigger>
          {/* Removed Wish2Earn tabs trigger */}
        </TabsList>
        
        <TabsContent value="browse" className="mt-3 sm:mt-4">
          <BrowseTabContent />
        </TabsContent>
        
        <TabsContent value="cart" className="min-h-[70vh] mt-3 sm:mt-4">
          <CartTabContent onTabChange={setActiveTab} />
        </TabsContent>
        
        <TabsContent value="wishlist" className="min-h-[70vh] mt-3 sm:mt-4">
          <WishlistTabContent onTabChange={setActiveTab} />
        </TabsContent>
        
        <TabsContent value="sell" className="mt-3 sm:mt-4">
          <SellTabContent />
        </TabsContent>
        {/* Removed Wish2EarnTabContent here */}
      </Tabs>
    </div>
  );
};

export default MarketplaceHub;
