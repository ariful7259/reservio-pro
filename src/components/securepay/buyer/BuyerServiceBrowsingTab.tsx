
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Star, 
  Heart, 
  Clock,
  User,
  ShoppingCart,
  SlidersHorizontal
} from 'lucide-react';

const BuyerServiceBrowsingTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('popularity');

  const services = [
    {
      id: 1,
      title: 'প্রফেশনাল লোগো ডিজাইন',
      creator: 'ডিজাইন এক্সপার্ট',
      category: 'Graphics Design',
      price: '৳২,৫০০',
      originalPrice: '৳৩,৫০০',
      rating: 4.9,
      reviews: 127,
      deliveryTime: '২ দিন',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      isVerified: true,
      responseTime: '১ ঘণ্টা',
      completedOrders: 200,
      tags: ['Logo', 'Branding', 'Professional']
    },
    {
      id: 2,
      title: 'ওয়েবসাইট ডিজাইন ও ডেভেলপমেন্ট',
      creator: 'ওয়েব মাস্টার',
      category: 'Web Development',
      price: '৳১৫,০০০',
      originalPrice: '৳২০,০০০',
      rating: 4.8,
      reviews: 89,
      deliveryTime: '৭ দিন',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      isVerified: true,
      responseTime: '২ ঘণ্টা',
      completedOrders: 150,
      tags: ['Website', 'Responsive', 'Modern']
    },
    {
      id: 3,
      title: 'সোশ্যাল মিডিয়া কন্টেন্ট তৈরি',
      creator: 'কন্টেন্ট ক্রিয়েটর',
      category: 'Content Creation',
      price: '৳১,২০০',
      originalPrice: '৳১,৮০০',
      rating: 4.7,
      reviews: 156,
      deliveryTime: '১ দিন',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      isVerified: false,
      responseTime: '৩০ মিনিট',
      completedOrders: 300,
      tags: ['Social Media', 'Creative', 'Content']
    }
  ];

  const categories = [
    'all', 'Graphics Design', 'Web Development', 'Content Creation', 
    'Digital Marketing', 'Video Editing', 'Writing & Translation'
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const priceValue = parseInt(service.price.replace('৳', '').replace(',', ''));
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="সার্ভিস বা ক্রিয়েটর খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            অ্যাডভান্সড ফিল্টার
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'সব ক্যাটাগরি' : category}
            </Button>
          ))}
        </div>

        {/* Sort and Filter Options */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredServices.length} টি সার্ভিস পাওয়া গেছে
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">সাজান:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="popularity">জনপ্রিয়তা</option>
              <option value="price_low">কম দাম</option>
              <option value="price_high">বেশি দাম</option>
              <option value="rating">রেটিং</option>
              <option value="newest">নতুন</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
            <div className="relative">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-green-600">
                  {Math.round(((parseInt(service.originalPrice.replace('৳', '').replace(',', '')) - 
                    parseInt(service.price.replace('৳', '').replace(',', ''))) / 
                    parseInt(service.originalPrice.replace('৳', '').replace(',', ''))) * 100)}% ছাড়
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button variant="outline" size="icon" className="bg-white/80 backdrop-blur-sm h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-2 mb-1">{service.title}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="text-muted-foreground">{service.creator}</span>
                  </div>
                  {service.isVerified && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                      ভেরিফাইড
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{service.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">({service.reviews})</span>
                <span className="text-xs text-muted-foreground">• {service.completedOrders} অর্ডার</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {service.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{service.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      {service.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.deliveryTime}
                    </span>
                    <span>উত্তর: {service.responseTime}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                অর্ডার করুন
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-6">
        <Button variant="outline" size="lg">
          আরো সার্ভিস দেখুন
        </Button>
      </div>
    </div>
  );
};

export default BuyerServiceBrowsingTab;
