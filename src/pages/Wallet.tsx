import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Send, QrCode, CreditCard, Bell, BarChart3, Banknote, Globe, MapPin, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletCard from '@/components/WalletCard';
import TransactionItem from '@/components/TransactionItem';
import WalletQRCode from '@/components/WalletQRCode';
import SendMoneyForm from '@/components/SendMoneyForm';
import BillPayment from '@/components/wallet/BillPayment';
import LoyaltyPoints from '@/components/wallet/LoyaltyPoints';
import WalletNearbyServices from '@/components/WalletNearbyServices';
import P2PPaymentModal from '@/components/P2PPaymentModal';
import PaymentLinkGenerator from '@/components/securepay/PaymentLinkGenerator';
import TemplatePreviewModal from '@/components/securepay/TemplatePreviewModal';
import AdvancedFeatures from '@/components/securepay/AdvancedFeatures';
import FileUploadSystem from '@/components/securepay/FileUploadSystem';
import AIBookingAssistant from '@/components/chatbot/AIBookingAssistant';
import LocationBasedOffers from '@/components/notifications/LocationBasedOffers';
import BNPLIntegration from '@/components/payment/BNPLIntegration';
import VendorFinancing from '@/components/finance/VendorFinancing';
import MultiLanguageCurrency from '@/components/language/MultiLanguageCurrency';
import SecurePayTabContent from "@/components/wallet/SecurePayTabContent";
import SecurePayPremiumGrid from "@/components/securepay/SecurePayPremiumGrid";

