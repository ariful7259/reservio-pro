
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone,
  Mail,
  MessageCircle,
  Lock,
  Eye,
  EyeOff,
  User,
  CreditCard,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      orderUpdates: true,
      promotions: false,
      newsletter: true
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false,
      onlineStatus: true
    },
    preferences: {
      language: 'bn',
      theme: 'system',
      currency: 'BDT'
    }
  });

  const handleSettingChange = (category: string, key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    
    toast({
      title: "সেটিংস আপডেট হয়েছে",
      description: "আপনার পছন্দ সংরক্ষিত হয়েছে"
    });
  };

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">সেটিংস</h1>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              নোটিফিকেশন সেটিংস
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>পুশ নোটিফিকেশন</Label>
                <p className="text-sm text-muted-foreground">মোবাইলে তাৎক্ষণিক বিজ্ঞপ্তি পান</p>
              </div>
              <Switch
                checked={settings.notifications.push}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ইমেইল নোটিফিকেশন</Label>
                <p className="text-sm text-muted-foreground">ইমেইলে আপডেট পান</p>
              </div>
              <Switch
                checked={settings.notifications.email}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS নোটিফিকেশন</Label>
                <p className="text-sm text-muted-foreground">SMS এর মাধ্যমে তথ্য পান</p>
              </div>
              <Switch
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'sms', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>অর্ডার আপডেট</Label>
                <p className="text-sm text-muted-foreground">অর্ডার স্ট্যাটাস পরিবর্তনের খবর</p>
              </div>
              <Switch
                checked={settings.notifications.orderUpdates}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'orderUpdates', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>প্রমোশনাল অফার</Label>
                <p className="text-sm text-muted-foreground">বিশেষ ছাড় ও অফারের খবর</p>
              </div>
              <Switch
                checked={settings.notifications.promotions}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'promotions', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              প্রাইভেসি সেটিংস
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>প্রোফাইল প্রকাশ</Label>
                <p className="text-sm text-muted-foreground">অন্যরা আপনার প্রোফাইল দেখতে পাবে</p>
              </div>
              <Switch
                checked={settings.privacy.profileVisible}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'profileVisible', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ইমেইল প্রকাশ</Label>
                <p className="text-sm text-muted-foreground">প্রোফাইলে ইমেইল দেখানো হবে</p>
              </div>
              <Switch
                checked={settings.privacy.showEmail}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'showEmail', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>ফোন নম্বর প্রকাশ</Label>
                <p className="text-sm text-muted-foreground">প্রোফাইলে ফোন নম্বর দেখানো হবে</p>
              </div>
              <Switch
                checked={settings.privacy.showPhone}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'showPhone', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>অনলাইন স্ট্যাটাস</Label>
                <p className="text-sm text-muted-foreground">আপনি অনলাইনে আছেন কিনা দেখানো হবে</p>
              </div>
              <Switch
                checked={settings.privacy.onlineStatus}
                onCheckedChange={(checked) => handleSettingChange('privacy', 'onlineStatus', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              অ্যাপ পছন্দসমূহ
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>ভাষা</Label>
              <Select 
                value={settings.preferences.language} 
                onValueChange={(value) => handleSettingChange('preferences', 'language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bn">বাংলা</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>মুদ্রা</Label>
              <Select 
                value={settings.preferences.currency} 
                onValueChange={(value) => handleSettingChange('preferences', 'currency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BDT">বাংলাদেশি টাকা (৳)</SelectItem>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>থিম</Label>
              <Select 
                value={settings.preferences.theme} 
                onValueChange={(value) => handleSettingChange('preferences', 'theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">হালকা</SelectItem>
                  <SelectItem value="dark">গাঢ়</SelectItem>
                  <SelectItem value="system">সিস্টেম</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>একাউন্ট ম্যানেজমেন্ট</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile-management')}>
              <User className="h-4 w-4 mr-2" />
              প্রোফাইল এডিট করুন
            </Button>
            
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/kyc-verification')}>
              <Shield className="h-4 w-4 mr-2" />
              KYC ভেরিফিকেশন
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-4 w-4 mr-2" />
              পাসওয়ার্ড পরিবর্তন
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              পেমেন্ট মেথড
            </Button>
            
            <Button variant="outline" className="w-full justify-start text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              একাউন্ট ডিলিট
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
