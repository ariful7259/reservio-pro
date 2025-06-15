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
import { StoreFeaturesList } from '@/components/store/StoreFeaturesList';
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
import { StoreDemoButton, FAQSection } from "@/components/store/EasyStoreSetup";

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
          <TabsList className="grid grid-cols-2 w-full h-auto p-1 bg-muted rounded-lg">
            <TabsTrigger 
              value="easy-setup" 
              className="flex flex-col items-center gap-1 p-3 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <Zap className="h-5 w-5" />
              <span>সহজ সেটআপ</span>
            </TabsTrigger>
            <TabsTrigger 
              value="additional" 
              className="flex flex-col items-center gap-1 p-3 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
            >
              <Wand2 className="h-5 w-5" />
              <span>অ্যাডভান্সড</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Mobile Step Indicator */}
          {activeTab !== "easy-setup" && activeTab !== "additional" && (
            <div className="flex justify-center mt-3 mb-2">
              <div className="flex items-center space-x-2">
                {["features", "design", "basic", "settings"].map((step, index) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeTab === step ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <TabsList className="w-full mb-6 grid grid-cols-6 h-auto">
        <TabsTrigger value="easy-setup" className="flex items-center gap-2 p-3">
          <Zap className="h-4 w-4" />
          <span className="hidden sm:inline">সহজ সেটআপ</span>
        </TabsTrigger>
        <TabsTrigger value="features" className="flex items-center gap-2 p-3">
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">ফিচারস</span>
        </TabsTrigger>
        <TabsTrigger value="design" className="flex items-center gap-2 p-3">
          <Paintbrush className="h-4 w-4" />
          <span className="hidden sm:inline">ডিজাইন</span>
        </TabsTrigger>
        <TabsTrigger value="basic" className="flex items-center gap-2 p-3">
          <PanelTop className="h-4 w-4" />
          <span className="hidden sm:inline">বেসিক তথ্য</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2 p-3">
          <Wand2 className="h-4 w-4" />
          <span className="hidden sm:inline">সেটিংস</span>
        </TabsTrigger>
        <TabsTrigger value="additional" className="flex items-center gap-2 p-3">
          <Gift className="h-4 w-4" />
          <span className="hidden sm:inline">অতিরিক্ত</span>
        </TabsTrigger>
      </TabsList>
    );
  };

  // অ্যাডভান্সড ফিচার ট্যাব লিস্ট - মোবাইল অপটিমাইজড
  const renderAdvancedTabsList = () => {
    const advancedTabs = [
      { id: 'analytics', icon: BarChart3, label: 'অ্যানালিটিক্স' },
      { id: 'chat', icon: MessageSquare, label: 'লাইভ চ্যাট' },
      { id: 'multivendor', icon: Sparkles, label: 'মাল্টি-ভেন্ডর' },
      { id: 'language', icon: Globe, label: 'ভাষা ও কারেন্সি' },
      { id: 'backup', icon: Shield, label: 'নিরাপত্তা' },
      { id: 'themes', icon: Palette, label: 'থিম' },
      { id: 'import-export', icon: Upload, label: 'ইমপোর্ট/এক্সপোর্ট' },
      { id: 'payment', icon: CreditCard, label: 'পেমেন্ট' },
      { id: 'tax-invoice', icon: Calculator, label: 'ট্যাক্স ও ইনভয়েস' },
      { id: 'checkout', icon: CreditCard, label: 'চেকআউট' },
      { id: 'shipping', icon: Package, label: 'শিপিং' },
      { id: 'notification', icon: BellRing, label: 'নোটিফিকেশন' },
      { id: 'customization', icon: Palette, label: 'কাস্টমাইজেশন' },
      { id: 'seo', icon: Search, label: 'SEO টুলস' },
      { id: 'referral', icon: Tag, label: 'রেফারেল' }
    ];

    if (isMobile) {
      return (
        <div className="mb-4">
          {/* Mobile Grid Layout */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {advancedTabs.slice(0, 8).map((tab) => (
              <Button
                key={tab.id}
                variant={activeAdvancedTab === tab.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAdvancedTab(tab.id)}
                className="flex flex-col items-center gap-1 h-auto py-3 px-2 text-xs"
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-center leading-tight">{tab.label}</span>
              </Button>
            ))}
          </div>
          
          {/* More Options Dropdown for remaining tabs */}
          {advancedTabs.length > 8 && (
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {advancedTabs.slice(8).map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeAdvancedTab === tab.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveAdvancedTab(tab.id)}
                  className="flex items-center gap-1 whitespace-nowrap text-xs px-3 py-2"
                >
                  <tab.icon className="h-3 w-3" />
                  <span>{tab.label}</span>
                </Button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2 scrollbar-hide">
        {advancedTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeAdvancedTab === tab.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveAdvancedTab(tab.id)}
            className="flex items-center gap-2 whitespace-nowrap"
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
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="container mx-auto px-4 py-4 pt-20">
        {/* Demo Button */}
        <div className="flex justify-end mb-4">
          <StoreDemoButton />
        </div>
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-3">
              <div className="text-center sm:text-left">
                <CardTitle className="text-xl sm:text-2xl font-bold">
                  আপনার অনলাইন স্টোর তৈরি করুন
                </CardTitle>
                <CardDescription className="text-sm sm:text-base mt-2">
                  সহজেই আপনার অনলাইন ব্যবসা শুরু করুন। কোন কোডিং জ্ঞান ছাড়াই আপনার ওয়েবসাইট বানান।
                </CardDescription>
              </div>
              <div className="flex justify-center sm:justify-end">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs">
                  <Sparkles className="h-3 w-3 mr-1 animate-pulse" /> নতুন
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="px-4 sm:px-6 pb-6">
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
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
                    <h3 className="font-semibold text-base">এডভান্সড ফিচারস</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      আপনার স্টোরকে আরো শক্তিশালী করতে নিম্নলিখিত এডভান্সড ফিচারগুলো ব্যবহার করুন
                    </p>
                  </div>
                  
                  {renderAdvancedTabsList()}
                  
                  <div className="min-h-[400px] bg-card rounded-lg border p-4">
                    {renderAdvancedTabContent()}
                  </div>
                  
                  <div className="border-t pt-4">
                    <AdditionalSettings form={form} />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousTab}
                      className="w-full sm:w-auto order-2 sm:order-1"
                    >
                      আগের ধাপ
                    </Button>
                    <Button 
                      onClick={form.handleSubmit(async () => {})} 
                      className="w-full sm:w-auto flex items-center justify-center gap-2 order-1 sm:order-2"
                    >
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
