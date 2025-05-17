
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export const StudentEnrollment: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>শিক্ষার্থী এনরোলমেন্ট</CardTitle>
        <CardDescription>
          শিক্ষার্থীদের এনরোলমেন্ট সেটিংস কনফিগার করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>এনরোলমেন্ট টাইপ</Label>
              <Select defaultValue="open">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="এনরোলমেন্ট টাইপ সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">ওপেন এনরোলমেন্ট</SelectItem>
                  <SelectItem value="scheduled">শিডিউলড এনরোলমেন্ট</SelectItem>
                  <SelectItem value="application">অ্যাপ্লিকেশন বেসড</SelectItem>
                  <SelectItem value="invitation">শুধু আমন্ত্রণপত্র</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>শিক্ষার্থী সংখ্যা সীমা (সর্বোচ্চ)</Label>
              <Input placeholder="Unlimited" className="mt-2" />
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label className="block mb-2">এনরোলমেন্ট অপশন</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch id="waitlist" />
                <Label htmlFor="waitlist">ওয়েটলিস্ট এনাবল করুন</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-approval" />
                <Label htmlFor="auto-approval">অটো-অ্যাপ্রুভাল এনাবল করুন</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="bulk-import" />
                <Label htmlFor="bulk-import">বাল্ক ইম্পোর্ট এনাবল করুন</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
