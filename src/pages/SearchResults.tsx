
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState({
    products: [],
    services: [],
    rentals: []
  });
  
  // Mock search results - In a real app, this would be an API call
  useEffect(() => {
    // This is just a mock implementation
    const mockResults = {
      products: [
        {
          id: "1",
          title: "স্মার্ট ব্লাড প্রেশার মনিটর",
          location: "ধানমন্ডি, ঢাকা",
          price: "৳২,৫০০",
          image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
          category: "মেডিকেল",
          path: "/shopping/product/1"
        },
        {
          id: "2",
          title: "ডিজিটাল গ্লুকোমিটার কিট",
          location: "উত্তরা, ঢাকা",
          price: "৳৩,৫০০",
          image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
          category: "মেডিকেল",
          path: "/shopping/product/2"
        }
      ],
      services: [
        {
          id: "1",
          title: "ডাক্তার কনসাল্টেশন",
          location: "মেডিকেল সেন্টার, ঢাকা",
          price: "৳১,৫০০",
          image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
          category: "মেডিকেল",
          path: "/services/1"
        },
        {
          id: "2",
          title: "ডেন্টাল চেকআপ",
          location: "শাইন ডেন্টাল, ঢাকা",
          price: "৳২,০০০",
          image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
          category: "মেডিকেল",
          path: "/services/2"
        }
      ],
      rentals: [
        {
          id: "1",
          title: "৩ বেডরুম অ্যাপার্টমেন্ট",
          location: "গুলশান, ঢাকা",
          price: "৳২৫,০০০/মাস",
          image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
          category: "আবাসিক",
          path: "/rentals/1"
        },
        {
          id: "2",
          title: "অফিস স্পেস",
          location: "বনানী, ঢাকা",
          price: "৳৫০,০০০/মাস",
          image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
          category: "বাণিজ্যিক",
          path: "/rentals/2"
        }
      ]
    };
    
    setResults(mockResults);
  }, [query]);

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const totalResults = results.products.length + results.services.length + results.rentals.length;

  return (
    <div className="container pt-20 pb-10 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">"{query}" এর জন্য সার্চ ফলাফল</h1>
        <p className="text-muted-foreground">{totalResults} টি ফলাফল পাওয়া গেছে</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">সব ({totalResults})</TabsTrigger>
          <TabsTrigger value="products">পণ্য ({results.products.length})</TabsTrigger>
          <TabsTrigger value="services">সেবা ({results.services.length})</TabsTrigger>
          <TabsTrigger value="rentals">ভাড়া ({results.rentals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {totalResults > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...results.products, ...results.services, ...results.rentals].map((item, index) => (
                <Card 
                  key={`all-${index}`}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleItemClick(item.path)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{item.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-primary">{item.price}</p>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">কোন ফলাফল পাওয়া যায়নি</p>
            </div>
          )}
        </TabsContent>

        {/* Similar TabsContent for products, services, and rentals */}
        <TabsContent value="products">
          {/* Product results UI */}
        </TabsContent>
        <TabsContent value="services">
          {/* Service results UI */}
        </TabsContent>
        <TabsContent value="rentals">
          {/* Rental results UI */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SearchResults;
