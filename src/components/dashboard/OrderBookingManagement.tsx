
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderBookingManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  
  // মক অর্ডার ডেটা
  const orders = [
    {
      id: 'ORD-12345',
      customer: 'রাহিম আহমেদ',
      product: 'বিজনেস স্টার্টাপ গাইড',
      date: '২৭ এপ্রিল, ২০২৫',
      amount: '৳৯৯৯',
      status: 'delivered',
      type: 'marketplace'
    },
    {
      id: 'ORD-12344',
      customer: 'সাবিনা খাতুন',
      product: 'প্রিমিয়াম ওয়েবসাইট টেমপ্লেট',
      date: '২৫ এপ্রিল, ২০২৫',
      amount: '৳২,৫০০',
      status: 'delivered',
      type: 'marketplace'
    },
    {
      id: 'ORD-12343',
      customer: 'তানভীর হোসেন',
      product: 'ডিজিটাল মার্কেটিং মাস্টার কোর্স',
      date: '২৩ এপ্রিল, ২০২৫',
      amount: '৳৫,৯৯৯',
      status: 'processing',
      type: 'content'
    },
    {
      id: 'ORD-12342',
      customer: 'ফারিয়া ইসলাম',
      product: 'মেডিটেশন অডিও সিরিজ',
      date: '২১ এপ্রিল, ২০২৫',
      amount: '৳৮৯৯',
      status: 'delivered',
      type: 'content'
    }
  ];
  
  // মক বুকিং ডেটা
  const bookings = [
    {
      id: 'BK-3456',
      customer: 'কামাল হাসান',
      service: 'হোম ক্লিনিং',
      date: '২৮ এপ্রিল, ২০২৫',
      amount: '৳১,২০০',
      status: 'upcoming',
      type: 'service'
    },
    {
      id: 'BK-3455',
      customer: 'আসিফ আহমেদ',
      property: 'গুলশান অ্যাপার্টমেন্ট',
      date: '২৬ এপ্রিল, ২০২৫',
      amount: '৳১৫,০০০/মাস',
      status: 'confirmed',
      type: 'rental'
    },
    {
      id: 'BK-3454',
      customer: 'সামিরা খান',
      service: 'ওয়েব ডিজাইন কনসালটেশন',
      date: '২৪ এপ্রিল, ২০২৫',
      amount: '৳২,০০০',
      status: 'completed',
      type: 'service'
    },
    {
      id: 'BK-3453',
      customer: 'জাহিদ হোসেন',
      property: 'বনানী অ্যাপার্টমেন্ট',
      date: '২২ এপ্রিল, ২০২৫',
      amount: '৳১৮,০০০/মাস',
      status: 'confirmed',
      type: 'rental'
    }
  ];
  
  // স্টেটাস অনুযায়ী ব্যাজের রঙ নির্ধারণ
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'delivered':
      case 'completed':
        return 'outline';
      case 'processing':
        return 'secondary';
      case 'upcoming':
      case 'confirmed':
        return 'default';
      default:
        return 'outline';
    }
  };
  
  // স্টেটাস টেক্সট - বাংলা টেক্সট দেখানোর জন্য
  const getStatusText = (status: string) => {
    switch(status) {
      case 'delivered':
        return 'ডেলিভারড';
      case 'processing':
        return 'প্রসেসিং';
      case 'upcoming':
        return 'আসন্ন';
      case 'confirmed':
        return 'কনফার্মড';
      case 'completed':
        return 'সম্পূর্ণ';
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>অর্ডার এবং বুকিং</CardTitle>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders" className="flex items-center gap-1">
              <Package className="h-4 w-4" />
              অর্ডার
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              বুকিং
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="px-2">
        <ScrollArea className="h-[350px] pr-4">
          <TabsContent value="orders" className="m-0">
            <div className="space-y-4 pr-3">
              {orders.map(order => (
                <div key={order.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{order.customer}</p>
                        <Badge variant="outline" className="text-xs">
                          {order.id}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{order.amount}</p>
                    <Badge variant={getStatusBadgeVariant(order.status)} className="mt-1">
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="bookings" className="m-0">
            <div className="space-y-4 pr-3">
              {bookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{booking.customer}</p>
                        <Badge variant="outline" className="text-xs">
                          {booking.id}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {booking.service || booking.property}
                      </p>
                      <p className="text-xs text-muted-foreground">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{booking.amount}</p>
                    <Badge variant={getStatusBadgeVariant(booking.status)} className="mt-1">
                      {getStatusText(booking.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-center p-4">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate(activeTab === 'orders' ? '/orders' : '/bookings')}
        >
          {activeTab === 'orders' ? 'সব অর্ডার দেখুন' : 'সব বুকিং দেখুন'} 
          <ArrowUpRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderBookingManagement;
