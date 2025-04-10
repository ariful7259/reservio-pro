
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Share2,
  Info,
  Clock,
  MapPin,
  ArrowRight,
  CheckSquare,
  ChevronDown,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { mockGroupBookingOptions } from '@/data/mock-group-booking';

const GroupBooking = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [bookingOptions, setBookingOptions] = useState(mockGroupBookingOptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [participants, setParticipants] = useState<{id: string, name: string, email: string}[]>(
    user ? [{id: user.id, name: user.name, email: user.email}] : []
  );
  const [newParticipant, setNewParticipant] = useState({name: '', email: ''});
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const filteredOptions = searchQuery 
    ? bookingOptions.filter(option => 
        option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : bookingOptions;
  
  const selectedOption = selectedService 
    ? bookingOptions.find(option => option.id === selectedService) 
    : null;
  
  const calculateTotalPrice = () => {
    if (!selectedOption) return 0;
    
    let discountFactor = 1.0;
    const participantCount = participants.length;
    
    // Apply bulk discount
    if (participantCount >= 10) {
      discountFactor = 0.85; // 15% discount
    } else if (participantCount >= 5) {
      discountFactor = 0.90; // 10% discount
    } else if (participantCount >= 3) {
      discountFactor = 0.95; // 5% discount
    }
    
    return Math.round(selectedOption.price * participantCount * discountFactor);
  };
  
  const handleAddParticipant = () => {
    if (!newParticipant.name || !newParticipant.email) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "অংশগ্রহণকারীর নাম এবং ইমেইল উভয়ই প্রয়োজন।",
      });
      return;
    }
    
    // Check for duplicate emails
    if (participants.some(p => p.email === newParticipant.email)) {
      toast({
        title: "ডুপ্লিকেট ইমেইল",
        description: "একই ইমেইল দিয়ে একাধিক অংশগ্রহণকারী যোগ করা যাবে না।",
      });
      return;
    }
    
    setParticipants([
      ...participants, 
      {
        id: `participant-${Date.now()}`, 
        name: newParticipant.name, 
        email: newParticipant.email
      }
    ]);
    
    setNewParticipant({name: '', email: ''});
    
    toast({
      title: "অংশগ্রহণকারী যোগ করা হয়েছে",
      description: `${newParticipant.name} কে যোগ করা হয়েছে।`,
    });
  };
  
  const handleRemoveParticipant = (id: string) => {
    // Don't allow removing self if logged in
    if (user && id === user.id) {
      toast({
        title: "অপারেশন সম্ভব নয়",
        description: "আপনি নিজেকে সরাতে পারবেন না।",
      });
      return;
    }
    
    setParticipants(participants.filter(p => p.id !== id));
  };
  
  const handleBookNow = () => {
    if (!selectedService) {
      toast({
        title: "সার্ভিস নির্বাচন করুন",
        description: "দয়া করে একটি সার্ভিস নির্বাচন করুন।",
      });
      return;
    }
    
    if (!date) {
      toast({
        title: "তারিখ নির্বাচন করুন",
        description: "দয়া করে একটি তারিখ নির্বাচন করুন।",
      });
      return;
    }
    
    if (!timeSlot) {
      toast({
        title: "সময় নির্বাচন করুন",
        description: "দয়া করে একটি সময় স্লট নির্বাচন করুন।",
      });
      return;
    }
    
    if (participants.length < 2) {
      toast({
        title: "অংশগ্রহণকারী যোগ করুন",
        description: "গ্রুপ বুকিংয়ের জন্য কমপক্ষে ২ জন অংশগ্রহণকারী প্রয়োজন।",
      });
      return;
    }
    
    setIsPaymentModalOpen(true);
  };
  
  const handleFinalizeBooking = () => {
    // Simulate payment processing
    toast({
      title: "বুকিং সফল হয়েছে",
      description: "আপনার গ্রুপ বুকিং সফলভাবে সম্পন্ন হয়েছে। বিস্তারিত ইমেইলে পাঠানো হবে।",
    });
    
    setIsPaymentModalOpen(false);
    
    // Reset form
    setSelectedService(null);
    setDate(new Date());
    setTimeSlot(null);
    setParticipants(user ? [{id: user.id, name: user.name, email: user.email}] : []);
  };
  
  const formatDateToBangla = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('bn-BD', options).format(date);
  };
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">গ্রুপ বুকিং</h1>
        <p className="text-muted-foreground mt-1">
          একসাথে অনেকের জন্য সার্ভিস বুক করে বাড়তি ডিসকাউন্ট পান
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6 border p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="সার্ভিস খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredOptions.map(option => (
                <Card 
                  key={option.id} 
                  className={cn(
                    "cursor-pointer hover:shadow-md transition-all", 
                    selectedService === option.id ? "border-primary" : ""
                  )}
                  onClick={() => setSelectedService(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge className="mb-2">{option.category}</Badge>
                      <h3 className="font-semibold">{option.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span className="font-semibold">৳{option.price}</span> / জন
                      </div>
                      {option.discount > 0 && (
                        <Badge variant="outline" className="bg-green-50 text-green-600">
                          {option.discount}% ছাড়
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredOptions.length === 0 && (
                <div className="col-span-full text-center py-8 bg-muted rounded-lg">
                  <p className="text-muted-foreground">কোন সার্ভিস পাওয়া যায়নি।</p>
                </div>
              )}
            </div>
          </div>
          
          {selectedService && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">বুকিং বিবরণ</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-sm font-medium">তারিখ নির্বাচন করুন</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? formatDateToBangla(date) : "তারিখ নির্বাচন করুন"}
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
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <h3 className="text-sm font-medium">সময় নির্বাচন করুন</h3>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Select onValueChange={setTimeSlot}>
                      <SelectTrigger>
                        <SelectValue placeholder="সময় নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">সকাল ০৯:০০</SelectItem>
                        <SelectItem value="11:00">সকাল ১১:০০</SelectItem>
                        <SelectItem value="13:00">দুপুর ০১:০০</SelectItem>
                        <SelectItem value="15:00">বিকাল ০৩:০০</SelectItem>
                        <SelectItem value="17:00">বিকাল ০৫:০০</SelectItem>
                        <SelectItem value="19:00">সন্ধ্যা ০৭:০০</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <h3 className="font-semibold">অংশগ্রহণকারী যোগ করুন</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Label htmlFor="name" className="mb-2 block">নাম</Label>
                        <Input 
                          id="name" 
                          value={newParticipant.name}
                          onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                          placeholder="অংশগ্রহণকারীর নাম"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="email" className="mb-2 block">ইমেইল</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={newParticipant.email}
                          onChange={(e) => setNewParticipant({...newParticipant, email: e.target.value})}
                          placeholder="example@mail.com"
                        />
                      </div>
                      <Button onClick={handleAddParticipant}>
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">যোগ করুন</span>
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg">
                      <div className="p-3 border-b bg-muted/50 flex justify-between">
                        <div className="font-medium">অংশগ্রহণকারী তালিকা</div>
                        <div className="text-sm">{participants.length} জন</div>
                      </div>
                      <div className="divide-y">
                        {participants.length > 0 ? (
                          participants.map(participant => (
                            <div key={participant.id} className="flex items-center justify-between p-3">
                              <div>
                                <div className="font-medium">{participant.name}</div>
                                <div className="text-sm text-muted-foreground">{participant.email}</div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleRemoveParticipant(participant.id)}
                              >
                                <Minus className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">সরান</span>
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-center text-muted-foreground">
                            কোন অংশগ্রহণকারী যোগ করা হয়নি
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Accordion type="single" collapsible className="mb-6">
                <AccordionItem value="faq">
                  <AccordionTrigger>গ্রুপ বুকিং সম্পর্কিত প্রশ্নোত্তর</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">গ্রুপ বুকিং কেন করবেন?</h4>
                        <p className="text-sm text-muted-foreground">
                          গ্রুপ বুকিং আপনাকে একসাথে বেশ কয়েকজনের জন্য সার্ভিস বুক করতে দেয়। এতে আপনি মোট মূল্যের উপর ছাড় পাবেন।
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">ছাড় কত?</h4>
                        <p className="text-sm text-muted-foreground">
                          ৩-৪ জনের জন্য ৫%, ৫-৯ জনের জন্য ১০%, এবং ১০ জন বা তার বেশি হলে ১৫% ছাড়।
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">বুকিং কিভাবে বাতিল করা যাবে?</h4>
                        <p className="text-sm text-muted-foreground">
                          বুকিং করার ৪৮ ঘন্টা আগে পর্যন্ত সম্পূর্ণ রিফান্ড পাবেন। ২৪-৪৮ ঘন্টার মধ্যে বাতিল করলে ৫০% রিফান্ড। এরপর কোন রিফান্ড নেই।
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
        
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <h2 className="font-semibold">অর্ডার সারাংশ</h2>
            </CardHeader>
            <CardContent className="pb-0">
              {selectedOption ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{selectedOption.title}</h3>
                    <Badge>{selectedOption.category}</Badge>
                  </div>
                  
                  {date && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDateToBangla(date)}</span>
                    </div>
                  )}
                  
                  {timeSlot && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{timeSlot}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{participants.length} জন</span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">মূল খরচ</span>
                      <span>৳{selectedOption.price} × {participants.length}</span>
                    </div>
                    
                    {participants.length >= 3 && (
                      <div className="flex justify-between mb-2 text-green-600">
                        <span>গ্রুপ ডিসকাউন্ট</span>
                        <span>
                          {participants.length >= 10 ? '-১৫%' : 
                           participants.length >= 5 ? '-১০%' : '-৫%'}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t">
                      <span>সর্বমোট</span>
                      <span>৳{calculateTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-muted-foreground">
                  <Info className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>দয়া করে একটি সার্ভিস নির্বাচন করুন</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-4">
              <Button 
                className="w-full"
                disabled={!selectedService || !date || !timeSlot || participants.length < 2}
                onClick={handleBookNow}
              >
                বুক করুন
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <h3 className="font-semibold">গ্রুপ বুকিং সুবিধা</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <CheckSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">সময় সাশ্রয়</p>
                  <p className="text-sm text-muted-foreground">
                    সবার জন্য একসাথে বুকিং করে সময় বাঁচান
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <CheckSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">বাড়তি ডিসকাউন্ট</p>
                  <p className="text-sm text-muted-foreground">
                    বেশি সংখ্যক অংশগ্রহণকারী = বেশি ছাড়
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <CheckSquare className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">নিশ্চিত সার্ভিস</p>
                  <p className="text-sm text-muted-foreground">
                    আপনার গ্রুপের সবার জন্য একই সময়ে সার্ভিস
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <h2 className="font-semibold text-xl">পেমেন্ট করুন</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="font-medium">{selectedOption?.title}</h3>
                  <div className="text-sm text-muted-foreground">{participants.length} জন</div>
                  <div className="mt-2 font-bold">মোট: ৳{calculateTotalPrice()}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">পেমেন্ট মেথড</label>
                  <Select defaultValue="card">
                    <SelectTrigger>
                      <SelectValue placeholder="পেমেন্ট মেথড নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">ক্রেডিট/ডেবিট কার্ড</SelectItem>
                      <SelectItem value="bkash">বিকাশ</SelectItem>
                      <SelectItem value="nagad">নগদ</SelectItem>
                      <SelectItem value="rocket">রকেট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">কার্ড নম্বর</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">মেয়াদ</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <Input placeholder="123" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={handleFinalizeBooking}>
                ৳{calculateTotalPrice()} পেমেন্ট করুন
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                বাতিল
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GroupBooking;
