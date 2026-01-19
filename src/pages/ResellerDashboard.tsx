import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Loader2,
  Download,
  AlertTriangle,
  Package,
  History,
  BarChart3,
  Users
} from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import SalesAnalyticsChart from '@/components/reseller/SalesAnalyticsChart';
import ReferralSection from '@/components/reseller/ReferralSection';

interface BalanceHistory {
  id: string;
  amount: number;
  type: string;
  description: string | null;
  created_at: string;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  payment_method: string;
  account_details: any;
  status: string;
  admin_notes: string | null;
  created_at: string;
  processed_at: string | null;
}

interface ResellerOrder {
  id: string;
  order_data: any;
  margin_amount: number;
  total_amount: number;
  final_price: number;
  status: string;
  balance_updated: boolean;
  created_at: string;
}

const ResellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [isReseller, setIsReseller] = useState(false);
  const [balanceHistory, setBalanceHistory] = useState<BalanceHistory[]>([]);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);
  const [resellerOrders, setResellerOrders] = useState<ResellerOrder[]>([]);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  
  // Withdrawal form state
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('bkash');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [isAuthenticated, user]);

  const fetchData = async () => {
    if (!user?.id) return;
    
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_reseller, reseller_balance, referral_code')
        .eq('id', user.id)
        .single();
      
      if (profileError) throw profileError;
      
      if (!profileData?.is_reseller) {
        navigate('/reseller-registration');
        return;
      }
      
      setIsReseller(true);
      setBalance(profileData.reseller_balance || 0);
      setReferralCode(profileData.referral_code || null);

      // Fetch balance history
      const { data: historyData } = await supabase
        .from('reseller_balance_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      
      setBalanceHistory(historyData || []);

      // Fetch withdrawal requests
      const { data: withdrawalData } = await supabase
        .from('withdrawal_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setWithdrawalRequests(withdrawalData || []);

      // Fetch reseller orders
      const { data: ordersData } = await supabase
        .from('reseller_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      setResellerOrders(ordersData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "ত্রুটি",
        description: "ডাটা লোড করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawalRequest = async () => {
    if (!user?.id) return;
    
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "ভুল পরিমাণ",
        description: "সঠিক পরিমাণ লিখুন।",
        variant: "destructive"
      });
      return;
    }

    if (amount > balance) {
      toast({
        title: "অপর্যাপ্ত ব্যালেন্স",
        description: "আপনার ব্যালেন্সে পর্যাপ্ত টাকা নেই।",
        variant: "destructive"
      });
      return;
    }

    if (!accountNumber || !accountName) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "অ্যাকাউন্ট নম্বর এবং নাম দিন।",
        variant: "destructive"
      });
      return;
    }

    setWithdrawLoading(true);
    try {
      const { error } = await supabase
        .from('withdrawal_requests')
        .insert({
          user_id: user.id,
          amount,
          payment_method: withdrawMethod,
          account_details: {
            account_number: accountNumber,
            account_name: accountName
          },
          status: 'pending'
        });
      
      if (error) throw error;

      toast({
        title: "সফল!",
        description: "উইথড্রয়াল রিকোয়েস্ট পাঠানো হয়েছে।",
      });
      
      setShowWithdrawDialog(false);
      setWithdrawAmount('');
      setAccountNumber('');
      setAccountName('');
      fetchData();
    } catch (error) {
      console.error('Error creating withdrawal request:', error);
      toast({
        title: "ত্রুটি",
        description: "রিকোয়েস্ট পাঠাতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setWithdrawLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> পেন্ডিং</Badge>;
      case 'approved':
        return <Badge className="bg-blue-500"><CheckCircle className="h-3 w-3 mr-1" /> অনুমোদিত</Badge>;
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> সম্পন্ন</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> বাতিল</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'withdrawal':
      case 'debit':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'blocked':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  // Calculate stats
  const totalEarnings = balanceHistory
    .filter(h => h.type === 'credit')
    .reduce((sum, h) => sum + h.amount, 0);
  
  const pendingWithdrawals = withdrawalRequests
    .filter(w => w.status === 'pending')
    .reduce((sum, w) => sum + w.amount, 0);

  const completedOrders = resellerOrders.filter(o => o.status === 'completed').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">রিসেলার ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground">আপনার আয় এবং উইথড্রয়াল ম্যানেজ করুন</p>
        </div>
        <Button onClick={() => navigate('/marketplace')}>
          <Package className="mr-2 h-4 w-4" />
          প্রোডাক্ট ব্রাউজ করুন
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">বর্তমান ব্যালেন্স</p>
                <p className="text-2xl font-bold text-green-700">৳{balance.toLocaleString()}</p>
              </div>
              <div className="bg-green-200 p-2 rounded-full">
                <Wallet className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">মোট আয়</p>
                <p className="text-2xl font-bold">৳{totalEarnings.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং উইথড্রয়াল</p>
                <p className="text-2xl font-bold">৳{pendingWithdrawals.toLocaleString()}</p>
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">সম্পন্ন অর্ডার</p>
                <p className="text-2xl font-bold">{completedOrders}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Button */}
      <div className="mb-6">
        <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
          <DialogTrigger asChild>
            <Button size="lg" disabled={balance <= 0}>
              <Download className="mr-2 h-4 w-4" />
              উইথড্রয়াল রিকোয়েস্ট করুন
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>উইথড্রয়াল রিকোয়েস্ট</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">উপলব্ধ ব্যালেন্স</p>
                <p className="text-xl font-bold">৳{balance.toLocaleString()}</p>
              </div>
              
              <div className="space-y-2">
                <Label>পরিমাণ (৳)</Label>
                <Input 
                  type="number" 
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>পেমেন্ট মেথড</Label>
                <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bkash">বিকাশ</SelectItem>
                    <SelectItem value="nagad">নগদ</SelectItem>
                    <SelectItem value="rocket">রকেট</SelectItem>
                    <SelectItem value="bank">ব্যাংক ট্রান্সফার</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>অ্যাকাউন্ট নম্বর</Label>
                <Input 
                  placeholder="01XXXXXXXXX"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>অ্যাকাউন্ট হোল্ডার নাম</Label>
                <Input 
                  placeholder="আপনার নাম"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                বাতিল
              </Button>
              <Button onClick={handleWithdrawalRequest} disabled={withdrawLoading}>
                {withdrawLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'রিকোয়েস্ট পাঠান'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="analytics">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-1 h-4 w-4" />
            অ্যানালিটিক্স
          </TabsTrigger>
          <TabsTrigger value="referrals">
            <Users className="mr-1 h-4 w-4" />
            রেফারেল
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-1 h-4 w-4" />
            হিস্ট্রি
          </TabsTrigger>
          <TabsTrigger value="withdrawals">
            <Download className="mr-1 h-4 w-4" />
            উইথড্রয়াল
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="mr-1 h-4 w-4" />
            অর্ডার
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-4">
          <SalesAnalyticsChart 
            balanceHistory={balanceHistory} 
            resellerOrders={resellerOrders} 
          />
        </TabsContent>

        <TabsContent value="referrals" className="mt-4">
          {user?.id && (
            <ReferralSection userId={user.id} referralCode={referralCode} />
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ব্যালেন্স হিস্ট্রি</CardTitle>
            </CardHeader>
            <CardContent>
              {balanceHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  কোন হিস্ট্রি নেই
                </p>
              ) : (
                <div className="space-y-3">
                  {balanceHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(item.type)}
                        <div>
                          <p className="font-medium">
                            {item.type === 'credit' ? 'জমা' : 
                             item.type === 'withdrawal' ? 'উইথড্রয়াল' :
                             item.type === 'blocked' ? 'ব্লকড' : item.type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.description || '-'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${item.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {item.type === 'credit' ? '+' : '-'}৳{item.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(item.created_at), 'dd MMM yyyy', { locale: bn })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>উইথড্রয়াল রিকোয়েস্ট</CardTitle>
            </CardHeader>
            <CardContent>
              {withdrawalRequests.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  কোন রিকোয়েস্ট নেই
                </p>
              ) : (
                <div className="space-y-3">
                  {withdrawalRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-lg">৳{request.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.payment_method.toUpperCase()} - {request.account_details?.account_number}
                          </p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(request.created_at), 'dd MMM yyyy, hh:mm a', { locale: bn })}
                      </p>
                      {request.admin_notes && (
                        <p className="text-sm mt-2 p-2 bg-muted rounded">
                          <strong>নোট:</strong> {request.admin_notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>রিসেল অর্ডার</CardTitle>
            </CardHeader>
            <CardContent>
              {resellerOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  কোন অর্ডার নেই
                </p>
              ) : (
                <div className="space-y-3">
                  {resellerOrders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">অর্ডার #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            মোট: ৳{order.total_amount} | মার্জিন: ৳{order.margin_amount}
                          </p>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(order.status)}
                          {order.balance_updated && (
                            <Badge className="ml-2 bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" /> ব্যালেন্স আপডেট
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(order.created_at), 'dd MMM yyyy, hh:mm a', { locale: bn })}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResellerDashboard;
