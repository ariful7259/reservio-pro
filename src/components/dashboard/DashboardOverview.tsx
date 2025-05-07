
import React from 'react';
import { TrendingUp, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardOverviewProps {
  stats: {
    sales: string;
    orders: number;
    customers: number;
    growth: number;
  };
}

const DashboardOverview = ({ stats }: DashboardOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ড্যাশবোর্ড অভারভিউ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium">মোট বিক্রয়</h3>
            <div className="flex items-baseline justify-between">
              <p className="text-3xl font-bold">{stats.sales}</p>
              <p className="text-sm text-emerald-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{stats.growth}% গত মাস থেকে
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm text-muted-foreground">মোট অর্ডার</h4>
              <p className="text-xl font-bold">{stats.orders}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm text-muted-foreground">মোট গ্রাহক</h4>
              <p className="text-xl font-bold">{stats.customers}</p>
            </div>
          </div>
          
          <div className="h-40 flex items-center justify-center border rounded-lg">
            <BarChart className="h-6 w-6 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground">সেলস ট্রেন্ড চার্ট এখানে দেখানো হবে</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOverview;
