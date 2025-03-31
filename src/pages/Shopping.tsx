
import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Filter, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useNavigate } from 'react-router-dom';

const Shopping = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  
  // Sample product data
  const products = [
    {
      id: '1',
      name: 'স্মার্ট ব্লাড প্রেশার মনিটর',
      price: 2500,
      oldPrice: 3000,
      rating: 4.5,
      reviewCount: 120,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'health',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'ডিজিটাল গ্লুকোমিটার কিট',
      price: 3500,
      oldPrice: 4200,
      rating: 4.7,
      reviewCount: 85,
      image: 'https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'health',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'ফিটনেস ওয়াচ প্রো',
      price: 4999,
      oldPrice: 5500,
      rating: 4.8,
      reviewCount: 230,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'fitness',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'ইয়োগা ম্যাট প্রিমিয়াম',
      price: 1200,
      oldPrice: 1500,
      rating: 4.6,
      reviewCount: 150,
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'fitness',
      isFavorite: false,
    },
  ];
  
  // Product categories
  const productCategories = [
    { icon: <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="হেলথ" />, name: "হেলথ", path: "/shopping/health", count: 245 },
    { icon: <img src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="ফিটনেস" />, name: "ফিটনেস", path: "/shopping/fitness", count: 123 },
    { icon: <img src="https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="মেডিসিন" />, name: "মেডিসিন", path: "/shopping/medicine", count: 78 },
    { icon: <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="ভিটামিন" />, name: "ভিটামিন", path: "/shopping/vitamins", count: 56 },
    { icon: <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="ইলেক্ট্রনিক্স" />, name: "ইলেক্ট্রনিক্স", path: "/shopping/electronics", count: 42 },
    { icon: <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="বিউটি" />, name: "বিউটি", path: "/shopping/beauty", count: 35 },
    { icon: <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="এক্সেসরিজ" />, name: "এক্সেসরিজ", path: "/shopping/accessories", count: 89 },
    { icon: <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="অন্যান্য" />, name: "অন্যান্য", path: "/shopping/others", count: 67 },
  ];

  // Featured product listings
  const featuredListings = [
    {
      id: '1',
      title: 'স্মার্ট ব্লাড প্রেশার মনিটর',
      location: 'ধানমন্ডি, ঢাকা',
      price: '৳২,৫০০',
      oldPrice: '৳৩,০০০',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.5,
      discount: 17,
    },
    {
      id: '2',
      title: 'ডিজিটাল গ্লুকোমিটার কিট',
      location: 'উত্তরা, ঢাকা',
      price: '৳৩,৫০০',
      oldPrice: '৳৪,২০০',
      image: 'https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.7,
      discount: 17,
    },
    {
      id: '3',
      title: 'ফিটনেস ওয়াচ প্রো',
      location: 'বনানী, ঢাকা',
      price: '৳৪,৯৯৯',
      oldPrice: '৳৫,৫০০',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.8,
      discount: 9,
    },
    {
      id: '4',
      title: 'ইয়োগা ম্যাট প্রিমিয়াম',
      location: 'মিরপুর, ঢাকা',
      price: '৳১,২০০',
      oldPrice: '৳১,৫০০',
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.6,
      discount: 20,
    },
  ];

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস</h1>
        <Button variant="outline" size="icon" onClick={toggleFilter}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Filter options - conditionally shown */}
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="font-medium mb-3">ফিল্টার</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">লোকেশন</label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="dhaka">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">ঢাকা</SelectItem>
                    <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                    <SelectItem value="khulna">খুলনা</SelectItem>
                    <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                    <SelectItem value="sylhet">সিলেট</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">ক্যাটাগরি</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ক্যাটাগরি" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">হেলথ</SelectItem>
                  <SelectItem value="fitness">ফিটনেস</SelectItem>
                  <SelectItem value="medicine">মেডিসিন</SelectItem>
                  <SelectItem value="electronics">ইলেক্ট্রনিক্স</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">মূল্য সীমা</label>
              <div className="px-2">
                <Slider
                  defaultValue={[2500]}
                  max={10000}
                  step={500}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>৳৫০০</span>
                  <span>৳৫,০০০</span>
                  <span>৳১০,০০০</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">রেটিং</label>
              <div className="px-2">
                <Slider
                  defaultValue={[4.5]}
                  max={5}
                  step={0.5}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>১</span>
                  <span>৩</span>
                  <span>৫</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button className="flex-1">ফিল্টার করুন</Button>
            <Button variant="outline" onClick={toggleFilter}>বাতিল করুন</Button>
          </div>
        </div>
      )}
      
      {/* Product Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {productCategories.slice(0, 4).map((category, index) => (
            <a 
              key={index} 
              href={category.path}
              className="flex flex-col items-center justify-center transition-all hover:scale-105"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-xs text-center mb-1">{category.name}</span>
              <Badge variant="outline" className="text-xs">{category.count}</Badge>
            </a>
          ))}
        </div>
        
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full mt-3"
        >
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-4 gap-3">
              {productCategories.slice(4).map((category, index) => (
                <a 
                  key={index} 
                  href={category.path}
                  className="flex flex-col items-center justify-center transition-all hover:scale-105"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    {category.icon}
                  </div>
                  <span className="text-xs text-center mb-1">{category.name}</span>
                  <Badge variant="outline" className="text-xs">{category.count}</Badge>
                </a>
              ))}
            </div>
          </CollapsibleContent>
          
          <div className="w-full flex justify-center mt-4">
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" /> কম দেখুন
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" /> আরও দেখুন
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>
      
      {/* Featured Listings */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ফিচার্ড লিস্টিং</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredListings.map((listing) => (
            <Card 
              key={listing.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate(`/shopping/product/${listing.id}`)}
            >
              <div className="relative aspect-square">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                {listing.discount && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    {listing.discount}% ছাড়
                  </Badge>
                )}
                <Button variant="outline" size="icon" className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full">
                  <Heart className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <div className="font-bold">{listing.price}</div>
                    {listing.oldPrice && (
                      <div className="text-xs text-gray-400 line-through">{listing.oldPrice}</div>
                    )}
                  </div>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{listing.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Separator className="my-6" />

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full bg-secondary/50 mb-4">
          <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
          <TabsTrigger value="health" className="flex-1">হেলথ</TabsTrigger>
          <TabsTrigger value="fitness" className="flex-1">ফিটনেস</TabsTrigger>
          <TabsTrigger value="medicine" className="flex-1">মেডিসিন</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  {product.oldPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold">৳{product.price}</div>
                      {product.oldPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">৳{product.oldPrice}</div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="health">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.filter(product => product.category === 'health').map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  {product.oldPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold">৳{product.price}</div>
                      {product.oldPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">৳{product.oldPrice}</div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="fitness">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.filter(product => product.category === 'fitness').map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  {product.oldPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold">৳{product.price}</div>
                      {product.oldPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">৳{product.oldPrice}</div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="medicine">
          <div className="text-center py-10 text-muted-foreground">
            কোনো মেডিসিন এখনো উপলব্ধ নেই
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shopping;
