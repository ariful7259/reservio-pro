
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  Star,
  LayoutGrid,
  Map as MapIcon,
  Heart,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle,
  Locate
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import ServiceCard from '@/components/ServiceCard';
import MapView from '@/components/MapView';

const Services = () => {
  const navigate = useNavigate();
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  // Categories
  const categories = [
    { id: 'healthcare', title: 'হেলথকেয়ার', icon: '🏥', count: 156 },
    { id: 'education', title: 'শিক্ষা', icon: '🎓', count: 142 },
    { id: 'household', title: 'গৃহস্থালি', icon: '🏠', count: 128 },
    { id: 'beauty', title: 'বিউটি', icon: '💇‍♀️', count: 98 },
    { id: 'professional', title: 'প্রফেশনাল', icon: '💼', count: 85 },
    { id: 'tech', title: 'টেকনিক্যাল', icon: '💻', count: 74 },
    { id: 'events', title: 'ইভেন্ট', icon: '🎉', count: 63 },
    { id: 'legal', title: 'লিগ্যাল', icon: '⚖️', count: 52 },
  ];

  // Mock services data
  const services = [
    {
      id: '1',
      title: 'ডাক্তার কনসাল্টেশন',
      provider: 'ড. আহমেদ আলী',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.9,
      price: 1500,
      discount: 10,
      duration: '৩০ মিনিট',
      tags: ['মেডিসিন', 'হার্ট'],
      category: 'healthcare',
      latitude: 23.7815,
      longitude: 90.4137
    },
    {
      id: '2',
      title: 'ডেন্টাল চেকআপ',
      provider: 'ড. নাজনীন খান',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.8,
      price: 2000,
      discount: 5,
      duration: '৪৫ মিনিট',
      tags: ['দাঁত', 'চেকআপ'],
      category: 'healthcare',
      latitude: 23.7965,
      longitude: 90.3967
    },
    {
      id: '3',
      title: 'হোম টিউটর',
      provider: 'মোঃ রাকিব',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.7,
      price: 2500,
      duration: '১ ঘন্টা',
      tags: ['গণিত', 'ফিজিক্স'],
      category: 'education',
      latitude: 23.8115,
      longitude: 90.3598
    },
    {
      id: '4',
      title: 'প্রফেশনাল ফটোগ্রাফি',
      provider: 'তানভির ফটোগ্রাফি',
      imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.8,
      price: 5000,
      duration: '২ ঘন্টা',
      tags: ['ইভেন্ট', 'পোর্ট্রেট'],
      category: 'professional',
      latitude: 23.7545,
      longitude: 90.3751
    },
  ];

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  const handleCategoryClick = (id: string) => {
    navigate(`/services/category/${id}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with search and filter */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">সার্ভিসেস</h1>
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

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="সার্ভিস খুঁজুন" className="pl-9 pr-16" />
          <Button 
            variant="default" 
            size="sm" 
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            খুঁজুন
          </Button>
        </div>
      </div>

      {/* Filter panel - conditionally shown */}
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">ক্যাটেগরি</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Badge variant="outline" className="mr-2">🏥</Badge> হেলথকেয়ার
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Badge variant="outline" className="mr-2">🎓</Badge> শিক্ষা
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Badge variant="outline" className="mr-2">🏠</Badge> গৃহস্থালি
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Badge variant="outline" className="mr-2">💇‍♀️</Badge> বিউটি
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">মূল্য সীমা</h3>
              <Slider
                defaultValue={[1000, 5000]}
                max={10000}
                step={500}
              />
              <div className="flex justify-between mt-2">
                <div className="text-sm">৳500</div>
                <div className="text-sm">৳10,000</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">রেটিং</h3>
              <div className="space-y-1">
                <div className="flex items-center">
                  <input type="checkbox" id="rating5" className="mr-2" />
                  <label htmlFor="rating5" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="rating4" className="mr-2" />
                  <label htmlFor="rating4" className="text-sm flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 text-gray-300" />
                    <span className="ml-1">& উপরে</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">লোকেশন</h3>
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
            
            <div>
              <h3 className="text-sm font-medium mb-2">দূরত্ব</h3>
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
            
            <div>
              <h3 className="text-sm font-medium mb-2">সময়</h3>
              <Select defaultValue="anytime">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="সময় নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">যেকোনো সময়</SelectItem>
                  <SelectItem value="morning">সকাল (৯টা - ১২টা)</SelectItem>
                  <SelectItem value="afternoon">দুপুর (১২টা - ৪টা)</SelectItem>
                  <SelectItem value="evening">সন্ধ্যা (৪টা - ৮টা)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" onClick={toggleFilter}>বাতিল</Button>
            <Button>ফিল্টার করুন</Button>
          </div>
        </div>
      )}
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.slice(0, 4).map((category) => (
            <div 
              key={category.id}
              className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <span className="text-xs text-center font-medium">{category.title}</span>
              <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
            </div>
          ))}
        </div>

        {showMoreCategories && (
          <div className="grid grid-cols-4 gap-3 mt-3">
            {categories.slice(4).map((category) => (
              <div 
                key={category.id}
                className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <span className="text-xs text-center font-medium">{category.title}</span>
                <Badge variant="outline" className="mt-2 text-xs">{category.count}</Badge>
              </div>
            ))}
          </div>
        )}

        <div className="w-full flex justify-center mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowMoreCategories(!showMoreCategories)}
          >
            {showMoreCategories ? (
              <>
                <ChevronDown className="h-4 w-4 rotate-180" /> কম দেখুন
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" /> আরও দেখুন
              </>
            )}
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Featured Services */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">ফিচার্ড সার্ভিস</h2>
        
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                provider={service.provider}
                imageUrl={service.imageUrl}
                rating={service.rating}
                price={service.price}
                discount={service.discount}
                duration={service.duration}
                tags={service.tags}
                onClick={handleServiceClick}
              />
            ))}
          </div>
        )}
        
        {viewMode === 'map' && (
          <div className="mb-4">
            <MapView 
              listings={services.map(service => ({
                id: service.id,
                title: service.title,
                location: service.provider,
                latitude: service.latitude,
                longitude: service.longitude
              }))}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {services.slice(0, 3).map((service) => (
                <Card 
                  key={service.id} 
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <div className="flex h-24">
                    <div className="w-1/3">
                      <img 
                        src={service.imageUrl} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-2/3 p-2">
                      <h3 className="font-medium text-sm line-clamp-1">{service.title}</h3>
                      <p className="text-xs text-muted-foreground">{service.provider}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs ml-1">{service.rating}</span>
                      </div>
                      <p className="text-sm font-bold text-primary">{service.price}৳</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
