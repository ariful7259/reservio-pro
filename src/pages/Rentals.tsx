
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Home, 
  Truck, 
  Briefcase, 
  PaintBucket, 
  Wrench,
  ChevronDown,
  ChevronUp,
  Filter,
  MapPin,
  UserPlus,
  FileText,
  CreditCard,
  Clock,
  Map,
  Bike,
  ShoppingBag,
  Check
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Rentals = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  // Banner images for Rentals
  const bannerImages = [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=1000&auto=format&fit=crop",
  ];

  const rentCategories = [
    { icon: <Building className="h-8 w-8" />, name: "অ্যাপার্টমেন্ট", path: "/rent/apartment", count: 324 },
    { icon: <Home className="h-8 w-8" />, name: "বাসা", path: "/rent/house", count: 156 },
    { icon: <Truck className="h-8 w-8" />, name: "গাড়ি", path: "/rent/car", count: 89 },
    { icon: <Briefcase className="h-8 w-8" />, name: "অফিস স্পেস", path: "/rent/office", count: 42 },
    { icon: <PaintBucket className="h-8 w-8" />, name: "ইভেন্ট স্পেস", path: "/rent/event-space", count: 27 },
    { icon: <Wrench className="h-8 w-8" />, name: "ইকুইপমেন্ট", path: "/rent/equipment", count: 53 },
    { icon: <Building className="h-8 w-8" />, name: "দোকান", path: "/rent/shop", count: 31 },
    { icon: <Home className="h-8 w-8" />, name: "অন্যান্য", path: "/rent/others", count: 18 },
  ];

  const featuredListings = [
    {
      id: 1,
      title: "৩ বেডরুম অ্যাপার্টমেন্ট",
      location: "গুলশান, ঢাকা",
      price: "৳২৫,০০০/মাস",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
      category: "apartment"
    },
    {
      id: 2,
      title: "অফিস স্পেস",
      location: "বনানী, ঢাকা",
      price: "৳৫০,০০০/মাস",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1000&auto=format&fit=crop",
      category: "office"
    },
    {
      id: 3,
      title: "টয়োটা কোরোলা",
      location: "মিরপুর, ঢাকা",
      price: "৳৫,০০০/দিন",
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1000&auto=format&fit=crop",
      category: "car"
    },
    {
      id: 4,
      title: "ডিএসএলআর ক্যামেরা",
      location: "ধানমন্ডি, ঢাকা",
      price: "৳১,০০০/দিন",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop",
      category: "equipment"
    },
  ];

  // New rent features
  const rentFeatures = [
    { 
      id: 'home', 
      title: 'Find a Home', 
      banglaTitle: 'বাসা খোঁজুন', 
      description: 'বাসা খোঁজার সার্চ ফিচার',
      icon: <Home className="h-16 w-16 text-primary" />,
      path: '/rent/find-home'
    },
    { 
      id: 'roommates', 
      title: 'Roommates', 
      banglaTitle: 'রুমমেট', 
      description: 'রুমমেট খোঁজার অপশন',
      icon: <UserPlus className="h-16 w-16 text-blue-500" />,
      path: '/rent/roommates'
    },
    { 
      id: 'mess', 
      title: 'Mess Seats', 
      banglaTitle: 'মেস সিট', 
      description: 'মেসের খালি সিটের তালিকা',
      icon: <Briefcase className="h-16 w-16 text-green-500" />,
      path: '/rent/mess-seats'
    },
    { 
      id: 'lease', 
      title: 'Lease Negotiation', 
      banglaTitle: 'লিজ নেগোশিয়েশন', 
      description: 'লিজ দর-কষাকষির সহায়তা',
      icon: <FileText className="h-16 w-16 text-amber-500" />,
      path: '/rent/lease'
    },
    { 
      id: 'property', 
      title: 'Property Listing', 
      banglaTitle: 'প্রপার্টি লিস্টিং', 
      description: 'সম্পত্তি মালিকদের জন্য লিস্টিং সুবিধা',
      icon: <Building className="h-16 w-16 text-red-500" />,
      path: '/rent/listing'
    },
    { 
      id: 'tenant', 
      title: 'Tenant Management', 
      banglaTitle: 'টেনেন্ট ম্যানেজমেন্ট', 
      description: 'টেনেন্টদের তথ্য সংরক্ষণ ও পরিচালনা',
      icon: <User className="h-16 w-16 text-purple-500" />,
      path: '/rent/tenant'
    },
    { 
      id: 'payment', 
      title: 'Rent Collection', 
      banglaTitle: 'রেন্ট কালেকশন', 
      description: 'অনলাইন ভাড়া সংগ্রহ এবং পেমেন্ট ট্র্যাকিং',
      icon: <CreditCard className="h-16 w-16 text-pink-500" />,
      path: '/rent/payment'
    },
    { 
      id: 'map', 
      title: 'Map View', 
      banglaTitle: 'ম্যাপ ভিউ', 
      description: 'কাছাকাছি থাকা ভাড়ার সম্পত্তি ম্যাপে দেখা',
      icon: <Map className="h-16 w-16 text-cyan-500" />,
      path: '/rent/map'
    },
    { 
      id: 'browse', 
      title: 'Browse Rental Items', 
      banglaTitle: 'রেন্টাল আইটেম ব্রাউজ', 
      description: 'বাইসাইকেল, বই, ইলেকট্রনিক্স, আসবাবপত্র ইত্যাদি ভাড়া নেওয়ার সুবিধা',
      icon: <Bike className="h-16 w-16 text-indigo-500" />,
      path: '/rent/browse'
    },
    { 
      id: 'post', 
      title: 'Post Items for Rent', 
      banglaTitle: 'রেন্টের জন্য আইটেম পোস্ট', 
      description: 'ব্যবহারকারীরা নিজেদের জিনিস ভাড়ার জন্য পোস্ট করতে পারবে',
      icon: <ShoppingBag className="h-16 w-16 text-gray-500" />,
      path: '/rent/post'
    },
    { 
      id: 'category', 
      title: 'Category Search', 
      banglaTitle: 'ক্যাটাগরি সার্চ', 
      description: 'ক্যাটাগরি অনুযায়ী ভাড়া আইটেম ব্রাউজ করা',
      icon: <Filter className="h-16 w-16 text-orange-500" />,
      path: '/rent/category'
    },
    { 
      id: 'agreement', 
      title: 'Rental Agreements', 
      banglaTitle: 'রেন্টাল এগ্রিমেন্ট', 
      description: 'ভাড়ার চুক্তি তৈরির সুবিধা',
      icon: <Check className="h-16 w-16 text-teal-500" />,
      path: '/rent/agreement'
    },
    { 
      id: 'active', 
      title: 'Active Rentals', 
      banglaTitle: 'অ্যাকটিভ রেন্টাল', 
      description: 'বর্তমানে ভাড়া নেওয়া বা দেওয়া আইটেমগুলোর তালিকা',
      icon: <Clock className="h-16 w-16 text-rose-500" />,
      path: '/rent/active'
    },
  ];

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleListingClick = (id: number) => {
    navigate(`/rent-details/${id}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">রেন্ট</h1>
        <Button variant="outline" size="icon" onClick={toggleFilter}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Filter options - conditionally shown */}
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
                <Slider
                  defaultValue={[25000]}
                  max={100000}
                  step={1000}
                />
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
                <Slider
                  defaultValue={[5]}
                  max={20}
                  step={1}
                />
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
          {rentCategories.slice(0, 4).map((category, index) => (
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
              {rentCategories.slice(4).map((category, index) => (
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
      
      <Separator className="my-6" />
      
      {/* Featured Listings */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ফিচার্ড লিস্টিং</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredListings.map((listing) => (
            <Card 
              key={listing.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105"
              onClick={() => handleListingClick(listing.id)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img 
                    src={listing.image} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2">{listing.category}</Badge>
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
      </div>
      
      {/* Rent Features Section */}
      <div className="mb-10">
        <h2 className="text-lg font-medium mb-4">রেন্ট ফিচারস</h2>
        
        <Tabs onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-transparent gap-2">
            {rentFeatures.slice(0, 8).map(feature => (
              <TabsTrigger 
                key={feature.id} 
                value={feature.id}
                className="border bg-white hover:bg-gray-50 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {feature.banglaTitle}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {rentFeatures.map(feature => (
            <TabsContent key={feature.id} value={feature.id} className="focus-visible:outline-none focus-visible:ring-0">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="p-6 bg-white rounded-full shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">{feature.banglaTitle}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <Button onClick={() => navigate(feature.path)}>
                      এখনই ব্যবহার করুন
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
          {rentFeatures.slice(8).map(feature => (
            <Card 
              key={feature.id} 
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate(feature.path)}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-gray-100 mb-2">
                  {React.cloneElement(feature.icon, { className: 'h-8 w-8' })}
                </div>
                <h3 className="font-medium text-sm">{feature.banglaTitle}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <Button variant="outline" onClick={() => navigate('/rent-anything')}>আরও দেখুন</Button>
      </div>
    </div>
  );
};

export default Rentals;
