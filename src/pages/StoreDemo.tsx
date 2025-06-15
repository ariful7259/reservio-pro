
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, MapPin, Phone, Mail } from 'lucide-react';
import OrderTrackingSection from '@/components/store/EasyStoreSetup/OrderTrackingSection';
import ProductRecommendation from '@/components/store/EasyStoreSetup/ProductRecommendation';

const StoreDemo = () => {
  const navigate = useNavigate();

  const demoProducts = [
    {
      id: 1,
      name: "প্রিমিয়াম টি-শার্ট",
      price: "৮৫০ টাকা",
      image: "/placeholder.svg",
      rating: 4.5,
      reviews: 120,
      inStock: true
    },
    {
      id: 2,
      name: "ডেনিম জ্যাকেট",
      price: "২৫০০ টাকা",
      image: "/placeholder.svg",
      rating: 4.8,
      reviews: 85,
      inStock: true
    },
    {
      id: 3,
      name: "ক্যাজুয়াল জুতা",
      price: "১৮০০ টাকা",
      image: "/placeholder.svg",
      rating: 4.2,
      reviews: 200,
      inStock: false
    },
    {
      id: 4,
      name: "ফ্যাশন ব্যাগ",
      price: "১২০০ টাকা",
      image: "/placeholder.svg",
      rating: 4.6,
      reviews: 95,
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/create-store')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              ফিরে যান
            </Button>
            <div>
              <h1 className="text-xl font-bold">রহিম ফ্যাশন হাউস</h1>
              <p className="text-sm text-gray-600">ডেমো স্টোর</p>
            </div>
            <Badge className="ml-auto">লাইভ প্রিভিউ</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Store Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  স্টোর তথ্য
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    ০১৭১২৩৪৫৬৭৮
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    rahimfashion@example.com
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    ধানমন্ডি, ঢাকা
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div>
              <h2 className="text-xl font-bold mb-4">আমাদের পণ্যসমূহ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {demoProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">স্টক শেষ</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {product.price}
                        </span>
                        <Button
                          size="sm"
                          disabled={!product.inStock}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          কিনুন
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Product Recommendations */}
            <ProductRecommendation 
              category="fashion"
              title="সিমিলার পণ্য"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Tracking Demo */}
            <Card>
              <CardHeader>
                <CardTitle>অর্ডার ট্র্যাকিং</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTrackingSection status="shipped" />
              </CardContent>
            </Card>

            {/* Store Features */}
            <Card>
              <CardHeader>
                <CardTitle>স্টোর ফিচার</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">বিনামূল্যে ডেলিভারি</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ক্যাশ অন ডেলিভারি</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">১৫ দিন রিটার্ন</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">২৪/৭ সাপোর্ট</span>
                    <Badge variant="secondary">✓</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-primary to-accent text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">আপনিও তৈরি করুন!</h3>
                <p className="text-sm mb-4 opacity-90">
                  মাত্র ৩ মিনিটে আপনার নিজস্ব অনলাইন স্টোর তৈরি করুন
                </p>
                <Button
                  variant="secondary"
                  onClick={() => navigate('/create-store')}
                  className="w-full"
                >
                  এখনই শুরু করুন
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDemo;
