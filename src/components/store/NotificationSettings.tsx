
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  BellRing, 
  Mail, 
  MessageSquare, 
  SmartphoneNfc, 
  Check,
  Loader2,
  AlertTriangle,
  Settings,
  MailCheck
} from 'lucide-react';

interface NotificationType {
  id: string;
  name: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  description: string;
}

const NotificationSettings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('settings');
  const [isSaving, setIsSaving] = useState(false);
  const [isTestingSending, setIsTestingSending] = useState(false);

  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: 'order-placed',
      name: 'অর্ডার প্লেস',
      email: true,
      sms: true,
      push: true,
      description: 'অর্ডার সফলভাবে প্লেস হলে কাস্টমারকে নোটিফিকেশন পাঠান'
    },
    {
      id: 'order-confirmed',
      name: 'অর্ডার কনফার্মেশন',
      email: true,
      sms: true,
      push: true,
      description: 'অর্ডার কনফার্ম হলে কাস্টমারকে নোটিফিকেশন পাঠান'
    },
    {
      id: 'order-shipped',
      name: 'অর্ডার শিপিং',
      email: true,
      sms: true,
      push: true,
      description: 'অর্ডার শিপ করা হলে কাস্টমারকে নোটিফিকেশন পাঠান'
    },
    {
      id: 'order-delivered',
      name: 'অর্ডার ডেলিভারি',
      email: true,
      sms: false,
      push: true,
      description: 'অর্ডার ডেলিভার হলে কাস্টমারকে নোটিফিকেশন পাঠান'
    },
    {
      id: 'abandoned-cart',
      name: 'পরিত্যক্ত কার্ট',
      email: true,
      sms: false,
      push: false,
      description: 'কার্টে পণ্য রেখে কাস্টমার চলে গেলে রিমাইন্ডার পাঠান'
    },
    {
      id: 'review-request',
      name: 'রিভিউ রিকোয়েস্ট',
      email: true,
      sms: false,
      push: true,
      description: 'ডেলিভারির পর কাস্টমারকে প্রোডাক্ট রিভিউ দেয়ার অনুরোধ করুন'
    },
    {
      id: 'price-drop',
      name: 'মূল্য হ্রাস',
      email: true,
      sms: false,
      push: true,
      description: 'কাস্টমারের উইশলিস্টের পণ্যের দাম কমলে নোটিফিকেশন পাঠান'
    },
    {
      id: 'back-in-stock',
      name: 'পুনরায় স্টকে',
      email: true,
      sms: false,
      push: true,
      description: 'আউট অফ স্টক পণ্য পুনরায় স্টকে আসলে কাস্টমারকে জানান'
    }
  ]);

  const [emailSettings, setEmailSettings] = useState({
    senderName: 'আমার স্টোর',
    senderEmail: 'contact@mystore.com',
    replyToEmail: 'support@mystore.com',
    footerText: 'ধন্যবাদ আমাদের দোকান থেকে কেনাকাটা করার জন্য।',
    logo: true,
    socialLinks: true
  });

  const [smsSettings, setSmsSettings] = useState({
    senderName: 'MyStore',
    apiKey: '',
    testNumber: ''
  });

  const handleNotificationChange = (id: string, type: 'email' | 'sms' | 'push', value: boolean) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, [type]: value } 
        : notification
    ));
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        title: "সেটিংস সংরক্ষিত হয়েছে",
        description: "নোটিফিকেশন সেটিংস সফলভাবে আপডেট করা হয়েছে।",
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleTestNotification = () => {
    setIsTestingSending(true);
    setTimeout(() => {
      toast({
        title: "টেস্ট ইমেইল পাঠানো হয়েছে",
        description: "আপনার ইমেইল ঠিকানায় একটি টেস্ট নোটিফিকেশন পাঠানো হয়েছে। দয়া করে চেক করুন।",
      });
      setIsTestingSending(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <BellRing className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium">স্বয়ংক্রিয় ইমেইল ও পুশ নোটিফিকেশন</h3>
          <p className="text-sm text-muted-foreground">
            আপনার কাস্টমারদের সাথে ইমেইল, SMS ও পুশ নোটিফিকেশন মাধ্যমে যোগাযোগ রাখুন। অর্ডার আপডেট, প্রমোশন ও রিমাইন্ডার পাঠান।
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-3">
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" /> সেটিংস
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> টেমপ্লেট
          </TabsTrigger>
          <TabsTrigger value="test" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> টেস্ট
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-0">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">নোটিফিকেশন ম্যানেজার</CardTitle>
                <CardDescription>
                  কোন ইভেন্টে কোন ধরনের নোটিফিকেশন পাঠাতে চান সেটি কনফিগার করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="mb-4 sm:mb-0">
                        <h4 className="font-medium">{notification.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-6 items-center">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id={`${notification.id}-email`}
                            checked={notification.email}
                            onCheckedChange={(value) => handleNotificationChange(notification.id, 'email', value)}
                          />
                          <Label htmlFor={`${notification.id}-email`} className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            <span className="hidden sm:inline">ইমেইল</span>
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id={`${notification.id}-sms`}
                            checked={notification.sms}
                            onCheckedChange={(value) => handleNotificationChange(notification.id, 'sms', value)}
                          />
                          <Label htmlFor={`${notification.id}-sms`} className="flex items-center gap-1">
                            <SmartphoneNfc className="h-4 w-4" />
                            <span className="hidden sm:inline">SMS</span>
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch 
                            id={`${notification.id}-push`}
                            checked={notification.push}
                            onCheckedChange={(value) => handleNotificationChange(notification.id, 'push', value)}
                          />
                          <Label htmlFor={`${notification.id}-push`} className="flex items-center gap-1">
                            <BellRing className="h-4 w-4" />
                            <span className="hidden sm:inline">পুশ</span>
                          </Label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    ইমেইল কনফিগারেশন
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">প্রেরকের নাম</Label>
                    <Input 
                      id="sender-name" 
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">প্রেরকের ইমেইল</Label>
                    <Input 
                      id="sender-email" 
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reply-email">রিপ্লাই ইমেইল</Label>
                    <Input 
                      id="reply-email" 
                      value={emailSettings.replyToEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, replyToEmail: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="footer-text">ফুটার টেক্সট</Label>
                    <Input 
                      id="footer-text" 
                      value={emailSettings.footerText}
                      onChange={(e) => setEmailSettings({...emailSettings, footerText: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch 
                      id="logo" 
                      checked={emailSettings.logo}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, logo: checked})}
                    />
                    <Label htmlFor="logo">ইমেইলে লোগো দেখান</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="social-links" 
                      checked={emailSettings.socialLinks}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, socialLinks: checked})}
                    />
                    <Label htmlFor="social-links">সোশ্যাল মিডিয়া লিংক যুক্ত করুন</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <SmartphoneNfc className="h-5 w-5" />
                    SMS কনফিগারেশন
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-amber-700">
                        SMS পাঠাতে হলে SMS গেটওয়ে সার্ভিস প্রোভাইডার যেমন SSL Wireless, Twilio ইত্যাদির API Key সেট করতে হবে। 
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sms-sender-name">সেন্ডার আইডি</Label>
                    <Input 
                      id="sms-sender-name" 
                      value={smsSettings.senderName}
                      onChange={(e) => setSmsSettings({...smsSettings, senderName: e.target.value})}
                      placeholder="MyStore"
                    />
                    <p className="text-xs text-muted-foreground">
                      SMS প্রেরকের নাম (সর্বোচ্চ ১১ অক্ষর এবং কোন স্পেস ছাড়া)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API কী</Label>
                    <Input 
                      id="api-key" 
                      type="password"
                      value={smsSettings.apiKey}
                      onChange={(e) => setSmsSettings({...smsSettings, apiKey: e.target.value})}
                      placeholder="আপনার SMS গেটওয়ে API কী দিন"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="test-number">টেস্ট SMS পাঠানোর নম্বর</Label>
                    <Input 
                      id="test-number" 
                      value={smsSettings.testNumber}
                      onChange={(e) => setSmsSettings({...smsSettings, testNumber: e.target.value})}
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isSaving} className="px-8">
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    সংরক্ষণ হচ্ছে...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    সেটিংস সংরক্ষণ করুন
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ইমেইল টেমপ্লেট</CardTitle>
              <CardDescription>
                বিভিন্ন ধরনের নোটিফিকেশন ইমেইলের জন্য টেমপ্লেট কাস্টমাইজ করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border overflow-hidden">
                  <div className="bg-muted p-3 font-medium">
                    অর্ডার কনফার্মেশন ইমেইল
                  </div>
                  <div className="p-4">
                    <div className="border rounded-md p-4 overflow-hidden">
                      <div className="bg-card p-4">
                        <div className="text-center mb-4">
                          <div className="h-10 w-40 bg-primary/20 mx-auto mb-2 rounded flex items-center justify-center text-primary font-bold">LOGO</div>
                          <h2 className="text-xl font-bold">অর্ডার কনফার্মেশন</h2>
                        </div>
                        
                        <div className="mb-4">
                          <p>প্রিয় [গ্রাহকের_নাম],</p>
                          <p className="mt-2">আপনার অর্ডার (#[অর্ডার_নম্বর]) সফলভাবে গৃহীত হয়েছে। আপনার পণ্য শীঘ্রই প্রস্তুত করা হবে।</p>
                        </div>
                        
                        <div className="border rounded-md p-3 mb-4 bg-muted/50">
                          <h3 className="font-medium mb-2">অর্ডার সামারি:</h3>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>পণ্য:</span>
                              <span>[পণ্যের_নাম] x [পরিমাণ]</span>
                            </div>
                            <div className="flex justify-between">
                              <span>মূল্য:</span>
                              <span>[মূল্য]</span>
                            </div>
                            <div className="flex justify-between">
                              <span>শিপিং:</span>
                              <span>[শিপিং_চার্জ]</span>
                            </div>
                            <div className="flex justify-between font-medium">
                              <span>মোট:</span>
                              <span>[মোট_মূল্য]</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="inline-block bg-primary text-white px-4 py-2 rounded-md">অর্ডার ট্র্যাক করুন</div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t text-center text-xs text-muted-foreground">
                          <p>ধন্যবাদ আমাদের দোকান থেকে কেনাকাটা করার জন্য।</p>
                          <div className="flex justify-center gap-2 mt-2">
                            <div className="h-5 w-5 rounded-full bg-muted"></div>
                            <div className="h-5 w-5 rounded-full bg-muted"></div>
                            <div className="h-5 w-5 rounded-full bg-muted"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="mr-2">
                        প্রিভিউ
                      </Button>
                      <Button size="sm">
                        এডিট করুন
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <div className="bg-muted p-3 font-medium">
                    পণ্য শিপিং নোটিফিকেশন
                  </div>
                  <div className="p-4">
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="mr-2">
                        প্রিভিউ
                      </Button>
                      <Button size="sm">
                        এডিট করুন
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <div className="bg-muted p-3 font-medium">
                    অর্ডার ডেলিভারি নোটিফিকেশন
                  </div>
                  <div className="p-4">
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" className="mr-2">
                        প্রিভিউ
                      </Button>
                      <Button size="sm">
                        এডিট করুন
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-700">
                      আপনি আরও টেমপ্লেট যোগ করতে পারেন এবং বিভিন্ন ধরনের অটোমেশন সেট করতে পারেন।
                      প্রতিটি টেমপ্লেটে ডাইনামিক ভ্যারিয়েবল ব্যবহার করে পার্সোনালাইজড মেসেজ পাঠাতে পারেন।
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">টেস্ট নোটিফিকেশন</CardTitle>
              <CardDescription>
                আপনার নোটিফিকেশন সেটআপ পরীক্ষা করতে টেস্ট মেসেজ পাঠান
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="test-email">টেস্ট ইমেইল ঠিকানা</Label>
                    <Input 
                      id="test-email" 
                      type="email" 
                      placeholder="yourname@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>নোটিফিকেশন টাইপ</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline">অর্ডার কনফার্মেশন</Button>
                      <Button variant="outline">শিপিং আপডেট</Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleTestNotification}
                    disabled={isTestingSending}
                    className="w-full"
                  >
                    {isTestingSending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        পাঠানো হচ্ছে...
                      </>
                    ) : (
                      <>
                        <MailCheck className="h-4 w-4 mr-2" />
                        টেস্ট ইমেইল পাঠান
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium text-green-700">ইমেইল সেটআপ সম্পন্ন</h3>
                    </div>
                    <p className="text-sm text-green-700">
                      আপনার ইমেইল নোটিফিকেশন সিস্টেম সঠিকভাবে কনফিগার করা আছে এবং কাজ করছে।
                    </p>
                  </div>
                  
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-md space-y-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <h3 className="font-medium text-amber-700">SMS সেটআপ বাকি আছে</h3>
                    </div>
                    <p className="text-sm text-amber-700">
                      SMS গেটওয়ে API কী সেট করা হয়নি। SMS পাঠাতে প্রথমে API কী সেট করুন।
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">নোটিফিকেশন লগ</h3>
                <div className="bg-muted/50 p-3 rounded-md h-32 overflow-y-auto space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-muted-foreground">[2025-05-23 14:30]</span>
                    <span>টেস্ট ইমেইল সফলভাবে পাঠানো হয়েছে</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-amber-600">!</span>
                    <span className="text-muted-foreground">[2025-05-23 14:15]</span>
                    <span>SMS গেটওয়ে এর সাথে সংযোগ করা যাচ্ছে না</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-muted-foreground">[2025-05-23 12:05]</span>
                    <span>অর্ডার কনফার্মেশন ইমেইল সফলভাবে পাঠানো হয়েছে</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSettings;
