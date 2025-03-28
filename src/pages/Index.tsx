
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Calendar, 
  ShieldCheck 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  const handleServiceClick = (id: string) => {
    navigate(`/services/${id}`);
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center gap-3 mt-5 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="সার্ভিস খুঁজুন" className="pl-9" />
        </div>
        <Button size="icon" variant="outline">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

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

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">জনপ্রিয় ক্যাটাগরি</h2>
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: "ডাক্তার", icon: <Calendar className="h-6 w-6" />, color: "bg-blue-100 text-blue-600" },
            { name: "ডেন্টিস্ট", icon: <Calendar className="h-6 w-6" />, color: "bg-green-100 text-green-600" },
            { name: "ল'ইয়ার", icon: <ShieldCheck className="h-6 w-6" />, color: "bg-purple-100 text-purple-600" },
            { name: "অন্যান্য", icon: <Calendar className="h-6 w-6" />, color: "bg-amber-100 text-amber-600" }
          ].map((category, index) => (
            <Card key={index} className="border-0 shadow-none">
              <CardContent className="p-0">
                <button className="w-full h-full flex flex-col items-center justify-center p-3">
                  <div className={`h-12 w-12 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                    {category.icon}
                  </div>
                  <span className="text-sm">{category.name}</span>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

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
            <TabsTrigger value="legal" className="flex-1">লিগ্যাল</TabsTrigger>
            <TabsTrigger value="others" className="flex-1">অন্যান্য</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularServices.map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={handleServiceClick}
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
                  onClick={handleServiceClick}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="legal" className="mt-0">
            <div className="text-center py-8 text-muted-foreground">
              কোন সার্ভিস এখনো উপলব্ধ নেই
            </div>
          </TabsContent>
          <TabsContent value="others" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularServices.slice(2, 3).map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onClick={handleServiceClick}
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
