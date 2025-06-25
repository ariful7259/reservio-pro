
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  CheckCircle, 
  Upload, 
  FileText,
  CreditCard,
  Users,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const BecomeSeller = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requirements');
  const [applicationData, setApplicationData] = useState({
    businessName: '',
    businessType: '',
    description: '',
    experience: '',
    nidNumber: '',
    tradeLicense: '',
    bankAccount: ''
  });

  const requirements = [
    {
      title: 'ব্যবসায়িক তথ্য',
      description: 'আপনার ব্যবসার নাম, ধরন এবং বিবরণ প্রদান করুন',
      icon: <Store className="h-5 w-5" />,
      completed: false
    },
    {
      title: 'পরিচয় যাচাইকরণ',
      description: 'জাতীয় পরিচয়পত্র এবং ব্যাংক অ্যাকাউন্ট তথ্য',
      icon: <Shield className="h-5 w-5" />,
      completed: false
    },
    {
      title: 'প্রয়োজনীয় ডকুমেন্ট',
      description: 'ট্রেড লাইসেন্স এবং অন্যান্য প্রয়োজনীয় কাগজপত্র',
      icon: <FileText className="h-5 w-5" />,
      completed: false
    }
  ];

  const benefits = [
    {
      title: 'বিনামূল্যে দোকান',
      description: 'আপনার নিজস্ব অনলাইন দোকান খুলুন',
      icon: <Store className="h-5 w-5 text-blue-600" />
    },
    {
      title: 'লক্ষ লক্ষ কাস্টমার',
      description: 'বিশাল কাস্টমার বেসে পৌঁছান',
      icon: <Users className="h-5 w-5 text-green-600" />
    },
    {
      title: 'বিক্রয় বৃদ্ধি',
      description: 'আপনার বিক্রয় ও আয় বাড়ান',
      icon: <TrendingUp className="h-5 w-5 text-purple-600" />
    },
    {
      title: 'নিরাপদ পেমেন্ট',
      description: '১০০% নিরাপদ ও দ্রুত পেমেন্ট',
      icon: <CreditCard className="h-5 w-5 text-orange-600" />
    }
  ];

  const handleSubmitApplication = () => {
    toast({
      title: "আবেদন জমা দেওয়া হয়েছে",
      description: "আপনার সেলার আবেদন পর্যালোচনার জন্য জমা দেওয়া হয়েছে। ২৪ ঘন্টার মধ্যে জানিয়ে দেওয়া হবে।"
    });
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Store className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold">সেলার হয়ে যান</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            আমাদের প্ল্যাটফর্মে বিক্রেতা হয়ে আপনার ব্যবসা বাড়ান এবং লক্ষ লক্ষ কাস্টমারের কাছে পৌঁছান
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requirements">প্রয়োজনীয়তা</TabsTrigger>
            <TabsTrigger value="benefits">সুবিধাসমূহ</TabsTrigger>
            <TabsTrigger value="application">আবেদন</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>সেলার হওয়ার জন্য প্রয়োজনীয়তা</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requirements.map((req, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {req.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{req.title}</h4>
                        <p className="text-sm text-muted-foreground">{req.description}</p>
                      </div>
                      <div>
                        {req.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="application" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>সেলার আবেদন ফর্ম</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">ব্যবসার নাম</Label>
                    <Input
                      id="businessName"
                      value={applicationData.businessName}
                      onChange={(e) => setApplicationData({...applicationData, businessName: e.target.value})}
                      placeholder="আপনার ব্যবসার নাম লিখুন"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">ব্যবসার ধরন</Label>
                    <Input
                      id="businessType"
                      value={applicationData.businessType}
                      onChange={(e) => setApplicationData({...applicationData, businessType: e.target.value})}
                      placeholder="যেমন: খুচরা বিক্রয়, পাইকারি বিক্রয়"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nidNumber">জাতীয় পরিচয়পত্র নম্বর</Label>
                    <Input
                      id="nidNumber"
                      value={applicationData.nidNumber}
                      onChange={(e) => setApplicationData({...applicationData, nidNumber: e.target.value})}
                      placeholder="NID নম্বর"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tradeLicense">ট্রেড লাইসেন্স নম্বর</Label>
                    <Input
                      id="tradeLicense"
                      value={applicationData.tradeLicense}
                      onChange={(e) => setApplicationData({...applicationData, tradeLicense: e.target.value})}
                      placeholder="ট্রেড লাইসেন্স নম্বর (যদি থাকে)"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">ব্যবসার বিবরণ</Label>
                  <Textarea
                    id="description"
                    value={applicationData.description}
                    onChange={(e) => setApplicationData({...applicationData, description: e.target.value})}
                    placeholder="আপনার ব্যবসা সম্পর্কে বিস্তারিত লিখুন"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">অভিজ্ঞতা</Label>
                  <Textarea
                    id="experience"
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                    placeholder="আপনার ব্যবসায়িক অভিজ্ঞতা সম্পর্কে লিখুন"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>প্রয়োজনীয় ডকুমেন্ট আপলোড করুন</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      এখানে ক্লিক করে ফাইল আপলোড করুন
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, JPG, PNG (সর্বোচ্চ ৫ MB)
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={handleSubmitApplication}
                  className="w-full"
                  size="lg"
                >
                  আবেদন জমা দিন
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BecomeSeller;
