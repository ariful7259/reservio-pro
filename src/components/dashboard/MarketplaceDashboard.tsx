
import React from 'react';
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
  Legend
} from 'recharts';
import { 
  Store, 
  Plus, 
  Edit, 
  Trash, 
  Package, 
  Truck, 
  Check, 
  Boxes, 
  TrendingUp, 
  MessageSquare, 
  Star, 
  Percent, 
  Ticket,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ShoppingCart,
  Search,
  Filter,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

// সেলস ডেটা
const salesData = [
  { name: 'জানু', sales: 4000 },
  { name: 'ফেব্রু', sales: 3000 },
  { name: 'মার্চ', sales: 2000 },
  { name: 'এপ্রিল', sales: 2780 },
  { name: 'মে', sales: 1890 },
  { name: 'জুন', sales: 2390 },
  { name: 'জুলাই', sales: 3490 },
];

// সেলস চ্যানেল ডেটা
const salesChannelData = [
  { name: 'ওয়েবসাইট', value: 60 },
  { name: 'মোবাইল অ্যাপ', value: 25 },
  { name: 'মার্কেটপ্লেস', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// টপ সেলিং প্রোডাক্টস
const topProducts = [
  { id: 1, name: 'স্মার্টফোন', price: '৳ 15,000', sold: 45, stock: 20, growth: 12 },
  { id: 2, name: 'ওয়ায়ারলেস হেডফোন', price: '৳ 2,500', sold: 38, stock: 15, growth: -5 },
  { id: 3, name: 'ল্যাপটপ', price: '৳ 65,000', sold: 25, stock: 8, growth: 18 },
  { id: 4, name: 'স্মার্টওয়াচ', price: '৳ 4,200', sold: 30, stock: 12, growth: 10 },
  { id: 5, name: 'ব্লুটুথ স্পিকার', price: '৳ 1,800', sold: 22, stock: 25, growth: 8 },
];

// রিসেন্ট অর্ডার
const recentOrders = [
  { id: 'ORD-001', customer: 'রহিম আহমেদ', products: 3, total: '৳ 18,500', status: 'পেন্ডিং', date: '১৫ মিনিট আগে' },
  { id: 'ORD-002', customer: 'ফাতেমা বেগম', products: 1, total: '৳ 2,400', status: 'প্রসেসিং', date: '১ ঘন্টা আগে' },
  { id: 'ORD-003', customer: 'করিম উদ্দিন', products: 2, total: '৳ 7,800', status: 'শিপড', date: '৪ ঘন্টা আগে' },
  { id: 'ORD-004', customer: 'জামিলা খাতুন', products: 4, total: '৳ 12,350', status: 'ডেলিভারড', date: '১ দিন আগে' },
  { id: 'ORD-005', customer: 'সালাহউদ্দিন', products: 1, total: '৳ 5,500', status: 'পেন্ডিং', date: '১ দিন আগে' },
];

// অর্ডার স্ট্যাটাস বেজ
const orderStatusBadge = (status: string) => {
  switch (status) {
    case 'পেন্ডিং':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">পেন্ডিং</Badge>;
    case 'প্রসেসিং':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">প্রসেসিং</Badge>;
    case 'শিপড':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">শিপড</Badge>;
    case 'ডেলিভারড':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">ডেলিভারড</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// লো স্টক প্রোডাক্টস
const lowStockProducts = [
  { id: 1, name: 'ল্যাপটপ', current: 8, threshold: 10 },
  { id: 2, name: 'ওয়ায়ারলেস হেডফোন', current: 5, threshold: 15 },
  { id: 3, name: 'স্মার্টফোন চার্জার', current: 7, threshold: 20 },
];

const MarketplaceDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">মার্কেটপ্লেস ড্যাশবোর্ড</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            ফিল্টার
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            নতুন প্রোডাক্ট
          </Button>
        </div>
      </div>
      
      {/* স্ট্যাটিসটিক কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="মোট বিক্রয়"
          value="৳ ৮৫,৪৭০"
          change={{ value: 15, positive: true }}
          period="গত মাস থেকে"
          icon={<ShoppingCart className="h-5 w-5" />}
          color="blue"
        />
        
        <StatCard 
          title="মোট অর্ডার"
          value="১৫৪"
          change={{ value: 8, positive: true }}
          period="গত সপ্তাহ থেকে"
          icon={<Package className="h-5 w-5" />}
          color="green"
        />
        
        <StatCard 
          title="গড় অর্ডার ভ্যালু"
          value="৳ ৩,২৫০"
          change={{ value: 5, positive: true }}
          period="গত মাস থেকে"
          icon={<TrendingUp className="h-5 w-5" />}
          color="purple"
        />
        
        <StatCard 
          title="রিটার্ন রেট"
          value="২.৩%"
          change={{ value: 0.5, positive: false }}
          period="গত মাস থেকে"
          icon={<Truck className="h-5 w-5" />}
          color="amber"
        />
      </div>
      
      {/* সেলস এন্ড অর্ডার চার্ট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>বিক্রয় ট্রেন্ড</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" name="বিক্রয় (৳)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>সেলস চ্যানেল</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesChannelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {salesChannelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {salesChannelData.map((entry, index) => (
                <div key={entry.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* প্রোডাক্ট এন্ড অর্ডার সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>টপ সেলিং প্রোডাক্ট</CardTitle>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="প্রোডাক্ট খুঁজুন" 
                className="w-48 h-8 text-xs" 
              />
              <Select defaultValue="sales">
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue placeholder="সর্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">বিক্রয় (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="price">দাম (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="stock">স্টক (কম থেকে বেশি)</SelectItem>
                  <SelectItem value="growth">গ্রোথ (বেশি থেকে কম)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm text-gray-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.price} | {product.sold} বিক্রি</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={product.stock <= 10 ? "destructive" : "secondary"}>
                      স্টক: {product.stock}
                    </Badge>
                    <div className="flex items-center">
                      {product.growth > 0 ? 
                        <ArrowUp className="h-4 w-4 text-green-500" /> : 
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      }
                      <span className={product.growth > 0 ? "text-green-500" : "text-red-500"}>
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব প্রোডাক্ট দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>সাম্প্রতিক অর্ডার</CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-36 h-8 text-xs">
                <SelectValue placeholder="স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="pending">পেন্ডিং</SelectItem>
                <SelectItem value="processing">প্রসেসিং</SelectItem>
                <SelectItem value="shipped">শিপড</SelectItem>
                <SelectItem value="delivered">ডেলিভারড</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{order.id}</p>
                      {orderStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-gray-500">{order.customer} • {order.products} পণ্য</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <p className="text-xs text-gray-500 flex items-center justify-end">
                      <Clock className="h-3 w-3 mr-1" />
                      {order.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব অর্ডার দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* ইনভেন্টরি এন্ড প্রমোশন সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>ইনভেন্টরি অ্যালার্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        বর্তমান স্টক: <span className="font-medium text-red-600">{product.current}</span> / থ্রেশহোল্ড: {product.threshold}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">স্টক যোগ করুন</Button>
                  </div>
                  <Progress value={(product.current / product.threshold) * 100} className="h-2" />
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              ইনভেন্টরি ম্যানেজ করুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>অ্যাক্টিভ প্রমোশন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-blue-50 border-blue-200">
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Percent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">ইলেকট্রনিক্স সেল ৩০% অফ</h3>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          ৩ দিন বাকি
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      সব ইলেক্ট্রনিক্স পণ্যে ৩০% পর্যন্ত ছাড়। কুপন কোড: ELEC30
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="link" className="px-0 h-6 text-blue-600">
                        এডিট করুন
                      </Button>
                      <Button size="sm" variant="link" className="px-0 h-6 text-blue-600">
                        পারফরম্যান্স দেখুন
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4 bg-purple-50 border-purple-200">
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Ticket className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">নতুন গ্রাহক ১৫% ছাড়</h3>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          চলমান
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      নতুন গ্রাহকদের প্রথম অর্ডারে ১৫% ছাড়। কুপন কোড: NEWUSER15
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="link" className="px-0 h-6 text-purple-600">
                        এডিট করুন
                      </Button>
                      <Button size="sm" variant="link" className="px-0 h-6 text-purple-600">
                        পারফরম্যান্স দেখুন
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              নতুন প্রমোশন তৈরি করুন
              <Plus className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// স্ট্যাট কার্ড কম্পোনেন্ট
const StatCard = ({ 
  title, 
  value, 
  change, 
  period, 
  icon, 
  color 
}: {
  title: string;
  value: string;
  change: { value: number; positive: boolean };
  period: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'amber';
}) => {
  
  const bgColors = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    amber: 'bg-amber-100'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    amber: 'text-amber-600'
  };
  
  return (
    <Card>
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className={`text-xs flex items-center mt-1 ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
            {change.positive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {change.value}% {period}
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

export default MarketplaceDashboard;
