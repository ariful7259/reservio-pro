
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import {
  Globe,
  Database,
  Settings,
  BarChart,
  RefreshCw,
  Server,
  Zap,
  Lock,
  Shield,
  CreditCard,
  CircleDollarSign,
  Users,
  Code,
  Webhook,
  Compass,
  FileJson,
  CloudCog,
  Key,
  Wifi,
  AlertCircle,
  ArrowRight,
  Send,
  ChevronRight,
  FileText,
  Bell,
  Smartphone,
  PlusCircle,
  Edit,
  Trash2,
  Check,
  X,
  Upload,
  Download,
  UserCog,
  Boxes,
  BarChart3,
  ShoppingBag,
  Calendar,
  MessageSquare,
  Truck,
  Plus
} from 'lucide-react';

// ইন্টারফেস ডিফিনিশন
interface ApiKeyType {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string | null;
  permissions: string[];
  status: 'active' | 'expired' | 'revoked';
}

interface WebhookType {
  id: string;
  name: string;
  url: string;
  events: string[];
  createdAt: string;
  lastTriggered: string | null;
  status: 'active' | 'inactive';
  secret: string;
}

interface IntegrationType {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'pending';
  lastSynced: string | null;
  category: 'payment' | 'marketing' | 'shipping' | 'communication' | 'analytics';
}

interface MonetizationSettingType {
  id: string;
  name: string;
  description: string;
  value: string | number | boolean;
  category: 'commission' | 'fee' | 'discount' | 'promotion' | 'tax';
}

interface SecuritySettingType {
  id: string;
  name: string;
  description: string;
  value: string | boolean;
  category: 'authentication' | 'data' | 'access' | 'compliance';
}

// সাম্পল ডাটা
const sampleApiKeys: ApiKeyType[] = [
  {
    id: 'key1',
    name: 'প্রোডাকশন API কী',
    key: 'pk_live_5f3c2e8d7f8g9h0i1j2k3l4m5n6o7p8',
    createdAt: '2023-06-15T10:30:00Z',
    lastUsed: '2023-08-20T14:45:00Z',
    permissions: ['read', 'write', 'products', 'orders'],
    status: 'active'
  },
  {
    id: 'key2',
    name: 'ডেভেলপমেন্ট API কী',
    key: 'pk_test_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6',
    createdAt: '2023-07-10T08:15:00Z',
    lastUsed: '2023-08-18T11:20:00Z',
    permissions: ['read', 'write', 'products'],
    status: 'active'
  },
  {
    id: 'key3',
    name: 'রিডঅনলি API কী',
    key: 'pk_ro_9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b',
    createdAt: '2023-05-05T09:45:00Z',
    lastUsed: null,
    permissions: ['read'],
    status: 'expired'
  }
];

const sampleWebhooks: WebhookType[] = [
  {
    id: 'wh1',
    name: 'অর্ডার আপডেট',
    url: 'https://myapp.com/webhooks/orders',
    events: ['order.created', 'order.updated', 'order.completed'],
    createdAt: '2023-06-20T11:00:00Z',
    lastTriggered: '2023-08-19T16:30:00Z',
    status: 'active',
    secret: 'whsec_1234567890abcdef'
  },
  {
    id: 'wh2',
    name: 'পেমেন্ট নোটিফিকেশন',
    url: 'https://myapp.com/webhooks/payments',
    events: ['payment.successful', 'payment.failed'],
    createdAt: '2023-07-05T13:45:00Z',
    lastTriggered: '2023-08-15T10:20:00Z',
    status: 'active',
    secret: 'whsec_abcdefghijklmnop'
  }
];

const sampleIntegrations: IntegrationType[] = [
  {
    id: 'int1',
    name: 'বিকাশ পেমেন্ট গেটওয়ে',
    description: 'বিকাশের মাধ্যমে পেমেন্ট গ্রহণ করুন',
    icon: 'CreditCard',
    status: 'connected',
    lastSynced: '2023-08-20T09:30:00Z',
    category: 'payment'
  },
  {
    id: 'int2',
    name: 'এসএমএস মার্কেটিং',
    description: 'বাল্ক এসএমএস পাঠান',
    icon: 'MessageSquare',
    status: 'connected',
    lastSynced: '2023-08-18T14:15:00Z',
    category: 'marketing'
  },
  {
    id: 'int3',
    name: 'পাঠাও শিপিং',
    description: 'পাঠাও শিপিং নেটওয়ার্কের সাথে সংযোগ',
    icon: 'Compass',
    status: 'disconnected',
    lastSynced: null,
    category: 'shipping'
  },
  {
    id: 'int4',
    name: 'গুগল অ্যানালিটিক্স',
    description: 'ব্যবহারকারী আচরণ ট্র্যাক করুন',
    icon: 'BarChart',
    status: 'connected',
    lastSynced: '2023-08-19T12:00:00Z',
    category: 'analytics'
  }
];

