
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export const StudentCommunication: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>শিক্ষার্থী কমিউনিকেশন</CardTitle>
        <CardDescription>শিক্ষার্থীদের সাথে যোগাযোগের বিকল্প সেট করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>স্বাগত ইমেইল</Label>
              <Select defaultValue="enabled">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="স্বাগত ইমেইল সেটিংস" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">এনাবল করুন</SelectItem>
                  <SelectItem value="disabled">ডিসেবল করুন</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>কোর্স রিমাইন্ডার</Label>
              <Select defaultValue="weekly">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="রিমাইন্ডার ফ্রিকোয়েন্সি" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">দৈনিক</SelectItem>
                  <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                  <SelectItem value="biweekly">দ্বিসাপ্তাহিক</SelectItem>
                  <SelectItem value="monthly">মাসিক</SelectItem>
                  <SelectItem value="disabled">ডিসেবল করুন</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label className="block mb-2">কমিউনিকেশন চ্যানেল</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch id="email-notifications" defaultChecked />
                <Label htmlFor="email-notifications">ইমেইল নোটিফিকেশন</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sms-notifications" />
                <Label htmlFor="sms-notifications">এসএমএস নোটিফিকেশন</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="discussion-forum" defaultChecked />
                <Label htmlFor="discussion-forum">ডিসকাশন ফোরাম</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
