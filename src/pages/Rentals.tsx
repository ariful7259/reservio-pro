
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryGrid from '@/components/rentals/CategoryGrid';
import RentalCard from '@/components/rentals/RentalCard';
import SocialShareModal from '@/components/SocialShareModal';
import { useToast } from '@/components/ui/use-toast';

// Sample rental data
const rentCategories = [
  { id: 1, name: "বাসা বাড়ি", icon: "🏠", count: 120 },
  { id: 2, name: "ইলেকট্রনিক্স", icon: "💻", count: 85 },
  { id: 3, name: "পরিবহন", icon: "🚗", count: 95 },
  { id: 4, name: "ইভেন্ট সামগ্রী", icon: "🎪", count: 45 },
  { id: 5, name: "ঘরোয়া সামগ্রী", icon: "🛏️", count: 78 },
  { id: 6, name: "শিক্ষা সামগ্রী", icon: "📚", count: 32 },
  { id: 7, name: "কৃষি যন্ত্রপাতি", icon: "🚜", count: 28 },
  { id: 8, name: "ব্যবসায়িক সামগ্রী", icon: "💼", count: 56 },
  { id: 9, name: "কারিগরি টুলস", icon: "🔧", count: 42 },
  { id: 10, name: "কমার্শিয়াল স্পেস", icon: "🏪", count: 18 },
  { id: 11, name: "গেস্ট হাউস", icon: "🏨", count: 34 },
  { id: 12, name: "গ্রামীণ বাসস্থান", icon: "🏡", count: 15 },
  { id: 13, name: "স্টুডিও", icon: "🎬", count: 22 }
];

const rentListings = [
  {
    id: "1",
    title: "৩ বেডরুম অ্যাপার্টমেন্ট",
    provider: "কামাল হোসেন",
    location: "গুলশান, ঢাকা",
    price: "৳২৫,০০০/মাস",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    category: "apartment",
    subcategory: "বাসা বাড়ি",
    rating: 4.8,
    reviews: 34
  },
  {
    id: "2",
    title: "অফিস স্পেস",
    provider: "রশিদ আহমেদ",
    location: "বনানী, ঢাকা",
    price: "৳৫০,০০০/মাস",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
    category: "office",
    subcategory: "কমার্শিয়াল স্পেস",
    rating: 4.6,
    reviews: 27
  },
  {
    id: "3",
    title: "টয়োটা কোরোলা",
    provider: "সাইফুল ইসলাম",
    location: "মিরপুর, ঢাকা",
    price: "৳৫,০০০/দিন",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop",
    category: "car",
    subcategory: "পরিবহন",
    rating: 4.9,
    reviews: 56
  },
  {
    id: "4",
    title: "ডিএসএলআর ক্যামেরা",
    provider: "তানভীর আহমেদ",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,০০০/দিন",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    category: "camera",
    subcategory: "ইলেকট্রনিক্স",
    rating: 4.7,
    reviews: 42
  },
  {
    id: "5",
    title: "ইভেন্ট চেয়ার সেট",
    provider: "হাসান আলী",
    location: "উত্তরা, ঢাকা",
    price: "৳৫০/দিন",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    category: "chair",
    subcategory: "ইভেন্ট সামগ্রী",
    rating: 4.5,
    reviews: 23
  },
  {
    id: "6",
    title: "ফ্রিজ ভাড়া",
    provider: "নাসির উদ্দিন",
    location: "বাড্ডা, ঢাকা",
    price: "৳৩,০০০/মাস",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=1000&auto=format&fit=crop",
    category: "fridge",
    subcategory: "ঘরোয়া সামগ্রী",
    rating: 4.3,
    reviews: 18
  },
  {
    id: "7",
    title: "প্রজেক্টর ভাড়া",
    provider: "রাহুল চন্দ্র",
    location: "পান্থপথ, ঢাকা",
    price: "৳৮০০/দিন",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1000&auto=format&fit=crop",
    category: "projector",
    subcategory: "শিক্ষা সামগ্রী",
    rating: 4.6,
    reviews: 31
  },
  {
    id: "8",
    title: "মিনি ট্রাক ভাড়া",
    provider: "আবুল কালাম",
    location: "সাভার, ঢাকা",
    price: "৳২,৫০০/দিন",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=1000&auto=format&fit=crop",
    category: "truck",
    subcategory: "পরিবহন",
    rating: 4.8,
    reviews: 45
  }
];

const Rentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    setShareItem({
      ...rental,
      type: 'rental',
    });
    setShowShareModal(true);
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
  };

  const getListingsByCategory = (categoryName: string) => {
    return rentListings.filter(listing => listing.subcategory === categoryName);
  };

  const renderCategoryItem = (category: any, index: number) => (
    <Card 
      key={category.id} 
      className="text-center hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleCategoryClick(category)}
    >
      <CardContent className="p-3 flex flex-col items-center">
        <div className="text-2xl mb-2">{category.icon}</div>
        <h3 className="font-medium text-xs mb-1">{category.name}</h3>
        <Badge variant="secondary" className="text-xs">
          {category.count}
        </Badge>
      </CardContent>
    </Card>
  );

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">ভাড়া দিন</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় যেকোনো কিছু ভাড়া নিন</p>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
          <TabsTrigger value="listings">সকল লিস্টিং</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="mt-6">
          <CategoryGrid
            rentCategories={rentCategories}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            renderCategoryItem={renderCategoryItem}
          />
          
          {/* Selected Category Listings */}
          {selectedCategory && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <span className="text-2xl">{selectedCategory.icon}</span>
                  {selectedCategory.name}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  বন্ধ করুন
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {getListingsByCategory(selectedCategory.name).map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    onShare={handleShare}
                  />
                ))}
                {getListingsByCategory(selectedCategory.name).length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    এই ক্যাটাগরিতে কোন লিস্টিং পাওয়া যায়নি
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Featured Listings Section */}
          {!selectedCategory && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">জনপ্রিয় লিস্টিং</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/rentals?tab=listings')}
                >
                  সব দেখুন
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rentListings.slice(0, 8).map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="listings" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rentListings.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
                onShare={handleShare}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {shareItem && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={shareItem}
        />
      )}
    </div>
  );
};

export default Rentals;
