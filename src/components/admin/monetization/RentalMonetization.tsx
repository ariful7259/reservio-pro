
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  Tag, 
  Star, 
  CreditCard,
  Shield,
  BadgePercent,
  CalendarDays
} from 'lucide-react';

interface RentalMonetizationProps {
  onSave: () => void;
  onEnable: (feature: string) => void;
}

const RentalMonetization: React.FC<RentalMonetizationProps> = ({ onSave, onEnable }) => {
  const [listingFeeEnabled, setListingFeeEnabled] = useState(true);
  const [premiumListingEnabled, setPremiumListingEnabled] = useState(true);
  const [bookingCommissionEnabled, setBookingCommissionEnabled] = useState(true);
  const [subscriptionModelEnabled, setSubscriptionModelEnabled] = useState(false);
  const [insuranceFeeEnabled, setInsuranceFeeEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listing Fee */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  <Tag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">লিস্টিং ফি</h3>
                    <Badge variant={listingFeeEnabled ? "success" : "outline"}>
                      {listingFeeEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    বাড়ি বা সম্পত্তি লিস্ট করার জন্য একটি নির্দিষ্ট ফি চার্জ করুন
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={listingFeeEnabled} 
                  onCheckedChange={(checked) => {
                    setListingFeeEnabled(checked);
                    if (checked) onEnable("লিস্টিং ফি");
                  }} 
                />
              </div>
            </div>

            {listingFeeEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="listing-fee">লিস্টিং ফি (৳)</Label>
                    <Input 
                      id="listing-fee"
                      type="number"
                      defaultValue="500"
                      placeholder="লিস্টিং ফি লিখুন"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="listing-duration">লিস্টিং সময়কাল</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">৭ দিন</SelectItem>
                        <SelectItem value="15">১৫ দিন</SelectItem>
                        <SelectItem value="30">৩০ দিন</SelectItem>
                        <SelectItem value="90">৯০ দিন</SelectItem>
                        <SelectItem value="180">১৮০ দিন</SelectItem>
                        <SelectItem value="365">১ বছর</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>ফি অপশন সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Premium Listing */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mt-1">
                  <Star className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">প্রিমিয়াম লিস্টিং</h3>
                    <Badge variant={premiumListingEnabled ? "success" : "outline"}>
                      {premiumListingEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    অতিরিক্ত ফি দিয়ে লিস্টিংকে হাইলাইট করার সুযোগ
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={premiumListingEnabled} 
                  onCheckedChange={(checked) => {
                    setPremiumListingEnabled(checked);
                    if (checked) onEnable("প্রিমিয়াম লিস্টিং");
                  }} 
                />
              </div>
            </div>

            {premiumListingEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>প্রিমিয়াম লিস্টিং পরিষেবা</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured-home" checked />
                      <Label htmlFor="featured-home">হোম পেজে ফিচার করুন (৳১,০০০)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="priority-search" checked />
                      <Label htmlFor="priority-search">অগ্রাধিকার সার্চ রেজাল্ট (৳৫০০)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium-badge" checked />
                      <Label htmlFor="premium-badge">প্রিমিয়াম ব্যাজ (৳২০০)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="virtual-tour" />
                      <Label htmlFor="virtual-tour">ভার্চুয়াল ট্যুর (৳৭০০)</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>প্রিমিয়াম অপশন সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Commission */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <BadgePercent className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">বুকিং কমিশন</h3>
                    <Badge variant={bookingCommissionEnabled ? "success" : "outline"}>
                      {bookingCommissionEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    বাড়ি/অ্যাপার্টমেন্ট/অফিস বুক করার সময় একটি কমিশন নিন (উভয় পক্ষ থেকে)
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={bookingCommissionEnabled} 
                  onCheckedChange={(checked) => {
                    setBookingCommissionEnabled(checked);
                    if (checked) onEnable("বুকিং কমিশন");
                  }} 
                />
              </div>
            </div>

            {bookingCommissionEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-commission">মালিকের কমিশন (%)</Label>
                    <Input 
                      id="owner-commission"
                      type="number"
                      defaultValue="2"
                      placeholder="মালিকের কমিশন"
                    />
                    <p className="text-xs text-muted-foreground">
                      প্রপার্টি মালিকের কাছ থেকে বুকিং মূল্যের শতাংশ হারে কমিশন
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="renter-commission">ভাড়াটিয়ার কমিশন (%)</Label>
                    <Input 
                      id="renter-commission"
                      type="number"
                      defaultValue="3"
                      placeholder="ভাড়াটিয়ার কমিশন"
                    />
                    <p className="text-xs text-muted-foreground">
                      ভাড়াটিয়ার কাছ থেকে বুকিং মূল্যের শতাংশ হারে কমিশন
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>কমিশন সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscription Model */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                  <CalendarDays className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">সাবস্ক্রিপশন মডেল</h3>
                    <Badge variant={subscriptionModelEnabled ? "success" : "outline"}>
                      {subscriptionModelEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    মাসিক ফি দিয়ে অসীম সংখ্যক লিস্টিং করার সুযোগ
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={subscriptionModelEnabled} 
                  onCheckedChange={(checked) => {
                    setSubscriptionModelEnabled(checked);
                    if (checked) onEnable("সাবস্ক্রিপশন মডেল");
                  }} 
                />
              </div>
            </div>

            {subscriptionModelEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">বেসিক প্ল্যান</h4>
                          <p className="text-sm text-muted-foreground">৫টি লিস্টিং, বেসিক সাপোর্ট</p>
                        </div>
                        <div>
                          <Badge>৳১,০০০/মাসিক</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">স্ট্যান্ডার্ড প্ল্যান</h4>
                          <p className="text-sm text-muted-foreground">১০টি লিস্টিং, প্রিমিয়াম সাপোর্ট</p>
                        </div>
                        <div>
                          <Badge>৳২,০০০/মাসিক</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 border-purple-200 bg-purple-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">প্রিমিয়াম প্ল্যান</h4>
                            <Badge variant="premium">জনপ্রিয়</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">অসীম লিস্টিং, VIP সাপোর্ট</p>
                        </div>
                        <div>
                          <Badge variant="premium">৳৫,০০০/মাসিক</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>প্ল্যান সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insurance Fee */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mt-1">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">ইনশুরেন্স ফি</h3>
                    <Badge variant={insuranceFeeEnabled ? "success" : "outline"}>
                      {insuranceFeeEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    রেন্টাল সম্পত্তির ইনশুরেন্স প্রদান করে অতিরিক্ত ফি
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={insuranceFeeEnabled} 
                  onCheckedChange={(checked) => {
                    setInsuranceFeeEnabled(checked);
                    if (checked) onEnable("ইনশুরেন্স ফি");
                  }} 
                />
              </div>
            </div>

            {insuranceFeeEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="insurance-percentage">ইনশুরেন্স ফি (%)</Label>
                    <Input 
                      id="insurance-percentage"
                      type="number"
                      defaultValue="5"
                      placeholder="ইনশুরেন্স ফি শতাংশ"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="insurance-provider">ইনশুরেন্স প্রোভাইডার</Label>
                    <Select defaultValue="greenDelta">
                      <SelectTrigger>
                        <SelectValue placeholder="প্রোভাইডার নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greenDelta">গ্রীন ডেল্টা ইনশুরেন্স</SelectItem>
                        <SelectItem value="metLife">মেটলাইফ</SelectItem>
                        <SelectItem value="pragati">প্রগতি ইনশুরেন্স</SelectItem>
                        <SelectItem value="reliance">রিলায়েন্স ইনশুরেন্স</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>ইনশুরেন্স কভারেজ</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="damage-coverage" checked />
                      <Label htmlFor="damage-coverage">সম্পত্তি ক্ষতি কভারেজ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="theft-coverage" checked />
                      <Label htmlFor="theft-coverage">চুরি কভারেজ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="liability-coverage" />
                      <Label htmlFor="liability-coverage">দায়বদ্ধতা কভারেজ</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>ইনশুরেন্স সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RentalMonetization;
