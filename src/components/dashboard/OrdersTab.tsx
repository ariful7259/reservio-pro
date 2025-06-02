
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Download,
  Package,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  MoreHorizontal
} from 'lucide-react';

interface OrdersTabProps {
  businessType: string | null;
}

const OrdersTab = ({ businessType }: OrdersTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeOrderTab, setActiveOrderTab] = useState('orders');

  const orders = [
    {
      id: 'ORD-2025-001',
      customer: 'আহমেদ আলী',
      items: ['বিজনেস স্টার্টাপ গাইড', 'মার্কেটিং টেমপ্লেট'],
      amount: '৳২,৫০০',
      status: 'delivered',
      date: '২৮ এপ্রিল, ২০২৫',
      type: 'digital'
    },
    {
      id: 'ORD-2025-002',
      customer: 'ফাতিমা খাতুন',
      items: ['ওয়েব ডিজাইন কোর্স'],
      amount: '৳৫,৯৯৯',
      status: 'processing',
      date: '২৭ এপ্রিল, ২০২৫',
      type: 'course'
    },
    {
      id: 'ORD-2025-003',
      customer: 'রহিম উদ্দিন',
      items: ['গ্রাফিক্স ডিজাইন প্যাক'],
      amount: '৳১,২০০',
      status: 'pending',
      date: '২৬ এপ্রিল, ২০২৫',
      type: 'digital'
    }
  ];

  const bookings = [
    {
      id: 'BK-2025-001',
      customer: 'সামিরা আক্তার',
      service: 'ওয়েব ডেভেলপমেন্ট কনসালটেশন',
      date: '৩০ এপ্রিল, ২০২৫',
      time: '১০:০০ AM',
      amount: '৳৩,০০০',
      status: 'confirmed',
      duration: '২ ঘন্টা'
    },
    {
      id: 'BK-2025-002',
      customer: 'করিম হোসেন',
      service: 'ডিজিটাল মার্কেটিং পরামর্শ',
      date: '২৯ এপ্রিল, ২০২৫',
      time: '২:০০ PM',
      amount: '৳১,৫০০',
      status: 'pending',
      duration: '১ ঘন্টা'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'processing':
      case 'confirmed':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'ডেলিভারড';
      case 'processing':
        return 'প্রসেসিং';
      case 'pending':
        return 'অপেক্ষমাণ';
      case 'cancelled':
        return 'বাতিল';
      case 'confirmed':
        return 'কনফার্মড';
      case 'completed':
        return 'সম্পূর্ণ';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">অর্ডার ও বুকিং ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">সকল অর্ডার এবং বুকিং একসাথে পরিচালনা করুন</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            এক্সপোর্ট
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            নতুন অর্ডার
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট অর্ডার</p>
                <p className="text-2xl font-bold">১৪২</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">অপেক্ষমাণ</p>
                <p className="text-2xl font-bold">১২</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">সম্পন্ন</p>
                <p className="text-2xl font-bold">১১৮</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <p className="text-2xl font-bold">৳৮৫,৪০০</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="অর্ডার ID বা গ্রাহকের নাম খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="pending">অপেক্ষমাণ</SelectItem>
                <SelectItem value="processing">প্রসেসিং</SelectItem>
                <SelectItem value="delivered">ডেলিভারড</SelectItem>
                <SelectItem value="cancelled">বাতিল</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              ফিল্টার
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders and Bookings Tabs */}
      <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            অর্ডার ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            বুকিং ({bookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 space-y-2 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        <Badge variant="outline" className="w-fit">{order.customer}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>পণ্য: {order.items.join(', ')}</p>
                        <p>তারিখ: {order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                      <div className="text-right">
                        <p className="font-bold text-primary">{order.amount}</p>
                        <Badge className={`${getStatusColor(order.status)} text-xs`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>আসন্ন বুকিং</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 space-y-2 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-medium">{booking.id}</span>
                        <Badge variant="outline" className="w-fit">{booking.customer}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>সার্ভিস: {booking.service}</p>
                        <p>তারিখ: {booking.date} at {booking.time}</p>
                        <p>সময়কাল: {booking.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                      <div className="text-right">
                        <p className="font-bold text-primary">{booking.amount}</p>
                        <Badge className={`${getStatusColor(booking.status)} text-xs`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(booking.status)}
                            {getStatusText(booking.status)}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersTab;
