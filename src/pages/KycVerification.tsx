import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  User,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const KycVerification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('status');

  const kycItems = [
    {
      id: 'personal',
      title: 'ব্যক্তিগত তথ্য',
      description: 'নাম, জন্ম তারিখ, এবং যোগাযোগের তথ্য',
      icon: User,
      status: 'completed',
      iconColor: 'bg-green-100 text-green-600'
    },
    {
      id: 'nid',
      title: 'NID যাচাইকরণ',
      description: 'জাতীয় পরিচয়পত্রের তথ্য যাচাইকরণ',
      icon: CreditCard,
      status: 'pending',
      iconColor: 'bg-amber-100 text-amber-600'
    },
    {
      id: 'address',
      title: 'ঠিকানা যাচাইকরণ',
      description: 'বর্তমান ঠিকানার প্রমাণ আপলোড করুন',
      icon: Upload,
      status: 'incomplete',
      iconColor: 'bg-red-100 text-red-600'
    },
    {
      id: 'selfie',
      title: 'সেলফি ভেরিফিকেশন',
      description: 'NID-এর সাথে মিলিয়ে সেলফি যাচাই',
      icon: Upload,
      status: 'incomplete',
      iconColor: 'bg-red-100 text-red-600'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-600 border-0">সম্পূর্ণ</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-600 border-0">প্রক্রিয়াধীন</Badge>;
      case 'incomplete':
        return <Badge className="bg-red-100 text-red-600 border-0">অসম্পূর্ণ</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-600" />;
      case 'incomplete':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const handleCompleteKyc = () => {
    toast({
      title: "KYC প্রক্রিয়া শুরু হয়েছে",
      description: "আপনার KYC প্রক্রিয়া সম্পূর্ণ করতে অনুগ্রহ করে প্রয়োজনীয় তথ্য প্রদান করুন",
    });
    setActiveTab('checklist');
  }

  // Checklist action function per step
  const handleChecklistAction = (stepId: string) => {
    switch (stepId) {
      case "personal":
        toast({
          title: "ব্যক্তিগত তথ্য",
          description: "আপনার ব্যক্তিগত তথ্য সম্পাদনার অপশন আসবে এখানে।",
        });
        // এখানে পরবর্তীতে Edit Personal Info Modal ইত্যাদি খুলতে পারেন
        break;
      case "nid":
        toast({
          title: "NID যাচাইকরণ",
          description: "এখানে NID আপলোড/যাচাই ফ্লো চালু হবে।",
        });
        // এখানে NID verification/Upload dialog/modal/functionality কল করুন
        break;
      case "address":
        toast({
          title: "ঠিকানা যাচাইকরণ",
          description: "ঠিকানার প্রমাণ আপলোডের ফিচার আসবে এখানে।",
        });
        // এখানে address verification/Upload functionality কল করা যাবে
        break;
      case "selfie":
        toast({
          title: "সেলফি ভেরিফিকেশন",
          description: "লাইভ ক্যামেরা বা সেলফি যাচাইকরণ ফিচার এখানে চাইল্ড করা যাবে।",
        });
        // এখানে selfie verification/camera modal/trigger যোগ করা যাবে
        break;
      default:
        toast({
          title: "অজানা ধাপ",
          description: "এই ধাপ নির্ধারিত নয়।",
        });
    }
    // চাইলে ন্যাভিগেশনও চালু রাখুন
    navigate(`/kyc-verification/${stepId}`);
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
        <h1 className="text-xl font-semibold">KYC ভেরিফিকেশন</h1>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="status">KYC স্ট্যাটাস</TabsTrigger>
          <TabsTrigger value="checklist">KYC চেকলিস্ট</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <Card className="border">
            <CardContent className="p-5">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">KYC সম্পূর্ণতা</h3>
                  <span className="text-sm font-medium">৫০%</span>
                </div>
                <Progress value={50} className="h-2 mb-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">আরও ২টি ধাপ বাকি আছে</span>
                  <span className="text-amber-600">পেন্ডিং</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">আপনার KYC প্রক্রিয়া সম্পূর্ণ করতে বাকি স্টেপগুলো শেষ করুন</p>
              <Button variant="default" className="w-full" onClick={handleCompleteKyc}>
                KYC সম্পূর্ণ করুন
              </Button>
            </CardContent>
          </Card>

          <Card className="border">
            <CardHeader>
              <CardTitle className="text-lg">KYC ভেরিফিকেশন</CardTitle>
              <CardDescription>আপনার পরিচয় যাচাই করতে KYC সম্পূর্ণ করুন</CardDescription>
            </CardHeader>
            <CardContent className="px-5">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">KYC অনুমোদন</p>
                      <p className="text-sm text-muted-foreground">আপনার পরিচয় যাচাই হচ্ছে</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-600 border-0">পেন্ডিং</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card className="border">
            <CardHeader>
              <CardTitle className="text-lg">KYC চেকলিস্ট</CardTitle>
              <CardDescription>KYC সম্পূর্ণ করতে নিম্নলিখিত পদক্ষেপগুলি অনুসরণ করুন</CardDescription>
            </CardHeader>
            <CardContent className="px-5">
              <div className="space-y-4">
                {kycItems.map((item) => {
                  let buttonText = '';
                  let buttonVariant: "default" | "outline" | "ghost" = 'ghost';

                  if (item.status === 'incomplete') {
                    buttonText = 'শুরু করুন';
                    buttonVariant = 'default';
                  } else if (item.status === 'completed') {
                    buttonText = 'দেখুন';
                    buttonVariant = 'outline';
                  } else if (item.status === 'pending') {
                    buttonText = 'পেন্ডিং';
                    buttonVariant = 'outline';
                  }

                  return (
                    <div key={item.id} className="flex justify-between items-center p-4 rounded-lg border bg-white hover:bg-accent/50 transition">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full ${item.iconColor} flex items-center justify-center`}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
                        <Button
                          variant={buttonVariant}
                          size="sm"
                          className={`flex items-center gap-1 px-3 py-1 text-[15px] font-semibold rounded hover:scale-[1.06] transition-transform ${item.status === 'incomplete' ? 'bg-primary text-white' : ''}`}
                          onClick={() => handleChecklistAction(item.id)}
                        >
                          <span>
                            {buttonText}
                          </span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KycVerification;
