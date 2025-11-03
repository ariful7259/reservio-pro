import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Gift, TrendingUp, Award } from 'lucide-react';
import { useReferralData } from '@/hooks/useReferralData';
import { Skeleton } from '@/components/ui/skeleton';

export const ReferralStats = () => {
  const { referralData, loading } = useReferralData();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!referralData) return null;

  const stats = [
    {
      title: 'মোট রেফারেল',
      value: referralData.totalReferrals,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'মোট উপার্জন',
      value: `৳${referralData.totalEarnings}`,
      icon: Gift,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'কনভার্সন রেট',
      value: `${referralData.analytics.conversionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'লিডারবোর্ড র‍্যাঙ্ক',
      value: `#${referralData.leaderboard.currentUserRank}`,
      icon: Award,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
