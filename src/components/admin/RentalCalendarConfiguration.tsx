
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { ColorPicker } from '@/components/admin/ColorPicker';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

import { 
  Calendar as CalendarIcon,
  Clock,
  PlusCircle,
  Ban,
  Check,
  Settings,
  Briefcase,
  Calendar as CalendarIconBase,
  CalendarRange,
  CalendarDays,
  Paintbrush,
  SquareStack,
  PencilRuler,
  Users
} from 'lucide-react';

interface CalendarConfig {
  viewType: string;
  allowMultiDayBooking: boolean;
  minDaysBeforeBooking: number;
  maxDaysInAdvance: number;
  bufferBetweenBookings: number;
  minBookingDuration: number;
  maxBookingDuration: number;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: string[];
  timeSlotDuration: number;
  showUnavailableDays: boolean;
  bookingApprovalRequired: boolean;
  showPriceInCalendar: boolean;
  hidePastDays: boolean;
  scrollToCurrentTime: boolean;
  appearance: {
    bookedColor: string;
    availableColor: string;
    pendingColor: string;
    selectedColor: string;
    timeSlotHeight: number;
    headerStyle: string;
    calendarStyle: string;
  };
}

// অ্যাভেইলাবিলিটি রুল্স
interface AvailabilityRule {
  id: string;
  name: string;
  type: 'recurring' | 'specific';
  status: 'available' | 'unavailable';
  daysOfWeek?: string[];
  specificDates?: Date[];
  timeRange?: {
    start: string;
    end: string;
  };
  priority: number;
}

