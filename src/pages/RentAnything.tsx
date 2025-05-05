import React, { useState } from 'react';
import { Search, Filter, Calendar, Tag, ChevronRight, MapPin, Home, Building, Car, Briefcase, Bike, Camera, Monitor, Wrench, Smartphone, Headphones, PlusCircle, Map, Globe, ListFilter, View, PaintBucket, Truck, House, AirVent, Zap, Ruler } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapView from '@/components/MapView';
import { useToast } from '@/components/ui/use-toast';
import P2PPaymentModal from '@/components/P2PPaymentModal';
import { useNavigate } from 'react-router-dom';

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
      subcategory: 'camera',
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
      subcategory: 'bike',
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
      subcategory: 'generator',
      owner: 'সেলিম মিয়া',
      rating: 4.9,
    },
  ];

  // Categories with subcategories
  const categories = [
    { 
      name: 'ইলেকট্রনিক্স', 
      value: 'electronics',
      icon: <Smartphone className="h-5 w-5 text-pink-500" />,
      subcategories: [
        { name: 'ক্যামেরা', value: 'camera', icon: <Camera className="h-4 w-4 text-pink-500" /> },
        { name: 'কম্পিউটার', value: 'computer', icon: <Monitor className="h-4 w-4 text-pink-500" /> },
        { name: 'স্মার্টফোন', value: 'smartphone', icon: <Smartphone className="h-4 w-4 text-pink-500" /> },
        { name: 'হেডফোন', value: 'headphone', icon: <Headphones className="h-4 w-4 text-pink-500" /> },
      ]
    },
    { 
      name: 'স্পোর্টস', 
      value: 'sports',
      icon: <Bike className="h-5 w-5 text-blue-500" />,
      subcategories: [
        { name: 'বাইক', value: 'bike', icon: <Bike className="h-4 w-4 text-blue-500" /> },
        { name: 'খেলাধুলা সরঞ্জাম', value: 'sports-equipment', icon: <PlusCircle className="h-4 w-4 text-blue-500" /> },
      ]
    },
    { 
      name: 'টুলস', 
      value: 'tools',
      icon: <Wrench className="h-5 w-5 text-purple-500" />,
      subcategories: [
        { name: 'পাওয়ার টুলস', value: 'power-tools', icon: <Wrench className="h-4 w-4 text-purple-500" /> },
        { name: 'জেনারেটর', value: 'generator', icon: <PlusCircle className="h-4 w-4 text-purple-500" /> },
      ]
    },
    { 
      name: 'ভেহিকেল', 
      value: 'vehicles',
      icon: <Car className="h-5 w-5 text-green-500" />,
      subcategories: [
        { name: 'কার', value: 'car', icon: <Car className="h-4 w-4 text-green-500" /> },
        { name: 'বাইক', value: 'motorcycle', icon: <Bike className="h-4 w-4 text-green-500" /> },
      ]
    },
    { 
      name: 'রিয়েল এস্টেট', 
      value: 'real-estate',
      icon: <Building className="h-5 w-5 text-amber-500" />,
      subcategories: [
        { name: 'অফিস স্পেস', value: 'office', icon: <Briefcase className="h-4 w-4 text-amber-500" /> },
        { name: 'বাসস্থান', value: 'residence', icon: <Home className="h-4 w-4 text-amber-500" /> },
      ]
    },
  ];

  // View toggle state
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const { toast } = useToast();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // নতুন সার্ভিস ক্যাটাগরি ডেটা
  const serviceCategories = [
    {
      id: 'painting',
      name: 'Painting',
      namebn: 'পেইন্টিং',
      icon: <PaintBucket className="h-10 w-10 text-purple-500" />,
      path: '/services/category/painting',
    },
    {
      id: 'packers-movers',
      name: 'Packers & Movers',
      namebn: 'প্যাকার্স & মুভার্স',
      icon: <Truck className="h-10 w-10 text-orange-500" />,
      path: '/services/category/packers-movers',
    },
    {
      id: 'home-cleaning',
      name: 'Home Cleaning',
      namebn: 'হোম ক্লিনিং',
      icon: <House className="h-10 w-10 text-green-500" />,
      path: '/services/category/home-cleaning',
    },
    {
      id: 'ac-repair',
      name: 'AC Repair',
      namebn: 'এসি রিপেয়ার',
      icon: <AirVent className="h-10 w-10 text-sky-500" />,
      path: '/services/category/ac-repair',
    },
    {
      id: 'electrician',
      name: 'Electrician',
      namebn: 'ইলেকট্রিশিয়ান',
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      path: '/services/category/electrician',
    },
    {
      id: 'carpentry',
      name: 'Carpentry',
      namebn: 'কার্পেন্ট্রি',
      icon: <Ruler className="h-10 w-10 text-amber-500" />,
      path: '/services/category/carpentry',
    },
    {
      id: 'plumbing',
      name: 'Plumbing',
      namebn: 'প্লাম্বিং',
      icon: <Wrench className="h-10 w-10 text-blue-500" />,
      path: '/services/category/plumbing',
    },
    {
      id: 'home-renovation',
      name: 'Home Renovation',
      namebn: 'হোম রেনোভেশন',
      icon: <Home className="h-10 w-10 text-red-500" />,
      path: '/services/category/home-renovation',
    }
  ];

  // সেবাভেদে অফার ও প্রাইস
  const offers = [
    {
      id: 'lowest-quote',
      text: 'Lowest Quote*',
      textbn: 'সর্বনিম্ন কোটেশন*'
    },
    {
      id: 'starting-price',
      text: 'Starts @ ₹359/-',
      textbn: 'শুরু ₹৩৫৯/- থেকে'
    },
    {
      id: 'discount',
      text: 'Upto 30% Off*',
      textbn: 'সর্বোচ্চ ৩০% ছাড়*'
    }
  ];

  const [expandedServices, setExpandedServices] = useState(true);
  const navigate = useNavigate();

  // ভিউ লেস/মোর বাটনে ক্লিক করা হলে
  const toggleExpandedServices = () => {
    setExpandedServices(!expandedServices);
  };

  // কোন সার্ভিস বাটনে ক্লিক করা হলে
  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  // Handle location select
  const handleLocationSelect = (lat: number, lng: number) => {
    toast({
      title: "লোকেশন নির্বাচিত হয়েছে",
      description: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    });
  };

  // Handle book button click
  const handleBookClick = (item: any) => {
    setSelectedItem(item);
    setPaymentModalOpen(true);
  };

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
        <Button 
          size="icon" 
          variant={viewMode === 'map' ? 'default' : 'outline'}
          onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
        >
          {viewMode === 'list' ? <Map className="h-4 w-4" /> : <ListFilter className="h-4 w-4" />}
        </Button>
      </div>

      {viewMode === 'map' ? (
        <MapView onLocationSelect={handleLocationSelect} />
      ) : (
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full bg-secondary/50 mb-4 flex-wrap">
            <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.value} value={category.value} className="flex-1 flex items-center gap-1">
                {category.icon}
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
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <div className="flex gap-2">
                            {categories.find(c => c.value === item.category)?.subcategories.find(
                              s => s.value === item.subcategory
                            ) && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                {categories.find(c => c.value === item.category)?.subcategories.find(
                                  s => s.value === item.subcategory
                                )?.icon}
                                {categories.find(c => c.value === item.category)?.subcategories.find(
                                  s => s.value === item.subcategory
                                )?.name}
                              </Badge>
                            )}
                            <Badge>
                              {categories.find(c => c.value === item.category)?.icon}
                              {categories.find(c => c.value === item.category)?.name}
                            </Badge>
                          </div>
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
              <div className="mb-4">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="all">সব {category.name}</TabsTrigger>
                    {category.subcategories.map(sub => (
                      <TabsTrigger key={sub.value} value={sub.value} className="flex items-center gap-1">
                        {sub.icon}
                        {sub.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value="all">
                    <div className="space-y-4">
                      {rentalItems.filter(item => item.category === category.value).map((item) => (
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
                  
                  {category.subcategories.map(sub => (
                    <TabsContent key={sub.value} value={sub.value}>
                      <div className="space-y-4">
                        {rentalItems.filter(item => item.category === category.value && item.subcategory === sub.value).map((item) => (
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
                        {rentalItems.filter(item => item.category === category.value && item.subcategory === sub.value).length === 0 && (
                          <div className="text-center py-10 text-muted-foreground">
                            ��ই সাবক্যাটাগরিতে কোনো আইটেম এখনো উপলব্ধ নেই
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* ফিচার্ড সার্ভিস সেকশন নতুন অংশ */}
      <div className="mb-8">
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <div className="aspect-[16/7] w-full">
            <img 
              src="/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png" 
              alt="Packers and Movers" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-white">
                <img 
                  src="/lovable-uploads/9e6c398d-25e5-46dd-8b2f-11321974afb6.png" 
                  alt="Packers and Movers Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white">Packers and Movers</h2>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2 rounded-md">
              Book
            </Button>
          </div>
        </div>

        {/* অফার ব্যাজ সেকশন */}
        <div className="flex justify-center gap-3 mb-6">
          {offers.map((offer) => (
            <Badge 
              key={offer.id} 
              variant="outline" 
              className="py-2 px-4 rounded-full bg-amber-50 border-amber-200 text-amber-800 font-medium"
            >
              {offer.textbn}
            </Badge>
          ))}
        </div>

        {/* সার্ভিস ক্যাটাগরি গ্রিড */}
        <div className="grid grid-cols-4 gap-4">
          {serviceCategories.slice(0, expandedServices ? serviceCategories.length : 4).map((category) => (
            <div 
              key={category.id} 
              className="flex flex-col items-center cursor-pointer" 
              onClick={() => handleServiceClick(category.path)}
            >
              <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <p className="text-center font-medium">{category.namebn}</p>
            </div>
          ))}
        </div>

        {/* ভিউ লেস/মোর বাটন */}
        <Button 
          variant="default" 
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white"
          onClick={toggleExpandedServices}
        >
          {expandedServices ? "ভিউ লেস ↑" : "ভিউ মোর ↓"}
        </Button>
      </div>

      {/* P2P Payment Instructions Modal */}
      <Card className="mb-6 bg-green-50 border border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-800 mb-2">নিরাপদ P2P পেমেন্ট</h3>
          <p className="text-sm text-green-700 mb-3">আমাদের এসক্রো সিস্টেমের মাধ্যমে আপনার পেমেন্ট সুরক্ষিত থাকবে। সার্ভিস সম্পন্ন হওয়ার আগে পর্যন্ত আমরা আপনার অর্থ হোল্ড করে রাখবো।</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white">সুরক্ষিত</Badge>
            <Badge variant="outline" className="bg-white">দ্রুত</Badge>
            <Badge variant="outline" className="bg-white">বিশ্বাসযোগ্য</Badge>
          </div>
        </CardContent>
      </Card>

      {/* P2P Payment Modal */}
      <P2PPaymentModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        item={selectedItem}
      />
    </div>
  );
};

export default RentAnything;
