
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield,
  CheckCircle,
  Upload,
  FileText,
  User,
  CreditCard,
  AlertTriangle,
  Camera,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KYCVerification = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [verificationProgress, setVerificationProgress] = useState(45);

  const verificationSteps = [
    {
      id: 'personal',
      title: 'ব্যক্তিগত তথ্য',
      description: 'নাম, ঠিকানা এবং যোগাযোগের তথ্য',
      status: 'completed',
      icon: <User className="h-5 w-5" />
    },
    {
      id: 'identity',
      title: 'পরিচয় যাচাইকরণ',
      description: 'জাতীয় পরিচয়পত্র বা পাসপোর্ট',
      status: 'pending',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'address',
      title: 'ঠিকানা যাচাইকরণ',
      description: 'ইউটিলিটি বিল বা ব্যাংক স্টেটমেন্ট',
      status: 'not_started',
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: 'financial',
      title: 'আর্থিক তথ্য',
      description: 'ব্যাংক অ্যাকাউন্ট যাচাইকরণ',
      status: 'not_started',
      icon: <CreditCard className="h-5 w-5" />
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>;
      case 'not_started':
        return <Badge variant="outline">শুরু হয়নি</Badge>;
      default:
        return <Badge variant="outline">অজানা</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'not_started':
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleUploadDocument = () => {
    toast({
      title: "ডকুমেন্ট আপলোড",
      description: "আপনার ডকুমেন্ট সফলভাবে আপলোড হয়েছে এবং পর্যালোচনার জন্য পাঠানো হয়েছে"
    });
    setVerificationProgress(75);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">KYC যাচাইকরণ ও নিরাপত্তা</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে এবং সকল সুবিধা ব্যবহার করতে যাচাইকরণ সম্পন্ন করুন
          </p>
        </div>

        {/* Progress Card */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">যাচাইকরণের অগ্রগতি</h3>
                <span className="text-sm text-muted-foreground">{verificationProgress}% সম্পন্ন</span>
              </div>
              <Progress value={verificationProgress} className="h-2" />
              <p className="text-sm text-muted-foreground">
                আপনার যাচাইকরণ প্রায় সম্পন্ন! আরও কয়েকটি ধাপ বাকি আছে।
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">সংক্ষিপ্ত</TabsTrigger>
            <TabsTrigger value="verification">যাচাইকরণ</TabsTrigger>
            <TabsTrigger value="security">নিরাপত্তা</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4">
              {verificationSteps.map((step) => (
                <Card key={step.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(step.status)}
                        {getStatusBadge(step.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>পরিচয় যাচাইকরণ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nid">জাতীয় পরিচয়পত্র নম্বর</Label>
                    <Input id="nid" placeholder="NID নম্বর লিখুন" />
                  </div>
                  <div>
                    <Label htmlFor="passport">পাসপোর্ট নম্বর (ঐচ্ছিক)</Label>
                    <Input id="passport" placeholder="পাসপোর্ট নম্বর" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">ডকুমেন্ট আপলোড করুন</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium">NID এর সামনের অংশ</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG (সর্বোচ্চ ৫ MB)</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        আপলোড করুন
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium">NID এর পিছনের অংশ</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG (সর্বোচ্চ ৫ MB)</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Upload className="h-4 w-4 mr-2" />
                        আপলোড করুন
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleUploadDocument} className="w-full">
                  যাচাইকরণের জন্য জমা দিন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ঠিকানা যাচাইকরণ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  নিচের যেকোনো একটি ডকুমেন্ট আপলোড করুন যাতে আপনার নাম ও ঠিকানা স্পষ্ট দেখা যায়:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• ইউটিলিটি বিল (বিদ্যুৎ, গ্যাস, পানি)</li>
                  <li>• ব্যাংক স্টেটমেন্ট</li>
                  <li>• টেলিফোন বিল</li>
                  <li>• সরকারি চিঠিপত্র</li>
                </ul>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm">ঠিকানার প্রমাণপত্র আপলোড করুন</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    ফাইল নির্বাচন করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>নিরাপত্তা সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">টু-ফ্যাক্টর অথেনটিকেশন</h4>
                      <p className="text-sm text-muted-foreground">অতিরিক্ত নিরাপত্তার জন্য 2FA সক্রিয় করুন</p>
                    </div>
                    <Button variant="outline">সেটআপ করুন</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">পাসওয়ার্ড পরিবর্তন</h4>
                      <p className="text-sm text-muted-foreground">নিয়মিত পাসওয়ার্ড পরিবর্তন করুন</p>
                    </div>
                    <Button variant="outline">পরিবর্তন করুন</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">লগইন ইতিহাস</h4>
                      <p className="text-sm text-muted-foreground">আপনার সাম্প্রতিক লগইন কার্যকলাপ দেখুন</p>
                    </div>
                    <Button variant="outline">দেখুন</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">ডিভাইস ম্যানেজমেন্ট</h4>
                      <p className="text-sm text-muted-foreground">সংযুক্ত ডিভাইসগুলি পরিচালনা করুন</p>
                    </div>
                    <Button variant="outline">পরিচালনা করুন</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KYCVerification;
