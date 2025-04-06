
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Smartphone, 
  Mail, 
  Key, 
  Fingerprint,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const TwoFactorAuthentication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otpInput, setOtpInput] = useState('');
  const [authenticatorCode, setAuthenticatorCode] = useState('');
  const [activeMethod, setActiveMethod] = useState('mobile');
  const [availabilityEnabled, setAvailabilityEnabled] = useState(true);

  const handleVerify = () => {
    toast({
      title: "ভেরিফিকেশন সফল",
      description: "টু-ফ্যাক্টর অথেনটিকেশন সফলভাবে সক্রিয় করা হয়েছে",
    });
    navigate('/security');
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
        <h1 className="text-xl font-semibold">টু-ফ্যাক্টর অথেনটিকেশন (2FA)</h1>
      </div>

      <div className="space-y-6">
        <Card className="border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">মোবাইল OTP</CardTitle>
              <Badge variant={activeMethod === 'mobile' ? "default" : "outline"}>
                {activeMethod === 'mobile' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              </Badge>
            </div>
            <CardDescription>লগইন করতে মোবাইলে পাঠানো OTP ব্যবহার করুন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-5">
            <div className="p-4 rounded-lg border bg-blue-50">
              <p className="text-blue-700 text-sm">
                আপনার মোবাইল নম্বর +৮৮০১৭১২৩৪৫৬৭৮ এ একটি ভেরিফিকেশন কোড পাঠানো হয়েছে। কোডটি নিচে লিখুন।
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">OTP কোড</label>
              <Input 
                id="otp" 
                type="text" 
                placeholder="৬ ডিজিটের কোড লিখুন" 
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            <div className="flex justify-center">
              <Button variant="link" className="text-sm">
                কোড পাননি? আবার পাঠান
              </Button>
            </div>

            <Button 
              variant="default" 
              className="w-full" 
              disabled={otpInput.length < 6}
              onClick={handleVerify}
            >
              ভেরিফাই করুন
            </Button>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">অথেনটিকেটর অ্যাপ</CardTitle>
              <Badge variant={activeMethod === 'app' ? "default" : "outline"}>
                {activeMethod === 'app' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
              </Badge>
            </div>
            <CardDescription>Google Authenticator বা অন্য 2FA অ্যাপ ব্যবহার করুন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-5">
            <div className="flex justify-center py-2">
              <div className="border p-4 rounded-lg">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/bb/QR-Code_Example.svg" 
                  alt="QR Code" 
                  className="w-48 h-48"
                />
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-blue-50">
              <p className="text-blue-700 text-sm">
                Google Authenticator বা অন্য যেকোনো 2FA অ্যাপ ব্যবহার করে উপরের QR কোডটি স্ক্যান করুন।
                তারপর অ্যাপে দেখানো কোডটি নিচে লিখুন।
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="authenticator-code" className="text-sm font-medium">অথেনটিকেটর কোড</label>
              <Input 
                id="authenticator-code" 
                type="text" 
                placeholder="৬ ডিজিটের কোড লিখুন" 
                value={authenticatorCode}
                onChange={(e) => setAuthenticatorCode(e.target.value)}
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>

            <Button 
              variant="default" 
              className="w-full" 
              disabled={authenticatorCode.length < 6}
              onClick={() => {
                setActiveMethod('app');
                toast({
                  title: "অথেনটিকেটর অ্যাপ সক্রিয়",
                  description: "অথেনটিকেটর অ্যাপ সফলভাবে সক্রিয় করা হয়েছে",
                });
              }}
            >
              ভেরিফাই করুন
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">অন্যান্য 2FA পদ্ধতি</CardTitle>
            <CardDescription>আপনার পছন্দ অনুযায়ী 2FA মেথড বেছে নিন</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-5">
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
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setActiveMethod('email');
                  toast({
                    title: "সেটিংস আপডেট করা হয়েছে",
                    description: "ইমেইল ভেরিফিকেশন সক্রিয় করা হয়েছে",
                  });
                }}
              >
                সক্রিয় করুন
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">পাসওয়ার্ড রিসেট প্রোটেকশন</p>
                  <p className="text-sm text-muted-foreground">পাসওয়ার্ড রিসেট করতে বাড়তি ভেরিফিকেশন প্রয়োজন</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                সক্রিয় করুন
              </Button>
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
              <Badge className="bg-amber-100 text-amber-600 border-0">শীঘ্রই আসছে</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">রিকভারি অপশন</CardTitle>
            <CardDescription>2FA হারিয়ে গেলে আপনার অ্যাকাউন্ট পুনরুদ্ধারের উপায়</CardDescription>
          </CardHeader>
          <CardContent className="px-5">
            <div className="p-4 rounded-lg border bg-blue-50">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-700 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 font-medium mb-1">বাড়তি নিরাপত্তা</p>
                  <p className="text-sm text-blue-600">
                    2FA অ্যাকসেস হারিয়ে গেলে অ্যাকাউন্ট পুনরুদ্ধার করতে নিচের একটি বিকল্প উপায় সেট করুন।
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="recovery-email" className="text-sm font-medium">বিকল্প ইমেইল</label>
                <Input id="recovery-email" type="email" placeholder="বিকল্প ইমেইল অ্যাড্রেস" />
              </div>
              <div className="space-y-2">
                <label htmlFor="recovery-phone" className="text-sm font-medium">বিকল্প ফোন নাম্বার</label>
                <Input id="recovery-phone" type="tel" placeholder="বিকল্প ফোন নাম্বার" />
              </div>
              <Button className="w-full">রিকভারি অপশন সেভ করুন</Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <p className="font-medium text-green-700">অতিরিক্ত নিরাপত্তা</p>
            <p className="text-sm text-green-600">
              টু-ফ্যাক্টর অথেনটিকেশন আপনার অ্যাকাউন্টকে হ্যাকারদের থেকে সুরক্ষিত রাখতে সাহায্য করে। এটি সক্রিয় করার পরামর্শ দেওয়া হয়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
