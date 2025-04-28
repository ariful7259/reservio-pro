
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  MapPin,
  Building,
  Home,
  Filter,
  ArrowRight,
  Clock,
  Star,
  Heart,
  Share2,
  Bed,
  Bath,
  Square,
} from 'lucide-react';

const Rentals = () => {
  const navigate = useNavigate();
  const [filterVisible, setFilterVisible] = useState(false);

  const propertyTypes = [
    { icon: <Building className="h-6 w-6" />, label: "অ্যাপার্টমেন্ট" },
    { icon: <Home className="h-6 w-6" />, label: "বাড়ি" },
    { icon: <Building className="h-6 w-6" />, label: "অফিস স্পেস" },
    { icon: <Building className="h-6 w-6" />, label: "দোকান" },
  ];

  const featuredProperties = [
    {
      id: 1,
      title: "মডার্ন ৩ বেড অ্যাপার্টমেন্ট",
      location: "গুলশান ২, ঢাকা",
      price: "৳৩৫,০০০",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      beds: 3,
      baths: 2,
      area: 1200,
      rating: 4.5,
      available: true
    },
    {
      id: 2,
      title: "লাক্সারি ৪ বেড ডুপ্লেক্স",
      location: "বনানী, ঢাকা",
      price: "৳৫৫,০০০",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      beds: 4,
      baths: 3,
      area: 2200,
      rating: 4.8,
      available: true
    },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="bg-primary text-white py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            আপনার পছন্দের বাড়ি খুঁজুন
          </h1>
          <p className="text-lg mb-6">
            ভাড়া নিন সরাসরি মালিকের কাছ থেকে, দালাল ছাড়াই
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" />
                <Input 
                  placeholder="লোকেশন খুঁজুন" 
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setFilterVisible(!filterVisible)}>
                  <Filter className="h-4 w-4 mr-2" />
                  ফিল্টার
                </Button>
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  খুঁজুন
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 mt-8">
        {/* Property Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {propertyTypes.map((type, index) => (
            <Card 
              key={index}
              className="p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/property-type/${index}`)}
            >
              <div className="p-3 rounded-full bg-primary/10 mb-2">
                {type.icon}
              </div>
              <span className="text-sm font-medium">{type.label}</span>
            </Card>
          ))}
        </div>

        {/* Featured Properties */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">জনপ্রিয় প্রপার্টি</h2>
            <Button variant="ghost" className="text-primary" onClick={() => navigate('/featured')}>
              সব দেখুন <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProperties.map((property) => (
              <Card 
                key={property.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="relative aspect-video">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon"
                      className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {property.available && (
                    <Badge className="absolute top-4 left-4 bg-green-500">
                      উপলব্ধ
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.beds} বেড
                    </span>
                    <span className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.baths} বাথ
                    </span>
                    <span className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area} বর্গফুট
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      {property.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /মাস
                      </span>
                    </span>
                    <Button size="sm">
                      বিস্তারিত দেখুন
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
