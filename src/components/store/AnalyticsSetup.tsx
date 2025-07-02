
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingUp, Users, Eye, Target, 
  Facebook, Instagram, MessageSquare, Globe 
} from 'lucide-react';

const AnalyticsSetup: React.FC = () => {
  const [analyticsEnabled, setAnalyticsEnabled] = useState({
    googleAnalytics: true,
    facebookPixel: false,
    tiktokPixel: false,
    googleAds: false
  });

  const [pixelIds, setPixelIds] = useState({
    googleAnalyticsId: '',
    facebookPixelId: '',
    tiktokPixelId: '',
    googleAdsId: ''
  });

  const toggleAnalytics = (type: string) => {
    setAnalyticsEnabled(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const handleIdChange = (type: string, value: string) => {
    setPixelIds(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const analyticsTools = [
    {
      key: 'googleAnalytics',
      name: 'Google Analytics',
      description: 'ওয়েবসাইট ট্রাফিক এবং ব্যবহারকারী আচরণ ট্র্যাক করুন',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      idField: 'googleAnalyticsId',
      placeholder: 'GA-XXXXXXXXX'
    },
    {
      key: 'facebookPixel',
      name: 'Facebook Pixel',
      description: 'Facebook এবং Instagram বিজ্ঞাপনের জন্য কনভার্শন ট্র্যাকিং',
      icon: <Facebook className="h-6 w-6" />,
      color: 'text-blue-800',
      bgColor: 'bg-blue-200',
      idField: 'facebookPixelId',
      placeholder: '1234567890123456'
    },
    {
      key: 'tiktokPixel',
      name: 'TikTok Pixel',
      description: 'TikTok বিজ্ঞাপনের জন্য ইভেন্ট ট্র্যাকিং',
      icon: <MessageSquare className="h-6 w-6" />,
      color: 'text-black',
      bgColor: 'bg-gray-100',
      idField: 'tiktokPixelId',
      placeholder: 'CXXXXXXXXXXXXXXXXX'
    },
    {
      key: 'googleAds',
      name: 'Google Ads',
      description: 'Google বিজ্ঞাপনের কনভার্শন ট্র্যাকিং',
      icon: <Target className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      idField: 'googleAdsId',
      placeholder: 'AW-XXXXXXXXX'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">অ্যানালিটিক্স সেটআপ</h2>
        <p className="text-gray-600">আপনার স্টোরের পারফরমেন্স ট্র্যাক করুন এবং ডেটা-ড্রিভেন সিদ্ধান্ত নিন</p>
      </div>

      <Tabs defaultValue="setup" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            সেটআপ
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            ড্যাশবোর্ড
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analyticsTools.map((tool) => (
              <Card key={tool.key} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tool.bgColor}`}>
                        <div className={tool.color}>
                          {tool.icon}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={analyticsEnabled[tool.key as keyof typeof analyticsEnabled]}
                      onCheckedChange={() => toggleAnalytics(tool.key)}
                    />
                  </div>
                </CardHeader>
                
                {analyticsEnabled[tool.key as keyof typeof analyticsEnabled] && (
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={tool.idField}>{tool.name} ID</Label>
                        <Input
                          id={tool.idField}
                          placeholder={tool.placeholder}
                          value={pixelIds[tool.idField as keyof typeof pixelIds]}
                          onChange={(e) => handleIdChange(tool.idField, e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-600">সংযুক্ত এবং কার্যকর</span>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Setup Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                সেটআপ নির্দেশনা
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-blue-900">Google Analytics</h4>
                  <p className="text-sm text-gray-600">Google Analytics-এ গিয়ে একটি প্রপার্টি তৈরি করুন এবং Measurement ID কপি করুন।</p>
                </div>
                
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-medium text-blue-900">Facebook Pixel</h4>
                  <p className="text-sm text-gray-600">Facebook Ads Manager-এ গিয়ে একটি Pixel তৈরি করুন এবং Pixel ID কপি করুন।</p>
                </div>
                
                <div className="border-l-4 border-gray-600 pl-4">
                  <h4 className="font-medium text-gray-900">TikTok Pixel</h4>
                  <p className="text-sm text-gray-600">TikTok Ads Manager-এ গিয়ে একটি Pixel তৈরি করুন এবং Pixel Code কপি করুন।</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Analytics Dashboard Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">মোট ভিজিটর</p>
                    <p className="text-2xl font-bold">2,543</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">পেজ ভিউ</p>
                    <p className="text-2xl font-bold">8,921</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">কনভার্শন রেট</p>
                    <p className="text-2xl font-bold">3.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">মোট বিক্রয়</p>
                    <p className="text-2xl font-bold">৳45,678</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Preview */}
          <Card>
            <CardHeader>
              <CardTitle>ট্রাফিক অভারভিউ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">ডেটা সংগ্রহ শুরু করার পর চার্ট এখানে দেখাবে</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>রিয়েল-টাইম ভিজিটর</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">12</div>
                  <p className="text-gray-600">এখন অনলাইনে আছেন</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>জনপ্রিয় পেজ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">হোম পেজ</span>
                    <Badge>42%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">পণ্য তালিকা</span>
                    <Badge>28%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">চেকআউট</span>
                    <Badge>15%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-primary to-purple-600">
          <Target className="h-4 w-4 mr-2" />
          অ্যানালিটিক্স সেভ করুন
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsSetup;
