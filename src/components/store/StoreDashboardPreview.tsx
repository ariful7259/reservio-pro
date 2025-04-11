
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Eye, 
  ShoppingBag, 
  Users, 
  Percent,
  ShoppingCart,
  Clock,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Calendar,
  Filter,
  RefreshCw,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChartContainer, 
  ChartTooltipContent, 
  ChartTooltip 
} from '@/components/ui/chart';

// সময় ভিত্তিক সেলস ডাটা
const salesData = [
  { name: 'জানু', sales: 2400, orders: 40, visitors: 1200 },
  { name: 'ফেব্রু', sales: 1398, orders: 28, visitors: 980 },
  { name: 'মার্চ', sales: 9800, orders: 120, visitors: 3800 },
  { name: 'এপ্রিল', sales: 3908, orders: 58, visitors: 1700 },
  { name: 'মে', sales: 4800, orders: 79, visitors: 2100 },
  { name: 'জুন', sales: 3800, orders: 65, visitors: 1800 },
  { name: 'জুলাই', sales: 4300, orders: 82, visitors: 2300 },
];

// সাম্প্রতিক সময়ে সেলস ট্রেন্ড
const recentSalesTrend = [
  { day: '১', sales: 1200 },
  { day: '২', sales: 1350 },
  { day: '৩', sales: 1100 },
  { day: '৪', sales: 1450 },
  { day: '৫', sales: 1600 },
  { day: '৬', sales: 1750 },
  { day: '৭', sales: 1950 },
  { day: '৮', sales: 2100 },
  { day: '৯', sales: 1800 },
  { day: '১০', sales: 2300 },
  { day: '১১', sales: 2500 },
  { day: '১২', sales: 2450 },
  { day: '১৩', sales: 2800 },
  { day: '১৪', sales: 3000 },
];

// ট্রাফিক ডাটা (ভিজিটর সোর্স)
const trafficSourcesData = [
  { name: 'সোশ্যাল মিডিয়া', value: 42 },
  { name: 'সার্চ ইঞ্জিন', value: 38 },
  { name: 'ডিরেক্ট', value: 15 },
  { name: 'রেফারেল', value: 5 },
];

// সপ্তাহের ভিত্তিতে ভিজিটর ডাটা
const weeklyVisitorsData = [
  { name: 'রবি', visitors: 1200, conversion: 120 },
  { name: 'সোম', visitors: 1400, conversion: 150 },
  { name: 'মঙ্গল', visitors: 1300, conversion: 135 },
  { name: 'বুধ', visitors: 1500, conversion: 180 },
  { name: 'বৃহ', visitors: 1600, conversion: 190 },
  { name: 'শুক্র', visitors: 2000, conversion: 250 },
  { name: 'শনি', visitors: 1800, conversion: 210 },
];

// শীর্ষ বিক্রিত পণ্য ডাটা
const topProducts = [
  { name: 'স্মার্টফোন', sales: 45, change: 12, revenue: 52500 },
  { name: 'হেডফোন', sales: 32, change: -5, revenue: 22400 },
  { name: 'ল্যাপটপ', sales: 28, change: 8, revenue: 84000 },
  { name: 'স্মার্টওয়াচ', sales: 25, change: 15, revenue: 18750 },
  { name: 'ব্লুটুথ স্পীকার', sales: 18, change: 3, revenue: 12600 },
];

// শীর্ষ ক্যাটেগরি ডাটা
const categoryData = [
  { name: 'ইলেকট্রনিক্স', value: 35 },
  { name: 'ফ্যাশন', value: 20 },
  { name: 'হেলথকেয়ার', value: 15 },
  { name: 'কিচেন', value: 12 },
  { name: 'বইপত্র', value: 8 },
  { name: 'অন্যান্য', value: 10 },
];

// পাই চার্টের জন্য কালার
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9F7AEA', '#F87171'];

