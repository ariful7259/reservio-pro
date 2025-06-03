
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertTriangle,
  Eye,
  Link,
  Shield,
  User,
  Calendar,
  CreditCard,
  Wallet
} from 'lucide-react';

const CreatorDashboard = () => {
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');

  const creatorStats = {
    totalEarnings: 125000,
    pendingEarnings: 35000,
    availableBalance: 90000,
    totalOrders: 47,
    completedOrders: 42,
    activeOrders: 3,
    disputedOrders: 2,
    conversionRate: 85,
    averageOrderValue: 2659
  };

  const recentOrders = [
    {
      id: 'ORD001234',
      service: 'ওয়েব ডিজাইন',
      buyer: 'আহমেদ হাসান',
      amount: 15000,
      status: 'escrow_holding',
      orderDate: '২৮ নভেম্বর, ২০২৪',
      deadline: '৫ ডিসেম্বর, ২০২৪',
      daysLeft: 7,
      isAdvance: false,
      completionStatus: 85
    },
    {
      id: 'ORD001235',
      service: 'লোগো ডিজাইন - অ্যাডভান্স',
      buyer: 'ফাতেমা খান',
      amount: 3000,
      status: 'in_progress',
      orderDate: '২৫ নভেম্বর, ২০২৪',
      deadline: 'কাজ সম্পন্ন না হওয়া পর্যন্ত',
      daysLeft: null,
      isAdvance: true,
      completionStatus: 60
    },
    {
      id: 'ORD001236',
      service: 'গ্রাফিক ডিজাইন',
      buyer: 'করিম উদ্দিন',
      amount: 5000,
      status: 'disputed',
      orderDate: '২০ নভেম্বর, ২০২৪',
      deadline: '৩০ নভেম্বর, ২০২৪',
      daysLeft: 2,
      isAdvance: false,
      completionStatus: 90
    },
    {
      id: 'ORD001237',
      service: 'ভিডিও এডিটিং',
      buyer: 'রাশিদা বেগম',
      amount: 8000,
      status: 'completed',
      orderDate: '১৫ নভেম্বর, ২০২৪',
      deadline: '২৫ নভেম্বর, ২০২৪',
      daysLeft: 0,
      isAdvance: false,
      completionStatus: 100
    }
  ];

  const paymentLinks = [
    {
      id: 'PL001',
      title: 'ওয়েব ডিজাইন স্ট্যান্ডার্ড প্যাকেজ',
      price: 15000,
      clicks: 45,
      orders: 8,
      revenue: 120000,
      status: 'active',
      createdAt: '১৫ নভেম্বর, ২০২৪'
    },
    {
      id: 'PL002',
      title: 'লোগো ডিজাইন প্রিমিয়াম',
      price: 5000,
      clicks: 32,
      orders: 12,
      revenue: 60000,
      status: 'active',
      createdAt: '১০ নভেম্বর, ২০২৪'
    },
    {
      id: 'PL003',
      title: 'ব্র্যান্ড আইডেন্টিটি কমপ্লিট',
      price: 25000,
      clicks: 18,
      orders: 3,
      revenue: 75000,
      status: 'paused',
      createdAt: '৫ নভেম্বর, ২০২৪'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'escrow_holding':
        return <Badge className="bg-yellow-100 text-yellow-800">Escrow এ</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">চলমান</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">সম্পন্ন</Badge>;
      case 'disputed':
        return <Badge className="bg-red-100 text-red-800">বিরোধ</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>;
      case 'paused':
        return <Badge className="bg-gray-100 text-gray-800">বিরতি</Badge>;
      default:
        return <Badge variant="secondary">অজানা</Badge>;
    }
  };

  const handleWithdraw = () => {
    if (creatorStats.availableBalance === 0) {
      toast({
        title: "উত্তোলনযোগ্য ব্যালেন্স নেই",
        description: "আপনার কোনো উত্তোলনযোগ্য ব্যালেন্স নেই",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "উত্তোলনের অনুরোধ জমা দেওয়া হয়েছে",
      description: `৳${creatorStats.availableBalance.toLocaleString()} উত্তোলনের অনুরোধ প্রক্রিয়াধীন`,
    });
  };

  const handleCreatePaymentLink = () => {
    toast({
      title: "নতুন পেমেন্ট লিংক",
      description: "পেমেন্ট লিংক জেনারেটর পেজে পুনঃনির্দেশিত হচ্ছেন",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <User className="h-6 w-6" />
          Creator ড্যাশবোর্ড
        </h2>
        <p className="text-muted-foreground">
          আপনার আয়, অর্ডার এবং পারফরম্যান্স ট্র্যাক করুন
        </p>
      </div>

      {/* Creator Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">মোট আয়</p>
                <p className="text-xl font-bold">৳{creatorStats.totalEarnings.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
                <p className="text-xl font-bold">৳{creatorStats.pendingEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">উত্তোলনযোগ্য</p>
                <p className="text-xl font-bold">৳{creatorStats.availableBalance.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">সফলতার হার</p>
                <p className="text-xl font-bold">{creatorStats.conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>দ্রুত অ্যাকশন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={handleCreatePaymentLink} className="h-16 flex-col">
              <Link className="h-6 w-6 mb-2" />
              পেমেন্ট লিংক তৈরি
            </Button>
            <Button onClick={handleWithdraw} variant="outline" className="h-16 flex-col">
              <Wallet className="h-6 w-6 mb-2" />
              টাকা উত্তোলন
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Eye className="h-6 w-6 mb-2" />
              পারফরম্যান্স দেখুন
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              KYC আপডেট
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              সাম্প্রতিক অর্ডার
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{order.service}</h4>
                      <p className="text-sm text-muted-foreground">
                        ক্রেতা: {order.buyer}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        অর্ডার: {order.orderDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">৳{order.amount.toLocaleString()}</p>
                      {getStatusBadge(order.status)}
                      {order.isAdvance && (
                        <Badge variant="outline" className="text-xs mt-1">
                          অ্যাডভান্স
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {order.status === 'in_progress' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>সম্পন্নতা</span>
                        <span>{order.completionStatus}%</span>
                      </div>
                      <Progress value={order.completionStatus} className="h-2" />
                    </div>
                  )}

                  {/* Deadline Info */}
                  {order.daysLeft !== null && order.status !== 'completed' && (
                    <div className={`text-sm p-2 rounded ${
                      order.daysLeft <= 2 ? 'bg-red-50 text-red-800' : 
                      order.daysLeft <= 5 ? 'bg-yellow-50 text-yellow-800' : 
                      'bg-blue-50 text-blue-800'
                    }`}>
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {order.daysLeft > 0 ? `${order.daysLeft} দিন বাকি` : 'আজই ডেডলাইন'}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      বিস্তারিত
                    </Button>
                    {order.status === 'in_progress' && (
                      <Button size="sm">
                        আপডেট করুন
                      </Button>
                    )}
                    {order.status === 'disputed' && (
                      <Button size="sm" variant="destructive">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        বিরোধ দেখুন
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Links Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              পেমেন্ট লিংক পারফরম্যান্স
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentLinks.map((link) => (
                <div key={link.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{link.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        তৈরি: {link.createdAt}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">৳{link.price.toLocaleString()}</p>
                      {getStatusBadge(link.status)}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4 text-center bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="text-sm font-medium">{link.clicks}</p>
                      <p className="text-xs text-muted-foreground">ক্লিক</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{link.orders}</p>
                      <p className="text-xs text-muted-foreground">অর্ডার</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">৳{(link.revenue / 1000)}K</p>
                      <p className="text-xs text-muted-foreground">আয়</p>
                    </div>
                  </div>

                  {/* Conversion Rate */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>রূপান্তর হার</span>
                      <span>{((link.orders / link.clicks) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(link.orders / link.clicks) * 100} className="h-2" />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      বিস্তারিত
                    </Button>
                    <Button size="sm" variant="outline">
                      শেয়ার করুন
                    </Button>
                    {link.status === 'paused' ? (
                      <Button size="sm">সক্রিয় করুন</Button>
                    ) : (
                      <Button size="sm" variant="outline">বিরতি</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Overview */}
      <Card>
        <CardHeader>
          <CardTitle>আয়ের ওভারভিউ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">৳{creatorStats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">মোট আয় (সব সময়)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{creatorStats.totalOrders}</p>
              <p className="text-sm text-muted-foreground">মোট অর্ডার</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">৳{creatorStats.averageOrderValue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">গড় অর্ডার মূল্য</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorDashboard;
