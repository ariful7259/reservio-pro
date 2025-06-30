
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { UserReward, Language } from '../types';
import { initialRewards } from '../rewardsData';

export const useRewards = (language: Language) => {
  const [userReward, setUserReward] = useState<UserReward>(() => {
    try {
      const saved = localStorage.getItem('userReward');
      return saved ? JSON.parse(saved) : {
        points: 0,
        level: 'bronze',
        rewards: initialRewards
      };
    } catch {
      return {
        points: 0,
        level: 'bronze',
        rewards: initialRewards
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('userReward', JSON.stringify(userReward));
  }, [userReward]);

  const addPoints = (points: number) => {
    setUserReward(prev => {
      const newPoints = prev.points + points;
      let newLevel = prev.level;
      
      if (newPoints >= 500) newLevel = 'platinum';
      else if (newPoints >= 300) newLevel = 'gold';
      else if (newPoints >= 100) newLevel = 'silver';
      
      if (newLevel !== prev.level) {
        toast({
          title: language === 'bn' ? "অভিনন্দন!" : "Congratulations!",
          description: language === 'bn' 
            ? `আপনি ${newLevel === 'silver' ? 'সিলভার' : newLevel === 'gold' ? 'গোল্ড' : 'প্লাটিনাম'} লেভেলে উন্নীত হয়েছেন!`
            : `You've been promoted to ${newLevel} level!`,
        });
      }
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  };

  const claimReward = (rewardId: string) => {
    setUserReward(prev => {
      const reward = prev.rewards.find(r => r.id === rewardId);
      
      if (!reward) return prev;
      
      if (reward.claimed) {
        toast({
          title: language === 'bn' ? "ইতিমধ্যে দাবি করা হয়েছে" : "Already claimed",
          description: language === 'bn' ? "এই পুরস্কার ইতিমধ্যে দাবি করা হয়েছে" : "This reward has already been claimed",
          variant: "destructive",
        });
        return prev;
      }
      
      if (prev.points < reward.pointsRequired) {
        toast({
          title: language === 'bn' ? "পর্যাপ্ত পয়েন্ট নেই" : "Not enough points",
          description: language === 'bn' 
            ? `এই পুরস্কার দাবি করতে আরও ${reward.pointsRequired - prev.points} পয়েন্ট প্রয়োজন`
            : `You need ${reward.pointsRequired - prev.points} more points to claim this reward`,
          variant: "destructive",
        });
        return prev;
      }
      
      toast({
        title: language === 'bn' ? "পুরস্কার দাবি করা হয়েছে" : "Reward claimed",
        description: reward.title,
      });
      
      return {
        ...prev,
        points: prev.points - reward.pointsRequired,
        rewards: prev.rewards.map(r => 
          r.id === rewardId ? { ...r, claimed: true } : r
        ),
      };
    });
  };

  return {
    userReward,
    addPoints,
    claimReward
  };
};
