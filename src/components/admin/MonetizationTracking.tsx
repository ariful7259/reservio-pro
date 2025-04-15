import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Calendar, 
  Filter,
  ShoppingBag,
  Building,
  Truck,
  BookOpen,
  Users,
  CreditCard,
  Zap,
  AlarmClock,
  Bell,
  Save,
  Share2
} from 'lucide-react';

// Note: In a real application, these would be actual chart components from recharts
// For this implementation, we're just showing placeholders
const BarChart = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
    <div className="text-center">
      <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">বার চার্ট প্লেসহোল্ডার</p>
      {children}
    </div>
  </div>
);

const AreaChart = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
    <div className="text-center">
      <LineChart className="mx-auto h-8 w-8 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">এরিয়া চার্ট প্লেসহোল্ডার</p>
      {children}
    </div>
  </div>
);

const PieChart = ({ children }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-md">
    <div className="text-center">
      <PieChartIcon className="mx-auto h-8 w-8 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">পাই চার্ট প্লেসহোল্ডার</p>
      {children}
    </div>
  </div>
);

interface RevenueData {
  date: string;
  marketplace: number;
  services: number;
  rentals: number;
  digital: number;
  premium: number;
  total: number;
}

interface FeaturePerformance {
  id: string;
  name: string;
  revenue: number;
  growth: number;
  conversionRate: number;
  userCount: number;
}

interface TopPerformer {
  id: string;
  name: string;
  type: string;
  revenue: number;
  users: number;
  conversionRate: number;
}

interface MonetizationRule {
  id: string;
  name: string;
  type: string;
  value: number;
  active: boolean;
  targetFeature: string;
  performance: 'high' | 'medium' | 'low';
  revenueGenerated: number;
}

