
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
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';

const ShoppingCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);

  // Mock categories data
  const categories = [
    { id: "electronics", name: "এলেকট্রনিক্স" },
    { id: "fashion", name: "ফ্যাশন" },
    { id: "grocery", name: "গ্রোসারি" },
    { id: "mobile", name: "মোবাইল" },
    { id: "healthcare", name: "হেলথকেয়ার" },
    { id: "books", name: "বই" },
    { id: "kitchen", name: "কিচেন" },
    { id: "kids", name: "বাচ্চাদের" },
  ];

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "ওয়ায়ারলেস হেডফোন",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      price: "৳ 2,500",
      originalPrice: "৳ 3,200",
      location: "গুলশান, ঢাকা",
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

  useEffect(() => {
    if (id) {
      // Find category name
      const category = categories.find(c => c.id === id);
      if (category) {
        setCategoryName(category.name);
      }

      // Filter products by category ID
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

  const handleShare = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: "প্রোডাক্টটি শেয়ার করার লিংক কপি করা হয়েছে",
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{categoryName}</h1>
      </div>

      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`${categoryName} প্রোডাক্ট খুঁজুন`} className="pl-9 pr-16" />
          <Button 
            variant="default" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={handleFilterToggle}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">সাব-ক্যাটেগরি</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Star className="h-4 w-4 mr-2" /> পপুলার
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Star className="h-4 w-4 mr-2" /> নতুন
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
                  </label>
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {products.length > 0 ? (
          products.map(product => (
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
    </div>
  );
};

export default ShoppingCategory;
