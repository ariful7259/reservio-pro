
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Heart, 
  ShoppingCart, 
  DollarSign, 
  Filter,
  CreditCard,
  TrendingUp
} from 'lucide-react';

// Import buyer components
import BuyerServiceBrowsingTab from './buyer/BuyerServiceBrowsingTab';
import BuyerWishlistTab from './buyer/BuyerWishlistTab';
import BuyerBudgetTab from './buyer/BuyerBudgetTab';

const SecurePayBuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');

  const buyerStats = {
    totalOrders: 12,
    completedOrders: 8,
    totalSpent: '৳৩৮,৫০০',
    wishlistItems: 15,
    averageRating: 4.8,
    monthlyBudget: '৳১০,০০০'
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <ShoppingCart className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">{buyerStats.totalOrders}</div>
            <div className="text-xs text-muted-foreground">মোট অর্ডার</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">{buyerStats.completedOrders}</div>
            <div className="text-xs text-muted-foreground">সম্পন্ন অর্ডার</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">{buyerStats.totalSpent}</div>
            <div className="text-xs text-muted-foreground">মোট খরচ</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-red-600">{buyerStats.wishlistItems}</div>
            <div className="text-xs text-muted-foreground">উইশলিস্ট</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-indigo-600">{buyerStats.averageRating}</div>
            <div className="text-xs text-muted-foreground">গড় রেটিং</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Filter className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-600">{buyerStats.monthlyBudget}</div>
            <div className="text-xs text-muted-foreground">মাসিক বাজেট</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 gap-1">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">ব্রাউজ</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">অর্ডার</span>
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">উইশলিস্ট</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">বাজেট</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">পেমেন্ট</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">মেসেজ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <BuyerServiceBrowsingTab />
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardContent className="p-8 text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">অর্ডার ম্যানেজমেন্ট</h3>
              <p className="text-muted-foreground">আপনার সব অর্ডার এখানে দেখতে পাবেন</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wishlist">
          <BuyerWishlistTab />
        </TabsContent>

        <TabsContent value="budget">
          <BuyerBudgetTab />
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="p-8 text-center">
              <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">পেমেন্ট ম্যানেজমেন্ট</h3>
              <p className="text-muted-foreground">আপনার পেমেন্ট পদ্ধতি ও ইতিহাস দেখুন</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardContent className="p-8 text-center">
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">মেসেজ সেন্টার</h3>
              <p className="text-muted-foreground">ক্রিয়েটরদের সাথে যোগাযোগ করুন</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurePayBuyerDashboard;