const sampleMonetizationSettings: MonetizationSettingType[] = [
  {
    id: 'mon1',
    name: 'প্ল্যাটফর্ম কমিশন হার',
    description: 'সমস্ত বিক্রয়ের জন্য প্ল্যাটফর্ম কমিশন শতাংশ',
    value: 5,
    category: 'commission'
  },
  {
    id: 'mon2',
    name: 'প্রিমিয়াম লিস্টিং ফি',
    description: 'প্রিমিয়াম স্পটে লিস্টিং এর জন্য অতিরিক্ত ফি',
    value: 100,
    category: 'fee'
  },
  {
    id: 'mon3',
    name: 'নতুন ব্যবহারকারী ডিসকাউন্ট',
    description: 'নতুন ব্যবহারকারীদের জন্য প্রথম অর্ডারে ডিসকাউন্ট',
    value: 10,
    category: 'discount'
  },
  {
    id: 'mon4',
    name: 'রেফারেল বোনাস',
    description: 'রেফারেল থেকে নতুন ব্যবহারকারী যোগদান করলে বোনাস',
    value: 50,
    category: 'promotion'
  },
  {
    id: 'mon5',
    name: 'ভ্যাট শতাংশ',
    description: 'অর্ডারের উপর প্রযোজ্য ভ্যাট শতাংশ',
    value: 15,
    category: 'tax'
  }
];

const sampleSecuritySettings: SecuritySettingType[] = [
  {
    id: 'sec1',
    name: 'টু-ফ্যাক্টর অথেনটিকেশন',
    description: 'সমস্ত অ্যাডমিন অ্যাকাউন্টের জন্য 2FA বাধ্যতামূলক করুন',
    value: true,
    category: 'authentication'
  },
  {
    id: 'sec2',
    name: 'ডাটা এনক্রিপশন',
    description: 'সমস্ত সংবেদনশীল ডাটা এনক্রিপ্ট করে সংরক্ষণ করুন',
    value: true,
    category: 'data'
  },
  {
    id: 'sec3',
    name: 'IP রেস্ট্রিকশন',
    description: 'অ্যাডমিন পরিষেবাগুলি নির্দিষ্ট IP অ্যাড্রেস থেকে অ্যাক্সেস সীমিত করুন',
    value: false,
    category: 'access'
  },
  {
    id: 'sec4',
    name: 'GDPR কমপ্লায়েন্স',
    description: 'GDPR নীতিমালা অনুসরণ করুন',
    value: true,
    category: 'compliance'
  },
  {
    id: 'sec5',
    name: 'অটো লগআউট সময়',
    description: 'নিষ্ক্রিয়তার পরে স্বয়ংক্রিয়ভাবে লগআউট হওয়ার সময় (মিনিটে)',
    value: '30',
    category: 'authentication'
  }
];

