import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart,
  Star,
  MapPin,
  TrendingUp,
  Package,
  Users,
  Clock,
  Smartphone,
  Shirt,
  Home,
  Book,
  Laptop,
  Camera,
  Gamepad2,
  Watch
} from 'lucide-react';

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    {
      id: 'electronics',
      name: 'ইলেকট্রনিক্স',
      icon: <Smartphone className="h-7 w-7" />,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      count: 156
    },
    {
      id: 'fashion',
      name: 'ফ্যাশন',
      icon: <Shirt className="h-7 w-7" />,
      color: 'bg-pink-50',
      iconColor: 'text-pink-500',
      count: 234
    },
    {
      id: 'home',
      name: 'ঘর সাজানো',
      icon: <Home className="h-7 w-7" />,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      count: 89
    },
    {
      id: 'books',
      name: 'বই ও স্টেশনারি',
      icon: <Book className="h-7 w-7" />,
      color: 'bg-orange-50',
      iconColor: 'text-orange-500',
      count: 67
    },
    {
      id: 'computers',
      name: 'কম্পিউটার',
      icon: <Laptop className="h-7 w-7" />,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
      count: 98
    },
    {
      id: 'cameras',
      name: 'ক্যামেরা',
      icon: <Camera className="h-7 w-7" />,
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
      count: 42
    },
    {
      id: 'gaming',
      name: 'গেমিং',
      icon: <Gamepad2 className="h-7 w-7" />,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      count: 73
    },
    {
      id: 'watches',
      name: 'ঘড়ি ও অ্যাক্সেসরিজ',
      icon: <Watch className="h-7 w-7" />,
      color: 'bg-red-50',
      iconColor: 'text-red-500',
      count: 54
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: 'স্মার্ট ওয়াচ',
      price: '৳ ৫,৫০০',
      originalPrice: '৳ ৭,০০০',
      rating: 4.5,
      reviews: 128,
      seller: 'টেক স্টোর',
      location: 'ঢাকা',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      discount: 21
    },
    {
      id: 2,
      title: 'ব্লুটুথ হেডফোন',
      price: '৳ ২,৮০০',
      originalPrice: '৳ ৩,৫০০',
      rating: 4.7,
      reviews: 95,
      seller: 'অডিও হাব',
      location: 'চট্টগ্রাম',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      discount: 20
    },
    {
      id: 3,
      title: 'ল্যাপটপ ব্যাগ',
      price: '৳ ১,২০০',
      originalPrice: '৳ ১,৮০০',
      rating: 4.3,
      reviews: 67,
      seller: 'ব্যাগ ওয়ার্ল্ড',
      location: 'সিলেট',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      discount: 33
    },
    {
      id: 4,
      title: 'মোবাইল চার্জার',
      price: '৳ ৮৫০',
      originalPrice: '৳ ১,২০০',
      rating: 4.6,
      reviews: 203,
      seller: 'মোবাইল এক্সেসরিজ',
      location: 'রাজশাহী',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      discount: 29
    }
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">মার্কেটপ্লেস</h1>
        <p className="text-muted-foreground">আপনার পছন্দের পণ্য খুঁজে নিন</p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="পণ্য খুঁজুন..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">ক্যাটাগরি সমূহ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                <div className={category.iconColor}>
                  {category.icon}
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2">{category.name}</h3>
              <Badge variant="success" className="text-xs">
                {category.count} পণ্য
              </Badge>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
            ∨ আরো দেখুন
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">ফিচার্ড প্রোডাক্ট</h2>
          <Button variant="outline" size="sm">
            সব দেখুন
          </Button>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'space-y-4'}>
          {featuredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-all cursor-pointer overflow-hidden">
              {viewMode === 'grid' ? (
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="destructive" className="text-xs">
                        -{product.discount}%
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-white h-8 w-8 rounded-full"
                    >
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
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-full object-cover rounded"
                      />
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{product.location}</span>
                        </div>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Heart className="h-4 w-4" />
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">মোট বিক্রেতা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">১,২৫০+</span>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <TrendingUp className="h-3 w-3 mr-1" />
                +১৫%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">মোট প্রোডাক্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৮,৫৪৬</span>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                <Package className="h-3 w-3 mr-1" />
                নতুন
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">সক্রিয় ক্রেতা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৩,৪২১</span>
              <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                <Users className="h-3 w-3 mr-1" />
                অনলাইন
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Marketplace;
