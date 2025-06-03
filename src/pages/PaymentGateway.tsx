
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  QrCode, 
  BarChart3, 
  History, 
  RefreshCw,
  Settings,
  Link,
  Users,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Code,
  Bell,
  UserCheck,
  Eye
} from 'lucide-react';

// Import all creator payment components
import PaymentPageGenerator from '@/components/creator-payment/PaymentPageGenerator';
import EscrowManagement from '@/components/creator-payment/EscrowManagement';
import DisputeManagement from '@/components/creator-payment/DisputeManagement';
import FraudDetection from '@/components/creator-payment/FraudDetection';
import KycVerification from '@/components/creator-payment/KycVerification';
import NotificationCenter from '@/components/creator-payment/NotificationCenter';
import AdminDashboard from '@/components/creator-payment/AdminDashboard';
import ApiIntegration from '@/components/creator-payment/ApiIntegration';
import CreatorDashboard from '@/components/creator-payment/CreatorDashboard';
import BuyerDashboard from '@/components/creator-payment/BuyerDashboard';

// Import existing payment components
import PaymentAnalytics from '@/components/payment/PaymentAnalytics';
import TransactionHistory from '@/components/payment/TransactionHistory';

const PaymentGateway = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('creator-system');

  // Check URL params for initial tab
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Payment gateway stats
  const stats = [
    {
      title: 'আজকের পেমেন্ট',
      value: '৳৪৮,৫০০',
      change: '+১২%',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'সফল ট্রানজেকশন',
      value: '১৮৫',
      change: '+৮%',
      icon: <CheckCircle2 className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Escrow এ সংরক্ষিত',
      value: '৳২৫,০০০',
      change: '+১৫%',
      icon: <Shield className="h-5 w-5 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'সক্রিয় বিরোধ',
      value: 'ৃ',
      change: '-২%',
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      color: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-primary" />
            Creator Payment System
          </h1>
          <p className="text-muted-foreground mt-2">
            সম্পূর্ণ Creator Payment সিস্টেম - Escrow, Dispute Management এবং আরও অনেক কিছু
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস
          </Button>
          <Button size="sm" onClick={() => setActiveTab('creator-system')}>
            <Link className="h-4 w-4 mr-2" />
            নতুন পেমেন্ট পেজ
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className={`${stat.color} transition-all hover:shadow-md`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.change} গত সপ্তাহ থেকে</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-white/50 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {/* Tab Navigation */}
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-[1200px] grid-cols-12 gap-1 h-auto p-1">
            <TabsTrigger 
              value="creator-system" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <Link className="h-4 w-4" />
              <span>Payment Pages</span>
            </TabsTrigger>
            <TabsTrigger 
              value="escrow" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <Shield className="h-4 w-4" />
              <span>Escrow</span>
            </TabsTrigger>
            <TabsTrigger 
              value="disputes" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <AlertCircle className="h-4 w-4" />
              <span>Disputes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fraud" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <Shield className="h-4 w-4" />
              <span>Fraud</span>
            </TabsTrigger>
            <TabsTrigger 
              value="creator-dashboard" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <Users className="h-4 w-4" />
              <span>Creator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="buyer-dashboard" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <UserCheck className="h-4 w-4" />
              <span>Buyer</span>
            </TabsTrigger>
            <TabsTrigger 
              value="admin" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <Settings className="h-4 w-4" />
              <span>Admin</span>
            </TabsTrigger>
            <TabsTrigger 
              value="kyc" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <UserCheck className="h-4 w-4" />
              <span>KYC</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <Code className="h-4 w-4" />
              <span>API</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex flex-col items-center justify-center gap-1 px-2 py-3 text-xs h-auto"
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          <TabsContent value="creator-system" className="space-y-6 mt-6">
            <PaymentPageGenerator />
          </TabsContent>

          <TabsContent value="escrow" className="space-y-6 mt-6">
            <EscrowManagement />
          </TabsContent>

          <TabsContent value="disputes" className="space-y-6 mt-6">
            <DisputeManagement />
          </TabsContent>

          <TabsContent value="fraud" className="space-y-6 mt-6">
            <FraudDetection />
          </TabsContent>

          <TabsContent value="creator-dashboard" className="space-y-6 mt-6">
            <CreatorDashboard />
          </TabsContent>

          <TabsContent value="buyer-dashboard" className="space-y-6 mt-6">
            <BuyerDashboard />
          </TabsContent>

          <TabsContent value="admin" className="space-y-6 mt-6">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="kyc" className="space-y-6 mt-6">
            <KycVerification />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <NotificationCenter />
          </TabsContent>

          <TabsContent value="api" className="space-y-6 mt-6">
            <ApiIntegration />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <PaymentAnalytics />
          </TabsContent>

          <TabsContent value="history" className="space-y-6 mt-6">
            <TransactionHistory />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PaymentGateway;
