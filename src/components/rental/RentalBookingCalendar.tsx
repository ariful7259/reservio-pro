
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import BookingDateSelection from './BookingDateSelection';
import BookingPaymentSelection from './BookingPaymentSelection';

interface RentalBookingCalendarProps {
  itemName: string;
  pricePerDay: number;
  availableDates?: Date[];
  onBookingComplete?: (bookingData: BookingData) => void;
  minRentalDays?: number;
  depositRequired?: number;
}

export interface BookingData {
  startDate: Date;
  endDate: Date;
  totalDays: number;
  totalPrice: number;
  depositAmount: number;
  paymentMethod?: string;
}

const RentalBookingCalendar: React.FC<RentalBookingCalendarProps> = ({
  itemName,
  pricePerDay,
  availableDates,
  onBookingComplete,
  minRentalDays = 1,
  depositRequired = 0,
}) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date[] | undefined>([]);
  const [step, setStep] = useState<'dates' | 'payment'>('dates');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Calculate booking details
  const startDate = date && date[0] ? date[0] : undefined;
  const endDate = date && date.length > 1 ? date[date.length - 1] : startDate;
  
  const totalDays = startDate && endDate 
    ? Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;
    
  const totalPrice = totalDays * pricePerDay;
  const depositAmount = depositRequired > 0 ? totalPrice * (depositRequired / 100) : 0;

  const handleContinue = () => {
    if (!startDate || !endDate) {
      toast({
        title: "তারিখ নির্বাচন করুন",
        description: "শুরুর এবং শেষের তারিখ নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }
    
    if (totalDays < minRentalDays) {
      toast({
        title: "ন্যূনতম দিন নির্বাচন করুন",
        description: `কমপক্ষে ${minRentalDays} দিনের জন্য বুক করুন`,
        variant: "destructive"
      });
      return;
    }
    
    setStep('payment');
  };

  const handleBooking = () => {
    if (!paymentMethod) {
      toast({
        title: "পেমেন্ট মেথড নির্বাচন করুন",
        description: "বুকিং সম্পন্ন করতে পেমেন্ট মেথড নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    if (startDate && endDate) {
      const bookingData: BookingData = {
        startDate,
        endDate,
        totalDays,
        totalPrice,
        depositAmount,
        paymentMethod
      };
      
      toast({
        title: "বুকিং সফল হয়েছে",
        description: `${itemName} সফলভাবে ${totalDays} দিনের জন্য বুক করা হয়েছে`,
      });

      if (onBookingComplete) {
        onBookingComplete(bookingData);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {step === 'dates' ? "বুকিং তারিখ নির্বাচন করুন" : "পেমেন্ট করুন"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 'dates' ? (
          <BookingDateSelection 
            date={date}
            setDate={setDate}
            itemName={itemName}
            pricePerDay={pricePerDay}
            availableDates={availableDates}
            minRentalDays={minRentalDays}
            depositRequired={depositRequired}
            onContinue={handleContinue}
          />
        ) : (
          <BookingPaymentSelection 
            totalPrice={totalPrice}
            depositAmount={depositAmount}
            depositRequired={depositRequired}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            onBack={() => setStep('dates')}
            onComplete={handleBooking}
          />
        )}
      </CardContent>
      {/* CardFooter moved to child components for better mobile responsiveness */}
    </Card>
  );
};

export default RentalBookingCalendar;
