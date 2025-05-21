import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  Code, 
  Headphones, 
  Video,
  Layout,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  LayoutList,
  Star,
  Heart,
  ShoppingCart,
  X,
  CircleDollarSign,
  History,
  Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useShoppingState, useShoppingStateWithToast } from '@/hooks/useShoppingState';
import { useIsMobile } from '@/hooks/use-mobile';

interface Product {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'ebook' | 'template' | 'software' | 'audio' | 'video';
  price: string;
  rating: number;
  author: string;
  image: string;
  sales: number;
}

const DigitalProductsMarketplace = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const { isInWishlist } = useShoppingState();
  const { addToCartWithToast, toggleWishlistWithToast } = useShoppingStateWithToast();
  const isMobile = useIsMobile();
  
  // UI state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(
    searchParams.get('view') === 'list' ? 'list' : 'grid'
  );
  const [filterVisible, setFilterVisible] = useState(false);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [currentCategory, setCurrentCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minRating, setMinRating] = useState<number>(parseFloat(searchParams.get('rating') || '0'));
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recommended');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Load search history from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('digital-marketplace-searches');
    if (savedSearches) {
      setSearchHistory(JSON.parse(savedSearches).slice(0, 5));
    }
  }, []);
  
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('digital-marketplace-searches');
    toast({
      title: "সার্চ হিস্টোরি মুছে ফেলা হয়েছে",
      description: "আপনার সমস্ত সার্চ হিস্টোরি মুছে ফেলা হয়েছে।",
      variant: "default",
    });
  };
  
  const updateSearchParams = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    
    setSearchParams(newSearchParams);
  };
  
  // Update view mode in URL
  useEffect(() => {
    updateSearchParams({ view: viewMode });
  }, [viewMode]);
  
  const productTypes = [
    { name: 'কোর্স', icon: <BookOpen className="h-4 w-4" />, value: 'course' },
    { name: 'ইবুক', icon: <FileText className="h-4 w-4" />, value: 'ebook' },
    { name: 'টেমপ্লেট', icon: <Layout className="h-4 w-4" />, value: 'template' },
    { name: 'সফটওয়্যার', icon: <Code className="h-4 w-4" />, value: 'software' },
    { name: 'অডিও', icon: <Headphones className="h-4 w-4" />, value: 'audio' },
    { name: 'ভিডিও', icon: <Video className="h-4 w-4" />, value: 'video' },
  ];

  const demoProducts: Product[] = [
    {
      id: '1',
      title: 'ফ্রিল্যান্সিং কোর্স - ওয়েব ডেভেলপমেন্ট',
      description: 'ওয়েব ডেভেলপমেন্ট শেখার মাধ্যমে ঘরে বসে আয় করুন',
      type: 'course',
      price: '৳৫,৯৯৯',
      rating: 4.8,
      author: 'মোঃ আমিনুল ইসলাম',
      image: 'https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 2450
    },
    {
      id: '2',
      title: 'ডিজিটাল মার্কেটিং - পূর্ণাঙ্গ গাইডবুক',
      description: 'আপনার ব্যবসা বা ফ্রিল্যান্সিং স্কিল বাড়ানোর জন্য সম্পূর্ণ গাইড',
      type: 'ebook',
      price: '৳৯৯৯',
      rating: 4.5,
      author: 'তানিয়া আক্তার',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 1835
    },
    {
      id: '3',
      title: 'প্রিমিয়াম ওয়েবসাইট টেমপ্লেট কালেকশন',
      description: 'আধুনিক ডিজাইনের সাথে ১০০+ প্রফেশনাল টেমপ্লেট',
      type: 'template',
      price: '৳১,৮৯৯',
      rating: 4.7,
      author: 'ইনোভেট সলিউশন',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 740
    },
    {
      id: '4',
      title: 'সোশ্যাল মিডিয়া অটোমেশন সফটওয়্যার',
      description: 'ফেসবুক, ইনস্টাগ্রাম, ইউটিউবের কন্টেন্ট অটোমেটিক পোস্ট করুন',
      type: 'software',
      price: '৳২,৪৯৯',
      rating: 4.3,
      author: 'টেকজেন লিমিটেড',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 328
    },
    {
      id: '5',
      title: 'মেডিটেশন অডিও সিরিজ - শান্তির পথে',
      description: 'প্রতিদিনের চাপ থেকে মুক্তির জন্য গাইডেড মেডিটেশন সিরিজ',
      type: 'audio',
      price: '৳৮৯৯',
      rating: 4.9,
      author: 'ড. নাসরিন জাহান',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 1256
    },
    {
      id: '6',
      title: 'ফাইনান্সিয়াল প্ল্যানিং মাস্টার কোর্স',
      description: 'আর্থিক স্বাধীনতার পথে - সম্পদ বৃদ্ধির কৌশল',
      type: 'course',
      price: '৳৪,৪৯৯',
      rating: 4.6,
      author: 'সাদিয়া সুলতানা, সিএফএ',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 872
    },
    {
      id: '7',
      title: 'গ্রাফিক ডিজাইন রিসোর্স প্যাক',
      description: '১০০০+ ফন্ট, আইকন, টেমপ্লেট, মকআপ এবং স্টক ফটো',
      type: 'template',
      price: '৳১,২৯৯',
      rating: 4.7,
      author: 'ক্রিয়েটিভ মাইন্ডস',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 2103
    },
    {
      id: '8',
      title: 'ই-কমার্স বিজনেস গাইড - সম্পূর্ণ প্যাকেজ',
      description: 'অনলাইন ব্যবসা শুরু থেকে স্কেল করার সম্পূর্ণ রোডম্যাপ',
      type: 'ebook',
      price: '৳১,৪৯৯',
      rating: 4.8,
      author: 'তামিম চৌধুরী',
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      sales: 1765
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add to search history
    if (searchTerm.trim() && !searchHistory.includes(searchTerm)) {
      const updatedHistory = [searchTerm, ...searchHistory].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('digital-marketplace-searches', JSON.stringify(updatedHistory));
    }
    
    updateSearchParams({ search: searchTerm || null });
    
    toast({
      title: "অনুসন্ধান করা হচ্ছে",
      description: searchTerm ? `"${searchTerm}" এর জন্য ফলাফল দেখানো হচ্ছে` : "সব প্রোডাক্ট দেখানো হচ্ছে",
    });
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
    updateSearchParams({ search: null });
  };
  
  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    updateSearchParams({ category: category === 'all' ? null : category });
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateSearchParams({ sort: value });
  };
  
  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };
  
  const handleRatingChange = (value: number[]) => {
    setMinRating(value[0]);
    updateSearchParams({ rating: value[0].toString() });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };
  
  const handleAddToCart = (product: Product) => {
    addToCartWithToast({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
  };
  
  const handleAddToWishlist = (product: Product) => {
    toggleWishlistWithToast({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image
    });
  };
  
  const handleProductClick = (productId: string) => {
    navigate(`/digital-products/${productId}`);
  };
  
  // Apply filters to products
  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      // Filter by search term
      if (searchTerm && !product.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by category
      if (currentCategory !== 'all' && product.type !== currentCategory) {
        return false;
      }
      
      // Filter by rating
      if (product.rating < minRating) {
        return false;
      }
      
      // Filter by price range
      const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
      if (numericPrice < priceRange[0] || numericPrice > priceRange[1]) {
        return false;
      }
      
      return true;
    });
  };
  
  // Sort products
  const sortProducts = (products: Product[]) => {
    const productsCopy = [...products];
    
    switch (sortBy) {
      case 'price_low':
        return productsCopy.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
          return priceA - priceB;
        });
      case 'price_high':
        return productsCopy.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
          return priceB - priceA;
        });
      case 'rating':
        return productsCopy.sort((a, b) => b.rating - a.rating);
      case 'popular':
        return productsCopy.sort((a, b) => b.sales - a.sales);
      case 'newest':
        // For demo purposes, we'll just reverse the array
        return productsCopy.reverse();
      default:
        // 'recommended' - leave as is for demo
        return productsCopy;
    }
  };
  
  const filteredProducts = sortProducts(filterProducts(demoProducts));
  
  const ProductGrid = ({ products }: { products: Product[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          <div className="relative aspect-[4/3]">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <Badge 
              className="absolute top-2 right-2"
              variant="secondary"
            >
              {productTypes.find(t => t.value === product.type)?.name}
            </Badge>
          </div>
          <CardContent className={`p-3 ${isMobile ? 'px-2' : 'p-4'}`}>
            <h3 className={`font-medium line-clamp-1 ${isMobile ? 'text-sm' : ''}`}>{product.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">{product.author}</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs ml-1">{product.rating}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className={`p-3 ${isMobile ? 'px-2 pt-0' : 'p-4 pt-0'} flex justify-between items-center`}>
            <span className={`font-bold text-primary ${isMobile ? 'text-sm' : ''}`}>{product.price}</span>
            <div className="flex gap-1 md:gap-2">
              <Button 
                size={isMobile ? "sm" : "icon"} 
                variant="ghost"
                className={isMobile ? "h-8 w-8 p-0" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(product);
                }}
              >
                <Heart 
                  className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
              <Button 
                size="sm"
                className={isMobile ? "h-8 px-2 text-xs" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-1 md:mr-2" />
                {isMobile ? "কিনুন" : "কিনুন"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
  
  const ProductList = ({ products }: { products: Product[] }) => (
    <div className="space-y-4">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 h-48">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <Badge 
                className="absolute top-2 right-2"
                variant="secondary"
              >
                {productTypes.find(t => t.value === product.type)?.name}
              </Badge>
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">{product.author}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs ml-1">{product.rating}</span>
                      <span className="text-xs text-muted-foreground ml-2">({product.sales} বিক্রি)</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-primary">{product.price}</span>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(product);
                      }}
                    >
                      <Heart 
                        className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      কিনুন
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const NoProductsFound = () => (
    <div className="text-center py-16">
      <p className="text-muted-foreground mb-4">কোন প্রোডাক্ট পাওয়া যায়নি</p>
      <Button 
        variant="outline" 
        onClick={() => {
          setSearchTerm('');
          setCurrentCategory('all');
          setPriceRange([0, 10000]);
          setMinRating(0);
          setSortBy('recommended');
          updateSearchParams({
            search: null,
            category: null,
            rating: null,
            sort: 'recommended'
          });
        }}
      >
        ফিল্টার রিসেট করুন
      </Button>
    </div>
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="প্রোডাক্ট খুঁজুন..." 
            className="pl-9 pr-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button 
            type="submit"
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7"
          >
            অনুসন্ধান
          </Button>
          
          {/* Search History Popover */}
          {searchHistory.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 h-7 w-7"
                >
                  <History className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">সাম্প্রতিক অনুসন্ধান</h4>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={clearSearchHistory}
                  >
                    <Trash className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
                <Separator className="mb-2" />
                <ScrollArea className="max-h-60">
                  <div className="space-y-1">
                    {searchHistory.map((term, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                        onClick={() => {
                          setSearchTerm(term);
                          updateSearchParams({ search: term });
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <History className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{term}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={(e) => {
                            e.stopPropagation();
                            const newHistory = searchHistory.filter(t => t !== term);
                            setSearchHistory(newHistory);
                            localStorage.setItem('digital-marketplace-searches', JSON.stringify(newHistory));
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          )}
        </form>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className={`${isMobile ? 'w-[120px]' : 'w-[160px]'} `}>
              <SelectValue placeholder="সর্টিং" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">রেকমেন্ডেড</SelectItem>
              <SelectItem value="popular">জনপ্রিয়</SelectItem>
              <SelectItem value="price_high">দাম (সর্বোচ্চ থেকে)</SelectItem>
              <SelectItem value="price_low">দাম (সর্বনিম্ন থেকে)</SelectItem>
              <SelectItem value="rating">রেটিং</SelectItem>
              <SelectItem value="newest">সর্বশেষ</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleViewModeChange('grid')} 
            className={viewMode === 'grid' ? 'bg-primary/10' : ''}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleViewModeChange('list')} 
            className={viewMode === 'list' ? 'bg-primary/10' : ''}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">ফিল্টার</span>
            {filterVisible ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      {filterVisible && (
        <Card className="p-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">মূল্য সীমা</h4>
              <div className="px-3">
                <Slider
                  value={priceRange}
                  max={10000}
                  step={100}
                  minStepsBetweenThumbs={1}
                  onValueChange={handlePriceRangeChange}
                  className="my-6"
                />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">৳{priceRange[0]}</span>
                  <span className="text-sm text-muted-foreground">৳{priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">ন্যূনতম রেটিং</h4>
              <div className="px-3">
                <Slider
                  value={[minRating]}
                  max={5}
                  step={0.5}
                  onValueChange={handleRatingChange}
                  className="my-6"
                />
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">{minRating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">এবং উপরে</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">প্রোডাক্ট টাইপ</h4>
              <div className="grid grid-cols-2 gap-2">
                {productTypes.map((type, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.value}`} 
                      checked={currentCategory === 'all' || currentCategory === type.value}
                      onCheckedChange={() => {
                        if (currentCategory === type.value) {
                          handleCategoryChange('all');
                        } else {
                          handleCategoryChange(type.value);
                        }
                      }}
                    />
                    <label 
                      htmlFor={`type-${type.value}`}
                      className="text-sm flex items-center cursor-pointer"
                    >
                      {type.icon}
                      <span className="ml-1">{type.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setCurrentCategory('all');
                setPriceRange([0, 10000]);
                setMinRating(0);
                setSortBy('recommended');
                updateSearchParams({
                  search: null,
                  category: null,
                  rating: null,
                  sort: 'recommended'
                });
              }}
            >
              রিসেট
            </Button>
            <Button
              onClick={() => {
                updateSearchParams({
                  category: currentCategory === 'all' ? null : currentCategory,
                  rating: minRating > 0 ? minRating.toString() : null,
                  // We don't save price range in URL for simplicity
                });
                setFilterVisible(false);
              }}
            >
              প্রয়োগ করুন
            </Button>
          </div>
        </Card>
      )}

      {/* Active Filter Tags */}
      {(searchTerm || currentCategory !== 'all' || minRating > 0 || sortBy !== 'recommended') && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="outline" className="flex items-center gap-1">
              সার্চ: {searchTerm}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => {
                  setSearchTerm('');
                  updateSearchParams({ search: null });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {currentCategory !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1">
              ক্যাটাগরি: {productTypes.find(t => t.value === currentCategory)?.name}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => {
                  setCurrentCategory('all');
                  updateSearchParams({ category: null });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {minRating > 0 && (
            <Badge variant="outline" className="flex items-center gap-1">
              রেটিং: <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {minRating}+
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => {
                  setMinRating(0);
                  updateSearchParams({ rating: null });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {sortBy !== 'recommended' && (
            <Badge variant="outline" className="flex items-center gap-1">
              সর্ট: {
                sortBy === 'popular' ? 'জনপ্রিয়' : 
                sortBy === 'price_high' ? 'দাম (সর্বোচ্চ থেকে)' :
                sortBy === 'price_low' ? 'দাম (সর্বনিম্ন থেকে)' :
                sortBy === 'rating' ? 'রেটিং' :
                sortBy === 'newest' ? 'সর্বশেষ' : ''
              }
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1" 
                onClick={() => {
                  setSortBy('recommended');
                  updateSearchParams({ sort: 'recommended' });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7"
            onClick={() => {
              setSearchTerm('');
              setCurrentCategory('all');
              setPriceRange([0, 10000]);
              setMinRating(0);
              setSortBy('recommended');
              updateSearchParams({
                search: null,
                category: null,
                rating: null,
                sort: 'recommended'
              });
            }}
          >
            সব ফিল্টার মুছুন
          </Button>
        </div>
      )}

      {/* Categories */}
      <Tabs 
        defaultValue="all" 
        value={currentCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start whitespace-nowrap">
          <TabsTrigger value="all">সব</TabsTrigger>
          {productTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value} className="flex items-center gap-1">
              {type.icon} {type.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Product Display */}
      <div className="min-h-[400px]">
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <ProductList products={filteredProducts} />
          )
        ) : (
          <NoProductsFound />
        )}
      </div>
      
      {/* Pagination - For future implementation */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <Button variant="outline" className="join-item">«</Button>
            <Button variant="outline" className="join-item">১</Button>
            <Button variant="default" className="join-item">২</Button>
            <Button variant="outline" className="join-item">৩</Button>
            <Button variant="outline" className="join-item">»</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalProductsMarketplace;
