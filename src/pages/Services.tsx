
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Wrench, 
  Car, 
  Home, 
  Smartphone, 
  Heart, 
  Scissors, 
  Truck, 
  GraduationCap,
  Star,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Monitor,
  Laptop,
  Camera,
  ShoppingBag
} from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      id: 'home',
      name: 'ঘর সংক্রান্ত সেবা',
      icon: <Home className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
      count: 45
    },
    {
      id: 'auto',
      name: 'গাড়ি সার্ভিস',
      icon: <Car className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      count: 32
    },
    {
      id: 'tech',
      name: 'টেক সাপোর্ট',
      icon: <Monitor className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
      count: 28
    },
    {
      id: 'health',
      name: 'স্বাস্থ্য সেবা',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-100 text-red-600',
      count: 18
    },
    {
      id: 'beauty',
      name: 'বিউটি সেবা',
      icon: <Scissors className="h-6 w-6" />,
      color: 'bg-pink-100 text-pink-600',
      count: 24
    },
    {
      id: 'delivery',
      name: 'ডেলিভারি সেবা',
      icon: <Truck className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600',
      count: 15
    },
    {
      id: 'education',
      name: 'শিক্ষা সেবা',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-indigo-100 text-indigo-600',
      count: 21
    },
    {
      id: 'repair',
      name: 'মেরামত সেবা',
      icon: <Wrench className="h-6 w-6" />,
      color: 'bg-gray-100 text-gray-600',
      count: 38
    }
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'AC সার্ভিসিং ও মেরামত',
      provider: 'টেক সার্ভিস প্রো',
      rating: 4.9,
      reviews: 245,
      price: '৳ ১,৫০০',
      location: 'ধানমন্ডি, ঢাকা',
      isVerified: true,
      responseTime: '৩০ মিনিট',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'ঘর পরিষ্কার সেবা',
      provider: 'ক্লিন হোম',
      rating: 4.8,
      reviews: 189,
      price: '৳ ৮০০',
      location: 'গুলশান, ঢাকা',
      isVerified: true,
      responseTime: '১ ঘণ্টা',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'কার ওয়াশ সেবা',
      provider: 'অটো কেয়ার',
      rating: 4.7,
      reviews: 156,
      price: '৳ ৫০০',
      location: 'বনানী, ঢাকা',
      isVerified: false,
      responseTime: '৪৫ মিনিট',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">সার্ভিস সমূহ</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় সেবা খুঁজে নিন</p>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="সেবা খুঁজুন..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">সেবার ক্যাটাগরি</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full ${category.color} mb-3`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}টি
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">জনপ্রিয় সেবা</h2>
        <div className="space-y-4">
          {featuredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{service.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">{service.provider}</span>
                          {service.isVerified && (
                            <Badge variant="outline" className="h-5 text-xs bg-green-50 text-green-600 border-green-200">
                              ভেরিফাইড
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{service.price}</p>
                        <p className="text-xs text-muted-foreground">থেকে শুরু</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{service.rating}</span>
                        <span className="ml-1">({service.reviews})</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button className="px-8">
          আরো সেবা দেখুন
        </Button>
      </div>
    </div>
  );
};

export default Services;
