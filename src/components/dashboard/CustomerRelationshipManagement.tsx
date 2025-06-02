
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Star, 
  MessageSquare, 
  Phone, 
  Mail, 
  Gift,
  TrendingUp,
  Heart,
  ShoppingBag,
  Calendar
} from 'lucide-react';

const CustomerRelationshipManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // গ্রাহক ডেটা
  const topCustomers = [
    {
      id: 1,
      name: 'আহমেদ আলী',
      email: 'ahmed.ali@email.com',
      totalSpent: '৳২৫,৮০০',
      orders: 12,
      lastOrder: '২ দিন আগে',
      segment: 'VIP',
      rating: 4.9
    },
    {
      id: 2,
      name: 'ফাতিমা খাতুন',
      email: 'fatima.k@email.com',
      totalSpent: '৳১৮,৫০০',
      orders: 8,
      lastOrder: '১ সপ্তাহ আগে',
      segment: 'Premium',
      rating: 4.7
    },
    {
      id: 3,
      name: 'রহিম উদ্দিন',
      email: 'rahim.uddin@email.com',
      totalSpent: '৳১২,২০০',
      orders: 6,
      lastOrder: '৩ দিন আগে',
      segment: 'Regular',
      rating: 4.8
    },
    {
      id: 4,
      name: 'সাবিনা আক্তার',
      email: 'sabina.a@email.com',
      totalSpent: '৳৯,৮০০',
      orders: 5,
      lastOrder: '৫ দিন আগে',
      segment: 'Regular',
      rating: 4.6
    }
  ];

  // সাম্প্রতিক ইন্টারঅ্যাকশন
  const recentInteractions = [
    {
      customer: 'আহমেদ আলী',
      type: 'support',
      message: 'পণ্য ডেলিভারি সম্পর্কে জিজ্ঞাসা',
      time: '২ ঘন্টা আগে',
      status: 'resolved'
    },
    {
      customer: 'ফাতিমা খাতুন',
      type: 'review',
      message: '৫ স্টার রিভিউ দিয়েছেন',
      time: '৪ ঘন্টা আগে',
      status: 'completed'
    },
    {
      customer: 'রহিম উদ্দিন',
      type: 'inquiry',
      message: 'নতুন পণ্য সম্পর্কে জানতে চান',
      time: '১ দিন আগে',
      status: 'pending'
    }
  ];

  // লয়ালটি প্রোগ্রাম
  const loyaltyPrograms = [
    {
      name: 'গোল্ড মেম্বারশিপ',
      members: 45,
      benefits: '১৫% ছাড়, ফ্রি শিপিং',
      revenue: '৳৮৫,০০০'
    },
    {
      name: 'সিলভার মেম্বারশিপ',
      members: 128,
      benefits: '১০% ছাড়, প্রাইওরিটি সাপোর্ট',
      revenue: '৳৪২,৫০০'
    },
    {
      name: 'রেফারেল রিওয়ার্ড',
      members: 89,
      benefits: 'প্রতি রেফারেলে ৫০০ টাকা',
      revenue: '৳২৮,০০০'
    }
  ];

  const getSegmentColor = (segment: string) => {
    switch(segment) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'Premium':
        return 'bg-blue-100 text-blue-800';
      case 'Regular':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInteractionIcon = (type: string) => {
    switch(type) {
      case 'support':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'review':
        return <Star className="h-4 w-4 text-yellow-500" />;
      case 'inquiry':
        return <Phone className="h-4 w-4 text-green-500" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          কাস্টমার রিলেশনশিপ ম্যানেজমেন্ট
        </CardTitle>
        <CardDescription>গ্রাহকদের সম্পর্কে বিস্তারিত তথ্য দেখুন ও পরিচালনা করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">সংক্ষিপ্ত</TabsTrigger>
            <TabsTrigger value="customers">গ্রাহক</TabsTrigger>
            <TabsTrigger value="interactions">ইন্টারঅ্যাকশন</TabsTrigger>
            <TabsTrigger value="loyalty">লয়ালটি</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">১৪৫</p>
                <p className="text-sm text-blue-600">মোট গ্রাহক</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">৮৭%</p>
                <p className="text-sm text-green-600">সন্তুষ্টির হার</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-600">৭৩%</p>
                <p className="text-sm text-purple-600">রিটেনশন রেট</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">৳২,১৫০</p>
                <p className="text-sm text-orange-600">গড় অর্ডার ভ্যালু</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">শীর্ষ গ্রাহক</h3>
              <Button size="sm">
                <Users className="h-4 w-4 mr-1" />
                সব গ্রাহক দেখুন
              </Button>
            </div>
            
            <div className="space-y-3">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {customer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{customer.name}</p>
                        <Badge className={getSegmentColor(customer.segment)}>
                          {customer.segment}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{customer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{customer.totalSpent}</p>
                    <p className="text-sm text-muted-foreground">{customer.orders} অর্ডার</p>
                    <p className="text-xs text-muted-foreground">শেষ অর্ডার: {customer.lastOrder}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">সাম্প্রতিক ইন্টারঅ্যাকশন</h3>
              <Button size="sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                নতুন মেসেজ
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentInteractions.map((interaction, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getInteractionIcon(interaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{interaction.customer}</p>
                      <Badge variant="outline" className="text-xs">
                        {interaction.type === 'support' ? 'সাপোর্ট' :
                         interaction.type === 'review' ? 'রিভিউ' : 'জিজ্ঞাসা'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{interaction.message}</p>
                    <p className="text-xs text-muted-foreground">{interaction.time}</p>
                  </div>
                  <Badge className={
                    interaction.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    interaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {interaction.status === 'resolved' ? 'সমাধান' :
                     interaction.status === 'pending' ? 'অপেক্ষমাণ' : 'সম্পূর্ণ'}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">লয়ালটি প্রোগ্রাম</h3>
              <Button size="sm">
                <Gift className="h-4 w-4 mr-1" />
                নতুন প্রোগ্রাম
              </Button>
            </div>
            
            <div className="space-y-3">
              {loyaltyPrograms.map((program, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{program.name}</h4>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">রেভিনিউ</p>
                      <p className="font-bold text-primary">{program.revenue}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">সদস্য সংখ্যা</p>
                      <p className="text-lg font-bold">{program.members}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">সুবিধা</p>
                      <p className="text-sm">{program.benefits}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerRelationshipManagement;
