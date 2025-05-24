
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Shield, 
  Download, 
  Upload, 
  RefreshCw, 
  Clock, 
  Database,
  Lock,
  Key,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  Activity
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const BackupSecurity = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('backup');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: 'daily',
    retentionDays: 30,
    includeMedia: true,
    encryption: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: 30,
    loginAlerts: true,
    ipWhitelist: false,
    passwordExpiry: 90,
    failedLoginLimit: 5
  });

  const backupHistory = [
    {
      id: '1',
      date: '২০২৪-০৩-২০ ১০:৩০',
      size: '১২৫ MB',
      type: 'স্বয়ংক্রিয়',
      status: 'সফল'
    },
    {
      id: '2',
      date: '২০২৪-০৩-১৯ ১০:৩০',
      size: '১২৩ MB',
      type: 'স্বয়ংক্রিয়',
      status: 'সফল'
    },
    {
      id: '3',
      date: '২০২৪-০৩-১৮ ১৫:৪৫',
      size: '১২০ MB',
      type: 'ম্যানুয়াল',
      status: 'সফল'
    }
  ];

  const handleBackup = async () => {
    setIsBackingUp(true);
    
    // Simulate backup process
    setTimeout(() => {
      setIsBackingUp(false);
      toast({
        title: "ব্যাকআপ সফল!",
        description: "আপনার ডাটা সফলভাবে ব্যাকআপ হয়েছে।",
      });
    }, 3000);
  };

  const handleEnable2FA = () => {
    setShowQR(true);
    setTwoFactorEnabled(true);
    toast({
      title: "২FA সক্রিয় করা হয়েছে",
      description: "আপনার অ্যাকাউন্ট এখন আরো নিরাপদ।",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'সফল':
        return <Badge className="bg-green-100 text-green-800">সফল</Badge>;
      case 'ব্যর্থ':
        return <Badge className="bg-red-100 text-red-800">ব্যর্থ</Badge>;
      case 'চলমান':
        return <Badge className="bg-blue-100 text-blue-800">চলমান</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">ব্যাকআপ ও সিকিউরিটি</h2>
          <p className="text-muted-foreground">আপনার ডাটা ও অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করুন</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <Badge className="bg-green-100 text-green-800">নিরাপদ</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="backup">ব্যাকআপ</TabsTrigger>
          <TabsTrigger value="2fa">২FA</TabsTrigger>
          <TabsTrigger value="security">সিকিউরিটি</TabsTrigger>
          <TabsTrigger value="activity">অ্যাক্টিভিটি</TabsTrigger>
        </TabsList>

        <TabsContent value="backup" className="space-y-6">
          {/* ব্যাকআপ কন্ট্রোল */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Database className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium">সর্বশেষ ব্যাকআপ</h3>
                <p className="text-sm text-muted-foreground">২০২ৄ-০৩-২০ ১০:৩০</p>
                <Badge className="mt-2 bg-green-100 text-green-800">সফল</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <RefreshCw className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-medium">অটো ব্যাকআপ</h3>
                <p className="text-sm text-muted-foreground">দৈনিক ১০:৩০ AM</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">সক্রিয়</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      className="w-full gap-2" 
                      disabled={isBackingUp}
                    >
                      {isBackingUp ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          ব্যাকআপ হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          এখনই ব্যাকআপ
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>ম্যানুয়াল ব্যাকআপ নিশ্চিত করুন</AlertDialogTitle>
                      <AlertDialogDescription>
                        এটি আপনার সম্পূর্ণ ডাটার একটি ব্যাকআপ তৈরি করবে। প্রক্রিয়াটি কয়েক মিনিট সময় নিতে পারে।
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>বাতিল</AlertDialogCancel>
                      <AlertDialogAction onClick={handleBackup}>
                        ব্যাকআপ শুরু করুন
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>

          {/* ব্যাকআপ সেটিংস */}
          <Card>
            <CardHeader>
              <CardTitle>ব্যাকআপ সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>অটো ব্যাকআপ</Label>
                  <p className="text-sm text-muted-foreground">নিয়মিত স্বয়ংক্রিয় ব্যাকআপ সক্রিয় করুন</p>
                </div>
                <Switch
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) => 
                    setBackupSettings(prev => ({ ...prev, autoBackup: checked }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ব্যাকআপ ফ্রিকোয়েন্সি</Label>
                  <Select 
                    value={backupSettings.frequency} 
                    onValueChange={(value) => 
                      setBackupSettings(prev => ({ ...prev, frequency: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">প্রতি ঘন্টায়</SelectItem>
                      <SelectItem value="daily">দৈনিক</SelectItem>
                      <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
                      <SelectItem value="monthly">মাসিক</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>রিটেনশন পিরিয়ড (দিন)</Label>
                  <Input
                    type="number"
                    value={backupSettings.retentionDays}
                    onChange={(e) => 
                      setBackupSettings(prev => ({ 
                        ...prev, 
                        retentionDays: parseInt(e.target.value) 
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>মিডিয়া ফাইল অন্তর্ভুক্ত করুন</Label>
                  <p className="text-sm text-muted-foreground">ছবি, ভিডিও এবং অন্যান্য মিডিয়া ফাইল</p>
                </div>
                <Switch
                  checked={backupSettings.includeMedia}
                  onCheckedChange={(checked) => 
                    setBackupSettings(prev => ({ ...prev, includeMedia: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>এনক্রিপশন</Label>
                  <p className="text-sm text-muted-foreground">ব্যাকআপ ফাইল এনক্রিপ্ট করুন</p>
                </div>
                <Switch
                  checked={backupSettings.encryption}
                  onCheckedChange={(checked) => 
                    setBackupSettings(prev => ({ ...prev, encryption: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* ব্যাকআপ হিস্টরি */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                ব্যাকআপ হিস্টরি
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {backupHistory.map((backup) => (
                  <div key={backup.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <Database className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{backup.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {backup.size} • {backup.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(backup.status)}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="2fa" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                টু-ফ্যাক্টর অথেন্টিকেশন (২FA)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!twoFactorEnabled ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">২FA সক্রিয় করুন</h3>
                    <p className="text-sm text-muted-foreground">
                      অতিরিক্ত নিরাপত্তার জন্য আপনার অ্যাকাউন্টে ২FA সক্রিয় করুন
                    </p>
                  </div>
                  <Button onClick={handleEnable2FA} className="gap-2">
                    <Lock className="h-4 w-4" />
                    ২FA সক্রিয় করুন
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">২FA সক্রিয় আছে</h3>
                    <p className="text-sm text-muted-foreground">
                      আপনার অ্যাকাউন্ট অতিরিক্ত নিরাপত্তায় সুরক্ষিত
                    </p>
                  </div>
                  
                  {showQR && (
                    <div className="bg-muted p-6 rounded-lg">
                      <h4 className="font-medium mb-4">অথেন্টিকেটর অ্যাপ সেটআপ করুন</h4>
                      <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <p className="text-sm text-muted-foreground">QR কোড এখানে</p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Google Authenticator বা Authy অ্যাপে এই QR কোডটি স্ক্যান করুন
                      </p>
                      <Input placeholder="৬ ডিজিটের কোড প্রবেশ করুন" className="max-w-xs mx-auto" />
                      <Button className="mt-4">
                        যাচাই করুন
                      </Button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Button variant="outline">
                      ব্যাকআপ কোড জেনারেট করুন
                    </Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700">
                      ২FA নিষ্ক্রিয় করুন
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>নিরাপত্তা সেটিংস</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>সেশন টাইমআউট (মিনিট)</Label>
                  <Input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => 
                      setSecuritySettings(prev => ({ 
                        ...prev, 
                        sessionTimeout: parseInt(e.target.value) 
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>ব্যর্থ লগইন সীমা</Label>
                  <Input
                    type="number"
                    value={securitySettings.failedLoginLimit}
                    onChange={(e) => 
                      setSecuritySettings(prev => ({ 
                        ...prev, 
                        failedLoginLimit: parseInt(e.target.value) 
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>লগইন অ্যালার্ট</Label>
                  <p className="text-sm text-muted-foreground">নতুন ডিভাইস থেকে লগইনের ইমেইল পাঠান</p>
                </div>
                <Switch
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, loginAlerts: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>IP হোয়াইটলিস্ট</Label>
                  <p className="text-sm text-muted-foreground">শুধুমাত্র নির্দিষ্ট IP থেকে অ্যাক্সেস অনুমতি দিন</p>
                </div>
                <Switch
                  checked={securitySettings.ipWhitelist}
                  onCheckedChange={(checked) => 
                    setSecuritySettings(prev => ({ ...prev, ipWhitelist: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>পাসওয়ার্ড মেয়াদ (দিন)</Label>
                <Input
                  type="number"
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => 
                    setSecuritySettings(prev => ({ 
                      ...prev, 
                      passwordExpiry: parseInt(e.target.value) 
                    }))
                  }
                />
                <p className="text-sm text-muted-foreground">
                  ০ মানে পাসওয়ার্ডের কোনো মেয়াদ নেই
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>পাসওয়ার্ড নীতি</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">কমপক্ষে ৮ অক্ষর</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">বড় ও ছোট হাতের অক্ষর</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">সংখ্যা থাকতে হবে</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">বিশেষ চিহ্ন (@, #, $ ইত্যাদি)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">সাধারণ পাসওয়ার্ড নিষিদ্ধ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">পুরাতন পাসওয়ার্ড পুনরায় ব্যবহার নিষিদ্ধ</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                সাম্প্রতিক অ্যাক্টিভিটি
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    action: 'সফল লগইন',
                    device: 'Chrome on Windows',
                    ip: '192.168.1.1',
                    time: '৫ মিনিট আগে',
                    status: 'success'
                  },
                  {
                    action: 'পাসওয়ার্ড পরিবর্তন',
                    device: 'Chrome on Windows',
                    ip: '192.168.1.1',
                    time: '২ ঘন্টা আগে',
                    status: 'success'
                  },
                  {
                    action: 'ব্যর্থ লগইন প্রচেষ্টা',
                    device: 'Unknown',
                    ip: '203.82.45.12',
                    time: '১ দিন আগে',
                    status: 'warning'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.device} • {activity.ip}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button>সেটিংস সংরক্ষণ করুন</Button>
      </div>
    </div>
  );
};

export default BackupSecurity;
