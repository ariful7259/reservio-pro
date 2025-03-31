import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Star, 
  MapPin,
  ArrowRight,
  Search,
  Rocket,
  BookOpen,
  Mail,
  Calendar,
  Users,
  BarChart,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Banner images
  const bannerImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618359057154-e21ae64350b6?q=80&w=1000&auto=format&fit=crop",
  ];

  // Combined Featured Listings from all categories
  const featuredListings = [
    // Rental listings
    {
      id: "rent-1",
      title: "৩ বেডরুম অ্যাপার্টমেন্ট",
      location: "গুলশান, ঢাকা",
      price: "৳২৫,০০০/মাস",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      category: "রেন্ট",
      path: "/rent-details/1"
    },
    {
      id: "rent-2",
      title: "অফিস স্পেস",
      location: "বনানী, ঢাকা",
      price: "৳৫০,০০০/মাস",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
      category: "রেন্ট",
      path: "/rent-details/2"
    },
    // Service listings
    {
      id: "serv-1",
      title: "ডাক্তার কনসাল্টেশন",
      location: "মেডিকেল সেন্টার, ঢাকা",
      price: "৳১,৫০০",
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      category: "সার্ভিস",
      path: "/services/1"
    },
    {
      id: "serv-2",
      title: "ডেন্টাল চেকআপ",
      location: "শাইন ডেন্টাল, ঢাকা",
      price: "৳২,০০০",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      category: "সার্ভিস",
      path: "/services/2"
    },
    // Marketplace listings
    {
      id: "market-1",
      title: "স্মার্ট ব্লাড প্রেশার মনিটর",
      location: "ধানমন্ডি, ঢাকা",
      price: "৳২,৫০০",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      category: "মার্কেটপ্লেস",
      path: "/shopping/product/1"
    },
    {
      id: "market-2",
      title: "ডিজিটাল গ্লুকোমিটার কিট",
      location: "উত্তরা, ঢাকা",
      price: "৳৩,৫০০",
      image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80",
      category: "মার্কেটপ্লেস",
      path: "/shopping/product/2"
    },
  ];

  // Digital creator solutions data
  const creatorSolutions = [
    { 
      icon: <Rocket className="h-8 w-8 text-primary" />, 
      title: "আপনার নিজস্ব অনলাইন স্টোর / ওয়েবসাইট",
      description: "নিজের ব্র্যান্ড তৈরি করুন এবং নিজস্ব ডোমেইনে আপনার পণ্য বিক্রি করুন।",
      path: "/create-store"
    },
    { 
      icon: <Mail className="h-8 w-8 text-blue-500" />, 
      title: "ইমেইল অটোমেশন",
      description: "স্বযংক্রিয় ইমেইল মার্কেটিং ক্যাম্পেইন তৈরি করুন আপনার দর্শকদের সাথে যোগাযোগ রাখতে।",
      path: "/email-automation"
    },
    { 
      icon: <BookOpen className="h-8 w-8 text-amber-500" />, 
      title: "কোর্স বিল্ডার",
      description: "অনলাইন কোর্স তৈরি করুন এবং আপনার জ্ঞান বিক্রি করুন।",
      path: "/course-builder"
    },
    { 
      icon: <Calendar className="h-8 w-8 text-red-500" />, 
      title: "ইভেন্ট ও ওয়েবিনার হোস্টিং",
      description: "ইভেন্ট, ওয়েবিনার এবং লাইভ সেশন পরিচালনা করুন সহজেই।",
      path: "/event-hosting"
    },
    { 
      icon: <Calendar className="h-8 w-8 text-orange-500" />, 
      title: "১:১ সেশন অফার",
      description: "আপনার সময়ের জন্য পেমেন্ট গ্রহণ করুন এবং ১:১ কনসালটেশন প্রদান করুন।",
      path: "/one-on-one"
    },
    { 
      icon: <DollarSign className="h-8 w-8 text-green-500" />, 
      title: "ডিজিটাল প্রোডাক্ট বিক্রয়",
      description: "ই-বুক, টেমপ্লেট, সফটওয়্যার এবং অন্যান্য ডিজিটাল সামগ্রী বিক্রি করুন।",
      path: "/digital-products"
    },
    { 
      icon: <Users className="h-8 w-8 text-yellow-500" />, 
      title: "পেইড কমিউনিটি চালু করুন",
      description: "আপনার অনুসারীদের জন্য একটি এক্সক্লুসিভ মেম্বারশিপ কমিউনিটি তৈরি করুন।",
      path: "/paid-community"
    },
    { 
      icon: <BarChart className="h-8 w-8 text-purple-500" />, 
      title: "অডিয়েন্স অ্যানালিটিক্স",
      description: "আপনার দর্শকদের আচরণ বিশ্লেষণ করুন এবং মার্কেটিং কৌশল উন্নত করুন।",
      path: "/audience-analytics"
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Banner Slider with increased size */}
      <div className="overflow-hidden px-4 py-3 mb-6">
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
      
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="খুঁজুন" 
            className="w-full pl-10 pr-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="default" 
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </form>
      </div>

      {/* Digital Creator Solutions */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-6">ডিজিটাল ক্রিয়েটর সলিউশন</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creatorSolutions.map((solution, index) => (
            <Card 
              key={index} 
              className="border cursor-pointer hover:shadow-md transition-all hover:bg-gray-50"
              onClick={() => navigate(solution.path)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex-shrink-0">
                  {solution.icon}
                </div>
                <div>
                  <h3 className="font-medium">{solution.title}</h3>
                  <p className="text-sm text-muted-foreground">{solution.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Listings */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">ফিচার্ড লিস্টিং</h2>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4 w-full bg-secondary/50">
            <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
            <TabsTrigger value="rent" className="flex-1">রেন্ট</TabsTrigger>
            <TabsTrigger value="services" className="flex-1">সার্ভিস</TabsTrigger>
            <TabsTrigger value="marketplace" className="flex-1">মার্কেটপ্লেস</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredListings.map((listing) => (
                <Card 
                  key={listing.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(listing.path)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{listing.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-primary">{listing.price}</p>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/all-listings')}>
                সব দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="rent">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredListings.filter(item => item.category === "রেন্ট").map((listing) => (
                <Card 
                  key={listing.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(listing.path)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{listing.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-primary">{listing.price}</p>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/rentals')}>
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredListings.filter(item => item.category === "সার্ভিস").map((listing) => (
                <Card 
                  key={listing.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(listing.path)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{listing.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-primary">{listing.price}</p>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/services')}>
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="marketplace">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredListings.filter(item => item.category === "মার্কেটপ্লেস").map((listing) => (
                <Card 
                  key={listing.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => navigate(listing.path)}
                >
                  <div className="relative aspect-square">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{listing.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm font-bold text-primary">{listing.price}</p>
                      <div className="flex items-center text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/shopping')}>
                আরও দেখুন <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
