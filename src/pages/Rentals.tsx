import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Home, Truck, Briefcase, PaintBucket, Wrench, ChevronDown, ChevronUp, ChevronRight, Filter, MapPin, LayoutGrid, Map as MapIcon, Camera, Laptop, Smartphone, Speaker, Car, Bike, Bus, Tractor, Tent, Armchair, ShowerHead, Tv, BookOpen, HeartPulse, Store, Hammer, Hotel, Building2, Home as HomeIcon, User, DoorOpen, Building as BuildingIcon, HotelIcon, Warehouse, Camera as CameraIcon, Table, Star, Clock, Clipboard, Wrench as WrenchIcon, Settings, PenTool, Share2, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapView from '@/components/MapView';
import RentalFeatures from '@/components/RentalFeatures';
import SocialShareModal from '@/components/SocialShareModal';
import { useToast } from '@/hooks/use-toast';

const Rentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const bannerImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1000&auto=format&fit=crop"
  ];

  // Updated rent categories with "বাসা বাড়ি" as the first category and its subcategories
  const rentCategories = [
    // Main "বাসা বাড়ি" category with colorful digital icon
    {
      icon: <div className="text-3xl">🏠</div>,
      name: "বাসা বাড়ি",
      path: "/rental-category/housing",
      count: 892,
      isMainCategory: true,
      subcategories: [
        {
          icon: <div className="text-2xl">🏢</div>,
          name: "অ্যাপার্টমেন্ট/ফ্ল্যাট",
          path: "/rental-category/apartment",
          count: 187,
          features: [
            { name: "অনলাইন ভার্চুয়াল ট্যুর", description: "ঘরে বসে অ্যাপার্টমেন্ট দেখুন" },
            { name: "ইনস্ট্যান্ট বুকিং", description: "তাৎক্ষণিক বুকিং কনফার্মেশন" },
            { name: "ইউটিলিটি বিল ট্র্যাকিং", description: "বিদ্যুৎ, গ্যাস, পানির বিল ম্যানেজমেন্ট" },
            { name: "নিরাপত্তা সিস্টেম", description: "CCTV ও নিরাপত্তা ক্যামেরা" }
          ]
        },
        {
          icon: <div className="text-2xl">🏡</div>,
          name: "বাসা/বাড়ি",
          path: "/rental-category/house",
          count: 156,
          features: [
            { name: "গার্ডেন স্পেস", description: "বাগান ও বহিরাঙ্গন এলাকা" },
            { name: "পার্কিং ফ্যাসিলিটি", description: "গাড়ি পার্কিং এর ব্যবস্থা" },
            { name: "পোষা প্রাণী বান্ধব", description: "পোষা প্রাণী রাখার সুবিধা" },
            { name: "ফ্যামিলি এরিয়া", description: "পারিবারিক পরিবেশ" }
          ]
        },
        {
          icon: <div className="text-2xl">🏨</div>,
          name: "মেস/হোস্টেল",
          path: "/rental-category/hostel",
          count: 83,
          features: [
            { name: "খাবার সুবিধা", description: "৩ বেলা খাবারের ব্যবস্থা" },
            { name: "ওয়াইফাই ইন্টারনেট", description: "হাই-স্পিড ইন্টারনেট" },
            { name: "লন্ড্রি সার্ভিস", description: "কাপড় ধোয়ার সুবিধা" },
            { name: "স্টাডি রুম", description: "পড়াশোনার জন্য আলাদা রুম" }
          ]
        },
        {
          icon: <div className="text-2xl">🛏️</div>,
          name: "সিঙ্গেল রুম/শেয়ারড",
          path: "/rental-category/room",
          count: 119,
          features: [
            { name: "ফার্নিশড রুম", description: "সম্পূর্ণ আসবাবপত্র সহ" },
            { name: "এটাচড বাথরুম", description: "নিজস্ব বাথরুম সুবিধা" },
            { name: "কমন এরিয়া", description: "শেয়ার্ড রান্নাঘর ও বসার ঘর" },
            { name: "২৪/৭ নিরাপত্তা", description: "সার্বক্ষণিক নিরাপত্তা ব্যবস্থা" }
          ]
        }
      ]
    },
    // Other existing categories
    {
      icon: <Laptop className="h-8 w-8 text-blue-500" />,
      name: "ইলেকট্রনিক্স",
      path: "/rental-category/electronics",
      count: 324
    },
    {
      icon: <Car className="h-8 w-8 text-red-500" />,
      name: "পরিবহন",
      path: "/rental-category/transport",
      count: 178
    },
    {
      icon: <Tent className="h-8 w-8 text-green-500" />,
      name: "ইভেন্ট সামগ্রী",
      path: "/rental-category/event",
      count: 89
    },
    {
      icon: <Armchair className="h-8 w-8 text-purple-500" />,
      name: "ঘরোয়া সামগ্রী",
      path: "/rental-category/home",
      count: 145
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      name: "শিক্ষা সামগ্রী",
      path: "/rental-category/education",
      count: 65
    },
    {
      icon: <Tractor className="h-8 w-8 text-yellow-500" />,
      name: "কৃষি যন্ত্রপাতি",
      path: "/rental-category/agriculture",
      count: 42
    },
    {
      icon: <Store className="h-8 w-8 text-pink-500" />,
      name: "ব্যবসায়িক সামগ্রী",
      path: "/rental-category/business",
      count: 86
    },
    {
      icon: <Hammer className="h-8 w-8 text-gray-500" />,
      name: "কারিগরি টুলস",
      path: "/rental-category/tools",
      count: 96
    },
    {
      icon: <Briefcase className="h-8 w-8 text-indigo-500" />,
      name: "কমার্শিয়াল স্পেস",
      path: "/rental-category/commercial",
      count: 76
    },
    {
      icon: <HotelIcon className="h-8 w-8 text-teal-500" />,
      name: "গেস্ট হাউস/স্বল্পমেয়াদী",
      path: "/rental-category/guesthouse",
      count: 59
    },
    {
      icon: <HomeIcon className="h-8 w-8 text-emerald-500" />,
      name: "গ্রামীণ বাসস্থান",
      path: "/rental-category/rural",
      count: 47
    },
    {
      icon: <Camera className="h-8 w-8 text-violet-500" />,
      name: "স্টুডিও/স্পেশাল স্পেস",
      path: "/rental-category/studio",
      count: 35
    }
  ];

  const featuredListings = [
    {
      id: 1,
      title: "৩ বেডরুম অ্যাপার্টমেন্ট",
      location: "গুলশান, ঢাকা",
      price: "৳২৫,০০০/মাস",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      category: "apartment",
      latitude: 23.7937,
      longitude: 90.4137
    },
    {
      id: 2,
      title: "অফিস স্পেস",
      location: "বনানী, ঢাকা",
      price: "৳৫০,০০০/মাস",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
      category: "office",
      latitude: 23.7937,
      longitude: 90.3938
    },
    {
      id: 3,
      title: "টয়োটা কোরোলা",
      location: "মিরপুর, ঢাকা",
      price: "৳৫,০০০/দিন",
      image: "https://images.unsplash.com/photo-1494965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
      category: "car",
      latitude: 23.8103,
      longitude: 90.3420
    },
    {
      id: 4,
      title: "ডিএসএলআর ক্যামেরা",
      location: "ধানমন্ডি, ঢাকা",
      price: "৳১,০০০/দিন",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      category: "equipment",
      latitude: 23.7465,
      longitude: 90.3751
    }
  ];

  const featuredServices = [
    {
      id: 1,
      title: "ইলেকট্রনিক্স মেরামত",
      image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৮০০/ঘণ্টা",
      location: "ঢাকা",
      rating: 4.8,
      category: "মেরামত"
    },
    {
      id: 2,
      title: "ফার্নিচার ইন্সটলেশন",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ১,২০০/সেশন",
      location: "ঢাকা",
      rating: 4.6,
      category: "ইন্সটলেশন"
    },
    {
      id: 3,
      title: "ড্রাইভার সার্ভিস",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ১,০০০/দিন",
      location: "ঢাকা",
      rating: 4.7,
      category: "ট্রান্সপোর্ট"
    },
    {
      id: 4,
      title: "ফটোগ্রাফি সার্ভিস",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৩,০০০/সেশন",
      location: "ঢাকা",
      rating: 4.9,
      category: "ইভেন্ট"
    }
  ];

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleListingClick = (id: number) => {
    navigate(`/rent-details/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, rentalId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "রেন্টাল আইটেমটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে"
    });
  };

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    setShareItem({
      ...rental,
      type: 'rental'
    });
    setShowShareModal(true);
  };

  const handleCategoryClick = (category: any) => {
    if (category.features) {
      toast({
        title: `${category.name} এর ফিচারসমূহ`,
        description: `${category.features.length}টি বিশেষ সুবিধা উপলব্ধ`
      });
    }
    navigate(category.path);
  };

  const renderCategoryItem = (category: any, index: number) => {
    if (category.isMainCategory && category.subcategories) {
      return (
        <div key={index} className="col-span-full">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer p-4 border-2 border-primary/20 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-2 shadow-lg">
                  {category.icon}
                </div>
                <span className="text-sm text-center mb-1 font-semibold">{category.name}</span>
                <Badge variant="outline" className="text-xs bg-primary text-primary-foreground">{category.count}</Badge>
                <ChevronDown className="h-4 w-4 mt-2 text-primary" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-muted/30 rounded-lg">
                {category.subcategories.map((subcategory: any, subIndex: number) => (
                  <div key={subIndex} className="group">
                    <Link 
                      to={subcategory.path} 
                      className="flex flex-col items-center justify-center transition-all hover:scale-105 p-3 rounded-lg hover:bg-white hover:shadow-md"
                      onClick={() => handleCategoryClick(subcategory)}
                    >
                      <div className="h-14 w-14 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center mb-2 group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                        {subcategory.icon}
                      </div>
                      <span className="text-xs text-center mb-1 font-medium">{subcategory.name}</span>
                      <Badge variant="outline" className="text-xs">{subcategory.count}</Badge>
                      {subcategory.features && (
                        <div className="mt-2 text-xs text-muted-foreground text-center">
                          {subcategory.features.length} ফিচার
                        </div>
                      )}
                    </Link>
                    {subcategory.features && (
                      <div className="mt-2 space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {subcategory.features.slice(0, 2).map((feature: any, featureIndex: number) => (
                          <div key={featureIndex} className="text-xs bg-white p-2 rounded shadow-sm border">
                            <div className="font-medium text-primary">{feature.name}</div>
                            <div className="text-muted-foreground">{feature.description}</div>
                          </div>
                        ))}
                        {subcategory.features.length > 2 && (
                          <div className="text-xs text-center text-primary font-medium">
                            +{subcategory.features.length - 2} আরও ফিচার
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }

    return (
      <Link 
        key={index} 
        to={category.path} 
        className="flex flex-col items-center justify-center transition-all hover:scale-105"
      >
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          {category.icon}
        </div>
        <span className="text-xs text-center mb-1">{category.name}</span>
        <Badge variant="outline" className="text-xs">{category.count}</Badge>
      </Link>
    );
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">রেন্ট</h1>
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'map')} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" /> গ্রিড
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapIcon className="h-4 w-4" /> মানচিত্র
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon" onClick={toggleFilter}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="font-medium mb-3">ফিল্টার</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">লোকেশন</label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="dhaka">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">ঢাকা</SelectItem>
                    <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                    <SelectItem value="khulna">খুলনা</SelectItem>
                    <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                    <SelectItem value="sylhet">সিলেট</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">ক্যাটাগরি</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ক্যাটাগরি" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">অ্যাপার্টমেন্ট</SelectItem>
                  <SelectItem value="house">বাসা</SelectItem>
                  <SelectItem value="car">গাড়ি</SelectItem>
                  <SelectItem value="office">অফিস</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">মূল্য সীমা</label>
              <div className="px-2">
                <Slider defaultValue={[25000]} max={100000} step={1000} />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>৳১,০০০</span>
                  <span>৳৫০,০০০</span>
                  <span>৳১,০০,০০০</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">দূরত্ব</label>
              <div className="px-2">
                <Slider defaultValue={[5]} max={20} step={1} />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1 কিমি</span>
                  <span>10 কিমি</span>
                  <span>20 কিমি</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button className="flex-1">ফিল্টার করুন</Button>
            <Button variant="outline" onClick={toggleFilter}>বাতিল করুন</Button>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {rentCategories.slice(0, 8).map((category, index) => renderCategoryItem(category, index))}
        </div>
        
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full mt-3">
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-4 gap-3">
              {rentCategories.slice(8).map((category, index) => renderCategoryItem(category, index + 8))}
            </div>
          </CollapsibleContent>
          
          <div className="w-full flex justify-center mt-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4" /> কম দেখুন
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" /> আরও দেখুন
                  </>
                )}
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>
      
      <div className="mb-6 overflow-hidden rounded-lg">
        <Carousel className="w-full">
          <CarouselContent>
            {bannerImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg aspect-[16/6] w-full">
                    <img src={image} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
      
      <Separator className="my-6" />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ফিচার্ড লিস্টিং</h2>
        
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" onClick={() => handleListingClick(listing.id)}>
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                    <Badge className="absolute top-2 left-2">{listing.category}</Badge>
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleBookmark(e, listing.id)}>
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={(e) => handleShare(e, listing)}>
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{listing.location}</p>
                    <p className="text-sm font-bold text-primary">{listing.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {viewMode === 'map' && (
          <div className="mb-4">
            <MapView listings={featuredListings.map((listing) => ({
              id: listing.id,
              title: listing.title,
              location: listing.location,
              latitude: listing.latitude,
              longitude: listing.longitude
            }))} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {featuredListings.slice(0, 3).map((listing) => (
                <Card key={listing.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all" onClick={() => handleListingClick(listing.id)}>
                  <div className="flex h-24">
                    <div className="w-1/3">
                      <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-2/3 p-2">
                      <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                      <p className="text-xs text-muted-foreground">{listing.location}</p>
                      <p className="text-sm font-bold text-primary mt-auto">{listing.price}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="flex justify-center mt-4">
          <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/services')}>
            আরও দেখুন <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {shareItem && (
        <SocialShareModal 
          open={showShareModal}
          onOpenChange={setShowShareModal}
          item={shareItem}
        />
      )}
    </div>
  );
};

export default Rentals;
