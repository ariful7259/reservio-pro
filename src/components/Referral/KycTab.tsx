
import React, { useState } from 'react';
import { useReferralData } from '@/hooks/useReferralData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  UserCircle, Shield, Smartphone, Check, Upload, FileLock2, FileWarning, AlertCircle, Info, 
  ChevronRight, CircleDashed, FileCheck2, FileInput, UploadCloud 
} from 'lucide-react';

const KycTab = () => {
  const { referralData, loading } = useReferralData();
  const [uploadingNid, setUploadingNid] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [otp, setOtp] = useState('');
  const { toast } = useToast();
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full inline-block mb-4"></div>
        <p>KYC তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!referralData) return null;

  const { kycStatus } = referralData;
  const completedSteps = Object.values(kycStatus).filter(value => value === true).length - 1; // Subtract the isComplete field
  const totalSteps = Object.keys(kycStatus).length - 1; // Subtract the isComplete field
  const progressPercent = (completedSteps / totalSteps) * 100;
  
  const handleNidUpload = () => {
    setUploadingNid(true);
    
    // Simulate upload and verification
    setTimeout(() => {
      setUploadingNid(false);
      toast({
        title: "NID আপলোড করা হয়েছে!",
        description: "আপনার ডকুমেন্টগুলো যাচাইয়ের জন্য পাঠানো হয়েছে।",
      });
    }, 2000);
  };
  
  const handleVerifyPhone = () => {
    setVerifyingPhone(true);
    
    // Simulate OTP sending
    setTimeout(() => {
      setVerifyingPhone(false);
      toast({
        title: "ওটিপি পাঠানো হয়েছে!",
        description: "আপনার ফোন নম্বরে একটি ওটিপি পাঠানো হয়েছে।",
      });
    }, 1500);
  };
  
  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "ভুল ওটিপি!",
        description: "অনুগ্রহ করে সঠিক ওটিপি দিন।",
        variant: "destructive",
      });
      return;
    }
    
    setVerifyingPhone(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      setVerifyingPhone(false);
      setOtp('');
      toast({
        title: "ফোন নম্বর যাচাই করা হয়েছে!",
        description: "আপনার ফোন নম্বর সফলভাবে যাচাই করা হয়েছে।",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>KYC ভেরিফিকেশন</CardTitle>
          <CardDescription>
            উপার্জন উত্তোলনের জন্য KYC ভেরিফিকেশন সম্পূর্ণ করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span>প্রোগ্রেস</span>
              <span className="font-medium">{completedSteps}/{totalSteps} সম্পূর্ণ</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
          
          {/* Step 1: Personal Information */}
          <div className="space-y-6">
            <div className={`p-4 border rounded-lg ${kycStatus.personalInfo ? 'bg-green-50 border-green-200' : 'bg-secondary/10'}`}>
              <div className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${kycStatus.personalInfo ? 'bg-green-100' : 'bg-secondary/20'}`}>
                  {kycStatus.personalInfo ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <UserCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">ব্যক্তিগত তথ্য</h3>
                    {kycStatus.personalInfo && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">সম্পূর্ণ</Badge>
                    )}
                  </div>
                  
                  {kycStatus.personalInfo ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      আপনার ব্যক্তিগত তথ্য সফলভাবে যাচাই করা হয়েছে
                    </p>
                  ) : (
                    <div className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        আপনার ব্যক্তিগত তথ্য যাচাই করতে প্রোফাইল সম্পূর্ণ করুন
                      </p>
                      <Button variant="outline" className="gap-2">
                        <UserCircle className="h-4 w-4" />
                        প্রোফাইল আপডেট করুন
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Step 2: NID Verification */}
            <div className={`p-4 border rounded-lg ${kycStatus.idVerification ? 'bg-green-50 border-green-200' : 'bg-secondary/10'}`}>
              <div className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${kycStatus.idVerification ? 'bg-green-100' : 'bg-secondary/20'}`}>
                  {kycStatus.idVerification ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Shield className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">NID/পাসপোর্ট যাচাইকরণ</h3>
                    {kycStatus.idVerification ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">সম্পূর্ণ</Badge>
                    ) : kycStatus.personalInfo ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">বাকি আছে</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-secondary/20">লকড</Badge>
                    )}
                  </div>
                  
                  {kycStatus.idVerification ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      আপনার পরিচয়পত্র সফলভাবে যাচাই করা হয়েছে
                    </p>
                  ) : kycStatus.personalInfo ? (
                    <div className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        আপনার NID বা পাসপোর্টের স্ক্যান কপি আপলোড করুন
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                          <FileInput className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">NID (সামনে)</p>
                          <p className="text-xs text-muted-foreground mt-1">ছবি বা PDF আপলোড করুন</p>
                          <Button variant="outline" size="sm" className="mt-3 gap-2">
                            <UploadCloud className="h-4 w-4" />
                            ফাইল নির্বাচন করুন
                          </Button>
                        </div>
                        
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                          <FileInput className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">NID (পিছনে)</p>
                          <p className="text-xs text-muted-foreground mt-1">ছবি বা PDF আপলোড করুন</p>
                          <Button variant="outline" size="sm" className="mt-3 gap-2">
                            <UploadCloud className="h-4 w-4" />
                            ফাইল নির্বাচন করুন
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full gap-2"
                        disabled={uploadingNid}
                        onClick={handleNidUpload}
                      >
                        {uploadingNid ? (
                          <>
                            <CircleDashed className="h-4 w-4 animate-spin" />
                            আপলোড হচ্ছে...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            আপলোড ও যাচাই করুন
                          </>
                        )}
                      </Button>
                      
                      <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-800 text-sm rounded-md">
                        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p>
                          আপনার ডকুমেন্টগুলো সুরক্ষিত এবং এনক্রিপ্টেড থাকবে। এগুলো শুধুমাত্র যাচাইয়ের উদ্দেশ্যে ব্যবহার করা হবে।
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <FileLock2 className="h-4 w-4" />
                      <span>প্রোফাইল তথ্য সম্পূর্ণ করার পরে এই ধাপ আনলক হবে</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Step 3: Mobile Verification */}
            <div className={`p-4 border rounded-lg ${kycStatus.mobileVerification ? 'bg-green-50 border-green-200' : 'bg-secondary/10'}`}>
              <div className="flex items-start gap-4">
                <div className={`rounded-full p-2 ${kycStatus.mobileVerification ? 'bg-green-100' : 'bg-secondary/20'}`}>
                  {kycStatus.mobileVerification ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">মোবাইল ভেরিফিকেশন</h3>
                    {kycStatus.mobileVerification ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">সম্পূর্ণ</Badge>
                    ) : kycStatus.personalInfo ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">বাকি আছে</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-secondary/20">লকড</Badge>
                    )}
                  </div>
                  
                  {kycStatus.mobileVerification ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      আপনার মোবাইল নম্বর সফলভাবে যাচাই করা হয়েছে
                    </p>
                  ) : kycStatus.personalInfo ? (
                    <div className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        মোবাইল নম্বর যাচাই করতে আপনার ফোনে একটি OTP কোড পাঠানো হবে
                      </p>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="phone">মোবাইল নম্বর</Label>
                          <div className="flex gap-2">
                            <Input id="phone" placeholder="01XXX-XXXXXX" />
                            <Button 
                              variant="outline" 
                              disabled={verifyingPhone}
                              onClick={handleVerifyPhone}
                            >
                              {verifyingPhone ? 'পাঠানো হচ্ছে...' : 'OTP পাঠান'}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="otp">OTP কোড</Label>
                          <div className="flex gap-2">
                            <Input 
                              id="otp" 
                              placeholder="6-ডিজিট কোড লিখুন" 
                              value={otp}
                              onChange={e => setOtp(e.target.value)}
                            />
                            <Button 
                              onClick={handleVerifyOtp}
                              disabled={verifyingPhone || otp.length !== 6}
                            >
                              {verifyingPhone ? 'যাচাই হচ্ছে...' : 'যাচাই করুন'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <FileLock2 className="h-4 w-4" />
                      <span>প্রোফাইল তথ্য সম্পূর্ণ করার পরে এই ধাপ আনলক হবে</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {kycStatus.isComplete ? (
            <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <div className="rounded-full p-2 bg-green-100">
                <FileCheck2 className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">KYC ভেরিফিকেশন সম্পন্ন</h3>
                <p className="text-sm text-muted-foreground">
                  আপনার KYC ভেরিফিকেশন সম্পন্ন হয়েছে। আপনি এখন উপার্জন উত্তোলন করতে পারেন।
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-3">
              <div className="rounded-full p-2 bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">KYC ভেরিফিকেশন বাকি আছে</h3>
                <p className="text-sm text-muted-foreground">
                  উপার্জন উত্তোলন করতে অনুগ্রহ করে KYC ভেরিফিকেশন সম্পূর্ণ করুন।
                </p>
              </div>
            </div>
          )}
          
          <div className="w-full p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
            <div className="rounded-full p-2 bg-blue-100">
              <FileWarning className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">টাইমলাইন</h3>
              <p className="text-sm text-muted-foreground">
                KYC যাচাইকরণ সাধারণত ১-৩ কার্যদিবসে সম্পন্ন হয়।
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default KycTab;
