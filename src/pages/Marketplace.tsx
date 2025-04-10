
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  Truck, 
  Briefcase, 
  PaintBucket, 
  Wrench,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Filter,
  MapPin,
  LayoutGrid,
  Map as MapIcon,
  Calendar,
  ShoppingBag,
  Smartphone,
  Laptop,
  Camera,
  HeartPulse,
  Headphones,
  Watch,
  Shirt,
  Baby,
  Utensils,
  Book,
  Tv,
  Gamepad,
  Bicycle,
  Car,
  Star,
  Clock,
  Share2,
  Heart,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapView from '@/components/MapView';
import SocialShareModal from '@/components/SocialShareModal';
import { useToast } from '@/components/ui/use-toast';

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const bannerImages = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1000&auto=format&fit=crop",
  ];

  const marketplaceCategories = [
    { 
      icon: <Smartphone className="h-8 w-8" />, 
      name: "মোবাইল", 
      path: "/shopping/category/mobile", 
      count: 378 
    },
    { 
      icon: <Laptop className="h-8 w-8" />, 
      name: "কম্পিউটার", 
      path: "/shopping/category/computer", 
      count: 245 
    },
    { 
      icon: <Camera className="h-8 w-8" />, 
      name: "ক্যামেরা", 
      path: "/shopping/category/camera", 
      count: 112 
    },
    { 
      icon: <HeartPulse className="h-8 w-8" />, 
      name: "হেলথ", 
      path: "/shopping/category/health", 
      count: 143 
    },
    { 
      icon: <Headphones className="h-8 w-8" />, 
      name: "অডিও", 
      path: "/shopping/category/audio", 
      count: 98 
    },
    { 
      icon: <Watch className="h-8 w-8" />, 
      name: "স্মার্টওয়াচ", 
      path: "/shopping/category/smartwatch", 
      count: 67 
    },
    { 
      icon: <Shirt className="h-8 w-8" />, 
      name: "ফ্যাশন", 
      path: "/shopping/category/fashion", 
      count: 286 
    },
    { 
      icon: <Baby className="h-8 w-8" />, 
      name: "কিডস", 
      path: "/shopping/category/kids", 
      count: 124 
    },
    { 
      icon: <Utensils className="h-8 w-8" />, 
      name: "কিচেন", 
      path: "/shopping/category/kitchen", 
      count: 156 
    },
    { 
      icon: <Book className="h-8 w-8" />, 
      name: "বই", 
      path: "/shopping/category/books", 
      count: 198 
    },
    { 
      icon: <Tv className="h-8 w-8" />, 
      name: "টিভি", 
      path: "/shopping/category/tv", 
      count: 87 
    },
    { 
      icon: <Gamepad className="h-8 w-8" />, 
      name: "গেমিং", 
      path: "/shopping/category/gaming", 
      count: 76 
    },
    { 
      icon: <Bicycle className="h-8 w-8" />, 
      name: "স্পোর্টস", 
      path: "/shopping/category/sports", 
      count: 92 
    },
    { 
      icon: <Car className="h-8 w-8" />, 
      name: "অটো", 
      path: "/shopping/category/auto", 
      count: 64 
    },
    { 
      icon: <Home className="h-8 w-8" />, 
      name: "হোম", 
      path: "/shopping/category/home", 
      count: 223 
    },
    { 
      icon: <ShoppingBag className="h-8 w-8" />, 
      name: "অন্যান্য", 
      path: "/shopping/category/other", 
      count: 145 
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: "স্মার্টফোন ১২৮জিবি",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ২৪,৯৯৯",
      location: "ঢাকা",
      rating: 4.7,
      category: "মোবাইল",
      latitude: 23.7937,
      longitude: 90.4137
    },
    {
      id: 2,
      title: "ওয়্যারলেস হেডফোন",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৩,৫০০",
      location: "ঢাকা",
      rating: 4.5,
      category: "অডিও",
      latitude: 23.7965,
      longitude: 90.4070
    },
    {
      id: 3,
      title: "স্মার্টওয়াচ সিরিজ ৭",
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৮,৯৯৯",
      location: "ঢাকা",
      rating: 4.6,
      category: "স্মার্টওয়াচ",
      latitude: 23.8103,
      longitude: 90.3420
    },
    {
      id: 4,
      title: "ডিএসএলআর ক্যামেরা",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৪৫,০০০",
      location: "ঢাকা",
      rating: 4.8,
      category: "ক্যামেরা",
      latitude: 23.7465,
      longitude: 90.3751
    },
    {
      id: 5,
      title: "গেমিং ল্যাপটপ",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৮৫,০০০",
      location: "ঢাকা",
      rating: 4.9,
      category: "কম্পিউটার",
      latitude: 23.7550,
      longitude: 90.3900
    },
    {
      id: 6,
      title: "ব্লুটুথ স্পিকার",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ২,৯৯৯",
      location: "ঢাকা",
      rating: 4.4,
      category: "অডিও",
      latitude: 23.8330,
      longitude: 90.4170
    },
    {
      id: 7,
      title: "গ্রাফিক্স টেবলেট",
      image: "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ১২,৫০০",
      location: "ঢাকা",
      rating: 4.7,
      category: "কম্পিউটার",
      latitude: 23.7900,
      longitude: 90.3850
    },
    {
      id: 8,
      title: "স্মার্ট টিভি ৪৩\"",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৩৮,০০০",
      location: "ঢাকা",
      rating: 4.6,
      category: "টিভি",
      latitude: 23.7700,
      longitude: 90.3750
    },
  ];

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "প্রোডাক্টটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setShareItem({
      ...product,
      type: 'product',
    });
    setShowShareModal(true);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
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
          <Button variant="outline" size="icon" onClick={toggleFilter}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
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
                  <SelectItem value="mobile">মোবাইল</SelectItem>
                  <SelectItem value="laptop">ল্যাপটপ</SelectItem>
                  <SelectItem value="camera">ক্যামেরা</SelectItem>
                  <SelectItem value="audio">অডিও</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">মূল্য সীমা</label>
              <div className="px-2">
                <Slider
                  defaultValue={[10000]}
                  max={100000}
                  step={1000}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>৳১,০০০</span>
                  <span>৳৫০,০০০</span>
                  <span>৳১,০০,০০০</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">রেটিং</label>
              <div className="px-2">
                <Slider
                  defaultValue={[4]}
                  max={5}
                  step={0.5}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1 স্টার</span>
                  <span>3 স্টার</span>
                  <span>5 স্টার</span>
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
      
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {marketplaceCategories.slice(0, 8).map((category, index) => (
            <Link 
              key={index} 
              to={category.path}
              className="flex flex-col items-center justify-center transition-all hover:scale-105"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-xs text-center mb-1">{category.name}</span>
              <Badge variant="outline" className="text-xs">{category.count}</Badge>
            </Link>
          ))}
        </div>
        
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full mt-3"
        >
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-4 gap-3">
              {marketplaceCategories.slice(8).map((category, index) => (
                <Link 
                  key={index} 
                  to={category.path}
                  className="flex flex-col items-center justify-center transition-all hover:scale-105"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    {category.icon}
                  </div>
                  <span className="text-xs text-center mb-1">{category.name}</span>
                  <Badge variant="outline" className="text-xs">{category.count}</Badge>
                </Link>
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
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ফিচার্ড প্রোডাক্ট</h2>
        
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105"
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2">{product.category}</Badge>
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                        onClick={(e) => handleBookmark(e, product.id)}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                        onClick={(e) => handleShare(e, product)}
                      >
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground my-1">
                      <MapPin className="h-3 w-3 mr-1" /> 
                      <span>{product.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-primary">{product.price}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {viewMode === 'map' && (
          <div className="mb-4">
            <MapView 
              listings={featuredProducts.map(product => ({
                id: product.id,
                title: product.title,
                location: product.location,
                latitude: product.latitude,
                longitude: product.longitude
              }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {featuredProducts.slice(0, 3).map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="flex h-24">
                    <div className="w-1/3">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-2">
                      <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
                      <p className="text-xs text-muted-foreground">{product.location}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-bold text-primary">{product.price}</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

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

export default Marketplace;
