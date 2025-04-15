
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { WifiOff, Save, RefreshCw, Clock, HardDrive, MessageSquare, Lock } from 'lucide-react';
import OfflineIndicator from '@/components/OfflineIndicator';

interface OfflineState {
  enabled: boolean;
  autoDetect: boolean;
  notifications: {
    enabled: boolean;
    position: string;
    duration: number;
  };
  storage: {
    enabled: boolean;
    maxItems: number;
    expiry: number;
    priorityFeatures: string[];
  };
  sync: {
    autoSync: boolean;
    syncInterval: number;
    retryOnFail: boolean;
    maxRetries: number;
  };
  messages: {
    bn: string;
    en: string;
  };
}

const OfflineConfiguration = () => {
  const { toast } = useToast();
  
  const [offlineState, setOfflineState] = useState<OfflineState>({
    enabled: true,
    autoDetect: true,
    notifications: {
      enabled: true,
      position: 'bottom',
      duration: 5000,
    },
    storage: {
      enabled: true,
      maxItems: 100,
      expiry: 24,
      priorityFeatures: ['bookings', 'profile'],
    },
    sync: {
      autoSync: true,
      syncInterval: 30,
      retryOnFail: true,
      maxRetries: 3,
    },
    messages: {
      bn: "আপনি অফলাইন মোডে আছেন। কিছু ফিচার সীমিত হতে পারে। ইন্টারনেট সংযোগ পুনরায় স্থাপন করুন।",
      en: "You are offline. Some features may be limited. Please restore your internet connection."
    }
  });
  
  const handleFeatureToggle = (feature: keyof typeof offlineState, value: boolean) => {
    setOfflineState({
      ...offlineState,
      [feature]: value
    });
  };
  
  const handleNestedToggle = (
    parent: keyof typeof offlineState, 
    child: string, 
    value: boolean
  ) => {
    if (parent === 'notifications' || parent === 'storage' || parent === 'sync') {
      setOfflineState({
        ...offlineState,
        [parent]: {
          ...offlineState[parent],
          [child]: value
        }
      });
    }
  };
  
  const handleNestedValueChange = (
    parent: keyof typeof offlineState,
    child: string,
    value: any
  ) => {
    if (parent === 'notifications' || parent === 'storage' || parent === 'sync' || parent === 'messages') {
      setOfflineState({
        ...offlineState,
        [parent]: {
          ...offlineState[parent],
          [child]: value
        }
      });
    }
  };
  
  const handlePriorityFeatureToggle = (feature: string) => {
    const currentFeatures = [...offlineState.storage.priorityFeatures];
    const featureIndex = currentFeatures.indexOf(feature);
    
    if (featureIndex === -1) {
      currentFeatures.push(feature);
    } else {
      currentFeatures.splice(featureIndex, 1);
    }
    
    setOfflineState({
      ...offlineState,
      storage: {
        ...offlineState.storage,
        priorityFeatures: currentFeatures
      }
    });
  };
  
  const handleSave = () => {
    console.log('Saving offline configuration:', offlineState);
    
    toast({
      title: "অফলাইন কনফিগারেশন সেভ করা হয়েছে",
      description: "অফলাইন মোডের সেটিংস সফলভাবে সেভ করা হয়েছে।"
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WifiOff className="h-5 w-5" />
            <span>অফলাইন মোড কনফিগারেশন</span>
          </CardTitle>
          <CardDescription>
            অফলাইন মোড সম্পর্কিত সেটিংস যেমন স্টোরেজ, সিঙ্ক, এবং নোটিফিকেশন কনফিগার করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList>
              <TabsTrigger value="general">জেনারেল</TabsTrigger>
              <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
              <TabsTrigger value="storage">স্টোরেজ</TabsTrigger>
              <TabsTrigger value="sync">সিঙ্ক</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="offline-mode">অফলাইন মোড এনাবল করুন</Label>
                    <p className="text-sm text-muted-foreground">
                      অফলাইন মোড এনাবল করলে ইন্টারনেট না থাকা অবস্থায় ব্যবহারকারীরা অ্যাপ ব্যবহার করতে পারবেন।
                    </p>
                  </div>
                  <Switch 
                    id="offline-mode"
                    checked={offlineState.enabled}
                    onCheckedChange={(checked) => handleFeatureToggle('enabled', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-detect">অটো-ডিটেক্ট ইন্টারনেট</Label>
                    <p className="text-sm text-muted-foreground">
                      ইন্টারনেট কানেকশন অটোমেটিক ডিটেক্ট করে অফলাইন মোড সক্রিয় করুন।
                    </p>
                  </div>
                  <Switch 
                    id="auto-detect"
                    checked={offlineState.autoDetect}
                    onCheckedChange={(checked) => handleFeatureToggle('autoDetect', checked)}
                  />
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-medium">অফলাইন মেসেজ কাস্টমাইজেশন</h3>
                
                <div className="space-y-2">
                  <Label>বাংলা মেসেজ</Label>
                  <Input 
                    value={offlineState.messages.bn}
                    onChange={(e) => handleNestedValueChange('messages', 'bn', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>ইংরেজি মেসেজ</Label>
                  <Input 
                    value={offlineState.messages.en}
                    onChange={(e) => handleNestedValueChange('messages', 'en', e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications-enabled">অফলাইন নোটিফিকেশন</Label>
                    <p className="text-sm text-muted-foreground">
                      অ্যাপ অফলাইন হওয়ার সময় ব্যবহারকারীদের নোটিফিকেশন দেখান।
                    </p>
                  </div>
                  <Switch 
                    id="notifications-enabled"
                    checked={offlineState.notifications.enabled}
                    onCheckedChange={(checked) => handleNestedToggle('notifications', 'enabled', checked)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>নোটিফিকেশন পজিশন</Label>
                    <Select
                      value={offlineState.notifications.position}
                      onValueChange={(value) => handleNestedValueChange('notifications', 'position', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="পজিশন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top">উপরে</SelectItem>
                        <SelectItem value="top-right">উপরে-ডানে</SelectItem>
                        <SelectItem value="top-left">উপরে-বামে</SelectItem>
                        <SelectItem value="bottom">নিচে</SelectItem>
                        <SelectItem value="bottom-right">নিচে-ডানে</SelectItem>
                        <SelectItem value="bottom-left">নিচে-বামে</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>নোটিফিকেশন সময়কাল (মিলিসেকেন্ড)</Label>
                    <Input 
                      type="number"
                      value={offlineState.notifications.duration}
                      onChange={(e) => handleNestedValueChange('notifications', 'duration', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="font-medium mb-2">প্রিভিউ</h3>
                  <div className="border rounded-lg p-4 relative bg-slate-50">
                    <OfflineIndicator 
                      customPosition={offlineState.notifications.position}
                      customMessage={offlineState.messages}
                      customDuration={offlineState.notifications.duration}
                    />
                    <div className="h-32 flex items-center justify-center">
                      <p className="text-muted-foreground">অফলাইন মোড অ্যাকটিভ দেখতে এমন দেখাবে</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="storage" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="storage-enabled">অফলাইন স্টোরেজ এনাবল করুন</Label>
                    <p className="text-sm text-muted-foreground">
                      ডাটা লোকালি স্টোর করুন যাতে অফলাইন অবস্থায় ব্যবহারকারীরা এক্সেস করতে পারেন।
                    </p>
                  </div>
                  <Switch 
                    id="storage-enabled"
                    checked={offlineState.storage.enabled}
                    onCheckedChange={(checked) => handleNestedToggle('storage', 'enabled', checked)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>সর্বাধিক স্টোরেজ আইটেম</Label>
                    <Input 
                      type="number"
                      value={offlineState.storage.maxItems}
                      onChange={(e) => handleNestedValueChange('storage', 'maxItems', parseInt(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">
                      প্রতি ফিচারে সর্বাধিক কতগুলো আইটেম স্টোর করা হবে।
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>স্টোরেজ এক্সপায়ারি (ঘন্টা)</Label>
                    <Input 
                      type="number"
                      value={offlineState.storage.expiry}
                      onChange={(e) => handleNestedValueChange('storage', 'expiry', parseInt(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">
                      স্টোর করা ডাটা কতক্ষণ পর এক্সপায়ার হবে।
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>অগ্রাধিকার ফিচার</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    কোন ফিচারগুলো অফলাইন ব্যবহারের জন্য সর্বাধিক গুরুত্বপূর্ণ:
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'bookings', label: 'বুকিং' },
                      { id: 'profile', label: 'প্রোফাইল' },
                      { id: 'categories', label: 'ক্যাটাগরি' },
                      { id: 'services', label: 'সার্ভিস' },
                      { id: 'products', label: 'প্রোডাক্ট' },
                      { id: 'rentals', label: 'রেন্টাল' },
                      { id: 'settings', label: 'সেটিংস' },
                      { id: 'history', label: 'হিস্টোরি' }
                    ].map(feature => (
                      <Button
                        key={feature.id}
                        variant={offlineState.storage.priorityFeatures.includes(feature.id) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePriorityFeatureToggle(feature.id)}
                      >
                        {feature.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sync" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-sync">অটো-সিঙ্ক ডাটা</Label>
                    <p className="text-sm text-muted-foreground">
                      ব্যবহারকারী অনলাইন হওয়ার সাথে সাথে ডাটা সিঙ্ক করুন।
                    </p>
                  </div>
                  <Switch 
                    id="auto-sync"
                    checked={offlineState.sync.autoSync}
                    onCheckedChange={(checked) => handleNestedToggle('sync', 'autoSync', checked)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>সিঙ্ক ইন্টারভাল (সেকেন্ড)</Label>
                    <Input 
                      type="number"
                      value={offlineState.sync.syncInterval}
                      onChange={(e) => handleNestedValueChange('sync', 'syncInterval', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>সর্বাধিক রিট্রাই</Label>
                    <Input 
                      type="number"
                      value={offlineState.sync.maxRetries}
                      onChange={(e) => handleNestedValueChange('sync', 'maxRetries', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="retry-on-fail">ব্যর্থতায় পুনরায় চেষ্টা করুন</Label>
                    <p className="text-sm text-muted-foreground">
                      সিঙ্ক ব্যর্থ হলে স্বয়ংক্রিয়ভাবে পুনরায় চেষ্টা করুন।
                    </p>
                  </div>
                  <Switch 
                    id="retry-on-fail"
                    checked={offlineState.sync.retryOnFail}
                    onCheckedChange={(checked) => handleNestedToggle('sync', 'retryOnFail', checked)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button variant="outline" className="mr-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              রিসেট
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              কনফিগারেশন সেভ করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfflineConfiguration;
