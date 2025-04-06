
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, addDays, addWeeks, addMonths, isSameDay, isBefore, isAfter } from 'date-fns';
import { CheckCircle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type BookingType = 'daily' | 'weekly' | 'monthly';

interface BookedDate {
  startDate: Date;
  endDate: Date;
  type: BookingType;
  itemId: string;
  bookedBy: string;
}

const RentalBookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookingType, setBookingType] = useState<BookingType>('daily');
  const [bookingEndDate, setBookingEndDate] = useState<Date | undefined>();
  
  // Demo data - in a real app this would come from your backend
  const [bookedDates, setBookedDates] = useState<BookedDate[]>([
    {
      startDate: new Date(2025, 3, 10),
      endDate: new Date(2025, 3, 15),
      type: 'daily',
      itemId: '1',
      bookedBy: 'আব্দুল করিম'
    },
    {
      startDate: new Date(2025, 3, 20),
      endDate: new Date(2025, 4, 20),
      type: 'monthly',
      itemId: '1',
      bookedBy: 'রাফিয়া আক্তার'
    }
  ]);

  const calculateEndDate = (startDate: Date, type: BookingType): Date => {
    if (!startDate) return new Date();
    
    switch (type) {
      case 'daily':
        return addDays(startDate, 1);
      case 'weekly':
        return addWeeks(startDate, 1);
      case 'monthly':
        return addMonths(startDate, 1);
      default:
        return addDays(startDate, 1);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    const newEndDate = calculateEndDate(date, bookingType);
    setBookingEndDate(newEndDate);
  };

  const handleTypeChange = (value: string) => {
    setBookingType(value as BookingType);
    if (selectedDate) {
      const newEndDate = calculateEndDate(selectedDate, value as BookingType);
      setBookingEndDate(newEndDate);
    }
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(booking => 
      (isAfter(date, booking.startDate) || isSameDay(date, booking.startDate)) && 
      (isBefore(date, booking.endDate) || isSameDay(date, booking.endDate))
    );
  };

  const handleBooking = () => {
    if (!selectedDate || !bookingEndDate) return;
    
    // Add new booking
    const newBooking: BookedDate = {
      startDate: selectedDate,
      endDate: bookingEndDate,
      type: bookingType,
      itemId: '1',  // Demo item ID
      bookedBy: 'ইউজারের নাম' // This would be the logged-in user in a real app
    };
    
    setBookedDates([...bookedDates, newBooking]);
    
    // Reset form
    setSelectedDate(undefined);
    setBookingEndDate(undefined);
    
    // Show success message - in a real app use a toast
    alert('রেন্টাল বুকিং সফলভাবে সম্পন্ন হয়েছে!');
  };

  // Calculate booking cost based on type
  const calculateBookingCost = () => {
    if (!selectedDate) return 0;
    
    // Demo prices - in a real app these would be fetched from your backend
    const dailyRate = 500;
    const weeklyRate = 3000;
    const monthlyRate = 12000;
    
    switch (bookingType) {
      case 'daily':
        return dailyRate;
      case 'weekly':
        return weeklyRate;
      case 'monthly':
        return monthlyRate;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">রেন্টাল বুকিং ক্যালেন্ডার</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border shadow"
                disabled={(date) => isDateBooked(date) || date < new Date()}
                modifiers={{
                  booked: (date) => isDateBooked(date),
                }}
                modifiersStyles={{
                  booked: { backgroundColor: '#FECACA', color: '#B91C1C' }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-1/2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-center">রেন্টাল বুকিং ফর্ম</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <h3 className="font-medium mb-2">রেন্টাল পিরিয়ড নির্বাচন করুন</h3>
                <Tabs value={bookingType} onValueChange={handleTypeChange} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="daily">দৈনিক</TabsTrigger>
                    <TabsTrigger value="weekly">সাপ্তাহিক</TabsTrigger>
                    <TabsTrigger value="monthly">মাসিক</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {selectedDate && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 px-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">শুরুর তারিখ:</span>
                    </div>
                    <span>{format(selectedDate, 'PP')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 px-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">শেষের তারিখ:</span>
                    </div>
                    <span>{bookingEndDate ? format(bookingEndDate, 'PP') : 'নির্বাচন করুন'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 px-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium">সময়কাল:</span>
                    </div>
                    <Badge>{bookingType === 'daily' ? 'দৈনিক' : bookingType === 'weekly' ? 'সাপ্তাহিক' : 'মাসিক'}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 px-4 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">সর্বমোট ভাড়া:</span>
                    <span className="font-bold text-purple-700">৳{calculateBookingCost()}</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleBooking} 
                className="w-full" 
                disabled={!selectedDate}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                বুকিং নিশ্চিত করুন
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">আপকামিং বুকিংসমূহ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookedDates.map((booking, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-3 rounded-lg border flex justify-between items-center",
                  isSameDay(booking.startDate, new Date()) ? "bg-blue-50 border-blue-200" : ""
                )}
              >
                <div>
                  <h4 className="font-medium">{booking.bookedBy}</h4>
                  <div className="text-sm text-muted-foreground flex gap-2 items-center mt-1">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span>
                      {format(booking.startDate, 'PP')} - {format(booking.endDate, 'PP')}
                    </span>
                  </div>
                </div>
                <Badge>
                  {booking.type === 'daily' ? 'দৈনিক' : booking.type === 'weekly' ? 'সাপ্তাহিক' : 'মাসিক'}
                </Badge>
              </div>
            ))}
            
            {bookedDates.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                কোন বুকিং নেই
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalBookingCalendar;
