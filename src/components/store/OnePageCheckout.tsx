
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { 
  CreditCard, 
  Truck, 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Lock, 
  Shield, 
  ChevronRight, 
  Loader2, 
  CheckCircle2
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const OnePageCheckout = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  
  // মক প্রোডাক্ট ডাটা
  const cartItems = [
    {
      id: '1',
      name: 'প্রিমিয়াম টি-শার্ট',
      price: 850,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=100&auto=format&fit=crop',
      attributes: {
        color: 'নীল',
        size: 'L'
      }
    },
    {
      id: '2',
      name: 'জিন্স প্যান্ট',
      price: 1500,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=100&auto=format&fit=crop',
      attributes: {
        color: 'কালো',
        size: 'M'
      }
    }
  ];

  // মূল্য গণনা
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 100;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsProcessing(true);
    
    // মক পেমেন্ট প্রসেসিং
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessScreen(true);
      
      toast({
        title: "অর্ডার সফল!",
        description: "আপনার অর্ডারটি সফলভাবে প্লেস হয়েছে।",
      });
    }, 2000);
  };

  // সফল পেমেন্ট স্ক্রিন
  if (showSuccessScreen) {
    return (
      <div className="max-w-md mx-auto p-6 py-12 text-center">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold mb-2">অর্ডার সফলভাবে প্লেস হয়েছে!</h2>
        <p className="text-muted-foreground mb-6">
          অর্ডার নম্বর: #BD123456
        </p>
        <div className="bg-muted/30 p-4 rounded-md mb-6">
          <div className="flex justify-between mb-2">
            <span>সাবটোটাল:</span>
            <span>৳{subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>শিপিং চার্জ:</span>
            <span>৳{shipping}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>মোট:</span>
            <span>৳{total}</span>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 text-left">
          <h3 className="font-medium text-blue-800 mb-1">অর্ডার আপডেট</h3>
          <p className="text-sm text-blue-700">
            আপনি শীঘ্রই ইমেইলে অর্ডার কনফার্মেশন পাবেন। আপনার অর্ডার ট্র্যাক করতে আপনার ইমেইল চেক করুন।
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant="default">অর্ডার ট্র্যাক করুন</Button>
          <Button variant="outline">শপিং চালিয়ে যান</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <CreditCard className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium">ওয়ান-পেজ চেকআউট</h3>
          <p className="text-sm text-muted-foreground">
            ক্রেতারা একটি পেজে থেকেই অর্ডার সম্পূর্ণ করতে পারবেন, যা কনভার্শন রেট বাড়াতে সাহায্য করবে।
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* চেকআউট ফর্ম - ২/৩ অংশ */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">আপনার তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">নাম</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="আপনার পূর্ণ নাম" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">ফোন নম্বর</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" placeholder="০১XXXXXXXXX" className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ই-মেইল (ঐচ্ছিক)</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="example@mail.com" className="pl-10" />
                </div>
                <p className="text-xs text-muted-foreground">
                  অর্ডার আপডেট এবং ট্র্যাকিং তথ্য পাওয়ার জন্য
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">শিপিং ঠিকানা</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">সম্পূর্ণ ঠিকানা</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="address" placeholder="বাসা/হোল্ডিং নং, রাস্তা, এলাকা" className="pl-10" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">শহর/জেলা</Label>
                  <Input id="city" placeholder="আপনার শহর বা জেলা" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">এলাকা/থানা</Label>
                  <Input id="area" placeholder="আপনার এলাকা বা থানা" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-instruction">ডেলিভারি নির্দেশনা (ঐচ্ছিক)</Label>
                <Textarea id="delivery-instruction" placeholder="আপনার কোনো বিশেষ নির্দেশনা থাকলে লিখুন" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">পেমেন্ট পদ্ধতি</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className={`relative flex items-center justify-between rounded-md border p-4 ${paymentMethod === 'bkash' ? 'bg-primary/5 border-primary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="bkash" id="bkash" className="text-primary" />
                    <div className="grid gap-1">
                      <Label htmlFor="bkash" className="text-base">বিকাশ</Label>
                      <p className="text-sm text-muted-foreground">
                        বিকাশ মোবাইল ব্যাংকিং
                      </p>
                    </div>
                  </div>
                  <img 
                    src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg" 
                    alt="Bkash"
                    className="h-8 w-auto" 
                  />
                </div>
                
                <div className={`relative flex items-center justify-between rounded-md border p-4 ${paymentMethod === 'nagad' ? 'bg-primary/5 border-primary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="nagad" id="nagad" />
                    <div className="grid gap-1">
                      <Label htmlFor="nagad" className="text-base">নগদ</Label>
                      <p className="text-sm text-muted-foreground">
                        নগদ মোবাইল ব্যাংকিং
                      </p>
                    </div>
                  </div>
                  <img 
                    src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" 
                    alt="Nagad"
                    className="h-8 w-auto" 
                  />
                </div>
                
                <div className={`relative flex items-center justify-between rounded-md border p-4 ${paymentMethod === 'cod' ? 'bg-primary/5 border-primary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <div className="grid gap-1">
                      <Label htmlFor="cod" className="text-base">ক্যাশ অন ডেলিভারি</Label>
                      <p className="text-sm text-muted-foreground">
                        পণ্য হাতে পেয়ে ক্যাশ পেমেন্ট করুন
                      </p>
                    </div>
                  </div>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
              </RadioGroup>
              
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  আমি <a href="#" className="text-primary hover:underline">শর্তাবলী</a> ও <a href="#" className="text-primary hover:underline">প্রাইভেসি পলিসি</a> পড়েছি এবং এতে সম্মত
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* সারসংক্ষেপ ও অর্ডার - ১/৩ অংশ */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">অর্ডার সারসংক্ষেপ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible defaultValue="items">
                <AccordionItem value="items" className="border-none">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="font-medium flex items-center gap-1">
                      <span>কার্টের আইটেম</span>
                      <span className="bg-muted text-sm px-2 rounded-full">{cartItems.length}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="h-16 w-16 rounded border overflow-hidden shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex justify-between items-baseline text-sm text-muted-foreground">
                              <span>
                                {item.attributes.color}, {item.attributes.size} × {item.quantity}
                              </span>
                              <span>৳{item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">সাবটোটাল</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
                  <span>৳{shipping}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>মোট</span>
                  <span>৳{total}</span>
                </div>
              </div>
              
              <Button 
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    প্রক্রিয়াকরণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    অর্ডার কনফার্ম করুন
                  </>
                )}
              </Button>
              
              <div className="flex justify-center gap-2 pt-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">সিকিউর পেমেন্ট</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-muted/20 p-3 rounded-md border">
            <h3 className="flex items-center gap-1.5 font-medium">
              <Truck className="h-4 w-4" />
              <span>ডেলিভারি সময়সীমা</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              ঢাকার ভিতরে ২৪-৪৮ ঘন্টা, ঢাকার বাইরে ২-৫ কার্যদিবস
            </p>
          </div>
          
          <div className="bg-muted/20 p-3 rounded-md border">
            <h3 className="flex items-center gap-1.5 font-medium">
              <ChevronRight className="h-4 w-4" />
              <span>হেল্প সেন্টার</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              <a href="#" className="hover:underline text-primary">চেকআউট সহায়তা</a> বা কল করুন <span className="font-medium">০১XXXXXXXXX</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePageCheckout;