const AdvancedFeatures = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('apis');
  const [apiKeys, setApiKeys] = useState<ApiKeyType[]>(sampleApiKeys);
  const [webhooks, setWebhooks] = useState<WebhookType[]>(sampleWebhooks);
  const [integrations, setIntegrations] = useState<IntegrationType[]>(sampleIntegrations);
  const [monetizationSettings, setMonetizationSettings] = useState<MonetizationSettingType[]>(sampleMonetizationSettings);
  const [securitySettings, setSecuritySettings] = useState<SecuritySettingType[]>(sampleSecuritySettings);
  
  const [newApiKeyOpen, setNewApiKeyOpen] = useState(false);
  const [newWebhookOpen, setNewWebhookOpen] = useState(false);
  const [newIntegrationOpen, setNewIntegrationOpen] = useState(false);
  const [configureIntegrationOpen, setConfigureIntegrationOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationType | null>(null);
  
  // API কী তৈরি করুন
  const createApiKey = () => {
    toast({
      title: "API কী তৈরি করা হয়েছে",
      description: "আপনার নতুন API কী সফলভাবে তৈরি করা হয়েছে।",
    });
    setNewApiKeyOpen(false);
  };
  
  // API কী রিজেনারেট করুন
  const regenerateApiKey = (keyId: string) => {
    toast({
      title: "API কী রিজেনারেট করা হয়েছে",
      description: "আপনার API কী সফলভাবে রিজেনারেট করা হয়েছে।",
    });
  };
  
  // API কী রিভোক করুন
  const revokeApiKey = (keyId: string) => {
    const updatedKeys = apiKeys.map(key => 
      key.id === keyId ? { ...key, status: 'revoked' as const } : key
    );
    setApiKeys(updatedKeys);
    
    toast({
      title: "API কী রিভোক করা হয়েছে",
      description: "আপনার API কী সফলভাবে রিভোক করা হয়েছে।",
    });
  };
  
  // ওয়েবহুক তৈরি করুন
  const createWebhook = () => {
    toast({
      title: "ওয়েবহুক তৈরি করা হয়েছে",
      description: "আপনার নতুন ওয়েবহুক সফলভাবে তৈরি করা হয়েছে।",
    });
    setNewWebhookOpen(false);
  };
  
  // ওয়েবহুক অ্যাকটিভেট/ডিঅ্যাকটিভেট করুন
  const toggleWebhookStatus = (webhookId: string) => {
    const updatedWebhooks = webhooks.map(webhook => {
      if (webhook.id === webhookId) {
        return {
          ...webhook,
          status: webhook.status === 'active' ? 'inactive' as const : 'active' as const
        };
      }
      return webhook;
    });
    
    setWebhooks(updatedWebhooks);
    
    toast({
      title: "ওয়েবহুক স্ট্যাটাস আপডেট করা হয়েছে",
      description: "ওয়েবহুক স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।",
    });
  };
  
  // ইন্টিগ্রেশন কনফিগার করুন
  const configureIntegration = (integration: IntegrationType) => {
    setSelectedIntegration(integration);
    setConfigureIntegrationOpen(true);
  };
  
  // ইন্টিগ্রেশন কানেক্ট/ডিসকানেক্ট করুন
  const toggleIntegrationStatus = (integrationId: string) => {
    const updatedIntegrations = integrations.map(integration => {
      if (integration.id === integrationId) {
        return {
          ...integration,
          status: integration.status === 'connected' ? 'disconnected' as const : 'connected' as const,
          lastSynced: integration.status === 'disconnected' ? new Date().toISOString() : integration.lastSynced
        };
      }
      return integration;
    });
    
    setIntegrations(updatedIntegrations);
    
    toast({
      title: "ইন্টিগ্রেশন স্ট্যাটাস আপডেট করা হয়েছে",
      description: "ইন্টিগ্রেশন স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।",
    });
  };
  
  // মনিটাইজেশন সেটিংস আপডেট করুন
  const updateMonetizationSetting = (settingId: string, newValue: string | number | boolean) => {
    const updatedSettings = monetizationSettings.map(setting => {
      if (setting.id === settingId) {
        return { ...setting, value: newValue };
      }
      return setting;
    });
    
    setMonetizationSettings(updatedSettings);
    
    toast({
      title: "সেটিং আপডেট করা হয়েছে",
      description: "মনিটাইজেশন সেটিং সফলভাবে আপডেট করা হয়েছে।",
    });
  };
  
  // সিকিউরিটি সেটিংস আপডেট করুন
  const updateSecuritySetting = (settingId: string, newValue: string | boolean) => {
    const updatedSettings = securitySettings.map(setting => {
      if (setting.id === settingId) {
        return { ...setting, value: newValue };
      }
      return setting;
    });
    
    setSecuritySettings(updatedSettings);
    
    toast({
      title: "সিকিউরিটি সেটিং আপডেট করা হয়েছে",
      description: "সিকিউরিটি সেটিং সফলভাবে আপডেট করা হয়েছে।",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">অ্যাডভান্সড ফিচার সেটিংস</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="apis" className="flex items-center">
            <Code className="h-4 w-4 mr-2" />
            <span>API ম্যানেজমেন্ট</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center">
            <Webhook className="h-4 w-4 mr-2" />
            <span>ইন্টিগ্রেশন</span>
          </TabsTrigger>
          <TabsTrigger value="monetization" className="flex items-center">
            <CircleDollarSign className="h-4 w-4 mr-2" />
            <span>মনিটাইজেশন</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <span>সিকিউরিটি</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center">
            <CloudCog className="h-4 w-4 mr-2" />
            <span>সিস্টেম</span>
          </TabsTrigger>
        </TabsList>
        
        {/* API ম্যানেজমেন্ট ট্যাব */}
        <TabsContent value="apis" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>API কী ম্যানেজমেন্ট</CardTitle>
                <Dialog open={newApiKeyOpen} onOpenChange={setNewApiKeyOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Key className="h-4 w-4 mr-2" />
                      নতুন API কী
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>নতুন API কী তৈরি করুন</DialogTitle>
                      <DialogDescription>
                        আপনার অ্যাপ্লিকেশনের জন্য নতুন API কী তৈরি করুন। এই কী ব্যবহার করে API কলগুলি অথেন্টিকেট হবে।
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="keyName" className="text-right">
                          নাম
                        </Label>
                        <Input
                          id="keyName"
                          placeholder="উদাহরণ: মোবাইল অ্যাপ API কী"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="permissions" className="text-right">
                          পারমিশন
                        </Label>
                        <div className="col-span-3 space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-read" className="checkbox" defaultChecked />
                            <Label htmlFor="perm-read">রিড (ডাটা দেখা)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-write" className="checkbox" />
                            <Label htmlFor="perm-write">রাইট (ডাটা সংশোধন)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="perm-delete" className="checkbox" />
                            <Label htmlFor="perm-delete">ডিলিট (ডাটা মুছে ফেলা)</Label>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expires" className="text-right">
                          এক্সপায়ার
                        </Label>
                        <Select defaultValue="never">
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="মেয়াদ শেষ হওয়ার সময়" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30days">৩০ দিন</SelectItem>
                            <SelectItem value="90days">৯০ দিন</SelectItem>
                            <SelectItem value="180days">১৮০ দিন</SelectItem>
                            <SelectItem value="1year">১ বছর</SelectItem>
                            <SelectItem value="never">কখনও না</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={createApiKey}>কী তৈরি করুন</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">নাম</th>
                      <th className="text-left py-3 px-4">API কী</th>
                      <th className="text-left py-3 px-4">তৈরি হয়েছে</th>
                      <th className="text-left py-3 px-4">শেষ ব্যবহার</th>
                      <th className="text-left py-3 px-4">স্ট্যাটাস</th>
                      <th className="text-right py-3 px-4">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((apiKey) => (
                      <tr key={apiKey.id} className="border-b">
                        <td className="py-3 px-4">{apiKey.name}</td>
                        <td className="py-3 px-4">
                          <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono">
                            {apiKey.key.substring(0, 10)}...
                          </code>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(apiKey.createdAt).toLocaleDateString('bn-BD')}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {apiKey.lastUsed 
                            ? new Date(apiKey.lastUsed).toLocaleDateString('bn-BD')
                            : 'ব্যবহৃত হয়নি'}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'} className={
                            apiKey.status === 'active' 
                              ? 'bg-green-500' 
                              : apiKey.status === 'expired' 
                                ? 'bg-amber-500' 
                                : 'bg-red-500'
                          }>
                            {apiKey.status === 'active' 
                              ? 'অ্যাকটিভ' 
                              : apiKey.status === 'expired' 
                                ? 'মেয়াদোত্তীর্ণ' 
                                : 'প্রত্যাহার করা হয়েছে'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => regenerateApiKey(apiKey.id)}
                              disabled={apiKey.status !== 'active'}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              রিজেনারেট
                            </Button>
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => revokeApiKey(apiKey.id)}
                              disabled={apiKey.status !== 'active'}
                              className="text-red-500 border-red-200 hover:text-red-600"
                            >
                              <Lock className="h-4 w-4 mr-1" />
                              রিভোক
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>ওয়েবহুক কনফিগারেশন</CardTitle>
                <Dialog open={newWebhookOpen} onOpenChange={setNewWebhookOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Webhook className="h-4 w-4 mr-2" />
                      নতুন ওয়েবহুক
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>নতুন ওয়েবহুক তৈরি করুন</DialogTitle>
                      <DialogDescription>
                        ইভেন্ট ট্রিগার হলে আপনার সিস্টেমে নোটিফিকেশন পাঠানোর জন্য ওয়েবহুক কনফিগার করুন।
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="webhookName" className="text-right">
                          নাম
                        </Label>
                        <Input
                          id="webhookName"
                          placeholder="উদাহরণ: অর্ডার আপডেট"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="webhookUrl" className="text-right">
                          এন্ডপয়েন্ট URL
                        </Label>
                        <Input
                          id="webhookUrl"
                          placeholder="https://example.com/webhook"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="events" className="text-right">
                          ইভেন্টস
                        </Label>
                        <div className="col-span-3 space-y-2">
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="evt-order" className="checkbox" />
                            <Label htmlFor="evt-order">অর্ডার (তৈরি, আপডেট, সম্পন্ন)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="evt-payment" className="checkbox" />
                            <Label htmlFor="evt-payment">পেমেন্ট (সফল, ব্যর্থ)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="evt-user" className="checkbox" />
                            <Label htmlFor="evt-user">ব্যবহারকারী (সাইন আপ, আপডেট)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="evt-product" className="checkbox" />
                            <Label htmlFor="evt-product">প্রোডাক্ট (তৈরি, আপডেট, মুছে ফেলা)</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={createWebhook}>ওয়েবহুক তৈরি করুন</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <Card key={webhook.id}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{webhook.name}</h3>
                            <Switch
                              checked={webhook.status === 'active'}
                              onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                            />
                          </div>
                          
                          <div className="text-sm text-muted-foreground">
                            <p className="truncate">{webhook.url}</p>
                            <p className="mt-1">তৈরি: {new Date(webhook.createdAt).toLocaleDateString('bn-BD')}</p>
                            <p>শেষ ট্রিগার: {webhook.lastTriggered 
                              ? new Date(webhook.lastTriggered).toLocaleDateString('bn-BD')
                              : 'কখনও না'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">ইভেন্টস</p>
                          <div className="flex flex-wrap gap-1">
                            {webhook.events.map((event, index) => (
                              <Badge key={index} variant="outline" className="whitespace-nowrap">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col justify-between">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              এডিট
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 border-red-200 hover:text-red-600">
                              <Trash2 className="h-4 w-4 mr-1" />
                              ডিলিট
                            </Button>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-xs text-muted-foreground">সিক্রেট কী</p>
                            <div className="flex items-center">
                              <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono mr-2">
                                {webhook.secret.substring(0, 10)}...
                              </code>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <RefreshCw className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>API ডকুমেন্টেশন</CardTitle>
              <CardDescription>
                আপনার API ব্যবহারের জন্য ডকুমেন্টেশন এবং গাইড
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-all">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <FileJson className="h-10 w-10 text-primary mb-2 mt-2" />
                      <h3 className="font-medium">API রেফারেন্স</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        সমস্ত API এন্ডপয়েন্ট এবং পরামিতির পূর্ণ ডকুমেন্টেশন
                      </p>
                      <Button variant="link" className="mt-2">
                        দেখুন <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-all">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Code className="h-10 w-10 text-primary mb-2 mt-2" />
                      <h3 className="font-medium">কোড উদাহরণ</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        বিভিন্ন প্রোগ্রামিং ভাষায় API ব্যবহারের উদাহরণ
                      </p>
                      <Button variant="link" className="mt-2">
                        দেখুন <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-all">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <FileText className="h-10 w-10 text-primary mb-2 mt-2" />
                      <h3 className="font-medium">টিউটোরিয়াল</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        স্টেপ-বাই-স্টেপ গাইড এবং আমাদের API ব্যবহারের টিউটোরিয়াল
                      </p>
                      <Button variant="link" className="mt-2">
                        দেখুন <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-md">
                  <p className="text-sm font-medium mb-2">দ্রুত API উদাহরণ (cURL)</p>
                  <pre className="bg-slate-900 text-slate-50 p-3 rounded-md text-xs overflow-x-auto">
                    <code>
                      curl -X GET "https://api.example.com/v1/products" \<br />
                      {'  '}-H "Authorization: Bearer YOUR_API_KEY" \<br />
                      {'  '}-H "Content-Type: application/json"
                    </code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ইন্টিগ্রেশন ট্যাব */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle>ইন্টিগ্রেশন</CardTitle>
                <Dialog open={newIntegrationOpen} onOpenChange={setNewIntegrationOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Webhook className="h-4 w-4 mr-2" />
                      নতুন ইন্টিগ্রেশন
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                      <DialogTitle>নতুন ইন্টিগ্রেশন যোগ করুন</DialogTitle>
                      <DialogDescription>
                        আপনার সিস্টেমে তৃতীয় পক্ষের পরিষেবা ইন্টিগ্রেট করুন।
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card className="cursor-pointer hover:border-primary/50 transition-all">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <CreditCard className="h-10 w-10 text-blue-500 mb-2 mt-2" />
                            <h3 className="font-medium">নগদ পেমেন্ট</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              নগদ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="cursor-pointer hover:border-primary/50 transition-all">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <MessageSquare className="h-10 w-10 text-green-500 mb-2 mt-2" />
                            <h3 className="font-medium">SMS API</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              এসএমএস এপিআই ইন্টিগ্রেশন
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="cursor-pointer hover:border-primary/50 transition-all">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <Truck className="h-10 w-10 text-amber-500 mb-2 mt-2" />
                            <h3 className="font-medium">শিপিং সার্ভিস</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              কুরিয়ার পার্টনার ইন্টিগ্রেশন
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="cursor-pointer hover:border-primary/50 transition-all">
                          <CardContent className="p-4 flex flex-col items-center text-center">
                            <BarChart className="h-10 w-10 text-purple-500 mb-2 mt-2" />
                            <h3 className="font-medium">অ্যানালিটিক্স</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                              অ্যানালিটিক্স ইন্টিগ্রেশন
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground">
                          কাস্টম ইন্টিগ্রেশন সেটআপ করতে চান?
                        </p>
                        <Button variant="outline" className="mt-2 w-full">
                          <Webhook className="h-4 w-4 mr-2" />
                          কাস্টম ইন্টিগ্রেশন
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                  <Card key={integration.id} className={integration.status === 'connected' ? 'border-green-200' : ''}>
                    <CardContent className="p-4">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {integration.icon === 'CreditCard' && <CreditCard className="h-6 w-6 text-blue-500 mr-2" />}
                            {integration.icon === 'MessageSquare' && <MessageSquare className="h-6 w-6 text-green-500 mr-2" />}
                            {integration.icon === 'Compass' && <Compass className="h-6 w-6 text-amber-500 mr-2" />}
                            {integration.icon === 'BarChart' && <BarChart className="h-6 w-6 text-purple-500 mr-2" />}
                            <h3 className="font-medium">{integration.name}</h3>
                          </div>
                          <Badge variant="outline" className={
                            integration.status === 'connected' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-slate-100'
                          }>
                            {integration.status === 'connected' 
                              ? 'সংযুক্ত' 
                              : 'অসংযুক্ত'}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-2">
                          {integration.description}
                        </p>
                        
                        <div className="mt-2 text-xs text-muted-foreground">
                          {integration.lastSynced && (
                            <p>সর্বশেষ সিঙ্ক: {new Date(integration.lastSynced).toLocaleDateString('bn-BD')}</p>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => configureIntegration(integration)}
                          >
                            <Settings className="h-4 w-4 mr-1" />
                            কনফিগার
                          </Button>
                          
                          <Button 
                            variant={integration.status === 'connected' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => toggleIntegrationStatus(integration.id)}
                          >
                            {integration.status === 'connected' ? (
                              <>
                                <X className="h-4 w-4 mr-1" />
                                ডিসকানেক্ট
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-1" />
                                কানেক্ট
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Card className="border-dashed">
                  <CardContent className="p-4 flex flex-col items-center justify-center min-h-[180px] text-center cursor-pointer" onClick={() => setNewIntegrationOpen(true)}>
                    <PlusCircle className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 font-medium">নতুন ইন্টিগ্রেশন যোগ করুন</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      আরও তৃতীয় পক্ষের পরিষেবা যোগ করুন
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>ইন্টিগ্রেশন কিট</CardTitle>
              <CardDescription>
                ডেভেলপারদের জন্য টুল এবং সম্পদ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <Smartphone className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">মোবাইল এসডিকে</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      আমাদের মোবাইল এসডিকে ব্যবহার করে আপনার অ্যাপ তৈরি করুন
                    </p>
                    <div className="flex mt-4">
                      <Badge className="mr-2">Android</Badge>
                      <Badge>iOS</Badge>
                    </div>
                    <Button className="w-full mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      ডাউনলোড
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <Code className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">ফ্রন্টএন্ড লাইব্রেরি</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      আমাদের ফ্রন্টএন্ড লাইব্রেরি ব্যবহার করে ওয়েব ইন্টিগ্রেশন করুন
                    </p>
                    <div className="flex mt-4">
                      <Badge className="mr-2">React</Badge>
                      <Badge className="mr-2">Angular</Badge>
                      <Badge>Vue</Badge>
                    </div>
                    <Button className="w-full mt-4">
                      <Globe className="h-4 w-4 mr-2" />
                      ডকুমেন্টেশন
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <Server className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">সার্ভার এসডিকে</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      আপনার ব্যাকএন্ড সিস্টেমে ইন্টিগ্রেশন করুন
                    </p>
                    <div className="flex mt-4">
                      <Badge className="mr-2">Node.js</Badge>
                      <Badge className="mr-2">PHP</Badge>
                      <Badge>Python</Badge>
                    </div>
                    <Button className="w-full mt-4">
                      <Upload className="h-4 w-4 mr-2" />
                      ইন্সটল গাইড
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* মনিটাইজেশন ট্যাব */}
        <TabsContent value="monetization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle>মনিটাইজেশন সেটিংস</CardTitle>
                <CardDescription>
                  আপনার প্ল্যাটফর্মের আর্থিক কনফিগারেশন পরিচালনা করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monetizationSettings.map((setting) => (
                    <div key={setting.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-md">
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium">{setting.name}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      
                      <div className="w-full sm:w-1/3 lg:w-1/4">
                        {typeof setting.value === 'boolean' ? (
                          <Switch
                            checked={setting.value}
                            onCheckedChange={(checked) => updateMonetizationSetting(setting.id, checked)}
                          />
                        ) : (
                          <div className="flex">
                            <Input
                              type={typeof setting.value === 'number' ? 'number' : 'text'}
                              value={setting.value.toString()}
                              onChange={(e) => {
                                const newValue = typeof setting.value === 'number' ? 
                                  parseFloat(e.target.value) : 
                                  e.target.value;
                                updateMonetizationSetting(setting.id, newValue);
                              }}
                              className="rounded-r-none"
                            />
                            {setting.category === 'commission' || setting.category === 'discount' || setting.category === 'tax' ? (
                              <span className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-slate-50">%</span>
                            ) : setting.category === 'fee' ? (
                              <span className="flex items-center justify-center px-3 border border-l-0 rounded-r-md bg-slate-50">৳</span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>মনিটাইজেশন ড্যাশবোর্ড</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <div className="flex items-center">
                      <CircleDollarSign className="h-5 w-5 text-green-600 mr-2" />
                      <span>মোট রেভিনিউ</span>
                    </div>
                    <div>
                      <span className="text-lg font-semibold">৳ 8,92,450</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                    <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
                      <span>মোট বিক্রয়</span>
                    </div>
                    <div>
                      <span className="text-lg font-semibold">৳ 5,34,200</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-md">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                      <span>মাসিক আয়</span>
                    </div>
                    <div>
                      <span className="text-lg font-semibold">৳ 1,24,650</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-md">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-amber-600 mr-2" />
                      <span>সক্রিয় সেলার</span>
                    </div>
                    <div>
                      <span className="text-lg font-semibold">128</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      সম্পূর্ণ আর্থিক রিপোর্ট
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>পেমেন্ট মেথড কনফিগারেশন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-md flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">বিকাশ</p>
                      <p className="text-sm text-muted-foreground">মার্চেন্ট অ্যাকাউন্ট কনফিগার করা আছে</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={true} />
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      কনফিগার করুন
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-md flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">নগদ</p>
                      <p className="text-sm text-muted-foreground">মার্চেন্ট অ্যাকাউন্ট কনফিগার করা আছে</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={true} />
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      কনফিগার করুন
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">ক্রেডিট কার্ড</p>
                      <p className="text-sm text-muted-foreground">স্ট্রাইপ পেমেন্ট গেটওয়ে</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={false} />
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      কনফিগার করুন
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">ক্যাশ অন ডেলিভারি</p>
                      <p className="text-sm text-muted-foreground">হাতে টাকা বুঝে পেয়ে ডেলিভারি</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch checked={true} />
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      কনফিগার করুন
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md border-dashed flex items-center justify-center cursor-pointer hover:bg-slate-50">
                  <Button variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    নতুন পেমেন্ট মেথড যোগ করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* সিকিউরিটি ট্যাব */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>সিকিউরিটি সেটিংস</CardTitle>
              <CardDescription>
                প্ল্যাটফর্ম সিকিউরিটি প্রিফারেন্স কনফিগার করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securitySettings.map((setting) => (
                  <div key={setting.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-md">
                    <div className="mb-2 sm:mb-0">
                      <p className="font-medium">{setting.name}</p>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    
                    <div>
                      {typeof setting.value === 'boolean' ? (
                        <Switch
                          checked={setting.value}
                          onCheckedChange={(checked) => updateSecuritySetting(setting.id, checked)}
                        />
                      ) : (
                        <Input
                          type="text"
                          value={setting.value.toString()}
                          onChange={(e) => updateSecuritySetting(setting.id, e.target.value)}
                          className="w-24"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>অ্যাডমিন অ্যাকসেস লগ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">সুপার অ্যাডমিন লগইন</p>
                      <p className="text-xs text-muted-foreground">২২ আগস্ট, ২০২৩ - ১০:৩০ AM</p>
                      <div className="flex items-center mt-1">
                        <Wifi className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-muted-foreground">১০৩.৬৫.৮৯.১২২</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500">সফল</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">কন্টেন্ট মডারেটর পাসওয়ার্ড চেঞ্জ</p>
                      <p className="text-xs text-muted-foreground">২১ আগস্ট, ২০২৩ - ০৩:১৫ PM</p>
                      <div className="flex items-center mt-1">
                        <Wifi className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-muted-foreground">১০৩.৬৫.৮৯.১২২</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500">সফল</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">সুপার অ্যাডমিন লগইন</p>
                      <p className="text-xs text-muted-foreground">২১ আগস্ট, ২০২৩ - ০৯:৪৫ AM</p>
                      <div className="flex items-center mt-1">
                        <Wifi className="h-3 w-3 text-red-600 mr-1" />
                        <span className="text-xs text-muted-foreground">১৮৯.২৩.৪৫.১৩৪</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-red-200 text-red-600">ব্যর্থ</Badge>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    সম্পূর্ণ লগ দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>সিকিউরিটি অ্যালার্ট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                      <p className="font-medium text-amber-800">অস্বাভাবিক লগইন প্রচেষ্টা</p>
                    </div>
                    <p className="text-sm text-amber-700 mt-1">১৯ আগস্ট, ২০২৩ - ০৭:২০ PM থেকে একটি অস্বাভাবিক অবস্থান থেকে একাধিক লগইন প্রচেষ্টা করা হয়েছে।</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100">
                        পর্যালোচনা করুন
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <p className="font-medium text-red-800">API কী দুর্ব্যবহার</p>
                    </div>
                    <p className="text-sm text-red-700 mt-1">১৮ আগস্ট, ২০২৩ - ১১:৩০ AM থেকে একটি API কী-এর ব্যবহার রেট লিমিট বারবার অতিক্রম করেছে।</p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="border-red-300 text-red-800 bg-red-50 hover:bg-red-100">
                        পর্যালোচনা করুন
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-slate-600 mr-2" />
                        <p className="font-medium text-slate-800">সিকিউরিটি স্ক্যান</p>
                      </div>
                      <Badge variant="outline" className="border-green-300 text-green-600">আপডেটেড</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">২০ আগস্ট, ২০২৩ - নিরাপত্তা স্ক্যান সফলভাবে সম্পন্ন হয়েছে। কোনো ভালনারাবিলিটি পাওয়া যায়নি।</p>
                  </div>
                  
                  <Button variant="default" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    সিকিউরিটি অডিট রান করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>অ্যাডমিন অ্যাকাউন্ট কনফিগারেশন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mt-2">
                          <UserCog className="h-8 w-8 text-slate-600" />
                        </div>
                        <h3 className="font-medium mt-2">সুপার অ্যাডমিন</h3>
                        <p className="text-sm text-muted-foreground">সর্বোচ্চ অ্যাকসেস লেভেল</p>
                        <div className="mt-4 w-full">
                          <Button variant="outline" className="w-full">
                            <Settings className="h-4 w-4 mr-2" />
                            অ্যাকসেস কনফিগার
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mt-2">
                          <Users className="h-8 w-8 text-slate-600" />
                        </div>
                        <h3 className="font-medium mt-2">কন্টেন্ট মডারেটর</h3>
                        <p className="text-sm text-muted-foreground">কন্টেন্ট অ্যাপ্রুভাল, এডিট</p>
                        <div className="mt-4 w-full">
                          <Button variant="outline" className="w-full">
                            <Settings className="h-4 w-4 mr-2" />
                            অ্যাকসেস কনফিগার
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mt-2">
                          <Boxes className="h-8 w-8 text-slate-600" />
                        </div>
                        <h3 className="font-medium mt-2">হেল্পডেস্ক অ্যাডমিন</h3>
                        <p className="text-sm text-muted-foreground">সাপোর্ট ও রিফান্ড</p>
                        <div className="mt-4 w-full">
                          <Button variant="outline" className="w-full">
                            <Settings className="h-4 w-4 mr-2" />
                            অ্যাকসেস কনফিগার
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    নতুন অ্যাডমিন রোল তৈরি করুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* সিস্টেম ট্যাব */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>সিস্টেম স্ট্যাটাস</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <div className="flex items-center">
                      <Server className="h-5 w-5 text-green-600 mr-2" />
                      <span>অ্যাপ্লিকেশন সার্ভার</span>
                    </div>
                    <Badge className="bg-green-500">অপারেশনাল</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 text-green-600 mr-2" />
                      <span>ডাটাবেস</span>
                    </div>
                    <Badge className="bg-green-500">অপারেশনাল</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <div className="flex items-center">
                      <Webhook className="h-5 w-5 text-green-600 mr-2" />
                      <span>API সার্ভিস</span>
                    </div>
                    <Badge className="bg-green-500">অপারেশনাল</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-md">
                    <div className="flex items-center">
                      <Zap className="h-5 w-5 text-amber-600 mr-2" />
                      <span>ব্যাকগ্রাউন্ড প্রসেসিং</span>
                    </div>
                    <Badge className="bg-amber-500">ধীর পারফরম্যান্স</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                    <div className="flex items-center">
                      <Send className="h-5 w-5 text-green-600 mr-2" />
                      <span>ইমেইল সিস্টেম</span>
                    </div>
                    <Badge className="bg-green-500">অপারেশনাল</Badge>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">সিস্টেম রিসোর্স</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">CPU ব্যবহার</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">মেমোরি ব্যবহার</span>
                        <span>68%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">ডিস্ক স্পেস</span>
                        <span>32%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <CardTitle>সিস্টেম ম্যানেজমেন্ট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">ম্যানুয়াল ব্যাকআপ</p>
                      <p className="text-sm text-muted-foreground">পূর্ণ সিস্টেম ব্যাকআপ তৈরি করুন</p>
                    </div>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      ব্যাকআপ নিন
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">ক্যাশে ক্লিয়ার করুন</p>
                      <p className="text-sm text-muted-foreground">সিস্টেম ক্যাশে রিফ্রেশ করুন</p>
                    </div>
                    <Button variant="outline">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      ক্লিয়ার
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">সিস্টেম লগ</p>
                      <p className="text-sm text-muted-foreground">লগ ফাইল দেখুন এবং ডাউনলোড করুন</p>
                    </div>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      লগ দেখুন
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">ম্যানটেনেন্স মোড</p>
                      <p className="text-sm text-muted-foreground">সাইট ম্যানটেনেন্স মোডে রাখুন</p>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <p className="text-sm font-medium mb-3">সিস্টেম আপডেট</p>
                
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mb-4">
                  <div className="flex items-center mb-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                    <p className="font-medium text-amber-800">নতুন আপডেট উপলব্ধ</p>
                  </div>
                  <p className="text-sm text-amber-700">ভার্সন 2.5.0 উপলব্ধ রয়েছে। আপনি বর্তমানে ভার্সন 2.4.8 ব্যবহার করছেন।</p>
                  <Button className="mt-3 bg-amber-600 hover:bg-amber-700">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    আপডেট ইনস্টল করুন
                  </Button>
                </div>
                
                <div className="p-3 border rounded-md">
                  <p className="text-sm font-medium">সর্বশেষ আপডেট: ২০ আগস্ট, ২০২৩</p>
                  <p className="text-xs text-muted-foreground mt-1">ভার্সন 2.4.8 ইনস্টল করা হয়েছে</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>এনভায়রনমেন্ট কনফিগারেশন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Tabs defaultValue="production">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="production">প্রোডাকশন</TabsTrigger>
                    <TabsTrigger value="staging">স্টেজিং</TabsTrigger>
                    <TabsTrigger value="development">ডেভেলপমেন্ট</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="production" className="pt-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="p-3 border rounded-md">
                          <p className="text-sm font-medium">প্রোডাকশন সার্ভার</p>
                          <code className="block bg-slate-50 p-2 rounded-md text-xs mt-2 overflow-x-auto">
                            SERVER_HOST=production.example.com<br />
                            SERVER_PORT=443<br />
                            SSL_ENABLED=true
                          </code>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <p className="text-sm font-medium">ডাটাবেস কনফিগ</p>
                          <code className="block bg-slate-50 p-2 rounded-md text-xs mt-2 overflow-x-auto">
                            DB_HOST=db-prod.example.com<br />
                            DB_PORT=5432<br />
                            DB_TYPE=postgres
                          </code>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <p className="text-sm font-medium">অ্যাপ্লিকেশন সেটিংস</p>
                          <code className="block bg-slate-50 p-2 rounded-md text-xs mt-2 overflow-x-auto">
                            APP_ENV=production<br />
                            DEBUG_MODE=false<br />
                            LOG_LEVEL=error
                          </code>
                        </div>
                        
                        <div className="p-3 border rounded-md">
                          <p className="text-sm font-medium">পেমেন্ট সেটিংস</p>
                          <code className="block bg-slate-50 p-2 rounded-md text-xs mt-2 overflow-x-auto">
                            PAYMENT_GATEWAY=live<br />
                            PAYMENT_DEBUG=false<br />
                            PAYMENT_TIMEOUT=30
                          </code>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        কনফিগারেশন এডিট করুন
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="staging" className="pt-4">
                    <div className="flex items-center justify-center p-12">
                      <div className="text-center">
                        <Settings className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="mt-4 font-medium">স্টেজিং এনভায়রনমেন্ট কনফিগারেশন</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          স্টেজিং এনভায়রনমেন্ট কনফিগার করতে বাটনে ক্লিক করুন
                        </p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          স্টেজিং কনফিগ সেটআপ
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="development" className="pt-4">
                    <div className="flex items-center justify-center p-12">
                      <div className="text-center">
                        <Settings className="h-12 w-12 text-muted-foreground mx-auto" />
                        <p className="mt-4 font-medium">ডেভেলপমেন্ট এনভায়রনমেন্ট কনফিগারেশন</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          ডেভেলপমেন্ট এনভায়রনমেন্ট কনফিগার করতে বাটনে ক্লিক করুন
                        </p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          ডেভেলপমেন্ট কনফিগ সেটআপ
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFeatures;

