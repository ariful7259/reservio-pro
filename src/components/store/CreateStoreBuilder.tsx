
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useSellerProfile } from '@/hooks/useSellerProfile';
import { 
  Store, Palette, CreditCard, Truck, Globe, Eye, QrCode,
  Facebook, Instagram, Clock, FileText, Power, MessageCircle,
  Upload, Package, Plus, X, Copy, ExternalLink, Check, Loader2
} from 'lucide-react';
import QRCode from 'react-qr-code';
import DragDropEditor from './DragDropEditor';
import ProductManagement from './ProductManagement';
import PaymentGatewaySetup from './PaymentGatewaySetup';
import ShippingConfiguration from './ShippingConfiguration';

interface StoreData {
  storeName: string;
  storeSlug: string;
  storeDescription: string;
  storeCategory: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  address: string;
  logo?: string;
  banner?: string;
  isOpen: boolean;
  customDomain: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
  businessHours: {
    monday: { open: string; close: string; isOpen: boolean };
    tuesday: { open: string; close: string; isOpen: boolean };
    wednesday: { open: string; close: string; isOpen: boolean };
    thursday: { open: string; close: string; isOpen: boolean };
    friday: { open: string; close: string; isOpen: boolean };
    saturday: { open: string; close: string; isOpen: boolean };
    sunday: { open: string; close: string; isOpen: boolean };
  };
  returnPolicy: string;
  whatsappOrderEnabled: boolean;
}

const defaultBusinessHours = {
  monday: { open: '09:00', close: '18:00', isOpen: true },
  tuesday: { open: '09:00', close: '18:00', isOpen: true },
  wednesday: { open: '09:00', close: '18:00', isOpen: true },
  thursday: { open: '09:00', close: '18:00', isOpen: true },
  friday: { open: '09:00', close: '18:00', isOpen: true },
  saturday: { open: '10:00', close: '16:00', isOpen: true },
  sunday: { open: '10:00', close: '16:00', isOpen: false },
};

