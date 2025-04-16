
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Store, 
  Building,
  Wrench, 
  Video,
  ShoppingCart,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Clock,
  Eye,
  Package,
  Star
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// সমন্বিত ড্যাশবোর্ড নমুনা ডেটা
const revenueData = [
  { name: 'জানু', marketplace: 4000, rental: 2400, service: 2400, content: 1000 },
  { name: 'ফেব্রু', marketplace: 3000, rental: 1398, service: 2210, content: 800 },
  { name: 'মার্চ', marketplace: 2000, rental: 9800, service: 2290, content: 1200 },
  { name: 'এপ্রিল', marketplace: 2780, rental: 3908, service: 2000, content: 1500 },
  { name: 'মে', marketplace: 1890, rental: 4800, service: 2181, content: 2000 },
  { name: 'জুন', marketplace: 2390, rental: 3800, service: 2500, content: 1700 },
  { name: 'জুলাই', marketplace: 3490, rental: 4300, service: 2100, content: 1400 },
];

const serviceDistribution = [
  { name: 'মার্কেটপ্লেস', value: 40 },
  { name: 'রেন্টাল', value: 30 },
  { name: 'সার্ভিস', value: 20 },
  { name: 'কন্টেন্ট', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const allOrders = [
  { id: 'ORD-001', type: 'marketplace', status: 'পেন্ডিং', customer: 'রহিম হোসেন', amount: '৳ 1,250', date: '১৫ মিনিট আগে' },
  { id: 'RENT-003', type: 'rental', status: 'অনুমোদিত', customer: 'ফাতেমা বেগম', amount: '৳ 5,000', date: '১ ঘন্টা আগে' },
  { id: 'SRV-007', type: 'service', status: 'সম্পন্ন', customer: 'করিম আলী', amount: '৳ 800', date: '৪ ঘন্টা আগে' },
  { id: 'CNT-002', type: 'content', status: 'পেমেন্ট বাকি', customer: 'আমিনা খাতুন', amount: '৳ 350', date: '১ দিন আগে' },
  { id: 'ORD-015', type: 'marketplace', status: 'ডেলিভারি', customer: 'জাকির হোসেন', amount: '৳ 2,740', date: '১ দিন আগে' },
];

const orderTypeIcons = {
  marketplace: <ShoppingCart className="h-4 w-4 text-blue-500" />,
  rental: <Building className="h-4 w-4 text-green-500" />,
  service: <Wrench className="h-4 w-4 text-yellow-500" />,
  content: <Video className="h-4 w-4 text-purple-500" />,
};

const IntegratedDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">সমন্বিত ড্যাশবোর্ড</h1>
        <Button size="sm" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          আজ, ১৭ এপ্রিল ২০২৫
        </Button>
      </div>
      
      {/* সারাংশ কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard 
          title="মোট আয়"
          value="৳ ১৫৩,৪৫০"
          trend={{ value: 12, positive: true }}
          period="গত মাস থেকে"
          icon={<DollarSign />}
          color="blue"
        />
        
        <SummaryCard 
          title="মোট অর্ডার/বুকিং"
          value="৩৮৫"
          trend={{ value: 8, positive: true }}
          period="গত সপ্তাহ থেকে"
          icon={<ShoppingCart />}
          color="emerald"
        />
        
        <SummaryCard 
          title="গ্রাহক সংখ্যা"
          value="১,২৩৫"
          trend={{ value: 15, positive: true }}
          period="গত মাস থেকে"
          icon={<Users />}
          color="violet"
        />
        
        <SummaryCard 
          title="গড় রেটিং"
          value="৪.৭"
          trend={{ value: 0.2, positive: true }}
          period="গত মাস থেকে"
          icon={<Star />}
          color="amber"
        />
      </div>
      
      {/* আয় চার্ট */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">সামগ্রিক আয়ের ট্রেন্ড</h2>
            <Tabs defaultValue="monthly">
              <TabsList className="grid grid-cols-3 w-[250px]">
                <TabsTrigger value="weekly">সাপ্তাহিক</TabsTrigger>
                <TabsTrigger value="monthly">মাসিক</TabsTrigger>
                <TabsTrigger value="yearly">বার্ষিক</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="marketplace" name="মার্কেটপ্লেস" fill="#0088FE" />
                <Bar dataKey="rental" name="রেন্টাল" fill="#00C49F" />
                <Bar dataKey="service" name="সার্ভিস" fill="#FFBB28" />
                <Bar dataKey="content" name="কন্টেন্ট" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* সার্ভিস এনালিটিক্স বিভাগ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-medium mb-4">সাম্প্রতিক অর্ডার ও বুকিং</h2>
            <div className="space-y-4">
              {allOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                      {orderTypeIcons[order.type as keyof typeof orderTypeIcons]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{order.id}</p>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            order.status === 'পেন্ডিং' && 'bg-yellow-100 text-yellow-800 border-yellow-200',
                            order.status === 'অনুমোদিত' && 'bg-blue-100 text-blue-800 border-blue-200',
                            order.status === 'সম্পন্ন' && 'bg-green-100 text-green-800 border-green-200',
                            order.status === 'পেমেন্ট বাকি' && 'bg-red-100 text-red-800 border-red-200',
                            order.status === 'ডেলিভারি' && 'bg-purple-100 text-purple-800 border-purple-200',
                          )}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      {order.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                সব দেখুন
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-medium mb-4">সার্ভিস বিভাজন</h2>
            <div className="h-64 my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {serviceDistribution.map((service, index) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{service.name}</span>
                  </div>
                  <span className="font-medium">{service.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* কার্যকলাপ ট্র্যাকিং */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-medium mb-4">উন্নতির সুযোগ</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">রেন্টাল সার্ভিসে অনুমোদন সময় কমানো</h3>
                    <p className="text-sm text-gray-500 mt-1">বর্তমানে গড় অনুমোদন সময় ৫ ঘন্টা। প্রতিযোগীদের তুলনায় ২ ঘন্টা বেশি। দ্রুত অনুমোদন প্রক্রিয়া আপনার বুকিং হার বাড়াতে পারে।</p>
                    <Button variant="link" className="px-0 h-auto text-blue-600 mt-2">পরামর্শ দেখুন</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">সার্ভিস বুকিংয়ে ক্রস-সেলিং সুযোগ</h3>
                    <p className="text-sm text-gray-500 mt-1">আপনার সার্ভিস গ্রাহকদের ৭০% মার্কেটপ্লেস থেকে কেনাকাটা করেন না। তাদের জন্য বিশেষ অফার দিয়ে ক্রস-সেলিং বাড়ান।</p>
                    <Button variant="link" className="px-0 h-auto text-green-600 mt-2">বিস্তারিত দেখুন</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg font-medium mb-4">পারফরম্যান্স ইন্ডিকেটর</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">অর্ডার কমপ্লিশন রেট</span>
                  <span className="text-sm font-medium">৯৪%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">রেন্টাল অকুপেন্সি রেট</span>
                  <span className="text-sm font-medium">৮৭%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">সার্ভিস বুকিং রেট</span>
                  <span className="text-sm font-medium">৭৬%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">কন্টেন্ট ইনগেজমেন্ট</span>
                  <span className="text-sm font-medium">৬৫%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <h3 className="font-medium">ড্যাশবোর্ড স্ট্যাটাস</h3>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                সব অ্যাকটিভ
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* সার্ভিস লিংক */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ServiceQuickLink 
          title="মার্কেটপ্লেস ব্যবস্থাপনা"
          description="প্রোডাক্ট, অর্ডার, ইনভেন্টরি এবং বিক্রয় পরিচালনা করুন"
          icon={<Store className="h-5 w-5" />}
          path="/seller-dashboard/marketplace"
          color="blue"
        />
        
        <ServiceQuickLink 
          title="রেন্টাল ব্যবস্থাপনা"
          description="সম্পত্তি, বুকিং, রক্ষণাবেক্ষণ এবং ভাড়াটিয়া পরিচালনা করুন"
          icon={<Building className="h-5 w-5" />}
          path="/seller-dashboard/rental"
          color="emerald"
        />
        
        <ServiceQuickLink 
          title="সার্ভিস ব্যবস্থাপনা"
          description="সেবা, অ্যাপয়েন্টমেন্ট এবং ক্লায়েন্ট পরিচালনা করুন"
          icon={<Wrench className="h-5 w-5" />}
          path="/seller-dashboard/services"
          color="amber"
        />
        
        <ServiceQuickLink 
          title="কন্টেন্ট ব্যবস্থাপনা"
          description="ডিজিটাল কন্টেন্ট, অডিয়েন্স এবং মানিটাইজেশন পরিচালনা করুন"
          icon={<Video className="h-5 w-5" />}
          path="/seller-dashboard/content"
          color="purple"
        />
      </div>
    </div>
  );
};

// কম্পোনেন্টস
const SummaryCard = ({ 
  title, 
  value, 
  trend, 
  period, 
  icon, 
  color 
}: {
  title: string;
  value: string;
  trend: { value: number; positive: boolean };
  period: string;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'violet' | 'amber';
}) => {
  const bgColors = {
    blue: 'bg-blue-100',
    emerald: 'bg-emerald-100',
    violet: 'bg-violet-100',
    amber: 'bg-amber-100'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    violet: 'text-violet-600',
    amber: 'text-amber-600'
  };
  
  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className={`text-xs flex items-center mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {trend.value}% {period}
          </p>
        </div>
        <div className={`w-10 h-10 ${bgColors[color]} rounded-full flex items-center justify-center`}>
          <div className={`h-5 w-5 ${textColors[color]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ServiceQuickLink = ({ 
  title, 
  description, 
  icon, 
  path, 
  color 
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: 'blue' | 'emerald' | 'amber' | 'purple';
}) => {
  const navigate = useNavigate();
  
  const bgColors = {
    blue: 'bg-blue-50 border-blue-200',
    emerald: 'bg-emerald-50 border-emerald-200',
    amber: 'bg-amber-50 border-amber-200',
    purple: 'bg-purple-50 border-purple-200'
  };
  
  const iconBgColors = {
    blue: 'bg-blue-100',
    emerald: 'bg-emerald-100',
    amber: 'bg-amber-100',
    purple: 'bg-purple-100'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    purple: 'text-purple-600'
  };
  
  return (
    <div 
      className={`border rounded-lg p-4 ${bgColors[color]} hover:shadow-md transition-shadow cursor-pointer`}
      onClick={() => navigate(path)}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full ${iconBgColors[color]}`}>
          <div className={textColors[color]}>
            {icon}
          </div>
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default IntegratedDashboard;
