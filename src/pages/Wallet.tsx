
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet as WalletIcon, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft,
  Plus,
  Minus,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Wallet = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('balance');

  const walletBalance = {
    total: '৮৫,৪৫০',
    available: '৭২,৩২০',
    pending: '১৩,১৩০'
  };

  const transactions = [
    {
      id: 'TXN001',
      type: 'credit',
      amount: '৫,৫০০',
      description: 'পণ্য বিক্রয় - ORD-1001',
      date: '২৫ এপ্রিল ২০২৩',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'debit',
      amount: '২,৩০০',
      description: 'উইথড্র - bKash',
      date: '২৪ এপ্রিল ২০২৩',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'credit',
      amount: '৩,২০০',
      description: 'সার্ভিস ফি - Creative Work',
      date: '২৩ এপ্রিল ২০২৩',
      status: 'pending'
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'bKash',
      number: '০১৭১২-৩৪৫৬৭৮',
      isDefault: true
    },
    {
      id: 2,
      type: 'Nagad',
      number: '০১৮১৫-৯৮৭৬৫৪',
      isDefault: false
    },
    {
      id: 3,
      type: 'Bank Account',
      number: 'DBBL - ****5678',
      isDefault: false
    }
  ];

  const handleAddMoney = () => {
    toast({
      title: "টাকা যোগ করা হয়েছে",
      description: "আপনার ওয়ালেটে টাকা সফলভাবে যোগ হয়েছে"
    });
  };

  const handleWithdraw = () => {
    toast({
      title: "উইথড্র অনুরোধ",
      description: "আপনার উইথড্র অনুরোধ প্রসেস করা হচ্ছে"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <WalletIcon className="h-8 w-8 text-green-600" />
              ওয়ালেট ও ট্রানজেকশন
            </h1>
            <p className="text-muted-foreground">আপনার ব্যালেন্স ও লেনদেনের ইতিহাস দেখুন</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              স্টেটমেন্ট ডাউনলোড
            </Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">মোট ব্যালেন্স</p>
                  <p className="text-2xl font-bold">৳{walletBalance.total}</p>
                </div>
                <WalletIcon className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">উপলব্ধ ব্যালেন্স</p>
                  <p className="text-2xl font-bold">৳{walletBalance.available}</p>
                </div>
                <ArrowDownLeft className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">পেন্ডিং ব্যালেন্স</p>
                  <p className="text-2xl font-bold">৳{walletBalance.pending}</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="balance">ব্যালেন্স</TabsTrigger>
            <TabsTrigger value="transactions">ট্রানজেকশন</TabsTrigger>
            <TabsTrigger value="payment-methods">পেমেন্ট মেথড</TabsTrigger>
          </TabsList>

          <TabsContent value="balance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-green-600" />
                    টাকা যোগ করুন
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">পরিমাণ</label>
                    <Input placeholder="৳ পরিমাণ লিখুন" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">পেমেন্ট মেথড</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>bKash - ০১৭১২-৩৪৫৬৭৮</option>
                      <option>Nagad - ০১৮১৫-৯৮৭৬৫৪</option>
                      <option>Bank Account</option>
                    </select>
                  </div>
                  <Button onClick={handleAddMoney} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    টাকা যোগ করুন
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Minus className="h-5 w-5 text-red-600" />
                    টাকা উত্তোলন
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">পরিমাণ</label>
                    <Input placeholder="৳ পরিমাণ লিখুন" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">উত্তোলন মেথড</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>bKash - ০১৭১২-৩৪৫৬৭৮</option>
                      <option>Nagad - ০১৮১৫-৯৮৭৬৫৪</option>
                      <option>Bank Account</option>
                    </select>
                  </div>
                  <Button onClick={handleWithdraw} variant="outline" className="w-full">
                    <Minus className="h-4 w-4 mr-2" />
                    টাকা উত্তোলন
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    * ন্যূনতম উত্তোলন ৫০০ টাকা
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>ট্রানজেকশন ইতিহাস</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    খুঁজুন
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    ফিল্টার
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? (
                            <ArrowDownLeft className="h-5 w-5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}৳{transaction.amount}
                        </p>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status === 'completed' ? 'সম্পন্ন' : 'অপেক্ষমাণ'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>পেমেন্ট মেথড</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন মেথড যোগ করুন
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{method.type}</p>
                          <p className="text-sm text-muted-foreground">{method.number}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {method.isDefault && (
                          <Badge variant="default">ডিফল্ট</Badge>
                        )}
                        <Button variant="outline" size="sm">
                          এডিট
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
