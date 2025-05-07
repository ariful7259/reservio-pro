
import React from 'react';
import DashboardStats from './DashboardStats';
import DashboardCharts from '@/components/admin/DashboardCharts';
import RecentTransactions from './RecentTransactions';
import PendingApprovals from './PendingApprovals';

interface DashboardMainProps {
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
  recentTransactions: Array<{
    id: string;
    amount: string;
    type: string;
    user: string;
    status: string;
    time: string;
  }>;
  pendingItems: {
    products: number;
    services: number;
    rentalListings: number;
    contentCreators: number;
  };
}

const DashboardMain: React.FC<DashboardMainProps> = ({ 
  stats, 
  todayStats, 
  recentTransactions, 
  pendingItems 
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ড্যাশবোর্ড</h1>
      
      <DashboardStats stats={stats} todayStats={todayStats} />
      
      <DashboardCharts />
      
      <RecentTransactions transactions={recentTransactions} />
      
      <PendingApprovals pendingItems={pendingItems} />
    </div>
  );
};

export default DashboardMain;
