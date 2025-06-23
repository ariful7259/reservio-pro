
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const CreatorEarningsTab = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const earningsData = {
    total: '৳৪৫,৮৯০',
    thisMonth: '৳১২,৫৬০',
    pending: '৳৩,২৪০',
    available: '৳৪২,৬৫০'
  };

  const transactions = [
    {
      id: 'TXN001',
      type: 'payment_received',
      amount: '৳২,৫০০',
      client: 'আহমেদ হাসান',
      service: 'লোগো ডিজাইন',
      date: '২৫ ডিসেম্বর',
      status: 'completed'
    },
    {
      id: 'TXN002', 
      type: 'withdrawal',
      amount: '৳১০,০০০',
      method: 'bKash',
      date: '২৩ ডিসেম্বর',
      status: 'processing'
    },
    {
      id: 'TXN003',
      type: 'payment_received',
      amount: '৳৫,০০০',
      client: 'ফাতিমা খাতুন',
      service: 'ওয়েবসাইট ডিজাইন',
      date: '২০ ডিসেম্বর',
      status: 'completed'
    }
  ];

  const withdrawalMethods = [
    { id: 'bkash', name: 'bKash', account: '০১৭xxxxxxxx', verified: true },
    { id: 'nagad', name: 'Nagad', account: '০১৮xxxxxxxx', verified: true },
    { id: 'bank', name: 'Bank Account', account: 'ACC-xxxxxxx', verified: false }
  ];

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট আয়</p>
                <p className="text-2xl font-bold">{earningsData.total}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">এই মাসের আয়</p>
                <p className="text-2xl font-bold">{earningsData.thisMonth}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং</p>
                <p className="text-2xl font-bold">{earningsData.pending}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">উত্তোলনযোগ্য</p>
                <p className="text-2xl font-bold">{earningsData.available}</p>
              </div>
              <Wallet className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">লেনদেনের ইতিহাস</TabsTrigger>
          <TabsTrigger value="withdrawal">টাকা উত্তোলন</TabsTrigger>
          <TabsTrigger value="analytics">বিশ্লেষণ</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                রিপোর্ট ডাউনলোড
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'payment_received' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {transaction.type === 'payment_received' ? 
                          <ArrowDownRight className="h-5 w-5 text-green-600" /> :
                          <ArrowUpRight className="h-5 w-5 text-blue-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'payment_received' ? 'পেমেন্ট গ্রহণ' : 'টাকা উত্তোলন'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.client || transaction.method} • {transaction.date}
                        </p>
                        {transaction.service && (
                          <p className="text-xs text-muted-foreground">{transaction.service}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{transaction.amount}</p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status === 'completed' ? 'সম্পন্ন' : 'প্রক্রিয়াধীন'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>টাকা উত্তোলন করুন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">পরিমাণ</label>
                  <input 
                    type="number" 
                    className="w-full mt-1 p-2 border rounded-lg" 
                    placeholder="৳ পরিমাণ লিখুন"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">উত্তোলনের মাধ্যম</label>
                  <div className="space-y-2 mt-2">
                    {withdrawalMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.account}</p>
                          </div>
                        </div>
                        <Badge variant={method.verified ? 'default' : 'secondary'}>
                          {method.verified ? 'যাচাইকৃত' : 'অযাচাইকৃত'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full">
                  উত্তোলনের অনুরোধ করুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>উত্তোলনের নিয়মাবলী</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>সর্বনিম্ন উত্তোলনের পরিমাণ ৳৫০০</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>উত্তোলনে ২-৫% চার্জ প্রযোজ্য</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>প্রক্রিয়াকরণে ২-৪৮ ঘণ্টা সময় লাগতে পারে</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>যাচাইকৃত অ্যাকাউন্টে দ্রুত পেমেন্ট</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>আয়ের বিশ্লেষণ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">বিস্তারিত চার্ট আসছে শীঘ্রই</h3>
                <p className="text-muted-foreground">আপনার আয়ের বিস্তারিত বিশ্লেষণ দেখতে পাবেন</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorEarningsTab;
