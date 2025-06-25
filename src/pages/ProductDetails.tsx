
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();

  // Mock product data
  const product = {
    id: id,
    name: 'স্মার্টফোন - Samsung Galaxy A54',
    price: '৩৫,০০০',
    originalPrice: '৪০,০০০',
    discount: '১২%',
    rating: 4.5,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400'
    ],
    description: 'এই স্মার্টফোনটি সর্বশেষ প্রযুক্তি সহ তৈরি। উচ্চ মানের ক্যামেরা, দীর্ঘস্থায়ী ব্যাটারি এবং দ্রুত পারফরম্যান্স।',
    features: [
      '6.4" Super AMOLED ডিসপ্লে',
      '50MP ট্রিপল ক্যামেরা',
      '8GB RAM, 128GB স্টোরেজ',
      '5000mAh ব্যাটারি',
      'Android 13'
    ],
    seller: 'টেক স্টোর',
    inStock: true,
    freeShipping: true
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} রিভিউ)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-600">৳{product.price}</span>
              <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice}</span>
              <Badge variant="destructive">{product.discount} ছাড়</Badge>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">বৈশিষ্ট্য:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-3">বিবরণ:</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            {/* Seller Info */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">বিক্রেতা: {product.seller}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">৪.৮ (৫০২ রিভিউ)</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  দোকান দেখুন
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  কার্টে যোগ করুন
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              
              <Button variant="outline" className="w-full" size="lg">
                এখনই কিনুন
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">ফ্রি ডেলিভারি - ২-৩ দিনে পৌঁছাবে</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">১ বছরের ওয়ারেন্টি</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <span className="text-sm">৭ দিনের রিটার্ন পলিসি</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
