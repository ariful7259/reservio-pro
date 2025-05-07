
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Package, 
  Banknote, 
  Tag 
} from 'lucide-react';
import { adminTheme } from '@/themes/adminTheme';

interface StatsCardProps {
  title: string;
  value: string | number;
  todayValue: string | number;
  icon: React.ReactNode;
  colorClass: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, todayValue, icon, colorClass }) => (
  <Card className={`overflow-hidden shadow-md bg-gradient-to-br from-white to-${colorClass}-50/30 border-${colorClass}-100/50`}>
    <CardContent className="p-6 flex justify-between items-center">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-green-600">+{todayValue} আজ</p>
      </div>
      <div className="w-12 h-12 rounded-full flex items-center justify-center"
        style={colorClass === 'blue' 
          ? { backgroundColor: adminTheme.colors.primaryLight, color: adminTheme.colors.primary }
          : colorClass === 'purple' 
          ? { backgroundColor: adminTheme.colors.secondaryLight, color: adminTheme.colors.secondary }
          : colorClass === 'green' 
          ? { backgroundColor: adminTheme.colors.accentLight, color: adminTheme.colors.accent }
          : { backgroundColor: 'rgb(254 240 138)', color: 'rgb(161 98 7)' }
        }>
        {icon}
      </div>
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  stats: {
    totalUsers: number;
    totalOrders: number;
    totalRevenue: string;
    activeListings: number;
  };
  todayStats: {
    newUsers: number;
    newOrders: number;
    todayRevenue: string;
    newListings: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, todayStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard 
        title="মোট ব্যবহারকারী"
        value={stats.totalUsers}
        todayValue={todayStats.newUsers}
        icon={<Users />}
        colorClass="blue"
      />
      
      <StatsCard 
        title="মোট অর্ডার"
        value={stats.totalOrders}
        todayValue={todayStats.newOrders}
        icon={<Package />}
        colorClass="purple"
      />
      
      <StatsCard 
        title="মোট আয়"
        value={stats.totalRevenue}
        todayValue={todayStats.todayRevenue}
        icon={<Banknote />}
        colorClass="green"
      />
      
      <StatsCard 
        title="সক্রিয় লিস্টিং"
        value={stats.activeListings}
        todayValue={todayStats.newListings}
        icon={<Tag className="text-amber-600" />}
        colorClass="amber"
      />
    </div>
  );
};

export default DashboardStats;
