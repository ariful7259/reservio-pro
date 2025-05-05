
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Award, Gift, Clock, ChevronRight, ShoppingBag, Calendar, Tag, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  category: 'discount' | 'cashback' | 'gift' | 'service';
  expiresAt: string;
  image: string;
}

interface PointsActivity {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'spent';
}

const MOCK_REWARDS: Reward[] = [
  {
    id: 'r1',
    title: '১০% ডিসকাউন্ট',
    description: 'পরবর্তী কেনাকাটায় ১০% ডিসকাউন্ট পান',
    pointsRequired: 500,
    category: 'discount',
    expiresAt: '2025-06-30',
    image: 'https://images.unsplash.com/photo-1672309558498-cfcc89afff25?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRpc2NvdW50fGVufDB8fDB8fHww'
  },
  {
    id: 'r2',
    title: '৫০০৳ ক্যাশব্যাক',
    description: '৫০০৳ ক্যাশব্যাক আপনার ওয়ালেটে',
    pointsRequired: 1000,
    category: 'cashback',
    expiresAt: '2025-06-30',
    image: 'https://images.unsplash.com/photo-1579621970590-9d624316904b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FzaGJhY2t8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'r3',
    title: 'ফ্রি ডেলিভারি',
    description: '৩টি অর্ডারে ফ্রি ডেলিভারি পান',
    pointsRequired: 300,
    category: 'service',
    expiresAt: '2025-06-30',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGVsaXZlcnl8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 'r4',
    title: 'গিফট হ্যাম্পার',
    description: 'একটি বিশেষ গিফট হ্যাম্পার পান',
    pointsRequired: 2000,
    category: 'gift',
    expiresAt: '2025-07-15',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lmdCUyMGhhbXBlcnxlbnwwfHwwfHx8MA%3D%3D'
  }
];

const MOCK_ACTIVITIES: PointsActivity[] = [
  {
    id: 'a1',
    date: '২০২৫-০৫-০৩',
    description: 'রেন্টাল পেমেন্ট - ফ্ল্যাট ২০৩',
    points: 150,
    type: 'earned'
  },
  {
    id: 'a2',
    date: '২০২৫-০৫-০১',
    description: 'প্রোফাইল আপডেট বোনাস',
    points: 50,
    type: 'earned'
  },
  {
    id: 'a3',
    date: '২০২৫-০৪-২৫',
    description: 'রিফারেল বোনাস - রহিম',
    points: 200,
    type: 'earned'
  },
  {
    id: 'a4',
    date: '২০২৫-০৪-২০',
    description: '১০% ডিসকাউন্ট রিডিম',
    points: 500,
    type: 'spent'
  }
];

