import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Home, Truck, Briefcase, PaintBucket, Wrench, ChevronDown, ChevronUp, ChevronRight, Filter, MapPin, LayoutGrid, Map as MapIcon, Camera, Laptop, Smartphone, Speaker, Car, Bike, Bus, Tractor, Tent, Armchair, ShowerHead, Tv, BookOpen, HeartPulse, Store, Hammer, Hotel, Building2, Home as HomeIcon, User, DoorOpen, Building as BuildingIcon, HotelIcon, Warehouse, Camera as CameraIcon, Table, Star, Clock, Clipboard, Wrench as WrenchIcon, Settings, PenTool, Share2, Heart, Calendar, CreditCard, Shield, MapPin as LocationIcon, CheckCircle2, Users, Wifi, Car as ParkingIcon, Coffee, Utensils, Bed, Bath, BookCheck, Phone } from 'lucide-react';
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
import EnhancedHousingSection from '@/components/housing/EnhancedHousingSection';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

const Rentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeSection, setActiveSection] = useState<'categories' | 'housing'>('categories');

  // Updated rent categories with "বাসা বাড়ি" as the first category and enhanced booking features
  const rentCategories = [
    {
      icon: <div className="text-2xl">🏠</div>,
      name: "বাসা বাড়ি",
      path: "/rental-category/housing",
      count: 892,
      isMainCategory: true,
      subcategories: [{
        icon: <div className="text-xl">🏢</div>,
        name: "অ্যাপার্টমেন্ট/ফ্ল্যাট",
        path: "/rental-category/apartment",
        count: 187,
        features: [{
          name: "ইনস্ট্যান্ট বুকিং",
          description: "তাৎক্ষণিক বুকিং কনফার্মেশন",
          icon: <Calendar className="h-4 w-4" />,
          bookingType: "instant"
        }, {
          name: "অনলাইন ভার্চুয়াল ট্যুর",
          description: "ঘরে বসে অ্যাপার্টমেন্ট দেখুন",
          icon: <Camera className="h-4 w-4" />,
          bookingType: "scheduled"
        }, {
          name: "সিকিউরিটি ডিপোজিট",
          description: "অনলাইন সিকিউরিটি পেমেন্ট",
          icon: <Shield className="h-4 w-4" />,
          bookingType: "payment"
        }, {
          name: "লোকেশন ভেরিফিকেশন",
          description: "GPS ভিত্তিক লোকেশন যাচাই",
          icon: <LocationIcon className="h-4 w-4" />,
          bookingType: "verification"
        }, {
          name: "ইউটিলিটি বিল ট্র্যাকিং",
          description: "বিদ্যুৎ, গ্যাস, পানির বিল ম্যানেজমেন্ট",
          icon: <CreditCard className="h-4 w-4" />,
          bookingType: "monthly"
        }, {
          name: "নিরাপত্তা সিস্টেম",
          description: "CCTV ও নিরাপত্তা ক্যামেরা",
          icon: <CheckCircle2 className="h-4 w-4" />,
          bookingType: "security"
        }]
      }, {
        icon: <div className="text-xl">🏡</div>,
        name: "বাসা/বাড়ি",
        path: "/rental-category/house",
        count: 156,
        features: [{
          name: "পূর্ণ বাড়ি বুকিং",
          description: "সম্পূর্ণ বাড়ি ভাড়া নিন",
          icon: <Home className="h-4 w-4" />,
          bookingType: "full-house"
        }, {
          name: "গার্ডেন স্পেস বুকিং",
          description: "বাগান ও বহিরাঙ্গন এলাকা অন্তর্ভুক্ত",
          icon: <Users className="h-4 w-4" />,
          bookingType: "garden-included"
        }, {
          name: "পার্কিং স্লট",
          description: "গাড়ি পার্কিং এর গ্যারান্টি",
          icon: <ParkingIcon className="h-4 w-4" />,
          bookingType: "parking-included"
        }, {
          name: "পোষা প্রাণী অনুমতি",
          description: "পোষা প্রাণী রাখার সুবিধা",
          icon: <Heart className="h-4 w-4" />,
          bookingType: "pet-friendly"
        }, {
          name: "দীর্ঘমেয়াদী চুক্তি",
          description: "১ বছর বা তার বেশি সময়ের জন্য",
          icon: <Calendar className="h-4 w-4" />,
          bookingType: "long-term"
        }, {
          name: "ফ্যামিলি প্রেফারেন্স",
          description: "পারিবারিক পরিবেশ নিশ্চিত",
          icon: <Users className="h-4 w-4" />,
          bookingType: "family-only"
        }]
      }, {
        icon: <div className="text-xl">🏨</div>,
        name: "মেস/হোস্টেল",
        path: "/rental-category/hostel",
        count: 83,
        features: [{
          name: "মিল প্যাকেজ বুকিং",
          description: "৩ বেলা খাবারের সাথে বুকিং",
          icon: <Utensils className="h-4 w-4" />,
          bookingType: "meal-included"
        }, {
          name: "বেড স্লট রিজার্ভেশন",
          description: "নির্দিষ্ট বেড নম্বর নিশ্চিত করুন",
          icon: <Bed className="h-4 w-4" />,
          bookingType: "bed-reservation"
        }, {
          name: "ওয়াইফাই প্যাকেজ",
          description: "হাই-স্পিড ইন্টারনেট গ্যারান্টি",
          icon: <Wifi className="h-4 w-4" />,
          bookingType: "wifi-included"
        }, {
          name: "লন্ড্রি সার্ভিস",
          description: "সাপ্তাহিক কাপড় ধোয়ার সুবিধা",
          icon: <Coffee className="h-4 w-4" />,
          bookingType: "laundry-included"
        }, {
          name: "স্টাডি রুম এক্সেস",
          description: "২৪/৭ পড়াশোনার রুম",
          icon: <BookCheck className="h-4 w-4" />,
          bookingType: "study-access"
        }, {
          name: "শর্ট টার্ম স্টে",
          description: "১ মাস থেকে ৬ মাস পর্যন্ত",
          icon: <Clock className="h-4 w-4" />,
          bookingType: "short-term"
        }]
      }, {
        icon: <div className="text-xl">🛏️</div>,
        name: "সিঙ্গেল রুম/শেয়ারড",
        path: "/rental-category/room",
        count: 119,
        features: [{
          name: "রুম টাইপ সিলেকশন",
          description: "সিঙ্গেল/শেয়ারড রুম পছন্দ",
          icon: <Users className="h-4 w-4" />,
          bookingType: "room-type"
        }, {
          name: "ফার্নিশড অপশন",
          description: "সম্পূর্ণ আসবাবপত্র সহ বুকিং",
          icon: <Table className="h-4 w-4" />,
          bookingType: "furnished"
        }, {
          name: "প্রাইভেট বাথরুম",
          description: "নিজস্ব বাথরুম সুবিধা",
          icon: <Bath className="h-4 w-4" />,
          bookingType: "private-bathroom"
        }, {
          name: "কমন এরিয়া এক্সেস",
          description: "শেয়ার্ড রান্নাঘর ও বসার ঘর",
          icon: <Coffee className="h-4 w-4" />,
          bookingType: "common-access"
        }, {
          name: "২৪/৭ নিরাপত্তা",
          description: "সার্বক্ষণিক নিরাপত্তা গ্যারান্টি",
          icon: <Shield className="h-4 w-4" />,
          bookingType: "security-24-7"
        }, {
          name: "ইমার্জেন্সি কন্ট্যাক্ট",
          description: "জরুরি যোগাযোগের নম্বর",
          icon: <Phone className="h-4 w-4" />,
          bookingType: "emergency-contact"
        }]
      }]
    },
    {
      icon: <Laptop className="h-8 w-8 text-blue-500" />,
      name: "ইলেকট্রনিক্স",
      path: "/rental-category/electronics",
      count: 324
    }, {
      icon: <Car className="h-8 w-8 text-red-500" />,
      name: "পরিবহন",
      path: "/rental-category/transport",
      count: 178
    }, {
      icon: <Tent className="h-8 w-8 text-green-500" />,
      name: "ইভেন্ট সামগ্রী",
      path: "/rental-category/event",
      count: 89
    }, {
      icon: <Armchair className="h-8 w-8 text-purple-500" />,
      name: "ঘরোয়া সামগ্রী",
      path: "/rental-category/home",
      count: 145
    }, {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      name: "শিক্ষা সামগ্রী",
      path: "/rental-category/education",
      count: 65
    }, {
      icon: <Tractor className="h-8 w-8 text-yellow-500" />,
      name: "কৃষি যন্ত্রপাতি",
      path: "/rental-category/agriculture",
      count: 42
    }, {
      icon: <Store className="h-8 w-8 text-pink-500" />,
      name: "ব্যবসায়িক সামগ্রী",
      path: "/rental-category/business",
      count: 86
    }, {
      icon: <Hammer className="h-8 w-8 text-gray-500" />,
      name: "কারিগরি টুলস",
      path: "/rental-category/tools",
      count: 96
    }, {
      icon: <Briefcase className="h-8 w-8 text-indigo-500" />,
      name: "কমার্শিয়াল স্পেস",
      path: "/rental-category/commercial",
      count: 76
    }, {
      icon: <HotelIcon className="h-8 w-8 text-teal-500" />,
      name: "গেস্ট হাউস/স্বল্পমেয়াদী",
      path: "/rental-category/guesthouse",
      count: 59
    }, {
      icon: <HomeIcon className="h-8 w-8 text-emerald-500" />,
      name: "গ্রামীণ বাসস্থান",
      path: "/rental-category/rural",
      count: 47
    }, {
      icon: <Camera className="h-8 w-8 text-violet-500" />,
      name: "স্টুডিও/স্পেশাল স্পেস",
      path: "/rental-category/studio",
      count: 35
    }
  ];

  const featuredListings = [{
    id: 1,
    title: "৩ বেডরুম অ্যাপার্টমেন্ট",
    location: "গুলশান, ঢাকা",
    price: "৳২৫,০০০/মাস",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    category: "apartment",
    latitude: 23.7937,
    longitude: 90.4137
  }, {
    id: 2,
    title: "অফিস স্পেস",
    location: "বনানী, ঢাকা",
    price: "৳৫০,০০০/মাস",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
    category: "office",
    latitude: 23.7937,
    longitude: 90.3938
  }, {
    id: 3,
    title: "টয়োটা কোরোলা",
    location: "মিরপুর, ঢাকা",
    price: "৳৫,০০০/দিন",
    image: "https://images.unsplash.com/photo-1494965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
    category: "car",
    latitude: 23.8103,
    longitude: 90.3420
  }, {
    id: 4,
    title: "ডিএসএলআর ক্যামেরা",
    location: "ধানমন্ডি, ঢাকা",
    price: "৳১,০০০/দিন",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
    category: "equipment",
    latitude: 23.7465,
    longitude: 90.3751
  }];

  const featuredServices = [{
    id: 1,
    title: "ইলেকট্রনিক্স মেরামত",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ৮০০/ঘণ্টা",
    location: "ঢাকা",
    rating: 4.8,
    category: "মেরামত"
  }, {
    id: 2,
    title: "ফার্নিচার ইন্সটলেশন",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ১,২০০/সেশন",
    location: "ঢাকা",
    rating: 4.6,
    category: "ইন্সটলেশন"
  }, {
    id: 3,
    title: "ড্রাইভার সার্ভিস",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ১,০০০/দিন",
    location: "ঢাকা",
    rating: 4.7,
    category: "ট্রান্সপোর্ট"
  }, {
    id: 4,
    title: "ফটোগ্রাফি সার্ভিস",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
    price: "৳ ৩,০০০/সেশন",
    location: "ঢাকা",
    rating: 4.9,
    category: "ইভেন্ট"
  }];

  // Updated rent categories with "বাসা বাড়ি" as the first category and enhanced booking features
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
    if (category.name === "বাসা বাড়ি") {
      setActiveSection('housing');
      toast({
        title: "বাসা বাড়ি সেকশন",
        description: "হাউজিং সেকশনে স্বাগতম! এখানে সব ধরনের বাসা বাড়ি দেখুন।"
      });
      return;
    }
    
    if (category.features) {
      toast({
        title: `${category.name} এর ফিচারসমূহ`,
        description: `${category.features.length}টি বিশেষ সুবিধা উপলব্ধ`
      });
    }
    navigate(category.path);
  };

  const handleBookingFeature = (feature: any, subcategory: any) => {
    const bookingActions: Record<string, () => void> = {
      'instant': () => navigate('/rental-booking?type=instant'),
      'scheduled': () => navigate('/rental-booking?type=scheduled'),
      'payment': () => navigate('/rental-booking?type=payment'),
      'verification': () => navigate('/rental-booking?type=verification'),
      'monthly': () => navigate('/rental-booking?type=monthly'),
      'security': () => navigate('/rental-booking?type=security'),
      'full-house': () => navigate('/rental-booking?type=full-house'),
      'garden-included': () => navigate('/rental-booking?type=garden'),
      'parking-included': () => navigate('/rental-booking?type=parking'),
      'pet-friendly': () => navigate('/rental-booking?type=pet-friendly'),
      'long-term': () => navigate('/rental-booking?type=long-term'),
      'family-only': () => navigate('/rental-booking?type=family'),
      'meal-included': () => navigate('/rental-booking?type=meal'),
      'bed-reservation': () => navigate('/rental-booking?type=bed'),
      'wifi-included': () => navigate('/rental-booking?type=wifi'),
      'laundry-included': () => navigate('/rental-booking?type=laundry'),
      'study-access': () => navigate('/rental-booking?type=study'),
      'short-term': () => navigate('/rental-booking?type=short-term'),
      'room-type': () => navigate('/rental-booking?type=room-type'),
      'furnished': () => navigate('/rental-booking?type=furnished'),
      'private-bathroom': () => navigate('/rental-booking?type=private-bath'),
      'common-access': () => navigate('/rental-booking?type=common-area'),
      'security-24-7': () => navigate('/rental-booking?type=security-247'),
      'emergency-contact': () => navigate('/rental-booking?type=emergency')
    };
    const action = bookingActions[feature.bookingType];
    if (action) {
      action();
      toast({
        title: "বুকিং প্রক্রিয়া শুরু",
        description: `${feature.name} এর জন্য বুকিং পেজে রিডাইরেক্ট করা হচ্ছে`
      });
    } else {
      toast({
        title: feature.name,
        description: feature.description
      });
    }
  };

  const renderCategoryItem = (category: any, index: number) => {
    if (category.isMainCategory && category.subcategories) {
      return (
        <div key={index}>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div 
                className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  {category.icon}
                </div>
                <span className="text-xs text-center mb-1">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}টি
                </Badge>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }
    
    return (
      <Link key={index} to={category.path} className="flex flex-col items-center justify-center transition-all hover:scale-105">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          {category.icon}
        </div>
        <span className="text-xs text-center mb-1">{category.name}</span>
        <Badge variant="secondary" className="text-xs">
          {category.count}টি
        </Badge>
      </Link>
    );
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">রেন্ট</h1>
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={value => setViewMode(value as 'grid' | 'map')} className="w-[180px]">
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

      {/* Section Toggle Buttons */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant={activeSection === 'categories' ? 'default' : 'outline'}
          onClick={() => setActiveSection('categories')}
          className="flex items-center gap-2"
        >
          <LayoutGrid className="h-4 w-4" />
          সব ক্যাটাগরি
        </Button>
        <Button 
          variant={activeSection === 'housing' ? 'default' : 'outline'}
          onClick={() => setActiveSection('housing')}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          বাসা বাড়ি
        </Button>
      </div>
      
      {/* Conditional Content Based on Active Section */}
      {activeSection === 'housing' ? (
        <EnhancedHousingSection language={language || 'bn'} />
      ) : (
        <>
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
                {featuredListings.map(listing => (
                  <Card key={listing.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105" onClick={() => handleListingClick(listing.id)}>
                    <CardContent className="p-0">
                      <div className="relative aspect-square">
                        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
                        <Badge className="absolute top-2 left-2">{listing.category}</Badge>
                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                          <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={e => handleBookmark(e, listing.id)}>
                            <Heart className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button variant="outline" size="icon" className="bg-white h-8 w-8 rounded-full" onClick={e => handleShare(e, listing)}>
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
                <MapView listings={featuredListings.map(listing => ({
                  id: listing.id,
                  title: listing.title,
                  location: listing.location,
                  latitude: listing.latitude,
                  longitude: listing.longitude
                }))} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {featuredListings.slice(0, 3).map(listing => (
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
        </>
      )}

      {shareItem && <SocialShareModal open={showShareModal} onOpenChange={setShowShareModal} item={shareItem} />}
    </div>
  );
};

export default Rentals;
