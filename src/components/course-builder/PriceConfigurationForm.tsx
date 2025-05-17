
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DollarSign } from 'lucide-react';

interface PriceConfigurationFormProps {
  coursePrice: string;
  setCoursePrice: (price: string) => void;
}

export const PriceConfigurationForm: React.FC<PriceConfigurationFormProps> = ({
  coursePrice,
  setCoursePrice
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>মূল্য নির্ধারণ</CardTitle>
        <CardDescription>আপনার কোর্সের মূল্য নির্ধারণ করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="price">কোর্স প্রাইস (টাকা)</Label>
              <div className="relative">
                <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  className="pl-9"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="discount">ডিসকাউন্টেড প্রাইস (টাকা)</Label>
              <div className="relative">
                <DollarSign className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="discount"
                  type="number"
                  placeholder="0.00"
                  className="pl-9"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>ক্যানসেল পলিসি</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="ক্যানসেল পলিসি সিলেক্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7-day">৭ দিনের রিফান্ড গ্যারান্টি</SelectItem>
                  <SelectItem value="30-day">৩০ দিনের রিফান্ড গ্যারান্টি</SelectItem>
                  <SelectItem value="no-refund">রিফান্ড নেই</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>কুপন সিস্টেম</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="coupon" />
                <Label htmlFor="coupon">কুপন সিস্টেম এনাবল করুন</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
