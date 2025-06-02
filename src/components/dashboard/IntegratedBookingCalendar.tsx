
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, Plus } from 'lucide-react';

const IntegratedBookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // আসন্ন বুকিংগুলো
  const upcomingBookings = [
    {
      id: 1,
      title: 'ওয়েব ডিজাইন কনসালটেশন',
      client: 'সামিরা আক্তার',
      time: '১০:০০ AM - ১২:০০ PM',
      date: '২৮ এপ্রিল',
      type: 'consultation',
      status: 'confirmed'
    },
    {
      id: 2,
      title: 'প্রপার্টি ভিউইং',
      client: 'করিম হোসেন',
      time: '২:০০ PM - ৩:০০ PM',
      date: '২৯ এপ্রিল',
      type: 'property',
      status: 'pending'
    },
    {
      id: 3,
      title: 'ডিজিটাল মার্কেটিং সেশন',
      client: 'রাহিমা খাতুন',
      time: '৪:০০ PM - ৫:৩০ PM',
      date: '৩০ এপ্রিল',
      type: 'training',
      status: 'confirmed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'consultation':
        return <User className="h-4 w-4" />;
      case 'property':
        return <MapPin className="h-4 w-4" />;
      case 'training':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              ইন্টিগ্রেটেড বুকিং ক্যালেন্ডার
            </CardTitle>
            <CardDescription>সকল বুকিং এবং অ্যাপয়েন্টমেন্ট একসাথে দেখুন</CardDescription>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            নতুন বুকিং
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mini Calendar View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">এপ্রিল ২০২৫</h3>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['স', 'ম', 'ব', 'ব', 'ব', 'শ', 'শ'].map((day) => (
                  <div key={day} className="p-2 font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                  <div
                    key={date}
                    className={`p-2 cursor-pointer rounded ${
                      [28, 29, 30].includes(date)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {date}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4">আসন্ন বুকিং</h3>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      {getTypeIcon(booking.type)}
                    </div>
                    <div>
                      <p className="font-medium">{booking.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {booking.client}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.time}
                        </span>
                        <span>{booking.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status === 'confirmed' ? 'কনফার্মড' : 
                     booking.status === 'pending' ? 'অপেক্ষমাণ' : 'বাতিল'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">১৫</p>
            <p className="text-sm text-blue-600">এই মাসের বুকিং</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">৮</p>
            <p className="text-sm text-green-600">আজকের অ্যাপয়েন্টমেন্ট</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">৩</p>
            <p className="text-sm text-yellow-600">অপেক্ষমাণ বুকিং</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">৯২%</p>
            <p className="text-sm text-purple-600">সফলতার হার</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegratedBookingCalendar;
