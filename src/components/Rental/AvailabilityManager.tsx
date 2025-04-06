
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isWithinInterval } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Calendar as CalendarIcon, Check, Clock, Hourglass, MoreVertical, Timer } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface AvailabilityManagerProps {
  itemName?: string;
  itemId?: string;
}

interface BlockedPeriod {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

const AvailabilityManager: React.FC<AvailabilityManagerProps> = ({
  itemName = 'ডেল XPS ল্যাপটপ',
  itemId = 'I3045'
}) => {
  const [availabilityEnabled, setAvailabilityEnabled] = useState<boolean>(true);
  const [availabilityMode, setAvailabilityMode] = useState<'automatic' | 'manual'>('automatic');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [blockDialogOpen, setBlockDialogOpen] = useState<boolean>(false);
  const [blockStartDate, setBlockStartDate] = useState<Date | undefined>(new Date());
  const [blockEndDate, setBlockEndDate] = useState<Date | undefined>(addDays(new Date(), 3));
  const [blockReason, setBlockReason] = useState<string>('');
  const { toast } = useToast();
  
  // Sample booked dates (in a real app, these would come from an API)
  const bookedDates = [
    { start: addDays(new Date(), 5), end: addDays(new Date(), 8) },
    { start: addDays(new Date(), 15), end: addDays(new Date(), 18) },
  ];
  
  // Sample maintenance dates (in a real app, these would come from an API)
  const [blockedPeriods, setBlockedPeriods] = useState<BlockedPeriod[]>([
    { id: 'b1', startDate: addDays(new Date(), 10), endDate: addDays(new Date(), 12), reason: 'মেরামত' },
    { id: 'b2', startDate: addDays(new Date(), 20), endDate: addDays(new Date(), 25), reason: 'ব্যক্তিগত ব্যবহার' },
  ]);
  
  const isDateBooked = (date: Date) => {
    return bookedDates.some(booking => 
      isWithinInterval(date, { start: booking.start, end: booking.end })
    );
  };
  
  const isDateBlocked = (date: Date) => {
    return blockedPeriods.some(block => 
      isWithinInterval(date, { start: block.startDate, end: block.endDate })
    );
  };
  
  const handleToggleAvailability = (checked: boolean) => {
    setAvailabilityEnabled(checked);
    toast({
      title: checked ? "আইটেম এভেইলেবল করা হয়েছে" : "আইটেম নট এভেইলেবল করা হয়েছে",
      description: checked ? 
        "এখন গ্রাহকরা আপনার আইটেম বুক করতে পারবেন" : 
        "আপনার আইটেম সাময়িকভাবে নট এভেইলেবল করা হয়েছে",
    });
  };
  
  const handleBlockPeriod = () => {
    if (!blockStartDate || !blockEndDate || !blockReason) {
      toast({
        variant: "destructive",
        title: "ত্রুটি!",
        description: "সব ফিল্ড পূরণ করতে হবে",
      });
      return;
    }
    
    // Check if block period overlaps with existing bookings
    const hasBookingConflict = bookedDates.some(booking => 
      (blockStartDate <= booking.end && blockEndDate >= booking.start)
    );
    
    if (hasBookingConflict) {
      toast({
        variant: "destructive",
        title: "বুকিং কনফ্লিক্ট!",
        description: "আপনার ব্লক করা সময়কাল কোন বুকিংয়ের সাথে ওভারল্যাপ করছে",
      });
      return;
    }
    
    const newBlockedPeriod: BlockedPeriod = {
      id: `b${Date.now()}`,
      startDate: blockStartDate,
      endDate: blockEndDate,
      reason: blockReason
    };
    
    setBlockedPeriods([...blockedPeriods, newBlockedPeriod]);
    
    toast({
      title: "সময়কাল ব্লক করা হয়েছে",
      description: `${format(blockStartDate, "dd/MM/yyyy")} থেকে ${format(blockEndDate, "dd/MM/yyyy")} পর্যন্ত আইটেমটি ব্লক করা হয়েছে`,
    });
    
    setBlockDialogOpen(false);
    setBlockReason('');
  };
  
  const handleRemoveBlock = (blockId: string) => {
    setBlockedPeriods(blockedPeriods.filter(block => block.id !== blockId));
    
    toast({
      title: "ব্লক সরানো হয়েছে",
      description: "উক্ত সময়কালের ব্লক সরিয়ে ফেলা হয়েছে"
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>এভেইলেবিলিটি ম্যানেজমেন্ট</CardTitle>
        <CardDescription>আপনার রেন্টাল আইটেমের উপলব্ধতা সময়সূচি নিয়ন্ত্রণ করুন</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="availability-status" className="text-base">উপলব্ধতা স্ট্যাটাস</Label>
              <p className="text-sm text-muted-foreground">
                আপনার আইটেম বুকিংয়ের জন্য উপলব্ধ কিনা তা নিয়ন্ত্রণ করুন
              </p>
            </div>
            <Switch 
              id="availability-status" 
              checked={availabilityEnabled}
              onCheckedChange={handleToggleAvailability}
            />
          </div>
          
          {!availabilityEnabled && (
            <Alert className="border-amber-500 bg-amber-50 text-amber-800">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>আইটেম নট এভেইলেবল</AlertTitle>
              <AlertDescription>
                আপনার আইটেম সাময়িকভাবে রেন্টের জন্য উপলব্ধ নেই। গ্রাহকরা এটি বুক করতে পারবেন না।
              </AlertDescription>
            </Alert>
          )}
          
          <Separator />
          
          <div className="space-y-3">
            <Label>এভেইলেবিলিটি আপডেট মোড</Label>
            <RadioGroup 
              defaultValue={availabilityMode} 
              onValueChange={(v) => setAvailabilityMode(v as 'automatic' | 'manual')}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="automatic" 
                  id="automatic" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="automatic"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Hourglass className="h-6 w-6 mb-2" />
                  <span className="font-medium">অটোমেটিক আপডেট</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    বুকিং সময় অনুযায়ী স্বয়ংক্রিয় আপডেট
                  </span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem 
                  value="manual" 
                  id="manual" 
                  className="peer sr-only" 
                />
                <Label
                  htmlFor="manual"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Clock className="h-6 w-6 mb-2" />
                  <span className="font-medium">ম্যানুয়াল কন্ট্রোল</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    নির্দিষ্ট তারিখ মেনে নিজে আপডেট করুন
                  </span>
                </Label>
              </div>
            </RadioGroup>
            
            {availabilityMode === 'automatic' && (
              <p className="text-sm text-muted-foreground">
                <Check className="h-4 w-4 inline mr-1 text-green-600" />
                অটোমেটিক মোডে, আপনার আইটেমের এভেইলেবিলিটি সিস্টেম দ্বারা স্বয়ংক্রিয়ভাবে আপডেট হবে
              </p>
            )}
          </div>
          
          <div className="grid gap-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">এভেইলেবিলিটি ক্যালেন্ডার</h3>
                <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">সময়কাল ব্লক করুন</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>সময়কাল ব্লক করুন</DialogTitle>
                      <DialogDescription>
                        নির্দিষ্ট সময়কালে আপনার আইটেম অনুপলব্ধ রাখতে তারিখ নির্বাচন করুন
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="block-start">শুরুর তারিখ</Label>
                          <div className="flex items-center border rounded-md p-2 bg-muted/50">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>{blockStartDate ? format(blockStartDate, "dd/MM/yyyy") : "নির্বাচন করুন"}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="block-end">শেষের তারিখ</Label>
                          <div className="flex items-center border rounded-md p-2 bg-muted/50">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>{blockEndDate ? format(blockEndDate, "dd/MM/yyyy") : "নির্বাচন করুন"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Calendar
                        mode="range"
                        selected={{
                          from: blockStartDate,
                          to: blockEndDate,
                        }}
                        onSelect={(range) => {
                          if (range?.from) setBlockStartDate(range.from);
                          if (range?.to) setBlockEndDate(range.to);
                        }}
                        disabled={(date) => {
                          return isDateBooked(date);
                        }}
                        className="p-3 pointer-events-auto"
                      />
                      
                      <div className="space-y-2">
                        <Label htmlFor="block-reason">ব্লকের কারণ</Label>
                        <Select 
                          value={blockReason} 
                          onValueChange={setBlockReason}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="কারণ নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maintenance">মেরামত/রক্ষণাবেক্ষণ</SelectItem>
                            <SelectItem value="personal">ব্যক্তিগত ব্যবহার</SelectItem>
                            <SelectItem value="damage">ক্ষতিগ্রস্ত</SelectItem>
                            <SelectItem value="other">অন্যান্য</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {blockReason === 'other' && (
                        <div className="space-y-2">
                          <Label htmlFor="custom-reason">অন্যান্য কারণ</Label>
                          <Input id="custom-reason" placeholder="কারণ লিখুন..." />
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setBlockDialogOpen(false)}>
                        বাতিল
                      </Button>
                      <Button onClick={handleBlockPeriod}>
                        সময়কাল ব্লক করুন
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="p-3 pointer-events-auto"
                modifiers={{
                  booked: bookedDates.flatMap(range => {
                    const dates = [];
                    let currentDate = new Date(range.start);
                    while (currentDate <= range.end) {
                      dates.push(new Date(currentDate));
                      currentDate.setDate(currentDate.getDate() + 1);
                    }
                    return dates;
                  }),
                  blocked: blockedPeriods.flatMap(range => {
                    const dates = [];
                    let currentDate = new Date(range.startDate);
                    while (currentDate <= range.endDate) {
                      dates.push(new Date(currentDate));
                      currentDate.setDate(currentDate.getDate() + 1);
                    }
                    return dates;
                  }),
                }}
                modifiersStyles={{
                  booked: { backgroundColor: "#d0f2c4", color: "#166534" },
                  blocked: { backgroundColor: "#fee2e2", color: "#991b1b" }
                }}
              />
              
              <div className="flex gap-4 text-sm justify-center mt-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-100 mr-1 border border-green-600"></div>
                  <span>উপলব্ধ</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
                  <span>বুক করা</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-600 mr-1"></div>
                  <span>ব্লক করা</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium">ব্লক করা সময়কালসমূহ</h3>
              {blockedPeriods.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground border rounded-md">
                  <p>কোনো ব্লক করা সময়কাল নেই</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {blockedPeriods.map(block => (
                    <div key={block.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div>
                        <p className="font-medium">
                          {format(block.startDate, "dd/MM/yyyy")} - {format(block.endDate, "dd/MM/yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">{block.reason}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveBlock(block.id)} 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        সরান
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityManager;
