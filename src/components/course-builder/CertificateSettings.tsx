
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export const CertificateSettings: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সার্টিফিকেট সেটিংস</CardTitle>
        <CardDescription>কোর্স শেষে শিক্ষার্থীদের কি ধরনের সার্টিফিকেট দেয়া হবে</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="certificate-enabled" defaultChecked />
            <Label htmlFor="certificate-enabled">সার্টিফিকেট এনাবল করুন</Label>
          </div>
          
          <div className="grid gap-4 pt-4 md:grid-cols-2">
            <div>
              <Label>সার্টিফিকেট টাইপ</Label>
              <Select defaultValue="completion">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="সার্টিফিকেট টাইপ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completion">কমপ্লিশন সার্টিফিকেট</SelectItem>
                  <SelectItem value="participation">পার্টিসিপেশন সার্টিফিকেট</SelectItem>
                  <SelectItem value="achievement">অ্যাচিভমেন্ট সার্টিফিকেট</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>সার্টিফিকেট ফরম্যাট</Label>
              <Select defaultValue="pdf">
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="সার্টিফিকেট ফরম্যাট" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="jpg">JPG/PNG</SelectItem>
                  <SelectItem value="both">PDF এবং JPG উভয়</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2 pt-4">
            <Label>সার্টিফিকেট টেমপ্লেট</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                <img src="https://via.placeholder.com/150x100?text=Template+1" alt="Certificate Template 1" className="w-full rounded" />
                <p className="text-xs text-center mt-2">স্ট্যান্ডার্ড</p>
              </div>
              <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                <img src="https://via.placeholder.com/150x100?text=Template+2" alt="Certificate Template 2" className="w-full rounded" />
                <p className="text-xs text-center mt-2">প্রিমিয়াম</p>
              </div>
              <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                <img src="https://via.placeholder.com/150x100?text=Template+3" alt="Certificate Template 3" className="w-full rounded" />
                <p className="text-xs text-center mt-2">মিনিমাল</p>
              </div>
              <div className="border rounded-lg p-2 cursor-pointer hover:border-primary">
                <img src="https://via.placeholder.com/150x100?text=Custom" alt="Custom Certificate" className="w-full rounded" />
                <p className="text-xs text-center mt-2">কাস্টম</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
