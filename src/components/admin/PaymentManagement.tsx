
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle,
  XCircle,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  FileText,
  MessageSquare,
  UserCheck,
  Settings,
  Shield,
  CreditCard,
  Banknote,
  DollarSign,
  Star,
  CalendarDays,
  History,
  RefreshCcw,
  BarChart,
  Percent,
  Download,
  Eye,
  Filter,
  ArrowUpDown,
  AlertTriangle,
  WalletCards
} from 'lucide-react';

// মক ডাটা
const MOCK_TRANSACTIONS = [
  {
    id: 'tx-001',
    userId: 'user-1234',
    userName: 'আসিফ আহমেদ',
    type: 'purchase',
    amount: '৮,৫০০ ৳',
    paymentMethod: 'বিকাশ',
    date: '১০ মে, ২০২৫',
    status: 'completed',
    entityType: 'মার্কেটপ্লেস',
    entityId: 'prod-123',
    entityName: 'আইফোন ১৩ প্রো',
    transactionFee: '১৫০ ৳'
  },
  {
    id: 'tx-002',
    userId: 'user-2345',
    userName: 'ফারহানা খান',
    type: 'subscription',
    amount: '৫০০ ৳',
    paymentMethod: 'কার্ড',
    date: '৯ মে, ২০২৫',
    status: 'completed',
    entityType: 'মেম্বারশিপ',
    entityId: 'subs-123',
    entityName: 'প্রিমিয়াম প্লান',
    transactionFee: '২০ ৳'
  },
  {
    id: 'tx-003',
    userId: 'user-3456',
    userName: 'রাকিব হাসান',
    type: 'booking',
    amount: '২,০০০ ৳',
    paymentMethod: 'নগদ',
    date: '৮ মে, ২০২৫',
    status: 'pending',
    entityType: 'সার্ভিস',
    entityId: 'serv-123',
    entityName: 'হোম ক্লিনিং',
    transactionFee: '৪০ ৳'
  },
  {
    id: 'tx-004',
    userId: 'user-4567',
    userName: 'নাফিসা আলী',
    type: 'purchase',
    amount: '৪,৫০০ ৳',
    paymentMethod: 'রকেট',
    date: '৭ মে, ২০২৫',
    status: 'failed',
    entityType: 'ডিজিটাল কন্টেন্ট',
    entityId: 'dc-123',
    entityName: 'ওয়েব ডেভেলপমেন্ট কোর্স',
    transactionFee: '০ ৳'
  },
  {
    id: 'tx-005',
    userId: 'user-5678',
    userName: 'তানজিলা আক্তার',
    type: 'purchase',
    amount: '১,২০০ ৳',
    paymentMethod: 'বিকাশ',
    date: '৬ মে, ২০২৫',
    status: 'refunded',
    entityType: 'রেন্টাল',
    entityId: 'rent-123',
    entityName: 'ক্যাম্পিং গিয়ার সেট',
    transactionFee: '৫০ ৳'
  }
];

const MOCK_REFUND_REQUESTS = [
  {
    id: 'refund-001',
    transactionId: 'tx-006',
    userId: 'user-6789',
    userName: 'আফসানা খাতুন',
    amount: '৩,৫০০ ৳',
    reason: 'প্রোডাক্ট অসম্পূর্ণ ছিল',
    details: 'আমি যে প্রোডাক্ট অর্ডার করেছিলাম সেটি অসম্পূর্ণ অবস্থায় পাওয়া গেছে। কিছু অংশ অনুপস্থিত ছিল।',
    status: 'pending',
    requestDate: '১১ মে, ২০২৫',
    resolveDate: '',
    entityType: 'মার্কেটপ্লেস',
    entityName: 'DIY ফার্নিচার সেট',
    requestedBy: 'customer'
  },
  {
    id: 'refund-002',
    transactionId: 'tx-007',
    userId: 'user-7890',
    userName: 'হাফিজুর রহমান',
    amount: '১,২০০ ৳',
    reason: 'সার্ভিস পূরণ করা হয়নি',
    details: 'বুক করা সার্ভিস প্রোভাইডার বুকিং বাতিল করেছে কিন্তু আমার টাকা ফেরত পাইনি।',
    status: 'approved',
    requestDate: '১০ মে, ২০২৫',
    resolveDate: '১১ মে, ২০২৫',
    entityType: 'সার্ভিস',
    entityName: 'ইলেকট্রিক্যাল রিপেয়ারিং',
    requestedBy: 'customer'
  },
  {
    id: 'refund-003',
    transactionId: 'tx-008',
    userId: 'user-8901',
    userName: 'ইমরান হোসেন',
    amount: '৫০০ ৳',
    reason: 'ডিজিটাল কন্টেন্ট ডাউনলোড করতে পারিনি',
    details: 'কন্টেন্ট কিনার পর ডাউনলোড লিংক কাজ করেনি। কয়েকবার চেষ্টা করার পরও অ্যাক্সেস পাইনি।',
    status: 'rejected',
    requestDate: '৯ মে, ২০২৫',
    resolveDate: '১০ মে, ২০২৫',
    entityType: 'ডিজিটাল কন্টেন্ট',
    entityName: 'ফটোশপ টেমপ্লেট',
    requestedBy: 'customer'
  }
];

