
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Filter,
  Heart,
  Briefcase,
  ShoppingBag,
  User,
  Scissors,
  Sparkles,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  X,
  ArrowUpRight,
  ArrowRight,
  Award,
  Shield,
  Phone,
  Bookmark,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filterVisible, setFilterVisible] = useState(false);

  // Services categories
  const categories = [
    { id: 1, name: "মেডিকেল", icon: <User className="h-8 w-8 mb-2" />, count: 124 },
    { id: 2, name: "সেলুন এবং পার্লার", icon: <Scissors className="h-8 w-8 mb-2" />, count: 56 },
    { id: 3, name: "বিউটি", icon: <Sparkles className="h-8 w-8 mb-2" />, count: 87 },
    { id: 4, name: "হোম সার্ভিস", icon: <Briefcase className="h-8 w-8 mb-2" />, count: 103 },
    { id: 5, name: "পেশাদার সেবা", icon: <Briefcase className="h-8 w-8 mb-2" />, count: 92 },
    { id: 6, name: "শিক্ষা", icon: <Briefcase className="h-8 w-8 mb-2" />, count: 78 },
    { id: 7, name: "ইভেন্ট", icon: <Calendar className="h-8 w-8 mb-2" />, count: 65 },
    { id: 8, name: "অন্যান্য", icon: <ShoppingBag className="h-8 w-8 mb-2" />, count: 156 },
  ];

  // Featured services
  const featuredServices = [
    {
      id: 1,
      title: "ডাক্তার কনসাল্টেশন",
      provider: "ডা. আহমেদ হাসান",
      category: "মেডিকেল",
      location: "গুলশান, ঢাকা",
      price: "৳১,৫০০",
      rating: 4.8,
      reviews: 256,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isVerified: true,
      isBookable: true
    },
    {
      id: 2,
      title: "ডেন্টাল চেকআপ",
      provider: "ডা. ফারহানা আক্তার",
      category: "মেডিকেল",
      location: "বনানী, ঢাকা",
      price: "৳১,২০০",
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isVerified: true,
      isBookable: true
    },
    {
      id: 3,
      title: "সেলুন সার্ভিস",
      provider: "প্রিমিয়াম স্টাইল সেলুন",
      category: "সেলুন এবং পার্লার",
      location: "ধানমন্ডি, ঢাকা",
      price: "৳৮০০+",
      rating: 4.5,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: true
    },
    {
      id: 4,
      title: "বিউটি ট্রিটমেন্ট",
      provider: "গ্ল্যামার পার্লার",
      category: "বিউটি",
      location: "মোহাম্মদপুর, ঢাকা",
      price: "৳১,৫০০+",
      rating: 4.6,
      reviews: 154,
      image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isBookable: true
    },
    {
      id: 5,
      title: "ফিজিওথেরাপি",
      provider: "ডা. কামরুল হাসান",
      category: "মেডিকেল",
      location: "মিরপুর, ঢাকা",
      price: "৳১,৮০০",
      rating: 4.9,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isVerified: true,
      isBookable: true
    },
    {
      id: 6,
      title: "ইলেকট্রিশিয়ান",
      provider: "রাসেল ইলেকট্রিক",
      category: "হোম সার্ভিস",
      location: "উত্তরা, ঢাকা",
      price: "৳৫০০+",
      rating: 4.5,
      reviews: 132,
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: false
    },
    {
      id: 7,
      title: "ম্যাসাজ থেরাপি",
      provider: "রিলাক্স স্পা সেন্টার",
      category: "বিউটি",
      location: "বারিধারা, ঢাকা",
      price: "৳২,২০০",
      rating: 4.7,
      reviews: 176,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isSponsored: true,
      isBookable: true
    },
    {
      id: 8,
      title: "হেয়ার কালার",
      provider: "ট্রেন্ডি সেলুন",
      category: "সেলুন এবং পার্লার",
      location: "নিউ মার্কেট, ঢাকা",
      price: "৳১,২০০+",
      rating: 4.4,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      isBookable: true
    },
  ];

  const handleFilterToggle = () => {
    setFilterVisible(!filterVisible);
  };

  const handleServiceClick = (id: number) => {
    navigate(`/services/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "সার্ভিসটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    toast({
      title: "শেয়ার করুন",
      description: "সার্ভিসটি শেয়ার করার লিংক কপি করা হয়েছে",
    });
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with search bar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">সার্ভিস</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="সার্ভিস খুঁজুন" className="pl-9 pr-16" />
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
      </div>

      {/* Filter panel - conditionally rendered */}
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">ক্যাটেগরি</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <User className="h-4 w-4 mr-2" /> মেডিকেল
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Scissors className="h-4 w-4 mr-2" /> সেলুন
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Sparkles className="h-4 w-4 mr-2" /> বিউটি
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Briefcase className="h-4 w-4 mr-2" /> হোম সার্ভিস
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">মূল্য সীমা</h3>
              <Slider
                defaultValue={[500, 5000]}
                max={10000}
                step={100}
              />
              <div className="flex justify-between mt-2">
                <div className="text-sm">৳500</div>
                <div className="text-sm">৳10,000</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">রেটিং</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <input type="checkbox" id="rating5" className="mr-2" />
                  <label htmlFor="rating5" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating4" className="mr-2" />
                  <label htmlFor="rating4" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating3" className="mr-2" />
                  <label htmlFor="rating3" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" onClick={handleFilterToggle}>বাতিল</Button>
            <Button>ফিল্টার করুন</Button>
          </div>
        </div>
      )}

      {/* Categories section */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ক্যাটেগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 4).map((category) => (
            <div 
              key={category.id}
              className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => navigate(`/services/category/${category.id}`)}
            >
              {category.icon}
              <span className="text-xs text-center font-medium">{category.name}</span>
              <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-3">
          {categories.slice(4).map((category) => (
            <div 
              key={category.id}
              className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => navigate(`/services/category/${category.id}`)}
            >
              {category.icon}
              <span className="text-xs text-center font-medium">{category.name}</span>
              <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Booking & Hiring Tabs */}
      <div className="mb-6">
        <Tabs defaultValue="book">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="book" className="flex-1">বুক করুন</TabsTrigger>
            <TabsTrigger value="hire" className="flex-1">হায়ার করুন</TabsTrigger>
          </TabsList>
          
          <TabsContent value="book">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredServices.filter((_, index) => index < 6).map((service, index) => (
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
                          <Badge variant="outline">{service.category}</Badge>
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
                        <Button size="sm" className="gap-1">
                          {service.isBookable ? 'বুক করুন' : 'যোগাযোগ করুন'} <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/services/category/1')}>
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="hire">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredServices.filter((_, index) => index >= 2 && index < 8).map((service) => (
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
                          <Badge variant="outline">{service.category}</Badge>
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
                        <Button size="sm" className="gap-1">
                          হায়ার করুন <ArrowUpRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/services/hire')}>
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Services;
