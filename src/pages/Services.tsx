
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Bookmark, 
  Star, 
  Filter,
  MapPin,
  Clock,
  ChevronRight,
  Plus,
  Palette,
  Camera,
  BookOpen,
  ShieldCheck,
  Scissors,
  FileText,
  Wrench,
  DollarSign
} from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { useToast } from '@/components/ui/use-toast';
import { usePostContext } from '@/context/PostContext';

const services = [
  {
    id: "1",
    title: 'ওয়েব ডিজাইন',
    category: 'ডিজাইন',
    price: 5000,
    rating: 4.5,
    location: 'ঢাকা',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-464c4c52ef1c?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ViJTIwZGVzaWdufGVufDB8fDB8fHx8MA%3D%3D',
  },
  {
    id: "2",
    title: 'গ্রাফিক ডিজাইন',
    category: 'ডিজাইন',
    price: 3000,
    rating: 4.2,
    location: 'চট্টগ্রাম',
    imageUrl: 'https://images.unsplash.com/photo-1589818347339-796b9c151a99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyYXBoaWMlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: "3",
    title: 'এসি সার্ভিসিং',
    category: 'সার্ভিসিং',
    price: 800,
    rating: 4.8,
    location: 'ঢাকা',
    imageUrl: 'https://images.unsplash.com/photo-1629244844299-950f4ca3c95d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFjJTIwc2VydmljZXxlbnwwfHwwfHx8fDA%3D',
  },
  {
    id: "4",
    title: 'প্লাম্বিং',
    category: 'সার্ভিসিং',
    price: 500,
    rating: 4.0,
    location: 'খুলনা',
    imageUrl: 'https://images.unsplash.com/photo-1621905249984-14d8ca69a573?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: "5",
    title: 'ওয়েডিং ফটোগ্রাফি',
    category: 'ফটোগ্রাফি',
    price: 15000,
    rating: 4.9,
    location: 'ঢাকা',
    imageUrl: 'https://images.unsplash.com/photo-1593054063742-993c478c404f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZyUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHx8MA%3D%3D',
  },
  {
    id: "6",
    title: 'ইভেন্ট ফটোগ্রাফি',
    category: 'ফটোগ্রাফি',
    price: 10000,
    rating: 4.6,
    location: 'চট্টগ্রাম',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e0e3b0d91f5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50JTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: "7",
    title: 'টিউটরিং',
    category: 'শিক্ষা',
    price: 800,
    rating: 4.7,
    location: 'ঢাকা',
    imageUrl: 'https://images.unsplash.com/photo-1521737827429-2217e2c4c756?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHV0b3Jpbmd8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: "8",
    title: 'ভাষা শিক্ষা',
    category: 'শিক্ষা',
    price: 1200,
    rating: 4.3,
    location: 'সিলেট',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFuZ3VhZ2UlMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D',
  },
  {
    id: "9",
    title: 'আইনজীবী পরামর্শ',
    category: 'আইন',
    price: 2000,
    rating: 4.5,
    location: 'ঢাকা',
    imageUrl: 'https://images.unsplash.com/photo-1585548496630-3c17d1f4eb91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGF3JTIwYWR2aWNlfGVufDB8fDB8fHx8MA%3D%3D',
  },
  {
    id: "10",
    title: 'আর্থিক পরামর্শ',
    category: 'অর্থ',
    price: 3000,
    rating: 4.2,
    location: 'চট্টগ্রাম',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-16962255d31e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmluYW5jaWFsJTIwYWR2aWNlfGVufDB8fDB8fHx8MA%3D%3D',
  },
];

const categories = [
  {
    id: 1,
    name: 'ডিজাইন',
    slug: 'design',
    icon: <Palette className="h-5 w-5" />,
    servicesCount: 25,
  },
  {
    id: 2,
    name: 'সার্ভিসিং',
    slug: 'servicing',
    icon: <Wrench className="h-5 w-5" />,
    servicesCount: 18,
  },
  {
    id: 3,
    name: 'ফটোগ্রাফি',
    slug: 'photography',
    icon: <Camera className="h-5 w-5" />,
    servicesCount: 32,
  },
  {
    id: 4,
    name: 'শিক্ষা',
    slug: 'education',
    icon: <BookOpen className="h-5 w-5" />,
    servicesCount: 40,
  },
  {
    id: 5,
    name: 'আইন',
    slug: 'law',
    icon: <ShieldCheck className="h-5 w-5" />,
    servicesCount: 12,
  },
  {
    id: 6,
    name: 'অর্থ',
    slug: 'finance',
    icon: <DollarSign className="h-5 w-5" />,
    servicesCount: 20,
  },
];

