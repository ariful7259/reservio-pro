import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  MapPin, 
  ChevronRight, 
  Plus,
  Star,
  Building,
  Home,
  Car,
  Briefcase,
  Wrench,
  Heart
} from 'lucide-react';
import { usePostContext } from '@/context/PostContext';

const featuredRentals = [
  {
    id: 101,
    title: 'প্রিমিয়াম অ্যাপার্টমেন্ট',
    location: 'গুলশান, ঢাকা',
    price: '২৫,০০০',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop',
    category: 'অ্যাপার্টমেন্ট',
    rating: 4.9
  },
  {
    id: 102,
    title: 'আধুনিক বাড়ি',
    location: 'উত্তরা, ঢাকা',
    price: '৪০,০০০',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop',
    category: 'বাসা',
    rating: 4.8
  },
  {
    id: 103,
    title: 'স্টাইলিশ অফিস স্পেস',
    location: 'বনানী, ঢাকা',
    price: '৫০,০০০',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop',
    category: 'কমার্শিয়াল স্পেস',
    rating: 4.7
  }
];

const popularRentals = [
  {
    id: 201,
    title: 'আরামদায়ক অ্যাপার্টমেন্ট',
    location: 'ধানমন্ডি, ঢাকা',
    price: '২০,০০০',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
    category: 'অ্যাপার্টমেন্ট',
    rating: 4.6
  },
  {
    id: 202,
    title: 'ছোট সুন্দর বাড়ি',
    location: 'মিরপুর, ঢাকা',
    price: '৩০,০০০',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1000&auto=format&fit=crop',
    category: 'বাসা',
    rating: 4.5
  },
  {
    id: 203,
    title: 'কার্যকর অফিস স্পেস',
    location: 'মতিঝিল, ঢাকা',
    price: '৪০,০০০',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1525913984309-0d4086099e69?q=80&w=1000&auto=format&fit=crop',
    category: 'কমার্শিয়াল স্পেস',
    rating: 4.4
  }
];

const nearbyRentals = [
  {
    id: 301,
    title: 'স্টুডিও অ্যাপার্টমেন্ট',
    location: 'ফার্মগেট, ঢাকা',
    price: '15,000',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop',
    category: 'অ্যাপার্টমেন্ট',
    rating: 4.3
  },
  {
    id: 302,
    title: 'আকর্ষণীয় কটেজ',
    location: 'বসুন্ধরা, ঢাকা',
    price: '25,000',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1572547736089-b3dd93c9ac2e?q=80&w=1000&auto=format&fit=crop',
    category: 'বাসা',
    rating: 4.2
  },
  {
    id: 303,
    title: 'সাশ্রয়ী অফিস স্পেস',
    location: 'তেজগাঁও, ঢাকা',
    price: '30,000',
    period: 'মাস',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1000&auto=format&fit=crop',
    category: 'কমার্শিয়াল স্পেস',
    rating: 4.1
  }
];

const rentalCategories = [
  { 
    id: 'apartment', 
    name: 'অ্যাপার্টমেন্ট', 
    icon: <Building className="h-5 w-5 text-amber-500" /> 
  },
  { 
    id: 'house', 
    name: 'বাসা', 
    icon: <Home className="h-5 w-5 text-green-500" /> 
  },
  { 
    id: 'car', 
    name: 'গাড়ি', 
    icon: <Car className="h-5 w-5 text-blue-500" /> 
  },
  { 
    id: 'office', 
    name: 'অফিস স্পেস', 
    icon: <Briefcase className="h-5 w-5 text-indigo-500" /> 
  },
  { 
    id: 'equipment', 
    name: 'ইকুইপমেন্ট', 
    icon: <Wrench className="h-5 w-5 text-purple-500" /> 
  }
];

const housingCategories = [
  { 
    id: 'apartment', 
    name: 'অ্যাপার্টমেন্ট', 
    icon: <Building className="h-5 w-5 text-amber-500" /> 
  },
  { 
    id: 'house', 
    name: 'বাসা', 
    icon: <Home className="h-5 w-5 text-green-500" /> 
  },
  { 
    id: 'hostel', 
    name: 'হোস্টেল', 
    icon: <Building className="h-5 w-5 text-blue-500" /> 
  },
  { 
    id: 'room', 
    name: 'রুম', 
    icon: <Home className="h-5 w-5 text-indigo-500" /> 
  },
  { 
    id: 'guesthouse', 
    name: 'গেস্ট হাউস', 
    icon: <Building className="h-5 w-5 text-purple-500" /> 
  }
];

