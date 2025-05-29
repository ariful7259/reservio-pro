
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Shield, 
  Eye, 
  Ban, 
  CheckCircle,
  TrendingUp,
  Clock,
  MapPin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FraudDetection = () => {
  const { toast } = useToast();
  
  const [fraudAlerts] = useState([
    {
      id: 'FD001',
      type: 'multiple_orders',
      severity: 'high',
      description: 'একই IP থেকে ১০টি অর্ডার ১ ঘন্টায়',
      ipAddress: '192.168.1.100',
      location: 'ঢাকা, বাংলাদেশ',
      timestamp: '২৮ নভেম্বর, ২০২৪ - ১৪:৩০',
      status: 'pending',
      affectedOrders: ['ORD001', 'ORD002', 'ORD003'],
      userId: 'USR001',
      userEmail: 'suspicious@example.com'
    },
    {
      id: 'FD002',
      type: 'payment_pattern',
      severity: 'medium',
      description: 'অস্বাভাবিক পেমেন্ট প্যাটার্ন',
      ipAddress: '203.190.45.23',
      location: 'চট্টগ্রাম, বাংলাদেশ',
      timestamp: '২৭ নভেম্বর, ২০২৪ - ২২:১৫',
      status: 'investigating',
      affectedOrders: ['ORD015'],
      userId: 'USR025',
      userEmail: 'user25@example.com'
    },
    {
      id: 'FD003',
      type: 'account_creation',
      severity: 'low',
      description: 'একই ডিভাইস থেকে একাধিক অ্যাকাউন্ট',
      ipAddress: '45.123.67.89',
      location: 'সিলেট, বাংলাদেশ',
      timestamp: '২৬ নভেম্বর, ২০২৪ - ১৮:৪৫',
      status: 'resolved',
      affectedOrders: [],
      userId: 'USR030',
      userEmail: 'newuser@example.com'
    }
  ]);

  const [systemStats] = useState({
    totalTransactions: 2456,
    flaggedTransactions: 89,
    preventedFraud: 12,
    savedAmount: 45600
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">অপেক্ষমান</Badge>;
      case 'investigating':
        return <Badge className="bg-blue-100 text-blue-800">তদন্তাধীন</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">সমাধান</Badge>;
      case 'blocked':
        return <Badge className="bg-red-100 text-red-800">ব্লক</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple_orders':
        return <TrendingUp className="h-5 w-5" />;
      case 'payment_pattern':
        return <Shield className="h-5 w-5" />;
      case 'account_creation':
        return <Eye className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const handleAction = (alertId: string, action: 'investigate' | 'block' | 'approve' | 'freeze') => {
    let message = '';
    switch (action) {
      case 'investigate':
        message = 'তদন্ত শুরু করা হয়েছে';
        break;
      case 'block':
        message = 'ইউজার ব্লক করা হয়েছে';
        break;
      case 'approve':
        message = 'অনুমোদন করা হয়েছে';
        break;
      case 'freeze':
        message = 'ট্রানজেকশন ফ্রিজ করা হয়েছে';
        break;
    }
    
    toast({
      title: "অ্যাকশন সম্পন্ন",
      description: message,
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট ট্রানজেকশন</p>
                <p className="text-xl font-bold">{systemStats.totalTransactions.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ফ্ল্যাগড</p>
                <p className="text-xl font-bold">{systemStats.flaggedTransactions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ফ্রড প্রতিরোধ</p>
                <p className="text-xl font-bold">{systemStats.preventedFraud}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">সেভ করা টাকা</p>
                <p className="text-xl font-bold">৳{systemStats.savedAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            সক্রিয় ফ্রড অ্যালার্ট
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fraudAlerts.map((alert) => (
              <Alert key={alert.id} className={getSeverityColor(alert.severity)}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getTypeIcon(alert.type)}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">অ্যালার্ট #{alert.id}</h4>
                          {getStatusBadge(alert.status)}
                          <Badge variant="outline" className={alert.severity === 'high' ? 'border-red-300' : alert.severity === 'medium' ? 'border-yellow-300' : 'border-blue-300'}>
                            {alert.severity === 'high' ? 'উচ্চ' : alert.severity === 'medium' ? 'মধ্যম' : 'নিম্ন'} ঝুঁকি
                          </Badge>
                        </div>
                        <AlertDescription className="text-sm font-medium mb-2">
                          {alert.description}
                        </AlertDescription>
                        <div className="text-xs space-y-1">
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              IP: {alert.ipAddress}
                            </span>
                            <span>{alert.location}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {alert.timestamp}
                            </span>
                          </div>
                          <div className="text-muted-foreground">
                            ইউজার: {alert.userEmail} | অর্ডার: {alert.affectedOrders.join(', ') || 'কোনো অর্ডার নেই'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {alert.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAction(alert.id, 'investigate')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              তদন্ত
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleAction(alert.id, 'freeze')}
                            >
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              ফ্রিজ
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleAction(alert.id, 'block')}
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              ব্লক
                            </Button>
                          </>
                        )}
                        
                        {alert.status === 'investigating' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleAction(alert.id, 'approve')}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              অনুমোদন
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleAction(alert.id, 'block')}
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              ব্লক
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fraud Prevention Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            ফ্রড প্রতিরোধ নিয়ম
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">অটোমেটিক ডিটেকশন</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>একই IP থেকে ৫+ অর্ডার (১ ঘন্টায়)</span>
                  <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>একই কার্ড দিয়ে একাধিক পেমেন্ট</span>
                  <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <span>VPN/Proxy ব্যবহার সনাক্তকরণ</span>
                  <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <span>অস্বাভাবিক পেমেন্ট প্যাটার্ন</span>
                  <Badge className="bg-yellow-100 text-yellow-800">পর্যবেক্ষণ</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">ম্যানুয়াল ওভাররাইড</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span>তাৎক্ষণিক অ্যাকাউন্ট লক</span>
                  <Badge className="bg-blue-100 text-blue-800">উপলব্ধ</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span>ট্রানজেকশন ফ্রিজ</span>
                  <Badge className="bg-blue-100 text-blue-800">উপলব্ধ</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span>হোয়াইটলিস্ট ব্যবস্থাপনা</span>
                  <Badge className="bg-blue-100 text-blue-800">উপলব্ধ</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span>Emergency Stop System</span>
                  <Badge className="bg-red-100 text-red-800">জরুরি</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudDetection;
