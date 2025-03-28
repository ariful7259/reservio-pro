
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format, addDays, isSameDay } from 'date-fns';
import { bn } from 'date-fns/locale';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  onSelectTimeSlot: (date: Date, slotId: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ onSelectTimeSlot }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate 7 days from today
  const dateList = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  // Sample time slots
  const timeSlots: TimeSlot[] = [
    { id: '1', time: '09:00 AM', available: true },
    { id: '2', time: '10:00 AM', available: true },
    { id: '3', time: '11:00 AM', available: false },
    { id: '4', time: '12:00 PM', available: true },
    { id: '5', time: '01:00 PM', available: true },
    { id: '6', time: '02:00 PM', available: false },
    { id: '7', time: '03:00 PM', available: true },
    { id: '8', time: '04:00 PM', available: true },
    { id: '9', time: '05:00 PM', available: true },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
    onSelectTimeSlot(selectedDate, slotId);
  };

  const formatBengaliDay = (date: Date) => {
    try {
      return format(date, 'E', { locale: bn });
    } catch (error) {
      // If Bengali locale fails, use default
      return format(date, 'E');
    }
  };

  const formatBengaliDate = (date: Date) => {
    try {
      return format(date, 'd', { locale: bn });
    } catch (error) {
      // If Bengali locale fails, use default
      return format(date, 'd');
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">তারিখ নির্বাচন করুন</h3>
          <div className="flex gap-2 overflow-x-auto py-2">
            {dateList.map((date) => (
              <button
                key={date.toString()}
                onClick={() => handleDateSelect(date)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-16 ${
                  isSameDay(date, selectedDate)
                    ? 'bg-primary text-white'
                    : 'bg-secondary/50'
                }`}
              >
                <span className="text-xs">
                  {formatBengaliDay(date)}
                </span>
                <span className="text-lg font-bold">
                  {formatBengaliDate(date)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">সময় নির্বাচন করুন</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => handleSlotSelect(slot.id)}
                className={`time-slot py-2 px-2 rounded-md border text-center ${
                  selectedSlot === slot.id ? 'selected' : ''
                } ${
                  !slot.available
                    ? 'opacity-50 cursor-not-allowed bg-gray-100'
                    : 'hover:border-primary'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSlotPicker;
