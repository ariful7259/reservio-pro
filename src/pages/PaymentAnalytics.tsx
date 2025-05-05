
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, ArrowDownLeft, Filter, Search, Download, 
  LineChart, PieChart, BarChart, ChevronRight, 
  DollarSign, Users, TrendingUp, ArrowUp, ArrowDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrencyBN } from '@/utils/currencyUtils';
import TransactionItem from '@/components/TransactionItem';
import CurrencySelector from '@/components/CurrencySelector';

const PaymentAnalytics = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedCurrency, setSelectedCurrency] = useState<'BDT' | 'USD' | 'EUR' | 'INR' | 'GBP'>('BDT');
  const [dateRange, setDateRange] = useState<string>('30d');
  
  // Mock transaction data
  const transactions = [
    {
      id: 'TX1234',
      title: 'কার সার্ভিসিং',
      amount: 2500,
      type: 'debit' as const,
      category: 'service' as const,
      date: '২০২৫-০৫-০৪'
    },
    {
      id: 'TX1235',
      title: 'ফ্লোর পেইন্টিং',
      amount: 3200,
      type: 'credit' as const,
      category: 'service' as const,
      date: '২০২৫-০৫-০২'
    },
    {
      id: 'TX1236',
      title: 'ফ্রিজ রিপেয়ারিং',
      amount: 1200,
      type: 'credit' as const,
      category: 'service' as const,
      date: '২০২৫-০৪-২৮'
    },
    {
      id: 'TX1237',
      title: 'ঘড়ি খরিদ',
      amount: 850,
      type: 'debit' as const,
      category: 'shopping' as const,
      date: '২০২৫-০৪-২৫'
    },
    {
      id: 'TX1238',
      title: 'ডক্টর অ্যাপয়েন্টমেন্ট',
      amount: 1500,
      type: 'debit' as const,
      category: 'appointment' as const,
      date: '২০২৫-০৪-২০'
    }
  ];
  
  const renderDateRangeText = () => {
    switch(dateRange) {
      case '7d': return 'গত ৭ দিন';
      case '30d': return 'গত ৩০ দিন';
      case '90d': return 'গত ৩ মাস';
      case '1y': return 'গত ১ বছর';
      default: return 'গত ৩০ দিন';
    }
  };
  
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">পেমেন্ট এনালিটিক্স</h1>
          <p className="text-muted-foreground">আপনার সকল লেনদেন এবং পেমেন্ট ট্র্যাক করুন</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">গত ৭ দিন</SelectItem>
              <SelectItem value="30d">গত ৩০ দিন</SelectItem>
              <SelectItem value="90d">গত ৩ মাস</SelectItem>
              <SelectItem value="1y">গত ১ বছর</SelectItem>
            </SelectContent>
          </Select>
          
          <CurrencySelector 
            selectedCurrency={selectedCurrency}
            onCurrencyChange={(val) => setSelectedCurrency(val)}
          />
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full mb-6 grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
          <TabsTrigger value="transactions">ট্রানজেকশন</TabsTrigger>
          <TabsTrigger value="analytics">এনালিটিক্স</TabsTrigger>
          <TabsTrigger value="payouts">পেআউট</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-md bg-green-100 flex items-center justify-center">
                    <ArrowDownLeft className="h-6 w-6 text-green-600" />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <ArrowUp className="h-3 w-3 mr-1" /> +১২%
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">মোট আয়</p>
                <h3 className="text-2xl font-bold">{formatCurrencyBN(56250, selectedCurrency)}</h3>
                <p className="text-xs text-muted-foreground mt-1">{renderDateRangeText()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-md bg-red-100 flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-red-600" />
                  </div>
                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                    <ArrowDown className="h-3 w-3 mr-1" /> -৫%
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">মোট ব্যয়</p>
                <h3 className="text-2xl font-bold">{formatCurrencyBN(24680, selectedCurrency)}</h3>
                <p className="text-xs text-muted-foreground mt-1">{renderDateRangeText()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <ArrowUp className="h-3 w-3 mr-1" /> +২১%
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">নেট ব্যালেন্স</p>
                <h3 className="text-2xl font-bold">{formatCurrencyBN(31570, selectedCurrency)}</h3>
                <p className="text-xs text-muted-foreground mt-1">{renderDateRangeText()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-md bg-purple-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    <ArrowUp className="h-3 w-3 mr-1" /> +৮%
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">লেনদেনকারী</p>
                <h3 className="text-2xl font-bold">১৮ জন</h3>
                <p className="text-xs text-muted-foreground mt-1">{renderDateRangeText()}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
                  <CardDescription>আপনার সাম্প্রতিক লেনদেন দেখুন</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedTab('transactions')}>
                  সব দেখুন
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {transactions.slice(0, 3).map((transaction) => (
                    <TransactionItem 
                      key={transaction.id}
                      id={transaction.id}
                      title={transaction.title}
                      amount={transaction.amount}
                      type={transaction.type}
                      category={transaction.category}
                      date={transaction.date}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>পেমেন্টের ধরন</CardTitle>
                <CardDescription>বিভিন্ন ধরনের পেমেন্টের বিতরণ</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex items-center justify-center py-8">
                  <PieChart className="h-32 w-32 text-muted-foreground" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-sm">সার্ভিস পেমেন্ট</span>
                    </div>
                    <span className="text-sm font-medium">৬৫%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">রেন্টাল পেমেন্ট</span>
                    </div>
                    <span className="text-sm font-medium">২০%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">প্রোডাক্ট পারচেস</span>
                    </div>
                    <span className="text-sm font-medium">১৫%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>সাপ্তাহিক লেনদেন</CardTitle>
                <CardDescription>সাপ্তাহিক আয় ও ব্যয়ের তুলনা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-8">
                  <BarChart className="h-60 w-full text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>মাসিক ট্রেন্ড</CardTitle>
                <CardDescription>মাসিক আয়ের ট্রেন্ড</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-8">
                  <LineChart className="h-60 w-full text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>ফিল্টার</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="ট্রানজেকশন সার্চ করুন" 
                    className="pl-8"
                  />
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="সব ট্রানজেকশন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ট্রানজেকশন</SelectItem>
                    <SelectItem value="incoming">আমদানি</SelectItem>
                    <SelectItem value="outgoing">বহির্গমন</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Input 
                    type="date" 
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>সমস্ত লেনদেন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {transactions.map((transaction) => (
                  <TransactionItem 
                    key={transaction.id}
                    id={transaction.id}
                    title={transaction.title}
                    amount={transaction.amount}
                    type={transaction.type}
                    category={transaction.category}
                    date={transaction.date}
                  />
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/payment/transaction-history')}
                >
                  আরও দেখুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card className="col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>গ্রাফিকাল এনালিটিক্স</CardTitle>
              <CardDescription>বিস্তারিত গ্রাফ এবং চার্ট</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <LineChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">বিস্তারিত এনালিটিক্স শীঘ্রই আসছে!</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">মোট লেনদেন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৩৪</div>
                <p className="text-muted-foreground text-sm">গত মাসে ২৮ (↑ ২১%)</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">গড় লেনদেন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrencyBN(1650, selectedCurrency)}</div>
                <p className="text-muted-foreground text-sm">গত মাসে {formatCurrencyBN(1420, selectedCurrency)} (↑ ১৬%)</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">রিফান্ড</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrencyBN(2400, selectedCurrency)}</div>
                <p className="text-muted-foreground text-sm">মোট আয়ের ৪.২%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">গ্রোথ রেট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">↑ ১৮.৫%</div>
                <p className="text-muted-foreground text-sm">গত মাসে ১২.৩%</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="payouts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>আমার ব্যালেন্স</CardTitle>
                <CardDescription>সাম্প্রতিক ব্যালেন্স এবং পেন্ডিং উইথড্র</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium leading-none">বর্তমান ব্যালেন্স</p>
                      <p className="text-xs text-muted-foreground">উইথড্র করার জন্য উপলব্ধ</p>
                    </div>
                    <p className="text-2xl font-bold">{formatCurrencyBN(12850, selectedCurrency)}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium leading-none">পেন্ডিং পেআউট</p>
                      <p className="text-xs text-muted-foreground">প্রসেসিং অধীনে</p>
                    </div>
                    <p className="text-lg font-medium">{formatCurrencyBN(5000, selectedCurrency)}</p>
                  </div>
                </div>
                
                <Button className="w-full">
                  <DollarSign className="h-4 w-4 mr-2" />
                  নতুন পেআউট রিকোয়েস্ট
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>সাম্প্রতিক পেআউট</CardTitle>
                <CardDescription>আপনার সাম্প্রতিক পেআউট স্ট্যাটাস</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">PO-7845</p>
                      <p className="text-xs text-muted-foreground">২০২৫-০৫-০২</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrencyBN(5000, selectedCurrency)}</p>
                      <Badge className="bg-blue-500">প্রসেসিং</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">PO-7832</p>
                      <p className="text-xs text-muted-foreground">২০২৫-০৪-২২</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrencyBN(7500, selectedCurrency)}</p>
                      <Badge className="bg-green-500">সম্পন্ন</Badge>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">PO-7821</p>
                      <p className="text-xs text-muted-foreground">২০২৫-০৪-১২</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrencyBN(10000, selectedCurrency)}</p>
                      <Badge className="bg-green-500">সম্পন্ন</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  সমস্ত পেআউট দেখুন
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>পেআউট মেথড</CardTitle>
                <CardDescription>আপনার ডিফল্ট পেআউট মেথড এবং অপশন</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">ডিফল্ট মেথড</h3>
                      <Badge className="bg-green-100 text-green-800 border-green-200">অ্যাকটিভ</Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">বিকাশ</p>
                      <p className="text-muted-foreground">01712-345678</p>
                      <p className="text-muted-foreground">Personal</p>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">অন্যান্য মেথড</h3>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">ব্যাংক অ্যাকাউন্ট</p>
                      <p className="text-muted-foreground">ডাচ-বাংলা ব্যাংক</p>
                      <p className="text-muted-foreground">******6789</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  পেআউট মেথড ম্যানেজ করুন
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentAnalytics;
