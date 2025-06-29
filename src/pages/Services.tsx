import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, Filter, Star, MapPin, Clock, Users, Share2, Bookmark, 
  Heart, ArrowUpRight, Stethoscope, Scissors, Wrench, Smartphone, 
  UtensilsCrossed, Brush, Hammer, Bug, GraduationCap, Camera, 
  Package, Laptop, PartyPopper, Building, Car, Phone, Video, 
  Home, Truck, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = [
    {
      id: 'medical',
      name: 'ডাক্তার ও স্বাস্থ্য সেবা',
      icon: <Stethoscope className="h-7 w-7" />,
      color: 'bg-red-50',
      iconColor: 'text-red-500',
      count: 156,
      subcategories: ['জেনারেল ডাক্তার', 'শিশু চিকিৎসক', 'গাইনী', 'চক্ষু চিকিৎসক', 'মানসিক স্বাস্থ্য'],
      bookingTypes: ['হোম ভিজিট', 'ভিডিও কনসালটেশন', 'চেম্বার ভিজিট']
    },
    {
      id: 'dental',
      name: 'ডেন্টাল কেয়ার',
      icon: <Users className="h-7 w-7" />,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      count: 89,
      subcategories: ['দাঁত ফিলিং', 'ব্রেসিং', 'স্কেলিং ও ক্লিনিং', 'রুট ক্যানাল'],
      bookingTypes: ['চেম্বার ভিজিট', 'হোম সার্ভিস', 'ভিডিও কনসাল্ট']
    },
    {
      id: 'salon',
      name: 'সেলুন ও বিউটি সার্ভিস',
      icon: <Scissors className="h-7 w-7" />,
      color: 'bg-pink-50',
      iconColor: 'text-pink-500',
      count: 234,
      subcategories: ['পুরুষ হেয়ার কাট', 'মহিলা হেয়ার কাট', 'ফেসিয়াল ও স্কিন কেয়ার', 'ওয়েডিং মেকআপ'],
      bookingTypes: ['হোম সার্ভিস', 'পার্লার ভিজিট']
    },
    {
      id: 'electronics',
      name: 'ইলেকট্রনিক্স রিপেয়ার',
      icon: <Wrench className="h-7 w-7" />,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      count: 178,
      subcategories: ['ফ্রিজ', 'এসি', 'টিভি', 'ওভেন'],
      bookingTypes: ['হোম ভিজিট', 'ডেলিভারি রিপেয়ার']
    },
    {
      id: 'mobile',
      name: 'মোবাইল ও গ্যাজেট সার্ভিস',
      icon: <Smartphone className="h-7 w-7" />,
      color: 'bg-purple-50',
      iconColor: 'text-purple-500',
      count: 145,
      subcategories: ['মোবাইল রিপেয়ার', 'ল্যাপটপ সার্ভিস', 'ডিসপ্লে রিপ্লেস', 'সফটওয়্যার ইনস্টল'],
      bookingTypes: ['পিক-আপ সার্ভিস', 'হোম সার্ভিস', 'ভিডিও ডায়াগনসিস']
    },
    {
      id: 'cooking',
      name: 'খাবার ও কুকিং সার্ভিস',
      icon: <UtensilsCrossed className="h-7 w-7" />,
      color: 'bg-orange-50',
      iconColor: 'text-orange-500',
      count: 67,
      subcategories: ['হোম কুক', 'ক্যাটারিং', 'রান্নার সহকারী', 'হেলদি ফুড প্রিপারেশন'],
      bookingTypes: ['সাপ্তাহিক সাবস্ক্রিপশন', 'নির্দিষ্ট তারিখে বুকিং']
    },
    {
      id: 'cleaning',
      name: 'হাউজ ক্লিনিং সার্ভিস',
      icon: <Brush className="h-7 w-7" />,
      color: 'bg-green-50',
      iconColor: 'text-green-500',
      count: 198,
      subcategories: ['ঘর ঝাড়ু ও মপিং', 'বাথরুম ক্লিন', 'সোফা/কার্পেট ওয়াশ', 'অফিস ক্লিনিং'],
      bookingTypes: ['One-Time', 'Weekly/Monthly Plan']
    },
    {
      id: 'furniture',
      name: 'ফার্নিচার মেকিং/রিপেয়ার',
      icon: <Hammer className="h-7 w-7" />,
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      count: 76,
      subcategories: ['কাঠের বিছানা তৈরি', 'সোফা ফোম চেঞ্জ', 'কাঠ মেরামত', 'ইন্টেরিয়র কাঠ কাজ'],
      bookingTypes: ['কাস্টম কোট', 'ভিডিও কল কনসাল্ট']
    }
  ];

  const allServices = [
    {
      id: 1,
      title: 'হোম ভিজিট ডাক্তার',
      provider: 'ডা. আহমেদ হাসান',
      category: 'medical',
      subcategory: 'জেনারেল ডাক্তার',
      location: 'গুলশান, ঢাকা',
      price: '৳১,৫০০',
      rating: 4.8,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      isVerified: true,
      bookingTypes: ['হোম ভিজিট', 'ভিডিও কনসালটেশন'],
      responseTime: '৩০ মিনিট'
    },
    {
      id: 2,
      title: 'ডেন্টাল চেকআপ',
      provider: 'ডা. ফারহানা আক্তার',
      category: 'dental',
      subcategory: 'দাঁত ফিলিং',
      location: 'বনানী, ঢাকা',
      price: '৳১,২০০',
      rating: 4.7,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      isVerified: true,
      bookingTypes: ['চেম্বার ভিজিট', 'হোম সার্ভিস'],
      responseTime: '১ ঘণ্টা'
    },
    {
      id: 3,
      title: 'প্রিমিয়াম হেয়ার কাট',
      provider: 'স্টাইল সেলুন',
      category: 'salon',
      subcategory: 'পুরুষ হেয়ার কাট',
      location: 'ধানমন্ডি, ঢাকা',
      price: '৳৮০০',
      rating: 4.5,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      isVerified: false,
      bookingTypes: ['হোম সার্ভিস', 'পার্লার ভিজিট'],
      responseTime: '৪৫ মিনিট'
    },
    {
      id: 4,
      title: 'এসি সার্ভিসিং',
      provider: 'কুল টেক সার্ভিস',
      category: 'electronics',
      subcategory: 'এসি',
      location: 'মোহাম্মদপুর, ঢাকা',
      price: '৳১,৮০০',
      rating: 4.6,
      reviews: 154,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      isVerified: true,
      bookingTypes: ['হোম ভিজিট'],
      responseTime: '২ ঘণ্টা'
    },
    {
      id: 5,
      title: 'মোবাইল স্ক্রিন রিপেয়ার',
      provider: 'টেক ফিক্স',
      category: 'mobile',
      subcategory: 'মোবাইল রিপেয়ার',
      location: 'উত্তরা, ঢাকা',
      price: '৳২,৫০০',
      rating: 4.4,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      isVerified: true,
      bookingTypes: ['পিক-আপ সার্ভিস', 'হোম সার্ভিস'],
      responseTime: '১ দিন'
    },
    {
      id: 6,
      title: 'হোম ক্লিনিং সার্ভিস',
      provider: 'ক্লিন হোম',
      category: 'cleaning',
      subcategory: 'ঘর ঝাড়ু ও মপিং',
      location: 'গুলশান, ঢাকা',
      price: '৳১,২০০',
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      isVerified: true,
      bookingTypes: ['One-Time', 'Weekly Plan'],
      responseTime: '৩ ঘণ্টা'
    }
  ];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookmark = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে"
    });
  };

  const handleShare = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: "সার্ভিসটি শেয়ার করার লিংক কপি করা হয়েছে"
    });
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const handleBookService = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    navigate(`/services/${serviceId}/book`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">সার্ভিস সমূহ</h1>
        <p className="text-muted-foreground">আপনার প্রয়োজনীয় সেবা খুঁজে নিন</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="সেবা খুঁজুন..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Service Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div 
            className={`flex flex-col items-center text-center p-4 rounded-lg transition-colors cursor-pointer ${
              selectedCategory === 'all' ? 'bg-primary/10 border-2 border-primary' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Users className="h-7 w-7 text-gray-500" />
            </div>
            <h3 className="font-medium text-sm mb-2">সব সার্ভিস</h3>
            <Badge variant="secondary" className="text-xs">
              {allServices.length}টি
            </Badge>
          </div>
          
          {serviceCategories.slice(0, 7).map(category => (
            <div 
              key={category.id} 
              className={`flex flex-col items-center text-center p-4 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === category.id ? 'bg-primary/10 border-2 border-primary' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                <div className={category.iconColor}>
                  {category.icon}
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2">{category.name}</h3>
              <Badge variant="secondary" className="text-xs">
                {category.count}টি
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {selectedCategory === 'all' ? 'সকল সার্ভিস' : 
             serviceCategories.find(c => c.id === selectedCategory)?.name || 'সার্ভিস'}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredServices.length}টি সার্ভিস পাওয়া গেছে
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(service => (
            <Card 
              key={service.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleServiceClick(service.id)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2">
                    {serviceCategories.find(c => c.id === service.category)?.name}
                  </Badge>
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white h-8 w-8 rounded-full"
                      onClick={(e) => handleBookmark(e, service.id)}
                    >
                      <Heart className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white h-8 w-8 rounded-full"
                      onClick={(e) => handleShare(e, service.id)}
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {service.subcategory}
                    </Badge>
                    {service.isVerified && (
                      <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                        <CheckCircle className="h-3 w-3" /> ভেরিফায়েড
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-medium text-lg mb-1 line-clamp-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{service.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs mb-3">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{service.rating}</span>
                    </div>
                    <span>({service.reviews} রিভিউ)</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{service.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {service.bookingTypes.map((type, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-lg">{service.price}</span>
                    <Button 
                      size="sm" 
                      className="gap-1"
                      onClick={(e) => handleBookService(e, service.id)}
                    >
                      বুক করুন <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Show More Button */}
      <div className="text-center">
        <Button className="px-8">
          আরো সেবা দেখুন
        </Button>
      </div>
    </div>
  );
};

export default Services;
