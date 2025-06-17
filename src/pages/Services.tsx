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
  ShoppingBag,
  Sofa,
  Book,
  School,
  Tractor,
  Store
} from 'lucide-react';

const Services = () => {
  const serviceCategories = [
    {
      id: 'home',
      name: 'বাসা বাড়ি',
      icon: <Home className="h-7 w-7" />,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      count: 892
    },
    {
      id: 'electronics',
      name: 'ইলেকট্রনিক্স',
      icon: <Monitor className="h-7 w-7" />,
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
      count: 324
    },
    {
      id: 'transport',
      name: 'পরিবহন',
      icon: <Car className="h-7 w-7" />,
      color: 'bg-red-50',
      iconColor: 'text-red-500',
      count: 178
    },
    {
      id: 'outdoor',
      name: 'ইভেন্ট সামগ্রী',
      icon: <Tractor className="h-7 w-7" />,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      count: 89
    },
    {
      id: 'furniture',
      name: 'ঘরোয়া সামগ্রী',
      icon: <Sofa className="h-7 w-7" />,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
      count: 145
    },
    {
      id: 'education',
      name: 'শিক্ষা সামগ্রী',
      icon: <Book className="h-7 w-7" />,
      color: 'bg-orange-50',
      iconColor: 'text-orange-500',
      count: 65
    },
    {
      id: 'agriculture',
      name: 'কৃষি যন্ত্রপাতি',
      icon: <School className="h-7 w-7" />,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      count: 42
    },
    {
      id: 'business',
      name: 'ব্যবসায়িক সামগ্রী',
      icon: <Store className="h-7 w-7" />,
      color: 'bg-pink-50',
      iconColor: 'text-pink-500',
      count: 86
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
        <h2 className="text-lg font-semibold mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {serviceCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                <div className={category.iconColor}>
                  {category.icon}
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2">{category.name}</h3>
              <Badge variant="success" className="text-xs">
                {category.count}টি
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
