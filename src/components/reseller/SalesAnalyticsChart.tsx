import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { format, subDays, parseISO, startOfDay, eachDayOfInterval } from 'date-fns';
import { bn } from 'date-fns/locale';
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface BalanceHistory {
  id: string;
  amount: number;
  type: string;
  description: string | null;
  created_at: string;
}

interface ResellerOrder {
  id: string;
  order_data: any;
  margin_amount: number;
  total_amount: number;
  final_price: number;
  status: string;
  balance_updated: boolean;
  created_at: string;
}

interface SalesAnalyticsChartProps {
  balanceHistory: BalanceHistory[];
  resellerOrders: ResellerOrder[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F'];

const SalesAnalyticsChart: React.FC<SalesAnalyticsChartProps> = ({ balanceHistory, resellerOrders }) => {
  // Last 30 days sales data
  const salesData = useMemo(() => {
    const today = new Date();
    const thirtyDaysAgo = subDays(today, 30);
    const days = eachDayOfInterval({ start: thirtyDaysAgo, end: today });

    return days.map(day => {
      const dayStart = startOfDay(day);
      const dayOrders = resellerOrders.filter(order => {
        const orderDate = startOfDay(parseISO(order.created_at));
        return orderDate.getTime() === dayStart.getTime();
      });

      const totalSales = dayOrders.reduce((sum, order) => sum + order.total_amount, 0);
      const totalMargin = dayOrders.reduce((sum, order) => sum + order.margin_amount, 0);
      const orderCount = dayOrders.length;

      return {
        date: format(day, 'dd MMM', { locale: bn }),
        fullDate: format(day, 'dd MMMM yyyy', { locale: bn }),
        sales: totalSales,
        margin: totalMargin,
        orders: orderCount
      };
    });
  }, [resellerOrders]);

  // Order status distribution
  const orderStatusData = useMemo(() => {
    const statusCounts: { [key: string]: number } = {};
    resellerOrders.forEach(order => {
      const status = order.status || 'unknown';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    const statusLabels: { [key: string]: string } = {
      pending: 'পেন্ডিং',
      processing: 'প্রসেসিং',
      completed: 'সম্পন্ন',
      cancelled: 'বাতিল',
      unknown: 'অজানা'
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: statusLabels[status] || status,
      value: count
    }));
  }, [resellerOrders]);

  // Balance type distribution
  const balanceTypeData = useMemo(() => {
    const typeTotals: { [key: string]: number } = {};
    balanceHistory.forEach(item => {
      typeTotals[item.type] = (typeTotals[item.type] || 0) + item.amount;
    });

    const typeLabels: { [key: string]: string } = {
      credit: 'জমা',
      withdrawal: 'উইথড্রয়াল',
      debit: 'খরচ',
      blocked: 'ব্লকড',
      refund: 'রিফান্ড'
    };

    return Object.entries(typeTotals).map(([type, amount]) => ({
      name: typeLabels[type] || type,
      value: amount
    }));
  }, [balanceHistory]);

  // Performance metrics
  const metrics = useMemo(() => {
    const totalSales = resellerOrders.reduce((sum, o) => sum + o.total_amount, 0);
    const totalMargin = resellerOrders.reduce((sum, o) => sum + o.margin_amount, 0);
    const completedOrders = resellerOrders.filter(o => o.status === 'completed').length;
    const avgMargin = resellerOrders.length > 0 ? totalMargin / resellerOrders.length : 0;
    
    // Last 7 days vs previous 7 days
    const sevenDaysAgo = subDays(new Date(), 7);
    const fourteenDaysAgo = subDays(new Date(), 14);
    
    const lastWeekOrders = resellerOrders.filter(o => parseISO(o.created_at) >= sevenDaysAgo);
    const previousWeekOrders = resellerOrders.filter(o => 
      parseISO(o.created_at) >= fourteenDaysAgo && parseISO(o.created_at) < sevenDaysAgo
    );
    
    const lastWeekSales = lastWeekOrders.reduce((sum, o) => sum + o.total_amount, 0);
    const previousWeekSales = previousWeekOrders.reduce((sum, o) => sum + o.total_amount, 0);
    
    const salesGrowth = previousWeekSales > 0 
      ? ((lastWeekSales - previousWeekSales) / previousWeekSales) * 100 
      : 0;

    return {
      totalSales,
      totalMargin,
      completedOrders,
      avgMargin,
      salesGrowth,
      totalOrders: resellerOrders.length
    };
  }, [resellerOrders]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium">{payload[0]?.payload?.fullDate || label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name === 'sales' ? 'বিক্রি' : entry.name === 'margin' ? 'মার্জিন' : 'অর্ডার'}: 
              {entry.name === 'orders' ? entry.value : `৳${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট বিক্রি</p>
                <p className="text-xl font-bold">৳{metrics.totalSales.toLocaleString()}</p>
              </div>
              <Activity className="h-8 w-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট মার্জিন</p>
                <p className="text-xl font-bold">৳{metrics.totalMargin.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">গড় মার্জিন</p>
                <p className="text-xl font-bold">৳{metrics.avgMargin.toFixed(0)}</p>
              </div>
              <PieChartIcon className="h-8 w-8 text-purple-500 opacity-50" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">সাপ্তাহিক গ্রোথ</p>
                <div className="flex items-center gap-1">
                  <p className={`text-xl font-bold ${metrics.salesGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metrics.salesGrowth >= 0 ? '+' : ''}{metrics.salesGrowth.toFixed(1)}%
                  </p>
                  {metrics.salesGrowth >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            গত ৩০ দিনের বিক্রি
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorSales)" 
                name="sales"
              />
              <Area 
                type="monotone" 
                dataKey="margin" 
                stroke="#82ca9d" 
                fillOpacity={1} 
                fill="url(#colorMargin)" 
                name="margin"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Orders Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              দৈনিক অর্ডার
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesData.slice(-14)}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="orders" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              অর্ডার স্ট্যাটাস
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orderStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-muted-foreground py-8">কোন অর্ডার নেই</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesAnalyticsChart;
