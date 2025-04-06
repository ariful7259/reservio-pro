
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays, isWithinInterval } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, Filter, MoreVertical, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sample rental data types
interface RentalEvent {
  id: string;
  itemId: string;
  itemName: string;
  customerName: string;
  customerPhone: string;
  status: 'upcoming' | 'active' | 'completed' | 'returned' | 'cancelled';
  startDate: Date;
  endDate: Date;
  price: number;
  deposit: number;
  image?: string;
}

// Sample data
const rentalEvents: RentalEvent[] = [
  {
    id: 'R1001',
    itemId: 'I2001',
    itemName: 'ক্যানন ডিএসএলআর ক্যামেরা',
    customerName: 'আবদুল্লাহ আল মামুন',
    customerPhone: '01712345678',
    status: 'upcoming',
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 3),
    price: 1500,
    deposit: 5000,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'R1002',
    itemId: 'I3045',
    itemName: 'ডেল XPS ল্যাপটপ',
    customerName: 'সুমাইয়া আক্তার',
    customerPhone: '01812345678',
    status: 'active',
    startDate: addDays(new Date(), -2),
    endDate: addDays(new Date(), 5),
    price: 2500,
    deposit: 10000,
    image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'R1003',
    itemId: 'I4089',
    itemName: 'পোর্টেবল প্রজেক্টর',
    customerName: 'রাফি আহমেদ',
    customerPhone: '01912345678',
    status: 'completed',
    startDate: addDays(new Date(), -5),
    endDate: addDays(new Date(), -1),
    price: 1200,
    deposit: 3000,
    image: 'https://images.unsplash.com/photo-1576637988877-51620f243dbe?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'R1004',
    itemId: 'I5034',
    itemName: 'সোফা সেট',
    customerName: 'নাফিসা ইসলাম',
    customerPhone: '01612345678',
    status: 'returned',
    startDate: addDays(new Date(), -10),
    endDate: addDays(new Date(), -3),
    price: 4500,
    deposit: 8000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'R1005',
    itemId: 'I6099',
    itemName: 'টয়োটা কোরোলা',
    customerName: 'তানভীর হোসেন',
    customerPhone: '01512345678',
    status: 'cancelled',
    startDate: addDays(new Date(), -2),
    endDate: addDays(new Date(), 1),
    price: 5000,
    deposit: 15000,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=200&auto=format&fit=crop'
  },
];

const statusColors: Record<string, string> = {
  upcoming: 'bg-blue-100 text-blue-600',
  active: 'bg-green-100 text-green-600',
  completed: 'bg-purple-100 text-purple-600',
  returned: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-600'
};

const statusLabels: Record<string, string> = {
  upcoming: 'আসন্ন',
  active: 'চলমান',
  completed: 'সম্পন্ন',
  returned: 'ফেরত',
  cancelled: 'বাতিল'
};

interface OwnerDashboardTimelineProps {
  showFilters?: boolean;
}

