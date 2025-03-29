
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Calendar, ShoppingBag, Wallet } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: 'আপনার অ্যাপয়েন্টমেন্ট ৩০ মিনিট পরে',
      description: 'প্লাম্বিং সার্ভিস, ১২:৩০ PM',
      time: '১০ মিনিট আগে',
      icon: <Calendar className="h-6 w-6" />,
      type: 'appointment'
    },
    {
      id: 2,
      title: 'সাপ্তাহিক অফারঃ ২০% ছাড় সকল সার্ভিসে',
      description: 'শুক্রবার পর্যন্ত বিশেষ মূল্যছাড়',
      time: '২ ঘন্টা আগে',
      icon: <ShoppingBag className="h-6 w-6" />,
      type: 'offer'
    },
    {
      id: 3,
      title: 'আপনার ওয়ালেট রিচার্জ সফল হয়েছে',
      description: '৳৫০০ যোগ করা হয়েছে',
      time: '১ দিন আগে',
      icon: <Wallet className="h-6 w-6" />,
      type: 'wallet'
    },
    {
      id: 4,
      title: 'আপনার বুকিং নিশ্চিত করা হয়েছে',
      description: 'এসি রিপেয়ার সার্ভিস, রবিবার, সকাল ১০:০০',
      time: '২ দিন আগে',
      icon: <Calendar className="h-6 w-6" />,
      type: 'booking'
    },
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">নোটিফিকেশন</h1>
      
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center mr-4 
                    ${notification.type === 'appointment' ? 'bg-blue-100 text-blue-600' : 
                    notification.type === 'offer' ? 'bg-green-100 text-green-600' : 
                    notification.type === 'wallet' ? 'bg-purple-100 text-purple-600' : 
                    'bg-primary/10 text-primary'}`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">আপনার এখনো কোন নোটিফিকেশন নেই</p>
        </div>
      )}
      
      <Separator className="my-6" />
      
      <Button variant="outline" className="w-full">
        সব নোটিফিকেশন পড়া হয়েছে চিহ্নিত করুন
      </Button>
    </div>
  );
};

export default Notifications;
