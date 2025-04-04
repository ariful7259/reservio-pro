
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Star, Gift, ChevronRight, Check, Clock, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Rewards = () => {
  const navigate = useNavigate();
  const { userReward, language, claimReward } = useApp();

  const getNextLevel = () => {
    const { points, level } = userReward;
    
    if (level === 'bronze') {
      return { name: language === 'bn' ? 'সিলভার' : 'Silver', threshold: 100, progress: (points / 100) * 100 };
    } else if (level === 'silver') {
      return { name: language === 'bn' ? 'গোল্ড' : 'Gold', threshold: 300, progress: (points / 300) * 100 };
    } else if (level === 'gold') {
      return { name: language === 'bn' ? 'প্লাটিনাম' : 'Platinum', threshold: 500, progress: (points / 500) * 100 };
    } else {
      return { name: language === 'bn' ? 'ম্যাক্স লেভেল' : 'Max level', threshold: 500, progress: 100 };
    }
  };

  const nextLevel = getNextLevel();

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-amber-700';
      case 'silver': return 'bg-gray-400';
      case 'gold': return 'bg-yellow-400';
      case 'platinum': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'bronze': return <Trophy className="h-5 w-5" />;
      case 'silver': return <Award className="h-5 w-5" />;
      case 'gold': return <Star className="h-5 w-5" />;
      case 'platinum': return <Gift className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  const availableRewards = userReward.rewards.filter(reward => !reward.claimed);
  const claimedRewards = userReward.rewards.filter(reward => reward.claimed);

  return (
    <div className="container pt-16 pb-20 px-4">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">
          {language === 'bn' ? 'লয়ালটি রিওয়ার্ড' : 'Loyalty Rewards'}
        </h1>
      </div>

      <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-full ${getLevelColor(userReward.level)}`}>
                {getLevelIcon(userReward.level)}
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {userReward.level.charAt(0).toUpperCase() + userReward.level.slice(1)}
                </h2>
                <p className="text-sm opacity-80">
                  {language === 'bn' ? 'আপনার বর্তমান লেভেল' : 'Your current level'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold">{userReward.points}</h3>
              <p className="text-sm opacity-80">
                {language === 'bn' ? 'পয়েন্ট' : 'Points'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{language === 'bn' ? 'পরবর্তী লেভেল:' : 'Next level:'} {nextLevel.name}</span>
              <span>
                {userReward.points}/{nextLevel.threshold}
              </span>
            </div>
            <Progress value={nextLevel.progress} className="h-2" />
          </div>

          <div className="mt-4 text-sm">
            {language === 'bn'
              ? `আরও ${nextLevel.threshold - userReward.points} পয়েন্ট অর্জন করুন ${nextLevel.name} লেভেলে পৌঁছাতে`
              : `Earn ${nextLevel.threshold - userReward.points} more points to reach ${nextLevel.name} level`}
          </div>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">
          {language === 'bn' ? 'পয়েন্ট অর্জনের উপায়' : 'Ways to Earn Points'}
        </h2>
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Gift className="h-4 w-4 text-primary" />
                </div>
                <span>{language === 'bn' ? 'অনবোর্ডিং সম্পন্ন করা' : 'Complete Onboarding'}</span>
              </div>
              <Badge>+50</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <span>{language === 'bn' ? 'রিভিউ দেওয়া' : 'Write a Review'}</span>
              </div>
              <Badge>+10</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span>{language === 'bn' ? 'দৈনিক লগইন' : 'Daily Login'}</span>
              </div>
              <Badge>+5</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="mt-6">
        <TabsList className="w-full">
          <TabsTrigger value="available" className="flex-1">
            {language === 'bn' ? 'উপলভ্য রিওয়ার্ড' : 'Available Rewards'}
          </TabsTrigger>
          <TabsTrigger value="claimed" className="flex-1">
            {language === 'bn' ? 'দাবিকৃত রিওয়ার্ড' : 'Claimed Rewards'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-4">
          {availableRewards.length === 0 ? (
            <div className="text-center py-10">
              <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {language === 'bn' ? 'কোন রিওয়ার্ড অবশিষ্ট নেই' : 'No rewards available'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'bn'
                  ? 'আরও পয়েন্ট অর্জন করে নতুন রিওয়ার্ড আনলক করুন'
                  : 'Earn more points to unlock new rewards'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableRewards.map(reward => (
                <Card key={reward.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {reward.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {reward.pointsRequired} {language === 'bn' ? 'পয়েন্ট' : 'Points'}
                      </Badge>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        onClick={() => claimReward(reward.id)}
                        disabled={userReward.points < reward.pointsRequired}
                        size="sm"
                      >
                        {language === 'bn' ? 'দাবি করুন' : 'Claim'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="claimed" className="mt-4">
          {claimedRewards.length === 0 ? (
            <div className="text-center py-10">
              <Gift className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {language === 'bn' ? 'কোন রিওয়ার্ড দাবি করা হয়নি' : 'No claimed rewards'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'bn'
                  ? 'আপনার দাবিকৃত রিওয়ার্ড এখানে দেখানো হবে'
                  : 'Your claimed rewards will appear here'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {claimedRewards.map(reward => (
                <Card key={reward.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {reward.description}
                        </p>
                      </div>
                      <Badge className="bg-green-600">
                        <Check className="h-3 w-3 mr-1" />
                        {language === 'bn' ? 'দাবিকৃত' : 'Claimed'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Rewards;
