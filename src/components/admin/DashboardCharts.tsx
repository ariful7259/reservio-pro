
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
} from 'recharts';
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';
import { ArrowUpIcon, ArrowDownIcon, ActivitySquare } from 'lucide-react';

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
  { name: 'লগইন', value: 4500 },
  { name: 'সার্চ', value: 3800 },
  { name: 'চেকআউট', value: 1800 },
  { name: 'লিস্টিং', value: 2200 },
  { name: 'প্রোফাইল', value: 3100 },
];

const COLORS = ['#2262C6', '#6E59A5', '#00A389', '#F88379', '#FFB740'];

const RevenueChart = () => {
  return (
    <Card className="h-full shadow-md border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">আয়ের ট্রেন্ড</CardTitle>
      </CardHeader>
      <CardContent className="p-1 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyRevenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} tickFormatter={(value) => `৳${value/1000}K`} />
            <Tooltip 
              formatter={(value) => [`৳${value.toLocaleString()}`, '']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
              }}
            />
            <Legend />
            <Bar dataKey="রেন্টাল" fill="#2262C6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="সার্ভিস" fill="#6E59A5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="মার্কেটপ্লেস" fill="#00A389" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ডিজিটাল" fill="#FF9966" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const TrafficAnalytics = () => {
  return (
    <Card className="h-full shadow-md border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">সেকশন ভিজিট</CardTitle>
      </CardHeader>
      <CardContent className="p-1 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value) => [`${value.toLocaleString()}`, 'ভিজিট']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #eaeaea', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ভিজিট" 
              stroke="#2262C6" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const UserActivity = () => {
  return (
    <Card className="h-full shadow-md border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">ব্যবহারকারী অ্যাকটিভিটি</CardTitle>
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
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
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
    <Card className={`overflow-hidden shadow-md border border-gray-100 bg-gradient-to-br from-white to-${colorClass}/5`}>
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
    </>
  );
};

export default DashboardCharts;
