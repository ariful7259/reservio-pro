
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronDown,
  CheckCircle,
  XCircle,
  PlusCircle,
  Edit,
  Trash2,
  Search,
  FileText,
  Calendar,
  CalendarDays,
  BarChart,
  BarChart3,
  PieChart,
  TrendingUp,
  Award,
  ShoppingBag,
  Truck,
  Building,
  BookOpen,
  Banknote,
  Download,
  FileSpreadsheet,
  FilePdf,
  FileText2,
  Eye,
  Filter,
  ArrowUpDown,
  DollarSign,
  RefreshCcw,
  Activity,
  UserCheck,
  MessageSquare
} from 'lucide-react';

// মক ডাটা স্ট্যাটিসটিক্স
const MOCK_SALES_STATS = [
  { date: '১ মে, ২০২৫', total: 45000, orders: 23, marketplaceRevenue: 30000, serviceRevenue: 8000, digitalRevenue: 7000 },
  { date: '২ মে, ২০২৫', total: 38000, orders: 19, marketplaceRevenue: 25000, serviceRevenue: 5000, digitalRevenue: 8000 },
  { date: '৩ মে, ২০২৫', total: 42000, orders: 21, marketplaceRevenue: 28000, serviceRevenue: 7000, digitalRevenue: 7000 },
  { date: '৪ মে, ২০২৫', total: 50000, orders: 25, marketplaceRevenue: 32000, serviceRevenue: 10000, digitalRevenue: 8000 },
  { date: '৫ মে, ২০২৫', total: 47000, orders: 24, marketplaceRevenue: 30000, serviceRevenue: 9000, digitalRevenue: 8000 },
  { date: '৬ মে, ২০২৫', total: 62000, orders: 31, marketplaceRevenue: 40000, serviceRevenue: 12000, digitalRevenue: 10000 },
  { date: '৭ মে, ২০২৫', total: 58000, orders: 29, marketplaceRevenue: 38000, serviceRevenue: 11000, digitalRevenue: 9000 },
];

const MOCK_USER_ACTIVITIES = [
  { date: '১ মে, ২০২৫', newUsers: 120, activeUsers: 1850, totalUsers: 2450, engagement: '68%' },
  { date: '২ মে, ২০২৫', newUsers: 95, activeUsers: 1780, totalUsers: 2545, engagement: '70%' },
  { date: '৩ মে, ২০২৫', newUsers: 105, activeUsers: 1820, totalUsers: 2650, engagement: '69%' },
  { date: '৪ মে, ২০২৫', newUsers: 110, activeUsers: 1890, totalUsers: 2760, engagement: '68%' },
  { date: '৫ মে, ২০২৫', newUsers: 125, activeUsers: 1950, totalUsers: 2885, engagement: '67%' },
  { date: '৬ মে, ২০২৫', newUsers: 140, activeUsers: 2020, totalUsers: 3025, engagement: '67%' },
  { date: '৭ মে, ২০২৫', newUsers: 130, activeUsers: 2050, totalUsers: 3155, engagement: '65%' },
];

