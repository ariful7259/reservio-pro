import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  MapPin, 
  Filter,
  ChevronLeft,
  CheckCircle,
  Share2,
  Bookmark,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const ServiceCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categoryName, setCategoryName] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);

  const categories = [
    { id: 1, name: "মেডিকেল" },
    { id: 2, name: "সেলুন এবং পার্লার" },
    { id: 3, name: "বিউটি" },
    { id: 4, name: "হোম সার্ভিস" },
    { id: 5, name: "পেশাদার সেবা" },
    { id: 6, name: "শিক্ষা" },
    { id: 7, name: "ডিজিটাল ক্রিয়েটর" },
    { id: 8, name: "ইভেন্ট" },
  ];

  const mockServices = [
    {
      id: 101,
      title: "ডাক্তার কনসাল্টেশন",
      provider: "ডা. আহমেদ হাসান",
      category: "মেডিকেল",
      categoryId: 1,
      subcategory: "জেনারেল",
      location: "গুলশান, ঢাকা",
      price: "৳১,৫০০",
      rating: 4.8,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isVerified: true,
      isBookable: true,
      availableTimeSlots: [
        "সকাল ১০:০০",
        "সকাল ১১:০০",
        "দুপুর ০৩:০০",
        "বিকাল ০৫:০০"
      ],
      description: "অভিজ্ঞ জেনারেল ফিজিশিয়ান। সাধারণ রোগের চিকিৎসা, স্বাস্থ্য পরামর্শ এবং প্রতিরোধমূলক স্বাস্থ্যসেবা প্রদান করেন।"
    },
    {
      id: 102,
      title: "ডেন্টাল চেকআপ",
      provider: "ডা. ফারহানা আক্তার",
      category: "মেডিকেল",
      categoryId: 1,
      subcategory: "ডেন্টাল",
      location: "বনানী, ঢাকা",
      price: "৳১,২০০",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isVerified: true,
      isBookable: true,
      availableTimeSlots: [
        "সকাল ০৯:০০",
        "সকাল ১০:০০",
        "দুপুর ১২:০০",
        "বিকাল ০৪:০০"
      ],
      description: "দাঁতের সমস্ত রোগের চিকিৎসা, দাঁত পরিষ্কার এবং দাঁতের যত্ন সম্পর্কে পরামর্শ প্রদান করা হয়।"
    },
    {
      id: 201,
      title: "সেলুন সার্ভিস",
      provider: "প্রিমিয়াম স্টাইল সেলুন",
      category: "সেলুন এবং পার্লার",
      categoryId: 2,
      subcategory: "হেয়ার কাট",
      location: "ধানমন্ডি, ঢাকা",
      price: "৳৮০০+",
      rating: 4.5,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: true
    },
    {
      id: 301,
      title: "বিউটি ট্রিটমেন্ট",
      provider: "গ্ল্যামার পার্লার",
      category: "বিউটি",
      categoryId: 3,
      subcategory: "ম্যাসাজ",
      location: "মোহাম্মদপুর, ঢাকা",
      price: "৳১,৫০০+",
      rating: 4.6,
      reviews: 154,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isBookable: true
    },
    {
      id: 401,
      title: "ইলেকট্রিশিয়ান",
      provider: "রাসেল ইলেকট্রিক",
      category: "হোম সার্ভিস",
      categoryId: 4,
      subcategory: "ইলেকট্রিশিয়ান",
      location: "উত্তরা, ঢাকা",
      price: "৳৫০০+",
      rating: 4.5,
      reviews: 132,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: false
    },
    {
      id: 701,
      title: "অনলাইন স্টোর", 
      provider: "টেক ওয়েব সলিউশন",
      category: "ডিজিটাল ক্রিয়েটর",
      categoryId: 7,
      subcategory: "ওয়েব ডেভেলপমেন্ট",
      location: "গুলশান, ঢাকা",
      price: "৳১৫,০০০+",
      rating: 4.8,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      isSponsored: false,
      isVerified: true,
      isBookable: true
    },
    {
      id: 702,
      title: "ইমেইল অটোমেশন", 
      provider: "ডিজিটাল মার্কেটিং সার্ভিসেস",
      category: "ডিজিটাল ক্রিয়েটর",
      categoryId: 7,
      subcategory: "মার্কেটিং",
      location: "বনানী, ঢাকা",
      price: "৳৮,০০০+",
      rating: 4.6,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      isSponsored: true,
      isVerified: true,
      isBookable: true
    }
  ];

  useEffect(() => {
    if (id) {
      const category = categories.find(c => c.id === parseInt(id));
      if (category) {
        setCategoryName(category.name);
      }

      const filteredServices = mockServices.filter(service => service.categoryId === parseInt(id));
      setServices(filteredServices);
    }
  }, [id]);

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  const handleBookmark = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, serviceId: number) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: "সার্ভিসটি শেয়ার করার লিংক কপি করা হয়েছে",
    });
  };

  const handleBookService = (serviceId: number) => {
    navigate(`/services/${serviceId}/book`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">{categoryName}</h1>
      </div>

      <div className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`${categoryName} সার্ভিস খুঁজুন`} className="pl-9 pr-16" />
          <Button 
            variant="default" 
            size="sm" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={handleFilterToggle}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">সাব-ক্যাটেগরি</h3>
              <div className="grid grid-cols-2 gap-2">
                {services.map(service => (
                  <Button key={service.id} variant="outline" size="sm" className="justify-start">
                    {service.subcategory}
                  </Button>
                )).filter((elem, index, self) => 
                  index === self.findIndex((t) => (
                    t.key === self[index].key
                  ))
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">মূল্য সীমা</h3>
              <div className="flex gap-2 items-center">
                <Input type="number" placeholder="মিন" className="w-24" />
                <Separator className="w-6" />
                <Input type="number" placeholder="ম্যাক্স" className="w-24" />
                <Button size="sm">প্রয়োগ করুন</Button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" onClick={handleFilterToggle}>বাতিল</Button>
            <Button>ফিল্টার করুন</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {services.length > 0 ? (
          services.map(service => (
            <Card 
              key={service.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all relative h-full"
              onClick={() => handleServiceClick(service.id)}
            >
              {service.isSponsored && (
                <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600 z-10">স্পন্সর্ড</Badge>
              )}
              <div className="flex h-full flex-col md:flex-row">
                <div className="relative w-full md:w-1/3">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover aspect-square md:aspect-auto"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                    <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                      onClick={(e) => handleBookmark(e, service.id)}>
                      <Bookmark className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full"
                      onClick={(e) => handleShare(e, service.id)}>
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline">{service.subcategory}</Badge>
                      {service.isVerified && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" /> ভেরিফায়েড
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium text-lg mb-1">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{service.provider}</p>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center text-xs mb-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{service.rating}</span>
                      </div>
                      <span className="mx-1">•</span>
                      <span>{service.reviews} রিভিউ</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">{service.price}</span>
                    <Button 
                      size="sm" 
                      className="gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookService(service.id);
                      }}
                    >
                      বুক করুন <ArrowUpRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-muted-foreground">এই ক্যাটাগরিতে কোন সার্ভিস পাওয়া যায়নি</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/services')}>
              সকল সার্ভিস দেখুন
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCategory;
