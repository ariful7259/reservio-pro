import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  ShieldCheck,
  Bell,
  Home,
  AlertCircle,
  TrendingUp,
  Wrench,
  PaintBucket,
  MapPin,
  Building,
  ChevronRight,
  Plus,
  Wallet
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ServiceCard from '@/components/ServiceCard';
import AppointmentCard from '@/components/AppointmentCard';

const Index = () => {
  const navigate = useNavigate();

  // Sample data
  const upcomingAppointments = [
    {
      id: '1',
      serviceName: 'ডাক্তার কনসাল্টেশন',
      providerName: 'ডাঃ রাহিম আহমেদ',
      providerImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      date: '২৪ জুন, ২০২৩',
      time: 'সকাল ১০:৩০',
      status: 'upcoming',
      location: 'মেডিকেল সেন্টার, ঢাকা',
    },
  ] as const;

  const popularServices = [
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
  ];

  // Dashboard data
  const dashboardStats = [
    { title: 'মোট অ্যাপয়েন্টমেন্ট', value: '১২', icon: <Calendar className="h-5 w-5 text-blue-500" /> },
    { title: 'পয়েন্ট ব্যালেন্স', value: '৫৫০০', icon: <TrendingUp className="h-5 w-5 text-green-500" /> },
    { title: 'নোটিফিকেশন', value: '৩', icon: <AlertCircle className="h-5 w-5 text-red-500" /> },
  ];

  // Sponsored ads
  const sponsoredAds = [
    {
      id: '1',
      title: 'প্যাকার্স ও মুভার্স',
      description: 'আপনার ঘরের জিনিসপত্র নিরাপদে পরিবহন করুন',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=150&q=80',
      tag: 'বিশেষ অফার',
      link: '/services/movers',
    },
  ];

  // Home services
  const homeServices = [
    { name: "হোম ক্লিনিং", icon: <Home className="h-6 w-6" />, color: "bg-blue-100 text-blue-600", path: "/services/cleaning" },
    { name: "এসি রিপেয়ার", icon: <Wrench className="h-6 w-6" />, color: "bg-green-100 text-green-600", path: "/services/ac-repair" },
    { name: "পেইন্টিং", icon: <PaintBucket className="h-6 w-6" />, color: "bg-purple-100 text-purple-600", path: "/services/painting" },
    { name: "প্যাকার্স", icon: <Building className="h-6 w-6" />, color: "bg-amber-100 text-amber-600", path: "/services/movers" }
  ];

  // Quick services
  const quickServices = [
    { name: "প্রপার্টি পোস্ট", icon: <Plus className="h-5 w-5" />, route: '/property/post' },
    { name: "NBcash ওয়ালেট", icon: <Wallet className="h-5 w-5" />, route: '/wallet' },
    { name: "রেসিডেনশিয়াল প্ল্যান", icon: <Home className="h-5 w-5" />, route: '/plans/residential' },
    { name: "কমার্শিয়াল প্ল্যান", icon: <Building className="h-5 w-5" />, route: '/plans/commercial' },
  ];

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Property Post Button - Mobile Only */}
      <div className="md:hidden mb-4">
        <Button className="w-full" onClick={() => navigate('/property/post')}>
          <Plus className="h-4 w-4 mr-2" />
          প্রপার্টি পোস্ট করুন
        </Button>
      </div>
      
      {/* Packers and Movers Ad Banner */}
      <div className="mb-6">
        <Card className="overflow-hidden">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600518464441-7a8161244231?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400&q=80" 
              alt="Packers and Movers" 
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <h2 className="text-white text-xl font-bold">প্যাকার্স অ্যান্ড মুভার্স</h2>
              <p className="text-white/90 text-sm">এক কলে আপনার ঘরের জিনিসপত্র নিরাপদে পরিবহন করুন</p>
              <Button className="mt-2 w-fit" size="sm">বিস্তারিত দেখুন</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Home Services Categories */}
      <div className="mb-6">
        <div className="grid grid-cols-4 gap-3">
          {homeServices.map((service, index) => (
            <Card key={index} className="border-0 shadow-none cursor-pointer" onClick={() => navigate(service.path)}>
              <CardContent className="p-2">
                <button className="w-full h-full flex flex-col items-center justify-center p-2">
                  <div className={`h-12 w-12 rounded-full ${service.color} flex items-center justify-center mb-2`}>
                    {service.icon}
                  </div>
                  <span className="text-xs text-center">{service.name}</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Services Links */}
      <div className="mb-6">
        <Card className="border">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-3">দ্রুত লিংক</h2>
            <div className="space-y-2">
              {quickServices.map((service, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="w-full justify-between p-3 h-auto"
                  onClick={() => navigate(service.route)}
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {service.icon}
                    </div>
                    <span>{service.name}</span>
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard Section */}
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-4">ড্যাশবোর্ড</h1>
        <div className="grid grid-cols-3 gap-3">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="border">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <span className="text-lg font-semibold">{stat.value}</span>
                  <span className="text-xs text-gray-500">{stat.title}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="সার্ভিস, প্রপার্টি বা প্রোডাক্ট খুঁজুন" className="pl-9" />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Nearby Services Map Teaser */}
      <div className="mb-6">
        <Card className="border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">আশেপাশের সার্ভিস</h3>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30">৫ কিমি</Badge>
            </div>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">ম্যাপ দেখুন</p>
              </div>
            </div>
            <Button className="w-full" onClick={() => navigate('/nearby-services')}>
              আমার আশেপাশে খুঁজুন
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">আপনার আসন্ন অ্যাপয়েন্টমেন্ট</h2>
            <Button variant="link" className="p-0" onClick={() => navigate('/appointments')}>
              সব দেখুন
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} {...appointment} />
            ))}
          </div>
        </div>
      )}

      {/* Popular Services */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">জনপ্রিয় সার্ভিসসমূহ</h2>
          <Button variant="link" className="p-0" onClick={() => navigate('/services')}>
            সব দেখুন
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="mb-4 w-full bg-secondary/50">
            <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
            <TabsTrigger value="medical" className="flex-1">মেডিকেল</TabsTrigger>
            <TabsTrigger value="housing" className="flex-1">প্রপার্টি</TabsTrigger>
            <TabsTrigger value="others" className="flex-1">অন্যান্য</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularServices.map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={() => handleServiceClick(service.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="medical" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularServices.slice(0, 2).map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={() => handleServiceClick(service.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="housing" className="mt-0">
            <div className="text-center py-8 text-muted-foreground">
              <Button 
                variant="outline" 
                className="mb-4"
                onClick={() => navigate('/property/post')}
              >
                <Plus className="h-4 w-4 mr-2" />
                আপনার প্রপার্টি পোস্ট করুন
              </Button>
              <p>কোন প্রপার্টি এখনো উপলব্ধ নেই</p>
            </div>
          </TabsContent>
          <TabsContent value="others" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularServices.slice(2, 3).map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={() => handleServiceClick(service.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
