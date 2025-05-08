
import React, { useState } from 'react';
import { 
  Pencil,
  CircleDollarSign, 
  Eye, 
  TrendingUp, 
  Star, 
  FileText, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown,
  Filter,
  Settings,
  Video,
  Tag,
  Tablet,
  Users,
  PieChart,
  BarChart as BarChartIcon,
  Share,
  Globe,
  ExternalLink,
  BookOpen,
  Music,
  ImageIcon,
  Coffee,
  Play,
  Download,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as PieChartComponent, Pie, Cell, LineChart, Line } from 'recharts';

const ContentDashboard = () => {
  const [dateRange, setDateRange] = useState('this-month');
  
  // Mock content data
  const contentStats = {
    'this-month': {
      totalRevenue: '৳২৮,৪৫০',
      totalViews: 24850,
      contents: 42,
      avgEngagement: 18.5,
      growth: 22.4,
      subscribers: 450,
      downloads: 2350
    },
    'last-month': {
      totalRevenue: '৳২৩,২০০',
      totalViews: 20200,
      contents: 38,
      avgEngagement: 17.2,
      growth: 18.6,
      subscribers: 420,
      downloads: 2100
    },
    'this-year': {
      totalRevenue: '৳১২৫,৮০০',
      totalViews: 148500,
      contents: 42,
      avgEngagement: 16.8,
      growth: 65.3,
      subscribers: 450,
      downloads: 12500
    }
  };
  
  const currentStats = contentStats[dateRange as keyof typeof contentStats];
  
  // Mock revenue data for charts
  const revenueData = [
    { name: 'জানু', revenue: 15000, views: 12000 },
    { name: 'ফেব্রু', revenue: 18500, views: 14500 },
    { name: 'মার্চ', revenue: 22000, views: 16800 },
    { name: 'এপ্রিল', revenue: 24500, views: 19200 },
    { name: 'মে', revenue: 26800, views: 22000 },
    { name: 'জুন', revenue: 28000, views: 23500 },
    { name: 'জুলাই', revenue: 25000, views: 21000 },
  ];
  
  // Content type distribution data
  const contentTypeData = [
    { name: 'ভিডিও', value: 40 },
    { name: 'ইবুক', value: 25 },
    { name: 'কোর্স', value: 20 },
    { name: 'অডিও', value: 15 },
  ];
  
  const COLORS = ['#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];
  
  // Mock top content
  const topContent = [
    { name: 'ওয়েব ডেভেলপমেন্ট কোর্স', type: 'কোর্স', revenue: 7800, views: 1250, rating: 4.8, change: 8 },
    { name: 'ডিজিটাল মার্কেটিং মাস্টারক্লাস', type: 'ভিডিও', revenue: 6500, views: 3200, rating: 4.7, change: 12 },
    { name: 'আর্টিফিশিয়াল ইন্টেলিজেন্স গাইড', type: 'ইবুক', revenue: 4200, views: 950, rating: 4.6, change: 5 },
    { name: 'পাসিভ ইনকাম স্ট্র্যাটেজি', type: 'অডিও', revenue: 3900, views: 720, rating: 4.5, change: -3 },
    { name: 'স্টক মার্কেট অ্যাডভান্সড কোর্স', type: 'কোর্স', revenue: 5800, views: 1100, rating: 4.9, change: 15 },
  ];
  
  // Mock engagement data
  const engagementData = {
    comments: 845,
    shares: 1250,
    bookmarks: 520,
    downloads: 2350,
    avgViewDuration: '8:45',
    completionRate: 65
  };
  
  // Mock audience demographics
  const audienceDemographics = {
    age: [
      { group: '18-24', percentage: 25 },
      { group: '25-34', percentage: 40 },
      { group: '35-44', percentage: 20 },
      { group: '45-54', percentage: 10 },
      { group: '55+', percentage: 5 }
    ],
    gender: [
      { type: 'পুরুষ', percentage: 65 },
      { type: 'মহিলা', percentage: 33 },
      { type: 'অন্যান্য', percentage: 2 }
    ],
    locations: [
      { location: 'বাংলাদেশ', percentage: 75 },
      { location: 'ভারত', percentage: 10 },
      { location: 'আমেরিকা', percentage: 5 },
      { location: 'যুক্তরাজ্য', percentage: 3 },
      { location: 'অন্যান্য', percentage: 7 }
    ],
    devices: [
      { device: 'মোবাইল', percentage: 65 },
      { device: 'ডেস্কটপ', percentage: 25 },
      { device: 'ট্যাবলেট', percentage: 10 }
    ]
  };
  
  // Content type icons
  const contentIcons = {
    'ভিডিও': <Video className="h-5 w-5" />,
    'ইবুক': <BookOpen className="h-5 w-5" />,
    'কোর্স': <FileText className="h-5 w-5" />,
    'অডিও': <Music className="h-5 w-5" />,
    'ফটো': <ImageIcon className="h-5 w-5" />
  };
  
  return (
    <div className="space-y-6">
      {/* Dashboard header with title and date range selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold flex items-center">
            <Pencil className="h-6 w-6 text-purple-600 mr-2" />
            ডিজিটাল কন্টেন্ট ড্যাশবোর্ড
          </h2>
          <p className="text-muted-foreground">আপনার ডিজিটাল কন্টেন্ট ব্যবসার বিস্তারিত রিপোর্ট</p>
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
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট ভিউ</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.totalViews.toLocaleString()}</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.9)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">এনগেজমেন্ট রেট</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.avgEngagement}%</h3>
                <div className="flex items-center mt-1 text-sm text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+{Math.round(currentStats.growth * 0.4)}% গত মাস থেকে</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">কন্টেন্ট সংখ্যা</p>
                <h3 className="text-2xl font-bold mt-1">{currentStats.contents}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>{currentStats.subscribers} সাবস্ক্রাইবার</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
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
          <TabsTrigger value="content">
            <FileText className="h-4 w-4 mr-2" />
            কন্টেন্ট
          </TabsTrigger>
          <TabsTrigger value="audience">
            <Users className="h-4 w-4 mr-2" />
            অডিয়েন্স
          </TabsTrigger>
          <TabsTrigger value="monetization">
            <CircleDollarSign className="h-4 w-4 mr-2" />
            মানিটাইজেশন
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab Content */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>আয় ও ভিউস</CardTitle>
                <CardDescription>সময় অনুযায়ী আয় এবং ভিউয়ের পরিবর্তন</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip formatter={(value, name) => [name === 'revenue' ? `৳${value}` : value, name === 'revenue' ? 'রেভেনিউ' : 'ভিউস']} />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" name="রেভেনিউ" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="views" name="ভিউস" stroke="#22c55e" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>কন্টেন্ট বিতরণ</CardTitle>
                <CardDescription>ধরণ অনুসারে কন্টেন্ট সংখ্যা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChartComponent>
                      <Pie
                        data={contentTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'হার']} />
                    </PieChartComponent>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  {contentTypeData.map((content, index) => (
                    <div key={content.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{content.name}</span>
                      </div>
                      <span className="font-medium">{content.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>সেরা কন্টেন্ট</CardTitle>
                <CardDescription>সর্বোচ্চ আয় ও ভিউ সৃষ্টিকারী কন্টেন্ট</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContent.slice(0, 3).map((content, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          {contentIcons[content.type as keyof typeof contentIcons]}
                        </div>
                        <div>
                          <p className="font-medium">{content.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 rounded-sm">
                              {content.type}
                            </Badge>
                            <span className="flex items-center">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                              {content.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">৳{content.revenue.toLocaleString()}</p>
                        <div className="flex items-center justify-end gap-2 mt-1 text-xs">
                          <span className="text-muted-foreground">{content.views.toLocaleString()} ভিউ</span>
                          <span className={`flex items-center ${
                            content.change > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {content.change > 0 ? 
                              <ArrowUp className="h-3 w-3 mr-1" /> : 
                              <ArrowDown className="h-3 w-3 mr-1" />
                            }
                            {Math.abs(content.change)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    সব কন্টেন্ট পারফরম্যান্স দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>এনগেজমেন্ট স্ট্যাটিসটিক্স</CardTitle>
                <CardDescription>আপনার কন্টেন্টের সাথে ইউজারদের মিথস্ক্রিয়া</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Share className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">শেয়ার</h3>
                    </div>
                    <p className="text-xl font-bold">{engagementData.shares.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">+12% গত মাস থেকে</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">কমেন্টস</h3>
                    </div>
                    <p className="text-xl font-bold">{engagementData.comments.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">+8% গত মাস থেকে</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Download className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">ডাউনলোড</h3>
                    </div>
                    <p className="text-xl font-bold">{engagementData.downloads.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1">+15% গত মাস থেকে</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">গড় ভিউ সময়</h3>
                    </div>
                    <p className="text-xl font-bold">{engagementData.avgViewDuration}</p>
                    <p className="text-xs text-muted-foreground mt-1">+5% গত মাস থেকে</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">কমপ্লিশন রেট</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{engagementData.completionRate}% দর্শক কন্টেন্ট সম্পূর্ণ দেখেছেন</span>
                    <span className="text-sm font-medium">{engagementData.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${engagementData.completionRate}%` }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>ট্রেন্ডিং টপিক</CardTitle>
              <CardDescription>আপনার নিশ ক্যাটাগরিতে জনপ্রিয় বিষয়সমূহ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="py-2 px-3 bg-purple-50 text-purple-700 border-purple-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  ডিজিটাল মার্কেটিং
                </Badge>
                <Badge variant="outline" className="py-2 px-3 bg-pink-50 text-pink-700 border-pink-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  আর্টিফিশিয়াল ইন্টেলিজেন্স
                </Badge>
                <Badge variant="outline" className="py-2 px-3 bg-blue-50 text-blue-700 border-blue-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  ওয়েব ডেভেলপমেন্ট
                </Badge>
                <Badge variant="outline" className="py-2 px-3 bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  পাসিভ ইনকাম
                </Badge>
                <Badge variant="outline" className="py-2 px-3 bg-amber-50 text-amber-700 border-amber-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  স্টক মার্কেট
                </Badge>
                <Badge variant="outline" className="py-2 px-3 bg-cyan-50 text-cyan-700 border-cyan-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  ক্রিপ্টোকারেন্সি
                </Badge>
                <Badge variant="outline" className="py-2 px-3 bg-indigo-50 text-indigo-700 border-indigo-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  ফ্রীল্যান্সিং
                </Badge>
                <Badge variant="outline" className="py-2 px-3 bg-red-50 text-red-700 border-red-200">
                  <TrendingUp className="h-3 w-3 mr-2" />
                  ইউটিউব কন্টেন্ট
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Content Tab */}
        <TabsContent value="content">
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
                <FileText className="h-4 w-4" />
                নতুন কন্টেন্ট যোগ করুন
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topContent.map((content, idx) => (
              <Card key={idx}>
                <div className="aspect-video bg-muted relative">
                  {content.type === "ভিডিও" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40">
                        <Play className="h-6 w-6 text-white" />
                      </Button>
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2" variant="outline" className="bg-purple-100 text-purple-800 border-0">
                    {content.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">{content.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                        {content.rating}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {content.views.toLocaleString()} ভিউ
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-purple-600">৳{content.revenue.toLocaleString()}</span>
                      <span className={`flex items-center text-xs ${
                        content.change > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {content.change > 0 ? 
                          <ArrowUp className="h-3 w-3 mr-1" /> : 
                          <ArrowDown className="h-3 w-3 mr-1" />
                        }
                        {Math.abs(content.change)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">এডিট করুন</Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      একটিভিটি
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="h-3 w-3 mr-1" />
                      শেয়ার
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button variant="outline">আরও কন্টেন্ট দেখুন</Button>
          </div>
        </TabsContent>
        
        {/* Audience Tab */}
        <TabsContent value="audience">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>অডিয়েন্স ডেমোগ্রাফিক্স</CardTitle>
                <CardDescription>আপনার দর্শকদের বয়স, লিঙ্গ এবং অবস্থান</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="text-sm font-medium mb-3">বয়স বিতরণ</h3>
                  <div className="space-y-3">
                    {audienceDemographics.age.map((age) => (
                      <div key={age.group}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{age.group}</span>
                          <span className="text-sm font-medium">{age.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${age.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">লিঙ্গ বিতরণ</h3>
                  <div className="space-y-3">
                    {audienceDemographics.gender.map((gender) => (
                      <div key={gender.type}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">{gender.type}</span>
                          <span className="text-sm font-medium">{gender.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${gender.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-1">ডিভাইস ধরণ</h3>
                  <div className="flex items-center gap-4 mt-3">
                    {audienceDemographics.devices.map((device) => (
                      <div key={device.device} className="flex-1 flex flex-col items-center justify-center p-3 border rounded-lg">
                        {device.device === 'মোবাইল' ? (
                          <Smartphone className="h-6 w-6 text-purple-600 mb-1" />
                        ) : device.device === 'ডেস্কটপ' ? (
                          <Monitor className="h-6 w-6 text-purple-600 mb-1" />
                        ) : (
                          <Tablet className="h-6 w-6 text-purple-600 mb-1" />
                        )}
                        <span className="text-sm">{device.device}</span>
                        <span className="font-medium">{device.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>অডিয়েন্স লোকেশন</CardTitle>
                <CardDescription>আপনার কন্টেন্ট কোন কোন দেশে দেখা হচ্ছে</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audienceDemographics.locations.map((location) => (
                    <div key={location.location} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <span>{location.location}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-gray-200 rounded-full mr-3">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                        <span className="font-medium min-w-[40px] text-right">{location.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">ট্রাফিক সোর্স</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">সোশ্যাল মিডিয়া</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">ডিরেক্ট</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">ইমেইল</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">অন্যান্য</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">সোশ্যাল মিডিয়া সোর্স</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Facebook className="h-4 w-4 text-blue-600" />
                        </div>
                        <span>ফেসবুক</span>
                      </div>
                      <span className="font-medium">58%</span>
                    </div>
                    
                    <div className="border rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                          <Instagram className="h-4 w-4 text-pink-600" />
                        </div>
                        <span>ইন্সটাগ্রাম</span>
                      </div>
                      <span className="font-medium">24%</span>
                    </div>
                    
                    <div className="border rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                          <TwitterIcon className="h-4 w-4 text-cyan-600" />
                        </div>
                        <span>টুইটার</span>
                      </div>
                      <span className="font-medium">10%</span>
                    </div>
                    
                    <div className="border rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                          <YoutubeIcon className="h-4 w-4 text-red-600" />
                        </div>
                        <span>ইউটিউব</span>
                      </div>
                      <span className="font-medium">8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">
                  <BarChartIcon className="h-4 w-4 mr-2" />
                  বিস্তারিত অডিয়েন্স রিপোর্ট
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>অডিয়েন্স গ্রোথ</CardTitle>
              <CardDescription>সাবস্ক্রাইবার এবং দর্শক বৃদ্ধির হার</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">সাবস্ক্রাইবার</h3>
                  </div>
                  <p className="text-xl font-bold">{currentStats.subscribers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">+{Math.round(currentStats.growth * 0.6)}% গত মাস থেকে</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">রিটেনশন রেট</h3>
                  </div>
                  <p className="text-xl font-bold">78%</p>
                  <p className="text-xs text-muted-foreground mt-1">+5% গত মাস থেকে</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">নোটিফিকেশন অপট-ইন</h3>
                  </div>
                  <p className="text-xl font-bold">45%</p>
                  <p className="text-xs text-muted-foreground mt-1">+8% গত মাস থেকে</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock4 className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">সেশন ডিউরেশন</h3>
                  </div>
                  <p className="text-xl font-bold">12:25</p>
                  <p className="text-xs text-muted-foreground mt-1">+15% গত মাস থেকে</p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'জানু', subscribers: 310 },
                      { month: 'ফেব্রু', subscribers: 340 },
                      { month: 'মার্চ', subscribers: 370 },
                      { month: 'এপ্রিল', subscribers: 400 },
                      { month: 'মে', subscribers: 420 },
                      { month: 'জুন', subscribers: 450 },
                      { month: 'জুলাই', subscribers: 450 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip labelFormatter={(label) => `মাস: ${label}`} formatter={(value) => [`${value} জন`, 'সাবস্ক্রাইবার']} />
                    <Line type="monotone" dataKey="subscribers" name="সাবস্ক্রাইবার" stroke="#8b5cf6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Monetization Tab */}
        <TabsContent value="monetization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>রেভেনিউ সংক্ষিপ্তসার</CardTitle>
                <CardDescription>আয়ের উৎস এবং বিতরণ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChartComponent>
                      <Pie
                        data={[
                          { name: 'বিক্রয়', value: 55 },
                          { name: 'সাবস্ক্রিপশন', value: 25 },
                          { name: 'বিজ্ঞাপন', value: 15 },
                          { name: 'অ্যাফিলিয়েট', value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {['#8b5cf6', '#06b6d4', '#f97316', '#ec4899'].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'শতাংশ']} />
                    </PieChartComponent>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>একক বিক্রয়</span>
                    </div>
                    <div>
                      <span className="font-medium">৳১৫,৬৫০</span>
                      <span className="text-xs text-muted-foreground ml-2">(55%)</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                      <span>সাবস্ক্রিপশন</span>
                    </div>
                    <div>
                      <span className="font-medium">৳৭,১১০</span>
                      <span className="text-xs text-muted-foreground ml-2">(25%)</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>বিজ্ঞাপন</span>
                    </div>
                    <div>
                      <span className="font-medium">৳৪,২৭০</span>
                      <span className="text-xs text-muted-foreground ml-2">(15%)</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                      <span>অ্যাফিলিয়েট</span>
                    </div>
                    <div>
                      <span className="font-medium">৳১,৪২০</span>
                      <span className="text-xs text-muted-foreground ml-2">(5%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">মোট রেভেনিউ</span>
                    <span className="font-semibold text-lg">৳২৮,৪৫০</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>মাসিক রেভেনিউ ট্রেন্ড</CardTitle>
                <CardDescription>বিগত ৬ মাসের আয়ের প্রবণতা</CardDescription>
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
                      <Bar dataKey="revenue" name="রেভেনিউ" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>মানিটাইজেশন স্টেটাস</CardTitle>
                <CardDescription>আপনার মানিটাইজেশনের বর্তমান অবস্থা</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg bg-green-50 border-green-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">অ্যাড রেভেনিউ অ্যাকটিভ</h3>
                      <p className="text-xs text-muted-foreground">আপনার কন্টেন্টে বিজ্ঞাপন প্রদর্শিত হচ্ছে</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-green-50 border-green-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">মেম্বারশিপ অ্যাকটিভ</h3>
                      <p className="text-xs text-muted-foreground">আপনার সাবস্ক্রাইবাররা প্রিমিয়াম কন্টেন্ট অ্যাক্সেস করতে পারছে</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg bg-green-50 border-green-200 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">স্টোর অ্যাকটিভ</h3>
                      <p className="text-xs text-muted-foreground">আপনার ডিজিটাল প্রোডাক্ট স্টোর অনলাইনে উপলব্ধ</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Coffee className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground">ডোনেশন আনলকড</h3>
                      <p className="text-xs text-muted-foreground">১,০০০ সাবস্ক্রাইবারে পৌঁছানোর পরে এই ফিচার অ্যাকটিভ হবে</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>বেস্ট সেলিং প্রোডাক্টস</CardTitle>
                <CardDescription>সবচেয়ে বেশি বিক্রিত ডিজিটাল প্রোডাক্ট</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContent.slice(0, 3).map((content, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          {contentIcons[content.type as keyof typeof contentIcons]}
                        </div>
                        <div>
                          <p className="font-medium">{content.name}</p>
                          <p className="text-xs text-muted-foreground">{content.type}</p>
                        </div>
                      </div>
                      <div>
                        <Badge variant={idx === 0 ? 'default' : 'outline'} className={idx === 0 ? 'bg-purple-600' : ''}>
                          <ArrowUp className="h-3 w-3 mr-1" />
                          বেস্ট সেলার
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">৳{content.revenue.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{Math.round(content.revenue / 1200)} বিক্রয়</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>মানিটাইজেশন উন্নতির সুযোগ</CardTitle>
              <CardDescription>আয় বাড়ানোর জন্য সুপারিশকৃত পরিবর্তন</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">প্রোডাক্ট বান্ডল তৈরি করুন</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">আপনার সবচেয়ে জনপ্রিয় ৩টি কোর্স একত্রে বিক্রি করে আয় বাড়ান।</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      বান্ডল তৈরি করুন
                    </Button>
                  </div>
                  
                  <div className="flex-1 border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">সাবস্ক্রিপশন টায়ার বাড়ান</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">একটি প্রিমিয়াম টায়ার যোগ করে অতিরিক্ত সুবিধা অফার করুন।</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      সাবস্ক্রিপশন সেটআপ করুন
                    </Button>
                  </div>
                  
                  <div className="flex-1 border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Video className="h-5 w-5 text-purple-600" />
                      <h3 className="font-medium">লাইভ ওয়ার্কশপ</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">লাইভ ওয়ার্কশপের টিকিট বিক্রি করে অতিরিক্ত আয় করুন।</p>
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      ওয়ার্কশপ প্ল্যান করুন
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="h-5 w-5 text-purple-600" />
                    <h3 className="font-medium">রেভেনিউ পূর্বাভাস</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">এই পরিবর্তনগুলি বাস্তবায়ন করলে আপনার মাসিক আয় <span className="font-medium text-purple-700">৪০-৫০%</span> বৃদ্ধি পাবে বলে অনুমান করা হচ্ছে।</p>
                  <div className="w-full bg-purple-100 rounded-full h-1.5 mt-3">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>বর্তমান: ~৳২৮,৪৫০/মাস</span>
                    <span>সম্ভাব্য: ~৳৪১,২৫০/মাস</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Mock missing components
const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);

const Smartphone = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><path d="M12 18h.01"></path></svg>
);

const Monitor = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="3" rx="2" ry="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
);

export default ContentDashboard;
