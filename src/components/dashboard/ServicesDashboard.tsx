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
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  DollarSign, 
  Receipt, 
  Percent, 
  UserPlus,
  CheckCircle,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Plus,
  Star,
  MessageSquare
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

// আয় ডেটা
const incomeData = [
  { name: 'জানু', income: 35000 },
  { name: 'ফেব্রু', income: 42000 },
  { name: 'মার্চ', income: 38000 },
  { name: 'এপ্রিল', income: 45000 },
  { name: 'মে', income: 50000 },
  { name: 'জুন', income: 48000 },
  { name: 'জুলাই', income: 52000 },
];

// সার্ভিস ক্যাটাগরি ডেটা
const serviceCategories = [
  { name: 'মেডিকেল', value: 30 },
  { name: 'টিউশন', value: 25 },
  { name: 'হোম সার্ভিস', value: 20 },
  { name: 'কনসাল্টেন্সি', value: 15 },
  { name: 'অন্যান্য', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// সার্ভিস লিস্ট
const servicesList = [
  { 
    id: 1, 
    name: 'ডাক্তার পরামর্শ', 
    category: 'মেডিকেল',
    price: '৳ ১,০০০', 
    duration: '৩০ মিনিট', 
    bookings: 45, 
    rating: 4.8 
  },
  { 
    id: 2, 
    name: 'ম্যাথ টিউশন', 
    category: 'টিউশন', 
    price: '৳ ১,২০০', 
    duration: '৬০ মিনিট', 
    bookings: 38, 
    rating: 4.7 
  },
  { 
    id: 3, 
    name: 'ইলেকট্রিক্যাল সার্ভিস', 
    category: 'হোম সার্ভিস', 
    price: '৳ ৮০০', 
    duration: '৬০ মিনিট', 
    bookings: 52, 
    rating: 4.5 
  },
  { 
    id: 4, 
    name: 'ক্যারিয়ার কাউন্সেলিং', 
    category: 'কনসাল্টেন্সি', 
    price: '৳ ১,৫০০', 
    duration: '৪৫ মিনিট', 
    bookings: 25, 
    rating: 4.9 
  },
  { 
    id: 5, 
    name: 'প্লাম্বিং সার্ভিস', 
    category: 'হোম সার্ভিস', 
    price: '৳ ৭০০', 
    duration: '৬০ মিনিট', 
    bookings: 40, 
    rating: 4.6 
  },
];

// অ্যাপয়েন্টমেন্ট লিস্ট
const appointmentsList = [
  { 
    id: 'AP-001', 
    service: 'ডাক্তার পরামর্শ', 
    client: 'রাহিম আলী', 
    date: '১৮ এপ্রিল, ২০২৫', 
    time: '১০:৩০ AM', 
    status: 'কনফার্মড', 
    amount: '৳ ১,০০০',
    timeAgo: '১ ঘন্টা আগে'
  },
  { 
    id: 'AP-002', 
    service: 'ম্যাথ টিউশন', 
    client: 'ফাতেমা খাতুন', 
    date: '১৯ এপ্রিল, ২০২৫', 
    time: '০৪:০০ PM', 
    status: 'পেন্ডিং', 
    amount: '৳ ১,২০০',
    timeAgo: '২ ঘন্টা আগে'
  },
  { 
    id: 'AP-003', 
    service: 'ইলেকট্রিক্যাল সার্ভিস', 
    client: 'করিম উদ্দিন', 
    date: '১৮ এপ্রিল, ২০২৫', 
    time: '০১:০০ PM', 
    status: 'কমপ্লিটেড', 
    amount: '৳ ৮০০',
    timeAgo: '৪ ঘন্টা আগে'
  },
  { 
    id: 'AP-004', 
    service: 'ক্যারিয়ার কাউন্সেলিং', 
    client: 'জামিলা বেগম', 
    date: '২০ এপ্রিল, ২০২৫', 
    time: '১১:০০ AM', 
    status: 'ক্যানসেলড', 
    amount: '৳ ১,৫০০',
    timeAgo: '১ দিন আগে'
  },
];

// ক্লায়েন্ট লিস্ট
const clientsList = [
  { 
    id: 1, 
    name: 'রাহিম আলী', 
    totalSpent: '৳ ৪,৫০০', 
    appointmentsCount: 5, 
    joinDate: '১০ জানুয়ারী, ২০২৫', 
    lastVisit: '১৮ এপ্রিল, ২০২৫', 
    status: 'এক্টিভ' 
  },
  { 
    id: 2, 
    name: 'ফাতেমা খাতুন', 
    totalSpent: '৳ ৯,৬০০', 
    appointmentsCount: 8, 
    joinDate: '০৫ ফেব্রুয়ারী, ২০২৫', 
    lastVisit: '১৫ এপ্রিল, ২০২৫', 
    status: 'এক্টিভ' 
  },
  { 
    id: 3, 
    name: 'করিম উদ্দিন', 
    totalSpent: '৳ ২,৪০০', 
    appointmentsCount: 3, 
    joinDate: '২২ মার্চ, ২০২৫', 
    lastVisit: '১৮ এপ্রিল, ২০২৫', 
    status: 'এক্টিভ' 
  },
  { 
    id: 4, 
    name: 'জামিলা বেগম', 
    totalSpent: '৳ ১,৫০০', 
    appointmentsCount: 1, 
    joinDate: '০১ এপ্রিল, ২০২৫', 
    lastVisit: '১৫ এপ্রিল, ২০২৫', 
    status: 'নতুন' 
  },
];

// প্রমোশন লিস্ট
const promotionsList = [
  { 
    id: 1, 
    title: 'মেডিকেল কনসাল্টেশন ১০% ছাড়', 
    code: 'MED10', 
    usageCount: 15, 
    startDate: '০১ এপ্রিল, ২০২৫', 
    endDate: '৩০ এপ্রিল, ২০২৫', 
    status: 'এক্টিভ' 
  },
  { 
    id: 2, 
    title: 'নতুন ক্লায়েন্ট ১৫% ছাড়', 
    code: 'NEW15', 
    usageCount: 23, 
    startDate: '০১ মার্চ, ২০২৫', 
    endDate: '৩০ জুন, ২০২৫', 
    status: 'এক্টিভ' 
  },
  { 
    id: 3, 
    title: 'বাল্ক বুকিং ২০% ছাড়', 
    code: 'BULK20', 
    usageCount: 7, 
    startDate: '১৫ এপ্রিল, ২০২৫', 
    endDate: '১৫ মে, ২০২৫', 
    status: 'এক্টিভ' 
  },
];

// অ্যাপয়েন্টমেন্ট স্ট্যাটাস বেজ
const appointmentStatusBadge = (status: string) => {
  switch (status) {
    case 'কনফার্মড':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">কনফার্মড</Badge>;
    case 'পেন্ডিং':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">পেন্ডিং</Badge>;
    case 'কমপ্লিটেড':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">কমপ্লিটেড</Badge>;
    case 'ক্যানসেলড':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">ক্যানসেলড</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// ক্লায়েন্ট স্ট্যাটাস বেজ
const clientStatusBadge = (status: string) => {
  switch (status) {
    case 'এক্টিভ':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">এক্টিভ</Badge>;
    case 'নতুন':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">নতুন</Badge>;
    case 'ইনএক্টিভ':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">ইনএক্টিভ</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// প্রমোশন স্ট্যাটাস বেজ
const promotionStatusBadge = (status: string) => {
  switch (status) {
    case 'এক্টিভ':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">এক্টিভ</Badge>;
    case 'আপকামিং':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">আপকামিং</Badge>;
    case 'এক্সপায়ার্ড':
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">এক্সপায়ার্ড</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const ServicesDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">সার্ভিস প্রোভাইডার ড্যাশবোর্ড</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            স্কেজুল ভিউ
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            নতুন সার্ভিস
          </Button>
        </div>
      </div>
      
      {/* স্ট্যাটিসটিক কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="মোট আয়"
          value="৳ ৪৮,৫০০"
          change={{ value: 15, positive: true }}
          period="গত মাস থেকে"
          icon={<DollarSign className="h-5 w-5" />}
          color="green"
        />
        
        <StatCard 
          title="বুকিং সংখ্যা"
          value="৭৫"
          change={{ value: 8, positive: true }}
          period="গত সপ্তাহ থেকে"
          icon={<Calendar className="h-5 w-5" />}
          color="blue"
        />
        
        <StatCard 
          title="সার্ভিস কমপ্লিশন রেট"
          value="৯২%"
          change={{ value: 3, positive: true }}
          period="গত মাস থেকে"
          icon={<CheckCircle className="h-5 w-5" />}
          color="purple"
        />
        
        <StatCard 
          title="এভারেজ রেটিং"
          value="৪.৭"
          change={{ value: 0.2, positive: true }}
          period="গত মাস থেকে"
          icon={<Star className="h-5 w-5" />}
          color="amber"
        />
      </div>
      
      {/* আয় এন্ড বুকিং চার্ট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>আয় এবং বুকিং ট্রেন্ড</CardTitle>
              <Tabs defaultValue="monthly">
                <TabsList className="grid grid-cols-3 w-[250px]">
                  <TabsTrigger value="weekly">সাপ্তাহিক</TabsTrigger>
                  <TabsTrigger value="monthly">মাসিক</TabsTrigger>
                  <TabsTrigger value="yearly">বার্ষিক</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={incomeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="income" name="আয় (৳)" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>সার্ভিস ক্যাটাগরি বিভাজন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceCategories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {serviceCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {serviceCategories.map((entry, index) => (
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
      
      {/* সার্ভিস ম্যানেজমেন্ট এন্ড অ্যাপয়েন্টমেন্টস */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>সার্ভিস ম্যানেজমেন্ট</CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="সার্ভিস খুঁজুন" 
                className="w-36 h-8 text-xs" 
              />
              <Select defaultValue="bookings">
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue placeholder="সর্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bookings">বুকিং (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="price">মূল্য (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="rating">রেটিং (বেশি থেকে কম)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {servicesList.map((service) => (
                <div key={service.id} className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{service.category}</span>
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {service.price}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{service.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{service.bookings} বুকিং</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">এডিট</Button>
                        <Button size="sm" variant="outline">বিস্তারিত</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব সার্ভিস দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>আসন্ন অ্যাপয়েন্টমেন্ট</CardTitle>
            <Select defaultValue="all">
              <SelectTrigger className="w-36 h-8 text-xs">
                <SelectValue placeholder="স্ট্যাটাস" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="confirmed">কনফার্মড</SelectItem>
                <SelectItem value="pending">পেন্ডিং</SelectItem>
                <SelectItem value="completed">কমপ্লিটেড</SelectItem>
                <SelectItem value="canceled">ক্যানসেলড</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointmentsList.map((appointment) => (
                <div key={appointment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{appointment.id}</p>
                        {appointmentStatusBadge(appointment.status)}
                      </div>
                      <p className="text-sm font-medium mt-1">{appointment.service}</p>
                      <p className="text-sm text-gray-500">ক্লায়েন্ট: {appointment.client}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {appointment.date}, {appointment.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.amount}</p>
                      <p className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {appointment.timeAgo}
                      </p>
                      {appointment.status !== 'ক্যানসেলড' && appointment.status !== 'কমপ্লিটেড' && (
                        <div className="flex gap-2 mt-2 justify-end">
                          {appointment.status === 'পেন্ডিং' && (
                            <Button size="sm" variant="outline">এ্যাপ্রুভ</Button>
                          )}
                          <Button size="sm" variant="outline">বিস্তারিত</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব অ্যাপয়েন্টমেন্ট দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* ক্লায়েন্ট ম্যানেজমেন্ট এন্ড প্রমোশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>ক্লায়েন্ট ম্যানেজমেন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientsList.map((client) => (
                <div key={client.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{client.name}</h3>
                        {clientStatusBadge(client.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        মোট খরচ: {client.totalSpent} • {client.appointmentsCount} অ্যাপয়েন্টমেন্ট
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        জয়েন: {client.joinDate} • সর্বশেষ ভিজিট: {client.lastVisit}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex gap-1">
                        <Calendar className="h-4 w-4" />
                        শিডিউল
                      </Button>
                      <Button size="sm" variant="outline" className="flex gap-1">
                        <MessageSquare className="h-4 w-4" />
                        মেসেজ
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব ক্লায়েন্ট দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>প্রমোশন ম্যানেজমেন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {promotionsList.map((promotion) => (
                <div key={promotion.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{promotion.title}</h3>
                        {promotionStatusBadge(promotion.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        কুপন কোড: <span className="font-medium">{promotion.code}</span> • ব্যবহার: {promotion.usageCount} বার
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        সময়কাল: {promotion.startDate} - {promotion.endDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">এডিট</Button>
                      <Button size="sm" variant="outline">বিস্তারিত</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="sm" className="w-full mt-4">
              নতুন প্রমোশন তৈরি করুন
              <Plus className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* ক্রস-সেলিং সুপারিশ */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>ব্যবসা বৃদ্ধির সুপারিশ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">রেফারেল প্রোগ্রাম</h3>
                  <p className="text-sm text-gray-500 mt-1">ক্লায়েন্টদের রেফারেলের জন্য ১০% ছাড় দিন</p>
                  <Button variant="link" className="px-0 h-6 text-blue-600 mt-1">প্রোগ্রাম শুরু করুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">গ্রুপ সেশন</h3>
                  <p className="text-sm text-gray-500 mt-1">গ্রুপ সেশনের মাধ্যমে আরও বেশি ক্লায়েন্ট পান</p>
                  <Button variant="link" className="px-0 h-6 text-purple-600 mt-1">আরও জানুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Percent className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">প্যাকেজ অফার</h3>
                  <p className="text-sm text-gray-500 mt-1">মাল্টি-সেশন প্যাকেজে ২০% ছাড় দিন</p>
                  <Button variant="link" className="px-0 h-6 text-green-600 mt-1">প্যাকেজ তৈরি করুন</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
  color: 'green' | 'blue' | 'purple' | 'amber';
}) => {
  
  const bgColors = {
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    amber: 'bg-amber-100'
  };
  
  const textColors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
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

export default ServicesDashboard;
