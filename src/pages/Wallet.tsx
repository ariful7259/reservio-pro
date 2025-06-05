
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
  QrCode,
  Shield,
  CreditCard,
  MessageSquare,
  Upload,
  Palette,
  Globe,
  CheckCircle,
  Lock,
  Bell,
  Eye,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [activeTab, setActiveTab] = useState('wallet');

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

  // SecurePay Features
  const securePayFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "১০০% নিরাপদ এসক্রো সিস্টেম",
      description: "আপনার টাকা সম্পূর্ণ নিরাপদ থাকবে যতক্ষণ না সার্ভিস ডেলিভারি হয়",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      title: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
      description: "bKash, Nagad, Rocket, VISA - সব ধরনের পেমেন্ট গেটওয়ে সাপোর্ট",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "রিয়েল-টাইম মেসেজিং",
      description: "ক্রিয়েটর ও বায়ারের মধ্যে তাৎক্ষণিক যোগাযোগ ব্যবস্থা",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-600" />,
      title: "বিস্তারিত টেমপ্লেট",
      description: "৫০+ প্রো টেমপ্লেট - Facebook, Google, YouTube, Instagram Ads",
      color: "bg-pink-50 border-pink-200"
    },
    {
      icon: <Upload className="h-8 w-8 text-orange-600" />,
      title: "ফাইল আপলোড সিস্টেম",
      description: "নিরাপদে ফাইল শেয়ার করুন - ইমেজ, ভিডিও, ডকুমেন্ট",
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "মাল্টি-রোল ড্যাশবোর্ড",
      description: "ক্রিয়েটর, বায়ার এবং অ্যাডমিনের জন্য আলাদা ড্যাশবোর্ড",
      color: "bg-indigo-50 border-indigo-200"
    }
  ];

  const paymentGateways = [
    { name: "bKash", icon: "💳", color: "bg-pink-100" },
    { name: "Nagad", icon: "🏦", color: "bg-orange-100" },
    { name: "Rocket", icon: "🚀", color: "bg-purple-100" },
    { name: "VISA", icon: "💎", color: "bg-blue-100" },
    { name: "Mastercard", icon: "🏧", color: "bg-red-100" },
    { name: "PayPal", icon: "🌐", color: "bg-yellow-100" }
  ];

  const securePayStats = [
    { number: "৫০,০০০+", label: "সফল ট্রানজেকশন" },
    { number: "৯৯.৯%", label: "নিরাপত্তার হার" },
    { number: "২৪/৭", label: "কাস্টমার সাপোর্ট" },
    { number: "১০০+", label: "সার্ভিস ক্যাটেগরি" }
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

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 gap-1 h-auto p-1">
            <TabsTrigger value="wallet" className="flex items-center gap-2 px-4 py-2">
              <WalletIcon className="h-4 w-4" />
              <span>ওয়ালেট</span>
            </TabsTrigger>
            <TabsTrigger value="securepay" className="flex items-center gap-2 px-4 py-2">
              <Shield className="h-4 w-4" />
              <span>SecurePay</span>
            </TabsTrigger>
          </TabsList>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            {showQRCode && (
              <div className="mb-6">
                <WalletQRCode 
                  walletId={walletId} 
                  phoneNumber="01712345678" 
                  userName="আপনার নাম"
                />
              </div>
            )}

            {/* Quick Actions Grid */}
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
          </TabsContent>

          {/* SecurePay Tab */}
          <TabsContent value="securepay" className="space-y-6">
            {/* SecurePay Hero */}
            <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 border-0 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4">
                    <Shield className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  SecurePay
                </h2>
                <p className="text-gray-600 mb-6">
                  বাংলাদেশের প্রথম সম্পূর্ণ নিরাপদ এসক্রো পেমেন্ট প্ল্যাটফর্ম। 
                  ডিজিটাল সার্ভিসের জন্য ১০০% সুরক্ষিত লেনদেন।
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => navigate('/securepay/creator')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    ক্রিয়েটর হিসেবে শুরু করুন
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/securepay/buyer')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    বায়ার হিসেবে যোগ দিন
                  </Button>
                </div>

                <div className="flex justify-center gap-2 flex-wrap">
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    ১০০% নিরাপদ
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    <Lock className="h-3 w-3 mr-1" />
                    এসক্রো সুরক্ষা
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    <Zap className="h-3 w-3 mr-1" />
                    তাৎক্ষণিক পেমেন্ট
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {securePayStats.map((stat, index) => (
                <Card key={index} className="text-center p-4 bg-white/80 backdrop-blur border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features Section */}
            <div>
              <h3 className="text-xl font-bold text-center mb-6">
                নতুন <span className="text-blue-600">ফিচার সমূহ</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securePayFeatures.map((feature, index) => (
                  <Card key={index} className={`${feature.color} hover:shadow-lg transition-all duration-300`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-white rounded-lg p-2 shadow-md">
                          {feature.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Payment Gateway Section */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">
                  <CreditCard className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  সাপোর্টেড পেমেন্ট গেটওয়ে
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {paymentGateways.map((gateway, index) => (
                    <div key={index} className={`${gateway.color} p-3 rounded-lg text-center hover:shadow-md transition-all`}>
                      <div className="text-xl mb-1">{gateway.icon}</div>
                      <div className="font-medium text-sm">{gateway.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20 rounded-xl"
                onClick={() => navigate('/securepay')}
              >
                <Globe className="h-6 w-6 mb-2" />
                <span className="text-xs">বিস্তারিত দেখুন</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20 rounded-xl"
                onClick={() => navigate('/securepay/creator')}
              >
                <Users className="h-6 w-6 mb-2" />
                <span className="text-xs">ক্রিয়েটর ড্যাশবোর্ড</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20 rounded-xl"
                onClick={() => navigate('/securepay/buyer')}
              >
                <CreditCard className="h-6 w-6 mb-2" />
                <span className="text-xs">বায়ার ড্যাশবোর্ড</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20 rounded-xl"
                onClick={() => navigate('/securepay/admin')}
              >
                <Settings className="h-6 w-6 mb-2" />
                <span className="text-xs">অ্যাডমিন প্যানেল</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
