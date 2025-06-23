
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CreditCard, 
  Users, 
  BarChart3, 
  Settings,
  UserCheck,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';

// Import dashboard components
import SecurePayCreatorDashboard from '@/components/securepay/SecurePayCreatorDashboard';
import SecurePayBuyerDashboard from '@/components/securepay/SecurePayBuyerDashboard';

// Import existing components
import SecurePayTabContent from '@/components/wallet/SecurePayTabContent';

const SecurePay = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const overviewStats = {
    totalTransactions: '৳২,৪৫,৬৮০',
    activeCreators: 156,
    totalBuyers: 420,
    successRate: '98.5%',
    averageRating: 4.8,
    disputeRate: '0.8%'
  };

  const templates = [
    {
      id: "facebook-ads",
      name: "Facebook Ads Campaign",
      category: "মার্কেটিং",
      preview: "/placeholder.svg",
      description: "Facebook বিজ্ঞাপন ক্যাম্পেইনের জন্য বিশেষ ডিজাইন",
    },
    {
      id: "google-ads", 
      name: "Google Ads Expert",
      category: "মার্কেটিং",
      preview: "/placeholder.svg",
      description: "Google Ads সার্ভিসের জন্য পেশাদার টেমপ্লেট",
    }
  ];

  const handleTemplatePreview = (template: any) => {
    console.log('Preview template:', template);
  };

  const handleTemplateUse = (id: string) => {
    console.log('Use template:', id);
  };

  const handleTemplateCustomize = (id: string) => {
    console.log('Customize template:', id);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          SecurePay
        </h1>
        <p className="text-muted-foreground text-lg">
          নিরাপদ এসক্রো পেমেন্ট সিস্টেম - ক্রিয়েটর ও বায়ারদের জন্য সম্পূর্ণ সমাধান
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-1 h-auto p-1">
          <TabsTrigger value="overview" className="flex items-center gap-2 px-4 py-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">ওভারভিউ</span>
          </TabsTrigger>
          <TabsTrigger value="creator" className="flex items-center gap-2 px-4 py-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">ক্রিয়েটর ড্যাশবোর্ড</span>
          </TabsTrigger>
          <TabsTrigger value="buyer" className="flex items-center gap-2 px-4 py-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">বায়ার ড্যাশবোর্ড</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2 px-4 py-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">টেমপ্লেট ও টুলস</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2 px-4 py-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">অ্যাডমিন</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-8">
            {/* Hero Section */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-bold">
                    নিরাপদ ও স্বচ্ছ পেমেন্ট সিস্টেম
                  </h2>
                  <p className="text-lg opacity-90">
                    Escrow-based প্রযুক্তি দিয়ে আপনার ডিজিটাল সার্ভিসের পেমেন্ট সম্পূর্ণ নিরাপদে গ্রহণ করুন
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                      onClick={() => setActiveTab('creator')}
                      className="bg-white text-blue-600 hover:bg-gray-100"
                      size="lg"
                    >
                      ক্রিয়েটর হিসেবে শুরু করুন
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('buyer')}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                      size="lg"
                    >
                      বায়ার হিসেবে যোগ দিন
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">{overviewStats.totalTransactions}</div>
                  <div className="text-muted-foreground">মোট ট্রানজেকশন</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <UserCheck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">{overviewStats.activeCreators}</div>
                  <div className="text-muted-foreground">সক্রিয় ক্রিয়েটর</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">{overviewStats.totalBuyers}</div>
                  <div className="text-muted-foreground">রেজিস্টার্ড বায়ার</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    ক্রিয়েটরদের জন্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    আপনার সার্ভিস বিক্রি করুন এবং নিরাপদে পেমেন্ট গ্রহণ করুন
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      পেমেন্ট লিংক তৈরি করুন
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      পোর্টফোলিও পরিচালনা করুন
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      আয় ট্র্যাক করুন
                    </li>
                  </ul>
                  <Button onClick={() => setActiveTab('creator')} className="w-full">
                    ক্রিয়েটর ড্যাশবোর্ড
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>  
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-purple-600" />
                    বায়ারদের জন্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    সেরা সার্ভিস খুঁজুন এবং নিরাপদে পেমেন্ট করুন
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      হাজারো সার্ভিস ব্রাউজ করুন
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      উইশলিস্ট ও বাজেট পরিচালনা
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      অর্ডার ট্র্যাক করুন
                    </li>
                  </ul>
                  <Button onClick={() => setActiveTab('buyer')} className="w-full">
                    বায়ার ড্যাশবোর্ড
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Creator Dashboard Tab */}
        <TabsContent value="creator">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-blue-600" />
                ক্রিয়েটর ড্যাশবোর্ড
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SecurePayCreatorDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Buyer Dashboard Tab */}
        <TabsContent value="buyer">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
                বায়ার ড্যাশবোর্ড
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SecurePayBuyerDashboard />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates & Tools Tab */}
        <TabsContent value="templates">
          <SecurePayTabContent 
            onTemplatePreview={handleTemplatePreview}
            onTemplateUse={handleTemplateUse}
            onTemplateCustomize={handleTemplateCustomize}
          />
        </TabsContent>

        {/* Admin Tab */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-orange-600" />
                অ্যাডমিন প্যানেল
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">অ্যাডমিন ড্যাশবোর্ড</h3>
                <p className="text-muted-foreground mb-4">
                  সিস্টেম পরিচালনা ও মনিটরিং এর জন্য
                </p>
                <Button variant="outline">
                  অ্যাক্সেস রিকোয়েস্ট করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurePay;
