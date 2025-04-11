
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
  Tag, 
  Star, 
  Link, 
  Shield
} from 'lucide-react';

interface MarketplaceMonetizationProps {
  onSave: () => void;
  onEnable: (feature: string) => void;
}

const MarketplaceMonetization: React.FC<MarketplaceMonetizationProps> = ({ onSave, onEnable }) => {
  const [salesCommissionEnabled, setSalesCommissionEnabled] = useState(true);
  const [listingFeeEnabled, setListingFeeEnabled] = useState(false);
  const [premiumListingEnabled, setPremiumListingEnabled] = useState(true);
  const [affiliateProgramEnabled, setAffiliateProgramEnabled] = useState(false);
  const [verificationBadgeEnabled, setVerificationBadgeEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Commission */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <BadgePercent className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">বিক্রয় কমিশন</h3>
                    <Badge variant={salesCommissionEnabled ? "success" : "outline"}>
                      {salesCommissionEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    প্রতিটি সফল বিক্রয়ের উপর নির্দিষ্ট শতাংশ কমিশন
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={salesCommissionEnabled} 
                  onCheckedChange={(checked) => {
                    setSalesCommissionEnabled(checked);
                    if (checked) onEnable("বিক্রয় কমিশন");
                  }} 
                />
              </div>
            </div>

            {salesCommissionEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">কমিশন হার (%)</Label>
                  <Input 
                    id="commission-rate"
                    type="number"
                    defaultValue="10"
                    placeholder="কমিশন হার"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>প্রোডাক্ট ক্যাটাগরি অনুযায়ী কমিশন</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ইলেকট্রনিক্স</span>
                        <span className="font-medium">৮%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ফ্যাশন</span>
                        <span className="font-medium">১২%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>হোম অ্যাপ্লায়েন্সেস</span>
                        <span className="font-medium">৯%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>হ্যান্ডিক্রাফট</span>
                        <span className="font-medium">৭%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>মিনিমাম লিস্টিং মূল্য সীমা</Label>
                  <Input 
                    type="number"
                    defaultValue="50"
                    placeholder="মিনিমাম লিস্টিং মূল্য"
                  />
                  <p className="text-xs text-muted-foreground">
                    প্রোডাক্টের ন্যূনতম বিক্রয়মূল্য
                  </p>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>কমিশন সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
                    প্রোডাক্ট লিস্ট করার জন্য মাসিক বা বার্ষিক ফি
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">মাসিক লিস্টিং ফি</h4>
                            <p className="text-sm text-muted-foreground">মাসে ৫০টি প্রোডাক্ট লিস্ট করা যাবে</p>
                          </div>
                          <div>
                            <Input 
                              type="number"
                              defaultValue="500"
                              placeholder="ফি পরিমাণ"
                              className="w-24"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">বার্ষিক লিস্টিং ফি</h4>
                            <p className="text-sm text-muted-foreground">একবার পেমেন্ট, ১ বছর সার্ভিস</p>
                          </div>
                          <div>
                            <Input 
                              type="number"
                              defaultValue="5000"
                              placeholder="ফি পরিমাণ"
                              className="w-24"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">প্রতি প্রোডাক্ট ফি</h4>
                            <p className="text-sm text-muted-foreground">প্রতিটি অতিরিক্ত প্রোডাক্টের জন্য</p>
                          </div>
                          <div>
                            <Input 
                              type="number"
                              defaultValue="20"
                              placeholder="ফি পরিমাণ"
                              className="w-24"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>লিস্টিং ফি সেভ করুন</Button>
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
                    লিস্টিংকে প্রমোট করার জন্য অতিরিক্ত ফি
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
                  <Label>প্রিমিয়াম লিস্টিং অপশন</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="featured-home-mp" checked />
                          <Label htmlFor="featured-home-mp">হোম পেজ ফিচার</Label>
                        </div>
                        <p className="text-xs ml-6 text-muted-foreground">হোম পেজে গ্রিডে প্রদর্শিত হবে</p>
                      </div>
                      <Badge>৳১,০০০/সপ্তাহ</Badge>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="promoted-mp" checked />
                          <Label htmlFor="promoted-mp">প্রমোটেড লিস্টিং</Label>
                        </div>
                        <p className="text-xs ml-6 text-muted-foreground">সার্চ রেজাল্টের শীর্ষে থাকবে</p>
                      </div>
                      <Badge>৳৫০০/সপ্তাহ</Badge>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="highlight-mp" checked />
                          <Label htmlFor="highlight-mp">হাইলাইট করুন</Label>
                        </div>
                        <p className="text-xs ml-6 text-muted-foreground">সোনালি বর্ডার দিয়ে হাইলাইট করা হবে</p>
                      </div>
                      <Badge>৳৩০০/সপ্তাহ</Badge>
                    </div>
                    
                    <div className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="urgent-mp" />
                          <Label htmlFor="urgent-mp">জরুরি বিক্রয়</Label>
                        </div>
                        <p className="text-xs ml-6 text-muted-foreground">"জরুরি বিক্রয়" ট্যাগ প্রদর্শিত হবে</p>
                      </div>
                      <Badge>৳২০০/সপ্তাহ</Badge>
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

        {/* Affiliate Program */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                  <Link className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">অ্যাফিলিয়েট প্রোগ্রাম</h3>
                    <Badge variant={affiliateProgramEnabled ? "success" : "outline"}>
                      {affiliateProgramEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    অন্যদের প্রোডাক্ট প্রমোট করার জন্য রেফারাল কমিশন
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={affiliateProgramEnabled} 
                  onCheckedChange={(checked) => {
                    setAffiliateProgramEnabled(checked);
                    if (checked) onEnable("অ্যাফিলিয়েট প্রোগ্রাম");
                  }} 
                />
              </div>
            </div>

            {affiliateProgramEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="affiliate-commission">অ্যাফিলিয়েট কমিশন (%)</Label>
                    <Input 
                      id="affiliate-commission"
                      type="number"
                      defaultValue="5"
                      placeholder="অ্যাফিলিয়েট কমিশন"
                    />
                    <p className="text-xs text-muted-foreground">
                      অ্যাফিলিয়েট লিঙ্ক থেকে সফল বিক্রয়ের শতাংশ
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cookie-duration">কুকি লাইফটাইম (দিন)</Label>
                    <Input 
                      id="cookie-duration"
                      type="number"
                      defaultValue="30"
                      placeholder="কুকি লাইফটাইম"
                    />
                    <p className="text-xs text-muted-foreground">
                      অ্যাফিলিয়েট লিঙ্ক মারফত ট্র্যাকিং হবে কতদিন
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>অ্যাফিলিয়েট সেটিংস</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="automatic-approval" checked />
                      <Label htmlFor="automatic-approval">অটোমেটিক অনুমোদন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="custom-banners" checked />
                      <Label htmlFor="custom-banners">কাস্টম ব্যানার প্রদান করুন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="tiered-commission" />
                      <Label htmlFor="tiered-commission">টিয়ার্ড কমিশন (বেশি বিক্রি = বেশি কমিশন)</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>অ্যাফিলিয়েট সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Verification Badge */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">ভেরিফিকেশন ব্যাজ</h3>
                    <Badge variant={verificationBadgeEnabled ? "success" : "outline"}>
                      {verificationBadgeEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    সার্টিফাইড বিক্রেতাদের জন্য ভেরিফিকেশন ব্যাজ ফি
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={verificationBadgeEnabled} 
                  onCheckedChange={(checked) => {
                    setVerificationBadgeEnabled(checked);
                    if (checked) onEnable("ভেরিফিকেশন ব্যাজ");
                  }} 
                />
              </div>
            </div>

            {verificationBadgeEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="verification-badge-fee">ভেরিফিকেশন ব্যাজ ফি (৳)</Label>
                    <Input 
                      id="verification-badge-fee"
                      type="number"
                      defaultValue="2000"
                      placeholder="ভেরিফিকেশন ব্যাজ ফি"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="badge-validity">ভেরিফিকেশন ব্যাজ বৈধতা</Label>
                    <Select defaultValue="365">
                      <SelectTrigger>
                        <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">৩০ দিন</SelectItem>
                        <SelectItem value="90">৩ মাস</SelectItem>
                        <SelectItem value="180">৬ মাস</SelectItem>
                        <SelectItem value="365">১ বছর</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>ভেরিফিকেশন প্রক্রিয়া</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="document-verification-mp" checked />
                      <Label htmlFor="document-verification-mp">ডকুমেন্ট ভেরিফিকেশন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="address-verification" checked />
                      <Label htmlFor="address-verification">ঠিকানা যাচাইকরণ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="quality-check" checked />
                      <Label htmlFor="quality-check">প্রোডাক্ট কোয়ালিটি চেক</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="customer-reviews" checked />
                      <Label htmlFor="customer-reviews">কাস্টমার রিভিউ (মিনিমাম ৪.০ স্টার)</Label>
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
      </div>
    </div>
  );
};

export default MarketplaceMonetization;