const MOCK_PAYMENT_METHODS = [
  {
    id: 'pm-001',
    name: 'বিকাশ',
    type: 'মোবাইল ব্যাংকিং',
    fee: '১.৫%',
    status: 'active',
    processingTime: 'তাৎক্ষণিক',
    minimumAmount: '১০ ৳',
    iconClass: 'payment-bkash'
  },
  {
    id: 'pm-002',
    name: 'নগদ',
    type: 'মোবাইল ব্যাংকিং',
    fee: '১.২%',
    status: 'active',
    processingTime: 'তাৎক্ষণিক',
    minimumAmount: '১০ ৳',
    iconClass: 'payment-nagad'
  },
  {
    id: 'pm-003',
    name: 'রকেট',
    type: 'মোবাইল ব্যাংকিং',
    fee: '১.৫%',
    status: 'active',
    processingTime: 'তাৎক্ষণিক',
    minimumAmount: '১০ ৳',
    iconClass: 'payment-rocket'
  },
  {
    id: 'pm-004',
    name: 'ভিসা/মাস্টারকার্ড',
    type: 'কার্ড পেমেন্ট',
    fee: '২.৫%',
    status: 'active',
    processingTime: 'তাৎক্ষণিক',
    minimumAmount: '১০০ ৳',
    iconClass: 'payment-card'
  },
  {
    id: 'pm-005',
    name: 'ব্যাংক ট্রান্সফার',
    type: 'ব্যাংক পেমেন্ট',
    fee: '০%',
    status: 'inactive',
    processingTime: '১-২ দিন',
    minimumAmount: '৫০০ ৳',
    iconClass: 'payment-bank'
  }
];

const MOCK_DISPUTES = [
  {
    id: 'disp-001',
    transactionId: 'tx-009',
    userId: 'user-9012',
    userName: 'মাহমুদুল হাসান',
    amount: '৮,০০০ ৳',
    reason: 'অর্থ কাটা গেছে কিন্তু প্রোডাক্ট পাইনি',
    details: 'আমার অ্যাকাউন্ট থেকে পেমেন্ট কাটা গেছে কিন্তু কনফার্মেশন পাইনি এবং প্রোডাক্টও পাইনি।',
    status: 'pending',
    createdAt: '১২ মে, ২০২৫',
    resolvedAt: '',
    entityType: 'মার্কেটপ্লেস',
    entityName: 'স্মার্ট ওয়াচ',
    responseRequired: true
  },
  {
    id: 'disp-002',
    transactionId: 'tx-010',
    userId: 'user-0123',
    userName: 'শামীমা বেগম',
    amount: '৩,২০০ ৳',
    reason: 'অনাকাঙ্ক্ষিত চার্জ',
    details: 'আমার কার্ড থেকে অনাকাঙ্ক্ষিত চার্জ কাটা হয়েছে যা আমি করিনি।',
    status: 'resolved',
    createdAt: '১০ মে, ২০২৫',
    resolvedAt: '১১ মে, ২০২৫',
    entityType: 'সাবস্ক্রিপশন',
    entityName: 'প্রিমিয়াম প্লান',
    responseRequired: false
  }
];

