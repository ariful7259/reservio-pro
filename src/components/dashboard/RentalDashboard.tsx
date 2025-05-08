
import React, { useState } from 'react';
import { 
  Building, 
  Calendar, 
  CircleDollarSign, 
  Clock, 
  Home, 
  Percent, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown,
  Filter,
  Map,
  Settings,
  HelpCircle,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const RentalDashboard = () => {
  const [dateRange, setDateRange] = useState('this-month');
  
  // Mock rental data
  const rentalStats = {
    'this-month': {
      totalRevenue: '৳৪৫,৮০০',
      totalBookings: 32,
      properties: 15,
      occupancyRate: 75,
      growth: 15.3,
      activeRentals: 24
    },
    'last-month': {
      totalRevenue: '৳৩৯,৬৫০',
      totalBookings: 28,
      properties: 15,
      occupancyRate: 68,
      growth: 12.1,
      activeRentals: 22
    },
    'this-year': {
      totalRevenue: '৳২৩৫,৭৮০',
      totalBookings: 185,
      properties: 15,
      occupancyRate: 72,
      growth: 24.7,
      activeRentals: 24
    }
  };
  
  const currentStats = rentalStats[dateRange as keyof typeof rentalStats];
  
  // Mock revenue data for charts
  const revenueData = [
    { name: 'জানু', revenue: 3000 },
    { name: 'ফেব্রু', revenue: 3500 },
    { name: 'মার্চ', revenue: 4200 },
    { name: 'এপ্রিল', revenue: 4800 },
    { name: 'মে', revenue: 5200 },
    { name: 'জুন', revenue: 4500 },
    { name: 'জুলাই', revenue: 4000 },
  ];
  
  // Property type distribution data
  const propertyTypeData = [
    { name: 'আবাসিক', value: 40 },
    { name: 'বাণিজ্যিক', value: 25 },
    { name: 'অফিস', value: 20 },
    { name: 'ওয়্যারহাউস', value: 15 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Mock property list
  const topProperties = [
    { name: 'গুলশান লেক ভিউ অ্যাপার্টমেন্ট', revenue: 12800, occupancy: 92, change: 8 },
    { name: 'বনানী এক্সিকিউটিভ সুইট', revenue: 10500, occupancy: 85, change: 5 },
    { name: 'উত্তরা রেসিডেন্স', revenue: 8900, occupancy: 78, change: -3 },
    { name: 'বসুন্ধরা বিজনেস সেন্টার', revenue: 7800, occupancy: 81, change: 12 },
    { name: 'মিরপুর ফ্যামিলি এপার্টমেন্ট', revenue: 6500, occupancy: 74, change: -2 },
  ];
  
  // Mock recent bookings
  const recentBookings = [
    { id: "BK-001", customer: "রহিম হোসেন", property: "গুলশান লেক ভিউ", amount: "৳15,000", checkIn: "৫ জুন", checkOut: "১০ জুন", status: "কনফার্মড" },
    { id: "BK-002", customer: "ফাতেমা বেগম", property: "বনানী এক্সিকিউটিভ", amount: "৳8,500", checkIn: "৭ জুন", checkOut: "১২ জুন", status: "পেন্ডিং" },
    { id: "BK-003", customer: "করিম আলী", property: "উত্তরা রেসিডেন্স", amount: "৳12,000", checkIn: "৮ জুন", checkOut: "১৫ জুন", status: "কনফার্মড" },
    { id: "BK-004", customer: "আমিনা খাতুন", property: "মিরপুর অ্যাপার্টমেন্ট", amount: "৳6,500", checkIn: "১০ জুন", checkOut: "১৫ জুন", status: "ক্যানসেলড" },
  ];
  
  return (
    <div className="space-y-6">
      {/* Dashboard header with title and date range selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold flex items-center">
            <Building className="h-6 w-6 text-emerald-600 mr-2" />
            রেন্টাল ড্যাশবোর্ড
          </h2>
          <p className="text-muted-foreground">আপনার প্রপার্টি ব্যবসার বিস্তারিত রিপোর্ট</p>
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
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-emerald-600" />
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
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">অকুপেন্সি রেট</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.occupancyRate}%</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.5)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Percent className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">প্রপার্টি সংখ্যা</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.properties}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>{currentStats.activeRentals} একটিভ রেন্টাল</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Home className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">
            <Eye className="h-4 w-4 mr-2" />
            ওভারভিউ
          </TabsTrigger>
          <TabsTrigger value="properties">
            <Home className="h-4 w-4 mr-2" />
            প্রপার্টি
          </TabsTrigger>
          <TabsTrigger value="bookings">
            <Calendar className="h-4 w-4 mr-2" />
            বুকিং
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
                      <Bar dataKey="revenue" name="রেভেনিউ" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>প্রপার্টি টাইপ বিতরণ</CardTitle>
                <CardDescription>ধরণ অনুসারে প্রপার্টি সংখ্যা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={propertyTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {propertyTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'হার']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {propertyTypeData.map((property, index) => (
                    <div key={property.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{property.name}</span>
                      </div>
                      <span className="font-medium">{property.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>টপ প্রপার্টি</CardTitle>
                <CardDescription>সর্বোচ্চ আয় সৃষ্টিকারী প্রপার্টি</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProperties.map((property, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-5">{idx + 1}.</span>
                        <span>{property.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">৳{property.revenue.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-emerald-600">{property.occupancy}% অকুপেন্সি</span>
                          <span className={`text-xs flex items-center ${
                            property.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {property.change > 0 ? 
                              <ArrowUp className="h-3 w-3 mr-1" /> : 
                              <ArrowDown className="h-3 w-3 mr-1" />
                            }
                            {Math.abs(property.change)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>সাম্প্রতিক বুকিং</CardTitle>
                <CardDescription>সর্বশেষ বুকিংসমূহ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{booking.property}</p>
                        <p className="text-xs text-muted-foreground">{booking.customer}</p>
                        <p className="text-xs text-muted-foreground">{booking.checkIn} - {booking.checkOut}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={
                          booking.status === "কনফার্মড" ? "bg-green-100 text-green-800 border-green-200" :
                          booking.status === "পেন্ডিং" ? "bg-amber-100 text-amber-800 border-amber-200" :
                          "bg-red-100 text-red-800 border-red-200"
                        }>
                          {booking.status}
                        </Badge>
                        <p className="font-medium mt-1">{booking.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>মেইন্টেন্যান্স এবং পরিষেবা</CardTitle>
              <CardDescription>প্রপার্টির রক্ষণাবেক্ষণ এবং পরিষেবা বিবরণ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">কমপ্লিট সার্ভিস</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">৮টি প্রপার্টি সম্পূর্ণ মেইন্টেন্যান্স সম্পন্ন</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    <h3 className="font-medium">পেন্ডিং সার্ভিস</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">৫টি প্রপার্টি এখনো সার্ভিসিং এ আছে</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">আগামী সার্ভিস</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">২টি প্রপার্টির সার্ভিস আগামী সপ্তাহে শিডিউলড</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Properties Tab Content */}
        <TabsContent value="properties">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                ফিল্টার
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Map className="h-4 w-4" />
                ম্যাপ ভিউ
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                সেটিংস
              </Button>
            </div>
            <div>
              <Button className="gap-2">
                <Home className="h-4 w-4" />
                নতুন প্রপার্টি যোগ করুন
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, idx) => (
              <Card key={idx} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <Badge className="absolute top-2 right-2 bg-emerald-100 text-emerald-800 border-0">
                    ভাড়া দেওয়া হয়নি
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">গুলশান-২ লেক ভিউ অ্যাপার্টমেন্ট #{idx + 1}</h3>
                  <p className="text-sm text-muted-foreground mb-2">বাসা #৫, রোড #১০৩, গুলশান-২</p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-emerald-600">৳১৫,০০০/মাস</p>
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                      ভাড়া দেওয়া হয়নি
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="flex-1">দেখুন</Button>
                  <Button size="sm" className="flex-1">এডিট করুন</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline">আরও প্রপার্টি দেখুন</Button>
          </div>
        </TabsContent>
        
        {/* Bookings Tab Content */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক বুকিং</CardTitle>
              <CardDescription>সর্বশেষ বুকিং এবং স্ট্যাটাস</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(8)].map((_, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b last:border-0">
                    <div className="flex items-start gap-3 mb-2 md:mb-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">বুকিং #{1000 + idx}</p>
                        <p className="text-sm text-muted-foreground">গ্রাহক: আব্দুর রহিম</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>চেক-ইন: জুন ১০, চেক-আউট: জুন ১৫</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                      <Badge variant={idx % 3 === 0 ? "default" : (idx % 3 === 1 ? "outline" : "secondary")}>
                        {idx % 3 === 0 ? "কনফার্মড" : (idx % 3 === 1 ? "পেন্ডিং" : "কমপ্লিটেড")}
                      </Badge>
                      <p className="font-medium">৳{(8000 + idx * 1000).toLocaleString()}</p>
                      <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                        <Eye className="h-4 w-4 mr-2" />
                        বিস্তারিত
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                সব বুকিং দেখুন
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RentalDashboard;
