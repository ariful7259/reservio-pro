
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Users, Calendar, MapPin, Clock, Percent, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

type GroupBookingOffer = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  minGroupSize: number;
  maxGroupSize: number;
  discountPercent: number;
  date: string;
  time: string;
  location: string;
  currentParticipants: number;
  image?: string;
  isJoined: boolean;
};

const GroupBooking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ongoing');
  
  const [groupOffers, setGroupOffers] = useState<GroupBookingOffer[]>([
    {
      id: '1',
      title: 'ফ্যামিলি ডিনার প্যাকেজ',
      description: 'পাঁচ জন বা তার বেশি লোক জয়েন করলে ৩০% ডিসকাউন্ট',
      category: 'রেস্টুরেন্ট',
      price: 2500,
      minGroupSize: 5,
      maxGroupSize: 10,
      discountPercent: 30,
      date: '১০ এপ্রিল, ২০২৫',
      time: 'সন্ধ্যা ৭:০০',
      location: 'গুলশান, ঢাকা',
      currentParticipants: 3,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
      isJoined: false,
    },
    {
      id: '2',
      title: 'রাফটিং এডভেঞ্চার টুর',
      description: 'একসাথে ৮ জন বুকিং করলে জনপ্রতি ২০% ডিসকাউন্ট',
      category: 'অ্যাডভেঞ্চার',
      price: 3500,
      minGroupSize: 8,
      maxGroupSize: 15,
      discountPercent: 20,
      date: '২০ এপ্রিল, ২০২৫',
      time: 'সকাল ৯:০০',
      location: 'সিলেট, বাংলাদেশ',
      currentParticipants: 6,
      image: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?q=80&w=1972&auto=format&fit=crop',
      isJoined: true,
    },
    {
      id: '3',
      title: 'কারপুল সার্ভিস',
      description: '৪ জন একসাথে যাত্রা করলে জনপ্রতি ৪০% কম ভাড়া',
      category: 'ট্রান্সপোর্ট',
      price: 800,
      minGroupSize: 4,
      maxGroupSize: 4,
      discountPercent: 40,
      date: '৫ এপ্রিল, ২০২৫',
      time: 'সকাল ৮:০০',
      location: 'মিরপুর - বনানী',
      currentParticipants: 2,
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
      isJoined: false,
    },
    {
      id: '4',
      title: 'কোচিং সেশন - প্রোগ্রামিং',
      description: 'গ্রুপে ১০+ জন জয়েন করলে জনপ্রতি ৩৫% ডিসকাউন্ট',
      category: 'শিক্ষা',
      price: 5000,
      minGroupSize: 10,
      maxGroupSize: 20,
      discountPercent: 35,
      date: '১৫ এপ্রিল, ২০২৫',
      time: 'বিকাল ৪:০০',
      location: 'অনলাইন',
      currentParticipants: 8,
      image: 'https://images.unsplash.com/photo-1605711285791-0219e80e43a3?q=80&w=1969&auto=format&fit=crop',
      isJoined: false,
    }
  ]);

  const toggleJoinGroup = (offerId: string) => {
    setGroupOffers(prevOffers => 
      prevOffers.map(offer => {
        if (offer.id === offerId) {
          const newJoinedState = !offer.isJoined;
          return { 
            ...offer, 
            isJoined: newJoinedState,
            currentParticipants: newJoinedState 
              ? offer.currentParticipants + 1 
              : offer.currentParticipants - 1
          };
        }
        return offer;
      })
    );
    
    const offer = groupOffers.find(o => o.id === offerId);
    if (offer) {
      toast({
        title: offer.isJoined ? "গ্রুপ থেকে বের হয়েছেন" : "গ্রুপে যোগ দিয়েছেন",
        description: offer.isJoined 
          ? `আপনি "${offer.title}" গ্রুপ থেকে বের হয়েছেন` 
          : `আপনি সফলভাবে "${offer.title}" গ্রুপে যোগ দিয়েছেন`,
      });
    }
  };

  const filteredOffers = groupOffers.filter(offer => 
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ongoingOffers = filteredOffers.filter(offer => new Date(offer.date) >= new Date());
  const myOffers = filteredOffers.filter(offer => offer.isJoined);

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
        <h1 className="text-xl font-semibold">গ্রুপ বুকিং</h1>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="গ্রুপ অফার সার্চ করুন..."
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

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant={activeTab === 'ongoing' ? 'default' : 'outline'}
          className="w-full"
          onClick={() => setActiveTab('ongoing')}
        >
          চলমান অফার
        </Button>
        <Button
          variant={activeTab === 'my-groups' ? 'default' : 'outline'}
          className="w-full"
          onClick={() => setActiveTab('my-groups')}
        >
          আমার গ্রুপ
        </Button>
      </div>

      <div className="space-y-4">
        {activeTab === 'ongoing' && (
          <>
            {ongoingOffers.length > 0 ? (
              ongoingOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden">
                  {offer.image && (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{offer.category}</Badge>
                        <CardTitle>{offer.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        <Percent className="h-3 w-3 mr-1" />
                        {offer.discountPercent}% ছাড়
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{offer.date}, {offer.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{offer.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>
                          {offer.currentParticipants}/{offer.minGroupSize} জন জয়েন করেছে 
                          (আরও {offer.minGroupSize - offer.currentParticipants} জন প্রয়োজন)
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>গ্রুপ পূরণ</span>
                        <span>{Math.round((offer.currentParticipants / offer.minGroupSize) * 100)}%</span>
                      </div>
                      <Progress value={(offer.currentParticipants / offer.minGroupSize) * 100} className="h-2" />
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground">মূল্য:</span>
                        <span className="font-semibold ml-1">৳{offer.price}/জন</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">গ্রুপ ছাড়ে:</span>
                        <span className="font-semibold text-green-600 ml-1">
                          ৳{Math.round(offer.price - (offer.price * offer.discountPercent / 100))}/জন
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={offer.isJoined ? "w-full bg-green-600 hover:bg-green-700" : "w-full"}
                      onClick={() => toggleJoinGroup(offer.id)}
                    >
                      {offer.isJoined ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          জয়েন করেছেন
                        </>
                      ) : 'গ্রুপে জয়েন করুন'}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">কোন চলমান অফার পাওয়া যায়নি</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'my-groups' && (
          <>
            {myOffers.length > 0 ? (
              myOffers.map((offer) => (
                <Card key={offer.id} className="overflow-hidden">
                  {offer.image && (
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2">{offer.category}</Badge>
                        <CardTitle>{offer.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{offer.date}, {offer.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{offer.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span>
                          {offer.currentParticipants}/{offer.minGroupSize} জন জয়েন করেছে
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>গ্রুপ পূরণ</span>
                        <span>{Math.round((offer.currentParticipants / offer.minGroupSize) * 100)}%</span>
                      </div>
                      <Progress value={(offer.currentParticipants / offer.minGroupSize) * 100} className="h-2" />
                    </div>
                    <div className="mt-3 flex justify-between">
                      <div>
                        <span className="text-sm text-green-600 font-medium">আপনার দাম:</span>
                        <span className="font-semibold text-green-600 ml-1">
                          ৳{Math.round(offer.price - (offer.price * offer.discountPercent / 100))}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button className="w-1/2" variant="outline" onClick={() => {}}>
                      <Users className="mr-2 h-4 w-4" /> গ্রুপের সদস্য
                    </Button>
                    <Button 
                      className="w-1/2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                      variant="outline"
                      onClick={() => toggleJoinGroup(offer.id)}
                    >
                      গ্রুপ ছাড়ুন
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">আপনি এখনও কোন গ্রুপে জয়েন করেননি</p>
                <Button className="mt-4" onClick={() => setActiveTab('ongoing')}>
                  গ্রুপ খুঁজুন
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="fixed bottom-20 right-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg">
              <Plus className="mr-2 h-4 w-4" /> নতুন গ্রুপ তৈরি
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন গ্রুপ বুকিং তৈরি করুন</DialogTitle>
              <DialogDescription>
                একাধিক ব্যক্তি একত্রিত হয়ে আকর্ষণীয় ডিসকাউন্ট পেতে গ্রুপ বুকিং তৈরি করুন।
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">টাইটেল</label>
                <Input placeholder="গ্রুপ বুকিং শিরোনাম" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">বিবরণ</label>
                <Input placeholder="বিস্তারিত বিবরণ" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ক্যাটেগরি</label>
                <Input placeholder="যেমন: রেস্টুরেন্ট, ট্রানস্পোর্ট, ইভেন্ট" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">মূল্য (প্রতি জন)</label>
                  <Input placeholder="৳" type="number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ছাড় (%)</label>
                  <Input placeholder="%" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ন্যূনতম গ্রুপ সাইজ</label>
                  <Input placeholder="কত জন" type="number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">সর্বাধিক গ্রুপ সাইজ</label>
                  <Input placeholder="কত জন" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">তারিখ</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">সময়</label>
                  <Input type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">লোকেশন</label>
                <Input placeholder="স্থান" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => {
                toast({
                  title: "গ্রুপ বুকিং তৈরি সফল",
                  description: "আপনার গ্রুপ বুকিং অফারটি সফলভাবে তৈরি করা হয়েছে",
                });
              }}>গ্রুপ বুকিং তৈরি করুন</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GroupBooking;
