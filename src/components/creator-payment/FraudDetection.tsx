
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Ban, 
  CheckCircle2,
  XCircle,
  TrendingUp,
  Users,
  Clock,
  MapPin,
  CreditCard,
  Smartphone
} from 'lucide-react';

const FraudDetection = () => {
  const { toast } = useToast();
  const [fraudSettings, setFraudSettings] = useState({
    autoBlock: true,
    ipTracking: true,
    velocityCheck: true,
    amountLimits: true,
    deviceFingerprinting: true,
    behaviorAnalysis: true
  });

  const fraudAlerts = [
    {
      id: 'FR001',
      type: 'multiple_orders',
      severity: 'high',
      user: 'user_12345',
      userEmail: 'suspicious@email.com',
      description: 'একই IP থেকে ৫ মিনিটে ১০টি অর্ডার',
      detectedAt: '২৮ নভেম্বর, ২০২৪ - ১৪:৩০',
      status: 'investigating',
      riskScore: 95,
      details: {
        ip: '192.168.1.100',
        location: 'ঢাকা, বাংলাদেশ',
        device: 'Chrome on Windows',
        orders: 10,
        totalAmount: 50000
      }
    },
    {
      id: 'FR002',
      type: 'suspicious_payment',
      severity: 'medium',
      user: 'user_67890',
      userEmail: 'test@tempmail.com',
      description: 'অস্বাভাবিক পেমেন্ট প্যাটার্ন',
      detectedAt: '২৮ নভেম্বর, ২০২৪ - ১২:১৫',
      status: 'resolved',
      riskScore: 65,
      details: {
        ip: '203.112.58.23',
        location: 'চট্টগ্রাম, বাংলাদেশ',
        device: 'Safari on iPhone',
        orders: 3,
        totalAmount: 15000
      }
    },
    {
      id: 'FR003',
      type: 'velocity_fraud',
      severity: 'high',
      user: 'user_11111',
      userEmail: 'rapid@orders.com',
      description: 'অত্যধিক দ্রুত লেনদেন',
      detectedAt: '২৭ নভেম্বর, ২০২৪ - ২০:৪৫',
      status: 'blocked',
      riskScore: 88,
      details: {
        ip: '116.58.201.142',
        location: 'সিলেট, বাংলাদেশ',
        device: 'Chrome on Android',
        orders: 7,
        totalAmount: 35000
      }
    }
  ];

  const fraudStats = {
    todayAlerts: 12,
    blockedTransactions: 45,
    savedAmount: 125000,
    falsePositives: 3
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">উচ্চ ঝুঁকি</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800">মধ্যম ঝুঁকি</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-800">নিম্ন ঝুঁকি</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'investigating':
        return <Badge className="bg-blue-100 text-blue-800">তদন্তাধীন</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">সমাধান</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">ব্লক করা</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple_orders':
        return <TrendingUp className="h-5 w-5 text-red-600" />;
      case 'suspicious_payment':
        return <CreditCard className="h-5 w-5 text-orange-600" />;
      case 'velocity_fraud':
        return <Clock className="h-5 w-5 text-red-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleBlockUser = (userId: string) => {
    toast({
      title: "ইউজার ব্লক করা হয়েছে",
      description: `ইউজার ${userId} কে সফলভাবে ব্লক করা হয়েছে`,
    });
  };

  const handleWhitelistUser = (userId: string) => {
    toast({
      title: "ইউজার হোয়াইটলিস্ট করা হয়েছে",
      description: `ইউজার ${userId} কে হোয়াইটলিস্ট করা হয়েছে`,
    });
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <Shield className="h-6 w-6" />
          ফ্রড ডিটেকশন ও প্রতিরোধ
        </h2>
        <p className="text-muted-foreground">
          সন্দেহজনক কার্যকলাপ শনাক্তকরণ এবং প্রতিরোধ ব্যবস্থা
        </p>
      </div>

      {/* Fraud Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{fraudStats.todayAlerts}</p>
            <p className="text-sm text-muted-foreground">আজকের সতর্কতা</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{fraudStats.blockedTransactions}</p>
            <p className="text-sm text-muted-foreground">ব্লক করা লেনদেন</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">৳{fraudStats.savedAmount.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">সংরক্ষিত টাকা</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{fraudStats.falsePositives}</p>
            <p className="text-sm text-muted-foreground">ভুল সনাক্তকরণ</p>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Detection Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            ফ্রড ডিটেকশন সেটিংস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-block">অটো ব্লক সিস্টেম</Label>
                <Switch
                  id="auto-block"
                  checked={fraudSettings.autoBlock}
                  onCheckedChange={(checked) => 
                    setFraudSettings(prev => ({...prev, autoBlock: checked}))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="ip-tracking">IP ট্র্যাকিং</Label>
                <Switch
                  id="ip-tracking"
                  checked={fraudSettings.ipTracking}
                  onCheckedChange={(checked) => 
                    setFraudSettings(prev => ({...prev, ipTracking: checked}))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="velocity-check">ভেলোসিটি চেক</Label>
                <Switch
                  id="velocity-check"
                  checked={fraudSettings.velocityCheck}
                  onCheckedChange={(checked) => 
                    setFraudSettings(prev => ({...prev, velocityCheck: checked}))
                  }
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount-limits">পরিমাণ সীমা</Label>
                <Switch
                  id="amount-limits"
                  checked={fraudSettings.amountLimits}
                  onCheckedChange={(checked) => 
                    setFraudSettings(prev => ({...prev, amountLimits: checked}))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="device-fingerprinting">ডিভাইস ফিঙ্গারপ্রিন্টিং</Label>
                <Switch
                  id="device-fingerprinting"
                  checked={fraudSettings.deviceFingerprinting}
                  onCheckedChange={(checked) => 
                    setFraudSettings(prev => ({...prev, deviceFingerprinting: checked}))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="behavior-analysis">আচরণ বিশ্লেষণ</Label>
                <Switch
                  id="behavior-analysis"
                  checked={fraudSettings.behaviorAnalysis}
                  onCheckedChange={(checked) => 
                    setFraudSettings(prev => ({...prev, behaviorAnalysis: checked}))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fraud Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>ফ্রড সতর্কতা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(alert.type)}
                      <h4 className="font-medium">{alert.description}</h4>
                      {getSeverityBadge(alert.severity)}
                      {getStatusBadge(alert.status)}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground">
                      <span>Alert ID: {alert.id}</span>
                      <span>ইউজার: {alert.user}</span>
                      <span>ইমেইল: {alert.userEmail}</span>
                      <span>সময়: {alert.detectedAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    <div className={`text-2xl font-bold ${getRiskColor(alert.riskScore)}`}>
                      {alert.riskScore}%
                    </div>
                    <p className="text-sm text-muted-foreground">ঝুঁকি স্কোর</p>
                  </div>
                </div>

                {/* Alert Details */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h5 className="font-medium">বিস্তারিত তথ্য:</h5>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>IP: {alert.details.ip}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{alert.details.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <span>{alert.details.device}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>{alert.details.orders} অর্ডার</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">মোট পরিমাণ: </span>
                    <span className="text-lg font-bold">৳{alert.details.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                {alert.status === 'investigating' && (
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleBlockUser(alert.user)}
                    >
                      <Ban className="h-4 w-4 mr-1" />
                      ইউজার ব্লক করুন
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleWhitelistUser(alert.user)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      হোয়াইটলিস্ট করুন
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      আরও তদন্ত
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fraud Prevention Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>ফ্রড প্রতিরোধ নির্দেশনা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">অটোমেটিক ডিটেকশন:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>একই IP থেকে অসংখ্য অর্ডার</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>অস্বাভাবিক পেমেন্ট প্যাটার্ন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>উচ্চ ভেলোসিটি লেনদেন</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>সন্দেহজনক ইমেইল ডোমেইন</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">ম্যানুয়াল পর্যালোচনা:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>উচ্চ পরিমাণের লেনদেন</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>নতুন ইউজার বড় অর্ডার</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>ভৌগোলিক অসামঞ্জস্য</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <span>KYC অসম্পূর্ণ বড় অর্ডার</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDetection;
