
import React from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import ProductsTab from './marketplace/ProductsTab';
import CategoriesTab from './marketplace/CategoriesTab';
import SellersTab from './marketplace/SellersTab';
import OffersTab from './marketplace/OffersTab';
import ReviewsTab from './marketplace/ReviewsTab';

const MarketplaceManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস ম্যানেজমেন্ট</h1>
      </div>
      
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">প্রোডাক্ট</TabsTrigger>
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="sellers">বিক্রেতা</TabsTrigger>
          <TabsTrigger value="offers">অফার</TabsTrigger>
          <TabsTrigger value="reviews">রিভিউ</TabsTrigger>
        </TabsList>
        
        {/* প্রোডাক্ট ট্যাব */}
        <TabsContent value="products" className="space-y-4">
          <ProductsTab />
        </TabsContent>
        
        {/* ক্যাটাগরি ট্যাব */}
        <TabsContent value="categories" className="space-y-4">
          <CategoriesTab />
        </TabsContent>
        
        {/* বিক্রেতা ট্যাব */}
        <TabsContent value="sellers" className="space-y-4">
          <SellersTab />
        </TabsContent>
        
        {/* অফার ট্যাব */}
        <TabsContent value="offers" className="space-y-4">
          <OffersTab />
        </TabsContent>
        
        {/* রিভিউ ট্যাব */}
        <TabsContent value="reviews" className="space-y-4">
          <ReviewsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketplaceManagement;