const MOCK_PRODUCT_PERFORMANCE = [
  { 
    id: 'prod-001', 
    name: 'আইফোন ১৩ প্রো', 
    category: 'ইলেকট্রনিক্স', 
    views: 4500, 
    sales: 45, 
    revenue: '৪,২৭,৫০০ ৳', 
    conversionRate: '1.0%',
    rating: 4.8,
    reviews: 32
  },
  { 
    id: 'prod-002', 
    name: 'ডেল XPS ১৫ ল্যাপটপ', 
    category: 'ইলেকট্রনিক্স', 
    views: 3200, 
    sales: 18, 
    revenue: '২,২৫,০০০ ৳', 
    conversionRate: '0.56%',
    rating: 4.5,
    reviews: 20
  },
  { 
    id: 'serv-001', 
    name: 'হোম ক্লিনিং সার্ভিস', 
    category: 'সার্ভিস', 
    views: 2800, 
    sales: 95, 
    revenue: '১,৪২,৫০০ ৳', 
    conversionRate: '3.39%',
    rating: 4.7,
    reviews: 28
  },
  { 
    id: 'dc-001', 
    name: 'ওয়েব ডেভেলপমেন্ট মাস্টারক্লাস', 
    category: 'ডিজিটাল কন্টেন্ট', 
    views: 3800, 
    sales: 143, 
    revenue: '৭,১৫,০০০ ৳', 
    conversionRate: '3.76%',
    rating: 4.8,
    reviews: 52
  },
  { 
    id: 'rent-001', 
    name: 'ক্যাম্পিং গিয়ার সেট', 
    category: 'রেন্টাল', 
    views: 1800, 
    sales: 56, 
    revenue: '১,১২,০০০ ৳', 
    conversionRate: '3.11%',
    rating: 4.2,
    reviews: 15
  }
];

const MOCK_COMMISSION_DATA = [
  { 
    id: 'comm-001', 
    category: 'ইলেকট্রনিক্স', 
    type: 'মার্কেটপ্লেস', 
    totalSales: '৬,৫২,৫০০ ৳', 
    commission: '৬৫,২৫০ ৳', 
    rate: '১০%', 
    sellers: 12, 
    transactions: 63 
  },
  { 
    id: 'comm-002', 
    category: 'সার্ভিস', 
    type: 'সার্ভিস', 
    totalSales: '১,৪২,৫০০ ৳', 
    commission: '১১,৪০০ ৳', 
    rate: '৮%', 
    sellers: 8, 
    transactions: 95 
  },
  { 
    id: 'comm-003', 
    category: 'ডিজিটাল কন্টেন্ট', 
    type: 'কন্টেন্ট', 
    totalSales: '৭,১৫,০০০ ৳', 
    commission: '৭১,৫০০ ৳', 
    rate: '১০%', 
    sellers: 5, 
    transactions: 143 
  },
  { 
    id: 'comm-004', 
    category: 'ফ্যাশন', 
    type: 'মার্কেটপ্লেস', 
    totalSales: '৩,৪৫,০০০ ৳', 
    commission: '৩৪,৫০০ ৳', 
    rate: '১০%', 
    sellers: 15, 
    transactions: 78 
  },
  { 
    id: 'comm-005', 
    category: 'রেন্টাল', 
    type: 'রেন্টাল', 
    totalSales: '১,১২,০০০ ৳', 
    commission: '৮,৯৬০ ৳', 
    rate: '৮%', 
    sellers: 6, 
    transactions: 56 
  }
];

const MOCK_REPORTS = [
  {
    id: 'report-001',
    title: 'মাসিক সেলস রিপোর্ট - এপ্রিল ২০২৫',
    type: 'সেলস',
    format: 'PDF',
    createdBy: 'অ্যাডমিন',
    createdAt: '৫ মে, ২০২৫',
    size: '2.3 MB',
    downloadCount: 5
  },
  {
    id: 'report-002',
    title: 'ইউজার অ্যাক্টিভিটি রিপোর্ট - এপ্রিল ২০২৫',
    type: 'ইউজার',
    format: 'CSV',
    createdBy: 'অ্যাডমিন',
    createdAt: '৪ মে, ২০২৫',
    size: '1.8 MB',
    downloadCount: 3
  },
  {
    id: 'report-003',
    title: 'কমিশন রিপোর্ট - এপ্রিল ২০২৫',
    type: 'কমিশন',
    format: 'Excel',
    createdBy: 'অ্যাডমিন',
    createdAt: '৪ মে, ২০২৫',
    size: '1.5 MB',
    downloadCount: 4
  },
  {
    id: 'report-004',
    title: 'প্রোডাক্ট পারফরম্যান্স রিপোর্ট - এপ্রিল ২০২৫',
    type: 'পারফরম্যান্স',
    format: 'PDF',
    createdBy: 'অ্যাডমিন',
    createdAt: '৩ মে, ২০২৫',
    size: '3.2 MB',
    downloadCount: 7
  },
  {
    id: 'report-005',
    title: 'রিফান্ড এবং ডিসপিউট রিপোর্ট - এপ্রিল ২০২৫',
    type: 'রিফান্ড',
    format: 'Excel',
    createdBy: 'অ্যাডমিন',
    createdAt: '২ মে, ২০২৫',
    size: '1.2 MB',
    downloadCount: 2
  }
];

