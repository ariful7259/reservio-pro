
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Plus, Heart, Share2, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { mockEvents } from '@/data/mock-events';

const EventCalendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState(mockEvents);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: '',
    location: '',
    category: '',
    maxAttendees: ''
  });
  
  const filteredEvents = events.filter(event => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return new Date(event.date) >= new Date();
    if (activeTab === 'attending') return event.attendees.some(a => user && a.id === user.id);
    if (activeTab === 'created' && user) return event.createdBy.id === user.id;
    if (activeTab === 'nearby') return event.isNearby;
    return true;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('bn-BD', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    }).format(date);
  };
  
  const handleEvent = (eventId: string, action: 'join' | 'leave') => {
    if (!user) {
      toast({
        title: "লগইন করুন",
        description: "ইভেন্টে যোগদান করতে লগইন করুন।",
      });
      return;
    }
    
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        if (action === 'join') {
          // Check if capacity full
          if (event.attendees.length >= event.maxAttendees) {
            toast({
              title: "ইভেন্ট ফুল",
              description: "দুঃখিত, এই ইভেন্টে আর কোন স্পেস নেই।",
            });
            return event;
          }
          
          // Add user to attendees
          if (!event.attendees.some(a => a.id === user.id)) {
            toast({
              title: "সফল",
              description: "আপনি ইভেন্টে সফলভাবে যোগদান করেছেন।",
            });
            return {
              ...event,
              attendees: [...event.attendees, {
                id: user.id,
                name: user.name,
                avatar: user.avatar || 'https://i.pravatar.cc/150?img=1'
              }]
            };
          }
        } else {
          // Remove user from attendees
          toast({
            title: "সফল",
            description: "আপনি ইভেন্ট থেকে বের হয়েছেন।",
          });
          return {
            ...event,
            attendees: event.attendees.filter(a => a.id !== user?.id)
          };
        }
      }
      return event;
    }));
  };
  
  const handleCreateEvent = () => {
    if (!user) {
      toast({
        title: "লগইন করুন",
        description: "ইভেন্ট তৈরি করতে লগইন করুন।",
      });
      return;
    }
    
    const event = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date.toISOString(),
      time: newEvent.time,
      location: newEvent.location,
      category: newEvent.category,
      maxAttendees: parseInt(newEvent.maxAttendees),
      createdBy: {
        id: user.id,
        name: user.name,
        avatar: user.avatar || 'https://i.pravatar.cc/150?img=1'
      },
      attendees: [{
        id: user.id,
        name: user.name,
        avatar: user.avatar || 'https://i.pravatar.cc/150?img=1'
      }],
      isNearby: true,
      isFeatured: false
    };
    
    setEvents([event, ...events]);
    
    toast({
      title: "ইভেন্ট তৈরি হয়েছে",
      description: "আপনার ইভেন্ট সফলভাবে তৈরি হয়েছে।",
    });
    
    setIsCreateModalOpen(false);
    setNewEvent({
      title: '',
      description: '',
      date: new Date(),
      time: '',
      location: '',
      category: '',
      maxAttendees: ''
    });
  };
  
  const handleShare = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      toast({
        title: "শেয়ারিং সাপোর্ট নেই",
        description: "আপনার ডিভাইসে শেয়ারিং সাপোর্ট নেই।",
      });
    }
  };
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">ইভেন্ট ক্যালেন্ডার</h1>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
            <Filter className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">সব ইভেন্ট</TabsTrigger>
              <TabsTrigger value="upcoming" className="flex-1">আপকামিং</TabsTrigger>
              <TabsTrigger value="attending" className="flex-1">অংশগ্রহণকৃত</TabsTrigger>
              <TabsTrigger value="created" className="flex-1">আমার ইভেন্ট</TabsTrigger>
              <TabsTrigger value="nearby" className="flex-1">নিকটবর্তী</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            onClick={() => setIsCreateModalOpen(true)} 
            className="w-full mb-6 gap-2"
          >
            <Plus className="h-5 w-5" />
            নতুন ইভেন্ট তৈরি করুন
          </Button>
          
          {isFiltersOpen && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">ক্যাটাগরি</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="সব ক্যাটাগরি" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                        <SelectItem value="social">সামাজিক</SelectItem>
                        <SelectItem value="education">এডুকেশনাল</SelectItem>
                        <SelectItem value="business">ব্যবসা</SelectItem>
                        <SelectItem value="technology">টেকনোলজি</SelectItem>
                        <SelectItem value="entertainment">বিনোদন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">লোকেশন</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="সব লোকেশন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">সব লোকেশন</SelectItem>
                        <SelectItem value="dhaka">ঢাকা</SelectItem>
                        <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                        <SelectItem value="sylhet">সিলেট</SelectItem>
                        <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                        <SelectItem value="khulna">খুলনা</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">অংশগ্রহণ</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="সব" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">সব</SelectItem>
                        <SelectItem value="free">ফ্রি</SelectItem>
                        <SelectItem value="paid">পেইড</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => {
                const isAttending = user ? event.attendees.some(a => a.id === user.id) : false;
                const isCreator = user ? event.createdBy.id === user.id : false;
                const isFull = event.attendees.length >= event.maxAttendees;
                
                return (
                  <Card key={event.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {event.isFeatured && (
                              <Badge variant="secondary">ফিচার্ড</Badge>
                            )}
                            <Badge>{event.category}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                        </div>
                        <div className="flex flex-col gap-1 sm:items-end">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-4">
                      <p className="mb-4">{event.description}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {event.attendees.length}/{event.maxAttendees} জন অংশগ্রহণকারী
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium mb-2">আয়োজক</div>
                        <div className="flex items-center gap-2">
                          <img 
                            src={event.createdBy.avatar} 
                            alt={event.createdBy.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <span>{event.createdBy.name}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0 flex flex-wrap gap-2 justify-between border-t mt-4">
                      <div className="flex gap-2">
                        {isCreator ? (
                          <Button variant="outline">
                            ইভেন্ট এডিট করুন
                          </Button>
                        ) : isAttending ? (
                          <Button 
                            variant="outline" 
                            onClick={() => handleEvent(event.id, 'leave')}
                          >
                            ইভেন্ট ছেড়ে যান
                          </Button>
                        ) : (
                          <Button 
                            disabled={isFull}
                            onClick={() => handleEvent(event.id, 'join')}
                          >
                            {isFull ? 'সিট ফুল' : 'যোগ দিন'}
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setEvents(prevEvents => 
                              prevEvents.map(e => 
                                e.id === event.id ? {...e, isSaved: !e.isSaved} : e
                              )
                            );
                          }}
                        >
                          <Heart className={`h-5 w-5 ${event.isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleShare(event.id)}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">কোন ইভেন্ট পাওয়া যায়নি।</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  প্রথম ইভেন্ট তৈরি করুন
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">ক্যালেন্ডার</h3>
          <CalendarComponent
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border mb-4"
          />
          
          <div>
            <h3 className="text-lg font-semibold mb-4">আজকের ইভেন্ট</h3>
            <div className="space-y-3">
              {events
                .filter(event => {
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  return eventDate.getDate() === today.getDate() &&
                    eventDate.getMonth() === today.getMonth() &&
                    eventDate.getFullYear() === today.getFullYear();
                })
                .map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardContent className="p-3">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees.length}/{event.maxAttendees}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              
              {events.filter(event => {
                const eventDate = new Date(event.date);
                const today = new Date();
                return eventDate.getDate() === today.getDate() &&
                  eventDate.getMonth() === today.getMonth() &&
                  eventDate.getFullYear() === today.getFullYear();
              }).length === 0 && (
                <div className="text-center py-6 bg-muted rounded-lg">
                  <p className="text-muted-foreground">আজ কোন ইভেন্ট নেই।</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>নতুন ইভেন্ট তৈরি করুন</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium mb-2">ইভেন্টের নাম</label>
              <Input 
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="ইভেন্টের একটি আকর্ষণীয় নাম দিন"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">বিবরণ</label>
              <Textarea 
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="ইভেন্ট সম্পর্কে বিস্তারিত লিখুন"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">তারিখ</label>
                <CalendarComponent
                  mode="single"
                  selected={newEvent.date}
                  onSelect={(date) => date && setNewEvent({...newEvent, date})}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">সময়</label>
                <Input 
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                />
                
                <label className="block text-sm font-medium mb-2 mt-4">ক্যাটাগরি</label>
                <Select 
                  onValueChange={(value) => setNewEvent({...newEvent, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="সামাজিক">সামাজিক</SelectItem>
                    <SelectItem value="এডুকেশনাল">এডুকেশনাল</SelectItem>
                    <SelectItem value="ব্যবসা">ব্যবসা</SelectItem>
                    <SelectItem value="টেকনোলজি">টেকনোলজি</SelectItem>
                    <SelectItem value="বিনোদন">বিনোদন</SelectItem>
                  </SelectContent>
                </Select>
                
                <label className="block text-sm font-medium mb-2 mt-4">সর্বাধিক অংশগ্রহণকারী</label>
                <Input 
                  type="number"
                  value={newEvent.maxAttendees}
                  onChange={(e) => setNewEvent({...newEvent, maxAttendees: e.target.value})}
                  placeholder="সর্বোচ্চ কতজন অংশগ্রহণ করতে পারবে"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">স্থান</label>
              <Input 
                value={newEvent.location}
                onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                placeholder="ইভেন্টের স্থান লিখুন"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
            >
              বাতিল
            </Button>
            <Button onClick={handleCreateEvent}>
              ইভেন্ট তৈরি করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCalendar;
