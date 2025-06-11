
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Grid, Cog, Search, Plus } from 'lucide-react';
import DigitalProductsMarketplace from './DigitalProductsMarketplace';
import CartComponent from '@/components/product/CartComponent';
import WishlistComponent from '@/components/product/WishlistComponent';
import PostDigitalProduct from '@/components/product/PostDigitalProduct';
import { useShoppingState } from '@/hooks/useShoppingState';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

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
    };
    
    document.title = titles[activeTab] || 'মার্কেটপ্লেস';
  }, [activeTab]);
  
  return (
    <div className="container min-h-screen pt-20 sm:pt-24 pb-20 px-3 sm:px-4">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">
          ডিজিটাল প্রোডাক্টস মার্কেটপ্লেস
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size={isMobile ? "sm" : "icon"}
            className="relative"
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart className="h-4 w-4" />
            {!isMobile && wishlist.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]"
              >
                {wishlist.length}
              </Badge>
            )}
            {isMobile && <span className="ml-1 text-xs">{wishlist.length}</span>}
          </Button>
          <Button
            variant="outline"
            size={isMobile ? "sm" : "icon"}
            className="relative"
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingCart className="h-4 w-4" />
            {!isMobile && getCartItemsCount() > 0 && (
              <Badge 
                variant="secondary" 
                className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]"
              >
                {getCartItemsCount()}
              </Badge>
            )}
            {isMobile && <span className="ml-1 text-xs">{getCartItemsCount()}</span>}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1"
            onClick={() => setActiveTab('sell')}
          >
            <Plus className="h-4 w-4" />
            <span className="text-xs sm:text-sm">
              {isMobile ? 'বিক্রি' : 'প্রোডাক্ট বিক্রি করুন'}
            </span>
          </Button>
        </div>
      </div>
      
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
        </TabsList>
        
        <TabsContent value="browse" className="mt-3 sm:mt-4">
          <DigitalProductsMarketplace />
        </TabsContent>
        
        <TabsContent value="cart" className="min-h-[70vh] mt-3 sm:mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
            <div className="lg:col-span-5">
              <CartComponent />
            </div>
            <div className="lg:col-span-2">
              <Card className="p-3 sm:p-4">
                <h3 className="font-medium mb-3 text-sm sm:text-base">রিকমেন্ডেড প্রোডাক্টস</h3>
                <div className="text-xs sm:text-sm text-muted-foreground text-center py-4">
                  আপনার জন্য রিকমেন্ডেড প্রোডাক্ট এখানে দেখানো হবে
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2 text-xs sm:text-sm"
                  onClick={() => setActiveTab('browse')}
                >
                  আরও প্রোডাক্ট দেখুন
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wishlist" className="min-h-[70vh] mt-3 sm:mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
            <div className="lg:col-span-5">
              <WishlistComponent />
            </div>
            <div className="lg:col-span-2">
              <Card className="p-3 sm:p-4">
                <h3 className="font-medium mb-3 text-sm sm:text-base">সিমিলার প্রোডাক্টস</h3>
                <div className="text-xs sm:text-sm text-muted-foreground text-center py-4">
                  আপনার উইশলিস্টের সাথে মিল আছে এমন প্রোডাক্ট এখানে দেখানো হবে
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2 text-xs sm:text-sm"
                  onClick={() => setActiveTab('browse')}
                >
                  আরও প্রোডাক্ট দেখুন
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sell" className="mt-3 sm:mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
            <div className="lg:col-span-5">
              <PostDigitalProduct />
            </div>
            <div className="lg:col-span-2">
              <Card className="p-3 sm:p-4">
                <h3 className="font-medium mb-3 text-sm sm:text-base">সেলার টিপস</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">1</div>
                    <span className="leading-tight">মানসম্পন্ন ছবি এবং বিবরণ ব্যবহার করুন</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">2</div>
                    <span className="leading-tight">সঠিক ক্যাটাগরি নির্বাচন করুন</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">3</div>
                    <span className="leading-tight">প্রতিযোগিতামূলক মূল্য নির্ধারণ করুন</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-[10px] sm:text-xs flex-shrink-0 mt-0.5">4</div>
                    <span className="leading-tight">গ্রাহক রিভিউ এর জন্য উৎসাহিত করুন</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 text-xs sm:text-sm"
                  onClick={() => navigate('/seller-dashboard')}
                >
                  সেলার ড্যাশবোর্ড
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceHub;
