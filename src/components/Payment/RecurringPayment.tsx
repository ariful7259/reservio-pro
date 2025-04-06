
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  CalendarRange, 
  CheckCircle2, 
  CreditCard, 
  Loader2, 
  RefreshCw, 
  ShieldCheck 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface RecurringPaymentProps {
  title: string;
  description?: string;
  prices: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  onSubscribe: (plan: string, interval: 'monthly' | 'quarterly' | 'yearly') => void;
  isProcessing?: boolean;
}

const RecurringPayment: React.FC<RecurringPaymentProps> = ({
  title,
  description,
  prices,
  onSubscribe,
  isProcessing = false
}) => {
  const { toast } = useToast();
  const [selectedInterval, setSelectedInterval] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [plan, setPlan] = useState<'basic' | 'standard' | 'premium'>('standard');
  
  const getPlanPrice = (planType: 'basic' | 'standard' | 'premium') => {
    const multiplier = planType === 'basic' ? 0.5 : planType === 'premium' ? 2 : 1;
    return Math.round(prices[selectedInterval] * multiplier);
  };
  
  const getDiscountPercentage = () => {
    if (selectedInterval === 'quarterly') return 10;
    if (selectedInterval === 'yearly') return 20;
    return 0;
  };
  
  const handlePayment = () => {
    onSubscribe(plan, selectedInterval);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-base">বিলিং ইন্টারভাল</Label>
          <RadioGroup
            value={selectedInterval}
            onValueChange={(v) => setSelectedInterval(v as 'monthly' | 'quarterly' | 'yearly')}
            className="grid grid-cols-3 gap-4 mt-2"
          >
            <div>
              <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
              <Label
                htmlFor="monthly"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center"
              >
                <span className="font-medium">মাসিক</span>
                <span className="text-2xl font-bold mt-1">৳{prices.monthly}</span>
                <span className="text-xs text-muted-foreground mt-1">প্রতি মাস</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="quarterly" id="quarterly" className="peer sr-only" />
              <Label
                htmlFor="quarterly"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center relative"
              >
                {selectedInterval === 'quarterly' && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500">১০% ছাড়</Badge>
                )}
                <span className="font-medium">ত্রৈমাসিক</span>
                <span className="text-2xl font-bold mt-1">৳{prices.quarterly}</span>
                <span className="text-xs text-muted-foreground mt-1">প্রতি ৩ মাস</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
              <Label
                htmlFor="yearly"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-center relative"
              >
                {selectedInterval === 'yearly' && (
                  <Badge className="absolute -top-2 -right-2 bg-green-500">২০% ছাড়</Badge>
                )}
                <span className="font-medium">বার্ষিক</span>
                <span className="text-2xl font-bold mt-1">৳{prices.yearly}</span>
                <span className="text-xs text-muted-foreground mt-1">প্রতি বছর</span>
              </Label>
            </div>
          </RadioGroup>
          
          {getDiscountPercentage() > 0 && (
            <p className="text-sm text-center text-green-600 mt-2">
              {selectedInterval === 'quarterly' ? 'ত্রৈমাসিক' : 'বার্ষিক'} প্ল্যানে {getDiscountPercentage()}% ডিসকাউন্ট পেয়েছেন!
            </p>
          )}
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-base">সাবস্ক্রিপশন প্ল্যান</Label>
          <Tabs 
            defaultValue="standard" 
            value={plan} 
            onValueChange={(v) => setPlan(v as 'basic' | 'standard' | 'premium')} 
            className="w-full mt-2"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">বেসিক</TabsTrigger>
              <TabsTrigger value="standard">স্ট্যান্ডার্ড</TabsTrigger>
              <TabsTrigger value="premium">প্রিমিয়াম</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold">বেসিক প্ল্যান</h3>
                    <p className="text-3xl font-bold mt-2">৳{getPlanPrice('basic')}<span className="text-sm font-normal text-muted-foreground">/{selectedInterval === 'monthly' ? 'মাস' : selectedInterval === 'quarterly' ? '৩ মাস' : 'বছর'}</span></p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>লিমিটেড ফিচার অ্যাকসেস</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>৫ GB স্টোরেজ</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>ইমেইল সাপোর্ট</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="standard" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold">স্ট্যান্ডার্ড প্ল্যান</h3>
                    <p className="text-3xl font-bold mt-2">৳{getPlanPrice('standard')}<span className="text-sm font-normal text-muted-foreground">/{selectedInterval === 'monthly' ? 'মাস' : selectedInterval === 'quarterly' ? '৩ মাস' : 'বছর'}</span></p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>সব ফিচার অ্যাকসেস</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>২০ GB স্টোরেজ</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>প্রায়োরিটি সাপোর্ট</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>এডভান্সড রিপোর্টিং</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="premium" className="mt-4 space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold">প্রিমিয়াম প্ল্যান</h3>
                    <p className="text-3xl font-bold mt-2">৳{getPlanPrice('premium')}<span className="text-sm font-normal text-muted-foreground">/{selectedInterval === 'monthly' ? 'মাস' : selectedInterval === 'quarterly' ? '৩ মাস' : 'বছর'}</span></p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>সব ফিচার অ্যাকসেস</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>আনলিমিটেড স্টোরেজ</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>২৪/৭ ডেডিকেটেড সাপোর্ট</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>এডভান্সড রিপোর্টিং</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>কাস্টম ব্র্যান্ডিং</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                      <span>API অ্যাকসেস</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="rounded-md border p-4 bg-muted/30 space-y-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">রিকারিং পেমেন্ট</p>
              <p className="text-sm text-muted-foreground">আপনার অ্যাকাউন্ট থেকে স্বয়ংক্রিয়ভাবে {selectedInterval === 'monthly' ? 'প্রতি মাসে' : selectedInterval === 'quarterly' ? 'প্রতি ৩ মাসে' : 'প্রতি বছরে'} কাটা হবে</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CalendarRange className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">যেকোনো সময় বাতিল</p>
              <p className="text-sm text-muted-foreground">আপনি যেকোনো সময় আপনার সাবস্ক্রিপশন বাতিল করতে পারেন</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">সিকিউর পেমেন্ট</p>
              <p className="text-sm text-muted-foreground">আপনার পেমেন্ট বিশ্বস্ত গেটওয়ের মাধ্যমে সুরক্ষিত</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রসেসিং
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" /> সাবস্ক্রাইব করুন
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecurringPayment;
