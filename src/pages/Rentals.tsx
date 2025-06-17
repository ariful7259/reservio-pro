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
// Refactored components:
import CategoryGrid from '@/components/rentals/CategoryGrid';
import BannerCarousel from '@/components/rentals/BannerCarousel';
import FeaturedListings from '@/components/rentals/FeaturedListings';
import FilterSection from '@/components/rentals/FilterSection';
import SectionToggle from '@/components/rentals/SectionToggle';

const Rentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useApp();

  // State
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeSection, setActiveSection] = useState<'categories' | 'housing'>('categories');

  // Updated rent categories with subcategories
  const rentCategories = [
    {
      icon: <div className="text-2xl">🏠</div>,
      name: "বাসা বাড়ি",
      path: "/rental-category/housing",
      count: 892,
      isMainCategory: true,
      subcategories: [
        {
          icon: <div className="text-xl">🏢</div>,
          name: "অ্যাপার্টমেন্ট/ফ্ল্যাট",
          path: "/rental-category/apartment",
          count: 187
        },
        {
          icon: <div className="text-xl">🏡</div>,
          name: "বাসা/বাড়ি",
          path: "/rental-category/house",
          count: 156
        },
        {
          icon: <div className="text-xl">🏨</div>,
          name: "মেস/হোস্টেল",
          path: "/rental-category/hostel",
          count: 83
        },
        {
          icon: <div className="text-xl">🛏️</div>,
          name: "সিঙ্গেল রুম/শেয়ারড",
          path: "/rental-category/room",
          count: 119
        }
      ]
    },
    {
      icon: <Laptop className="h-8 w-8 text-blue-500" />,
      name: "ইলেকট্রনিক্স",
      path: "/rental-category/electronics",
      count: 324,
      subcategories: [
        { name: "ল্যাপটপ / কম্পিউটার", path: "/rental-category/laptop", count: 45 },
        { name: "প্রজেক্টর / মনিটর", path: "/rental-category/projector", count: 23 },
        { name: "প্রিন্টার / স্ক্যানার", path: "/rental-category/printer", count: 18 },
        { name: "ক্যামেরা / ভিডিও ক্যামেরা", path: "/rental-category/camera", count: 34 },
        { name: "সাউন্ড সিস্টেম / স্পিকার", path: "/rental-category/sound", count: 28 },
        { name: "LED টিভি", path: "/rental-category/tv", count: 42 },
        { name: "গেমিং কনসোল", path: "/rental-category/gaming", count: 15 },
        { name: "পাওয়ার ব্যাঙ্ক / ইউপিএস", path: "/rental-category/power", count: 22 }
      ]
    },
    {
      icon: <Car className="h-8 w-8 text-red-500" />,
      name: "পরিবহন",
      path: "/rental-category/transport",
      count: 178,
      subcategories: [
        { name: "প্রাইভেট কার", path: "/rental-category/car", count: 67 },
        { name: "মাইক্রোবাস / নোয়াহ", path: "/rental-category/microbus", count: 23 },
        { name: "মোটরসাইকেল / স্কুটার", path: "/rental-category/bike", count: 45 },
        { name: "ভ্যান / পিকআপ", path: "/rental-category/van", count: 18 },
        { name: "রিকশা / ভ্যানগাড়ি", path: "/rental-category/rickshaw", count: 12 },
        { name: "ট্রাক / মিনি ট্রাক", path: "/rental-category/truck", count: 8 },
        { name: "বাইসাইকেল", path: "/rental-category/bicycle", count: 5 }
      ]
    },
    {
      icon: <Tent className="h-8 w-8 text-green-500" />,
      name: "ইভেন্ট সামগ্রী",
      path: "/rental-category/event",
      count: 89,
      subcategories: [
        { name: "চেয়ার / টেবিল / সাউন্ড বক্স", path: "/rental-category/furniture", count: 25 },
        { name: "লাইটিং ও সাজসজ্জা", path: "/rental-category/lighting", count: 18 },
        { name: "স্টেজ ও ব্যাকড্রপ", path: "/rental-category/stage", count: 12 },
        { name: "ক্যাটারিং সামগ্রী", path: "/rental-category/catering", count: 15 },
        { name: "ক্যামেরা ও ফটোগ্রাফি সার্ভিস", path: "/rental-category/photography", count: 10 },
        { name: "জেনারেটর", path: "/rental-category/generator", count: 6 },
        { name: "ফ্যান / এসি", path: "/rental-category/cooling", count: 3 }
      ]
    },
    {
      icon: <Armchair className="h-8 w-8 text-purple-500" />,
      name: "ঘরোয়া সামগ্রী",
      path: "/rental-category/home",
      count: 145,
      subcategories: [
        { name: "বিছানা / ম্যাট্রেস", path: "/rental-category/bed", count: 35 },
        { name: "ফ্রিজ / রেফ্রিজারেটর", path: "/rental-category/fridge", count: 28 },
        { name: "ওয়াশিং মেশিন", path: "/rental-category/washing", count: 22 },
        { name: "ব্লেন্ডার / কুকার", path: "/rental-category/kitchen", count: 18 },
        { name: "গ্যাস চুলা / সিলিন্ডার", path: "/rental-category/gas", count: 15 },
        { name: "পানির পাম্প", path: "/rental-category/pump", count: 12 },
        { name: "হিটার / ফ্যান / এয়ার কুলার", path: "/rental-category/climate", count: 15 }
      ]
    },
    {
      icon: <BookOpen className="h-8 w-8 text-orange-500" />,
      name: "শিক্ষা সামগ্রী",
      path: "/rental-category/education",
      count: 65,
      subcategories: [
        { name: "হোয়াইটবোর্ড / প্রজেক্টর", path: "/rental-category/teaching", count: 18 },
        { name: "টিউটরিং কিট", path: "/rental-category/tutoring", count: 12 },
        { name: "কম্পিউটার / ল্যাপটপ", path: "/rental-category/edu-computer", count: 15 },
        { name: "স্টাডি ডেস্ক / চেয়ার", path: "/rental-category/study-furniture", count: 10 },
        { name: "অনলাইন ক্লাস সেটআপ কিট", path: "/rental-category/online-class", count: 10 }
      ]
    },
    {
      icon: <Tractor className="h-8 w-8 text-yellow-500" />,
      name: "কৃষি যন্ত্রপাতি",
      path: "/rental-category/agriculture",
      count: 42,
      subcategories: [
        { name: "পাওয়ার টিলার", path: "/rental-category/tiller", count: 8 },
        { name: "হারভেস্টার মেশিন", path: "/rental-category/harvester", count: 5 },
        { name: "পানি সেচ পাম্প", path: "/rental-category/irrigation", count: 12 },
        { name: "ট্রলি / খাল খননের সরঞ্জাম", path: "/rental-category/excavation", count: 6 },
        { name: "স্প্রে মেশিন", path: "/rental-category/spray", count: 7 },
        { name: "বীজ বপন মেশিন", path: "/rental-category/seeding", count: 4 }
      ]
    },
    {
      icon: <Store className="h-8 w-8 text-pink-500" />,
      name: "ব্যবসায়িক সামগ্রী",
      path: "/rental-category/business",
      count: 86,
      subcategories: [
        { name: "POS মেশিন", path: "/rental-category/pos", count: 15 },
        { name: "সিসিটিভি ক্যামেরা", path: "/rental-category/cctv", count: 18 },
        { name: "ডিসপ্লে র‍্যাক / শেলফ", path: "/rental-category/display", count: 22 },
        { name: "কফি মেশিন / ভেন্ডিং মেশিন", path: "/rental-category/vending", count: 8 },
        { name: "টেন্ট / বুথ / এক্সিবিশন কিট", path: "/rental-category/exhibition", count: 12 },
        { name: "লাইটবক্স সাইনবোর্ড", path: "/rental-category/signboard", count: 11 }
      ]
    },
    {
      icon: <Hammer className="h-8 w-8 text-gray-500" />,
      name: "কারিগরি টুলস",
      path: "/rental-category/tools",
      count: 96,
      subcategories: [
        { name: "ড্রিল মেশিন", path: "/rental-category/drill", count: 18 },
        { name: "ওয়েল্ডিং মেশিন", path: "/rental-category/welding", count: 12 },
        { name: "কাটার / গ্রাইন্ডার", path: "/rental-category/cutting", count: 15 },
        { name: "স্যান্ডার / প্লেনার", path: "/rental-category/sanding", count: 10 },
        { name: "কাঠ মিস্ত্রির টুল কিট", path: "/rental-category/carpentry", count: 20 },
        { name: "ইলেকট্রিশিয়ান টুলস", path: "/rental-category/electrical", count: 14 },
        { name: "মিস্ত্রি/মেসনের সরঞ্জাম", path: "/rental-category/masonry", count: 7 }
      ]
    },
    {
      icon: <Briefcase className="h-8 w-8 text-indigo-500" />,
      name: "কমার্শিয়াল স্পেস",
      path: "/rental-category/commercial",
      count: 76,
      subcategories: [
        { name: "দোকানের স্পেস", path: "/rental-category/shop-space", count: 25 },
        { name: "ফুড কার্ট বা স্টল", path: "/rental-category/food-cart", count: 18 },
        { name: "শো রুম / ডিসপ্লে এরিয়া", path: "/rental-category/showroom", count: 20 },
        { name: "ট্রেড ফেয়ার বুথ স্পেস", path: "/rental-category/trade-fair", count: 13 }
      ]
    },
    {
      icon: <HotelIcon className="h-8 w-8 text-teal-500" />,
      name: "গেস্ট হাউস/স্বল্পমেয়াদী",
      path: "/rental-category/guesthouse",
      count: 59,
      subcategories: [
        { name: "ফ্যামিলি গেস্ট হাউস", path: "/rental-category/family-guest", count: 20 },
        { name: "ব্যাচেলর থাকার স্পেস", path: "/rental-category/bachelor", count: 15 },
        { name: "অফিস ট্রিপ/ট্রেনিংয়ের জন্য অ্যাপার্টমেন্ট", path: "/rental-category/office-trip", count: 12 },
        { name: "ঘন্টারভিত্তিক বুকিং", path: "/rental-category/hourly", count: 12 }
      ]
    },
    {
      icon: <HomeIcon className="h-8 w-8 text-emerald-500" />,
      name: "গ্রামীণ বাসস্থান",
      path: "/rental-category/rural",
      count: 47,
      subcategories: [
        { name: "কুটির / টিনের ঘর", path: "/rental-category/cottage", count: 15 },
        { name: "বাশের ঘর / মাটির ঘর", path: "/rental-category/bamboo", count: 12 },
        { name: "পুকুর সংলগ্ন ঘর", path: "/rental-category/pond-side", count: 10 },
        { name: "কৃষিজমিতে থাকা", path: "/rental-category/farmland", count: 10 }
      ]
    },
    {
      icon: <Camera className="h-8 w-8 text-violet-500" />,
      name: "স্টুডিও/স্পেশাল স্পেস",
      path: "/rental-category/studio",
      count: 35,
      subcategories: [
        { name: "ভিডিও শুটিং স্টুডিও", path: "/rental-category/video-studio", count: 8 },
        { name: "ইউটিউব/লাইভ স্ট্রিমিং রুম", path: "/rental-category/streaming", count: 10 },
        { name: "ফটোস্টুডিও / ব্যাকড্রপ সহ", path: "/rental-category/photo-studio", count: 7 },
        { name: "রেকর্ডিং স্টুডিও", path: "/rental-category/recording", count: 5 },
        { name: "কুকিং কন্টেন্ট স্টুডিও", path: "/rental-category/cooking-studio", count: 3 },
        { name: "আর্টিস্টিক স্পেস", path: "/rental-category/artistic", count: 2 }
      ]
    }
  ];

  // All data arrays and handlers (kept the same as before)
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

  // Moved bannerImages inside for prop passing
  const bannerImages = [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000&auto=format&fit=crop'
  ];

  // Moved handler functions inside for prop passing
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
    navigate(category.path);
  };

  const handleSubcategoryClick = (subcategory: any) => {
    navigate(subcategory.path);
    toast({
      title: subcategory.name,
      description: `${subcategory.count}টি আইটেম উপলব্ধ`
    });
  };

  // Updated renderCategoryItem function with subcategories
  const renderCategoryItem = (category: any, index: number) => {
    if (category.isMainCategory && category.subcategories) {
      return (
        <div key={index}>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer" onClick={() => handleCategoryClick(category)}>
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
              <div className="grid grid-cols-2 gap-2 text-xs">
                {category.subcategories.map((sub: any, subIndex: number) => (
                  <div 
                    key={subIndex} 
                    className="p-2 hover:bg-gray-50 rounded cursor-pointer text-center"
                    onClick={() => handleSubcategoryClick(sub)}
                  >
                    <div className="mb-1">{sub.icon}</div>
                    <span className="text-xs">{sub.name}</span>
                    <Badge variant="outline" className="text-xs ml-1">
                      {sub.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }

    if (category.subcategories) {
      return (
        <div key={index}>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer">
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
              <div className="grid grid-cols-1 gap-1 text-xs">
                {category.subcategories.map((sub: any, subIndex: number) => (
                  <div 
                    key={subIndex} 
                    className="p-2 hover:bg-gray-50 rounded cursor-pointer flex justify-between items-center"
                    onClick={() => handleSubcategoryClick(sub)}
                  >
                    <span className="text-xs">{sub.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {sub.count}
                    </Badge>
                  </div>
                ))}
              </div>
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

  // Page body
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

      {/* Section Toggle */}
      <SectionToggle activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === 'housing' ? (
        <EnhancedHousingSection language={language || 'bn'} />
      ) : (
        <>
          <FilterSection filterVisible={filterVisible} toggleFilter={toggleFilter} />
          <CategoryGrid 
            rentCategories={rentCategories} 
            isExpanded={isExpanded} 
            setIsExpanded={setIsExpanded} 
            renderCategoryItem={renderCategoryItem} 
          />
          <BannerCarousel bannerImages={bannerImages} />
          <Separator className="my-6" />
          <FeaturedListings 
            featuredListings={featuredListings} 
            viewMode={viewMode} 
            handleListingClick={handleListingClick} 
            handleBookmark={handleBookmark} 
            handleShare={handleShare} 
            MapViewComponent={MapView} 
          />
          <div className="mb-6">
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/services')}>
                আরও দেখুন <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
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
