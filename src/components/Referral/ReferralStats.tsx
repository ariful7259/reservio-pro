
import React from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, PiggyBank, Calendar, BadgePercent, UserCheck, PercentCircle } from 'lucide-react';

const ReferralStats = () => {
  const { referralData, loading } = useReferralData();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-10 w-3/4" />
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
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'এই মাসে',
      value: referralData.currentMonthReferrals,
      icon: <Calendar className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'মোট উপার্জন',
      value: `${referralData.totalEarnings} ৳`,
      icon: <PiggyBank className="h-6 w-6 text-purple-500" />,
    },
    {
      title: 'রেফারেল রেট',
      value: `${referralData.referralRate} ৳`,
      icon: <BadgePercent className="h-6 w-6 text-amber-500" />,
    },
    {
      title: 'বৈধ কন্টাক্ট',
      value: referralData.validContacts,
      icon: <UserCheck className="h-6 w-6 text-pink-500" />,
    },
    {
      title: 'বৈধ শতাংশ',
      value: `${referralData.validContactPercentage}%`,
      icon: <PercentCircle className="h-6 w-6 text-indigo-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card hover:bg-accent/5 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-secondary/20">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h4 className="text-xl font-bold">{stat.value}</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ReferralStats;
