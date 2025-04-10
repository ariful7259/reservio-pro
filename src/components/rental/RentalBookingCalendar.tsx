
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Check, Calendar as CalendarIcon, Clock, Info } from 'lucide-react';

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

  const isDateDisabled = (date: Date) => {
    if (!availableDates) return false;
    return !availableDates.some(
      availableDate => 
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );
  };

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
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {availableDates ? "সবুজ রঙের তারিখগুলো বুকিং এর জন্য উপলব্ধ" : "যেকোনো তারিখ নির্বাচন করুন"}
              </p>
              <div className="border rounded-md p-1">
                <Calendar
                  mode="multiple"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md pointer-events-auto"
                  disabled={isDateDisabled}
                />
              </div>
            </div>
            
            <div className="space-y-4 bg-secondary/20 p-3 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm">আইটেম:</span>
                <span className="font-medium">{itemName}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">মূল্য প্রতিদিন:</span>
                <span className="font-medium">৳{pricePerDay}</span>
              </div>
              
              {startDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">শুরুর তারিখ:</span>
                  <span className="font-medium">{startDate.toLocaleDateString('bn-BD')}</span>
                </div>
              )}
              
              {endDate && startDate?.getTime() !== endDate?.getTime() && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">শেষের তারিখ:</span>
                  <span className="font-medium">{endDate.toLocaleDateString('bn-BD')}</span>
                </div>
              )}
              
              {totalDays > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">মোট দিন:</span>
                  <span className="font-medium">{totalDays} দিন</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex items-center justify-between font-bold">
                <span>মোট:</span>
                <span>৳{totalPrice}</span>
              </div>
              
              {depositRequired > 0 && (
                <div className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 p-2 rounded-md">
                  <Info className="h-4 w-4" />
                  <span>ডিপোজিট (মূল্যের {depositRequired}%): ৳{depositAmount} </span>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-secondary/20 p-3 rounded-md space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">মোট রেন্টাল মূল্য:</span>
                <span className="font-medium">৳{totalPrice}</span>
              </div>
              
              {depositRequired > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">ডিপোজিট মূল্য:</span>
                  <span className="font-medium">৳{depositAmount}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex items-center justify-between font-bold">
                <span>আপনার মোট প্রদেয়:</span>
                <span>৳{depositRequired > 0 ? depositAmount : totalPrice}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>পেমেন্ট মেথড নির্বাচন করুন</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={paymentMethod === 'bkash' ? 'default' : 'outline'}
                  className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'bkash' ? 'border-primary' : ''}`}
                  onClick={() => setPaymentMethod('bkash')}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Bkash_logo.png" 
                       alt="bKash" className="h-6" />
                  <span className="text-xs">বিকাশ</span>
                </Button>
                
                <Button
                  variant={paymentMethod === 'nagad' ? 'default' : 'outline'}
                  className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'nagad' ? 'border-primary' : ''}`}
                  onClick={() => setPaymentMethod('nagad')}
                >
                  <img src="https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg" 
                       alt="Nagad" className="h-6" />
                  <span className="text-xs">নগদ</span>
                </Button>
                
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'card' ? 'border-primary' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center gap-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                         alt="Visa" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" 
                         alt="MasterCard" className="h-4" />
                  </div>
                  <span className="text-xs">কার্ড</span>
                </Button>
                
                <Button
                  variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                  className={`p-3 h-auto flex flex-col items-center justify-center gap-2 ${paymentMethod === 'cash' ? 'border-primary' : ''}`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="h-6 w-6 flex items-center justify-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></svg>
                  </div>
                  <span className="text-xs">ক্যাশ</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step === 'payment' ? (
          <>
            <Button variant="outline" onClick={() => setStep('dates')}>
              ফিরে যান
            </Button>
            <Button onClick={handleBooking}>
              <Check className="mr-2 h-4 w-4" /> বুকিং কনফার্ম করুন
            </Button>
          </>
        ) : (
          <Button onClick={handleContinue} className="w-full">
            এগিয়ে যান <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RentalBookingCalendar;
