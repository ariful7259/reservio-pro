
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Gift, 
  Award, 
  Sparkles, 
  Star, 
  Clock, 
  Calendar, 
  ChevronRight, 
  ShoppingBag,
  Tag,
  CreditCard,
  Ticket,
  CheckCircle2,
  CircleOff,
  Hourglass
} from 'lucide-react';

interface LoyaltyPointsProps {
  currentPoints?: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface RewardItem {
  id: string;
  title: string;
  description: string;
  points: number;
  category: 'discount' | 'service' | 'product' | 'exclusive';
  image?: string;
  expiryDate?: Date;
  status?: 'available' | 'redeemed' | 'expired';
}

const tierConfig = {
  bronze: {
    color: 'bg-amber-700',
    nextTier: 'silver',
    pointsToNext: 1000,
    progress: 30,
    benefits: ['৫% ক্যাশব্যাক', 'ডিসকাউন্ট অফার'],
  },
  silver: {
    color: 'bg-gray-400',
    nextTier: 'gold',
    pointsToNext: 3000,
    progress: 55,
    benefits: ['৭% ক্যাশব্যাক', 'প্রিয়োরিটি সাপোর্ট', 'বিশেষ অফার'],
  },
  gold: {
    color: 'bg-yellow-500',
    nextTier: 'platinum',
    pointsToNext: 5000,
    progress: 75,
    benefits: ['১০% ক্যাশব্যাক', '২৪/৭ সাপোর্ট', 'ফ্রি শিপিং', 'এক্সক্লুসিভ অফার'],
  },
  platinum: {
    color: 'bg-indigo-600',
    nextTier: null,
    pointsToNext: null,
    progress: 100,
    benefits: ['১৫% ক্যাশব্যাক', 'পার্সোনাল কনসিয়ার্জ', 'অগ্রাধিকার বুকিং', 'সম্পূর্ণ ফ্রি শিপিং'],
  },
};

const LoyaltyPoints: React.FC<LoyaltyPointsProps> = ({ 
  currentPoints = 750, 
  tier = 'bronze' 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('available');

  const currentTierConfig = tierConfig[tier];
  
  // Demo rewards data
  const availableRewards: RewardItem[] = [
    {
      id: 'reward-1',
      title: '১৫% ডিসকাউন্ট ভাউচার',
      description: 'আপনার পরবর্তী অর্ডারে ১৫% ডিসকাউন্ট পান',
      points: 500,
      category: 'discount',
      expiryDate: new Date(2025, 5, 30),
      status: 'available',
    },
    {
      id: 'reward-2',
      title: 'ফ্রি ডেলিভারি কুপন',
      description: 'আপনার পরবর্তী ৫টি অর্ডারে ফ্রি ডেলিভারি',
      points: 300,
      category: 'service',
      expiryDate: new Date(2025, 4, 15),
      status: 'available',
    },
    {
      id: 'reward-3',
      title: 'মোবাইল রিচার্জ ৫০০৳',
      description: 'আপনার মোবাইলে ৫০০৳ রিচার্জ করুন',
      points: 1000,
      category: 'service',
      expiryDate: new Date(2025, 7, 10),
      status: 'available',
    },
  ];

  const redeemedRewards: RewardItem[] = [
    {
      id: 'reward-4',
      title: '১০% ডিসকাউন্ট ভাউচার',
      description: 'আপনার পরবর্তী অর্ডারে ১০% ডিসকাউন্ট',
      points: 300,
      category: 'discount',
      expiryDate: new Date(2025, 3, 20),
      status: 'redeemed',
    },
    {
      id: 'reward-5',
      title: 'এক্সক্লুসিভ ইভেন্ট টিকেট',
      description: 'উদ্বোধনী অনুষ্ঠানে যোগ দিন',
      points: 800,
      category: 'exclusive',
      expiryDate: new Date(2025, 3, 5),
      status: 'redeemed',
    }
  ];

  const handleRedeemReward = (reward: RewardItem) => {
    if (currentPoints >= reward.points) {
      toast({
        title: "রিওয়ার্ড রিডিম করা হয়েছে!",
        description: `আপনি ${reward.title} রিডিম করেছেন। ${reward.points} পয়েন্ট খরচ হয়েছে।`,
      });
    } else {
      toast({
        title: "পর্যাপ্ত পয়েন্ট নেই",
        description: `এই রিওয়ার্ড রিডিম করতে আপনার আরও ${reward.points - currentPoints} পয়েন্ট প্রয়োজন।`,
        variant: "destructive",
      });
    }
  };

  const getRewardIcon = (category: string) => {
    switch (category) {
      case 'discount':
        return <Tag className="h-5 w-5 text-pink-500" />;
      case 'service':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case 'product':
        return <ShoppingBag className="h-5 w-5 text-green-500" />;
      case 'exclusive':
        return <Ticket className="h-5 w-5 text-purple-500" />;
      default:
        return <Gift className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${currentTierConfig.color} text-white`}>
                <Award className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold capitalize">{tier} সদস্য</h3>
                <p className="text-xs text-muted-foreground">আপনার লয়ালটি স্ট্যাটাস</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                <span className="text-2xl font-bold">{currentPoints}</span>
              </div>
              <p className="text-xs text-muted-foreground">লয়ালটি পয়েন্টস</p>
            </div>
          </div>
          
          {currentTierConfig.nextTier && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>আপনার বর্তমান টিয়ার</span>
                <span>পরবর্তী টিয়ার: {currentTierConfig.nextTier}</span>
              </div>
              <Progress value={currentTierConfig.progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {currentTierConfig.pointsToNext} পয়েন্টস প্রয়োজন {currentTierConfig.nextTier} টিয়ারে যাওয়ার জন্য
              </p>
            </div>
          )}
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" className="text-sm">
              <Clock className="h-4 w-4 mr-2" /> পয়েন্টস ইতিহাস
            </Button>
            <Button variant="outline" className="text-sm">
              <Gift className="h-4 w-4 mr-2" /> রিওয়ার্ড স্টোর
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">আপনার সুবিধাসমূহ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTierConfig.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 p-3 border rounded-md">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">রিওয়ার্ড সমূহ</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="available" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> উপলব্ধ
              </TabsTrigger>
              <TabsTrigger value="redeemed" className="flex items-center gap-1">
                <Hourglass className="h-4 w-4" /> রিডিমড
              </TabsTrigger>
              <TabsTrigger value="expired" className="flex items-center gap-1">
                <CircleOff className="h-4 w-4" /> মেয়াদোত্তীর্ণ
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="mt-4">
              <div className="space-y-3">
                {availableRewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-4 sm:w-3/4">
                        <div className="flex items-center gap-2 mb-2">
                          {getRewardIcon(reward.category)}
                          <h3 className="font-semibold">{reward.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                        
                        {reward.expiryDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>মেয়াদ: {reward.expiryDate.toLocaleDateString('bn-BD')}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 bg-muted sm:w-1/4 flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-bold">{reward.points}</span>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => handleRedeemReward(reward)}
                          disabled={currentPoints < reward.points}
                          className="w-full"
                        >
                          রিডিম করুন
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {availableRewards.length === 0 && (
                  <div className="text-center py-8">
                    <Gift className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোন রিওয়ার্ড উপলব্ধ নেই</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="redeemed" className="mt-4">
              <div className="space-y-3">
                {redeemedRewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-4 sm:w-3/4">
                        <div className="flex items-center gap-2 mb-2">
                          {getRewardIcon(reward.category)}
                          <h3 className="font-semibold">{reward.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                        
                        {reward.expiryDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>মেয়াদ: {reward.expiryDate.toLocaleDateString('bn-BD')}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 bg-muted sm:w-1/4 flex flex-col items-center justify-center gap-2">
                        <Badge>রিডিম করা হয়েছে</Badge>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {redeemedRewards.length === 0 && (
                  <div className="text-center py-8">
                    <Gift className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোন রিডিমড রিওয়ার্ড নেই</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="expired" className="mt-4">
              <div className="text-center py-8">
                <CircleOff className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">কোন মেয়াদোত্তীর্ণ রিওয়ার্ড নেই</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">কিভাবে পয়েন্টস অর্জন করবেন?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">প্রতিবার কেনাকাটায়</h3>
                <p className="text-sm text-muted-foreground">প্রতি ১০০৳ খরচে ৫ পয়েন্টস অর্জন করুন</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">বিল পেমেন্ট</h3>
                <p className="text-sm text-muted-foreground">আমাদের প্ল্যাটফর্মে বিল পেমেন্ট করে দ্বিগুণ পয়েন্টস পান</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                <Gift className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">রেফারেল</h3>
                <p className="text-sm text-muted-foreground">বন্ধুদের রেফার করে ১০০ পয়েন্টস বোনাস পান</p>
              </div>
            </div>
            
            <Button className="w-full mt-2" size="sm" variant="outline">
              আরও পয়েন্টস অর্জন করুন <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyPoints;
