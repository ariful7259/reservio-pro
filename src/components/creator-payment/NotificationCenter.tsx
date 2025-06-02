
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  Settings,
  Smartphone,
  Volume2,
  Eye
} from 'lucide-react';

const NotificationCenter = () => {
  const { toast } = useToast();
  const [notifications] = useState([
    {
      id: 'NOT001',
      type: 'payment_received',
      title: 'নতুন পেমেন্ট পেয়েছেন',
      message: 'আহমেদ হাসান আপনার "ওয়েব ডিজাইন" সার্ভিসের জন্য ৳১৫,০০০ পেমেন্ট করেছেন',
      timestamp: '৫ মিনিট আগে',
      isRead: false,
      priority: 'high'
    },
    {
      id: 'NOT002',
      type: 'payment_released',
      title: 'পেমেন্ট রিলিজ হয়েছে',
      message: 'ফাতেমা খানের অর্ডারের ৳৫,০০০ আপনার ওয়ালেটে যোগ হয়েছে',
      timestamp: '২ ঘন্টা আগে',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 'NOT003',
      type: 'dispute_raised',
      title: 'নতুন বিরোধ উত্থাপিত',
      message: 'করিম উদ্দিন আপনার "লোগো ডিজাইন" অর্ডারে বিরোধ তুলেছেন',
      timestamp: '১ দিন আগে',
      isRead: false,
      priority: 'high'
    },
    {
      id: 'NOT004',
      type: 'kyc_approved',
      title: 'KYC ভেরিফিকেশন অনুমোদিত',
      message: 'আপনার KYC ভেরিফিকেশন সফলভাবে সম্পন্ন হয়েছে',
      timestamp: '২ দিন আগে',
      isRead: true,
      priority: 'medium'
    },
    {
      id: 'NOT005',
      type: 'withdraw_processed',
      title: 'উত্তোলন প্রক্রিয়া সম্পন্ন',
      message: '৳২৫,০০০ আপনার ব্যাংক একাউন্টে পাঠানো হয়েছে',
      timestamp: '৩ দিন আগে',
      isRead: true,
      priority: 'low'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    inApp: true,
    email: true,
    sms: false,
    push: true,
    types: {
      paymentReceived: true,
      paymentReleased: true,
      disputeRaised: true,
      kycUpdates: true,
      withdrawalUpdates: true,
      securityAlerts: true,
      marketing: false
    }
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment_received':
        return <CreditCard className="h-5 w-5 text-green-600" />;
      case 'payment_released':
        return <CheckCircle2 className="h-5 w-5 text-blue-600" />;
      case 'dispute_raised':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'kyc_approved':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'withdraw_processed':
        return <CreditCard className="h-5 w-5 text-purple-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">জরুরি</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">গুরুত্বপূর্ণ</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">সাধারণ</Badge>;
      default:
        return null;
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    toast({
      title: "পড়া হয়েছে",
      description: "নোটিফিকেশন পড়া হিসেবে চিহ্নিত করা হয়েছে",
    });
  };

  const handleMarkAllRead = () => {
    toast({
      title: "সব পড়া হয়েছে",
      description: "সকল নোটিফিকেশন পড়া হিসেবে চিহ্নিত করা হয়েছে",
    });
  };

  const handleSettingsUpdate = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "সেটিংস আপডেট",
      description: "নোটিফিকেশন সেটিংস সফলভাবে আপডেট হয়েছে",
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* Notification Overview */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6" />
            নোটিফিকেশন সেন্টার
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
            )}
          </h2>
          <p className="text-muted-foreground">সকল নোটিফিকেশন এবং আপডেট দেখুন</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllRead}>
            সব পড়া হয়েছে
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            সেটিংস
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক নোটিফিকেশন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`border rounded-lg p-4 transition-colors ${
                  !notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(notification.priority)}
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {notification.timestamp}
                      </span>
                      
                      <div className="flex gap-2">
                        {!notification.isRead && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            পড়া হয়েছে
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          বিস্তারিত
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            নোটিফিকেশন সেটিংস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Delivery Methods */}
            <div>
              <h4 className="font-semibold mb-4">ডেলিভারি মেথড:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    <Label htmlFor="inApp">ইন-অ্যাপ নোটিফিকেশন</Label>
                  </div>
                  <Switch
                    id="inApp"
                    checked={notificationSettings.inApp}
                    onCheckedChange={(checked) => handleSettingsUpdate('inApp', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-green-600" />
                    <Label htmlFor="email">ইমেইল নোটিফিকেশন</Label>
                  </div>
                  <Switch
                    id="email"
                    checked={notificationSettings.email}
                    onCheckedChange={(checked) => handleSettingsUpdate('email', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                    <Label htmlFor="sms">SMS নোটিফিকেশন</Label>
                  </div>
                  <Switch
                    id="sms"
                    checked={notificationSettings.sms}
                    onCheckedChange={(checked) => handleSettingsUpdate('sms', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                    <Label htmlFor="push">পুশ নোটিফিকেশন</Label>
                  </div>
                  <Switch
                    id="push"
                    checked={notificationSettings.push}
                    onCheckedChange={(checked) => handleSettingsUpdate('push', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div>
              <h4 className="font-semibold mb-4">নোটিফিকেশনের ধরন:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="paymentReceived">পেমেন্ট রিসিভ</Label>
                  <Switch
                    id="paymentReceived"
                    checked={notificationSettings.types.paymentReceived}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({
                        ...prev, 
                        types: {...prev.types, paymentReceived: checked}
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="paymentReleased">পেমেন্ট রিলিজ</Label>
                  <Switch
                    id="paymentReleased"
                    checked={notificationSettings.types.paymentReleased}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({
                        ...prev, 
                        types: {...prev.types, paymentReleased: checked}
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="disputeRaised">বিরোধ উত্থাপন</Label>
                  <Switch
                    id="disputeRaised"
                    checked={notificationSettings.types.disputeRaised}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({
                        ...prev, 
                        types: {...prev.types, disputeRaised: checked}
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="kycUpdates">KYC আপডেট</Label>
                  <Switch
                    id="kycUpdates"
                    checked={notificationSettings.types.kycUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({
                        ...prev, 
                        types: {...prev.types, kycUpdates: checked}
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="withdrawalUpdates">উত্তোলন আপডেট</Label>
                  <Switch
                    id="withdrawalUpdates"
                    checked={notificationSettings.types.withdrawalUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({
                        ...prev, 
                        types: {...prev.types, withdrawalUpdates: checked}
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="securityAlerts">নিরাপত্তা সতর্কতা</Label>
                  <Switch
                    id="securityAlerts"
                    checked={notificationSettings.types.securityAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({
                        ...prev, 
                        types: {...prev.types, securityAlerts: checked}
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing">মার্কেটিং নোটিফিকেশন</Label>
                  <Switch
                    id="marketing"
                    checked={notificationSettings.types.marketing}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({
                        ...prev, 
                        types: {...prev.types, marketing: checked}
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
