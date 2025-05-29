
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import PaymentLinkCreator from '@/components/creator-payment/PaymentLinkCreator';
import CreatorDashboard from '@/components/creator-payment/CreatorDashboard';
import BuyerDashboard from '@/components/creator-payment/BuyerDashboard';
import AdminDashboard from '@/components/creator-payment/AdminDashboard';

const CreatorPaymentGateway = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: 'Escrow Protection',
      description: 'সম্পূর্ণ নিরাপত্তার সাথে পেমেন্ট ধরে রাখা হয় কাজ সম্পন্ন না হওয়া পর্যন্ত'
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: 'Multiple Payment Methods',
      description: 'bKash, Nagad, Rocket, VISA, Mastercard সব ধরনের পেমেন্ট সাপোর্ট'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Dispute Resolution',
      description: 'যেকোনো সমস্যার জন্য সুষ্ঠু সমাধান ব্যবস্থা এবং রিফান্ড প্রসেস'
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: 'Instant Setup',
      description: 'মাত্র ২ মিনিটে আপনার পেমেন্ট লিংক তৈরি করুন এবং ব্যবসা শুরু করুন'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="lg:hidden"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Creator Payment Gateway
            </h1>
            <p className="text-muted-foreground">ডিজিটাল ক্রিয়েটরদের জন্য সম্পূর্ণ নিরাপদ পেমেন্ট সিস্টেম</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
            <TabsTrigger value="create">পেমেন্ট লিংক</TabsTrigger>
            <TabsTrigger value="creator">ক্রিয়েটর ড্যাশবোর্ড</TabsTrigger>
            <TabsTrigger value="buyer">বায়ার ড্যাশবোর্ড</TabsTrigger>
            <TabsTrigger value="admin">অ্যাডমিন ড্যাশবোর্ড</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-8">
              {/* Hero Section */}
              <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-bold">
                      নিরাপদ ও স্বচ্ছ পেমেন্ট সিস্টেম
                    </h2>
                    <p className="text-lg opacity-90">
                      Escrow-based প্রযুক্তি দিয়ে আপনার ডিজিটাল সার্ভিসের পেমেন্ট সম্পূর্ণ নিরাপদে গ্রহণ করুন
                    </p>
                    <Button 
                      onClick={() => setActiveTab('create')}
                      className="bg-white text-purple-600 hover:bg-gray-100"
                      size="lg"
                    >
                      এখনই শুরু করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          {feature.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* How it Works */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">কীভাবে কাজ করে?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-3">
                      <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-purple-600 font-bold">১</span>
                      </div>
                      <h4 className="font-semibold">পেমেন্ট লিংক তৈরি</h4>
                      <p className="text-sm text-muted-foreground">আপনার সার্ভিসের জন্য কাস্টম পেমেন্ট লিংক তৈরি করুন</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-blue-600 font-bold">২</span>
                      </div>
                      <h4 className="font-semibold">নিরাপদ পেমেন্ট</h4>
                      <p className="text-sm text-muted-foreground">কাস্টমার পেমেন্ট করলে তা Escrow-তে সংরক্ষিত থাকে</p>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-green-600 font-bold">৩</span>
                      </div>
                      <h4 className="font-semibold">কাজ সম্পন্ন ও পেমেন্ট</h4>
                      <p className="text-sm text-muted-foreground">কাজ সম্পন্ন হলে পেমেন্ট আপনার অ্যাকাউন্টে চলে যাবে</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <PaymentLinkCreator />
          </TabsContent>

          <TabsContent value="creator">
            <CreatorDashboard />
          </TabsContent>

          <TabsContent value="buyer">
            <BuyerDashboard />
          </TabsContent>

          <TabsContent value="admin">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorPaymentGateway;
