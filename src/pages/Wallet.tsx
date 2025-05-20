
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
import { useIsMobile } from '@/hooks/use-mobile';
import WalletQRCode from '@/components/WalletQRCode';

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [walletId] = useState('200 008 794');
  const isMobile = useIsMobile();
  const [showQRCode, setShowQRCode] = useState(false);

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

  // বাটন ফাংশনালিটি
  const handleSendMoney = () => {
    navigate('/payment', { state: { action: 'send' } });
    toast({
      title: "টাকা পাঠানোর পেইজে নিয়ে যাচ্ছি",
      description: "আপনি কাকে টাকা পাঠাতে চান সিলেক্ট করুন",
    });
  };

  const handleReceiveMoney = () => {
    setShowQRCode(true);
    toast({
      title: "টাকা গ্রহণ করুন",
      description: "আপনার QR কোড শেয়ার করে টাকা গ্রহণ করুন",
    });
  };

  const handleViewHistory = () => {
    navigate('/payment/transaction-history');
    toast({
      title: "লেনদেনের তালিকা",
      description: "আপনার সমস্ত লেনদেন দেখুন",
    });
  };

  const handleGiftCard = () => {
    navigate('/payment/gift-card');
    toast({
      title: "গিফট কার্ড",
      description: "গিফট কার্ড কিনুন অথবা রিডিম করুন",
    });
  };

  const handleMobileRecharge = () => {
    navigate('/utilities', { state: { tab: 'mobile' } });
    toast({
      title: "মোবাইল রিচার্জ",
      description: "আপনার মোবাইল রিচার্জ করুন",
    });
  };

  const handleCashOut = () => {
    navigate('/payment', { state: { action: 'cashout' } });
    toast({
      title: "ক্যাশ আউট",
      description: "নিকটস্থ এজেন্ট থেকে ক্যাশ আউট করুন",
    });
  };

  const handleCurrencyConvert = () => {
    navigate('/payment/multi-currency');
    toast({
      title: "কারেন্সি কনভার্ট",
      description: "বিভিন্ন কারেন্সিতে রূপান্তর করুন",
    });
  };

  const handleGroupPayment = () => {
    navigate('/group-booking');
    toast({
      title: "গ্রুপ পেমেন্ট",
      description: "বন্ধুদের সাথে মিলে পেমেন্ট করুন",
    });
  };

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

        {showQRCode && (
          <div className="mb-6">
            <WalletQRCode 
              walletId={walletId} 
              phoneNumber="01712345678" 
              userName="আপনার নাম"
            />
          </div>
        )}

        {/* Quick Actions Grid - রেসপনসিভ করা হয়েছে */}
        <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-4'} gap-4 mb-8`}>
          {[
            { 
              icon: <SendHorizontal className="h-6 w-6" />, 
              label: "পাঠান",
              onClick: handleSendMoney 
            },
            { 
              icon: <Download className="h-6 w-6" />, 
              label: "রিসিভ",
              onClick: handleReceiveMoney
            },
            { 
              icon: <History className="h-6 w-6" />, 
              label: "হিস্টোরি",
              onClick: handleViewHistory
            },
            { 
              icon: <Gift className="h-6 w-6" />, 
              label: isMobile ? "গিফট" : "গিফট\nকার্ড",
              onClick: handleGiftCard  
            },
            { 
              icon: <Smartphone className="h-6 w-6" />, 
              label: isMobile ? "রিচার্জ" : "মোবাইল\nরিচার্জ",
              onClick: handleMobileRecharge
            },
            { 
              icon: <DollarSign className="h-6 w-6" />, 
              label: isMobile ? "ক্যাশ" : "ক্যাশ\nআউট",
              onClick: handleCashOut
            },
            { 
              icon: <RefreshCw className="h-6 w-6" />, 
              label: "কনভার্ট",
              onClick: handleCurrencyConvert
            },
            { 
              icon: <Users className="h-6 w-6" />, 
              label: isMobile ? "গ্রুপ" : "গ্রুপ\nপেমেন্ট",
              onClick: handleGroupPayment
            },
          ].map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex flex-col items-center justify-center h-20 sm:h-24 rounded-xl hover:bg-primary/5 transition-colors"
              onClick={item.onClick}
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
              <Button 
                variant="link" 
                className="p-0 text-sm"
                onClick={() => navigate('/payment/transaction-history')}
              >
                সব দেখুন
              </Button>
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
