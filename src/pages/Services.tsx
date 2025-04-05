
import React, { useState, useEffect } from 'react';
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
  Locate,
  List,
  CalendarDays
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
import { useApp } from '@/context/AppContext';
import { serviceCategories } from '@/utils/categoryData';
import CategoryCard from '@/components/categories/CategoryCard';
import SubCategoryList from '@/components/categories/SubCategoryList';

const Services = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'list'>('grid');
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock services data
  const services = [
    {
      id: '1',
      title: language === 'bn' ? 'ডাক্তার কনসাল্টেশন' : 'Doctor Consultation',
      provider: language === 'bn' ? 'ড. আহমেদ আলী' : 'Dr. Ahmed Ali',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.9,
      price: 1500,
      discount: 10,
      duration: language === 'bn' ? '৩০ মিনিট' : '30 minutes',
      tags: [language === 'bn' ? 'মেডিসিন' : 'Medicine', language === 'bn' ? 'হার্ট' : 'Heart'],
      category: 'healthcare',
      latitude: 23.7815,
      longitude: 90.4137
    },
    {
      id: '2',
      title: language === 'bn' ? 'ডেন্টাল চেকআপ' : 'Dental Checkup',
      provider: language === 'bn' ? 'ড. নাজনীন খান' : 'Dr. Naznin Khan',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.8,
      price: 2000,
      discount: 5,
      duration: language === 'bn' ? '৪৫ মিনিট' : '45 minutes',
      tags: [language === 'bn' ? 'দাঁত' : 'Dental', language === 'bn' ? 'চেকআপ' : 'Checkup'],
      category: 'healthcare',
      latitude: 23.7965,
      longitude: 90.3967
    },
    {
      id: '3',
      title: language === 'bn' ? 'হোম টিউটর' : 'Home Tutor',
      provider: language === 'bn' ? 'মোঃ রাকিব' : 'Md. Rakib',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.7,
      price: 2500,
      duration: language === 'bn' ? '১ ঘন্টা' : '1 hour',
      tags: [language === 'bn' ? 'গণিত' : 'Math', language === 'bn' ? 'ফিজিক্স' : 'Physics'],
      category: 'education',
      latitude: 23.8115,
      longitude: 90.3598
    },
    {
      id: '4',
      title: language === 'bn' ? 'প্রফেশনাল ফটোগ্রাফি' : 'Professional Photography',
      provider: language === 'bn' ? 'তানভির ফটোগ্রাফি' : 'Tanvir Photography',
      imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      rating: 4.8,
      price: 5000,
      duration: language === 'bn' ? '২ ঘন্টা' : '2 hours',
      tags: [language === 'bn' ? 'ইভেন্ট' : 'Event', language === 'bn' ? 'পোর্ট্রেট' : 'Portrait'],
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
    if (selectedCategory === id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(id);
      navigate(`/services/category/${id}`);
    }
  };

  const displayedCategories = showMoreCategories 
    ? serviceCategories 
    : serviceCategories.slice(0, 4);
    
  const selectedCategoryData = selectedCategory 
    ? serviceCategories.find(cat => cat.id === selectedCategory) 
    : null;

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with search and filter */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{language === 'bn' ? 'সার্ভিসেস' : 'Services'}</h1>
        <div className="flex gap-2">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'map' | 'list')} className="w-[240px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="grid" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" /> {language === 'bn' ? 'গ্রিড' : 'Grid'}
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-1">
                <List className="h-4 w-4" /> {language === 'bn' ? 'লিস্ট' : 'List'}
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapIcon className="h-4 w-4" /> {language === 'bn' ? 'ম্যাপ' : 'Map'}
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
          <Input placeholder={language === 'bn' ? 'সার্ভিস খুঁজুন' : 'Search services'} className="pl-9 pr-16" />
          <Button 
            variant="default" 
            size="sm" 
            className="absolute right-1 top-1/2 -translate-y-1/2"
          >
            {language === 'bn' ? 'খুঁজুন' : 'Search'}
          </Button>
        </div>
      </div>

      {/* Filter panel - conditionally shown */}
      {filterVisible && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">{language === 'bn' ? 'ক্যাটেগরি' : 'Category'}</h3>
              <div className="grid grid-cols-2 gap-2">
                {serviceCategories.slice(0, 4).map(category => (
                  <Button 
                    key={category.id}
                    variant="outline" 
                    size="sm" 
                    className="justify-start"
                  >
                    <Badge variant="outline" className="mr-2">{category.icon}</Badge>
                    {language === 'bn' ? category.nameBN : category.nameEN}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">{language === 'bn' ? 'মূল্য সীমা' : 'Price Range'}</h3>
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
              <h3 className="text-sm font-medium mb-2">{language === 'bn' ? 'রেটিং' : 'Rating'}</h3>
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
                    <span className="ml-1">{language === 'bn' ? '& উপরে' : '& up'}</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">{language === 'bn' ? 'লোকেশন' : 'Location'}</h3>
              <Select defaultValue="dhaka">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={language === 'bn' ? 'এলাকা নির্বাচন করুন' : 'Select area'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">{language === 'bn' ? 'ঢাকা' : 'Dhaka'}</SelectItem>
                  <SelectItem value="chittagong">{language === 'bn' ? 'চট্টগ্রাম' : 'Chittagong'}</SelectItem>
                  <SelectItem value="khulna">{language === 'bn' ? 'খুলনা' : 'Khulna'}</SelectItem>
                  <SelectItem value="rajshahi">{language === 'bn' ? 'রাজশাহী' : 'Rajshahi'}</SelectItem>
                  <SelectItem value="sylhet">{language === 'bn' ? 'সিলেট' : 'Sylhet'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">{language === 'bn' ? 'দূরত্ব' : 'Distance'}</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[5]}
                  max={20}
                  step={1}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>1 {language === 'bn' ? 'কিমি' : 'km'}</span>
                  <span>10 {language === 'bn' ? 'কিমি' : 'km'}</span>
                  <span>20 {language === 'bn' ? 'কিমি' : 'km'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">{language === 'bn' ? 'সময়' : 'Time'}</h3>
              <Select defaultValue="anytime">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={language === 'bn' ? 'সময় নির্বাচন করুন' : 'Select time'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anytime">{language === 'bn' ? 'যেকোনো সময়' : 'Anytime'}</SelectItem>
                  <SelectItem value="morning">{language === 'bn' ? 'সকাল (৯টা - ১২টা)' : 'Morning (9AM - 12PM)'}</SelectItem>
                  <SelectItem value="afternoon">{language === 'bn' ? 'দুপুর (১২টা - ৪টা)' : 'Afternoon (12PM - 4PM)'}</SelectItem>
                  <SelectItem value="evening">{language === 'bn' ? 'সন্ধ্যা (৪টা - ৮টা)' : 'Evening (4PM - 8PM)'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Recurring options */}
            <div>
              <h3 className="text-sm font-medium mb-2">
                {language === 'bn' ? 'রিকারিং সার্ভিস' : 'Recurring Service'}
              </h3>
              <Select defaultValue="none">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={language === 'bn' ? 'রিকারিং অপশন' : 'Recurring option'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{language === 'bn' ? 'একবার' : 'One time'}</SelectItem>
                  <SelectItem value="daily">{language === 'bn' ? 'দৈনিক' : 'Daily'}</SelectItem>
                  <SelectItem value="weekly">{language === 'bn' ? 'সাপ্তাহিক' : 'Weekly'}</SelectItem>
                  <SelectItem value="monthly">{language === 'bn' ? 'মাসিক' : 'Monthly'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="outline" onClick={toggleFilter}>{language === 'bn' ? 'বাতিল' : 'Cancel'}</Button>
            <Button>{language === 'bn' ? 'ফিল্টার করুন' : 'Apply Filters'}</Button>
          </div>
        </div>
      )}
      
      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">
          {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {displayedCategories.slice(0, 4).map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.nameEN}
              nameBN={category.nameBN}
              icon={category.icon}
              count={category.count}
              slug={category.slug}
              type="service"
              subCategories={category.subCategories}
              onClick={handleCategoryClick}
            />
          ))}
        </div>

        {showMoreCategories && (
          <div className="grid grid-cols-4 gap-3 mt-3">
            {serviceCategories.slice(4).map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.nameEN}
                nameBN={category.nameBN}
                icon={category.icon}
                count={category.count}
                slug={category.slug}
                type="service"
                subCategories={category.subCategories}
                onClick={handleCategoryClick}
              />
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
                <ChevronDown className="h-4 w-4 rotate-180" />
                {language === 'bn' ? 'কম দেখুন' : 'Show less'}
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                {language === 'bn' ? 'আরও দেখুন' : 'Show more'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Show subcategories if a category is selected */}
      {selectedCategoryData && (
        <SubCategoryList
          categoryId={selectedCategoryData.id}
          subCategories={selectedCategoryData.subCategories}
          type="service"
        />
      )}

      <Separator className="my-6" />

      {/* Featured Services */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {language === 'bn' ? 'ফিচার্ড সার্ভিস' : 'Featured Services'}
          </h2>
          <Button variant="outline" size="sm" className="gap-1" onClick={() => navigate('/appointment-booking')}>
            <CalendarDays className="h-4 w-4" />
            {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}
          </Button>
        </div>
        
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

        {viewMode === 'list' && (
          <div className="space-y-4">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-md cursor-pointer transition-all" 
                onClick={() => handleServiceClick(service.id)}>
                <div className="flex">
                  <div className="w-1/4 h-40">
                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="w-3/4 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{service.title}</h3>
                        <p className="text-muted-foreground">{service.provider}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-100 px-2 py-1 rounded text-amber-700">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span className="text-xs font-medium">{service.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {language === 'bn' ? 'উপলব্ধ' : 'Available'}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1">
                        <span className="text-primary font-semibold">
                          ৳{service.discount ? 
                            (service.price - (service.price * service.discount / 100)).toFixed(0) : 
                            service.price.toFixed(0)}
                        </span>
                        {service.discount && (
                          <span className="text-muted-foreground text-sm line-through">
                            ৳{service.price.toFixed(0)}
                          </span>
                        )}
                      </div>
                      <Button variant="default" size="sm">
                        {language === 'bn' ? 'বুক করুন' : 'Book Now'}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
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
                      <p className="text-sm font-bold text-primary">
                        ৳{service.discount ? 
                          (service.price - (service.price * service.discount / 100)).toFixed(0) : 
                          service.price.toFixed(0)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Service benefits */}
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-6 text-center">
          {language === 'bn' ? 'আমাদের সার্ভিস সুবিধাসমূহ' : 'Our Service Benefits'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-10 w-10 text-green-500 mb-2" />
              <h3 className="font-medium">
                {language === 'bn' ? 'রিকারিং সার্ভিস' : 'Recurring Service'}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {language === 'bn' 
                  ? 'নিয়মিত সার্ভিসের জন্য স্বয়ংক্রিয় অ্যাপয়েন্টমেন্ট বুকিং' 
                  : 'Automated appointment booking for regular services'}
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-10 w-10 text-blue-500 mb-2" />
              <h3 className="font-medium">
                {language === 'bn' ? 'ক্যালেন্ডার সিঙ্ক' : 'Calendar Sync'}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {language === 'bn'
                  ? 'Google/Outlook ক্যালেন্ডারের সাথে সিঙ্ক করার সুবিধা' 
                  : 'Sync with your Google/Outlook calendar'}
              </p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-10 w-10 text-purple-500 mb-2" />
              <h3 className="font-medium">
                {language === 'bn' ? 'রিমাইন্ডার' : 'Reminders'}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {language === 'bn'
                  ? 'SMS/ইমেইল রিমাইন্ডার এবং নোটিফিকেশন' 
                  : 'SMS/Email reminders and notifications'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;
