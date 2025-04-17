
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Info } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface BookingDateSelectionProps {
  date: Date[] | undefined;
  setDate: (dates: Date[] | undefined) => void;
  itemName: string;
  pricePerDay: number;
  availableDates?: Date[];
  minRentalDays: number;
  depositRequired: number;
  onContinue: () => void;
}

const BookingDateSelection: React.FC<BookingDateSelectionProps> = ({
  date,
  setDate,
  itemName,
  pricePerDay,
  availableDates,
  minRentalDays,
  depositRequired,
  onContinue,
}) => {
  const isMobile = useIsMobile();
  
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

  return (
    <>
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          {availableDates ? "সবুজ রঙের তারিখগুলো বুকিং এর জন্য উপলব্ধ" : "যেকোনো তারিখ নির্বাচন করুন"}
        </p>
        <div className={`border rounded-md ${isMobile ? 'p-0' : 'p-1'}`}>
          <Calendar
            mode="multiple"
            selected={date}
            onSelect={setDate}
            className={`rounded-md pointer-events-auto ${isMobile ? 'scale-90 -mx-4' : ''}`}
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
            <Info className="h-4 w-4 flex-shrink-0" />
            <span>ডিপোজিট (মূল্যের {depositRequired}%): ৳{depositAmount} </span>
          </div>
        )}
      </div>
      
      <Button onClick={onContinue} className="w-full">
        এগিয়ে যান <CalendarIcon className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
};

export default BookingDateSelection;
