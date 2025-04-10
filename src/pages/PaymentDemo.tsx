
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import PaymentMethodSelector from "@/components/Payment/PaymentMethodSelector";
import PaymentGateway from "@/components/payment/PaymentGateway";
import { PaymentResultData } from "@/components/payment/PaymentGateway";
import { 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone 
} from "lucide-react";

const PaymentDemo = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'demo1' | 'demo2'>('demo1');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [showGateway, setShowGateway] = useState(false);
  
  const handlePaymentComplete = (paymentData: any) => {
    console.log("Payment completed with data:", paymentData);
    setPaymentData(paymentData);
    setPaymentComplete(true);
    
    toast({
      title: "পেমেন্ট সফল!",
      description: `${paymentData.method === 'cash' ? 'বুকিং' : 'পেমেন্ট'} সফলভাবে সম্পন্ন হয়েছে।`,
    });
  };

  const handleFullGatewayComplete = (data: PaymentResultData) => {
    console.log("Full payment gateway data:", data);
    setPaymentData(data);
    setPaymentComplete(true);
    setShowGateway(false);
    
    toast({
      title: "পেমেন্ট সফল!",
      description: `${data.transactionId} ট্রানজেকশন আইডি সহ পেমেন্ট সম্পন্ন হয়েছে।`,
    });
  };

  return (
    <div className="container px-4 pt-24 pb-24">
      <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as 'demo1' | 'demo2')}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">পেমেন্ট সিস্টেম</h1>
          <TabsList>
            <TabsTrigger value="demo1">সিম্পল ভার্সন</TabsTrigger>
            <TabsTrigger value="demo2">কমপ্লিট ভার্সন</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="demo1">
          {!paymentComplete ? (
            <div className="max-w-md mx-auto">
              <PaymentMethodSelector 
                amount={1500}
                processingFee={20}
                onComplete={handlePaymentComplete}
                allowedMethods={['bkash', 'nagad', 'rocket', 'card', 'cash']}
                title="পেমেন্ট করুন"
                description="আপনার পছন্দের পেমেন্ট মাধ্যম বেছে নিন"
              />
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-green-800">পেমেন্ট সফল!</h2>
                <p className="mt-2 text-green-700">
                  আপনার {paymentData?.method === 'cash' ? 'বুকিং' : 'পেমেন্ট'} সফলভাবে সম্পন্ন হয়েছে।
                </p>
                
                <div className="mt-4 w-full text-left bg-white p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">পেমেন্ট মেথড:</div>
                    <div className="text-sm font-medium">
                      {paymentData?.method === 'bkash' && 'বিকাশ'}
                      {paymentData?.method === 'nagad' && 'নগদ'}
                      {paymentData?.method === 'rocket' && 'রকেট'}
                      {paymentData?.method === 'card' && 'কার্ড'}
                      {paymentData?.method === 'cash' && 'ক্যাশ'}
                    </div>
                    
                    {paymentData?.transactionId && (
                      <>
                        <div className="text-sm text-muted-foreground">ট্রানজেকশন আইডি:</div>
                        <div className="text-sm font-medium">{paymentData.transactionId}</div>
                      </>
                    )}
                    
                    <div className="text-sm text-muted-foreground">পরিমাণ:</div>
                    <div className="text-sm font-medium">৳1520</div>
                    
                    <div className="text-sm text-muted-foreground">তারিখ:</div>
                    <div className="text-sm font-medium">{new Date().toLocaleString('bn-BD')}</div>
                  </div>
                </div>
                
                <Button
                  onClick={() => setPaymentComplete(false)}
                  className="mt-4"
                >
                  আবার শুরু করুন
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="demo2">
          {!showGateway && !paymentComplete ? (
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>পেমেন্ট গেটওয়ে ডেমো</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    এটি একটি পূর্ণাঙ্গ পেমেন্ট গেটওয়ে ইন্টিগ্রেশন ডেমো, যেখানে আপনি বিভিন্ন পেমেন্ট মেথড দিয়ে পেমেন্ট করতে পারবেন।
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Card className="bg-primary/10 border-primary/30 hover:bg-primary/20 transition-colors cursor-pointer" onClick={() => setShowGateway(true)}>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold">সামগ্রী কিনুন</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">৳২,৫০০</p>
                        <Button size="sm" className="w-full">
                          পেমেন্ট করুন <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer" onClick={() => setShowGateway(true)}>
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center mb-3">
                          <Smartphone className="h-6 w-6 text-blue-700" />
                        </div>
                        <h3 className="font-semibold">মোবাইল রিচার্জ</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">৳৫০০</p>
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                          রিচার্জ করুন <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : showGateway && !paymentComplete ? (
            <div className="max-w-md mx-auto">
              <PaymentGateway
                amount={2500}
                processingFee={50}
                onPaymentComplete={handleFullGatewayComplete}
                onCancel={() => setShowGateway(false)}
                allowedMethods={['card', 'bkash', 'nagad', 'rocket']}
              />
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h2 className="text-xl font-bold text-green-800">পেমেন্ট সফল!</h2>
                <p className="mt-2 text-green-700">
                  আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।
                </p>
                
                <div className="mt-4 w-full text-left bg-white p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">পেমেন্ট মেথড:</div>
                    <div className="text-sm font-medium">
                      {paymentData?.method === 'bkash' && 'বিকাশ'}
                      {paymentData?.method === 'nagad' && 'নগদ'}
                      {paymentData?.method === 'rocket' && 'রকেট'}
                      {paymentData?.method === 'card' && 'কার্ড'}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">ট্রানজেকশন আইডি:</div>
                    <div className="text-sm font-medium">{paymentData?.transactionId}</div>
                    
                    <div className="text-sm text-muted-foreground">পরিমাণ:</div>
                    <div className="text-sm font-medium">৳{paymentData?.amount}</div>
                    
                    <div className="text-sm text-muted-foreground">তারিখ:</div>
                    <div className="text-sm font-medium">{paymentData?.date?.toLocaleString('bn-BD')}</div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPaymentComplete(false);
                      setShowGateway(false);
                    }}
                  >
                    হোমে ফিরুন
                  </Button>
                  <Button
                    onClick={() => {
                      setPaymentComplete(false);
                      setShowGateway(true);
                    }}
                  >
                    আবার পেমেন্ট করুন
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentDemo;
