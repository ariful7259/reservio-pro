
import React from 'react';
import { Search, Filter, Home, ChevronRight, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Housing = () => {
  // Sample housing listing data
  const housingListings = [
    {
      id: '1',
      title: 'সুন্দর আবাসিক অ্যাপার্টমেন্ট',
      location: 'গুলশান, ঢাকা',
      price: 20000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'flat',
      isAvailable: true,
    },
    {
      id: '2',
      title: 'ফ্যামিলি হোম উত্তরা সেক্টর-১১',
      location: 'উত্তরা, ঢাকা',
      price: 35000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'house',
      isAvailable: true,
    },
    {
      id: '3',
      title: 'বাণিজ্যিক স্পেস ক্যান্টনমেন্ট',
      location: 'মিরপুর, ঢাকা',
      price: 15000,
      bedrooms: 2,
      bathrooms: 1,
      area: 1000,
      image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'flat',
      isAvailable: true,
    },
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">বাসা খুঁজুন</h1>
        <p className="text-gray-500">আপনার পছন্দের বাসা, ফ্ল্যাট এবং রুম</p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="লোকেশন, এলাকা খুঁজুন" className="pl-9" />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full bg-secondary/50 mb-4">
          <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
          <TabsTrigger value="flat" className="flex-1">ফ্ল্যাট</TabsTrigger>
          <TabsTrigger value="house" className="flex-1">বাড়ি</TabsTrigger>
          <TabsTrigger value="room" className="flex-1">রুম</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {housingListings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img 
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <Badge variant={listing.isAvailable ? "default" : "secondary"}>
                          {listing.isAvailable ? "উপলব্ধ" : "ভাড়া হয়ে গেছে"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <div className="flex items-center text-sm">
                          <Bed className="h-4 w-4 mr-1" /> {listing.bedrooms} বেড
                        </div>
                        <div className="flex items-center text-sm">
                          <Bath className="h-4 w-4 mr-1" /> {listing.bathrooms} বাথ
                        </div>
                        <div className="flex items-center text-sm">
                          <Square className="h-4 w-4 mr-1" /> {listing.area} বর্গফুট
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-lg font-bold">৳ {listing.price.toLocaleString()}/মাস</div>
                      <Button size="sm" className="gap-1">
                        বিস্তারিত <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="flat">
          <div className="space-y-4">
            {housingListings.filter(listing => listing.type === 'flat').map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                {/* Same card content as above */}
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img 
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <Badge variant={listing.isAvailable ? "default" : "secondary"}>
                          {listing.isAvailable ? "উপলব্ধ" : "ভাড়া হয়ে গেছে"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <div className="flex items-center text-sm">
                          <Bed className="h-4 w-4 mr-1" /> {listing.bedrooms} বেড
                        </div>
                        <div className="flex items-center text-sm">
                          <Bath className="h-4 w-4 mr-1" /> {listing.bathrooms} বাথ
                        </div>
                        <div className="flex items-center text-sm">
                          <Square className="h-4 w-4 mr-1" /> {listing.area} বর্গফুট
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-lg font-bold">৳ {listing.price.toLocaleString()}/মাস</div>
                      <Button size="sm" className="gap-1">
                        বিস্তারিত <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="house">
          <div className="space-y-4">
            {housingListings.filter(listing => listing.type === 'house').map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                {/* Same card content as above */}
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img 
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <Badge variant={listing.isAvailable ? "default" : "secondary"}>
                          {listing.isAvailable ? "উপলব্ধ" : "ভাড়া হয়ে গেছে"}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-1" /> {listing.location}
                      </div>
                      <div className="flex flex-wrap gap-3 mt-3">
                        <div className="flex items-center text-sm">
                          <Bed className="h-4 w-4 mr-1" /> {listing.bedrooms} বেড
                        </div>
                        <div className="flex items-center text-sm">
                          <Bath className="h-4 w-4 mr-1" /> {listing.bathrooms} বাথ
                        </div>
                        <div className="flex items-center text-sm">
                          <Square className="h-4 w-4 mr-1" /> {listing.area} বর্গফুট
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-lg font-bold">৳ {listing.price.toLocaleString()}/মাস</div>
                      <Button size="sm" className="gap-1">
                        বিস্তারিত <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="room">
          <div className="text-center py-10 text-muted-foreground">
            কোনো রুম এখনো উপলব্ধ নেই
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Housing;
