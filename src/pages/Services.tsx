
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { serviceCategories } from '@/components/sidebar/services/serviceData';

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const featuredServices = [
    {
      id: 1,
      title: 'হোম ক্লিনিং সার্ভিস',
      description: 'প্রফেশনাল হোম ক্লিনিং সার্ভিস, দক্ষ কর্মী এবং আধুনিক যন্ত্রপাতি সহ।',
      price: '৳ ১,৫০০',
      duration: '২-৩ ঘন্টা',
      rating: 4.8,
      reviews: 156,
      provider: 'ক্লিন হোম সার্ভিস',
      location: 'ঢাকা',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      verified: true
    },
    {
      id: 2,
      title: 'ইলেকট্রিক্যাল রিপেয়ার',
      description: 'বাড়ির সকল ধরনের ইলেকট্রিক্যাল সমস্যার সমাধান।',
      price: '৳ ৮০০',
      duration: '১-২ ঘন্টা',
      rating: 4.6,
      reviews: 89,
      provider: 'টেক ইলেক্ট্রো',
      location: 'চট্টগ্রাম',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      verified: true
    },
    {
      id: 3,
      title: 'প্লাম্বিং সার্ভিস',
      description: 'পানির লাইন, ব্লক পাইপ এবং বাথরুমের সমস্যা সমাধান।',
      price: '৳ ১,২০০',
      duration: '১.৫-২ ঘন্টা',
      rating: 4.7,
      reviews: 134,
      provider: 'এক্সপার্ট প্লাম্বার',
      location: 'সিলেট',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop',
      verified: true
    },
    {
      id: 4,
      title: 'এসি সার্ভিসিং',
      description: 'এয়ার কন্ডিশনার পরিষ্কার এবং রক্ষণাবেক্ষণ সেবা।',
      price: '৳ ২,০০০',
      duration: '২-৩ ঘন্টা',
      rating: 4.5,
      reviews: 67,
      provider: 'কুল এয়ার সার্ভিস',
      location: 'রাজশাহী',
      image: 'https://images.unsplash.com/photo-1631545804101-b1e8ad5b8c8f?w=400&h=300&fit=crop',
      verified: true
    }
  ];

  const handleCategoryClick = (categoryPath: string) => {
    const categoryName = categoryPath.split('/').pop() || '';
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
  };

  const selectedCategoryData = serviceCategories.find(cat => 
    cat.path.includes(selectedCategory || '')
  );

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">সার্ভিস মার্কেটপ্লেস</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় সেবা খুঁজে নিন</p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="সেবা খুঁজুন..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon" className="shrink-0">
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
        <h2 className="text-lg font-semibold mb-4">সেবার ক্যাটাগরি</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {serviceCategories.map((category, index) => (
            <div key={index}>
              <div 
                className={`flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                  selectedCategory === category.path.split('/').pop() ? 'bg-primary/10 border-2 border-primary' : 'border border-transparent'
                }`}
                onClick={() => handleCategoryClick(category.path)}
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                  {category.icon}
                </div>
                <h3 className="font-medium text-sm mb-2">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {Math.floor(Math.random() * 50) + 10} সেবা
                </Badge>
              </div>
              
              {selectedCategory === category.path.split('/').pop() && category.subCategories && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-3">সাব-ক্যাটাগরি</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {category.subCategories.map((subCat, subIndex) => (
                      <div key={subIndex} className="flex items-center justify-between p-2 hover:bg-white rounded cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="text-gray-600">
                            {subCat.icon}
                          </div>
                          <span className="text-sm">{subCat.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.floor(Math.random() * 20) + 5}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
          <h2 className="text-lg font-semibold">জনপ্রিয় সেবা</h2>
          <Button variant="outline" size="sm">
            সব দেখুন
          </Button>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
          {featuredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-all cursor-pointer overflow-hidden">
              {viewMode === 'grid' ? (
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-48 object-cover"
                    />
                    {service.verified && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500 text-white text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          ভেরিফাইড
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2">{service.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{service.rating}</span>
                      <span className="text-xs text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-primary">{service.price}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{service.location}</span>
                    </div>
                    <p className="text-xs text-gray-600">{service.provider}</p>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover rounded"
                      />
                      {service.verified && (
                        <Badge className="absolute -top-1 -left-1 bg-green-500 text-white text-[10px] px-1">
                          <CheckCircle className="h-2 w-2 mr-0.5" />
                          ভেরিফাইড
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{service.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.description}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{service.rating}</span>
                        <span className="text-xs text-muted-foreground">({service.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">{service.price}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{service.location}</span>
                        </div>
                        <p className="text-xs text-gray-600">{service.provider}</p>
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
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold">১,৮৫০+</span>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <TrendingUp className="h-3 w-3 mr-1" />
                +২৫%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">সেবা প্রদানকারী</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold">৫,২৪৬</span>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                <Star className="h-3 w-3 mr-1" />
                সম্পন্ন
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">সফল সেবা</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold">৪.৮</span>
              <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                <Star className="h-3 w-3 mr-1" />
                গড় রেটিং
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">গ্রাহক সন্তুষ্টি</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