const RentalCalendarConfiguration = () => {
  const { toast } = useToast();
  
  const [calendarConfig, setCalendarConfig] = useState<CalendarConfig>({
    viewType: 'month',
    allowMultiDayBooking: true,
    minDaysBeforeBooking: 1,
    maxDaysInAdvance: 90,
    bufferBetweenBookings: 0,
    minBookingDuration: 1,
    maxBookingDuration: 14,
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    workingDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    timeSlotDuration: 60,
    showUnavailableDays: true,
    bookingApprovalRequired: true,
    showPriceInCalendar: true,
    hidePastDays: true,
    scrollToCurrentTime: true,
    appearance: {
      bookedColor: '#EF4444',
      availableColor: '#10B981',
      pendingColor: '#F59E0B',
      selectedColor: '#3B82F6',
      timeSlotHeight: 40,
      headerStyle: 'modern',
      calendarStyle: 'standard'
    }
  });
  
  const [availabilityRules, setAvailabilityRules] = useState<AvailabilityRule[]>([
    {
      id: '1',
      name: 'উইকএন্ড বন্ধ',
      type: 'recurring',
      status: 'unavailable',
      daysOfWeek: ['sunday'],
      priority: 1
    },
    {
      id: '2',
      name: 'প্রতিদিন দুপুরের বিরতি',
      type: 'recurring',
      status: 'unavailable',
      daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      timeRange: {
        start: '13:00',
        end: '14:00'
      },
      priority: 2
    },
    {
      id: '3',
      name: 'ঈদ ছুটি',
      type: 'specific',
      status: 'unavailable',
      specificDates: [new Date(2025, 4, 1), new Date(2025, 4, 2), new Date(2025, 4, 3)],
      priority: 3
    }
  ]);
  
  const [newRule, setNewRule] = useState<Partial<AvailabilityRule>>({
    name: '',
    type: 'recurring',
    status: 'unavailable',
    daysOfWeek: [],
    priority: 1
  });
  
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showAddRule, setShowAddRule] = useState(false);
  
  const handleConfigChange = (
    section: keyof CalendarConfig,
    field: string,
    value: any
  ) => {
    if (section === 'appearance') {
      setCalendarConfig(prev => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          [field]: value
        }
      }));
    } else {
      setCalendarConfig(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };
  
  const handleWorkingHoursChange = (field: 'start' | 'end', value: string) => {
    setCalendarConfig(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [field]: value
      }
    }));
  };
  
  const handleWorkingDayToggle = (day: string) => {
    setCalendarConfig(prev => {
      const currentDays = [...prev.workingDays];
      
      if (currentDays.includes(day)) {
        return {
          ...prev,
          workingDays: currentDays.filter(d => d !== day)
        };
      } else {
        return {
          ...prev,
          workingDays: [...currentDays, day]
        };
      }
    });
  };
  
  const handleAddRule = () => {
    // ভ্যালিডেশন
    if (!newRule.name) {
      toast({
        title: "রুলের নাম প্রয়োজন",
        description: "অনুগ্রহ করে রুলের একটি নাম দিন।",
        variant: "destructive"
      });
      return;
    }
    
    if (newRule.type === 'recurring' && (!newRule.daysOfWeek || newRule.daysOfWeek.length === 0)) {
      toast({
        title: "সপ্তাহের দিন নির্বাচন করুন",
        description: "রিকারিং রুলের জন্য অন্তত একটি দিন নির্বাচন করুন।",
        variant: "destructive"
      });
      return;
    }
    
    if (newRule.type === 'specific' && (!selectedDates || selectedDates.length === 0)) {
      toast({
        title: "তারিখ নির্বাচন করুন",
        description: "নির্দিষ্ট রুলের জন্য অন্তত একটি তারিখ নির্বাচন করুন।",
        variant: "destructive"
      });
      return;
    }
    
    // নতুন রুল যোগ করা
    const ruleToAdd: AvailabilityRule = {
      id: `rule-${Date.now()}`,
      name: newRule.name || '',
      type: newRule.type as 'recurring' | 'specific',
      status: newRule.status as 'available' | 'unavailable',
      priority: newRule.priority || 1,
      ...(newRule.type === 'recurring' ? { daysOfWeek: newRule.daysOfWeek } : {}),
      ...(newRule.type === 'specific' ? { specificDates: selectedDates } : {}),
      ...(newRule.timeRange ? { timeRange: newRule.timeRange } : {})
    };
    
    setAvailabilityRules(prev => [...prev, ruleToAdd]);
    
    // ফর্ম রিসেট
    setNewRule({
      name: '',
      type: 'recurring',
      status: 'unavailable',
      daysOfWeek: [],
      priority: 1
    });
    setSelectedDates([]);
    setShowAddRule(false);
    
    toast({
      title: "নতুন রুল যোগ করা হয়েছে",
      description: `${ruleToAdd.name} রুল সফলভাবে যোগ করা হয়েছে।`,
    });
  };
  
  const handleDeleteRule = (id: string) => {
    setAvailabilityRules(prev => prev.filter(rule => rule.id !== id));
    
    toast({
      title: "রুল মুছে ফেলা হয়েছে",
      description: "অ্যাভেইলাবিলিটি রুল সফলভাবে মুছে ফেলা হয়েছে।",
      variant: "destructive"
    });
  };
  
  const handleSaveConfig = () => {
    // ডাটাবেসে কনফিগ সেভ করার কোড
    console.log('Saving calendar configuration:', calendarConfig);
    console.log('Saving availability rules:', availabilityRules);
    
    toast({
      title: "ক্যালেন্ডার কনফিগারেশন সেভ করা হয়েছে",
      description: "রেন্টাল ক্যালেন্ডারের সেটিংস সফলভাবে আপডেট করা হয়েছে।",
    });
  };
  
  const handleDayOfWeekToggle = (day: string) => {
    setNewRule(prev => {
      const currentDays = [...(prev.daysOfWeek || [])];
      
      if (currentDays.includes(day)) {
        return {
          ...prev,
          daysOfWeek: currentDays.filter(d => d !== day)
        };
      } else {
        return {
          ...prev,
          daysOfWeek: [...currentDays, day]
        };
      }
    });
  };
  
  const handleTimeRangeChange = (field: 'start' | 'end', value: string) => {
    setNewRule(prev => ({
      ...prev,
      timeRange: {
        ...(prev.timeRange || { start: '09:00', end: '18:00' }),
        [field]: value
      }
    }));
  };
  
  // সপ্তাহের দিনের বাংলা নাম
  const getDayName = (day: string) => {
    const dayNames: Record<string, string> = {
      'monday': 'সোমবার',
      'tuesday': 'মঙ্গলবার',
      'wednesday': 'বুধবার',
      'thursday': 'বৃহস্পতিবার',
      'friday': 'শুক্রবার',
      'saturday': 'শনিবার',
      'sunday': 'রবিবার'
    };
    
    return dayNames[day] || day;
  };
  
  // রুলের স্ট্যাটাস বাংলায় দেখানো
  const getStatusInBangla = (status: string) => {
    return status === 'available' ? 'উপলব্ধ' : 'অনুপলব্ধ';
  };
  
  // রুলের টাইপ বাংলায় দেখানো
  const getTypeInBangla = (type: string) => {
    return type === 'recurring' ? 'পুনরাবৃত্তিমূলক' : 'নির্দিষ্ট তারিখ';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            <span>রেন্টাল ক্যালেন্ডার কনফিগারেশন</span>
          </CardTitle>
          <CardDescription>
            রেন্টাল আইটেমের বুকিং ক্যালেন্ডারের জন্য সেটিংস কনফিগার করুন।
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="general">
            <TabsList className="w-full rounded-none p-0 border-b grid grid-cols-4">
              <TabsTrigger value="general" className="rounded-none">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">জেনারেল</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="booking" className="rounded-none">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">বুকিং</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="availability" className="rounded-none">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">উপলব্ধতা</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="rounded-none">
                <div className="flex items-center gap-2">
                  <Paintbrush className="h-4 w-4" />
                  <span className="hidden sm:inline">অ্যাপিয়ারেন্স</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>ক্যালেন্ডার ভিউ টাইপ</Label>
                    <Select
                      value={calendarConfig.viewType}
                      onValueChange={(value) => handleConfigChange('viewType', 'viewType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ভিউ টাইপ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">
                          <div className="flex items-center gap-2">
                            <CalendarIconBase className="h-4 w-4" />
                            <span>ডেইলি ভিউ</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="week">
                          <div className="flex items-center gap-2">
                            <CalendarRange className="h-4 w-4" />
                            <span>উইকলি ভিউ</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="month">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>মান্থলি ভিউ</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>টাইম স্লট ডিউরেশন (মিনিট)</Label>
                    <Select
                      value={calendarConfig.timeSlotDuration.toString()}
                      onValueChange={(value) => handleConfigChange('timeSlotDuration', 'timeSlotDuration', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="টাইম স্লট ডিউরেশন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">১৫ মিনিট</SelectItem>
                        <SelectItem value="30">৩০ মিনিট</SelectItem>
                        <SelectItem value="60">১ ঘন্টা</SelectItem>
                        <SelectItem value="120">২ ঘন্টা</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="show-unavailable"
                        checked={calendarConfig.showUnavailableDays}
                        onCheckedChange={(value) => handleConfigChange('showUnavailableDays', 'showUnavailableDays', value)}
                      />
                      <Label htmlFor="show-unavailable">অনুপলব্ধ দিনগুলি দেখান</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="show-price"
                        checked={calendarConfig.showPriceInCalendar}
                        onCheckedChange={(value) => handleConfigChange('showPriceInCalendar', 'showPriceInCalendar', value)}
                      />
                      <Label htmlFor="show-price">ক্যালেন্ডারে মূল্য দেখান</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="hide-past"
                        checked={calendarConfig.hidePastDays}
                        onCheckedChange={(value) => handleConfigChange('hidePastDays', 'hidePastDays', value)}
                      />
                      <Label htmlFor="hide-past">অতীত দিনগুলি লুকান</Label>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="scroll-to-current"
                        checked={calendarConfig.scrollToCurrentTime}
                        onCheckedChange={(value) => handleConfigChange('scrollToCurrentTime', 'scrollToCurrentTime', value)}
                      />
                      <Label htmlFor="scroll-to-current">বর্তমান সময়ে স্ক্রল করুন</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>ওয়ার্কিং আওয়ার্স</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-xs">শুরু</Label>
                        <Input 
                          type="time" 
                          value={calendarConfig.workingHours.start}
                          onChange={(e) => handleWorkingHoursChange('start', e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">শেষ</Label>
                        <Input 
                          type="time" 
                          value={calendarConfig.workingHours.end}
                          onChange={(e) => handleWorkingHoursChange('end', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ওয়ার্কিং ডেইজ</Label>
                    <div className="flex flex-wrap gap-2">
                      {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                        <Button
                          key={day}
                          variant={calendarConfig.workingDays.includes(day) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleWorkingDayToggle(day)}
                          className="text-xs h-8"
                        >
                          {getDayName(day)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="booking" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="multi-day"
                        checked={calendarConfig.allowMultiDayBooking}
                        onCheckedChange={(value) => handleConfigChange('allowMultiDayBooking', 'allowMultiDayBooking', value)}
                      />
                      <Label htmlFor="multi-day">একাধিক দিন বুকিং অনুমতি দিন</Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>বুকিংয়ের আগে ন্যূনতম দিন ({calendarConfig.minDaysBeforeBooking})</Label>
                    <Slider 
                      value={[calendarConfig.minDaysBeforeBooking]} 
                      min={0} 
                      max={30} 
                      step={1}
                      onValueChange={(value) => handleConfigChange('minDaysBeforeBooking', 'minDaysBeforeBooking', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 দিন</span>
                      <span>30 দিন</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>অগ্রিম বুকিংয়ের সর্বাধিক দিন ({calendarConfig.maxDaysInAdvance})</Label>
                    <Slider 
                      value={[calendarConfig.maxDaysInAdvance]} 
                      min={7} 
                      max={365} 
                      step={1}
                      onValueChange={(value) => handleConfigChange('maxDaysInAdvance', 'maxDaysInAdvance', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>7 দিন</span>
                      <span>365 দিন</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="approval-required"
                        checked={calendarConfig.bookingApprovalRequired}
                        onCheckedChange={(value) => handleConfigChange('bookingApprovalRequired', 'bookingApprovalRequired', value)}
                      />
                      <Label htmlFor="approval-required">বুকিং অনুমোদন প্রয়োজন</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>বুকিংয়ের মধ্যে বাফার দিন ({calendarConfig.bufferBetweenBookings})</Label>
                    <Slider 
                      value={[calendarConfig.bufferBetweenBookings]} 
                      min={0} 
                      max={7} 
                      step={1}
                      onValueChange={(value) => handleConfigChange('bufferBetweenBookings', 'bufferBetweenBookings', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0 দিন</span>
                      <span>7 দিন</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ন্যূনতম বুকিং সময়কাল ({calendarConfig.minBookingDuration} দিন)</Label>
                    <Slider 
                      value={[calendarConfig.minBookingDuration]} 
                      min={1} 
                      max={14} 
                      step={1}
                      onValueChange={(value) => handleConfigChange('minBookingDuration', 'minBookingDuration', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 দিন</span>
                      <span>14 দিন</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>সর্বাধিক বুকিং সময়কাল ({calendarConfig.maxBookingDuration} দিন)</Label>
                    <Slider 
                      value={[calendarConfig.maxBookingDuration]} 
                      min={1} 
                      max={90} 
                      step={1}
                      onValueChange={(value) => handleConfigChange('maxBookingDuration', 'maxBookingDuration', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 দিন</span>
                      <span>90 দিন</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="availability" className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <h3 className="text-lg font-medium">অ্যাভেইলাবিলিটি রুলস</h3>
                
                <Button
                  onClick={() => setShowAddRule(true)}
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>নতুন রুল যোগ করুন</span>
                </Button>
              </div>
              
              {showAddRule && (
                <Card className="bg-muted/40 border mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">নতুন অ্যাভেইলাবিলিটি রুল</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>রুলের নাম</Label>
                          <Input 
                            placeholder="রুলের নাম লিখুন" 
                            value={newRule.name}
                            onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>রুলের টাইপ</Label>
                          <Select
                            value={newRule.type}
                            onValueChange={(value) => setNewRule({...newRule, type: value as 'recurring' | 'specific'})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="রুলের টাইপ নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="recurring">
                                <div className="flex items-center gap-2">
                                  <CalendarRange className="h-4 w-4" />
                                  <span>পুনরাবৃত্তিমূলক (সাপ্তাহিক)</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="specific">
                                <div className="flex items-center gap-2">
                                  <CalendarDays className="h-4 w-4" />
                                  <span>নির্দিষ্ট তারিখ</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>স্ট্যাটাস</Label>
                          <Select
                            value={newRule.status}
                            onValueChange={(value) => setNewRule({...newRule, status: value as 'available' | 'unavailable'})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">
                                <div className="flex items-center gap-2">
                                  <Check className="h-4 w-4 text-green-600" />
                                  <span>উপলব্ধ</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="unavailable">
                                <div className="flex items-center gap-2">
                                  <Ban className="h-4 w-4 text-red-600" />
                                  <span>অনুপলব্ধ</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>প্রায়োরিটি ({newRule.priority})</Label>
                          <Slider 
                            value={[newRule.priority || 1]} 
                            min={1} 
                            max={10} 
                            step={1}
                            onValueChange={(value) => setNewRule({...newRule, priority: value[0]})}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>কম</span>
                            <span>বেশি</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {newRule.type === 'recurring' ? (
                          <>
                            <div className="space-y-2">
                              <Label>সপ্তাহের দিন</Label>
                              <div className="flex flex-wrap gap-2">
                                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                                  <Button
                                    key={day}
                                    variant={(newRule.daysOfWeek || []).includes(day) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleDayOfWeekToggle(day)}
                                    className="text-xs h-8"
                                  >
                                    {getDayName(day)}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2 pt-2">
                              <div className="flex items-center justify-between">
                                <Label>সময় সীমা সেট করুন</Label>
                                <Switch 
                                  id="use-time-range"
                                  checked={!!newRule.timeRange}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNewRule({...newRule, timeRange: { start: '09:00', end: '18:00' }});
                                    } else {
                                      const { timeRange, ...rest } = newRule;
                                      setNewRule(rest);
                                    }
                                  }}
                                />
                              </div>
                              
                              {newRule.timeRange && (
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                  <div className="space-y-1">
                                    <Label className="text-xs">শুরু</Label>
                                    <Input 
                                      type="time" 
                                      value={newRule.timeRange.start}
                                      onChange={(e) => handleTimeRangeChange('start', e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-xs">শেষ</Label>
                                    <Input 
                                      type="time" 
                                      value={newRule.timeRange.end}
                                      onChange={(e) => handleTimeRangeChange('end', e.target.value)}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="space-y-2">
                            <Label>নির্দিষ্ট তারিখ নির্বাচন করুন</Label>
                            <div className="border rounded-md p-1">
                              <Calendar
                                mode="multiple"
                                selected={selectedDates}
                                onSelect={setSelectedDates}
                                className="rounded-md"
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {selectedDates.length} টি তারিখ নির্বাচন করা হয়েছে
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAddRule(false)}
                      >
                        বাতিল
                      </Button>
                      <Button onClick={handleAddRule}>
                        রুল যোগ করুন
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="space-y-2">
                {availabilityRules.length > 0 ? (
                  <div className="border rounded-md">
                    {availabilityRules.map((rule, index) => (
                      <div key={rule.id} className={`p-4 ${index !== availabilityRules.length - 1 ? 'border-b' : ''}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <Badge variant={rule.status === 'available' ? 'default' : 'destructive'} className="capitalize">
                                {getStatusInBangla(rule.status)}
                              </Badge>
                              <h4 className="font-medium">{rule.name}</h4>
                              <Badge variant="outline">{getTypeInBangla(rule.type)}</Badge>
                            </div>
                            
                            <div className="mt-2 text-sm text-muted-foreground">
                              {rule.type === 'recurring' && rule.daysOfWeek && (
                                <div className="flex items-center gap-2">
                                  <CalendarRange className="h-4 w-4" />
                                  <span>
                                    দিন: {rule.daysOfWeek.map(day => getDayName(day)).join(', ')}
                                    {rule.timeRange && ` (${rule.timeRange.start} - ${rule.timeRange.end})`}
                                  </span>
                                </div>
                              )}
                              
                              {rule.type === 'specific' && rule.specificDates && (
                                <div className="flex items-center gap-2">
                                  <CalendarDays className="h-4 w-4" />
                                  <span>
                                    তারিখ: {rule.specificDates.length} দিন নির্বাচিত
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteRule(rule.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border rounded-md bg-muted/40">
                    <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোন অ্যাভেইলাবিলিটি রুল নেই</p>
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setShowAddRule(true)}
                    >
                      রুল যোগ করুন
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>কালার স্কিম</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">বুকড স্লট কালার</Label>
                        <ColorPicker 
                          color={calendarConfig.appearance.bookedColor}
                          onChange={(color) => handleConfigChange('appearance', 'bookedColor', color)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">অ্যাভেইলেবল স্লট কালার</Label>
                        <ColorPicker 
                          color={calendarConfig.appearance.availableColor}
                          onChange={(color) => handleConfigChange('appearance', 'availableColor', color)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">পেন্ডিং স্লট কালার</Label>
                        <ColorPicker 
                          color={calendarConfig.appearance.pendingColor}
                          onChange={(color) => handleConfigChange('appearance', 'pendingColor', color)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">সিলেক্টেড স্লট কালার</Label>
                        <ColorPicker 
                          color={calendarConfig.appearance.selectedColor}
                          onChange={(color) => handleConfigChange('appearance', 'selectedColor', color)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>টাইম স্লট হাইট ({calendarConfig.appearance.timeSlotHeight}px)</Label>
                    <Slider 
                      value={[calendarConfig.appearance.timeSlotHeight]} 
                      min={20} 
                      max={80} 
                      step={5}
                      onValueChange={(value) => handleConfigChange('appearance', 'timeSlotHeight', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>ছোট (20px)</span>
                      <span>বড় (80px)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>হেডার স্টাইল</Label>
                    <Select
                      value={calendarConfig.appearance.headerStyle}
                      onValueChange={(value) => handleConfigChange('appearance', 'headerStyle', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="হেডার স্টাইল নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">
                          <div className="flex items-center gap-2">
                            <SquareStack className="h-4 w-4" />
                            <span>ক্লাসিক</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="modern">
                          <div className="flex items-center gap-2">
                            <PencilRuler className="h-4 w-4" />
                            <span>মডার্ন</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="minimal">
                          <div className="flex items-center gap-2">
                            <Paintbrush className="h-4 w-4" />
                            <span>মিনিমাল</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ক্যালেন্ডার স্টাইল</Label>
                    <Select
                      value={calendarConfig.appearance.calendarStyle}
                      onValueChange={(value) => handleConfigChange('appearance', 'calendarStyle', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="ক্যালেন্ডার স্টাইল নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">
                          <div className="flex items-center gap-2">
                            <SquareStack className="h-4 w-4" />
                            <span>স্ট্যান্ডার্ড</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bordered">
                          <div className="flex items-center gap-2">
                            <PencilRuler className="h-4 w-4" />
                            <span>বর্ডারড</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="rounded">
                          <div className="flex items-center gap-2">
                            <Paintbrush className="h-4 w-4" />
                            <span>রাউন্ডেড</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="card">
                          <div className="flex items-center gap-2">
                            <SquareStack className="h-4 w-4" />
                            <span>কার্ড</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <div className="border rounded-md p-4 space-y-3">
                      <h4 className="text-sm font-medium">ক্যালেন্ডার উদাহরণ</h4>
                      
                      <div className="border rounded-md p-2 bg-muted/30">
                        <div className="flex justify-between items-center p-2 mb-2">
                          <span className="font-medium">জুলাই ২০২৫</span>
                          <div className="flex gap-1">
                            <Button variant="outline" size="icon" className="h-7 w-7">
                              <CalendarIconBase className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="h-7 w-7">
                              <Users className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1">
                          {['র', 'সো', 'ম', 'বু', 'বৃ', 'শু', 'শ'].map((day, i) => (
                            <div key={i} className="text-center text-xs py-1 text-muted-foreground">
                              {day}
                            </div>
                          ))}
                          
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <div 
                              key={day}
                              className={`
                                text-center text-xs p-1 h-8 rounded-sm flex items-center justify-center
                                ${day % 7 === 0 ? 'bg-red-100 text-red-800' : ''}
                                ${day % 3 === 0 ? 'bg-green-100 text-green-800' : ''}
                                ${day % 5 === 0 ? 'bg-amber-100 text-amber-800' : ''}
                                ${day !== 7 && day !== 3 && day % 5 !== 0 ? 'hover:bg-muted' : ''}
                              `}
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end p-6 pt-0">
            <Button onClick={handleSaveConfig}>পরিবর্তন সেভ করুন</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalCalendarConfiguration;
