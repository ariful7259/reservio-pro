import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Star, 
  MapPin,
  ShoppingCart,
  Zap
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MarketplaceCategoryGrid } from '@/components/marketplace/MarketplaceCategoryGrid';
import FlashDealsSection from '@/components/marketplace/FlashDealsSection';
import UsedProductsSection from '@/components/marketplace/UsedProductsSection';
import LocalBrandsSection from '@/components/marketplace/LocalBrandsSection';
import MarketplaceCategoryFilterForm from '@/components/marketplace/MarketplaceCategoryFilterForm';
import { marketplaceCategories } from '@/utils/marketplaceData';
import { useShoppingStateWithToast } from '@/hooks/useShoppingState';
import { useToast } from '@/hooks/use-toast';

const Marketplace = () => {
  const { language, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { addToCartWithToast } = useShoppingStateWithToast();
  const { toast } = useToast();

  const featuredProducts = [
    {
      id: 1,
      title: language === 'bn' ? 'স্মার্ট ওয়াচ' : 'Smart Watch',
      price: '৳ ৫,৫০০',
      originalPrice: '৳ ৭,০০০',
      rating: 4.5,
      reviews: 128,
      seller: language === 'bn' ? 'টেক স্টোর' : 'Tech Store',
      location: language === 'bn' ? 'ঢাকা' : 'Dhaka',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      discount: 21
    },
    {
      id: 2,
      title: language === 'bn' ? 'ব্লুটুথ হেডফোন' : 'Bluetooth Headphones',
      price: '৳ ২,৮০০',
      originalPrice: '৳ ৩,৫০০',
      rating: 4.7,
      reviews: 95,
      seller: language === 'bn' ? 'অডিও হাব' : 'Audio Hub',
      location: language === 'bn' ? 'চট্টগ্রাম' : 'Chittagong',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      discount: 20
    },
    {
      id: 3,
      title: language === 'bn' ? 'ল্যাপটপ ব্যাগ' : 'Laptop Bag',
      price: '৳ ১,২০০',
      originalPrice: '৳ ১,৮০০',
      rating: 4.3,
      reviews: 67,
      seller: language === 'bn' ? 'ব্যাগ ওয়ার্ল্ড' : 'Bag World',
      location: language === 'bn' ? 'সিলেট' : 'Sylhet',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      discount: 33
    },
    {
      id: 4,
      title: language === 'bn' ? 'মোবাইল চার্জার' : 'Mobile Charger',
      price: '৳ ৮৫০',
      originalPrice: '৳ ১,২০০',
      rating: 4.6,
      reviews: 203,
      seller: language === 'bn' ? 'মোবাইল এক্সেসরিজ' : 'Mobile Accessories',
      location: language === 'bn' ? 'রাজশাহী' : 'Rajshahi',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      discount: 29
    }
  ];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || product.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    // Filter by category if one is selected
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      const category = marketplaceCategories.find(c => c.id === selectedCategory);
      if (category) {
        // For now, match by category name (you can extend this logic)
        matchesCategory = product.title.toLowerCase().includes(category.nameEn.toLowerCase()) ||
                         product.title.toLowerCase().includes(category.name.toLowerCase());
      }
    }
    
    // Filter by subcategory if one is selected
    let matchesSubcategory = true;
    if (selectedSubcategory !== 'all' && selectedCategory !== 'all') {
      matchesSubcategory = product.title.toLowerCase().includes(selectedSubcategory.toLowerCase());
    }
    
    return matchesSearch && matchesLocation && matchesCategory && matchesSubcategory;
  });

  const handleAddToCart = (product: any) => {
    addToCartWithToast({
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.image
    });
  };

  const handleBuyNow = (product: any) => {
    // Add to cart first
    addToCartWithToast({
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.image
    });
    
    // Show buy now message
    toast({
      title: "অর্ডার প্রসেসিং",
      description: `${product.title} এর অর্ডার প্রসেস করা হচ্ছে...`,
    });
    
    // Simulate redirect to checkout
    setTimeout(() => {
      toast({
        title: "চেকআউট পেইজে পাঠানো হচ্ছে",
        description: "আপনার অর্ডার সম্পূর্ণ করতে চেকআউট পেইজে যাচ্ছেন...",
      });
    }, 1000);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {language === 'bn' ? 'মার্কেটপ্লেস' : 'Marketplace'}
        </h1>
        <p className="text-muted-foreground">
          {language === 'bn' ? 'আপনার পছন্দের পণ্য খুঁজে নিন' : 'Find your favorite products'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder={language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search products...'} 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            className="pl-10" 
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <div className="flex border rounded-lg">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'ghost'} 
            size="icon" 
            onClick={() => setViewMode('grid')} 
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'ghost'} 
            size="icon" 
            onClick={() => setViewMode('list')} 
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Special Sections */}
      <FlashDealsSection />
      <UsedProductsSection />
      <LocalBrandsSection />

      {/* Category Grid - Mobile: 4 columns */}
      <MarketplaceCategoryGrid 
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Selected Category Filter Form */}
      {selectedCategory !== 'all' && (
        <div className="mb-8">
          {(() => {
            const category = marketplaceCategories.find(c => c.id === selectedCategory);
            if (!category) return null;
            
            return (
              <div className="space-y-4">
                <MarketplaceCategoryFilterForm
                  category={category}
                  selectedSubcategory={selectedSubcategory}
                  selectedLocation={selectedLocation}
                  priceRange={priceRange}
                  onSubcategoryChange={setSelectedSubcategory}
                  onLocationChange={setSelectedLocation}
                  onPriceRangeChange={setPriceRange}
                />
                
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                      <div className={category.iconColor}>
                        {category.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {language === 'bn' ? category.name : category.nameEn}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {filteredProducts.length} {language === 'bn' ? 'পণ্য পাওয়া গেছে' : 'products found'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Category Products */}
                  <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-4'}>
                    {filteredProducts.length > 0 ? filteredProducts.map(product => (
                      <Card key={product.id} className="hover:shadow-md transition-all cursor-pointer overflow-hidden">
                        {viewMode === 'grid' ? (
                          <CardContent className="p-0">
                            <div className="relative">
                              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                              <div className="absolute top-2 left-2">
                                <Badge variant="destructive" className="text-xs">
                                  -{product.discount}%
                                </Badge>
                              </div>
                              <Button variant="outline" size="icon" className="absolute top-2 right-2 bg-white h-8 w-8 rounded-full">
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h3>
                              <div className="flex items-center gap-1 mb-2">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{product.rating}</span>
                                <span className="text-xs text-muted-foreground">({product.reviews})</span>
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-primary">{product.price}</span>
                                <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                                <MapPin className="h-3 w-3" />
                                <span>{product.location}</span>
                              </div>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-1" />
                                  {language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => handleBuyNow(product)}
                                >
                                  <Zap className="h-4 w-4 mr-1" />
                                  {language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        ) : (
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="relative w-24 h-24 flex-shrink-0">
                                <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded" />
                                <Badge variant="destructive" className="absolute -top-1 -left-1 text-xs">
                                  -{product.discount}%
                                </Badge>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium mb-1">{product.title}</h3>
                                <div className="flex items-center gap-1 mb-2">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs">{product.rating}</span>
                                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-bold text-primary">{product.price}</span>
                                  <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    <span>{product.location}</span>
                                  </div>
                                  <Button variant="outline" size="icon" className="h-8 w-8">
                                    <Heart className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="flex-1"
                                    onClick={() => handleAddToCart(product)}
                                  >
                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                    কার্ট
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => handleBuyNow(product)}
                                  >
                                    <Zap className="h-4 w-4 mr-1" />
                                    কিনুন
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    )) : (
                      <div className="col-span-full text-center py-8">
                        <p className="text-muted-foreground">
                          {language === 'bn' ? 'এই ক্যাটাগরিতে কোন পণ্য পাওয়া যায়নি' : 'No products found in this category'}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            );
          })()}
        </div>
      )}

      {/* Featured Products */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {language === 'bn' ? 'ফিচার্ড প্রোডাক্ট' : 'Featured Products'}
          </h2>
          <Button variant="outline" size="sm">
            {language === 'bn' ? 'সব দেখুন' : 'View All'}
          </Button>
        </div>
        
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-4'}>
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-md transition-all cursor-pointer overflow-hidden">
              {viewMode === 'grid' ? (
                <CardContent className="p-0">
                  <div className="relative">
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 left-2">
                      <Badge variant="destructive" className="text-xs">
                        -{product.discount}%
                      </Badge>
                    </div>
                    <Button variant="outline" size="icon" className="absolute top-2 right-2 bg-white h-8 w-8 rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-2">{product.title}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-primary">{product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        {language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full"
                        onClick={() => handleBuyNow(product)}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        {language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              ) : (
                // ... keep existing code (list view implementation)
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded" />
                      <Badge variant="destructive" className="absolute -top-1 -left-1 text-xs">
                        -{product.discount}%
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{product.title}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-primary">{product.price}</span>
                        <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{product.location}</span>
                        </div>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          কার্ট
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleBuyNow(product)}
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          কিনুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
