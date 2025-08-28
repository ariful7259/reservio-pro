
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Sparkles, Paintbrush, PanelTop, Wand2, Gift, MoveRight, CreditCard, Tag, BellRing, Palette, Search, BarChart3, MessageSquare, Globe, Shield, Package, Calculator, Upload, Zap } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSellerProfile } from '@/hooks/useSellerProfile';

// রিফ্যাক্টরড কম্পোনেন্টস
import StoreCreationForm, { FormValues, formSchema } from '@/components/store/StoreCreationForm';
import StoreFeaturesList from '@/components/store/StoreFeaturesList';
import SettingsTabContent from '@/components/store/SettingsTabContent';
import DesignTabContent from '@/components/store/DesignTabContent';
import AdditionalSettings from '@/components/store/AdditionalSettings';
import ShippingManager from '@/components/store/ShippingManager';
import OnePageCheckout from '@/components/store/OnePageCheckout';
import NotificationSettings from '@/components/store/NotificationSettings';
import ProductCustomizationWidget from '@/components/store/ProductCustomizationWidget';
import SeoMarketingTools from '@/components/store/SeoMarketingTools';
import { ReferralSystem } from '@/components/sidebar/ReferralSystem';

// নতুন সহজ স্টোর সেটআপ কম্পোনেন্ট
import EasyStoreSetup from '@/components/store/EasyStoreSetup';
import StoreDemoButton from '@/components/store/EasyStoreSetup/StoreDemoButton';
import FAQSection from '@/components/store/EasyStoreSetup/FAQSection';

// নতুন কম্পোনেন্টস
import RealTimeAnalytics from '@/components/analytics/RealTimeAnalytics';
import LiveChatSupport from '@/components/chat/LiveChatSupport';
import MultiVendorSupport from '@/components/marketplace/MultiVendorSupport';
import MultiLanguageCurrency from '@/components/language/MultiLanguageCurrency';
import BackupSecurity from '@/components/security/BackupSecurity';
import ThemeLibrary from '@/components/store/ThemeLibrary';
import ProductImportExport from '@/components/store/ProductImportExport';
import IntegratedPaymentGateway from '@/components/store/IntegratedPaymentGateway';
import TaxInvoiceGenerator from '@/components/store/TaxInvoiceGenerator';

