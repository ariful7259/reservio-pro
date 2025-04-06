
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users, Plus, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  isJoined: boolean;
  image?: string;
};

const CommunityEvents = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'টেক মিটআপ ২০২৫',
      description: 'স্থানীয় টেক প্রফেশনালদের সাথে নেটওয়ার্কিং ও আইডিয়া শেয়ারিং সেশন',
      date: '১৫ এপ্রিল, ২০২৫',
      time: 'বিকাল ৪:০০',
      location: 'ঢাকা ইনোভেশন হাব',
      category: 'টেকনোলজি',
      attendees: 45,
      maxAttendees: 100,
      isJoined: false,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'আর্টস অ্যান্ড ক্রাফট ওয়ার্কশপ',
      description: 'শিশুদের জন্য হাতে-কলমে ক্রিয়েটিভ আর্টস অ্যান্ড ক্রাফট সেশন',
      date: '২২ এপ্রিল, ২০২৫',
      time: 'সকাল ১১:০০',
      location: 'ধানমন্ডি, ঢাকা',
      category: 'আর্ট',
      attendees: 18,
      maxAttendees: 30,
      isJoined: true,
      image: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?q=80&w=2074&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'কমিউনিটি গার্ডেনিং ডে',
      description: 'স্থানীয় পার্কে গাছ লাগানো ও পরিষ্কার-পরিচ্ছন্নতা কার্যক্রম',
      date: '৩০ এপ্রিল, ২০২৫',
      time: 'সকাল ৮:০০',
      location: 'গুলশান সেন্ট্রাল পার্ক',
      category: 'কমিউনিটি',
      attendees: 28,
      maxAttendees: 50,
      isJoined: false,
      image: 'https://images.unsplash.com/photo-1464638681273-0962e9b53566?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'বিজনেস নেটওয়ার্কিং নাইট',
      description: 'স্থানীয় ব্যবসায়ীদের সাথে নেটওয়ার্কিং ও বিজনেস ডেভেলপমেন্ট',
      date: '১০ মে, ২০২৫',
      time: 'সন্ধ্যা ৭:০০',
      location: 'রেডিসন ব্লু, ঢাকা',
      category: 'বিজনেস',
      attendees: 65,
      maxAttendees: 100,
      isJoined: false,
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleJoinEvent = (eventId: string) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, isJoined: !event.isJoined, attendees: event.isJoined ? event.attendees - 1 : event.attendees + 1 } 
          : event
      )
    );
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      toast({
        title: event.isJoined ? "ইভেন্ট থেকে বের হয়েছেন" : "ইভেন্টে যোগ দিয়েছেন",
        description: event.isJoined 
          ? `আপনি "${event.title}" ইভেন্টে থেকে বের হয়েছেন` 
          : `আপনি সফলভাবে "${event.title}" ইভেন্টে যোগ দিয়েছেন`,
      });
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter((_, index) => index < 3);
  const myEvents = filteredEvents.filter(event => event.isJoined);

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">কমিউনিটি ইভেন্টস</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="ইভেন্ট সার্চ করুন..."
            className="pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">আসন্ন ইভেন্টস</TabsTrigger>
          <TabsTrigger value="my-events">আমার ইভেন্টস</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingEvents.length > 0 ? (
            <>
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  {event.image && (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{event.category}</Badge>
                        <CardTitle>{event.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}, {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendees} জন যোগদান করেছে ({event.maxAttendees - event.attendees} সিট বাকি আছে)</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={event.isJoined ? "w-full bg-green-600 hover:bg-green-700" : "w-full"}
                      onClick={() => toggleJoinEvent(event.id)}
                    >
                      {event.isJoined ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          যোগদান করেছেন
                        </>
                      ) : 'ইভেন্টে যোগ দিন'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/community/events/all')}>
                সকল ইভেন্ট দেখুন
              </Button>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">কোন ইভেন্ট পাওয়া যায়নি</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-events" className="space-y-4">
          {myEvents.length > 0 ? (
            <>
              {myEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  {event.image && (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{event.category}</Badge>
                        <CardTitle>{event.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}, {event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{event.attendees} জন যোগদান করেছে</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full" onClick={() => {}}>
                      বিস্তারিত দেখুন
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => toggleJoinEvent(event.id)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      বাতিল করুন
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">আপনি এখনও কোন ইভেন্টে যোগদান করেননি</p>
              <Button className="mt-4" onClick={() => setActiveTab("upcoming")}>
                ইভেন্ট খুঁজুন
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-20 right-4 rounded-full shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> নতুন ইভেন্ট
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>নতুন কমিউনিটি ইভেন্ট তৈরি করুন</DialogTitle>
            <DialogDescription>
              আপনার কমিউনিটি ইভেন্টের বিবরণ দিন। প্রকাশের পর সবাই দেখতে পাবে।
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">ইভেন্টের নাম</label>
              <Input placeholder="ইভেন্টের শিরোনাম লিখুন" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">বিবরণ</label>
              <Input placeholder="ইভেন্টের বিস্তারিত বিবরণ" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">তারিখ</label>
                <Input placeholder="তারিখ" type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">সময়</label>
                <Input placeholder="সময়" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">স্থান</label>
              <Input placeholder="ইভেন্টের স্থান" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">সর্বাধিক অংশগ্রহণকারী</label>
              <Input placeholder="সর্বাধিক কতজন অংশগ্রহণ করতে পারবে" type="number" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              toast({
                title: "ইভেন্ট তৈরি সফল",
                description: "আপনার ইভেন্টটি সফলভাবে তৈরি করা হয়েছে",
              });
            }}>ইভেন্ট তৈরি করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityEvents;
