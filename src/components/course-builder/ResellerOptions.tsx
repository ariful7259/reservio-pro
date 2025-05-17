
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export const ResellerOptions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>রিসেলার অপশন</CardTitle>
        <CardDescription>রিসেলার প্রোগ্রামের মাধ্যমে আপনার কোর্স বিক্রি করতে অন্যদেরকে অনুমতি দিন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="reseller" />
            <Label htmlFor="reseller">রিসেলার প্রোগ্রাম এনাবল করুন</Label>
          </div>
          <div className="grid gap-4 pt-4 md:grid-cols-2">
            <div>
              <Label htmlFor="commission">রিসেলার কমিশন (%)</Label>
              <Input id="commission" type="number" placeholder="30" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="reseller-limit">রিসেলার সংখ্যা (সর্বোচ্চ)</Label>
              <Input id="reseller-limit" type="number" placeholder="Unlimited" className="mt-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
