import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Store, ShoppingCart, Heart, Search, Phone, 
  MapPin, Clock, Facebook, Instagram, MessageCircle,
  Smartphone, Monitor
} from 'lucide-react';
import { ThemeSettings } from './StoreThemeCustomizer';

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
  themeSettings?: ThemeSettings;
}

const defaultTheme: ThemeSettings = {
  themeId: 'modern',
  colorSchemeId: 'ocean',
  customColors: {
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#22d3ee',
    background: '#f0f9ff'
  },
  layout: {
    productColumns: 3,
    showBanner: true,
    compactMode: false,
    cardStyle: 'rounded'
  },
  typography: {
    headingSize: 'medium',
    bodySize: 'medium'
  },
  darkMode: false
};

const LiveStorePreview: React.FC<LiveStorePreviewProps> = ({
  storeData,
  products,
  themeSettings
}) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const theme = themeSettings || defaultTheme;

  const displayProducts = products.slice(0, 6);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Dynamic card radius based on theme
  const getCardRadius = () => {
    switch (theme.layout.cardStyle) {
      case 'square': return 'rounded-none';
      case 'soft': return 'rounded-2xl';
      default: return 'rounded-xl';
    }
  };

  // Dynamic grid columns
  const getGridColumns = () => {
    if (viewMode === 'mobile') {
      return 'grid-cols-2';
    }
    const cols = theme.layout.productColumns;
    return cols === 4 ? 'grid-cols-4' : cols === 2 ? 'grid-cols-2' : 'grid-cols-3';
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
          <div 
            className={`overflow-hidden rounded-b-xl max-h-[600px] overflow-y-auto ${theme.darkMode ? 'bg-gray-900' : ''}`}
            style={{ backgroundColor: theme.darkMode ? undefined : theme.customColors.background }}
          >
            {/* Header */}
            <div 
              className="sticky top-0 z-10 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between"
              style={{ 
                backgroundColor: theme.darkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)'
              }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${theme.customColors.primary}20` }}
                >
                  <Store className="h-4 w-4" style={{ color: theme.customColors.primary }} />
                </div>
                <div>
                  <h1 className={`font-bold text-sm truncate max-w-[150px] ${theme.darkMode ? 'text-white' : ''}`}>
                    {storeData.storeName || 'আমার স্টোর'}
                  </h1>
                  <Badge 
                    variant={storeData.isOpen ? 'default' : 'secondary'} 
                    className="text-xs py-0 h-4"
                    style={storeData.isOpen ? { backgroundColor: theme.customColors.primary } : undefined}
                  >
                    {storeData.isOpen ? '✓ খোলা' : 'বন্ধ'}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`p-2 hover:bg-muted rounded-full ${theme.darkMode ? 'text-white' : ''}`}>
                  <Search className="h-4 w-4" />
                </button>
                <button className={`p-2 hover:bg-muted rounded-full relative ${theme.darkMode ? 'text-white' : ''}`}>
                  <ShoppingCart className="h-4 w-4" />
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                    style={{ backgroundColor: theme.customColors.accent }}
                  >
                    0
                  </span>
                </button>
              </div>
            </div>

            {/* Hero Section */}
            {theme.layout.showBanner && (
              <div 
                className={`relative p-6 text-center text-white ${theme.layout.compactMode ? 'py-4' : ''}`}
                style={{ 
                  background: `linear-gradient(135deg, ${theme.customColors.primary}, ${theme.customColors.secondary})` 
                }}
              >
                <h2 className={`font-bold mb-2 ${theme.typography.headingSize === 'large' ? 'text-2xl' : theme.typography.headingSize === 'small' ? 'text-lg' : 'text-xl'}`}>
                  {storeData.storeName || 'আমার স্টোর'}
                </h2>
                <p className={`mb-4 line-clamp-2 opacity-90 ${theme.typography.bodySize === 'large' ? 'text-base' : theme.typography.bodySize === 'small' ? 'text-xs' : 'text-sm'}`}>
                  {storeData.storeDescription || 'আপনার বিশ্বস্ত অনলাইন শপিং ডেস্টিনেশন'}
                </p>
                {storeData.ownerPhone && (
                  <div className="flex items-center justify-center gap-2 text-xs opacity-80">
                    <Phone className="h-3 w-3" />
                    <span>{storeData.ownerPhone}</span>
                  </div>
                )}
              </div>
            )}

            {/* Products Section */}
            <div className={`p-4 ${theme.layout.compactMode ? 'p-3' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${theme.darkMode ? 'text-white' : ''}`}>আমাদের পণ্য</h3>
                <Badge 
                  variant="outline" 
                  className="text-xs"
                  style={{ borderColor: theme.customColors.primary, color: theme.customColors.primary }}
                >
                  {products.length} টি পণ্য
                </Badge>
              </div>

              {displayProducts.length > 0 ? (
                <div className={`grid gap-3 ${getGridColumns()}`}>
                  {displayProducts.map((product) => (
                    <div 
                      key={product.id}
                      className={`border overflow-hidden hover:shadow-md transition-shadow ${getCardRadius()} ${theme.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
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
                        <button 
                          className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white"
                          style={{ color: theme.customColors.primary }}
                        >
                          <Heart className="h-3 w-3" />
                        </button>
                      </div>
                      <div className={`p-2 ${theme.layout.compactMode ? 'p-1.5' : ''}`}>
                        <h4 className={`font-medium text-xs truncate ${theme.darkMode ? 'text-white' : ''}`}>{product.name}</h4>
                        {product.category && (
                          <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                        )}
                        <p className="font-bold text-sm mt-1" style={{ color: theme.customColors.primary }}>
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-8 ${theme.darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                  <Store className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">এখনো কোনো পণ্য যোগ হয়নি</p>
                  <p className="text-xs">পণ্য ট্যাব থেকে পণ্য যোগ করুন</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`border-t p-4 ${theme.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-muted/30'}`}>
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
                <div className={`flex items-center justify-center gap-1 text-xs ${theme.darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>
                  <MapPin className="h-3 w-3" />
                  <span className="truncate max-w-[200px]">{storeData.address}</span>
                </div>
              )}
              <p className={`text-center text-xs mt-2 ${theme.darkMode ? 'text-gray-500' : 'text-muted-foreground'}`}>
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
