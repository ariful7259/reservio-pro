
import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  CircleDollarSign, 
  Clock, 
  Users, 
  Star, 
  TrendingUp, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown,
  Filter,
  Settings,
  Eye,
  Tag,
  Bell,
  XCircle,
  Clock4
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ServicesDashboard = () => {
  const [dateRange, setDateRange] = useState('this-month');
  
  // Mock service data
  const serviceStats = {
    'this-month': {
      totalRevenue: '৳৩৮,৭৫০',
      totalBookings: 45,
      services: 12,
      completionRate: 88,
      growth: 14.2,
      averageRating: 4.7,
      pendingRequests: 8
    },
    'last-month': {
      totalRevenue: '৳৩৪,২০০',
      totalBookings: 42,
      services: 12,
      completionRate: 85,
      growth: 10.5,
      averageRating: 4.6,
      pendingRequests: 5
    },
    'this-year': {
      totalRevenue: '৳১৯৮,৪৫০',
      totalBookings: 256,
      services: 12,
      completionRate: 87,
      growth: 25.3,
      averageRating: 4.7,
      pendingRequests: 8
    }
  };
  
  const currentStats = serviceStats[dateRange as keyof typeof serviceStats];
  
  // Mock revenue data for charts
  const revenueData = [
    { name: 'জানু', revenue: 28000 },
    { name: 'ফেব্রু', revenue: 32000 },
    { name: 'মার্চ', revenue: 35000 },
    { name: 'এপ্রিল', revenue: 33000 },
    { name: 'মে', revenue: 38000 },
    { name: 'জুন', revenue: 42000 },
    { name: 'জুলাই', revenue: 39000 },
  ];
  
  // Service category distribution data
  const serviceCategoryData = [
    { name: 'হোম সার্ভিস', value: 35 },
    { name: 'প্রফেশনাল', value: 30 },
    { name: 'টেকনিক্যাল', value: 20 },
    { name: 'কন্সাল্টিং', value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Mock top services
  const topServices = [
    { name: 'প্লাম্বিং সার্ভিসেস', revenue: 8500, bookings: 12, rating: 4.8, change: 8 },
    { name: 'ইলেকট্রিক্যাল রিপেয়ার', revenue: 7200, bookings: 10, rating: 4.7, change: 5 },
    { name: 'হোম ক্লিনিং', revenue: 6800, bookings: 9, rating: 4.9, change: 12 },
    { name: 'এসি সার্ভিসিং', revenue: 5900, bookings: 8, rating: 4.5, change: -3 },
    { name: 'কার্পেন্ট্রি ওয়ার্কস', revenue: 4800, bookings: 6, rating: 4.6, change: 4 },
  ];
  
  // Mock recent bookings
  const recentBookings = [
    { id: "SRV-001", customer: "রহিম হোসেন", service: "প্লাম্বিং সার্ভিস", amount: "৳2,500", date: "আজ", time: "২:০০ PM", status: "পেন্ডিং" },
    { id: "SRV-002", customer: "ফাতেমা বেগম", service: "হোম ক্লিনিং", amount: "৳3,200", date: "আজ", time: "৪:৩০ PM", status: "কনফার্মড" },
    { id: "SRV-003", customer: "করিম আলী", service: "এসি সার্ভিসিং", amount: "৳2,800", date: "আগামীকাল", time: "১১:০০ AM", status: "কনফার্মড" },
    { id: "SRV-004", customer: "আমিনা খাতুন", service: "ইলেকট্রিক্যাল রিপেয়ার", amount: "৳1,800", date: "আগামীকাল", time: "৩:০০ PM", status: "রিকোয়েস্টেড" },
  ];

  // Customer feedback data
  const customerFeedback = [
    { name: "আনিসুর রহমান", service: "হোম ক্লিনিং", rating: 5, comment: "খুব দক্ষ সার্ভিস প্রোভাইডার। সময়মতো উপস্থিত হয়েছেন এবং কাজটি নিখুঁতভাবে সম্পন্ন করেছেন।", date: "২ দিন আগে" },
    { name: "সাদিয়া আক্তার", service: "প্লাম্বিং সার্ভিস", rating: 4, comment: "সার্ভিসটি ভালো ছিল, কিন্তু সময়মতো আসেননি।", date: "৩ দিন আগে" },
    { name: "মাহফুজ হাসান", service: "এসি সার্ভিসিং", rating: 5, comment: "অসাধারণ সার্ভিস! আমার এসি এখন নতুনের মতো কাজ করছে।", date: "৪ দিন আগে" },
  ];
  
  return (
    <div className="space-y-6">
      {/* Dashboard header with title and date range selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold flex items-center">
            <Wrench className="h-6 w-6 text-amber-600 mr-2" />
            সার্ভিস ড্যাশবোর্ড
          </h2>
          <p className="text-muted-foreground">আপনার সার্ভিস ব্যবসার বিস্তারিত রিপোর্ট</p>
        </div>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="সময়কাল নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this-month">এই মাস</SelectItem>
            <SelectItem value="last-month">গত মাস</SelectItem>
            <SelectItem value="this-year">এই বছর</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.totalRevenue}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{currentStats.growth}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট বুকিং</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.totalBookings}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.8)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">কমপ্লিশন রেট</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.completionRate}%</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.3)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">গড় রেটিং</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.averageRating}/5</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <span className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="overview">
            <Eye className="h-4 w-4 mr-2" />
            ওভারভিউ
          </TabsTrigger>
          <TabsTrigger value="services">
            <Wrench className="h-4 w-4 mr-2" />
            সার্ভিস
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="h-4 w-4 mr-2" />
            বুকিং
          </TabsTrigger>
          <TabsTrigger value="feedback">
            <Star className="h-4 w-4 mr-2" />
            ফিডব্যাক
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>মাসিক রেভেনিউ</CardTitle>
                <CardDescription>সময় অনুযায়ী আয়ের পরিবর্তন</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`৳${value}`, 'রেভেনিউ']} />
                      <Bar dataKey="revenue" name="রেভেনিউ" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>সার্ভিস বিতরণ</CardTitle>
                <CardDescription>ক্যাটাগরি অনুসারে সার্ভিস সংখ্যা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serviceCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'হার']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {serviceCategoryData.map((service, index) => (
                    <div key={service.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{service.name}</span>
                      </div>
                      <span className="font-medium">{service.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>আজকের অ্যাপয়েন্টমেন্ট</CardTitle>
                  <Badge>{currentStats.pendingRequests}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.slice(0, 3).map((booking, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-xs text-muted-foreground">{booking.customer}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{booking.date}, {booking.time}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={
                          booking.status === "কনফার্মড" ? "bg-green-100 text-green-800 border-green-200" :
                          booking.status === "পেন্ডিং" ? "bg-amber-100 text-amber-800 border-amber-200" :
                          "bg-blue-100 text-blue-800 border-blue-200"
                        }>
                          {booking.status}
                        </Badge>
                        <p className="font-medium mt-1">{booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    সকল অ্যাপয়েন্টমেন্ট দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>টপ সার্ভিস</CardTitle>
                <CardDescription>সর্বোচ্চ আয় সৃষ্টিকারী সার্ভিস</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topServices.slice(0, 3).map((service, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-5">{idx + 1}.</span>
                        <span>{service.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">৳{service.revenue.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <span className="text-muted-foreground">{service.bookings} বুকিং</span>
                          <span className="flex items-center text-amber-500">
                            <Star className="h-3 w-3 fill-amber-500 mr-1" />
                            {service.rating}
                          </span>
                          <span className={`flex items-center ${
                            service.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {service.change > 0 ? 
                              <ArrowUp className="h-3 w-3 mr-1" /> : 
                              <ArrowDown className="h-3 w-3 mr-1" />
                            }
                            {Math.abs(service.change)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    সকল সার্ভিস পারফরম্যান্স দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>সার্ভিস স্ট্যাটিসটিক্স</CardTitle>
              <CardDescription>সার্ভিস সম্পর্কিত পরিসংখ্যান</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">সম্পন্ন সার্ভিস</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">এই মাসে {currentStats.totalBookings - currentStats.pendingRequests}টি সার্ভিস সফলভাবে সম্পন্ন করা হয়েছে</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <h3 className="font-medium">পেন্ডিং সার্ভিস</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">বর্তমানে {currentStats.pendingRequests}টি সার্ভিস রিকোয়েস্ট পেন্ডিং আছে</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <h3 className="font-medium">ক্যান্সেলড সার্ভিস</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">এই মাসে {Math.round(currentStats.totalBookings * 0.05)}টি সার্ভিস রিকোয়েস্ট ক্যান্সেল করা হয়েছে</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Services Tab Content */}
        <TabsContent value="services">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                ফিল্টার
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                সেটিংস
              </Button>
            </div>
            <div>
              <Button className="gap-2">
                <Wrench className="h-4 w-4" />
                নতুন সার্ভিস যোগ করুন
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topServices.map((service, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-xs ml-1">{service.rating}</span>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className="bg-green-100 text-green-800 border-green-200"
                    >
                      এক্টিভ
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">মূল্য :</span>
                      <span className="font-medium">৳{Math.round(service.revenue / service.bookings)} / সার্ভিস</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">এই মাসে বুকিং :</span>
                      <span className="font-medium">{service.bookings}টি</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">মোট আয় :</span>
                      <span className="font-medium">৳{service.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">এডিট করুন</Button>
                    <Button size="sm" className="flex-1">বুকিং দেখুন</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline">আরও সার্ভিস দেখুন</Button>
          </div>
        </TabsContent>
        
        {/* Bookings Tab Content */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>আসন্ন সার্ভিস বুকিং</CardTitle>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="সব স্ট্যাটাস" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                      <SelectItem value="confirmed">কনফার্মড</SelectItem>
                      <SelectItem value="pending">পেন্ডিং</SelectItem>
                      <SelectItem value="completed">কমপ্লিট</SelectItem>
                      <SelectItem value="cancelled">ক্যানসেলড</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    ক্যালেন্ডার
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {recentBookings.concat(recentBookings).map((booking, idx) => (
                <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b last:border-0">
                  <div className="flex items-start gap-3 mb-2 md:mb-0">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Wrench className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">গ্রাহক: {booking.customer}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{booking.date}, {booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <Badge variant="outline" className={
                      booking.status === "কনফার্মড" ? "bg-green-100 text-green-800 border-green-200" :
                      booking.status === "পেন্ডিং" ? "bg-amber-100 text-amber-800 border-amber-200" :
                      booking.status === "রিকোয়েস্টেড" ? "bg-blue-100 text-blue-800 border-blue-200" :
                      "bg-red-100 text-red-800 border-red-200"
                    }>
                      {booking.status}
                    </Badge>
                    <p className="font-medium">{booking.amount}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        অ্যাকসেপ্ট
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-800 hover:bg-red-50">
                        <XCircle className="h-4 w-4 mr-1" />
                        রিজেক্ট
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  সব বুকিং দেখুন
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Feedback Tab Content */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>কাস্টমার ফিডব্যাক</CardTitle>
              <CardDescription>গ্রাহকদের মতামত এবং পর্যালোচনা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {customerFeedback.map((feedback, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{feedback.name}</h3>
                        <p className="text-sm text-muted-foreground">{feedback.service}</p>
                      </div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-right text-muted-foreground mt-1">{feedback.date}</p>
                      </div>
                    </div>
                    <p className="text-sm">{feedback.comment}</p>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">
                        রিপ্লাই
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  সব ফিডব্যাক দেখুন
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>ফিডব্যাক অ্যানালিটিক্স</CardTitle>
                <CardDescription>গ্রাহকদের পর্যালোচনা বিশ্লেষণ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">রেটিং বিতরণ</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-sm">৫ স্টার</span>
                            <div className="flex ml-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm font-medium">65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-sm">৪ স্টার</span>
                            <div className="flex ml-2">
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                              ))}
                              <Star className="h-3 w-3 text-gray-300" />
                            </div>
                          </div>
                          <span className="text-sm font-medium">25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-sm">৩ স্টার</span>
                            <div className="flex ml-2">
                              {[...Array(3)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                              ))}
                              {[...Array(2)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-gray-300" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '8%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-sm">২ স্টার</span>
                            <div className="flex ml-2">
                              {[...Array(2)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                              ))}
                              {[...Array(3)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-gray-300" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm font-medium">2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '2%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <span className="text-sm">১ স্টার</span>
                            <div className="flex ml-2">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {[...Array(4)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-gray-300" />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm font-medium">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">সার্ভিস অনুযায়ী গড় রেটিং</h3>
                    <div className="space-y-4">
                      {topServices.slice(0, 4).map((service, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm truncate">{service.name}</span>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">{service.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < Math.floor(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: `${service.rating/5*100}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default ServicesDashboard;
