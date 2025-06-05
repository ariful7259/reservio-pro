
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Users, DollarSign, Shield, AlertTriangle, TrendingUp, 
  UserCheck, Clock, Settings, BarChart3, FileText,
  Eye, CheckCircle, XCircle, Search, Filter,
  Download, Upload, Calendar, CreditCard
} from 'lucide-react';

const SecurePayAdmin = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const adminStats = [
    {
      title: 'মোট ব্যবহারকারী',
      value: '১,২৮৫',
      change: '+১৫%',
      icon: <Users className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'মোট ট্রানজেকশন',
      value: '৳২,৮৫,৬৭০',
      change: '+২৩%',
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'সক্রিয় এসক্রো',
      value: '৳৪৫,২০০',
      change: '+৮%',
      icon: <Shield className="h-5 w-5 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'পেন্ডিং বিরোধ',
      value: '৭',
      change: '-১২%',
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const pendingKyc = [
    {
      id: '1',
      name: 'আহমেদ হাসান',
      email: 'ahmed@email.com',
      type: 'ক্রিয়েটর',
      submitted: '২৫ নভেম্বর, ২০২৪',
      documents: ['NID', 'Bank Statement']
    },
    {
      id: '2',
      name: 'ফাতেমা খান',
      email: 'fatema@email.com',
      type: 'বায়ার',
      submitted: '২৪ নভেম্বর, ২০২৪',
      documents: ['NID']
    }
  ];

  const recentTransactions = [
    {
      id: 'TXN001',
      from: 'করিম উদ্দিন',
      to: 'ডিজাইন এক্সপার্ট',
      amount: '৳৫,০০০',
      status: 'completed',
      date: '২৫ নভেম্বর, ২০২৪'
    },
    {
      id: 'TXN002',
      from: 'রাশিদা বেগম',
      to: 'ওয়েব মাস্টার',
      amount: '৳১২,০০০',
      status: 'escrow',
      date: '২৪ নভেম্বর, ২০২৪'
    },
    {
      id: 'TXN003',
      from: 'সালিম খান',
      to: 'ভিডিও প্রো',
      amount: '৳৮,০০০',
      status: 'disputed',
      date: '২৩ নভেম্বর, ২০২৪'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'escrow':
        return <Badge className="bg-purple-100 text-purple-800">এসক্রোতে</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800">বিরোধ</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">পেন্ডিং</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-red-600" />
            অ্যাডমিন প্যানেল
          </h1>
          <p className="text-muted-foreground mt-2">
            সিস্টেম মনিটরিং এবং ব্যবস্থাপনা
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট ডাউনলোড
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-2" />
            সিস্টেম সেটিংস
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {adminStats.map((stat, index) => (
          <Card key={index} className={`${stat.color} transition-all hover:shadow-md`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.change} গত মাস থেকে</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1 h-auto p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 px-4 py-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">ওভারভিউ</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 px-4 py-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">ব্যবহারকারী</span>
          </TabsTrigger>
          <TabsTrigger value="kyc" className="flex items-center gap-2 px-4 py-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">KYC</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2 px-4 py-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">ট্রানজেকশন</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 px-4 py-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">সেটিংস</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>মাসিক রেভিনিউ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mb-4" />
                  <div className="text-center">
                    <p>রেভিনিউ চার্ট এখানে দেখানো হবে</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>দ্রুত অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  KYC অনুমোদন ({pendingKyc.length})
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  বিরোধ সমাধান (৭)
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  মাসিক রিপোর্ট তৈরি করুন
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  সিস্টেম কনফিগারেশন
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক কার্যকলাপ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{transaction.from} → {transaction.to}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{transaction.amount}</p>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>ব্যবহারকারী ব্যবস্থাপনা</CardTitle>
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
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">ব্যবহারকারী তালিকা</h3>
                <p className="text-muted-foreground mb-4">
                  এখানে সব ব্যবহারকারীর তালিকা দেখানো হবে
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Tab */}
        <TabsContent value="kyc" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>KYC যাচাইকরণ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingKyc.map((kyc) => (
                  <div key={kyc.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{kyc.name}</h4>
                          <Badge variant="outline">{kyc.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>ইমেইল: {kyc.email}</p>
                          <p>জমা দেওয়া: {kyc.submitted}</p>
                          <p>ডকুমেন্ট: {kyc.documents.join(', ')}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          দেখুন
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          অনুমোদন
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          প্রত্যাখ্যান
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>ট্রানজেকশন মনিটরিং</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                এক্সপোর্ট
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{transaction.id}</span>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {transaction.from} → {transaction.to}
                        </p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold">{transaction.amount}</p>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          বিস্তারিত
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>সিস্টেম কনফিগারেশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">সিস্টেম সেটিংস এখানে থাকবে</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট কনফিগারেশন</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">পেমেন্ট সেটিংস এখানে থাকবে</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurePayAdmin;
