
import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Shield,
  Wallet,
  Lock,
  Copy,
  ArrowDown,
  FileText,
  AlertTriangle,
  HelpCircle,
  Phone,
  Mail,
  Calendar,
  UserCheck,
  CheckSquare,
  X,
  Loader2,
} from "lucide-react";
import { Steps } from "@/components/ui/steps";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface P2PPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentComplete?: () => void;
  item?: {
    id: string;
    title: string;
    price: number;
    priceUnit: string;
    owner: string;
  };
}

const P2PPaymentModal: React.FC<P2PPaymentModalProps> = ({
  open,
  onOpenChange,
  onPaymentComplete,
  item,
}) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [verificationMethod, setVerificationMethod] = useState<"phone" | "email" | null>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [disputeTab, setDisputeTab] = useState("submit");
  const { toast } = useToast();
  const { user } = useAuth();

  // মাল্টিফ্যাক্টর ভেরিফিকেশন লজিক
  const handleVerificationMethod = (method: "phone" | "email") => {
    setVerificationMethod(method);
    // সিমুলেট OTP পাঠানো
    toast({
      title: method === "phone" ? "ফোন নাম্বারে OTP পাঠানো হয়েছে" : "ইমেইলে OTP পাঠানো হয়েছে",
      description: "প্রদত্ত " + (method === "phone" ? "ফোন নাম্বার" : "ইমেইল") + " এ পাঠানো কোডটি ব্যবহার করুন",
    });
    setTimeout(() => {
      if (otpInputRef.current) {
        otpInputRef.current.focus();
      }
    }, 500);
  };

  const verifyOtp = () => {
    if (verificationCode.length < 4) {
      toast({
        title: "OTP কোড সঠিক নয়",
        description: "দয়া করে সঠিক OTP কোড প্রদান করুন",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // সিমুলেট ভেরিফিকেশন
    setTimeout(() => {
      setOtpVerified(true);
      setIsSubmitting(false);
      toast({
        title: "OTP ভেরিফিকেশন সফল",
        description: "আপনার " + (verificationMethod === "phone" ? "ফোন নাম্বার" : "ইমেইল") + " ভেরিফাই করা হয়েছে",
      });
    }, 1500);
  };

  // ডিসপিউট সাবমিশন লজিক
  const handleDisputeSubmit = () => {
    if (!disputeReason) {
      toast({
        title: "বিবাদের কারণ প্রয়োজন",
        description: "বিবাদের কারণ বিস্তারিতভাবে লিখুন",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    // সিমুলেট ডিসপিউট সাবমিশন
    setTimeout(() => {
      setIsSubmitting(false);
      setDisputeTab("status");
      toast({
        title: "বিবাদ সাবমিট করা হয়েছে",
        description: "আপনার বিবাদ সংক্রান্ত অভিযোগ সফলভাবে জমা হয়েছে। আপনার কেস নাম্বার: DS" + Math.floor(100000 + Math.random() * 900000),
      });
    }, 1500);
  };

  // ট্রানজেকশন হিস্টোরি
  const transactionMockData = [
    {
      date: "২৩ এপ্রিল, ২০২৫",
      status: "পেমেন্ট এসক্রোতে জমা",
      amount: item?.price || 0,
    },
    {
      date: "২৩ এপ্রিল, ২০২৫",
      status: "ট্রানজেকশন ভেরিফাইড",
      amount: 0,
    }
  ];

  const handleContinue = () => {
    if (step === 1) {
      if (!paymentMethod) {
        toast({
          title: "পেমেন্ট মেথড নির্বাচন করুন",
          description: "অগ্রসর হওয়ার জন্য একটি পেমেন্ট মেথড নির্বাচন করুন",
          variant: "destructive",
        });
        return;
      }
      
      if (!agreeToTerms) {
        toast({
          title: "শর্তাবলী মেনে নিন",
          description: "অগ্রসর হওয়ার জন্য শর্তাবলী মেনে নিতে হবে",
          variant: "destructive",
        });
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      if (!transactionId) {
        toast({
          title: "ট্রানজেকশন আইডি প্রয়োজন",
          description: "অনুগ্রহ করে আপনার পেমেন্টের ট্রানজেকশন আইডি দিন",
          variant: "destructive",
        });
        return;
      }
      
      if (!otpVerified) {
        toast({
          title: "OTP ভেরিফিকেশন প্রয়োজন",
          description: "পেমেন্ট নিশ্চিত করার জন্য OTP ভেরিফিকেশন সম্পূর্ণ করুন",
          variant: "destructive",
        });
        return;
      }
      
      setStep(3);
      // Simulate escrow confirmation
      setTimeout(() => {
        setStep(4);
      }, 2000);
    }
  };

  const handleComplete = () => {
    toast({
      title: "পেমেন্ট সম্পন্ন হয়েছে",
      description: "আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে",
      variant: "default",
    });
    onOpenChange(false);
    if (onPaymentComplete) {
      onPaymentComplete();
    }
    
    // Reset form
    setTimeout(() => {
      setStep(1);
      setPaymentMethod("");
      setTransactionId("");
      setVerificationCode("");
      setAgreeToTerms(false);
      setVerificationMethod(null);
      setOtpVerified(false);
      setDisputeReason("");
      setDisputeTab("submit");
    }, 500);
  };

  // ডিসপিউট কোড কপি করার ফাংশন
  const copyDisputeCode = () => {
    navigator.clipboard.writeText("DS" + Math.floor(100000 + Math.random() * 900000));
    toast({
      title: "কপি করা হয়েছে",
      description: "ডিসপিউট কোড ক্লিপবোর্ডে কপি করা হয়েছে",
    });
  };
  
  // মডাল বন্ধ হলে সবকিছু রিসেট
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setPaymentMethod("");
        setTransactionId("");
        setVerificationCode("");
        setAgreeToTerms(false);
        setVerificationMethod(null);
        setOtpVerified(false);
        setDisputeReason("");
        setDisputeTab("submit");
      }, 300);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>নিরাপদ P2P পেমেন্ট</DialogTitle>
          <DialogDescription>
            আমাদের এসক্রো সিস্টেমের মাধ্যমে আপনার পেমেন্ট সুরক্ষিত থাকবে
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Steps
            steps={[
              { id: "payment", label: "পেমেন্ট মেথড" },
              { id: "verification", label: "ভেরিফিকেশন" },
              { id: "escrow", label: "এসক্রো" },
              { id: "complete", label: "সম্পন্ন" },
            ]}
            currentStep={step}
          />

          {step === 1 && (
            <div className="space-y-4 mt-6">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">নিরাপদ এসক্রো পেমেন্ট</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      আপনার অর্থ তৃতীয় পক্ষের কাছে সংরক্ষিত থাকবে। সার্ভিস বা প্রোডাক্ট ডেলিভারি সম্পন্ন হওয়ার পরে বিক্রেতা পেমেন্ট পাবেন।
                    </p>
                  </div>
                </div>
              </div>

              {item && (
                <>
                  <div>
                    <h3 className="font-medium mb-1">বুকিং বিবরণ</h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4>{item.title}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">মূল্য:</span>
                        <span className="font-medium">
                          ৳ {item.price}/{item.priceUnit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">প্রদানকারী:</span>
                        <span>{item.owner}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">বুকিং আইডি:</span>
                        <span>BK{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      
                      {/* ট্রানজেকশন নিরাপত্তা ইনফো */}
                      <div className="mt-3 p-2 bg-green-50 rounded border border-green-100 text-xs">
                        <div className="flex items-center mb-1 text-green-800">
                          <Lock className="h-3 w-3 mr-1" />
                          <span className="font-medium">ট্রানজেকশন নিরাপত্তা</span>
                        </div>
                        <p className="text-green-700">
                          সকল লেনদেন এন্ড-টু-এন্ড এনক্রিপ্টেড এবং ব্যাকআপ সিস্টেম দ্বারা সুরক্ষিত
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">পেমেন্ট মেথড নির্বাচন করুন</h3>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="পেমেন্ট মেথড নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="bkash">বিকাশ</SelectItem>
                          <SelectItem value="nagad">নগদ</SelectItem>
                          <SelectItem value="rocket">রকেট</SelectItem>
                          <SelectItem value="bank">ব্যাংক ট্রান্সফার</SelectItem>
                          <SelectItem value="card">ক্রেডিট/ডেবিট কার্ড</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* শর্তাবলী অপশন যোগ করা হয়েছে */}
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(!!checked)} />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      আমি <span className="underline text-primary cursor-pointer">শর্তাবলী এবং নীতিমালা</span> মেনে নিচ্ছি
                    </label>
                  </div>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 mt-6">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">পেমেন্ট ভেরিফিকেশন</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      অনুগ্রহ করে নির্বাচিত পেমেন্ট মেথড দ্বারা পেমেন্ট করুন এবং ট্রানজেকশন আইডি দিন। আমরা পেমেন্ট ভেরিফাই করব।
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">পেমেন্ট মেথড:</span>
                  <Badge variant="outline" className="bg-white">
                    {paymentMethod === "bkash"
                      ? "বিকাশ"
                      : paymentMethod === "nagad"
                      ? "নগদ"
                      : paymentMethod === "rocket"
                      ? "রকেট"
                      : paymentMethod === "bank"
                      ? "ব্যাংক ট্রান্সফার"
                      : "ক্রেডিট/ডেবিট কার্ড"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">এমাউন্ট:</span>
                  <span className="font-medium">
                    ৳ {item?.price}
                  </span>
                </div>

                {(paymentMethod === "bkash" ||
                  paymentMethod === "nagad" ||
                  paymentMethod === "rocket") && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <p className="text-sm mb-1">
                      {paymentMethod === "bkash"
                        ? "বিকাশ"
                        : paymentMethod === "nagad"
                        ? "নগদ"
                        : "রকেট"} নম্বর: <span className="font-medium">01712345678</span>
                        <Button variant="ghost" size="sm" className="h-6 ml-2" onClick={() => {
                          navigator.clipboard.writeText("01712345678");
                          toast({
                            description: "নম্বর কপি করা হয়েছে",
                          });
                        }}>
                          <Copy className="h-3 w-3" />
                        </Button>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      * পেমেন্ট সম্পন্ন করার পর ট্রানজেকশন আইডি দিন
                    </p>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <p className="text-sm mb-1">ব্যাংক: <span className="font-medium">Dutch-Bangla Bank</span></p>
                    <p className="text-sm mb-1">অ্যাকাউন্ট নম্বর: <span className="font-medium">10012345678</span>
                      <Button variant="ghost" size="sm" className="h-6 ml-2" onClick={() => {
                        navigator.clipboard.writeText("10012345678");
                        toast({
                          description: "অ্যাকাউন্ট নম্বর কপি করা হয়েছে",
                        });
                      }}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      * ট্রান্সফার সম্পন্ন করার পর ট্রানজেকশন আইডি দিন
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">ট্রানজেকশন আইডি</h3>
                <Input 
                  placeholder="ট্রানজেকশন আইডি দিন"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)} 
                />
                <p className="text-xs text-muted-foreground">
                  * সঠিক ট্রানজেকশন আইডি দিন। ভুল তথ্য প্রদান করলে পেমেন্ট বাতিল হতে পারে।
                </p>
              </div>
              
              {/* মাল্টিফ্যাক্টর ভেরিফিকেশন সেকশন যোগ করা হয়েছে */}
              <div className="space-y-2 pt-2 border-t">
                <h3 className="font-medium">মাল্টিফ্যাক্টর ভেরিফিকেশন (MFV)</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  নিরাপত্তা নিশ্চিত করতে OTP ভেরিফিকেশন সম্পন্ন করুন
                </p>
                
                {!verificationMethod && !otpVerified ? (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1 py-1 h-auto"
                      onClick={() => handleVerificationMethod("phone")}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      ফোন OTP
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 py-1 h-auto"
                      onClick={() => handleVerificationMethod("email")}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      ইমেইল OTP
                    </Button>
                  </div>
                ) : otpVerified ? (
                  <div className="flex items-center gap-2 text-green-600 p-2 bg-green-50 rounded-md">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm font-medium">ভেরিফিকেশন সফল</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm">
                      {verificationMethod === "phone" 
                        ? `+880 ${user?.phone || "01712345678"}` 
                        : `${user?.email || "user@example.com"}`} 
                      <span className="text-xs text-muted-foreground ml-2">
                        এ পাঠানো {verificationMethod === "phone" ? "6-ডিজিটের" : "6-ডিজিটের"} কোড ব্যবহার করুন
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="OTP কোড দিন"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        maxLength={6}
                        ref={otpInputRef}
                        className="flex-1"
                      />
                      <Button 
                        onClick={verifyOtp}
                        disabled={verificationCode.length < 4 || isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "ভেরিফাই"
                        )}
                      </Button>
                    </div>
                    <div className="flex justify-between text-xs">
                      <button 
                        className="text-primary underline"
                        onClick={() => setVerificationMethod(null)}
                      >
                        মেথড পরিবর্তন
                      </button>
                      <button 
                        className="text-primary underline"
                        onClick={() => {
                          toast({
                            title: "নতুন OTP পাঠানো হয়েছে",
                            description: verificationMethod === "phone" 
                              ? "আপনার ফোন নাম্বারে নতুন OTP পাঠানো হয়েছে" 
                              : "আপনার ইমেইলে নতুন OTP পাঠানো হয়েছে",
                          });
                        }}
                      >
                        আবার পাঠান
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 mt-6">
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900">এসক্রো পেন্ডিং</h4>
                    <p className="text-xs text-purple-700 mt-1">
                      আপনার পেমেন্ট যাচাই করা হচ্ছে। এটি কয়েক মিনিট সময় নিতে পারে।
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 rounded-full border-4 border-t-purple-500 border-purple-200 animate-spin mb-4"></div>
                <h3 className="font-medium text-lg">পেমেন্ট যাচাই করা হচ্ছে</h3>
                <p className="text-sm text-muted-foreground mt-1">অনুগ্রহ করে অপেক্ষা করুন...</p>
                
                {/* যাচাইকরণ স্টেপস */}
                <div className="w-full max-w-xs mt-6 space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span>ট্রানজেকশন আইডি যাচাইকরণ</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span>অ্যাকাউন্ট ভেরিফিকেশন</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="h-4 w-4 rounded-full border-2 border-t-primary border-primary/30 animate-spin mr-2"></div>
                    <span>পেমেন্ট কনফার্মেশন</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <div className="h-4 w-4 rounded-full border border-muted-foreground mr-2"></div>
                    <span>এসক্রো সেটআপ</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 mt-6">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">এসক্রো সফল</h4>
                    <p className="text-xs text-green-700 mt-1">
                      আপনার পেমেন্ট এসক্রো অ্যাকাউন্টে সফলভাবে জমা হয়েছে। সার্ভিস গ্রহণের পর আপনি কনফার্ম করলে বিক্রেতা পেমেন্ট পাবেন।
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-medium text-lg">পেমেন্ট সফল</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে। ধন্যবাদ।
                </p>
                
                <div className="bg-gray-50 p-3 rounded-lg w-full mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">বুকিং আইডি:</span>
                    <span className="font-medium">BK{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-muted-foreground">ট্রানজেকশন আইডি:</span>
                    <span className="font-medium">{transactionId}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-muted-foreground">এসক্রো আইডি:</span>
                    <span className="font-medium">ESC{Math.floor(Math.random() * 1000000)}</span>
                  </div>
                </div>
                
                {/* ডিসপিউট রেজোলিউশন অপশন যোগ করা হয়েছে */}
                <div className="w-full mt-4">
                  <Tabs defaultValue="escrow" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="escrow">এসক্রো ডিটেইলস</TabsTrigger>
                      <TabsTrigger value="dispute">ডিসপিউট সেন্টার</TabsTrigger>
                    </TabsList>
                    <TabsContent value="escrow" className="space-y-4 mt-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-sm">
                        <h4 className="font-medium text-blue-800 mb-2">এসক্রো টাইমলাইন</h4>
                        {transactionMockData.map((tx, index) => (
                          <div key={index} className="flex items-start mb-2">
                            <div className="mr-2 mt-1">
                              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                              {index < transactionMockData.length - 1 && (
                                <div className="h-8 w-px bg-blue-200 ml-1.5"></div>
                              )}
                            </div>
                            <div>
                              <p className="text-blue-800">{tx.status}</p>
                              <div className="flex justify-between text-xs text-blue-600">
                                <span>{tx.date}</span>
                                {tx.amount > 0 && <span>৳ {tx.amount}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="flex items-start">
                          <div className="mr-2 mt-1">
                            <div className="h-3 w-3 rounded-full border border-dashed border-blue-500"></div>
                          </div>
                          <div>
                            <p className="text-blue-800">বিক্রেতাকে পেমেন্ট রিলিজ (পেন্ডিং)</p>
                            <p className="text-xs text-blue-600">
                              সার্ভিস গ্রহণের ৭২ ঘন্টার মধ্যে কনফার্ম করুন
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-100 p-3 rounded-lg">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="font-medium text-green-800">বায়ার সুরক্ষা</h4>
                        </div>
                        <ul className="pl-7 mt-2 space-y-1 list-disc text-sm text-green-700">
                          <li>সার্ভিস গ্রহণের আগে অর্থ প্রদান করা হয় না</li>
                          <li>৪৮ ঘন্টার দ্রুত ডিসপিউট সমাধান</li>
                          <li>১০০% মানি-ব্যাক গ্যারান্টি</li>
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="dispute" className="space-y-4 mt-4">
                      <Tabs value={disputeTab} onValueChange={setDisputeTab}>
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="submit">ডিসপিউট দাখিল</TabsTrigger>
                          <TabsTrigger value="status">স্ট্যাটাস</TabsTrigger>
                        </TabsList>
                        
                        {disputeTab === "submit" && (
                          <div className="space-y-4 mt-4">
                            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                                <div>
                                  <p className="text-sm text-amber-800">
                                    কোন সমস্যা হলে ডিসপিউট দাখিল করুন। আমাদের সাপোর্ট টিম ৪৮ ঘন্টার মধ্যে সমাধান করবে।
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="space-y-2">
                                <label htmlFor="disputeReason" className="text-sm font-medium">
                                  ডিসপিউটের কারণ
                                </label>
                                <textarea
                                  id="disputeReason"
                                  className="w-full min-h-[100px] p-2 rounded-md border border-input"
                                  placeholder="বিস্তারিতভাবে সমস্যা বর্ণনা করুন"
                                  value={disputeReason}
                                  onChange={(e) => setDisputeReason(e.target.value)}
                                ></textarea>
                              </div>
                              
                              <Button 
                                className="w-full" 
                                onClick={handleDisputeSubmit}
                                disabled={!disputeReason || isSubmitting}
                              >
                                {isSubmitting ? (
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                  <FileText className="h-4 w-4 mr-2" />
                                )}
                                ডিসপিউট জমা দিন
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {disputeTab === "status" && (
                          <div className="space-y-4 mt-4">
                            {disputeReason ? (
                              <div className="border rounded-lg overflow-hidden">
                                <div className="bg-blue-50 p-3 border-b">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                        সক্রিয়
                                      </Badge>
                                      <span className="ml-2 text-sm font-medium">ডিসপিউট কেস</span>
                                    </div>
                                    <div className="text-sm">
                                      কেস #DS{Math.floor(100000 + Math.random() * 900000)}
                                      <Button variant="ghost" size="sm" className="h-6 ml-1 p-0" onClick={copyDisputeCode}>
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="divide-y">
                                  <div className="p-3 flex justify-between">
                                    <span className="text-sm text-muted-foreground">স্টেটাস</span>
                                    <span className="text-sm font-medium">প্রসেসিং</span>
                                  </div>
                                  <div className="p-3 flex justify-between">
                                    <span className="text-sm text-muted-foreground">যোগাযোগ</span>
                                    <span className="text-sm font-medium">আপডেট পাঠানো হবে</span>
                                  </div>
                                  <div className="p-3 flex justify-between">
                                    <span className="text-sm text-muted-foreground">অনুমানিত সমাধান</span>
                                    <span className="text-sm font-medium">৪৮ ঘন্টা</span>
                                  </div>
                                </div>
                                
                                <div className="p-3 bg-gray-50">
                                  <p className="text-sm font-medium mb-1">আপনার ডিসপিউট</p>
                                  <p className="text-sm text-muted-foreground">{disputeReason}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                                <p className="text-muted-foreground">
                                  আপনার কোন সক্রিয় ডিসপিউট নেই
                                </p>
                              </div>
                            )}
                            
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-blue-800 mb-1">সাপোর্ট কনট্যাক্ট</h4>
                              <p className="text-xs text-blue-700">
                                ০১৭১২-৩৪৫৬৭৮ (সকাল ৯টা - রাত ৯টা)
                              </p>
                              <p className="text-xs text-blue-700">
                                ইমেইল: support@example.com
                              </p>
                            </div>
                          </div>
                        )}
                      </Tabs>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {step < 3 && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              বাতিল করুন
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleContinue}>
              {step === 1 ? "পরবর্তী" : "কনফার্ম করুন"}
            </Button>
          ) : step === 4 ? (
            <Button onClick={handleComplete}>
              সম্পন্ন
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default P2PPaymentModal;