const Wallet = () => {
  const navigate = useNavigate();
  const [showQRCode, setShowQRCode] = useState(false);
  const [showSendMoney, setShowSendMoney] = useState(false);
  const [showP2PPayment, setShowP2PPayment] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);

  // Mock data for transactions
  const transactions = [
    { id: '1', type: 'income', amount: 1500, date: '2024-11-27', description: 'Salary from Tech Ltd.' },
    { id: '2', type: 'expense', amount: 300, date: '2024-11-26', description: 'Grocery shopping at PQS' },
    { id: '3', type: 'transfer', amount: 500, date: '2024-11-25', description: 'Sent to Masud' },
  ];

  // Mock data for nearby services
  const nearbyServices = [
    { id: '1', name: 'City Supermarket', category: 'Shopping', distance: '0.5 km' },
    { id: '2', name: 'Popular Pharmacy', category: 'Health', distance: '1.2 km' },
    { id: '3', name: ' নির্ণয় ডায়াগনস্টিক সেন্টার', category: 'Health', distance: '1.8 km' },
  ];

  const templates = [
    {
      id: 'facebook-ads',
      name: 'Facebook Ads Campaign',
      category: 'মার্কেটিং',
      preview: '/placeholder.svg',
      description: 'Facebook বিজ্ঞাপন ক্যাম্পেইনের জন্য বিশেষ ডিজাইন'
    },
    {
      id: 'google-ads',
      name: 'Google Ads Expert',
      category: 'মার্কেটিং',
      preview: '/placeholder.svg',
      description: 'Google Ads সার্ভিসের জন্য পেশাদার টেমপ্লেট'
    },
    {
      id: 'logo-design',
      name: 'Logo Design Service',
      category: 'ডিজাইন',
      preview: '/placeholder.svg',
      description: 'লোগো ডিজাইন সার্ভিসের জন্য আকর্ষণীয় পেজ'
    },
    {
      id: 'web-development',
      name: 'Web Development',
      category: 'ডেভেলপমেন্ট',
      preview: '/placeholder.svg',
      description: 'ওয়েব ডেভেলপমেন্ট সার্ভিসের জন্য টেমপ্লেট'
    },
    {
      id: 'content-writing',
      name: 'Content Writing',
      category: 'রাইটিং',
      preview: '/placeholder.svg',
      description: 'কন্টেন্ট রাইটিং সার্ভিসের জন্য পেজ'
    },
    {
      id: 'seo-service',
      name: 'SEO Service',
      category: 'মার্কেটিং',
      preview: '/placeholder.svg',
      description: 'SEO সার্ভিসের জন্য অপটিমাইজড টেমপ্লেট'
    },
    {
      id: 'video-editing',
      name: 'Video Editing',
      category: 'ভিডিও',
      preview: '/placeholder.svg',
      description: 'ভিডিও এডিটিং সার্ভিসের জন্য ক্রিয়েটিভ পেজ'
    },
    {
      id: 'social-media',
      name: 'Social Media Management',
      category: 'মার্কেটিং',
      preview: '/placeholder.svg',
      description: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট সার্ভিস'
    }
  ];

  const handleTemplatePreview = (template: any) => {
    setSelectedTemplate(template);
    setShowTemplatePreview(true);
  };

  const handleTemplateUse = (templateId: string) => {
    console.log('Using template:', templateId);
  };

  const handleTemplateCustomize = (templateId: string) => {
    console.log('Customizing template:', templateId);
  };

  return (
    <div className="container pt-16 pb-20 px-4">
      {/* Header with back button and title */}
      <div className="bg-red-500 text-white p-6 rounded-t-xl mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-red-600">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">ওয়ালেট</h1>
        </div>
        <WalletCard balance={25000} />
      </div>

      <Tabs defaultValue="home" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger value="home">হোম</TabsTrigger>
          <TabsTrigger value="securepay">SecurePay</TabsTrigger>
          <TabsTrigger value="ai-features">AI ফিচার</TabsTrigger>
          <TabsTrigger value="finance">ফাইন্যান্স</TabsTrigger>
          <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        {/* Home Tab */}
        <TabsContent value="home" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button onClick={() => setShowSendMoney(true)} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Money
                </Button>
                <Button onClick={() => setShowQRCode(true)} variant="outline" className="flex-1">
                  <QrCode className="h-4 w-4 mr-2" />
                  Show QR Code
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nearby Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nearbyServices.map(service => (
                    <div key={service.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">{service.category}</div>
                      </div>
                      <div className="text-sm text-blue-600">{service.distance}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground">{transaction.date}</div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 
                    transaction.type === 'expense' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}৳{transaction.amount}
                  </div>
                </div>
              ))}
              <Button variant="link" className="w-full">View All Transactions</Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BillPayment />
            <LoyaltyPoints />
          </div>
        </TabsContent>

        {/* SecurePay Tab */}
        <TabsContent value="securepay" className="space-y-6">
          <SecurePayTabContent
            onTemplatePreview={handleTemplatePreview}
            onTemplateUse={handleTemplateUse}
            onTemplateCustomize={handleTemplateCustomize}
          />
        </TabsContent>

        {/* AI Features Tab */}
        <TabsContent value="ai-features" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIBookingAssistant />
            <LocationBasedOffers />
          </div>
        </TabsContent>

        {/* Finance Tab */}
        <TabsContent value="finance" className="space-y-6">
          <Tabs defaultValue="bnpl" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bnpl">Buy Now Pay Later</TabsTrigger>
              <TabsTrigger value="financing">ভেন্ডর ফাইন্যান্সিং</TabsTrigger>
            </TabsList>

            <TabsContent value="bnpl">
              <BNPLIntegration />
            </TabsContent>

            <TabsContent value="financing">
              <VendorFinancing />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <LocationBasedOffers />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <MultiLanguageCurrency />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {showQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">আপনার QR কোড</h3>
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                QR Code Here
              </div>
            </div>
            <Button onClick={() => setShowQRCode(false)} className="w-full">
              বন্ধ করুন
            </Button>
          </div>
        </div>
      )}
      
      {showSendMoney && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">টাকা পাঠান</h3>
            <div className="space-y-4">
              <Input placeholder="ফোন নম্বর" />
              <Input placeholder="পরিমাণ" />
              <Button className="w-full">পাঠান</Button>
              <Button variant="outline" onClick={() => setShowSendMoney(false)} className="w-full">
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {showP2PPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">P2P পেমেন্ট</h3>
            <Button variant="outline" onClick={() => setShowP2PPayment(false)} className="w-full">
              বন্ধ করুন
            </Button>
          </div>
        </div>
      )}
      
      {showTemplatePreview && selectedTemplate && (
        <TemplatePreviewModal
          template={selectedTemplate}
          isOpen={showTemplatePreview}
          onClose={() => setShowTemplatePreview(false)}
          onUse={handleTemplateUse}
          onCustomize={handleTemplateCustomize}
        />
      )}
    </div>
  );
};

export default Wallet;
