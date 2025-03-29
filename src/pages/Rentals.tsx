
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronUp 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Rentals = () => {
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">রেন্ট</h1>
      
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {rentCategories.slice(0, 4).map((category, index) => (
            <Link 
              key={index} 
              to={category.path}
              className="flex flex-col items-center justify-center"
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
                  className="flex flex-col items-center justify-center"
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
            <Card key={listing.id} className="overflow-hidden">
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
      
      <Separator className="my-6" />
      
      <div className="bg-primary/5 p-4 rounded-lg">
        <h2 className="text-lg font-medium mb-3">আপনার সম্পত্তি রেন্ট দিন</h2>
        <p className="text-sm text-muted-foreground mb-4">আপনার অব্যবহৃত বাসা, অফিস বা যেকোনো সম্পত্তি রেন্ট দিন এবং আয় করুন</p>
        <Button className="w-full">রেন্ট লিস্টিং পোস্ট করুন</Button>
      </div>
    </div>
  );
};

export default Rentals;
