
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

import { WifiOff, Database, ServerOff, ListChecks, UserCog, ShoppingBag, Home, Building, Truck, Send, Trash2 } from 'lucide-react';
import OfflineIndicator from '@/components/OfflineIndicator';

interface OfflineConfig {
  enabled: boolean;
  notificationMessage: {
    bn: string;
    en: string;
  };
  notificationDuration: number;
  notificationPosition: string;
  automaticRetry: boolean;
  retryInterval: number;
  cacheStrategy: string;
  cacheExpiryTime: number;
  maxCacheSize: number;
  offlineFeatures: {
    browsing: boolean;
    productView: boolean;
    serviceView: boolean;
    rentalView: boolean;
    favorites: boolean;
  };
}

const OfflineConfiguration = () => {
  const { toast } = useToast();
  
  const [offlineConfig, setOfflineConfig] = useState<OfflineConfig>({
    enabled: true,
    notificationMessage: {
      bn: "আপনি অফলাইন মোডে আছেন। কিছু ফিচার সীমিত হতে পারে। ইন্টারনেট সংযোগ পুনরায় স্থাপন করুন।",
      en: "You are offline. Some features may be limited. Please restore your internet connection."
    },
    notificationDuration: 5000,
    notificationPosition: "bottom",
    automaticRetry: true,
    retryInterval: 30,
    cacheStrategy: "network-first",
    cacheExpiryTime: 24,
    maxCacheSize: 50,
    offlineFeatures: {
      browsing: true,
      productView: true,
      serviceView: true,
      rentalView: true,
      favorites: true
    }
  });
  
  const [showOfflinePreview, setShowOfflinePreview] = useState(false);
  
  const handleConfigChange = (
    field: keyof OfflineConfig, 
    value: any
  ) => {
    setOfflineConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNestedConfigChange = (
    parent: keyof OfflineConfig, 
    field: string, 
    value: any
  ) => {
    setOfflineConfig(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleMessageChange = (
    language: 'bn' | 'en', 
    value: string
  ) => {
    setOfflineConfig(prev => ({
      ...prev,
      notificationMessage: {
        ...prev.notificationMessage,
        [language]: value
      }
    }));
  };

  const handleFeatureToggle = (
    feature: keyof OfflineConfig['offlineFeatures'], 
    enabled: boolean
  ) => {
    setOfflineConfig(prev => ({
      ...prev,
      offlineFeatures: {
        ...prev.offlineFeatures,
        [feature]: enabled
      }
    }));
  };

  const handleSaveConfig = () => {
    // ডাটাবেস বা লোকাল স্টোরেজে কনফিগারেশন সেভ করার কোড
    console.log('Saving offline configuration:', offlineConfig);
    
    toast({
      title: "অফলাইন মোড কনফিগারেশন সেভ করা হয়েছে",
      description: "অফলাইন মোডের সেটিংস সফলভাবে আপডেট করা হয়েছে।",
    });
  };

  const handleClearCache = () => {
    // অফলাইন ক্যাশ ক্লিয়ার করার কোড
    console.log('Clearing offline cache...');
    
    toast({
      title: "অফলাইন ক্যাশ পরিষ্কার করা হয়েছে",
      description: "সব ক্যাশ ডাটা সফলভাবে মুছে ফেলা হয়েছে।",
      variant: "destructive"
    });
  };

  const handleTestOfflineMode = () => {
    setShowOfflinePreview(prev => !prev);
    
    if (!showOfflinePreview) {
      toast({
        title: "অফলাইন মোড টেস্টিং শুরু হয়েছে",
        description: "অ্যাপ এখন সিমুলেটেড অফলাইন মোডে চলছে।",
      });
    } else {
      toast({
        title: "অফলাইন মোড টেস্টিং বন্ধ হয়েছে",
        description: "অ্যাপ আবার অনলাইন মোডে ফিরে এসেছে।",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <WifiOff className="h-5 w-5" />
            <span>অফলাইন মোড কনফিগারেশন</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Switch 
              id="offline-enabled"
              checked={offlineConfig.enabled}
              onCheckedChange={(value) => handleConfigChange('enabled', value)}
            />
            <Label htmlFor="offline-enabled">
              {offlineConfig.enabled ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
            </Label>
          </div>
        </CardHeader>
        <CardContent>
          {!offlineConfig.enabled ? (
            <div className="py-8 text-center text-muted-foreground">
              <WifiOff className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p>অফলাইন মোড বর্তমানে নিষ্ক্রিয় আছে।</p>
              <p className="text-sm">অফলাইন ফিচার কনফিগার করতে প্রথমে এটি সক্রিয় করুন।</p>
            </div>
          ) : (
            <div className="space-y-6">
              <Tabs defaultValue="notification">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="notification" className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>নোটিফিকেশন</span>
                  </TabsTrigger>
                  <TabsTrigger value="caching" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span>ক্যাশিং</span>
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center gap-2">
                    <ListChecks className="h-4 w-4" />
                    <span>ফিচারসমূহ</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="notification" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>বাংলা নোটিফিকেশন মেসেজ</Label>
                        <Textarea 
                          placeholder="অফলাইন হওয়ার সময় বাংলা মেসেজ লিখুন"
                          value={offlineConfig.notificationMessage.bn}
                          onChange={(e) => handleMessageChange('bn', e.target.value)}
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>ইংরেজি নোটিফিকেশন মেসেজ</Label>
                        <Textarea 
                          placeholder="অফলাইন হওয়ার সময় ইংরেজি মেসেজ লিখুন"
                          value={offlineConfig.notificationMessage.en}
                          onChange={(e) => handleMessageChange('en', e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>নোটিফিকেশন পজিশন</Label>
                        <Select 
                          value={offlineConfig.notificationPosition}
                          onValueChange={(value) => handleConfigChange('notificationPosition', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="পজিশন নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">স্ক্রিনের উপরে</SelectItem>
                            <SelectItem value="bottom">স্ক্রিনের নিচে</SelectItem>
                            <SelectItem value="top-right">উপরে-ডানদিকে</SelectItem>
                            <SelectItem value="top-left">উপরে-বামদিকে</SelectItem>
                            <SelectItem value="bottom-right">নিচে-ডানদিকে</SelectItem>
                            <SelectItem value="bottom-left">নিচে-বামদিকে</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>নোটিফিকেশনের সময়কাল ({offlineConfig.notificationDuration / 1000} সেকেন্ড)</Label>
                        <Slider 
                          value={[offlineConfig.notificationDuration / 1000]} 
                          min={0} 
                          max={15} 
                          step={1}
                          onValueChange={(value) => handleConfigChange('notificationDuration', value[0] * 1000)}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0s</span>
                          <span>15s</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          0 সেট করলে নোটিফিকেশন স্থায়ীভাবে দেখাবে
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Switch 
                          id="automatic-retry"
                          checked={offlineConfig.automaticRetry}
                          onCheckedChange={(value) => handleConfigChange('automaticRetry', value)}
                        />
                        <Label htmlFor="automatic-retry">স্বয়ংক্রিয়ভাবে পুনঃচেষ্টা করুন</Label>
                      </div>
                      
                      {offlineConfig.automaticRetry && (
                        <div className="space-y-2">
                          <Label>পুনঃচেষ্টার অন্তর্বর্তী সময় ({offlineConfig.retryInterval} সেকেন্ড)</Label>
                          <Slider 
                            value={[offlineConfig.retryInterval]} 
                            min={5} 
                            max={120} 
                            step={5}
                            onValueChange={(value) => handleConfigChange('retryInterval', value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>5s</span>
                            <span>120s</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="caching" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>ক্যাশিং স্ট্র্যাটেজি</Label>
                        <Select 
                          value={offlineConfig.cacheStrategy}
                          onValueChange={(value) => handleConfigChange('cacheStrategy', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="ক্যাশিং স্ট্র্যাটেজি নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="network-first">নেটওয়ার্ক ফার্স্ট (ফলব্যাক টু ক্যাশ)</SelectItem>
                            <SelectItem value="cache-first">ক্যাশ ফার্স্ট (ব্যাকগ্রাউন্ড আপডেট)</SelectItem>
                            <SelectItem value="network-only">শুধুমাত্র নেটওয়ার্ক</SelectItem>
                            <SelectItem value="cache-only">শুধুমাত্র ক্যাশ</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          {offlineConfig.cacheStrategy === 'network-first' && 'প্রথমে নেটওয়ার্ক থেকে ডাটা লোড করবে, ব্যর্থ হলে ক্যাশ থেকে লোড করবে।'}
                          {offlineConfig.cacheStrategy === 'cache-first' && 'প্রথমে ক্যাশ থেকে ডাটা লোড করবে, পরে ব্যাকগ্রাউন্ডে আপডেট করবে।'}
                          {offlineConfig.cacheStrategy === 'network-only' && 'শুধুমাত্র নেটওয়ার্ক থেকে ডাটা লোড করবে, অফলাইনে ব্যর্থ হবে।'}
                          {offlineConfig.cacheStrategy === 'cache-only' && 'শুধুমাত্র ক্যাশ থেকে ডাটা লোড করবে, নেটওয়ার্ক থেকে আপডেট করবে না।'}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>সর্বাধিক ক্যাশ সাইজ ({offlineConfig.maxCacheSize} MB)</Label>
                        <Slider 
                          value={[offlineConfig.maxCacheSize]} 
                          min={10} 
                          max={500} 
                          step={10}
                          onValueChange={(value) => handleConfigChange('maxCacheSize', value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>10 MB</span>
                          <span>500 MB</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>ক্যাশ মেয়াদ উত্তীর্ণ সময় ({offlineConfig.cacheExpiryTime} ঘন্টা)</Label>
                        <Slider 
                          value={[offlineConfig.cacheExpiryTime]} 
                          min={1} 
                          max={72} 
                          step={1}
                          onValueChange={(value) => handleConfigChange('cacheExpiryTime', value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 ঘন্টা</span>
                          <span>72 ঘন্টা</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button 
                          variant="destructive" 
                          className="flex items-center gap-2"
                          onClick={handleClearCache}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>ক্যাশ পরিষ্কার করুন</span>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          সতর্কতা: এটি সমস্ত ক্যাশ ডাটা মুছে ফেলবে। অফলাইন ডাটার সব হারিয়ে যাবে।
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    অফলাইন মোডে কোন ফিচারগুলি কাজ করবে তা নির্বাচন করুন।
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="bg-muted/40">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Home className="h-5 w-5 text-primary" />
                            <Label htmlFor="feature-browsing" className="font-medium">ব্রাউজিং</Label>
                          </div>
                          <Switch 
                            id="feature-browsing"
                            checked={offlineConfig.offlineFeatures.browsing}
                            onCheckedChange={(value) => handleFeatureToggle('browsing', value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          ব্যবহারকারীরা অফলাইনে অ্যাপ ব্রাউজ করতে পারবেন।
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                            <Label htmlFor="feature-product" className="font-medium">প্রোডাক্ট ভিউ</Label>
                          </div>
                          <Switch 
                            id="feature-product"
                            checked={offlineConfig.offlineFeatures.productView}
                            onCheckedChange={(value) => handleFeatureToggle('productView', value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          ব্যবহারকারীরা অফলাইনে পূর্বে দেখা প্রোডাক্ট দেখতে পারবেন।
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5 text-primary" />
                            <Label htmlFor="feature-service" className="font-medium">সার্ভিস ভিউ</Label>
                          </div>
                          <Switch 
                            id="feature-service"
                            checked={offlineConfig.offlineFeatures.serviceView}
                            onCheckedChange={(value) => handleFeatureToggle('serviceView', value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          ব্যবহারকারীরা অফলাইনে পূর্বে দেখা সার্ভিস দেখতে পারবেন।
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-primary" />
                            <Label htmlFor="feature-rental" className="font-medium">রেন্টাল ভিউ</Label>
                          </div>
                          <Switch 
                            id="feature-rental"
                            checked={offlineConfig.offlineFeatures.rentalView}
                            onCheckedChange={(value) => handleFeatureToggle('rentalView', value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          ব্যবহারকারীরা অফলাইনে পূর্বে দেখা রেন্টাল আইটেম দেখতে পারবেন।
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/40 sm:col-span-2">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <UserCog className="h-5 w-5 text-primary" />
                            <Label htmlFor="feature-favorites" className="font-medium">ফেভারিটস ও ব্যক্তিগত সেটিংস</Label>
                          </div>
                          <Switch 
                            id="feature-favorites"
                            checked={offlineConfig.offlineFeatures.favorites}
                            onCheckedChange={(value) => handleFeatureToggle('favorites', value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          ব্যবহারকারীরা অফলাইনে ফেভারিট আইটেম এবং সেটিংস দেখতে ও পরিবর্তন করতে পারবেন।
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              <Separator />
              
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant={showOfflinePreview ? "default" : "outline"}
                  className="flex items-center gap-2"
                  onClick={handleTestOfflineMode}
                >
                  <ServerOff className="h-4 w-4" />
                  <span>{showOfflinePreview ? "অফলাইন টেস্ট বন্ধ করুন" : "অফলাইন মোড টেস্ট করুন"}</span>
                </Button>
                
                <Button onClick={handleSaveConfig}>পরিবর্তন সেভ করুন</Button>
              </div>
              
              {showOfflinePreview && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <h3 className="text-sm font-medium mb-2">অফলাইন মোড প্রিভিউ:</h3>
                  <div className="border rounded-md p-4 bg-white">
                    <OfflineIndicator />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OfflineConfiguration;
