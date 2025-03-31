
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
  MapPin
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const Rentals = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

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
      
      <Separator className="my-6" />
      
      <div>
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
        
        <div className="mt-4 text-center">
          <Button variant="outline">আরও দেখুন</Button>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