const CreateStoreBuilder: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile } = useSellerProfile();
  const [activeTab, setActiveTab] = useState('basic');
  const [storeData, setStoreData] = useState<StoreData>({
    storeName: '',
    storeSlug: '',
    storeDescription: '',
    storeCategory: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    address: '',
    isOpen: true,
    customDomain: '',
    socialLinks: { facebook: '', instagram: '', whatsapp: '' },
    businessHours: defaultBusinessHours,
    returnPolicy: '',
    whatsappOrderEnabled: true,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Load existing profile data
  useEffect(() => {
    if (profile) {
      const settings = profile.marketplace_settings as any || {};
      setStoreData(prev => ({
        ...prev,
        storeName: profile.business_name || '',
        storeSlug: generateSlug(profile.business_name || ''),
        ownerEmail: profile.email || '',
        ownerPhone: profile.phone || '',
        address: profile.address || '',
        storeDescription: profile.bio || '',
        socialLinks: settings.socialLinks || prev.socialLinks,
        businessHours: settings.businessHours || prev.businessHours,
        returnPolicy: settings.returnPolicy || '',
        isOpen: settings.isOpen ?? true,
        whatsappOrderEnabled: settings.whatsappOrderEnabled ?? true,
        customDomain: settings.customDomain || '',
      }));
    }
  }, [profile]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleInputChange = (field: keyof StoreData, value: any) => {
    setStoreData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'storeName') {
        updated.storeSlug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSocialChange = (platform: keyof StoreData['socialLinks'], value: string) => {
    setStoreData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const handleBusinessHoursChange = (
    day: keyof StoreData['businessHours'],
    field: 'open' | 'close' | 'isOpen',
    value: string | boolean
  ) => {
    setStoreData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { ...prev.businessHours[day], [field]: value }
      }
    }));
  };

  const storeUrl = `${window.location.origin}/store/${storeData.storeSlug || 'your-store'}`;

  const copyStoreUrl = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
    toast({ title: "লিংক কপি হয়েছে!" });
  };

  const handlePreview = () => {
    window.open(`/store/${storeData.storeSlug || 'demo'}`, '_blank');
  };

  const createStore = async () => {
    if (!storeData.storeName.trim() || !storeData.ownerPhone.trim()) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "স্টোরের নাম এবং ফোন নম্বর আবশ্যক।",
        variant: "destructive"
      });
      return;
    }

    if (!user?.id) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "অনুগ্রহ করে লগইন করুন।",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    try {
      // Prepare store settings JSON
      const storeSettings = {
        storeSlug: storeData.storeSlug,
        socialLinks: storeData.socialLinks,
        businessHours: storeData.businessHours,
        returnPolicy: storeData.returnPolicy,
        isOpen: storeData.isOpen,
        whatsappOrderEnabled: storeData.whatsappOrderEnabled,
        customDomain: storeData.customDomain,
        storeCategory: storeData.storeCategory,
      };

      // Update seller_profiles with store data
      const { error } = await supabase
        .from('seller_profiles')
        .update({
          business_name: storeData.storeName,
          phone: storeData.ownerPhone,
          email: storeData.ownerEmail,
          address: storeData.address,
          bio: storeData.storeDescription,
          marketplace_settings: storeSettings,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "স্টোর সেভ হয়েছে! 🎉",
        description: `${storeData.storeName} সফলভাবে সেভ হয়েছে।`,
      });

      // Reload the page to refresh profile data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      console.error('Store save error:', error);
      toast({
        title: "ত্রুটি",
        description: error.message || "আবার চেষ্টা করুন।",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'বেসিক', icon: Store },
    { id: 'design', label: 'ডিজাইন', icon: Palette },
    { id: 'products', label: 'পণ্য', icon: Package },
    { id: 'payment', label: 'পেমেন্ট', icon: CreditCard },
    { id: 'shipping', label: 'শিপিং', icon: Truck },
    { id: 'domain', label: 'ডোমেইন', icon: Globe },
  ];

  const dayNames: Record<string, string> = {
    monday: 'সোমবার',
    tuesday: 'মঙ্গলবার',
    wednesday: 'বুধবার',
    thursday: 'বৃহস্পতিবার',
    friday: 'শুক্রবার',
    saturday: 'শনিবার',
    sunday: 'রবিবার',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
            আপনার অনলাইন স্টোর তৈরি করুন
          </h1>
          <p className="text-sm text-muted-foreground">
            সহজেই পেশাদার স্টোর তৈরি করুন • কাস্টম ডোমেইন সাপোর্ট
          </p>
        </div>

        {/* Store Status & QR */}
        <Card className="mb-4 border-0 shadow-lg bg-gradient-to-r from-primary/10 to-purple-500/10">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Power className={`h-5 w-5 ${storeData.isOpen ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="font-medium">{storeData.isOpen ? 'স্টোর খোলা' : 'স্টোর বন্ধ'}</span>
                  <Switch
                    checked={storeData.isOpen}
                    onCheckedChange={(checked) => handleInputChange('isOpen', checked)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <QRCode value={storeUrl} size={60} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 bg-background/80 rounded-lg px-3 py-1.5">
                    <span className="text-xs truncate max-w-[150px] sm:max-w-[250px]">{storeUrl}</span>
                    <Button variant="ghost" size="sm" onClick={copyStoreUrl} className="h-6 w-6 p-0">
                      {copiedUrl ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={handlePreview} className="text-xs h-7">
                    <Eye className="h-3 w-3 mr-1" /> প্রিভিউ
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-0">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Mobile Dropdown */}
              <div className="block md:hidden mb-4">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full p-3 border rounded-lg bg-background text-sm shadow-sm focus:ring-2 focus:ring-primary"
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>{tab.label}</option>
                  ))}
                </select>
              </div>

              {/* Desktop Tabs */}
              <TabsList className="hidden md:grid md:grid-cols-6 gap-1 h-auto bg-muted/50 p-1 rounded-xl mb-6">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all"
                  >
                    <tab.icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-6 mt-0 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Store Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Store className="h-4 w-4 text-primary" /> স্টোর তথ্য
                    </h3>
                    <div>
                      <Label>স্টোরের নাম *</Label>
                      <Input
                        placeholder="আপনার স্টোরের নাম"
                        value={storeData.storeName}
                        onChange={(e) => handleInputChange('storeName', e.target.value)}
                        className="mt-1"
                      />
                      {storeData.storeSlug && (
                        <p className="text-xs text-muted-foreground mt-1">
                          URL: /store/{storeData.storeSlug}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>স্টোরের বিবরণ</Label>
                      <Textarea
                        placeholder="আপনার স্টোর সম্পর্কে লিখুন"
                        value={storeData.storeDescription}
                        onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                        rows={3}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>ক্যাটাগরি</Label>
                      <Input
                        placeholder="যেমন: ফ্যাশন, ইলেকট্রনিক্স"
                        value={storeData.storeCategory}
                        onChange={(e) => handleInputChange('storeCategory', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Owner Info & Social */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">মালিকের তথ্য</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>নাম</Label>
                        <Input
                          placeholder="আপনার নাম"
                          value={storeData.ownerName}
                          onChange={(e) => handleInputChange('ownerName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>ফোন *</Label>
                        <Input
                          placeholder="01XXXXXXXXX"
                          value={storeData.ownerPhone}
                          onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>ইমেইল</Label>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={storeData.ownerEmail}
                        onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    {/* Social Links */}
                    <h3 className="font-semibold pt-2">সোশ্যাল লিংক</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <Input
                          placeholder="Facebook Page URL"
                          value={storeData.socialLinks.facebook}
                          onChange={(e) => handleSocialChange('facebook', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-pink-600" />
                        <Input
                          placeholder="Instagram Profile URL"
                          value={storeData.socialLinks.instagram}
                          onChange={(e) => handleSocialChange('instagram', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-green-600" />
                        <Input
                          placeholder="WhatsApp Number (880...)"
                          value={storeData.socialLinks.whatsapp}
                          onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    {/* WhatsApp Order */}
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">WhatsApp অর্ডার বাটন</span>
                      </div>
                      <Switch
                        checked={storeData.whatsappOrderEnabled}
                        onCheckedChange={(checked) => handleInputChange('whatsappOrderEnabled', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-primary" /> ব্যবসার সময়সূচী
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {Object.entries(storeData.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <Switch
                          checked={hours.isOpen}
                          onCheckedChange={(checked) => handleBusinessHoursChange(day as any, 'isOpen', checked)}
                        />
                        <span className="text-sm font-medium w-16">{dayNames[day]}</span>
                        {hours.isOpen && (
                          <div className="flex items-center gap-1 text-xs">
                            <Input
                              type="time"
                              value={hours.open}
                              onChange={(e) => handleBusinessHoursChange(day as any, 'open', e.target.value)}
                              className="h-7 w-20 text-xs"
                            />
                            <span>-</span>
                            <Input
                              type="time"
                              value={hours.close}
                              onChange={(e) => handleBusinessHoursChange(day as any, 'close', e.target.value)}
                              className="h-7 w-20 text-xs"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Return Policy */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4 text-primary" /> রিটার্ন পলিসি
                  </h3>
                  <Textarea
                    placeholder="আপনার রিটার্ন ও রিফান্ড পলিসি লিখুন..."
                    value={storeData.returnPolicy}
                    onChange={(e) => handleInputChange('returnPolicy', e.target.value)}
                    rows={4}
                  />
                </div>
              </TabsContent>

              {/* Design Tab */}
              <TabsContent value="design" className="mt-0 animate-fade-in">
                <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-xl p-4 border min-h-[500px]">
                  <DragDropEditor storeName={storeData.storeName || "আমার স্টোর"} />
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="mt-0 animate-fade-in">
                <div className="bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-xl p-4 border">
                  <ProductManagement />
                </div>
              </TabsContent>

              {/* Payment Tab */}
              <TabsContent value="payment" className="mt-0 animate-fade-in">
                <div className="bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-xl p-4 border">
                  <PaymentGatewaySetup />
                </div>
              </TabsContent>

              {/* Shipping Tab */}
              <TabsContent value="shipping" className="mt-0 animate-fade-in">
                <div className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl p-4 border">
                  <ShippingConfiguration />
                </div>
              </TabsContent>

              {/* Custom Domain Tab */}
              <TabsContent value="domain" className="mt-0 animate-fade-in">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-6 border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">কাস্টম ডোমেইন</h3>
                        <p className="text-sm text-muted-foreground">আপনার নিজের ডোমেইন কানেক্ট করুন</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>আপনার ডোমেইন</Label>
                        <Input
                          placeholder="www.yourbrand.com"
                          value={storeData.customDomain}
                          onChange={(e) => handleInputChange('customDomain', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div className="bg-background/80 rounded-lg p-4">
                        <h4 className="font-medium mb-3">DNS সেটআপ নির্দেশনা:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="text-xs">1</Badge>
                            <span>আপনার ডোমেইন প্রোভাইডারে লগইন করুন</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="text-xs">2</Badge>
                            <span>DNS সেটিংসে যান</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="text-xs">3</Badge>
                            <div>
                              <span>নিচের রেকর্ড যোগ করুন:</span>
                              <div className="bg-muted p-2 rounded mt-1 font-mono text-xs">
                                A Record: @ → 185.158.133.1<br/>
                                CNAME: www → your-store.lovable.app
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full">
                        <Globe className="h-4 w-4 mr-2" /> ডোমেইন ভেরিফাই করুন
                      </Button>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <QrCode className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">স্টোর QR Code</h3>
                        <p className="text-sm text-muted-foreground">স্ক্যান করে সহজে শেয়ার করুন</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <div className="bg-white p-4 rounded-xl shadow-lg">
                        <QRCode value={storeUrl} size={180} />
                      </div>
                      <p className="text-sm text-center text-muted-foreground">{storeUrl}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={copyStoreUrl}>
                          <Copy className="h-4 w-4 mr-2" /> কপি লিংক
                        </Button>
                        <Button variant="outline" onClick={handlePreview}>
                          <ExternalLink className="h-4 w-4 mr-2" /> স্টোর দেখুন
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" /> প্রিভিউ দেখুন
              </Button>
              <Button
                onClick={createStore}
                disabled={isCreating}
                className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> সেভ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Store className="h-4 w-4 mr-2" /> স্টোর সেভ করুন
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateStoreBuilder;
