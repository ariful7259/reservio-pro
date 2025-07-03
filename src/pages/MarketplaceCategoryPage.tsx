
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, MapPin, Clock, Users, Share2, Heart, ArrowUpRight, CheckCircle, ShoppingCart } from 'lucide-react';
import SocialShareModal from '@/components/SocialShareModal';
import { useApp } from '@/context/AppContext';
import { marketplaceCategories } from '@/utils/marketplaceData';

const MarketplaceCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useApp();
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const category = marketplaceCategories.find(cat => cat.id === categoryId);
  
  useEffect(() => {
    if (!categoryId) {
      toast({
        title: "ক্যাটাগরি আইডি পাওয়া যায়নি",
        description: "URL এ ক্যাটাগরি আইডি অনুপস্থিত। মূল পৃষ্ঠায় ফিরে যাচ্ছি।",
        variant: "destructive"
      });
      navigate('/marketplace');
      return;
    }
    
    if (!category) {
      toast({
        title: "ক্যাটাগরি পাওয়া যায়নি",
        description: `দুঃখিত, "${categoryId}" ক্যাটাগরি পাওয়া যায়নি। মূল পৃষ্ঠায় ফিরে যাচ্ছি।`,
        variant: "destructive"
      });
      navigate('/marketplace');
    }
  }, [category, categoryId, navigate, toast]);

  // Sample products data for the selected category
  const allProducts = [{
    id: 1,
    title: language === 'bn' ? 'স্যামসাং গ্যালাক্সি S23' : 'Samsung Galaxy S23',
    seller: language === 'bn' ? 'টেক স্টোর' : 'Tech Store',
    category: 'electronics',
    subcategory: language === 'bn' ? 'মোবাইল ফোন' : 'Mobile Phone',
    location: language === 'bn' ? 'গুলশান, ঢাকা' : 'Gulshan, Dhaka',
    price: '৳৮৫,০০০',
    originalPrice: '৳৯৫,০০০',
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: true,
    condition: language === 'bn' ? 'নতুন' : 'New',
    discount: '11%'
  }, {
    id: 2,
    title: language === 'bn' ? 'আইফোন ১৪ প্রো' : 'iPhone 14 Pro',
    seller: language === 'bn' ? 'মোবাইল হাব' : 'Mobile Hub',
    category: 'electronics',
    subcategory: language === 'bn' ? 'মোবাইল ফোন' : 'Mobile Phone',
    location: language === 'bn' ? 'বনানী, ঢাকা' : 'Banani, Dhaka',
    price: '১,২৫,০০০',
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    isVerified: true,
    condition: language === 'bn' ? 'নতুন' : 'New'
  }];

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = product.category === categoryId;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubcategory = selectedSubcategory === 'all' || product.subcategory === selectedSubcategory;
    const matchesLocation = selectedLocation === 'all' || product.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    // Price range filtering
    let matchesPrice = true;
    if (priceRange.min || priceRange.max) {
      const productPrice = parseInt(product.price.replace(/[৳,]/g, ''));
      const minPrice = priceRange.min ? parseInt(priceRange.min) : 0;
      const maxPrice = priceRange.max ? parseInt(priceRange.max) : Infinity;
      matchesPrice = productPrice >= minPrice && productPrice <= maxPrice;
    }
    
    return matchesCategory && matchesSearch && matchesSubcategory && matchesLocation && matchesPrice;
  });

  const handleShare = (e: React.MouseEvent, product: any) => {
    e.stopPropagation();
    setShareItem({
      ...product,
      type: 'product',
    });
    setShowShareModal(true);
  };

  const handleWishlist = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: language === 'bn' ? "পছন্দের তালিকায় যোগ হয়েছে" : "Added to Wishlist",
      description: language === 'bn' ? "পণ্যটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে" : "Product added to your wishlist"
    });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/marketplace/product/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    toast({
      title: language === 'bn' ? "কার্টে যোগ হয়েছে" : "Added to Cart",
      description: language === 'bn' ? "পণ্যটি আপনার কার্টে যোগ করা হয়েছে" : "Product added to your cart"
    });
  };

  if (!category) {
    return null;
  }

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/marketplace')}
          className="mb-4"
        >
          ← {language === 'bn' ? 'ফিরে যান' : 'Back'}
        </Button>
        
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">
            {language === 'bn' ? category.name : category.nameEn}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {language === 'bn' ? 'টি পণ্য পাওয়া গেছে' : ' products found'}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder={language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search products...'} 
            className="pl-10" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Category Info Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center shadow-lg border-2 border-white/20`}>
            <div className={category.iconColor}>
              {React.cloneElement(category.icon, { className: "h-8 w-8" })}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold">
              {language === 'bn' ? category.name : category.nameEn}
            </h3>
            <p className="text-sm text-muted-foreground">
              {category.count} {language === 'bn' ? 'টি পণ্য উপলব্ধ' : 'products available'}
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">
            {language === 'bn' ? 'সাব-ক্যাটাগরি:' : 'Subcategories:'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((sub, index) => (
              <Badge 
                key={index} 
                variant={selectedSubcategory === sub ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => setSelectedSubcategory(selectedSubcategory === sub ? 'all' : sub)}
              >
                {sub}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Products List */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {language === 'bn' ? 'উপলব্ধ পণ্য সমূহ' : 'Available Products'}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredProducts.length} {language === 'bn' ? 'টি পণ্য পাওয়া গেছে' : ' products found'}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <Card 
              key={product.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" 
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  {product.discount && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="destructive" className="text-xs">
                        {product.discount} ছাড়
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white h-8 w-8 rounded-full" 
                      onClick={e => handleWishlist(e, product.id)}
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white h-8 w-8 rounded-full" 
                      onClick={e => handleShare(e, product)}
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.subcategory}
                    </Badge>
                    {product.isVerified && (
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        <CheckCircle className="h-3 w-3" /> 
                        {language === 'bn' ? 'ভেরিফায়েড' : 'Verified'}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.seller}</p>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{product.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs mb-3">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{product.rating}</span>
                    </div>
                    <span>({product.reviews} {language === 'bn' ? 'রিভিউ' : 'reviews'})</span>
                    <Badge variant="outline" className="text-xs">
                      {product.condition}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary text-lg">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="gap-1" onClick={e => handleAddToCart(e, product.id)}>
                      <ShoppingCart className="h-3 w-3" />
                      {language === 'bn' ? 'কার্ট' : 'Cart'}
                    </Button>
                  </div>
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

export default MarketplaceCategoryPage;
