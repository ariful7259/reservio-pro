
import React, { useState } from 'react';
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
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Shield,
  Wallet,
} from "lucide-react";
import { Steps } from "@/components/ui/steps";
import { useToast } from "@/components/ui/use-toast";

interface P2PPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  item,
}) => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { toast } = useToast();

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
    // Reset form
    setStep(1);
    setPaymentMethod("");
    setTransactionId("");
  };

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
                    </p>
                    <p className="text-xs text-muted-foreground">
                      * পেমেন্ট সম্পন্ন করার পর ট্রানজেকশন আইডি দিন
                    </p>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <p className="text-sm mb-1">ব্যাংক: <span className="font-medium">Dutch-Bangla Bank</span></p>
                    <p className="text-sm mb-1">অ্যাকাউন্ট নম্বর: <span className="font-medium">10012345678</span></p>
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
