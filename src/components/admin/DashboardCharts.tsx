
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent
} from '@/components/ui/chart';
import { ArrowUpIcon, ArrowDownIcon, ActivitySquare, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp, Users, ShoppingBag, Banknote, Clock } from 'lucide-react';
import { adminTheme } from '@/themes/adminTheme';

// Sample data for the charts
const monthlyRevenueData = [
  { name: 'জানুয়ারি', রেন্টাল: 42000, সার্ভিস: 28000, মার্কেটপ্লেস: 30000, ডিজিটাল: 15000 },
  { name: 'ফেব্রুয়ারি', রেন্টাল: 45000, সার্ভিস: 30000, মার্কেটপ্লেস: 32000, ডিজিটাল: 16000 },
  { name: 'মার্চ', রেন্টাল: 48000, সার্ভিস: 35000, মার্কেটপ্লেস: 32000, ডিজিটাল: 17000 },
  { name: 'এপ্রিল', রেন্টাল: 52000, সার্ভিস: 37000, মার্কেটপ্লেস: 34000, ডিজিটাল: 17500 },
  { name: 'মে', রেন্টাল: 55000, সার্ভিস: 39000, মার্কেটপ্লেস: 35000, ডিজিটাল: 18000 },
  { name: 'জুন', রেন্টাল: 58400, সার্ভিস: 42850, মার্কেটপ্লেস: 36720, ডিজিটাল: 16530 },
];

const trafficData = [
  { name: 'রেন্টাল', ভিজিট: 45600, conversion: 3.2 },
  { name: 'সার্ভিস', ভিজিট: 38400, conversion: 2.8 },
  { name: 'মার্কেটপ্লেস', ভিজিট: 29800, conversion: 2.5 },
  { name: 'ডিজিটাল', ভিজিট: 18200, conversion: 3.5 },
  { name: 'প্রোফাইল', ভিজিট: 22500, conversion: 1.8 },
  { name: 'হোম', ভিজিট: 56700, conversion: 1.2 },
];

const userActivityData = [
  { name: 'লগইন', value: 4500, color: adminTheme.colors.primary },
  { name: 'সার্চ', value: 3800, color: adminTheme.colors.secondary },
  { name: 'চেকআউট', value: 1800, color: adminTheme.colors.accent },
  { name: 'লিস্টিং', value: 2200, color: adminTheme.colors.warning },
  { name: 'প্রোফাইল', value: 3100, color: adminTheme.colors.info },
];

// Daily traffic trends
const dailyTrafficData = [
  { name: 'রবি', ভিজিট: 12400, অর্ডার: 240 },
  { name: 'সোম', ভিজিট: 15300, অর্ডার: 280 },
  { name: 'মঙ্গল', ভিজিট: 14800, অর্ডার: 265 },
  { name: 'বুধ', ভিজিট: 16700, অর্ডার: 310 },
  { name: 'বৃহ', ভিজিট: 18900, অর্ডার: 340 },
  { name: 'শুক্র', ভিজিট: 21500, অর্ডার: 370 },
  { name: 'শনি', ভিজিট: 19800, অর্ডার: 320 },
];

// User demographic data
const userDemographicData = [
  { name: 'ঢাকা', value: 35 },
  { name: 'চট্টগ্রাম', value: 25 },
  { name: 'রাজশাহী', value: 15 },
  { name: 'খুলনা', value: 10 },
  { name: 'অন্যান্য', value: 15 },
];

const COLORS = [
  adminTheme.colors.primary, 
  adminTheme.colors.secondary, 
  adminTheme.colors.accent, 
  adminTheme.colors.warning, 
  adminTheme.colors.info
];

