
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Globe,
  Palette,
  Database,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: true
    },
    privacy: {
      showProfile: true,
      showActivity: false,
      allowMessages: true
    },
    appearance: {
      theme: 'system',
      language: 'bn'
    }
  });

  const handleSaveSettings = () => {
    toast({
      title: "সেটিংস সেভ হয়েছে",
      description: "আপনার সেটিংস সফলভাবে আপডেট হয়েছে"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-blue-600" />
            সেটিংস
          </h1>
          <p className="text-muted-foreground">আপনার অ্যাকাউন্ট ও অ্যাপ সেটিংস পরিচালনা করুন</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="general">সাধারণ</TabsTrigger>
            <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
            <TabsTrigger value="privacy">গোপনীয়তা</TabsTrigger>
            <TabsTrigger value="appearance">চেহারা</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  সাধারণ সেটিংস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">টাইম জোন</Label>
                    <select id="timezone" className="w-full p-2 border rounded-lg">
                      <option>Asia/Dhaka (GMT+6)</option>
                      <option>Asia/Kolkata (GMT+5:30)</option>
                      <option>UTC (GMT+0)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">তারিখ ফর্ম্যাট</Label>
                    <select id="dateFormat" className="w-full p-2 border rounded-lg">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>স্বয়ংক্রিয় আপডেট</Label>
                    <p className="text-sm text-muted-foreground">নতুন ফিচার স্বয়ংক্রিয়ভাবে সক্রিয় করুন</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>অ্যানালিটিক্স</Label>
                    <p className="text-sm text-muted-foreground">ব্যবহার ডেটা শেয়ার করুন</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  নোটিফিকেশন সেটিংস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>ইমেইল নোটিফিকেশন</Label>
                    <p className="text-sm text-muted-foreground">অর্ডার ও আপডেট ইমেইলে পান</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS নোটিফিকেশন</Label>
                    <p className="text-sm text-muted-foreground">গুরুত্বপূর্ণ আপডেট SMS এ পান</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.sms}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, sms: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>পুশ নোটিফিকেশন</Label>
                    <p className="text-sm text-muted-foreground">রিয়েল-টাইম আপডেট পান</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, push: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>মার্কেটিং ইমেইল</Label>
                    <p className="text-sm text-muted-foreground">অফার ও প্রমোশনাল ইমেইল পান</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, marketing: checked }
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  গোপনীয়তা সেটিংস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>প্রোফাইল দৃশ্যমানতা</Label>
                    <p className="text-sm text-muted-foreground">অন্যরা আপনার প্রোফাইল দেখতে পারবে</p>
                  </div>
                  <Switch 
                    checked={settings.privacy.showProfile}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showProfile: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>কার্যকলাপ দেখান</Label>
                    <p className="text-sm text-muted-foreground">আপনার সাম্প্রতিক কার্যকলাপ দেখান</p>
                  </div>
                  <Switch 
                    checked={settings.privacy.showActivity}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, showActivity: checked }
                      }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>মেসেজ গ্রহণ</Label>
                    <p className="text-sm text-muted-foreground">অন্যরা আপনাকে মেসেজ পাঠাতে পারবে</p>
                  </div>
                  <Switch 
                    checked={settings.privacy.allowMessages}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        privacy: { ...prev.privacy, allowMessages: checked }
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  চেহারা সেটিংস
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>থিম</Label>
                  <select 
                    value={settings.appearance.theme}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, theme: e.target.value }
                      }))
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="light">লাইট</option>
                    <option value="dark">ডার্ক</option>
                    <option value="system">সিস্টেম</option>
                  </select>
                </div>
                <div>
                  <Label>ভাষা</Label>
                  <select 
                    value={settings.appearance.language}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        appearance: { ...prev.appearance, language: e.target.value }
                      }))
                    }
                    className="w-full p-2 border rounded-lg mt-1"
                  >
                    <option value="bn">বাংলা</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>
            সেটিংস সেভ করুন
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
