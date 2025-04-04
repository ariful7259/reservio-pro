
import React, { useState } from "react";
import PaymentMethodSelector from "@/components/Payment/PaymentMethodSelector";
import { useToast } from "@/hooks/use-toast";

const PaymentDemo = () => {
  const { toast } = useToast();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  
  const handlePaymentComplete = (paymentData: any) => {
    console.log("Payment completed with data:", paymentData);
    setPaymentData(paymentData);
    setPaymentComplete(true);
    
    toast({
      title: "পেমেন্ট সফল!",
      description: `${paymentData.method === 'cash' ? 'বুকিং' : 'পেমেন্ট'} সফলভাবে সম্পন্ন হয়েছে।`,
    });
  };

  return (
    <div className="container px-4 pt-24 pb-24">
      <h1 className="text-2xl font-bold mb-6">পেমেন্ট সিস্টেম</h1>
      
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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDemo;
