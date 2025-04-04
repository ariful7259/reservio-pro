
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  CreditCard, 
  Loader2, 
  Smartphone, 
  Wallet as WalletIcon 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export interface PaymentMethodSelectorProps {
  amount: number;
  onComplete: (paymentData: {
    method: string;
    transactionId?: string;
    cardDetails?: {
      number: string;
      expiry: string;
      cvc: string;
      name: string;
    };
  }) => void;
  processingFee?: number;
  allowedMethods?: ('bkash' | 'nagad' | 'rocket' | 'card' | 'cash')[];
  title?: string;
  description?: string;
}

// Validation schema for mobile banking
const mobileSchema = z.object({
  phone: z.string().min(11, "ফোন নাম্বার ১১ ডিজিট হতে হবে").max(11, "ফোন নাম্বার ১১ ডিজিট হতে হবে"),
  transactionId: z.string().min(6, "লেনদেনের আইডি কমপক্ষে ৬ অক্ষর হতে হবে"),
});

// Validation schema for card payment
const cardSchema = z.object({
  cardNumber: z.string().min(16, "কার্ড নাম্বার ১৬ ডিজিট হতে হবে").max(19, "কার্ড নাম্বার সর্বাধিক ১৯ ডিজিট হতে পারে"),
  cardExpiry: z.string().min(5, "মেয়াদ MM/YY আকারে দিন").max(5, "মেয়াদ MM/YY আকারে দিন"),
  cardCvc: z.string().min(3, "CVC কমপক্ষে ৩ ডিজিট হতে হবে").max(4, "CVC সর্বাধিক ৪ ডিজিট হতে পারে"),
  cardName: z.string().min(3, "কার্ডহোল্ডারের নাম দিন"),
});

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  amount,
  onComplete,
  processingFee = 0,
  allowedMethods = ['bkash', 'nagad', 'rocket', 'card', 'cash'],
  title = "পেমেন্ট মেথড নির্বাচন করুন",
  description = "আপনার পছন্দের পেমেন্ট মাধ্যম বেছে নিন"
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>(allowedMethods[0] || 'bkash');
  const [paymentTab, setPaymentTab] = useState('mobile');
  const [selectedProvider, setSelectedProvider] = useState<string>(allowedMethods.includes('bkash') ? 'bkash' : allowedMethods[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  // Mobile payment form
  const mobileForm = useForm<z.infer<typeof mobileSchema>>({
    resolver: zodResolver(mobileSchema),
    defaultValues: {
      phone: "",
      transactionId: "",
    },
  });
  
  // Card payment form
  const cardForm = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      cardName: "",
    },
  });
  
  const totalAmount = amount + processingFee;
  
  // Handle form submission for mobile payment
  const handleMobileSubmit = async (values: z.infer<typeof mobileSchema>) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "পেমেন্ট সফল!",
        description: "আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।",
      });
      
      onComplete({
        method: selectedProvider,
        transactionId: values.transactionId,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "পেমেন্ট ব্যর্থ!",
        description: "পেমেন্ট প্রসেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle form submission for card payment
  const handleCardSubmit = async (values: z.infer<typeof cardSchema>) => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "পেমেন্ট সফল!",
        description: "আপনার কার্ড পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।",
      });
      
      onComplete({
        method: 'card',
        cardDetails: {
          number: values.cardNumber,
          expiry: values.cardExpiry,
          cvc: values.cardCvc,
          name: values.cardName
        }
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "পেমেন্ট ব্যর্থ!",
        description: "কার্ড পেমেন্ট প্রসেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle cash payment
  const handleCashPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "বুকিং সফল!",
        description: "আপনার বুকিং সফল হয়েছে। নগদ অর্থ প্রদান করুন।",
      });
      
      onComplete({
        method: 'cash',
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "বুকিং ব্যর্থ!",
        description: "বুকিং করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Get mobile payment information
  const getMobilePaymentInfo = (provider: string) => {
    switch (provider) {
      case 'bkash':
        return {
          name: 'বিকাশ',
          number: '01712345678',
          logo: 'https://raw.githubusercontent.com/mir-hussain/payment-icons/main/Icons/bkash.png',
          color: 'bg-pink-500',
        };
      case 'nagad':
        return {
          name: 'নগদ',
          number: '01712345678',
          logo: 'https://raw.githubusercontent.com/mir-hussain/payment-icons/main/Icons/nagad.png',
          color: 'bg-orange-500',
        };
      case 'rocket':
        return {
          name: 'রকেট',
          number: '01712345678',
          logo: 'https://raw.githubusercontent.com/mir-hussain/payment-icons/main/Icons/rocket.png',
          color: 'bg-purple-500',
        };
      default:
        return {
          name: 'বিকাশ',
          number: '01712345678',
          logo: 'https://raw.githubusercontent.com/mir-hussain/payment-icons/main/Icons/bkash.png',
          color: 'bg-pink-500',
        };
    }
  };
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .match(/.{1,4}/g)
      ?.join(' ')
      .substring(0, 19) || '';
  };
  
  // Format card expiry
  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .match(/(\d{1,2})(\d{0,2})/)
      ?.slice(1)
      .filter(Boolean)
      .join('/')
      .substring(0, 5) || '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={paymentTab} 
          onValueChange={setPaymentTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" /> মোবাইল ব্যাংকিং
            </TabsTrigger>
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> কার্ড
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="mobile" className="space-y-4 pt-4">
            <RadioGroup 
              defaultValue={selectedProvider}
              value={selectedProvider}
              onValueChange={setSelectedProvider}
              className="grid grid-cols-3 gap-2"
            >
              {allowedMethods.includes('bkash') && (
                <div className="flex">
                  <RadioGroupItem 
                    value="bkash" 
                    id="bkash" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="bkash"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <img
                      src="https://raw.githubusercontent.com/mir-hussain/payment-icons/main/Icons/bkash.png"
                      alt="bKash"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="mt-2 text-xs font-medium">বিকাশ</span>
                  </Label>
                </div>
              )}
              
              {allowedMethods.includes('nagad') && (
                <div className="flex">
                  <RadioGroupItem 
                    value="nagad" 
                    id="nagad" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="nagad"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <img
                      src="https://raw.githubusercontent.com/mir-hussain/payment-icons/main/Icons/nagad.png"
                      alt="Nagad"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="mt-2 text-xs font-medium">নগদ</span>
                  </Label>
                </div>
              )}
              
              {allowedMethods.includes('rocket') && (
                <div className="flex">
                  <RadioGroupItem 
                    value="rocket" 
                    id="rocket" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="rocket"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <img
                      src="https://raw.githubusercontent.com/mir-hussain/payment-icons/main/Icons/rocket.png"
                      alt="Rocket"
                      className="h-8 w-8 object-contain"
                    />
                    <span className="mt-2 text-xs font-medium">রকেট</span>
                  </Label>
                </div>
              )}
              
              {allowedMethods.includes('cash') && paymentTab === 'mobile' && (
                <div className="flex">
                  <RadioGroupItem 
                    value="cash" 
                    id="cash" 
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor="cash"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <WalletIcon className="h-8 w-8" />
                    <span className="mt-2 text-xs font-medium">ক্যাশ</span>
                  </Label>
                </div>
              )}
            </RadioGroup>
            
            {selectedProvider !== 'cash' && (
              <div className="rounded-md border p-4 mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={getMobilePaymentInfo(selectedProvider).logo}
                    alt={getMobilePaymentInfo(selectedProvider).name}
                    className="h-8 w-8"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {getMobilePaymentInfo(selectedProvider).name} অ্যাকাউন্ট নাম্বার
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {getMobilePaymentInfo(selectedProvider).number}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <ol className="list-decimal pl-5 space-y-1">
                    <li className="text-sm">
                      আপনার {getMobilePaymentInfo(selectedProvider).name} অ্যাপ ওপেন করুন
                    </li>
                    <li className="text-sm">
                      "সেন্ড মানি" অপশনে ক্লিক করুন
                    </li>
                    <li className="text-sm">
                      {getMobilePaymentInfo(selectedProvider).number} এই নাম্বারে ৳{totalAmount} পাঠান
                    </li>
                    <li className="text-sm">
                      ট্রানজেকশন আইডি কপি করে নিচে দিন
                    </li>
                  </ol>
                </div>
                
                <Form {...mobileForm}>
                  <form onSubmit={mobileForm.handleSubmit(handleMobileSubmit)} className="space-y-4 mt-4">
                    <FormField
                      control={mobileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>আপনার ফোন নাম্বার</FormLabel>
                          <FormControl>
                            <Input placeholder="01XXXXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={mobileForm.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ট্রানজেকশন আইডি</FormLabel>
                          <FormControl>
                            <Input placeholder="ট্রানজেকশন আইডি দিন" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রসেসিং
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" /> পেমেন্ট কনফার্ম করুন
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
            
            {selectedProvider === 'cash' && (
              <div className="rounded-md border p-4 mt-4">
                <div className="flex items-center gap-3">
                  <WalletIcon className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">
                      ক্যাশ পেমেন্ট
                    </p>
                    <p className="text-sm mt-1">
                      সার্ভিস গ্রহণের সময় নগদ অর্থ প্রদান করুন
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCashPayment} 
                  className="w-full mt-4" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রসেসিং
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> বুকিং কনফার্ম করুন
                    </>
                  )}
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="card" className="space-y-4 pt-4">
            {allowedMethods.includes('card') ? (
              <Form {...cardForm}>
                <form onSubmit={cardForm.handleSubmit(handleCardSubmit)} className="space-y-4">
                  <div className="rounded-md border p-4 bg-muted/30">
                    <div className="space-y-2">
                      <FormField
                        control={cardForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>কার্ড নাম্বার</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="1234 5678 9012 3456" 
                                {...field}
                                value={formatCardNumber(field.value)}
                                onChange={(e) => {
                                  const formatted = formatCardNumber(e.target.value);
                                  field.onChange(formatted);
                                }}
                                autoComplete="cc-number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={cardForm.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>মেয়াদ (MM/YY)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="MM/YY" 
                                  {...field}
                                  value={formatExpiry(field.value)}
                                  onChange={(e) => {
                                    const formatted = formatExpiry(e.target.value);
                                    field.onChange(formatted);
                                  }}
                                  autoComplete="cc-exp"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cardForm.control}
                          name="cardCvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC/CVV</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="123" 
                                  type="password" 
                                  maxLength={4} 
                                  {...field}
                                  autoComplete="cc-csc"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={cardForm.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>কার্ডহোল্ডারের নাম</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="নাম যেভাবে কার্ডে আছে" 
                                {...field}
                                autoComplete="cc-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <div className="flex gap-2 items-center">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        আপনার কার্ড তথ্য সুরক্ষিত এবং এনক্রিপ্টেড
                      </span>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> প্রসেসিং
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="mr-2 h-4 w-4" /> পেমেন্ট কনফার্ম করুন
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                কার্ড পেমেন্ট সাময়িকভাবে বন্ধ আছে। অনুগ্রহ করে অন্য পেমেন্ট মাধ্যম বেছে নিন।
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div className="flex justify-between items-center py-1">
            <span className="text-sm">মূল পরিমাণ</span>
            <span className="font-medium">৳{amount}</span>
          </div>
          {processingFee > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-sm">প্রসেসিং ফি</span>
              <span>৳{processingFee}</span>
            </div>
          )}
          <div className="border-t mt-2 pt-2 flex justify-between items-center">
            <span className="font-medium">মোট</span>
            <span className="font-bold text-lg">৳{totalAmount}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodSelector;
