
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
  CreditCard, 
  LayoutDashboard, 
  BarChart4, 
  Users
} from 'lucide-react';

interface CrossPlatformMonetizationProps {
  onSave: () => void;
  onEnable: (feature: string) => void;
}

const CrossPlatformMonetization: React.FC<CrossPlatformMonetizationProps> = ({ onSave, onEnable }) => {
  const [paymentGatewayEnabled, setPaymentGatewayEnabled] = useState(true);
  const [advertisementEnabled, setAdvertisementEnabled] = useState(true);
  const [dataAnalyticsEnabled, setDataAnalyticsEnabled] = useState(false);
  const [tieredMembershipEnabled, setTieredMembershipEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integrated Payment Gateway */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mt-1">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">ইনটিগ্রেটেড পেমেন্ট গেটওয়ে</h3>
                    <Badge variant={paymentGatewayEnabled ? "success" : "outline"}>
                      {paymentGatewayEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    প্রতিটি ট্রানজাকশনে ফি নেওয়া
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={paymentGatewayEnabled} 
                  onCheckedChange={(checked) => {
                    setPaymentGatewayEnabled(checked);
                    if (checked) onEnable("ইনটিগ্রেটেড পেমেন্ট গেটওয়ে");
                  }} 
                />
              </div>
            </div>

            {paymentGatewayEnabled && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="processing-fee-percentage">প্রোসেসিং ফি (%)</Label>
                    <Input 
                      id="processing-fee-percentage"
                      type="number"
                      defaultValue="2.5"
                      placeholder="প্রোসেসিং ফি"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fixed-fee">অতিরিক্ত ফিক্সড ফি (৳)</Label>
                    <Input 
                      id="fixed-fee"
                      type="number"
                      defaultValue="5"
                      placeholder="ফিক্সড ফি"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>পেমেন্ট মেথড অনুযায়ী ফি</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ক্রেডিট/ডেবিট কার্ড</span>
                        <span className="font-medium">৩.০% + ৫৳</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>মোবাইল ব্যাংকিং</span>
                        <span className="font-medium">১.৮% + ৩৳</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ইন্টারনেট ব্যাংকিং</span>
                        <span className="font-medium">২.২% + ৪৳</span>
                      </div>
                    </div>
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <span>ওয়ালেট</span>
                        <span className="font-medium">১.৫% + ৩৳</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>অতিরিক্ত সেটিংস</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="express-settlement" checked />
                      <Label htmlFor="express-settlement">এক্সপ্রেস সেটেলমেন্ট (অতিরিক্ত ১% ফি)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="international-payments" checked />
                      <Label htmlFor="international-payments">আন্তর্জাতিক পেমেন্ট (অতিরিক্ত ১.৫% ফি)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="recurring-billing" />
                      <Label htmlFor="recurring-billing">রিকারিং বিলিং</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>পেমেন্ট গেটওয়ে সেটিংস সেভ করুন</Button>
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
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                  <LayoutDashboard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">এডভার্টাইজমেন্ট</h3>
                    <Badge variant={advertisementEnabled ? "success" : "outline"}>
                      {advertisementEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    প্ল্যাটফর্মে বিজ্ঞাপন স্থান বিক্রয়
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={advertisementEnabled} 
                  onCheckedChange={(checked) => {
                    setAdvertisementEnabled(checked);
                    if (checked) onEnable("এডভার্টাইজমেন্ট");
                  }} 
                />
              </div>
            </div>

            {advertisementEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>বিজ্ঞাপন স্লট এবং মূল্য</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">হোম পেজ ব্যানার</h4>
                          <p className="text-xs text-muted-foreground">৭২০x৯০ পিক্সেল</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number"
                            defaultValue="15000"
                            placeholder="মূল্য"
                            className="w-24"
                          />
                          <span className="text-sm">/সপ্তাহ</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">সাইডবার বিজ্ঞাপন</h4>
                          <p className="text-xs text-muted-foreground">৩০০x২৫০ পিক্সেল</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number"
                            defaultValue="8000"
                            placeholder="মূল্য"
                            className="w-24"
                          />
                          <span className="text-sm">/সপ্তাহ</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">নিউজলেটার বিজ্ঞাপন</h4>
                          <p className="text-xs text-muted-foreground">৬০০x১৫০ পিক্সেল</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number"
                            defaultValue="12000"
                            placeholder="মূল্য"
                            className="w-24"
                          />
                          <span className="text-sm">/মাস</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">পপ-আপ বিজ্ঞাপন</h4>
                          <p className="text-xs text-muted-foreground">৫০০x৫০০ পিক্সেল</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="number"
                            defaultValue="20000"
                            placeholder="মূল্য"
                            className="w-24"
                          />
                          <span className="text-sm">/সপ্তাহ</span>
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

        {/* Data Analytics */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <BarChart4 className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">ডাটা অ্যানালিটিক্স</h3>
                    <Badge variant={dataAnalyticsEnabled ? "success" : "outline"}>
                      {dataAnalyticsEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ব্যবহারকারীর আচরণ এবং বাজার ট্রেন্ড সম্পর্কে বাণিজ্যিক ইনসাইট বিক্রয়
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={dataAnalyticsEnabled} 
                  onCheckedChange={(checked) => {
                    setDataAnalyticsEnabled(checked);
                    if (checked) onEnable("ডাটা অ্যানালিটিক্স");
                  }} 
                />
              </div>
            </div>

            {dataAnalyticsEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">বেসিক অ্যানালিটিক্স প্যাকেজ</h4>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          defaultValue="5000"
                          placeholder="মূল্য"
                          className="w-24"
                        />
                        <span className="text-sm">/মাস</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• ব্যবহারকারী ডেমোগ্রাফিক্স রিপোর্ট</p>
                      <p className="text-sm text-muted-foreground">• বেসিক ট্র্যাফিক অ্যানালিসিস</p>
                      <p className="text-sm text-muted-foreground">• মাসিক সারাংশ রিপোর্ট</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">অ্যাডভান্সড অ্যানালিটিক্স প্যাকেজ</h4>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          defaultValue="15000"
                          placeholder="মূল্য"
                          className="w-24"
                        />
                        <span className="text-sm">/মাস</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• বেসিক প্যাকেজের সকল ফিচার</p>
                      <p className="text-sm text-muted-foreground">• ব্যবহারকারী আচরণ বিশ্লেষণ</p>
                      <p className="text-sm text-muted-foreground">• বিক্রয় ট্রেন্ড এবং পূর্বাভাস</p>
                      <p className="text-sm text-muted-foreground">• প্রতিযোগীতামূলক বিশ্লেষণ</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 border-indigo-200 bg-indigo-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">এন্টারপ্রাইজ অ্যানালিটিক্স</h4>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          defaultValue="50000"
                          placeholder="মূল্য"
                          className="w-24"
                        />
                        <span className="text-sm">/মাস</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• অ্যাডভান্সড প্যাকেজের সকল ফিচার</p>
                      <p className="text-sm text-muted-foreground">• কাস্টম ড্যাশবোর্ড</p>
                      <p className="text-sm text-muted-foreground">• রিয়েল-টাইম ডাটা অ্যাক্সেস</p>
                      <p className="text-sm text-muted-foreground">• এক্সপোর্ট এবং API অ্যাক্সেস</p>
                      <p className="text-sm text-muted-foreground">• ডেডিকেটেড অ্যানালিস্ট সাপোর্ট</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>অ্যানালিটিক্স প্যাকেজ সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tiered Membership */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mt-1">
                  <Users className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">টিয়ার্ড মেম্বারশিপ</h3>
                    <Badge variant={tieredMembershipEnabled ? "success" : "outline"}>
                      {tieredMembershipEnabled ? "সক্রিয়" : "নিষ্ক্রিয়"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ফ্রি, বেসিক এবং প্রিমিয়াম মেম্বারশিপ প্ল্যান
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Switch 
                  checked={tieredMembershipEnabled} 
                  onCheckedChange={(checked) => {
                    setTieredMembershipEnabled(checked);
                    if (checked) onEnable("টিয়ার্ড মেম্বারশিপ");
                  }} 
                />
              </div>
            </div>

            {tieredMembershipEnabled && (
              <div className="mt-6 space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">ফ্রি টিয়ার</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">ফ্রি</Badge>
                        <Switch checked />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• লিমিটেড অ্যাক্সেস</p>
                      <p className="text-sm text-muted-foreground">• বিজ্ঞাপন সহ</p>
                      <p className="text-sm text-muted-foreground">• বেসিক ফিচার</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">বেসিক টিয়ার</h4>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          defaultValue="199"
                          placeholder="মূল্য"
                          className="w-24"
                        />
                        <span className="text-sm">/মাস</span>
                        <Switch checked />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• বিজ্ঞাপন মুক্ত</p>
                      <p className="text-sm text-muted-foreground">• অ্যাডভান্সড ফিচার</p>
                      <p className="text-sm text-muted-foreground">• প্রায়োরিটি সাপোর্ট</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 border-amber-200 bg-amber-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">প্রিমিয়াম টিয়ার</h4>
                        <Badge variant="warning">বেস্ট ভ্যালু</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          defaultValue="499"
                          placeholder="মূল্য"
                          className="w-24"
                        />
                        <span className="text-sm">/মাস</span>
                        <Switch checked />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">• সমস্ত ফিচার অসীম অ্যাক্সেস</p>
                      <p className="text-sm text-muted-foreground">• প্রিমিয়াম কন্টেন্ট</p>
                      <p className="text-sm text-muted-foreground">• ডেডিকেটেড সাপোর্ট</p>
                      <p className="text-sm text-muted-foreground">• এক্সক্লুসিভ ডিসকাউন্ট</p>
                      <p className="text-sm text-muted-foreground">• কাস্টম সার্ভিস</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button size="sm" onClick={onSave}>মেম্বারশিপ টিয়ার সেভ করুন</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrossPlatformMonetization;
