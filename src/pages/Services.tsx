
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ServiceCard from '@/components/ServiceCard';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import { Slider } from '@/components/ui/slider';

const Services = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'services' | 'providers'>('services');

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
      provider: 'মাইন্ড কেয়ার',
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

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  const handleProviderClick = (id: string) => {
    navigate(`/providers/${id}`);
  };

  // Function to determine button label based on service ID
  const getButtonLabel = (id: string): string => {
    // Convert string ID to number for modulo operation
    // If the ID is numeric and even, use "হায়ার করুন", otherwise use "বুক করুন"
    const numericId = parseInt(id);
    if (!isNaN(numericId) && numericId % 2 === 0) {
      return "হায়ার করুন";
    }
    return "বুক করুন";
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-3 mt-5 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="সার্ভিস বা প্রফেশনাল খুঁজুন" className="pl-9" />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Options */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <div className="col-span-2">
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
              <SelectItem value="counseling">কাউন্সেলিং</SelectItem>
              <SelectItem value="legal">লিগ্যাল</SelectItem>
            </SelectContent>
          </Select>
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

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">সার্ভিস</h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="space-y-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="space-y-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="space-y-4">
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
