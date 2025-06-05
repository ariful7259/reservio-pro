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
import TemplatePreviewModal from '@/components/securepay/TemplatePreviewModal';
import PaymentLinkGenerator from '@/components/securepay/PaymentLinkGenerator';
import AdvancedFeatures from '@/components/securepay/AdvancedFeatures';
import FileUploadSystem from '@/components/securepay/FileUploadSystem';

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [walletId] = useState('200 008 794');
  const isMobile = useIsMobile();
  const [showQRCode, setShowQRCode] = useState(false);
  const [activeTab, setActiveTab] = useState('wallet');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

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
      id: 'facebook-ads',
      name: "Facebook Ads",
      icon: <Video className="h-6 w-6" />,
      category: "সোশ্যাল মিডিয়া",
      count: "১২+ টেমপ্লেট",
      color: "bg-blue-100",
      description: "Facebook বিজ্ঞাপনের জন্য প্রফেশনাল ল্যান্ডিং পেজ",
      preview: "facebook-preview"
    },
    {
      id: 'google-ads',
      name: "Google Ads",
      icon: <Globe className="h-6 w-6" />,
      category: "সার্চ ইঞ্জিন",
      count: "৮+ টেমপ্লেট",
      color: "bg-red-100",
      description: "Google বিজ্ঞাপনের জন্য কনভার্শন অপটিমাইজড পেজ",
      preview: "google-preview"
    },
    {
      id: 'youtube-ads',
      name: "YouTube Ads",
      icon: <MonitorPlay className="h-6 w-6" />,
      category: "ভিডিও মার্কেটিং",
      count: "১০+ টেমপ্লেট",
      color: "bg-red-100",
      description: "YouTube ক্যাম্পেইনের জন্য ভিডিও ফোকাসড ডিজাইন",
      preview: "youtube-preview"
    },
    {
      id: 'instagram-ads',
      name: "Instagram Ads",
      icon: <Image className="h-6 w-6" />,
      category: "সোশ্যাল মিডিয়া",
      count: "১৫+ টেমপ্লেট",
      color: "bg-purple-100",
      description: "Instagram বিজ্ঞাপনের জন্য ভিজুয়াল রিচ ডিজাইন",
      preview: "instagram-preview"
    },
    {
      id: 'linkedin-ads',
      name: "LinkedIn Ads",
      icon: <Briefcase className="h-6 w-6" />,
      category: "বিজনেস",
      count: "৬+ টেমপ্লেট",
      color: "bg-blue-100",
      description: "বিজনেস টু বিজনেস মার্কেটিংয়ের জন্য প্রো ডিজাইন",
      preview: "linkedin-preview"
    },
    {
      id: 'tiktok-ads',
      name: "TikTok Ads",
      icon: <Smartphone className="h-6 w-6" />,
      category: "ভাইরাল মার্কেটিং",
      count: "৯+ টেমপ্লেট",
      color: "bg-pink-100",
      description: "TikTok ক্যাম্পেইনের জন্য মোবাইল ফার্স্ট ডিজাইন",
      preview: "tiktok-preview"
    },
    {
      id: 'ecommerce',
      name: "ই-কমার্স",
      icon: <CreditCard className="h-6 w-6" />,
      category: "অনলাইন শপ",
      count: "২০+ টেমপ্লেট",
      color: "bg-green-100",
      description: "অনলাইন বিক্রয়ের জন্য কনভার্শন অপটিমাইজড",
      preview: "ecommerce-preview"
    },
    {
      id: 'service-business',
      name: "সার্ভিস বিজনেস",
      icon: <Headphones className="h-6 w-6" />,
      category: "সার্ভিস",
      count: "১৪+ টেমপ্লেট",
      color: "bg-yellow-100",
      description: "সেবা ভিত্তিক ব্যবসার জন্য ট্রাস্ট বিল্ডিং ডিজাইন",
      preview: "service-preview"
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

  const handleTemplatePreview = (template: any) => {
    setSelectedTemplate(template);
    setShowTemplateModal(true);
  };

  const handleTemplateUse = (templateId: string) => {
    toast({
      title: "টেমপ্লেট সিলেক্ট হয়েছে",
      description: "পেমেন্ট লিংক জেনারেট করার জন্য টেমপ্লেট প্রস্তুত",
    });
    setShowTemplateModal(false);
    // Navigate to payment link generator with selected template
  };

  const handleTemplateCustomize = (templateId: string) => {
    toast({
      title: "কাস্টমাইজেশন শুরু",
      description: "টেমপ্লেট কাস্টমাইজেশন পেইজে নিয়ে যাচ্ছি",
    });
    setShowTemplateModal(false);
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

          {/* SecurePay Tab - Complete Platform */}
          <TabsContent value="securepay" className="space-y-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-1 h-auto p-1">
                <TabsTrigger value="overview" className="flex items-center gap-2 px-3 py-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">ওভারভিউ</span>
                </TabsTrigger>
                <TabsTrigger value="creator" className="flex items-center gap-2 px-3 py-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">ক্রিয়েটর</span>
                </TabsTrigger>
                <TabsTrigger value="buyer" className="flex items-center gap-2 px-3 py-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="hidden sm:inline">বায়ার</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2 px-3 py-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">টেমপ্লেট</span>
                </TabsTrigger>
                <TabsTrigger value="features" className="flex items-center gap-2 px-3 py-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">ফিচার</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2 px-3 py-2">
                  <Upload className="h-4 w-4" />
                  <span className="hidden sm:inline">আপলোড</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
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

                {/* Dashboard Access Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-blue-200 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/securepay/creator')}>
                    <CardContent className="p-6 text-center">
                      <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">ক্রিয়েটর প্যানেল</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        সার্ভিস ম্যানেজমেন্ট, আয়ের হিসাব, টেমপ্লেট কাস্টমাইজেশন
                      </p>
                      <Badge className="bg-blue-100 text-blue-800">
                        ক্লিক করুন
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-green-200 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/securepay/buyer')}>
                    <CardContent className="p-6 text-center">
                      <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">বায়ার প্যানেল</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        অর্ডার ম্যানেজমেন্ট, পেমেন্ট, ডিসপিউট, রেটিং সিস্টেম
                      </p>
                      <Badge className="bg-green-100 text-green-800">
                        ক্লিক করুন
                      </Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 border-purple-200 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/securepay/admin')}>
                    <CardContent className="p-6 text-center">
                      <Settings className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">অ্যাডমিন প্যানেল</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        ইউজার ম্যানেজমেন্ট, KYC, ট্রানজেকশন মনিটরিং, অ্যানালিটিক্স
                      </p>
                      <Badge className="bg-purple-100 text-purple-800">
                        ক্লিক করুন
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Creator Tab */}
              <TabsContent value="creator" className="space-y-6">
                <PaymentLinkGenerator />
              </TabsContent>

              {/* Buyer Tab */}
              <TabsContent value="buyer" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      বায়ার ড্যাশবোর্ড ফিচার
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">অর্ডার ম্যানেজমেন্ট:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            অর্ডার ইতিহাস ও স্ট্যাটাস ট্র্যাকিং
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            সার্ভিস রেটিং ও রিভিউ সিস্টেম
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            ডিসপিউট রেজোলিউশন
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            পেমেন্ট হিস্টোরি
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">যোগাযোগ ও সাপোর্ট:</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                            ক্রিয়েটরের সাথে মেসেজিং
                          </li>
                          <li className="flex items-center gap-2">
                            <Upload className="h-4 w-4 text-purple-600" />
                            ফাইল শেয়ারিং সিস্টেম
                          </li>
                          <li className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-orange-600" />
                            রিয়েল-টাইম নোটিফিকেশন
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            এসক্রো পেমেন্ট সুরক্ষা
                          </li>
                        </ul>
                      </div>
                    </div>
                    <Button className="w-full mt-6" onClick={() => navigate('/securepay/buyer')}>
                      বায়ার ড্যাশবোর্ড খুলুন
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="space-y-6">
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
                            <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1 text-xs"
                                onClick={() => handleTemplatePreview(template)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                প্রিভিউ
                              </Button>
                              <Button 
                                size="sm" 
                                className="flex-1 text-xs"
                                onClick={() => handleTemplateUse(template.id)}
                              >
                                ব্যবহার করুন
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <AdvancedFeatures />
              </TabsContent>

              {/* File Upload Tab */}
              <TabsContent value="upload" className="space-y-6">
                <FileUploadSystem />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Template Preview Modal */}
        {selectedTemplate && (
          <TemplatePreviewModal
            template={selectedTemplate}
            isOpen={showTemplateModal}
            onClose={() => setShowTemplateModal(false)}
            onUse={handleTemplateUse}
            onCustomize={handleTemplateCustomize}
          />
        )}
      </div>
    </div>
  );
};

export default Wallet;
