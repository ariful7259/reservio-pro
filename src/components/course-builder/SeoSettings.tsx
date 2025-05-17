
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const SeoSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO সেটিংস</CardTitle>
        <CardDescription>সার্চ ইঞ্জিন অপটিমাইজেশন সেটিংস কনফিগার করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="meta-title">মেটা টাইটেল</Label>
            <Input id="meta-title" placeholder="আপনার কোর্সের মেটা টাইটেল" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="meta-description">মেটা বিবরণ</Label>
            <Textarea id="meta-description" placeholder="আপনার কোর্সের সার্চ ইঞ্জিন বিবরণ" rows={3} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="keywords">কিওয়ার্ড</Label>
            <Input id="keywords" placeholder="কমা দিয়ে কিওয়ার্ড আলাদা করুন" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
