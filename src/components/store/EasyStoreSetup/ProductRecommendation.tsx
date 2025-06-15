
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WishlistButton from './WishlistButton';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  category: string;
}

interface ProductRecommendationProps {
  currentProductId?: string;
  category?: string;
  title?: string;
}

const ProductRecommendation: React.FC<ProductRecommendationProps> = ({
  currentProductId,
  category,
  title = "রেকমেন্ডেড পণ্য"
}) => {
  // Sample recommended products
  const recommendedProducts: Product[] = [
    {
      id: '1',
      name: 'প্রিমিয়াম টি-শার্ট',
      price: '৮৫০ টাকা',
      image: '/placeholder.svg',
      rating: 4.5,
      reviews: 120,
      category: 'fashion'
    },
    {
      id: '2', 
      name: 'ডেনিম জ্যাকেট',
      price: '২৫০০ টাকা',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 85,
      category: 'fashion'
    },
    {
      id: '3',
      name: 'ক্যাজুয়াল জুতা',
      price: '১৮০০ টাকা', 
      image: '/placeholder.svg',
      rating: 4.2,
      reviews: 200,
      category: 'shoes'
    },
    {
      id: '4',
      name: 'ফ্যাশন ব্যাগ',
      price: '১২০০ টাকা',
      image: '/placeholder.svg', 
      rating: 4.6,
      reviews: 95,
      category: 'accessories'
    }
  ];

  // Filter products based on category and exclude current product
  const filteredProducts = recommendedProducts
    .filter(product => product.id !== currentProductId)
    .filter(product => category ? product.category === category : true)
    .slice(0, 4);

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {title}
          <Badge variant="secondary">{filteredProducts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="relative mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-md"
                />
                <div className="absolute top-2 right-2">
                  <WishlistButton
                    wished={false}
                    onToggle={() => console.log('Wishlist toggled for', product.id)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm truncate">{product.name}</h3>
                
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
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
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4 text-sm">
          আরও পণ্য দেখুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendation;