const StoreDashboardPreview = () => {
  const [timeRange, setTimeRange] = useState('সাপ্তাহিক');
  const [chartView, setChartView] = useState('bar');
  
  return (
    <div className="space-y-6">
      {/* সামারি স্ট্যাটস */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">মোট বিক্রয়</p>
              <h3 className="text-2xl font-bold">৳২৪,৫৫০</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> +১৮% গত মাস থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">ভিজিটর</p>
              <h3 className="text-2xl font-bold">১,২৩৫</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> +২২% গত সপ্তাহ থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Eye className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">নতুন গ্রাহক</p>
              <h3 className="text-2xl font-bold">৮৫</h3>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUp className="h-3 w-3 mr-1" /> +১০% গত মাস থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-violet-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">কনভার্শন রেট</p>
              <h3 className="text-2xl font-bold">৩.৭%</h3>
              <p className="text-xs text-red-600 flex items-center mt-1">
                <ArrowDown className="h-3 w-3 mr-1" /> -২% গত মাস থেকে
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Percent className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* সেলস এবং ট্রাফিক ট্যাব */}
      <Tabs defaultValue="sales" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="sales">বিক্রয় ট্রেন্ড</TabsTrigger>
            <TabsTrigger value="visitors">ভিজিটর ট্রেন্ড</TabsTrigger>
            <TabsTrigger value="traffic">ট্রাফিক সোর্স</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue placeholder="সময়কাল" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="দৈনিক">দৈনিক</SelectItem>
                <SelectItem value="সাপ্তাহিক">সাপ্তাহিক</SelectItem>
                <SelectItem value="মাসিক">মাসিক</SelectItem>
                <SelectItem value="বার্ষিক">বার্ষিক</SelectItem>
              </SelectContent>
            </Select>

            <Select value={chartView} onValueChange={setChartView}>
              <SelectTrigger className="w-[150px] h-8">
                <SelectValue placeholder="চার্ট ভিউ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">বার চার্ট</SelectItem>
                <SelectItem value="line">লাইন চার্ট</SelectItem>
                <SelectItem value="area">এরিয়া চার্ট</SelectItem>
              </SelectContent>
            </Select>

            <Button size="sm" variant="outline" className="h-8">
              <Download className="h-4 w-4 mr-1" /> এক্সপোর্ট
            </Button>
          </div>
        </div>

        <TabsContent value="sales">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg flex items-center">
                বিক্রয় ট্রেন্ড ({timeRange})
                <Button size="sm" variant="ghost" className="ml-auto">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer 
                  className="h-full w-full" 
                  config={{
                    sales: { label: "বিক্রয়", color: "#8884d8" },
                    orders: { label: "অর্ডার", color: "#82ca9d" }
                  }}
                >
                  {chartView === 'bar' && (
                    <BarChart
                      data={salesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="sales" name="বিক্রয়" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="orders" name="অর্ডার" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  )}
                  
                  {chartView === 'line' && (
                    <LineChart
                      data={salesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="sales" name="বিক্রয়" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="orders" name="অর্ডার" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  )}
                  
                  {chartView === 'area' && (
                    <AreaChart
                      data={salesData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="sales" name="বিক্রয়" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="orders" name="অর্ডার" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    </AreaChart>
                  )}
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visitors">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">ভিজিটর ট্রেন্ড ({timeRange})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer 
                  className="h-full w-full" 
                  config={{
                    visitors: { label: "ভিজিটর", color: "#6366f1" },
                    conversion: { label: "কনভার্শন", color: "#f97316" }
                  }}
                >
                  <AreaChart
                    data={weeklyVisitorsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      name="ভিজিটর" 
                      stroke="#6366f1" 
                      fill="#6366f1" 
                      fillOpacity={0.2} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="conversion" 
                      name="কনভার্শন" 
                      stroke="#f97316" 
                      fill="#f97316" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle className="text-lg">ট্রাফিক সোর্স ({timeRange})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-64">
                  <ChartContainer 
                    className="h-full w-full" 
                    config={{
                      value: { label: "ট্রাফিক শেয়ার", color: "#8884d8" }
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={trafficSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {trafficSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </div>
                
                <div className="space-y-4 self-center">
                  {trafficSourcesData.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <span 
                            className="w-3 h-3 inline-block mr-2 rounded-full" 
                            style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                          />
                          {item.name}
                        </span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${item.value}%`, 
                            backgroundColor: COLORS[idx % COLORS.length] 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* টপ প্রোডাক্ট এবং ক্যাটেগরি গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>শীর্ষ বিক্রিত পণ্য</span>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Filter className="h-4 w-4" /> ফিল্টার
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-1">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium w-5">{idx + 1}.</span>
                    <span>{product.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{product.sales} বিক্রি</span>
                    <span className="text-sm font-medium">৳{product.revenue.toLocaleString()}</span>
                    <span className={`text-xs flex items-center ${
                      product.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.change > 0 ? 
                        <ArrowUp className="h-3 w-3 mr-1" /> : 
                        <ArrowDown className="h-3 w-3 mr-1" />
                      }
                      {Math.abs(product.change)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">বিক্রয় ক্যাটেগরি বিভাজন</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[220px]">
                <ChartContainer 
                  className="h-full w-full" 
                  config={{
                    value: { label: "ক্যাটেগরি শেয়ার", color: "#8884d8" }
                  }}
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
              
              <div className="space-y-3 self-center">
                {categoryData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span 
                        className="w-3 h-3 inline-block mr-2 rounded-full" 
                        style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* সাম্প্রতিক অর্ডার এবং সাম্প্রতিক সেলস ট্রেন্ড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">সাম্প্রতিক অর্ডার</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(order => (
                <div key={order} className="flex justify-between items-center py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">অর্ডার #{1000 + order}</p>
                      <p className="text-xs text-muted-foreground">গ্রাহক #{100 + order}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">৳{order * 1250}</p>
                    <p className="text-xs text-muted-foreground flex items-center justify-end">
                      <Clock className="h-3 w-3 mr-1" />
                      {order} ঘন্টা আগে
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg flex items-center">
              <span>১৪ দিনের বিক্রয় ট্রেন্ড</span>
              <Button variant="ghost" size="sm" className="ml-auto h-8 gap-1">
                <Calendar className="h-4 w-4" /> তারিখ নির্বাচন
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-[250px]">
              <ChartContainer 
                className="h-full w-full" 
                config={{
                  sales: { label: "দৈনিক বিক্রয়", color: "#8884d8" }
                }}
              >
                <AreaChart
                  data={recentSalesTrend}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    name="দৈনিক বিক্রয়" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoreDashboardPreview;
