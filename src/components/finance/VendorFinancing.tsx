
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Banknote, TrendingUp, ShieldCheck, Clock, 
  FileText, Calculator, User, Phone, Building2,
  CheckCircle, AlertCircle, DollarSign
} from 'lucide-react';

interface LoanOption {
  id: string;
  type: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  tenure: string;
  processingTime: string;
  requirements: string[];
  benefits: string[];
}

interface ApplicationData {
  businessName: string;
  ownerName: string;
  phone: string;
  nid: string;
  businessType: string;
  monthlyIncome: string;
  loanAmount: string;
  purpose: string;
}

const VendorFinancing = () => {
  const { toast } = useToast();
  const [selectedLoan, setSelectedLoan] = useState<string>('');
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    businessName: '',
    ownerName: '',
    phone: '',
    nid: '',
    businessType: '',
    monthlyIncome: '',
    loanAmount: '',
    purpose: ''
  });

  const loanOptions: LoanOption[] = [
    {
      id: 'micro_business',
      type: 'ক্ষুদ্র ব্যবসা',
      name: 'মাইক্রো বিজনেস লোন',
      minAmount: 10000,
      maxAmount: 200000,
      interestRate: 12,
      tenure: '৬-১৮ মাস',
      processingTime: '৪৮ ঘন্টা',
      requirements: ['এনআইডি কার্ড', 'ব্যাংক স্টেটমেন্ট', 'ব্যবসার প্রমাণ'],
      benefits: ['দ্রুত অনুমোদন', 'কোলেটারেল ফ্রি', 'ফ্লেক্সিবল রিপেমেন্ট']
    },
    {
      id: 'vendor_advance',
      type: 'সাপ্লাইয়ার',
      name: 'ভেন্ডর অ্যাডভান্স',
      minAmount: 25000,
      maxAmount: 500000,
      interestRate: 15,
      tenure: '৩-১২ মাস',
      processingTime: '২৪ ঘন্টা',
      requirements: ['ট্রেড লাইসেন্স', 'গত ৬ মাসের সেলস রেকর্ড', 'রেফারেন্স'],
      benefits: ['তাৎক্ষণিক ক্যাশ ফ্লো', 'অর্ডার ভিত্তিক', 'নো হিডেন চার্জ']
    },
    {
      id: 'equipment_finance',
      type: 'যন্ত্রপাতি',
      name: 'ইকুপমেন্ট ফাইন্যান্স',
      minAmount: 50000,
      maxAmount: 1000000,
      interestRate: 18,
      tenure: '১২-৩৬ মাস',
      processingTime: '৭২ ঘন্টা',
      requirements: ['বিজনেস রেজিস্ট্রেশন', 'ইনকাম সার্টিফিকেট', 'ইকুপমেন্ট কোটেশন'],
      benefits: ['যন্ত্রপাতি কেনার জন্য', 'কম সুদের হার', '৩ বছর পর্যন্ত']
    }
  ];

  const handleLoanSelect = (loanId: string) => {
    setSelectedLoan(loanId);
    const loan = loanOptions.find(l => l.id === loanId);
    if (loan) {
      setApplicationData(prev => ({ ...prev, loanAmount: loan.minAmount.toString() }));
    }
  };

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setApplicationData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (applicationStep < 3) {
      setApplicationStep(applicationStep + 1);
    }
  };

  const handleSubmitApplication = () => {
    toast({
      title: "আবেদন জমা হয়েছে",
      description: "আপনার লোন আবেদন সফলভাবে জমা হয়েছে। ২৪ ঘন্টার মধ্যে আপডেট পাবেন।",
    });
    setApplicationStep(1);
  };

  const selectedLoanData = loanOptions.find(l => l.id === selectedLoan);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-green-600" />
            ভেন্ডর ফাইন্যান্সিং ও মাইক্রোলোন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="loans" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="loans">লোন অপশন</TabsTrigger>
              <TabsTrigger value="apply">আবেদন করুন</TabsTrigger>
              <TabsTrigger value="status">স্ট্যাটাস চেক</TabsTrigger>
            </TabsList>

            <TabsContent value="loans" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loanOptions.map((loan) => (
                  <Card 
                    key={loan.id}
                    className={`cursor-pointer transition-all ${
                      selectedLoan === loan.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                    }`}
                    onClick={() => handleLoanSelect(loan.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{loan.type}</Badge>
                          {selectedLoan === loan.id && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-lg">{loan.name}</h3>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>পরিমাণ:</span>
                            <span className="font-medium">৳{loan.minAmount.toLocaleString()} - ৳{loan.maxAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>সুদের হার:</span>
                            <span className="font-medium">{loan.interestRate}% বার্ষিক</span>
                          </div>
                          <div className="flex justify-between">
                            <span>মেয়াদ:</span>
                            <span className="font-medium">{loan.tenure}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>প্রসেসিং সময়:</span>
                            <span className="font-medium text-green-600">{loan.processingTime}</span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium mb-1">প্রয়োজনীয় কাগজপত্র:</p>
                          <ul className="text-xs space-y-1">
                            {loan.requirements.slice(0, 2).map((req, index) => (
                              <li key={index} className="flex items-center gap-1">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {req}
                              </li>
                            ))}
                            {loan.requirements.length > 2 && (
                              <li className="text-muted-foreground">+{loan.requirements.length - 2} আরো</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedLoanData && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">{selectedLoanData.name} এর সুবিধাসমূহ</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedLoanData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="apply" className="space-y-4">
              {!selectedLoan ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">প্রথমে একটি লোন অপশন নির্বাচন করুন</h3>
                    <p className="text-muted-foreground mb-4">
                      আবেদন করার আগে 'লোন অপশন' ট্যাব থেকে আপনার পছন্দের লোন নির্বাচন করুন
                    </p>
                    <Button onClick={() => {
                      const tabsList = document.querySelector('[data-state="active"][value="apply"]')?.parentElement;
                      const loansTab = tabsList?.querySelector('[value="loans"]') as HTMLElement;
                      loansTab?.click();
                    }}>
                      লোন নির্বাচন করুন
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      লোন আবেদন ফর্ম
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Progress value={(applicationStep / 3) * 100} className="flex-1" />
                      <span className="text-sm text-muted-foreground">ধাপ {applicationStep}/৩</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {applicationStep === 1 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">ব্যক্তিগত তথ্য</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="ownerName">মালিকের নাম *</Label>
                            <Input
                              id="ownerName"
                              value={applicationData.ownerName}
                              onChange={(e) => handleInputChange('ownerName', e.target.value)}
                              placeholder="পূর্ণ নাম লিখুন"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                            <Input
                              id="phone"
                              value={applicationData.phone}
                              onChange={(e) => handleInputChange('phone', e.target.value)}
                              placeholder="০১xxxxxxxxx"
                            />
                          </div>
                          <div>
                            <Label htmlFor="nid">এনআইডি নম্বর *</Label>
                            <Input
                              id="nid"
                              value={applicationData.nid}
                              onChange={(e) => handleInputChange('nid', e.target.value)}
                              placeholder="জাতীয় পরিচয়পত্র নম্বর"
                            />
                          </div>
                          <div>
                            <Label htmlFor="businessName">ব্যবসার নাম *</Label>
                            <Input
                              id="businessName"
                              value={applicationData.businessName}
                              onChange={(e) => handleInputChange('businessName', e.target.value)}
                              placeholder="ব্যবসার নাম"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {applicationStep === 2 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">ব্যবসায়িক তথ্য</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="businessType">ব্যবসার ধরন *</Label>
                            <Input
                              id="businessType"
                              value={applicationData.businessType}
                              onChange={(e) => handleInputChange('businessType', e.target.value)}
                              placeholder="যেমন: খুচরা, পাইকারি, সেবা"
                            />
                          </div>
                          <div>
                            <Label htmlFor="monthlyIncome">মাসিক আয় *</Label>
                            <Input
                              id="monthlyIncome"
                              value={applicationData.monthlyIncome}
                              onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                              placeholder="টাকায় পরিমাণ"
                            />
                          </div>
                          <div>
                            <Label htmlFor="loanAmount">ঋণের পরিমাণ *</Label>
                            <Input
                              id="loanAmount"
                              value={applicationData.loanAmount}
                              onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                              placeholder={`৳${selectedLoanData?.minAmount} - ৳${selectedLoanData?.maxAmount}`}
                            />
                          </div>
                          <div>
                            <Label htmlFor="purpose">ঋণের উদ্দেশ্য *</Label>
                            <Input
                              id="purpose"
                              value={applicationData.purpose}
                              onChange={(e) => handleInputChange('purpose', e.target.value)}
                              placeholder="যেমন: মালামাল কেনা, যন্ত্রপাতি"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {applicationStep === 3 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold">আবেদন পর্যালোচনা</h4>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>নাম:</strong> {applicationData.ownerName}</div>
                            <div><strong>ফোন:</strong> {applicationData.phone}</div>
                            <div><strong>ব্যবসা:</strong> {applicationData.businessName}</div>
                            <div><strong>ধরন:</strong> {applicationData.businessType}</div>
                            <div><strong>মাসিক আয়:</strong> ৳{applicationData.monthlyIncome}</div>
                            <div><strong>ঋণের পরিমাণ:</strong> ৳{applicationData.loanAmount}</div>
                          </div>
                          <div><strong>উদ্দেশ্য:</strong> {applicationData.purpose}</div>
                        </div>
                        
                        {selectedLoanData && (
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h5 className="font-medium mb-2">নির্বাচিত লোন: {selectedLoanData.name}</h5>
                            <div className="text-sm space-y-1">
                              <div>সুদের হার: {selectedLoanData.interestRate}% বার্ষিক</div>
                              <div>মেয়াদ: {selectedLoanData.tenure}</div>
                              <div>প্রসেসিং সময়: {selectedLoanData.processingTime}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex justify-between pt-4">
                      {applicationStep > 1 && (
                        <Button 
                          variant="outline" 
                          onClick={() => setApplicationStep(applicationStep - 1)}
                        >
                          পূর্ববর্তী
                        </Button>
                      )}
                      
                      {applicationStep < 3 ? (
                        <Button onClick={handleNextStep} className="ml-auto">
                          পরবর্তী
                        </Button>
                      ) : (
                        <Button onClick={handleSubmitApplication} className="ml-auto">
                          <FileText className="h-4 w-4 mr-2" />
                          আবেদন জমা দিন
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="status" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    আবেদনের স্ট্যাটাস
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Input 
                        placeholder="আবেদন নম্বর বা মোবাইল নম্বর দিন"
                        className="flex-1"
                      />
                      <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        চেক করুন
                      </Button>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">নমুনা স্ট্যাটাস</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">আবেদন গৃহীত</div>
                            <div className="text-sm text-muted-foreground">২৫ নভেম্বর, ২০২৪</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">ডকুমেন্ট ভেরিফিকেশন সম্পন্ন</div>
                            <div className="text-sm text-muted-foreground">২৬ নভেম্বর, ২০২৪</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">ক্রেডিট মূল্যায়ন চলমান</div>
                            <div className="text-sm text-muted-foreground">প্রক্রিয়াধীন</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorFinancing;
