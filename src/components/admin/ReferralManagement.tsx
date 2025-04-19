
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Users,
  Gift,
  Trophy,
  TrendingUp,
  Share2,
  Target,
  Percent,
} from 'lucide-react';

const ReferralManagement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">রেফারেল ম্যানেজমেন্ট</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-white to-blue-50/30">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">মোট রেফারেল</p>
              <p className="text-2xl font-bold">2,456</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-green-50/30">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">সক্রিয় ক্যাম্পেইন</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Trophy className="h-8 w-8 text-green-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-purple-50/30">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">মোট উপার্জন</p>
              <p className="text-2xl font-bold">৳24,560</p>
            </div>
            <Gift className="h-8 w-8 text-purple-500" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-amber-50/30">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">কনভার্সন রেট</p>
              <p className="text-2xl font-bold">12.4%</p>
            </div>
            <Percent className="h-8 w-8 text-amber-500" />
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>সক্রিয় ক্যাম্পেইন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: 'নতুন বছর ক্যাম্পেইন',
                target: 500,
                achieved: 324,
                reward: '৳100',
                ends: '7 দিন বাকি'
              },
              {
                name: 'প্রিমিয়াম সদস্য ক্যাম্পেইন',
                target: 200,
                achieved: 156,
                reward: '৳150',
                ends: '3 দিন বাকি'
              }
            ].map((campaign, index) => (
              <div key={index} className="p-4 bg-secondary/10 rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      টার্গেট: {campaign.target} রেফারেল
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      {campaign.achieved} অর্জন
                    </Badge>
                    <Badge variant="outline">
                      {campaign.reward} রিওয়ার্ড
                    </Badge>
                    <Badge variant="destructive">
                      {campaign.ends}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 w-full bg-secondary/20 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(campaign.achieved / campaign.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Referrals Table */}
      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক রেফারেল</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>রেফারার</TableHead>
                <TableHead>রেফারি</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead>রিওয়ার্ড</TableHead>
                <TableHead>তারিখ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  referrer: 'কামাল হাসান',
                  referee: 'রহিম মিয়া',
                  status: 'সম্পন্ন',
                  reward: '৳100',
                  date: '২৩ মার্চ ২০২৪'
                },
                {
                  referrer: 'সাবরিনা হক',
                  referee: 'নাদিয়া আলী',
                  status: 'পেন্ডিং',
                  reward: '৳100',
                  date: '২২ মার্চ ২০২৪'
                }
              ].map((referral, index) => (
                <TableRow key={index}>
                  <TableCell>{referral.referrer}</TableCell>
                  <TableCell>{referral.referee}</TableCell>
                  <TableCell>
                    <Badge variant={referral.status === 'সম্পন্ন' ? 'success' : 'warning'}>
                      {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{referral.reward}</TableCell>
                  <TableCell>{referral.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralManagement;