const popularServices = [
  {
    id: "11",
    title: 'ঘর পরিষ্কার',
    category: 'ক্লিনিং',
    price: 1000,
    rating: 4.7,
    location: 'ঢাকা',
    imageUrl: 'https://images.unsplash.com/photo-1562447832-c1c07c29368a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2UlMjBjbGVhbmluZ3xlbnwwfHwwfHx8fDA%3D',
  },
  {
    id: "12",
    title: 'গাড়ি ধোয়া',
    category: 'ক্লিনিং',
    price: 500,
    rating: 4.5,
    location: 'চট্টগ্রাম',
    imageUrl: 'https://images.unsplash.com/photo-1549317474-3924846b0a74?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwd2FzaGluZ3xlbnwwfHwwfHx8fDA%3D',
  },
  {
    id: "13",
    title: 'ডাক্তার',
    category: 'স্বাস্থ্য',
    price: 1500,
    rating: 4.9,
    location: 'ঢাকা',
    imageUrl: 'https://images.unsplash.com/photo-1532938314630-e96f17bb43e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdG9yfGVufDB8fDB8fHx8MA%3D%3D',
  },
  {
    id: "14",
    title: 'ফিজিওথেরাপিস্ট',
    category: 'স্বাস্থ্য',
    price: 1200,
    rating: 4.6,
    location: 'খুলনা',
    imageUrl: 'https://images.unsplash.com/photo-1576683444140-a19ca64a9594?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhpemlvdGhlcmFwaXN0fGVufDB8fDB8fHx8MA%3D%3D',
  },
];

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { servicePosts } = usePostContext();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "অনুসন্ধান করা হচ্ছে",
        description: `"${searchQuery}" এর জন্য ফলাফল দেখানো হচ্ছে`,
      });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&type=service`);
    }
  };
  
  const handleServiceClick = (id: string | number) => {
    navigate(`/service/${id}`);
  };
  
  const handleCategoryClick = (category: string) => {
    navigate(`/service-category/${category}`);
  };
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">সেবা</h1>
      
      <form onSubmit={handleSearch} className="relative mb-6">
        <Input
          placeholder="কি সেবা খুঁজছেন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <Button 
          type="submit"
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
      
      {servicePosts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">নতুন পোস্ট</h2>
            <Button variant="link" onClick={() => navigate('/services/new')}>
              সকল দেখুন <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {servicePosts.slice(0, 4).map((post) => (
              <Card key={post.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all" 
                    onClick={() => navigate(`/service/${post.id}`)}>
                <div className="relative aspect-video">
                  {post.imageUrls.length > 0 ? (
                    <img 
                      src={post.imageUrls[0]} 
                      alt={post.title}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Wrench className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm line-clamp-1">{post.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground my-1">
                    <MapPin className="h-3 w-3 mr-1" /> 
                    <span>{post.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-primary">৳{post.price}</p>
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>{post.duration} {post.timeUnit}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">ক্যাটাগরি</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => handleCategoryClick(category.slug)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full mb-3">
                  {category.icon}
                </div>
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{category.servicesCount} সেবা</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">জনপ্রিয় সেবাসমূহ</h2>
          <Button variant="link" onClick={() => navigate('/services/popular')}>
            সকল দেখুন <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {popularServices.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id}
              title={service.title}
              imageUrl={service.imageUrl}
              rating={service.rating}
              price={service.price}
              location={service.location}
              onClick={handleServiceClick}
            />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">সকল সেবা</h2>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" /> ফিল্টার
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id}
              title={service.title}
              imageUrl={service.imageUrl}
              rating={service.rating}
              price={service.price}
              location={service.location}
              onClick={handleServiceClick}
            />
          ))}
        </div>
      </div>
      
      <Button 
        onClick={() => navigate('/create-post')}
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Services;
