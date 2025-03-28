
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentCard from '@/components/AppointmentCard';

const Appointments = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'upcoming' | 'completed' | 'all'>('upcoming');

  // Sample appointments data
  const appointments = [
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
    {
      id: '2',
      serviceName: 'ডেন্টাল চেকআপ',
      providerName: 'ডাঃ জাহিদুল ইসলাম',
      providerImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      date: '১৫ জুন, ২০২৩',
      time: 'দুপুর ০১:০০',
      status: 'completed',
      location: 'শাইন ডেন্টাল, ঢাকা',
    },
    {
      id: '3',
      serviceName: 'মেন্টাল হেলথ কাউন্সেলিং',
      providerName: 'ডাঃ সাবরিনা আহমেদ',
      providerImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      date: '১৫ মে, ২০২৩',
      time: 'বিকাল ০৪:০০',
      status: 'completed',
      location: 'মাইন্ড কেয়ার, ঢাকা',
    },
    {
      id: '4',
      serviceName: 'ফিজিওথেরাপি সেশন',
      providerName: 'ডাঃ কামরুল হাসান',
      providerImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      date: '৩০ জুন, ২০২৩',
      time: 'সকাল ১১:০০',
      status: 'upcoming',
      location: 'হেলদি লাইফ ক্লিনিক, ঢাকা',
    },
    {
      id: '5',
      serviceName: 'নিউট্রিশন কনসাল্টেশন',
      providerName: 'ডাঃ নুসরাত জাহান',
      providerImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80',
      date: '১০ এপ্রিল, ২০২৩',
      time: 'দুপুর ০২:৩০',
      status: 'cancelled',
      location: 'হেলদি ডাইট, ঢাকা',
    },
  ] as const;

  const filteredAppointments = appointments.filter(
    appointment => filter === 'all' || appointment.status === filter
  );

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">আমার অ্যাপয়েন্টমেন্ট</h1>
      </div>

      <Tabs defaultValue="upcoming" className="mb-6" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="upcoming" className="flex-1">আসন্ন</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">সম্পন্ন</TabsTrigger>
          <TabsTrigger value="all" className="flex-1">সব</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-0">
          {appointments.filter(a => a.status === 'upcoming').length > 0 ? (
            <div className="space-y-4">
              {appointments
                .filter(a => a.status === 'upcoming')
                .map(appointment => (
                  <AppointmentCard key={appointment.id} {...appointment} />
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              কোন আসন্ন অ্যাপয়েন্টমেন্ট নেই
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          {appointments.filter(a => a.status === 'completed').length > 0 ? (
            <div className="space-y-4">
              {appointments
                .filter(a => a.status === 'completed')
                .map(appointment => (
                  <AppointmentCard key={appointment.id} {...appointment} />
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              কোন সম্পন্ন অ্যাপয়েন্টমেন্ট নেই
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="all" className="mt-0">
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.map(appointment => (
                <AppointmentCard key={appointment.id} {...appointment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              কোন অ্যাপয়েন্টমেন্ট নেই
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button 
          className="w-full" 
          onClick={() => navigate('/services')}
        >
          নতুন অ্যাপয়েন্টমেন্ট বুক করুন
        </Button>
      </div>
    </div>
  );
};

export default Appointments;