const MOCK_SUBSCRIPTIONS = [
  {
    id: 'sub-001',
    userId: 'user-1234',
    userName: 'আসিফ আহমেদ',
    plan: 'প্রিমিয়াম প্লান',
    amount: '৫০০ ৳',
    interval: 'মাসিক',
    status: 'active',
    startDate: '১ এপ্রিল, ২০২৫',
    nextBillingDate: '১ মে, ২০২৫',
    paymentMethod: 'বিকাশ',
    autoRenew: true
  },
  {
    id: 'sub-002',
    userId: 'user-2345',
    userName: 'ফারহানা খান',
    plan: 'বেসিক প্লান',
    amount: '২০০ ৳',
    interval: 'মাসিক',
    status: 'cancelled',
    startDate: '১০ মার্চ, ২০২৫',
    nextBillingDate: '১০ এপ্রিল, ২০২৫',
    paymentMethod: 'কার্ড',
    autoRenew: false
  },
  {
    id: 'sub-003',
    userId: 'user-3456',
    userName: 'রাকিব হাসান',
    plan: 'প্রিমিয়াম প্লান',
    amount: '৫,০০০ ৳',
    interval: 'বার্ষিক',
    status: 'active',
    startDate: '১৫ ফেব্রুয়ারি, ২০২৫',
    nextBillingDate: '১৫ ফেব্রুয়ারি, ২০২৬',
    paymentMethod: 'কার্ড',
    autoRenew: true
  }
];

