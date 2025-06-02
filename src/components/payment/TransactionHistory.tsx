
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  RefreshCw,
  Calendar,
  CreditCard,
  Smartphone,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

interface Transaction {
  id: string;
  amount: string;
  type: string;
  method: string;
  status: 'সফল' | 'ব্যর্থ' | 'অপেক্ষমাণ' | 'ফেরত';
  customer: string;
  reference: string;
  date: string;
  time: string;
}

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      amount: '৳২,৫০০',
      type: 'পেমেন্ট',
      method: 'বিকাশ',
      status: 'সফল',
      customer: 'আহমেদ হোসেন',
      reference: 'BKS240115001',
      date: '১৫ জানুয়ারি, ২০২৪',
      time: '২:৩০ PM'
    },
    {
      id: 'TXN002',
      amount: '৳১,২০০',
      type: 'পেমেন্ট',
      method: 'নগদ',
      status: 'সফল',
      customer: 'ফাতেমা খাতুন',
      reference: 'NGD240115002',
      date: '১৫ জানুয়ারি, ২০২৪',
      time: '১:১৫ PM'
    },
    {
      id: 'TXN003',
      amount: '৳৮০০',
      type: 'রিফান্ড',
      method: 'কার্ড',
      status: 'ফেরত',
      customer: 'করিম উদ্দিন',
      reference: 'CRD240115003',
      date: '১৫ জানুয়ারি, ২০২৪',
      time: '১২:৪৫ PM'
    },
    {
      id: 'TXN004',
      amount: '৳৩,৮০০',
      type: 'পেমেন্ট',
      method: 'রকেট',
      status: 'অপেক্ষমাণ',
      customer: 'রাশিদা বেগম',
      reference: 'RKT240115004',
      date: '১৫ জানুয়ারি, ২০২৪',
      time: '১১:২০ AM'
    },
    {
      id: 'TXN005',
      amount: '৳১,৫০০',
      type: 'পেমেন্ট',
      method: 'বিকাশ',
      status: 'ব্যর্থ',
      customer: 'নাসির আহমাদ',
      reference: 'BKS240115005',
      date: '১৫ জানুয়ারি, ২০২৪',
      time: '১০:১০ AM'
    },
    {
      id: 'TXN006',
      amount: '৳৪,২০০',
      type: 'পেমেন্ট',
      method: 'কার্ড',
      status: 'সফল',
      customer: 'সালমা আক্তার',
      reference: 'CRD240114006',
      date: '১৪ জানুয়ারি, ২০২৪',
      time: '৪:৫০ PM'
    },
    {
      id: 'TXN007',
      amount: '৳৯৫০',
      type: 'পেমেন্ট',
      method: 'নগদ',
      status: 'সফল',
      customer: 'রফিক হাসান',
      reference: 'NGD240114007',
      date: '১৪ জানুয়ারি, ২০২৪',
      time: '৩:২৫ PM'
    },
    {
      id: 'TXN008',
      amount: '৳২,৮০০',
      type: 'পেমেন্ট',
      method: 'বিকাশ',
      status: 'সফল',
      customer: 'মারিয়া রহমান',
      reference: 'BKS240114008',
      date: '১৪ জানুয়ারি, ২০২৪',
      time: '১:৪০ PM'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'সফল':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'ব্যর্থ':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'অপেক্ষমাণ':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'ফেরত':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'সফল':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ব্যর্থ':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'অপেক্ষমাণ':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ফেরত':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'কার্ড':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || transaction.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const exportTransactions = () => {
    // Implement export functionality
    console.log('Exporting transactions...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <History className="h-6 w-6 text-primary" />
            লেনদেনের ইতিহাস
          </h2>
          <p className="text-muted-foreground">
            সকল পেমেন্ট ট্রানজেকশনের বিস্তারিত দেখুন
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" onClick={exportTransactions}>
            <Download className="h-4 w-4 mr-2" />
            এক্সপোর্ট
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            ফিল্টার এবং সার্চ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="গ্রাহক, রেফারেন্স বা ID সার্চ করুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="সফল">সফল</SelectItem>
                <SelectItem value="ব্যর্থ">ব্যর্থ</SelectItem>
                <SelectItem value="অপেক্ষমাণ">অপেক্ষমাণ</SelectItem>
                <SelectItem value="ফেরত">ফেরত</SelectItem>
              </SelectContent>
            </Select>

            {/* Method Filter */}
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger>
                <SelectValue placeholder="পেমেন্ট মেথড" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব মেথড</SelectItem>
                <SelectItem value="বিকাশ">বিকাশ</SelectItem>
                <SelectItem value="নগদ">নগদ</SelectItem>
                <SelectItem value="রকেট">রকেট</SelectItem>
                <SelectItem value="কার্ড">কার্ড</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="তারিখ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব তারিখ</SelectItem>
                <SelectItem value="today">আজ</SelectItem>
                <SelectItem value="yesterday">গতকাল</SelectItem>
                <SelectItem value="this-week">এই সপ্তাহ</SelectItem>
                <SelectItem value="this-month">এই মাস</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {filteredTransactions.filter(t => t.status === 'সফল').length}
            </p>
            <p className="text-sm text-muted-foreground">সফল</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">
              {filteredTransactions.filter(t => t.status === 'ব্যর্থ').length}
            </p>
            <p className="text-sm text-muted-foreground">ব্যর্থ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {filteredTransactions.filter(t => t.status === 'অপেক্ষমাণ').length}
            </p>
            <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {filteredTransactions.filter(t => t.status === 'ফেরত').length}
            </p>
            <p className="text-sm text-muted-foreground">ফেরত</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>লেনদেনের তালিকা ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Desktop View */}
            <div className="hidden lg:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">ট্রানজেকশন ID</th>
                      <th className="text-left p-2">গ্রাহক</th>
                      <th className="text-left p-2">পরিমাণ</th>
                      <th className="text-left p-2">মেথড</th>
                      <th className="text-left p-2">স্ট্যাটাস</th>
                      <th className="text-left p-2">তারিখ</th>
                      <th className="text-left p-2">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{transaction.id}</p>
                            <p className="text-sm text-muted-foreground">{transaction.reference}</p>
                          </div>
                        </td>
                        <td className="p-2">{transaction.customer}</td>
                        <td className="p-2">
                          <p className="font-bold">{transaction.amount}</p>
                          <p className="text-sm text-muted-foreground">{transaction.type}</p>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {getMethodIcon(transaction.method)}
                            <span>{transaction.method}</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Badge className={getStatusColor(transaction.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(transaction.status)}
                              {transaction.status}
                            </div>
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div>
                            <p className="text-sm">{transaction.date}</p>
                            <p className="text-sm text-muted-foreground">{transaction.time}</p>
                          </div>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden space-y-4">
              {filteredTransactions.map((transaction) => (
                <Card key={transaction.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold">{transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">{transaction.id}</p>
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(transaction.status)}
                        {transaction.status}
                      </div>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">গ্রাহক:</span>
                      <span className="text-sm font-medium">{transaction.customer}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">মেথড:</span>
                      <div className="flex items-center gap-1">
                        {getMethodIcon(transaction.method)}
                        <span className="text-sm">{transaction.method}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">তারিখ:</span>
                      <span className="text-sm">{transaction.date}, {transaction.time}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">রেফারেন্স:</span>
                      <span className="text-sm font-mono">{transaction.reference}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      বিস্তারিত
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">কোন ট্রানজেকশন পাওয়া যায়নি</h3>
                <p className="text-muted-foreground">
                  আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
