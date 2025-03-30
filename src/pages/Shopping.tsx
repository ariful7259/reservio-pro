
import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Shopping = () => {
  // Sample product data
  const products = [
    {
      id: '1',
      name: 'স্মার্ট ব্লাড প্রেশার মনিটর',
      price: 2500,
      oldPrice: 3000,
      rating: 4.5,
      reviewCount: 120,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'health',
      isFavorite: false,
    },
    {
      id: '2',
      name: 'ডিজিটাল গ্লুকোমিটার কিট',
      price: 3500,
      oldPrice: 4200,
      rating: 4.7,
      reviewCount: 85,
      image: 'https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'health',
      isFavorite: true,
    },
    {
      id: '3',
      name: 'ফিটনেস ওয়াচ প্রো',
      price: 4999,
      oldPrice: 5500,
      rating: 4.8,
      reviewCount: 230,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'fitness',
      isFavorite: false,
    },
    {
      id: '4',
      name: 'ইয়োগা ম্যাট প্রিমিয়াম',
      price: 1200,
      oldPrice: 1500,
      rating: 4.6,
      reviewCount: 150,
      image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'fitness',
      isFavorite: false,
    },
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস</h1>
        <p className="text-gray-500">আপনার প্রয়োজনীয় পণ্য সহজেই কিনুন</p>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full bg-secondary/50 mb-4">
          <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
          <TabsTrigger value="health" className="flex-1">হেলথ</TabsTrigger>
          <TabsTrigger value="fitness" className="flex-1">ফিটনেস</TabsTrigger>
          <TabsTrigger value="medicine" className="flex-1">মেডিসিন</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  {product.oldPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold">৳{product.price}</div>
                      {product.oldPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">৳{product.oldPrice}</div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="health">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.filter(product => product.category === 'health').map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  {product.oldPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold">৳{product.price}</div>
                      {product.oldPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">৳{product.oldPrice}</div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="fitness">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.filter(product => product.category === 'fitness').map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Heart className={`h-4 w-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  {product.oldPrice > product.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {Math.round((1 - product.price / product.oldPrice) * 100)}% ছাড়
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <div className="font-bold">৳{product.price}</div>
                      {product.oldPrice > product.price && (
                        <div className="text-xs text-gray-400 line-through">৳{product.oldPrice}</div>
                      )}
                    </div>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="medicine">
          <div className="text-center py-10 text-muted-foreground">
            কোনো মেডিসিন এখনো উপলব্ধ নেই
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shopping;
