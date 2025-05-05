
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaintBucket, Truck, House, AirVent, Zap, Ruler, Wrench, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const ServiceCategories = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  
  // সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories = [
    {
      id: 'painting',
      name: 'Painting',
      namebn: 'পেইন্টিং',
      icon: <PaintBucket size={40} className="text-purple-500" />,
      path: '/services/category/painting',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
    },
    {
      id: 'packers-movers',
      name: 'Packers & Movers',
      namebn: 'প্যাকার্স & মুভার্স',
      icon: <Truck size={40} className="text-orange-500" />,
      path: '/services/category/packers-movers',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
    },
    {
      id: 'home-cleaning',
      name: 'Home Cleaning',
      namebn: 'হোম ক্লিনিং',
      icon: <House size={40} className="text-green-500" />,
      path: '/services/category/home-cleaning',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
    },
    {
      id: 'ac-repair',
      name: 'AC Repair',
      namebn: 'এসি রিপেয়ার',
      icon: <AirVent size={40} className="text-sky-500" />,
      path: '/services/category/ac-repair',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
    },
    {
      id: 'electrician',
      name: 'Electrician',
      namebn: 'ইলেকট্রিশিয়ান',
      icon: <Zap size={40} className="text-yellow-500" />,
      path: '/services/category/electrician',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
    },
    {
      id: 'carpentry',
      name: 'Carpentry',
      namebn: 'কার্পেন্ট্রি',
      icon: <Ruler size={40} className="text-amber-500" />,
      path: '/services/category/carpentry',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
    },
    {
      id: 'plumbing',
      name: 'Plumbing',
      namebn: 'প্লাম্বিং',
      icon: <Wrench size={40} className="text-blue-500" />,
      path: '/services/category/plumbing',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
    },
    {
      id: 'home-renovation',
      name: 'Home Renovation',
      namebn: 'হোম রেনোভেশন',
      icon: <Home size={40} className="text-red-500" />,
      path: '/services/category/home-renovation',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
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

  // কোন সার্ভিস বাটনে ক্লিক করা হলে
  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  // ভিউ লেস/মোর বাটনে ক্লিক করা হলে
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container px-4 mt-6 mb-10">
      {/* ফিচার্ড সার্ভিস হেডার */}
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
        {serviceCategories.slice(0, expanded ? serviceCategories.length : 4).map((category) => (
          <div 
            key={category.id} 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => handleServiceClick(category.path)}
          >
            <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center mb-2">
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
        onClick={toggleExpanded}
      >
        {expanded ? "ভিউ লেস ↑" : "ভিউ মোর ↓"}
      </Button>

      {/* অন্যান্য সেবা অফার সেকশন */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">আরও সেবাসমূহ</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {serviceCategories.slice(0, 4).map((category) => (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleServiceClick(category.path)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(category.icon as React.ReactElement, { size: 24 })}
                </div>
                <div>
                  <h4 className="font-medium">{category.namebn}</h4>
                  <p className="text-sm text-muted-foreground">সর্বনিম্ন মূল্যে</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories;
