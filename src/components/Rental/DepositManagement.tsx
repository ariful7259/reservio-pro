
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, ArrowDownLeft, ArrowUpRight, CheckCircle2, HelpCircle, Info, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DepositManagementProps {
  rentalItemValue?: number;
}

const DepositManagement: React.FC<DepositManagementProps> = ({
  rentalItemValue = 25000
}) => {
  const { toast } = useToast();
  const [depositType, setDepositType] = useState<'fixed' | 'percentage'>('fixed');
  const [depositAmount, setDepositAmount] = useState<number>(2000);
  const [depositPercentage, setDepositPercentage] = useState<number>(20);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  
  const calculateRecommendedDeposit = () => {
    switch(riskLevel) {
      case 'low':
        return Math.round(rentalItemValue * 0.1);
      case 'medium':
        return Math.round(rentalItemValue * 0.2);
      case 'high':
        return Math.round(rentalItemValue * 0.3);
      default:
        return Math.round(rentalItemValue * 0.2);
    }
  };
  
  const handleFixedDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDepositAmount(isNaN(value) ? 0 : value);
  };
  
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setDepositPercentage(isNaN(value) ? 0 : Math.min(100, value));
  };
  
  const calculateFinalDeposit = () => {
    if (depositType === 'fixed') {
      return depositAmount;
    } else {
      return Math.round((depositPercentage / 100) * rentalItemValue);
    }
  };
  
  const handleSaveDepositSettings = () => {
    toast({
      title: "ডিপোজিট সেটিংস আপডেট হয়েছে",
      description: `আপনার ডিপোজিট সেটিংস সফলভাবে আপডেট করা হয়েছে।`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          সিকিউরিটি ডিপোজিট ম্যানেজমেন্ট
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  সিকিউরিটি ডিপোজিট হল একটি অর্থের পরিমাণ যা রেন্টাল সময়কালে আইটেমের নিরাপত্তা নিশ্চিত করে। ভাড়াটে আইটেম ফেরত দেওয়ার পরে এটি ফেরত দেওয়া হয়।
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>আইটেম ভ্যালু</Label>
            <span className="font-medium">৳{rentalItemValue.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            রিস্ক লেভেল
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>আপনার আইটেমের ধরন ও মূল্য অনুসারে রিস্ক নির্ধারণ করুন</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <RadioGroup 
            className="grid grid-cols-3 gap-4"
            defaultValue={riskLevel}
            onValueChange={(value) => setRiskLevel(value as 'low' | 'medium' | 'high')}
          >
            <div>
              <RadioGroupItem value="low" id="risk-low" className="peer sr-only" />
              <Label
                htmlFor="risk-low"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <ShieldCheck className="h-6 w-6 mb-2 text-green-500" />
                <span className="font-medium">লো রিস্ক</span>
                <span className="text-xs text-muted-foreground mt-1">কম মূল্যের আইটেম</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="medium" id="risk-medium" className="peer sr-only" />
              <Label
                htmlFor="risk-medium"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Shield className="h-6 w-6 mb-2 text-amber-500" />
                <span className="font-medium">মিডিয়াম রিস্ক</span>
                <span className="text-xs text-muted-foreground mt-1">মাঝারি মূল্যের আইটেম</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="high" id="risk-high" className="peer sr-only" />
              <Label
                htmlFor="risk-high"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <ShieldAlert className="h-6 w-6 mb-2 text-red-500" />
                <span className="font-medium">হাই রিস্ক</span>
                <span className="text-xs text-muted-foreground mt-1">উচ্চ মূল্যের আইটেম</span>
              </Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">
            রেকমেন্ডেড ডিপোজিট: <span className="font-medium">৳{calculateRecommendedDeposit().toLocaleString()}</span> (আইটেম ভ্যালুর {riskLevel === 'low' ? '১০%' : riskLevel === 'medium' ? '২০%' : '৩০%'})
          </p>
        </div>
        
        <Tabs defaultValue="fixed" onValueChange={(v) => setDepositType(v as 'fixed' | 'percentage')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fixed">ফিক্সড এমাউন্ট</TabsTrigger>
            <TabsTrigger value="percentage">পারসেন্টেজ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="fixed" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-amount">ডিপোজিট এমাউন্ট (৳)</Label>
              <Input 
                id="deposit-amount" 
                type="number" 
                value={depositAmount} 
                onChange={handleFixedDepositChange} 
              />
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-md">
              <span>ফাইনাল ডিপোজিট</span>
              <span className="font-bold text-xl">৳{depositAmount.toLocaleString()}</span>
            </div>
          </TabsContent>
          
          <TabsContent value="percentage" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="deposit-percentage">ডিপোজিট (আইটেম ভ্যালুর %)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="deposit-percentage" 
                  type="number" 
                  value={depositPercentage} 
                  onChange={handlePercentageChange} 
                  className="w-full"
                />
                <span className="text-lg font-bold">%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-muted rounded-md">
              <span>ফাইনাল ডিপোজিট</span>
              <span className="font-bold text-xl">৳{Math.round((depositPercentage / 100) * rentalItemValue).toLocaleString()}</span>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-blue-700 flex items-center gap-2 mb-2">
            <Info className="h-4 w-4" /> ডিপোজিট নীতিমালা
          </h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc pl-4">
            <li>ডিপোজিট রেন্টাল শেষে ফেরত দেওয়া হবে (সাধারণত ৭ দিনের মধ্যে)</li>
            <li>আইটেমে ক্ষতি হলে ডিপোজিট থেকে মেরামত খরচ কাটা হবে</li>
            <li>রেন্টাল আইটেম হারিয়ে গেলে বা অকার্যকর হয়ে গেলে সম্পূর্ণ ডিপোজিট কাটা যেতে পারে</li>
          </ul>
        </div>
        
        <Button onClick={handleSaveDepositSettings} className="w-full">
          ডিপোজিট সেটিংস সেভ করুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default DepositManagement;
