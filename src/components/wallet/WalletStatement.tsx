import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  Calendar,
  Filter,
  X,
  Wallet,
  ShoppingCart,
  CreditCard,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';

interface Transaction {
  id: string;
  amount: number;
  transaction_type: string;
  description: string | null;
  status: string;
  created_at: string;
  payment_method: string | null;
  metadata: any;
}

interface WalletStatementProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const transactionTypeLabels: Record<string, string> = {
  send: 'টাকা পাঠানো',
  receive: 'টাকা গ্রহণ',
  add_money: 'টাকা যোগ',
  withdraw: 'উত্তোলন',
  payment: 'পেমেন্ট',
  refund: 'রিফান্ড',
  product_purchase: 'পণ্য ক্রয়',
  service_booking: 'সার্ভিস বুকিং',
  rental_payment: 'ভাড়া পেমেন্ট',
  rental_deposit: 'ভাড়া ডিপোজিট',
  partial_payment: 'আংশিক পেমেন্ট',
  order_refund: 'অর্ডার রিফান্ড'
};

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'send':
      return <ArrowUpRight className="h-4 w-4" />;
    case 'receive':
    case 'add_money':
    case 'refund':
    case 'order_refund':
      return <ArrowDownLeft className="h-4 w-4" />;
    case 'product_purchase':
    case 'payment':
      return <ShoppingCart className="h-4 w-4" />;
    case 'service_booking':
    case 'rental_payment':
    case 'rental_deposit':
      return <CreditCard className="h-4 w-4" />;
    default:
      return <Wallet className="h-4 w-4" />;
  }
};

const isCredit = (type: string) => {
  return ['receive', 'add_money', 'refund', 'order_refund'].includes(type);
};

export const WalletStatement: React.FC<WalletStatementProps> = ({
  open,
  onOpenChange
}) => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

  useEffect(() => {
    if (open) {
      loadTransactions();
    }
  }, [open]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'লগইন করুন',
          description: 'ট্রানজেকশন দেখতে লগইন করুন',
          variant: 'destructive'
        });
        return;
      }

      // Get user's wallet
      const { data: wallet } = await supabase
        .from('wallets')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!wallet) {
        setTransactions([]);
        return;
      }

      // Get transactions
      const { data: txns, error } = await supabase
        .from('wallet_transactions')
        .select('*')
        .eq('wallet_id', wallet.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setTransactions(txns || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
      toast({
        title: 'ত্রুটি',
        description: 'ট্রানজেকশন লোড করতে সমস্যা হয়েছে',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    if (filter === 'credit') return isCredit(tx.transaction_type);
    if (filter === 'debit') return !isCredit(tx.transaction_type);
    return true;
  });

  const groupedTransactions = filteredTransactions.reduce((groups, tx) => {
    const date = format(new Date(tx.created_at), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(tx);
    return groups;
  }, {} as Record<string, Transaction[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2 border-b">
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              ট্রানজেকশন হিস্ট্রি
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={loadTransactions}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 py-2 border-b">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            সব
          </Button>
          <Button
            variant={filter === 'credit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('credit')}
            className="text-green-600"
          >
            <ArrowDownLeft className="h-3 w-3 mr-1" />
            জমা
          </Button>
          <Button
            variant={filter === 'debit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('debit')}
            className="text-red-600"
          >
            <ArrowUpRight className="h-3 w-3 mr-1" />
            খরচ
          </Button>
        </div>

        <ScrollArea className="h-[60vh]">
          {loading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>কোনো ট্রানজেকশন পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="divide-y">
              {Object.entries(groupedTransactions).map(([date, txns]) => (
                <div key={date}>
                  <div className="px-4 py-2 bg-muted/50 sticky top-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      {format(new Date(date), 'd MMMM, yyyy', { locale: bn })}
                    </p>
                  </div>
                  <div className="divide-y">
                    {txns.map(tx => (
                      <div key={tx.id} className="px-4 py-3 flex items-center gap-3 hover:bg-muted/30 transition-colors">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          isCredit(tx.transaction_type)
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {getTransactionIcon(tx.transaction_type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {transactionTypeLabels[tx.transaction_type] || tx.transaction_type}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {tx.description || 'ওয়ালেট ট্রানজেকশন'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(tx.created_at), 'h:mm a', { locale: bn })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${
                            isCredit(tx.transaction_type) ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isCredit(tx.transaction_type) ? '+' : '-'}৳{tx.amount.toLocaleString()}
                          </p>
                          <Badge 
                            variant={tx.status === 'completed' ? 'default' : 'secondary'}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {tx.status === 'completed' ? 'সম্পন্ন' : tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default WalletStatement;
