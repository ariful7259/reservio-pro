
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Smartphone, 
  Banknote, 
  Settings,
  CheckCircle2,
  AlertCircle,
  Zap,
  Shield,
  DollarSign,
  Percent
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  isEnabled: boolean;
  setupRequired: boolean;
  transactionFee: string;
  description: string;
  features: string[];
}

const IntegratedPaymentGateway = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'bkash',
      name: 'বিকাশ',
      icon: <Smartphone className="h-5 w-5" />,
      isEnabled: true,
      setupRequired: false,
      transactionFee: '১.৮৫%',
      description: 'বাংলাদেশের জনপ্রিয় মোবাইল পেমেন্ট সার্ভিস',
      features: ['তাৎক্ষণিক পেমেন্ট', 'OTP ভেরিফিকেশন', 'রিফান্ড সাপোর্ট']
    },
    {
      id: 'nagad',
      name: 'নগদ',
      icon: <Smartphone className="h-5 w-5" />,
      isEnabled: true,
      setupRequired: false,
      transactionFee: '১.৫০%',
      description: 'ডাক বিভাগের ডিজিটাল পেমেন্ট সেবা',
      features: ['কম ট্রানজেকশন ফি', 'সরকারি নিরাপত্তা', 'দ্রুত প্রসেসিং']
    },
    {
      id: 'rocket',
      name: 'রকেট',
      icon: <Zap className="h-5 w-5" />,
      isEnabled: false,
      setupRequired: true,
      transactionFee: '২.০০%',
      description: 'ডাচ-বাংলা ব্যাংকের মোবাইল ব্যাংকিং সেবা',
      features: ['ব্যাংক-লেভেল সিকিউরিটি', 'একাধিক পেমেন্ট অপশন', 'ATM উত্তোলন']
    },
    {
      id: 'card',
      name: 'ক্রেডিট/ডেবিট কার্ড',
      icon: <CreditCard className="h-5 w-5" />,
      isEnabled: true,
      setupRequired: false,
      transactionFee: '২.৯০%',
      description: 'ভিসা, মাস্টারকার্ড এবং স্থানীয় কার্ড সাপোর্ট',
      features: ['আন্তর্জাতিক পেমেন্ট', '3D Secure', 'EMI সুবিধা']
    },
    {
      id: 'cod',
      name: 'ক্যাশ অন ডেলিভারি',
      icon: <Banknote className="h-5 w-5" />,
      isEnabled: true,
      setupRequired: false,
      transactionFee: 'ফ্রি',
      description: 'পণ্য পৌঁছানোর সময় নগদ টাকা পরিশোধ',
      features: ['কোন অগ্রিম পেমেন্ট নেই', 'কাস্টমার ট্রাস্ট', 'রিটার্ন সুবিধা']
    }
  ]);

  const [settings, setSettings] = useState({
    autoRefund: true,
    instantPayment: true,
    paymentNotification: true,
    fraudDetection: true,
    minimumAmount: '১০',
    maximumAmount: '১০০০০০'
  });

  const togglePaymentMethod = (methodId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === methodId 
          ? { ...method, isEnabled: !method.isEnabled }
          : method
      )
    );
    
    const method = paymentMethods.find(m => m.id === methodId);
    toast({
      title: `${method?.name} ${method?.isEnabled ? 'নিষ্ক্রিয়' : 'সক্রিয়'} করা হয়েছে`,
      description: `পেমেন্ট মেথড সফলভাবে আপডেট হয়েছে।`,
    });
  };

  const setupPaymentMethod = (methodId: string) => {
    toast({
      title: "সেটআপ প্রক্রিয়া শুরু",
      description: "পেমেন্ট মেথড কনফিগারেশন পেজে নিয়ে যাওয়া হচ্ছে...",
    });
  };

  const testPayment = () => {
    toast({
      title: "টেস্ট পেমেন্ট শুরু",
      description: "পেমেন্ট গেটওয়ে টেস্ট করা হচ্ছে...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            ইন্টিগ্রেটেড পেমেন্ট গেটওয়ে
          </h2>
          <p className="text-muted-foreground">
            আপনার স্টোরে একাধিক পেমেন্ট মেথড সেটআপ এবং ম্যানেজ করুন
          </p>
        </div>
        <Button onClick={testPayment} variant="outline">
          <Zap className="h-4 w-4 mr-2" />
          টেস্ট পেমেন্ট
        </Button>
      </div>

      <Tabs defaultValue="methods" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="methods">পেমেন্ট মেথড</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
          <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-6">
          {/* পেমেন্ট মেথড গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`transition-all ${
                method.isEnabled ? 'ring-2 ring-green-500/20 bg-green-50/50' : 'opacity-75'
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        method.isEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{method.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={method.isEnabled ? "default" : "secondary"}>
                            {method.isEnabled ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </Badge>
                          {method.setupRequired && !method.isEnabled && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              সেটআপ প্রয়োজন
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={method.isEnabled}
                      onCheckedChange={() => togglePaymentMethod(method.id)}
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">ট্রানজেকশন ফি:</span>
                    <span className="text-sm font-bold text-primary">{method.transactionFee}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">ফিচারসমূহ:</span>
                    <div className="space-y-1">
                      {method.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {method.setupRequired && !method.isEnabled && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setupPaymentMethod(method.id)}
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      সেটআপ করুন
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* পেমেন্ট ফ্লো প্রিভিউ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                পেমেন্ট ফ্লো প্রিভিউ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">কাস্টমার পেমেন্ট এক্সপেরিয়েন্স:</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">১</span>
                    <span>কাস্টমার চেকআউট পেজে যায়</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">২</span>
                    <span>পছন্দের পেমেন্ট মেথড সিলেক্ট করে</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">৩</span>
                    <span>নিরাপদ পেমেন্ট গেটওয়েতে রিডাইরেক্ট হয়</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">✓</span>
                    <span>পেমেন্ট সম্পন্ন হলে অর্ডার কনফার্ম হয়</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* জেনারেল সেটিংস */}
          <Card>
            <CardHeader>
              <CardTitle>জেনারেল সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">অটো রিফান্ড</h4>
                  <p className="text-sm text-muted-foreground">
                    অর্ডার ক্যান্সেল হলে স্বয়ংক্রিয়ভাবে রিফান্ড প্রসেস করুন
                  </p>
                </div>
                <Switch 
                  checked={settings.autoRefund}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoRefund: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">তাৎক্ষণিক পেমেন্ট</h4>
                  <p className="text-sm text-muted-foreground">
                    পেমেন্ট সফল হলে তাৎক্ষণিক অর্ডার কনফার্ম করুন
                  </p>
                </div>
                <Switch 
                  checked={settings.instantPayment}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, instantPayment: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">পেমেন্ট নোটিফিকেশন</h4>
                  <p className="text-sm text-muted-foreground">
                    প্রতিটি পেমেন্টের জন্য ইমেইল ও SMS নোটিফিকেশন পাঠান
                  </p>
                </div>
                <Switch 
                  checked={settings.paymentNotification}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, paymentNotification: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">ফ্রড ডিটেকশন</h4>
                  <p className="text-sm text-muted-foreground">
                    সন্দেহজনক পেমেন্ট চেক করুন এবং ব্লক করুন
                  </p>
                </div>
                <Switch 
                  checked={settings.fraudDetection}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, fraudDetection: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* পেমেন্ট লিমিট */}
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট লিমিট</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">সর্বনিম্ন পেমেন্ট (৳)</label>
                  <Input 
                    value={settings.minimumAmount}
                    onChange={(e) => setSettings(prev => ({ ...prev, minimumAmount: e.target.value }))}
                    placeholder="১০"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">সর্বোচ্চ পেমেন্ট (৳)</label>
                  <Input 
                    value={settings.maximumAmount}
                    onChange={(e) => setSettings(prev => ({ ...prev, maximumAmount: e.target.value }))}
                    placeholder="১০০০০০"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* পেমেন্ট পরিসংখ্যান */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold">৳২,৫০,০০০</div>
                <div className="text-xs text-muted-foreground">এই মাসের পেমেন্ট</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold">৯৮.৫%</div>
                <div className="text-xs text-muted-foreground">সাকসেস রেট</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Percent className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold">২.১%</div>
                <div className="text-xs text-muted-foreground">গড় ট্রানজেকশন ফি</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <AlertCircle className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-2xl font-bold">৩</div>
                <div className="text-xs text-muted-foreground">ব্লকড ট্রানজেকশন</div>
              </CardContent>
            </Card>
          </div>

          {/* পেমেন্ট মেথড ব্রেকডাউন */}
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট মেথড ব্যবহার</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">বিকাশ</span>
                  <span className="text-sm text-muted-foreground">৪৫%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">নগদ</span>
                  <span className="text-sm text-muted-foreground">৩২%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">ক্যাশ অন ডেলিভারি</span>
                  <span className="text-sm text-muted-foreground">১৮%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">কার্ড পেমেন্ট</span>
                  <span className="text-sm text-muted-foreground">৫%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegratedPaymentGateway;
