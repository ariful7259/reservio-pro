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
  ActivitySquare,
  Car,
  Star,
  Clock,
  Share2,
  Heart,
  Search,
  CircleDollarSign,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import MapView from '@/components/MapView';
import SocialShareModal from '@/components/SocialShareModal';
import { useToast } from '@/hooks/use-toast';

const Marketplace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 50000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');

  const bannerImages = [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1000&auto=format&fit=crop",
  ];

  const categoryIconColors = {
    mobile: 'bg-purple-100 text-purple-600',
    computer: 'bg-blue-100 text-blue-600',
    camera: 'bg-emerald-100 text-emerald-600',
    health: 'bg-red-100 text-red-600',
    audio: 'bg-indigo-100 text-indigo-600',
    smartwatch: 'bg-cyan-100 text-cyan-600',
    fashion: 'bg-pink-100 text-pink-600',
    kids: 'bg-amber-100 text-amber-600',
    kitchen: 'bg-orange-100 text-orange-600',
    books: 'bg-green-100 text-green-600',
    tv: 'bg-slate-100 text-slate-600',
    gaming: 'bg-red-100 text-red-600',
    sports: 'bg-lime-100 text-lime-600',
    auto: 'bg-gray-100 text-gray-600',
    home: 'bg-yellow-100 text-yellow-600',
    other: 'bg-violet-100 text-violet-600',
  };

  const marketplaceCategories = [
    { 
      icon: <Smartphone className="h-8 w-8" />, 
      name: "মোবাইল", 
      path: "/shopping/category/mobile", 
      count: 378,
      color: categoryIconColors.mobile
    },
    { 
      icon: <Laptop className="h-8 w-8" />, 
      name: "কম্পিউটার", 
      path: "/shopping/category/computer", 
      count: 245,
      color: categoryIconColors.computer
    },
    { 
      icon: <Camera className="h-8 w-8" />, 
      name: "ক্যামেরা", 
      path: "/shopping/category/camera", 
      count: 112,
      color: categoryIconColors.camera
    },
    { 
      icon: <HeartPulse className="h-8 w-8" />, 
      name: "হেলথ", 
      path: "/shopping/category/health", 
      count: 143,
      color: categoryIconColors.health
    },
    { 
      icon: <Headphones className="h-8 w-8" />, 
      name: "অডিও", 
      path: "/shopping/category/audio", 
      count: 98,
      color: categoryIconColors.audio
    },
    { 
      icon: <Watch className="h-8 w-8" />, 
      name: "স্মার্টওয়াচ", 
      path: "/shopping/category/smartwatch", 
      count: 67,
      color: categoryIconColors.smartwatch
    },
    { 
      icon: <Shirt className="h-8 w-8" />, 
      name: "ফ্যাশন", 
      path: "/shopping/category/fashion", 
      count: 286,
      color: categoryIconColors.fashion
    },
    { 
      icon: <Baby className="h-8 w-8" />, 
      name: "কিডস", 
      path: "/shopping/category/kids", 
      count: 124,
      color: categoryIconColors.kids
    },
    { 
      icon: <Utensils className="h-8 w-8" />, 
      name: "কিচেন", 
      path: "/shopping/category/kitchen", 
      count: 156,
      color: categoryIconColors.kitchen
    },
    { 
      icon: <Book className="h-8 w-8" />, 
      name: "বই", 
      path: "/shopping/category/books", 
      count: 198,
      color: categoryIconColors.books
    },
    { 
      icon: <Tv className="h-8 w-8" />, 
      name: "টিভি", 
      path: "/shopping/category/tv", 
      count: 87,
      color: categoryIconColors.tv
    },
    { 
      icon: <Gamepad className="h-8 w-8" />, 
      name: "গেমিং", 
      path: "/shopping/category/gaming", 
      count: 76,
      color: categoryIconColors.gaming
    },
    { 
      icon: <ActivitySquare className="h-8 w-8" />, 
      name: "স্পোর্টস", 
      path: "/shopping/category/sports", 
      count: 92,
      color: categoryIconColors.sports
    },
    { 
      icon: <Car className="h-8 w-8" />, 
      name: "অটো", 
      path: "/shopping/category/auto", 
      count: 64,
      color: categoryIconColors.auto
    },
    { 
      icon: <Home className="h-8 w-8" />, 
      name: "হোম", 
      path: "/shopping/category/home", 
      count: 223,
      color: categoryIconColors.home
    },
    { 
      icon: <ShoppingBag className="h-8 w-8" />, 
      name: "অন্যান্য", 
      path: "/shopping/category/other", 
      count: 145,
      color: categoryIconColors.other
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
    navigate(`/product-order/${id}`);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    toast({
      title: "অনুসন্ধান করা হচ্ছে",
      description: `"${searchTerm}" এর জন্য ফলাফল দেখানো হচ্ছে`,
    });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const marketplaceProviders = [
    { id: 1, name: "টপটেক ইলেকট্রনিক্স", verified: true, rating: 4.8, sales: 1250 },
    { id: 2, name: "ফ্যাশন হাউস", verified: true, rating: 4.6, sales: 950 },
    { id: 3, name: "বুক হেভেন", verified: false, rating: 4.3, sales: 580 },
    { id: 4, name: "কিচেন সাপ্লাই", verified: true, rating: 4.7, sales: 850 },
  ];

  const handleStoreClick = (storeId: number) => {
    navigate(`/store/${storeId}`);
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

      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="প্রোডাক্ট খুঁজুন" 
            className="pl-9 pr-16" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit"
            variant="default" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </form>
      </div>
      
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">ফিল্টার সেটিংস</h2>
            <Button variant="ghost" size="sm" onClick={toggleFilter}>
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <SelectItem value="barishal">বরিশাল</SelectItem>
                    <SelectItem value="rangpur">রংপুর</SelectItem>
                    <SelectItem value="mymensingh">ময়মনসিংহ</SelectItem>
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
                <SelectContent className="max-h-[200px]">
                  {marketplaceCategories.map((category, index) => (
                    <SelectItem key={index} value={category.path.split('/').pop() || ''}>
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-full ${category.color.split(' ').slice(0, 2).join(' ')}`}>
                          {category.icon}
                        </div>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">সর্টিং</label>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="সর্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
                  <SelectItem value="price_low">দাম (কম থেকে বেশি)</SelectItem>
                  <SelectItem value="price_high">দাম (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="rating">রেটিং</SelectItem>
                  <SelectItem value="newest">নতুন প্রোডাক্ট</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">মূল্য সীমা</label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  max={100000}
                  step={1000}
                  onValueChange={handlePriceRangeChange}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>৳{priceRange[0].toLocaleString()}</span>
                  <span>৳{priceRange[1].toLocaleString()}</span>
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
            
            <div>
              <label className="text-sm font-medium mb-1 block">ডেলিভারি সময়</label>
              <Select defaultValue="any">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ডেলিভারি সময়" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">যেকোনো সময়</SelectItem>
                  <SelectItem value="1day">১ দিনের মধ্যে</SelectItem>
                  <SelectItem value="3days">৩ দিনের মধ্যে</SelectItem>
                  <SelectItem value="7days">৭ দিনের মধ্যে</SelectItem>
                </SelectContent>
              </Select>
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
              <div className={`h-16 w-16 rounded-full ${category.color} flex items-center justify-center mb-2`}>
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
                  <div className={`h-16 w-16 rounded-full ${category.color} flex items-center justify-center mb-2`}>
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
                    <ChevronDown className="h-4 w-4" /> ���রও দেখুন
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">ফিচার্ড প্রোডাক্ট</h2>
          <div className="flex items-center text-sm gap-2">
            <span className="text-muted-foreground">সর্ট করুন:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
                <SelectItem value="price_low">
                  <div className="flex items-center">
                    <CircleDollarSign className="h-3 w-3 mr-1" />
                    <ArrowUp className="h-3 w-3 mr-1" />
                    দাম (কম থেকে বেশি)
                  </div>
                </SelectItem>
                <SelectItem value="price_high">
                  <div className="flex items-center">
                    <CircleDollarSign className="h-3 w-3 mr-1" />
                    <ArrowDown className="h-3 w-3 mr-1" />
                    দাম (বেশি থেকে কম)
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    রেটিং
                  </div>
                </SelectItem>
                <SelectItem value="newest">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    নতুন
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
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
            <div className="h-[450px] mb-4 border rounded-lg overflow-hidden">
              <MapView 
                listings={featuredProducts.map(product => ({
                  id: product.id,
                  title: product.title,
                  location: product.location,
                  latitude: product.latitude,
                  longitude: product.longitude
                }))}
              />
            </div>
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

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">টপ সেলার দোকান</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketplaceProviders.map((provider) => (
            <Card key={provider.id} className="hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium flex items-center gap-1">
                    {provider.name}
                    {provider.verified && (
                      <Badge variant="outline" className="h-4 text-[10px] bg-blue-100 text-blue-600 border-blue-200">ভেরিফাইড</Badge>
                    )}
                  </h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{provider.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{provider.sales}+ অর্ডার</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={() => handleStoreClick(provider.id)}
                  >
                    দোকান দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
