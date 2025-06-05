
import React, { useState } from 'react';
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
import IntegratedPaymentGateway from '@/components/store/IntegratedPaymentGateway';
import PaymentLinkCreator from '@/components/payment/PaymentLinkCreator';
import QRCodePaymentSystem from '@/components/payment/QRCodePaymentSystem';
import PaymentAnalytics from '@/components/payment/PaymentAnalytics';
import TransactionHistory from '@/components/payment/TransactionHistory';
import RefundManagement from '@/components/payment/RefundManagement';

const PaymentGateway = () => {
  const [activeTab, setActiveTab] = useState('creator-system');

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
      value: '৩',
      change: '-২%',
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      color: 'bg-red-50 border-red-200'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
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
          <Button size="sm">
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
        {/* Tab Navigation - Enhanced for many tabs */}
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-[1200px] grid-cols-12 gap-1 h-auto p-1">
            <TabsTrigger 
              value="creator-system" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <Link className="h-3 w-3" />
              <span className="hidden lg:inline">Creator System</span>
            </TabsTrigger>
            <TabsTrigger 
              value="escrow" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <Shield className="h-3 w-3" />
              <span className="hidden lg:inline">Escrow</span>
            </TabsTrigger>
            <TabsTrigger 
              value="disputes" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <AlertCircle className="h-3 w-3" />
              <span className="hidden lg:inline">Disputes</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fraud" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <Shield className="h-3 w-3" />
              <span className="hidden lg:inline">Fraud</span>
            </TabsTrigger>
            <TabsTrigger 
              value="creator-dashboard" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <Users className="h-3 w-3" />
              <span className="hidden lg:inline">Creator</span>
            </TabsTrigger>
            <TabsTrigger 
              value="buyer-dashboard" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <UserCheck className="h-3 w-3" />
              <span className="hidden lg:inline">Buyer</span>
            </TabsTrigger>
            <TabsTrigger 
              value="admin" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <Settings className="h-3 w-3" />
              <span className="hidden lg:inline">Admin</span>
            </TabsTrigger>
            <TabsTrigger 
              value="kyc" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <UserCheck className="h-3 w-3" />
              <span className="hidden lg:inline">KYC</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <Bell className="h-3 w-3" />
              <span className="hidden lg:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="api" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <Code className="h-3 w-3" />
              <span className="hidden lg:inline">API</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <BarChart3 className="h-3 w-3" />
              <span className="hidden lg:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs"
            >
              <History className="h-3 w-3" />
              <span className="hidden lg:inline">History</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="creator-system" className="space-y-6">
          <PaymentPageGenerator />
        </TabsContent>

        <TabsContent value="escrow" className="space-y-6">
          <EscrowManagement />
        </TabsContent>

        <TabsContent value="disputes" className="space-y-6">
          <DisputeManagement />
        </TabsContent>

        <TabsContent value="fraud" className="space-y-6">
          <FraudDetection />
        </TabsContent>

        <TabsContent value="creator-dashboard" className="space-y-6">
          <CreatorDashboard />
        </TabsContent>

        <TabsContent value="buyer-dashboard" className="space-y-6">
          <BuyerDashboard />
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="kyc" className="space-y-6">
          <KycVerification />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationCenter />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <ApiIntegration />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <PaymentAnalytics />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <TransactionHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentGateway;
