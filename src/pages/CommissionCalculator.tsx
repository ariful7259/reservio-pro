
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calculator,
  Plus,
  Minus,
  Save,
  FileText,
  Info,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface CommissionRule {
  id: string;
  name: string;
  type: 'fixed' | 'percentage';
  value: number;
  minAmount?: number;
  maxAmount?: number;
  applicableTo: string[];
}

const CommissionCalculator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('calculator');
  const [amount, setAmount] = useState<string>('1000');
  const [selectedRule, setSelectedRule] = useState<string>('standard');
  const [notes, setNotes] = useState<string>('');
  
  // কমিশন রুলস
  const [commissionRules, setCommissionRules] = useState<CommissionRule[]>([
    {
      id: 'standard',
      name: 'স্ট্যান্ডার্ড কমিশন',
      type: 'percentage',
      value: 10,
      applicableTo: ['marketplace', 'service', 'rental']
    },
    {
      id: 'premium',
      name: 'প্রিমিয়াম সেলার রেট',
      type: 'percentage',
      value: 7.5,
      minAmount: 10000,
      applicableTo: ['marketplace', 'service']
    },
    {
      id: 'fixed-small',
      name: 'স্মল পেমেন্ট ফি',
      type: 'fixed',
      value: 30,
      maxAmount: 1000,
      applicableTo: ['service']
    },
    {
      id: 'referral',
      name: 'রেফারাল কমিশন',
      type: 'percentage',
      value: 5,
      applicableTo: ['marketplace', 'rental', 'service']
    }
  ]);
  
  // কমিশন রেট সেট করার জন্য অবজেক্ট
  const [customRate, setCustomRate] = useState<CommissionRule>({
    id: 'custom-' + Date.now(),
    name: 'কাস্টম কমিশন',
    type: 'percentage',
    value: 5,
    applicableTo: ['marketplace', 'service', 'rental']
  });
  
  // সিলেক্টেড কমিশন রুল পাওয়ার ফাংশন
  const getSelectedRule = () => {
    return commissionRules.find(rule => rule.id === selectedRule);
  };

  // কমিশন গণনা করার ফাংশন
  const calculateCommission = () => {
    const rule = getSelectedRule();
    if (!rule) return 0;
    
    const amountValue = parseFloat(amount) || 0;
    
    if (rule.minAmount && amountValue < rule.minAmount) {
      return 0;
    }
    
    if (rule.maxAmount && amountValue > rule.maxAmount) {
      return 0;
    }
    
    if (rule.type === 'fixed') {
      return rule.value;
    } else {
      return (amountValue * rule.value) / 100;
    }
  };
  
  // কমিশন সেভ করার ফাংশন
  const saveCommissionRule = () => {
    // কাস্টম আইডি জেনারেট করি
    const newCustomRate = {
      ...customRate,
      id: 'custom-' + Date.now()
    };
    
    setCommissionRules([...commissionRules, newCustomRate]);
    setSelectedRule(newCustomRate.id);
    
    toast({
      title: "কমিশন রেট সংরক্ষিত হয়েছে",
      description: `${newCustomRate.name} সফলভাবে যোগ করা হয়েছে।`
    });
  };
  
  // কমিশন রুল ডিলিট করার ফাংশন
  const deleteCommissionRule = (id: string) => {
    // শুধু কাস্টম রুলস ডিলিট করা যাবে
    if (!id.startsWith('custom-')) {
      toast({
        title: "ডিলিট করা যাবে না",
        description: "শুধুমাত্র কাস্টম কমিশন রেট ডিলিট করা যাবে।",
        variant: "destructive"
      });
      return;
    }
    
    setCommissionRules(commissionRules.filter(rule => rule.id !== id));
    
    // যদি ডিলিট করা রুলটি সিলেক্টেড হয়ে থাকে, তাহলে ডিফল্টে যাই
    if (selectedRule === id) {
      setSelectedRule('standard');
    }
    
    toast({
      title: "কমিশন রেট ডিলিট করা হয়েছে",
      description: "কমিশন রেট সফলভাবে ডিলিট করা হয়েছে।"
    });
  };
  
  // টোটাল অ্যামাউন্ট গণনা করার ফাংশন
  const calculateTotalAmount = () => {
    const amountValue = parseFloat(amount) || 0;
    const commission = calculateCommission();
    return amountValue - commission;
  };

  return (
    <div className="container px-4 py-20">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">কমিশন ক্যালকুলেটর</h1>
        </div>
        <p className="text-muted-foreground">লেনদেনের উপর কমিশন হিসাব করুন এবং কমিশন রেট ম্যানেজ করুন</p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="calculator">ক্যালকুলেটর</TabsTrigger>
          <TabsTrigger value="rates">কমিশন রেট</TabsTrigger>
          <TabsTrigger value="history">হিসাব হিস্টোরি</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ক্যালকুলেটর ফর্ম */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>কমিশন ক্যালকুলেটর</CardTitle>
                  <CardDescription>
                    লেনদেন অ্যামাউন্ট এবং কমিশন রেট দিয়ে কমিশন হিসাব করুন
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">মোট পরিমাণ (৳)</Label>
                      <Input 
                        id="amount" 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commission-rule">কমিশন রেট</Label>
                      <Select value={selectedRule} onValueChange={setSelectedRule}>
                        <SelectTrigger>
                          <SelectValue placeholder="কমিশন রেট বেছে নিন" />
                        </SelectTrigger>
                        <SelectContent>
                          {commissionRules.map(rule => (
                            <SelectItem key={rule.id} value={rule.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{rule.name}</span>
                                <Badge variant="outline">
                                  {rule.type === 'percentage' ? `${rule.value}%` : `৳${rule.value}`}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {getSelectedRule()?.minAmount && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        এই রেট শুধুমাত্র ৳{getSelectedRule()?.minAmount?.toLocaleString()} টাকার বেশি লেনদেনের জন্য প্রযোজ্য।
                      </AlertDescription>
                    </Alert>
                  )}

                  {getSelectedRule()?.maxAmount && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        এই রেট শুধুমাত্র ৳{getSelectedRule()?.maxAmount?.toLocaleString()} টাকার কম লেনদেনের জন্য প্রযোজ্য।
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-3">
                      {getSelectedRule()?.type === 'percentage'
                        ? `${getSelectedRule()?.value}% হারে কমিশন প্রযোজ্য`
                        : `৳${getSelectedRule()?.value} ফিক্সড কমিশন প্রযোজ্য`}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">মোট পরিমাণ</p>
                        <p className="text-lg font-medium">৳{parseFloat(amount).toLocaleString() || 0}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">কমিশন</p>
                        <p className="text-lg font-medium text-red-500">৳{calculateCommission().toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">কমিশন বাদে পরিমাণ</p>
                        <p className="text-xl font-bold text-green-600">৳{calculateTotalAmount().toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label htmlFor="notes">নোটস</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="অতিরিক্ত নোট বা মন্তব্য লিখুন..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => {
                      setAmount('1000');
                      setSelectedRule('standard');
                      setNotes('');
                    }}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      রিসেট করুন
                    </Button>
                    <Button onClick={() => {
                      toast({
                        title: "কমিশন হিসাব সংরক্ষিত হয়েছে",
                        description: `৳${parseFloat(amount)} এর জন্য ৳${calculateCommission()} কমিশন হিসাব করা হয়েছে।`
                      });
                    }}>
                      <Save className="h-4 w-4 mr-2" />
                      হিসাব সেভ করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* কমিশন ব্রেকডাউন কার্ড */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>কমিশন ব্রেকডাউন</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">লেনদেন পরিমাণ:</span>
                      <span>৳{parseFloat(amount).toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">কমিশন রেট:</span>
                      <span>
                        {getSelectedRule()?.type === 'percentage'
                          ? `${getSelectedRule()?.value}%`
                          : `৳${getSelectedRule()?.value} (ফিক্সড)`}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium text-red-500">
                      <span>কমিশন পরিমাণ:</span>
                      <span>৳{calculateCommission().toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t mt-2">
                      <div className="flex justify-between font-bold">
                        <span>নেট পরিমাণ:</span>
                        <span className="text-green-600">৳{calculateTotalAmount().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-700 mb-1">রুল প্রযোজ্যতা</h4>
                        <p className="text-sm text-blue-600">
                          {getSelectedRule()?.name} প্রযোজ্য হয় 
                          {getSelectedRule()?.applicableTo.map((item, idx) => (
                            <span key={idx}>
                              {idx > 0 && idx === getSelectedRule()?.applicableTo.length - 1 ? ' এবং ' : idx > 0 ? ', ' : ' '}
                              {item === 'marketplace' ? 'মার্কেটপ্লেস' : 
                               item === 'service' ? 'সার্ভিস' : 
                               item === 'rental' ? 'রেন্টাল' : item}
                            </span>
                          ))} 
                          ক্যাটেগরিতে।
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline" onClick={() => setActiveTab('rates')}>
                    <Calculator className="h-4 w-4 mr-2" />
                    কমিশন রেট দেখুন
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="rates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* কমিশন রেটস তালিকা */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>কমিশন রেট তালিকা</CardTitle>
                  <CardDescription>সকল কমিশন রেট এবং নিয়ম</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {commissionRules.map(rule => (
                      <div key={rule.id} className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{rule.name}</h3>
                            <Badge variant={rule.id === selectedRule ? "default" : "outline"}>
                              {rule.id === selectedRule ? 'সিলেক্টেড' : ''}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedRule(rule.id)}
                            >
                              <Calculator className="h-4 w-4 mr-1" />
                              হিসাব করুন
                            </Button>
                            {rule.id.startsWith('custom-') && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => deleteCommissionRule(rule.id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">টাইপ:</span>
                            <span className="ml-2 font-medium">
                              {rule.type === 'percentage' ? 'পারসেন্টেজ' : 'ফিক্সড'}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">মান:</span>
                            <span className="ml-2 font-medium">
                              {rule.type === 'percentage' ? `${rule.value}%` : `৳${rule.value}`}
                            </span>
                          </div>
                          {rule.minAmount && (
                            <div>
                              <span className="text-muted-foreground">ন্যূনতম পরিমাণ:</span>
                              <span className="ml-2">৳{rule.minAmount}</span>
                            </div>
                          )}
                          {rule.maxAmount && (
                            <div>
                              <span className="text-muted-foreground">সর্বোচ্চ পরিমাণ:</span>
                              <span className="ml-2">৳{rule.maxAmount}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="text-xs text-muted-foreground">প্রযোজ্য:</span>
                          {rule.applicableTo.map((category) => (
                            <Badge key={category} variant="outline" className="text-xs">
                              {category === 'marketplace' ? 'মার্কেটপ্লেস' : 
                               category === 'service' ? 'সার্ভিস' : 'রেন্টাল'}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* নতুন কমিশন রেট যোগ করা */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>কাস্টম রেট তৈরি করুন</CardTitle>
                  <CardDescription>আপনার প্রয়োজন অনুযায়ী কমিশন রেট তৈরি করুন</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-name">রেট নাম</Label>
                    <Input 
                      id="custom-name" 
                      value={customRate.name}
                      onChange={(e) => setCustomRate({...customRate, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-type">রেট টাইপ</Label>
                    <Select 
                      value={customRate.type}
                      onValueChange={(value: 'fixed' | 'percentage') => setCustomRate({...customRate, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="রেট টাইপ বেছে নিন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">পারসেন্টেজ (%)</SelectItem>
                        <SelectItem value="fixed">ফিক্সড (৳)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="custom-value">
                      {customRate.type === 'percentage' ? 'পারসেন্টেজ মান (%)' : 'ফিক্সড মান (৳)'}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Slider 
                        min={customRate.type === 'percentage' ? 0 : 0}
                        max={customRate.type === 'percentage' ? 100 : 1000}
                        step={customRate.type === 'percentage' ? 0.5 : 5}
                        value={[customRate.value]}
                        onValueChange={(value) => setCustomRate({...customRate, value: value[0]})}
                      />
                      <span className="font-medium min-w-[4rem] text-center">
                        {customRate.type === 'percentage' ? `${customRate.value}%` : `৳${customRate.value}`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-min">ন্যূনতম পরিমাণ (ঐচ্ছিক)</Label>
                      <Input 
                        id="custom-min" 
                        type="number"
                        placeholder="0"
                        value={customRate.minAmount || ''}
                        onChange={(e) => setCustomRate({
                          ...customRate, 
                          minAmount: e.target.value ? parseInt(e.target.value) : undefined
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-max">সর্বোচ্চ পরিমাণ (ঐচ্ছিক)</Label>
                      <Input 
                        id="custom-max" 
                        type="number"
                        placeholder="কোন সীমা নেই"
                        value={customRate.maxAmount || ''}
                        onChange={(e) => setCustomRate({
                          ...customRate, 
                          maxAmount: e.target.value ? parseInt(e.target.value) : undefined
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>প্রযোজ্য ক্যাটাগরি</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['marketplace', 'service', 'rental'].map(category => {
                        const isSelected = customRate.applicableTo.includes(category);
                        return (
                          <Button
                            key={category}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            className={isSelected ? "bg-primary" : ""}
                            onClick={() => {
                              const newApplicableTo = isSelected
                                ? customRate.applicableTo.filter(item => item !== category)
                                : [...customRate.applicableTo, category];
                              
                              setCustomRate({...customRate, applicableTo: newApplicableTo});
                            }}
                          >
                            {category === 'marketplace' ? 'মার্কেটপ্লেস' : 
                             category === 'service' ? 'সার্ভিস' : 
                             category === 'rental' ? 'রেন্টাল' : category}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={saveCommissionRule}>
                    <Plus className="h-4 w-4 mr-2" />
                    রেট সেভ করুন
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">আপনার হিসাব হিস্টোরি</h3>
                <p className="text-muted-foreground mb-6 text-center">
                  আপনার কমিশন ক্যালকুলেশন হিস্টোরি এখানে দেখতে পারবেন। <br />
                  হিসাব করে সেভ করুন, তাহলে হিস্টোরিতে দেখতে পারবেন।
                </p>
                <Button 
                  onClick={() => setActiveTab('calculator')}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  নতুন হিসাব করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionCalculator;