const CreateStore = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("easy-setup");
  const { profile } = useSellerProfile();
  const isMobile = useIsMobile();

  // যদি ব্যবহারকারীর একটি প্রোফাইল থাকে তবে ড্যাশবোর্ডে পরিচালিত করে
  useEffect(() => {
    if (profile) {
      navigate(`/seller-dashboard/${profile.seller_type}`);
    }
  }, [profile, navigate]);

  // ফর্ম ইনিশিয়ালাইজেশন
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      sellerType: "marketplace",
      address: "",
      phone: "",
      email: "",
      bio: "",
      termsConditions: "",
      marketplaceSettings: {
        categories: [],
        deliveryOptions: []
      },
      rentalSettings: {
        propertyTypes: [],
        amenities: [],
        reservationPolicy: ""
      },
      serviceSettings: {
        serviceTypes: [],
        scheduleSettings: {}
      },
      contentSettings: {
        contentTypes: [],
        publicationSchedule: {}
      }
    }
  });
  
  const selectedSellerType = form.watch("sellerType");
  const businessName = form.watch("businessName");

  // পরবর্তী ট্যাবে যাওয়ার জন্য হ্যান্ডলার
  const handleNextTab = () => {
    if (activeTab === "features") {
      setActiveTab("design");
    } else if (activeTab === "design") {
      setActiveTab("basic");
    } else if (activeTab === "basic") {
      setActiveTab("settings");
    } else if (activeTab === "settings") {
      setActiveTab("additional");
    }
  };

  // আগের ট্যাবে যাওয়ার জন্য হ্যান্ডলার
  const handlePreviousTab = () => {
    if (activeTab === "additional") {
      setActiveTab("settings");
    } else if (activeTab === "settings") {
      setActiveTab("basic");
    } else if (activeTab === "basic") {
      setActiveTab("design");
    } else if (activeTab === "design") {
      setActiveTab("features");
    }
  };

  // অ্যাডভান্সড ফিচার ট্যাবগুলি
  const [activeAdvancedTab, setActiveAdvancedTab] = useState('analytics');

  // রেন্ডার অ্যাডভান্সড ট্যাব কন্টেন্ট
  const renderAdvancedTabContent = () => {
    switch (activeAdvancedTab) {
      case 'analytics':
        return <RealTimeAnalytics />;
      case 'chat':
        return <LiveChatSupport />;
      case 'multivendor':
        return <MultiVendorSupport />;
      case 'language':
        return <MultiLanguageCurrency />;
      case 'backup':
        return <BackupSecurity />;
      case 'checkout':
        return <OnePageCheckout />;
      case 'shipping':
        return <ShippingManager />;
      case 'notification':
        return <NotificationSettings />;
      case 'customization':
        return <ProductCustomizationWidget />;
      case 'seo':
        return <SeoMarketingTools />;
      case 'referral':
        return (
          <div className="p-4">
            <ReferralSystem />
          </div>
        );
      case 'themes':
        return <ThemeLibrary />;
      case 'import-export':
        return <ProductImportExport />;
      case 'payment':
        return <IntegratedPaymentGateway />;
      case 'tax-invoice':
        return <TaxInvoiceGenerator />;
      default:
        return <RealTimeAnalytics />;
    }
  };

  // প্রধান ট্যাব লিস্ট - সম্পূর্ণ মোবাইল অপটিমাইজড
  const renderTabsList = () => {
    if (isMobile) {
      return (
        <div className="w-full mb-4">
          <TabsList className="flex w-full h-auto p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border overflow-x-auto scrollbar-hide gap-2">
            <div className="flex gap-2 min-w-max pb-2">
              <TabsTrigger 
                value="easy-setup" 
                className="flex flex-col items-center gap-2 p-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border transition-all duration-300 rounded-lg min-w-[120px] whitespace-nowrap border-2 border-green-200 bg-gradient-to-b from-green-50 to-blue-50"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="font-bold text-center text-green-700">সহজ সেটআপ</span>
              </TabsTrigger>
              <TabsTrigger 
                value="features" 
                className="flex flex-col items-center gap-2 p-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border transition-all duration-300 rounded-lg min-w-[120px] whitespace-nowrap border-2 border-purple-200 bg-gradient-to-b from-blue-50 to-purple-50"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="font-bold text-center text-purple-700">ফিচারস</span>
              </TabsTrigger>
              <TabsTrigger 
                value="design" 
                className="flex flex-col items-center gap-2 p-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border transition-all duration-300 rounded-lg min-w-[120px] whitespace-nowrap border-2 border-pink-200 bg-gradient-to-b from-pink-50 to-red-50"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-pink-400 to-red-500 text-white shadow-md">
                  <Paintbrush className="h-5 w-5" />
                </div>
                <span className="font-bold text-center text-pink-700">ডিজাইন</span>
              </TabsTrigger>
              <TabsTrigger 
                value="basic" 
                className="flex flex-col items-center gap-2 p-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border transition-all duration-300 rounded-lg min-w-[120px] whitespace-nowrap border-2 border-orange-200 bg-gradient-to-b from-orange-50 to-yellow-50"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-md">
                  <PanelTop className="h-5 w-5" />
                </div>
                <span className="font-bold text-center text-orange-700">বেসিক তথ্য</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex flex-col items-center gap-2 p-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border transition-all duration-300 rounded-lg min-w-[120px] whitespace-nowrap border-2 border-teal-200 bg-gradient-to-b from-teal-50 to-cyan-50"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white shadow-md">
                  <Wand2 className="h-5 w-5" />
                </div>
                <span className="font-bold text-center text-teal-700">সেটিংস</span>
              </TabsTrigger>
              <TabsTrigger 
                value="additional" 
                className="flex flex-col items-center gap-2 p-4 text-sm font-bold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border transition-all duration-300 rounded-lg min-w-[120px] whitespace-nowrap border-2 border-purple-200 bg-gradient-to-b from-purple-50 to-pink-50"
              >
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md">
                  <Gift className="h-5 w-5" />
                </div>
                <span className="font-bold text-center text-purple-700">অতিরিক্ত</span>
              </TabsTrigger>
            </div>
          </TabsList>
          
          {/* Mobile Step Indicator */}
          {activeTab !== "easy-setup" && activeTab !== "additional" && (
            <div className="flex justify-center mt-4 mb-3">
              <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-sm border">
                {["features", "design", "basic", "settings"].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeTab === step 
                          ? "bg-gradient-to-r from-primary to-blue-500 shadow-md scale-125" 
                          : "bg-gray-200"
                      }`}
                    />
                    {index < 3 && (
                      <div className={`w-8 h-0.5 mx-1 ${
                        ["features", "design", "basic"].indexOf(activeTab) > index 
                          ? "bg-primary" 
                          : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <TabsList className="w-full mb-6 flex lg:grid lg:grid-cols-6 gap-1 h-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-2 overflow-x-auto scrollbar-hide">
        <div className="flex lg:contents gap-1 min-w-max lg:min-w-0">
        <TabsTrigger value="easy-setup" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all whitespace-nowrap min-w-fit">
          <Zap className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">সহজ সেটআপ</span>
        </TabsTrigger>
        <TabsTrigger value="features" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all whitespace-nowrap min-w-fit">
          <Sparkles className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">ফিচারস</span>
        </TabsTrigger>
        <TabsTrigger value="design" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all whitespace-nowrap min-w-fit">
          <Paintbrush className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">ডিজাইন</span>
        </TabsTrigger>
        <TabsTrigger value="basic" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all whitespace-nowrap min-w-fit">
          <PanelTop className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">বেসিক তথ্য</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all whitespace-nowrap min-w-fit">
          <Wand2 className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">সেটিংস</span>
        </TabsTrigger>
        <TabsTrigger value="additional" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all whitespace-nowrap min-w-fit">
          <Gift className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">অতিরিক্ত</span>
        </TabsTrigger>
        </div>
      </TabsList>
    );
  };

  // অ্যাডভান্সড ফিচার ট্যাব লিস্ট - মোবাইল অপটিমাইজড
  const renderAdvancedTabsList = () => {
    const advancedTabs = [
      { id: 'analytics', icon: BarChart3, label: 'অ্যানালিটিক্স', color: 'from-blue-400 to-blue-600' },
      { id: 'chat', icon: MessageSquare, label: 'লাইভ চ্যাট', color: 'from-green-400 to-green-600' },
      { id: 'multivendor', icon: Sparkles, label: 'মাল্টি-ভেন্ডর', color: 'from-purple-400 to-purple-600' },
      { id: 'language', icon: Globe, label: 'ভাষা ও কারেন্সি', color: 'from-orange-400 to-orange-600' },
      { id: 'backup', icon: Shield, label: 'নিরাপত্তা', color: 'from-red-400 to-red-600' },
      { id: 'themes', icon: Palette, label: 'থিম', color: 'from-pink-400 to-pink-600' },
      { id: 'import-export', icon: Upload, label: 'ইমপোর্ট/এক্সপোর্ট', color: 'from-indigo-400 to-indigo-600' },
      { id: 'payment', icon: CreditCard, label: 'পেমেন্ট', color: 'from-yellow-400 to-yellow-600' }
    ];

    if (isMobile) {
      return (
        <div className="mb-6">
          {/* Mobile: 2 columns grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {advancedTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeAdvancedTab === tab.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAdvancedTab(tab.id)}
                className={`flex flex-col items-center gap-2 h-auto py-4 px-3 text-xs transition-all duration-300 ${
                  activeAdvancedTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg scale-105'
                    : 'hover:shadow-md hover:scale-102 bg-white border-2'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  activeAdvancedTab === tab.id 
                    ? 'bg-white/20' 
                    : `bg-gradient-to-r ${tab.color}`
                }`}>
                  <tab.icon className={`h-4 w-4 ${
                    activeAdvancedTab === tab.id ? 'text-white' : 'text-white'
                  }`} />
                </div>
                <span className="text-center leading-tight font-medium">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex overflow-x-auto pb-2 mb-4 gap-3 scrollbar-hide bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-2">
        {advancedTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeAdvancedTab === tab.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveAdvancedTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
              activeAdvancedTab === tab.id
                ? 'bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg'
                : 'hover:shadow-md bg-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>
    );
  };

  // লগইন না করা ব্যবহারকারীদের জন্য প্রম্পট
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 pt-20 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">লগইন করুন</CardTitle>
            <CardDescription>
              ব্যবসা তৈরি করতে আগে লগইন করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/login', { state: { from: '/create-store' } })} 
              className="w-full h-11 text-base"
            >
              লগইন পৃষ্ঠায় যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Mobile-optimized container */}
      <div className="container mx-auto px-3 sm:px-4 py-4 pt-20 max-w-7xl">
        {/* Demo Button */}
        <div className="flex justify-end mb-4">
          <StoreDemoButton />
        </div>
        
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-purple-100/50">
            <div className="flex flex-col gap-3">
              <div className="text-center sm:text-left">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  আপনার অনলাইন স্টোর তৈরি করুন
                </CardTitle>
                <CardDescription className="text-sm sm:text-base mt-2 text-gray-600">
                  সহজেই আপনার অনলাইন ব্যবসা শুরু করুন। কোন কোডিং জ্ঞান ছাড়াই আপনার ওয়েবসাইট বানান।
                </CardDescription>
              </div>
              <div className="flex justify-center sm:justify-end">
                <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg">
                  <Sparkles className="h-3 w-3 mr-1 animate-pulse" /> 
                  নতুন ও উন্নত
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-3 sm:px-6 pb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {renderTabsList()}

              {/* সহজ সেটআপ ট্যাব - মোবাইল অপটিমাইজড */}
              <TabsContent value="easy-setup" className="space-y-4 animate-in fade-in-50 mt-4">
                <EasyStoreSetup />
              </TabsContent>

              <TabsContent value="features" className="space-y-4 animate-in fade-in-50 mt-4">
                <StoreFeaturesList />
                <div className="flex justify-between items-center mt-6 gap-3">
                  {isMobile && (
                    <Button variant="outline" onClick={() => setActiveTab("easy-setup")} className="flex-1">
                      আগের ধাপ
                    </Button>
                  )}
                  <Button 
                    onClick={handleNextTab} 
                    className={`flex items-center gap-2 ${isMobile ? 'flex-1' : ''}`}
                  >
                    পরবর্তী ধাপ <MoveRight className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="design" className="animate-in fade-in-50 mt-4">
                <DesignTabContent 
                  onNextTab={handleNextTab}
                  onPreviousTab={handlePreviousTab}
                  businessName={businessName}
                />
              </TabsContent>

              <TabsContent value="basic" className="animate-in fade-in-50 mt-4">
                <StoreCreationForm 
                  onNextTab={handleNextTab}
                  onPreviousTab={handlePreviousTab}
                />
              </TabsContent>

              <TabsContent value="settings" className="animate-in fade-in-50 mt-4">
                <SettingsTabContent 
                  form={form}
                  onNextTab={handleNextTab}
                  onPreviousTab={handlePreviousTab}
                  selectedSellerType={selectedSellerType}
                />
              </TabsContent>

              <TabsContent value="additional" className="animate-in fade-in-50 mt-4">
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-blue-100 rounded-xl p-4 sm:p-6 border">
                    <h3 className="font-bold text-base sm:text-lg mb-2">🚀 এডভান্সড ফিচারস</h3>
                    <p className="text-sm text-muted-foreground">
                      আপনার স্টোরকে আরো শক্তিশালী করতে নিম্নলিখিত এডভান্সড ফিচারগুলো ব্যবহার করুন
                    </p>
                  </div>
                  
                  {renderAdvancedTabsList()}
                  
                  <div className="min-h-[400px] bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-100 p-4 sm:p-6 shadow-inner">
                    {renderAdvancedTabContent()}
                  </div>
                  
                  <div className="border-t pt-6">
                    <AdditionalSettings form={form} />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousTab}
                      className="w-full sm:w-auto order-2 sm:order-1 border-2 hover:bg-gray-50"
                    >
                      আগের ধাপ
                    </Button>
                    <Button 
                      onClick={form.handleSubmit(async () => {})} 
                      className="w-full sm:w-auto flex items-center justify-center gap-2 order-1 sm:order-2 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Sparkles className="h-4 w-4" />
                      আপনার স্টোর তৈরি করুন
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* FAQ Section */}
        <FAQSection />
      </div>
      
      {/* Mobile-Optimized Live Chat Support */}
      <div className="fixed bottom-4 right-4 z-50">
        <LiveChatSupport />
      </div>
    </div>
  );
};

export default CreateStore;
