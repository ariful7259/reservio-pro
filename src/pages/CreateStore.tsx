
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
import { Sparkles, Paintbrush, PanelTop, Wand2, Gift, MoveRight, CreditCard, Tag, BellRing, Palette, Search } from 'lucide-react';
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

const CreateStore = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("features");
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
      // বেসিক ট্যাব থেকে ব্যবসার ধরন অনুযায়ী সেটিংস ট্যাবে যান
      setActiveTab("settings");
    } else if (activeTab === "settings") {
      // সেটিংস ট্যাব থেকে অতিরিক্ত ট্যাবে যান
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
  const [activeAdvancedTab, setActiveAdvancedTab] = useState('checkout');

  // রেন্ডার অ্যাডভান্সড ট্যাব কন্টেন্ট
  const renderAdvancedTabContent = () => {
    switch (activeAdvancedTab) {
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
      default:
        return <OnePageCheckout />;
    }
  };

  // প্রধান ট্যাব লিস্ট - রেসপন্সিভ
  const renderTabsList = () => {
    if (isMobile) {
      return (
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="features">
            <span className="flex flex-col items-center sm:flex-row sm:gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs">ফিচারস</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="design">
            <span className="flex flex-col items-center sm:flex-row sm:gap-2">
              <Paintbrush className="h-4 w-4" />
              <span className="text-xs">ডিজাইন</span>
            </span>
          </TabsTrigger>
          <TabsTrigger value="basic">
            <span className="flex flex-col items-center sm:flex-row sm:gap-2">
              <PanelTop className="h-4 w-4" />
              <span className="text-xs">বেসিক</span>
            </span>
          </TabsTrigger>
        </TabsList>
      );
    }

    return (
      <TabsList className="w-full mb-6 grid grid-cols-5">
        <TabsTrigger value="features">
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>ফিচারস</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="design">
          <span className="flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            <span>ডিজাইন</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="basic">
          <span className="flex items-center gap-2">
            <PanelTop className="h-4 w-4" />
            <span>বেসিক তথ্য</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="settings">
          <span className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            <span>সেটিংস</span>
          </span>
        </TabsTrigger>
        <TabsTrigger value="additional">
          <span className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span>অতিরিক্ত</span>
          </span>
        </TabsTrigger>
      </TabsList>
    );
  };

  // অ্যাডভান্সড ফিচার ট্যাব লিস্ট
  const renderAdvancedTabsList = () => {
    return (
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2 scrollbar-hide">
        <Button 
          variant={activeAdvancedTab === 'checkout' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveAdvancedTab('checkout')}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <CreditCard className="h-4 w-4" /> ওয়ান-পেজ চেকআউট
        </Button>
        <Button 
          variant={activeAdvancedTab === 'shipping' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveAdvancedTab('shipping')}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <MoveRight className="h-4 w-4" /> শিপিং ম্যানেজার
        </Button>
        <Button 
          variant={activeAdvancedTab === 'notification' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveAdvancedTab('notification')}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <BellRing className="h-4 w-4" /> নোটিফিকেশন
        </Button>
        <Button 
          variant={activeAdvancedTab === 'customization' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveAdvancedTab('customization')}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Palette className="h-4 w-4" /> কাস্টমাইজেশন উইজেট
        </Button>
        <Button 
          variant={activeAdvancedTab === 'seo' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveAdvancedTab('seo')}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Search className="h-4 w-4" /> SEO টুলস
        </Button>
        <Button 
          variant={activeAdvancedTab === 'referral' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveAdvancedTab('referral')}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <Tag className="h-4 w-4" /> রেফারেল সিস্টেম
        </Button>
      </div>
    );
  };

  // লগইন না করা ব্যবহারকারীদের জন্য প্রম্পট
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>লগইন করুন</CardTitle>
            <CardDescription>
              ব্যবসা তৈরি করতে আগে লগইন করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/login', { state: { from: '/create-store' } })} className="w-full">
              লগইন পৃষ্ঠায় যান
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <CardTitle className="text-2xl">আপনার অনলাইন স্টোর তৈরি করুন</CardTitle>
              <CardDescription className="max-w-2xl">
                সহজেই আপনার অনলাইন ব্যবসা শুরু করুন। কোন কোডিং জ্ঞান ছাড়াই আপনার ওয়েবসাইট বানান।
              </CardDescription>
            </div>
            <Badge className="self-start sm:self-auto bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3 mr-1 animate-pulse" /> নতুন
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {renderTabsList()}

            <TabsContent value="features" className="space-y-6 animate-in fade-in-50">
              <StoreFeaturesList />
              <div className="flex justify-end mt-6">
                <Button onClick={handleNextTab} className="flex items-center gap-2">
                  পরবর্তী ধাপ <MoveRight className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="animate-in fade-in-50">
              <DesignTabContent 
                onNextTab={handleNextTab}
                onPreviousTab={handlePreviousTab}
                businessName={businessName}
              />
            </TabsContent>

            <TabsContent value="basic" className="animate-in fade-in-50">
              <StoreCreationForm 
                onNextTab={handleNextTab}
                onPreviousTab={handlePreviousTab}
              />
            </TabsContent>

            <TabsContent value="settings" className="animate-in fade-in-50">
              <SettingsTabContent 
                form={form}
                onNextTab={handleNextTab}
                onPreviousTab={handlePreviousTab}
                selectedSellerType={selectedSellerType}
              />
            </TabsContent>

            <TabsContent value="additional" className="animate-in fade-in-50">
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4">
                  <h3 className="font-medium">এডভান্সড ফিচারস</h3>
                  <p className="text-sm text-muted-foreground">
                    আপনার স্টোরকে আরো শক্তিশালী করতে নিম্নলিখিত এডভান্সড ফিচারগুলো ব্যবহার করুন
                  </p>
                </div>
                
                {renderAdvancedTabsList()}
                {renderAdvancedTabContent()}
                
                <div className="border-t pt-6">
                  <AdditionalSettings form={form} />
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={handlePreviousTab}>
                    আগের ধাপ
                  </Button>
                  <Button 
                    onClick={form.handleSubmit(async () => {})} 
                    className="flex items-center gap-2"
                  >
                    আপনার স্টোর তৈরি করুন
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateStore;
