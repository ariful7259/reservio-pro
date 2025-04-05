
import React from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Lock, CircleDashed, Gift, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MilestonesTab = () => {
  const { referralData, loading } = useReferralData();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
        <p>মাইলস্টোন লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!referralData) return null;

  return (
    <div className="space-y-6">
      {/* Current milestone progress */}
      <Card className="border-2 border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle>আপনার বর্তমান মাইলস্টোন</CardTitle>
          <CardDescription>
            আপনি এখন পর্যন্ত {referralData.totalReferrals} জন বন্ধুকে রেফার করেছেন
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referralData.milestones
            .filter(milestone => milestone.status === 'in-progress')
            .map((milestone) => (
              <div key={milestone.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{milestone.description}</h3>
                    <p className="text-sm text-muted-foreground">
                      {milestone.count} জন বন্ধু রেফার করুন
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{milestone.reward} ৳</p>
                    <p className="text-xs text-muted-foreground">
                      বোনাস পুরস্কার
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{referralData.totalReferrals} / {milestone.count}</span>
                    <span>{milestone.progress}% সম্পন্ন</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
                
                <p className="text-sm bg-amber-50 border border-amber-100 p-3 rounded-md text-amber-800">
                  <span className="font-semibold">মাত্র {milestone.count - referralData.totalReferrals} জন বাকি!</span> আপনি যখন {milestone.count} জন বন্ধুকে রেফার করবেন, তখন {milestone.reward} টাকা পুরস্কার পাবেন।
                </p>
              </div>
            ))}
            
          {!referralData.milestones.some(m => m.status === 'in-progress') && (
            <div className="text-center py-4">
              <p className="text-lg font-medium mb-2">অভিনন্দন!</p>
              <p>আপনি সকল মাইলস্টোন সম্পন্ন করেছেন। নতুন মাইলস্টোন শীঘ্রই যোগ করা হবে।</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* All milestones */}
      <Card>
        <CardHeader>
          <CardTitle>মাইলস্টোন প্রোগ্রেস</CardTitle>
          <CardDescription>
            সকল মাইলস্টোন এবং পুরস্কারের তালিকা
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {referralData.milestones.map((milestone) => {
              // Get status icon and colors
              const getStatusInfo = () => {
                switch (milestone.status) {
                  case 'completed':
                    return {
                      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
                      badge: <Badge className="bg-green-50 text-green-700 border border-green-200">সম্পূর্ণ</Badge>,
                      bgColor: 'bg-green-50',
                      borderColor: 'border-green-200'
                    };
                  case 'in-progress':
                    return {
                      icon: <CircleDashed className="h-6 w-6 text-amber-500 animate-pulse" />,
                      badge: <Badge className="bg-amber-50 text-amber-700 border border-amber-200">চলমান</Badge>,
                      bgColor: 'bg-amber-50',
                      borderColor: 'border-amber-200'
                    };
                  case 'locked':
                    return {
                      icon: <Lock className="h-6 w-6 text-gray-400" />,
                      badge: <Badge variant="outline" className="bg-gray-100 text-gray-500">লকড</Badge>,
                      bgColor: 'bg-gray-50',
                      borderColor: 'border-gray-200'
                    };
                  default:
                    return {
                      icon: <CircleDashed className="h-6 w-6 text-gray-500" />,
                      badge: <Badge variant="outline">অজানা</Badge>,
                      bgColor: 'bg-secondary/10',
                      borderColor: 'border-secondary/20'
                    };
                }
              };
              
              const statusInfo = getStatusInfo();
              
              return (
                <div 
                  key={milestone.id} 
                  className={`p-4 rounded-lg border ${statusInfo.borderColor} ${statusInfo.bgColor}`}
                >
                  <div className="flex items-start md:items-center gap-4 flex-col md:flex-row md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-white p-2 border">
                        {statusInfo.icon}
                      </div>
                      
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{milestone.description}</h3>
                          {statusInfo.badge}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {milestone.count} জন বন্ধু রেফার করুন
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Gift className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-bold">{milestone.reward} ৳</p>
                        <p className="text-xs text-muted-foreground">বোনাস পুরস্কার</p>
                      </div>
                    </div>
                  </div>
                  
                  {milestone.status !== 'locked' && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>
                          {milestone.status === 'completed' ? milestone.count : referralData.totalReferrals} / {milestone.count}
                        </span>
                        <span>{milestone.progress}% সম্পন্ন</span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  )}
                  
                  {milestone.status === 'completed' && (
                    <div className="mt-4">
                      <Button variant="outline" className="w-full gap-2">
                        <Trophy className="h-4 w-4" />
                        পুরস্কার দেখুন
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MilestonesTab;
