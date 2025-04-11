
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  FileCode, 
  Database, 
  Activity, 
  LineChart, 
  Code, 
  RotateCw, 
  Fingerprint,
  History,
  Bot,
  Rocket,
  FileJson,
  Puzzle,
  Network,
  BarChart,
  Filter,
  Languages,
  Users,
  Globe,
  MailCheck,
  DollarSign,
  Star,
  Zap,
  Gift,
  Settings
} from 'lucide-react';

interface ApiEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  isActive: boolean;
  cacheTime: number;
  rateLimit: number;
}

interface AiFeature {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  usageQuota: number;
  usageCount: number;
  model: string;
}

interface IntegrationService {
  id: string;
  name: string;
  type: string;
  isConnected: boolean;
  apiKey?: string;
  lastSynced?: string;
}

interface MonetizationSettings {
  id: string;
  name: string;
  percentage: number;
  isEnabled: boolean;
  minimumAmount: number;
}

const initialApiEndpoints: ApiEndpoint[] = [
  {
    id: 'api1',
    name: 'প্রোডাক্ট এপিআই',
    path: '/api/v1/products',
    method: 'GET',
    isActive: true,
    cacheTime: 60,
    rateLimit: 100
  },
  {
    id: 'api2',
    name: 'অর্ডার এপিআই',
    path: '/api/v1/orders',
    method: 'POST',
    isActive: true,
    cacheTime: 0,
    rateLimit: 50
  },
  {
    id: 'api3',
    name: 'ইউজার এপিআই',
    path: '/api/v1/users',
    method: 'GET',
    isActive: false,
    cacheTime: 300,
    rateLimit: 30
  }
];

const initialAiFeatures: AiFeature[] = [
  {
    id: 'ai1',
    name: 'স্মার্ট ক্যাটাগরি ক্লাসিফিকেশন',
    description: 'প্রোডাক্টকে সঠিক ক্যাটাগরিতে অটোমেটিক অ্যাসাইন করে',
    isEnabled: true,
    usageQuota: 1000,
    usageCount: 320,
    model: 'gpt-3.5'
  },
  {
    id: 'ai2',
    name: 'প্রোডাক্ট ডেসক্রিপশন জেনারেটর',
    description: 'প্রোডাক্টের জন্য আকর্ষণীয় ডেসক্রিপশন অটোমেটিক তৈরি করে',
    isEnabled: true,
    usageQuota: 500,
    usageCount: 187,
    model: 'gpt-4'
  },
  {
    id: 'ai3',
    name: 'ইমেজ মডারেশন',
    description: 'ইমেজগুলি অটোমেটিক মডারেট করে',
    isEnabled: false,
    usageQuota: 2000,
    usageCount: 0,
    model: 'content-filter-v2'
  }
];

const initialIntegrations: IntegrationService[] = [
  {
    id: 'int1',
    name: 'পেমেন্ট গেটওয়ে',
    type: 'payment',
    isConnected: true,
    apiKey: '***********************',
    lastSynced: '১ ঘন্টা আগে'
  },
  {
    id: 'int2',
    name: 'ইমেইল মার্কেটিং',
    type: 'email',
    isConnected: true,
    apiKey: '***********************',
    lastSynced: '২ দিন আগে'
  },
  {
    id: 'int3',
    name: 'এসএমএস গেটওয়ে',
    type: 'sms',
    isConnected: false
  },
  {
    id: 'int4',
    name: 'এনালিটিক্স সার্ভিস',
    type: 'analytics',
    isConnected: true,
    apiKey: '***********************',
    lastSynced: '১২ ঘন্টা আগে'
  }
];

const initialMonetizationSettings: MonetizationSettings[] = [
  {
    id: 'mon1',
    name: 'মার্কেটপ্লেস কমিশন',
    percentage: 5,
    isEnabled: true,
    minimumAmount: 100
  },
  {
    id: 'mon2',
    name: 'সার্ভিস কমিশন',
    percentage: 10,
    isEnabled: true,
    minimumAmount: 50
  },
  {
    id: 'mon3',
    name: 'রেন্টাল কমিশন',
    percentage: 8,
    isEnabled: true,
    minimumAmount: 200
  },
  {
    id: 'mon4',
    name: 'ডিজিটাল প্রোডাক্ট কমিশন',
    percentage: 15,
    isEnabled: true,
    minimumAmount: 0
  },
  {
    id: 'mon5',
    name: 'রেফারেল বোনাস',
    percentage: 2,
    isEnabled: false,
    minimumAmount: 0
  }
];

