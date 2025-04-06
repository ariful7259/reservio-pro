
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Eye, UserPlus, Globe, Users, Download, User, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const PrivacySettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileVisibility, setProfileVisibility] = useState("friends");
  const [contactVisibility, setContactVisibility] = useState("private");
  const [locationVisibility, setLocationVisibility] = useState("private");
  const [settings, setSettings] = useState({
    dataCollection: true,
    personalizedContent: true,
    notificationEmails: true,
    thirdPartySharing: false,
    activityTracking: true,
    cookieConsent: true,
    twoFactor: true
  });

  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    toast({
      title: "সেটিংস আপডেট করা হয়েছে",
      description: `${setting === 'dataCollection' ? 'ডাটা সংগ্রহ' : 
                    setting === 'personalizedContent' ? 'পার্সোনালাইজড কন্টেন্ট' : 
                    setting === 'notificationEmails' ? 'ইমেইল নোটিফিকেশন' :
                    setting === 'thirdPartySharing' ? 'থার্ড পার্টি শেয়ারিং' :
                    setting === 'activityTracking' ? 'অ্যাকটিভিটি ট্র্যাকিং' :
                    setting === 'cookieConsent' ? 'কুকি সম্মতি' :
                    'টু-ফ্যাক্টর অথেনটিকেশন'} ${!settings[setting] ? 'এনাবল' : 'ডিজেবল'} করা হয়েছে`,
    });
  };

  const savePrivacySettings = () => {
    toast({
      title: "প্রাইভেসি সেটিংস সেভ করা হয়েছে",
      description: "আপনার প্রাইভেসি সেটিংস সফলভাবে আপডেট করা হয়েছে",
    });
  };

  const downloadData = () => {
    toast({
      title: "ডাটা ডাউনলোড অনুরোধ করা হয়েছে",
      description: "আপনার ডাটা ডাউনলোড অনুরোধ সফলভাবে গ্রহণ করা হয়েছে। ২৪ ঘণ্টার মধ্যে ইমেইলে পাবেন।",
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
        <h1 className="text-xl font-semibold">প্রাইভেসি সেটিংস</h1>
      </div>

      <div className="space-y-6">
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-700">প্রাইভেসি নিয়ন্ত্রণ করুন</AlertTitle>
          <AlertDescription className="text-blue-600">
            আপনার অ্যাকাউন্টের প্রাইভেসি সেটিংস পরিবর্তন করে নিরাপত্তা বাড়ান এবং তথ্য প্রদর্শন নিয়ন্ত্রণ করুন।
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5" /> প্রোফাইল প্রাইভেসি
            </CardTitle>
            <CardDescription>
              আপনার প্রোফাইল এবং ব্যক্তিগত তথ্য কারা দেখতে পাবে তা নির্ধারণ করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">প্রোফাইল দৃশ্যমানতা</h3>
              <RadioGroup value={profileVisibility} onValueChange={setProfileVisibility}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="profile-public" />
                  <Label htmlFor="profile-public" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    পাবলিক (সবাই)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="profile-friends" />
                  <Label htmlFor="profile-friends" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    শুধু কানেকশন
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="profile-private" />
                  <Label htmlFor="profile-private" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    প্রাইভেট (শুধু আমি)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">যোগাযোগ তথ্য দৃশ্যমানতা</h3>
              <RadioGroup value={contactVisibility} onValueChange={setContactVisibility}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="contact-public" />
                  <Label htmlFor="contact-public" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    পাবলিক (সবাই)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="contact-friends" />
                  <Label htmlFor="contact-friends" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    শুধু কানেকশন
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="contact-private" />
                  <Label htmlFor="contact-private" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    প্রাইভেট (শুধু আমি)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">লোকেশন শেয়ারিং</h3>
              <RadioGroup value={locationVisibility} onValueChange={setLocationVisibility}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="location-public" />
                  <Label htmlFor="location-public" className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    পাবলিক (সবাই)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="location-friends" />
                  <Label htmlFor="location-friends" className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    শুধু কানেকশন
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="location-private" />
                  <Label htmlFor="location-private" className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    প্রাইভেট (শুধু আমি)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-5 w-5" /> ডাটা প্রাইভেসি এবং শেয়ারিং
            </CardTitle>
            <CardDescription>
              আপনার ডাটা কীভাবে ব্যবহার এবং শেয়ার করা হবে তা নিয়ন্ত্রণ করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">ডাটা সংগ্রহ</Label>
                <p className="text-sm text-muted-foreground">
                  সেবা উন্নত করার জন্য ব্যবহারের ডাটা সংগ্রহ করা
                </p>
              </div>
              <Switch
                checked={settings.dataCollection}
                onCheckedChange={() => toggleSetting('dataCollection')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">পার্সোনালাইজড কন্টেন্ট</Label>
                <p className="text-sm text-muted-foreground">
                  আপনার পছন্দ অনুযায়ী কনটেন্ট ও বিজ্ঞাপন দেখানো
                </p>
              </div>
              <Switch
                checked={settings.personalizedContent}
                onCheckedChange={() => toggleSetting('personalizedContent')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">অ্যাকটিভিটি ট্র্যাকিং</Label>
                <p className="text-sm text-muted-foreground">
                  অ্যাপ ব্যবহারের সময় আপনার অ্যাকটিভিটি ট্র্যাক করা
                </p>
              </div>
              <Switch
                checked={settings.activityTracking}
                onCheckedChange={() => toggleSetting('activityTracking')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">থার্ড পার্টি শেয়ারিং</Label>
                <p className="text-sm text-muted-foreground">
                  আপনার ডাটা অন্য সেবাদাতাদের সাথে শেয়ার করা
                </p>
              </div>
              <Switch
                checked={settings.thirdPartySharing}
                onCheckedChange={() => toggleSetting('thirdPartySharing')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">কুকি সম্মতি</Label>
                <p className="text-sm text-muted-foreground">
                  অ্যাপের জন্য প্রয়োজনীয় কুকি গ্রহণ
                </p>
              </div>
              <Switch
                checked={settings.cookieConsent}
                onCheckedChange={() => toggleSetting('cookieConsent')}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="w-1/2 flex gap-2" 
            onClick={downloadData}
          >
            <Download className="h-4 w-4" />
            আমার ডাটা ডাউনলোড
          </Button>
          
          <Button className="w-1/2" onClick={savePrivacySettings}>
            সেটিংস সেভ করুন
          </Button>
        </div>
        
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-600">
            ডাটা প্রাইভেসি এবং ব্যবহারের নীতিমালা সম্পর্কে বিস্তারিত জানতে আমাদের 
            <Button variant="link" className="p-0 h-auto font-medium text-amber-600">প্রাইভেসি পলিসি</Button> দেখুন।
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default PrivacySettings;
