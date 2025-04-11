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
  CalendarDays, 
  Users, 
  BookOpen,
  Video,
  FileText
} from 'lucide-react';

interface DigitalCreatorMonetizationProps {
  onSave: () => void;
  onEnable: (feature: string) => void;
}

const DigitalCreatorMonetization: React.FC<DigitalCreatorMonetizationProps> = ({ onSave, onEnable }) => {
  const [courseSalesCommissionEnabled, setCourseSalesCommissionEnabled] = useState(true);
  const [subscriptionModelEnabled, setSubscriptionModelEnabled] = useState(true);
  const [premiumMembershipEnabled, setPremiumMembershipEnabled] = useState(false);
  const [oneOnOneSessionEnabled, setOneOnOneSessionEnabled] = useState(false);
  const [digitalProductSalesEnabled, setDigitalProductSalesEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Sales Commission */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <BadgePercent className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">কোর্স বিক্রয় কমিশন</h3>
                    <Badge variant={courseSalesCommissionEnabled ? "success" : "outline"}>
                      {courseSalesCommissionEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    প্রতিটি কোর্স বিক্রয়ে নির্দিষ্ট শতাংশ কমিশন
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={courseSalesCommissionEnabled} 
                  onCheckedChange={(checked) => {
                    setCourseSalesCommissionEnabled(checked);
                    if (checked) onEnable("কোর্স বিক্রয় কমিশন");
                  }} 
                />
              </div>
            </div>

            {courseSalesCommissionEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-commission-rate">প্ল্যাটফর্ম কমিশন (%)</Label>
                    <Input 
                      id="course-commission-rate"
                      type="number"
                      defaultValue="15"
                      placeholder="কমিশন হার"
                    />
                    <p className="text-xs text-muted-foreground">
                      কোর্স বিক্রয় মূল্যের শতাংশ হারে কমিশন
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creator-share">ক্রিয়েটর শেয়ার (%)</Label>
                    <Input 
                      id="creator-share"
                      type="number"
                      defaultValue="85"
                      placeholder="ক্রিয়েটর শেয়ার"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      কোর্স বিক্রয় থেকে ক্রিয়েটরের প্রাপ্ত শতাংশ
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>কোর্স ক্যাটাগরি অনুযায়ী কমিশন</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>প্রোগ্রামিং</span>
                        <span className="font-medium">১২%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ডিজাইন</span>
                        <span className="font-medium">১৫%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ব্যবসা</span>
                        <span className="font-medium">১৮%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>পার্সোনাল ডেভেলপমেন্ট</span>
                        <span className="font-medium">২০%</span>
                      </div>
                    </div>
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
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">সাবস্ক্রিপশন মডেল</h3>
                    <Badge variant={subscriptionModelEnabled ? "success" : "outline"}>
                      {subscriptionModelEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    মাসিক সাবস্ক্রিপশন ফি দিয়ে অসীম কন্টেন্ট অ্যাক্সেস
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
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">মাসিক সাবস্ক্রিপশন</h4>
                            <p className="text-sm text-muted-foreground">সমস্ত কোর্স অ্যাক্সেস</p>
                          </div>
                          <div>
                            <Input 
                              type="number"
                              defaultValue="299"
                              placeholder="মূল্য"
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
                            <h4 className="font-medium">বার্ষিক সাবস্ক্রিপশন</h4>
                            <p className="text-sm text-muted-foreground">১৭% সাশ্রয়</p>
                          </div>
                          <div>
                            <Input 
                              type="number"
                              defaultValue="2999"
                              placeholder="মূল্য"
                              className="w-24"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">ক্রিয়েটর রেভিনিউ শেয়ারিং</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="revenue-share-model">রেভিনিউ শেয়ার মডেল</Label>
                          <Select defaultValue="watch-time">
                            <SelectTrigger>
                              <SelectValue placeholder="মডেল নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="watch-time">ওয়াচ টাইম</SelectItem>
                              <SelectItem value="per-view">ভিউ প্রতি</SelectItem>
                              <SelectItem value="engagement">এনগেজমেন্ট</SelectItem>
                              <SelectItem value="hybrid">হাইব্রিড</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="creator-pool">ক্রিয়েটর পুল (%)</Label>
                          <Input 
                            id="creator-pool"
                            type="number"
                            defaultValue="70"
                            placeholder="শতাংশ"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>সাবস্ক্রিপশন সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Premium Membership */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">প্রিমিয়াম মেম্বারশিপ</h3>
                    <Badge variant={premiumMembershipEnabled ? "success" : "outline"}>
                      {premiumMembershipEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    অতিরিক্ত ফিচার এবং সেবার জন্য অ্যাডভান্সড প্ল্যান
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={premiumMembershipEnabled} 
                  onCheckedChange={(checked) => {
                    setPremiumMembershipEnabled(checked);
                    if (checked) onEnable("প্রিমিয়াম মেম্বারশিপ");
                  }} 
                />
              </div>
            </div>

            {premiumMembershipEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">বেসিক প্ল্যান</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">ফ্রি</Badge>
                        <Switch checked />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• লিমিটেড কোর্স অ্যাক্সেস</p>
                      <p className="text-sm text-muted-foreground">• বেসিক ফিচার</p>
                      <p className="text-sm text-muted-foreground">• বিজ্ঞাপন সহ</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">প্রো প্ল্যান</h4>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          defaultValue="599"
                          placeholder="মূল্য"
                          className="w-24"
                        />
                        <Switch checked />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• সমস্ত কোর্স অ্যাক্সেস</p>
                      <p className="text-sm text-muted-foreground">• এক্সক্লুসিভ ছাড়</p>
                      <p className="text-sm text-muted-foreground">• বিজ্ঞাপন ছাড়া</p>
                      <p className="text-sm text-muted-foreground">• সার্টিফিকেট</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 border-purple-200 bg-purple-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">প্রিমিয়াম প্ল্যান</h4>
                        <Badge variant="premium">জনপ্রিয়</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          defaultValue="999"
                          placeholder="মূল্য"
                          className="w-24"
                        />
                        <Switch checked />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• সমস্ত প্রো ফিচার</p>
                      <p className="text-sm text-muted-foreground">• অফিসিয়াল সার্টিফিকেশন</p>
                      <p className="text-sm text-muted-foreground">• গ্রুপ কোচিং সেশন</p>
                      <p className="text-sm text-muted-foreground">• এডিটর্স চয়েস কন্টেন্ট</p>
                      <p className="text-sm text-muted-foreground">• ফ্রি নিউজলেটার</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>মেম্বারশিপ প্ল্যান সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* One-on-One Session */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mt-1">
                  <Video className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">ওয়ান-অন-ওয়ান সেশন</h3>
                    <Badge variant={oneOnOneSessionEnabled ? "success" : "outline"}>
                      {oneOnOneSessionEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    বিশেষজ্ঞদের সাথে একান্ত সেশনের জন্য ফি
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={oneOnOneSessionEnabled} 
                  onCheckedChange={(checked) => {
                    setOneOnOneSessionEnabled(checked);
                    if (checked) onEnable("ওয়ান-অন-ওয়ান সেশন");
                  }} 
                />
              </div>
            </div>

            {oneOnOneSessionEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-commission">প্ল্যাটফর্ম কমিশন (%)</Label>
                    <Input 
                      id="platform-commission"
                      type="number"
                      defaultValue="20"
                      placeholder="প্ল্যাটফর্ম কমিশন"
                    />
                    <p className="text-xs text-muted-foreground">
                      সেশন ফি থেকে প্ল্যাটফর্মের প্রাপ্ত শতাংশ
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentor-share">মেন্টর শেয়ার (%)</Label>
                    <Input 
                      id="mentor-share"
                      type="number"
                      defaultValue="80"
                      placeholder="মেন্টর শেয়ার"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      সেশন ফি থেকে মেন্টরের প্রাপ্ত শতাংশ
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>অতিরিক্ত সেটিংস</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="set-custom-rate" checked />
                      <Label htmlFor="set-custom-rate">মেন্টরদের কাস্টম রেট সেট করার অনুমতি দিন</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mentor-approval" checked />
                      <Label htmlFor="mentor-approval">নতুন মেন্টরদের জন্য অনুমোদন প্রক্রিয়া</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cancellation-fee" checked />
                      <Label htmlFor="cancellation-fee">লেইট ক্যান্সেলেশন ফি (৩০%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="bundle-discount" />
                      <Label htmlFor="bundle-discount">মাল্টিপল সেশন বুক করলে ছাড়</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>সেশন সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Digital Product Sales */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">ডিজিটাল পণ্য বিক্রয়</h3>
                    <Badge variant={digitalProductSalesEnabled ? "success" : "outline"}>
                      {digitalProductSalesEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ই-বুক, টেমপ্লেট, সফটওয়্যার টুল ইত্যাদি বিক্রয়
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={digitalProductSalesEnabled} 
                  onCheckedChange={(checked) => {
                    setDigitalProductSalesEnabled(checked);
                    if (checked) onEnable("ডিজিটাল পণ্য বিক্রয়");
                  }} 
                />
              </div>
            </div>

            {digitalProductSalesEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-commission">প্ল্যাটফর্ম কমিশন (%)</Label>
                    <Input 
                      id="product-commission"
                      type="number"
                      defaultValue="20"
                      placeholder="প্ল্যাটফর্ম কমিশন"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creator-product-share">ক্রিয়েটর শেয়ার (%)</Label>
                    <Input 
                      id="creator-product-share"
                      type="number"
                      defaultValue="80"
                      placeholder="ক্রিয়েটর শেয়ার"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>পণ্য ক্যাটাগরি অনুযায়ী কমিশন</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ই-বুক</span>
                        <span className="font-medium">১৫%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>টেমপ্লেট</span>
                        <span className="font-medium">১৮%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>সফটওয়্যার</span>
                        <span className="font-medium">২৫%</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>গ্রাফিক</span>
                        <span className="font-medium">২০%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>অতিরিক্ত সেটিংস</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pricing-tiers" checked />
                      <Label htmlFor="pricing-tiers">মাল্টিপল প্রাইসিং টিয়ার অনুমতি</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="content-review" checked />
                      <Label htmlFor="content-review">কন্টেন্ট পর্যালোচনা প্রক্রিয়া</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-samples" checked />
                      <Label htmlFor="free-samples">ফ্রি স্যাম্পল বিতরণের অনুমতি</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="time-limited-offers" />
                      <Label htmlFor="time-limited-offers">সীমিত সময়ের অফার</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>পণ্য বিক্রয় সেটিংস সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalCreatorMonetization;