const AdvancedFeatures: React.FC = () => {
  const { toast } = useToast();
  const [apiEndpoints, setApiEndpoints] = useState<ApiEndpoint[]>(initialApiEndpoints);
  const [aiFeatures, setAiFeatures] = useState<AiFeature[]>(initialAiFeatures);
  const [integrations, setIntegrations] = useState<IntegrationService[]>(initialIntegrations);
  const [monetizationSettings, setMonetizationSettings] = useState<MonetizationSettings[]>(initialMonetizationSettings);
  const [selectedMonetization, setSelectedMonetization] = useState<MonetizationSettings | null>(null);
  const [newMonetization, setNewMonetization] = useState<Partial<MonetizationSettings>>({
    name: '',
    percentage: 5,
    isEnabled: true,
    minimumAmount: 0
  });
  const [isEditMonetizationOpen, setIsEditMonetizationOpen] = useState(false);
  
  // API স্ট্যাটাস টগল করা
  const toggleApiStatus = (id: string) => {
    setApiEndpoints(apiEndpoints.map(api => 
      api.id === id ? { ...api, isActive: !api.isActive } : api
    ));
    
    const api = apiEndpoints.find(a => a.id === id);
    if (api) {
      toast({
        title: `API ${api.isActive ? 'নিষ্ক্রিয়' : 'সক্রিয়'} করা হয়েছে`,
        description: `${api.name} এখন ${api.isActive ? 'নিষ্ক্রিয়' : 'সক্রিয়'} অবস্থায় আছে।`,
      });
    }
  };
  
  // AI ফিচার টগল করা
  const toggleAiFeature = (id: string) => {
    setAiFeatures(aiFeatures.map(feature => 
      feature.id === id ? { ...feature, isEnabled: !feature.isEnabled } : feature
    ));
    
    const feature = aiFeatures.find(f => f.id === id);
    if (feature) {
      toast({
        title: `AI ফিচার ${feature.isEnabled ? 'নিষ্ক্রিয়' : 'সক্রিয়'} করা হয়েছে`,
        description: `${feature.name} এখন ${feature.isEnabled ? 'নিষ্ক্রিয়' : 'সক্রিয়'} অবস্থায় আছে।`,
      });
    }
  };
  
  // ইন্টিগ্রেশন সেভ করা
  const saveIntegration = (id: string, apiKey: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? { 
        ...integration, 
        isConnected: true, 
        apiKey, 
        lastSynced: 'এখন' 
      } : integration
    ));
    
    toast({
      title: "ইন্টিগ্রেশন সংযুক্ত করা হয়েছে",
      description: "API কী সফলভাবে সংরক্ষণ করা হয়েছে এবং সার্ভিস সংযুক্ত করা হয়েছে।",
    });
  };
  
  // মানিটাইজেশন সেটিংস আপডেট করা
  const updateMonetizationSetting = () => {
    if (!selectedMonetization) return;
    
    setMonetizationSettings(monetizationSettings.map(setting => 
      setting.id === selectedMonetization.id ? { 
        ...setting, 
        percentage: Number(newMonetization.percentage) || setting.percentage,
        minimumAmount: Number(newMonetization.minimumAmount) || setting.minimumAmount,
        isEnabled: newMonetization.isEnabled !== undefined ? newMonetization.isEnabled : setting.isEnabled
      } : setting
    ));
    
    setIsEditMonetizationOpen(false);
    
    toast({
      title: "মানিটাইজেশন সেটিংস আপডেট করা হয়েছে",
      description: `${selectedMonetization.name} এর সেটিংস সফলভাবে আপডেট করা হয়েছে।`,
    });
  };
  
  // মানিটাইজেশন এডিট দিয়ালগ ওপেন করা
  const openEditMonetization = (setting: MonetizationSettings) => {
    setSelectedMonetization(setting);
    setNewMonetization({
      name: setting.name,
      percentage: setting.percentage,
      minimumAmount: setting.minimumAmount,
      isEnabled: setting.isEnabled
    });
    setIsEditMonetizationOpen(true);
  };
  
  // মানিটাইজেশন টগল করা
  const toggleMonetization = (id: string) => {
    setMonetizationSettings(monetizationSettings.map(setting => 
      setting.id === id ? { ...setting, isEnabled: !setting.isEnabled } : setting
    ));
    
    const setting = monetizationSettings.find(s => s.id === id);
    if (setting) {
      toast({
        title: `${setting.name} ${setting.isEnabled ? 'নিষ্ক্রিয়' : 'সক্রিয়'} করা হয়েছে`,
        description: `${setting.name} এখন ${setting.isEnabled ? 'নিষ্ক্রিয়' : 'সক্রিয়'} অবস্থায় আছে।`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">অ্যাডভান্স ফিচার</h1>
      
      <Tabs defaultValue="api">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="api" className="flex items-center gap-1">
            <Network className="h-4 w-4" /> API ম্যানেজমেন্ট
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-1">
            <Bot className="h-4 w-4" /> AI ফিচার
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-1">
            <Puzzle className="h-4 w-4" /> ইন্টিগ্রেশন
          </TabsTrigger>
          <TabsTrigger value="monetization" className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" /> মানিটাইজেশন
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-1">
            <Settings className="h-4 w-4" /> অ্যাডভান্স সেটিংস
          </TabsTrigger>
        </TabsList>
        
        {/* API ম্যানেজমেন্ট */}
        <TabsContent value="api" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-blue-500" />
                  API এন্ডপয়েন্ট ম্যানেজমেন্ট
                </CardTitle>
                <CardDescription>
                  আপনার অ্যাপ্লিকেশনের API এন্ডপয়েন্টগুলি সক্রিয় বা নিষ্ক্রিয় করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map(api => (
                    <div key={api.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{api.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge className="mr-2">{api.method}</Badge>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded-sm">{api.path}</code>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="text-xs">
                            <span className="text-muted-foreground">ক্যাশ:</span> {api.cacheTime > 0 ? `${api.cacheTime}s` : 'নিষ্ক্রিয়'}
                          </div>
                          <div className="text-xs">
                            <span className="text-muted-foreground">রেট লিমিট:</span> {api.rateLimit}/মিনিট
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Switch
                          id={`api-${api.id}`}
                          checked={api.isActive}
                          onCheckedChange={() => toggleApiStatus(api.id)}
                        />
                        <Badge 
                          variant={api.isActive ? 'default' : 'outline'} 
                          className={api.isActive ? 'bg-green-500' : ''}
                        >
                          {api.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full">
                    নতুন API এন্ডপয়েন্ট যোগ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-500" />
                  API সেটিংস
                </CardTitle>
                <CardDescription>
                  অ্যাপ্লিকেশনের API সেটিংস কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="rate-limit">গ্লোবাল রেট লিমিট (রিকোয়েস্ট/মিনিট)</Label>
                    <Input id="rate-limit" type="number" defaultValue="100" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="cache-time">ডিফল্ট ক্যাশ টাইম (সেকেন্ড)</Label>
                    <Input id="cache-time" type="number" defaultValue="60" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="timeout">টাইমআউট (সেকেন্ড)</Label>
                    <Input id="timeout" type="number" defaultValue="30" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="compress" defaultChecked />
                    <Label htmlFor="compress">রেসপন্স কম্প্রেশন সক্রিয় করুন</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="cors" defaultChecked />
                    <Label htmlFor="cors">CORS সক্রিয় করুন</Label>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="allowed-origins">অনুমোদিত অরিজিন (কমা দিয়ে আলাদা করুন)</Label>
                    <Input id="allowed-origins" defaultValue="*" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="auth-required" defaultChecked />
                    <Label htmlFor="auth-required">API কী অথেনটিকেশন প্রয়োজন</Label>
                  </div>
                  
                  <div className="mt-2">
                    <Button>সেটিংস সেভ করুন</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-emerald-500" />
                  API ট্র্যাফিক মনিটর
                </CardTitle>
                <CardDescription>
                  API কলের ট্র্যাফিক মনিটর করুন এবং পারফরম্যান্স বিশ্লেষণ করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-slate-50 rounded-lg border flex items-center justify-center">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto text-slate-300" />
                    <p className="mt-4 text-muted-foreground">API ট্র্যাফিক রিপোর্ট এখানে দেখানো হবে</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-blue-500" />
                      মোট রিকোয়েস্ট
                    </h3>
                    <p className="text-2xl font-bold">12,345</p>
                    <p className="text-xs text-muted-foreground">গত ২৪ ঘন্টা</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-green-500" />
                      সফল রিকোয়েস্ট
                    </h3>
                    <p className="text-2xl font-bold">11,892</p>
                    <p className="text-xs text-muted-foreground">96.3% সফল হার</p>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-medium flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-red-500" />
                      ব্যর্থ রিকোয়েস্ট
                    </h3>
                    <p className="text-2xl font-bold">453</p>
                    <p className="text-xs text-muted-foreground">3.7% ব্যর্থতার হার</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* AI ফিচার */}
        <TabsContent value="ai" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-500" />
                  AI ফিচার কনফিগারেশন
                </CardTitle>
                <CardDescription>
                  আপনার অ্যাপ্লিকেশনের AI ভিত্তিক ফিচার সক্রিয় বা নিষ্ক্রিয় করুন এবং কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {aiFeatures.map(feature => (
                    <div key={feature.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{feature.name}</h3>
                        <Switch
                          id={`ai-${feature.id}`}
                          checked={feature.isEnabled}
                          onCheckedChange={() => toggleAiFeature(feature.id)}
                        />
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <h4 className="text-xs text-muted-foreground">AI মডেল</h4>
                          <p className="text-sm font-medium">{feature.model}</p>
                        </div>
                        <div>
                          <h4 className="text-xs text-muted-foreground">কোটা</h4>
                          <p className="text-sm font-medium">{feature.usageQuota} কল/মাস</p>
                        </div>
                        <div>
                          <h4 className="text-xs text-muted-foreground">ব্যবহার</h4>
                          <p className="text-sm font-medium">{feature.usageCount} কল ({Math.round((feature.usageCount / feature.usageQuota) * 100)}%)</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-purple-600 h-1.5 rounded-full" 
                          style={{ width: `${Math.min(100, Math.round((feature.usageCount / feature.usageQuota) * 100))}%` }}
                        ></div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <RotateCw className="h-4 w-4 mr-2" />
                          কোটা রিসেট
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          কনফিগার
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-dashed border-2 rounded-lg p-6 text-center">
                    <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="font-medium mt-2">নতুন AI ফিচার যোগ করুন</h3>
                    <p className="text-sm text-muted-foreground mt-1">আপনার অ্যাপ্লিকেশনে নতুন AI ফিচার যোগ করতে বাটনে ক্লিক করুন।</p>
                    <Button className="mt-4">
                      নতুন AI ফিচার
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-amber-500" />
                  AI ইন্টিগ্রেশন সেটিংস
                </CardTitle>
                <CardDescription>
                  AI সার্ভিস প্রোভাইডার সেটিংস কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="openai-key">OpenAI API কী</Label>
                    <Input id="openai-key" type="password" value="sk-*********************" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="ai-model">ডিফল্ট AI মডেল</Label>
                    <Select defaultValue="gpt-3.5">
                      <SelectTrigger>
                        <SelectValue placeholder="একটি মডেল নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="max-tokens">মাক্সিমাম টোকেন</Label>
                    <Input id="max-tokens" type="number" defaultValue="4096" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="temperature">টেমপারেচার</Label>
                    <Input id="temperature" type="number" step="0.1" defaultValue="0.7" />
                    <p className="text-xs text-muted-foreground">কম মান বেশি নির্ভরযোগ্য রেসপন্স, বেশি মান বেশি ক্রিয়েটিভ রেসপন্স।</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="content-filter" defaultChecked />
                    <Label htmlFor="content-filter">কন্টেন্ট ফিল্টারিং সক্রিয় করুন</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="log-ai-calls" defaultChecked />
                    <Label htmlFor="log-ai-calls">AI কল লগিং</Label>
                  </div>
                  
                  <Button className="w-full">
                    সেটিংস সেভ করুন
                  </Button>
                  
                  <Separator />
                  
                  <div className="pt-2">
                    <h3 className="font-medium text-sm mb-3">AI ব্যবহার সারাংশ</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">মাসিক কল:</span>
                        <span>507 / 1,000</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">টোকেন ব্যবহার:</span>
                        <span>1.2M / 5M</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">বিলিং সাইকেল:</span>
                        <span>১৫ দিন বাকি</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-blue-500" />
                  AI কল হিস্টরি
                </CardTitle>
                <CardDescription>
                  সাম্প্রতিক AI API কল এবং রেসপন্স দেখুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto shadow-sm rounded-lg border">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">তারিখ</th>
                        <th scope="col" className="px-6 py-3">ফিচার</th>
                        <th scope="col" className="px-6 py-3">মডেল</th>
                        <th scope="col" className="px-6 py-3">টোকেন</th>
                        <th scope="col" className="px-6 py-3">সময়</th>
                        <th scope="col" className="px-6 py-3">স্ট্যাটাস</th>
                        <th scope="col" className="px-6 py-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4">১৫ আগস্ট, ২০২৩</td>
                        <td className="px-6 py-4">ক্যাটাগরি ক্লাসিফিকেশন</td>
                        <td className="px-6 py-4">gpt-3.5</td>
                        <td className="px-6 py-4">256</td>
                        <td className="px-6 py-4">1.2s</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">সফল</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm">বিস্তারিত</Button>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4">১৫ আগস্ট, ২০২৩</td>
                        <td className="px-6 py-4">ডেসক্রিপশন জেনারেটর</td>
                        <td className="px-6 py-4">gpt-4</td>
                        <td className="px-6 py-4">512</td>
                        <td className="px-6 py-4">2.5s</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-green-500">সফল</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm">বিস্তারিত</Button>
                        </td>
                      </tr>
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4">১৫ আগস্ট, ২০২৩</td>
                        <td className="px-6 py-4">ইমেজ মডারেশন</td>
                        <td className="px-6 py-4">content-filter-v2</td>
                        <td className="px-6 py-4">--</td>
                        <td className="px-6 py-4">0.8s</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="text-red-500 border-red-300">ব্যর্থ</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm">বিস্তারিত</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">আরও দেখুন</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* ইন্টিগ্রেশন */}
        <TabsContent value="integrations" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map(integration => (
              <Card key={integration.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {integration.type === 'payment' && <DollarSign className="h-5 w-5 text-green-500" />}
                    {integration.type === 'email' && <MailCheck className="h-5 w-5 text-blue-500" />}
                    {integration.type === 'sms' && <MessageSquare className="h-5 w-5 text-purple-500" />}
                    {integration.type === 'analytics' && <BarChart className="h-5 w-5 text-amber-500" />}
                    {integration.name}
                  </CardTitle>
                  <CardDescription>
                    {integration.type === 'payment' && 'আপনার অ্যাপ্লিকেশনের জন্য পেমেন্ট গেটওয়ে সার্ভিস কনফিগার করুন।'}
                    {integration.type === 'email' && 'ইমেইল মার্কেটিং সার্ভিস সেটআপ করে নিউজলেটার এবং ট্রানজেকশনাল ইমেইল পাঠান।'}
                    {integration.type === 'sms' && 'ব্যবহারকারীদের এসএমএস বার্তা পাঠাতে এসএমএস গেটওয়ে সংযোগ করুন।'}
                    {integration.type === 'analytics' && 'ব্যবহারকারীদের আচরণ ট্র্যাক করতে অ্যানালিটিক্স সার্ভিস কনফিগার করুন।'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {integration.isConnected ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-green-500">সংযুক্ত</Badge>
                        {integration.lastSynced && (
                          <span className="text-xs text-muted-foreground">শেষ সিঙ্ক: {integration.lastSynced}</span>
                        )}
                      </div>
                      
                      <div className="grid gap-2">
                        <Label>API কী</Label>
                        <div className="relative">
                          <Input type="password" value={integration.apiKey} readOnly />
                          <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">
                          <RotateCw className="h-4 w-4 mr-2" />
                          সিঙ্ক করুন
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          সেটিংস
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label>API কী</Label>
                        <Input placeholder="আপনার API কী দিন" />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id={`test-${integration.id}`} />
                        <Label htmlFor={`test-${integration.id}`}>সংযোগের আগে টেস্ট করুন</Label>
                      </div>
                      
                      <Button 
                        className="w-full"
                        onClick={() => saveIntegration(integration.id, 'new-api-key-12345')}
                      >
                        সংযোগ করুন
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="h-5 w-5 text-indigo-500" />
                  ওয়েবহুক কনফিগারেশন
                </CardTitle>
                <CardDescription>
                  এক্সটারনাল সিস্টেমের সাথে কানেক্ট করতে ওয়েবহুক কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>ইনবাউন্ড ওয়েবহুক URL</Label>
                      <div className="relative">
                        <Input value="https://yourapp.com/api/webhooks/incoming" readOnly />
                        <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                          <FileCode className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">এই এন্ডপয়েন্টে পাঠানো রিকোয়েস্টগুলি আপনার অ্যাপে প্রসেস করা হবে।</p>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>ওয়েবহুক সিক্রেট</Label>
                      <div className="relative">
                        <Input type="password" value="whsec_***********************" readOnly />
                        <Button variant="ghost" size="icon" className="absolute right-0 top-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">এই সিক্রেট ওয়েবহুক পেলোডের ভেরিফিকেশনে ব্যবহার করা হয়।</p>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">ইভেন্ট</th>
                          <th className="text-left py-2 px-4">আউটবাউন্ড URL</th>
                          <th className="text-left py-2 px-4">সক্রিয়?</th>
                          <th className="text-left py-2 px-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">new-order</td>
                          <td className="py-2 px-4">https://external-service.com/webhooks/orders</td>
                          <td className="py-2 px-4">
                            <Switch defaultChecked />
                          </td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">এডিট</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">payment-success</td>
                          <td className="py-2 px-4">https://external-service.com/webhooks/payments</td>
                          <td className="py-2 px-4">
                            <Switch defaultChecked />
                          </td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">এডিট</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">new-user</td>
                          <td className="py-2 px-4">https://external-service.com/webhooks/users</td>
                          <td className="py-2 px-4">
                            <Switch />
                          </td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="sm">এডিট</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <Button>
                    নতুন ওয়েবহুক ইভেন্ট
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* মানিটাইজেশন */}
        <TabsContent value="monetization" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  কমিশন এবং ফি সেটিংস
                </CardTitle>
                <CardDescription>
                  বিভিন্ন ধরনের ট্রানজেকশনের জন্য কমিশন এবং ফি কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isEditMonetizationOpen} onOpenChange={setIsEditMonetizationOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>মানিটাইজেশন সেটিংস আপডেট করুন</DialogTitle>
                      <DialogDescription>
                        {selectedMonetization?.name} এর কমিশন এবং সেটিংস আপডেট করুন।
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="edit-percentage">কমিশন শতাংশ (%)</Label>
                        <Input
                          id="edit-percentage"
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={newMonetization.percentage}
                          onChange={(e) => setNewMonetization({
                            ...newMonetization,
                            percentage: parseFloat(e.target.value)
                          })}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="edit-minimum">ন্যূনতম পরিমাণ (৳)</Label>
                        <Input
                          id="edit-minimum"
                          type="number"
                          min="0"
                          value={newMonetization.minimumAmount}
                          onChange={(e) => setNewMonetization({
                            ...newMonetization,
                            minimumAmount: parseInt(e.target.value)
                          })}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="edit-enabled"
                          checked={newMonetization.isEnabled}
                          onCheckedChange={(checked) => setNewMonetization({
                            ...newMonetization,
                            isEnabled: checked
                          })}
                        />
                        <Label htmlFor="edit-enabled">এই মানিটাইজেশন সক্রিয় রাখুন</Label>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditMonetizationOpen(false)}>বাতিল</Button>
                      <Button onClick={updateMonetizationSetting}>সেভ করুন</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <div className="space-y-4">
                  {monetizationSettings.map(setting => (
                    <div key={setting.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{setting.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-green-500">{setting.percentage}%</Badge>
                            <span className="text-xs text-muted-foreground">
                              ন্যূনতম ৳{setting.minimumAmount}
                            </span>
                          </div>
                        </div>
                        <Switch
                          id={`monetization-${setting.id}`}
                          checked={setting.isEnabled}
                          onCheckedChange={() => toggleMonetization(setting.id)}
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditMonetization(setting)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          কনফিগার
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full">
                    নতুন মানিটাইজেশন রুল যোগ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  প্রমোশনাল অফার
                </CardTitle>
                <CardDescription>
                  স্পেশাল অফার এবং ডিসকাউন্ট কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>নতুন বিক্রেতাদের জন্য অফার</Label>
                    <Select defaultValue="fee-waiver">
                      <SelectTrigger>
                        <SelectValue placeholder="অফার সিলেক্ট করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fee-waiver">ফি-ওয়েভার</SelectItem>
                        <SelectItem value="discount">কমিশন ডিসকাউন্ট</SelectItem>
                        <SelectItem value="free-listing">ফ্রি লিস্টিং</SelectItem>
                        <SelectItem value="none">কোন অফার নেই</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>ডিসকাউন্ট শতাংশ</Label>
                    <Input type="number" min="0" max="100" defaultValue="50" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>অফারের সময়কাল (দিন)</Label>
                    <Input type="number" min="1" defaultValue="30" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>ফেস্টিভাল ডিসকাউন্ট</Label>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      বিশেষ উৎসবের সময় অর্থ লেনদেনে ডিসকাউন্ট অফার করুন।
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>রেফারেল ডিসকাউন্ট</Label>
                      <Switch />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ব্যবহারকারীরা যখন নতুন ব্যবহারকারী রেফার করে তখন ডিসকাউন্ট দিন।
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>ফিডব্যাক ইনসেন্টিভ</Label>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      রিভিউ বা ফিডব্যাক দেওয়ার জন্য ইনসেন্টিভ দিন।
                    </p>
                  </div>
                  
                  <Button className="w-full">
                    সেটিংস সেভ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-purple-500" />
                  লয়্যালটি প্রোগ্রাম
                </CardTitle>
                <CardDescription>
                  ব্যবহারকারীদের পুরস্কৃত করতে লয়্যালটি পয়েন্ট এবং মেম্বারশিপ সিস্টেম কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="points">
                  <TabsList className="grid grid-cols-2 w-[400px]">
                    <TabsTrigger value="points">লয়্যালটি পয়েন্ট</TabsTrigger>
                    <TabsTrigger value="tiers">মেম্বারশিপ টিয়ার</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="points" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label>পয়েন্ট টু কারেন্সি রেশিও</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="100" className="w-24" />
                            <span className="text-sm">পয়েন্ট</span>
                            <span>=</span>
                            <Input type="number" defaultValue="1" className="w-24" />
                            <span className="text-sm">টাকা</span>
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>প্রতি অর্ডারে পয়েন্ট</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="5" className="w-24" />
                            <span className="text-sm">পয়েন্ট প্রতি</span>
                            <Input type="number" defaultValue="100" className="w-24" />
                            <span className="text-sm">টাকায়</span>
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>মেক্সিমাম ডিসকাউন্ট পারসেন্টেজ</Label>
                          <div className="flex items-center gap-2">
                            <Input type="number" defaultValue="50" className="w-24" />
                            <span className="text-sm">%</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="points-enabled" defaultChecked />
                          <Label htmlFor="points-enabled">লয়্যালটি পয়েন্ট সিস্টেম সক্রিয় করুন</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">পয়েন্ট আর্নিং ইভেন্ট</h3>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                              <Label>প্রোডাক্ট কেনা</Label>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-muted-foreground" />
                              <Label>রিভিউ দেওয়া</Label>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <Label>রেফারেল</Label>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <Label>সোশ্যাল শেয়ার</Label>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <Label>জন্মদিন বোনাস</Label>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Button>সেটিংস সেভ করুন</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tiers" className="mt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center py-4">
                              <Badge variant="outline" className="mb-2">স্ট্যান্ডার্ড</Badge>
                              <h3 className="font-bold text-lg">নতুন সদস্য</h3>
                              <p className="text-sm text-muted-foreground">০-১,০০০ পয়েন্ট</p>
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-2 py-2">
                              <div className="flex justify-between text-sm">
                                <span>বিশেষ অফার</span>
                                <span>নেই</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>পয়েন্ট মাল্টিপ্লায়ার</span>
                                <span>1x</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>ফ্রি শিপিং</span>
                                <span><X className="h-4 w-4 text-red-500" /></span>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full mt-4">এডিট</Button>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center py-4">
                              <Badge className="mb-2 bg-amber-500">গোল্ড</Badge>
                              <h3 className="font-bold text-lg">নিয়মিত সদস্য</h3>
                              <p className="text-sm text-muted-foreground">১,০০০-৫,০০০ পয়েন্ট</p>
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-2 py-2">
                              <div className="flex justify-between text-sm">
                                <span>বিশেষ অফার</span>
                                <span>5% ডিসকাউন্ট</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>পয়েন্ট মাল্টিপ্লায়ার</span>
                                <span>1.2x</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>ফ্রি শিপিং</span>
                                <span>৩,০০০+ অর্ডারে</span>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full mt-4">এডিট</Button>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-center py-4">
                              <Badge className="mb-2 bg-indigo-500">প্লাটিনাম</Badge>
                              <h3 className="font-bold text-lg">প্রিমিয়াম সদস্য</h3>
                              <p className="text-sm text-muted-foreground">৫,০০০+ পয়েন্ট</p>
                            </div>
                            <Separator className="my-2" />
                            <div className="space-y-2 py-2">
                              <div className="flex justify-between text-sm">
                                <span>বিশেষ অফার</span>
                                <span>10% ডিসকাউন্ট</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>পয়েন্ট মাল্টিপ্লায়ার</span>
                                <span>1.5x</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>ফ্রি শিপিং</span>
                                <span><Check className="h-4 w-4 text-green-500" /></span>
                              </div>
                            </div>
                            <Button variant="outline" className="w-full mt-4">এডিট</Button>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="flex justify-center">
                        <Button>
                          নতুন মেম্বারশিপ টিয়ার যোগ করুন
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* অ্যাডভান্স সেটিংস */}
        <TabsContent value="advanced" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-red-500" />
                  সিকিউরিটি সেটিংস
                </CardTitle>
                <CardDescription>
                  অ্যাপ্লিকেশনের সিকিউরিটি ফিচার কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">টু-ফ্যাক্টর অথেনটিকেশন</h3>
                      <p className="text-sm text-muted-foreground">অ্যাডমিন লগইন এর জন্য 2FA বাধ্যতামূলক করুন।</p>
                    </div>
                    <Switch id="2fa-required" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">অ্যাডমিন সেশন টাইমআউট</h3>
                      <p className="text-sm text-muted-foreground">নিষ্ক্রিয়তার পরে অ্যাডমিন সেশন শেষ করুন।</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="টাইমআউট" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">১৫ মিনিট</SelectItem>
                        <SelectItem value="30">৩০ মিনিট</SelectItem>
                        <SelectItem value="60">৬০ মিনিট</SelectItem>
                        <SelectItem value="never">কখনো নয়</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">API কী রোটেশন</h3>
                      <p className="text-sm text-muted-foreground">নিয়মিত অন্তর API কী পরিবর্তন করুন।</p>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="সময়কাল" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">৩০ দিন</SelectItem>
                        <SelectItem value="60">৬০ দিন</SelectItem>
                        <SelectItem value="90">৯০ দিন</SelectItem>
                        <SelectItem value="never">কখনো নয়</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">পাসওয়ার্ড পলিসি</h3>
                      <p className="text-sm text-muted-foreground">পাসওয়ার্ডের জন্য ন্যূনতম প্রয়োজনীয়তা সেট করুন।</p>
                    </div>
                    <Select defaultValue="strong">
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="স্ট্রেংথ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">বেসিক</SelectItem>
                        <SelectItem value="medium">মিডিয়াম</SelectItem>
                        <SelectItem value="strong">স্ট্রং</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">অ্যাকাউন্ট লকআউট</h3>
                      <p className="text-sm text-muted-foreground">বারবার লগইন ব্যর্থতার পরে অ্যাকাউন্ট লক করুন।</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input 
                        type="number" 
                        className="w-16" 
                        defaultValue="5" 
                        min="1" 
                        max="10"
                      />
                      <span className="text-sm">ব্যর্থ প্রচেষ্টা</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">অ্যাডমিন অ্যাকশন লগিং</h3>
                      <p className="text-sm text-muted-foreground">সকল অ্যাডমিন কার্যকলাপ লগ করুন।</p>
                    </div>
                    <Switch id="action-logging" defaultChecked />
                  </div>
                  
                  <Button className="w-full mt-2">
                    সিকিউরিটি সেটিংস সেভ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5 text-blue-500" />
                  লোকালাইজেশন সেটিংস
                </CardTitle>
                <CardDescription>
                  ভাষা এবং রিজিয়নাল সেটিংস কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label>ডিফল্ট ভাষা</Label>
                    <Select defaultValue="bn">
                      <SelectTrigger>
                        <SelectValue placeholder="ভাষা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bn">বাংলা</SelectItem>
                        <SelectItem value="en">ইংরেজি</SelectItem>
                        <SelectItem value="hi">হিন্দি</SelectItem>
                        <SelectItem value="ar">আরবি</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>ডিফল্ট কারেন্সি</Label>
                    <Select defaultValue="bdt">
                      <SelectTrigger>
                        <SelectValue placeholder="কারেন্সি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bdt">বাংলাদেশি টাকা (৳)</SelectItem>
                        <SelectItem value="usd">ইউএস ডলার ($)</SelectItem>
                        <SelectItem value="eur">ইউরো (€)</SelectItem>
                        <SelectItem value="inr">ভারতীয় রুপি (₹)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>ডিফল্ট টাইমজোন</Label>
                    <Select defaultValue="asia-dhaka">
                      <SelectTrigger>
                        <SelectValue placeholder="টাইমজোন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-dhaka">এশিয়া/ঢাকা (GMT+6)</SelectItem>
                        <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                        <SelectItem value="asia-kolkata">এশিয়া/কলকাতা (GMT+5:30)</SelectItem>
                        <SelectItem value="america-new_york">আমেরিকা/নিউ ইয়র্ক (GMT-4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-2">
                    <Label>তারিখ ফরম্যাট</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue placeholder="ফরম্যাট নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">দিন-মাস-বছর (31-12-2023)</SelectItem>
                        <SelectItem value="mm-dd-yyyy">মাস-দিন-বছর (12-31-2023)</SelectItem>
                        <SelectItem value="yyyy-mm-dd">বছর-মাস-দিন (2023-12-31)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>সময় ফরম্যাট</Label>
                    <Select defaultValue="24h">
                      <SelectTrigger>
                        <SelectValue placeholder="ফরম্যাট নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-ঘণ্টা (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-ঘণ্টা</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">সর্বদা ব্যবহারকারীর ভাষা</h3>
                      <p className="text-sm text-muted-foreground">ব্যবহারকারীর ভাষা পছন্দ অনুযায়ী সামগ্রী দেখান।</p>
                    </div>
                    <Switch id="user-language" defaultChecked />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="translation-file">অনুবাদ ফাইল আপলোড করুন</Label>
                    <div className="border border-dashed rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">অনুবাদ JSON ফাইল ড্র্যাগ করুন অথবা</p>
                      <Button variant="outline" className="mt-2">ফাইল আপলোড করুন</Button>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-2">
                    লোকালাইজেশন সেটিংস সেভ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-purple-500" />
                  কন্টেন্ট মডারেশন সেটিংস
                </CardTitle>
                <CardDescription>
                  কন্টেন্ট মডারেশন পলিসি কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">অটো মডারেশন</h3>
                      <p className="text-sm text-muted-foreground">AI দিয়ে কন্টেন্ট অটোমেটিক মডারেট করুন।</p>
                    </div>
                    <Switch id="auto-moderation" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">নিষিদ্ধ শব্দ ফিল্টার</h3>
                    <Textarea 
                      placeholder="কমা দিয়ে শব্দ আলাদা করুন" 
                      defaultValue="অশ্লীল, আপত্তিজনক, আক্রমণাত্মক"
                      className="h-20"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">মডারেশন ওয়ার্কফ্লো</h3>
                      <p className="text-sm text-muted-foreground">কন্টেন্ট পাবলিশ করার আগে মডারেশন প্রয়োজন।</p>
                    </div>
                    <Select defaultValue="ai-first">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="ওয়ার্কফ্লো" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai-first">AI, তারপর ম্যানুয়াল</SelectItem>
                        <SelectItem value="manual-only">শুধু ম্যানুয়াল</SelectItem>
                        <SelectItem value="ai-only">শুধু AI</SelectItem>
                        <SelectItem value="none">মডারেশন নেই</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">ইমেজ মডারেশন</h3>
                      <p className="text-sm text-muted-foreground">অযাচিত ইমেজ আপলোড প্রতিরোধ করুন।</p>
                    </div>
                    <Switch id="image-moderation" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">ইউজার রিপোর্ট সিস্টেম</h3>
                      <p className="text-sm text-muted-foreground">ব্যবহারকারীদের আপত্তিজনক কন্টেন্ট রিপোর্ট করতে দিন।</p>
                    </div>
                    <Switch id="user-report" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">কমেন্ট মডারেশন</h3>
                      <p className="text-sm text-muted-foreground">ইউজার কমেন্ট মডারেট করুন।</p>
                    </div>
                    <Select defaultValue="auto">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="মডারেশন টাইপ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">অটোমেটিক</SelectItem>
                        <SelectItem value="manual">ম্যানুয়াল</SelectItem>
                        <SelectItem value="post">পোস্ট-মডারেশন</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full mt-2">
                    মডারেশন সেটিংস সেভ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5 text-green-500" />
                  ব্যাকআপ এবং রিস্টোর
                </CardTitle>
                <CardDescription>
                  ডাটা ব্যাকআপ এবং রিস্টোর সেটিংস কনফিগার করুন।
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">অটোমেটিক ব্যাকআপ</h3>
                      <p className="text-sm text-muted-foreground">নিয়মিত ডাটাবেস ব্যাকআপ সক্রিয় করুন।</p>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>ব্যাকআপ ফ্রিকোয়েন্সি</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="ফ্রিকোয়েন্সি নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">প্রতি ঘণ্টায়</SelectItem>
                        <SelectItem value="daily">দৈনিক</SelectItem>
                        <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                        <SelectItem value="monthly">মাসিক</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>ব্যাকআপ লোকেশন</Label>
                    <Select defaultValue="cloud">
                      <SelectTrigger>
                        <SelectValue placeholder="লোকেশন নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">লোকাল স্টোরেজ</SelectItem>
                        <SelectItem value="cloud">ক্লাউড স্টোরেজ</SelectItem>
                        <SelectItem value="both">উভয়</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>ব্যাকআপ রিটেনশন</Label>
                    <div className="flex items-center gap-2">
                      <Input type="number" defaultValue="30" className="w-20" />
                      <span className="text-sm">দিন</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      এই সময়ের পরে পুরনো ব্যাকআপ ফাইল মুছে ফেলা হবে।
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">ম্যানুয়াল ব্যাকআপ</h3>
                    <p className="text-sm text-muted-foreground">বর্তমান ডাটাবেসের ম্যানুয়াল ব্যাকআপ নিন।</p>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        এখন ব্যাকআপ নিন
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <FileJson className="h-4 w-4 mr-2" />
                        সেটিংস এক্সপোর্ট
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">রিস্টোর ফ্রম ব্যাকআপ</h3>
                    <p className="text-sm text-muted-foreground">আগের ব্যাকআপ থেকে ডাটা রিস্টোর করুন।</p>
                    <div className="border border-dashed rounded-lg p-4 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mt-2">ব্যাকআপ ফাইল ড্র্যাগ করুন অথবা</p>
                      <Button variant="outline" className="mt-2">ফাইল আপলোড করুন</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFeatures;
