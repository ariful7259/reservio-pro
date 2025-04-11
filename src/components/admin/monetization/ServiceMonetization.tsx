
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BadgePercent, 
  Star, 
  Shield, 
  LayoutDashboard, 
  Gift
} from 'lucide-react';

interface ServiceMonetizationProps {
  onSave: () => void;
  onEnable: (feature: string) => void;
}

const ServiceMonetization: React.FC<ServiceMonetizationProps> = ({ onSave, onEnable }) => {
  const [serviceFeeEnabled, setServiceFeeEnabled] = useState(true);
  const [premiumListingEnabled, setPremiumListingEnabled] = useState(true);
  const [verificationFeeEnabled, setVerificationFeeEnabled] = useState(false);
  const [advertisementEnabled, setAdvertisementEnabled] = useState(false);
  const [referralProgramEnabled, setReferralProgramEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Fee */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <BadgePercent className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">সার্ভিস ফি</h3>
                    <Badge variant={serviceFeeEnabled ? "success" : "outline"}>
                      {serviceFeeEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    সার্ভিস বুকিংয়ের উপর নির্দিষ্ট শতাংশ কমিশন
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={serviceFeeEnabled} 
                  onCheckedChange={(checked) => {
                    setServiceFeeEnabled(checked);
                    if (checked) onEnable("সার্ভিস ফি");
                  }} 
                />
              </div>
            </div>

            {serviceFeeEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-provider-fee">সার্ভিস প্রোভাইডার ফি (%)</Label>
                    <Input 
                      id="service-provider-fee"
                      type="number"
                      defaultValue="10"
                      placeholder="সার্ভিস প্রোভাইডার ফি"
                    />
                    <p className="text-xs text-muted-foreground">
                      সার্ভিস প্রোভাইডারের কাছ থেকে সার্ভিস মূল্যের শতাংশ হারে ফি
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-fee">কাস্টমার ফি (%)</Label>
                    <Input 
                      id="customer-fee"
                      type="number"
                      defaultValue="5"
                      placeholder="কাস্টমার ফি"
                    />
                    <p className="text-xs text-muted-foreground">
                      কাস্টমারের কাছ থেকে সার্ভিস মূল্যের শতাংশ হারে ফি
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>সার্ভিস ক্যাটাগরি অনুযায়ী ফি</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>মেডিকেল সার্ভিস</span>
                        <span className="font-medium">১২%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>হোম সার্ভিস</span>
                        <span className="font-medium">৮%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ইদুকেশন/টিউশন</span>
                        <span className="font-medium">১০%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ট্রান্সপোর্ট</span>
                        <span className="font-medium">১৫%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>ফি সেটিংস সেভ করুন</Button>
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
                    সার্ভিস প্রোভাইডারদের অগ্রাধিকার সূচি বা ফিচার্ড লিস্টিং সুবিধা
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={premiumListingEnabled} 
                  onCheckedChange={(checked) => {
                    setPremiumListingEnabled(checked);
                    if (checked) onEnable("সার্ভিস প্রিমিয়াম লিস্টিং");
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
                      <Checkbox id="featured-service" checked />
                      <Label htmlFor="featured-service">টপ সার্ভিস প্রোভাইডার (৳২,০০০/মাস)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="priority-results" checked />
                      <Label htmlFor="priority-results">অগ্রাধিকার সার্চ রেজাল্ট (৳১,০০০/মাস)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium-service-badge" checked />
                      <Label htmlFor="premium-service-badge">প্রিমিয়াম প্রোভাইডার ব্যাজ (৳৫০০/মাস)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="highlighted-listing" />
                      <Label htmlFor="highlighted-listing">হাইলাইটেড লিস্টিং (৳৮০০/মাস)</Label>
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

        {/* Verification Fee */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">ভেরিফিকেশন ফি</h3>
                    <Badge variant={verificationFeeEnabled ? "success" : "outline"}>
                      {verificationFeeEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    সার্ভিস প্রোভাইডারদের ভেরিফিকেশন এবং KYC প্রসেসিং ফি
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={verificationFeeEnabled} 
                  onCheckedChange={(checked) => {
                    setVerificationFeeEnabled(checked);
                    if (checked) onEnable("ভেরিফিকেশন ফি");
                  }} 
                />
              </div>
            </div>

            {verificationFeeEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-fee">ভেরিফিকেশন ফি (৳)</Label>
                    <Input 
                      id="verification-fee"
                      type="number"
                      defaultValue="1000"
                      placeholder="ভেরিফিকেশন ফি"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ভেরিফিকেশন ফির যা অন্তর্ভুক্ত</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="identity-verification" checked />
                        <Label htmlFor="identity-verification">আইডেন্টিটি ভেরিফিকেশন</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="document-verification" checked />
                        <Label htmlFor="document-verification">ডকুমেন্ট ভেরিফিকেশন</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="experience-verification" checked />
                        <Label htmlFor="experience-verification">অভিজ্ঞতা যাচাই</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="background-check" />
                        <Label htmlFor="background-check">ব্যাকগ্রাউন্ড চেক</Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>ভেরিফিকেশন সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advertisement */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                  <LayoutDashboard className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">অ্যাডভার্টাইজমেন্ট</h3>
                    <Badge variant={advertisementEnabled ? "success" : "outline"}>
                      {advertisementEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    সার্ভিস প্রোভাইডারদের জন্য বিজ্ঞাপন প্ল্যাটফর্ম
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={advertisementEnabled} 
                  onCheckedChange={(checked) => {
                    setAdvertisementEnabled(checked);
                    if (checked) onEnable("অ্যাডভার্টাইজমেন্ট");
                  }} 
                />
              </div>
            </div>

            {advertisementEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>বিজ্ঞাপন স্লট এবং মূল্য</Label>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">হোমপেজ ব্যানার</h4>
                          <p className="text-xs text-muted-foreground">হোমপেজে প্রদর্শিত হবে</p>
                        </div>
                        <div>
                          <Badge>৳১০,০০০/সপ্তাহ</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">সার্চ রেজাল্ট ব্যানার</h4>
                          <p className="text-xs text-muted-foreground">সার্চ রেজাল্টের উপরে থাকবে</p>
                        </div>
                        <div>
                          <Badge>৳৭,০০০/সপ্তাহ</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">সাইডবার বিজ্ঞাপন</h4>
                          <p className="text-xs text-muted-foreground">সাইডবারে দেখানো হবে</p>
                        </div>
                        <div>
                          <Badge>৳৫,০০০/সপ্তাহ</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">ক্যাটাগরি পেজ</h4>
                          <p className="text-xs text-muted-foreground">নির্দিষ্ট ক্যাটাগরিতে দেখানো হবে</p>
                        </div>
                        <div>
                          <Badge>৳৬,০০০/সপ্তাহ</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>বিজ্ঞাপন সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center mt-1">
                  <Gift className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">রিফারেল প্রোগ্রাম</h3>
                    <Badge variant={referralProgramEnabled ? "success" : "outline"}>
                      {referralProgramEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    নতুন সার্ভিস প্রোভাইডার রেফার করলে রেফারাল বোনাস
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={referralProgramEnabled} 
                  onCheckedChange={(checked) => {
                    setReferralProgramEnabled(checked);
                    if (checked) onEnable("রিফারেল প্রোগ্রাম");
                  }} 
                />
              </div>
            </div>

            {referralProgramEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="referral-bonus">রিফারেল বোনাস (₹)</Label>
                    <Input 
                      id="referral-bonus"
                      type="number"
                      defaultValue="500"
                      placeholder="রিফারেল বোনাস"
                    />
                    <p className="text-xs text-muted-foreground">
                      এই পরিমাণ অর্থ রেফারার পাবেন যখন একজন নতুন সার্ভিস প্রোভাইডার সাইন আপ করবেন এবং প্রথম সার্ভিস কমপ্লিট করবেন
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referee-bonus">রেফারি বোনাস (₹)</Label>
                    <Input 
                      id="referee-bonus"
                      type="number"
                      defaultValue="300"
                      placeholder="রেফারি বোনাস"
                    />
                    <p className="text-xs text-muted-foreground">
                      যারা রেফারাল কোড ব্যবহার করে সাইন আপ করবেন তারা এই পরিমাণ অর্থ পাবেন
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>অতিরিক্ত সেটিংস</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="unlimited-referrals" checked />
                    <Label htmlFor="unlimited-referrals">আনলিমিটেড রেফারেল</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="multi-level-referrals" />
                    <Label htmlFor="multi-level-referrals">মাল্টি-লেভেল রেফারেল (২য় লেভেল: ১০০৳)</Label>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>রিফারেল সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceMonetization;
