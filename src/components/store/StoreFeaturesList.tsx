
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, ShoppingCart, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import StoreTabContent from './features/StoreTabContent';
import LinkInBioTabContent from './features/LinkInBioTabContent';
import HelpSection from './features/HelpSection';

export const StoreFeaturesList: React.FC = () => {
  return (
    <div className="py-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          🛍️ সম্পূর্ণ ডিজিটাল সলিউশন পান
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm lg:text-base">
          আপনার ব্যবসার জন্য প্রয়োজনীয় সকল ফিচার একসাথে। কোনো ফিচার বাদ পড়বে না!
        </p>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
          <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
            <Crown className="h-4 w-4 text-amber-500" />
            <span className="font-medium">🔖 নোট:</span> 
            <Badge className="bg-amber-500 text-white">প্রিমিয়াম</Badge> 
            চিহ্নিত ফিচারগুলো প্রিমিয়াম সাবস্ক্রিপশনের আওতাভুক্ত
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="store" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-gradient-to-r from-blue-50 to-purple-50">
          <TabsTrigger value="store" className="data-[state=active]:bg-white data-[state=active]:shadow-md font-medium">
            <ShoppingCart className="h-4 w-4 mr-2" />
            অনলাইন স্টোর
          </TabsTrigger>
          <TabsTrigger value="linkinbio" className="data-[state=active]:bg-white data-[state=active]:shadow-md font-medium">
            <Globe className="h-4 w-4 mr-2" />
            লিংক ইন বায়ো
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="space-y-8">
          <StoreTabContent />
        </TabsContent>
        
        <TabsContent value="linkinbio" className="space-y-6">
          <LinkInBioTabContent />
        </TabsContent>
      </Tabs>
      
      <HelpSection />
    </div>
  );
};

export default StoreFeaturesList;
