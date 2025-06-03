
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Settings, 
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  Shield,
  User,
  Send,
  MessageSquare
} from 'lucide-react';

const NotificationCenter = () => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    paymentReceived: true,
    paymentReleased: true,
    disputeRaised: true,
    kycUpdates: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const [testEmail, setTestEmail] = useState('');
  const [testPhone, setTestPhone] = useState('');

  const notifications = [
    {
      id: 'NOT001',
      type: 'payment_received',
      title: 'নতুন পেমেন্ট রিসিভ',
      message: 'আপনি ৳৫,০০০ পেমেন্ট পেয়েছেন ওয়েব ডিজাইন সার্ভিসের জন্য',
      user: 'আহমেদ হাসান',
      timestamp: '৫ মিনিট আগে',
      status: 'unread',
      priority: 'high',
      channels: ['email', 'push'],
      orderId: 'ORD001234'
    },
    {
      id: 'NOT002',
      type: 'payment_released',
      title: 'পেমেন্ট রিলিজ হয়েছে',
      message: 'Escrow থেকে ৳৩,০০০ আপনার ওয়ালেটে এসেছে',
      user: 'ফাতেমা খান',
      timestamp: '১ ঘন্টা আগে',
      status: 'read',
      priority: 'medium',
      channels: ['email', 'sms'],
      orderId: 'ORD001235'
    },
    {
      id: 'NOT003',
      type: 'dispute_raised',
      title: 'নতুন বিরোধ উত্থাপিত',
      message: 'গ্রাফিক ডিজাইন অর্ডারে বিরোধ উত্থাপিত হয়েছে',
      user: 'করিম উদ্দিন',
      timestamp: '২ ঘন্টা আগে',
      status: 'unread',
      priority: 'high',
      channels: ['email', 'push', 'sms'],
      orderId: 'ORD001236'
    },
    {
      id: 'NOT004',
      type: 'kyc_approved',
      title: 'KYC অনুমোদিত',
      message: 'আপনার KYC যাচাইকরণ সফলভাবে সম্পন্ন হয়েছে',
      user: 'রাশিদা বেগম',
      timestamp: '১ দিন আগে',
      status: 'read',
      priority: 'medium',
      channels: ['email'],
      kycId: 'KYC001234'
    },
    {
      id: 'NOT005',
      type: 'withdrawal_processed',
      title: 'উত্তোলন প্রক্রিয়া সম্পন্ন',
      message: 'আপনার ৳১০,০০০ উত্তোলনের অনুরোধ প্রক্রিয়া করা হয়েছে',
      user: 'সাবিনা আক্তার',
      timestamp: '২ দিন আগে',
      status: 'read',
      priority: 'low',
      channels: ['email', 'push'],
      withdrawalId: 'WTD001234'
    }
  ];

  const notificationStats = {
    totalSent: 1547,
    delivered: 1523,
    opened: 1201,
    clicked: 456,
    bounced: 24
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment_received':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'payment_released':
        return <CheckCircle2 className="h-5 w-5 text-blue-600" />;
      case 'dispute_raised':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'kyc_approved':
        return <User className="h-5 w-5 text-purple-600" />;
      case 'withdrawal_processed':
        return <Shield className="h-5 w-5 text-orange-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">উচ্চ</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800">মধ্যম</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">নিম্ন</Badge>;
      default:
        return <Badge variant="secondary">সাধারণ</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge className="bg-blue-100 text-blue-800">অপঠিত</Badge>;
      case 'read':
        return <Badge className="bg-gray-100 text-gray-800">পঠিত</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const sendTestNotification = (channel: 'email' | 'sms') => {
    const targetValue = channel === 'email' ? testEmail : testPhone;
    
    if (!targetValue) {
      toast({
        title: "ত্রুটি",
        description: `${channel === 'email' ? 'ইমেইল' : 'ফোন নম্বর'} প্রদান করুন`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "টেস্ট নোটিফিকেশন পাঠানো হয়েছে",
      description: `${targetValue} এ টেস্ট ${channel === 'email' ? 'ইমেইল' : 'SMS'} পাঠানো হয়েছে`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Bell className="h-6 w-6" />
          নোটিফিকেশন সেন্টার
        </h2>
        <p className="text-muted-foreground">
          ইমেইল, SMS এবং পুশ নোটিফিকেশন ব্যবস্থাপনা
        </p>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{notificationStats.totalSent}</p>
            <p className="text-sm text-muted-foreground">মোট পাঠানো</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{notificationStats.delivered}</p>
            <p className="text-sm text-muted-foreground">ডেলিভার</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{notificationStats.opened}</p>
            <p className="text-sm text-muted-foreground">খোলা হয়েছে</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{notificationStats.clicked}</p>
            <p className="text-sm text-muted-foreground">ক্লিক</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{notificationStats.bounced}</p>
            <p className="text-sm text-muted-foreground">ব্যর্থ</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              নোটিফিকেশন সেটিংস
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-3">চ্যানেল সেটিংস:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    ইমেইল নোটিফিকেশন
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({...prev, emailNotifications: checked}))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    SMS নোটিফিকেশন
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({...prev, smsNotifications: checked}))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    পুশ নোটিফিকেশন
                  </Label>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({...prev, pushNotifications: checked}))
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">ইভেন্ট সেটিংস:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-received">পেমেন্ট রিসিভ</Label>
                  <Switch
                    id="payment-received"
                    checked={notificationSettings.paymentReceived}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({...prev, paymentReceived: checked}))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-released">পেমেন্ট রিলিজ</Label>
                  <Switch
                    id="payment-released"
                    checked={notificationSettings.paymentReleased}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({...prev, paymentReleased: checked}))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="dispute-raised">বিরোধ উত্থাপন</Label>
                  <Switch
                    id="dispute-raised"
                    checked={notificationSettings.disputeRaised}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({...prev, disputeRaised: checked}))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="kyc-updates">KYC আপডেট</Label>
                  <Switch
                    id="kyc-updates"
                    checked={notificationSettings.kycUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({...prev, kycUpdates: checked}))
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              টেস্ট নোটিফিকেশন
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-email">টেস্ট ইমেইল</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="test-email"
                  type="email"
                  placeholder="test@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={() => sendTestNotification('email')}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="test-phone">টেস্ট ফোন</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="test-phone"
                  placeholder="01XXXXXXXXX"
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                />
                <Button 
                  variant="outline" 
                  onClick={() => sendTestNotification('sms')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">টেস্ট মেসেজ</span>
              </div>
              <p className="text-sm text-blue-700">
                এটি একটি টেস্ট নোটিফিকেশন। আপনার পেমেন্ট সিস্টেম সঠিকভাবে কাজ করছে।
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক নোটিফিকেশন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(notification.type)}
                      <h4 className="font-medium">{notification.title}</h4>
                      {getPriorityBadge(notification.priority)}
                      {getStatusBadge(notification.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {notification.user}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {notification.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Channels */}
                <div>
                  <span className="text-sm font-medium">পাঠানো চ্যানেল: </span>
                  <div className="flex gap-2 mt-1">
                    {notification.channels.map((channel) => (
                      <Badge key={channel} variant="outline" className="text-xs">
                        {channel === 'email' && <Mail className="h-3 w-3 mr-1" />}
                        {channel === 'sms' && <Smartphone className="h-3 w-3 mr-1" />}
                        {channel === 'push' && <Bell className="h-3 w-3 mr-1" />}
                        {channel === 'email' ? 'ইমেইল' : channel === 'sms' ? 'SMS' : 'পুশ'}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Templates */}
      <Card>
        <CardHeader>
          <CardTitle>নোটিফিকেশন টেমপ্লেট</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">ইমেইল টেমপ্লেট:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>পেমেন্ট কনফার্মেশন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Escrow রিলিজ নোটিফিকেশন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>বিরোধ সতর্কতা</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>KYC স্ট্যাটাস আপডেট</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">SMS টেমপ্লেট:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>OTP ভেরিফিকেশন</span>
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>পেমেন্ট কনফার্মেশন</span>
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>উত্তোলন সতর্কতা</span>
                </li>
                <li className="flex items-start gap-2">
                  <Smartphone className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>নিরাপত্তা সতর্কতা</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
