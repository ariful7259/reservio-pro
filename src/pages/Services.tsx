
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
  ChevronRight,
  BadgeCheck,
  Scissors,
  UserPlus,
  MessageSquare,
  Heart
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ServiceCard from '@/components/ServiceCard';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useToast } from "@/components/ui/use-toast";

const Services = () => {
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Banner images for Services
  const bannerImages = [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop",
  ];

  // Service Categories with Salon and Parlour added
  const serviceCategories = [
    { name: "ডাক্তার", icon: "🩺", count: 152, path: "/services/category/medical" },
    { name: "ডেন্টাল", icon: "🦷", count: 89, path: "/services/category/dental" },
    { name: "মেন্টাল হেলথ", icon: "🧠", count: 63, path: "/services/category/mental" },
    { name: "সেলুন", icon: "✂️", count: 92, path: "/services/category/salon" },
    { name: "পার্লার", icon: "💇‍♀️", count: 78, path: "/services/category/parlour" },
    { name: "ল", icon: "⚖️", count: 54, path: "/services/category/legal" },
    { name: "রিপেয়ার", icon: "🔧", count: 87, path: "/services/category/repair" },
    { name: "হোম সার্ভিস", icon: "🏠", count: 105, path: "/services/category/home" },
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

  // Salon Services
  const salonServices = [
    {
      id: 5,
      title: "হেয়ার কাট & স্টাইলিং",
      provider: "লুক শার্প সেলুন",
      price: "৳৫০০",
      rating: 4.8,
      reviewCount: 315,
      location: "ধানমন্ডি, ঢাকা",
      image: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?q=80&w=300&auto=format&fit=crop",
      tags: ["হেয়ার কাট", "স্টাইলিং"]
    },
    {
      id: 6,
      title: "শেভ & ফেসিয়াল",
      provider: "জেন্টস পয়েন্ট",
      price: "৳৮০০",
      rating: 4.7,
      reviewCount: 208,
      location: "বনানী, ঢাকা",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=300&auto=format&fit=crop",
      tags: ["শেভ", "ফেসিয়াল"]
    }
  ];

  // Parlour Services
  const parlourServices = [
    {
      id: 7,
      title: "ফুল ফেস মেকআপ",
      provider: "গ্ল্যামার পার্লার",
      price: "৳২,৫০০",
      rating: 4.9,
      reviewCount: 276,
      location: "গুলশান, ঢাকা",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop",
      tags: ["মেকআপ", "ব্রাইডাল"]
    },
    {
      id: 8,
      title: "হেয়ার স্পা & ট্রিটমেন্ট",
      provider: "বিউটি হেভেন",
      price: "৳১,৮০০",
      rating: 4.8,
      reviewCount: 194,
      location: "উত্তরা, ঢাকা",
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=300&auto=format&fit=crop",
      tags: ["হেয়ার স্পা", "হেয়ার কেয়ার"]
    }
  ];

  // Service providers for the Hire section
  const serviceProviders = [
    {
      id: 1,
      name: "ডা. আহমেদ হাসান",
      profession: "কার্ডিওলজিস্ট",
      image: "https://i.pravatar.cc/300?img=11",
      rating: 4.9,
      reviewCount: 127,
      experience: 15,
      featured: true,
      location: "গুলশান, ঢাকা",
      availability: "সকাল ৯টা - দুপুর ২টা",
      fee: "৳২,০০০"
    },
    {
      id: 2,
      name: "ডা. জাফরিন আলম",
      profession: "ডেন্টিস্ট",
      image: "https://i.pravatar.cc/300?img=32",
      rating: 4.8,
      reviewCount: 94,
      experience: 8,
      featured: false,
      location: "বনানী, ঢাকা",
      availability: "বিকাল ৪টা - রাত ৮টা",
      fee: "৳১,৫০০"
    },
    {
      id: 3,
      name: "নিলিমা রহমান",
      profession: "সাইকোলজিস্ট",
      image: "https://i.pravatar.cc/300?img=21",
      rating: 4.9,
      reviewCount: 106,
      experience: 12,
      featured: true,
      location: "ধানমন্ডি, ঢাকা",
      availability: "সকাল ১০টা - বিকাল ৫টা",
      fee: "৳২,৫০০"
    },
    {
      id: 4,
      name: "রাজিব হোসেন",
      profession: "হেয়ার স্টাইলিস্ট",
      image: "https://i.pravatar.cc/300?img=59",
      rating: 4.7,
      reviewCount: 183,
      experience: 10,
      featured: false,
      location: "মোহাম্মদপুর, ঢাকা",
      availability: "সকাল ১১টা - রাত ৯টা",
      fee: "৳৮০০"
    }
  ];

  // Function to handle clicking on a service
  const handleServiceClick = (serviceId: number) => {
    navigate(`/services/${serviceId}`);
  };

  // Function to handle booking a service
  const handleBookService = (serviceId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    toast({
      title: "বুকিং প্রক্রিয়া শুরু হয়েছে",
      description: "আপনাকে অ্যাপয়েন্টমেন্ট পেজে নিয়ে যাওয়া হচ্ছে...",
    });
    navigate(`/appointments?service=${serviceId}`);
  };

  // Function to handle hiring a service provider
  const handleHireProvider = (providerId: number) => {
    toast({
      title: "হায়ারিং প্রক্রিয়া শুরু হয়েছে",
      description: "আপনাকে প্রোফাইল পেজে নিয়ে যাওয়া হচ্ছে...",
    });
    navigate(`/appointments?provider=${providerId}`);
  };

  // Function to handle clicking on a category
  const handleCategoryClick = (path: string) => {
    navigate(path);
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
                <option value="salon">সেলুন</option>
                <option value="parlour">পার্লার</option>
                <option value="law">ল</option>
                <option value="repair">রিপেয়ার</option>
                <option value="home-service">হোম সার্ভিস</option>
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

      {/* Book or Hire Tabs */}
      <div className="mb-6">
        <Tabs defaultValue="services" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="services" className="gap-2">
              <Calendar className="h-4 w-4" /> সার্ভিস বুক করুন
            </TabsTrigger>
            <TabsTrigger value="providers" className="gap-2">
              <UserPlus className="h-4 w-4" /> প্রোফেশনাল হায়ার করুন
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Categories section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {serviceCategories.map((category, index) => (
            <div 
              key={index}
              className="flex flex-col items-center justify-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleCategoryClick(category.path)}
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

      {activeTab === 'services' ? (
        <>
          {/* Featured Services listing */}
          <div className="mb-8">
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
                      <Button size="sm" onClick={(e) => handleBookService(service.id, e)}>বুক করুন</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Salon Services */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">সেলুন সার্ভিস</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/services/category/salon')}>
                সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {salonServices.map((service) => (
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
                    <Badge className="absolute top-2 right-2 bg-blue-500">
                      <Scissors className="h-3 w-3 mr-1" /> সেলুন
                    </Badge>
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
                      <Button size="sm" onClick={(e) => handleBookService(service.id, e)}>বুক করুন</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Beauty Parlour Services */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">পার্লার সার্ভিস</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/services/category/parlour')}>
                সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {parlourServices.map((service) => (
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
                    <Badge className="absolute top-2 right-2 bg-pink-500">
                      <BadgeCheck className="h-3 w-3 mr-1" /> পার্লার
                    </Badge>
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
                      <Button size="sm" onClick={(e) => handleBookService(service.id, e)}>বুক করুন</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Service Providers section (Hire professionals)
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">শীর্ষ প্রফেশনালস</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/professionals')}>
              সব দেখুন <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={provider.image} alt={provider.name} />
                        <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {provider.featured && (
                        <Badge className="absolute -top-2 -left-2 bg-amber-500">
                          <BadgeCheck className="h-3 w-3 mr-1" /> ভেরিফাইড
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-base">{provider.name}</h3>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">{provider.profession}</div>
                      
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{provider.rating}</span>
                        </div>
                        <span className="mx-1">•</span>
                        <span>{provider.reviewCount} রিভিউ</span>
                        <span className="mx-1">•</span>
                        <span>{provider.experience} বছর অভিজ্ঞতা</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{provider.location}</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground mb-3">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{provider.availability}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary">{provider.fee}</span>
                        <Button size="sm" onClick={() => handleHireProvider(provider.id)}>হায়ার করুন</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
