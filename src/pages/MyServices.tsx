
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Calendar, 
  Bookmark, 
  MessageSquare, 
  ListCheck, 
  Store, 
  BookmarkCheck 
} from 'lucide-react';

const MyServices = () => {
  const emptyStates = {
    bookings: {
      icon: <Calendar className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন বুকিং করেননি",
      action: "বুকিং করুন"
    },
    appointments: {
      icon: <Calendar className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন অ্যাপয়েন্টমেন্ট নিন নি",
      action: "অ্যাপয়েন্টমেন্ট নিন"
    },
    shortlists: {
      icon: <Bookmark className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন শর্টলিস্ট করেননি",
      action: "সার্ভিস খুঁজুন"
    },
    contactedProperties: {
      icon: <MessageSquare className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন প্রোপার্টির সাথে যোগাযোগ করেননি",
      action: "প্রোপার্টি খুঁজুন"
    },
    listings: {
      icon: <ListCheck className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন লিস্টিং করেননি",
      action: "লিস্টিং করুন"
    },
    shop: {
      icon: <Store className="h-10 w-10 text-muted-foreground" />,
      message: "আপনি এখনো কোন প্রোডাক্ট কিনেননি",
      action: "শপিং করুন"
    },
    recommendations: {
      icon: <BookmarkCheck className="h-10 w-10 text-muted-foreground" />,
      message: "আপনার জন্য এখনও কোন রেকমেন্ডেশন নেই",
      action: "সার্ভিস ব্রাউজ করুন"
    }
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">আমার সার্ভিস</h1>
      
      <Tabs defaultValue="bookings" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-6 w-max">
            <TabsTrigger value="bookings">আমার বুকিংস</TabsTrigger>
            <TabsTrigger value="appointments">আমার অ্যাপয়েন্টমেন্টস</TabsTrigger>
            <TabsTrigger value="shortlists">আমার শর্টলিস্ট</TabsTrigger>
            <TabsTrigger value="contactedProperties">যোগাযোগকৃত প্রোপার্টি</TabsTrigger>
            <TabsTrigger value="listings">আমার লিস্টিংস</TabsTrigger>
            <TabsTrigger value="shop">আমার শপ</TabsTrigger>
            <TabsTrigger value="recommendations">স্মার্ট রেকমেন্ডেশন</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(emptyStates).map(([key, state]) => (
          <TabsContent key={key} value={key} className="mt-0">
            <div className="text-center py-10 flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                {state.icon}
              </div>
              <p className="text-muted-foreground">{state.message}</p>
              <Button>{state.action}</Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MyServices;
