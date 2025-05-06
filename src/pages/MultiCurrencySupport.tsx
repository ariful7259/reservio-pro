
import React, { useState } from 'react';
import { ArrowLeft, Info, RefreshCw, Check, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Currency, currencies, formatCurrency, convertCurrency, formatCurrencyBN } from '@/utils/currencyUtils';
import CurrencySelector from '@/components/CurrencySelector';

const MultiCurrencySupport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('BDT');
  const [defaultCurrency, setDefaultCurrency] = useState<Currency>('BDT');
  const [amount, setAmount] = useState<string>('1000');
  const [tab, setTab] = useState<string>('convert');

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
  };

  const handleSetDefaultCurrency = () => {
    setDefaultCurrency(selectedCurrency);
    toast({
      title: "ডিফল্ট কারেন্সি আপডেট হয়েছে",
      description: `${currencies[selectedCurrency].name} আপনার ডিফল্ট কারেন্সি হিসেবে সেট করা হয়েছে।`,
    });
    // এখানে ইউজার স্টোরেজে কারেন্সি সেভ করা যেতে পারে
    localStorage.setItem('defaultCurrency', selectedCurrency);
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "কপি হয়েছে",
      description: "এক্সচেঞ্জ রেট সফলভাবে কপি করা হয়েছে।",
    });
  };

  const amountValue = parseFloat(amount) || 0;

  return (
    <div className="container px-4 py-20">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">মাল্টি-কারেন্সি সাপোর্ট</h1>
        </div>
        <p className="text-muted-foreground">আপনার পছন্দ অনুযায়ী যেকোনো কারেন্সিতে লেনদেন করুন</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* কারেন্সি সিলেক্টর এবং ইনফরমেশন সেকশন */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>কারেন্সি সিলেক্ট করুন</CardTitle>
              <CardDescription>আপনার পছন্দের কারেন্সি সিলেক্ট করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">কারেন্সি</label>
                <CurrencySelector 
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={handleCurrencySelect}
                  className="w-full"
                />
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">কারেন্সি ইনফরমেশন</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">কারেন্সি নাম:</dt>
                    <dd className="font-medium">{currencies[selectedCurrency].name}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">সিম্বল:</dt>
                    <dd className="font-medium">{currencies[selectedCurrency].symbol}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">এক্সচেঞ্জ রেট:</dt>
                    <dd className="font-medium">১ BDT = {currencies[selectedCurrency].exchangeRate} {selectedCurrency}</dd>
                  </div>
                </dl>
              </div>

              <Button 
                className="w-full"
                onClick={handleSetDefaultCurrency}
                disabled={selectedCurrency === defaultCurrency}
              >
                <Check className="mr-2 h-4 w-4" />
                ডিফল্ট কারেন্সি সেট করুন
              </Button>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>ইনফরমেশন</AlertTitle>
                <AlertDescription>
                  আপনি যে কারেন্সি সিলেক্ট করবেন, সমস্ত লেনদেন সেই কারেন্সিতে দেখানো হবে।
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>সাপোর্টেড কারেন্সি</CardTitle>
              <CardDescription>আমরা বর্তমানে এই কারেন্সিগুলো সাপোর্ট করি</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(currencies).map(([code, info]) => (
                  <Badge key={code} variant={selectedCurrency === code ? "default" : "outline"} className="flex items-center gap-1 p-2">
                    <span>{info.symbol}</span>
                    <span>{code}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* কারেন্সি কনভার্টার এবং গাইড */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="convert">কারেন্সি কনভার্টার</TabsTrigger>
                  <TabsTrigger value="guide">ব্যবহার গাইড</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs value={tab} className="w-full">
                <TabsContent value="convert" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">মূল পরিমাণ (বাংলাদেশী টাকা)</label>
                      <div className="flex items-center mt-1.5">
                        <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0">৳</span>
                        <Input 
                          type="number" 
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center justify-center gap-2"
                      variant="outline"
                      type="button"
                    >
                      <RefreshCw className="h-4 w-4" />
                      রিফ্রেশ রেট
                    </Button>

                    <Card className="border-2 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{formatCurrencyBN(amountValue, 'BDT')} (BDT) রূপান্তরিত হয়েছে:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {Object.entries(currencies).filter(([code]) => code !== 'BDT').map(([code, info]) => {
                            const convertedAmount = convertCurrency(amountValue, code as Currency);
                            return (
                              <div key={code} className="flex justify-between items-center p-2 hover:bg-muted rounded-md">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="p-1">{info.symbol}</Badge>
                                  <span>{info.name}</span>
                                </div>
                                <div className="font-semibold">{formatCurrencyBN(convertedAmount, code as Currency)}</div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    <Alert className="bg-muted">
                      <Globe className="h-4 w-4" />
                      <AlertTitle>রিয়েল টাইম রেট</AlertTitle>
                      <AlertDescription>
                        এক্সচেঞ্জ রেট গ্লোবাল মার্কেট অনুযায়ী পরিবর্তিত হতে পারে। সর্বশেষ হালনাগাদ: আজ, {new Date().toLocaleDateString('bn-BD')}
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
                
                <TabsContent value="guide" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-2">কিভাবে মাল্টি-কারেন্সি ব্যবহার করবেন</h3>
                      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                        <li>প্রথমে আপনার পছন্দের কারেন্সি নির্বাচন করুন</li>
                        <li>ডিফল্ট কারেন্সি সেট করতে "ডিফল্ট কারেন্সি সেট করুন" বাটনে ক্লিক করুন</li>
                        <li>এটি আপনার সমস্ত পেমেন্ট এবং ট্রানজেকশন সেই কারেন্সিতে দেখাবে</li>
                        <li>ট্রানজেকশন হিস্টোরি, পেমেন্ট অপশন ইত্যাদিতে কারেন্সি সেলেক্টর আইকন দেখতে পারবেন</li>
                        <li>যেকোনো লেনদেনের সময় আপনি কারেন্সি পরিবর্তন করতে পারবেন</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-2">কারেন্সি এক্সচেঞ্জ রেট সম্পর্কে জানুন</h3>
                      <p className="text-muted-foreground mb-4">
                        আমাদের এক্সচেঞ্জ রেট গ্লোবাল স্ট্যান্ডার্ড অনুসারে আপডেট করা হয়। আপনি যে কোন লেনদেনের সময় 
                        রিয়েল-টাইম রেট দেখতে পাবেন। 
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(currencies).map(([code, info]) => (
                          <Button 
                            key={code} 
                            variant="outline"
                            className="justify-between"
                            onClick={() => handleCopy(`1 BDT = ${info.exchangeRate} ${code}`)}
                          >
                            <span>১ BDT = {info.exchangeRate} {code}</span>
                            <Badge variant="outline">{info.symbol}</Badge>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>কারেন্সি সেটিংস</CardTitle>
              <CardDescription>আপনার পেমেন্টের জন্য মুদ্রা সম্পর্কিত অপশন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">অটো-কনভার্ট সেটিংস</h4>
                    <p className="text-sm text-muted-foreground">স্বয়ংক্রিয়ভাবে লেনদেনের সময় কারেন্সি কনভার্ট করবে</p>
                  </div>
                  <Button variant="outline">কনফিগার</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">নোটিফিকেশন সেটিংস</h4>
                    <p className="text-sm text-muted-foreground">রেট পরিবর্তন সম্পর্কে নোটিফিকেশন পান</p>
                  </div>
                  <Button variant="outline">সেট করুন</Button>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">হিস্টোরিক্যাল ডাটা</h4>
                    <p className="text-sm text-muted-foreground">গত ৩০ দিনের এক্সচেঞ্জ রেট ট্রেন্ড দেখুন</p>
                  </div>
                  <Button variant="outline">এক্সপ্লোর</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MultiCurrencySupport;
