
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export const CourseAccess: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>কোর্স অ্যাকসেস</CardTitle>
        <CardDescription>শিক্ষার্থীদের অ্যাকসেস সেটিংস কনফিগার করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>অ্যাকসেস ডিউরেশন</Label>
              <Select defaultValue="unlimited">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="অ্যাকসেস ডিউরেশন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">৩০ দিন</SelectItem>
                  <SelectItem value="90days">৯০ দিন</SelectItem>
                  <SelectItem value="180days">১৮০ দিন</SelectItem>
                  <SelectItem value="365days">১ বছর</SelectItem>
                  <SelectItem value="unlimited">আনলিমিটেড</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>কনটেন্ট ডাউনলোড</Label>
              <Select defaultValue="allowed">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="ডাউনলোড সেটিংস" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allowed">অনুমোদিত</SelectItem>
                  <SelectItem value="disallowed">নিষিদ্ধ</SelectItem>
                  <SelectItem value="limited">সীমিত (শুধু নির্দিষ্ট ফাইল)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <Label className="block mb-2">অ্যাকসেস অপশন</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch id="drip-content" />
                <Label htmlFor="drip-content">ড্রিপ কনটেন্ট (ধাপে ধাপে কনটেন্ট প্রকাশ)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="sequential-progression" defaultChecked />
                <Label htmlFor="sequential-progression">সিকোয়েনশিয়াল প্রোগ্রেশন (ক্রমানুসারে শেখা)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="mobile-access" defaultChecked />
                <Label htmlFor="mobile-access">মোবাইল অ্যাকসেস</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
