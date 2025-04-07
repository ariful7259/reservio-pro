
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Fingerprint, 
  ShieldCheck, 
  Key, 
  Smartphone, 
  Eye, 
  EyeOff, 
  Mail, 
  Clock, 
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Security = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: true,
    biometric: false,
    loginAlerts: true,
    authenticatorApp: false,
    emailVerification: true
  });

  const toggleSetting = (setting: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    toast({
      title: "সেটিংস আপডেট করা হয়েছে",
      description: `${setting === 'twoFactor' ? 'টু-ফ্যাক্টর অথেন্টিকেশন' : 
                    setting === 'biometric' ? 'বায়োমেট্রিক লগইন' : 
                    setting === 'loginAlerts' ? 'লগইন অ্যালার্ট' :
                    setting === 'authenticatorApp' ? 'অথেনটিকেটর অ্যাপ' :
                    'ইমেইল ভেরিফিকেশন'} ${!securitySettings[setting] ? 'এনাবল' : 'ডিজেবল'} করা হয়েছে`,
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
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">সিকিউরিটি স্কোর</h3>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">যাচাই করুন</Badge>
              </div>
              <Progress value={70} className="h-2 mb-2" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">৭০% সুরক্ষিত</span>
                <span className="text-amber-600">সুপারিশ</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">উন্নত নিরাপত্তার জন্য ২FA সক্রিয় করুন</p>
            <Button variant="default" className="w-full" onClick={() => navigate('/security/2fa')}>
              নিরাপত্তা বাড়ান
            </Button>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">টু-ফ্যাক্টর অথেনটিকেশন (2FA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-5">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">মোবাইল OTP</p>
                  <p className="text-sm text-muted-foreground">লগইন করতে মোবাইলে পাঠানো OTP ব্যবহার করুন</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-600 border-0">সক্রিয়</Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">ইমেইল ভেরিফিকেশন</p>
                  <p className="text-sm text-muted-foreground">লগইন করতে ইমেইলে পাঠানো কোড ব্যবহার করুন</p>
                </div>
              </div>
              <Button size="sm" variant="outline" onClick={() => toggleSetting('emailVerification')}>
                সক্রিয় করুন
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">অথেনটিকেটর অ্যাপ</p>
                  <p className="text-sm text-muted-foreground">Google Authenticator বা অন্য 2FA অ্যাপ ব্যবহার করুন</p>
                </div>
              </div>
              <Badge className="bg-gray-100 text-gray-600 border-0">নিষ্ক্রিয়</Badge>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Fingerprint className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">বায়োমেট্রিক</p>
                  <p className="text-sm text-muted-foreground">ফিঙ্গারপ্রিন্ট বা ফেস আইডি দিয়ে লগইন করুন</p>
                </div>
              </div>
              <Badge className="bg-gray-100 text-gray-600 border-0">নিষ্ক্রিয়</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">পাসওয়ার্ড ও অ্যাক্সেস সেটিংস</CardTitle>
          </CardHeader>
          <CardContent className="px-5 space-y-4">
            <div className="space-y-4">
              <Button variant="outline" className="w-full flex justify-between items-center" onClick={() => navigate('/security/password-change')}>
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span>পাসওয়ার্ড পরিবর্তন</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full flex justify-between items-center" onClick={() => navigate('/security/login-sessions')}>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>লগইন সেশন</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="w-full flex justify-between items-center" onClick={() => navigate('/security/login-history')}>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>লগইন হিস্টরি</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default Security;
