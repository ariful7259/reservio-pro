
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
  Plus,
  Star,
  TrendingUp,
  AlertTriangle,
  UserCheck,
  Code,
  Image,
  Video,
  FileText,
  Award,
  Target,
  BarChart3,
  Briefcase,
  FileImage,
  Headphones,
  Layers,
  MonitorPlay,
  Search,
  Filter,
  Calendar,
  Clock
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

  // SecurePay Core Features
  const coreFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "১০০% নিরাপদ এসক্রো সিস্টেম",
      description: "আপনার টাকা সম্পূর্ণ নিরাপদ থাকবে যতক্ষণ না সার্ভিস ডেলিভারি হয়",
      color: "bg-blue-50 border-blue-200",
      features: ["SSL এনক্রিপশন", "KYC ভেরিফিকেশন", "ফ্রড প্রোটেকশন"]
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      title: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
      description: "bKash, Nagad, Rocket, VISA - সব ধরনের পেমেন্ট গেটওয়ে সাপোর্ট",
      color: "bg-green-50 border-green-200",
      features: ["৬+ পেমেন্ট মেথড", "তাৎক্ষণিক পেমেন্ট", "অটো রিফান্ড"]
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "রিয়েল-টাইম মেসেজিং",
      description: "ক্রিয়েটর ও বায়ারের মধ্যে তাৎক্ষণিক যোগাযোগ ব্যবস্থা",
      color: "bg-purple-50 border-purple-200",
      features: ["ইনস্ট্যান্ট চ্যাট", "ফাইল শেয়ারিং", "পুশ নোটিফিকেশন"]
    },
    {
      icon: <Palette className="h-8 w-8 text-pink-600" />,
      title: "৮+ প্রিমিয়াম টেমপ্লেট",
      description: "Facebook, Google, YouTube, Instagram, LinkedIn, TikTok Ads টেমপ্লেট",
      color: "bg-pink-50 border-pink-200",
      features: ["মোবাইল রেসপন্সিভ", "কাস্টমাইজেশন", "প্রিভিউ সিস্টেম"]
    },
    {
      icon: <Upload className="h-8 w-8 text-orange-600" />,
      title: "ফাইল আপলোড সিস্টেম",
      description: "নিরাপদে ফাইল শেয়ার করুন - ইমেজ, ভিডিও, ডকুমেন্ট",
      color: "bg-orange-50 border-orange-200",
      features: ["১০০ MB লিমিট", "মাল্টি ফরম্যাট", "ক্লাউড স্টোরেজ"]
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: "মাল্টি-রোল ড্যাশবোর্ড",
      description: "ক্রিয়েটর, বায়ার এবং অ্যাডমিনের জন্য আলাদা ড্যাশবোর্ড",
      color: "bg-indigo-50 border-indigo-200",
      features: ["ইউজার ম্যানেজমেন্ট", "অ্যানালিটিক্স", "KYC সিস্টেম"]
    }
  ];

  // Landing Page Templates
  const landingPageTemplates = [
    {
      name: "Facebook Ads",
      icon: <Video className="h-6 w-6" />,
      category: "সোশ্যাল মিডিয়া",
      count: "১২+ টেমপ্লেট",
      color: "bg-blue-100",
      description: "Facebook বিজ্ঞাপনের জন্য প্রফেশনাল ল্যান্ডিং পেজ"
    },
    {
      name: "Google Ads",
      icon: <Globe className="h-6 w-6" />,
      category: "সার্চ ইঞ্জিন",
      count: "৮+ টেমপ্লেট",
      color: "bg-red-100",
      description: "Google বিজ্ঞাপনের জন্য কনভার্শন অপটিমাইজড পেজ"
    },
    {
      name: "YouTube Ads",
      icon: <MonitorPlay className="h-6 w-6" />,
      category: "ভিডিও মার্কেটিং",
      count: "১০+ টেমপ্লেট",
      color: "bg-red-100",
      description: "YouTube ক্যাম্পেইনের জন্য ভিডিও ফোকাসড ডিজাইন"
    },
    {
      name: "Instagram Ads",
      icon: <Image className="h-6 w-6" />,
      category: "সোশ্যাল মিডিয়া",
      count: "১৫+ টেমপ্লেট",
      color: "bg-purple-100",
      description: "Instagram বিজ্ঞাপনের জন্য ভিজুয়াল রিচ ডিজাইন"
    },
    {
      name: "LinkedIn Ads",
      icon: <Briefcase className="h-6 w-6" />,
      category: "বিজনেস",
      count: "৬+ টেমপ্লেট",
      color: "bg-blue-100",
      description: "বিজনেস টু বিজনেস মার্কেটিংয়ের জন্য প্রো ডিজাইন"
    },
    {
      name: "TikTok Ads",
      icon: <Smartphone className="h-6 w-6" />,
      category: "ভাইরাল মার্কেটিং",
      count: "৯+ টেমপ্লেট",
      color: "bg-pink-100",
      description: "TikTok ক্যাম্পেইনের জন্য মোবাইল ফার্স্ট ডিজাইন"
    },
    {
      name: "ই-কমার্স",
      icon: <CreditCard className="h-6 w-6" />,
      category: "অনলাইন শপ",
      count: "২০+ টেমপ্লেট",
      color: "bg-green-100",
      description: "অনলাইন বিক্রয়ের জন্য কনভার্শন অপটিমাইজড"
    },
    {
      name: "সার্ভিস বিজনেস",
      icon: <Headphones className="h-6 w-6" />,
      category: "সার্ভিস",
      count: "১৪+ টেমপ্লেট",
      color: "bg-yellow-100",
      description: "সেবা ভিত্তিক ব্যবসার জন্য ট্রাস্ট বিল্ডিং ডিজাইন"
    }
  ];

  // Authentication & User Management Features
  const authFeatures = [
    {
      title: "ইউজার অথেনটিকেশন",
      items: ["লগইন/সাইনআপ সিস্টেম", "ফোন নাম্বার ভেরিফিকেশন", "পাসওয়ার্ড রিকভারি", "রিমেম্বার মি ফাংশন"]
    },
    {
      title: "KYC ভেরিফিকেশন",
      items: ["পরিচয়পত্র যাচাই", "ফেস ভেরিফিকেশন", "ঠিকানা প্রমাণ", "ব্যাংক একাউন্ট লিংক"]
    },
    {
      title: "রোল ম্যানেজমেন্ট",
      items: ["ক্রিয়েটর রোল", "বায়ার রোল", "অ্যাডমিন রোল", "পারমিশন কন্ট্রোল"]
    }
  ];

  // Payment & Security Features
  const paymentSecurityFeatures = [
    {
      title: "এসক্রো সিস্টেম",
      items: ["অটোমেটিক এসক্রো", "পেমেন্ট হোল্ড", "রিলিজ সিস্টেম", "রিফান্ড ম্যানেজমেন্ট"]
    },
    {
      title: "ডিসপিউট রেজোলিউশন",
      items: ["বিরোধ নিষ্পত্তি", "ফাইল আপলোড", "মিডিয়েশন সিস্টেম", "রেটিং সিস্টেম"]
    },
    {
      title: "ট্রানজেকশন ট্র্যাকিং",
      items: ["রিয়েল-টাইম স্ট্যাটাস", "পেমেন্ট হিস্টোরি", "রিসিট জেনারেশন", "ট্যাক্স ক্যালকুলেশন"]
    }
  ];

  const paymentGateways = [
    { name: "bKash", icon: "💳", color: "bg-pink-100", success: "৯৯.৮%" },
    { name: "Nagad", icon: "🏦", color: "bg-orange-100", success: "৯৯.৫%" },
    { name: "Rocket", icon: "🚀", color: "bg-purple-100", success: "৯৯.২%" },
    { name: "VISA", icon: "💎", color: "bg-blue-100", success: "৯৯.৯%" },
    { name: "Mastercard", icon: "🏧", color: "bg-red-100", success: "৯৯.৭%" },
    { name: "PayPal", icon: "🌐", color: "bg-yellow-100", success: "৯৯.৬%" }
  ];

  const securePayStats = [
    { number: "৫০,০০০+", label: "সফল ট্রানজেকশন", icon: <TrendingUp className="h-5 w-5" /> },
    { number: "৯৯.৯%", label: "নিরাপত্তার হার", icon: <Shield className="h-5 w-5" /> },
    { number: "২৪/৭", label: "কাস্টমার সাপোর্ট", icon: <Headphones className="h-5 w-5" /> },
    { number: "১০০+", label: "সার্ভিস ক্যাটেগরি", icon: <Layers className="h-5 w-5" /> },
    { number: "৮+", label: "টেমপ্লেট ক্যাটেগরি", icon: <Palette className="h-5 w-5" /> },
    { number: "১৫০+", label: "প্রিমিয়াম টেমপ্লেট", icon: <FileImage className="h-5 w-5" /> }
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {securePayStats.map((stat, index) => (
                <Card key={index} className="text-center p-4 bg-white/80 backdrop-blur border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-2 text-blue-600">
                      {stat.icon}
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Core Features Section */}
            <div>
              <h3 className="text-xl font-bold text-center mb-6">
                মূল <span className="text-blue-600">ফিচার সমূহ</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coreFeatures.map((feature, index) => (
                  <Card key={index} className={`${feature.color} hover:shadow-lg transition-all duration-300`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-white rounded-lg p-2 shadow-md">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {feature.features.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Landing Page Templates Section */}
            <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">
                  <Palette className="h-6 w-6 mx-auto mb-2 text-pink-600" />
                  ৮+ প্রিমিয়াম ল্যান্ডিং পেজ টেমপ্লেট
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {landingPageTemplates.map((template, index) => (
                    <Card key={index} className="border-2 hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className={`${template.color} p-3 rounded-lg mb-3 flex justify-center`}>
                          {template.icon}
                        </div>
                        <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{template.category}</p>
                        <Badge variant="outline" className="text-xs mb-2">
                          {template.count}
                        </Badge>
                        <p className="text-xs text-gray-600">{template.description}</p>
                        <div className="flex gap-1 mt-3">
                          <Button size="sm" variant="outline" className="flex-1 text-xs">
                            <Eye className="h-3 w-3 mr-1" />
                            প্রিভিউ
                          </Button>
                          <Button size="sm" className="flex-1 text-xs">
                            ব্যবহার করুন
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Authentication & User Management */}
            <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">
                  <UserCheck className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
                  অথেনটিকেশন ও ইউজার ম্যানেজমেন্ট
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {authFeatures.map((section, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 text-center">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment & Security Features */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  পেমেন্ট ও নিরাপত্তা ফিচার
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paymentSecurityFeatures.map((section, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 text-center">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                      <div className="text-xs text-gray-600">সাকসেস: {gateway.success}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Access */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-2 border-blue-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">ক্রিয়েটর ড্যাশবোর্ড</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    সার্ভিস ম্যানেজমেন্ট, আয়ের হিসাব, টেমপ্লেট কাস্টমাইজেশন
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => navigate('/securepay/creator')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    ক্রিয়েটর প্যানেল
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">বায়ার ড্যাশবোর্ড</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    অর্ডার ম্যানেজমেন্ট, পেমেন্ট, ডিসপিউট, রেটিং সিস্টেম
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/securepay/buyer')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    বায়ার প্যানেল
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-purple-200 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">অ্যাডমিন প্যানেল</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    ইউজার ম্যানেজমেন্ট, KYC, ট্রানজেকশন মনিটরিং, অ্যানালিটিক্স
                  </p>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/securepay/admin')}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    অ্যাডমিন প্যানেল
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Features */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                  অতিরিক্ত ফিচার সমূহ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <Bell className="h-5 w-5" />, text: "রিয়েল-টাইম নোটিফিকেশন" },
                    { icon: <Search className="h-5 w-5" />, text: "অ্যাডভান্সড সার্চ" },
                    { icon: <Filter className="h-5 w-5" />, text: "ফিল্টার সিস্টেম" },
                    { icon: <BarChart3 className="h-5 w-5" />, text: "অ্যানালিটিক্স" },
                    { icon: <Calendar className="h-5 w-5" />, text: "বুকিং ক্যালেন্ডার" },
                    { icon: <Clock className="h-5 w-5" />, text: "অটো রিমাইন্ডার" },
                    { icon: <Target className="h-5 w-5" />, text: "পারফরমেন্স ট্র্যাকিং" },
                    { icon: <Code className="h-5 w-5" />, text: "API ইন্টিগ্রেশন" }
                  ].map((feature, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg text-center">
                      <div className="text-yellow-600 mb-2 flex justify-center">
                        {feature.icon}
                      </div>
                      <span className="text-xs font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Buttons */}
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
                onClick={() => navigate('/payment-gateway')}
              >
                <CreditCard className="h-6 w-6 mb-2" />
                <span className="text-xs">পেমেন্ট গেটওয়ে</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20 rounded-xl"
                onClick={() => navigate('/securepay/creator')}
              >
                <Palette className="h-6 w-6 mb-2" />
                <span className="text-xs">টেমপ্লেট দেখুন</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex flex-col items-center justify-center h-20 rounded-xl"
                onClick={() => toast({ title: "আপকামিং ফিচার", description: "শীঘ্রই আসছে!" })}
              >
                <Upload className="h-6 w-6 mb-2" />
                <span className="text-xs">ফাইল আপলোড</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
