
import React from 'react';
import { Search, Filter, Calendar, Tag, ChevronRight, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RentAnything = () => {
  // Sample rental items
  const rentalItems = [
    {
      id: '1',
      title: 'হাই-এন্ড DSLR ক্যামেরা',
      description: 'প্রফেশনাল ফটোগ্রাফি ও ভিডিওগ্রাফি',
      price: 1000,
      priceUnit: 'দিন',
      location: 'ধানমন্ডি, ঢাকা',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'electronics',
      owner: 'রহিম আহমেদ',
      rating: 4.8,
    },
    {
      id: '2',
      title: 'মাউন্টেন বাইক প্রিমিয়াম',
      description: 'আধুনিক ও সুবিধাজনক',
      price: 500,
      priceUnit: 'দিন',
      location: 'মিরপুর, ঢাকা',
      image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'sports',
      owner: 'করিম খান',
      rating: 4.6,
    },
    {
      id: '3',
      title: 'পোর্টেবল জেনারেটর',
      description: 'ইভেন্ট ও আউটডোর অ্যাক্টিভিটি',
      price: 1500,
      priceUnit: 'দিন',
      location: 'উত্তরা, ঢাকা',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'tools',
      owner: 'সেলিম মিয়া',
      rating: 4.9,
    },
  ];

  // Categories
  const categories = [
    { name: 'ইলেকট্রনিক্স', value: 'electronics' },
    { name: 'স্পোর্টস', value: 'sports' },
    { name: 'টুলস', value: 'tools' },
    { name: 'ভেহিকেল', value: 'vehicles' },
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">রেন্ট এনিথিং</h1>
        <p className="text-gray-500">এখানে যেকোনো কিছু ভাড়া করুন বা ভাড়া দিন</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button className="h-auto py-4 bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">ভাড়া নিন</span>
            <span className="text-xs">যেকোনো জিনিস ভাড়া নিন</span>
          </div>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 border-blue-500 text-blue-500 hover:bg-blue-50">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">ভাড়া দিন</span>
            <span className="text-xs">আপনার জিনিস ভাড়া দিন</span>
          </div>
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="ভাড়ার জিনিস খুঁজুন" className="pl-9" />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="w-full bg-secondary/50 mb-4">
          <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category.value} value={category.value} className="flex-1">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {rentalItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <Badge>
                          {item.category === 'electronics' && 'ইলেকট্রনিক্স'}
                          {item.category === 'sports' && 'স্পোর্টস'}
                          {item.category === 'tools' && 'টুলস'}
                          {item.category === 'vehicles' && 'ভেহিকেল'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                      <div className="flex items-center text-muted-foreground text-sm mt-2">
                        <MapPin className="h-4 w-4 mr-1" /> {item.location}
                      </div>
                      <div className="flex items-center text-sm mt-2">
                        <Tag className="h-4 w-4 mr-1 text-primary" /> 
                        <span className="font-medium">{item.owner}</span>
                        <span className="mx-1">•</span>
                        <span>{item.rating} রেটিং</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-lg font-bold">৳ {item.price}/{item.priceUnit}</div>
                      <Button size="sm" className="gap-1">
                        বুক করুন <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {categories.map(category => (
          <TabsContent key={category.value} value={category.value}>
            <div className="space-y-4">
              {rentalItems
                .filter(item => item.category === category.value)
                .map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3">
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 sm:h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4 sm:w-2/3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <Badge>
                              {item.category === 'electronics' && 'ইলেকট্রনিক্স'}
                              {item.category === 'sports' && 'স্পোর্টস'}
                              {item.category === 'tools' && 'টুলস'}
                              {item.category === 'vehicles' && 'ভেহিকেল'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          <div className="flex items-center text-muted-foreground text-sm mt-2">
                            <MapPin className="h-4 w-4 mr-1" /> {item.location}
                          </div>
                          <div className="flex items-center text-sm mt-2">
                            <Tag className="h-4 w-4 mr-1 text-primary" /> 
                            <span className="font-medium">{item.owner}</span>
                            <span className="mx-1">•</span>
                            <span>{item.rating} রেটিং</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-lg font-bold">৳ {item.price}/{item.priceUnit}</div>
                          <Button size="sm" className="gap-1">
                            বুক করুন <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              {rentalItems.filter(item => item.category === category.value).length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  এই ক্যাটাগরিতে কোনো আইটেম এখনো উপলব্ধ নেই
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RentAnything;
