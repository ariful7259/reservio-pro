import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Store, Palette, Settings, CreditCard, Truck, BarChart3, 
  Globe, Shield, MessageSquare, Upload, Zap, CheckCircle2 
} from 'lucide-react';
import StoreDesignEditor from './StoreDesignEditor';
import ProductManagement from './ProductManagement';
import PaymentGatewaySetup from './PaymentGatewaySetup';
import ShippingConfiguration from './ShippingConfiguration';
import SEOSettings from './SEOSettings';
import AnalyticsSetup from './AnalyticsSetup';

interface StoreData {
  storeName: string;
  storeDescription: string;
  storeCategory: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  address: string;
  logo?: File;
  banner?: File;
}

const CreateStoreBuilder: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('basic');
  const [storeData, setStoreData] = useState<StoreData>({
    storeName: '',
    storeDescription: '',
    storeCategory: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    address: ''
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (field: keyof StoreData, value: string) => {
    setStoreData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: 'logo' | 'banner', file: File) => {
    setStoreData(prev => ({ ...prev, [field]: file }));
  };

  const createStore = async () => {
    setIsCreating(true);
    try {
      // Simulate store creation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "স্টোর তৈরি সফল! 🎉",
        description: `${storeData.storeName} সফলভাবে তৈরি হয়েছে। আপনার স্টোর এখন লাইভ!`,
      });
      
      // Here you would typically redirect to the store dashboard
    } catch (error) {
      toast({
        title: "ত্রুটি হয়েছে",
        description: "স্টোর তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'বেসিক তথ্য', icon: Store },
    { id: 'design', label: 'ডিজাইন', icon: Palette },
    { id: 'products', label: 'পণ্য', icon: Upload },
    { id: 'payment', label: 'পেমেন্ট', icon: CreditCard },
    { id: 'shipping', label: 'শিপিং', icon: Truck },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'analytics', label: 'অ্যানালিটিক্স', icon: BarChart3 },
    { id: 'settings', label: 'সেটিংস', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-2 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="text-center mb-6 md:mb-8 px-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2 md:mb-4">
            আপনার অনলাইন স্টোর তৈরি করুন
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            সহজেই একটি পেশাদার অনলাইন স্টোর তৈরি করুন। সব ফিচার সহ, সম্পূর্ণ রেসপন্সিভ ডিজাইন।
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardContent className="p-2 sm:p-4 md:p-6 lg:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Mobile/Tablet/Desktop Responsive Tabs */}
              <div className="mb-4 md:mb-6">
                {/* Mobile Dropdown for Tabs */}
                <div className="block md:hidden mb-4">
                  <select
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full p-3 border rounded-lg bg-white text-sm shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tablet/Desktop Tab List */}
                <TabsList className="hidden md:grid md:grid-cols-4 lg:grid-cols-8 gap-1 lg:gap-2 h-auto bg-gray-50 p-1 lg:p-2 rounded-xl w-full">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex flex-col items-center gap-1 p-2 lg:p-3 text-xs lg:text-sm data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg transition-all min-h-[60px] lg:min-h-[70px] hover:bg-white/50"
                    >
                      <tab.icon className="h-4 w-4 lg:h-5 lg:w-5" />
                      <span className="text-center leading-tight font-medium">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Mobile Tab Indicators */}
                <div className="flex md:hidden justify-center space-x-1 mt-3">
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        activeTab === tab.id ? 'bg-primary w-6' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Basic Information Tab - Responsive Layout */}
              <TabsContent value="basic" className="space-y-4 md:space-y-6 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="storeName" className="text-sm font-medium">স্টোরের নাম *</Label>
                      <Input
                        id="storeName"
                        placeholder="আপনার স্টোরের নাম লিখুন"
                        value={storeData.storeName}
                        onChange={(e) => handleInputChange('storeName', e.target.value)}
                        className="h-10 md:h-12 text-sm md:text-base mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="storeDescription" className="text-sm font-medium">স্টোরের বিবরণ</Label>
                      <Textarea
                        id="storeDescription"
                        placeholder="আপনার স্টোর সম্পর্কে লিখুন"
                        value={storeData.storeDescription}
                        onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                        rows={3}
                        className="text-sm md:text-base mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="storeCategory" className="text-sm font-medium">স্টোরের ক্যাটাগরি</Label>
                      <Input
                        id="storeCategory"
                        placeholder="যেমন: ফ্যাশন, ইলেকট্রনিক্স, খাবার"
                        value={storeData.storeCategory}
                        onChange={(e) => handleInputChange('storeCategory', e.target.value)}
                        className="h-10 md:h-12 text-sm md:text-base mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="ownerName" className="text-sm font-medium">মালিকের নাম *</Label>
                      <Input
                        id="ownerName"
                        placeholder="আপনার নাম"
                        value={storeData.ownerName}
                        onChange={(e) => handleInputChange('ownerName', e.target.value)}
                        className="h-10 md:h-12 text-sm md:text-base mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerEmail" className="text-sm font-medium">ইমেইল *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="আপনার ইমেইল"
                        value={storeData.ownerEmail}
                        onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                        className="h-10 md:h-12 text-sm md:text-base mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ownerPhone" className="text-sm font-medium">ফোন নম্বর *</Label>
                      <Input
                        id="ownerPhone"
                        placeholder="01XXXXXXXXX"
                        value={storeData.ownerPhone}
                        onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                        className="h-10 md:h-12 text-sm md:text-base mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-sm font-medium">ঠিকানা</Label>
                      <Textarea
                        id="address"
                        placeholder="আপনার ব্যবসার ঠিকানা"
                        value={storeData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows={3}
                        className="text-sm md:text-base mt-1"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Design Tab - Properly Structured */}
              <TabsContent value="design" className="mt-0">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 md:p-6 border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Palette className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">অনলাইন স্টোর ডিজাইন</h3>
                      <p className="text-sm text-gray-600">আপনার স্টোরের ডিজাইন কাস্টমাইজ করুন</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border">
                    <StoreDesignEditor storeName={storeData.storeName || "আমার স্টোর"} />
                  </div>
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="mt-0">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 md:p-6 border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Upload className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">পণ্য ব্যবস্থাপনা</h3>
                      <p className="text-sm text-gray-600">আপনার পণ্য যুক্ত ও ব্যবস্থাপনা করুন</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border">
                    <ProductManagement />
                  </div>
                </div>
              </TabsContent>

              {/* Other Tabs with proper structure */}
              <TabsContent value="payment" className="mt-0">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 md:p-6 border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <CreditCard className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">পেমেন্ট গেটওয়ে</h3>
                      <p className="text-sm text-gray-600">পেমেন্ট পদ্ধতি সেটআপ করুন</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border">
                    <PaymentGatewaySetup />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-0">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Truck className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">শিপিং কনফিগারেশন</h3>
                      <p className="text-sm text-gray-600">ডেলিভারি সেটিংস কনফিগার করুন</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border">
                    <ShippingConfiguration />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="seo" className="mt-0">
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-4 md:p-6 border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Globe className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">SEO সেটিংস</h3>
                      <p className="text-sm text-gray-600">সার্চ ইঞ্জিন অপটিমাইজেশন করুন</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border">
                    <SEOSettings />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 md:p-6 border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900">অ্যানালিটিক্স সেটআপ</h3>
                      <p className="text-sm text-gray-600">ব্যবসার পারফরমেন্স ট্র্যাক করুন</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border">
                    <AnalyticsSetup />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 md:p-6 border">
                    <h3 className="text-lg md:text-xl font-semibold mb-4">অতিরিক্ত সেটিংস</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                            <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                            নিরাপত্তা
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">SSL সার্টিফিকেট এবং ডেটা এনক্রিপশন</p>
                          <Badge className="bg-green-100 text-green-800 text-xs">সক্রিয়</Badge>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                            <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                            কাস্টমার সাপোর্ট
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">লাইভ চ্যাট এবং টিকেট সিস্টেম</p>
                          <Button variant="outline" size="sm" className="text-xs md:text-sm">সেটআপ করুন</Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                সব ফিচার বিনামূল্যে
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
                <Button variant="outline" className="px-4 md:px-6 text-xs md:text-sm h-9 md:h-10 border-2 hover:bg-gray-50">
                  প্রিভিউ দেখুন
                </Button>
                <Button 
                  onClick={createStore}
                  disabled={isCreating || !storeData.storeName || !storeData.ownerName}
                  className="px-6 md:px-8 bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg text-xs md:text-sm h-9 md:h-10 font-semibold"
                >
                  {isCreating ? (
                    <>
                      <Zap className="h-3 w-3 md:h-4 md:w-4 mr-2 animate-spin" />
                      তৈরি হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Zap className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                      স্টোর তৈরি করুন
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateStoreBuilder;
