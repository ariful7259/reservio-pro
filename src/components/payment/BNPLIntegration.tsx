
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, Calendar, Percent, Shield, 
  CheckCircle, Clock, AlertTriangle, Calculator
} from 'lucide-react';

interface BNPLOption {
  id: string;
  provider: string;
  name: string;
  installments: number;
  interestRate: number;
  processingFee: number;
  minAmount: number;
  maxAmount: number;
  approvalTime: string;
  features: string[];
}

const BNPLIntegration = () => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [amount, setAmount] = useState<number>(5000);
  const [installmentPlan, setInstallmentPlan] = useState<BNPLOption | null>(null);

  const bnplProviders: BNPLOption[] = [
    {
      id: 'easy_loan',
      provider: 'EasyLoan BD',
      name: 'তাৎক্ষণিক কিস্তি',
      installments: 3,
      interestRate: 0,
      processingFee: 50,
      minAmount: 2000,
      maxAmount: 50000,
      approvalTime: '২ মিনিট',
      features: ['০% সুদ', 'তাৎক্ষণিক অনুমোদন', 'কোনো গ্যারান্টর লাগবে না']
    },
    {
      id: 'flexi_pay',
      provider: 'FlexiPay',
      name: 'ফ্লেক্সি পেমেন্ট',
      installments: 6,
      interestRate: 8,
      processingFee: 100,
      minAmount: 5000,
      maxAmount: 100000,
      approvalTime: '৫ মিনিট',
      features: ['৬ মাস পর্যন্ত কিস্তি', 'কম সুদের হার', 'ফ্লেক্সিবল পেমেন্ট']
    },
    {
      id: 'smart_credit',
      provider: 'SmartCredit',
      name: 'স্মার্ট ক্রেডিট',
      installments: 12,
      interestRate: 12,
      processingFee: 200,
      minAmount: 10000,
      maxAmount: 200000,
      approvalTime: '১০ মিনিট',
      features: ['১২ মাস পর্যন্ত', 'বড় অঙ্কের জন্য', 'ক্রেডিট স্কোর বিল্ডিং']
    }
  ];

  const calculateInstallment = (option: BNPLOption, totalAmount: number) => {
    const principal = totalAmount + option.processingFee;
    const monthlyInterest = option.interestRate / 100 / 12;
    const installmentAmount = monthlyInterest > 0 
      ? (principal * monthlyInterest * Math.pow(1 + monthlyInterest, option.installments)) / 
        (Math.pow(1 + monthlyInterest, option.installments) - 1)
      : principal / option.installments;
    
    return Math.round(installmentAmount);
  };

  const handleSelectOption = (option: BNPLOption) => {
    setSelectedOption(option.id);
    setInstallmentPlan(option);
  };

  const handleApplyBNPL = () => {
    if (!installmentPlan) return;
    
    toast({
      title: "BNPL আবেদন জমা হয়েছে",
      description: `${installmentPlan.provider} এর মাধ্যমে আপনার আবেদন প্রক্রিয়াধীন`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-600" />
            কিনুন এখন, পরে পরিশোধ করুন (BNPL)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">সেবার মূল্য (টাকা)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="যেমন: ৫০০০"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bnplProviders.map((option) => {
                const canUse = amount >= option.minAmount && amount <= option.maxAmount;
                const installmentAmount = canUse ? calculateInstallment(option, amount) : 0;
                
                return (
                  <Card 
                    key={option.id} 
                    className={`cursor-pointer transition-all ${
                      selectedOption === option.id 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : canUse ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canUse && handleSelectOption(option)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{option.name}</h3>
                          {selectedOption === option.id && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          {option.provider}
                        </div>
                        
                        {canUse ? (
                          <div className="space-y-2">
                            <div className="text-lg font-bold text-green-600">
                              ৳{installmentAmount}/মাস
                            </div>
                            <div className="text-sm">
                              {option.installments} কিস্তিতে
                            </div>
                          </div>
                        ) : (
                          <div className="text-sm text-red-600">
                            সর্বনিম্ন ৳{option.minAmount} - সর্বোচ্চ ৳{option.maxAmount}
                          </div>
                        )}
                        
                        <div className="space-y-1">
                          {option.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>অনুমোদন: {option.approvalTime}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {installmentPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              কিস্তির বিবরণ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-2">পেমেন্ট প্ল্যান</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>মূল অর্থ:</span>
                      <span>৳{amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>প্রসেসিং ফি:</span>
                      <span>৳{installmentPlan.processingFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>সুদের হার:</span>
                      <span>{installmentPlan.interestRate}% বার্ষিক</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>মোট পরিশোধ:</span>
                      <span>৳{amount + installmentPlan.processingFee + (amount * installmentPlan.interestRate / 100)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold mb-2">মাসিক কিস্তি</h4>
                  <div className="text-2xl font-bold text-green-600">
                    ৳{calculateInstallment(installmentPlan, amount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {installmentPlan.installments} মাসের জন্য
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">কিস্তির সময়সূচী</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {Array.from({ length: installmentPlan.installments }, (_, i) => {
                      const date = new Date();
                      date.setMonth(date.getMonth() + i + 1);
                      return (
                        <div key={i} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                          <span>কিস্তি {i + 1}</span>
                          <span>{date.toLocaleDateString('bn-BD')}</span>
                          <span>৳{calculateInstallment(installmentPlan, amount)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>১০০% নিরাপদ ও সুরক্ষিত</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Calendar className="h-4 w-4" />
                    <span>স্বয়ংক্রিয় পেমেন্ট রিমাইন্ডার</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-600">
                    <Percent className="h-4 w-4" />
                    <span>কোনো লুকানো চার্জ নেই</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <Button onClick={handleApplyBNPL} className="w-full" size="lg">
                <CreditCard className="h-4 w-4 mr-2" />
                BNPL এর জন্য আবেদন করুন
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-2">
                আবেদনের পর {installmentPlan.approvalTime} এর মধ্যে অনুমোদন পাবেন
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BNPLIntegration;
