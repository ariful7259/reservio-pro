
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CreditCard,
  Smartphone,
  CalendarDays,
  Download,
  Filter
} from 'lucide-react';

const PaymentAnalytics = () => {
  const [dateRange, setDateRange] = useState('this-month');
  const [paymentMethod, setPaymentMethod] = useState('all');

  // Analytics data
  const analyticsData = {
    overview: [
      {
        title: 'মোট পেমেন্ট',
        value: '৳২,৪৮,৫০০',
        change: '+১৮%',
        trend: 'up',
        icon: <DollarSign className="h-5 w-5" />
      },
      {
        title: 'গড় ট্রানজেকশন',
        value: '৳৩,২৫০',
        change: '+৫%',
        trend: 'up',
        icon: <BarChart3 className="h-5 w-5" />
      },
      {
        title: 'সফলতার হার',
        value: '৯৪.৫%',
        change: '+২%',
        trend: 'up',
        icon: <TrendingUp className="h-5 w-5" />
      },
      {
        title: 'ইউনিক গ্রাহক',
        value: '১৮৯',
        change: '+১২%',
        trend: 'up',
        icon: <Users className="h-5 w-5" />
      }
    ],
    paymentMethods: [
      { name: 'বিকাশ', amount: '৳৯৮,৫০০', percentage: 40, transactions: 142, color: 'bg-pink-500' },
      { name: 'নগদ', amount: '৳৭৫,২০০', percentage: 30, transactions: 98, color: 'bg-green-500' },
      { name: 'কার্ড', amount: '৳৪৯,৮০০', percentage: 20, transactions: 56, color: 'bg-blue-500' },
      { name: 'রকেট', amount: '৳২৫,০০০', percentage: 10, transactions: 28, color: 'bg-purple-500' }
    ],
    hourlyData: [
      { hour: '৯ AM', amount: 15000 },
      { hour: '১০ AM', amount: 25000 },
      { hour: '১১ AM', amount: 35000 },
      { hour: '১২ PM', amount: 45000 },
      { hour: '১ PM', amount: 38000 },
      { hour: '২ PM', amount: 42000 },
      { hour: '৩ PM', amount: 48000 },
      { hour: '৪ PM', amount: 52000 },
      { hour: '৫ PM', amount: 46000 },
      { hour: '৬ PM', amount: 35000 },
      { hour: '৭ PM', amount: 28000 },
      { hour: '৮ PM', amount: 20000 }
    ],
    topCustomers: [
      { name: 'আহমেদ হোসেন', amount: '৳১৫,৫০০', transactions: 8 },
      { name: 'ফাতেমা খাতুন', amount: '৳১২,৮০০', transactions: 6 },
      { name: 'করিম উদ্দিন', amount: '৳১০,২০০', transactions: 5 },
      { name: 'রাশিদা বেগম', amount: '৳৮,৭৫০', transactions: 4 },
      { name: 'নাসির আহমাদ', amount: '৳৭,৩০০', transactions: 3 }
    ]
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            পেমেন্ট এনালিটিক্স
          </h2>
          <p className="text-muted-foreground">
            আপনার পেমেন্ট পারফরমেন্স বিশ্লেষণ করুন
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="সময়কাল" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">এই মাস</SelectItem>
              <SelectItem value="last-month">গত মাস</SelectItem>
              <SelectItem value="this-year">এই বছর</SelectItem>
              <SelectItem value="last-year">গত বছর</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="পেমেন্ট মেথড" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব মেথড</SelectItem>
              <SelectItem value="bkash">বিকাশ</SelectItem>
              <SelectItem value="nagad">নগদ</SelectItem>
              <SelectItem value="card">কার্ড</SelectItem>
              <SelectItem value="rocket">রকেট</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.overview.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {getTrendIcon(stat.trend)}
                    <span className={`text-sm ml-1 ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} গত মাস থেকে
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="methods" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methods">পেমেন্ট মেথড</TabsTrigger>
          <TabsTrigger value="hourly">ঘন্টাভিত্তিক</TabsTrigger>
          <TabsTrigger value="customers">গ্রাহক</TabsTrigger>
          <TabsTrigger value="trends">ট্রেন্ড</TabsTrigger>
        </TabsList>

        {/* Payment Methods Analysis */}
        <TabsContent value="methods">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট মেথড বিতরণ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.paymentMethods.map((method, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{method.name}</span>
                        <span className="font-bold">{method.amount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${method.color} h-2 rounded-full`}
                            style={{ width: `${method.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {method.percentage}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {method.transactions} ট্রানজেকশন
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট মেথড পারফরমেন্স</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${method.color}`}></div>
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            গড়: ৳{Math.round(parseInt(method.amount.replace(/[৳,]/g, '')) / method.transactions).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{method.transactions}</p>
                        <p className="text-sm text-muted-foreground">ট্রানজেকশন</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Hourly Analysis */}
        <TabsContent value="hourly">
          <Card>
            <CardHeader>
              <CardTitle>ঘন্টাভিত্তিক পেমেন্ট বিশ্লেষণ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {analyticsData.hourlyData.map((data, index) => (
                    <div key={index} className="text-center p-3 border rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">{data.hour}</p>
                      <p className="text-lg font-bold">৳{(data.amount / 1000).toFixed(0)}k</p>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                        <div 
                          className="bg-primary h-1 rounded-full"
                          style={{ width: `${(data.amount / 52000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">পিক আওয়ার বিশ্লেষণ</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">সর্বোচ্চ পেমেন্ট সময়:</p>
                      <p className="font-bold">৪ PM - ৫ PM</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">সর্বনিম্ন পেমেন্ট সময়:</p>
                      <p className="font-bold">৯ AM - ১০ AM</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">গড় পেমেন্ট/ঘন্টা:</p>
                      <p className="font-bold">৳৩৬,৪০০</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customer Analysis */}
        <TabsContent value="customers">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>টপ গ্রাহক</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.transactions} ট্রানজেকশন
                          </p>
                        </div>
                      </div>
                      <p className="font-bold">{customer.amount}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>গ্রাহক পরিসংখ্যান</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">১৮৯</p>
                      <p className="text-sm text-blue-600">মোট গ্রাহক</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">৭৮</p>
                      <p className="text-sm text-green-600">নতুন গ্রাহক</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">৬৫%</p>
                      <p className="text-sm text-purple-600">রিটার্ন রেট</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">৳১,৩১৫</p>
                      <p className="text-sm text-orange-600">গড় খরচ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Analysis */}
        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>সাপ্তাহিক ট্রেন্ড</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'].map((day, index) => {
                    const amounts = [35000, 42000, 38000, 45000, 48000, 52000, 28000];
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium w-24">{day}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(amounts[index] / 52000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="font-bold w-20 text-right">৳{amounts[index].toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>পেমেন্ট ট্রেন্ড ইনসাইট</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">ইতিবাচক ট্রেন্ড</h4>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• মোবাইল পেমেন্ট ১৮% বৃদ্ধি</li>
                      <li>• গড় ট্রানজেকশন ৫% বৃদ্ধি</li>
                      <li>• নতুন গ্রাহক ১২% বৃদ্ধি</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">সুপারিশ</h4>
                    </div>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• শুক্রবার প্রমোশন অফার দিন</li>
                      <li>• দুপুরে বিশেষ ছাড় দিন</li>
                      <li>• কার্ড পেমেন্ট বাড়ানোর চেষ্টা করুন</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentAnalytics;
