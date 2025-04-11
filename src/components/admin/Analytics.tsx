
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  BarChart2,
  UserCheck,
  DollarSign,
  Calendar,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Share2,
  Clock,
  BarChart as BarChartIcon,
  Download,
  Filter,
  Eye,
  MousePointer,
  Percent,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

const Analytics = () => {
  const [period, setPeriod] = useState('monthly');
  const [chartType, setChartType] = useState('bar');
  
  // Sample data for user growth trend
  const userGrowthData = [
    { name: 'জানুয়ারি', users: 4000 },
    { name: 'ফেব্রুয়ারি', users: 5000 },
    { name: 'মার্চ', users: 5500 },
    { name: 'এপ্রিল', users: 6200 },
    { name: 'মে', users: 7000 },
    { name: 'জুন', users: 7500 },
    { name: 'জুলাই', users: 8200 },
    { name: 'আগস্ট', users: 8900 },
    { name: 'সেপ্টেম্বর', users: 9500 },
    { name: 'অক্টোবর', users: 10000 },
    { name: 'নভেম্বর', users: 10500 },
    { name: 'ডিসেম্বর', users: 11200 },
  ];

  // Sample data for sales trend
  const salesTrendData = [
    { name: 'জানুয়ারি', sales: 150000, revenue: 120000 },
    { name: 'ফেব্রুয়ারি', sales: 180000, revenue: 144000 },
    { name: 'মার্চ', sales: 210000, revenue: 168000 },
    { name: 'এপ্রিল', sales: 190000, revenue: 152000 },
    { name: 'মে', sales: 220000, revenue: 176000 },
    { name: 'জুন', sales: 250000, revenue: 200000 },
    { name: 'জুলাই', sales: 280000, revenue: 224000 },
    { name: 'আগস্ট', sales: 310000, revenue: 248000 },
    { name: 'সেপ্টেম্বর', sales: 290000, revenue: 232000 },
    { name: 'অক্টোবর', sales: 320000, revenue: 256000 },
    { name: 'নভেম্বর', sales: 350000, revenue: 280000 },
    { name: 'ডিসেম্বর', sales: 400000, revenue: 320000 },
  ];

  // Sample data for product performance
  const productPerformanceData = [
    { name: 'ইলেক্ট্রনিকস', value: 35 },
    { name: 'ফ্যাশন', value: 25 },
    { name: 'কসমেটিকস', value: 15 },
    { name: 'খাদ্য', value: 10 },
    { name: 'ফার্নিচার', value: 8 },
    { name: 'বই', value: 7 },
  ];

  // Sample data for visitor traffic
  const visitorTrafficData = [
    { name: 'সোম', visitors: 2400, bounceRate: 40 },
    { name: 'মঙ্গল', visitors: 1398, bounceRate: 39 },
    { name: 'বুধ', visitors: 9800, bounceRate: 38 },
    { name: 'বৃহস্পতি', visitors: 3908, bounceRate: 31 },
    { name: 'শুক্র', visitors: 4800, bounceRate: 33 },
    { name: 'শনি', visitors: 3800, bounceRate: 34 },
    { name: 'রবি', visitors: 4300, bounceRate: 35 },
  ];

  // Sample data for conversion rate
  const conversionRateData = [
    { name: 'জানুয়ারি', conversionRate: 3.2, totalVisits: 12000, conversions: 384 },
    { name: 'ফেব্রুয়ারি', conversionRate: 3.5, totalVisits: 13500, conversions: 472 },
    { name: 'মার্চ', conversionRate: 3.8, totalVisits: 14200, conversions: 539 },
    { name: 'এপ্রিল', conversionRate: 4.2, totalVisits: 15500, conversions: 651 },
    { name: 'মে', conversionRate: 4.5, totalVisits: 16800, conversions: 756 },
    { name: 'জুন', conversionRate: 4.7, totalVisits: 17500, conversions: 822 },
  ];

  // Sample data for seasonal trends
  const seasonalTrendData = [
    { name: 'শীত', sales: 320000, visitors: 12500 },
    { name: 'বসন্ত', sales: 280000, visitors: 11000 },
    { name: 'গ্রীষ্ম', sales: 250000, visitors: 10000 },
    { name: 'বর্ষা', sales: 290000, visitors: 11500 },
    { name: 'শরৎ', sales: 310000, visitors: 12000 },
  ];

  // Sample data for customer behavior
  const customerBehaviorData = [
    { name: 'নতুন ভিজিটর', value: 55 },
    { name: 'রিটার্নিং ভিজিটর', value: 45 },
  ];

  // Sample data for retention rate
  const retentionRateData = [
    { name: 'জানুয়ারি', retentionRate: 72 },
    { name: 'ফেব্রুয়ারি', retentionRate: 74 },
    { name: 'মার্চ', retentionRate: 76 },
    { name: 'এপ্রিল', retentionRate: 75 },
    { name: 'মে', retentionRate: 78 },
    { name: 'জুন', retentionRate: 80 },
  ];

  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Dashboard summary stats
  const summaryStats = [
    { title: 'মোট ব্যবহারকারী', value: '11,245', trend: '+12%', icon: <Users className="h-8 w-8 text-blue-500" />, color: 'blue' },
    { title: 'মাসিক রেভেনিউ', value: '৳ 3,24,120', trend: '+8%', icon: <DollarSign className="h-8 w-8 text-green-500" />, color: 'green' },
    { title: 'মোট অর্ডার', value: '1,432', trend: '+15%', icon: <ShoppingBag className="h-8 w-8 text-purple-500" />, color: 'purple' },
    { title: 'ভিজিটর', value: '23,456', trend: '+5%', icon: <Eye className="h-8 w-8 text-amber-500" />, color: 'amber' },
    { title: 'কনভার্সন রেট', value: '4.7%', trend: '+0.5%', icon: <Percent className="h-8 w-8 text-rose-500" />, color: 'rose' },
    { title: 'রিটেনশন রেট', value: '78%', trend: '+2%', icon: <UserCheck className="h-8 w-8 text-indigo-500" />, color: 'indigo' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">অ্যানালিটিক্স ড্যাশবোর্ড</h1>
        
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="সময়কাল" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">দৈনিক</SelectItem>
              <SelectItem value="weekly">সাপ্তাহিক</SelectItem>
              <SelectItem value="monthly">মাসিক</SelectItem>
              <SelectItem value="yearly">বাৎসরিক</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            রিপোর্ট ডাউনলোড
          </Button>
        </div>
      </div>
      
      {/* ড্যাশবোর্ড ওভারভিউ (সামারি স্ট্যাটস) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaryStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend.startsWith('+') ? <TrendingUp className="inline h-3 w-3 mr-1" /> : <TrendingDown className="inline h-3 w-3 mr-1" />}
                  {stat.trend} বৃদ্ধি
                </p>
              </div>
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* এনালিটিক্স ট্যাবস */}
      <Tabs defaultValue="userGrowth" className="w-full">
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="userGrowth" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            ইউজার গ্রোথ
          </TabsTrigger>
          <TabsTrigger value="salesTrend" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            সেলস ট্রেন্ড
          </TabsTrigger>
          <TabsTrigger value="productPerformance" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            প্রোডাক্ট পারফরম্যান্স
          </TabsTrigger>
          <TabsTrigger value="visitorTraffic" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            ভিজিটর ট্র্যাফিক
          </TabsTrigger>
          <TabsTrigger value="conversionRate" className="flex items-center gap-2">
            <MousePointer className="h-4 w-4" />
            কনভার্সন রেট
          </TabsTrigger>
          <TabsTrigger value="earningPrediction" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            আর্নিং প্রেডিকশন
          </TabsTrigger>
          <TabsTrigger value="seasonalTrend" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            সিজোনাল ট্রেন্ড
          </TabsTrigger>
          <TabsTrigger value="customerBehavior" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            কাস্টমার বিহেভিয়ার
          </TabsTrigger>
          <TabsTrigger value="retentionRate" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            রিটেনশন রেট
          </TabsTrigger>
        </TabsList>
        
        {/* ইউজার গ্রোথ ট্রেন্ড অ্যানালাইসিস */}
        <TabsContent value="userGrowth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-5 w-5" />
                ইউজার গ্রোথ ট্রেন্ড অ্যানালাইসিস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4 gap-2">
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="চার্ট টাইপ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">বার চার্ট</SelectItem>
                    <SelectItem value="line">লাইন চার্ট</SelectItem>
                    <SelectItem value="area">এরিয়া চার্ট</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-80">
                <ChartContainer config={{ users: { color: "#8884d8" } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'bar' ? (
                      <BarChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="users" name="ব্যবহারকারী সংখ্যা" fill="#8884d8" />
                      </BarChart>
                    ) : chartType === 'line' ? (
                      <LineChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="users" name="ব্যবহারকারী সংখ্যা" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    ) : (
                      <AreaChart data={userGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Area type="monotone" dataKey="users" name="ব্যবহারকারী সংখ্যা" fill="#8884d8" stroke="#8884d8" />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">মোট ব্যবহারকারী</p>
                    <p className="text-2xl font-bold">11,245</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">নতুন ব্যবহারকারী (এই মাসে)</p>
                    <p className="text-2xl font-bold">745</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">ব্যবহারকারী বৃদ্ধির হার</p>
                    <p className="text-2xl font-bold">12.5%</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* সেলস ট্রেন্ড অ্যানালাইসিস */}
        <TabsContent value="salesTrend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                সেলস ট্রেন্ড অ্যানালাইসিস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ 
                  sales: { color: "#82ca9d" }, 
                  revenue: { color: "#8884d8" } 
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="sales" name="সেলস" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="revenue" name="রেভেনিউ" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">মোট বিক্রয়</p>
                    <p className="text-2xl font-bold">৳ 3,24,120</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">গতমাসের তুলনায় বৃদ্ধি</p>
                    <p className="text-2xl font-bold">14.3%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">গড় অর্ডার ভ্যালু</p>
                    <p className="text-2xl font-bold">৳ 2,250</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* প্রোডাক্ট এবং সার্ভিস পারফরম্যান্স */}
        <TabsContent value="productPerformance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                প্রোডাক্ট এবং সার্ভিস পারফরম্যান্স
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productPerformanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {productPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">টপ পারফর্মিং প্রোডাক্ট</h3>
                  <div className="space-y-4">
                    {productPerformanceData.map((product, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span>{product.name}</span>
                            <span className="font-medium">{product.value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${product.value}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ভিজিটর ট্র্যাফিক অ্যানালাইসিস */}
        <TabsContent value="visitorTraffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Eye className="h-5 w-5" />
                ভিজিটর ট্র্যাফিক অ্যানালাইসিস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ 
                  visitors: { color: "#8884d8" }, 
                  bounceRate: { color: "#82ca9d" } 
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visitorTrafficData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="visitors" name="ভিজিটর" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="bounceRate" name="বাউন্স রেট (%)" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">সাপ্তাহিক ভিজিটর</p>
                    <p className="text-2xl font-bold">26,404</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">গড় বাউন্স রেট</p>
                    <p className="text-2xl font-bold">35.7%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">গড় সেশন সময়</p>
                    <p className="text-2xl font-bold">3:45 মিনিট</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* কনভার্সন রেট অ্যানালাইসিস */}
        <TabsContent value="conversionRate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                কনভার্সন রেট অ্যানালাইসিস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ 
                  conversionRate: { color: "#8884d8" }, 
                  totalVisits: { color: "#82ca9d" },
                  conversions: { color: "#ffc658" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="conversionRate" name="কনভার্সন রেট (%)" fill="#8884d8" />
                      <Bar dataKey="totalVisits" name="মোট ভিজিট" fill="#82ca9d" />
                      <Bar dataKey="conversions" name="কনভার্সন সংখ্যা" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">গড় কনভার্সন রেট</p>
                    <p className="text-2xl font-bold">4.7%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">মোট কনভার্সন</p>
                    <p className="text-2xl font-bold">3,624</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">কনভার্সন মূল্য</p>
                    <p className="text-2xl font-bold">৳ 890</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* আর্নিং প্রেডিকশন */}
        <TabsContent value="earningPrediction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                আর্নিং প্রেডিকশন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ 
                  actual: { color: "#82ca9d" },
                  predicted: { color: "#8884d8" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { name: 'জানুয়ারি', actual: 150000, predicted: null },
                      { name: 'ফেব্রুয়ারি', actual: 180000, predicted: null },
                      { name: 'মার্চ', actual: 210000, predicted: null },
                      { name: 'এপ্রিল', actual: 190000, predicted: null },
                      { name: 'মে', actual: 220000, predicted: null },
                      { name: 'জুন', actual: 250000, predicted: null },
                      { name: 'জুলাই', actual: null, predicted: 270000 },
                      { name: 'আগস্ট', actual: null, predicted: 300000 },
                      { name: 'সেপ্টেম্বর', actual: null, predicted: 320000 },
                      { name: 'অক্টোবর', actual: null, predicted: 350000 },
                      { name: 'নভেম্বর', actual: null, predicted: 370000 },
                      { name: 'ডিসেম্বর', actual: null, predicted: 400000 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="আসল আয়" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={{ r: 5 }} 
                        activeDot={{ r: 8 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        name="অনুমিত আয়" 
                        stroke="#8884d8" 
                        strokeDasharray="5 5" 
                        strokeWidth={2} 
                        dot={{ r: 5 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">বর্তমান মাসের আয়</p>
                    <p className="text-2xl font-bold">৳ 2,50,000</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">আগামী মাসের অনুমিত আয়</p>
                    <p className="text-2xl font-bold">৳ 2,70,000</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">বাৎসরিক অনুমিত আয়</p>
                    <p className="text-2xl font-bold">৳ 32,00,000</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* সিজোনাল ট্রেন্ড অ্যানালাইসিস */}
        <TabsContent value="seasonalTrend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                সিজোনাল ট্রেন্ড অ্যানালাইসিস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ 
                  sales: { color: "#8884d8" },
                  visitors: { color: "#82ca9d" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={seasonalTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="sales" name="বিক্রয়" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="visitors" name="ভিজিটর" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">সিজোনাল ইনসাইট</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        সেরা সিজন
                      </h4>
                      <p className="text-sm text-muted-foreground">শীতকাল (নভেম্বর - জানুয়ারি) সবচেয়ে বেশি বিক্রয় হয়, এই সময় বিশেষ প্রমোশন চালু করুন।</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-amber-500" />
                        ঝিমিয়ে পড়া সিজন
                      </h4>
                      <p className="text-sm text-muted-foreground">গ্রীষ্মকালে (মে - জুলাই) বিক্রয় কমে যায়, এই সময় বিশেষ ডিসকাউন্ট অফার দিন।</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* কাস্টমার বিহেভিয়ার অ্যানালাইসিস */}
        <TabsContent value="customerBehavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                কাস্টমার বিহেভিয়ার অ্যানালাইসিস
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={customerBehaviorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {customerBehaviorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">কাস্টমার ইনসাইট</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-blue-500" />
                          পিক আওয়ার
                        </h4>
                        <p className="text-sm text-muted-foreground">সন্ধ্যা ৭টা - রাত ১০টা সময়ে সবচেয়ে বেশি ভিজিটর আসে।</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <ShoppingBag className="h-4 w-4 text-purple-500" />
                          জনপ্রিয় ক্যাটাগরি
                        </h4>
                        <p className="text-sm text-muted-foreground">ইলেক্ট্রনিকস এবং ফ্যাশন সবচেয়ে জনপ্রিয় ক্যাটাগরি।</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          কার্ট অ্যাবেন্ডনমেন্ট রেট
                        </h4>
                        <p className="text-sm text-muted-foreground">৬৮% ক্ষেত্রে কাস্টমার কার্টে প্রোডাক্ট যোগ করার পরে কেনাকাটা বাতিল করে।</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* রিটেনশন রেট মেজারমেন্ট */}
        <TabsContent value="retentionRate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                রিটেনশন রেট মেজারমেন্ট
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer config={{ 
                  retentionRate: { color: "#8884d8" }
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={retentionRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="retentionRate" 
                        name="রিটেনশন রেট (%)" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">বর্তমান রিটেনশন রেট</p>
                    <p className="text-2xl font-bold">78%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">গতমাসের তুলনায় পরিবর্তন</p>
                    <p className="text-2xl font-bold text-green-600">+2%</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">রিটার্নিং কাস্টমার</p>
                    <p className="text-2xl font-bold">5,432</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
