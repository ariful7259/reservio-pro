import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Package, Tag, Heart, Share2, MapPin, ChevronDown, ChevronUp, Star, Filter, TruckIcon, CreditCard, CalendarClock, CircleDollarSign, LayoutGrid, Map as MapIcon, Locate, Smartphone, Laptop, Camera, HeartPulse, Headphones, Watch, Shirt, Baby, Utensils, Book, Tv, Gamepad, ActivitySquare, Car, Home, ArrowDown, ArrowUp, Building, Clock, Store } from 'lucide-react';
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
import SocialShareModal from '@/components/SocialShareModal';

const Shopping = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 10000]);
  const [distanceRange, setDistanceRange] = useState<number[]>([5]);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const bannerImages = ["https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1000&auto=format&fit=crop"];
  const categoryIconColors = {
    electronics: 'bg-blue-100 text-blue-600',
    fashion: 'bg-pink-100 text-pink-600',
    grocery: 'bg-green-100 text-green-600',
    mobile: 'bg-purple-100 text-purple-600',
    healthcare: 'bg-red-100 text-red-600',
    books: 'bg-amber-100 text-amber-600',
    kitchen: 'bg-orange-100 text-orange-600',
    kids: 'bg-yellow-100 text-yellow-600',
    computer: 'bg-indigo-100 text-indigo-600',
    camera: 'bg-emerald-100 text-emerald-600',
    audio: 'bg-violet-100 text-violet-600',
    smartwatch: 'bg-cyan-100 text-cyan-600',
    sports: 'bg-lime-100 text-lime-600',
    auto: 'bg-gray-100 text-gray-600',
    home: 'bg-teal-100 text-teal-600',
    other: 'bg-slate-100 text-slate-600'
  };
  const categories = [{
    id: "electronics",
    name: "এলেকট্রনিক্স",
    icon: <Laptop className="h-8 w-8 mb-2" />,
    count: 245,
    color: categoryIconColors.electronics
  }, {
    id: "fashion",
    name: "ফ্যাশন",
    icon: <Shirt className="h-8 w-8 mb-2" />,
    count: 189,
    color: categoryIconColors.fashion
  }, {
    id: "grocery",
    name: "গ্রোসারি",
    icon: <Tag className="h-8 w-8 mb-2" />,
    count: 156,
    color: categoryIconColors.grocery
  }, {
    id: "mobile",
    name: "মোবাইল",
    icon: <Smartphone className="h-8 w-8 mb-2" />,
    count: 127,
    color: categoryIconColors.mobile
  }, {
    id: "healthcare",
    name: "হেলথকেয়ার",
    icon: <HeartPulse className="h-8 w-8 mb-2" />,
    count: 98,
    color: categoryIconColors.healthcare
  }, {
    id: "books",
    name: "বই",
    icon: <Book className="h-8 w-8 mb-2" />,
    count: 67,
    color: categoryIconColors.books
  }, {
    id: "kitchen",
    name: "কিচেন",
    icon: <Utensils className="h-8 w-8 mb-2" />,
    count: 54,
    color: categoryIconColors.kitchen
  }, {
    id: "kids",
    name: "বাচ্চাদের",
    icon: <Baby className="h-8 w-8 mb-2" />,
    count: 43,
    color: categoryIconColors.kids
  }, {
    id: "computer",
    name: "কম্পিউটার",
    icon: <Laptop className="h-8 w-8 mb-2" />,
    count: 120,
    color: categoryIconColors.computer
  }, {
    id: "camera",
    name: "ক্যামেরা",
    icon: <Camera className="h-8 w-8 mb-2" />,
    count: 65,
    color: categoryIconColors.camera
  }, {
    id: "audio",
    name: "অডিও",
    icon: <Headphones className="h-8 w-8 mb-2" />,
    count: 78,
    color: categoryIconColors.audio
  }, {
    id: "smartwatch",
    name: "স্মার্টওয়াচ",
    icon: <Watch className="h-8 w-8 mb-2" />,
    count: 56,
    color: categoryIconColors.smartwatch
  }, {
    id: "sports",
    name: "স্পোর্টস",
    icon: <ActivitySquare className="h-8 w-8 mb-2" />,
    count: 92,
    color: categoryIconColors.sports
  }, {
    id: "auto",
    name: "অটো",
    icon: <Car className="h-8 w-8 mb-2" />,
    count: 64,
    color: categoryIconColors.auto
  }, {
    id: "home",
    name: "হোম",
    icon: <Home className="h-8 w-8 mb-2" />,
    count: 105,
    color: categoryIconColors.home
  }, {
    id: "other",
    name: "অন্যান্য",
    icon: <ShoppingBag className="h-8 w-8 mb-2" />,
    count: 145,
    color: categoryIconColors.other
  }];
  const products = [{
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }, {
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
  }];
  const topSellers = [{
    id: 1,
    name: "টপটেক ইলেকট্রনিক্স",
    verified: true,
    rating: 4.8,
    products: 250,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1000&auto=format&fit=crop",
    location: "গুলশান, ঢাকা",
    categories: ["ইলেকট্রনিক্স", "গ্যাজেট"]
  }, {
    id: 2,
    name: "ফ্যাশন হাউস",
    verified: true,
    rating: 4.6,
    products: 180,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop",
    location: "ধানমন্ডি, ঢাকা",
    categories: ["ফ্যাশন", "জুতা"]
  }, {
    id: 3,
    name: "গ্যাজেট ওয়ার্ল্ড",
    verified: false,
    rating: 4.5,
    products: 125,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    location: "বনানী, ঢাকা",
    categories: ["মোবাইল", "অ্যাক্সেসরিজ"]
  }, {
    id: 4,
    name: "হোম ডেকোর",
    verified: true,
    rating: 4.7,
    products: 95,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop",
    location: "উত্তরা, ঢাকা",
    categories: ["হোম", "ডেকোর"]
  }, {
    id: 5,
    name: "স্পোর্টস প্রো",
    verified: true,
    rating: 4.4,
    products: 156,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
    location: "মিরপুর, ঢাকা",
    categories: ["স্পোর্টস", "ফিটনেস"]
  }, {
    id: 6,
    name: "কিডস কালেকশন",
    verified: true,
    rating: 4.6,
    products: 89,
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop",
    location: "বারিধারা, ঢাকা",
    categories: ["বাচ্চাদের", "খেলনা"]
  }];

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };
  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/shopping/category/${categoryId}`);
  };
  const handleBookmark = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "প্রোডাক্টটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে"
    });
  };
  const handleShare = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setShareItem({
      ...product,
      type: 'product'
    });
    setShowShareModal(true);
  };
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };
  const handleDistanceRangeChange = (value: number[]) => {
    setDistanceRange(value);
  };
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "অনুসন্ধান করা হচ্ছে",
      description: `"${searchTerm}" এর জন্য ফলাফল দেখানো হচ্ছে`
    });
  };
  const handleStoreClick = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস</h1>
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={value => setViewMode(value as 'grid' | 'map')} className="w-[180px]">
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
      
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="প্রোডাক্ট খুঁজুন" className="pl-9 pr-16" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <Button type="submit" variant="default" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
            খুঁজুন
          </Button>
        </form>
      </div>

      {/* Filter Section */}
      {filterVisible && <div className="mb-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">ফিল্টার সেটিংস</h2>
            <Button variant="ghost" size="sm" onClick={handleFilterToggle}>
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">ক্যাটেগরি</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 4).map(category => <Button key={category.id} variant="outline" size="sm" className="justify-start" onClick={() => handleCategoryClick(category.id)}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${category.color}`}>
                      {category.icon}
                    </div>
                    {category.name}
                  </Button>)}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">দাম সীমা</h3>
              <Slider value={priceRange} max={20000} step={500} onValueChange={handlePriceRangeChange} />
              <div className="flex justify-between mt-2">
                <div className="text-sm">৳{priceRange[0].toLocaleString()}</div>
                <div className="text-sm">৳{priceRange[1].toLocaleString()}</div>
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
                  <SelectItem value="barishal">বরিশাল</SelectItem>
                  <SelectItem value="rangpur">রংপুর</SelectItem>
                  <SelectItem value="mymensingh">ময়মনসিংহ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">দূরত্ব</h3>
              <div className="px-2">
                <Slider value={distanceRange} max={20} step={1} onValueChange={handleDistanceRangeChange} />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1 কিমি</span>
                  <span>10 কিমি</span>
                  <span>20 কিমি</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">সর্টিং</h3>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="সর্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
                  <SelectItem value="price_low">দাম (কম থেকে বেশি)</SelectItem>
                  <SelectItem value="price_high">দাম (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="rating">রেটিং</SelectItem>
                  <SelectItem value="newest">নতুন</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" onClick={handleFilterToggle}>বাতিল</Button>
            <Button>ফিল্টার করুন</Button>
          </div>
        </div>}

      {/* Categories Section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ক্যাটেগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 8).map((category, index) => <div key={index} className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer" onClick={() => handleCategoryClick(category.id)}>
              <div className={`h-16 w-16 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                {category.icon}
              </div>
              <span className="text-xs text-center font-medium">{category.name}</span>
            </div>)}
        </div>
        
        {showMoreCategories && <div className="grid grid-cols-4 gap-3 mt-3">
            {categories.slice(8).map((category, index) => <div key={index} className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer" onClick={() => handleCategoryClick(category.id)}>
                <div className={`h-16 w-16 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                  {category.icon}
                </div>
                <span className="text-xs text-center font-medium">{category.name}</span>
              </div>)}
          </div>}
        
        <div className="w-full flex justify-center mt-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => setShowMoreCategories(!showMoreCategories)}>
            {showMoreCategories ? <>
                <ChevronUp className="h-4 w-4" /> কম দেখুন
              </> : <>
                <ChevronDown className="h-4 w-4" /> আরও দেখুন
              </>}
          </Button>
        </div>
      </div>
      
      {/* Banner Carousel */}
      <div className="mb-6 overflow-hidden rounded-lg">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerImages.map((image, index) => <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-[16/6] w-full">
                    <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      <Separator className="my-6" />

      {/* Main Navigation Tabs */}
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              প্রোডাক্টস
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              সার্ভিস
            </TabsTrigger>
            <TabsTrigger value="rental" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              ভাড়া
            </TabsTrigger>
            <TabsTrigger value="sellers" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              টপ সেলার
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-6">
            {/* Digital Store Themes Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">ডিজিটাল স্টোর থিম ও টেমপ্লেট</h2>
                <Button variant="outline" size="sm" onClick={() => navigate('/digital-themes')}>
                  সব দেখুন
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                আপনার অনলাইন স্টোর ও সার্ভিস পেজের জন্য প্রফেশনাল থিম ও ডিজাইন টেমপ্লেট
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    id: 'theme-1',
                    name: 'ই-কমার্স প্রো থিম',
                    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
                    price: '৳ ২,৫০০',
                    originalPrice: '৳ ৩,৫০০',
                    category: 'স্টোর থিম',
                    rating: 4.9,
                    reviews: 128,
                    features: ['রেসপন্সিভ ডিজাইন', 'পেমেন্ট গেটওয়ে', 'ইনভেন্টরি ম্যানেজমেন্ট']
                  },
                  {
                    id: 'theme-2',
                    name: 'সার্ভিস বুকিং থিম',
                    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop',
                    price: '৳ ২,০০০',
                    originalPrice: '৳ ২,৮০০',
                    category: 'সার্ভিস থিম',
                    rating: 4.7,
                    reviews: 95,
                    features: ['অ্যাপয়েন্টমেন্ট বুকিং', 'ক্যালেন্ডার ইন্টিগ্রেশন', 'পেমেন্ট সিস্টেম']
                  },
                  {
                    id: 'theme-3',
                    name: 'রেস্তোরাঁ অর্ডার থিম',
                    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
                    price: '৳ ১,৮০০',
                    originalPrice: '৳ ২,৫০০',
                    category: 'রেস্তোরাঁ থিম',
                    rating: 4.8,
                    reviews: 156,
                    features: ['অনলাইন অর্ডার', 'ডেলিভারি ট্র্যাকিং', 'মেনু ম্যানেজমেন্ট']
                  },
                  {
                    id: 'theme-4',
                    name: 'ডিজিটাল এজেন্সি থিম',
                    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop',
                    price: '৳ ৩,০০০',
                    originalPrice: '৳ ৪,২০০',
                    category: 'এজেন্সি থিম',
                    rating: 4.9,
                    reviews: 89,
                    features: ['পোর্টফোলিও গ্যালারি', 'কন্টাক্ট ফর্ম', 'টিম সেকশন']
                  }
                ].map((theme) => (
                  <Card key={theme.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all" onClick={() => navigate(`/digital-theme/${theme.id}`)}>
                    <div className="relative">
                      <img src={theme.image} alt={theme.name} className="aspect-square w-full object-cover" />
                      <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {theme.category}
                      </Badge>
                      <div className="absolute top-2 right-2 flex flex-col gap-2">
                        <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleBookmark(e, parseInt(theme.id.split('-')[1]))}>
                          <Heart className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleShare(e, theme)}>
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{theme.name}</h3>
                      <div className="flex items-center text-xs text-muted-foreground my-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{theme.rating}</span>
                        </div>
                        <span className="mx-1">•</span>
                        <span>{theme.reviews} রিভিউ</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-bold text-primary">{theme.price}</span>
                        {theme.originalPrice && <span className="text-xs text-muted-foreground line-through ml-2">{theme.originalPrice}</span>}
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {theme.features.slice(0, 2).map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px] px-1 py-0">
                              {feature}
                            </Badge>
                          ))}
                          {theme.features.length > 2 && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0">
                              +{theme.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Template Categories */}
              <div className="mt-6">
                <h3 className="text-md font-medium mb-3">টেমপ্লেট ক্যাটাগরি</h3>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {[
                    { name: 'ই-কমার্স', icon: '🛍️', count: 45 },
                    { name: 'সার্ভিস', icon: '🔧', count: 32 },
                    { name: 'রেস্তোরাঁ', icon: '🍽️', count: 28 },
                    { name: 'এজেন্সি', icon: '💼', count: 21 },
                    { name: 'পোর্টফোলিও', icon: '🎨', count: 38 },
                    { name: 'ব্লগ', icon: '📝', count: 19 }
                  ].map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer" onClick={() => navigate(`/digital-themes/category/${cat.name.toLowerCase()}`)}>
                      <div className="text-2xl mb-2">{cat.icon}</div>
                      <span className="text-xs font-medium">{cat.name}</span>
                      <span className="text-xs text-muted-foreground">{cat.count}+ থিম</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Featured Products */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
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
                          <Star className="h-3 w-3 mr-1" />
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
              
              {viewMode === 'grid' && <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.map(product => <Card key={product.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all relative" onClick={() => handleProductClick(product.id)}>
                      {product.isSponsored && <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 z-10">স্পন্সর্ড</Badge>}
                      <div className="relative">
                        <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={e => handleBookmark(e, product.id)}>
                            <Heart className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={e => handleShare(e, product)}>
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
                          {product.originalPrice && <span className="text-xs text-muted-foreground line-through ml-2">{product.originalPrice}</span>}
                        </div>
                      </CardContent>
                    </Card>)}
                </div>}
              
              {viewMode === 'map' && <div className="mb-4">
                  <div className="h-[450px] mb-4 border rounded-lg overflow-hidden">
                    <MapView listings={products.map(product => ({
                  id: product.id,
                  title: product.name,
                  location: product.location,
                  latitude: product.latitude,
                  longitude: product.longitude
                }))} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {products.slice(0, 3).map(product => <Card key={product.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all" onClick={() => handleProductClick(product.id)}>
                        <div className="flex h-24">
                          <div className="w-1/3">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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
                      </Card>)}
                  </div>
                </div>}
            </div>
          </TabsContent>
          
          <TabsContent value="services" className="mt-6">
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">সার্ভিস সেকশন</h3>
              <p className="text-muted-foreground mb-4">বিভিন্ন ধরনের সার্ভিস এখানে দেখানো হবে</p>
              <Button onClick={() => navigate('/services')}>
                সার্ভিস দেখুন
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="rental" className="mt-6">
            <div className="text-center py-12">
              <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">ভাড়া সেকশন</h3>
              <p className="text-muted-foreground mb-4">ভাড়ার জিনিসপত্র এখানে দেখানো হবে</p>
              <Button onClick={() => navigate('/rentals')}>
                ভাড়া দেখুন
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sellers" className="mt-6">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">টপ সেলার দোকান</h2>
                <Button variant="outline" size="sm">
                  সব সেলার দেখুন
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topSellers.map(seller => (
                  <Card key={seller.id} className="hover:shadow-md transition-all cursor-pointer" onClick={() => handleStoreClick(seller.id)}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium truncate">{seller.name}</h3>
                            {seller.verified && (
                              <Badge variant="outline" className="h-4 text-[10px] bg-blue-100 text-blue-600 border-blue-200">
                                ভেরিফাইড
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{seller.location}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs ml-1">{seller.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{seller.products}+ প্রোডাক্ট</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {seller.categories.map((category, idx) => (
                              <Badge key={idx} variant="secondary" className="text-[10px] px-1 py-0">
                                {category}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        দোকান দেখুন
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {shareItem && <SocialShareModal open={showShareModal} onOpenChange={setShowShareModal} item={shareItem} />}
    </div>
  );
};

export default Shopping;
