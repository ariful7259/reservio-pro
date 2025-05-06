
import React from 'react';
import { Shield, Check, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefundRule, RefundSettings } from './types';

interface RefundRulesProps {
  refundRules: RefundRule[];
  refundSettings: RefundSettings;
  setRefundRules: (rules: RefundRule[]) => void;
  setRefundSettings: (settings: RefundSettings) => void;
  toggleRuleStatus: (id: string) => void;
}

const RefundRules: React.FC<RefundRulesProps> = ({
  refundRules,
  refundSettings,
  setRefundSettings,
  toggleRuleStatus
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>রিফান্ড রুলস</CardTitle>
            <CardDescription>অটোমেটিক রিফান্ড রুলস কনফিগারেশন</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {refundRules.map(rule => (
                <div key={rule.id} className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{rule.title}</h3>
                      <Badge variant={rule.active ? "default" : "outline"}>
                        {rule.active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </Badge>
                    </div>
                    <Switch 
                      checked={rule.active}
                      onCheckedChange={() => toggleRuleStatus(rule.id)}
                    />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">ক্যাটাগরি:</span>
                      <Badge variant="outline" className="ml-2">
                        {rule.category === 'marketplace' ? 'মার্কেটপ্লেস' :
                         rule.category === 'service' ? 'সার্ভিস' :
                         rule.category === 'rental' ? 'রেন্টাল' : rule.category}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">রিফান্ড পরিমাণ:</span>
                      <span className="ml-2 font-medium">{rule.percent}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">সময়সীমা:</span>
                      <span className="ml-2">{rule.timeLimit} ঘন্টা</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-2 rounded text-sm">
                    <h4 className="font-medium mb-1">শর্তাবলী:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {rule.conditions.map((condition, i) => (
                        <li key={i} className="text-muted-foreground">{condition}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* অটোমেটিক রিফান্ড বিবরণ */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>অটোমেটিক রিফান্ড ইনফো</CardTitle>
            <CardDescription>অটোমেটিক রিফান্ড সম্পর্কে গাইডলাইন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-gray-50 border-gray-200">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                অটোমেটিক রিফান্ড সিস্টেম সেটআপ করার আগে সতর্কতা অবলম্বন করুন
              </AlertDescription>
            </Alert>
            
            <div>
              <h3 className="font-medium mb-2">কেন অটোমেটিক রিফান্ড?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span>কাস্টমার সন্তুষ্টি বাড়ায়</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span>ম্যানুয়াল প্রসেসিং সময় কমায়</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span>সেলারদের জন্য প্রক্রিয়া সরলীকরণ করে</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">রুলস সেটিং টিপস</h3>
              <ul className="space-y-1 text-sm text-muted-foreground pl-5 list-disc">
                <li>সবচেয়ে কমন রিফান্ড কারণ আগে অটোমেট করুন</li>
                <li>প্রতিটি রুলের শর্তাবলী স্পষ্টভাবে উল্লেখ করুন</li>
                <li>নির্দিষ্ট পরিমাণের বেশি রিফান্ডের জন্য ম্যানুয়াল রিভিউ রাখুন</li>
                <li>রুলস পর্যায়ক্রমে পরীক্ষা করে সেট করুন</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="font-medium mb-2">সর্বোচ্চ অটোরিফান্ড সেটিংস</h3>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="maxAmount">সর্বোচ্চ অটো রিফান্ড পরিমাণ</Label>
                  <span className="font-medium">৳{refundSettings.maxAutoRefundAmount}</span>
                </div>
                <Input 
                  id="maxAmount"
                  type="range" 
                  min="1000" 
                  max="50000" 
                  value={refundSettings.maxAutoRefundAmount}
                  onChange={(e) => setRefundSettings({...refundSettings, maxAutoRefundAmount: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="approvalAmount">অনুমোদন প্রয়োজন (পরিমাণ)</Label>
                  <span className="font-medium">৳{refundSettings.requireApprovalAbove}</span>
                </div>
                <Input 
                  id="approvalAmount"
                  type="range" 
                  min="1000" 
                  max="25000"
                  value={refundSettings.requireApprovalAbove}
                  onChange={(e) => setRefundSettings({...refundSettings, requireApprovalAbove: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="threshold">অটোরিফান্ড থ্রেশহোল্ড</Label>
                  <span className="font-medium">৳{refundSettings.autoRefundThreshold}</span>
                </div>
                <Input 
                  id="threshold"
                  type="range" 
                  min="500" 
                  max="10000" 
                  value={refundSettings.autoRefundThreshold}
                  onChange={(e) => setRefundSettings({...refundSettings, autoRefundThreshold: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="holdPeriod">হোল্ডিং পিরিয়ড (ঘন্টা)</Label>
                  <span className="font-medium">{refundSettings.holdPeriod} ঘন্টা</span>
                </div>
                <Input 
                  id="holdPeriod"
                  type="range" 
                  min="0" 
                  max="72" 
                  value={refundSettings.holdPeriod}
                  onChange={(e) => setRefundSettings({...refundSettings, holdPeriod: parseInt(e.target.value)})}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundRules;
