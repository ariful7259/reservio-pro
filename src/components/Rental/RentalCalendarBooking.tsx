
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { addDays, format, isSameDay, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon, Check, CreditCard, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PaymentMethodSelector from "@/components/Payment/PaymentMethodSelector";

interface RentalCalendarBookingProps {
  rentalId?: string;
  title: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  deposit: number;
  image?: string;
}

type BookingPeriod = 'daily' | 'weekly' | 'monthly';

const RentalCalendarBooking: React.FC<RentalCalendarBookingProps> = ({
  rentalId = '1',
  title,
  pricePerDay,
  pricePerWeek,
  pricePerMonth,
  deposit,
  image
}) => {
  const [bookingPeriod, setBookingPeriod] = useState<BookingPeriod>('daily');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [dateSelectMode, setDateSelectMode] = useState<'start' | 'end'>('start');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { toast } = useToast();

  // Sample booked dates (in a real app, these would come from an API)
  const bookedDates = [
    { start: new Date(2024, 3, 15), end: new Date(2024, 3, 18) },
    { start: new Date(2024, 3, 22), end: new Date(2024, 3, 25) },
  ];

  const isDateBooked = (date: Date) => {
    return bookedDates.some(booking => 
      isWithinInterval(date, { start: booking.start, end: booking.end })
    );
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (dateSelectMode === 'start') {
      setStartDate(date);
      setDateSelectMode('end');
      // If the new start date is after the current end date, reset end date
      if (endDate && date > endDate) {
        setEndDate(addDays(date, 1));
      }
    } else {
      if (startDate && date <= startDate) {
        toast({
          variant: "destructive",
          title: "তারিখ নির্বাচন ত্রুটি",
          description: "শেষ তারিখ শুরুর তারিখের পরে হতে হবে।",
        });
        return;
      }
      setEndDate(date);
      setDateSelectMode('start');
    }
  };

  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculatePrice = () => {
    const days = calculateDuration();
    
    switch (bookingPeriod) {
      case 'daily':
        return days * pricePerDay;
      case 'weekly':
        return Math.ceil(days / 7) * pricePerWeek;
      case 'monthly':
        return Math.ceil(days / 30) * pricePerMonth;
      default:
        return 0;
    }
  };

  const handleBookingSubmit = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentComplete = (paymentData: any) => {
    toast({
      title: "বুকিং সফল!",
      description: `আপনার রেন্টাল বুকিং সফলভাবে সম্পন্ন হয়েছে। আইডি: RF${Math.floor(Math.random() * 10000)}`,
    });
    setIsPaymentOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>বুকিং করুন</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="calendar">ক্যালেন্ডার</TabsTrigger>
                <TabsTrigger value="availability">উপলব্ধতা</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calendar" className="mt-4">
                <div className="mb-4 flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {dateSelectMode === 'start' ? "শুরুর তারিখ নির্বাচন করুন" : "শেষের তারিখ নির্বাচন করুন"}
                    </span>
                    <Badge variant={dateSelectMode === 'start' ? "default" : "secondary"}>
                      {dateSelectMode === 'start' ? "শুরু" : "শেষ"}
                    </Badge>
                  </div>
                  
                  <Calendar
                    mode="single"
                    selected={dateSelectMode === 'start' ? startDate : endDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      return isDateBooked(date) || date < new Date();
                    }}
                    className="p-3 pointer-events-auto"
                  />
                  
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      * লাল তারিখগুলি ইতিমধ্যে বুক করা হয়েছে
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="availability">
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-7 gap-1">
                    {[...Array(30)].map((_, i) => {
                      const date = addDays(new Date(), i);
                      const isBooked = isDateBooked(date);
                      return (
                        <div 
                          key={i}
                          className={`aspect-square flex items-center justify-center rounded-md text-xs font-medium
                            ${isBooked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
                        >
                          {format(date, "d")}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
                      <span>উপলব্ধ</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-600 mr-1"></div>
                      <span>বুক করা</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:w-1/2 space-y-4">
            <div>
              <h3 className="font-medium mb-2">বুকিং সময়কাল</h3>
              <Tabs 
                defaultValue="daily" 
                value={bookingPeriod}
                onValueChange={(v) => setBookingPeriod(v as BookingPeriod)}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily">দৈনিক</TabsTrigger>
                  <TabsTrigger value="weekly">সাপ্তাহিক</TabsTrigger>
                  <TabsTrigger value="monthly">মাসিক</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium">শুরুর তারিখ</label>
                <div className="flex mt-1 items-center border rounded-md p-2 bg-muted/50">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{startDate ? format(startDate, "dd/MM/yyyy") : "নির্বাচন করুন"}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">শেষের তারিখ</label>
                <div className="flex mt-1 items-center border rounded-md p-2 bg-muted/50">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>{endDate ? format(endDate, "dd/MM/yyyy") : "নির্বাচন করুন"}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">সময়কাল</span>
                <span className="font-medium">{calculateDuration()} দিন</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">মূল্য</span>
                <span className="font-medium">৳{calculatePrice().toLocaleString()} ({
                  bookingPeriod === 'daily' ? 'দৈনিক' : 
                  bookingPeriod === 'weekly' ? 'সাপ্তাহিক' : 
                  'মাসিক'
                })</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">সিকিউরিটি ডিপোজিট</span>
                <span className="font-medium">৳{deposit.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>মোট</span>
                <span>৳{(calculatePrice() + deposit).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full"
              onClick={handleBookingSubmit}
              disabled={!startDate || !endDate}
            >
              এখনই বুক করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>রেন্টাল পেমেন্ট</DialogTitle>
              <DialogDescription>
                আপনার পছন্দের পেমেন্ট মেথড ব্যবহার করে পেমেন্ট সম্পন্ন করুন।
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <PaymentMethodSelector
                amount={calculatePrice()}
                processingFee={50}
                onComplete={handlePaymentComplete}
                allowedMethods={['bkash', 'nagad', 'rocket', 'card']}
                title="রেন্টাল পেমেন্ট"
                description={`${title} - ${calculateDuration()} দিনের জন্য`}
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default RentalCalendarBooking;
