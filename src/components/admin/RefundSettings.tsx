
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertCircle, 
  RefreshCw, 
  Settings, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Save, 
  Undo
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const defaultRules = [
  {
    id: '1',
    name: 'প্রোডাক্ট ক্ষতিগ্রস্ত',
    description: 'প্রোডাক্ট ক্ষতিগ্রস্ত হলে অটোমেটিক রিফান্ড',
    active: true,
    refundPercentage: 100,
    requiresEvidence: true,
    timeLimit: 7,
    applyToAllProducts: true,
    priority: 1,
  },
  {
    id: '2',
    name: 'অর্ডার বাতিল',
    description: 'অর্ডার শিপমেন্টের আগে বাতিল করা হলে অটোমেটিক রিফান্ড',
    active: true,
    refundPercentage: 100,
    requiresEvidence: false,
    timeLimit: 2,
    applyToAllProducts: true,
    priority: 2,
  },
  {
    id: '3',
    name: 'ভুল প্রোডাক্ট পাঠানো',
    description: 'ভুল প্রোডাক্ট পাঠানো হলে অটোমেটিক রিফান্ড',
    active: true,
    refundPercentage: 100,
    requiresEvidence: true,
    timeLimit: 14,
    applyToAllProducts: true,
    priority: 3,
  },
];

const defaultConditions = [
  {
    id: '1',
    name: 'অর্ডার শিপ হওয়ার আগে',
    description: 'অর্ডার শিপ হওয়ার আগেই রিফান্ড রিকোয়েস্ট করা হলেই শুধু অটোমেটিক রিফান্ড হবে',
    active: true,
  },
  {
    id: '2',
    name: 'ফিরত পাঠানো প্রোডাক্ট',
    description: 'প্রোডাক্ট ফিরত পাঠানো হলেই শুধু রিফান্ড করা হবে',
    active: false,
  },
  {
    id: '3',
    name: 'প্রথম রিফান্ড',
    description: 'কাস্টমারের এই প্রথম রিফান্ড হলে অটোমেটিক রিফান্ড হবে',
    active: false,
  },
];

interface RefundSettingsProps {
  initialSettings?: {
    enableAutoRefund: boolean;
    autoRefundThreshold: number;
    notifyAdminThreshold: number;
    defaultRefundTime: number;
    requireEvidence: boolean;
    reviewsBeforeEligible: number;
    automaticRules: Array<any>;
    automaticConditions: Array<any>;
  };
}