const RevenueChart = () => {
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" style={{ color: adminTheme.colors.primary }} />
          <CardTitle className="text-lg font-medium">আয়ের ট্রেন্ড</CardTitle>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          মাসিক
        </Badge>
      </CardHeader>
      <CardContent className="p-1 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyRevenueData}>
            <defs>
              <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={adminTheme.colors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={adminTheme.colors.primary} stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="colorService" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={adminTheme.colors.secondary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={adminTheme.colors.secondary} stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="colorMarketplace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={adminTheme.colors.accent} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={adminTheme.colors.accent} stopOpacity={0.4}/>
              </linearGradient>
              <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={adminTheme.colors.warning} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={adminTheme.colors.warning} stopOpacity={0.4}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} tickFormatter={(value) => `৳${value/1000}K`} />
            <Tooltip 
              formatter={(value) => [`৳${value.toLocaleString()}`, '']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: adminTheme.shadows.md
              }}
            />
            <Legend />
            <Bar dataKey="রেন্টাল" fill="url(#colorRental)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="সার্ভিস" fill="url(#colorService)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="মার্কেটপ্লেস" fill="url(#colorMarketplace)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ডিজিটাল" fill="url(#colorDigital)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const TrafficAnalytics = () => {
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <LineChartIcon className="h-5 w-5" style={{ color: adminTheme.colors.primary }} />
          <CardTitle className="text-lg font-medium">সেকশন ভিজিট</CardTitle>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          সাম্প্রতিক
        </Badge>
      </CardHeader>
      <CardContent className="p-1 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="colorVisit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={adminTheme.colors.primary} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={adminTheme.colors.primary} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value) => [`${value.toLocaleString()}`, 'ভিজিট']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: adminTheme.shadows.md
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="ভিজিট" 
              stroke={adminTheme.colors.primary}
              strokeWidth={2}
              fill="url(#colorVisit)"
              activeDot={{ r: 8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const UserActivity = () => {
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5" style={{ color: adminTheme.colors.accent }} />
          <CardTitle className="text-lg font-medium">ব্যবহারকারী অ্যাকটিভিটি</CardTitle>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          সাপ্তাহিক
        </Badge>
      </CardHeader>
      <CardContent className="p-0 h-[340px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%" className="p-2">
          <PieChart>
            <Pie
              data={userActivityData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {userActivityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value.toLocaleString()}`, 'মোট']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: adminTheme.shadows.md
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const DailyTrafficTrend = () => {
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" style={{ color: adminTheme.colors.info }} />
          <CardTitle className="text-lg font-medium">দৈনিক ট্রাফিক ট্রেন্ড</CardTitle>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          সাপ্তাহিক
        </Badge>
      </CardHeader>
      <CardContent className="p-1 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dailyTrafficData}>
            <defs>
              <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={adminTheme.colors.info} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={adminTheme.colors.info} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={adminTheme.colors.success} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={adminTheme.colors.success} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} yAxisId="left" />
            <YAxis fontSize={12} yAxisId="right" orientation="right" />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: adminTheme.shadows.md
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="ভিজিট" 
              stroke={adminTheme.colors.info} 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="অর্ডার" 
              stroke={adminTheme.colors.success} 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const UserDemographics = () => {
  return (
    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5" style={{ color: adminTheme.colors.secondary }} />
          <CardTitle className="text-lg font-medium">ব্যবহারকারী ডেমোগ্রাফিক্স</CardTitle>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          অঞ্চল
        </Badge>
      </CardHeader>
      <CardContent className="p-1 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userDemographicData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({name, value}) => `${name}: ${value}%`}
            >
              {userDemographicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, 'শতাংশ']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: adminTheme.shadows.md
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const MetricCard = ({ title, value, prevValue, icon: Icon, colorClass }) => {
  const percentChange = ((value - prevValue) / prevValue) * 100;
  const isPositive = percentChange >= 0;

  return (
    <Card className={`overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 bg-gradient-to-br from-white to-${colorClass}/5`}>
      <CardContent className="p-6 flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">৳{value.toLocaleString()}</h3>
          <div className={`flex items-center mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}
            <span className="text-xs font-medium">{Math.abs(percentChange).toFixed(1)}% গত মাস থেকে</span>
          </div>
        </div>
        <div className={`h-12 w-12 rounded-full flex items-center justify-center bg-${colorClass}/10`}>
          <Icon className={`h-6 w-6 text-${colorClass}`} />
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardCharts = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <RevenueChart />
        <TrafficAnalytics />
        <UserActivity />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DailyTrafficTrend />
        <UserDemographics />
      </div>
    </>
  );
};

export default DashboardCharts;
