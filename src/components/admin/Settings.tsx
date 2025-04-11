
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  UserCog, 
  Palette, 
  Mail, 
  Globe, 
  Lock, 
  Database, 
  Link, 
  Bell, 
  FileText,
  Check,
  Upload,
  Save,
  Trash2,
  RefreshCcw,
  Eye,
  EyeOff,
  Languages,
  Key,
  Shield,
  ShieldAlert,
  Clock,
  ChevronsUpDown,
  Download,
  FileUp,
  XCircle,
  Code,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  // Handle saving settings
  const handleSaveSettings = (section) => {
    toast({
      title: 'সেটিংস সংরক্ষণ করা হয়েছে',
      description: `${section} সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে।`,
    });
  };
  
  // Sample system settings
  const systemSettings = {
    siteName: 'Reservio',
    siteTagline: 'বাংলাদেশের সেরা রেন্টাল এবং সার্ভিস মার্কেটপ্লেস',
    adminEmail: 'admin@reservio.com',
    supportEmail: 'support@reservio.com',
    timeZone: 'Asia/Dhaka',
    maintenanceMode: false,
    debugMode: false,
    cacheTime: 3600,
    maxFileUploadSize: 10, // MB
    allowRegistration: true,
    enableSSL: true,
    sessionTimeout: 30, // minutes
  };
  
  // Sample role permissions
  const roles = [
    {
      id: 1,
      name: 'সুপার অ্যাডমিন',
      permissions: [
        'সিস্টেম সেটিংস পরিবর্তন',
        'ইউজার ম্যানেজমেন্ট',
        'প্রোডাক্ট/সার্ভিস অনুমোদন',
        'ডাটাবেস ব্যাকআপ',
        'পেমেন্ট পরিচালনা',
        'রিপোর্ট জেনারেশন',
        'অন্যান্য সব অনুমতি'
      ]
    },
    {
      id: 2,
      name: 'অ্যাডমিন',
      permissions: [
        'কন্টেন্ট ম্যানেজমেন্ট',
        'ইউজার ম্যানেজমেন্ট',
        'প্রোডাক্ট/সার্ভিস অনুমোদন',
        'পেমেন্ট পরিচালনা',
        'রিপোর্ট জেনারেশন',
      ]
    },
    {
      id: 3,
      name: 'মডারেটর',
      permissions: [
        'কন্টেন্ট মডারেশন',
        'ইউজার সাপোর্ট',
        'রিপোর্ট দেখা',
      ]
    },
    {
      id: 4,
      name: 'সাপোর্ট',
      permissions: [
        'ইউজার সাপোর্ট',
        'সাপোর্ট টিকেট ম্যানেজমেন্ট',
      ]
    }
  ];
  
  // Sample site appearance settings
  const appearanceSettings = {
    theme: 'light',
    primaryColor: '#9b87f5',
    logoLight: '/assets/images/logo-light.png',
    logoDark: '/assets/images/logo-dark.png',
    favicon: '/assets/images/favicon.ico',
    defaultFontFamily: 'Hind Siliguri, sans-serif',
    defaultFontSize: '16px',
    headerLayout: 'centered',
    footerLayout: 'standard',
    enableDarkMode: true,
    homePageLayout: 'grid',
    buttonStyle: 'rounded',
    showBreadcrumbs: true,
  };

  // Sample email template types
  const emailTemplates = [
    { id: 1, name: 'রেজিস্ট্রেশন কনফার্মেশন', subject: 'Reservio অ্যাকাউন্ট নিশ্চিতকরণ', lastUpdated: '2023-11-10' },
    { id: 2, name: 'পাসওয়ার্ড রিসেট', subject: 'পাসওয়ার্ড রিসেট করুন', lastUpdated: '2023-12-05' },
    { id: 3, name: 'অর্ডার কনফার্মেশন', subject: 'আপনার অর্ডার নিশ্চিত করা হয়েছে', lastUpdated: '2023-12-18' },
    { id: 4, name: 'অর্ডার শিপিং', subject: 'আপনার অর্ডার শিপ করা হয়েছে', lastUpdated: '2023-12-20' },
    { id: 5, name: 'অ্যাপয়েন্টমেন্ট রিমাইন্ডার', subject: 'আপনার আসন্ন অ্যাপয়েন্টমেন্টের রিমাইন্ডার', lastUpdated: '2023-11-25' },
    { id: 6, name: 'পেমেন্ট কনফার্মেশন', subject: 'আপনার পেমেন্ট সফল হয়েছে', lastUpdated: '2023-12-12' },
    { id: 7, name: 'পেমেন্ট ফেইলড', subject: 'আপনার পেমেন্ট ব্যর্থ হয়েছে', lastUpdated: '2023-12-12' },
    { id: 8, name: 'সাবস্ক্রিপশন এন্ডিং', subject: 'আপনার সাবস্ক্রিপশন শেষ হতে চলেছে', lastUpdated: '2023-11-30' },
  ];
  
  // Sample language options
  const languages = [
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩', isActive: true, completionPercentage: 100 },
    { code: 'en', name: 'English', flag: '🇺🇸', isActive: true, completionPercentage: 100 },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', isActive: true, completionPercentage: 95 },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', isActive: false, completionPercentage: 80 },
    { code: 'es', name: 'Español', flag: '🇪🇸', isActive: false, completionPercentage: 75 },
    { code: 'fr', name: 'Français', flag: '🇫🇷', isActive: false, completionPercentage: 70 },
  ];
  
  // Sample security settings
  const securitySettings = {
    twoFactorAuth: true,
    passwordExpiry: 90, // days
    minPasswordLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    maxLoginAttempts: 5,
    lockoutDuration: 30, // minutes
    sessionTimeout: 30, // minutes
    ipWhitelist: [],
    enableCaptcha: true,
    dataEncryption: true,
  };
  
  // Sample backup settings
  const backupSettings = {
    autoBackup: true,
    backupFrequency: 'daily', // daily, weekly, monthly
    backupTime: '02:00', // 24-hour format
    retentionPeriod: 30, // days
    backupLocation: 'cloud', // local, cloud
    includeMedia: true,
    compressBackup: true,
    encryptBackup: true,
    notifyOnSuccess: true,
    notifyOnFailure: true,
    lastBackupTime: '2023-12-21T02:00:00',
    lastBackupStatus: 'success',
  };
  
  // Sample API integrations
  const apiIntegrations = [
    { id: 1, name: 'পেমেন্ট গেটওয়ে API', provider: 'SSLCommerz', status: 'connected', lastChecked: '2023-12-21T10:30:00' },
    { id: 2, name: 'এসএমএস API', provider: 'BulkSMS BD', status: 'connected', lastChecked: '2023-12-21T10:30:00' },
    { id: 3, name: 'ইমেইল মার্কেটিং API', provider: 'MailChimp', status: 'disconnected', lastChecked: '2023-12-20T15:45:00' },
    { id: 4, name: 'গুগল ম্যাপস API', provider: 'Google', status: 'connected', lastChecked: '2023-12-21T10:30:00' },
    { id: 5, name: 'সোশ্যাল মিডিয়া API', provider: 'Facebook', status: 'connected', lastChecked: '2023-12-21T10:30:00' },
    { id: 6, name: 'ডেলিভারি ট্র্যাকিং API', provider: 'DeliveryTrack', status: 'connected', lastChecked: '2023-12-21T10:30:00' },
  ];
  
  // Sample notification settings
  const notificationSettings = {
    email: {
      newOrder: true,
      orderStatus: true,
      payment: true,
      newUser: true,
      newMessage: true,
      systemAlerts: true,
    },
    push: {
      newOrder: true,
      orderStatus: true,
      payment: true,
      newUser: false,
      newMessage: true,
      systemAlerts: false,
    },
    sms: {
      newOrder: false,
      orderStatus: true,
      payment: true,
      newUser: false,
      newMessage: false,
      systemAlerts: false,
    },
    frequency: 'realtime', // realtime, hourly, daily
  };
  
  // Sample policies
  const policies = [
    { 
      id: 1, 
      title: 'প্রাইভেসি পলিসি', 
      lastUpdated: '2023-11-15', 
      status: 'published',
      content: 'এখানে প্রাইভেসি পলিসির বিস্তারিত বিবরণ থাকবে... [সম্পূর্ণ পলিসি টেক্সট]'
    },
    { 
      id: 2, 
      title: 'টার্মস অ্যান্ড কন্ডিশন', 
      lastUpdated: '2023-11-15', 
      status: 'published',
      content: 'এখানে টার্মস অ্যান্ড কন্ডিশনের বিস্তারিত বিবরণ থাকবে... [সম্পূর্ণ পলিসি টেক্সট]'
    },
    { 
      id: 3, 
      title: 'রিফান্ড পলিসি', 
      lastUpdated: '2023-12-10', 
      status: 'published',
      content: 'এখানে রিফান্ড পলিসির বিস্তারিত বিবরণ থাকবে... [সম্পূর্ণ পলিসি টেক্সট]'
    },
    { 
      id: 4, 
      title: 'শিপিং পলিসি', 
      lastUpdated: '2023-12-10', 
      status: 'draft',
      content: 'এখানে শিপিং পলিসির বিস্তারিত বিবরণ থাকবে... [সম্পূর্ণ পলিসি টেক্সট]'
    },
    { 
      id: 5, 
      title: 'কুকি পলিসি', 
      lastUpdated: '2023-10-20', 
      status: 'published',
      content: 'এখানে কুকি পলিসির বিস্তারিত বিবরণ থাকবে... [সম্পূর্ণ পলিসি টেক্সট]'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">সেটিংস</h1>
      </div>
      
      <Tabs defaultValue="system" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="system" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            সিস্টেম সেটিংস
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            ইউজার রোল
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            অ্যাপিয়ারেন্স
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            ইমেইল টেমপ্লেট
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            ভাষা সেটিংস
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            সিকিউরিটি
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            ব্যাকআপ
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            API ইন্টিগ্রেশন
          </TabsTrigger>
          <TabsTrigger value="notification" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            নোটিফিকেশন
          </TabsTrigger>
          <TabsTrigger value="policy" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            পলিসি
          </TabsTrigger>
        </TabsList>
        
        {/* সিস্টেম সেটিংস */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>সিস্টেম সেটিংস কনফিগারেশন</CardTitle>
              <CardDescription>সিস্টেমের মৌলিক সেটিংস পরিবর্তন করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">সাইটের নাম</Label>
                    <Input id="siteName" defaultValue={systemSettings.siteName} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="siteTagline">সাইট ট্যাগলাইন</Label>
                    <Input id="siteTagline" defaultValue={systemSettings.siteTagline} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">অ্যাডমিন ইমেইল</Label>
                    <Input id="adminEmail" type="email" defaultValue={systemSettings.adminEmail} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">সাপোর্ট ইমেইল</Label>
                    <Input id="supportEmail" type="email" defaultValue={systemSettings.supportEmail} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeZone">টাইম জোন</Label>
                    <Select defaultValue={systemSettings.timeZone}>
                      <SelectTrigger id="timeZone">
                        <SelectValue placeholder="টাইম জোন বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Dhaka">আশিয়া/ঢাকা</SelectItem>
                        <SelectItem value="Asia/Kolkata">আশিয়া/কলকাতা</SelectItem>
                        <SelectItem value="Asia/Dubai">আশিয়া/দুবাই</SelectItem>
                        <SelectItem value="Europe/London">ইউরোপ/লন্ডন</SelectItem>
                        <SelectItem value="America/New_York">আমেরিকা/নিউ ইয়র্ক</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenanceMode">মেইনটেনেন্স মোড</Label>
                      <p className="text-sm text-muted-foreground">সাইটকে মেইনটেনেন্স মোডে রাখুন</p>
                    </div>
                    <Switch id="maintenanceMode" defaultChecked={systemSettings.maintenanceMode} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debugMode">ডিবাগ মোড</Label>
                      <p className="text-sm text-muted-foreground">ডেভেলপমেন্টের জন্য ডিবাগ মোড চালু করুন</p>
                    </div>
                    <Switch id="debugMode" defaultChecked={systemSettings.debugMode} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cacheTime">ক্যাশ টাইম (সেকেন্ড)</Label>
                    <Input 
                      id="cacheTime" 
                      type="number" 
                      defaultValue={systemSettings.cacheTime} 
                      min="0" 
                      max="86400" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxFileUploadSize">সর্বোচ্চ ফাইল আপলোড সাইজ (MB)</Label>
                    <Input 
                      id="maxFileUploadSize" 
                      type="number" 
                      defaultValue={systemSettings.maxFileUploadSize} 
                      min="1" 
                      max="100" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowRegistration">রেজিস্ট্রেশন অনুমতি</Label>
                      <p className="text-sm text-muted-foreground">নতুন ইউজার রেজিস্ট্রেশন অনুমতি দিন</p>
                    </div>
                    <Switch id="allowRegistration" defaultChecked={systemSettings.allowRegistration} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableSSL">SSL এনাবল</Label>
                      <p className="text-sm text-muted-foreground">HTTPS সিকিউরিটি এনাবল করুন</p>
                    </div>
                    <Switch id="enableSSL" defaultChecked={systemSettings.enableSSL} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                রিসেট
              </Button>
              <Button onClick={() => handleSaveSettings('সিস্টেম')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* ইউজার রোল ও পারমিশন সেটিংস */}
        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ইউজার রোল এবং পারমিশন</CardTitle>
              <CardDescription>ইউজার রোল এবং তাদের অনুমতি পরিচালনা করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন রোল তৈরি করুন
                </Button>
              </div>
              
              <div className="space-y-4">
                {roles.map((role) => (
                  <Card key={role.id} className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        {role.name}
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <UserCog className="h-4 w-4" />
                          </Button>
                          {role.name !== 'সুপার অ্যাডমিন' && (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {role.permissions.map((permission, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500" />
                            {permission}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        পারমিশন এডিট করুন
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSaveSettings('ইউজার রোল')}>
                <Save className="mr-2 h-4 w-4" />
                পরিবর্তন সংরক্ষণ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* সাইট কনফিগারেশন (লোগো, কালার থিম, ফন্ট) */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>সাইট অ্যাপিয়ারেন্স</CardTitle>
              <CardDescription>সাইটের অ্যাপিয়ারেন্স সেটিংস কাস্টমাইজ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">থিম</Label>
                    <Select defaultValue={appearanceSettings.theme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="থিম বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">লাইট</SelectItem>
                        <SelectItem value="dark">ডার্ক</SelectItem>
                        <SelectItem value="system">সিস্টেম ডিফল্ট</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">প্রাইমারি কালার</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primaryColor" 
                        defaultValue={appearanceSettings.primaryColor} 
                        className="flex-1"
                      />
                      <div 
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: appearanceSettings.primaryColor }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">ফন্ট ফ্যামিলি</Label>
                    <Select defaultValue={appearanceSettings.defaultFontFamily}>
                      <SelectTrigger id="fontFamily">
                        <SelectValue placeholder="ফন্ট ফ্যামিলি বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hind Siliguri, sans-serif">হিন্দ শিলিগুড়ি</SelectItem>
                        <SelectItem value="SolaimanLipi, sans-serif">সোলায়মান লিপি</SelectItem>
                        <SelectItem value="Kalpurush, sans-serif">কালপুরুষ</SelectItem>
                        <SelectItem value="Noto Sans Bengali, sans-serif">নোটো সান্স বাংলা</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">ফন্ট সাইজ</Label>
                    <Select defaultValue={appearanceSettings.defaultFontSize}>
                      <SelectTrigger id="fontSize">
                        <SelectValue placeholder="ফন্ট সাইজ বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14px">ছোট (14px)</SelectItem>
                        <SelectItem value="16px">মাঝারি (16px)</SelectItem>
                        <SelectItem value="18px">বড় (18px)</SelectItem>
                        <SelectItem value="20px">অনেক বড় (20px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="buttonStyle">বাটন স্টাইল</Label>
                    <Select defaultValue={appearanceSettings.buttonStyle}>
                      <SelectTrigger id="buttonStyle">
                        <SelectValue placeholder="বাটন স্টাইল বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="squared">স্কয়ার্ড</SelectItem>
                        <SelectItem value="rounded">রাউন্ডেড</SelectItem>
                        <SelectItem value="pill">পিল</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableDarkMode">ডার্ক মোড</Label>
                      <p className="text-sm text-muted-foreground">ডার্ক মোড সুইচ দেখানো হবে</p>
                    </div>
                    <Switch 
                      id="enableDarkMode" 
                      defaultChecked={appearanceSettings.enableDarkMode} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showBreadcrumbs">ব্রেডক্রামস</Label>
                      <p className="text-sm text-muted-foreground">পেজে ব্রেডক্রামস নেভিগেশন দেখানো হবে</p>
                    </div>
                    <Switch 
                      id="showBreadcrumbs" 
                      defaultChecked={appearanceSettings.showBreadcrumbs} 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>লাইট মোড লোগো</Label>
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-gray-50">
                      <div className="h-20 flex items-center justify-center">
                        <img 
                          src={appearanceSettings.logoLight} 
                          alt="Light logo" 
                          className="max-h-full"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/200x60?text=Light+Logo";
                          }}
                        />
                      </div>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        লোগো আপলোড করুন
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ডার্ক মোড লোগো</Label>
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-4 bg-gray-800">
                      <div className="h-20 flex items-center justify-center">
                        <img 
                          src={appearanceSettings.logoDark} 
                          alt="Dark logo" 
                          className="max-h-full"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/200x60?text=Dark+Logo";
                          }}
                        />
                      </div>
                      <Button variant="outline" className="w-full flex items-center gap-2 bg-gray-700 text-white hover:bg-gray-600">
                        <Upload className="h-4 w-4" />
                        লোগো আপলোড করুন
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>ফেভিকন</Label>
                    <div className="border rounded-md p-4 flex flex-col items-center justify-center gap-4">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <img 
                          src={appearanceSettings.favicon} 
                          alt="Favicon" 
                          className="max-h-full max-w-full"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/32?text=Icon";
                          }}
                        />
                      </div>
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        ফেভিকন আপলোড করুন
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="headerLayout">হেডার লেআউট</Label>
                    <Select defaultValue={appearanceSettings.headerLayout}>
                      <SelectTrigger id="headerLayout">
                        <SelectValue placeholder="হেডার লেআউট বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centered">সেন্টারড</SelectItem>
                        <SelectItem value="split">স্প্লিট</SelectItem>
                        <SelectItem value="minimal">মিনিমাল</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="footerLayout">ফুটার লেআউট</Label>
                    <Select defaultValue={appearanceSettings.footerLayout}>
                      <SelectTrigger id="footerLayout">
                        <SelectValue placeholder="ফুটার লেআউট বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">স্ট্যান্ডার্ড</SelectItem>
                        <SelectItem value="compact">কম্প্যাক্ট</SelectItem>
                        <SelectItem value="expanded">এক্সপ্যান্ডেড</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="homePageLayout">হোম পেজ লেআউট</Label>
                    <Select defaultValue={appearanceSettings.homePageLayout}>
                      <SelectTrigger id="homePageLayout">
                        <SelectValue placeholder="হোম পেজ লেআউট বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">গ্রিড</SelectItem>
                        <SelectItem value="list">লিস্ট</SelectItem>
                        <SelectItem value="modern">মডার্ন</SelectItem>
                        <SelectItem value="classic">ক্লাসিক</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                রিসেট
              </Button>
              <Button onClick={() => handleSaveSettings('অ্যাপিয়ারেন্স')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>লাইভ প্রিভিউ</CardTitle>
              <CardDescription>আপনার পরিবর্তনের প্রিভিউ দেখুন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 h-60 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Palette className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg font-medium">থিম কাস্টমাইজেশন প্রিভিউ</span>
                  </div>
                  <p className="text-muted-foreground">আপনার পরিবর্তন সেভ করার পর আপনি এখানে একটি লাইভ প্রিভিউ দেখতে পাবেন।</p>
                  <Button>প্রিভিউ জেনারেট করুন</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ইমেইল টেমপ্লেট কনফিগারেশন */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ইমেইল টেমপ্লেট কনফিগারেশন</CardTitle>
              <CardDescription>সিস্টেম ইমেইল টেমপ্লেট এডিট করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন টেমপ্লেট তৈরি করুন
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emailTemplates.map((template) => (
                  <Card key={template.id} className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>সাবজেক্ট: {template.subject}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm text-muted-foreground">
                        সর্বশেষ আপডেট: {new Date(template.lastUpdated).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        প্রিভিউ
                      </Button>
                      <Button size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        এডিট
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSaveSettings('ইমেইল টেমপ্লেট')}>
                <Save className="mr-2 h-4 w-4" />
                পরিবর্তন সংরক্ষণ করুন
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>ইমেইল কনফিগারেশন</CardTitle>
              <CardDescription>ইমেইল সেন্ডার সেটিংস কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP হোস্ট</Label>
                  <Input id="smtpHost" defaultValue="smtp.example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP পোর্ট</Label>
                  <Input id="smtpPort" defaultValue="587" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP ইউজারনেম</Label>
                  <Input id="smtpUser" defaultValue="noreply@reservio.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP পাসওয়ার্ড</Label>
                  <div className="flex">
                    <Input 
                      id="smtpPassword" 
                      type={passwordVisible ? "text" : "password"} 
                      defaultValue="your-smtp-password" 
                      className="flex-1"
                    />
                    <Button 
                      variant="ghost" 
                      type="button" 
                      className="px-3" 
                      onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                      {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderName">সেন্ডার নাম</Label>
                  <Input id="senderName" defaultValue="Reservio" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">সেন্ডার ইমেইল</Label>
                  <Input id="senderEmail" defaultValue="noreply@reservio.com" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableEmailQueue">ইমেইল কিউ</Label>
                  <p className="text-sm text-muted-foreground">ইমেইল কিউয়িং এনাবল করুন</p>
                </div>
                <Switch id="enableEmailQueue" defaultChecked={true} />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  টেস্ট কানেকশন
                </Button>
                
                <Button onClick={() => handleSaveSettings('ইমেইল কনফিগারেশন')}>
                  <Save className="mr-2 h-4 w-4" />
                  কনফিগারেশন সেভ করুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ভাষা এবং লোকালাইজেশন সেটিংস */}
        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ভাষা এবং লোকালাইজেশন সেটিংস</CardTitle>
              <CardDescription>সিস্টেমের ভাষা এবং লোকালাইজেশন সেটিংস পরিবর্তন করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">ডিফল্ট ভাষা</Label>
                    <Select defaultValue="bn">
                      <SelectTrigger id="defaultLanguage">
                        <SelectValue placeholder="ডিফল্ট ভাষা বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            <div className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">তারিখ ফরম্যাট</Label>
                    <Select defaultValue="dd/MM/yyyy">
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="তারিখ ফরম্যাট বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/MM/yyyy">DD/MM/YYYY (31/12/2023)</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/DD/YYYY (12/31/2023)</SelectItem>
                        <SelectItem value="yyyy-MM-dd">YYYY-MM-DD (2023-12-31)</SelectItem>
                        <SelectItem value="dd MMM, yyyy">DD MMM, YYYY (31 Dec, 2023)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">সময় ফরম্যাট</Label>
                    <Select defaultValue="hh:mm a">
                      <SelectTrigger id="timeFormat">
                        <SelectValue placeholder="সময় ফরম্যাট বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hh:mm a">12-hour (03:30 PM)</SelectItem>
                        <SelectItem value="HH:mm">24-hour (15:30)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currencySymbol">কারেন্সি সিম্বল</Label>
                    <Select defaultValue="৳">
                      <SelectTrigger id="currencySymbol">
                        <SelectValue placeholder="কারেন্সি সিম্বল বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="৳">৳ (টাকা)</SelectItem>
                        <SelectItem value="$">$ (ডলার)</SelectItem>
                        <SelectItem value="€">€ (ইউরো)</SelectItem>
                        <SelectItem value="£">£ (পাউন্ড)</SelectItem>
                        <SelectItem value="¥">¥ (ইয়েন)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="numberLocalization">সংখ্যা লোকালাইজেশন</Label>
                    <p className="text-sm text-muted-foreground">বাংলা সংখ্যা (১,২,৩) ব্যবহার করুন</p>
                  </div>
                  <Switch id="numberLocalization" defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowUserLanguage">ইউজার ভাষা পছন্দ</Label>
                    <p className="text-sm text-muted-foreground">ইউজারদের নিজস্ব ভাষা বাছাই করতে অনুমতি দিন</p>
                  </div>
                  <Switch id="allowUserLanguage" defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoDetectLocale">অটো-ডিটেক্ট লোকেল</Label>
                    <p className="text-sm text-muted-foreground">ভিজিটরের ব্রাউজার সেটিংস অনুযায়ী ভাষা সেট করুন</p>
                  </div>
                  <Switch id="autoDetectLocale" defaultChecked={true} />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">ভাষা ম্যানেজমেন্ট</h3>
                
                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.code} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{lang.flag}</div>
                          <div>
                            <h4 className="font-medium">{lang.name}</h4>
                            <p className="text-sm text-muted-foreground">Language code: {lang.code}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium">
                            {lang.completionPercentage}% অনুবাদিত
                          </div>
                          
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${lang.completionPercentage}%` }}
                            ></div>
                          </div>
                          
                          <Switch defaultChecked={lang.isActive} />
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2 justify-end">
                        <Button variant="outline" size="sm">
                          <Languages className="h-4 w-4 mr-2" />
                          অনুবাদ এডিট
                        </Button>
                        
                        {lang.code !== 'bn' && (
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            মুছুন
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    নতুন ভাষা যোগ করুন
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                রিসেট
              </Button>
              <Button onClick={() => handleSaveSettings('ভাষা এবং লোকালাইজেশন')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* সিকিউরিটি সেটিংস */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>সিকিউরিটি সেটিংস</CardTitle>
              <CardDescription>সিস্টেমের সিকিউরিটি সেটিংস কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">পাসওয়ার্ড পলিসি</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minPasswordLength">ন্যূনতম পাসওয়ার্ড দৈর্ঘ্য</Label>
                    <Input 
                      id="minPasswordLength" 
                      type="number" 
                      defaultValue={securitySettings.minPasswordLength} 
                      min="6" 
                      max="32" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">পাসওয়ার্ড মেয়াদ (দিন)</Label>
                    <Input 
                      id="passwordExpiry" 
                      type="number" 
                      defaultValue={securitySettings.passwordExpiry} 
                      min="0" 
                      max="365" 
                    />
                    <p className="text-xs text-muted-foreground">0 সেট করলে মেয়াদ শেষ হবে না</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="requireSpecialChar">বিশেষ চিহ্ন আবশ্যক</Label>
                      <p className="text-sm text-muted-foreground">পাসওয়ার্ডে কমপক্ষে একটি বিশেষ চিহ্ন থাকতে হবে</p>
                    </div>
                    <Switch 
                      id="requireSpecialChar" 
                      defaultChecked={securitySettings.requireSpecialChar} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="requireNumber">সংখ্যা আবশ্যক</Label>
                      <p className="text-sm text-muted-foreground">পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা থাকতে হবে</p>
                    </div>
                    <Switch 
                      id="requireNumber" 
                      defaultChecked={securitySettings.requireNumber} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="requireUppercase">বড় হাতের অক্ষর আবশ্যক</Label>
                      <p className="text-sm text-muted-foreground">পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে</p>
                    </div>
                    <Switch 
                      id="requireUppercase" 
                      defaultChecked={securitySettings.requireUppercase} 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">লগইন সিকিউরিটি</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">টু-ফ্যাক্টর অথেনটিকেশন</Label>
                      <p className="text-sm text-muted-foreground">ইউজারদের জন্য 2FA সক্রিয় করুন</p>
                    </div>
                    <Switch 
                      id="twoFactorAuth" 
                      defaultChecked={securitySettings.twoFactorAuth} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">সর্বোচ্চ লগইন প্রচেষ্টা</Label>
                    <Input 
                      id="maxLoginAttempts" 
                      type="number" 
                      defaultValue={securitySettings.maxLoginAttempts} 
                      min="3" 
                      max="10" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lockoutDuration">লক আউট সময়কাল (মিনিট)</Label>
                    <Input 
                      id="lockoutDuration" 
                      type="number" 
                      defaultValue={securitySettings.lockoutDuration} 
                      min="5" 
                      max="1440" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">সেশন টাইমআউট (মিনিট)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number" 
                      defaultValue={securitySettings.sessionTimeout} 
                      min="5" 
                      max="1440" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enableCaptcha">ক্যাপচা সক্রিয় করুন</Label>
                      <p className="text-sm text-muted-foreground">লগইন এবং রেজিস্ট্রেশন ফর্মে ক্যাপচা দেখান</p>
                    </div>
                    <Switch 
                      id="enableCaptcha" 
                      defaultChecked={securitySettings.enableCaptcha} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dataEncryption">ডাটা এনক্রিপশন</Label>
                      <p className="text-sm text-muted-foreground">সংবেদনশীল ডাটা এনক্রিপ্ট করুন</p>
                    </div>
                    <Switch 
                      id="dataEncryption" 
                      defaultChecked={securitySettings.dataEncryption} 
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">IP হোয়াইটলিস্ট (অপশনাল)</h3>
                <p className="text-sm text-muted-foreground">অ্যাডমিন প্যানেলে অ্যাক্সেসের জন্য অনুমোদিত IP অ্যাড্রেস</p>
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="IP অ্যাড্রেস যোগ করুন (উদা. 192.168.1.1)" />
                    <Button variant="outline">যোগ করুন</Button>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="space-y-2">
                      {securitySettings.ipWhitelist.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">
                          কোন IP হোয়াইটলিস্ট নেই। সব IP অ্যাড্রেস থেকে অ্যাক্সেস করা যাবে।
                        </div>
                      ) : (
                        securitySettings.ipWhitelist.map((ip, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 border-b last:border-0">
                            <span>{ip}</span>
                            <Button variant="ghost" size="sm" className="text-red-500 h-8 w-8 p-0">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">সিকিউরিটি অডিট লগ</h3>
                <p className="text-sm text-muted-foreground">সিকিউরিটি সম্পর্কিত ইভেন্টের লগ</p>
                
                <div className="flex justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    অডিট লগ দেখুন
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    লগ ডাউনলোড করুন
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                রিসেট
              </Button>
              <Button onClick={() => handleSaveSettings('সিকিউরিটি')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* ব্যাকআপ ও রিস্টোর সেটিংস */}
        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ব্যাকআপ ও রিস্টোর সেটিংস</CardTitle>
              <CardDescription>সিস্টেমের ব্যাকআপ সেটিংস কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">অটো ব্যাকআপ কনফিগারেশন</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoBackup">অটো ব্যাকআপ</Label>
                      <p className="text-sm text-muted-foreground">অটোমেটিক ব্যাকআপ নেওয়া সক্রিয় করুন</p>
                    </div>
                    <Switch 
                      id="autoBackup" 
                      defaultChecked={backupSettings.autoBackup} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">ব্যাকআপ ফ্রিকোয়েন্সি</Label>
                    <Select defaultValue={backupSettings.backupFrequency}>
                      <SelectTrigger id="backupFrequency">
                        <SelectValue placeholder="ব্যাকআপ ফ্রিকোয়েন্সি বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">দৈনিক</SelectItem>
                        <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                        <SelectItem value="monthly">মাসিক</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backupTime">ব্যাকআপ সময়</Label>
                    <Input 
                      id="backupTime" 
                      type="time" 
                      defaultValue={backupSettings.backupTime} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="retentionPeriod">ব্যাকআপ রিটেনশন পিরিয়ড (দিন)</Label>
                    <Input 
                      id="retentionPeriod" 
                      type="number" 
                      defaultValue={backupSettings.retentionPeriod} 
                      min="1" 
                      max="365" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backupLocation">ব্যাকআপ লোকেশন</Label>
                    <Select defaultValue={backupSettings.backupLocation}>
                      <SelectTrigger id="backupLocation">
                        <SelectValue placeholder="ব্যাকআপ লোকেশন বাছাই করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">লোকাল স্টোরেজ</SelectItem>
                        <SelectItem value="cloud">ক্লাউড স্টোরেজ</SelectItem>
                        <SelectItem value="ftp">FTP সার্ভার</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">ব্যাকআপ অপশন</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="includeMedia">মিডিয়া ফাইল অন্তর্ভুক্ত করুন</Label>
                      <p className="text-sm text-muted-foreground">ব্যাকআপে ইমেজ, ভিডিও ইত্যাদি অন্তর্ভুক্ত করুন</p>
                    </div>
                    <Switch 
                      id="includeMedia" 
                      defaultChecked={backupSettings.includeMedia} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compressBackup">ব্যাকআপ কম্প্রেস করুন</Label>
                      <p className="text-sm text-muted-foreground">ব্যাকআপ ফাইল কম্প্রেস করে স্টোরেজ সাশ্রয় করুন</p>
                    </div>
                    <Switch 
                      id="compressBackup" 
                      defaultChecked={backupSettings.compressBackup} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="encryptBackup">ব্যাকআপ এনক্রিপ্ট করুন</Label>
                      <p className="text-sm text-muted-foreground">ব্যাকআপ ফাইল এনক্রিপ্ট করে সিকিউরিটি বাড়ান</p>
                    </div>
                    <Switch 
                      id="encryptBackup" 
                      defaultChecked={backupSettings.encryptBackup} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyOnSuccess">সফল ব্যাকআপের নোটিফিকেশন</Label>
                      <p className="text-sm text-muted-foreground">ব্যাকআপ সফল হলে নোটিফিকেশন পাঠান</p>
                    </div>
                    <Switch 
                      id="notifyOnSuccess" 
                      defaultChecked={backupSettings.notifyOnSuccess} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyOnFailure">ব্যাকআপ ব্যর্থতার নোটিফিকেশন</Label>
                      <p className="text-sm text-muted-foreground">ব্যাকআপ ব্যর্থ হলে নোটিফিকেশন পাঠান</p>
                    </div>
                    <Switch 
                      id="notifyOnFailure" 
                      defaultChecked={backupSettings.notifyOnFailure} 
                    />
                  </div>
                  
                  <div className="mt-4 bg-muted p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">সর্বশেষ ব্যাকআপ স্ট্যাটাস</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(backupSettings.lastBackupTime).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <Badge 
                        variant={backupSettings.lastBackupStatus === 'success' ? 'default' : 'destructive'}
                      >
                        {backupSettings.lastBackupStatus === 'success' ? 'সফল' : 'ব্যর্থ'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">ম্যানুয়াল ব্যাকআপ ও রিস্টোর</h3>
                
                <div className="flex flex-wrap gap-4 justify-between">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    এখনই ব্যাকআপ নিন
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileUp className="h-4 w-4" />
                    ব্যাকআপ আপলোড করুন
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    ব্যাকআপ ডাউনলোড করুন
                  </Button>
                  
                  <Button variant="default" className="flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    ব্যাকআপ থেকে রিস্টোর করুন
                  </Button>
                </div>
                
                <Card className="border border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">সাম্প্রতিক ব্যাকআপসমূহ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 border-b hover:bg-muted">
                        <div>
                          <div className="font-medium">backup_2023-12-21_02-00-00.zip</div>
                          <div className="text-sm text-muted-foreground">21 ডিসেম্বর, 2023 (02:00)</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border-b hover:bg-muted">
                        <div>
                          <div className="font-medium">backup_2023-12-20_02-00-00.zip</div>
                          <div className="text-sm text-muted-foreground">20 ডিসেম্বর, 2023 (02:00)</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 border-b hover:bg-muted">
                        <div>
                          <div className="font-medium">backup_2023-12-19_02-00-00.zip</div>
                          <div className="text-sm text-muted-foreground">19 ডিসেম্বর, 2023 (02:00)</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                রিসেট
              </Button>
              <Button onClick={() => handleSaveSettings('ব্যাকআপ')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* API ইন্টিগ্রেশন সেটিংস */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API ইন্টিগ্রেশন সেটিংস</CardTitle>
              <CardDescription>থার্ড পার্টি সার্ভিস এবং API ইন্টিগ্রেশন কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন API ইন্টিগ্রেশন
                </Button>
              </div>
              
              <div className="space-y-4">
                {apiIntegrations.map((api) => (
                  <Card key={api.id} className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{api.name}</CardTitle>
                      <CardDescription>প্রোভাইডার: {api.provider}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={api.status === 'connected' ? 'default' : 'secondary'}
                            className={api.status === 'connected' ? 'bg-green-500' : 'bg-amber-500'}
                          >
                            {api.status === 'connected' ? 'কানেক্টেড' : 'ডিসকানেক্টেড'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            সর্বশেষ চেক: {new Date(api.lastChecked).toLocaleDateString('bn-BD', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            কনফিগার
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={api.status === 'connected' ? 'text-red-500' : 'text-green-500'}
                          >
                            {api.status === 'connected' ? (
                              <>
                                <XCircle className="h-4 w-4 mr-2" />
                                ডিসকানেক্ট
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                কানেক্ট
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">API কি ম্যানেজমেন্ট</h3>
                <p className="text-sm text-muted-foreground">আপনার সিস্টেমের জন্য API কি ম্যানেজ করুন</p>
                
                <Card className="border border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">সিস্টেম API কি</CardTitle>
                    <CardDescription>ডেভেলপার ইন্টিগ্রেশনের জন্য</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2 items-center">
                      <Input 
                        type={passwordVisible ? "text" : "password"} 
                        value="api_key_2e4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9"
                        readOnly
                        className="font-mono"
                      />
                      <Button 
                        variant="ghost" 
                        type="button" 
                        className="px-3" 
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline">
                        <Key className="h-4 w-4 mr-2" />
                        রিজেনারেট
                      </Button>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        পারমিশন
                      </Button>
                      <Button variant="outline" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        ইউসেজ লিমিট
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    API ডকুমেন্টেশন
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                রিফ্রেশ স্ট্যাটাস
              </Button>
              <Button onClick={() => handleSaveSettings('API ইন্টিগ্রেশন')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* নোটিফিকেশন প্রেফারেন্স */}
        <TabsContent value="notification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>নোটিফিকেশন সেটিংস</CardTitle>
              <CardDescription>সিস্টেম নোটিফিকেশন সেটিংস কনফিগার করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">ইমেইল নোটিফিকেশন</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-newOrder">নতুন অর্ডার</Label>
                    <Switch 
                      id="email-newOrder" 
                      defaultChecked={notificationSettings.email.newOrder} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-orderStatus">অর্ডার স্ট্যাটাস আপডেট</Label>
                    <Switch 
                      id="email-orderStatus" 
                      defaultChecked={notificationSettings.email.orderStatus} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-payment">পেমেন্ট কনফার্মেশন</Label>
                    <Switch 
                      id="email-payment" 
                      defaultChecked={notificationSettings.email.payment} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-newUser">নতুন ইউজার রেজিস্ট্রেশন</Label>
                    <Switch 
                      id="email-newUser" 
                      defaultChecked={notificationSettings.email.newUser} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-newMessage">নতুন মেসেজ/কমেন্ট</Label>
                    <Switch 
                      id="email-newMessage" 
                      defaultChecked={notificationSettings.email.newMessage} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-systemAlerts">সিস্টেম অ্যালার্ট</Label>
                    <Switch 
                      id="email-systemAlerts" 
                      defaultChecked={notificationSettings.email.systemAlerts} 
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">পুশ নোটিফিকেশন</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-newOrder">নতুন অর্ডার</Label>
                    <Switch 
                      id="push-newOrder" 
                      defaultChecked={notificationSettings.push.newOrder} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-orderStatus">অর্ডার স্ট্যাটাস আপডেট</Label>
                    <Switch 
                      id="push-orderStatus" 
                      defaultChecked={notificationSettings.push.orderStatus} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-payment">পেমেন্ট কনফার্মেশন</Label>
                    <Switch 
                      id="push-payment" 
                      defaultChecked={notificationSettings.push.payment} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-newUser">নতুন ইউজার রেজিস্ট্রেশন</Label>
                    <Switch 
                      id="push-newUser" 
                      defaultChecked={notificationSettings.push.newUser} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-newMessage">নতুন মেসেজ/কমেন্ট</Label>
                    <Switch 
                      id="push-newMessage" 
                      defaultChecked={notificationSettings.push.newMessage} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-systemAlerts">সিস্টেম অ্যালার্ট</Label>
                    <Switch 
                      id="push-systemAlerts" 
                      defaultChecked={notificationSettings.push.systemAlerts} 
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">এসএমএস নোটিফিকেশন</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-newOrder">নতুন অর্ডার</Label>
                    <Switch 
                      id="sms-newOrder" 
                      defaultChecked={notificationSettings.sms.newOrder} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-orderStatus">অর্ডার স্ট্যাটাস আপডেট</Label>
                    <Switch 
                      id="sms-orderStatus" 
                      defaultChecked={notificationSettings.sms.orderStatus} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-payment">পেমেন্ট কনফার্মেশন</Label>
                    <Switch 
                      id="sms-payment" 
                      defaultChecked={notificationSettings.sms.payment} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-newUser">নতুন ইউজার রেজিস্ট্রেশন</Label>
                    <Switch 
                      id="sms-newUser" 
                      defaultChecked={notificationSettings.sms.newUser} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-newMessage">নতুন মেসেজ/কমেন্ট</Label>
                    <Switch 
                      id="sms-newMessage" 
                      defaultChecked={notificationSettings.sms.newMessage} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-systemAlerts">সিস্টেম অ্যালার্ট</Label>
                    <Switch 
                      id="sms-systemAlerts" 
                      defaultChecked={notificationSettings.sms.systemAlerts} 
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">নোটিফিকেশন ফ্রিকোয়েন্সি</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="notificationFrequency">ফ্রিকোয়েন্সি</Label>
                  <Select defaultValue={notificationSettings.frequency}>
                    <SelectTrigger id="notificationFrequency">
                      <SelectValue placeholder="ফ্রিকোয়েন্সি বাছাই করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">রিয়েলটাইম</SelectItem>
                      <SelectItem value="hourly">প্রতি ঘন্টায়</SelectItem>
                      <SelectItem value="daily">দৈনিক ডাইজেস্ট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                রিসেট
              </Button>
              <Button onClick={() => handleSaveSettings('নোটিফিকেশন')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* প্রাইভেসি পলিসি ও টার্মস এন্ড কন্ডিশনস আপডেট */}
        <TabsContent value="policy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>পলিসি ম্যানেজমেন্ট</CardTitle>
              <CardDescription>সাইটের লিগাল পলিসি দকুমেন্ট আপডেট করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-end">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  নতুন পলিসি তৈরি করুন
                </Button>
              </div>
              
              <div className="space-y-4">
                {policies.map((policy) => (
                  <Card key={policy.id} className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span>
                          সর্বশেষ আপডেট: {new Date(policy.lastUpdated).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <Badge variant={policy.status === 'published' ? 'default' : 'secondary'}>
                          {policy.status === 'published' ? 'প্রকাশিত' : 'ড্রাফট'}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {policy.content.substring(0, 200)}...
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        প্রিভিউ
                      </Button>
                      <Button size="sm" className="flex-1">
                        <FileText className="h-4 w-4 mr-2" />
                        এডিট
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-none">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSaveSettings('পলিসি')}>
                <Save className="mr-2 h-4 w-4" />
                পরিবর্তন সংরক্ষণ করুন
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>ইউজার পলিসি অ্যাকসেপ্টেন্স</CardTitle>
              <CardDescription>পলিসি পরিবর্তনের সময় ইউজারদের কাছ থেকে স্বীকৃতি নেওয়ার সেটিংস</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="requireReaccept">পলিসি পরিবর্তনে পুনরায় স্বীকৃতি</Label>
                  <p className="text-sm text-muted-foreground">পলিসি পরিবর্তনের সময় ইউজারদের পুনরায় স্বীকৃতি দিতে বলুন</p>
                </div>
                <Switch id="requireReaccept" defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showBanner">পলিসি আপডেট ব্যানার</Label>
                  <p className="text-sm text-muted-foreground">নতুন পলিসি আপডেট সম্পর্কে একটি ব্যানার দেখান</p>
                </div>
                <Switch id="showBanner" defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="blockUntilAccept">স্বীকৃতি প্রদান আবশ্যক</Label>
                  <p className="text-sm text-muted-foreground">পলিসি স্বীকৃতি না দেওয়া পর্যন্ত সাইট ব্যবহার ব্লক করুন</p>
                </div>
                <Switch id="blockUntilAccept" defaultChecked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailUpdate">পলিসি আপডেট ইমেইল</Label>
                  <p className="text-sm text-muted-foreground">পলিসি পরিবর্তন সম্পর্কে ইউজারদের ইমেইল পাঠান</p>
                </div>
                <Switch id="emailUpdate" defaultChecked={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleSaveSettings('পলিসি স্বীকৃতি')}>
                <Save className="mr-2 h-4 w-4" />
                সেটিংস সেভ করুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