const RefundSettings: React.FC<RefundSettingsProps> = ({ 
  initialSettings 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);
  const [autoRefundActive, setAutoRefundActive] = useState(initialSettings?.enableAutoRefund || false);
  
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    autoRefundThreshold: initialSettings?.autoRefundThreshold || 1000,
    notifyAdminThreshold: initialSettings?.notifyAdminThreshold || 5000,
    defaultRefundTime: initialSettings?.defaultRefundTime || 7,
    requireEvidence: initialSettings?.requireEvidence || true,
    reviewsBeforeEligible: initialSettings?.reviewsBeforeEligible || 3
  });
  
  // Rules settings
  const [rules, setRules] = useState(initialSettings?.automaticRules || defaultRules);
  
  // Conditions settings
  const [conditions, setConditions] = useState(initialSettings?.automaticConditions || defaultConditions);
  
  // Update the hasChanges flag when settings change
  useEffect(() => {
    setHasChanges(true);
  }, [generalSettings, autoRefundActive, rules, conditions]);
  
  const handleGeneralSettingsChange = (field: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };
  
  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, active: !rule.active } : rule
    ));
  };
  
  const handleToggleCondition = (conditionId: string) => {
    setConditions(conditions.map(condition => 
      condition.id === conditionId ? { ...condition, active: !condition.active } : condition
    ));
  };
  
  const handleUpdateRule = (ruleId: string, field: string, value: any) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, [field]: value } : rule
    ));
  };
  
  const handleSaveSettings = () => {
    // Here you would typically send the data to an API
    // For now we'll just display a toast
    toast({
      title: "সেটিংস সংরক্ষণ করা হয়েছে",
      description: "অটো রিফান্ড সেটিংস সফলভাবে আপডেট করা হয়েছে।",
    });
    setHasChanges(false);
  };
  
  const handleResetSettings = () => {
    setAutoRefundActive(initialSettings?.enableAutoRefund || false);
    setGeneralSettings({
      autoRefundThreshold: initialSettings?.autoRefundThreshold || 1000,
      notifyAdminThreshold: initialSettings?.notifyAdminThreshold || 5000,
      defaultRefundTime: initialSettings?.defaultRefundTime || 7,
      requireEvidence: initialSettings?.requireEvidence || true,
      reviewsBeforeEligible: initialSettings?.reviewsBeforeEligible || 3
    });
    setRules(initialSettings?.automaticRules || defaultRules);
    setConditions(initialSettings?.automaticConditions || defaultConditions);
    
    toast({
      title: "সেটিংস রিসেট করা হয়েছে",
      description: "অটো রিফান্ড সেটিংস পূর্বের অবস্থায় ফিরিয়ে আনা হয়েছে।",
    });
    
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">রিফান্ড সেটিংস</h1>
          <p className="text-muted-foreground">অটোমেটিক রিফান্ড সেটিংস কনফিগার করুন</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleResetSettings}
            disabled={!hasChanges}
          >
            <Undo className="h-4 w-4 mr-2" />
            রিসেট
          </Button>
          <Button 
            onClick={handleSaveSettings}
            disabled={!hasChanges}
          >
            <Save className="h-4 w-4 mr-2" />
            সংরক্ষণ
          </Button>
        </div>
      </div>
      
      <Card className="border-t-4 border-t-blue-500">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-lg">অটোমেটিক রিফান্ড</h3>
              <p className="text-sm text-muted-foreground">
                নির্দিষ্ট শর্ত পূরণ সাপেক্ষে স্বয়ংক্রিয়ভাবে রিফান্ড অনুমোদন করুন
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="autoRefund"
                checked={autoRefundActive}
                onCheckedChange={() => setAutoRefundActive(!autoRefundActive)}
              />
              <Label htmlFor="autoRefund">
                {autoRefundActive ? 'এক্টিভ' : 'ডিসেবল'}
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="general">জেনারেল সেটিংস</TabsTrigger>
          <TabsTrigger value="rules">রিফান্ড রুলস</TabsTrigger>
          <TabsTrigger value="conditions">রিফান্ড শর্তাবলী</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>জেনারেল সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="autoRefundThreshold">
                    অটোমেটিক রিফান্ড লিমিট (৳)
                  </Label>
                  <div className="flex items-center">
                    <span className="mr-2">৳</span>
                    <Input
                      id="autoRefundThreshold"
                      type="number"
                      value={generalSettings.autoRefundThreshold}
                      onChange={(e) => handleGeneralSettingsChange('autoRefundThreshold', parseInt(e.target.value))}
                      placeholder="1000"
                      disabled={!autoRefundActive}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    এই পরিমাণের কম হলে অটোমেটিক রিফান্ড হবে
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="notifyAdminThreshold">
                    অ্যাডমিন নোটিফিকেশন লিমিট (৳)
                  </Label>
                  <div className="flex items-center">
                    <span className="mr-2">৳</span>
                    <Input
                      id="notifyAdminThreshold"
                      type="number"
                      value={generalSettings.notifyAdminThreshold}
                      onChange={(e) => handleGeneralSettingsChange('notifyAdminThreshold', parseInt(e.target.value))}
                      placeholder="5000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    এই পরিমাণের বেশি হলে অ্যাডমিন নোটিফিকেশন পাবেন
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="defaultRefundTime">
                    ডিফল্ট রিফান্ড টাইম (দিন)
                  </Label>
                  <Input
                    id="defaultRefundTime"
                    type="number"
                    value={generalSettings.defaultRefundTime}
                    onChange={(e) => handleGeneralSettingsChange('defaultRefundTime', parseInt(e.target.value))}
                    placeholder="7"
                  />
                  <p className="text-xs text-muted-foreground">
                    কত দিনের মধ্যে রিফান্ড রিকোয়েস্ট করা যাবে
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="reviewsBeforeEligible">
                    যোগ্যতার জন্য নূন্যতম অর্ডার
                  </Label>
                  <Input
                    id="reviewsBeforeEligible"
                    type="number"
                    value={generalSettings.reviewsBeforeEligible}
                    onChange={(e) => handleGeneralSettingsChange('reviewsBeforeEligible', parseInt(e.target.value))}
                    placeholder="3"
                  />
                  <p className="text-xs text-muted-foreground">
                    কত সংখ্যক সফল অর্ডার করার পর অটো রিফান্ড পাওয়া যাবে
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="requireEvidence"
                  checked={generalSettings.requireEvidence}
                  onCheckedChange={(value) => handleGeneralSettingsChange('requireEvidence', value)}
                />
                <div>
                  <Label htmlFor="requireEvidence">প্রমাণ প্রয়োজন</Label>
                  <p className="text-xs text-muted-foreground">
                    রিফান্ডের সময় ছবি/ভিডিও প্রমাণ প্রয়োজন হবে
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>রিফান্ড রুলস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {rules.map((rule) => (
                <div key={rule.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{rule.name}</h3>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`rule-${rule.id}`}
                        checked={rule.active}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                      <Label htmlFor={`rule-${rule.id}`}>
                        {rule.active ? 'এক্টিভ' : 'ডিসেবল'}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`rule-percentage-${rule.id}`}>রিফান্ড শতাংশ</Label>
                      <div className="flex items-center">
                        <Input
                          id={`rule-percentage-${rule.id}`}
                          type="number"
                          value={rule.refundPercentage}
                          onChange={(e) => handleUpdateRule(rule.id, 'refundPercentage', parseInt(e.target.value))}
                          min="0"
                          max="100"
                          disabled={!rule.active}
                        />
                        <span className="ml-2">%</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`rule-timelimit-${rule.id}`}>সময়সীমা (দিন)</Label>
                      <Input
                        id={`rule-timelimit-${rule.id}`}
                        type="number"
                        value={rule.timeLimit}
                        onChange={(e) => handleUpdateRule(rule.id, 'timeLimit', parseInt(e.target.value))}
                        disabled={!rule.active}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`rule-priority-${rule.id}`}>অগ্রাধিকার</Label>
                      <Select 
                        value={rule.priority.toString()} 
                        onValueChange={(value) => handleUpdateRule(rule.id, 'priority', parseInt(value))}
                        disabled={!rule.active}
                      >
                        <SelectTrigger id={`rule-priority-${rule.id}`}>
                          <SelectValue placeholder="অগ্রাধিকার নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">উচ্চ</SelectItem>
                          <SelectItem value="2">মধ্যম</SelectItem>
                          <SelectItem value="3">নিম্ন</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`rule-evidence-${rule.id}`}
                      checked={rule.requiresEvidence}
                      onCheckedChange={(value) => handleUpdateRule(rule.id, 'requiresEvidence', value)}
                      disabled={!rule.active}
                    />
                    <Label htmlFor={`rule-evidence-${rule.id}`}>প্রমাণ প্রয়োজন</Label>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <div className="flex items-center">
                  <span className="mr-2">+</span> নতুন রুল যোগ করুন
                </div>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conditions">
          <Card>
            <CardHeader>
              <CardTitle>রিফান্ড শর্তাবলী</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {conditions.map((condition) => (
                <div key={condition.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{condition.name}</h3>
                      <p className="text-sm text-muted-foreground">{condition.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`condition-${condition.id}`}
                        checked={condition.active}
                        onCheckedChange={() => handleToggleCondition(condition.id)}
                      />
                      <Label htmlFor={`condition-${condition.id}`}>
                        {condition.active ? 'এক্টিভ' : 'ডিসেবল'}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <div className="flex items-center">
                  <span className="mr-2">+</span> নতুন শর্ত যোগ করুন
                </div>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RefundSettings;