const PaymentManagement: React.FC = () => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [refundRequests, setRefundRequests] = useState(MOCK_REFUND_REQUESTS);
  const [paymentMethods, setPaymentMethods] = useState(MOCK_PAYMENT_METHODS);
  const [disputes, setDisputes] = useState(MOCK_DISPUTES);
  const [subscriptions, setSubscriptions] = useState(MOCK_SUBSCRIPTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isFeeDialogOpen, setIsFeeDialogOpen] = useState(false);
  const [isAddPaymentMethodOpen, setIsAddPaymentMethodOpen] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    name: '',
    type: '',
    fee: '',
    minimumAmount: '',
    processingTime: ''
  });
  const [feeSettings, setFeeSettings] = useState({
    platformFee: '2.5',
    marketplaceFee: '10',
    serviceFee: '8',
    subscriptionFee: '5',
    rentalFee: '8',
    contentFee: '10',
    minimumFee: '10',
    maximumFee: '1000'
  });

  // ট্রানজেকশন ফিল্টারিং
  const filteredTransactions = transactions.filter(transaction => {
    // সার্চ ফিল্টার
    const matchesSearch = transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      transaction.userName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // টাইপ ফিল্টার
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    // স্ট্যাটাস ফিল্টার
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // রিফান্ড রিকোয়েস্ট স্ট্যাটাস আপডেট
  const handleRefundStatusChange = (refundId: string, newStatus: 'approved' | 'rejected') => {
    setRefundRequests(refundRequests.map(refund => 
      refund.id === refundId ? { ...refund, status: newStatus, resolveDate: '১২ মে, ২০২৫' } : refund
    ));
    
    toast({
      title: "রিফান্ড স্ট্যাটাস আপডেট হয়েছে",
      description: `রিফান্ড রিকোয়েস্ট ${newStatus === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} করা হয়েছে।`,
    });
  };

  // পেমেন্ট মেথড স্ট্যাটাস পরিবর্তন
  const handlePaymentMethodStatusChange = (methodId: string, active: boolean) => {
    setPaymentMethods(paymentMethods.map(method => 
      method.id === methodId ? { ...method, status: active ? 'active' : 'inactive' } : method
    ));
    
    toast({
      title: "পেমেন্ট মেথড স্ট্যাটাস আপডেট হয়েছে",
      description: `পেমেন্ট মেথড ${active ? 'সক্রিয়' : 'নিষ্ক্রিয়'} করা হয়েছে।`,
    });
  };

  // নতুন পেমেন্ট মেথড যোগ করা
  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.name.trim()) {
      const newMethod = {
        id: `pm-${paymentMethods.length + 1}`,
        name: newPaymentMethod.name,
        type: newPaymentMethod.type || 'অন্যান্য',
        fee: newPaymentMethod.fee || '০%',
        status: 'active',
        processingTime: newPaymentMethod.processingTime || 'তাৎক্ষণিক',
        minimumAmount: newPaymentMethod.minimumAmount || '১০ ৳',
        iconClass: 'payment-default'
      };
      
      setPaymentMethods([...paymentMethods, newMethod]);
      setNewPaymentMethod({
        name: '',
        type: '',
        fee: '',
        minimumAmount: '',
        processingTime: ''
      });
      setIsAddPaymentMethodOpen(false);
      
      toast({
        title: "পেমেন্ট মেথড যোগ করা হয়েছে",
        description: `"${newPaymentMethod.name}" পেমেন্ট মেথড সফলভাবে যোগ করা হয়েছে।`,
      });
    }
  };

  // ডিসপিউট রেজল্ভ করা
  const handleDisputeResolve = (disputeId: string) => {
    setDisputes(disputes.map(dispute => 
      dispute.id === disputeId ? { ...dispute, status: 'resolved', resolvedAt: '১২ মে, ২০২৫', responseRequired: false } : dispute
    ));
    
    toast({
      title: "ডিসপিউট সমাধান করা হয়েছে",
      description: "পেমেন্ট ডিসপিউট সফলভাবে সমাধান করা হয়েছে।",
    });
  };

  // সাবস্ক্রিপশন স্ট্যাটাস পরিবর্তন
  const handleSubscriptionStatusChange = (subscriptionId: string, newStatus: string) => {
    setSubscriptions(subscriptions.map(subscription => 
      subscription.id === subscriptionId ? { ...subscription, status: newStatus } : subscription
    ));
    
    toast({
      title: "সাবস্ক্রিপশন স্ট্যাটাস আপডেট হয়েছে",
      description: `সাবস্ক্রিপশন স্ট্যাটাস ${newStatus} হিসাবে আপডেট করা হয়েছে।`,
    });
  };

  // ফি সেটিংস আপডেট
  const handleFeeSettingsUpdate = () => {
    setIsFeeDialogOpen(false);
    
    toast({
      title: "ফি স্ট্রাকচার আপডেট হয়েছে",
      description: "পেমেন্ট ফি স্ট্রাকচার সফলভাবে আপডেট করা হয়েছে।",
    });
  };

  // স্ট্যাটাস ব্যাজের কালার
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
      case 'resolved':
      case 'approved':
        return 'default';
      case 'pending':
        return 'warning';
      case 'failed':
      case 'rejected':
      case 'cancelled':
        return 'destructive';
      case 'refunded':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  // পেমেন্ট মেথড আইকন রেন্ডারিং
  const renderPaymentMethodIcon = (iconClass: string) => {
    switch (iconClass) {
      case 'payment-bkash':
        return <DollarSign className="h-6 w-6 text-pink-500" />;
      case 'payment-nagad':
        return <DollarSign className="h-6 w-6 text-orange-500" />;
      case 'payment-rocket':
        return <DollarSign className="h-6 w-6 text-purple-500" />;
      case 'payment-card':
        return <CreditCard className="h-6 w-6 text-blue-500" />;
      case 'payment-bank':
        return <Banknote className="h-6 w-6 text-green-500" />;
      default:
        return <CreditCard className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">পেমেন্ট ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">ট্রানজেকশন, রিফান্ড, পেমেন্ট মেথড, ডিসপিউট এবং সাবস্ক্রিপশন পরিচালনা করুন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsFeeDialogOpen(true)}>
            <Percent className="h-4 w-4 mr-2" />
            ফি স্ট্রাকচার
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট জেনারেট
          </Button>
        </div>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="transactions">ট্রানজেকশন</TabsTrigger>
          <TabsTrigger value="refunds">রিফান্ড</TabsTrigger>
          <TabsTrigger value="payment-methods">পেমেন্ট মেথড</TabsTrigger>
          <TabsTrigger value="disputes">ডিসপিউট</TabsTrigger>
          <TabsTrigger value="subscriptions">সাবস্ক্রিপশন</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>ট্রানজেকশন হিস্ট্রি</CardTitle>
                <div className="flex gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব টাইপ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব টাইপ</SelectItem>
                      <SelectItem value="purchase">পারচেজ</SelectItem>
                      <SelectItem value="booking">বুকিং</SelectItem>
                      <SelectItem value="subscription">সাবস্ক্রিপশন</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="completed">সম্পন্ন</SelectItem>
                      <SelectItem value="pending">পেন্ডিং</SelectItem>
                      <SelectItem value="failed">ব্যর্থ</SelectItem>
                      <SelectItem value="refunded">রিফান্ড</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="সব সময়" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব সময়</SelectItem>
                      <SelectItem value="today">আজ</SelectItem>
                      <SelectItem value="yesterday">গতকাল</SelectItem>
                      <SelectItem value="last7days">গত ৭ দিন</SelectItem>
                      <SelectItem value="last30days">গত ৩০ দিন</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="ট্রানজেকশন আইডি, ইউজার নেম..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <div className="flex items-center">
                          ট্রানজেকশন আইডি
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">ইউজার</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">টাইপ</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <div className="flex items-center">
                          তারিখ
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">এন্টিটি</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        <div className="flex items-center">
                          পরিমাণ
                          <ArrowUpDown className="ml-1 h-3 w-3" />
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">পেমেন্ট মেথড</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map(transaction => (
                      <tr key={transaction.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{transaction.id}</td>
                        <td className="p-4 align-middle">{transaction.userName}</td>
                        <td className="p-4 align-middle capitalize">
                          {transaction.type === 'purchase' ? 'পারচেজ' : 
                           transaction.type === 'booking' ? 'বুকিং' : 'সাবস্ক্রিপশন'}
                        </td>
                        <td className="p-4 align-middle">{transaction.date}</td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">{transaction.entityName}</div>
                            <div className="text-sm text-muted-foreground">{transaction.entityType}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle font-medium">{transaction.amount}</td>
                        <td className="p-4 align-middle">{transaction.paymentMethod}</td>
                        <td className="p-4 align-middle">
                          <Badge variant={getStatusBadgeVariant(transaction.status)}>
                            {transaction.status === 'completed' ? 'সম্পন্ন' : 
                             transaction.status === 'pending' ? 'পেন্ডিং' :
                             transaction.status === 'failed' ? 'ব্যর্থ' : 'রিফান্ড'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  মোট {filteredTransactions.length}টি ট্রানজেকশন
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    পূর্ববর্তী
                  </Button>
                  <Button variant="outline" size="sm">
                    ১
                  </Button>
                  <Button variant="outline" size="sm">
                    পরবর্তী
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="refunds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>রিফান্ড রিকোয়েস্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Input placeholder="রিফান্ড খুঁজুন..." className="max-w-xs" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="সব স্ট্যাটাস" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                    <SelectItem value="pending">পেন্ডিং</SelectItem>
                    <SelectItem value="approved">অনুমোদিত</SelectItem>
                    <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {refundRequests.map(refund => (
                  <div key={refund.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{refund.reason}</h3>
                          <Badge variant={getStatusBadgeVariant(refund.status)}>
                            {refund.status === 'pending' ? 'পেন্ডিং' : 
                             refund.status === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>ইউজার: {refund.userName} • ট্রানজেকশন: {refund.transactionId}</div>
                          <div>এন্টিটি: {refund.entityName} ({refund.entityType})</div>
                          <div>রিকোয়েস্ট: {refund.requestDate}{refund.resolveDate ? ` • রেজল্ভ: ${refund.resolveDate}` : ''}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold text-lg">{refund.amount}</div>
                        <div className="text-sm text-right text-muted-foreground">রিফান্ড পরিমাণ</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-secondary/10 rounded-md">
                      <p className="text-sm">{refund.details}</p>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                      {refund.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleRefundStatusChange(refund.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            অনুমোদন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRefundStatusChange(refund.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            প্রত্যাখ্যান
                          </Button>
                        </>
                      )}
                      
                      {refund.status !== 'pending' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          বিস্তারিত
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>পেমেন্ট মেথড</CardTitle>
              <Button size="sm" onClick={() => setIsAddPaymentMethodOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                নতুন পেমেন্ট মেথড
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div key={method.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {renderPaymentMethodIcon(method.iconClass)}
                        </div>
                        <div>
                          <h3 className="font-medium">{method.name}</h3>
                          <div className="text-sm text-muted-foreground">
                            {method.type} • ফি: {method.fee} • প্রসেসিং টাইম: {method.processingTime}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">ন্যূনতম পরিমাণ</div>
                          <div className="font-medium">{method.minimumAmount}</div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center mr-4">
                            <Label htmlFor={`active-${method.id}`} className="mr-2">
                              <Badge variant={method.status === 'active' ? 'default' : 'outline'}>
                                {method.status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                              </Badge>
                            </Label>
                            <Switch 
                              id={`active-${method.id}`} 
                              checked={method.status === 'active'}
                              onCheckedChange={(checked) => handlePaymentMethodStatusChange(method.id, checked)}
                            />
                          </div>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isAddPaymentMethodOpen} onOpenChange={setIsAddPaymentMethodOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন পেমেন্ট মেথড যোগ করুন</DialogTitle>
                <DialogDescription>
                  নতুন পেমেন্ট মেথডের বিবরণ দিন।
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="method-name">পেমেন্ট মেথড নাম</Label>
                  <Input 
                    id="method-name" 
                    placeholder="বিকাশ, নগদ, ভিসা কার্ড, ইত্যাদি" 
                    value={newPaymentMethod.name}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method-type">মেথড টাইপ</Label>
                  <Select 
                    value={newPaymentMethod.type} 
                    onValueChange={(value) => setNewPaymentMethod({ ...newPaymentMethod, type: value })}
                  >
                    <SelectTrigger id="method-type">
                      <SelectValue placeholder="টাইপ সিলেক্ট করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="মোবাইল ব্যাংকিং">মোবাইল ব্যাংকিং</SelectItem>
                      <SelectItem value="কার্ড পেমেন্ট">কার্ড পেমেন্ট</SelectItem>
                      <SelectItem value="ব্যাংক পেমেন্ট">ব্যাংক পেমেন্ট</SelectItem>
                      <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method-fee">ফি (%)</Label>
                  <Input 
                    id="method-fee" 
                    placeholder="1.5" 
                    value={newPaymentMethod.fee}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, fee: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method-min-amount">ন্যূনতম পরিমাণ</Label>
                  <Input 
                    id="method-min-amount" 
                    placeholder="১০" 
                    value={newPaymentMethod.minimumAmount}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, minimumAmount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method-processing">প্রসেসিং টাইম</Label>
                  <Input 
                    id="method-processing" 
                    placeholder="তাৎক্ষণিক, ১-২ দিন, ইত্যাদি" 
                    value={newPaymentMethod.processingTime}
                    onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, processingTime: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPaymentMethodOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleAddPaymentMethod}>
                  পেমেন্ট মেথড যোগ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>পেমেন্ট ডিসপিউট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map(dispute => (
                  <div key={dispute.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{dispute.reason}</h3>
                          <Badge variant={getStatusBadgeVariant(dispute.status)}>
                            {dispute.status === 'pending' ? 'পেন্ডিং' : 'সমাধান করা হয়েছে'}
                          </Badge>
                          {dispute.responseRequired && (
                            <Badge variant="warning">জরুরী প্রতিক্রিয়া প্রয়োজন</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <div>ইউজার: {dispute.userName} • ট্রানজেকশন: {dispute.transactionId}</div>
                          <div>এন্টিটি: {dispute.entityName} ({dispute.entityType})</div>
                          <div>তারিখ: {dispute.createdAt}{dispute.resolvedAt ? ` • সমাধান: ${dispute.resolvedAt}` : ''}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-bold text-lg">{dispute.amount}</div>
                        <div className="text-sm text-right text-muted-foreground">ডিসপিউট পরিমাণ</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-secondary/10 rounded-md">
                      <p className="text-sm">{dispute.details}</p>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                      {dispute.status === 'pending' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            প্রতিক্রিয়া দিন
                          </Button>
                          <Button 
                            size="sm" 
                            variant="default"
                            onClick={() => handleDisputeResolve(dispute.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            সমাধান করুন
                          </Button>
                        </>
                      )}
                      
                      {dispute.status === 'resolved' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          বিস্তারিত
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সাবস্ক্রিপশন ম্যানেজমেন্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">ইউজার</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">প্লান</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">পরিমাণ</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">ইন্টারভাল</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">শুরু</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">পরবর্তী বিল</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">অটো রিনিউ</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">স্ট্যাটাস</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map(subscription => (
                      <tr key={subscription.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{subscription.userName}</td>
                        <td className="p-4 align-middle">{subscription.plan}</td>
                        <td className="p-4 align-middle">{subscription.amount}</td>
                        <td className="p-4 align-middle">{subscription.interval}</td>
                        <td className="p-4 align-middle">{subscription.startDate}</td>
                        <td className="p-4 align-middle">{subscription.nextBillingDate}</td>
                        <td className="p-4 align-middle">
                          <div className="flex justify-center">
                            <Switch 
                              checked={subscription.autoRenew}
                              onCheckedChange={() => {}}
                              disabled={subscription.status !== 'active'}
                            />
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <Badge variant={getStatusBadgeVariant(subscription.status)}>
                            {subscription.status === 'active' ? 'সক্রিয়' : 'বাতিল'}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {subscription.status === 'active' ? (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleSubscriptionStatusChange(subscription.id, 'cancelled')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                বাতিল
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleSubscriptionStatusChange(subscription.id, 'active')}
                              >
                                <RefreshCcw className="h-4 w-4 mr-1" />
                                পুনঃসক্রিয়
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">সাবস্ক্রিপশন প্লান</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">বেসিক প্লান</h4>
                      <Badge>সক্রিয়</Badge>
                    </div>
                    <div className="mt-2 text-2xl font-bold">২০০ ৳ <span className="text-sm font-normal text-muted-foreground">/ মাস</span></div>
                    <Separator className="my-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>সর্বোচ্চ ১০টি লিস্টিং</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>বেসিক সাপোর্ট</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>স্ট্যান্ডার্ড ফিচার</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Edit className="h-4 w-4 mr-2" />
                      এডিট
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-primary/5 border-primary/30">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">প্রিমিয়াম প্লান</h4>
                      <Badge>সক্রিয়</Badge>
                    </div>
                    <div className="mt-2 text-2xl font-bold">৫০০ ৳ <span className="text-sm font-normal text-muted-foreground">/ মাস</span></div>
                    <Separator className="my-4" />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>সর্বোচ্চ ৫০টি লিস্টিং</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>প্রিমিয়াম সাপোর্ট</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>অ্যাডভান্সড ফিচার</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      <Edit className="h-4 w-4 mr-2" />
                      এডিট
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center">
                    <PlusCircle className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">নতুন সাবস্ক্রিপশন প্লান যোগ করুন</p>
                    <Button variant="outline" className="mt-4">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      নতুন প্লান
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isFeeDialogOpen} onOpenChange={setIsFeeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ফি স্ট্রাকচার আপডেট</DialogTitle>
            <DialogDescription>
              সার্ভিস ও প্রোডাক্ট ক্যাটাগরি অনুসারে ফি স্ট্রাকচার আপডেট করুন।
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="platform-fee">প্ল্যাটফর্ম ফি (%)</Label>
              <Input 
                id="platform-fee" 
                value={feeSettings.platformFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, platformFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marketplace-fee">মার্কেটপ্লেস কমিশন (%)</Label>
              <Input 
                id="marketplace-fee" 
                value={feeSettings.marketplaceFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, marketplaceFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service-fee">সার্ভিস কমিশন (%)</Label>
              <Input 
                id="service-fee" 
                value={feeSettings.serviceFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, serviceFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subscription-fee">সাবস্ক্রিপশন ফি (%)</Label>
              <Input 
                id="subscription-fee" 
                value={feeSettings.subscriptionFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, subscriptionFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rental-fee">রেন্টাল কমিশন (%)</Label>
              <Input 
                id="rental-fee" 
                value={feeSettings.rentalFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, rentalFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content-fee">ডিজিটাল কন্টেন্ট কমিশন (%)</Label>
              <Input 
                id="content-fee" 
                value={feeSettings.contentFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, contentFee: e.target.value })}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="min-fee">ন্যূনতম ফি (৳)</Label>
              <Input 
                id="min-fee" 
                value={feeSettings.minimumFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, minimumFee: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-fee">সর্বোচ্চ ফি (৳)</Label>
              <Input 
                id="max-fee" 
                value={feeSettings.maximumFee}
                onChange={(e) => setFeeSettings({ ...feeSettings, maximumFee: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFeeDialogOpen(false)}>
              বাতিল
            </Button>
            <Button onClick={handleFeeSettingsUpdate}>
              আপডেট করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentManagement;
