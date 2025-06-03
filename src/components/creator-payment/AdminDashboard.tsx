
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Users, 
  DollarSign, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Ban,
  UserCheck,
  Search,
  Download,
  Eye,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAction, setSelectedAction] = useState('');

  const adminStats = {
    totalUsers: 2547,
    activeCreators: 1234,
    activeBuyers: 1313,
    totalTransactions: 15478,
    totalVolume: 2547000,
    pendingDisputes: 12,
    kycPending: 45,
    flaggedUsers: 8
  };

  const transactions = [
    {
      id: 'TXN001234',
      orderId: 'ORD001234',
      buyer: 'আহমেদ হাসান',
      seller: 'ফারহান আহমেদ',
      service: 'ওয়েব ডিজাইন',
      amount: 15000,
      status: 'completed',
      escrowStatus: 'released',
      date: '২৮ নভেম্বর, ২০২৪',
      paymentMethod: 'bkash',
      flags: []
    },
    {
      id: 'TXN001235',
      orderId: 'ORD001235',
      buyer: 'ফাতেমা খান',
      seller: 'রিফাত হোসেন',
      service: 'লোগো ডিজাইন',
      amount: 3000,
      status: 'disputed',
      escrowStatus: 'holding',
      date: '২৭ নভেম্বর, ২০২৪',
      paymentMethod: 'nagad',
      flags: ['dispute']
    },
    {
      id: 'TXN001236',
      orderId: 'ORD001236',
      buyer: 'করিম উদ্দিন',
      seller: 'সাবিনা আক্তার',
      service: 'কন্টেন্ট রাইটিং',
      amount: 2500,
      status: 'processing',
      escrowStatus: 'holding',
      date: '২৬ নভেম্বর, ২০২৪',
      paymentMethod: 'rocket',
      flags: []
    }
  ];

  const flaggedUsers = [
    {
      id: 'user_12345',
      name: 'সন্দেহজনক ইউজার',
      email: 'suspicious@email.com',
      type: 'buyer',
      reason: 'একই IP থেকে একাধিক অ্যাকাউন্ট',
      riskScore: 85,
      flaggedAt: '২৮ নভেম্বর, ২০২৪',
      status: 'investigating'
    },
    {
      id: 'user_67890',
      name: 'দ্রুত অর্ডার দাতা',
      email: 'rapid@orders.com',
      type: 'buyer',
      reason: 'অস্বাভাবিক দ্রুত লেনদেন',
      riskScore: 75,
      flaggedAt: '২৭ নভেম্বর, ২০২৪',
      status: 'blocked'
    }
  ];

  const withdrawalRequests = [
    {
      id: 'WTD001',
      userId: 'user_11111',
      userName: 'রাশিদা বেগম',
      amount: 25000,
      method: 'bank_transfer',
      bankDetails: 'Dutch Bangla Bank - AC: 1234567890',
      requestedAt: '২৮ নভেম্বর, ২০২৪',
      status: 'pending',
      kycStatus: 'verified'
    },
    {
      id: 'WTD002',
      userId: 'user_22222',
      userName: 'মাহমুদ আলী',
      amount: 15000,
      method: 'bkash',
      bankDetails: '01712345678',
      requestedAt: '২৭ নভেম্বর, ২০২৪',
      status: 'approved',
      kycStatus: 'verified'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">প্রক্রিয়াধীন</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800">বিরোধ</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমাণ</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">অনুমোদিত</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">ব্লকড</Badge>;
      case 'investigating':
        return <Badge className="bg-orange-100 text-orange-800">তদন্তাধীন</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    toast({
      title: "অ্যাকশন সফল",
      description: `ইউজার ${userId} এর জন্য ${action} সম্পন্ন হয়েছে`,
    });
  };

  const handleWithdrawalAction = (action: string, withdrawalId: string) => {
    toast({
      title: "উত্তোলন অ্যাকশন",
      description: `উত্তোলন ${withdrawalId} এর জন্য ${action} সম্পন্ন হয়েছে`,
    });
  };

  const handleTransactionAction = (action: string, transactionId: string) => {
    toast({
      title: "ট্রানজেকশন অ্যাকশন",
      description: `ট্রানজেকশন ${transactionId} এর জন্য ${action} সম্পন্ন হয়েছে`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Settings className="h-6 w-6" />
          অ্যাডমিন ড্যাশবোর্ড
        </h2>
        <p className="text-muted-foreground">
          সিস্টেম পরিচালনা, ইউজার ব্যবস্থাপনা এবং লেনদেন তদারকি
        </p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-blue-600">{adminStats.totalUsers}</p>
            <p className="text-xs text-muted-foreground">মোট ইউজার</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-green-600">{adminStats.activeCreators}</p>
            <p className="text-xs text-muted-foreground">Creator</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-purple-600">{adminStats.activeBuyers}</p>
            <p className="text-xs text-muted-foreground">Buyer</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-orange-600">{adminStats.totalTransactions}</p>
            <p className="text-xs text-muted-foreground">লেনদেন</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-lg font-bold text-teal-600">৳{(adminStats.totalVolume / 1000)}K</p>
            <p className="text-xs text-muted-foreground">মোট ভলিউম</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-red-600">{adminStats.pendingDisputes}</p>
            <p className="text-xs text-muted-foreground">বিরোধ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-yellow-600">{adminStats.kycPending}</p>
            <p className="text-xs text-muted-foreground">KYC</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xl font-bold text-red-600">{adminStats.flaggedUsers}</p>
            <p className="text-xs text-muted-foreground">ফ্ল্যাগড</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>লেনদেন খুঁজুন ও ফিল্টার করুন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ট্রানজেকশন ID, ইউজার নাম, বা ইমেইল..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব</SelectItem>
                <SelectItem value="completed">সম্পন্ন</SelectItem>
                <SelectItem value="processing">প্রক্রিয়াধীন</SelectItem>
                <SelectItem value="disputed">বিরোধ</SelectItem>
                <SelectItem value="pending">অপেক্ষমাণ</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              রিপোর্ট ডাউনলোড
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              সাম্প্রতিক লেনদেন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{transaction.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.buyer} → {transaction.seller}
                      </p>
                      <p className="text-xs text-muted-foreground">{transaction.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">৳{transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {getStatusBadge(transaction.status)}
                      <Badge variant="outline" className="text-xs">
                        {transaction.escrowStatus === 'holding' ? 'হোল্ড' : 'রিলিজড'}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      {transaction.status === 'disputed' && (
                        <Button 
                          size="sm" 
                          onClick={() => handleTransactionAction('রিভিউ', transaction.id)}
                        >
                          রিভিউ
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Flagged Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              ফ্ল্যাগড ইউজার
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {flaggedUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">{user.riskScore}%</p>
                      <p className="text-xs text-muted-foreground">ঝুঁকি</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {getStatusBadge(user.status)}
                      <Badge variant="outline" className="text-xs">
                        {user.type === 'buyer' ? 'ক্রেতা' : 'বিক্রেতা'}
                      </Badge>
                    </div>
                    <div className="flex gap-1">
                      {user.status === 'investigating' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleUserAction('ব্লক', user.id)}
                          >
                            <Ban className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleUserAction('ক্লিয়ার', user.id)}
                          >
                            <CheckCircle2 className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            উত্তোলনের অনুরোধ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {withdrawalRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.userName}</p>
                      {getStatusBadge(request.status)}
                      <Badge variant="outline" className="text-xs">
                        {request.kycStatus === 'verified' ? 'KYC ✓' : 'KYC ✗'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {request.method === 'bank_transfer' ? 'ব্যাংক ট্রান্সফার' : 'মোবাইল ব্যাংকিং'}
                    </p>
                    <p className="text-xs text-muted-foreground">{request.bankDetails}</p>
                    <p className="text-xs text-muted-foreground">অনুরোধ: {request.requestedAt}</p>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <p className="text-xl font-bold">৳{request.amount.toLocaleString()}</p>
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleWithdrawalAction('অনুমোদন', request.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          অনুমোদন
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleWithdrawalAction('বাতিল', request.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          বাতিল
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>দ্রুত অ্যাডমিন অ্যাকশন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              ইউজার ম্যানেজমেন্ট
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              নিরাপত্তা সেটিংস
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              পেমেন্ট সেটিংস
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              সিস্টেম রিপোর্ট
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
