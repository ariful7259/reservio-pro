
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Copy, Share2, Link, QrCode, Calendar, Bell, RotateCw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurrencySelector from '../CurrencySelector';
import { Currency, currencies, formatCurrency } from '@/utils/currencyUtils';

interface PaymentLinkInfo {
  title: string;
  amount: number;
  description: string;
  currency: Currency;
  expiryDate: string;
  allowPartialPayment: boolean;
  requireAddress: boolean;
  requirePhone: boolean;
  notifyOnPayment: boolean;
  recurringOptions: {
    isRecurring: boolean;
    interval: 'daily' | 'weekly' | 'monthly' | 'yearly';
    duration: number;
  };
}

const PaymentLinkGenerator: React.FC = () => {
  const { toast } = useToast();
  const [linkInfo, setLinkInfo] = useState<PaymentLinkInfo>({
    title: '',
    amount: 0,
    description: '',
    currency: 'BDT',
    expiryDate: '',
    allowPartialPayment: false,
    requireAddress: false,
    requirePhone: true,
    notifyOnPayment: true,
    recurringOptions: {
      isRecurring: false,
      interval: 'monthly',
      duration: 1
    }
  });
  
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  
  const updateLinkInfo = (field: keyof PaymentLinkInfo, value: any) => {
    setLinkInfo({
      ...linkInfo,
      [field]: value
    });
  };
  
  const updateRecurringOptions = (field: keyof PaymentLinkInfo['recurringOptions'], value: any) => {
    setLinkInfo({
      ...linkInfo,
      recurringOptions: {
        ...linkInfo.recurringOptions,
        [field]: value
      }
    });
  };
  
  const generateLink = () => {
    // Validate inputs
    if (!linkInfo.title) {
      toast({
        title: "টাইটেল প্রয়োজন",
        description: "পেমেন্ট লিংকের জন্য একটি টাইটেল দিন।",
        variant: "destructive",
      });
      return;
    }
    
    if (linkInfo.amount <= 0) {
      toast({
        title: "সঠিক পরিমাণ দিন",
        description: "পেমেন্ট পরিমাণ শূন্যের বেশি হতে হবে।",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a dummy link with encoded params
    const params = new URLSearchParams();
    params.append('title', linkInfo.title);
    params.append('amount', linkInfo.amount.toString());
    params.append('currency', linkInfo.currency);
    if (linkInfo.description) params.append('desc', linkInfo.description);
    if (linkInfo.expiryDate) params.append('exp', linkInfo.expiryDate);
    if (linkInfo.allowPartialPayment) params.append('partial', 'true');
    if (linkInfo.requireAddress) params.append('addr', 'true');
    if (linkInfo.requirePhone) params.append('phone', 'true');
    if (linkInfo.notifyOnPayment) params.append('notify', 'true');
    if (linkInfo.recurringOptions.isRecurring) {
      params.append('recurring', 'true');
      params.append('interval', linkInfo.recurringOptions.interval);
      params.append('duration', linkInfo.recurringOptions.duration.toString());
    }
    
    // Create a shortened link for demonstration
    const baseUrl = window.location.origin;
    const dummyLink = `${baseUrl}/pay/${Math.random().toString(36).substring(2, 10)}`;
    
    setGeneratedLink(dummyLink);
    setShowQRCode(true);
    
    toast({
      title: "পেমেন্ট লিংক তৈরি করা হয়েছে",
      description: "আপনার পেমেন্ট লিংক সফলভাবে তৈরি করা হয়েছে।",
    });
  };
  
  const copyLink = () => {
    if (!generatedLink) return;
    
    navigator.clipboard.writeText(generatedLink);
    toast({
      title: "লিংক কপি করা হয়েছে",
      description: "পেমেন্ট লিংক ক্লিপবোর্ডে কপি করা হয়েছে।",
    });
  };
  
  const shareLink = () => {
    if (!generatedLink) return;
    
    if (navigator.share) {
      navigator.share({
        title: `পেমেন্ট অনুরোধ: ${linkInfo.title}`,
        text: `দয়া করে এই লিঙ্কে ${formatCurrency(linkInfo.amount, linkInfo.currency)} পেমেন্ট করুন`,
        url: generatedLink,
      }).catch(() => {
        copyLink();
      });
    } else {
      copyLink();
    }
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">পেমেন্ট লিংক জেনারেটর</h1>
          <p className="text-muted-foreground">কাস্টম পেমেন্ট লিংক তৈরি করে শেয়ার করুন</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট বিবরণ</CardTitle>
              <CardDescription>পেমেন্ট লিংকের বিবরণ সেট করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-title">পেমেন্ট টাইটেল *</Label>
                  <Input 
                    id="payment-title" 
                    placeholder="উদাহরণ: মাসিক ভাড়া পেমেন্ট"
                    value={linkInfo.title}
                    onChange={(e) => updateLinkInfo('title', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="payment-amount">পরিমাণ *</Label>
                    <Input 
                      id="payment-amount" 
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={linkInfo.amount || ''}
                      onChange={(e) => updateLinkInfo('amount', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>কারেন্সি</Label>
                    <CurrencySelector 
                      selectedCurrency={linkInfo.currency}
                      onCurrencyChange={(currency) => updateLinkInfo('currency', currency)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="payment-description">বিবরণ</Label>
                <Textarea 
                  id="payment-description" 
                  placeholder="পেমেন্টের বিবরণ লিখুন..."
                  value={linkInfo.description}
                  onChange={(e) => updateLinkInfo('description', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-expiry">মেয়াদ শেষ হওয়ার তারিখ</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="payment-expiry"
                      type="date"
                      value={linkInfo.expiryDate}
                      onChange={(e) => updateLinkInfo('expiryDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="font-medium mb-2">অতিরিক্ত বিকল্প</div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="partial-payment">আংশিক পেমেন্ট অনুমতি দিন</Label>
                    <p className="text-xs text-muted-foreground">ব্যবহারকারীরা আংশিক পরিমাণ প্রদান করতে পারবেন</p>
                  </div>
                  <Switch 
                    id="partial-payment"
                    checked={linkInfo.allowPartialPayment}
                    onCheckedChange={(checked) => updateLinkInfo('allowPartialPayment', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-address">ঠিকানা প্রয়োজন</Label>
                    <p className="text-xs text-muted-foreground">পেমেন্টের সময় ঠিকানা সংগ্রহ করুন</p>
                  </div>
                  <Switch 
                    id="require-address"
                    checked={linkInfo.requireAddress}
                    onCheckedChange={(checked) => updateLinkInfo('requireAddress', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="require-phone">ফোন নম্বর প্রয়োজন</Label>
                    <p className="text-xs text-muted-foreground">পেমেন্টের সময় ফোন নম্বর সংগ্রহ করুন</p>
                  </div>
                  <Switch 
                    id="require-phone"
                    checked={linkInfo.requirePhone}
                    onCheckedChange={(checked) => updateLinkInfo('requirePhone', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-payment">পেমেন্ট নোটিফিকেশন</Label>
                    <p className="text-xs text-muted-foreground">পেমেন্ট করা হলে আপনাকে অবহিত করা হবে</p>
                  </div>
                  <Switch 
                    id="notify-payment"
                    checked={linkInfo.notifyOnPayment}
                    onCheckedChange={(checked) => updateLinkInfo('notifyOnPayment', checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">রিকারিং পেমেন্ট</div>
                  <Switch 
                    checked={linkInfo.recurringOptions.isRecurring}
                    onCheckedChange={(checked) => updateRecurringOptions('isRecurring', checked)}
                  />
                </div>
                
                {linkInfo.recurringOptions.isRecurring && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="recurring-interval">ইন্টারভাল</Label>
                      <Select 
                        value={linkInfo.recurringOptions.interval}
                        onValueChange={(value: any) => updateRecurringOptions('interval', value)}
                      >
                        <SelectTrigger id="recurring-interval">
                          <SelectValue placeholder="ইন্টারভাল নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">প্রতিদিন</SelectItem>
                          <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                          <SelectItem value="monthly">মাসিক</SelectItem>
                          <SelectItem value="yearly">বার্ষিক</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="recurring-duration">সময়কাল</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="recurring-duration"
                          type="number"
                          min="1"
                          placeholder="1"
                          value={linkInfo.recurringOptions.duration}
                          onChange={(e) => updateRecurringOptions('duration', parseInt(e.target.value) || 1)}
                        />
                        <div className="whitespace-nowrap text-muted-foreground">
                          {linkInfo.recurringOptions.interval === 'daily' && 'দিন'}
                          {linkInfo.recurringOptions.interval === 'weekly' && 'সপ্তাহ'}
                          {linkInfo.recurringOptions.interval === 'monthly' && 'মাস'}
                          {linkInfo.recurringOptions.interval === 'yearly' && 'বছর'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generateLink} className="w-full">পেমেন্ট লিংক জেনারেট করুন</Button>
            </CardFooter>
          </Card>
          
          {generatedLink && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link className="h-5 w-5" />
                  আপনার পেমেন্ট লিংক
                </CardTitle>
                <CardDescription>এই লিংক ব্যবহার করে আপনি যে কারো কাছ থেকে পেমেন্ট নিতে পারেন</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Input value={generatedLink} readOnly />
                  <Button variant="outline" onClick={copyLink} size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={shareLink} size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {showQRCode && (
                  <div className="flex justify-center p-4">
                    {/* QR Code placeholder */}
                    <div className="h-48 w-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                      <QrCode className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                )}
                
                <div className="rounded-md bg-muted p-4">
                  <div className="font-medium mb-2">পেমেন্ট লিংক বিবরণ</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">শিরোনাম:</div>
                    <div>{linkInfo.title}</div>
                    
                    <div className="text-muted-foreground">পরিমাণ:</div>
                    <div>{formatCurrency(linkInfo.amount, linkInfo.currency)}</div>
                    
                    {linkInfo.description && (
                      <>
                        <div className="text-muted-foreground">বিবরণ:</div>
                        <div>{linkInfo.description}</div>
                      </>
                    )}
                    
                    {linkInfo.expiryDate && (
                      <>
                        <div className="text-muted-foreground">মেয়াদ শেষ:</div>
                        <div>{linkInfo.expiryDate}</div>
                      </>
                    )}
                    
                    {linkInfo.recurringOptions.isRecurring && (
                      <>
                        <div className="text-muted-foreground">রিকারিং পেমেন্ট:</div>
                        <div>
                          {linkInfo.recurringOptions.interval === 'daily' && 'প্রতিদিন'}
                          {linkInfo.recurringOptions.interval === 'weekly' && 'সাপ্তাহিক'}
                          {linkInfo.recurringOptions.interval === 'monthly' && 'মাসিক'}
                          {linkInfo.recurringOptions.interval === 'yearly' && 'বার্ষিক'} 
                          {' '} ({linkInfo.recurringOptions.duration} {
                            linkInfo.recurringOptions.interval === 'daily' ? 'দিন' :
                            linkInfo.recurringOptions.interval === 'weekly' ? 'সপ্তাহ' :
                            linkInfo.recurringOptions.interval === 'monthly' ? 'মাস' : 'বছর'
                          })
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট লিংক কেন ব্যবহার করবেন?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">সহজ পেমেন্ট সংগ্রহ</h3>
                  <p className="text-sm text-muted-foreground">
                    সহজে যে কারো কাছ থেকে পেমেন্ট গ্রহণ করুন, শুধুমাত্র একটি লিংক শেয়ার করে
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Link className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">পেমেন্ট সম্পর্কিত তথ্য</h3>
                  <p className="text-sm text-muted-foreground">
                    লিংকের মাধ্যমে পেমেন্ট সম্পর্কিত সমস্ত প্রয়োজনীয় তথ্য শেয়ার করুন
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <RotateCw className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">রিকারিং পেমেন্ট</h3>
                  <p className="text-sm text-muted-foreground">
                    আবর্তক পেমেন্ট সেট আপ করুন যা নির্দিষ্ট সময় অন্তর স্বয়ংক্রিয়ভাবে সংগ্রহ করবে
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">রিয়েল-টাইম নোটিফিকেশন</h3>
                  <p className="text-sm text-muted-foreground">
                    পেমেন্ট সম্পন্ন হওয়ার সাথে সাথে নোটিফিকেশন পান
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট লিংক মনিটরিং</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">জেনারেট করা লিংক:</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">লিংক ভিউ:</span>
                  <span className="font-medium">87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">সম্পূর্ণ পেমেন্ট:</span>
                  <span className="font-medium text-green-600">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">আংশিক পেমেন্ট:</span>
                  <span className="font-medium text-yellow-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">মোট সংগৃহীত:</span>
                  <span className="font-medium">৳24,500</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/payment/analytics'}>
                সমস্ত পেমেন্ট লিংক দেখুন
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkGenerator;
