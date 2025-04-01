
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Users, 
  Shield, 
  MessageSquare, 
  FileText, 
  CalendarDays,
  Crown,
  UserPlus,
  Bell,
  Settings,
  Lock,
  CheckCircle,
  Clock,
  ExternalLink,
  Video,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const PaidCommunity = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [subscriptionTier, setSubscriptionTier] = useState('basic');
  
  const membershipTiers = [
    {
      id: 'basic',
      name: 'বেসিক',
      price: '৩৯৯/মাস',
      features: [
        'জেনারেল ডিসকাশন ফোরাম',
        'সাপ্তাহিক কমিউনিটি ইভেন্ট',
        'বেসিক মেম্বারশিপ ব্যাজ',
        'মেম্বারদের ডাইরেক্টরি',
      ],
      color: 'bg-blue-500',
      members: 248,
      recommended: false
    },
    {
      id: 'pro',
      name: 'প্রফেশনাল',
      price: '৭৯৯/মাস',
      features: [
        'সমস্ত বেসিক ফিচার',
        'মাসিক লাইভ Q&A সেশন',
        'এক্সক্লুসিভ কনটেন্ট লাইব্রেরি',
        'গ্রুপ মেন্টরশিপ সেশন',
        'প্রফেশনাল নেটওয়ার্কিং',
      ],
      color: 'bg-purple-500',
      members: 156,
      recommended: true
    },
    {
      id: 'vip',
      name: 'VIP মেম্বার',
      price: '১,৪৯৯/মাস',
      features: [
        'সমস্ত প্রফেশনাল ফিচার',
        'মাসিক ১:১ মেন্টরশিপ সেশন',
        'প্রায়োরিটি সাপোর্ট',
        'কমিউনিটি ডেসিশনে ভোটিং রাইট',
        'VIP মেম্বার ডিরেক্টরি',
        'এক্সক্লুসিভ ওয়ার্কশপ',
      ],
      color: 'bg-amber-500',
      members: 72,
      recommended: false
    },
  ];
  
  const createCommunitySteps = [
    {
      title: "কমিউনিটি সেটআপ",
      description: "আপনার কমিউনিটির নাম, ডেসক্রিপশন এবং কভার ইমেজ সেট করুন।",
      completed: true
    },
    {
      title: "মেম্বারশিপ টায়ার তৈরি",
      description: "বিভিন্ন মূল্যের এবং সুবিধার মেম্বারশিপ প্ল্যান তৈরি করুন।",
      completed: true
    },
    {
      title: "পেমেন্ট সেটআপ",
      description: "পেমেন্ট গেটওয়ে সেটআপ করুন যাতে মেম্বারশিপ ফি গ্রহণ করতে পারেন।",
      completed: false
    },
    {
      title: "কনটেন্ট আপলোড",
      description: "এক্সক্লুসিভ কনটেন্ট আপলোড করুন যা শুধুমাত্র মেম্বাররা দেখতে পারবে।",
      completed: false
    },
    {
      title: "প্রমোশন",
      description: "আপনার কমিউনিটি প্রমোট করার জন্য মার্কেটিং স্ট্র্যাটেজি সেট করুন।",
      completed: false
    }
  ];
  
  const forumTopics = [
    {
      id: 1,
      title: "ডিজিটাল মার্কেটিং স্ট্র্যাটেজি ২০২৪",
      author: "রফিক আহমেদ",
      replies: 48,
      views: 1245,
      lastActivity: "আজ, ১২:৩০ PM",
      locked: false
    },
    {
      id: 2,
      title: "নতুন ইউটিউব আলগোরিদম - আপডেট",
      author: "সাবিনা খাতুন",
      replies: 76,
      views: 2356,
      lastActivity: "গতকাল, ৫:১৫ PM",
      locked: false
    },
    {
      id: 3,
      title: "পেইড কমিউনিটির সফল বিজনেস মডেল",
      author: "আরিফ হোসেন",
      replies: 34,
      views: 987,
      lastActivity: "২ দিন আগে",
      locked: true
    },
    {
      id: 4,
      title: "ইমেইল মার্কেটিং টিপস এন্ড ট্রিকস",
      author: "নাজমুল হক",
      replies: 23,
      views: 652,
      lastActivity: "৩ দিন আগে",
      locked: false
    },
    {
      id: 5,
      title: "কন্টেন্ট ক্রিয়েশন টুলস - ২০২৪",
      author: "তাসনিম জাহান",
      replies: 62,
      views: 1532,
      lastActivity: "৫ দিন আগে",
      locked: false
    }
  ];
  
  const upcomingEvents = [
    {
      id: 1,
      title: "ডিজিটাল ক্রিয়েটর মিটআপ",
      date: "১৫ জুন, ২০২৪",
      time: "সন্ধ্যা ৭:০০ PM",
      type: "অফলাইন",
      location: "গুলশান-২, ঢাকা",
      attendees: 28,
      capacity: 30
    },
    {
      id: 2,
      title: "সোশ্যাল মিডিয়া মার্কেটিং মাস্টারক্লাস",
      date: "২০ জুন, ২০২৪",
      time: "সন্ধ্যা ৮:০০ PM",
      type: "অনলাইন",
      location: "Zoom ওয়েবিনার",
      attendees: 156,
      capacity: 500
    },
    {
      id: 3,
      title: "ক্রিয়েটর ইকোনমি প্যানেল ডিসকাশন",
      date: "২৫ জুন, ২০২৪",
      time: "দুপুর ১২:০০ PM",
      type: "অনলাইন",
      location: "YouTube লাইভ",
      attendees: 78,
      capacity: 0
    }
  ];
  
  const exclusiveContent = [
    {
      id: 1,
      title: "ইনস্টাগ্রাম বিজনেস প্রোফাইল অপ্টিমাইজেশন",
      type: "PDF গাইড",
      tier: "বেসিক",
      downloads: 245,
      uploadDate: "১০ দিন আগে"
    },
    {
      id: 2,
      title: "ইউটিউব চ্যানেল সাকসেস ফর্মুলা",
      type: "ভিডিও কোর্স",
      tier: "প্রফেশনাল",
      downloads: 87,
      uploadDate: "২০ দিন আগে"
    },
    {
      id: 3,
      title: "ইমেইল লিস্ট বিল্ডিং টেমপ্লেট",
      type: "টেমপ্লেট প্যাক",
      tier: "প্রফেশনাল",
      downloads: 126,
      uploadDate: "১ মাস আগে"
    },
    {
      id: 4,
      title: "মার্কেটিং ROI ক্যালকুলেটর",
      type: "এক্সেল টুল",
      tier: "VIP",
      downloads: 42,
      uploadDate: "৪৫ দিন আগে"
    }
  ];
  
  const handleCreateCommunity = () => {
    toast.success("কমিউনিটি সেটআপ সম্পন্ন হয়েছে!");
    setActiveTab('analytics');
  };
  
  const handleSubscribe = (tierId: string) => {
    setSubscriptionTier(tierId);
    toast.success(`${membershipTiers.find(tier => tier.id === tierId)?.name} মেম্বারশিপের জন্য ধন্যবাদ!`);
  };
  
  const handlePostTopic = () => {
    toast.success("আপনার টপিক সফলভাবে পোস্ট করা হয়েছে!");
  };
  
  const handleJoinEvent = (eventId: number) => {
    toast.success("আপনি সফলভাবে ইভেন্টে যোগদান করেছেন!");
  };
  
  const handleDownloadContent = (contentId: number) => {
    toast.success("কনটেন্ট ডাউনলোড শুরু হয়েছে...");
  };
  
  return (
    <div className="container px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          ফিরে যান
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <Users className="h-6 w-6 mr-2 text-primary" />
          মেম্বারশিপ কমিউনিটি প্ল্যাটফর্ম
        </h1>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                মোট মেম্বার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">৪৭৬</div>
              <p className="text-sm text-muted-foreground">+৩৪ গত সপ্তাহে</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-500" />
                মোট ফোরাম পোস্ট
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">৫৮৭</div>
              <p className="text-sm text-muted-foreground">+১২৫ গত মাসে</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-amber-500" />
                মাসিক রেভিনিউ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">৳১,৫৭,৪৬০</div>
              <p className="text-sm text-muted-foreground">+২৩% গত মাসের তুলনায়</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
            <TabsTrigger value="create">কমিউনিটি তৈরি</TabsTrigger>
            <TabsTrigger value="forum">ফোরাম</TabsTrigger>
            <TabsTrigger value="events">ইভেন্ট ম্যানেজমেন্ট</TabsTrigger>
            <TabsTrigger value="analytics">এনালিটিক্স</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>মেম্বারশিপ প্ল্যান</CardTitle>
                <CardDescription>আপনার কমিউনিটির জন্য সর্বোত্তম প্ল্যান বেছে নিন</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {membershipTiers.map((tier) => (
                    <Card key={tier.id} className={`border-2 ${tier.recommended ? 'border-primary' : 'border-gray-200'}`}>
                      <CardHeader className={`${tier.color} text-white rounded-t-lg relative`}>
                        {tier.recommended && (
                          <div className="absolute -top-3 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs">
                            রেকমেন্ডেড
                          </div>
                        )}
                        <CardTitle>{tier.name}</CardTitle>
                        <CardDescription className="text-white opacity-90">
                          {tier.members} জন সদস্য
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold mb-4">{tier.price}</div>
                        <ul className="space-y-2 mb-6">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant={tier.id === subscriptionTier ? "outline" : "default"}
                          onClick={() => handleSubscribe(tier.id)}
                        >
                          {tier.id === subscriptionTier ? "বর্তমান প্ল্যান" : "সাবস্ক্রাইব করুন"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                    আপকামিং ইভেন্ট
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 2).map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              {event.date}, {event.time}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Badge variant="outline" className="mr-2">
                                {event.type}
                              </Badge>
                              {event.location}
                            </div>
                          </div>
                          <Button size="sm" onClick={() => handleJoinEvent(event.id)}>
                            জয়েন
                          </Button>
                        </div>
                        {event.capacity > 0 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{event.attendees} জন অংশগ্রহণকারী</span>
                              <span>{event.capacity} সিট</span>
                            </div>
                            <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab('events')}>
                      সব ইভেন্ট দেখুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-primary" />
                    এক্সক্লুসিভ কনটেন্ট
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {exclusiveContent.slice(0, 3).map((content) => (
                      <div key={content.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{content.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">
                                {content.type}
                              </Badge>
                              <Badge variant="outline">
                                {content.tier}+
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {content.downloads} ডাউনলোড • {content.uploadDate}
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadContent(content.id)}
                          >
                            ডাউনলোড
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      সব কনটেন্ট দেখুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Create Community Tab */}
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>আপনার কমিউনিটি তৈরি করুন</CardTitle>
                <CardDescription>
                  এখান থেকে আপনি আপনার নিজের মেম্বারশিপ কমিউনিটি সেটআপ করতে পারবেন
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">প্রোগ্রেস</h3>
                  <Progress value={40} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">২/৫ স্টেপ সম্পন্ন</p>
                </div>
                
                <div className="space-y-4 mt-4">
                  {createCommunitySteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 border-l-2 pl-4 pb-4 relative">
                      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${step.completed ? 'bg-primary' : 'bg-gray-200'}`} />
                      <div className="flex-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant={step.completed ? "outline" : "default"}
                        disabled={step.completed}
                      >
                        {step.completed ? "সম্পন্ন" : "শুরু করুন"}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="community-name">কমিউনিটির নাম</Label>
                      <Input id="community-name" placeholder="উদাহরণ: ডিজিটাল মার্কেটিং ইনসাইডার্স" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="community-type">কমিউনিটির ধরন</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger>
                          <SelectValue placeholder="কমিউনিটির ধরন বেছে নিন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">প্রফেশনাল স্কিল</SelectItem>
                          <SelectItem value="creator">ক্রিয়েটর কমিউনিটি</SelectItem>
                          <SelectItem value="education">শিক্ষামূলক</SelectItem>
                          <SelectItem value="hobby">শখ/বিনোদন</SelectItem>
                          <SelectItem value="business">ব্যবসায়িক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="community-description">কমিউনিটি বর্ণনা</Label>
                    <Textarea 
                      id="community-description" 
                      placeholder="আপনার কমিউনিটি সম্পর্কে একটি বিস্তারিত বর্ণনা লিখুন"
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>প্রাইভেসি সেটিংস</Label>
                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <div className="font-medium">পাবলিক কমিউনিটি</div>
                        <div className="text-sm text-muted-foreground">যে কেউ আপনার কমিউনিটি দেখতে পারবে</div>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="space-y-0.5">
                        <div className="font-medium">মেম্বার অনুমোদন</div>
                        <div className="text-sm text-muted-foreground">নতুন মেম্বার জয়েন করার আগে অনুমোদন প্রয়োজন</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">সেভ করুন</Button>
                <Button onClick={handleCreateCommunity}>কমিউনিটি তৈরি করুন</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Forum Tab */}
          <TabsContent value="forum">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>কমিউনিটি ফোরাম</CardTitle>
                      <CardDescription>সাম্প্রতিক আলোচনা এবং টপিক</CardDescription>
                    </div>
                    <Button onClick={() => document.getElementById('new-topic-section')?.scrollIntoView({ behavior: 'smooth' })}>
                      নতুন টপিক
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableCaption>সর্বমোট ৫৮৭টি টপিক</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[400px]">টপিক</TableHead>
                          <TableHead>রিপ্লাই</TableHead>
                          <TableHead>ভিউস</TableHead>
                          <TableHead>সর্বশেষ অ্যাক্টিভিটি</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {forumTopics.map((topic) => (
                          <TableRow key={topic.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                {topic.locked && <Lock className="h-4 w-4 mr-2 text-amber-500" />}
                                <div>
                                  <div>{topic.title}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    পোস্ট করেছেন: {topic.author}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{topic.replies}</TableCell>
                            <TableCell>{topic.views}</TableCell>
                            <TableCell>{topic.lastActivity}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">পূর্ববর্তী</Button>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline">পেজ ১/১২</Badge>
                    </div>
                    <Button variant="outline" size="sm">পরবর্তী</Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">ফোরাম স্ট্যাটিসটিকস</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">মোট টপিক</div>
                      <div className="font-medium">৫৮৭</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">মোট পোস্ট</div>
                      <div className="font-medium">৩,৪২১</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">সক্রিয় থ্রেড</div>
                      <div className="font-medium">৪৩</div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="text-sm">সক্রিয় সদস্য</div>
                      <div className="font-medium">১৮৬</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">নতুন সদস্য</div>
                      <div className="font-medium">২৮ (এই সপ্তাহে)</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card id="new-topic-section">
                  <CardHeader>
                    <CardTitle className="text-lg">নতুন টপিক পোস্ট করুন</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic-title">টপিক টাইটেল</Label>
                      <Input id="topic-title" placeholder="আপনার টপিক টাইটেল লিখুন" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic-category">ক্যাটাগরি</Label>
                      <Select defaultValue="digital-marketing">
                        <SelectTrigger>
                          <SelectValue placeholder="ক্যাটাগরি বেছে নিন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="digital-marketing">ডিজিটাল মার্কেটিং</SelectItem>
                          <SelectItem value="content-creation">কন্টেন্ট ক্রিয়েশন</SelectItem>
                          <SelectItem value="business">বিজনেস এন্ড এন্টারপ্রেনরশিপ</SelectItem>
                          <SelectItem value="community">কমিউনিটি বিল্ডিং</SelectItem>
                          <SelectItem value="tools">টুলস এন্ড সফটওয়্যার</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic-content">টপিক কন্টেন্ট</Label>
                      <Textarea 
                        id="topic-content" 
                        placeholder="আপনার টপিকের বিস্তারিত লিখুন"
                        rows={6}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="topic-notification" />
                      <Label htmlFor="topic-notification">রিপ্লাই নোটিফিকেশন চালু করুন</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handlePostTopic}>টপিক পোস্ট করুন</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Events Tab */}
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>আপকামিং ইভেন্টস</CardTitle>
                    <CardDescription>কমিউনিটি মেম্বারদের জন্য আপকামিং ইভেন্ট</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">{event.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center">
                                  <CalendarDays className="h-4 w-4 mr-1" />
                                  {event.date}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {event.time}
                                </div>
                              </div>
                              <div className="flex items-center mt-2">
                                <Badge variant={event.type === "অনলাইন" ? "default" : "secondary"} className="mr-2">
                                  {event.type}
                                </Badge>
                                <span className="text-sm">{event.location}</span>
                              </div>
                              {event.capacity > 0 && (
                                <div className="mt-3 w-full max-w-xs">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>{event.attendees} জন অংশগ্রহণকারী</span>
                                    <span>{event.capacity} সিট</span>
                                  </div>
                                  <Progress value={(event.attendees / event.capacity) * 100} className="h-2" />
                                </div>
                              )}
                            </div>
                            <Button 
                              onClick={() => handleJoinEvent(event.id)}
                              disabled={event.capacity > 0 && event.attendees >= event.capacity}
                            >
                              {event.capacity > 0 && event.attendees >= event.capacity ? "সিট ভর্তি" : "জয়েন করুন"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>পাস্ট ইভেন্টস</CardTitle>
                    <CardDescription>আগে অনুষ্ঠিত ইভেন্টসমূহ</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 101,
                          title: "কন্টেন্ট ক্রিয়েটরদের নেটওয়ার্কিং নাইট",
                          date: "১০ মে, ২০২৪",
                          time: "সন্ধ্যা ৭:০০ PM",
                          type: "অফলাইন",
                          location: "বনানী, ঢাকা",
                          attendees: 45,
                          recording: true
                        },
                        {
                          id: 102,
                          title: "ফ্রিল্যান্সিং ফর ডিজিটাল ক্রিয়েটরস",
                          date: "৫ মে, ২০২৪",
                          time: "বিকেল ৪:০০ PM",
                          type: "অনলাইন",
                          location: "Zoom ওয়েবিনার",
                          attendees: 312,
                          recording: true
                        },
                      ].map((event) => (
                        <div key={event.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                <div className="flex items-center">
                                  <CalendarDays className="h-4 w-4 mr-1" />
                                  {event.date}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {event.time}
                                </div>
                              </div>
                              <div className="flex items-center mt-2">
                                <Badge variant="outline" className="mr-2">
                                  {event.type}
                                </Badge>
                                <span className="text-sm">{event.location}</span>
                              </div>
                              <div className="text-sm text-muted-foreground mt-2">
                                {event.attendees} জন অংশগ্রহণ করেছিলেন
                              </div>
                            </div>
                            {event.recording && (
                              <Button variant="outline" size="sm">
                                <Video className="h-4 w-4 mr-2" />
                                রেকর্ডিং দেখুন
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">নতুন ইভেন্ট তৈরি করুন</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">ইভেন্ট টাইটেল</Label>
                      <Input id="event-title" placeholder="ইভেন্টের টাইটেল লিখুন" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event-date">তারিখ</Label>
                        <Input id="event-date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="event-time">সময়</Label>
                        <Input id="event-time" type="time" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-type">ইভেন্টের ধরন</Label>
                      <Select defaultValue="online">
                        <SelectTrigger>
                          <SelectValue placeholder="ইভেন্টের ধরন বেছে নিন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">অনলাইন</SelectItem>
                          <SelectItem value="offline">অফলাইন</SelectItem>
                          <SelectItem value="hybrid">হাইব্রিড</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-location">লোকেশন</Label>
                      <Input id="event-location" placeholder="ইভেন্টের লোকেশন" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-capacity">ক্যাপাসিটি</Label>
                      <Input id="event-capacity" type="number" placeholder="সর্বোচ্চ অংশগ্রহণকারীর সংখ্যা" />
                      <p className="text-xs text-muted-foreground mt-1">খালি রাখলে অসীম সংখ্যক অংশগ্রহণকারী থাকতে পারবে</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-description">ইভেন্ট বর্ণনা</Label>
                      <Textarea id="event-description" placeholder="ইভেন্টের বিস্তারিত বর্ণনা" rows={4} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-tier">মেম্বারশিপ টায়ার</Label>
                      <Select defaultValue="basic">
                        <SelectTrigger>
                          <SelectValue placeholder="কোন মেম্বারশিপ টায়ার থেকে অংশগ্রহণ করতে পারবে" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">সবাই</SelectItem>
                          <SelectItem value="basic">বেসিক+</SelectItem>
                          <SelectItem value="pro">প্রফেশনাল+</SelectItem>
                          <SelectItem value="vip">VIP শুধুমাত্র</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="event-recording" defaultChecked />
                      <Label htmlFor="event-recording">রেকর্ডিং অন করুন</Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>ইভেন্ট তৈরি করুন</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>মেম্বারশিপ ট্রেন্ড</CardTitle>
                    <CardDescription>গত ৬ মাসের মেম্বারশিপ বৃদ্ধির হার</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">[মেম্বারশিপ ট্রেন্ড চার্ট]</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>রেভিনিউ এনালাইসিস</CardTitle>
                    <CardDescription>মাসিক রেভিনিউ এবং সাবস্ক্রিপশন ব্রেকডাউন</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">[রেভিনিউ এনালাইসিস চার্ট]</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">রেভিনিউ সামারি</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">মোট মাসিক রেভিনিউ</div>
                      <div className="text-2xl font-bold">৳১,৫৭,৪৬০</div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        +২৩% গত মাসের তুলনায়
                      </Badge>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">টায়ার অনুযায়ী রেভিনিউ</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm">বেসিক</span>
                          </div>
                          <div className="text-sm font-medium">৳৯৮,৮৫২</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                            <span className="text-sm">প্রফেশনাল</span>
                          </div>
                          <div className="text-sm font-medium">৳১,২৪,৪৪৪</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm">VIP</span>
                          </div>
                          <div className="text-sm font-medium">৳১,০৭,৯২৮</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">মেম্বার এক্টিভিটি</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">একটিভ মেম্বার</div>
                      <div className="font-medium">৩৬৮/৪৭৬ (৭৭%)</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">গড় ফোরাম পোস্ট</div>
                      <div className="font-medium">৩.৮/সদস্য</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">গড় ইভেন্ট অংশগ্রহণ</div>
                      <div className="font-medium">২.৪/সদস্য</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">কনটেন্ট ব্যবহার</div>
                      <div className="font-medium">৫৬%</div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">সাবস্ক্রিপশন রিটেনশন</h4>
                      <Progress value={85} className="h-2 mb-1" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>৮৫% রিটেনশন রেট</span>
                        <span>১৫% চার্ন রেট</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">টপ কনটেন্ট</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {exclusiveContent.slice(0, 3).map((content, index) => (
                        <div key={content.id} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{content.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="secondary" className="text-xs">
                                {content.type}
                              </Badge>
                              <span>{content.downloads} ডাউনলোড</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaidCommunity;
