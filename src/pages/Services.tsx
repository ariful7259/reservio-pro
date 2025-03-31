import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import ServiceCard from '@/components/ServiceCard';
import ServiceProviderCard from '@/components/ServiceProviderCard';

const Services = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'services' | 'providers'>('services');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  // Sample services data
  const services = [
    {
      id: '1',
      title: 'ডাক্তার কনসাল্টেশন',
      provider: 'মেডিকেল সেন্টার',
      imageUrl: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.8,
      price: 1500,
      discount: 10,
      duration: '৩০ মিনিট',
      tags: ['মেডিকেল', 'অনলাইন'],
    },
    {
      id: '2',
      title: 'ডেন্টাল চেকআপ',
      provider: 'শাইন ডেন্টাল',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.6,
      price: 2000,
      duration: '৪৫ মিনিট',
      tags: ['ডেন্টাল', 'চেকআপ'],
    },
    {
      id: '3',
      title: 'মেন্টাল হেলথ কাউন্সেলিং',
      provider: 'মাইন্দ কেয়ার',
      imageUrl: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.9,
      price: 1800,
      discount: 15,
      duration: '৬০ মিনিট',
      tags: ['কাউন্সেলিং', 'অনলাইন'],
    },
    {
      id: '4',
      title: 'ফিজিওথেরাপি সেশন',
      provider: 'হেলদি লাইফ ক্লিনিক',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.7,
      price: 2500,
      duration: '৬০ মিনিট',
      tags: ['ফিজিওথেরাপি'],
    },
    {
      id: '5',
      title: 'নিউট্রিশন কনসাল্টেশন',
      provider: 'হেলদি ডাইট',
      imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.5,
      price: 1200,
      discount: 8,
      duration: '৪৫ মিনিট',
      tags: ['নিউট্রিশন', 'ডায়েট'],
    },
  ];

  // Sample providers data
  const providers = [
    {
      id: '1',
      name: 'ডাঃ রাহিম আহমেদ',
      specialty: 'কার্ডিওলজিস্ট',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 4.8,
      reviewCount: 127,
      availability: 'সকাল ১০:০০ - দুপুর ০২:০০',
    },
    {
      id: '2',
      name: 'ডাঃ ফারহানা খাতুন',
      specialty: 'গাইনোকোলজিস্ট',
      imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 4.9,
      reviewCount: 215,
      availability: 'দুপুর ০২:০০ - সন্ধ্যা ০৬:০০',
    },
    {
      id: '3',
      name: 'ডাঃ মাসুদ রানা',
      specialty: 'নিউরোলজিস্ট',
      imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 4.7,
      reviewCount: 98,
      availability: 'সকাল ০৯:০০ - দুপুর ০১:০০',
    },
    {
      id: '4',
      name: 'ডাঃ জাহিদুল ইসলাম',
      specialty: 'ডেন্টিস্ট',
      imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      rating: 4.6,
      reviewCount: 156,
      availability: 'দুপুর ০৩:০০ - রাত ০৮:০০',
    },
  ];
  
  // Service categories
  const serviceCategories = [
    { icon: <img src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="মেডিকেল" />, name: "মেডিকেল", path: "/services/medical", count: 245 },
    { icon: <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="ডেন্টাল" />, name: "ডেন্টাল", path: "/services/dental", count: 123 },
    { icon: <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="মেন্টাল" />, name: "মেন্টাল হেলথ", path: "/services/mental", count: 78 },
    { icon: <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="ফিজিও" />, name: "ফিজিওথেরাপি", path: "/services/physio", count: 56 },
    { icon: <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="নিউট্রিশন" />, name: "নিউট্রিশন", path: "/services/nutrition", count: 42 },
    { icon: <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="লিগ্যাল" />, name: "লিগ্যাল", path: "/services/legal", count: 35 },
    { icon: <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="ইডুকেশন" />, name: "ইডুকেশন", path: "/services/education", count: 89 },
    { icon: <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" className="h-8 w-8 rounded-full object-cover" alt="অন্যান্য" />, name: "অন্যান্য", path: "/services/others", count: 67 },
  ];

  // Featured service listings
  const featuredListings = [
    {
      id: '1',
      title: 'ডাক্তার কনসাল্টেশন',
      provider: 'মেডিকেল সেন্টার',
      location: 'গুলশান, ঢাকা',
      image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: '৳১,৫০০',
      rating: 4.8,
    },
    {
      id: '2',
      title: 'ডেন্টাল চেকআপ',
      provider: 'শাইন ডেন্টাল',
      location: 'ধানমন্ডি, ঢাকা',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: '৳২,০০০',
      rating: 4.6,
    },
    {
      id: '3',
      title: 'মেন্টাল হেলথ কাউন্সেলিং',
      provider: 'মাইন্দ কেয়ার',
      location: 'বনানী, ঢাকা',
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: '৳১,৮০০',
      rating: 4.9,
    },
    {
      id: '4',
      title: 'ফিজিওথেরাপি সেশন',
      provider: 'হেলদি লাইফ ক্লিনিক',
      location: 'উত্তরা, ঢাকা',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      price: '৳২,৫০০',
      rating: 4.7,
    },
  ];

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  const handleProviderClick = (id: string) => {
    navigate(`/providers/${id}`);
  };

  // Function to determine button label based on service ID
  const getButtonLabel = (id: string): string => {
    // Convert string ID to number for modulo operation
    const numericId = parseInt(id);
    // If the ID is numeric and even, use "হায়ার করুন", otherwise use "বুক করুন"
    if (!isNaN(numericId) && numericId % 2 === 0) {
      return "হায়ার করুন";
    }
    return "বুক করুন";
  };
  
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with title and filter button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">সার্ভিস</h1>
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
                  <SelectItem value="medical">মেডিকেল</SelectItem>
                  <SelectItem value="dental">ডেন্টাল</SelectItem>
                  <SelectItem value="mental">মেন্টাল হেলথ</SelectItem>
                  <SelectItem value="physio">ফিজিওথেরাপি</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">মূল্য সীমা</label>
              <div className="px-2">
                <Slider
                  defaultValue={[1500]}
                  max={5000}
                  step={100}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>৳৫০০</span>
                  <span>৳২,৫০০</span>
                  <span>৳৫,০০০</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">রেটিং</label>
              <div className="px-2">
                <Slider
                  defaultValue={[4.5]}
                  max={5}
                  step={0.5}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>১</span>
                  <span>৩</span>
                  <span>৫</span>
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
      
      {/* Service Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {serviceCategories.slice(0, 4).map((category, index) => (
            <a 
              key={index} 
              href={category.path}
              className="flex flex-col items-center justify-center transition-all hover:scale-105"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-xs text-center mb-1">{category.name}</span>
              <Badge variant="outline" className="text-xs">{category.count}</Badge>
            </a>
          ))}
        </div>
        
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="w-full mt-3"
        >
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-4 gap-3">
              {serviceCategories.slice(4).map((category, index) => (
                <a 
                  key={index} 
                  href={category.path}
                  className="flex flex-col items-center justify-center transition-all hover:scale-105"
                >
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    {category.icon}
                  </div>
                  <span className="text-xs text-center mb-1">{category.name}</span>
                  <Badge variant="outline" className="text-xs">{category.count}</Badge>
                </a>
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
      
      {/* Featured Listings */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ফিচার্ড লিস্টিং</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredListings.map((listing) => (
            <Card 
              key={listing.id} 
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
              onClick={() => navigate(`/services/${listing.id}`)}
            >
              <div className="relative aspect-square">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm line-clamp-1">{listing.title}</h3>
                <p className="text-xs text-muted-foreground mb-1">{listing.provider}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-bold text-primary">{listing.price}</p>
                  <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{listing.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex items-center justify-end mb-4">
        <div className="flex gap-2">
          <Button 
            variant={view === 'services' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setView('services')}
          >
            সার্ভিস
          </Button>
          <Button 
            variant={view === 'providers' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setView('providers')}
          >
            প্রফেশনাল
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="mb-4 w-full bg-secondary/50">
          <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
          <TabsTrigger value="medical" className="flex-1">মেডিকেল</TabsTrigger>
          <TabsTrigger value="legal" className="flex-1">লিগ্যাল</TabsTrigger>
          <TabsTrigger value="others" className="flex-1">অন্যান্য</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {view === 'services' ? (
            <div className="grid grid-cols-2 gap-4">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={handleServiceClick}
                  buttonLabel={getButtonLabel(service.id)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providers.map(provider => (
                <ServiceProviderCard
                  key={provider.id}
                  {...provider}
                  onClick={handleProviderClick}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="medical" className="mt-0">
          {view === 'services' ? (
            <div className="grid grid-cols-2 gap-4">
              {services.slice(0, 3).map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={handleServiceClick}
                  buttonLabel={getButtonLabel(service.id)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providers.slice(0, 3).map(provider => (
                <ServiceProviderCard
                  key={provider.id}
                  {...provider}
                  onClick={handleProviderClick}
                />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="legal" className="mt-0">
          <div className="text-center py-8 text-muted-foreground">
            কোন সার্ভিস এখনো উপলব্ধ নেই
          </div>
        </TabsContent>
        
        <TabsContent value="others" className="mt-0">
          {view === 'services' ? (
            <div className="grid grid-cols-2 gap-4">
              {services.slice(3, 5).map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={handleServiceClick}
                  buttonLabel={getButtonLabel(service.id)}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providers.slice(3, 4).map(provider => (
                <ServiceProviderCard
                  key={provider.id}
                  {...provider}
                  onClick={handleProviderClick}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Services;
