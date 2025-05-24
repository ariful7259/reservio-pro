
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Eye, 
  DollarSign,
  Activity,
  Clock,
  Globe
} from 'lucide-react';

const RealTimeAnalytics = () => {
  const [isLive, setIsLive] = useState(true);
  const [liveData, setLiveData] = useState({
    currentVisitors: 245,
    todayOrders: 18,
    revenue: 15750,
    conversionRate: 3.8
  });

  // রিয়েল-টাইম ডাটা সিমুলেশন
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLiveData(prev => ({
        currentVisitors: prev.currentVisitors + Math.floor(Math.random() * 10) - 5,
        todayOrders: prev.todayOrders + (Math.random() > 0.7 ? 1 : 0),
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        conversionRate: +(prev.conversionRate + (Math.random() - 0.5) * 0.1).toFixed(1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  // স্যাম্পল ডাটা
  const hourlyData = [
    { time: '09:00', visitors: 120, orders: 5, revenue: 2500 },
    { time: '10:00', visitors: 150, orders: 8, revenue: 4200 },
    { time: '11:00', visitors: 180, orders: 12, revenue: 6800 },
    { time: '12:00', visitors: 200, orders: 15, revenue: 8500 },
    { time: '13:00', visitors: 175, orders: 10, revenue: 5900 },
    { time: '14:00', visitors: 190, orders: 14, revenue: 7200 },
    { time: '15:00', visitors: 220, orders: 18, revenue: 9100 }
  ];

  const deviceData = [
    { name: 'মোবাইল', value: 65, color: '#8884d8' },
    { name: 'ডেস্কটপ', value: 25, color: '#82ca9d' },
    { name: 'ট্যাবলেট', value: 10, color: '#ffc658' }
  ];

  const topPages = [
    { page: 'হোম পেজ', views: 1250, percentage: 35 },
    { page: 'পণ্য তালিকা', views: 890, percentage: 25 },
    { page: 'চেকআউট', views: 645, percentage: 18 },
    { page: 'প্রোফাইল', views: 432, percentage: 12 },
    { page: 'সম্পর্কে', views: 356, percentage: 10 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">রিয়েল-টাইম অ্যানালিটিক্স</h2>
          <p className="text-muted-foreground">আপনার স্টোরের লাইভ পারফরম্যান্স ট্র্যাক করুন</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm">{isLive ? 'লাইভ' : 'অফলাইন'}</span>
          <Badge variant={isLive ? 'default' : 'secondary'}>
            <Activity className="h-3 w-3 mr-1" />
            রিয়েল-টাইম
          </Badge>
        </div>
      </div>

      {/* লাইভ স্ট্যাটস */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">বর্তমান ভিজিটর</p>
                <h3 className="text-2xl font-bold">{liveData.currentVisitors}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +১২% গত ঘন্টায়
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">আজকের অর্ডার</p>
                <h3 className="text-2xl font-bold">{liveData.todayOrders}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +৮% গতকালের তুলনায়
                </p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">আজকের রেভিনিউ</p>
                <h3 className="text-2xl font-bold">৳{liveData.revenue.toLocaleString()}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +১৫% গতকালের তুলনায়
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">কনভার্শন রেট</p>
                <h3 className="text-2xl font-bold">{liveData.conversionRate}%</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +০.৫% গত সপ্তাহে
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="traffic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traffic">ট্রাফিক</TabsTrigger>
          <TabsTrigger value="sales">সেলস</TabsTrigger>
          <TabsTrigger value="devices">ডিভাইস</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                ঘন্টায় ঘন্টায় ট্রাফিক
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="visitors" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ fill: '#8884d8' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>জনপ্রিয় পেজসমূহ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{page.page}</span>
                        <span className="text-sm text-muted-foreground">{page.views} ভিউ</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${page.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>আজকের সেলস ট্রেন্ড</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                ডিভাইস ব্যবহার
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: device.color }}
                        ></div>
                        <span className="font-medium">{device.name}</span>
                      </div>
                      <span className="text-sm font-bold">{device.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealTimeAnalytics;