const Rentals = () => {
  const navigate = useNavigate();
  const { rentPosts } = usePostContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('categories');
  const [showMap, setShowMap] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&type=rental`);
    }
  };

  const navigateToCategory = (categoryId: string) => {
    navigate(`/rental-category/${categoryId}`);
  };

  const handleRentalClick = (id: number) => {
    navigate(`/rent-details/${id}`);
  };

  const handleFavoriteToggle = (e: React.MouseEvent, rentalId: number) => {
    e.stopPropagation();
    // Add your logic to toggle favorite status here
    console.log(`Toggling favorite for rental ID: ${rentalId}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">রেন্টাল সার্ভিস</h1>
      
      <form onSubmit={handleSearch} className="relative mb-6">
        <Input
          placeholder="খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      <div className="flex items-center justify-between mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">ক্যাটাগরি</TabsTrigger>
            <TabsTrigger value="listings">লিস্টিং</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* ক্যাটাগরি ট্যাব কনটেন্ট */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">রেন্টাল ক্যাটাগরি</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rentalCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigateToCategory(category.id)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full mb-3">
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">120+ আইটেম</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">বাসস্থান</h2>
              <Button variant="link" onClick={() => navigate('/housing')}>
                সকল দেখুন <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {housingCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigateToCategory(category.id)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full mb-3">
                      {category.icon}
                    </div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">80+ আইটেম</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* লিস্টিং ট্যাব কনটেন্ট */}
      {activeTab === 'listings' && (
        <div className="space-y-6">
          {/* নতুন পোস্ট সেকশন */}
          {rentPosts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">নতুন পোস্ট</h2>
                <Button variant="link" onClick={() => navigate('/rentals/new')}>
                  সকল দেখুন <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {rentPosts.slice(0, 4).map((post) => (
                  <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all" 
                        onClick={() => navigate(`/rent-details/${post.id}`)}>
                    <div className="relative aspect-video">
                      {post.imageUrls.length > 0 ? (
                        <img 
                          src={post.imageUrls[0]} 
                          alt={post.title}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Building className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                      <Badge className="absolute top-2 left-2">{post.category}</Badge>
                      <div className="absolute top-2 right-2">
                        <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{post.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground my-1">
                        <MapPin className="h-3 w-3 mr-1" /> 
                        <span>{post.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">৳{post.price}/{post.period}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ফিচার্ড রেন্টাল সেকশন */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">ফিচার্ড রেন্টাল</h2>
              <Button variant="link" onClick={() => navigate('/rentals/featured')}>
                সকল দেখুন <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredRentals.map((listing) => (
                <Card 
                  key={listing.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleRentalClick(listing.id)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2">{listing.category}</Badge>
                    <div className="absolute top-2 right-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                        onClick={(e) => handleFavoriteToggle(e, listing.id)}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground my-1">
                      <MapPin className="h-3 w-3 mr-1" /> 
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-primary">৳{listing.price}/{listing.period}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{listing.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* জনপ্রিয় রেন্টাল সেকশন */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">জনপ্রিয় রেন্টাল</h2>
              <Button variant="link" onClick={() => navigate('/rentals/popular')}>
                সকল দেখুন <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularRentals.map((listing) => (
                <Card 
                  key={listing.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleRentalClick(listing.id)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2">{listing.category}</Badge>
                    <div className="absolute top-2 right-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                        onClick={(e) => handleFavoriteToggle(e, listing.id)}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground my-1">
                      <MapPin className="h-3 w-3 mr-1" /> 
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-primary">৳{listing.price}/{listing.period}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{listing.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* নিকটবর্তী রেন্টাল সেকশন */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">নিকটবর্তী রেন্টাল</h2>
              <Button variant="link" onClick={() => setShowMap(!showMap)}>
                {showMap ? 'লিস্ট ভিউ' : 'ম্যাপ ভিউ'}
              </Button>
            </div>
            
            {showMap ? (
              <div className="rounded-lg overflow-hidden h-[300px] bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">ম্যাপ লোড হচ্ছে...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {nearbyRentals.map((listing) => (
                  <Card 
                    key={listing.id} 
                    className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                    onClick={() => handleRentalClick(listing.id)}
                  >
                    <div className="relative aspect-square">
                      <img 
                        src={listing.image} 
                        alt={listing.title} 
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 left-2">{listing.category}</Badge>
                      <div className="absolute top-2 right-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="bg-white h-8 w-8 rounded-full"
                          onClick={(e) => handleFavoriteToggle(e, listing.id)}
                        >
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground my-1">
                        <MapPin className="h-3 w-3 mr-1" /> 
                        <span>{listing.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">৳{listing.price}/{listing.period}</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{listing.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* নতুন পোস্ট বাটন */}
      <Button 
        onClick={() => navigate('/create-post')}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Rentals;
