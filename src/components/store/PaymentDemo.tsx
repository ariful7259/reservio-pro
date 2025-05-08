
import React, { useState } from 'react';
import { CheckCircle2, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PaymentDemo = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  
  const handlePayment = () => {
    setPaymentStatus('processing');
    
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg mb-4">
        <h3 className="font-medium mb-2">সাপোর্টেড পেমেন্ট মেথড</h3>
        <div className="flex flex-wrap gap-3">
          <div className="py-2 px-4 bg-white border rounded flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                 alt="Visa" className="h-6" />
            <span>ভিসা</span>
          </div>
          <div className="py-2 px-4 bg-white border rounded flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" 
                 alt="MasterCard" className="h-6" />
            <span>মাস্টারকার্ড</span>
          </div>
          <div className="py-2 px-4 bg-white border rounded flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Bkash_logo.png" 
                 alt="bKash" className="h-6" />
            <span>বিকাশ</span>
          </div>
          <div className="py-2 px-4 bg-white border rounded flex items-center gap-2">
            <img src="https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg" 
                 alt="Nagad" className="h-6" />
            <span>নগদ</span>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-slate-100 p-4 flex justify-between">
          <h3 className="font-medium">টোটাল পেমেন্ট</h3>
          <div className="font-bold">৳২,৯৯৯</div>
        </div>
        
        <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> কার্ড পেমেন্ট
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" /> মোবাইল ব্যাংকিং
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="card" className="p-4">
            {paymentStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-1">পেমেন্ট সম্পন্ন হয়েছে</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আপনার অর্ডার প্রসেসিং শুরু হয়েছে।
                </p>
              </div>
            ) : (
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">কার্ড নম্বর</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">মেয়াদ উত্তীর্ণ</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">কার্ডধারীর নাম</Label>
                  <Input id="name" placeholder="আপনার নাম" />
                </div>
                
                <Button 
                  type="button" 
                  className="w-full"
                  onClick={handlePayment}
                  disabled={paymentStatus === 'processing'}
                >
                  {paymentStatus === 'processing' ? 'প্রসেসিং...' : 'পেমেন্ট করুন'}
                </Button>
              </form>
            )}
          </TabsContent>
          
          <TabsContent value="mobile" className="p-4">
            {paymentStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-1">পেমেন্ট সম্পন্ন হয়েছে</h3>
                <p className="text-muted-foreground text-center max-w-sm">
                  আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। আপনার অর্ডার প্রসেসিং শুরু হয়েছে।
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Card className="hover:border-blue-400 cursor-pointer overflow-hidden">
                    <CardContent className="p-4 flex flex-col items-center">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Bkash_logo.png" 
                          alt="bKash" className="h-12 mb-2" />
                      <span>বিকাশ</span>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:border-blue-400 cursor-pointer overflow-hidden">
                    <CardContent className="p-4 flex flex-col items-center">
                      <img src="https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg" 
                          alt="Nagad" className="h-12 mb-2" />
                      <span>নগদ</span>
                    </CardContent>
                  </Card>
                </div>
                
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile-number">মোবাইল নম্বর</Label>
                    <Input id="mobile-number" placeholder="01XXX-XXXXXX" />
                  </div>
                  
                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={handlePayment}
                    disabled={paymentStatus === 'processing'}
                  >
                    {paymentStatus === 'processing' ? 'প্রসেসিং...' : 'পেমেন্ট করুন'}
                  </Button>
                </form>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentDemo;
