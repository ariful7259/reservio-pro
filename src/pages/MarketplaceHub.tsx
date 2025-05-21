
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
    <div className="container min-h-screen pt-20 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">ডিজিটাল প্রোডাক্টস মার্কেটপ্লেস</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart className="h-4 w-4" />
            {wishlist.length > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]"
              >
                {wishlist.length}
              </Badge>
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setActiveTab('cart')}
          >
            <ShoppingCart className="h-4 w-4" />
            {getCartItemsCount() > 0 && (
              <Badge 
                variant="secondary" 
                className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]"
              >
                {getCartItemsCount()}
              </Badge>
            )}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1"
            onClick={() => setActiveTab('sell')}
          >
            <Plus className="h-4 w-4" />
            {isMobile ? 'বিক্রি করুন' : 'প্রোডাক্ট বিক্রি করুন'}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full overflow-auto grid grid-cols-4">
          <TabsTrigger value="browse" className="flex items-center gap-1">
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">ব্রাউজ করুন</span>
            <span className="inline sm:hidden">ব্রাউজ</span>
          </TabsTrigger>
          <TabsTrigger value="cart" className="flex items-center gap-1">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">কার্ট</span>
            <Badge variant="outline" className="ml-1">
              {getCartItemsCount()}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">উইশলিস্ট</span>
            <Badge variant="outline" className="ml-1">
              {wishlist.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="sell" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">বিক্রি করুন</span>
            <span className="inline sm:hidden">বিক্রি</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse">
          <DigitalProductsMarketplace />
        </TabsContent>
        
        <TabsContent value="cart" className="min-h-[70vh]">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-5">
              <CartComponent />
            </div>
            <div className="lg:col-span-2">
              <Card className="p-4">
                <h3 className="font-medium mb-3">রিকমেন্ডেড প্রোডাক্টস</h3>
                {/* Recommended products would go here */}
                <div className="text-sm text-muted-foreground text-center py-4">
                  আপনার জন্য রিকমেন্ডেড প্রোডাক্ট এখানে দেখানো হবে
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => setActiveTab('browse')}
                >
                  আরও প্রোডাক্ট দেখুন
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="wishlist" className="min-h-[70vh]">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-5">
              <WishlistComponent />
            </div>
            <div className="lg:col-span-2">
              <Card className="p-4">
                <h3 className="font-medium mb-3">সিমিলার প্রোডাক্টস</h3>
                {/* Similar products would go here */}
                <div className="text-sm text-muted-foreground text-center py-4">
                  আপনার উইশলিস্টের সাথে মিল আছে এমন প্রোডাক্ট এখানে দেখানো হবে
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => setActiveTab('browse')}
                >
                  আরও প্রোডাক্ট দেখুন
                </Button>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sell">
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
            <div className="lg:col-span-5">
              <PostDigitalProduct />
            </div>
            <div className="lg:col-span-2">
              <Card className="p-4">
                <h3 className="font-medium mb-3">সেলার টিপস</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">1</div>
                    <span>মানসম্পন্ন ছবি এবং বিবরণ ব্যবহার করুন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">2</div>
                    <span>সঠিক ক্যাটাগরি নির্বাচন করুন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">3</div>
                    <span>প্রতিযোগিতামূলক মূল্য নির্ধারণ করুন</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">4</div>
                    <span>গ্রাহক রিভিউ এর জন্য উৎসাহিত করুন</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
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
