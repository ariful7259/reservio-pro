import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  Download, 
  FileText, 
  Filter, 
  Search, 
  ShieldCheck, 
  User,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Currency, currencies, formatCurrency, convertCurrency } from '@/utils/currencyUtils';
import CurrencySelector from '@/components/CurrencySelector';

interface Transaction {
  id: string;
  date: string;
  type: 'payment' | 'refund' | 'deposit' | 'withdraw';
  status: 'pending' | 'completed' | 'disputed' | 'refunded';
  amount: number;
  description: string;
  counterparty: string;
  escrowId?: string;
}

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('BDT');

  // মক ডাটা - প্রোডাকশন সিস্টেমে এটি ডাটাবেস থেকে আসবে
  const transactions: Transaction[] = [
    {
      id: 'TX123456',
      date: '২০২৫-০৫-০৪',
      type: 'payment',
      status: 'completed',
      amount: 1500,
      description: 'রেন্টাল পেমেন্ট: ফ্ল্যাট ২০৩, ব্লক-এ',
      counterparty: 'আহমেদ হাসান',
      escrowId: 'ESC7890'
    },
    {
      id: 'TX123457',
      date: '২০২৫-০৫-০২',
      type: 'deposit',
      status: 'completed',
      amount: 5000,
      description: 'অ্যাকাউন্টে ডিপোজিট',
      counterparty: 'বিকাশ'
    },
    {
      id: 'TX123458',
      date: '২০২৫-০৫-০১',
      type: 'payment',
      status: 'pending',
      amount: 800,
      description: 'সার্ভিস পেমেন্ট: প্লাম্বিং কাজ',
      counterparty: 'করিম মিয়া',
      escrowId: 'ESC7891'
    },
    {
      id: 'TX123459',
      date: '২০২৫-০৪-২৮',
      type: 'refund',
      status: 'refunded',
      amount: 600,
      description: 'সার্ভিস রিফান্ড: ইলেক্ট্রিক রিপেয়ার',
      counterparty: 'রহিম খান',
      escrowId: 'ESC7892'
    },
    {
      id: 'TX123460',
      date: '২০২৫-০৪-২৫',
      type: 'withdraw',
      status: 'completed',
      amount: 2000,
      description: 'অ্যাকাউন্ট থেকে উত্তোলন',
      counterparty: 'নগদ'
    }
  ];

  // ফিল্টার লজিক
  const filteredTransactions = transactions.filter(tx => {
    // ট্যাব ফিল্টার
    if (activeTab !== 'all' && tx.type !== activeTab) return false;
    
    // সার্চ ফিল্টার
    if (searchQuery && !tx.description.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tx.counterparty.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // স্ট্যাটাস ফিল্টার
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
    
    // ডেট ফিল্টার
    if (dateFilter && tx.date !== dateFilter) return false;
    
    return true;
  });

  // স্ট্যাটাস ব্যাজ রেন্ডার করার ফাংশন
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">সম্পন্ন</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">পেন্ডিং</Badge>;
      case 'disputed':
        return <Badge className="bg-red-500">ডিসপিউটেড</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500">রিফান্ডেড</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // ট্রানজেকশন টাইপ আইকন রেন্ডার করার ফাংশন
  const renderTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-8 w-8 text-blue-500 bg-blue-50 p-1.5 rounded-full" />;
      case 'refund':
        return <FileText className="h-8 w-8 text-green-500 bg-green-50 p-1.5 rounded-full" />;
      case 'deposit':
        return <ShieldCheck className="h-8 w-8 text-purple-500 bg-purple-50 p-1.5 rounded-full" />;
      case 'withdraw':
        return <FileText className="h-8 w-8 text-red-500 bg-red-50 p-1.5 rounded-full" />;
      default:
        return <FileText className="h-8 w-8 p-1.5 rounded-full" />;
    }
  };

  // কারেন্সি করভার্ট করার ফাংশন
  const convertAmount = (amount: number) => {
    return selectedCurrency === 'BDT' ? amount : convertCurrency(amount, selectedCurrency);
  };

  return (
    <div className="container py-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">ট্রানজেকশন হিস্টরি</h1>
          <p className="text-muted-foreground">আপনার সমস্ত লেনদেন এখানে দেখুন</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/payment/generate-invoice')}>
            <FileText className="h-4 w-4 mr-2" />
            ইনভয়েস
          </Button>
          <Button variant="outline" onClick={() => navigate('/payment/download-report')}>
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট
          </Button>
          <Button variant="outline" onClick={() => navigate('/payment/multi-currency')}>
            <CreditCard className="h-4 w-4 mr-2" />
            কারেন্সি
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>ফিল্টার এবং সার্চ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="ট্রানজেকশন সার্চ করুন" 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="completed">সম্পন্ন</SelectItem>
                <SelectItem value="pending">পেন্ডিং</SelectItem>
                <SelectItem value="disputed">ডিসপিউটেড</SelectItem>
                <SelectItem value="refunded">রিফান্ডেড</SelectItem>
              </SelectContent>
            </Select>
            
            <Input 
              type="date" 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm">কারেন্সি:</span>
              <CurrencySelector 
                selectedCurrency={selectedCurrency}
                onCurrencyChange={(value) => setSelectedCurrency(value)}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">সব লেনদেন</TabsTrigger>
          <TabsTrigger value="payment">পেমেন্ট</TabsTrigger>
          <TabsTrigger value="deposit">ডিপোজিট</TabsTrigger>
          <TabsTrigger value="withdraw">উত্তোলন</TabsTrigger>
          <TabsTrigger value="refund">রিফান্ড</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          {filteredTransactions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">কোন লেনদেন পাওয়া যায়নি</h3>
                <p className="text-muted-foreground">আপনার সার্চ ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map(tx => (
                <Card key={tx.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-start p-4 gap-4">
                      <div className="shrink-0">
                        {renderTypeIcon(tx.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">{tx.description}</h3>
                          <span className={`font-semibold ${tx.type === 'refund' || tx.type === 'withdraw' ? 'text-red-500' : 'text-green-600'}`}>
                            {tx.type === 'refund' || tx.type === 'withdraw' ? '-' : '+'} {formatCurrency(convertAmount(tx.amount), selectedCurrency)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" /> {tx.date}
                          </span>
                          
                          <span className="flex items-center">
                            <User className="h-3.5 w-3.5 mr-1" /> {tx.counterparty}
                          </span>
                          
                          <span className="flex items-center">
                            <FileText className="h-3.5 w-3.5 mr-1" /> {tx.id}
                          </span>
                          
                          {tx.escrowId && (
                            <span className="flex items-center">
                              <ShieldCheck className="h-3.5 w-3.5 mr-1" /> এসক্রো: {tx.escrowId}
                            </span>
                          )}
                          
                          <div className="flex-grow-0 flex">
                            {renderStatusBadge(tx.status)}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/transaction/${tx.id}`)}
                      >
                        বিস্তারিত
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TransactionHistory;