const LoyaltySystem = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [points, setPoints] = useState(750);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('rewards');
  
  const handleRedeem = (reward: Reward) => {
    if (points < reward.pointsRequired) {
      toast({
        title: "পয়েন্টস অপর্যাপ্ত",
        description: `এই রিওয়ার্ড রিডিম করার জন্য আপনার আরও ${reward.pointsRequired - points} পয়েন্টস প্রয়োজন।`,
        variant: "destructive",
      });
      return;
    }
    
    setPoints(points - reward.pointsRequired);
    setRedeemed([...redeemed, reward.id]);
    
    toast({
      title: "রিওয়ার্ড রিডিম সফল",
      description: `আপনি সফলভাবে "${reward.title}" রিডিম করেছেন।`,
    });
  };
  
  const calculateTier = (points: number) => {
    if (points >= 2000) return "প্লাটিনাম";
    if (points >= 1000) return "গোল্ড";
    if (points >= 500) return "সিলভার";
    return "ব্রোঞ্জ";
  };
  
  const calculateProgress = (points: number) => {
    const tier = calculateTier(points);
    switch (tier) {
      case "ব্রোঞ্জ": return (points / 500) * 100;
      case "সিলভার": return ((points - 500) / 500) * 100;
      case "গোল্ড": return ((points - 1000) / 1000) * 100;
      case "প্লাটিনাম": return 100;
      default: return 0;
    }
  };
  
  const getNextTier = (points: number) => {
    const tier = calculateTier(points);
    switch (tier) {
      case "ব্রোঞ্জ": return { tier: "সিলভার", points: 500 };
      case "সিলভার": return { tier: "গোল্ড", points: 1000 };
      case "গোল্ড": return { tier: "প্লাটিনাম", points: 2000 };
      case "প্লাটিনাম": return null;
      default: return { tier: "ব্রোঞ্জ", points: 0 };
    }
  };
  
  const pointsToNextTier = () => {
    const nextTier = getNextTier(points);
    if (!nextTier) return null;
    return nextTier.points - points;
  };
  
  const tierBadgeColor = (tier: string) => {
    switch (tier) {
      case "ব্রোঞ্জ": return "bg-amber-800 hover:bg-amber-700";
      case "সিলভার": return "bg-gray-400 hover:bg-gray-300";
      case "গোল্ড": return "bg-yellow-500 hover:bg-yellow-400";
      case "প্লাটিনাম": return "bg-blue-700 hover:bg-blue-600";
      default: return "bg-gray-500 hover:bg-gray-400";
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-20 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>লয়ালটি প্রোগ্রাম</CardTitle>
            <CardDescription>পয়েন্টস অর্জন করুন এবং রিওয়ার্ড পান</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">লগইন করুন</h3>
            <p className="text-muted-foreground mb-4">লয়ালটি প্রোগ্রাম ব্যবহার করতে আপনাকে প্রথমে লগইন করতে হবে</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => window.location.href = "/login"}>
              লগইন করুন
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">লয়ালটি প্রোগ্রাম</h1>
          <p className="text-muted-foreground">পয়েন্টস অর্জন করুন এবং রিওয়ার্ড পান</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>আপনার পয়েন্টস</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <Award className="h-24 w-24 text-primary/20" />
                <span className="absolute text-2xl font-bold">{points}</span>
              </div>
              
              <div className="mt-4">
                <Badge className={`${tierBadgeColor(calculateTier(points))} text-white`}>
                  {calculateTier(points)} টিয়ার
                </Badge>
              </div>
              
              {pointsToNextTier() !== null && (
                <div className="mt-4 space-y-2">
                  <Progress value={calculateProgress(points)} />
                  <p className="text-sm text-muted-foreground">
                    {pointsToNextTier()} পয়েন্টস বাকি আছে {getNextTier(points)?.tier} টিয়ারে উন্নীত হতে
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>টিয়ার বেনিফিট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className={`${tierBadgeColor("ব্রোঞ্জ")} text-white mr-2`}>ব্রোঞ্জ</Badge>
                  <span>০ - ৪৯৯ পয়েন্টস</span>
                </div>
                <p className="text-sm text-muted-foreground">বেসিক রিওয়ার্ড অ্যাকসেস, নিউজলেটার</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className={`${tierBadgeColor("সিলভার")} text-white mr-2`}>সিলভার</Badge>
                  <span>৫০০ - ৯৯৯ পয়েন্টস</span>
                </div>
                <p className="text-sm text-muted-foreground">ফ্রি ডেলিভারি, প্রাথমিক অ্যাকসেস</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className={`${tierBadgeColor("গোল্ড")} text-white mr-2`}>গোল্ড</Badge>
                  <span>১০০০ - ১৯৯৯ পয়েন্টস</span>
                </div>
                <p className="text-sm text-muted-foreground">১০% অতিরিক্ত পয়েন্টস, VIP পরিষেবা</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Badge className={`${tierBadgeColor("প্লাটিনাম")} text-white mr-2`}>প্লাটিনাম</Badge>
                  <span>২০০০+ পয়েন্টস</span>
                </div>
                <p className="text-sm text-muted-foreground">২০% অতিরিক্ত পয়েন্টস, এক্সক্লুসিভ অফার</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Tabs defaultValue="rewards" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="rewards" className="flex-1">রিওয়ার্ড</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">পয়েন্টস হিস্টরি</TabsTrigger>
              <TabsTrigger value="howto" className="flex-1">পয়েন্ট কিভাবে অর্জন করবেন</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rewards" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {MOCK_REWARDS.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden h-full flex flex-col">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={reward.image} 
                        alt={reward.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{reward.title}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="mr-2">
                          {reward.pointsRequired} পয়েন্টস
                        </Badge>
                        {reward.category === 'discount' && <Badge>ডিসকাউন্ট</Badge>}
                        {reward.category === 'cashback' && <Badge>ক্যাশব্যাক</Badge>}
                        {reward.category === 'gift' && <Badge>গিফট</Badge>}
                        {reward.category === 'service' && <Badge>সেবা</Badge>}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      <div className="flex items-center mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>মেয়াদ: {reward.expiresAt}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      {redeemed.includes(reward.id) ? (
                        <Button variant="outline" disabled className="w-full">
                          রিডিম করা হয়েছে
                        </Button>
                      ) : (
                        <Button 
                          variant={points >= reward.pointsRequired ? "default" : "outline"} 
                          className="w-full"
                          onClick={() => handleRedeem(reward)}
                          disabled={points < reward.pointsRequired}
                        >
                          {points >= reward.pointsRequired ? 'রিডিম করুন' : `${reward.pointsRequired - points} পয়েন্টস বাকি`}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>পয়েন্টস অ্যাকটিভিটি</CardTitle>
                  <CardDescription>আপনার পয়েন্টস অর্জন এবং ব্যবহারের ইতিহাস</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {MOCK_ACTIVITIES.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            activity.type === 'earned' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {activity.type === 'earned' ? (
                              <ArrowRight className="h-5 w-5" />
                            ) : (
                              <ShoppingBag className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{activity.description}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                        </div>
                        <span className={`font-medium ${
                          activity.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {activity.type === 'earned' ? '+' : '-'}{activity.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="howto" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>পয়েন্টস কিভাবে অর্জন করবেন</CardTitle>
                  <CardDescription>বিভিন্ন উপায়ে পয়েন্টস অর্জন করুন</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">কেনাকাটা করুন</h3>
                        <p className="text-sm text-muted-foreground">প্রতি ১০০৳ খরচে ১০ পয়েন্টস অর্জন করুন</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">দৈনিক লগইন</h3>
                        <p className="text-sm text-muted-foreground">প্রতিদিন অ্যাপে লগইন করে ৫ পয়েন্টস অর্জন করুন</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Tag className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">রিভিউ দিন</h3>
                        <p className="text-sm text-muted-foreground">একটি পণ্য বা সেবা রিভিউ করে ৫০ পয়েন্টস অর্জন করুন</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Gift className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">রেফার করুন</h3>
                        <p className="text-sm text-muted-foreground">একজন বন্ধুকে রেফার করে ২০০ পয়েন্টস অর্জন করুন</p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      আরও জানুন
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoyaltySystem;
