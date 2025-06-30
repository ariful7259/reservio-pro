
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Star, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RentalCategoriesShowcase from '@/components/rental/RentalCategoriesShowcase';
import { rentalCategories } from '@/utils/rentalCategoriesData';

// Mock featured listings data
const featuredListings = [
  {
    id: 1,
    title: "৩ বেডরুম অ্যাপার্টমেন্ট",
    location: "গুলশান, ঢাকা",
    price: "৳২৫,০০০/মাস",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    category: "housing",
    rating: 4.8,
    reviews: 24,
    owner: "আহমেদ সাহেব"
  },
  {
    id: 2,
    title: "ডিএসএলআর ক্যামেরা সেট",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,০০০/দিন",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    category: "electronics",
    rating: 4.9,
    reviews: 15,
    owner: "ফটোগ্রাফি স্টুডিও"
  },
  {
    id: 3,
    title: "টয়োটা কোরোলা",
    location: "মিরপুর, ঢাকা",
    price: "৳৫,০০০/দিন",
    image: "https://images.unsplash.com/photo-1494965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
    category: "transport",
    rating: 4.7,
    reviews: 32,
    owner: "রেন্ট এ কার"
  },
  {
    id: 4,
    title: "ইভেন্ট চেয়ার ও টেবিল সেট",
    location: "উত্তরা, ঢাকা",
    price: "৳৫০/পিস",
    image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?q=80&w=1000&auto=format&fit=crop",
    category: "event",
    rating: 4.6,
    reviews: 18,
    owner: "ইভেন্ট ম্যানেজমেন্ট"
  }
];

const RentalsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate(`/rental-categories`);
  };

  const handleBookNow = (item: any) => {
    navigate(`/rental-booking/${item.category}`, {
      state: {
        itemData: {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          location: item.location,
          owner: item.owner
        }
      }
    });
  };

  const handleViewDetails = (itemId: number) => {
    toast({
      title: "বিস্তারিত দেখুন",
      description: "আইটেমের বিস্তারিত তথ্য লোড হচ্ছে...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container pt-20 pb-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">রেন্ট সেকশন</h1>
          <p className="text-muted-foreground mb-6">আপনার প্রয়োজনীয় যেকোনো জিনিস ভাড়া নিন</p>
          <Button onClick={() => navigate('/rental-categories')}>
            বিস্তারিত ক্যাটাগরি দেখুন
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {rentalCategories.slice(0, 8).map((category) => (
            <Card 
              key={category.id}
              className="hover:shadow-lg transition-all cursor-pointer group hover:scale-105"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{category.icon}</div>
                  <Badge variant="secondary">{category.count}+</Badge>
                </div>
                <CardTitle className="text-lg">{category.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{category.nameEn}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-3">
                  {category.specialFeatures.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full group-hover:bg-primary/90" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.id);
                  }}
                >
                  ব্রাউজ করুন
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Listings Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">ফিচার্ড লিস্টিং</h2>
            <Button variant="outline" onClick={() => navigate('/rental-categories')}>
              সব দেখুন
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map((item) => (
              <Card 
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="relative aspect-video">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2">ফিচার্ড</Badge>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{item.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                    <span className="text-sm text-muted-foreground">({item.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-primary">{item.price}</span>
                    <span className="text-sm text-muted-foreground">মালিক: {item.owner}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleBookNow(item)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      বুক করুন
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(item.id)}
                    >
                      বিস্তারিত
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Showcase */}
        <RentalCategoriesShowcase />
        
        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold mb-4">আপনার জিনিসপত্র ভাড়া দিন</h3>
          <p className="text-muted-foreground mb-6">আপনার অব্যবহৃত জিনিসপত্র ভাড়া দিয়ে আয় করুন</p>
          <Button onClick={() => navigate('/create-post')}>
            এখনই পোস্ট করুন
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RentalsPage;
