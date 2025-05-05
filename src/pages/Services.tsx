
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, Star, Calendar, PaintBucket, Truck, House, AirVent, Zap, Ruler, Wrench, Home } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedServices, setExpandedServices] = useState(true);

  // সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories = [
    {
      id: 'painting',
      name: 'Painting',
      namebn: 'পেইন্টিং',
      icon: <PaintBucket className="h-10 w-10 text-purple-500" />,
      path: '/services/category/painting',
    },
    {
      id: 'packers-movers',
      name: 'Packers & Movers',
      namebn: 'প্যাকার্স & মুভার্স',
      icon: <Truck className="h-10 w-10 text-orange-500" />,
      path: '/services/category/packers-movers',
    },
    {
      id: 'home-cleaning',
      name: 'Home Cleaning',
      namebn: 'হোম ক্লিনিং',
      icon: <House className="h-10 w-10 text-green-500" />,
      path: '/services/category/home-cleaning',
    },
    {
      id: 'ac-repair',
      name: 'AC Repair',
      namebn: 'এসি রিপেয়ার',
      icon: <AirVent className="h-10 w-10 text-sky-500" />,
      path: '/services/category/ac-repair',
    },
    {
      id: 'electrician',
      name: 'Electrician',
      namebn: 'ইলেকট্রিশিয়ান',
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      path: '/services/category/electrician',
    },
    {
      id: 'carpentry',
      name: 'Carpentry',
      namebn: 'কার্পেন্ট্রি',
      icon: <Ruler className="h-10 w-10 text-amber-500" />,
      path: '/services/category/carpentry',
    },
    {
      id: 'plumbing',
      name: 'Plumbing',
      namebn: 'প্লাম্বিং',
      icon: <Wrench className="h-10 w-10 text-blue-500" />,
      path: '/services/category/plumbing',
    },
    {
      id: 'home-renovation',
      name: 'Home Renovation',
      namebn: 'হোম রেনোভেশন',
      icon: <Home className="h-10 w-10 text-red-500" />,
      path: '/services/category/home-renovation',
    }
  ];

  // সেবাভেদে অফার ও প্রাইস
  const offers = [
    {
      id: 'lowest-quote',
      text: 'Lowest Quote*',
      textbn: 'সর্বনিম্ন কোটেশন*'
    },
    {
      id: 'starting-price',
      text: 'Starts @ ₹359/-',
      textbn: 'শুরু ₹৩৫৯/- থেকে'
    },
    {
      id: 'discount',
      text: 'Upto 30% Off*',
      textbn: 'সর্বোচ্চ ৩০% ছাড়*'
    }
  ];

  // ডেমো সার্ভিস ডেটা
  const servicesData = [
    {
      id: '1',
      title: 'প্রফেশনাল প্যাকিং সার্ভিস',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      category: 'মুভিং',
      rating: 4.8,
      reviews: 120,
      price: '৳১০০০',
      location: 'ঢাকা'
    },
    {
      id: '2',
      title: 'হোম পেইন্টিং সার্ভিস',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      category: 'পেইন্টিং',
      rating: 4.7,
      reviews: 85,
      price: '৳৮০০',
      location: 'ঢাকা'
    },
    {
      id: '3',
      title: 'এসি রিপেয়ার এক্সপার্ট',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      category: 'রিপেয়ার',
      rating: 4.9,
      reviews: 150,
      price: '৳৫০০',
      location: 'চট্টগ্রাম'
    },
    {
      id: '4',
      title: 'ইলেকট্রিক্যাল সার্ভিস',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      category: 'ইলেকট্রিক্যাল',
      rating: 4.6,
      reviews: 70,
      price: '৳৬০০',
      location: 'রাজশাহী'
    }
  ];

  // ভিউ লেস/মোর বাটনে ক্লিক করা হলে
  const toggleExpandedServices = () => {
    setExpandedServices(!expandedServices);
  };

  // কোন সার্ভিস বাটনে ক্লিক করা হলে
  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&category=services`);
    }
  };

  const handleServiceCardClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">সার্ভিস</h1>
        <p className="text-gray-500">বিভিন্ন ধরনের সার্ভিস খুঁজুন ও বুকিং করুন</p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="সার্ভিস খুঁজুন" 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button size="icon" variant="outline" onClick={() => navigate('/services/filter')}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* ফিচার্ড সার্ভিস সেকশন */}
      <div className="mb-8">
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <div className="aspect-[16/7] w-full">
            <img 
              src="/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png" 
              alt="Packers and Movers" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-white">
                <img 
                  src="/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png" 
                  alt="Packers and Movers Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white">Packers and Movers</h2>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 rounded-md">
              Book
            </Button>
          </div>
        </div>

        {/* অফার ব্যাজ সেকশন */}
        <div className="flex justify-center gap-3 mb-6">
          {offers.map((offer) => (
            <Badge 
              key={offer.id} 
              variant="outline" 
              className="py-2 px-4 rounded-full bg-amber-50 border-amber-200 text-amber-800 font-medium"
            >
              {offer.textbn}
            </Badge>
          ))}
        </div>

        {/* সার্ভিস ক্যাটাগরি গ্রিড */}
        <div className="grid grid-cols-4 gap-4">
          {serviceCategories.slice(0, expandedServices ? serviceCategories.length : 4).map((category) => (
            <div 
              key={category.id} 
              className="flex flex-col items-center cursor-pointer" 
              onClick={() => handleServiceClick(category.path)}
            >
              <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <p className="text-center font-medium">{category.namebn}</p>
            </div>
          ))}
        </div>

        {/* ভিউ লেস/মোর বাটন */}
        <Button 
          variant="default" 
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
          onClick={toggleExpandedServices}
        >
          {expandedServices ? "ভিউ লেস ↑" : "ভিউ মোর ↓"}
        </Button>
      </div>

      {/* উপলব্ধ সার্ভিস সেকশন */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">উপলব্ধ সার্ভিস</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {servicesData.map((service) => (
            <Card 
              key={service.id} 
              onClick={() => handleServiceCardClick(service.id)}
              className="cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex">
                <div className="w-1/3">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
                <CardContent className="w-2/3 p-3">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline">{service.category}</Badge>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500 mr-1" />
                      <span className="text-xs">{service.rating} ({service.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-base">{service.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-primary">{service.price}</p>
                    <Button size="sm" className="h-8 gap-1">
                      বুক করুন <Calendar className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