const ReportManagement: React.FC = () => {
  const { toast } = useToast();
  const [salesStats, setSalesStats] = useState(MOCK_SALES_STATS);
  const [userActivities, setUserActivities] = useState(MOCK_USER_ACTIVITIES);
  const [productPerformance, setProductPerformance] = useState(MOCK_PRODUCT_PERFORMANCE);
  const [commissionData, setCommissionData] = useState(MOCK_COMMISSION_DATA);
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('last7days');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    title: '',
    type: '',
    format: 'PDF',
    dateRange: 'last30days'
  });

  // রিপোর্ট ফিল্টারিং
  const filteredReports = reports.filter(report => {
    // সার্চ ফিল্টার
    return report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.type.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // নতুন রিপোর্ট জেনারেট করা
  const handleGenerateReport = () => {
    if (newReport.title.trim() && newReport.type) {
      const today = '৮ মে, ২০২৫';
      const newReportItem = {
        id: `report-${reports.length + 1}`,
        title: newReport.title,
        type: newReport.type,
        format: newReport.format,
        createdBy: 'অ্যাডমিন',
        createdAt: today,
        size: '2.1 MB',
        downloadCount: 0
      };
      
      setReports([newReportItem, ...reports]);
      setNewReport({
        title: '',
        type: '',
        format: 'PDF',
        dateRange: 'last30days'
      });
      setIsCreateReportOpen(false);
      
      toast({
        title: "রিপোর্ট জেনারেট হয়েছে",
        description: `"${newReport.title}" সফলভাবে জেনারেট হয়েছে।`,
      });
    }
  };

  // রিপোর্ট ডাউনলোড করা
  const handleDownloadReport = (reportId: string) => {
    setReports(reports.map(report => 
      report.id === reportId ? { ...report, downloadCount: report.downloadCount + 1 } : report
    ));
    
    toast({
      title: "রিপোর্ট ডাউনলোড হচ্ছে",
      description: "আপনার রিপোর্ট ডাউনলোড শুরু হয়েছে।",
    });
  };

  // রিপোর্ট ডিলিট করা
  const handleDeleteReport = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId));
    
    toast({
      title: "রিপোর্ট ডিলিট হয়েছে",
      description: "রিপোর্ট সফলভাবে ডিলিট করা হয়েছে।",
    });
  };

  // রিপোর্ট আইকন রেন্ডারিং
  const renderReportIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return <FilePdf className="h-6 w-6 text-red-500" />;
      case 'CSV':
        return <FileText2 className="h-6 w-6 text-green-500" />;
      case 'Excel':
        return <FileSpreadsheet className="h-6 w-6 text-blue-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  // ডেট রেঞ্জ ফরম্যাট
  const getDateRangeLabel = (range: string) => {
    switch (range) {
      case 'today':
        return 'আজ';
      case 'yesterday':
        return 'গতকাল';
      case 'last7days':
        return 'গত ৭ দিন';
      case 'last30days':
        return 'গত ৩০ দিন';
      case 'thisMonth':
        return 'এই মাস';
      case 'lastMonth':
        return 'গত মাস';
      case 'thisYear':
        return 'এই বছর';
      case 'custom':
        return 'কাস্টম রেঞ্জ';
      default:
        return 'সব সময়';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">রিপোর্ট ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">বিভিন্ন রিপোর্ট জেনারেট, দেখা এবং পরিচালনা করুন</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="সময়কাল" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">আজ</SelectItem>
              <SelectItem value="yesterday">গতকাল</SelectItem>
              <SelectItem value="last7days">গত ৭ দিন</SelectItem>
              <SelectItem value="last30days">গত ৩০ দিন</SelectItem>
              <SelectItem value="thisMonth">এই মাস</SelectItem>
              <SelectItem value="lastMonth">গত মাস</SelectItem>
              <SelectItem value="thisYear">এই বছর</SelectItem>
              <SelectItem value="custom">কাস্টম রেঞ্জ</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsCreateReportOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            রিপোর্ট জেনারেট
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="sales">সেলস রিপোর্ট</TabsTrigger>
          <TabsTrigger value="user">ইউজার অ্যাকটিভিটি</TabsTrigger>
          <TabsTrigger value="performance">পারফরম্যান্স</TabsTrigger>
          <TabsTrigger value="commission">কমিশন</TabsTrigger>
          <TabsTrigger value="top-items">টপ আইটেম</TabsTrigger>
          <TabsTrigger value="reports">জেনারেটেড রিপোর্ট</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>সেলস রিপোর্ট - {getDateRangeLabel(dateRange)}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* সামারি স্ট্যাটস */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {salesStats.reduce((sum, stat) => sum + stat.total, 0).toLocaleString('bn-BD')} ৳
                  </div>
                  <div className="text-sm text-muted-foreground">মোট রেভিনিউ</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {salesStats.reduce((sum, stat) => sum + stat.orders, 0)}টি
                  </div>
                  <div className="text-sm text-muted-foreground">মোট অর্ডার</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(salesStats.reduce((sum, stat) => sum + stat.total, 0) / salesStats.reduce((sum, stat) => sum + stat.orders, 0)).toLocaleString('bn-BD')} ৳
                  </div>
                  <div className="text-sm text-muted-foreground">গড় অর্ডার মূল্য</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {Math.round(salesStats.reduce((sum, stat) => sum + stat.total, 0) * 0.1).toLocaleString('bn-BD')} ৳
                  </div>
                  <div className="text-sm text-muted-foreground">মোট প্রফিট</div>
                </div>
              </div>
              
              {/* রেভিনিউ চার্ট */}
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-4">দৈনিক রেভিনিউ ট্রেন্ড</h3>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                  <BarChart className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">এখানে রেভিনিউ চার্ট দেখানো হবে</p>
                </div>
              </div>
              
              {/* সেলস ডাটা টেবিল */}
              <div>
                <h3 className="font-medium mb-4">দৈনিক সেলস ডাটা</h3>
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium">তারিখ</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">অর্ডার</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">মার্কেটপ্লেস</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">সার্ভিস</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">ডিজিটাল</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">মোট</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salesStats.map((stat, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 align-middle font-medium">{stat.date}</td>
                          <td className="p-4 align-middle text-right">{stat.orders}টি</td>
                          <td className="p-4 align-middle text-right">{stat.marketplaceRevenue.toLocaleString('bn-BD')} ৳</td>
                          <td className="p-4 align-middle text-right">{stat.serviceRevenue.toLocaleString('bn-BD')} ৳</td>
                          <td className="p-4 align-middle text-right">{stat.digitalRevenue.toLocaleString('bn-BD')} ৳</td>
                          <td className="p-4 align-middle text-right font-bold">{stat.total.toLocaleString('bn-BD')} ৳</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t">
                      <tr>
                        <td className="p-4 align-middle font-bold">মোট</td>
                        <td className="p-4 align-middle text-right font-bold">{salesStats.reduce((sum, stat) => sum + stat.orders, 0)}টি</td>
                        <td className="p-4 align-middle text-right font-bold">{salesStats.reduce((sum, stat) => sum + stat.marketplaceRevenue, 0).toLocaleString('bn-BD')} ৳</td>
                        <td className="p-4 align-middle text-right font-bold">{salesStats.reduce((sum, stat) => sum + stat.serviceRevenue, 0).toLocaleString('bn-BD')} ৳</td>
                        <td className="p-4 align-middle text-right font-bold">{salesStats.reduce((sum, stat) => sum + stat.digitalRevenue, 0).toLocaleString('bn-BD')} ৳</td>
                        <td className="p-4 align-middle text-right font-bold">{salesStats.reduce((sum, stat) => sum + stat.total, 0).toLocaleString('bn-BD')} ৳</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              {/* ক্যাটাগরি ওয়াইজ সেলস */}
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">ক্যাটাগরি অনুযায়ী সেলস</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে পাই চার্ট দেখানো হবে</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">পেমেন্ট মেথড অনুযায়ী সেলস</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে পাই চার্ট দেখানো হবে</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">
                  <FilePdf className="h-4 w-4 mr-2" />
                  PDF এক্সপোর্ট
                </Button>
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel এক্সপোর্ট
                </Button>
                <Button variant="outline">
                  <FileText2 className="h-4 w-4 mr-2" />
                  CSV এক্সপোর্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ইউজার অ্যাকটিভিটি রিপোর্ট - {getDateRangeLabel(dateRange)}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* সামারি স্ট্যাটস */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {userActivities[userActivities.length - 1].totalUsers.toLocaleString('bn-BD')}
                  </div>
                  <div className="text-sm text-muted-foreground">মোট ইউজার</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {userActivities.reduce((sum, stat) => sum + stat.newUsers, 0).toLocaleString('bn-BD')}
                  </div>
                  <div className="text-sm text-muted-foreground">নতুন ইউজার</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {userActivities[userActivities.length - 1].activeUsers.toLocaleString('bn-BD')}
                  </div>
                  <div className="text-sm text-muted-foreground">সক্রিয় ইউজার</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {userActivities[userActivities.length - 1].engagement}
                  </div>
                  <div className="text-sm text-muted-foreground">এনগেজমেন্ট রেট</div>
                </div>
              </div>
              
              {/* ইউজার ট্রেন্ড চার্ট */}
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-4">ইউজার গ্রোথ ট্রেন্ড</h3>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                  <TrendingUp className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">এখানে ইউজার ট্রেন্ড চার্ট দেখানো হবে</p>
                </div>
              </div>
              
              {/* ইউজার ডাটা টেবিল */}
              <div>
                <h3 className="font-medium mb-4">দৈনিক ইউজার অ্যাকটিভিটি ডাটা</h3>
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="h-12 px-4 text-left align-middle font-medium">তারিখ</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">নতুন ইউজার</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">সক্রিয় ইউজার</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">মোট ইউজার</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">এনগেজমেন্ট</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userActivities.map((stat, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 align-middle font-medium">{stat.date}</td>
                          <td className="p-4 align-middle text-right">{stat.newUsers}জন</td>
                          <td className="p-4 align-middle text-right">{stat.activeUsers}জন</td>
                          <td className="p-4 align-middle text-right">{stat.totalUsers}জন</td>
                          <td className="p-4 align-middle text-right">{stat.engagement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* ডিভাইস এবং সোর্স অ্যানালিটিক্স */}
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">ডিভাইস অনুযায়ী ইউজার</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে পাই চার্ট দেখানো হবে</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">ট্রাফিক সোর্স</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে পাই চার্ট দেখানো হবে</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">
                  <FilePdf className="h-4 w-4 mr-2" />
                  PDF এক্সপোর্ট
                </Button>
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel এক্সপোর্ট
                </Button>
                <Button variant="outline">
                  <FileText2 className="h-4 w-4 mr-2" />
                  CSV এক্সপোর্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>প্রোডাক্ট ও সার্ভিস পারফরম্যান্স - {getDateRangeLabel(dateRange)}</CardTitle>
              <div className="flex gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="সব ক্যাটাগরি" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                    <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                    <SelectItem value="সার্ভিস">সার্ভিস</SelectItem>
                    <SelectItem value="ডিজিটাল কন্টেন্ট">ডিজিটাল কন্টেন্ট</SelectItem>
                    <SelectItem value="রেন্টাল">রেন্টাল</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {/* পারফরম্যান্স মেট্রিক্স */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {productPerformance.reduce((sum, product) => sum + product.views, 0).toLocaleString('bn-BD')}
                  </div>
                  <div className="text-sm text-muted-foreground">মোট ভিউ</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {productPerformance.reduce((sum, product) => sum + product.sales, 0).toLocaleString('bn-BD')}
                  </div>
                  <div className="text-sm text-muted-foreground">মোট বিক্রয়</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {(productPerformance.reduce((sum, product) => sum + product.sales, 0) / productPerformance.reduce((sum, product) => sum + product.views, 0) * 100).toFixed(2)}%
                  </div>
                  <div className="text-sm text-muted-foreground">কনভার্শন রেট</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {(productPerformance.reduce((sum, product) => sum + product.rating, 0) / productPerformance.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">গড় রেটিং</div>
                </div>
              </div>
              
              {/* প্রোডাক্ট পারফরম্যান্স টেবিল */}
              <div className="rounded-md border mb-6">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">প্রোডাক্ট/সার্ভিস</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">ক্যাটাগরি</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">ভিউ</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">সেলস</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">কনভার্শন</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">রেটিং</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">রেভিনিউ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPerformance
                      .filter(product => categoryFilter === 'all' || product.category === categoryFilter)
                      .map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4 align-middle font-medium">{product.name}</td>
                        <td className="p-4 align-middle">{product.category}</td>
                        <td className="p-4 align-middle text-right">{product.views.toLocaleString('bn-BD')}</td>
                        <td className="p-4 align-middle text-right">{product.sales}টি</td>
                        <td className="p-4 align-middle text-right">{product.conversionRate}</td>
                        <td className="p-4 align-middle text-right">{product.rating} ({product.reviews})</td>
                        <td className="p-4 align-middle text-right font-medium">{product.revenue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* পারফরম্যান্স চার্ট */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">সেলস বাই ক্যাটাগরি</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে পাই চার্ট দেখানো হবে</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">টপ পারফরমিং আইটেম</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <BarChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে বার চার্ট দেখানো হবে</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">
                  <FilePdf className="h-4 w-4 mr-2" />
                  PDF এক্সপোর্ট
                </Button>
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel এক্সপোর্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>কমিশন রিপোর্ট - {getDateRangeLabel(dateRange)}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* কমিশন সামারি */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {commissionData.reduce((sum, data) => {
                      const commissionNumber = parseInt(data.commission.replace(/[^\d]/g, ''));
                      return sum + commissionNumber;
                    }, 0).toLocaleString('bn-BD')} ৳
                  </div>
                  <div className="text-sm text-muted-foreground">মোট কমিশন</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {commissionData.reduce((sum, data) => sum + data.transactions, 0).toLocaleString('bn-BD')}
                  </div>
                  <div className="text-sm text-muted-foreground">মোট ট্রানজেকশন</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {commissionData.reduce((sum, data) => sum + data.sellers, 0).toLocaleString('bn-BD')}
                  </div>
                  <div className="text-sm text-muted-foreground">সক্রিয় বিক্রেতা</div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-3xl font-bold text-primary">
                    {(commissionData.reduce((sum, data) => {
                      const commissionNumber = parseInt(data.commission.replace(/[^\d]/g, ''));
                      return sum + commissionNumber;
                    }, 0) / commissionData.reduce((sum, data) => {
                      const totalSalesNumber = parseInt(data.totalSales.replace(/[^\d]/g, ''));
                      return sum + totalSalesNumber;
                    }, 0) * 100).toFixed(2)}%
                  </div>
                  <div className="text-sm text-muted-foreground">গড় কমিশন রেট</div>
                </div>
              </div>
              
              {/* কমিশন ডাটা টেবিল */}
              <div className="rounded-md border mb-6">
                <table className="w-full caption-bottom text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium">ক্যাটাগরি</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">টাইপ</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">মোট সেলস</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">কমিশন</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">রেট</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">বিক্রেতা</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">ট্রানজেকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionData.map((data, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4 align-middle font-medium">{data.category}</td>
                        <td className="p-4 align-middle">{data.type}</td>
                        <td className="p-4 align-middle text-right">{data.totalSales}</td>
                        <td className="p-4 align-middle text-right font-medium">{data.commission}</td>
                        <td className="p-4 align-middle text-right">{data.rate}</td>
                        <td className="p-4 align-middle text-right">{data.sellers}</td>
                        <td className="p-4 align-middle text-right">{data.transactions}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t">
                    <tr>
                      <td className="p-4 align-middle font-bold" colSpan={2}>মোট</td>
                      <td className="p-4 align-middle text-right font-bold">
                        {commissionData.reduce((sum, data) => {
                          const totalSalesNumber = parseInt(data.totalSales.replace(/[^\d]/g, ''));
                          return sum + totalSalesNumber;
                        }, 0).toLocaleString('bn-BD')} ৳
                      </td>
                      <td className="p-4 align-middle text-right font-bold">
                        {commissionData.reduce((sum, data) => {
                          const commissionNumber = parseInt(data.commission.replace(/[^\d]/g, ''));
                          return sum + commissionNumber;
                        }, 0).toLocaleString('bn-BD')} ৳
                      </td>
                      <td className="p-4 align-middle text-right"></td>
                      <td className="p-4 align-middle text-right font-bold">{commissionData.reduce((sum, data) => sum + data.sellers, 0)}</td>
                      <td className="p-4 align-middle text-right font-bold">{commissionData.reduce((sum, data) => sum + data.transactions, 0)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {/* কমিশন চার্ট */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">ক্যাটাগরি অনুযায়ী কমিশন</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <PieChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে পাই চার্ট দেখানো হবে</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">কমিশন ট্রেন্ড (৭ দিন)</h3>
                  <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                    <BarChart className="h-16 w-16 text-muted-foreground" />
                    <p className="ml-4 text-muted-foreground">এখানে লাইন চার্ট দেখানো হবে</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline">
                  <FilePdf className="h-4 w-4 mr-2" />
                  PDF এক্সপোর্ট
                </Button>
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel এক্সপোর্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="top-items" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>টপ সেলিং আইটেম - {getDateRangeLabel(dateRange)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">টপ সেলিং প্রোডাক্ট</h3>
                  <ul className="space-y-3">
                    {productPerformance
                      .filter(product => product.category === "ইলেকট্রনিক্স")
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 5)
                      .map((product, index) => (
                        <li key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-md">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{product.sales}টি</div>
                            <div className="text-sm text-muted-foreground">{product.revenue}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">টপ সেলিং সার্ভিস</h3>
                  <ul className="space-y-3">
                    {productPerformance
                      .filter(product => product.category === "সার্ভিস")
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 5)
                      .map((product, index) => (
                        <li key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-md">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{product.sales}টি</div>
                            <div className="text-sm text-muted-foreground">{product.revenue}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">টপ ডিজিটাল কন্টেন্ট</h3>
                  <ul className="space-y-3">
                    {productPerformance
                      .filter(product => product.category === "ডিজিটাল কন্টেন্ট")
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 5)
                      .map((product, index) => (
                        <li key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-md">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{product.sales}টি</div>
                            <div className="text-sm text-muted-foreground">{product.revenue}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">টপ রেন্টাল আইটেম</h3>
                  <ul className="space-y-3">
                    {productPerformance
                      .filter(product => product.category === "রেন্টাল")
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 5)
                      .map((product, index) => (
                        <li key={index} className="flex items-center justify-between p-3 bg-secondary/10 rounded-md">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{product.sales}টি</div>
                            <div className="text-sm text-muted-foreground">{product.revenue}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-4">বেস্ট সেলার ক্যাটাগরি</h3>
                <div className="h-64 flex items-center justify-center bg-slate-50 rounded-md">
                  <BarChart className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">এখানে বার চার্ট দেখানো হবে</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <FilePdf className="h-4 w-4 mr-2" />
                  PDF এক্সপোর্ট
                </Button>
                <Button variant="outline">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel এক্সপোর্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>জেনারেটেড রিপোর্ট</CardTitle>
              <Button size="sm" onClick={() => setIsCreateReportOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                নতুন রিপোর্ট জেনারেট
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="রিপোর্ট খুঁজুন..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                {filteredReports.length > 0 ? filteredReports.map(report => (
                  <div key={report.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center bg-secondary/20">
                        {renderReportIcon(report.format)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{report.title}</h3>
                            <div className="text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 mt-1">
                              <span>ফরম্যাট: {report.format}</span>
                              <span>টাইপ: {report.type}</span>
                              <span>সাইজ: {report.size}</span>
                              <span>তৈরি: {report.createdAt}</span>
                            </div>
                          </div>
                          
                          <Badge variant="secondary">
                            {report.downloadCount} ডাউনলোড
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        ডাউনলোড
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        প্রিভিউ
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোনো রিপোর্ট পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন রিপোর্ট জেনারেট করুন</DialogTitle>
                <DialogDescription>
                  রিপোর্টের বিবরণ দিন এবং জেনারেট করুন।
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="report-title">রিপোর্ট টাইটেল</Label>
                  <Input 
                    id="report-title" 
                    placeholder="রিপোর্ট টাইটেল লিখুন" 
                    value={newReport.title}
                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-type">রিপোর্ট টাইপ</Label>
                  <Select 
                    value={newReport.type} 
                    onValueChange={(value) => setNewReport({ ...newReport, type: value })}
                  >
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="টাইপ সিলেক্ট করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="সেলস">সেলস রিপোর্ট</SelectItem>
                      <SelectItem value="ইউজার">ইউজার রিপোর্ট</SelectItem>
                      <SelectItem value="পারফরম্যান্স">পারফরম্যান্স রিপোর্ট</SelectItem>
                      <SelectItem value="কমিশন">কমিশন রিপোর্ট</SelectItem>
                      <SelectItem value="রিফান্ড">রিফান্ড রিপোর্ট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-format">ফরম্যাট</Label>
                  <Select 
                    value={newReport.format} 
                    onValueChange={(value) => setNewReport({ ...newReport, format: value })}
                  >
                    <SelectTrigger id="report-format">
                      <SelectValue placeholder="ফরম্যাট সিলেক্ট করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="CSV">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-date-range">ডেট রেঞ্জ</Label>
                  <Select 
                    value={newReport.dateRange} 
                    onValueChange={(value) => setNewReport({ ...newReport, dateRange: value })}
                  >
                    <SelectTrigger id="report-date-range">
                      <SelectValue placeholder="ডেট রেঞ্জ সিলেক্ট করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">আজ</SelectItem>
                      <SelectItem value="yesterday">গতকাল</SelectItem>
                      <SelectItem value="last7days">গত ৭ দিন</SelectItem>
                      <SelectItem value="last30days">গত ৩০ দিন</SelectItem>
                      <SelectItem value="thisMonth">এই মাস</SelectItem>
                      <SelectItem value="lastMonth">গত মাস</SelectItem>
                      <SelectItem value="thisYear">এই বছর</SelectItem>
                      <SelectItem value="custom">কাস্টম রেঞ্জ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateReportOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleGenerateReport}>
                  জেনারেট করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportManagement;
