
import React, { useState } from "react";
import { CreditCard, Banknote, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentLinkGenerator from "@/components/securepay/PaymentLinkGenerator";
import AdvancedFeatures from "@/components/securepay/AdvancedFeatures";
import FileUploadSystem from "@/components/securepay/FileUploadSystem";
import SecurePayPremiumGrid from "@/components/securepay/SecurePayPremiumGrid";

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
  },
  {
    id: "logo-design",
    name: "Logo Design Service",
    category: "ডিজাইন",
    preview: "/placeholder.svg",
    description: "লোগো ডিজাইন সার্ভিসের জন্য আকর্ষণীয় পেজ",
  },
  {
    id: "web-development",
    name: "Web Development",
    category: "ডেভেলপমেন্ট",
    preview: "/placeholder.svg",
    description: "ওয়েব ডেভেলপমেন্ট সার্ভিসের জন্য টেমপ্লেট",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    category: "রাইটিং",
    preview: "/placeholder.svg",
    description: "কন্টেন্ট রাইটিং সার্ভিসের জন্য পেজ",
  },
  {
    id: "seo-service",
    name: "SEO Service",
    category: "মার্কেটিং",
    preview: "/placeholder.svg",
    description: "SEO সার্ভিসের জন্য অপটিমাইজড টেমপ্লেট",
  },
  {
    id: "video-editing",
    name: "Video Editing",
    category: "ভিডিও",
    preview: "/placeholder.svg",
    description: "ভিডিও এডিটিং সার্ভিসের জন্য ক্রিয়েটিভ পেজ",
  },
  {
    id: "social-media",
    name: "Social Media Management",
    category: "মার্কেটিং",
    preview: "/placeholder.svg",
    description: "সোশ্যাল মিডিয়া ম্যানেজমেন্ট সার্ভিস",
  },
];

interface SecurePayTabContentProps {
  onTemplatePreview: (template: any) => void;
  onTemplateUse: (id: string) => void;
  onTemplateCustomize: (id: string) => void;
}

const SecurePayTabContent: React.FC<SecurePayTabContentProps> = ({
  onTemplatePreview,
  onTemplateUse,
  onTemplateCustomize,
}) => {
  return (
    <div className="space-y-6">
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
                        onClick={() => onTemplatePreview(template)}
                        className="flex-1 text-xs"
                      >
                        প্রিভিউ
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onTemplateUse(template.id)}
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

      {/* SecurePay Premium Grid */}
      <SecurePayPremiumGrid />

      {/* Advanced, Link etc. Tabs */}
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
    </div>
  );
};

export default SecurePayTabContent;
