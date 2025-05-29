
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Settings, 
  Check, 
  Trash2,
  AlertTriangle,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NotificationCenter = () => {
  const { toast } = useToast();
  
  const [notifications] = useState([
    {
      id: 'NOT001',
      type: 'payment_received',
      title: 'নতুন পেমেন্ট পেয়েছেন',
      message: 'রহিম আহমেদ আপনার "লোগো ডিজাইন" সার্ভিসের জন্য ৫,০০০ টাকা পেমেন্ট করেছেন',
      timestamp: '৫ মিনিট আগে',
      isRead: false,
      icon: <CreditCard className="h-5 w-5 text-green-600" />,
      action: 'payment_details'
    },
    {
      id: 'NOT002',
      type: 'dispute_raised',
      title: 'বিরোধ উত্থাপিত হয়েছে',
      message: 'অর্ডার #ORD123 এর জন্য ক্রেতা বিরোধ উত্থাপন করেছেন। আপনার জবাব প্রয়োজন।',
      timestamp: '২ ঘন্টা আগে',
      isRead: false,
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      action: 'dispute_details'
    },
    {
      id: 'NOT003',
      type: 'kyc_approved',
      title: 'KYC ভেরিফিকেশন সম্পন্ন',
      message: 'আপনার পরিচয় যাচাইকরণ সফলভাবে সম্পন্ন হয়েছে। এখন আপনি অসীমিত উত্তোলন করতে পারবেন।',
      timestamp: '১ দিন আগে',
      isRead: true,
      icon: <Shield className="h-5 w-5 text-blue-600" />,
      action: 'kyc_details'
    },
    {
      id: 'NOT004',
      type: 'escrow_released',
      title: 'Escrow পেমেন্ট মুক্ত',
      message: 'অর্ডার #ORD098 এর ৮,০০০ টাকা আপনার ওয়ালেটে যোগ হয়েছে',
      timestamp: '২ দিন আগে',
      isRead: true,
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      action: 'transaction_details'
    },
    {
      id: 'NOT005',
      type: 'auto_release_pending',
      title: 'অটো রিলিজ পেন্ডিং',
      message: 'অর্ডার #ORD145 এর পেমেন্ট ২৪ ঘন্টার মধ্যে অটো রিলিজ হবে',
      timestamp: '৩ দিন আগে',
      isRead: true,
      icon: <Clock className="h-5 w-5 text-yellow-600" />,
      action: 'order_details'
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    paymentReceived: true,
    disputeRaised: true,
    escrowReleased: true,
    kycUpdates: true,
    systemMaintenance: true,
    emailAddress: 'user@example.com',
    phoneNumber: '+8801712345678',
    notificationTime: '09:00'
  });

  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.isRead).length);

  const handleMarkAsRead = (notificationId: string) => {
    toast({
      title: "চিহ্নিত করা হয়েছে",
      description: "নোটিফিকেশন পড়া হিসেবে চিহ্নিত করা হয়েছে",
    });
  };

  const handleDeleteNotification = (notificationId: string) => {
    toast({
      title: "মুছে ফেলা হয়েছে",
      description: "নোটিফিকেশন মুছে ফেলা হয়েছে",
    });
  };

  const handleMarkAllAsRead = () => {
    setUnreadCount(0);
    toast({
      title: "সব পড়া হয়েছে",
      description: "সকল নোটিফিকেশন পড়া হিসেবে চিহ্নিত করা হয়েছে",
    });
  };

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "সেটিংস আপডেট",
      description: "নোটিফিকেশন সেটিংস সংরক্ষণ করা হয়েছে",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment_received':
        return 'border-l-green-500';
      case 'dispute_raised':
        return 'border-l-red-500';
      case 'kyc_approved':
        return 'border-l-blue-500';
      case 'escrow_released':
        return 'border-l-green-500';
      case 'auto_release_pending':
        return 'border-l-yellow-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              নোটিফিকেশন সেন্টার
              {unreadCount > 0 && (
                <Badge className="bg-red-100 text-red-800 ml-2">
                  {unreadCount} নতুন
                </Badge>
              )}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              সব পড়া হয়েছে
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">নোটিফিকেশন</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 ${getTypeColor(notification.type)} ${
                      !notification.isRead ? 'bg-blue-50' : 'bg-white'
                    } hover:bg-gray-50 transition-colors`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {notification.icon}
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`font-medium ${!notification.isRead ? 'text-blue-900' : 'text-gray-900'}`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteNotification(notification.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {notification.action && (
                          <Button size="sm" variant="outline" className="mt-2">
                            বিস্তারিত দেখুন
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  যোগাযোগের পছন্দ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">ইমেইল নোটিফিকেশন</Label>
                        <p className="text-sm text-muted-foreground">গুরুত্বপূর্ণ আপডেট ইমেইলে পান</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsNotifications">SMS নোটিফিকেশন</Label>
                        <p className="text-sm text-muted-foreground">জরুরি বিষয় SMS এ পান</p>
                      </div>
                      <Switch
                        id="smsNotifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushNotifications">Push নোটিফিকেশন</Label>
                        <p className="text-sm text-muted-foreground">ব্রাউজার নোটিফিকেশন</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="emailAddress">ইমেইল ঠিকানা</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        value={settings.emailAddress}
                        onChange={(e) => handleSettingChange('emailAddress', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phoneNumber">ফোন নম্বর</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={settings.phoneNumber}
                        onChange={(e) => handleSettingChange('phoneNumber', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notificationTime">নোটিফিকেশন সময়</Label>
                      <Input
                        id="notificationTime"
                        type="time"
                        value={settings.notificationTime}
                        onChange={(e) => handleSettingChange('notificationTime', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-600" />
                  নোটিফিকেশনের ধরন
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">পেমেন্ট সংক্রান্ত</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="paymentReceived">পেমেন্ট প্রাপ্তি</Label>
                        <Switch
                          id="paymentReceived"
                          checked={settings.paymentReceived}
                          onCheckedChange={(checked) => handleSettingChange('paymentReceived', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="escrowReleased">Escrow মুক্তি</Label>
                        <Switch
                          id="escrowReleased"
                          checked={settings.escrowReleased}
                          onCheckedChange={(checked) => handleSettingChange('escrowReleased', checked)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">নিরাপত্তা ও সাপোর্ট</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="disputeRaised">বিরোধ উত্থাপন</Label>
                        <Switch
                          id="disputeRaised"
                          checked={settings.disputeRaised}
                          onCheckedChange={(checked) => handleSettingChange('disputeRaised', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="kycUpdates">KYC আপডেট</Label>
                        <Switch
                          id="kycUpdates"
                          checked={settings.kycUpdates}
                          onCheckedChange={(checked) => handleSettingChange('kycUpdates', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="systemMaintenance">সিস্টেম রক্ষণাবেক্ষণ</Label>
                        <Switch
                          id="systemMaintenance"
                          checked={settings.systemMaintenance}
                          onCheckedChange={(checked) => handleSettingChange('systemMaintenance', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails">মার্কেটিং ইমেইল</Label>
                      <p className="text-sm text-muted-foreground">নতুন ফিচার ও অফার সম্পর্কে জানুন</p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>দ্রুত অ্যাকশন</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    টেস্ট নোটিফিকেশন পাঠান
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    হোয়াটসঅ্যাপ সংযোগ
                  </Button>
                  <Button variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    সব নোটিফিকেশন মুছুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
