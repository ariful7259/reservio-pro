
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Users, 
  Star, 
  FileText, 
  Calculator,
  Image,
  MessageSquare,
  Receipt
} from 'lucide-react';

// Import all creator components
import CreatorEarningsTab from './creator/CreatorEarningsTab';
import CreatorPortfolioTab from './creator/CreatorPortfolioTab';
import CreatorReviewsTab from './creator/CreatorReviewsTab';
import CreatorInvoiceTab from './creator/CreatorInvoiceTab';
import CreatorTaxTab from './creator/CreatorTaxTab';

const SecurePayCreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('earnings');

  const creatorStats = {
    totalEarnings: '৳৪৫,৮৯০',
    activeProjects: 8,
    averageRating: 4.9,
    totalReviews: 26,
    completedOrders: 145,
    responseTime: '2 ঘণ্টা'
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-600">{creatorStats.totalEarnings}</div>
            <div className="text-xs text-muted-foreground">মোট আয়</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-600">{creatorStats.activeProjects}</div>
            <div className="text-xs text-muted-foreground">চলমান প্রজেক্ট</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-600">{creatorStats.averageRating}</div>
            <div className="text-xs text-muted-foreground">গড় রেটিং</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-purple-600">{creatorStats.totalReviews}</div>
            <div className="text-xs text-muted-foreground">মোট রিভিউ</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-indigo-600">{creatorStats.completedOrders}</div>
            <div className="text-xs text-muted-foreground">সম্পন্ন অর্ডার</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calculator className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <div className="text-lg font-bold text-orange-600">{creatorStats.responseTime}</div>
            <div className="text-xs text-muted-foreground">গড় উত্তর সময়</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 gap-1">
          <TabsTrigger value="earnings" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">আয়</span>
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">পোর্টফোলিও</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">রিভিউ</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span className="hidden sm:inline">ইনভয়েস</span>
          </TabsTrigger>
          <TabsTrigger value="tax" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">কর</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earnings">
          <CreatorEarningsTab />
        </TabsContent>

        <TabsContent value="portfolio">
          <CreatorPortfolioTab />
        </TabsContent>

        <TabsContent value="reviews">
          <CreatorReviewsTab />
        </TabsContent>

        <TabsContent value="invoices">
          <CreatorInvoiceTab />
        </TabsContent>

        <TabsContent value="tax">
          <CreatorTaxTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurePayCreatorDashboard;
