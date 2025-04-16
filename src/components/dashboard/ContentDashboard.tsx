
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
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  Video, 
  Upload, 
  Edit, 
  Folder, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search, 
  MessageSquare, 
  Share2,
  Eye,
  ArrowUp,
  ArrowDown,
  Plus,
  Download,
  Star,
  ThumbsUp,
  Settings,
  ChevronRight
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

// ভিউয়ের ডেটা
const viewsData = [
  { name: 'জানু', views: 1200 },
  { name: 'ফেব্রু', views: 1900 },
  { name: 'মার্চ', views: 2500 },
  { name: 'এপ্রিল', views: 2100 },
  { name: 'মে', views: 3100 },
  { name: 'জুন', views: 2800 },
  { name: 'জুলাই', views: 3500 },
];

// আয়ের ডেটা
const revenueData = [
  { name: 'জানু', revenue: 5000 },
  { name: 'ফেব্রু', revenue: 7500 },
  { name: 'মার্চ', revenue: 10000 },
  { name: 'এপ্রিল', revenue: 8500 },
  { name: 'মে', revenue: 12500 },
  { name: 'জুন', revenue: 11000 },
  { name: 'জুলাই', revenue: 15000 },
];

// অডিয়েন্স সোর্স
const audienceSources = [
  { name: 'ডিরেক্ট', value: 40 },
  { name: 'সার্চ ইঞ্জিন', value: 30 },
  { name: 'সোশ্যাল মিডিয়া', value: 20 },
  { name: 'রেফারেল', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// কন্টেন্ট লিস্ট
const contentList = [
  { 
    id: 1, 
    title: 'বাংলা ভাষা শেখার সহজ উপায়', 
    type: 'ভিডিও কোর্স', 
    uploadDate: '১০ এপ্রিল, ২০২৫', 
    views: 2500, 
    revenue: '৳ ৭,৫০০', 
    engagement: 85, 
    rating: 4.8 
  },
  { 
    id: 2, 
    title: 'ওয়েব ডেভেলপমেন্ট বেসিক টু অ্যাডভান্স', 
    type: 'টিউটোরিয়াল সিরিজ', 
    uploadDate: '০৫ মার্চ, ২০২৫', 
    views: 4200, 
    revenue: '৳ ১২,০০০', 
    engagement: 90, 
    rating: 4.9 
  },
  { 
    id: 3, 
    title: 'ডিজিটাল মার্কেটিং ফান্ডামেন্টালস', 
    type: 'ই-বুক', 
    uploadDate: '২০ ফেব্রুয়ারী, ২০২৫', 
    views: 1800, 
    revenue: '৳ ৫,০০০', 
    engagement: 75, 
    rating: 4.5 
  },
  { 
    id: 4, 
    title: 'মোবাইল ফটোগ্রাফি টিপস', 
    type: 'শর্ট টিউটোরিয়াল', 
    uploadDate: '১৫ এপ্রিল, ২০২৫', 
    views: 3500, 
    revenue: '৳ ৮,০০০', 
    engagement: 88, 
    rating: 4.7 
  },
  { 
    id: 5, 
    title: 'পারসোনাল ফিনান্স ম্যানেজমেন্ট', 
    type: 'পডকাস্ট সিরিজ', 
    uploadDate: '০১ জানুয়ারী, ২০২৫', 
    views: 1500, 
    revenue: '৳ ৪,৫০০', 
    engagement: 80, 
    rating: 4.6 
  },
];

// কমেন্ট এবং ফিডব্যাক
const commentsAndFeedback = [
  { 
    id: 1, 
    username: 'সৌরভ দাস', 
    content: 'খুব উপকারী কন্টেন্ট। আমি অনেক কিছু শিখতে পেরেছি। ধন্যবাদ!', 
    contentTitle: 'ওয়েব ডেভেলপমেন্ট বেসিক টু অ্যাডভান্স', 
    date: '১৬ এপ্রিল, ২০২৫', 
    status: 'পেন্ডিং' 
  },
  { 
    id: 2, 
    username: 'ফারহানা রহমান', 
    content: 'অসাধারণ প্রেজেন্টেশন। আরও ক্লাস আশা করছি।', 
    contentTitle: 'বাংলা ভাষা শেখার সহজ উপায়', 
    date: '১৫ এপ্রিল, ২০২৫', 
    status: 'অ্যাপ্রুভড' 
  },
  { 
    id: 3, 
    username: 'আমির হোসেন', 
    content: 'এই ই-বুক থেকে অনেক কিছু শিখলাম। আরও আপডেটের জন্য অপেক্ষা করছি।', 
    contentTitle: 'ডিজিটাল মার্কেটিং ফান্ডামেন্টালস', 
    date: '১৪ এপ্রিল, ২০২৫', 
    status: 'অ্যাপ্রুভড' 
  },
  { 
    id: 4, 
    username: 'তানিয়া আক্তার', 
    content: 'টিপসগুলো খুবই কাজের। আরও কিছু উন্নত পর্যায়ের টিপস শেয়ার করুন।', 
    contentTitle: 'মোবাইল ফটোগ্রাফি টিপস', 
    date: '১৩ এপ্রিল, ২০২৫', 
    status: 'পেন্ডিং' 
  },
];

// সাবস্ক্রাইবার স্ট্যাটিসটিক্স
const subscriberStats = {
  total: 5250,
  growth: 12,
  paying: 1850,
  freeTrials: 450,
  retention: 85
};

// কন্টেন্ট টাইপ ডেটা
const contentTypeData = [
  { name: 'ভিডিও', value: 45 },
  { name: 'টেক্সট', value: 25 },
  { name: 'অডিও', value: 20 },
  { name: 'ইন্টারেক্টিভ', value: 10 },
];

// কমেন্ট স্ট্যাটাস বেজ
const commentStatusBadge = (status: string) => {
  switch (status) {
    case 'অ্যাপ্রুভড':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">অ্যাপ্রুভড</Badge>;
    case 'পেন্ডিং':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">পেন্ডিং</Badge>;
    case 'স্প্যাম':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">স্প্যাম</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// কন্টেন্ট টাইপ বেজ
const contentTypeBadge = (type: string) => {
  switch (type) {
    case 'ভিডিও কোর্স':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">ভিডিও কোর্স</Badge>;
    case 'টিউটোরিয়াল সিরিজ':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">টিউটোরিয়াল সিরিজ</Badge>;
    case 'ই-বুক':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">ই-বুক</Badge>;
    case 'শর্ট টিউটোরিয়াল':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">শর্ট টিউটোরিয়াল</Badge>;
    case 'পডকাস্ট সিরিজ':
      return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">পডকাস্ট সিরিজ</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
};

const ContentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">ডিজিটাল কন্টেন্ট ড্যাশবোর্ড</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            সেটিংস
          </Button>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            নতুন কন্টেন্ট
          </Button>
        </div>
      </div>
      
      {/* স্ট্যাটিসটিক কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="মোট ভিউ"
          value="৩৫,৬৭০"
          change={{ value: 18, positive: true }}
          period="গত মাস থেকে"
          icon={<Eye className="h-5 w-5" />}
          color="blue"
        />
        
        <StatCard 
          title="মোট আয়"
          value="৳ ৩৮,৫০০"
          change={{ value: 12, positive: true }}
          period="গত মাস থেকে"
          icon={<DollarSign className="h-5 w-5" />}
          color="green"
        />
        
        <StatCard 
          title="অডিয়েন্স"
          value="৫,২৫০"
          change={{ value: 15, positive: true }}
          period="গত সপ্তাহ থেকে"
          icon={<Users className="h-5 w-5" />}
          color="purple"
        />
        
        <StatCard 
          title="এনগেজমেন্ট রেট"
          value="৮৫%"
          change={{ value: 5, positive: true }}
          period="গত মাস থেকে"
          icon={<ThumbsUp className="h-5 w-5" />}
          color="amber"
        />
      </div>
      
      {/* ভিউ এন্ড রেভেনিউ চার্ট */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>ভিউ এবং আয় ট্রেন্ড</CardTitle>
            <Tabs defaultValue="sixMonths">
              <TabsList className="grid grid-cols-3 w-[250px]">
                <TabsTrigger value="threeMonths">৩ মাস</TabsTrigger>
                <TabsTrigger value="sixMonths">৬ মাস</TabsTrigger>
                <TabsTrigger value="yearly">১ বছর</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={viewsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="views" 
                  name="ভিউ" 
                  stroke="#8884d8" 
                  fill="#8884d8"
                  fillOpacity={0.2}
                />
                <Area 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  name="আয় (৳)" 
                  stroke="#82ca9d" 
                  fill="#82ca9d"
                  fillOpacity={0.2}
                  data={revenueData} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* কন্টেন্ট এন্ড অডিয়েন্স */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>কন্টেন্ট পারফরম্যান্স</CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="কন্টেন্ট খুঁজুন" 
                className="w-36 h-8 text-xs" 
              />
              <Select defaultValue="views">
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue placeholder="সর্ট করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">ভিউ (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="revenue">আয় (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="engagement">এনগেজমেন্ট (বেশি থেকে কম)</SelectItem>
                  <SelectItem value="rating">রেটিং (বেশি থেকে কম)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentList.map((content) => (
                <div key={content.id} className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{content.title}</h3>
                      <div className="flex items-center gap-2 my-1">
                        {contentTypeBadge(content.type)}
                        <span className="text-xs text-gray-500">
                          আপলোড: {content.uploadDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {content.views} ভিউ
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {content.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">{content.revenue}</p>
                      <p className="text-xs text-gray-500 mt-1">এনগেজমেন্ট রেট: {content.engagement}%</p>
                      <div className="flex gap-2 mt-2 justify-end">
                        <Button size="sm" variant="outline">এডিট</Button>
                        <Button size="sm" variant="outline">বিস্তারিত</Button>
                      </div>
                    </div>
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
            <CardTitle>অডিয়েন্স ইনসাইট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">অডিয়েন্স সোর্স</h3>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={audienceSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {audienceSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2 mt-2">
                {audienceSources.map((source, index) => (
                  <div key={source.name} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                      />
                      <span>{source.name}</span>
                    </div>
                    <span className="font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium mb-3">সাবস্ক্রাইবার স্ট্যাটিসটিক্স</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">মোট সাবস্ক্রাইবার</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">{subscriberStats.total}</span>
                      <span className="text-xs text-green-600">
                        <ArrowUp className="inline h-3 w-3" /> {subscriberStats.growth}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">পেইড সাবস্ক্রাইবার</span>
                    <span className="font-medium">{subscriberStats.paying}</span>
                  </div>
                  <Progress value={(subscriberStats.paying / subscriberStats.total) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">ফ্রি ট্রায়াল</span>
                    <span className="font-medium">{subscriberStats.freeTrials}</span>
                  </div>
                  <Progress value={(subscriberStats.freeTrials / subscriberStats.total) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">রিটেনশন রেট</span>
                    <span className="font-medium">{subscriberStats.retention}%</span>
                  </div>
                  <Progress value={subscriberStats.retention} className="h-2" />
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                বিস্তারিত অ্যানালিটিক্স
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* কমেন্টস এন্ড ট্রেন্ড ইনসাইট */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>কমেন্টস এবং ফিডব্যাক</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commentsAndFeedback.map((comment) => (
                <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{comment.username}</h3>
                        {commentStatusBadge(comment.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        কন্টেন্ট: {comment.contentTitle}
                      </p>
                      <p className="text-sm mt-1 bg-gray-50 p-2 rounded-md">
                        "{comment.content}"
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{comment.date}</p>
                      {comment.status === 'পেন্ডিং' && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline">অ্যাপ্রুভ</Button>
                          <Button size="sm" variant="outline">স্প্যাম</Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব কমেন্ট দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>ট্রেন্ড ইনসাইট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">কন্টেন্ট টাইপ বিভাজন</h3>
              <div className="flex gap-2 mb-4 flex-wrap">
                {contentTypeData.map((type, index) => (
                  <div key={type.name} className="flex-1 min-w-[120px]">
                    <div className="text-center mb-2">
                      <span className="text-sm font-medium">{type.name}</span>
                      <p className="text-2xl font-bold">{type.value}%</p>
                    </div>
                    <Progress 
                      value={type.value} 
                      className="h-2" 
                      style={{ backgroundColor: `${COLORS[index % COLORS.length]}20` }}
                      indicatorColor={COLORS[index % COLORS.length]}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium mb-3">ট্রেন্ডিং টপিক্স</h3>
              <div className="space-y-2">
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-red-500" />
                      <span className="font-medium">এআই এবং মেশিন লার্নিং</span>
                    </div>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">+৫৬% ট্রেন্ড</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="font-medium">কন্টেন্ট মার্কেটিং</span>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">+৪২% ট্রেন্ড</span>
                  </div>
                </div>
                
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">সাইবার সিকিউরিটি</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">+৩৮% ট্রেন্ড</span>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                ট্রেন্ড রিপোর্ট দেখুন
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* কন্টেন্ট সাজেশন */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>কন্টেন্ট প্ল্যানিং এবং সাজেশন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Video className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">নতুন সিরিজ শুরু করুন</h3>
                  <p className="text-sm text-gray-500 mt-1">ট্রেন্ডিং টপিক 'এআই এবং মেশিন লার্নিং' এর উপর একটি সিরিজ শুরু করুন</p>
                  <Button variant="link" className="px-0 h-6 text-blue-600 mt-1">প্ল্যান করুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">কম্যুনিটি এনগেজ করুন</h3>
                  <p className="text-sm text-gray-500 mt-1">ইন্টারেক্টিভ লাইভ সেশন আয়োজন করুন এবং ফিডব্যাক নিন</p>
                  <Button variant="link" className="px-0 h-6 text-purple-600 mt-1">শিডিউল করুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Share2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">ক্রস-প্রমোট করুন</h3>
                  <p className="text-sm text-gray-500 mt-1">আপনার সবচেয়ে জনপ্রিয় কন্টেন্টগুলি অন্য প্ল্যাটফর্মে প্রমোট করুন</p>
                  <Button variant="link" className="px-0 h-6 text-green-600 mt-1">প্রমোট করুন</Button>
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

// ট্যাগ সেপারেটর
const Separator = ({ className }: { className?: string }) => (
  <div className={`h-px bg-gray-200 ${className}`}></div>
);

export default ContentDashboard;
