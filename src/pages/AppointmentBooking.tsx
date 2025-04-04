
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { useApp } from '@/context/AppContext';

const AppointmentBooking = () => {
  const { language, isOnline, addPoints } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  
  const handleSelectTimeSlot = (date: Date, slotId: string) => {
    setSelectedDate(date);
    setSelectedSlot(slotId);
  };
  
  const handleBookAppointment = async () => {
    if (!isOnline) {
      toast({
        title: language === 'bn' ? "অফলাইন মোডে আছেন" : "You are offline",
        description: language === 'bn' 
          ? "অ্যাপয়েন্টমেন্ট বুকিং করতে ইন্টারনেট সংযোগ প্রয়োজন" 
          : "Internet connection is required to book an appointment",
        variant: "destructive"
      });
      return;
    }
    
    if (!selectedDate || !selectedSlot) {
      toast({
        title: language === 'bn' ? "অসম্পূর্ণ তথ্য" : "Incomplete information",
        description: language === 'bn' 
          ? "অনুগ্রহ করে তারিখ এবং সময় নির্বাচন করুন" 
          : "Please select both date and time slot",
        variant: "destructive"
      });
      return;
    }
    
    setIsBooking(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Award points
      addPoints(20);
      
      toast({
        title: language === 'bn' ? "সফল!" : "Success!",
        description: language === 'bn' 
          ? `আপনার অ্যাপয়েন্টমেন্ট বুক করা হয়েছে: ${format(selectedDate, 'dd/MM/yyyy')}` 
          : `Your appointment has been booked for: ${format(selectedDate, 'MM/dd/yyyy')}`,
      });
    } catch (error) {
      toast({
        title: language === 'bn' ? "ত্রুটি!" : "Error!",
        description: language === 'bn' 
          ? "অ্যাপয়েন্টমেন্ট বুক করতে ব্যর্থ হয়েছে" 
          : "Failed to book appointment",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  };
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">
        {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুকিং' : 'Book Appointment'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              {language === 'bn' ? 'তারিখ বাছাই করুন' : 'Select Date'}
            </h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <TimeSlotPicker onSelectTimeSlot={handleSelectTimeSlot} />
          
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {language === 'bn' ? 'আপনার বুকিং সারাংশ' : 'Your Booking Summary'}
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'bn' ? 'তারিখ:' : 'Date:'}
                  </span>
                  <span>
                    {selectedDate ? format(selectedDate, 'PPP') : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'bn' ? 'সময়:' : 'Time:'}
                  </span>
                  <span>
                    {selectedSlot ? 'Slot ' + selectedSlot : '-'}
                  </span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                disabled={!selectedDate || !selectedSlot || isBooking}
                onClick={handleBookAppointment}
              >
                {isBooking
                  ? (language === 'bn' ? 'বুক করা হচ্ছে...' : 'Booking...')
                  : (language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
