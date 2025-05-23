
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Smartphone, Truck, MapPin, ShoppingBag, Check, ChevronsUpDown } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OnePageCheckout = () => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('bkash');
  const [isProcessing, setIsProcessing] = useState(false);

  // মক ডাটা
  const cartItems = [
    {
      id: '1',
      name: 'স্টাইলিশ টি-শার্ট',
      price: '৳৮৫০',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: '2',
      name: 'ক্লাসিক জিন্স',
      price: '৳১,৯৯৫',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ];
  
  const shippingMethods = [
    { id: 'standard', name: 'স্ট্যান্ডার্ড ডেলিভারি', price: '৳৬০', time: '২-৩ দিন' },
    { id: 'express', name: 'এক্সপ্রেস ডেলিভারি', price: '৳১২০', time: '২৪ ঘণ্টা' }
  ];

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "অর্ডার সফল!",
        description: "আপনার অর্ডার সফলভাবে প্লেস করা হয়েছে। শীঘ্রই ইমেইলে নিশ্চিতকরণ পাবেন।",
      });
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4">
        <h3 className="font-medium flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" /> ওয়ান-পেজ চেকআউট
        </h3>
        <p className="text-sm text-muted-foreground">
          সহজ এবং দ্রুত অর্ডার প্রক্রিয়াকরণের জন্য সমস্ত তথ্য এক পৃষ্ঠায় পূরণ করুন।
        </p>
      </div>

      <Tabs value={activeStep} onValueChange={setActiveStep}>
        <TabsList className="grid grid-cols-1 md:hidden">
          <TabsTrigger value="all">সমস্ত ফর্ম একসাথে</TabsTrigger>
        </TabsList>
        <TabsList className="hidden md:grid md:grid-cols-3">
          <TabsTrigger value="all">একসাথে</TabsTrigger>
          <TabsTrigger value="accordion">অ্যাকর্ডিয়ন ভিউ</TabsTrigger>
          <TabsTrigger value="steps">স্টেপ বাই স্টেপ</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* বাম কলাম - শিপিং এবং পেমেন্ট ফর্ম */}
            <div className="space-y-6">
              {/* গ্রাহক তথ্য */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">গ্রাহক তথ্য</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">নাম</Label>
                      <Input id="first-name" placeholder="আপনার নাম" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">ফোন নম্বর</Label>
                      <Input id="last-name" placeholder="০১৭XXXXXXXX" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">ইমেইল (ঐচ্ছিক)</Label>
                    <Input id="email" type="email" placeholder="example@mail.com" />
                  </div>
                </CardContent>
              </Card>

              {/* শিপিং ঠিকানা */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    শিপিং ঠিকানা
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="district">জেলা</Label>
                      <Select defaultValue="dhaka">
                        <SelectTrigger>
                          <SelectValue placeholder="জেলা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dhaka">ঢাকা</SelectItem>
                          <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                          <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                          <SelectItem value="khulna">খুলনা</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">এলাকা</Label>
                      <Select defaultValue="mirpur">
                        <SelectTrigger>
                          <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mirpur">মিরপুর</SelectItem>
                          <SelectItem value="uttara">উত্তরা</SelectItem>
                          <SelectItem value="gulshan">গুলশান</SelectItem>
                          <SelectItem value="mohammadpur">মোহাম্মদপুর</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">বিস্তারিত ঠিকানা</Label>
                    <Textarea 
                      id="address" 
                      placeholder="বাসা/রোড নম্বর, ফ্ল্যাট নম্বর, এলাকার নাম, ল্যান্ডমার্ক" 
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* শিপিং মেথড */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    ডেলিভারি মেথড
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup defaultValue="standard">
                    {shippingMethods.map((method) => (
                      <div 
                        key={method.id} 
                        className="flex items-center justify-between space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent/5"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label htmlFor={method.id} className="font-medium cursor-pointer">
                            {method.name}
                          </Label>
                          <span className="text-sm text-muted-foreground">
                            ({method.time})
                          </span>
                        </div>
                        <span className="font-medium">{method.price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* পেমেন্ট মেথড */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    পেমেন্ট মেথড
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="bkash" id="bkash" />
                          <Label htmlFor="bkash" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone className="h-5 w-5 text-pink-600" />
                            বিকাশ
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="nagad" id="nagad" />
                          <Label htmlFor="nagad" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone className="h-5 w-5 text-orange-600" />
                            নগদ
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                            কার্ড
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                            <Truck className="h-5 w-5 text-green-600" />
                            ক্যাশ অন ডেলিভারি
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'bkash' && (
                      <div className="p-4 bg-pink-50 rounded-md space-y-2">
                        <p className="text-sm text-pink-700">
                          বিকাশ পেমেন্ট করার পদ্ধতি:
                        </p>
                        <ol className="list-decimal list-inside text-xs pl-2 space-y-1 text-pink-700">
                          <li>অর্ডার প্লেস করার পর বিকাশ পেমেন্ট পেজে যাবে</li>
                          <li>বিকাশ অ্যাপে লগ ইন করুন ও পেমেন্ট কনফার্ম করুন</li>
                          <li>সফল পেমেন্টের পর আপনার অর্ডার কনফার্ম হবে</li>
                        </ol>
                      </div>
                    )}
                    {paymentMethod === 'cod' && (
                      <div className="p-4 bg-green-50 rounded-md text-sm text-green-700">
                        ডেলিভারি সময়ে নগদ অর্থ প্রদান করবেন। অতিরিক্ত ২০৳ COD চার্জ প্রযোজ্য।
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ডান কলাম - অর্ডার সামারি এবং কনফার্মেশন */}
            <div className="space-y-6">
              {/* অর্ডার সামারি */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">অর্ডার সামারি</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 py-2 border-b">
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">পরিমাণ: {item.quantity}</p>
                          <p className="font-medium mt-1">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>সাবটোটাল:</span>
                      <span>৳২,৮৪৫</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>শিপিং চার্জ:</span>
                      <span>৳৬০</span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div className="flex justify-between text-sm">
                        <span>COD চার্জ:</span>
                        <span>৳২০</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>মোট:</span>
                      <span>{paymentMethod === 'cod' ? '৳২,৯২৫' : '৳২,৯০৫'}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor="coupon">কুপন কোড (যদি থাকে)</Label>
                      <div className="flex gap-2">
                        <Input id="coupon" placeholder="কুপন কোড দিন" />
                        <Button variant="outline">প্রয়োগ</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">অর্ডার নোট (ঐচ্ছিক)</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="ডেলিভারি সম্পর্কে যেকোন বিশেষ নির্দেশনা"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* টার্মস এবং কন্ডিশন্স */}
              <div className="p-4 bg-blue-50 rounded-md text-sm text-blue-700">
                <p>
                  "অর্ডার প্লেস করুন" বাটনে ক্লিক করে আপনি আমাদের{" "}
                  <span className="underline cursor-pointer">শর্তাবলী</span> এবং{" "}
                  <span className="underline cursor-pointer">গোপনীয়তা নীতি</span> মেনে নিচ্ছেন।
                </p>
              </div>
              
              {/* অর্ডার কনফার্ম বাটন */}
              <Button 
                className="w-full py-6 text-lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    প্রক্রিয়াকরণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    অর্ডার প্লেস করুন
                  </>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>নিরাপদ ও সুরক্ষিত পেমেন্ট</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="accordion" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Accordion type="single" collapsible defaultValue="customer">
                <AccordionItem value="customer">
                  <AccordionTrigger>গ্রাহক তথ্য</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 p-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accordion-first-name">নাম</Label>
                          <Input id="accordion-first-name" placeholder="আপনার নাম" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accordion-phone">ফোন নম্বর</Label>
                          <Input id="accordion-phone" placeholder="০১৭XXXXXXXX" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accordion-email">ইমেইল (ঐচ্ছিক)</Label>
                        <Input id="accordion-email" type="email" placeholder="example@mail.com" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>শিপিং ঠিকানা</AccordionTrigger>
                  <AccordionContent>
                    {/* শিপিং ফর্ম */}
                    <div className="space-y-4 p-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="accordion-district">জেলা</Label>
                          <Select defaultValue="dhaka">
                            <SelectTrigger>
                              <SelectValue placeholder="জেলা নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dhaka">ঢাকা</SelectItem>
                              <SelectItem value="chittagong">চট্টগ্রাম</SelectItem>
                              <SelectItem value="rajshahi">রাজশাহী</SelectItem>
                              <SelectItem value="khulna">খুলনা</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accordion-area">এলাকা</Label>
                          <Select defaultValue="mirpur">
                            <SelectTrigger>
                              <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mirpur">মিরপুর</SelectItem>
                              <SelectItem value="uttara">উত্তরা</SelectItem>
                              <SelectItem value="gulshan">গুলশান</SelectItem>
                              <SelectItem value="mohammadpur">মোহাম্মদপুর</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accordion-address">বিস্তারিত ঠিকানা</Label>
                        <Textarea 
                          id="accordion-address" 
                          placeholder="বাসা/রোড নম্বর, ফ্ল্যাট নম্বর, এলাকার নাম, ল্যান্ডমার্ক" 
                          rows={3}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="payment">
                  <AccordionTrigger>পেমেন্ট মেথড</AccordionTrigger>
                  <AccordionContent>
                    {/* পেমেন্ট ফর্ম */}
                    <div className="space-y-4 p-2">
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                      >
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="bkash" id="accordion-bkash" />
                          <Label htmlFor="accordion-bkash" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone className="h-5 w-5 text-pink-600" />
                            বিকাশ
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="nagad" id="accordion-nagad" />
                          <Label htmlFor="accordion-nagad" className="flex items-center gap-2 cursor-pointer">
                            <Smartphone className="h-5 w-5 text-orange-600" />
                            নগদ
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="card" id="accordion-card" />
                          <Label htmlFor="accordion-card" className="flex items-center gap-2 cursor-pointer">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                            কার্ড
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent/5">
                          <RadioGroupItem value="cod" id="accordion-cod" />
                          <Label htmlFor="accordion-cod" className="flex items-center gap-2 cursor-pointer">
                            <Truck className="h-5 w-5 text-green-600" />
                            ক্যাশ অন ডেলিভারি
                          </Label>
                        </div>
                      </RadioGroup>

                      {paymentMethod === 'bkash' && (
                        <div className="p-3 bg-pink-50 rounded-md space-y-2">
                          <p className="text-sm text-pink-700">
                            বিকাশ পেমেন্ট করার পদ্ধতি:
                          </p>
                          <ol className="list-decimal list-inside text-xs pl-2 space-y-1 text-pink-700">
                            <li>অর্ডার প্লেস করার পর বিকাশ পেমেন্ট পেজে যাবে</li>
                            <li>বিকাশ অ্যাপে লগ ইন করুন ও পেমেন্ট কনফার্ম করুন</li>
                            <li>সফল পেমেন্টের পর আপনার অর্ডার কনফার্ম হবে</li>
                          </ol>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">অর্ডার সামারি</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* কার্ট আইটেম লিস্ট */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3 py-2 border-b">
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">পরিমাণ: {item.quantity}</p>
                          <p className="font-medium mt-1">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* সাবটোটাল, শিপিং, টোটাল */}
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>সাবটোটাল:</span>
                      <span>৳২,৮৪৫</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>শিপিং চার্জ:</span>
                      <span>৳৬০</span>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div className="flex justify-between text-sm">
                        <span>COD চার্জ:</span>
                        <span>৳২০</span>
                      </div>
                    )}
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>মোট:</span>
                      <span>{paymentMethod === 'cod' ? '৳২,৯২৫' : '৳২,৯০৫'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                className="w-full py-6 text-lg mt-4"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    প্রক্রিয়াকরণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    অর্ডার প্লেস করুন
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="steps" className="mt-4">
          <div className="text-center mb-6">
            <p className="text-lg">স্টেপ বাই স্টেপ চেকআউট ভিউটি ডেস্কটপে দেখুন</p>
            <p className="text-sm text-muted-foreground">
              মোবাইল ডিভাইসে সম্পূর্ণ ফর্মটি একসাথে দেখানো হচ্ছে
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                {/* সিমপ্লিফাইড ফর্ম */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="steps-name">নাম</Label>
                      <Input id="steps-name" placeholder="আপনার নাম" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="steps-phone">ফোন নম্বর</Label>
                      <Input id="steps-phone" placeholder="০১৭XXXXXXXX" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="steps-address">ঠিকানা</Label>
                    <Textarea 
                      id="steps-address" 
                      placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন" 
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>পেমেন্ট মেথড</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="flex items-center justify-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        বিকাশ/নগদ
                      </Button>
                      <Button variant="outline" className="flex items-center justify-center gap-2">
                        <Truck className="h-4 w-4" />
                        ক্যাশ অন ডেলিভারি
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">অর্ডার সামারি</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* সিমপ্লিফাইড অর্ডার সামারি */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-2 py-2 border-b">
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{item.name}</p>
                        <div className="flex justify-between">
                          <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                          <p className="text-sm font-medium">{item.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                    <span>মোট:</span>
                    <span>৳২,৯০৫</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin mr-2">◌</span>
                      প্রক্রিয়াকরণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      অর্ডার প্লেস করুন
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnePageCheckout;
