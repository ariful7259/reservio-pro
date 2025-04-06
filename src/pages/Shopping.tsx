
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Package, 
  Tag,
  Heart,
  Share2,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Filter,
  TruckIcon,
  CreditCard,
  CalendarClock,
  CircleDollarSign,
  LayoutGrid,
  Map as MapIcon,
  Locate
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapView from '@/components/MapView';
import { useToast } from '@/components/ui/use-toast';

const Shopping = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  // Banner images for Shopping
  const bannerImages = [
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop",
  ];

  // Categories
  const categories = [
    { id: "electronics", name: "এলেকট্রনিক্স", icon: <Package className="h-8 w-8 mb-2" />, count: 245 },
    { id: "fashion", name: "ফ্যাশন", icon: <ShoppingBag className="h-8 w-8 mb-2" />, count: 189 },
    { id: "grocery", name: "গ্রোসারি", icon: <Tag className="h-8 w-8 mb-2" />, count: 156 },
    { id: "mobile", name: "মোবাইল", icon: <Package className="h-8 w-8 mb-2" />, count: 127 },
    { id: "healthcare", name: "হেলথকেয়ার", icon: <Package className="h-8 w-8 mb-2" />, count: 98 },
    { id: "books", name: "বই", icon: <Package className="h-8 w-8 mb-2" />, count: 67 },
    { id: "kitchen", name: "কিচেন", icon: <Package className="h-8 w-8 mb-2" />, count: 54 },
    { id: "kids", name: "বাচ্চাদের", icon: <Package className="h-8 w-8 mb-2" />, count: 43 },
  ];

  // Products
  const products = [
    {
      id: 1,
      name: "ওয়ায়ারলেস হেডফোন",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 2,500",
      originalPrice: "৳ 3,200",
      location: "গুলশান, ঢাকা",
      rating: 4.8,
      reviews: 245,
      category: "এলেকট্রনিক্স",
      isSponsored: true,
      latitude: 23.8009,
      longitude: 90.4131
    },
    {
      id: 2,
      name: "ফ্যাশন সানগ্লাস",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 1,200",
      originalPrice: "৳ 1,800",
      location: "ধানমন্ডি, ঢাকা",
      rating: 4.5,
      reviews: 123,
      category: "ফ্যাশন",
      latitude: 23.7465,
      longitude: 90.3751
    },
    {
      id: 3,
      name: "স্মার্ট ওয়াচ",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 4,500",
      originalPrice: "৳ 5,000",
      location: "বনানী, ঢাকা",
      rating: 4.7,
      reviews: 189,
      category: "এলেকট্রনিক্স",
      latitude: 23.7937,
      longitude: 90.4065
    },
    {
      id: 4,
      name: "পাম্প স্পোর্টস শুজ",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 3,200",
      originalPrice: "৳ 4,000",
      location: "উত্তরা, ঢাকা",
      rating: 4.4,
      reviews: 167,
      category: "ফ্যাশন",
      isSponsored: true,
      latitude: 23.8728,
      longitude: 90.3923
    },
    {
      id: 5,
      name: "পোর্টেবল ব্লুটুথ স্পিকার",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 1,800",
      originalPrice: "৳ 2,200",
      location: "মোহাম্মদপুর, ঢাকা",
      rating: 4.6,
      reviews: 210,
      category: "এলেকট্রনিক্স",
      latitude: 23.7662,
      longitude: 90.3527
    },
    {
      id: 6,
      name: "লেদার ওয়ালেট",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 950",
      originalPrice: "৳ 1,200",
      location: "মিরপুর, ঢাকা",
      rating: 4.3,
      reviews: 78,
      category: "ফ্যাশন",
      latitude: 23.8096,
      longitude: 90.3654
    },
    {
      id: 7,
      name: "স্টাইলিশ বেক প্যাক",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 2,700",
      originalPrice: "৳ 3,500",
      location: "ধানমন্ডি, ঢাকা",
      rating: 4.7,
      reviews: 142,
      category: "ফ্যাশন",
      isSponsored: true,
      latitude: 23.7488,
      longitude: 90.3712
    },
    {
      id: 8,
      name: "ডিজিটাল ক্যামেরা",
      image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 15,000",
      originalPrice: "৳ 18,000",
      location: "বনানী, ঢাকা",
      rating: 4.9,
      reviews: 253,
      category: "এলেকট্রনিক্স",
      latitude: 23.7925,
      longitude: 90.4078
    },
  ];

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handleProductClick = (id: number) => {
    navigate(`/shopping/product/${id}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/shopping/category/${categoryId}`);
  };

  const handleBookmark = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "প্রোডাক্টটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: "প্রোডাক্টটি শেয়ার করার লিংক কপি করা হয়েছে",
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with search bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস</h1>
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'map')} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" /> গ্রিড
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapIcon className="h-4 w-4" /> মানচিত্র
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" onClick={handleFilterToggle}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="প্রোডাক্ট খুঁজুন" className="pl-9 pr-16" />
          <Button 
            variant="default" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </div>
      </div>

      {/* Filter panel - conditionally rendered */}
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">ক্যাটেগরি</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Package className="h-4 w-4 mr-2" /> এলেকট্রনিক্স
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <ShoppingBag className="h-4 w-4 mr-2" /> ফ্যাশন
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Tag className="h-4 w-4 mr-2" /> গ্রোসারি
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Package className="h-4 w-4 mr-2" /> মোবাইল
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">দাম সীমা</h3>
              <Slider
                defaultValue={[1000, 10000]}
                max={20000}
                step={500}
              />
              <div className="flex justify-between mt-2">
                <div className="text-sm">৳500</div>
                <div className="text-sm">৳20,000</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">রেটিং</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <input type="checkbox" id="rating5" className="mr-2" />
                  <label htmlFor="rating5" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating4" className="mr-2" />
                  <label htmlFor="rating4" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-1">& উপরে</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">লোকেশন</h3>
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
            
            <div>
              <h3 className="text-sm font-medium mb-2">দূরত্ব</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[5]}
                  max={20}
                  step={1}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1 কিমি</span>
                  <span>10 কিমি</span>
                  <span>20 কিমি</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" onClick={handleFilterToggle}>বাতিল</Button>
            <Button>ফিল্টার করুন</Button>
          </div>
        </div>
      )}

      {/* Categories section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ক্যাটেগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 4).map((category, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.icon}
              <span className="text-xs text-center font-medium">{category.name}</span>
              <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>
        
        {showMoreCategories && (
          <div className="grid grid-cols-4 gap-3 mt-3">
            {categories.slice(4).map((category, index) => (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.icon}
                <span className="text-xs text-center font-medium">{category.name}</span>
                <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
              </div>
            ))}
          </div>
        )}
        
        <div className="w-full flex justify-center mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowMoreCategories(!showMoreCategories)}
          >
            {showMoreCategories ? (
              <>
                <ChevronUp className="h-4 w-4" /> কম দেখুন
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> আরও দেখুন
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Banner section */}
      <div className="mb-6 overflow-hidden rounded-lg">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-[16/6] w-full">
                    <img 
                      src={image} 
                      alt={`Banner ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <Separator className="my-6" />

      {/* Featured Products */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">ফিচার্ড প্রোডাক্ট</h2>
        </div>
        
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-all relative"
                onClick={() => handleProductClick(product.id)}
              >
                {product.isSponsored && (
                  <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 z-10">স্পন্সর্ড</Badge>
                )}
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                      onClick={(e) => handleBookmark(e, product.id)}>
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                      onClick={(e) => handleShare(e, product.id)}>
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground my-1">
                    <MapPin className="h-3 w-3 mr-1" /> {product.location}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-1">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                    <span className="mx-1">•</span>
                    <span>{product.reviews} রিভিউ</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {viewMode === 'map' && (
          <div className="mb-4">
            <MapView 
              listings={products.map(product => ({
                id: product.id,
                title: product.name,
                location: product.location,
                latitude: product.latitude,
                longitude: product.longitude
              }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {products.slice(0, 3).map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="flex h-24">
                    <div className="w-1/3">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-2">
                      <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.location}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                      <p className="text-sm font-bold text-primary">{product.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shopping;
