
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SearchFilterSection } from '@/components/shared/SearchFilterSection';
import { 
  Wrench, 
  Paintbrush, 
  Zap, 
  Car, 
  Home, 
  MapPin, 
  Star, 
  Heart, 
  Share2,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const serviceCategories = [
    {
      id: 'cleaning',
      name: 'ঘর পরিষ্কার',
      icon: <Home className="h-7 w-7" />,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      count: 156
    },
    {
      id: 'ac-service',
      name: 'AC সার্ভিসিং',
      icon: <Wrench className="h-7 w-7" />,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      count: 89
    },
    {
      id: 'plumbing',
      name: 'প্লাম্বিং',
      icon: <Wrench className="h-7 w-7" />,
      color: 'bg-red-50',
      iconColor: 'text-red-500',
      count: 124
    },
    {
      id: 'electrical',
      name: 'ইলেকট্রিশিয়ান',
      icon: <Zap className="h-7 w-7" />,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      count: 98
    },
    {
      id: 'painting',
      name: 'পেইন্টিং',
      icon: <Paintbrush className="h-7 w-7" />,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
      count: 67
    },
    {
      id: 'car-service',
      name: 'কার সার্ভিস',
      icon: <Car className="h-7 w-7" />,
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-500',
      count: 73
    },
    {
      id: 'delivery',
      name: 'ডেলিভারি',
      icon: <Car className="h-7 w-7" />,
      color: 'bg-pink-50',
      iconColor: 'text-pink-500',
      count: 142
    },
    {
      id: 'repair',
      name: 'মেরামত সেবা',
      icon: <Wrench className="h-7 w-7" />,
      color: 'bg-orange-50',
      iconColor: 'text-orange-500',
      count: 85
    }
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'এসি সার্ভিসিং ও রিপেয়ার',
      provider: 'কুলিং সল্যুশন',
      location: 'ধানমন্ডি, ঢাকা',
      price: '৳ ১,৫০০',
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      category: 'AC সার্ভিস',
      verified: true,
      responseTime: '৩০ মিনিট'
    },
    {
      id: 2,
      title: 'ঘর পরিষ্কার সেবা',
      provider: 'ক্লিন হোম',
      location: 'গুলশান, ঢাকা',
      price: '৳ ২,০০০',
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1558618666-fd7c37c8ea71?w=400&h=300&fit=crop',
      category: 'পরিষ্কার',
      verified: true,
      responseTime: '১ ঘণ্টা'
    },
    {
      id: 3,
      title: 'প্লাম্বিং সার্ভিস',
      provider: 'ফিক্স ইট',
      location: 'মিরপুর, ঢাকা',
      price: '৳ ১,২০০',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=400&h=300&fit=crop',
      category: 'প্লাম্বিং',
      verified: false,
      responseTime: '৪৫ মিনিট'
    },
    {
      id: 4,
      title: 'ইলেকট্রিক্যাল রিপেয়ার',
      provider: 'পাওয়ার সল্যুশন',
      location: 'উত্তরা, ঢাকা',
      price: '৳ ৮০০',
      rating: 4.7,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
      category: 'ইলেকট্রিক্যাল',
      verified: true,
      responseTime: '২০ মিনিট'
    }
  ];

  const handleServiceClick = (id: number) => {
    toast({
      title: "সার্ভিস বুক করুন",
      description: `সার্ভিস #${id} বুক করার জন্য যোগাযোগ করুন`
    });
  };

  const handleBookmark = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast({
      title: "বুকমার্ক করা হয়েছে",
      description: `সার্ভিস #${id} বুকমার্ক তালিকায় যোগ করা হয়েছে`
    });
  };

  const handleShare = (e: React.MouseEvent, service: any) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: `${service.title} শেয়ার করা হচ্ছে`
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">সার্ভিস</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় সেবা খুঁজে নিন</p>
      </div>

      <SearchFilterSection
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder="সার্ভিস খুঁজুন..."
      />

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">সার্ভিস ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-4">
          {serviceCategories.map((category) => (
            <div key={category.id} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                <div className={category.iconColor}>
                  {category.icon}
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2">{category.name}</h3>
              <Badge variant="success" className="text-xs">
                {category.count} সেবা
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
          <h2 className="text-lg font-semibold">জনপ্রিয় সার্ভিস</h2>
          <Button variant="outline" size="sm">
            সব দেখুন
          </Button>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' : 'space-y-4'}>
          {featuredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" onClick={() => handleServiceClick(service.id)}>
              {viewMode === 'grid' ? (
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2">{service.category}</Badge>
                    {service.verified && (
                      <div className="absolute top-2 left-2 mt-8">
                        <CheckCircle className="h-4 w-4 text-green-500 bg-white rounded-full" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleBookmark(e, service.id)}>
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleShare(e, service)}>
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1 mb-1">{service.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{service.provider}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{service.location}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{service.rating}</span>
                      <span className="text-xs text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">{service.price}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-green-600">{service.responseTime}</span>
                      </div>
                    </div>
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
                      <Badge className="absolute -top-1 -left-1 text-xs">{service.category}</Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{service.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{service.provider}</p>
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{service.location}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{service.rating}</span>
                        <span className="text-xs text-muted-foreground">({service.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">{service.price}</span>
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={(e) => handleBookmark(e, service.id)}>
                            <Heart className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={(e) => handleShare(e, service)}>
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
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
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-medium">মোট সার্ভিস প্রোভাইডার</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৮৯৪</span>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <TrendingUp className="h-3 w-3 mr-1" />
                +১৮%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              <span className="font-medium">আজকের বুকিং</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">১২৭</span>
              <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                <Clock className="h-3 w-3 mr-1" />
                সক্রিয়
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">সম্পন্ন সার্ভিস</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৩,৪৫৬</span>
              <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                <Users className="h-3 w-3 mr-1" />
                সন্তুষ্ট
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;
