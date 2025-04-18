
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useReferralData } from '@/hooks/useReferralData';
import { useContactManagement } from '@/hooks/useContactManagement';
import { useAuth } from '@/hooks/useAuth';
import ReferralStats from '@/components/Referral/ReferralStats';
import InviteTab from '@/components/Referral/InviteTab';
import EarningsTab from '@/components/Referral/EarningsTab';
import ContactsTab from '@/components/Referral/ContactsTab';
import LeaderboardTab from '@/components/Referral/LeaderboardTab';
import MilestonesTab from '@/components/Referral/MilestonesTab';
import SocialShareTab from '@/components/Referral/SocialShareTab';
import AnalyticsTab from '@/components/Referral/AnalyticsTab';
import KycTab from '@/components/Referral/KycTab';
import { Steps } from '@/components/ui/steps';

const ReferralSystem = () => {
  const [activeTab, setActiveTab] = useState('invite');
  const { user } = useAuth();
  const { referralData } = useReferralData();
  const { contacts } = useContactManagement();
  
  const steps = [
    { id: 'invite', label: 'ইনভাইট করুন' },
    { id: 'earnings', label: 'আমার উপার্জন' },
    { id: 'contacts', label: 'কন্টাক্টস' },
    { id: 'leaderboard', label: 'লিডারবোর্ড' },
    { id: 'milestones', label: 'মাইলস্টোন' },
    { id: 'social', label: 'শেয়ার' },
    { id: 'analytics', label: 'অ্যানালিটিক্স' },
    { id: 'kyc', label: 'KYC' },
  ];

  const tabIndexMap: Record<string, number> = {
    invite: 1,
    earnings: 2,
    contacts: 3,
    leaderboard: 4,
    milestones: 5,
    social: 6,
    analytics: 7,
    kyc: 8,
  };

  return (
    <div className="container px-4 pt-20 pb-24">
      <h1 className="text-2xl font-bold mb-2">রেফারেল সিস্টেম</h1>
      <p className="text-muted-foreground mb-6">
        বন্ধুদের আমন্ত্রণ জানান, রেফারেল ট্র্যাক করুন এবং পুরস্কার অর্জন করুন
      </p>

      {!user ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
            <p className="mb-4 text-center">রেফারেল সিস্টেম ব্যবহার করতে অনুগ্রহ করে লগইন করুন</p>
            <div className="flex gap-2">
              <a href="/login" className="px-4 py-2 bg-primary text-white rounded-md">লগইন করুন</a>
              <a href="/signup" className="px-4 py-2 border border-primary text-primary rounded-md">সাইন আপ করুন</a>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardContent className="pt-6">
              <ReferralStats />
            </CardContent>
          </Card>

          <div className="mb-8">
            <Steps 
              steps={steps} 
              currentStep={tabIndexMap[activeTab] || 1}
              className="mb-4"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6 flex-wrap h-auto p-1 gap-1">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id} className="flex-1 py-2">
                  {step.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="invite">
              <InviteTab />
            </TabsContent>

            <TabsContent value="earnings">
              <EarningsTab />
            </TabsContent>

            <TabsContent value="contacts">
              <ContactsTab />
            </TabsContent>

            <TabsContent value="leaderboard">
              <LeaderboardTab />
            </TabsContent>

            <TabsContent value="milestones">
              <MilestonesTab />
            </TabsContent>

            <TabsContent value="social">
              <SocialShareTab />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>

            <TabsContent value="kyc">
              <KycTab />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ReferralSystem;
