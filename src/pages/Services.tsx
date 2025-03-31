
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin,
  Star,
  Filter,
  ChevronDown,
  ChevronUp,
  BadgeCheck
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceProviderCard } from '@/components/ServiceProviderCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Services = () => {
  const [filterExpanded, setFilterExpanded] = useState(false);
  const navigate = useNavigate();

  // Banner images for Services
  const bannerImages = [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop",
  ];

  // Service Categories
  const serviceCategories = [
    { name: "ডাক্তার", icon: "🩺", count: 152 },
    { name: "ডেন্টাল", icon: "🦷", count: 89 },
    { name: "মেন্টাল হেলথ", icon: "🧠", count: 63 },
    { name: "ল", icon: "⚖️", count: 54 },
    { name: "রিপেয়ার", icon: "🔧", count: 87 },
    { name: "হোম সার্ভিস", icon: "🏠", count: 105 },
    { name: "বিউটি", icon: "💇‍♀️", count: 93 },
    { name: "কনসালটেন্সি", icon: "💼", count: 76 },
  ];

  // Featured Services
  const featuredServices = [
    {
      id: 1,
      title: "হার্ট স্পেশালিষ্ট অ্যাপয়েন্টমেন্ট",
      provider: "ডা. রহমান হার্ট কেয়ার",
      price: "৳১,৫০০",
      rating: 4.8,
      reviewCount: 245,
      location: "গুলশান, ঢাকা",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=300&auto=format&fit=crop",
      tags: ["কার্ডিওলজি", "হার্ট"]
    },
    {
      id: 2,
      title: "ডেন্টাল চেকআপ ও ক্লিনিং",
      provider: "শাইন ডেন্টাল কেয়ার",
      price: "৳২,০০০",
      rating: 4.7,
      reviewCount: 189,
      location: "বনানী, ঢাকা",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=300&auto=format&fit=crop",
      tags: ["ডেন্টাল", "অরাল হেলথ"]
    },
    {
      id: 3,
      title: "মেন্টাল হেলথ কাউন্সেলিং",
      provider: "মাইন্ড মেটার্স",
      price: "৳১,২০০",
      rating: 4.9,
      reviewCount: 156,
      location: "ধানমন্ডি, ঢাকা",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=300&auto=format&fit=crop",
      tags: ["কাউন্সেলিং", "থেরাপি"]
    },
    {
      id: 4,
      title: "ফিজিওথেরাপি সেশন",
      provider: "হেলথি বডি ফিজিও",
      price: "৳১,৮০০",
      rating: 4.6,
      reviewCount: 127,
      location: "মিরপুর, ঢাকা",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=300&auto=format&fit=crop",
      tags: ["ফিজিওথেরাপি", "পেইন রিলিফ"]
    },
  ];

  // Function to handle clicking on a service
  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with search */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">সার্ভিসেস</h1>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="সার্ভিস খুঁজুন" 
              className="pl-9" 
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setFilterExpanded(!filterExpanded)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Panel - conditional rendering */}
      {filterExpanded && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="font-medium mb-3">ফিল্টার করুন</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">ক্যাটাগরি</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">সব ক্যাটাগরি</option>
                <option value="doctor">ডাক্তার</option>
                <option value="dental">ডেন্টাল</option>
                <option value="mental-health">মেন্টাল হেলথ</option>
                <option value="law">ল</option>
                <option value="repair">রিপেয়ার</option>
                <option value="home-service">হোম সার্ভিস</option>
                <option value="beauty">বিউটি</option>
                <option value="consultancy">কনসালটেন্সি</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">লোকেশন</label>
              <select className="w-full p-2 border rounded-md">
                <option value="">সব লোকেশন</option>
                <option value="gulshan">গুলশান</option>
                <option value="banani">বনানী</option>
                <option value="dhanmondi">ধানমন্ডি</option>
                <option value="mirpur">মিরপুর</option>
                <option value="mohammadpur">মোহাম্মদপুর</option>
                <option value="uttara">উত্তরা</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">মূল্য</label>
              <div className="flex gap-2">
                <Input type="number" placeholder="সর্বনিম্ন" />
                <Input type="number" placeholder="সর্বোচ্চ" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setFilterExpanded(false)}>
              বাতিল
            </Button>
            <Button>
              ফিল্টার করুন
            </Button>
          </div>
        </div>
      )}

      {/* Categories section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {serviceCategories.map((category, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => navigate(`/services/category/${category.name}`)}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <span className="text-xs text-center">{category.name}</span>
              <Badge variant="outline" className="mt-1">{category.count}</Badge>
            </div>
          ))}
        </div>
      </div>
      
      {/* Banner section */}
      <div className="mb-6 overflow-hidden rounded-lg">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-[16/6] w-full">
                    <img 
                      src={image} 
                      alt={`Banner ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>

      {/* Services listing */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">ফিচার্ড সার্ভিস</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/services')}>
            সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredServices.map((service) => (
            <Card 
              key={service.id}
              className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                {service.rating >= 4.8 && (
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    <BadgeCheck className="h-3 w-3 mr-1" /> বেস্ট সেলার
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-base mb-1 line-clamp-1">{service.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="line-clamp-1">{service.location}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">{service.rating}</span>
                  </div>
                  <span className="mx-1">•</span>
                  <span>{service.reviewCount} রিভিউ</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{service.price}</span>
                  <Button size="sm">বুক করুন</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
