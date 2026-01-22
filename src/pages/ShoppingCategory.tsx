import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  MapPin, 
  Filter,
  ChevronLeft,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  ArrowUp,
  ArrowDown,
  Clock,
  LayoutGrid,
  Map as MapIcon,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MapView from '@/components/MapView';
import SocialShareModal from '@/components/SocialShareModal';
import ProductCard from '@/components/ProductCard';

const ShoppingCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([1000, 15000]);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const categories = [
    { id: "electronics", name: "এলেকট্রনিক্স" },
    { id: "fashion", name: "ফ্যাশন" },
    { id: "grocery", name: "গ্রোসারি" },
    { id: "mobile", name: "মোবাইল" },
    { id: "healthcare", name: "হেলথকেয়ার" },
    { id: "books", name: "বই" },
    { id: "kitchen", name: "কিচেন" },
    { id: "kids", name: "বাচ্চাদের" },
    { id: "computer", name: "কম্পিউটার" },
    { id: "camera", name: "ক্যামেরা" },
    { id: "audio", name: "অডিও" },
    { id: "smartwatch", name: "স্মার্টওয়াচ" },
    { id: "sports", name: "স্পোর্টস" },
    { id: "auto", name: "অটো" },
    { id: "home", name: "হোম" },
    { id: "other", name: "অন্যান্য" },
  ];

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
    other: 'bg-slate-100 text-slate-600',
  };

  const mockProducts = [
    {
      id: 1,
      name: "ওয়ায়ারলেস হেডফোন",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 2,500",
      originalPrice: "৳ 3,200",
      location: "গুলশান, ���াকা",
      rating: 4.8,
      reviews: 245,
      category: "electronics",
      isSponsored: true
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
      category: "fashion"
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
      category: "electronics"
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
      category: "fashion",
      isSponsored: true
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
      category: "electronics"
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
      category: "electronics"
    },
  ];

  const subcategories = {
    electronics: ["ল্যাপটপ", "মোবাইল এক্সেসরিজ", "কম্পিউটার পার্টস", "গেমিং"],
    fashion: ["পুরুষদের", "মহিলাদের", "শীতের পোশাক", "জুতা"],
    mobile: ["স্মার্টফোন", "বেসিক ফোন", "ট্যাবলেট", "যন্ত্রাংশ"],
    healthcare: ["ভিটামিন", "মাস্ক", "মেডিক্যাল ডিভাইস", "পার্সোনাল কেয়ার"],
    books: ["ফিকশন", "নন-ফিকশন", "ধর্মীয়", "একাডেমিক"],
    kitchen: ["কুকওয়্যার", "ইলেকট্রনিক", "কাটলারি", "বাসন"],
    kids: ["খেলনা", "শিশুর পোশাক", "স্কুল", "বেবি প্রোডাক্টস"],
    computer: ["ল্যাপটপ", "ডেস্কটপ", "মনিটর", "এক্সেসরিজ"],
    camera: ["ডিএসএলআর", "মিররলেস", "ওয়েবক্যাম", "ভিডিও ক্যামেরা"],
    audio: ["হেডফোন", "স্পিকার", "মাইক্রোফোন", "ইয়ারফোন"],
    smartwatch: ["স্মার্ট ওয়াচ", "ফিটনেস ট্র্যাকার", "রানিং ওয়াচ", "অ্যাকসেসরিজ"],
    sports: ["ক্রিকেট", "ফুটবল", "স্বাস্থ্য সামগ্রী", "সাইকেল"],
    auto: ["���ার অ্যাকসেসরিজ", "মোটরসাইকেল গিয়ার", "পার্��স", "টুলস"],
    home: ["আসবাবপত্র", "আলোকসজ্জা", "গার্ডেন", "ডেকোর"],
    grocery: ["খাদ্য", "পানীয়", "মসলা", "স্ন্যাকস"],
    other: ["গিফট", "পার্টি সামগ্রী", "অফিস সামগ্রী", "পেট সামগ্রী"],
  };

  useEffect(() => {
    if (id) {
      const category = categories.find(c => c.id === id);
      if (category) {
        setCategoryName(category.name);
      }

      const filteredProducts = mockProducts.filter(product => product.category === id);
      setProducts(filteredProducts);
    }
  }, [id]);

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/shopping/product/${productId}`);
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

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "অনুসন্ধান করা হচ্ছে",
      description: `"${searchTerm}" এর জন্য ফলাফল দেখানো হচ্ছে`,
    });
  };

  const getSubcategories = (categoryId: string | undefined) => {
    if (!categoryId || !subcategories[categoryId as keyof typeof subcategories]) {
      return [];
    }
    return subcategories[categoryId as keyof typeof subcategories];
  };

  const currentSubcategories = getSubcategories(id);

  const productsWithGeoData = products.map(product => ({
    ...product,
    latitude: 23.7937 + (Math.random() * 0.1 - 0.05),
    longitude: 90.4065 + (Math.random() * 0.1 - 0.05),
  }));

  const handleStoreClick = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{categoryName}</h1>

        <div className="ml-auto flex gap-2">
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
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder={`${categoryName} প্রোডাক্ট খুঁজুন`} 
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
            <Button variant="ghost" size="sm" onClick={handleFilterToggle}>
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">সাব-ক্যাটেগরি</h3>
              <div className="grid grid-cols-2 gap-2">
                {currentSubcategories.map((subcat, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="justify-start"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${categoryIconColors[id as keyof typeof categoryIconColors] || 'bg-primary/10'}`}>
                      <Star className="h-4 w-4" />
                    </div>
                    {subcat}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">দাম সীমা</h3>
              <Slider
                value={priceRange}
                max={20000}
                step={500}
                onValueChange={handlePriceRangeChange}
              />
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
            
            <div>
              <h3 className="text-sm font-medium mb-2">ডেলিভারি সময়</h3>
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
            
            <div>
              <h3 className="text-sm font-medium mb-2">অফার/প্রমোশন</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <input type="checkbox" id="discount" className="mr-2" />
                  <label htmlFor="discount" className="text-sm">ডিসকাউন্টেড</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="freeDelivery" className="mr-2" />
                  <label htmlFor="freeDelivery" className="text-sm">ফ্রি ডেলিভারি</label>
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

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${categoryIconColors[id as keyof typeof categoryIconColors] || 'bg-primary/10'} flex items-center justify-center`}>
              <Star className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-medium">{categoryName} প্রোডাক্ট</h2>
            <Badge variant="outline">{products.length} আইটেম</Badge>
          </div>
          
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

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="compact"
                  onClick={() => handleProductClick(product.id)}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-muted-foreground">এই ক্যাটাগরিতে কোন প্রোডাক্ট পাওয়া যায়নি</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate('/shopping')}>
                  সকল প্রোডাক্ট দেখুন
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <div className="h-[450px] mb-4 border rounded-lg overflow-hidden">
              <MapView 
                listings={productsWithGeoData.map(product => ({
                  id: product.id,
                  title: product.name,
                  location: product.location,
                  latitude: product.latitude,
                  longitude: product.longitude
                }))}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
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

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">এই ক্যাটাগরিতে টপ বিক্রেতা</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((seller) => (
            <Card key={seller} className="hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium flex items-center gap-1">
                    দোকান {seller}
                    {seller < 3 && (
                      <Badge variant="outline" className="h-4 text-[10px] bg-blue-100 text-blue-600 border-blue-200">ভেরিফাইড</Badge>
                    )}
                  </h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{4.5 + seller * 0.1}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{50 + seller * 25}+ প্রোডাক্ট</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 w-full"
                    onClick={() => handleStoreClick(seller)}
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

export default ShoppingCategory;