const OwnerDashboardTimeline: React.FC<OwnerDashboardTimelineProps> = ({ 
  showFilters = true 
}) => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [openEventId, setOpenEventId] = useState<string | null>(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState<boolean>(false);
  
  const filteredEvents = filterStatus === 'all' 
    ? rentalEvents 
    : rentalEvents.filter(event => event.status === filterStatus);
  
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    // Sort by status priority first
    const statusPriority = { active: 1, upcoming: 2, completed: 3, returned: 4, cancelled: 5 };
    const statusDiff = statusPriority[a.status] - statusPriority[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    // Then by date
    return a.startDate.getTime() - b.startDate.getTime();
  });
  
  const toggleEventDetails = (eventId: string) => {
    setOpenEventId(openEventId === eventId ? null : eventId);
  };

  const getEventDateStatus = (event: RentalEvent) => {
    const today = new Date();
    if (event.status === 'cancelled') {
      return 'বাতিল করা হয়েছে';
    }
    if (event.status === 'returned') {
      return `${format(event.startDate, 'dd/MM/yy')} - ${format(event.endDate, 'dd/MM/yy')}`;
    }
    if (isWithinInterval(today, { start: event.startDate, end: event.endDate })) {
      const daysLeft = Math.ceil((event.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `${daysLeft} দিন বাকি`;
    }
    if (today < event.startDate) {
      const daysToStart = Math.ceil((event.startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `${daysToStart} দিন পরে শুরু`;
    }
    return `${format(event.startDate, 'dd/MM/yy')} - ${format(event.endDate, 'dd/MM/yy')}`;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>রেন্টাল ম্যানেজমেন্ট</CardTitle>
          <Tabs value={view} onValueChange={(v) => setView(v as 'list' | 'calendar')} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">লিস্ট ভিউ</TabsTrigger>
              <TabsTrigger value="calendar">ক্যালেন্ডার</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showFilters && (
          <Collapsible open={isFilterExpanded} onOpenChange={setIsFilterExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1 mb-4 w-full">
                <Filter className="h-4 w-4 mr-2" />
                ফিল্টার
                {isFilterExpanded ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/50 rounded-md">
                <div>
                  <label className="text-sm font-medium mb-1 block">স্ট্যাটাস ফিল্টার</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="upcoming">আসন্ন</SelectItem>
                      <SelectItem value="active">চলমান</SelectItem>
                      <SelectItem value="completed">সম্পন্ন</SelectItem>
                      <SelectItem value="returned">ফেরত</SelectItem>
                      <SelectItem value="cancelled">বাতিল</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">সময়সীমা</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="সময়সীমা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব সময়</SelectItem>
                      <SelectItem value="today">আজ</SelectItem>
                      <SelectItem value="this-week">এই সপ্তাহ</SelectItem>
                      <SelectItem value="this-month">এই মাস</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
        
        <TabsContent value="list" className="m-0 space-y-2">
          {sortedEvents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>কোন রেন্টাল ডাটা পাওয়া যায়নি</p>
            </div>
          ) : (
            sortedEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex border-b cursor-pointer" onClick={() => toggleEventDetails(event.id)}>
                    <div className="w-[80px] h-[80px]">
                      {event.image && (
                        <img 
                          src={event.image} 
                          alt={event.itemName} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{event.itemName}</h3>
                        <Badge className={statusColors[event.status]}>
                          {statusLabels[event.status]}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">আইডি: {event.id}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {getEventDateStatus(event)}
                        </div>
                        <p className="text-sm font-medium">৳{event.price}/দিন</p>
                      </div>
                    </div>
                    <div className="p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>বিস্তারিত দেখুন</DropdownMenuItem>
                          {event.status === 'upcoming' && (
                            <>
                              <DropdownMenuItem>সময় পরিবর্তন</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">বাতিল করুন</DropdownMenuItem>
                            </>
                          )}
                          {event.status === 'active' && (
                            <DropdownMenuItem>রিটার্ন প্রসেস করুন</DropdownMenuItem>
                          )}
                          {event.status === 'completed' && (
                            <DropdownMenuItem>রিভিউ দেখুন</DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>কাস্টমার কন্টাক্ট</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <Collapsible open={openEventId === event.id}>
                    <CollapsibleContent>
                      <div className="p-3 bg-muted/30">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-muted-foreground">কাস্টমার</p>
                            <p>{event.customerName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">ফোন</p>
                            <p>{event.customerPhone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">শুরুর তারিখ</p>
                            <p>{format(event.startDate, "dd/MM/yyyy")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">শেষের তারিখ</p>
                            <p>{format(event.endDate, "dd/MM/yyyy")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">মোট রেন্ট</p>
                            <p className="font-medium">৳{event.price.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">সিকিউরিটি ডিপোজিট</p>
                            <p className="font-medium">৳{event.deposit.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm" className="w-full">
                            বিস্তারিত দেখুন
                          </Button>
                          <Button size="sm" className="w-full">
                            কাস্টমার কন্টাক্ট
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="calendar" className="m-0">
          <div className="space-y-4">
            <Calendar
              mode="range"
              selected={{
                from: new Date(),
                to: addDays(new Date(), 7),
              }}
              className="p-3 pointer-events-auto"
            />
            
            <div className="space-y-2">
              <h3 className="font-medium">আপকামিং রেন্টালস</h3>
              <div className="space-y-2">
                {sortedEvents
                  .filter(event => event.status === 'upcoming' || event.status === 'active')
                  .map(event => (
                    <div key={event.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        {event.image && (
                          <img 
                            src={event.image} 
                            alt={event.itemName} 
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium">{event.itemName}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(event.startDate, "dd/MM/yyyy")} - {format(event.endDate, "dd/MM/yyyy")}
                          </p>
                        </div>
                      </div>
                      <Badge className={statusColors[event.status]}>
                        {statusLabels[event.status]}
                      </Badge>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default OwnerDashboardTimeline;
