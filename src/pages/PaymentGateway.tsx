
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
  Clock
} from 'lucide-react';
import IntegratedPaymentGateway from '@/components/store/IntegratedPaymentGateway';
import PaymentLinkCreator from '@/components/payment/PaymentLinkCreator';
import QRCodePaymentSystem from '@/components/payment/QRCodePaymentSystem';
import PaymentAnalytics from '@/components/payment/PaymentAnalytics';
import TransactionHistory from '@/components/payment/TransactionHistory';
import RefundManagement from '@/components/payment/RefundManagement';

const PaymentGateway = () => {
  const [activeTab, setActiveTab] = useState('gateway');

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
      title: 'ব্যর্থ ট্রানজেকশন',
      value: '৭',
      change: '-৩%',
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'অপেক্ষমাণ',
      value: '১২',
      change: '+২%',
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <CreditCard className="h-8 w-8 text-primary" />
            পেমেন্ট গেটওয়ে
          </h1>
          <p className="text-muted-foreground mt-2">
            সম্পূর্ণ পেমেন্ট সিস্টেম পরিচালনা করুন - গ্রহণ থেকে বিশ্লেষণ পর্যন্ত
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস
          </Button>
          <Button size="sm">
            <Link className="h-4 w-4 mr-2" />
            নতুন পেমেন্ট লিংক
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
        {/* Tab Navigation - Responsive */}
        <div className="overflow-x-auto">
          <TabsList className="grid w-full min-w-[600px] grid-cols-6 gap-1 h-auto p-1 lg:w-auto lg:inline-flex">
            <TabsTrigger 
              value="gateway" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs sm:text-sm lg:gap-2"
            >
              <CreditCard className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">গেটওয়ে</span>
            </TabsTrigger>
            <TabsTrigger 
              value="links" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs sm:text-sm lg:gap-2"
            >
              <Link className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">লিংক</span>
            </TabsTrigger>
            <TabsTrigger 
              value="qr-code" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs sm:text-sm lg:gap-2"
            >
              <QrCode className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">QR কোড</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs sm:text-sm lg:gap-2"
            >
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">এনালিটিক্স</span>
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs sm:text-sm lg:gap-2"
            >
              <History className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">ইতিহাস</span>
            </TabsTrigger>
            <TabsTrigger 
              value="refunds" 
              className="flex items-center justify-center gap-1 px-2 py-2 text-xs sm:text-sm lg:gap-2"
            >
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">রিফান্ড</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <TabsContent value="gateway" className="space-y-6">
          <IntegratedPaymentGateway />
        </TabsContent>

        <TabsContent value="links" className="space-y-6">
          <PaymentLinkCreator />
        </TabsContent>

        <TabsContent value="qr-code" className="space-y-6">
          <QRCodePaymentSystem />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <PaymentAnalytics />
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="refunds" className="space-y-6">
          <RefundManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentGateway;
