
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  CreditCard, 
  CheckCircle2, 
  Shield, 
  AlertTriangle, 
  Smartphone,
  Info,
  Loader2
} from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  onPaymentComplete?: (data: PaymentResultData) => void;
  onCancel?: () => void;
  allowedMethods?: Array<'card' | 'bkash' | 'nagad' | 'rocket'>;
  processingFee?: number;
  includeCallbacks?: boolean;
}

export interface PaymentResultData {
  transactionId: string;
  method: 'card' | 'bkash' | 'nagad' | 'rocket';
  amount: number;
  status: 'success' | 'failed' | 'canceled';
  date: Date;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  amount,
  onPaymentComplete,
  onCancel,
  allowedMethods = ['card', 'bkash', 'nagad', 'rocket'],
  processingFee = 0,
  includeCallbacks = true
}) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad' | 'rocket'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const totalAmount = amount + processingFee;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces after every 4 digits
    const input = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formattedInput = input.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formattedInput);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 2) {
      setCardExpiry(input);
    } else {
      setCardExpiry(`${input.substring(0, 2)}/${input.substring(2, 4)}`);
    }
  };

  const validateCardForm = () => {
    if (cardNumber.length < 19) {
      toast({
        title: "কার্ড নম্বর সঠিক নয়",
        description: "সম্পূর্ণ কার্ড নম্বর প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    if (!cardName) {
      toast({
        title: "কার্ডের নাম প্রদান করুন",
        description: "আপনার কার্ডের নাম প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    if (cardExpiry.length < 5) {
      toast({
        title: "মেয়াদ সঠিক নয়",
        description: "কার্ডের মেয়াদ MM/YY আকারে দিন",
        variant: "destructive",
      });
      return false;
    }
    if (cardCvv.length < 3) {
      toast({
        title: "CVV সঠিক নয়",
        description: "সঠিক CVV নম্বর প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const validateMobileForm = () => {
    if (mobileNumber.length < 11) {
      toast({
        title: "মোবাইল নম্বর সঠিক নয়",
        description: "সঠিক মোবাইল নম্বর প্রদান করুন",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (paymentMethod === 'card' && !validateCardForm()) return;
    if (['bkash', 'nagad', 'rocket'].includes(paymentMethod) && !validateMobileForm()) return;
    
    // Show OTP form for mobile payments
    if (['bkash', 'nagad', 'rocket'].includes(paymentMethod) && !showOtpForm) {
      setShowOtpForm(true);
      toast({
        title: "OTP পাঠানো হয়েছে",
        description: `আপনার নম্বরে (${mobileNumber}) একটি OTP পাঠানো হয়েছে।`,
      });
      return;
    }
    
    if (showOtpForm && otp.length !== 6) {
      toast({
        title: "OTP সঠিক নয়",
        description: "সঠিক ৬ ডিজিটের OTP প্রদান করুন",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStatus('success');
      
      // Generate random transaction ID
      const transactionId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      if (onPaymentComplete) {
        onPaymentComplete({
          transactionId,
          method: paymentMethod,
          amount: totalAmount,
          status: 'success',
          date: new Date(),
        });
      }
      
      toast({
        title: "পেমেন্ট সফল হয়েছে",
        description: `${totalAmount}৳ সফলভাবে পেমেন্ট করা হয়েছে।`,
      });
    }, 2000);
  };

  const getMobilePaymentFieldLabel = () => {
    switch (paymentMethod) {
      case 'bkash':
        return 'বিকাশ নম্বর';
      case 'nagad':
        return 'নগদ নম্বর';
      case 'rocket':
        return 'রকেট নম্বর';
      default:
        return 'মোবাইল নম্বর';
    }
  };
  
  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'card':
        return 'কার্ড';
      case 'bkash':
        return 'বিকাশ';
      case 'nagad':
        return 'নগদ';
      case 'rocket':
        return 'রকেট';
      default:
        return '';
    }
  };

  if (paymentStatus === 'success') {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">পেমেন্ট সফল!</h2>
          <p className="text-center text-muted-foreground mb-4">
            আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।
          </p>
          
          <div className="w-full bg-muted/30 p-4 rounded-md mb-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">পেমেন্ট মেথড:</div>
              <div className="font-medium">{getPaymentMethodName()}</div>
              
              <div className="text-muted-foreground">পরিমাণ:</div>
              <div className="font-medium">৳{totalAmount}</div>
              
              <div className="text-muted-foreground">তারিখ:</div>
              <div className="font-medium">{new Date().toLocaleDateString('bn-BD')}</div>
            </div>
          </div>
          
          {includeCallbacks && (
            <div className="flex justify-between w-full gap-2">
              <Button variant="outline" className="flex-1" onClick={onCancel}>
                বাতিল
              </Button>
              <Button 
                onClick={() => {
                  setPaymentStatus('idle');
                  setCardNumber('');
                  setCardName('');
                  setCardExpiry('');
                  setCardCvv('');
                  setMobileNumber('');
                  setOtp('');
                  setShowOtpForm(false);
                }}
                className="flex-1"
              >
                আরেকটি পেমেন্ট
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>পেমেন্ট</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">পরিমাণ</span>
            <span className="font-medium">৳{amount}</span>
          </div>
          
          {processingFee > 0 && (
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">প্রসেসিং ফি</span>
              <span className="font-medium">৳{processingFee}</span>
            </div>
          )}
          
          <Separator className="my-2" />
          
          <div className="flex justify-between">
            <span className="font-medium">মোট</span>
            <span className="font-bold">৳{totalAmount}</span>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2 mb-4">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium">সুরক্ষিত পেমেন্ট</p>
            <p>আপনার সকল তথ্য এনক্রিপ্টেড এবং নিরাপদ রাখা হয়</p>
          </div>
        </div>
        
        <Tabs value={paymentMethod} onValueChange={(v) => {
          setPaymentMethod(v as any);
          setShowOtpForm(false);
        }}>
          <TabsList className="w-full grid mb-4" style={{ gridTemplateColumns: `repeat(${allowedMethods.length}, 1fr)` }}>
            {allowedMethods.includes('card') && (
              <TabsTrigger value="card" className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                <span>কার্ড</span>
              </TabsTrigger>
            )}
            {allowedMethods.includes('bkash') && (
              <TabsTrigger value="bkash" className="flex items-center gap-1">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Bkash_logo.png" alt="bKash" className="h-4" />
                <span>বিকাশ</span>
              </TabsTrigger>
            )}
            {allowedMethods.includes('nagad') && (
              <TabsTrigger value="nagad" className="flex items-center gap-1">
                <img src="https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg" alt="Nagad" className="h-4" />
                <span>নগদ</span>
              </TabsTrigger>
            )}
            {allowedMethods.includes('rocket') && (
              <TabsTrigger value="rocket" className="flex items-center gap-1">
                <Smartphone className="h-4 w-4" />
                <span>রকেট</span>
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="card">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">কার্ড নম্বর</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="card-number" 
                    placeholder="0000 0000 0000 0000" 
                    className="pl-9"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    disabled={isProcessing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="card-name">কার্ডধারীর নাম</Label>
                <Input 
                  id="card-name" 
                  placeholder="আপনার নাম" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-expiry">মেয়াদ উত্তীর্ণ</Label>
                  <Input 
                    id="card-expiry" 
                    placeholder="MM/YY" 
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    disabled={isProcessing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input 
                    id="card-cvv" 
                    placeholder="000" 
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    disabled={isProcessing}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {['bkash', 'nagad', 'rocket'].map((method) => (
            <TabsContent key={method} value={method}>
              {!showOtpForm ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-number">{getMobilePaymentFieldLabel()}</Label>
                    <Input 
                      id="mobile-number" 
                      placeholder="01XXXXXXXXX" 
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').substring(0, 11))}
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="text-sm text-amber-700">
                      আপনার {
                        method === 'bkash' ? 'বিকাশ' : 
                        method === 'nagad' ? 'নগদ' : 'রকেট'
                      } নম্বর দিয়ে পেমেন্ট করুন
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{getMobilePaymentFieldLabel()}: {mobileNumber}</p>
                      <p className="text-sm text-muted-foreground">পেমেন্ট করার জন্য OTP প্রদান করুন</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input 
                      id="otp" 
                      placeholder="000000" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                      disabled={isProcessing}
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowOtpForm(false)}
                      disabled={isProcessing}
                    >
                      ফিরে যান
                    </Button>
                    <Button 
                      variant="outline"
                      disabled={isProcessing}
                    >
                      আবার OTP পাঠান
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex items-center gap-2 mt-5">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">PCI DSS Compliant</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button 
          className="w-full"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>প্রসেসিং...</span>
            </div>
          ) : (
            <span>৳{totalAmount} পেমেন্ট করুন</span>
          )}
        </Button>
        
        {includeCallbacks && (
          <Button 
            variant="ghost" 
            className="mt-2"
            onClick={onCancel}
            disabled={isProcessing}
          >
            বাতিল করুন
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PaymentGateway;