const MonetizationTracking: React.FC = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('month');
  const [compareRange, setCompareRange] = useState(false);
  
  // মক ডাটা - আয় ডাটা (আসল ইমপ্লিমেন্টেশনে এপিআই থেকে আসবে)
  const [revenueData, setRevenueData] = useState<RevenueData[]>([
    { date: '১ জুন', marketplace: 12500, services: 8700, rentals: 5400, digital: 3200, premium: 1800, total: 31600 },
    { date: '২ জুন', marketplace: 11800, services: 9200, rentals: 4900, digital: 2800, premium: 1700, total: 30400 },
    { date: '৩ জুন', marketplace: 13200, services: 9600, rentals: 5300, digital: 3500, premium: 1900, total: 33500 },
    { date: '৪ জুন', marketplace: 13800, services: 10200, rentals: 5600, digital: 3800, premium: 2100, total: 35500 },
    { date: '৫ জুন', marketplace: 14500, services: 9800, rentals: 6200, digital: 4200, premium: 2300, total: 37000 },
    { date: '৬ জুন', marketplace: 15200, services: 10500, rentals: 6800, digital: 4500, premium: 2500, total: 39500 },
    { date: '৭ জুন', marketplace: 16000, services: 11200, rentals: 7200, digital: 4800, premium: 2700, total: 41900 },
  ]);
  
  // ফিচার পারফর্মেন্স ডাটা
  const [featurePerformance, setFeaturePerformance] = useState<FeaturePerformance[]>([
    { id: 'marketplace', name: 'মার্কেটপ্লেস', revenue: 450000, growth: 12.5, conversionRate: 3.8, userCount: 8500 },
    { id: 'services', name: 'সার্ভিস', revenue: 320000, growth: 15.2, conversionRate: 5.2, userCount: 6200 },
    { id: 'rentals', name: 'রেন্টাল', revenue: 280000, growth: 8.7, conversionRate: 4.1, userCount: 5100 },
    { id: 'digital', name: 'ডিজিটাল কন্টেন্ট', revenue: 150000, growth: 20.3, conversionRate: 2.9, userCount: 3800 },
    { id: 'premium', name: 'প্রিমিয়াম মেম্বারশিপ', revenue: 85000, growth: 25.6, conversionRate: 1.8, userCount: 2200 },
    { id: 'advertisements', name: 'বিজ্ঞাপন', revenue: 75000, growth: 5.4, conversionRate: 0.9, userCount: 12500 },
    { id: 'affiliates', name: 'অ্যাফিলিয়েট', revenue: 42000, growth: 18.9, conversionRate: 1.2, userCount: 1800 },
    { id: 'subscriptions', name: 'সাবস্ক্রিপশন', revenue: 68000, growth: 14.2, conversionRate: 3.5, userCount: 1500 },
  ]);
  
  // টপ পারফর্মার ডাটা
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([
    { id: 'p123', name: 'স্মার্টফোন রিপেয়ার', type: 'service', revenue: 42000, users: 850, conversionRate: 7.2 },
    { id: 'p234', name: 'ডিজাইনার সানগ্লাস', type: 'product', revenue: 38500, users: 1200, conversionRate: 5.8 },
    { id: 'p345', name: 'লাক্সারি অ্যাপার্টমেন্ট', type: 'rental', revenue: 35000, users: 450, conversionRate: 6.5 },
    { id: 'p456', name: 'ডিজিটাল মার্কেটিং কোর্স', type: 'digital', revenue: 28000, users: 320, conversionRate: 8.9 },
    { id: 'p567', name: 'ওয়েব ডেভেলপমেন্ট', type: 'service', revenue: 25500, users: 280, conversionRate: 7.8 },
  ]);
  
  // মোনিটাইজেশন রুল ডাটা
  const [monetizationRules, setMonetizationRules] = useState<MonetizationRule[]>([
    { id: 'r1', name: 'প্রিমিয়াম লিস্টিং', type: 'fee', value: 500, active: true, targetFeature: 'marketplace', performance: 'high', revenueGenerated: 125000 },
    { id: 'r2', name: 'সার্ভিস কমিশন', type: 'percentage', value: 10, active: true, targetFeature: 'services', performance: 'high', revenueGenerated: 95000 },
    { id: 'r3', name: 'ফিচার্ড রেন্টাল', type: 'fee', value: 1000, active: true, targetFeature: 'rentals', performance: 'medium', revenueGenerated: 65000 },
    { id: 'r4', name: 'ডিজিটাল কন্টেন্ট রয়্যালটি', type: 'percentage', value: 15, active: true, targetFeature: 'digital', performance: 'high', revenueGenerated: 58000 },
    { id: 'r5', name: 'প্রিমিয়াম মেম্বারশিপ', type: 'subscription', value: 699, active: true, targetFeature: 'premium', performance: 'medium', revenueGenerated: 85000 },
    { id: 'r6', name: 'অ্যাড ডিসপ্লে', type: 'cpm', value: 250, active: true, targetFeature: 'advertisements', performance: 'low', revenueGenerated: 45000 },
    { id: 'r7', name: 'অ্যাফিলিয়েট কমিশন', type: 'percentage', value: 5, active: true, targetFeature: 'affiliates', performance: 'medium', revenueGenerated: 32000 },
    { id: 'r8', name: 'সাবস্ক্রিপশন প্ল্যান', type: 'subscription', value: 299, active: false, targetFeature: 'subscriptions', performance: 'low', revenueGenerated: 18000 },
  ]);
  
  // রেভিনিউ ব্রেকডাউন
  const revenueBreakdown = [
    { name: 'মার্কেটপ্লেস', value: 450000, color: '#3B82F6' },
    { name: 'সার্ভিস', value: 320000, color: '#8B5CF6' },
    { name: 'রেন্টাল', value: 280000, color: '#10B981' },
    { name: 'ডিজিটাল কন্টেন্ট', value: 150000, color: '#F59E0B' },
    { name: 'প্রিমিয়াম মেম্বারশিপ', value: 85000, color: '#EC4899' },
    { name: 'অন্যান্য', value: 185000, color: '#6B7280' },
  ];
  
  const totalRevenue = revenueBreakdown.reduce((sum, item) => sum + item.value, 0);
  
  // সালেস চ্যানেল ব্রেকডাউন
  const channelBreakdown = [
    { name: 'অরগানিক সার্চ', value: 35 },
    { name: 'সোশ্যাল মিডিয়া', value: 25 },
    { name: 'ডাইরেক্ট', value: 20 },
    { name: 'রেফারাল', value: 15 },
    { name: 'ইমেইল মার্কেটিং', value: 5 },
  ];
  
  // রেভিনিউ ট্রেন্ড - মাসিক
  const monthlyRevenueData = [
    { month: 'জানুয়ারি', revenue: 580000 },
    { month: 'ফেব্রুয়ারি', revenue: 620000 },
    { month: 'মার্চ', revenue: 750000 },
    { month: 'এপ্রিল', revenue: 890000 },
    { month: 'মে', revenue: 980000 },
    { month: 'জুন', revenue: 1050000 },
  ];
  
  // রিপোর্ট ডাউনলোড ফাংশন
  const handleDownloadReport = () => {
    toast({
      title: "রিপোর্ট ডাউনলোড হচ্ছে",
      description: "আপনার মোনিটাইজেশন রিপোর্ট ডাউনলোড শুরু হবে।",
    });
  };
  
  // মোনিটাইজেশন রুল টগল ফাংশন
  const handleRuleToggle = (ruleId: string, active: boolean) => {
    setMonetizationRules(
      monetizationRules.map(rule => 
        rule.id === ruleId ? { ...rule, active } : rule
      )
    );
    
    toast({
      title: active ? "মোনিটাইজেশন রুল এনাবল করা হয়েছে" : "মোনিটাইজেশন রুল ডিজেবল করা হয়েছে",
      description: `রুল পরিবর্তন সফলভাবে সেভ করা হয়েছে।`,
    });
  };
  
  // মোনিটাইজেশন রুল আপডেট ফাংশন
  const handleUpdateRule = (ruleId: string, value: number) => {
    setMonetizationRules(
      monetizationRules.map(rule => 
        rule.id === ruleId ? { ...rule, value } : rule
      )
    );
  };
  
  // সেভ কনফিগারেশন ফাংশন
  const handleSaveConfig = () => {
    toast({
      title: "মোনিটাইজেশন কনফিগারেশন সেভ করা হয়েছে",
      description: "আপনার পরিবর্তন সফলভাবে সেভ করা হয়েছে।",
    });
  };
  
  // ফিচার আইকন রিটার্ন ফাংশন
  const getFeatureIcon = (featureId: string) => {
    switch (featureId) {
      case 'marketplace':
        return <ShoppingBag className="h-4 w-4" />;
      case 'services':
        return <Truck className="h-4 w-4" />;
      case 'rentals':
        return <Building className="h-4 w-4" />;
      case 'digital':
        return <BookOpen className="h-4 w-4" />;
      case 'premium':
        return <Users className="h-4 w-4" />;
      case 'advertisements':
        return <Bell className="h-4 w-4" />;
      case 'affiliates':
        return <Share2 className="h-4 w-4" />;
      case 'subscriptions':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };
  
  // মোনিটাইজেশন টাইপ টেক্সট রিটার্ন ফাংশন
  const getMonetizationTypeText = (type: string, value: number) => {
    switch (type) {
      case 'fee':
        return `ফিক্সড ফি: ৳${value}`;
      case 'percentage':
        return `কমিশন: ${value}%`;
      case 'subscription':
        return `সাবস্ক্রিপশন: ৳${value}/মাস`;
      case 'cpm':
        return `CPM: ৳${value}`;
      default:
        return `৳${value}`;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            <span>মোনিটাইজেশন ট্র্যাকিং এবং পারফরম্যান্স</span>
          </CardTitle>
          <CardDescription>
            আপনার মোনিটাইজেশন স্ট্রাটেজি এবং রাজস্ব আয়ের বিস্তারিত অ্যানালাইসিস।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">ড্যাশবোর্ড</TabsTrigger>
              <TabsTrigger value="features">ফিচার পারফরম্যান্স</TabsTrigger>
              <TabsTrigger value="rules">মোনিটাইজেশন রুলস</TabsTrigger>
              <TabsTrigger value="reports">রিপোর্টস</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Select
                    value={timeRange}
                    onValueChange={setTimeRange}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">সাপ্তাহিক</SelectItem>
                      <SelectItem value="month">মাসিক</SelectItem>
                      <SelectItem value="quarter">ত্রৈমাসিক</SelectItem>
                      <SelectItem value="year">বার্ষিক</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setCompareRange(!compareRange)}
                    className={compareRange ? "bg-blue-50" : ""}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    তুলনা করুন
                  </Button>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  রিপোর্ট ডাউনলোড
                </Button>
              </div>
              
              {/* মোট রাজস্ব সংক্ষিপ্ত বিবরণ */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">মোট রাজস্ব (জুন)</p>
                        <h3 className="text-2xl font-bold">৳ 14,70,000</h3>
                        <div className="flex items-center text-xs text-green-600">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+12.5% গত মাস থেকে</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">কনভার্সন রেট</p>
                        <h3 className="text-2xl font-bold">4.8%</h3>
                        <div className="flex items-center text-xs text-green-600">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+0.5% গত মাস থেকে</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">গড় অর্ডার ভ্যালু</p>
                        <h3 className="text-2xl font-bold">৳ 1,850</h3>
                        <div className="flex items-center text-xs text-red-600">
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                          <span>-2.3% গত মাস থেকে</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">সাবস্ক্রিপশন রেভিনিউ</p>
                        <h3 className="text-2xl font-bold">৳ 2,85,000</h3>
                        <div className="flex items-center text-xs text-green-600">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          <span>+18.2% গত মাস থেকে</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* রেভিনিউ ট্রেন্ড */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">রাজস্ব ট্রেন্ড</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80">
                    <AreaChart>
                      {/* Chart would render here in a real implementation */}
                      <div></div>
                    </AreaChart>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-2 justify-center">
                    {[
                      {color: "#3B82F6", label: "মার্কেটপ্লেস"},
                      {color: "#8B5CF6", label: "সার্ভিস"},
                      {color: "#10B981", label: "রেন্টাল"},
                      {color: "#F59E0B", label: "ডিজিটাল"},
                      {color: "#EC4899", label: "প্রিমিয়াম"}
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">রাজস্ব ব্রেকডাউন</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-center mb-4">
                      <div className="relative w-48 h-48">
                        <PieChart>
                          {/* Chart would render here in a real implementation */}
                          <div></div>
                        </PieChart>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-2xl font-bold">৳ 14.7L</div>
                          <div className="text-xs text-muted-foreground">মোট রাজস্ব</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {revenueBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <div className="flex justify-between w-full text-sm">
                            <span>{item.name}</span>
                            <div className="flex items-center gap-2">
                              <span>৳ {(item.value / 1000).toFixed(1)}K</span>
                              <span className="text-muted-foreground text-xs">
                                ({Math.round(item.value / totalRevenue * 100)}%)
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">টপ পারফর্মিং আইটেম</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4 text-sm font-medium">আইটেম</th>
                            <th className="text-left py-2 px-4 text-sm font-medium">ধরন</th>
                            <th className="text-right py-2 px-4 text-sm font-medium">রাজস্ব</th>
                            <th className="text-right py-2 px-4 text-sm font-medium">কনভার্সন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topPerformers.map((item, index) => (
                            <tr 
                              key={index} 
                              className={index < topPerformers.length - 1 ? "border-b hover:bg-gray-50" : "hover:bg-gray-50"}
                            >
                              <td className="py-3 px-4 text-sm">{item.name}</td>
                              <td className="py-3 px-4 text-sm">
                                <Badge variant="secondary" className="font-normal">
                                  {item.type}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-sm text-right font-medium">
                                ৳ {item.revenue.toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-sm text-right">
                                <span className="text-green-600 font-medium">{item.conversionRate}%</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">মাসিক রাজস্ব প্রবৃদ্ধি</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-64">
                    <BarChart>
                      {/* Chart would render here in a real implementation */}
                      <div></div>
                    </BarChart>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div>
                      <div className="text-sm text-muted-foreground">মাসিক গড় বৃদ্ধি</div>
                      <div className="text-xl font-bold">12.5%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">এ বছরের ট্রেন্ড</div>
                      <div className="text-xl font-bold text-green-600">উর্ধ্বমুখী</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">বর্তমান টার্গেট</div>
                      <div className="text-xl font-bold">৳ 15L / মাস</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {featurePerformance.slice(0, 4).map((feature, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          {getFeatureIcon(feature.id)}
                        </div>
                        <h3 className="font-medium">{feature.name}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">রাজস্ব</span>
                          <span className="font-medium">৳ {(feature.revenue / 1000).toFixed(0)}K</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">প্রবৃদ্ধি</span>
                          <span className={feature.growth > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                            {feature.growth > 0 ? "+" : ""}{feature.growth}%
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">কনভার্সন রেট</span>
                          <span className="font-medium">{feature.conversionRate}%</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">ব্যবহারকারী</span>
                          <span className="font-medium">{feature.userCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">সকল ফিচারের পারফরম্যান্স</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 text-sm font-medium">ফিচার</th>
                          <th className="text-right py-3 px-4 text-sm font-medium">রাজস্ব</th>
                          <th className="text-right py-3 px-4 text-sm font-medium">প্রবৃদ্ধি</th>
                          <th className="text-right py-3 px-4 text-sm font-medium">কনভার্সন</th>
                          <th className="text-right py-3 px-4 text-sm font-medium">ব্যবহারকারী</th>
                          <th className="text-right py-3 px-4 text-sm font-medium">ROI</th>
                        </tr>
                      </thead>
                      <tbody>
                        {featurePerformance.map((feature, index) => (
                          <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                                  {getFeatureIcon(feature.id)}
                                </div>
                                <span className="font-medium">{feature.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-medium">৳ {(feature.revenue / 1000).toFixed(0)}K</td>
                            <td className="py-3 px-4 text-right">
                              <span className={feature.growth > 0 ? "text-green-600" : "text-red-600"}>
                                {feature.growth > 0 ? "+" : ""}{feature.growth}%
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">{feature.conversionRate}%</td>
                            <td className="py-3 px-4 text-right">{feature.userCount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <div 
                                  className={`h-2 rounded-full ${
                                    feature.growth > 15 ? "bg-green-500" : 
                                    feature.growth > 8 ? "bg-blue-500" : 
                                    feature.growth > 0 ? "bg-amber-500" : "bg-red-500"
                                  }`}
                                  style={{ width: `${Math.min(feature.growth * 2, 40)}px` }}
                                ></div>
                                <span className="text-xs">
                                  {feature.growth > 15 ? "High" : 
                                   feature.growth > 8 ? "Good" : 
                                   feature.growth > 0 ? "Fair" : "Low"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">কনভার্সন ফানেল</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="relative pt-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>ভিজিটর</span>
                          <span className="font-medium">56,890</span>
                        </div>
                        <div className="overflow-hidden h-4 mb-2 text-xs flex rounded bg-blue-50">
                          <div style={{ width: "100%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
