import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ReferralStats } from '@/components/Referral/ReferralStats';
import { InviteTab } from '@/components/Referral/InviteTab';
import ContactsTab from '@/components/Referral/ContactsTab';
import LeaderboardTab from '@/components/Referral/LeaderboardTab';
import MilestonesTab from '@/components/Referral/MilestonesTab';
import EarningsTab from '@/components/Referral/EarningsTab';
import AnalyticsTab from '@/components/Referral/AnalyticsTab';
import SocialShareTab from '@/components/Referral/SocialShareTab';

const ReferralSystem = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">রেফারেল সিস্টেম</h1>
        <p className="text-muted-foreground">
          বন্ধুদের আমন্ত্রণ জানান এবং উপার্জন করুন
        </p>
      </div>

      <ReferralStats />

      <Card className="p-6">
        <Tabs defaultValue="invite" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="invite">আমন্ত্রণ</TabsTrigger>
            <TabsTrigger value="contacts">পরিচিতি</TabsTrigger>
            <TabsTrigger value="leaderboard">লিডারবোর্ড</TabsTrigger>
            <TabsTrigger value="milestones">মাইলস্টোন</TabsTrigger>
            <TabsTrigger value="earnings">আয়</TabsTrigger>
            <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
            <TabsTrigger value="social">সোশ্যাল শেয়ার</TabsTrigger>
          </TabsList>

          <TabsContent value="invite" className="mt-6">
            <InviteTab />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <ContactsTab />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <LeaderboardTab />
          </TabsContent>

          <TabsContent value="milestones" className="mt-6">
            <MilestonesTab />
          </TabsContent>

          <TabsContent value="earnings" className="mt-6">
            <EarningsTab />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="social" className="mt-6">
            <SocialShareTab />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ReferralSystem;
