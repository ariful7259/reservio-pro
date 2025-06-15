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
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">SecurePay</h2>
                <p className="text-lg">নিরাপদ এসক্রো পেমেন্ট সিস্টেম</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 p-6 h-auto">
                    <div className="text-center">
                      <CreditCard className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">ক্রিয়েটর হিসেবে শুরু করুন</div>
                      <div className="text-sm opacity-80">আপনার সার্ভিস বিক্রি করুন</div>
                    </div>
                  </Button>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 p-6 h-auto">
                    <div className="text-center">
                      <Banknote className="h-8 w-8 mx-auto mb-2" />
                      <div className="font-semibold">বায়ার হিসেবে যোগ দিন</div>
                      <div className="text-sm opacity-80">নিরাপদে সার্ভিস কিনুন</div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Templates */}
          <Card>
            <CardHeader>
              <CardTitle>৮+ প্রিমিয়াম ল্যান্ডিং পেজ টেমপ্লেট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-2xl mb-2">🎨</div>
                        <div className="font-medium text-sm">{template.name}</div>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {template.category}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleTemplatePreview(template)}
                            className="flex-1 text-xs"
                          >
                            প্রিভিউ
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleTemplateUse(template.id)}
                            className="flex-1 text-xs"
                          >
                            ব্যবহার করুন
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ⬇️ SecurePay Grid Section added here */}
          <SecurePayPremiumGrid />

          <Tabs defaultValue="link-generator" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="link-generator">পেমেন্ট লিংক</TabsTrigger>
              <TabsTrigger value="advanced">অ্যাডভান্সড</TabsTrigger>
              <TabsTrigger value="files">ফাইল আপলোড</TabsTrigger>
              <TabsTrigger value="panels">প্যানেল</TabsTrigger>
            </TabsList>

            <TabsContent value="link-generator">
              <PaymentLinkGenerator />
            </TabsContent>

            <TabsContent value="advanced">
              <AdvancedFeatures />
            </TabsContent>

            <TabsContent value="files">
              <FileUploadSystem />
            </TabsContent>

            <TabsContent value="panels">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">ক্রিয়েটর প্যানেল</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    আপনার সার্ভিস ম্যানেজ করুন, অর্ডার ট্র্যাক করুন
                  </p>
                  <Button className="w-full">অ্যাক্সেস করুন</Button>
                </Card>

                <Card className="p-6 text-center">
                  <Banknote className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold mb-2">বায়ার প্যানেল</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    অর্ডার হিস্টরি, পেমেন্ট ট্র্যাকিং
                  </p>
                  <Button className="w-full">অ্যাক্সেস করুন</Button>
                </Card>

                <Card className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">অ্যাডমিন প্যানেল</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    সিস্টেম ম্যানেজমেন্ট ও অ্যানালিটিক্স
                  </p>
                  <Button className="w-full">অ্যাক্সেস করুন</Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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
