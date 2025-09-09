import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building2,
  Percent,
  DollarSign,
  Shield,
  Settings,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  fees: number;
  type: 'card' | 'mobile' | 'bank';
}

export const PaymentGatewaySetup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('methods');
  const [commissionRate, setCommissionRate] = useState(5);
  const [autoWithdrawal, setAutoWithdrawal] = useState(false);
  const [minimumWithdrawal, setMinimumWithdrawal] = useState(1000);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'stripe', name: 'Stripe (কার্ড)', icon: CreditCard, enabled: true, fees: 2.9, type: 'card' },
    { id: 'paypal', name: 'PayPal', icon: CreditCard, enabled: true, fees: 3.5, type: 'card' },
    { id: 'bkash', name: 'bKash', icon: Smartphone, enabled: true, fees: 1.5, type: 'mobile' },
    { id: 'nagad', name: 'Nagad', icon: Smartphone, enabled: true, fees: 1.0, type: 'mobile' },
    { id: 'rocket', name: 'Rocket', icon: Smartphone, enabled: false, fees: 1.2, type: 'mobile' },
    { id: 'visa', name: 'Visa', icon: CreditCard, enabled: true, fees: 2.5, type: 'card' },
    { id: 'mastercard', name: 'Mastercard', icon: CreditCard, enabled: true, fees: 2.5, type: 'card' },
    { id: 'bank', name: 'ব্যাংক ট্রান্সফার', icon: Building2, enabled: false, fees: 0.5, type: 'bank' }
  ]);

  const togglePaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => prev.map(method => 
      method.id === methodId ? { ...method, enabled: !method.enabled } : method
    ));
    toast.success('পেমেন্ট মেথড আপডেট হয়েছে');
  };

  const handleSaveSettings = () => {
    toast.success('পেমেন্ট সেটিংস সেভ হয়েছে!');
  };

  const getMethodTypeColor = (type: string) => {
    switch (type) {
      case 'card': return 'bg-blue-100 text-blue-800';
      case 'mobile': return 'bg-green-100 text-green-800';
      case 'bank': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          পেমেন্ট গেটওয়ে ও রেভিনিউ মডেল
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="methods">পেমেন্ট মেথড</TabsTrigger>
            <TabsTrigger value="commission">কমিশন সেটিংস</TabsTrigger>
            <TabsTrigger value="withdrawal">উইথড্রয়াল</TabsTrigger>
          </TabsList>

          <TabsContent value="methods" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">সক্রিয় পেমেন্ট মেথড সমূহ</h3>
              
              <div className="grid gap-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div 
                      key={method.id}
                      className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                        method.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${method.enabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <IconComponent className={`h-4 w-4 ${method.enabled ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{method.name}</h4>
                            <Badge className={getMethodTypeColor(method.type)}>
                              {method.type === 'card' ? 'কার্ড' : method.type === 'mobile' ? 'মোবাইল' : 'ব্যাংক'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            ফি: {method.fees}% প্রতি লেনদেনে
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {method.enabled && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                        <Switch
                          checked={method.enabled}
                          onCheckedChange={() => togglePaymentMethod(method.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">নিরাপত্তা তথ্য</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      সকল পেমেন্ট SSL এনক্রিপশন ও PCI DSS কমপ্লায়েন্ট সিকিউরিটি সহ প্রসেস হয়।
                      আপনার গ্রাহকদের পেমেন্ট তথ্য সম্পূর্ণ নিরাপদ।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="commission" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">প্ল্যাটফর্ম কমিশন সেটিংস</h3>
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commission-rate">প্ল্যাটফর্ম কমিশন রেট (%)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="commission-rate"
                      type="number"
                      value={commissionRate}
                      onChange={(e) => setCommissionRate(Number(e.target.value))}
                      min="0"
                      max="50"
                      className="w-32"
                    />
                    <span className="text-sm text-muted-foreground">% প্রতি বিক্রয়ে</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    প্রতিটি কোর্স বিক্রয়ের উপর প্ল্যাটফর্ম কমিশন
                  </p>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <h4 className="font-medium">ক্রিয়েটর শেয়ার</h4>
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {100 - commissionRate}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        প্রতি বিক্রয়ে ক্রিয়েটর পাবেন
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Percent className="h-4 w-4 text-blue-600" />
                        <h4 className="font-medium">প্ল্যাটফর্ম শেয়ার</h4>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {commissionRate}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        প্রতি বিক্রয়ে প্ল্যাটফর্ম নিবে
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">কমিশন গণনা উদাহরণ</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        ১০০০ টাকার কোর্স বিক্রয়ে: ক্রিয়েটর পাবেন {1000 - (1000 * commissionRate / 100)} টাকা, 
                        প্ল্যাটফর্ম পাবে {1000 * commissionRate / 100} টাকা
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="withdrawal" className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">উইথড্রয়াল সেটিংস</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-withdrawal">অটো উইথড্রয়াল</Label>
                    <p className="text-sm text-muted-foreground">
                      নির্দিষ্ট পরিমাণ হলে স্বয়ংক্রিয়ভাবে উইথড্রয়াল করুন
                    </p>
                  </div>
                  <Switch
                    id="auto-withdrawal"
                    checked={autoWithdrawal}
                    onCheckedChange={setAutoWithdrawal}
                  />
                </div>

                {autoWithdrawal && (
                  <div className="space-y-2">
                    <Label htmlFor="min-withdrawal">মিনিমাম উইথড্রয়াল পরিমাণ (টাকা)</Label>
                    <Input
                      id="min-withdrawal"
                      type="number"
                      value={minimumWithdrawal}
                      onChange={(e) => setMinimumWithdrawal(Number(e.target.value))}
                      min="100"
                      className="w-48"
                    />
                    <p className="text-sm text-muted-foreground">
                      এই পরিমাণ জমা হলে স্বয়ংক্রিয়ভাবে উইথড্রয়াল হবে
                    </p>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">উইথড্রয়াল মেথড</h4>
                  <Select defaultValue="bkash">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bkash">bKash</SelectItem>
                      <SelectItem value="nagad">Nagad</SelectItem>
                      <SelectItem value="rocket">Rocket</SelectItem>
                      <SelectItem value="bank">ব্যাংক একাউন্ট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">একাউন্ট নম্বর</h4>
                  <Input placeholder="আপনার মোবাইল নম্বর বা একাউন্ট নম্বর" />
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">উইথড্রয়াল পলিসি</h4>
                      <ul className="text-sm text-green-700 mt-1 space-y-1">
                        <li>• সাপ্তাহিক উইথড্রয়াল: রবিবার</li>
                        <li>• প্রসেসিং সময়: ২-৩ কার্যদিবস</li>
                        <li>• মিনিমাম: ১০০ টাকা</li>
                        <li>• কোন উইথড্রয়াল ফি নেই</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveSettings}>
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস সেভ করুন
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};