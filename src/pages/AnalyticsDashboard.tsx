import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart2, LineChart, PieChart, Users, ShoppingBag, Repeat, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as RechartLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartPie,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Mock data
const salesData = [
  { name: 'জান', value: 24000 },
  { name: 'ফেব', value: 18000 },
  { name: 'মার্চ', value: 29000 },
  { name: 'এপ্রি', value: 31000 },
  { name: 'মে', value: 26000 },
  { name: 'জুন', value: 35000 },
];

const categoryData = [
  { name: 'সার্ভিসেস', value: 40 },
  { name: 'প্রোডাক্ট', value: 30 },
  { name: 'রেন্টাল', value: 20 },
  { name: 'ডিজিটাল', value: 10 },
];

const userActivityData = [
  { name: 'জান', active: 400, new: 240 },
  { name: 'ফেব', active: 300, new: 139 },
  { name: 'মার্চ', active: 500, new: 280 },
  { name: 'এপ্রি', active: 780, new: 390 },
  { name: 'মে', active: 590, new: 300 },
  { name: 'জুন', active: 800, new: 450 },
];

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [timeRange, setTimeRange] = useState('month');
  
  const stats = [
    {
      title: language === 'bn' ? 'মোট ইউজার' : 'Total Users',
      value: '12,456',
      change: '+12%',
      icon: <Users className="h-4 w-4" />,
      positive: true,
    },
    {
      title: language === 'bn' ? 'মোট সেলস' : 'Total Sales',
      value: '৳248,500',
      change: '+18%',
      icon: <ShoppingBag className="h-4 w-4" />,
      positive: true,
    },
    {
      title: language === 'bn' ? 'রিটার্নিং কাস্টমার' : 'Returning Customers',
      value: '64%',
      change: '+5%',
      icon: <Repeat className="h-4 w-4" />,
      positive: true,
    },
    {
      title: language === 'bn' ? 'গ্রোথ রেট' : 'Growth Rate',
      value: '23%',
      change: '-2%',
      icon: <TrendingUp className="h-4 w-4" />,
      positive: false,
    },
  ];

  const renderLabel = ({ name, percent }) => {
    if (name === undefined || percent === undefined) return '';
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };
  
  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">
          {language === 'bn' ? 'অ্যানালিটিকস ড্যাশবোর্ড' : 'Analytics Dashboard'}
        </h1>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={language === 'bn' ? 'সময়কাল নির্বাচন করুন' : 'Select time period'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">{language === 'bn' ? 'গত সপ্তাহ' : 'Last Week'}</SelectItem>
            <SelectItem value="month">{language === 'bn' ? 'গত মাস' : 'Last Month'}</SelectItem>
            <SelectItem value="quarter">{language === 'bn' ? 'গত তিন মাস' : 'Last Quarter'}</SelectItem>
            <SelectItem value="year">{language === 'bn' ? 'গত বছর' : 'Last Year'}</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          {language === 'bn' ? 'ফিল্টার' : 'Filter'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground text-sm">{stat.title}</span>
                <div className={`p-2 rounded-full ${stat.positive ? 'bg-green-100' : 'bg-red-100'}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="font-bold text-2xl mb-1">{stat.value}</div>
              <div className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} {language === 'bn' ? 'গত মাসের তুলনায়' : 'from last month'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">
            {language === 'bn' ? 'ওভারভিউ' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="sales">
            {language === 'bn' ? 'সেলস' : 'Sales'}
          </TabsTrigger>
          <TabsTrigger value="users">
            {language === 'bn' ? 'ইউজার' : 'Users'}
          </TabsTrigger>
          <TabsTrigger value="trends">
            {language === 'bn' ? 'ট্রেন্ডস' : 'Trends'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'bn' ? 'সেলস ওভারভিউ' : 'Sales Overview'}</CardTitle>
                <CardDescription>
                  {language === 'bn' ? 'গত ৬ মাসের সেলস ট্রেন্ড' : 'Sales trend over the last 6 months'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'bn' ? 'ক্যাটাগরি বিভাজন' : 'Category Distribution'}</CardTitle>
                <CardDescription>
                  {language === 'bn' ? 'ক্যাটাগরি অনুযায়ী সেলস বিভাজন' : 'Sales distribution by category'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartPie>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={renderLabel}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartPie>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'bn' ? 'বিস্তারিত সেলস রিপোর্ট' : 'Detailed Sales Report'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'bn' ? 'ইউজার এক্টিভিটি' : 'User Activity'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RechartLine data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="active" stroke="#8884d8" activeDot={{ r: 8 }} name={language === 'bn' ? 'সক্রিয় ইউজার' : 'Active Users'} />
                  <Line type="monotone" dataKey="new" stroke="#82ca9d" name={language === 'bn' ? 'নতুন ইউজার' : 'New Users'} />
                </RechartLine>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'bn' ? 'মার্কেট ট্রেন্ড' : 'Market Trends'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8">
                <BarChart2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {language === 'bn' ? 'ট্রেন্ড ডাটা লোড হচ্ছে...' : 'Trend data loading...'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'bn' 
                    ? 'শীঘ্রই আরও বিস্তারিত মার্কেট ট্রেন্ড তথ্য উপলব্ধ হবে।' 
                    : 'More detailed market trend information will be available soon.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>{language === 'bn' ? 'সাম্প্রতিক ফিডব্যাক' : 'Recent Feedback'}</CardTitle>
          <CardDescription>
            {language === 'bn' ? 'ব্যবহারকারীদের সর্বশেষ মতামত' : 'Latest user opinions and reviews'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">
                    {['রহিম আহমেদ', 'সাবরিনা খান', 'করিম হোসেন'][i]}
                  </div>
                  <div className="flex">
                    {Array(4 + (i % 2)).fill(0).map((_, j) => (
                      <span key={j} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {[
                    'সার্ভিসটি খুবই দ্রুত ও সহজে ব্যবহার করতে পেরেছি। অনলাইনে অর্ডার করার পর দ্রুত ডেলিভারি পেয়েছি।',
                    'অ্যাপটি অনেক ইউজার-ফ্রেন্ডলি, তবে কিছু জায়গায় আরও উন্নতি করা যেতে পারে। ওভারঅল এক্সপেরিয়েন্স ভালো।',
                    'দারুণ সার্ভিস। যে সময় বলেছিল ঠিক সেই সময়েই সার্ভিস পেয়েছি। সার্ভিস প্রোভাইডারের আচরণও খুবই ভালো ছিল।'
                  ][i]}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  {['২ দিন আগে', '১ সপ্তাহ আগে', '৩ দিন আগে'][i]}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
