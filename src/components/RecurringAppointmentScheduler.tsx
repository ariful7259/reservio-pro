
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, AlertTriangle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface RecurringAppointmentProps {
  serviceName?: string;
  providerName?: string;
  onSchedule?: (data: any) => void;
  onCancel?: () => void;
}

const RecurringAppointmentScheduler: React.FC<RecurringAppointmentProps> = ({
  serviceName = "Service Name",
  providerName = "Provider Name",
  onSchedule = () => {},
  onCancel = () => {}
}) => {
  const { language } = useApp();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [recurringType, setRecurringType] = useState<string>("none");
  const [recurringInterval, setRecurringInterval] = useState<number>(1);
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [calendarSync, setCalendarSync] = useState<boolean>(false);
  const [confirmationStep, setConfirmationStep] = useState<boolean>(false);
  
  // Example time slots
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

  const recurringOptions = [
    { value: 'none', label: language === 'bn' ? 'একবার' : 'One-time' },
    { value: 'daily', label: language === 'bn' ? 'প্রতিদিন' : 'Daily' },
    { value: 'weekly', label: language === 'bn' ? 'সাপ্তাহিক' : 'Weekly' },
    { value: 'monthly', label: language === 'bn' ? 'মাসিক' : 'Monthly' },
  ];
  
  const handleTimeSelection = (timeSlot: TimeSlot) => {
    if (timeSlot.available) {
      setSelectedTime(timeSlot.time);
    }
  };
  
  const handleConfirm = () => {
    if (!confirmationStep) {
      setConfirmationStep(true);
      return;
    }
    
    // Process the appointment booking
    onSchedule({
      date,
      time: selectedTime,
      recurring: recurringType !== 'none',
      recurringType,
      recurringInterval,
      reminder: reminderEnabled,
      calendarSync
    });
  };
  
  const isNextDisabled = !date || !selectedTime;
  
  const formatRecurringText = (): string => {
    if (recurringType === 'none') return language === 'bn' ? 'একবার' : 'One-time appointment';
    
    const interval = recurringInterval > 1 ? ` (${recurringInterval} ${language === 'bn' ? 'বার' : 'intervals'})` : '';
    
    switch (recurringType) {
      case 'daily':
        return language === 'bn' 
          ? `প্রতিদিন${interval}` 
          : `Daily${interval}`;
      case 'weekly':
        return language === 'bn' 
          ? `সাপ্তাহিক${interval}` 
          : `Weekly${interval}`;
      case 'monthly':
        return language === 'bn' 
          ? `মাসিক${interval}` 
          : `Monthly${interval}`;
      default:
        return '';
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      {!confirmationStep ? (
        <>
          <CardHeader>
            <CardTitle>
              {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট বুক করুন' : 'Book Appointment'}
            </CardTitle>
            <CardDescription>
              {language === 'bn' 
                ? `${serviceName} - ${providerName}` 
                : `${serviceName} with ${providerName}`
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">
                {language === 'bn' ? 'তারিখ নির্বাচন করুন' : 'Select Date'}
              </h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : language === 'bn' ? 'তারিখ নির্বাচন করুন' : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">
                {language === 'bn' ? 'সময় নির্বাচন করুন' : 'Select Time'}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedTime === slot.time ? "default" : "outline"}
                    onClick={() => handleTimeSelection(slot)}
                    disabled={!slot.available}
                    className="relative group"
                    size="sm"
                  >
                    <Clock className="h-3 w-3 mr-2" />
                    {slot.time}
                    {!slot.available && (
                      <span className="absolute inset-0 bg-background/80 flex items-center justify-center text-xs text-muted-foreground">
                        {language === 'bn' ? 'বুকড' : 'Booked'}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">
                {language === 'bn' ? 'রিকারিং অপশন' : 'Recurring Options'}
              </h3>
              <div className="space-y-3">
                <RadioGroup value={recurringType} onValueChange={setRecurringType}>
                  {recurringOptions.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {recurringType !== 'none' && (
                  <div className="pl-6 pt-2">
                    <div className="flex items-center gap-2">
                      <Label className="min-w-24">
                        {language === 'bn' ? 'পুনরাবৃত্তির সংখ্যা' : 'Number of recurrences'}
                      </Label>
                      <Select 
                        value={String(recurringInterval)} 
                        onValueChange={(val) => setRecurringInterval(Number(val))}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <SelectItem key={num} value={String(num)}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">
                {language === 'bn' ? 'অতিরিক্ত অপশন' : 'Additional Options'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="reminder" 
                    checked={reminderEnabled}
                    onCheckedChange={(checked) => setReminderEnabled(!!checked)}
                  />
                  <Label htmlFor="reminder">
                    {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট রিমাইন্ডার পান' : 'Get appointment reminders'}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sync-calendar" 
                    checked={calendarSync}
                    onCheckedChange={(checked) => setCalendarSync(!!checked)}
                  />
                  <Label htmlFor="sync-calendar">
                    {language === 'bn' ? 'ক্যালেন্ডারে সিঙ্ক করুন' : 'Sync to calendar'}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>
              {language === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিশ্চিত করুন' : 'Confirm Appointment'}
            </CardTitle>
            <CardDescription>
              {language === 'bn' 
                ? `অনুগ্রহ করে আপনার অ্যাপয়েন্টমেন্ট বিবরণ পর্যালোচনা করুন` 
                : `Please review your appointment details`
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {language === 'bn' ? 'সার্ভিস' : 'Service'}:
              </span>
              <span className="font-medium">{serviceName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {language === 'bn' ? 'প্রোভাইডার' : 'Provider'}:
              </span>
              <span className="font-medium">{providerName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {language === 'bn' ? 'তারিখ' : 'Date'}:
              </span>
              <span className="font-medium">{date ? format(date, 'PPP') : ''}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {language === 'bn' ? 'সময়' : 'Time'}:
              </span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {language === 'bn' ? 'পুনরাবৃত্তি' : 'Recurrence'}:
              </span>
              <Badge variant={recurringType !== 'none' ? 'default' : 'outline'}>
                {formatRecurringText()}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                {reminderEnabled && (
                  <Badge variant="outline" className="mr-2">
                    {language === 'bn' ? 'রিমাইন্ডার সক্রিয়' : 'Reminders On'}
                  </Badge>
                )}
                
                {calendarSync && (
                  <Badge variant="outline">
                    {language === 'bn' ? 'ক্যালেন্ডার সিঙ্ক' : 'Calendar Sync'}
                  </Badge>
                )}
              </div>
              
              {recurringType !== 'none' && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                  {language === 'bn' 
                    ? 'রিকারিং অ্যাপয়েন্টমেন্ট আপনি যেকোনো সময় বাতিল করতে পারবেন।' 
                    : 'Recurring appointments can be cancelled at any time.'
                  }
                </div>
              )}
            </div>
          </CardContent>
        </>
      )}
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          {confirmationStep
            ? (language === 'bn' ? 'ফিরে যান' : 'Back')
            : (language === 'bn' ? 'বাতিল করুন' : 'Cancel')
          }
        </Button>
        <Button onClick={handleConfirm} disabled={isNextDisabled}>
          {confirmationStep
            ? (language === 'bn' ? 'বুকিং নিশ্চিত করুন' : 'Confirm Booking')
            : (language === 'bn' ? 'পরবর্তী' : 'Next')
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecurringAppointmentScheduler;
