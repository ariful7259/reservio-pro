import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Star,
  ShoppingBag,
  MessageCircle,
  Share2,
  Heart,
  ExternalLink,
  Facebook,
  Instagram,
  ChevronLeft,
  Package
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductDetailModal from '@/components/store/ProductDetailModal';
import ProductFilters from '@/components/store/ProductFilters';
import ProductSorting, { SortOption } from '@/components/store/ProductSorting';

interface StoreData {
  id: string;
  business_name: string | null;
  bio: string | null;
  address: string | null;
  logo_url: string | null;
  phone: string | null;
  marketplace_settings: {
    storeSlug?: string;
    storeCategory?: string;
    isOpen?: boolean;
    whatsappOrderEnabled?: boolean;
    businessHours?: {
      open: string;
      close: string;
      days: string[];
    };
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
      tiktok?: string;
    };
    returnPolicy?: string;
    customDomain?: string;
  } | null;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  images: string[] | null;
  category: string | null;
  stock: number | null;
}

const StorePublicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [store, setStore] = useState<StoreData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  
  // Product detail modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Search, filter and sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = products
      .map(p => p.category)
      .filter((cat): cat is string => !!cat);
    return [...new Set(cats)];
  }, [products]);
  
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        selectedCategory === 'all' || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        // Products are already ordered by created_at desc from the query
        break;
      case 'oldest':
        result = [...result].reverse();
        break;
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        // For now, just keep original order (could be based on sales/views later)
        break;
    }
    
    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchStore = async () => {
      if (!slug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        // Query seller_profiles where marketplace_settings contains the slug
        const { data, error } = await supabase
          .from('seller_profiles')
          .select('id, business_name, bio, address, logo_url, phone, marketplace_settings')
          .not('marketplace_settings', 'is', null);

        if (error) throw error;

        // Find the store with matching slug
        const matchingStore = data?.find((profile: any) => {
          const settings = profile.marketplace_settings;
          return settings?.storeSlug === slug;
        });

        if (matchingStore) {
          setStore(matchingStore as StoreData);
        } else {
          setNotFound(true);
        }
      } catch (error: any) {
        console.error('Store fetch error:', error);
        toast({
          title: "স্টোর লোড করতে সমস্যা",
          description: error.message,
          variant: "destructive"
        });
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [slug, toast]);

  // Fetch products when store is loaded
  useEffect(() => {
    const fetchProducts = async () => {
      if (!store?.id) return;

      setProductsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, description, price, images, category, stock')
          .eq('created_by', store.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error: any) {
        console.error('Products fetch error:', error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [store?.id]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: store?.business_name || 'স্টোর',
          url: url
        });
      } catch (err) {
        navigator.clipboard.writeText(url);
        toast({ title: "লিংক কপি হয়েছে!" });
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({ title: "লিংক কপি হয়েছে!" });
    }
  };

  const handleWhatsAppOrder = (productName?: string) => {
    const phone = store?.phone?.replace(/[^0-9]/g, '') || '8801XXXXXXXXX';
    const message = productName 
      ? encodeURIComponent(`হ্যালো! আমি ${store?.business_name} থেকে "${productName}" অর্ডার করতে চাই।`)
      : encodeURIComponent(`হ্যালো! আমি ${store?.business_name} থেকে অর্ডার করতে চাই।`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <div className="h-48 bg-gradient-to-r from-primary/20 to-primary/10" />
        <div className="container max-w-4xl mx-auto px-4 -mt-16">
          <div className="flex items-end gap-4 mb-6">
            <Skeleton className="w-32 h-32 rounded-xl" />
            <div className="flex-1 pb-4">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
          <div className="grid gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-48" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">স্টোর খুঁজে পাওয়া যায়নি</h1>
          <p className="text-muted-foreground mb-6">
            এই URL-এ কোনো স্টোর নেই অথবা স্টোরটি বন্ধ রয়েছে।
          </p>
          <Button onClick={() => navigate('/')}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            হোমে ফিরুন
          </Button>
        </div>
      </div>
    );
  }

  const settings = store?.marketplace_settings;
  const isOpen = settings?.isOpen !== false;
  const businessHours = settings?.businessHours;
  const socialLinks = settings?.socialLinks;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Store Header Banner */}
      <div className="h-48 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
      </div>

      <div className="container max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        {/* Store Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 mb-6">
          {/* Store Logo */}
          <div className="w-32 h-32 rounded-xl bg-white shadow-lg border-4 border-white overflow-hidden flex items-center justify-center">
            {store?.logo_url ? (
              <img 
                src={store.logo_url} 
                alt={store.business_name || 'Store'} 
                className="w-full h-full object-cover"
              />
            ) : (
              <Store className="h-12 w-12 text-primary" />
            )}
          </div>

          {/* Store Info */}
          <div className="flex-1 text-center sm:text-left pb-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{store?.business_name || 'স্টোর'}</h1>
              <Badge variant={isOpen ? "default" : "secondary"} className={isOpen ? "bg-green-500" : ""}>
                {isOpen ? "খোলা" : "বন্ধ"}
              </Badge>
            </div>
            {settings?.storeCategory && (
              <p className="text-muted-foreground">{settings.storeCategory}</p>
            )}
            <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-muted-foreground mt-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>4.8</span>
              <span className="mx-1">•</span>
              <span>১২০+ রিভিউ</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {settings?.whatsappOrderEnabled && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleWhatsAppOrder()}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp অর্ডার
            </Button>
          )}
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            কল করুন
          </Button>
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            দিকনির্দেশনা
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            মেসেজ
          </Button>
        </div>

        {/* Store Bio */}
        {store?.bio && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">আমাদের সম্পর্কে</h3>
              <p className="text-muted-foreground">{store.bio}</p>
            </CardContent>
          </Card>
        )}

        {/* Store Details */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Contact & Location */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">যোগাযোগ</h3>
              
              {store?.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-sm">{store.address}</span>
                </div>
              )}
              
              {businessHours && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p>{businessHours.days?.join(', ') || 'সপ্তাহের সব দিন'}</p>
                    <p className="text-muted-foreground">
                      {businessHours.open} - {businessHours.close}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          {socialLinks && Object.keys(socialLinks).some(key => socialLinks[key as keyof typeof socialLinks]) && (
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold">সোশ্যাল মিডিয়া</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.facebook && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(socialLinks.facebook, '_blank')}
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                  )}
                  {socialLinks.instagram && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(socialLinks.instagram, '_blank')}
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      Instagram
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              প্রোডাক্টসমূহ
              {products.length > 0 && (
                <Badge variant="secondary">{products.length}</Badge>
              )}
            </h2>
          </div>

          {/* Search, Filter and Sort */}
          {products.length > 0 && (
            <div className="mb-4 space-y-3">
              <ProductFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
                totalProducts={products.length}
                filteredCount={filteredProducts.length}
              />
              <div className="flex justify-end">
                <ProductSorting
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>
          )}

          {productsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <Skeleton className="aspect-square w-full" />
                  <CardContent className="p-3">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="aspect-square bg-muted relative overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-10 w-10 text-muted-foreground" />
                      </div>
                    )}
                    {product.stock !== null && product.stock <= 0 && (
                      <Badge variant="destructive" className="absolute top-2 right-2">
                        স্টক শেষ
                      </Badge>
                    )}
                    {product.stock !== null && product.stock > 0 && product.stock <= 5 && (
                      <Badge variant="secondary" className="absolute top-2 right-2 bg-orange-100 text-orange-700">
                        স্টক কম
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.name}</h3>
                    {product.category && (
                      <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-bold text-primary">{formatPrice(product.price)}</p>
                      {settings?.whatsappOrderEnabled && (
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppOrder(product.name);
                          }}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">কোনো প্রোডাক্ট পাওয়া যায়নি</h3>
                <p className="text-sm text-muted-foreground">
                  অন্য কিওয়ার্ড বা ক্যাটাগরি দিয়ে খুঁজুন
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">এখনো কোনো প্রোডাক্ট নেই</h3>
                <p className="text-sm text-muted-foreground">
                  এই স্টোরে শীঘ্রই প্রোডাক্ট যোগ করা হবে।
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Product Detail Modal */}
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          storeName={store?.business_name || undefined}
          storePhone={store?.phone || undefined}
          whatsappEnabled={settings?.whatsappOrderEnabled}
        />

        {/* Return Policy */}
        {settings?.returnPolicy && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">রিটার্ন পলিসি</h3>
              <p className="text-sm text-muted-foreground">{settings.returnPolicy}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container max-w-4xl mx-auto flex gap-3">
          <Button className="flex-1" size="lg">
            <ShoppingBag className="h-5 w-5 mr-2" />
            অর্ডার করুন
          </Button>
          {settings?.whatsappOrderEnabled && (
            <Button 
              variant="outline" 
              size="lg"
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={() => handleWhatsAppOrder()}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePublicPage;
