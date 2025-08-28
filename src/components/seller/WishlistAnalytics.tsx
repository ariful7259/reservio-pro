import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Heart, Target } from 'lucide-react';

interface SellerInsight {
  id: string;
  product_id?: string;
  service_id?: string;
  item_type: 'product' | 'service';
  wishlist_count: number;
  conversion_count: number;
  conversion_rate: number;
}

interface WishlistAnalyticsProps {
  insights: SellerInsight[];
}

export const WishlistAnalytics: React.FC<WishlistAnalyticsProps> = ({ insights }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Prepare data for charts
  const chartData = insights.map(insight => ({
    name: `${insight.item_type} ${insight.product_id || insight.service_id}`,
    wishlist_count: insight.wishlist_count,
    conversion_count: insight.conversion_count,
    conversion_rate: insight.conversion_rate
  }));

  const typeDistribution = insights.reduce((acc, insight) => {
    acc[insight.item_type] = (acc[insight.item_type] || 0) + insight.wishlist_count;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(typeDistribution).map(([type, count]) => ({
    name: type,
    value: count
  }));

  const topPerformers = [...insights]
    .sort((a, b) => b.wishlist_count - a.wishlist_count)
    .slice(0, 5);

  const lowPerformers = [...insights]
    .filter(insight => insight.conversion_rate < 10 && insight.wishlist_count > 0)
    .sort((a, b) => a.conversion_rate - b.conversion_rate)
    .slice(0, 5);

  const totalWishlistCount = insights.reduce((sum, insight) => sum + insight.wishlist_count, 0);
  const totalConversions = insights.reduce((sum, insight) => sum + insight.conversion_count, 0);
  const averageConversionRate = insights.length > 0 
    ? insights.reduce((sum, insight) => sum + insight.conversion_rate, 0) / insights.length 
    : 0;

  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No analytics data available yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Analytics will appear once customers start adding your items to wishlist
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Wishlisted</p>
                <p className="text-2xl font-bold text-red-500">{totalWishlistCount}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Conversions</p>
                <p className="text-2xl font-bold text-green-500">{totalConversions}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Conversion Rate</p>
                <p className="text-2xl font-bold text-blue-500">{averageConversionRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Items</p>
                <p className="text-2xl font-bold">{insights.length}</p>
              </div>
              <Badge variant="outline" className="animate-pulse">Live</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wishlist vs Conversion Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wishlist_count" fill="#ef4444" name="Wishlist Count" />
                <Bar dataKey="conversion_count" fill="#22c55e" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Item Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top and Low Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPerformers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data available</p>
            ) : (
              <div className="space-y-4">
                {topPerformers.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {item.item_type} {item.product_id || item.service_id}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={item.conversion_rate} className="w-20 h-2" />
                        <span className="text-xs text-muted-foreground">
                          {item.conversion_rate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-500">{item.wishlist_count}</p>
                      <p className="text-xs text-muted-foreground">wishlisted</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Needs Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowPerformers.length === 0 ? (
              <p className="text-sm text-muted-foreground">All items performing well!</p>
            ) : (
              <div className="space-y-4">
                {lowPerformers.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {item.item_type} {item.product_id || item.service_id}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={item.conversion_rate} className="w-20 h-2" />
                        <span className="text-xs text-muted-foreground">
                          {item.conversion_rate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-500">{item.wishlist_count}</p>
                      <p className="text-xs text-muted-foreground">needs boost</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};