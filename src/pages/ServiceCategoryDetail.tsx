
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Calendar, ChevronLeft, PaintBucket, Truck, House, AirVent, Zap, Ruler, Wrench, Home } from 'lucide-react';

const ServiceCategoryDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  // সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories = {
    'painting': {
      id: 'painting',
      name: 'Painting',
      namebn: 'পেইন্টিং',
      icon: <PaintBucket className="h-10 w-10 text-purple-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'পেশাদার পেইন্টিং সার্ভিস, ইন্টেরিয়র ও এক্সটেরিয়র দেয়াল সাজাতে এক্সপার্টদের সাহায্য নিন।'
    },
    'packers-movers': {
      id: 'packers-movers',
      name: 'Packers & Movers',
      namebn: 'প্যাকার্স & মুভার্স',
      icon: <Truck className="h-10 w-10 text-orange-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'যত্ন সহকারে আপনার সমস্ত জিনিসপত্র প্যাকিং করে নতুন লোকেশনে পৌঁছে দেওয়ার জন্য ভরসাযোগ্য সেবা।'
    },
    'home-cleaning': {
      id: 'home-cleaning',
      name: 'Home Cleaning',
      namebn: 'হোম ক্লিনিং',
      icon: <House className="h-10 w-10 text-green-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'বাড়ির সমস্ত ঘর, বাথরুম, রান্নাঘর পরিষ্কার করার জন্য বিশেষজ্ঞদের সাহায্য নিন।'
    },
    'ac-repair': {
      id: 'ac-repair',
      name: 'AC Repair',
      namebn: 'এসি রিপেয়ার',
      icon: <AirVent className="h-10 w-10 text-sky-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'এসি সার্ভিসিং, মেরামত ও ইনস্টলেশন এবং অন্যান্য এসি সম্পর্কিত সমস্যার সমাধান।'
    },
    'electrician': {
      id: 'electrician',
      name: 'Electrician',
      namebn: 'ইলেকট্রিশিয়ান',
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'বিদ্যুৎ সংক্রান্ত সমস্ত সমস্যার দ্রুত ও নিরাপদ সমাধান এবং নতুন ইলেকট্রিক্যাল সেটআপ।'
    },
    'carpentry': {
      id: 'carpentry',
      name: 'Carpentry',
      namebn: 'কার্পেন্ট্রি',
      icon: <Ruler className="h-10 w-10 text-amber-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'দক্ষ কারিগরদের মাধ্যমে আসবাবপত্র মেরামত, নির্মাণ ও সংস্কার সেবা।'
    },
    'plumbing': {
      id: 'plumbing',
      name: 'Plumbing',
      namebn: 'প্লাম্বিং',
      icon: <Wrench className="h-10 w-10 text-blue-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'পানি লিক, পাইপ মেরামত, নতুন প্লাম্বিং সিস্টেম ইনস্টল এবং অন্যান্য সেবা।'
    },
    'home-renovation': {
      id: 'home-renovation',
      name: 'Home Renovation',
      namebn: 'হোম রেনোভেশন',
      icon: <Home className="h-10 w-10 text-red-500" />,
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      description: 'বাড়ির পুরো বা আংশিক সংস্কার, আধুনিকীকরণ এবং নতুন নকশা বাস্তবায়ন।'
    }
  };

  const getCategory = () => {
    return serviceCategories[categoryId as keyof typeof serviceCategories] || serviceCategories['packers-movers'];
  };

  const category = getCategory();

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

  // ডেমো সার্ভিস প্রভাইডার ডেটা
  const serviceProviders = [
    {
      id: '1',
      name: 'সুপার কোয়ালিটি সার্ভিস',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      rating: 4.8,
      reviews: 120,
      price: '৳১০০০',
      location: 'ঢাকা',
      verified: true
    },
    {
      id: '2',
      name: 'প্রফেশনাল এক্সপার্টস',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      rating: 4.7,
      reviews: 85,
      price: '৳৮০০',
      location: 'ঢাকা',
      verified: true
    },
    {
      id: '3',
      name: 'রিলায়েবল সার্ভিস',
      image: '/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png',
      rating: 4.9,
      reviews: 150,
      price: '৳৫০০',
      location: 'চট্টগ্রাম',
      verified: false
    }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  const handleServiceProviderClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <Button variant="ghost" onClick={handleBack} className="mb-2">
        <ChevronLeft className="h-4 w-4 mr-2" />
        ফিরে যান
      </Button>
      
      {/* সার্ভিস ক্যাটাগরি হেডার */}
      <div className="relative mb-4 rounded-lg overflow-hidden">
        <div className="aspect-[16/7] w-full">
          <img 
            src={category.image}
            alt={category.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
              {category.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{category.namebn}</h2>
              <p className="text-white/80 text-sm">{category.name}</p>
            </div>
          </div>
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

      {/* ক্যাটাগরি বিবরণ সেকশন */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{category.namebn} সার্ভিস</h2>
        <p className="text-gray-600 mb-4">{category.description}</p>
        <Button className="w-full bg-teal-500 hover:bg-teal-600">
          বুক করুন
        </Button>
      </div>

      {/* সার্ভিস প্রভাইডার সেকশন */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">উপলব্ধ সার্ভিস প্রভাইডার</h2>
        <div className="grid grid-cols-1 gap-4">
          {serviceProviders.map((provider) => (
            <Card 
              key={provider.id} 
              onClick={() => handleServiceProviderClick(provider.id)}
              className="cursor-pointer hover:shadow-md transition-all"
            >
              <div className="flex">
                <div className="w-1/3 md:w-1/4">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
                <CardContent className="w-2/3 md:w-3/4 p-3">
                  <div className="flex items-center justify-between mb-1">
                    {provider.verified && <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">প্রমাণিত</Badge>}
                    <div className="flex items-center text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500 mr-1" />
                      <span className="text-xs">{provider.rating} ({provider.reviews})</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-base">{provider.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-bold text-primary">শুরু {provider.price} থেকে</p>
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

export default ServiceCategoryDetail;
