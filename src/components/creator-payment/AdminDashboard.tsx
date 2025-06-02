
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  CreditCard, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Shield,
  FileText,
  Settings,
  Ban,
  CheckCircle2,
  Clock,
  Eye
} from 'lucide-react';

const AdminDashboard = () => {
  const [adminStats] = useState({
    totalUsers: 1248,
    totalCreators: 856,
    totalBuyers: 392,
    totalTransactions: 2547,
    totalRevenue: 1250000,
    pendingWithdrawals: 45,
    activeDisputes: 8,
    flaggedAccounts: 12
  });

  const [pendingActions] = useState([
    {
      id: 'ACT001',
      type: 'kyc_review',
      user: 'আহমেদ হাসান',
      action: 'KYC ডকুমেন্ট পর্যালোচনা',
      priority: 'high',
      timeAgo: '২ ঘন্টা আগে'
    },
    {
      id: 'ACT002',
      type: 'dispute_resolution',
      user: 'ফাতেমা খান vs করিম উদ্দিন',
      action: 'বিরোধ সমাধান প্রয়োজন',
      priority: 'high',
      timeAgo: '৪ ঘন্টা আগে'
    },
    {
      id: 'ACT003',
      type: 'withdrawal_approval',
      user: 'রহিম আলী',
      action: 'উত্তোলন অনুমোদন',
      priority: 'medium',
      timeAgo: '১ দিন আগে'
    },
    {
      id: 'ACT004',
      type: 'fraud_investigation',
      user: 'সন্দেহজনক একাউন্ট',
      action: 'ফ্রড তদন্ত প্রয়োজন',
      priority: 'high',
      timeAgo: '৬ ঘন্টা আগে'
    }
  ]);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">জরুরি</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">মাঝারি</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">কম</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'kyc_review':
        return <Shield className="h-5 w-5 text-blue-600" />;
      case 'dispute_resolution':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'withdrawal_approval':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'fraud_investigation':
        return <Ban className="h-5 w-5 text-orange-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Overview */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Settings className="h-6 w-6" />
          অ্যাডমিন ড্যাশবোর্ড
        </h2>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">মোট ব্যবহারকারী</p>
                  <p className="text-xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">মোট লেনদেন</p>
                  <p className="text-xl font-bold">{adminStats.totalTransactions.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">মোট রেভিনিউ</p>
                  <p className="text-xl font-bold">৳{(adminStats.totalRevenue / 1000).toFixed(0)}K</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">সক্রিয় বিরোধ</p>
                  <p className="text-xl font-bold">{adminStats.activeDisputes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            অপেক্ষমাণ কার্যক্রম
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingActions.map((action) => (
              <div key={action.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getActionIcon(action.type)}
                    <div>
                      <h4 className="font-medium">{action.action}</h4>
                      <p className="text-sm text-muted-foreground">{action.user}</p>
                      <p className="text-xs text-muted-foreground">{action.timeAgo}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getPriorityBadge(action.priority)}
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      পর্যালোচনা
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Admin Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">ব্যবহারকারী ব্যবস্থাপনা</TabsTrigger>
          <TabsTrigger value="transactions">লেনদেন মনিটরিং</TabsTrigger>
          <TabsTrigger value="disputes">বিরোধ সমাধান</TabsTrigger>
          <TabsTrigger value="withdrawals">উত্তোলন ব্যবস্থাপনা</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ব্যবহারকারী ব্যবস্থাপনা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{adminStats.totalCreators}</p>
                    <p className="text-sm text-muted-foreground">ক্রিয়েটর</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{adminStats.totalBuyers}</p>
                    <p className="text-sm text-muted-foreground">ক্রেতা</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{adminStats.flaggedAccounts}</p>
                    <p className="text-sm text-muted-foreground">ফ্ল্যাগ করা একাউন্ট</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">ব্যবহারকারী ব্যবস্থাপনা ফিচার শীঘ্রই যোগ করা হবে</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>লেনদেন মনিটরিং</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">৳{(adminStats.totalRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">মোট রেভিনিউ</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{adminStats.totalTransactions}</p>
                    <p className="text-sm text-muted-foreground">মোট লেনদেন</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">লেনদেন মনিটরিং ফিচার শীঘ্রই যোগ করা হবে</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>বিরোধ সমাধান</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{adminStats.activeDisputes}</p>
                    <p className="text-sm text-muted-foreground">সক্রিয় বিরোধ</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">15</p>
                    <p className="text-sm text-muted-foreground">তদন্ত চলছে</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">42</p>
                    <p className="text-sm text-muted-foreground">সমাধান হয়েছে</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">বিরোধ সমাধান ইন্টারফেস শীঘ্রই যোগ করা হবে</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>উত্তোলন ব্যবস্থাপনা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{adminStats.pendingWithdrawals}</p>
                    <p className="text-sm text-muted-foreground">অপেক্ষমাণ উত্তোলন</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">128</p>
                    <p className="text-sm text-muted-foreground">সম্পন্ন উত্তোলন</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-sm text-muted-foreground">প্রত্যাখ্যাত উত্তোলন</p>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">উত্তোলন ব্যবস্থাপনা ইন্টারফেস শীঘ্রই যোগ করা হবে</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
