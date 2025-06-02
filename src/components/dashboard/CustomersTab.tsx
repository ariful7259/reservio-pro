
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search,
  Filter,
  Users,
  UserPlus,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  MessageSquare,
  MoreHorizontal
} from 'lucide-react';

interface CustomersTabProps {
  businessType: string | null;
}

const CustomersTab = ({ businessType }: CustomersTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerType, setCustomerType] = useState('all');

  const customers = [
    {
      id: 'CUST-001',
      name: 'আহমেদ আলী',
      email: 'ahmed.ali@email.com',
      phone: '+৮৮০১৭০০০০০০০১',
      location: 'ঢাকা, বাংলাদেশ',
      totalOrders: 8,
      totalSpent: '৳১২,৫০০',
      lastOrder: '২৮ এপ্রিল, ২০২৫',
      status: 'active',
      rating: 4.8,
      joinDate: 'জানুয়ারি ২০২৫',
      segment: 'premium'
    },
    {
      id: 'CUST-002',
      name: 'ফাতিমা খাতুন',
      email: 'fatima.khatun@email.com',
      phone: '+৮৮০১৮০০০০০০০২',
      location: 'চট্টগ্রাম, বাংলাদেশ',
      totalOrders: 3,
      totalSpent: '৳৪,২০০',
      lastOrder: '২৫ এপ্রিল, ২০২৫',
      status: 'active',
      rating: 4.6,
      joinDate: 'মার্চ ২০২৫',
      segment: 'regular'
    },
    {
      id: 'CUST-003',
      name: 'রহিম উদ্দিন',
      email: 'rahim.uddin@email.com',
      phone: '+৮৮০১৯০০০০০০০৩',
      location: 'সিলেট, বাংলাদেশ',
      totalOrders: 1,
      totalSpent: '৳১,৮০০',
      lastOrder: '১৫ এপ্রিল, ২০২৫',
      status: 'inactive',
      rating: 4.2,
      joinDate: 'এপ্রিল ২০২৫',
      segment: 'new'
    }
  ];

  const customerStats = {
    total: 145,
    new: 23,
    active: 89,
    returning: 67,
    avgOrderValue: '৳২,১৫০',
    retentionRate: 73.2
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'premium':
        return 'bg-purple-100 text-purple-800';
      case 'regular':
        return 'bg-blue-100 text-blue-800';
      case 'new':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentText = (segment: string) => {
    switch (segment) {
      case 'premium':
        return 'প্রিমিয়াম';
      case 'regular':
        return 'নিয়মিত';
      case 'new':
        return 'নতুন';
      default:
        return segment;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'সক্রিয়';
      case 'inactive':
        return 'নিষ্ক্রিয়';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">গ্রাহক ব্যবস্থাপনা</h2>
          <p className="text-muted-foreground">আপনার সকল গ্রাহকদের তথ্য এবং ক্রয়ের ইতিহাস</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            ফিল্টার
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            নতুন গ্রাহক
          </Button>
        </div>
      </div>

      {/* Customer stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{customerStats.total}</p>
              <p className="text-xs text-muted-foreground">মোট গ্রাহক</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <UserPlus className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">{customerStats.new}</p>
              <p className="text-xs text-muted-foreground">নতুন গ্রাহক</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-emerald-500" />
              <p className="text-2xl font-bold">{customerStats.active}</p>
              <p className="text-xs text-muted-foreground">সক্রিয় গ্রাহক</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Star className="h-6 w-6 mx-auto mb-2 text-amber-500" />
              <p className="text-2xl font-bold">{customerStats.returning}</p>
              <p className="text-xs text-muted-foreground">ফিরে আসা গ্রাহক</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-500" />
              <p className="text-lg font-bold">{customerStats.avgOrderValue}</p>
              <p className="text-xs text-muted-foreground">গড় অর্ডার মূল্য</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-indigo-500" />
              <p className="text-lg font-bold">{customerStats.retentionRate}%</p>
              <p className="text-xs text-muted-foreground">রিটেনশন রেট</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="গ্রাহকের নাম, ইমেইল বা ফোন খুঁজুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={customerType} onValueChange={setCustomerType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="গ্রাহকের ধরন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব গ্রাহক</SelectItem>
                <SelectItem value="premium">প্রিমিয়াম</SelectItem>
                <SelectItem value="regular">নিয়মিত</SelectItem>
                <SelectItem value="new">নতুন</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer list */}
      <Card>
        <CardHeader>
          <CardTitle>গ্রাহক তালিকা</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {customer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="font-semibold">{customer.name}</h3>
                      <div className="flex gap-2">
                        <Badge className={getSegmentColor(customer.segment)}>
                          {getSegmentText(customer.segment)}
                        </Badge>
                        <Badge className={getStatusColor(customer.status)}>
                          {getStatusText(customer.status)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{customer.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{customer.rating}</span>
                      <span className="text-sm text-muted-foreground">রেটিং</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4 mt-4 lg:mt-0">
                  <div className="text-right space-y-1">
                    <p className="text-lg font-bold text-primary">{customer.totalSpent}</p>
                    <p className="text-sm text-muted-foreground">{customer.totalOrders} অর্ডার</p>
                    <p className="text-xs text-muted-foreground">শেষ অর্ডার: {customer.lastOrder}</p>
                    <p className="text-xs text-muted-foreground">যোগদান: {customer.joinDate}</p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
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

      {/* Customer insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>গ্রাহক বিভাগ</CardTitle>
            <CardDescription>বিভিন্ন ধরনের গ্রাহকের পরিসংখ্যান</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">প্রিমিয়াম গ্রাহক</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-sm font-bold">৩৫%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">নিয়মিত গ্রাহক</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <span className="text-sm font-bold">৫০%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">নতুন গ্রাহক</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-bold">১৫%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>গ্রাহক কার্যকলাপ</CardTitle>
            <CardDescription>গত ৩০ দিনের গ্রাহক কার্যকলাপ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-700">নতুন নিবন্ধন</p>
                  <p className="text-sm text-green-600">এই মাসে ২৩ জন</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-700">রিপিট কাস্টমার</p>
                  <p className="text-sm text-blue-600">৬৭ জন ফিরে এসেছেন</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div>
                  <p className="font-medium text-amber-700">গড় রিভিউ</p>
                  <p className="text-sm text-amber-600">৪.৬ স্টার রেটিং</p>
                </div>
                <Star className="h-8 w-8 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomersTab;
