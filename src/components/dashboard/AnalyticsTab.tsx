import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PieChart as LucidePieChart, 
  LineChart as LucideLineChart, 
  BarChart, 
  TrendingUp, 
  TrendingDown,
  Download,
  Filter,
  Calendar,
  Globe,
  MapPin
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart as RePieChart, Pie, Cell } from 'recharts';

interface AnalyticsTabProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  businessType: string | null;
}

const AnalyticsTab = ({ dateRange, onDateRangeChange, businessType }: AnalyticsTabProps) => {
  // Six months earning trend data
  const revenueTrendData = [
    { month: 'জানু', revenue: 9500 },
    { month: 'ফেব্রু', revenue: 12750 },
    { month: 'মার্চ', revenue: 13200 },
    { month: 'এপ্রিল', revenue: 14800 },
    { month: 'মে', revenue: 15350 },
    { month: 'জুন', revenue: 15950 },
  ];

  // Pie chart for category-wise sales
  const categorySalesData = [
    { category: 'বিজনেস স্টার্টাপ গাইড', value: 4500 },
    { category: 'ওয়েব ডিজাইন টেমপ্লেট', value: 3200 },
    { category: 'ডিজিটাল মার্কেটিং কোর্স', value: 2800 },
    { category: 'গ্রাফিক্স ডিজাইন প্যাক', value: 2100 },
  ];
  const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  const analyticsData = {
    revenue: {
      current: '৳১৫,৯৫০',
      previous: '৳১২,৭৫০',
      growth: 25.1
    },
    orders: {
      current: 142,
      previous: 98,
      growth: 44.9
    },
    conversion: {
      rate: 3.2,
      previous: 2.8,
      growth: 14.3
    },
    avgOrderValue: {
      current: '৳১,১২৩',
      previous: '৳৯৮৫',
      growth: 14.0
    }
  };

  const topProducts = [
    { name: 'বিজনেস স্টার্টাপ গাইড', sales: '৳৪,৫০০', units: 15, growth: 25 },
    { name: 'ওয়েব ডিজাইন টেমপ্লেট', sales: '৳৩,২০০', units: 8, growth: 18 },
    { name: 'ডিজিটাল মার্কেটিং কোর্স', sales: '৳২,৮০০', units: 12, growth: -5 },
    { name: 'গ্রাফিক্স ডিজাইন প্যাক', sales: '৳২,১০০', units: 21, growth: 32 }
  ];

  const trafficSources = [
    { source: 'সোশ্যাল মিডিয়া', percentage: 42, color: 'bg-blue-500' },
    { source: 'সার্চ ইঞ্জিন', percentage: 38, color: 'bg-green-500' },
    { source: 'ডিরেক্ট', percentage: 15, color: 'bg-amber-500' },
    { source: 'রেফারেল', percentage: 5, color: 'bg-purple-500' }
  ];

  const customerLocations = [
    { location: 'ঢাকা', percentage: 55, count: 89 },
    { location: 'চট্টগ্রাম', percentage: 20, count: 32 },
    { location: 'সিলেট', percentage: 10, count: 16 },
    { location: 'রাজশাহী', percentage: 8, count: 13 },
    { location: 'অন্যান্য', percentage: 7, count: 11 }
  ];

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">বিজনেস এনালিটিক্স</h2>
          <p className="text-muted-foreground">
            {businessType ? 
              `${businessType} ব্যবসার বিস্তারিত পরিসংখ্যান` : 
              'সম্পূর্ণ ব্যবসার বিস্তারিত বিশ্লেষণ'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">এই মাস</SelectItem>
              <SelectItem value="last-month">গত মাস</SelectItem>
              <SelectItem value="this-year">এই বছর</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            ফিল্টার
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            এক্সপোর্ট
          </Button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট আয়</p>
                <p className="text-2xl font-bold">{analyticsData.revenue.current}</p>
                <div className="flex items-center mt-1">
                  {analyticsData.revenue.growth > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${analyticsData.revenue.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {analyticsData.revenue.growth > 0 ? '+' : ''}{analyticsData.revenue.growth}%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">মোট অর্ডার</p>
                <p className="text-2xl font-bold">{analyticsData.orders.current}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{analyticsData.orders.growth}%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">কনভার্শন রেট</p>
                <p className="text-2xl font-bold">{analyticsData.conversion.rate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{analyticsData.conversion.growth}%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <PieChart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">গড় অর্ডার ভ্যালু</p>
                <p className="text-2xl font-bold">{analyticsData.avgOrderValue.current}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+{analyticsData.avgOrderValue.growth}%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <LineChart className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* আয়ের ট্রেন্ড চার্ট */}
        <Card>
          <CardHeader>
            <CardTitle>আয়ের ট্রেন্ড চার্ট</CardTitle>
            <CardDescription>গত ৬ মাসের আয়ের লাইভ গ্রাফ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v: number) => `৳${v.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} name="মোট আয়" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* ক্যাটাগরি অনুযায়ী বিক্রয় */}
        <Card>
          <CardHeader>
            <CardTitle>ক্যাটাগরি অনুযায়ী বিক্রয়</CardTitle>
            <CardDescription>প্রোডাক্ট ক্যাটাগরি অনুযায়ী বিক্রয় ডাটা</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    dataKey="value"
                    data={categorySalesData}
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(v, name) => [`৳${v}`, 'বিক্রয়']}
                    labelFormatter={(label) => `ক্যাটাগরি: ${label}`}
                  />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top performing products */}
        <Card>
          <CardHeader>
            <CardTitle>সেরা বিক্রিত প্রোডাক্ট</CardTitle>
            <CardDescription>এই মাসের সবচেয়ে জনপ্রিয় প্রোডাক্ট</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.units} বিক্রি</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{product.sales}</p>
                    <div className="flex items-center gap-1">
                      {product.growth > 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${product.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic sources */}
        <Card>
          <CardHeader>
            <CardTitle>ট্র্যাফিক সোর্স</CardTitle>
            <CardDescription>ভিজিটরদের উৎস বিশ্লেষণ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                      <span className="text-sm font-medium">{source.source}</span>
                    </div>
                    <span className="text-sm font-bold">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${source.color}`}
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer demographics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            গ্রাহকদের ভৌগোলিক অবস্থান
          </CardTitle>
          <CardDescription>বিভিন্ন অঞ্চল থেকে গ্রাহকদের পরিসংখ্যান</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customerLocations.map((location, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{location.location}</span>
                  <Badge variant="outline">{location.count} জন</Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>শেয়ার</span>
                    <span>{location.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
