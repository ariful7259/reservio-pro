import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Settings,
  Users,
  Package,
  Wallet,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Loader2,
  Save,
  RefreshCw,
  Ban
} from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

interface ResellerSettings {
  id: string;
  min_margin: number;
  max_margin: number;
  cod_enabled: boolean;
  payout_delay_days: number;
  fraud_prevention_enabled: boolean;
}

interface ResellerOrder {
  id: string;
  user_id: string;
  order_data: any;
  margin_amount: number;
  total_amount: number;
  final_price: number;
  status: string;
  balance_updated: boolean;
  margin_blocked: boolean;
  admin_notes: string | null;
  created_at: string;
}

interface WithdrawalRequest {
  id: string;
  user_id: string;
  amount: number;
  payment_method: string;
  account_details: any;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

interface ResellerProfile {
  id: string;
  full_name: string;
  email: string;
  reseller_balance: number;
  is_reseller: boolean;
}

const ResellerManagement: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<ResellerSettings | null>(null);
  const [orders, setOrders] = useState<ResellerOrder[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([]);
  const [resellers, setResellers] = useState<ResellerProfile[]>([]);
  const [savingSettings, setSavingSettings] = useState(false);
  
  // Dialog states
  const [selectedOrder, setSelectedOrder] = useState<ResellerOrder | null>(null);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<WithdrawalRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [processLoading, setProcessLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch settings
      const { data: settingsData } = await supabase
        .from('reseller_settings')
        .select('*')
        .limit(1)
        .single();
      
      setSettings(settingsData);

      // Fetch reseller orders
      const { data: ordersData } = await supabase
        .from('reseller_orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      setOrders(ordersData || []);

      // Fetch withdrawal requests
      const { data: withdrawalsData } = await supabase
        .from('withdrawal_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      setWithdrawals(withdrawalsData || []);

      // Fetch reseller profiles
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, email, reseller_balance, is_reseller')
        .eq('is_reseller', true);
      
      setResellers(profilesData || []);

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

  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setSavingSettings(true);
    try {
      const { error } = await supabase
        .from('reseller_settings')
        .update({
          min_margin: settings.min_margin,
          max_margin: settings.max_margin,
          cod_enabled: settings.cod_enabled,
          payout_delay_days: settings.payout_delay_days,
          fraud_prevention_enabled: settings.fraud_prevention_enabled,
          updated_at: new Date().toISOString()
        })
        .eq('id', settings.id);
      
      if (error) throw error;

      toast({
        title: "সংরক্ষিত!",
        description: "সেটিংস সফলভাবে আপডেট হয়েছে।",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "ত্রুটি",
        description: "সেটিংস সংরক্ষণ করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateBalance = async (order: ResellerOrder) => {
    if (!user?.id) return;
    
    setProcessLoading(true);
    try {
      // Call the function to update balance
      const { error: rpcError } = await supabase.rpc('update_reseller_balance', {
        p_user_id: order.user_id,
        p_amount: order.margin_amount,
        p_type: 'credit',
        p_description: `অর্ডার #${order.id.slice(0, 8)} থেকে মার্জিন`,
        p_order_id: order.id
      });

      if (rpcError) throw rpcError;

      // Update order status
      const { error: updateError } = await supabase
        .from('reseller_orders')
        .update({ 
          balance_updated: true,
          balance_update_date: new Date().toISOString()
        })
        .eq('id', order.id);
      
      if (updateError) throw updateError;

      toast({
        title: "সফল!",
        description: "ব্যালেন্স আপডেট হয়েছে।",
      });
      
      setSelectedOrder(null);
      fetchData();
    } catch (error) {
      console.error('Error updating balance:', error);
      toast({
        title: "ত্রুটি",
        description: "ব্যালেন্স আপডেট করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setProcessLoading(false);
    }
  };

  const handleBlockMargin = async (order: ResellerOrder) => {
    setProcessLoading(true);
    try {
      const { error } = await supabase
        .from('reseller_orders')
        .update({ 
          margin_blocked: true,
          admin_notes: adminNotes || 'মার্জিন ব্লক করা হয়েছে (Fraud Prevention)'
        })
        .eq('id', order.id);
      
      if (error) throw error;

      toast({
        title: "মার্জিন ব্লক!",
        description: "অর্ডারের মার্জিন ব্লক করা হয়েছে।",
      });
      
      setSelectedOrder(null);
      setAdminNotes('');
      fetchData();
    } catch (error) {
      console.error('Error blocking margin:', error);
      toast({
        title: "ত্রুটি",
        description: "মার্জিন ব্লক করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setProcessLoading(false);
    }
  };

  const handleProcessWithdrawal = async (status: 'approved' | 'rejected' | 'completed') => {
    if (!selectedWithdrawal || !user?.id) return;
    
    setProcessLoading(true);
    try {
      const updateData: any = {
        status,
        admin_notes: adminNotes,
        processed_at: new Date().toISOString(),
        processed_by: user.id
      };

      // If completed, deduct from balance
      if (status === 'completed') {
        const { error: rpcError } = await supabase.rpc('update_reseller_balance', {
          p_user_id: selectedWithdrawal.user_id,
          p_amount: selectedWithdrawal.amount,
          p_type: 'withdrawal',
          p_description: `উইথড্রয়াল #${selectedWithdrawal.id.slice(0, 8)}`
        });

        if (rpcError) throw rpcError;
      }

      const { error } = await supabase
        .from('withdrawal_requests')
        .update(updateData)
        .eq('id', selectedWithdrawal.id);
      
      if (error) throw error;

      toast({
        title: "সফল!",
        description: `উইথড্রয়াল ${status === 'approved' ? 'অনুমোদিত' : status === 'completed' ? 'সম্পন্ন' : 'বাতিল'} হয়েছে।`,
      });
      
      setSelectedWithdrawal(null);
      setAdminNotes('');
      fetchData();
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      toast({
        title: "ত্রুটি",
        description: "প্রসেস করতে সমস্যা হয়েছে।",
        variant: "destructive"
      });
    } finally {
      setProcessLoading(false);
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
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> ক্যান্সেল</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Stats
  const pendingOrders = orders.filter(o => o.status === 'pending' && !o.balance_updated).length;
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending').length;
  const totalResellers = resellers.length;
  const totalBalance = resellers.reduce((sum, r) => sum + (r.reseller_balance || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">রিসেলার ম্যানেজমেন্ট</h2>
        <Button variant="outline" onClick={fetchData}>
          <RefreshCw className="mr-2 h-4 w-4" />
          রিফ্রেশ
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">মোট রিসেলার</p>
                <p className="text-2xl font-bold">{totalResellers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং অর্ডার</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
              <Package className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">পেন্ডিং উইথড্রয়াল</p>
                <p className="text-2xl font-bold">{pendingWithdrawals}</p>
              </div>
              <Wallet className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">মোট ব্যালেন্স</p>
                <p className="text-2xl font-bold">৳{totalBalance.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings">
        <TabsList>
          <TabsTrigger value="settings">
            <Settings className="mr-1 h-4 w-4" />
            সেটিংস
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="mr-1 h-4 w-4" />
            অর্ডার ({pendingOrders})
          </TabsTrigger>
          <TabsTrigger value="withdrawals">
            <Wallet className="mr-1 h-4 w-4" />
            উইথড্রয়াল ({pendingWithdrawals})
          </TabsTrigger>
          <TabsTrigger value="resellers">
            <Users className="mr-1 h-4 w-4" />
            রিসেলার
          </TabsTrigger>
        </TabsList>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>রিসেলার প্রোগ্রাম সেটিংস</CardTitle>
              <CardDescription>
                মার্জিন লিমিট, COD, পেআউট ডিলে এবং ফ্রড প্রিভেনশন কন্ট্রোল করুন
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {settings && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>সর্বনিম্ন মার্জিন (৳)</Label>
                      <Input 
                        type="number"
                        value={settings.min_margin}
                        onChange={(e) => setSettings({...settings, min_margin: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>সর্বোচ্চ মার্জিন (৳)</Label>
                      <Input 
                        type="number"
                        value={settings.max_margin}
                        onChange={(e) => setSettings({...settings, max_margin: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>পেআউট ডিলে (দিন)</Label>
                    <Input 
                      type="number"
                      value={settings.payout_delay_days}
                      onChange={(e) => setSettings({...settings, payout_delay_days: parseInt(e.target.value) || 3})}
                      min={1}
                      max={30}
                    />
                    <p className="text-sm text-muted-foreground">
                      অর্ডার সম্পন্ন হওয়ার পর কতদিন পরে ব্যালেন্স আপডেট হবে
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>ক্যাশ অন ডেলিভারি (COD)</Label>
                      <p className="text-sm text-muted-foreground">
                        রিসেলাররা COD অপশন ব্যবহার করতে পারবে
                      </p>
                    </div>
                    <Switch 
                      checked={settings.cod_enabled}
                      onCheckedChange={(checked) => setSettings({...settings, cod_enabled: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label>Fraud Prevention</Label>
                      <p className="text-sm text-muted-foreground">
                        অর্ডার ক্যান্সেল হলে মার্জিন ব্লক করা হবে
                      </p>
                    </div>
                    <Switch 
                      checked={settings.fraud_prevention_enabled}
                      onCheckedChange={(checked) => setSettings({...settings, fraud_prevention_enabled: checked})}
                    />
                  </div>

                  <Button onClick={handleSaveSettings} disabled={savingSettings}>
                    {savingSettings ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    সেটিংস সংরক্ষণ করুন
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>রিসেলার অর্ডার</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">কোন অর্ডার নেই</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">অর্ডার #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            মোট: ৳{order.total_amount} | মার্জিন: ৳{order.margin_amount} | ফাইনাল: ৳{order.final_price}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(order.status)}
                          {order.margin_blocked && (
                            <Badge variant="destructive">
                              <Ban className="h-3 w-3 mr-1" /> ব্লকড
                            </Badge>
                          )}
                          {order.balance_updated && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" /> আপডেটেড
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {format(new Date(order.created_at), 'dd MMM yyyy, hh:mm a', { locale: bn })}
                      </p>
                      
                      {!order.balance_updated && !order.margin_blocked && order.status === 'completed' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Wallet className="mr-1 h-3 w-3" />
                            ব্যালেন্স আপডেট
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => {
                              setSelectedOrder(order);
                              setAdminNotes('');
                            }}
                          >
                            <Ban className="mr-1 h-3 w-3" />
                            মার্জিন ব্লক
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Withdrawals Tab */}
        <TabsContent value="withdrawals" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>উইথড্রয়াল রিকোয়েস্ট</CardTitle>
            </CardHeader>
            <CardContent>
              {withdrawals.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">কোন রিকোয়েস্ট নেই</p>
              ) : (
                <div className="space-y-3">
                  {withdrawals.map((withdrawal) => (
                    <div key={withdrawal.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-lg">৳{withdrawal.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            {withdrawal.payment_method.toUpperCase()} - {withdrawal.account_details?.account_number}
                          </p>
                          <p className="text-sm">{withdrawal.account_details?.account_name}</p>
                        </div>
                        {getStatusBadge(withdrawal.status)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {format(new Date(withdrawal.created_at), 'dd MMM yyyy, hh:mm a', { locale: bn })}
                      </p>
                      
                      {withdrawal.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedWithdrawal(withdrawal);
                              setAdminNotes('');
                            }}
                          >
                            প্রসেস করুন
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resellers Tab */}
        <TabsContent value="resellers" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>রিসেলার তালিকা</CardTitle>
            </CardHeader>
            <CardContent>
              {resellers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">কোন রিসেলার নেই</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2">নাম</th>
                        <th className="text-left py-3 px-2">ইমেইল</th>
                        <th className="text-right py-3 px-2">ব্যালেন্স</th>
                      </tr>
                    </thead>
                    <tbody>
                      {resellers.map((reseller) => (
                        <tr key={reseller.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2">{reseller.full_name || '-'}</td>
                          <td className="py-3 px-2">{reseller.email || '-'}</td>
                          <td className="py-3 px-2 text-right font-medium">
                            ৳{(reseller.reseller_balance || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Action Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>অর্ডার অ্যাকশন</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">অর্ডার #{selectedOrder.id.slice(0, 8)}</p>
                <p className="text-sm">মার্জিন: ৳{selectedOrder.margin_amount}</p>
              </div>
              
              <div className="space-y-2">
                <Label>অ্যাডমিন নোট (ঐচ্ছিক)</Label>
                <Textarea 
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="নোট লিখুন..."
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              বাতিল
            </Button>
            <Button 
              variant="destructive"
              onClick={() => selectedOrder && handleBlockMargin(selectedOrder)}
              disabled={processLoading}
            >
              {processLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'মার্জিন ব্লক'}
            </Button>
            <Button 
              onClick={() => selectedOrder && handleUpdateBalance(selectedOrder)}
              disabled={processLoading}
            >
              {processLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'ব্যালেন্স আপডেট'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdrawal Action Dialog */}
      <Dialog open={!!selectedWithdrawal} onOpenChange={() => setSelectedWithdrawal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>উইথড্রয়াল প্রসেস</DialogTitle>
          </DialogHeader>
          {selectedWithdrawal && (
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-bold text-lg">৳{selectedWithdrawal.amount.toLocaleString()}</p>
                <p className="text-sm">{selectedWithdrawal.payment_method.toUpperCase()}</p>
                <p className="text-sm">{selectedWithdrawal.account_details?.account_number}</p>
                <p className="text-sm">{selectedWithdrawal.account_details?.account_name}</p>
              </div>
              
              <div className="space-y-2">
                <Label>অ্যাডমিন নোট</Label>
                <Textarea 
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="নোট লিখুন..."
                />
              </div>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedWithdrawal(null)}>
              বাতিল
            </Button>
            <Button 
              variant="destructive"
              onClick={() => handleProcessWithdrawal('rejected')}
              disabled={processLoading}
            >
              {processLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'বাতিল করুন'}
            </Button>
            <Button 
              onClick={() => handleProcessWithdrawal('completed')}
              disabled={processLoading}
            >
              {processLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'সম্পন্ন করুন'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResellerManagement;
