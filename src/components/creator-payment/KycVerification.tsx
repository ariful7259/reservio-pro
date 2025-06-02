
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User,
  Camera,
  FileText,
  Home,
  CreditCard
} from 'lucide-react';

const KycVerification = () => {
  const { toast } = useToast();
  const [kycData] = useState({
    overall: {
      status: 'partial',
      completionPercentage: 60,
      withdrawalLimit: 50000,
      fullLimit: 500000
    },
    steps: [
      {
        id: 'personal_info',
        title: 'ব্যক্তিগত তথ্য',
        description: 'নাম, জন্ম তারিখ, ফোন নম্বর',
        status: 'completed',
        icon: User,
        required: true
      },
      {
        id: 'nid_verification',
        title: 'জাতীয় পরিচয়পত্র',
        description: 'NID/Birth Certificate আপলোড',
        status: 'completed',
        icon: CreditCard,
        required: true
      },
      {
        id: 'address_verification',
        title: 'ঠিকানা যাচাইকরণ',
        description: 'ইউটিলিটি বিল বা ব্যাংক স্টেটমেন্ট',
        status: 'pending',
        icon: Home,
        required: true
      },
      {
        id: 'face_verification',
        title: 'মুখ যাচাইকরণ',
        description: 'লাইভ সেলফি এবং NID এর সাথে মিল',
        status: 'pending',
        icon: Camera,
        required: true
      },
      {
        id: 'business_info',
        title: 'ব্যবসায়িক তথ্য',
        description: 'ব্যবসার ধরন এবং অভিজ্ঞতা',
        status: 'completed',
        icon: FileText,
        required: false
      }
    ]
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">প্রত্যাখ্যাত</Badge>;
      case 'reviewing':
        return <Badge className="bg-blue-100 text-blue-800">পর্যালোচনায়</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getStatusIcon = (status: string, IconComponent: any) => {
    const baseClasses = "h-5 w-5";
    switch (status) {
      case 'completed':
        return <CheckCircle2 className={`${baseClasses} text-green-600`} />;
      case 'pending':
        return <Clock className={`${baseClasses} text-yellow-600`} />;
      case 'rejected':
        return <AlertTriangle className={`${baseClasses} text-red-600`} />;
      case 'reviewing':
        return <Clock className={`${baseClasses} text-blue-600`} />;
      default:
        return <IconComponent className={`${baseClasses} text-gray-600`} />;
    }
  };

  const handleStartVerification = (stepId: string) => {
    toast({
      title: "ভেরিফিকেশন শুরু",
      description: `${stepId} এর জন্য ভেরিফিকেশন প্রক্রিয়া শুরু হচ্ছে`,
    });
  };

  const handleUploadDocument = (stepId: string) => {
    toast({
      title: "ডকুমেন্ট আপলোড",
      description: "ডকুমেন্ট আপলোড করার ব্যবস্থা শীঘ্রই যোগ করা হবে",
    });
  };

  const completedSteps = kycData.steps.filter(step => step.status === 'completed').length;
  const totalSteps = kycData.steps.filter(step => step.required).length;

  return (
    <div className="space-y-6">
      {/* KYC Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            KYC ভেরিফিকেশন স্ট্যাটাস
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">সম্পূর্ণতা</span>
            <span className="text-sm font-medium">{kycData.overall.completionPercentage}%</span>
          </div>
          <Progress value={kycData.overall.completionPercentage} className="h-2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-1">বর্তমান সীমা</h4>
              <p className="text-2xl font-bold text-blue-600">৳{kycData.overall.withdrawalLimit.toLocaleString()}</p>
              <p className="text-sm text-blue-600">দৈনিক উত্তোলন সীমা</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-1">সম্পূর্ণ ভেরিফিকেশনের পর</h4>
              <p className="text-2xl font-bold text-green-600">৳{kycData.overall.fullLimit.toLocaleString()}</p>
              <p className="text-sm text-green-600">দৈনিক উত্তোলন সীমা</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KYC Steps */}
      <Card>
        <CardHeader>
          <CardTitle>ভেরিফিকেশন ধাপসমূহ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {kycData.steps.map((step, index) => (
              <div key={step.id} className="border rounded-lg p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      {getStatusIcon(step.status, step.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{step.title}</h4>
                        {step.required && (
                          <Badge variant="outline" className="text-xs">আবশ্যক</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(step.status)}
                    {step.status === 'pending' && (
                      <Button 
                        size="sm"
                        onClick={() => handleStartVerification(step.id)}
                      >
                        {step.id === 'face_verification' ? 'সেলফি নিন' : 'আপলোড করুন'}
                      </Button>
                    )}
                    {step.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        সম্পন্ন
                      </Button>
                    )}
                  </div>
                </div>

                {/* Step specific instructions */}
                {step.status === 'pending' && (
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <h5 className="font-medium text-yellow-800 mb-2">প্রয়োজনীয় নির্দেশনা:</h5>
                    {step.id === 'address_verification' && (
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• ইউটিলিটি বিল (বিদ্যুৎ/গ্যাস/পানি) - ৩ মাসের মধ্যে</li>
                        <li>• ব্যাংক স্টেটমেন্ট - ৩ মাসের মধ্যে</li>
                        <li>• সরকারি ঠিকানার প্রমাণপত্র</li>
                      </ul>
                    )}
                    {step.id === 'face_verification' && (
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• ভালো আলোতে সেলফি নিন</li>
                        <li>• NID এর ছবির সাথে মুখ স্পষ্ট দেখা যেতে হবে</li>
                        <li>• চশম বা মাস্ক পরবেন না</li>
                        <li>• সরাসরি ক্যামেরার দিকে তাকান</li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            ডকুমেন্ট প্রয়োজনীয়তা
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">গ্রহণযোগ্য পরিচয়পত্র:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>জাতীয় পরিচয়পত্র (NID)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>জন্ম নিবন্ধন সনদ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>পাসপোর্ট</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>ড্রাইভিং লাইসেন্স</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">ছবির গুণমান:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>স্পষ্ট এবং পড়ার যোগ্য</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>সব কোণ দৃশ্যমান</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>কোনো কাটাছেঁড়া নেই</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <span>সর্বোচ্চ ৫MB আকার</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>ভেরিফিকেশনের সুবিধা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-700">সম্পূর্ণ ভেরিফিকেশনের পর:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>উচ্চ উত্তোলন সীমা (৳৫,০০,০০০)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>দ্রুত পেমেন্ট প্রসেসিং</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>ভেরিফাইড ব্যাজ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span>প্রিমিয়াম সাপোর্ট</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-blue-700">বিশেষ সুবিধা:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>বর্ধিত নিরাপত্তা</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>ফ্রড প্রোটেকশন</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>অগ্রাধিকার ভিত্তিক সাপোর্ট</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>এক্সক্লুসিভ ফিচার এক্সেস</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KycVerification;
