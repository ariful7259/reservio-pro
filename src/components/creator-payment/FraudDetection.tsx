
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Ban, 
  CheckCircle2,
  Clock,
  UserX,
  Activity,
  Globe,
  CreditCard
} from 'lucide-react';

const FraudDetection = () => {
  const [suspiciousActivities] = useState([
    {
      id: 'FRAUD001',
      type: 'multiple_orders_same_ip',
      description: 'একই IP থেকে ১০টি অর্ডার ১ ঘণ্টায়',
      ipAddress: '192.168.1.100',
      userId: 'USR001',
      userName: 'সন্দেহজনক ব্যবহারকারী',
      riskLevel: 'high',
      detectedAt: '২৮ নভেম্বর, ২০২ৄ - ২:৩০ PM',
      status: 'flagged',
      orderCount: 10,
      totalAmount: 50000
    },
    {
      id: 'FRAUD002',
      type: 'rapid_payment_cancellation',
      description: 'দ্রুত পেমেন্ট ক্যান্সেলেশন প্যাটার্ন',
      ipAddress: '203.112.45.67',
      userId: 'USR002',
      userName: 'আলী হাসান',
      riskLevel: 'medium',
      detectedAt: '২৭ নভেম্বর, ২০২৪ - ৪:১৫ PM',
      status: 'investigating',
      orderCount: 5,
      totalAmount: 15000
    },
    {
      id: 'FRAUD003',
      type: 'unusual_payment_pattern',
      description: 'অস্বাভাবিক পেমেন্ট প্যাটার্ন',
      ipAddress: '45.123.78.90',
      userId: 'USR003',
      userName: 'রহিম উদ্দিন',
      riskLevel: 'low',
      detectedAt: '২৬ নভেম্বর, ২০২৪ - ১১:০০ AM',
      status: 'resolved',
      orderCount: 3,
      totalAmount: 8000
    }
  ]);

  const [securitySettings] = useState({
    autoFlag: true,
    manualReview: true,
    maxOrdersPerHour: 5,
    maxAmountPerDay: 100000,
    vpnDetection: true,
    multipleCardCheck: true
  });

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">উচ্চ ঝুঁকি</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">মাঝারি ঝুঁকি</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">কম ঝুঁকি</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'flagged':
        return <Badge className="bg-red-100 text-red-800">ফ্ল্যাগ করা</Badge>;
      case 'investigating':
        return <Badge className="bg-yellow-100 text-yellow-800">তদন্ত চলছে</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">সমাধান হয়েছে</Badge>;
      case 'blocked':
        return <Badge className="bg-gray-100 text-gray-800">ব্লক করা</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'multiple_orders_same_ip':
        return <Globe className="h-5 w-5 text-red-600" />;
      case 'rapid_payment_cancellation':
        return <CreditCard className="h-5 w-5 text-yellow-600" />;
      case 'unusual_payment_pattern':
        return <Activity className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleBlockUser = (userId: string) => {
    console.log('Blocking user:', userId);
    // Implement user blocking logic
  };

  const handleInvestigate = (activityId: string) => {
    console.log('Investigating activity:', activityId);
    // Implement investigation logic
  };

  const statsData = {
    totalFlagged: suspiciousActivities.filter(a => a.status === 'flagged').length,
    totalInvestigating: suspiciousActivities.filter(a => a.status === 'investigating').length,
    totalResolved: suspiciousActivities.filter(a => a.status === 'resolved').length,
    totalBlocked: 0 // Would come from blocked users count
  };

  return (
    <div className="space-y-6">
      {/* Fraud Detection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ফ্ল্যাগ করা</p>
                <p className="text-xl font-bold">{statsData.totalFlagged}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">তদন্ত চলছে</p>
                <p className="text-xl font-bold">{statsData.totalInvestigating}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">সমাধান হয়েছে</p>
                <p className="text-xl font-bold">{statsData.totalResolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Ban className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ব্লক করা</p>
                <p className="text-xl font-bold">{statsData.totalBlocked}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          ফ্রড ডিটেকশন সিস্টেম সক্রিয় আছে। সন্দেহজনক কার্যকলাপ অটোমেটিক ডিটেক্ট হবে এবং অ্যাডমিনকে নোটিফিকেশন পাঠানো হবে।
        </AlertDescription>
      </Alert>

      {/* Suspicious Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            সন্দেহজনক কার্যকলাপ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {suspiciousActivities.map((activity) => (
              <div key={activity.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity.type)}
                      <h4 className="font-medium">{activity.description}</h4>
                      {getRiskLevelBadge(activity.riskLevel)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <span>ব্যবহারকারী: {activity.userName} ({activity.userId})</span>
                      <span>IP: {activity.ipAddress}</span>
                      <span>অর্ডার: {activity.orderCount}টি</span>
                      <span>পরিমাণ: ৳{activity.totalAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.detectedAt}</p>
                  </div>
                  
                  <div className="flex flex-col lg:items-end gap-2">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>

                {/* Risk Details */}
                {activity.riskLevel === 'high' && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      উচ্চ ঝুঁকিপূর্ণ কার্যকলাপ ডিটেক্ট হয়েছে। তাৎক্ষণিক পর্যালোচনা প্রয়োজন।
                    </AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleInvestigate(activity.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    বিস্তারিত দেখুন
                  </Button>
                  {activity.status === 'flagged' && (
                    <Button size="sm" variant="outline">
                      <Clock className="h-4 w-4 mr-2" />
                      তদন্ত শুরু করুন
                    </Button>
                  )}
                  {activity.riskLevel === 'high' && activity.status !== 'resolved' && (
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleBlockUser(activity.userId)}
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      ব্যবহারকারী ব্লক করুন
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            নিরাপত্তা সেটিংস
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">অটোমেটিক ডিটেকশন:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">অটো ফ্ল্যাগিং</span>
                  <Badge className={securitySettings.autoFlag ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {securitySettings.autoFlag ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">ম্যানুয়াল রিভিউ</span>
                  <Badge className={securitySettings.manualReview ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {securitySettings.manualReview ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">VPN ডিটেকশন</span>
                  <Badge className={securitySettings.vpnDetection ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {securitySettings.vpnDetection ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">সীমা নির্ধারণ:</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">ঘণ্টায় সর্বোচ্চ অর্ডার</span>
                  <span className="font-medium">{securitySettings.maxOrdersPerHour}টি</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">দৈনিক সর্বোচ্চ পরিমাণ</span>
                  <span className="font-medium">৳{securitySettings.maxAmountPerDay.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">মাল্টিপল কার্ড চেক</span>
                  <Badge className={securitySettings.multipleCardCheck ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                    {securitySettings.multipleCardCheck ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prevention Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>ফ্রড প্রতিরোধ নির্দেশনা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">সাধারণ ফ্রড প্যাটার্ন:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <span>একই IP থেকে অসংখ্য অর্ডার</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <span>দ্রুত পেমেন্ট ক্যান্সেলেশন</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <span>অস্বাভাবিক পেমেন্ট প্যাটার্ন</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  <span>চুরি হওয়া কার্ড ব্যবহার</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">প্রতিরোধমূলক ব্যবস্থা:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>KYC ভেরিফিকেশন বাধ্যতামূলক</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>রেট লিমিটিং সিস্টেম</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>অটোমেটিক ফ্ল্যাগিং</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>ম্যানুয়াল রিভিউ প্রক্রিয়া</span>
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
