
import React, { useState } from "react";
import WishlistComponent from "@/components/product/WishlistComponent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WishlistButton from "@/components/store/EasyStoreSetup/WishlistButton";
import ProductRecommendation from "@/components/store/EasyStoreSetup/ProductRecommendation";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
}

const WishlistTabContent: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
  const [wishlistedProducts, setWishlistedProducts] = useState<Set<string>>(new Set(['1', '3']));
  
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'প্রিমিয়াম টি-শার্ট',
      price: '৮৫০ টাকা',
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 120
    },
    {
      id: '2',
      name: 'ডেনিম জ্যাকেট',
      price: '২৫০০ টাকা',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 85
    },
    {
      id: '3',
      name: 'ক্যাজুয়াল জুতা',
      price: '১৮০০ টাকা',
      image: '/placeholder.svg',
      rating: 4.2,
      reviews: 200
    },
    {
      id: '4',
      name: 'ফ্যাশন ব্যাগ',
      price: '১২০০ টাকা',
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 95
    }
  ];

  const toggleWishlist = (productId: string) => {
    setWishlistedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const wishlistedItems = sampleProducts.filter(product => wishlistedProducts.has(product.id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
      <div className="lg:col-span-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">আমার উইশলিস্ট</h2>
            <Badge variant="secondary">
              {wishlistedItems.length} টি পণ্য
            </Badge>
          </div>
          
          {wishlistedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistedItems.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <WishlistButton
                        wished={wishlistedProducts.has(product.id)}
                        onToggle={() => toggleWishlist(product.id)}
                      />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-sm">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{product.rating}</span>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary text-sm">
                        {product.price}
                      </span>
                      <Button size="sm" className="flex items-center gap-1 text-xs px-2 py-1 h-7">
                        <ShoppingCart className="h-3 w-3" />
                        কিনুন
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">আপনার উইশলিস্ট খালি</h3>
              <p className="text-gray-500 mb-4">পছন্দের পণ্য উইশলিস্টে যোগ করুন</p>
              <Button onClick={() => onTabChange('browse')}>
                পণ্য ব্রাউজ করুন
              </Button>
            </Card>
          )}
          
          {/* Product Recommendations */}
          <ProductRecommendation 
            title="আপনার পছন্দের পণ্য"
            category="fashion"
          />
          
          <WishlistComponent />
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="p-3 sm:p-4 mb-4">
          <h3 className="font-medium mb-3 text-sm sm:text-base">সিমিলার প্রোডাক্টস</h3>
          <div className="space-y-3">
            {sampleProducts.filter(p => !wishlistedProducts.has(p.id)).slice(0, 3).map((product) => (
              <div key={product.id} className="flex gap-3 p-2 border rounded-lg">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium truncate">{product.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-primary">{product.price}</span>
                    <WishlistButton
                      wished={false}
                      onToggle={() => toggleWishlist(product.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-3 text-xs sm:text-sm"
            onClick={() => onTabChange('browse')}
          >
            আরও প্রোডাক্ট দেখুন
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default WishlistTabContent;
