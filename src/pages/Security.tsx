
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Fingerprint, ShieldCheck, Key, Smartphone, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Security = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    biometric: false,
    loginAlerts: true,
  });

  const toggleSetting = (setting: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    toast({
      title: "সেটিংস আপডেট করা হয়েছে",
      description: `${setting === 'twoFactor' ? 'টু-ফ্যাক্টর অথেন্টিকেশন' : setting === 'biometric' ? 'বায়োমেট্রিক লগইন' : 'লগইন অ্যালার্ট'} ${!securitySettings[setting] ? 'এনাবল' : 'ডিজেবল'} করা হয়েছে`,
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
        <h1 className="text-xl font-semibold">সিকিউরিটি</h1>
      </div>

      <div className="space-y-6">
        <Card className="border">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">পাসওয়ার্ড চেঞ্জ করুন</h3>
                  <p className="text-sm text-muted-foreground">নিয়মিত পাসওয়ার্ড আপডেট করুন নিরাপত্তার জন্য</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Input 
                  type="password"
                  placeholder="বর্তমান পাসওয়ার্ড"
                />
              </div>
              
              <div className="relative">
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder="নতুন পাসওয়ার্ড"
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              <div className="relative">
                <Input 
                  type="password"
                  placeholder="নতুন পাসওয়ার্ড আবার লিখুন"
                />
              </div>

              <Button className="w-full">পাসওয়ার্ড আপডেট করুন</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">অ্যাকাউন্ট নিরাপত্তা</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">টু-ফ্যাক্টর অথেন্টিকেশন</p>
                    <p className="text-sm text-muted-foreground">লগইন করার সময় ভেরিফিকেশন কোড ব্যবহার করুন</p>
                  </div>
                </div>
                <Switch 
                  checked={securitySettings.twoFactor}
                  onCheckedChange={() => toggleSetting('twoFactor')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Fingerprint className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">বায়োমেট্রিক লগইন</p>
                    <p className="text-sm text-muted-foreground">ফিঙ্গারপ্রিন্ট বা ফেস আইডি ব্যবহার করে লগইন করুন</p>
                  </div>
                </div>
                <Switch 
                  checked={securitySettings.biometric}
                  onCheckedChange={() => toggleSetting('biometric')}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">লগইন অ্যালার্ট</p>
                    <p className="text-sm text-muted-foreground">নতুন ডিভাইস থেকে লগইন করলে নোটিফিকেশন পাবেন</p>
                  </div>
                </div>
                <Switch 
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={() => toggleSetting('loginAlerts')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">KYC ভেরিফিকেশন</h3>
            <p className="text-sm text-muted-foreground mb-4">আপনার পরিচয় যাচাই করা হয়নি। নিরাপদ লেনদেনের জন্য KYC সম্পূর্ণ করুন।</p>
            <Button variant="outline" className="w-full">KYC সম্পূর্ণ করুন</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;
