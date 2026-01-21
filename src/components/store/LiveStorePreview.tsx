import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Store, ShoppingCart, Heart, Search, Phone, 
  MapPin, Clock, Facebook, Instagram, MessageCircle,
  ChevronLeft, ChevronRight, Smartphone, Monitor
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[] | null;
  category: string | null;
}

interface StoreData {
  storeName: string;
  storeDescription: string;
  isOpen: boolean;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  ownerPhone: string;
  address: string;
}

interface LiveStorePreviewProps {
  storeData: StoreData;
  products: Product[];
  theme?: string;
}

const LiveStorePreview: React.FC<LiveStorePreviewProps> = ({
  storeData,
  products,
  theme = 'modern'
}) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [currentSlide, setCurrentSlide] = useState(0);

  const displayProducts = products.slice(0, 6);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant={viewMode === 'mobile' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('mobile')}
        >
          <Smartphone className="h-4 w-4 mr-1" />
          মোবাইল
        </Button>
        <Button
          variant={viewMode === 'desktop' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewMode('desktop')}
        >
          <Monitor className="h-4 w-4 mr-1" />
          ডেস্কটপ
        </Button>
      </div>

      {/* Preview Container */}
      <div className={`mx-auto transition-all duration-300 ${
        viewMode === 'mobile' 
          ? 'max-w-[375px]' 
          : 'max-w-[800px]'
      }`}>
        <div className={`bg-gray-800 rounded-[2rem] p-2 ${
          viewMode === 'mobile' ? '' : 'rounded-xl'
        }`}>
          {/* Browser Bar */}
          <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 flex items-center justify-between rounded-t-xl text-xs">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white dark:bg-gray-600 rounded-full px-3 py-1 text-center text-gray-600 dark:text-gray-300 text-xs truncate">
                {storeData.storeName?.toLowerCase().replace(/\s+/g, '-') || 'my-store'}.basabari.com
              </div>
            </div>
          </div>

          {/* Store Content */}
          <div className="bg-white dark:bg-gray-900 overflow-hidden rounded-b-xl max-h-[600px] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Store className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h1 className="font-bold text-sm truncate max-w-[150px]">
                    {storeData.storeName || 'আমার স্টোর'}
                  </h1>
                  <Badge variant={storeData.isOpen ? 'default' : 'secondary'} className="text-xs py-0 h-4">
                    {storeData.isOpen ? '✓ খোলা' : 'বন্ধ'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted rounded-full">
                  <Search className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full relative">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 p-6 text-center">
              <h2 className="text-xl font-bold mb-2">
                {storeData.storeName || 'আমার স্টোর'}
              </h2>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {storeData.storeDescription || 'আপনার বিশ্বস্ত অনলাইন শপিং ডেস্টিনেশন'}
              </p>
              {storeData.ownerPhone && (
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  <span>{storeData.ownerPhone}</span>
                </div>
              )}
            </div>

            {/* Products Section */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">আমাদের পণ্য</h3>
                <Badge variant="outline" className="text-xs">
                  {products.length} টি পণ্য
                </Badge>
              </div>

              {displayProducts.length > 0 ? (
                <div className={`grid gap-3 ${
                  viewMode === 'mobile' ? 'grid-cols-2' : 'grid-cols-3'
                }`}>
                  {displayProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-card"
                    >
                      <div className="aspect-square bg-muted relative">
                        {product.images && product.images[0] ? (
                          <img 
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Store className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        )}
                        <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white">
                          <Heart className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-2">
                        <h4 className="font-medium text-xs truncate">{product.name}</h4>
                        {product.category && (
                          <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                        )}
                        <p className="font-bold text-primary text-sm mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Store className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">এখনো কোনো পণ্য যোগ হয়নি</p>
                  <p className="text-xs">পণ্য ট্যাব থেকে পণ্য যোগ করুন</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4 bg-muted/30">
              <div className="flex items-center justify-center gap-4 mb-3">
                {storeData.socialLinks.facebook && (
                  <Facebook className="h-5 w-5 text-blue-600" />
                )}
                {storeData.socialLinks.instagram && (
                  <Instagram className="h-5 w-5 text-pink-600" />
                )}
                {storeData.socialLinks.whatsapp && (
                  <MessageCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
              {storeData.address && (
                <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-[200px]">{storeData.address}</span>
                </div>
              )}
              <p className="text-center text-xs text-muted-foreground mt-2">
                © 2024 {storeData.storeName || 'স্টোর'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Update Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>রিয়েল-টাইম প্রিভিউ - পরিবর্তন সাথে সাথে দেখুন</span>
      </div>
    </div>
  );
};

export default LiveStorePreview;
