import React, { useState } from 'react';
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

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

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
      count: 278 
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
      count: 186 
    },
    { 
      icon: <Utensils className="h-8 w-8" />, 
      name: "খাবার", 
      path: "/services/category/food", 
      count: 312 
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
      count: 215 
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

  const handleServiceClick = (id: number) => {
    navigate(`/appointment-booking`);
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

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">সার্ভিস</h1>
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
                  <SelectItem value="doctor">ডাক্তার</SelectItem>
                  <SelectItem value="repair">রিপেয়ার</SelectItem>
                  <SelectItem value="delivery">ডেলিভারি</SelectItem>
                  <SelectItem value="salon">সেলুন</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">মূল্য সীমা</label>
              <div className="px-2">
                <Slider
                  defaultValue={[500]}
                  max={5000}
                  step={100}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>৳১০০</span>
                  <span>৳২,৫০০</span>
                  <span>৳৫,০০০</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">রেটিং</label>
              <div className="px-2">
                <Slider
                  defaultValue={[4]}
                  max={5}
                  step={0.5}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1 স্টার</span>
                  <span>3 স্টার</span>
                  <span>5 স্টার</span>
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
          {serviceCategories.slice(0, 8).map((category, index) => (
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
          ))}
        </div>
        
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full mt-3"
        >
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-4 gap-3">
              {serviceCategories.slice(8).map((category, index) => (
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
              ))}
            </div>
          </CollapsibleContent>
          
          <div className="w-full flex justify-center mt-4">
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
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
      
      <Separator className="my-6" />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ফিচার্ড সার্ভিস</h2>
        
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredServices.map((service) => (
              <Card 
                key={service.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105"
                onClick={() => handleServiceClick(service.id)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2">{service.category}</Badge>
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                        onClick={(e) => handleBookmark(e, service.id)}
                      >
                        <Heart className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="bg-white h-8 w-8 rounded-full"
                        onClick={(e) => handleShare(e, service)}
                      >
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
                    <div className="flex items-center text-xs text-muted-foreground my-1">
                      <MapPin className="h-3 w-3 mr-1" /> 
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-primary">{service.price}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs ml-1">{service.rating}</span>
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
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
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
                      <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
                      <p className="text-xs text-muted-foreground">{service.location}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm font-bold text-primary">{service.price}</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{service.rating}</span>
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
