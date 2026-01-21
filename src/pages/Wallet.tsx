import React, { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { SendMoneyDialog } from '@/components/wallet/SendMoneyDialog';
import { ReceiveMoneyDialog } from '@/components/wallet/ReceiveMoneyDialog';
import { QRPaymentDialog } from '@/components/wallet/QRPaymentDialog';
import { AddMoneyDialog } from '@/components/wallet/AddMoneyDialog';

const Wallet = () => {
  const { toast } = useToast();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [addMoneyDialogOpen, setAddMoneyDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);
  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'দয়া করে লগইন করুন',
          description: 'ওয়ালেট ব্যবহার করতে লগইন করুন',
          variant: 'destructive'
        });
        return;
      }

      // Get or create wallet
      let { data: wallet, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (walletError && walletError.code === 'PGRST116') {
        // Wallet doesn't exist, create one
        const { data: newWallet, error: createError } = await supabase
          .from('wallets')
          .insert({ user_id: user.id, balance: 0 })
          .select()
          .single();

        if (createError) throw createError;
        wallet = newWallet;
      } else if (walletError) {
        throw walletError;
      }

      setWalletBalance(wallet?.balance || 0);

      // Load transactions
      const { data: txData, error: txError } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('wallet_id', wallet?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (txError) throw txError;

      const formattedTx = (txData || []).map((tx: any) => ({
        id: tx.id,
        type: tx.transaction_type === 'send' ? 'sent' : 'received',
        amount: tx.amount,
        description: tx.description,
        date: new Date(tx.created_at).toLocaleDateString('bn-BD'),
        status: tx.status
      }));

      setTransactions(formattedTx);
    } catch (error: any) {
      console.error('Error loading wallet:', error);
      toast({
        title: 'ত্রুটি',
        description: 'ওয়ালেট ডেটা লোড করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'টাকা পাঠান',
      icon: <Send className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      onClick: () => setSendDialogOpen(true)
    },
    {
      title: 'টাকা নিন',
      icon: <ArrowDownToLine className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      onClick: () => setReceiveDialogOpen(true)
    },
    {
      title: 'QR কোড',
      icon: <QrCode className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      onClick: () => setQrDialogOpen(true)
    },
    {
      title: 'টাকা যোগ করুন',
      icon: <Plus className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      onClick: () => setAddMoneyDialogOpen(true)
    }
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container px-4 pt-20 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">আমার ওয়ালেট</h1>
          <Button variant="outline" size="icon" className="border-green-200 text-green-600 hover:bg-green-50">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        <Card className="mb-6 bg-gradient-to-br from-green-600 to-green-500 text-white border-0 shadow-lg">
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
          <h3 className="text-lg font-semibold mb-4 text-slate-800">দ্রুত কাজ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-md transition-all cursor-pointer bg-white border-green-100 hover:border-green-200"
                onClick={action.onClick}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full ${action.color} mb-3`}>
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{action.title}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-white border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">আজকের আয়</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-800">৳ ৩,৭০০</span>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +১২%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">এই মাসের খরচ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-800">৳ ১২,৪০০</span>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  +৮%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">পেন্ডিং</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-800">৳ ১,২০০</span>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  ৩ টি
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-green-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-800">সাম্প্রতিক লেনদেন</CardTitle>
              <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                <History className="h-4 w-4 mr-2" />
                সব দেখুন
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between border-b border-green-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'received' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-green-50 text-green-500'
                    }`}>
                      {transaction.type === 'received' 
                        ? <TrendingUp className="h-4 w-4" />
                        : <TrendingDown className="h-4 w-4" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{transaction.description}</p>
                      <p className="text-sm text-slate-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'received' ? 'text-green-600' : 'text-green-500'
                    }`}>
                      {transaction.type === 'received' ? '+' : '-'}৳ {transaction.amount.toLocaleString()}
                    </p>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                      className={`text-xs ${transaction.status === 'completed' ? 'bg-green-600' : 'bg-green-100 text-green-600'}`}
                    >
                      {transaction.status === 'completed' ? 'সম্পন্ন' : 'অপেক্ষমাণ'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <SendMoneyDialog
          open={sendDialogOpen}
          onOpenChange={setSendDialogOpen}
          currentBalance={walletBalance}
          onSuccess={loadWalletData}
        />

        <ReceiveMoneyDialog
          open={receiveDialogOpen}
          onOpenChange={setReceiveDialogOpen}
        />

        <QRPaymentDialog
          open={qrDialogOpen}
          onOpenChange={setQrDialogOpen}
          currentBalance={walletBalance}
          onSuccess={loadWalletData}
        />

        <AddMoneyDialog
          open={addMoneyDialogOpen}
          onOpenChange={setAddMoneyDialogOpen}
          onSuccess={loadWalletData}
        />
      </div>
    </div>
  );
};

export default Wallet;
