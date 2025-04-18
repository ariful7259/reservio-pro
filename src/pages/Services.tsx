
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  Truck, 
  Briefcase, 
  PaintBucket, 
  Wrench,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Filter,
  MapPin,
  LayoutGrid,
  Map as MapIcon,
  Calendar,
  Stethoscope,
  Scissors,
  Utensils,
  Shirt,
  Car,
  Laptop,
  Smartphone,
  Camera,
  HeartPulse,
  GraduationCap,
  Baby,
  Bed,
  Bath,
  Palette,
  Construction,
  Star,
  Clock,
  Share2,
  Heart,
  Search,
  Flame,
  ArrowUpDown,
  SortAsc,
  Hash,
  SlidersHorizontal,
  X,
  TrendingUp
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapView from '@/components/MapView';
import SocialShareModal from '@/components/SocialShareModal';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/components/ThemeProvider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sortOption, setSortOption] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const bannerImages = [
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606836591695-4d58a73fba39?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=1000&auto=format&fit=crop",
  ];

  const serviceCategories = [
    { 
      icon: <Stethoscope className="h-8 w-8" />, 
      name: "ডাক্তার", 
      path: "/services/category/doctor", 
      count: 278,
      isTrending: true
    },
    { 
      icon: <HeartPulse className="h-8 w-8" />, 
      name: "ডেন্টাল", 
      path: "/services/category/dental", 
      count: 124 
    },
    { 
      icon: <PaintBucket className="h-8 w-8" />, 
      name: "পেইন্টিং", 
      path: "/services/category/painting", 
      count: 98 
    },
    { 
      icon: <Scissors className="h-8 w-8" />, 
      name: "সেলুন", 
      path: "/services/category/salon", 
      count: 186,
      isTrending: true
    },
    { 
      icon: <Utensils className="h-8 w-8" />, 
      name: "খাবার", 
      path: "/services/category/food", 
      count: 312,
      isTrending: true
    },
    { 
      icon: <Wrench className="h-8 w-8" />, 
      name: "রিপেয়ার", 
      path: "/services/category/repair", 
      count: 165 
    },
    { 
      icon: <Truck className="h-8 w-8" />, 
      name: "ডেলিভারি", 
      path: "/services/category/delivery", 
      count: 143 
    },
    { 
      icon: <Briefcase className="h-8 w-8" />, 
      name: "আইনি সেবা", 
      path: "/services/category/legal", 
      count: 78 
    },
    { 
      icon: <Car className="h-8 w-8" />, 
      name: "ট্রান্সপোর্ট", 
      path: "/services/category/transport", 
      count: 145 
    },
    { 
      icon: <Laptop className="h-8 w-8" />, 
      name: "আইটি সেবা", 
      path: "/services/category/it", 
      count: 126 
    },
    { 
      icon: <GraduationCap className="h-8 w-8" />, 
      name: "শিক্ষা", 
      path: "/services/category/education", 
      count: 215,
      isTrending: true
    },
    { 
      icon: <Smartphone className="h-8 w-8" />, 
      name: "গ্যাজেট রিপেয়ার", 
      path: "/services/category/gadget-repair", 
      count: 87 
    },
    { 
      icon: <Palette className="h-8 w-8" />, 
      name: "ডিজাইন", 
      path: "/services/category/design", 
      count: 92 
    },
    { 
      icon: <Calendar className="h-8 w-8" />, 
      name: "ইভেন্ট", 
      path: "/services/category/event", 
      count: 104 
    },
    { 
      icon: <Camera className="h-8 w-8" />, 
      name: "ফটোগ্রাফি", 
      path: "/services/category/photography", 
      count: 67 
    },
    { 
      icon: <Construction className="h-8 w-8" />, 
      name: "কনস্ট্রাকশন", 
      path: "/services/category/construction", 
      count: 58 
    }
  ];

  // সর্টিং অনুযায়ী ক্যাটাগরি আইকন প্রদর্শন
  const getSortedCategories = () => {
    if (searchTerm) {
      return serviceCategories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    let sortedList = [...serviceCategories];
    
    switch(sortOption) {
      case "popularity":
        sortedList.sort((a, b) => b.count - a.count);
        break;
      case "alphabetical":
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "trending":
        sortedList.sort((a, b) => {
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return b.count - a.count;
        });
        break;
      default:
        break;
    }
    
    return sortedList;
  };

  const featuredServices = [
    {
      id: 1,
      title: "ইলেকট্রনিক্স মেরামত",
      image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৮০০/ঘণ্টা",
      location: "ঢাকা",
      rating: 4.8,
      category: "মেরামত",
      latitude: 23.7937,
      longitude: 90.4137
    },
    {
      id: 2,
      title: "ফার্নিচার ইন্সটলেশন",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ১,২০০/সেশন",
      location: "ঢাকা",
      rating: 4.6,
      category: "ইন্সটলেশন",
      latitude: 23.7965,
      longitude: 90.4070
    },
    {
      id: 3,
      title: "ড্রাইভার সার্ভিস",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ১,০০০/দিন",
      location: "ঢাকা",
      rating: 4.7,
      category: "ট্রান্সপোর্ট",
      latitude: 23.8103,
      longitude: 90.3420
    },
    {
      id: 4,
      title: "ফটোগ্রাফি সার্ভিস",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৩,০০০/সেশন",
      location: "ঢাকা",
      rating: 4.9,
      category: "ইভেন্ট",
      latitude: 23.7465,
      longitude: 90.3751
    },
    {
      id: 5,
      title: "হোম ক্লিনিং",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ১,৫০০/সেশন",
      location: "ঢাকা",
      rating: 4.5,
      category: "হোম সার্ভিস",
      latitude: 23.7550,
      longitude: 90.3900
    },
    {
      id: 6,
      title: "প্লাম্বিং সার্ভিস",
      image: "https://images.unsplash.com/photo-1508802597834-805c2f2db892?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৭০০/ঘণ্টা",
      location: "ঢাকা",
      rating: 4.4,
      category: "রিপেয়ার",
      latitude: 23.8330,
      longitude: 90.4170
    },
    {
      id: 7,
      title: "আইটি সাপোর্ট",
      image: "https://images.unsplash.com/photo-1539193143244-c83d9436d633?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ১,২০০/সেশন",
      location: "ঢাকা",
      rating: 4.8,
      category: "আইটি",
      latitude: 23.7900,
      longitude: 90.3850
    },
    {
      id: 8,
      title: "ফুড ডেলিভারি",
      image: "https://images.unsplash.com/photo-1565695776882-f1bb95eb1781?q=80&w=1000&auto=format&fit=crop",
      price: "৳ ৫০/কিমি",
      location: "ঢাকা",
      rating: 4.5,
      category: "ডেলিভারি",
      latitude: 23.7700,
      longitude: 90.3750
    },
  ];

  const toggleFilter = () => {
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

  const handleShare = (e: React.MouseEvent, service: any) => {
    e.stopPropagation();
    setShareItem({
      ...service,
      type: 'service',
    });
    setShowShareModal(true);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setShowAdvancedSearch(false);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">সার্ভিস</h1>
        
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'map')} className="w-[180px]">
            <TabsList className="grid w-full grid-cols-2 bg-[#F6F8FF] dark:bg-gray-800">
              <TabsTrigger value="grid" className="flex items-center gap-1 data-[state=active]:bg-[#416CE1] data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
                <LayoutGrid className="h-4 w-4" /> গ্রিড
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1 data-[state=active]:bg-[#416CE1] data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
                <MapIcon className="h-4 w-4" /> মানচিত্র
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleFilter}
            className="border-[#416CE1] text-[#416CE1] hover:bg-[#416CE1]/5 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* প্রধান সার্চ এবং সর্ট বার */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="ক্যাটাগরি খুঁজুন"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 border-[#416CE1]/30 focus:border-[#416CE1] focus:ring-[#416CE1]/20 dark:bg-gray-800 dark:border-blue-700 dark:focus:border-blue-500"
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={clearSearch}
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 border-[#416CE1]/30 text-[#416CE1] hover:bg-[#416CE1]/5 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950">
                <ArrowUpDown className="h-4 w-4" />
                <span>সর্ট করুন</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0 border-[#416CE1]/30 dark:border-blue-700 dark:bg-gray-800">
              <div className="p-2">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${sortOption === 'popularity' ? 'bg-[#416CE1]/10 text-[#416CE1] dark:bg-blue-900/30 dark:text-blue-400' : ''}`}
                  onClick={() => setSortOption('popularity')}
                >
                  <Hash className="h-4 w-4 mr-2" />
                  সংখ্যা অনুযায়ী
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${sortOption === 'alphabetical' ? 'bg-[#416CE1]/10 text-[#416CE1] dark:bg-blue-900/30 dark:text-blue-400' : ''}`}
                  onClick={() => setSortOption('alphabetical')}
                >
                  <SortAsc className="h-4 w-4 mr-2" />
                  নাম অনুযায়ী
                </Button>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${sortOption === 'trending' ? 'bg-[#416CE1]/10 text-[#416CE1] dark:bg-blue-900/30 dark:text-blue-400' : ''}`}
                  onClick={() => setSortOption('trending')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  ট্রেন্ডিং
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className={`border-[#416CE1]/30 hover:bg-[#416CE1]/5 dark:border-blue-700 dark:hover:bg-blue-950 ${showAdvancedSearch ? 'text-[#416CE1] bg-[#416CE1]/10 dark:text-blue-400 dark:bg-blue-900/30' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* অ্যাডভান্সড সার্চ ফিল্টার */}
      {showAdvancedSearch && (
        <div className="mb-6 p-4 border border-[#416CE1]/20 rounded-lg bg-[#F6F8FF] dark:bg-gray-800 dark:border-blue-900/50">
          <h2 className="font-medium mb-3 text-gray-900 dark:text-white">অ্যাডভান্সড ফিল্টার</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">লোকেশন</label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#416CE1] dark:text-blue-400" />
                <Select defaultValue="dhaka">
                  <SelectTrigger className="w-full border-[#416CE1]/30 focus:ring-[#416CE1]/20 dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
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
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">সেবার ধরন</label>
              <Select>
                <SelectTrigger className="w-full border-[#416CE1]/30 focus:ring-[#416CE1]/20 dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="ক্যাটাগরি" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800">
                  <SelectItem value="doctor">ডাক্তার</SelectItem>
                  <SelectItem value="repair">রিপেয়ার</SelectItem>
                  <SelectItem value="delivery">ডেলিভারি</SelectItem>
                  <SelectItem value="salon">সেলুন</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">মূল্য সীমা</label>
              <div className="px-2">
                <Slider
                  defaultValue={[500]}
                  max={5000}
                  step={100}
                  className="[&>span]:bg-[#416CE1] dark:[&>span]:bg-blue-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>৳১০০</span>
                  <span>৳২,৫০০</span>
                  <span>৳৫,০০০</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">রেটিং</label>
              <div className="px-2">
                <Slider
                  defaultValue={[4]}
                  max={5}
                  step={0.5}
                  className="[&>span]:bg-[#416CE1] dark:[&>span]:bg-blue-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>1 স্টার</span>
                  <span>3 স্টার</span>
                  <span>5 স্টার</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 bg-[#416CE1] hover:bg-[#416CE1]/90 dark:bg-blue-600 dark:hover:bg-blue-700">
              ফিল্টার করুন
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowAdvancedSearch(false)}
              className="border-[#416CE1]/30 text-[#416CE1] hover:bg-[#416CE1]/5 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950"
            >
              বাতিল করুন
            </Button>
          </div>
        </div>
      )}
      
      {filterVisible && (
        <div className="mb-6 p-4 border border-[#416CE1]/20 rounded-lg bg-[#F6F8FF] dark:bg-gray-800 dark:border-blue-900/50">
          <h2 className="font-medium mb-3 text-gray-900 dark:text-white">ফিল্টার</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">লোকেশন</label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#416CE1] dark:text-blue-400" />
                <Select defaultValue="dhaka">
                  <SelectTrigger className="w-full border-[#416CE1]/30 focus:ring-[#416CE1]/20 dark:bg-gray-700 dark:border-gray-600">
                    <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
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
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">ক্যাটাগরি</label>
              <Select>
                <SelectTrigger className="w-full border-[#416CE1]/30 focus:ring-[#416CE1]/20 dark:bg-gray-700 dark:border-gray-600">
                  <SelectValue placeholder="ক্যাটাগরি" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800">
                  <SelectItem value="doctor">ডাক্তার</SelectItem>
                  <SelectItem value="repair">রিপেয়ার</SelectItem>
                  <SelectItem value="delivery">ডেলিভারি</SelectItem>
                  <SelectItem value="salon">সেলুন</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">মূল্য সীমা</label>
              <div className="px-2">
                <Slider
                  defaultValue={[500]}
                  max={5000}
                  step={100}
                  className="[&>span]:bg-[#416CE1] dark:[&>span]:bg-blue-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>৳১০০</span>
                  <span>৳২,৫০০</span>
                  <span>৳৫,০০০</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">রেটিং</label>
              <div className="px-2">
                <Slider
                  defaultValue={[4]}
                  max={5}
                  step={0.5}
                  className="[&>span]:bg-[#416CE1] dark:[&>span]:bg-blue-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>1 স্টার</span>
                  <span>3 স্টার</span>
                  <span>5 স্টার</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 bg-[#416CE1] hover:bg-[#416CE1]/90 dark:bg-blue-600 dark:hover:bg-blue-700">
              ফিল্টার করুন
            </Button>
            <Button 
              variant="outline" 
              onClick={toggleFilter}
              className="border-[#416CE1]/30 text-[#416CE1] hover:bg-[#416CE1]/5 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950"
            >
              বাতিল করুন
            </Button>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">ক্যাটাগরি</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {sortOption === 'popularity' && 'সর্বাধিক ব্যবহৃত অনুযায়ী সাজানো'}
            {sortOption === 'alphabetical' && 'বর্ণানুক্রমে সাজানো'}
            {sortOption === 'trending' && 'ট্রেন্ডিং অনুযায়ী সাজানো'}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {getSortedCategories().slice(0, 8).map((category, index) => (
            <Link 
              key={index} 
              to={category.path}
              className="flex flex-col items-center justify-center transition-all hover:scale-105 relative"
            >
              <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-2 ${category.isTrending 
                ? 'bg-gradient-to-r from-[#416CE1] to-[#6B8DE9] shadow-lg dark:from-blue-600 dark:to-blue-400' 
                : 'bg-[#416CE1]/10 dark:bg-blue-900/30'}`}
              >
                <div className={category.isTrending ? 'text-white' : 'text-[#416CE1] dark:text-blue-400'}>
                  {category.icon}
                </div>
                {category.isTrending && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center">
                      <Flame className="h-3 w-3 text-white" />
                    </span>
                  </span>
                )}
              </div>
              <span className="text-xs text-center mb-1 text-gray-800 dark:text-gray-200">{category.name}</span>
              <Badge 
                variant="outline" 
                className={`text-xs ${category.isTrending 
                  ? 'border-[#416CE1]/30 bg-[#416CE1]/5 text-[#416CE1] dark:border-blue-500/30 dark:bg-blue-900/20 dark:text-blue-400' 
                  : ''}`}
              >
                {category.count}
              </Badge>
            </Link>
          ))}
        </div>
        
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full mt-3"
        >
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-4 gap-3">
              {getSortedCategories().slice(8).map((category, index) => (
                <Link 
                  key={index} 
                  to={category.path}
                  className="flex flex-col items-center justify-center transition-all hover:scale-105 relative"
                >
                  <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-2 ${category.isTrending 
                    ? 'bg-gradient-to-r from-[#416CE1] to-[#6B8DE9] shadow-lg dark:from-blue-600 dark:to-blue-400' 
                    : 'bg-[#416CE1]/10 dark:bg-blue-900/30'}`}
                  >
                    <div className={category.isTrending ? 'text-white' : 'text-[#416CE1] dark:text-blue-400'}>
                      {category.icon}
                    </div>
                    {category.isTrending && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 items-center justify-center">
                          <Flame className="h-3 w-3 text-white" />
                        </span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-center mb-1 text-gray-800 dark:text-gray-200">{category.name}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${category.isTrending 
                      ? 'border-[#416CE1]/30 bg-[#416CE1]/5 text-[#416CE1] dark:border-blue-500/30 dark:bg-blue-900/20 dark:text-blue-400' 
                      : ''}`}
                  >
                    {category.count}
                  </Badge>
                </Link>
              ))}
            </div>
          </CollapsibleContent>
          
          <div className="w-full flex justify-center mt-4">
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 border-[#416CE1]/30 text-[#416CE1] hover:bg-[#416CE1]/5 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950"
              >
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
      
      <div className="mb-6 overflow-hidden rounded-lg shadow-md">
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
      
      <Separator className="my-6 bg-[#416CE1]/20 dark:bg-gray-700" />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">ফিচার্ড সার্ভিস</h2>
        
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredServices.map((service) => (
              <Card 
                key={service.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-0 shadow-md dark:bg-gray-800"
                onClick={() => handleServiceClick(service.id)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#416CE1] hover:bg-[#416CE1]/90 text-white dark:bg-blue-600">{service.category}</Badge>
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white/80 backdrop-blur-sm h-8 w-8 rounded-full border-0 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700"
                        onClick={(e) => handleBookmark(e, service.id)}
                      >
                        <Heart className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white/80 backdrop-blur-sm h-8 w-8 rounded-full border-0 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-700"
                        onClick={(e) => handleShare(e, service)}
                      >
                        <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1 text-gray-900 dark:text-white">{service.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 my-1">
                      <MapPin className="h-3 w-3 mr-1 text-[#416CE1] dark:text-blue-400" /> 
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[#416CE1] dark:text-blue-400">{service.price}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1 text-gray-700 dark:text-gray-300">{service.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {viewMode === 'map' && (
          <div className="mb-4">
            <MapView 
              listings={featuredServices.map(service => ({
                id: service.id,
                title: service.title,
                location: service.location,
                latitude: service.latitude,
                longitude: service.longitude
              }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {featuredServices.slice(0, 3).map((service) => (
                <Card 
                  key={service.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-all border-0 shadow-md dark:bg-gray-800"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <div className="flex h-24">
                    <div className="w-1/3">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-2">
                      <h3 className="font-medium text-sm line-clamp-1 text-gray-900 dark:text-white">{service.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{service.location}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-bold text-[#416CE1] dark:text-blue-400">{service.price}</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1 text-gray-700 dark:text-gray-300">{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
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

export default Services;
