
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

const CreatorDashboard = () => {
  const [walletData] = useState({
    total: 25000,
    pending: 8000,
    hold: 3000,
    released: 14000
  });

  const [transactions] = useState([
    {
      id: 'TXN001',
      service: 'লোগো ডিজাইন',
      buyer: 'রহিম আহমেদ',
      amount: 5000,
      status: 'completed',
      date: '২৮ নভেম্বর, ২০২৪',
      escrowStatus: 'released'
    },
    {
      id: 'TXN002',
      service: 'ওয়েবসাইট ডেভেলপমেন্ট',
      buyer: 'করিম উদ্দিন',
      amount: 15000,
      status: 'in_progress',
      date: '২৫ নভেম্বর, ২০২৪',
      escrowStatus: 'holding'
    },
    {
      id: 'TXN003',
      service: 'ভিডিও এডিটিং',
      buyer: 'ফাতেমা খান',
      amount: 3000,
      status: 'disputed',
      date: '২০ নভেম্বর, ২০২৪',
      escrowStatus: 'dispute'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">চলমান</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800">বিরোধ</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getEscrowStatusBadge = (status: string) => {
    switch (status) {
      case 'released':
        return <Badge className="bg-green-100 text-green-800">মুক্ত</Badge>;
      case 'holding':
        return <Badge className="bg-yellow-100 text-yellow-800">আটকে</Badge>;
      case 'dispute':
        return <Badge className="bg-red-100 text-red-800">বিরোধ</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট আয়</p>
                <p className="text-xl font-bold">৳{walletData.total.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং</p>
                <p className="text-xl font-bold">৳{walletData.pending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">হোল্ড</p>
                <p className="text-xl font-bold">৳{walletData.hold.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">উত্তোলনযোগ্য</p>
                <p className="text-xl font-bold">৳{walletData.released.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">লেনদেন</TabsTrigger>
          <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                রিফ্রেশ
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{transaction.service}</h4>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          ক্রেতা: {transaction.buyer} • {transaction.date}
                        </p>
                        <p className="text-sm">আইডি: {transaction.id}</p>
                      </div>
                      <div className="flex flex-col lg:items-end gap-2">
                        <p className="text-lg font-bold">৳{transaction.amount.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Escrow:</span>
                          {getEscrowStatusBadge(transaction.escrowStatus)}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                আয়ের পরিসংখ্যান
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>অ্যানালিটিক্স চার্ট এখানে দেখানো হবে</p>
                <p className="text-sm">আয়ের ট্রেন্ড, সেরা সার্ভিস, এবং কাস্টমার ইনসাইট</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>KYC ভেরিফিকেশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>পরিচয়পত্র ভেরিফিকেশন</span>
                  <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>ফেস ভেরিফিকেশন</span>
                  <Badge className="bg-yellow-100 text-yellow-800">পেন্ডিং</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>ব্যাংক অ্যাকাউন্ট</span>
                  <Badge className="bg-red-100 text-red-800">প্রয়োজন</Badge>
                </div>
                <Button className="w-full">KYC সম্পন্ন করুন</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>উত্তোলনের সেটিংস</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ন্যূনতম উত্তোলনের পরিমাণ</label>
                  <p className="text-2xl font-bold">৳১,০০০</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">উত্তোলনের ফি</label>
                  <p className="text-lg">২.৫%</p>
                </div>
                <Button className="w-full" disabled={walletData.released < 1000}>
                  {walletData.released >= 1000 ? 'টাকা উত্তোলন করুন' : 'উত্তোলনযোগ্য পরিমাণ কম'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;
