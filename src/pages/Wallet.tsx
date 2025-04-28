
import React, { useState } from 'react';
import { 
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  Zap,
  Copy,
  Settings,
  Wallet as WalletIcon,
  Download,
  SendHorizontal,
  Smartphone,
  DollarSign,
  RefreshCw,
  TimerReset,
  Users,
  History,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import WalletCard from '@/components/WalletCard';
import TransactionItem from '@/components/TransactionItem';
import WalletNearbyServices from '@/components/WalletNearbyServices';

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [walletId] = useState('200 008 794');

  const handleCopyId = () => {
    navigator.clipboard.writeText(walletId);
    toast({
      title: "ওয়ালেট আইডি কপি করা হয়েছে",
      description: `${walletId} আইডি ক্লিপবোর্ডে কপি করা হয়েছে`,
    });
  };

  const recentTransactions = [
    {
      id: '1',
      title: 'ফ্ল্যাট ভাড়া',
      amount: 15000,
      type: 'debit' as const,
      category: 'rent' as const,
      date: '২৮ এপ্রিল, ২০২৫'
    },
    {
      id: '2',
      title: 'সার্ভিস পেমেন্ট',
      amount: 2500,
      type: 'credit' as const,
      category: 'service' as const,
      date: '২৭ এপ্রিল, ২০২৫'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 pt-20 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">ওয়ালেট</h1>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">আইডি: {walletId}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4"
                  onClick={handleCopyId}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/qr-scanner')}>
              <QrCode className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="mb-6">
          <WalletCard 
            balance={25000}
            lastTransaction={{
              amount: 15000,
              type: 'debit',
              date: '২৮ এপ্রিল, ২০২৫'
            }}
          />
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { icon: <SendHorizontal className="h-6 w-6" />, label: "পাঠান" },
            { icon: <Download className="h-6 w-6" />, label: "রিসিভ" },
            { icon: <History className="h-6 w-6" />, label: "হিস্টোরি" },
            { icon: <Gift className="h-6 w-6" />, label: "গিফট\nকার্ড" },
            { icon: <Smartphone className="h-6 w-6" />, label: "মোবাইল\nরিচার্জ" },
            { icon: <DollarSign className="h-6 w-6" />, label: "ক্যাশ\nআউট" },
            { icon: <RefreshCw className="h-6 w-6" />, label: "কনভার্ট" },
            { icon: <Users className="h-6 w-6" />, label: "গ্রুপ\nপেমেন্ট" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center justify-center h-24 rounded-xl hover:bg-primary/5 transition-colors"
            >
              <div className="mb-2">{item.icon}</div>
              <span className="text-xs text-center whitespace-pre-line">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Recent Transactions */}
        <Card className="mb-6">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">সাম্প্রতিক লেনদেন</h3>
              <Button variant="link" className="p-0 text-sm">সব দেখুন</Button>
            </div>
            <div className="space-y-2">
              {recentTransactions.map(transaction => (
                <TransactionItem 
                  key={transaction.id}
                  {...transaction}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Services */}
        <WalletNearbyServices />
      </div>
    </div>
  );
};

export default Wallet;
