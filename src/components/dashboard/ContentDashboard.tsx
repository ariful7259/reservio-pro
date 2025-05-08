
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
  Video, 
  Plus, 
  Edit, 
  Users, 
  DollarSign, 
  Eye, 
  ThumbsUp, 
  Clock, 
  Upload,
  Film,
  Music,
  BookOpen,
  Podcast,
  TrendingUp,
  MessageSquare,
  Star,
  ChevronRight,
  ArrowUp,
  ArrowDown
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
import { Progress } from '@/components/ui/progress';

// Sample data for the charts
const viewsData = [
  { name: 'জানু', views: 4000 },
  { name: 'ফেব্রু', views: 5000 },
  { name: 'মার্চ', views: 7000 },
  { name: 'এপ্রিল', views: 8500 },
  { name: 'মে', views: 6000 },
  { name: 'জুন', views: 9000 },
  { name: 'জুলাই', views: 12000 },
];

// Content type distribution data
const contentTypeData = [
  { name: 'ভিডিও', value: 55 },
  { name: 'অডিও', value: 20 },
  { name: 'ব্লগ', value: 15 },
  { name: 'ই-বুক', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Recent content data
const recentContent = [
  { 
    id: 1, 
    title: 'বাংলাদেশের পর্যটন স্থান নিয়ে কন্টেন্ট', 
    type: 'ভিডিও', 
    views: 8500, 
    likes: 1200, 
    comments: 350, 
    duration: '15:20', 
    publishDate: '২ দিন আগে',
    revenue: '৳ ৩,৫৬০',
    growth: 12
  },
  { 
    id: 2, 
    title: 'হোম কুকিং টিপস', 
    type: 'ব্লগ', 
    views: 3200, 
    likes: 450, 
    comments: 120, 
    duration: '7 মিনিট', 
    publishDate: '৪ দিন আগে',
    revenue: '৳ ১,২৫০',
    growth: 8
  },
  { 
    id: 3, 
    title: 'বাংলা মেডিটেশন গাইড', 
    type: 'অডিও', 
    views: 2500, 
    likes: 720, 
    comments: 80, 
    duration: '35:45', 
    publishDate: '১ সপ্তাহ আগে',
    revenue: '৳ ১,৮৭০',
    growth: -5
  },
  { 
    id: 4, 
    title: 'বাংলাদেশের পোশাক শিল্প', 
    type: 'ই-বুক', 
    views: 1800, 
    likes: 320, 
    comments: 45, 
    duration: '৭৫ পেজ', 
    publishDate: '২ সপ্তাহ আগে',
    revenue: '৳ ৫,৮০০',
    growth: 15
  },
  { 
    id: 5, 
    title: 'শেয়ার বাজারের আপডেট', 
    type: 'ভিডিও', 
    views: 7500, 
    likes: 980, 
    comments: 250, 
    duration: '12:40', 
    publishDate: '৩ দিন আগে',
    revenue: '৳ ২,৯৪০',
    growth: 10
  },
];

// Upcoming content data
const upcomingContent = [
  { 
    id: 1, 
    title: 'বাংলাদেশের খেলাধুলা নিয়ে ডকুমেন্টারি', 
    type: 'ভিডিও', 
    status: 'ড্রাফট', 
    progress: 75, 
    dueDate: '১৫ এপ্রিল, ২০২৫'
  },
  { 
    id: 2, 
    title: 'টেক স্টার্টআপ গাইড', 
    type: 'ই-বুক', 
    status: 'এডিটিং', 
    progress: 90, 
    dueDate: '২০ এপ্রিল, ২০২৫'
  },
  { 
    id: 3, 
    title: 'বাংলা কুইজ পডকাস্ট', 
    type: 'অডিও', 
    status: 'রেকর্ডিং', 
    progress: 40, 
    dueDate: '৩০ এপ্রিল, ২০২৫'
  },
];

// Content type icon map
const contentTypeIcons = {
  'ভিডিও': <Film className="h-4 w-4 text-blue-500" />,
  'অডিও': <Music className="h-4 w-4 text-green-500" />,
  'ব্লগ': <BookOpen className="h-4 w-4 text-amber-500" />,
  'ই-বুক': <BookOpen className="h-4 w-4 text-purple-500" />,
  'পডকাস্ট': <Podcast className="h-4 w-4 text-pink-500" />,
};

const ContentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">কন্টেন্ট ড্যাশবোর্ড</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            এনালিটিক্স
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            নতুন কন্টেন্ট
          </Button>
        </div>
      </div>
      
      {/* স্ট্যাটিসটিক কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="মোট ভিউ"
          value="৪৫,৩৫০"
          change={{ value: 18, positive: true }}
          period="গত মাস থেকে"
          icon={<Eye className="h-5 w-5" />}
          color="blue"
        />
        
        <StatCard 
          title="সাবস্ক্রাইবার"
          value="৪,২৮০"
          change={{ value: 12, positive: true }}
          period="গত মাস থেকে"
          icon={<Users className="h-5 w-5" />}
          color="purple"
        />
        
        <StatCard 
          title="মোট আয়"
          value="৳ ২৫,৬৭০"
          change={{ value: 15, positive: true }}
          period="গত মাস থেকে"
          icon={<DollarSign className="h-5 w-5" />}
          color="emerald"
        />
        
        <StatCard 
          title="গড় ইনগেজমেন্ট"
          value="৬.৮%"
          change={{ value: 2, positive: true }}
          period="গত সপ্তাহ থেকে"
          icon={<ThumbsUp className="h-5 w-5" />}
          color="amber"
        />
      </div>
      
      {/* ভিউস চার্ট */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>ভিউ ট্রেন্ড</CardTitle>
            <Tabs defaultValue="7days">
              <TabsList className="grid grid-cols-3 w-[250px]">
                <TabsTrigger value="7days">৭ দিন</TabsTrigger>
                <TabsTrigger value="30days">৩০ দিন</TabsTrigger>
                <TabsTrigger value="90days">৯০ দিন</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={viewsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  name="ভিউস" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* কন্টেন্ট এনালিটিক্স এন্ড লিস্ট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>সাম্প্রতিক কন্টেন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div key={content.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        {contentTypeIcons[content.type as keyof typeof contentTypeIcons]}
                        <h3 className="font-medium">{content.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <p className="text-sm text-gray-500">{content.type}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {content.views}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {content.likes}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {content.comments}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {content.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{content.revenue}</p>
                      <p className={`text-xs flex items-center justify-end mt-1 ${content.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {content.growth > 0 ? 
                          <ArrowUp className="h-3 w-3 mr-1" /> : 
                          <ArrowDown className="h-3 w-3 mr-1" />
                        }
                        {Math.abs(content.growth)}% গত সপ্তাহ থেকে
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-3 w-3 mr-1" />
                      দেখুন
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3 mr-1" />
                      এডিট করুন
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব কন্টেন্ট দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>কন্টেন্ট টাইপ বিভাজন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {contentTypeData.map((entry, index) => (
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
      
      {/* আপকামিং কন্টেন্ট এন্ড মনিটাইজেশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>আপকামিং কন্টেন্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingContent.map((content) => (
                <div key={content.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        {contentTypeIcons[content.type as keyof typeof contentTypeIcons]}
                        <h3 className="font-medium">{content.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-gray-500">{content.type}</p>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                          {content.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {content.dueDate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>সম্পূর্ণ: {content.progress}%</span>
                      <span>{content.status}</span>
                    </div>
                    <Progress value={content.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="sm" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              নতুন কন্টেন্ট যোগ করুন
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>মনিটাইজেশন অভারভিউ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">সাবস্ক্রিপশন আয়</h3>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        +১৫%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      মাসিক সাবস্ক্রিপশন এবং মেম্বারশিপ থেকে আয়
                    </p>
                    <p className="font-medium mt-1">৳ ১৮,৫৪০</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">এড রেভিনিউ</h3>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        +৫%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ডিসপ্লে এড, ভিডিও এড, এবং স্পনসরশিপ থেকে আয়
                    </p>
                    <p className="font-medium mt-1">৳ ৭,১৩০</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">মোট মাসিক আয়</span>
                  <span className="font-bold text-lg">৳ ২৫,৬৭০</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  বিস্তারিত এনালাইসিস দেখুন
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
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
  color: 'blue' | 'purple' | 'emerald' | 'amber';
}) => {
  
  const bgColors = {
    blue: 'bg-blue-100',
    purple: 'bg-purple-100',
    emerald: 'bg-emerald-100',
    amber: 'bg-amber-100'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    emerald: 'text-emerald-600',
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

export default ContentDashboard;
