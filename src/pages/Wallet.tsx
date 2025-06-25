import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet as WalletIcon, 
  CreditCard, 
  Send, 
  ArrowDownToLine, 
  History, 
  QrCode, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Eye,
  EyeOff,
  Shield,
  Settings
} from 'lucide-react';

const Wallet = () => {
  const [balanceVisible, setBalanceVisible] = useState(true);
  
  const walletBalance = 15750;
  const transactions = [
    {
      id: 1,
      type: 'received',
      amount: 2500,
      description: 'ডিজিটাল প্রোডাক্ট বিক্রয়',
      date: '২ ঘন্টা আগে',
      status: 'completed'
    },
    {
      id: 2,
      type: 'sent',
      amount: 800,
      description: 'রেন্ট পেমেন্ট',
      date: '৫ ঘন্টা আগে',
      status: 'completed'
    },
    {
      id: 3,
      type: 'received',
      amount: 1200,
      description: 'সার্ভিস ফি',
      date: '১ দিন আগে',
      status: 'pending'
    }
  ];

  const quickActions = [
    {
      title: 'টাকা পাঠান',
      icon: <Send className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'টাকা নিন',
      icon: <ArrowDownToLine className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'QR কোড',
      icon: <QrCode className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'টাকা যোগ করুন',
      icon: <Plus className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="container px-4 pt-20 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">আমার ওয়ালেট</h1>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      <Card className="mb-6 bg-gradient-to-r from-primary to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <WalletIcon className="h-6 w-6" />
              <span className="text-sm opacity-90">মোট ব্যালেন্স</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => setBalanceVisible(!balanceVisible)}
            >
              {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-bold">
              {balanceVisible ? `৳ ${walletBalance.toLocaleString()}` : '৳ ••••••'}
            </h2>
            <p className="text-sm opacity-75">বাংলাদেশী টাকা</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Shield className="h-3 w-3 mr-1" />
              সুরক্ষিত
            </Badge>
            <span className="text-xs opacity-75">শেষ আপডেট: এখনই</span>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">দ্রুত কাজ</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full ${action.color} mb-3`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium">{action.title}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">আজকের আয়</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৳ ৩,৭০০</span>
              <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                <TrendingUp className="h-3 w-3 mr-1" />
                +১২%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">এই মাসের খরচ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৳ ১২,৪০০</span>
              <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                <TrendingDown className="h-3 w-3 mr-1" />
                +৮%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">পেন্ডিং</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">৳ ১,২০০</span>
              <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                ৩ টি
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>সাম্প্রতিক লেনদেন</CardTitle>
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              সব দেখুন
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'received' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {transaction.type === 'received' 
                      ? <TrendingUp className="h-4 w-4" />
                      : <TrendingDown className="h-4 w-4" />
                    }
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'received' ? '+' : '-'}৳ {transaction.amount.toLocaleString()}
                  </p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {transaction.status === 'completed' ? 'সম্পন্ন' : 'অপেক্ষমাণ'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Wallet;
