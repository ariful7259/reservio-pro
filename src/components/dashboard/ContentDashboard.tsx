
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
  Users, 
  Eye, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Calendar,
  Star,
  BookOpen,
  Heart,
  Share2,
  MessageSquare,
  Edit,
  Plus,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Download,
  Upload
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
import { cn } from '@/lib/utils';

// Sample data for content dashboard
const contentData = [
  { month: 'জানু', views: 5000, subscribers: 200, revenue: 15000 },
  { month: 'ফেব্রু', views: 6200, subscribers: 250, revenue: 18000 },
  { month: 'মার্চ', views: 7500, subscribers: 320, revenue: 22000 },
  { month: 'এপ্রিল', views: 8800, subscribers: 380, revenue: 26000 },
  { month: 'মে', views: 9200, subscribers: 420, revenue: 28000 },
  { month: 'জুন', views: 8500, subscribers: 450, revenue: 30000 },
  { month: 'জুলাই', views: 9800, subscribers: 500, revenue: 35000 },
];

const contentTypes = [
  { name: 'ভিডিও', value: 45 },
  { name: 'ব্লগ', value: 25 },
  { name: 'পডকাস্ট', value: 15 },
  { name: 'ইবুক', value: 10 },
  { name: 'কোর্স', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const recentContent = [
  { 
    id: 1, 
    title: 'বাংলাদেশের ঐতিহাসিক স্থান - ভ্রমণ গাইড', 
    type: 'ভিডিও', 
    views: 12500, 
    likes: 850, 
    comments: 120, 
    publishDate: '৩ দিন আগে',
    duration: '১৮:৪৫',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 2, 
    title: 'ঘরে বসে আয় করার ১০টি উপায়', 
    type: 'ব্লগ', 
    views: 8700, 
    likes: 650, 
    comments: 85, 
    publishDate: '৫ দিন আগে',
    duration: '১০ মিনিট রিডিং',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 3, 
    title: 'শুরুয়াতি ইনভেস্টর দের জন্য টিপস', 
    type: 'পডকাস্ট', 
    views: 5200, 
    likes: 320, 
    comments: 45, 
    publishDate: '১ সপ্তাহ আগে',
    duration: '৩৫:২০',
    thumbnail: '/placeholder.svg'
  },
  { 
    id: 4, 
    title: 'ডিজিটাল মার্কেটিং মাস্টারক্লাস', 
    type: 'কোর্স', 
    views: 3800, 
    likes: 290, 
    comments: 65, 
    publishDate: '২ সপ্তাহ আগে',
    duration: '৬ ঘন্টা কোর্স',
    thumbnail: '/placeholder.svg'
  },
];

const subscribers = [
  { 
    id: 1, 
    name: 'রাফি হাসান', 
    subscribed: '২ মাস আগে', 
    tier: 'প্রিমিয়াম', 
    totalSpent: '৳ ২,৫০০',
    engagement: 'উচ্চ'
  },
  { 
    id: 2, 
    name: 'নাজমুল ইসলাম', 
    subscribed: '৪ মাস আগে', 
    tier: 'বেসিক', 
    totalSpent: '৳ ৫০০',
    engagement: 'মাঝারি'
  },
  { 
    id: 3, 
    name: 'ফারিয়া খান', 
    subscribed: '১ মাস আগে', 
    tier: 'প্রিমিয়াম', 
    totalSpent: '৳ ৩,০০০',
    engagement: 'উচ্চ'
  },
  { 
    id: 4, 
    name: 'তানভীর আহমেদ', 
    subscribed: '৬ মাস আগে', 
    tier: 'এন্টারপ্রাইজ', 
    totalSpent: '৳ ১২,০০০',
    engagement: 'মাঝারি'
  },
];

const comments = [
  { 
    id: 1, 
    user: 'সাবিনা আক্তার', 
    content: 'খুব উপকারী কন্টেন্ট। আমি অনেক কিছু শিখতে পেরেছি।', 
    contentTitle: 'ঘরে বসে আয় করার ১০টি উপায়',
    time: '২ ঘন্টা আগে',
    likes: 15
  },
  { 
    id: 2, 
    user: 'কামরুল হাসান', 
    content: 'আরো বিস্তারিত জানতে চাই এই টপিক নিয়ে। পরবর্তী ভিডিওতে আশা করি আরো ডিটেইলস থাকবে।', 
    contentTitle: 'শুরুয়াতি ইনভেস্টর দের জন্য টিপস',
    time: '৫ ঘন্টা আগে',
    likes: 8
  },
  { 
    id: 3, 
    user: 'নাসরিন জাহান', 
    content: 'কোর্সটি অসাধারণ। প্রাকটিক্যাল এক্সারসাইজগুলো খুব হেল্পফুল।', 
    contentTitle: 'ডিজিটাল মার্কেটিং মাস্টারক্লাস',
    time: '১ দিন আগে',
    likes: 22
  },
];

// Generate subscriber trends data
const subscriberTrends = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  subscribers: Math.floor(Math.random() * 50) + 10
}));

// Generate engagement metrics
const engagementRates = [
  { name: 'লাইক রেট', value: 7.2 },
  { name: 'কমেন্ট রেট', value: 3.8 },
  { name: 'শেয়ার রেট', value: 1.5 },
  { name: 'পূর্ণ ভিউ রেট', value: 62 },
  { name: 'সাবস্ক্রাইব রেট', value: 2.1 },
];

// Get content tier badge
const getContentTierBadge = (tier: string) => {
  switch(tier) {
    case 'প্রিমিয়াম':
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">প্রিমিয়াম</Badge>;
    case 'বেসিক':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">বেসিক</Badge>;
    case 'এন্টারপ্রাইজ':
      return <Badge className="bg-purple-100 text-purple-800 border-purple-200">এন্টারপ্রাইজ</Badge>;
    default:
      return <Badge>{tier}</Badge>;
  }
};

// Get content type icon
const getContentTypeIcon = (type: string) => {
  switch(type) {
    case 'ভিডিও':
      return <Video className="h-4 w-4 text-blue-500" />;
    case 'ব্লগ':
      return <BookOpen className="h-4 w-4 text-green-500" />;
    case 'পডকাস্ট':
      return <Headphones className="h-4 w-4 text-yellow-500" />;
    case 'ইবুক':
      return <Book className="h-4 w-4 text-purple-500" />;
    case 'কোর্স':
      return <GraduationCap className="h-4 w-4 text-red-500" />;
    default:
      return <File className="h-4 w-4 text-gray-500" />;
  }
};

// Mock components for missing icons
const Headphones = ({ className }: { className?: string }) => <div className={className}>🎧</div>;
const Book = ({ className }: { className?: string }) => <div className={className}>📕</div>;
const GraduationCap = ({ className }: { className?: string }) => <div className={className}>🎓</div>;
const File = ({ className }: { className?: string }) => <div className={className}>📄</div>;

const ContentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">কন্টেন্ট ক্রিয়েটর ড্যাশবোর্ড</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            এপ্রিল ২০২৫
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            নতুন কন্টেন্ট
          </Button>
        </div>
      </div>
      
      {/* স্ট্যাটিসটিক কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="মোট ভিউ"
          value="৫১.২K"
          change={{ value: 12.5, positive: true }}
          period="গত মাস থেকে"
          icon={<Eye className="h-5 w-5" />}
          color="blue"
        />
        
        <StatCard 
          title="সাবস্ক্রাইবার"
          value="২,১৫০"
          change={{ value: 8.3, positive: true }}
          period="গত মাস থেকে"
          icon={<Users className="h-5 w-5" />}
          color="green"
        />
        
        <StatCard 
          title="কন্টেন্ট সংখ্যা"
          value="৮৫"
          change={{ value: 5, positive: true }}
          period="গত মাস থেকে"
          icon={<Video className="h-5 w-5" />}
          color="purple"
        />
        
        <StatCard 
          title="আয়"
          value="৳ ৪৫.২K"
          change={{ value: 18.5, positive: true }}
          period="গত মাস থেকে"
          icon={<DollarSign className="h-5 w-5" />}
          color="amber"
        />
      </div>
      
      {/* ভিউ এন্ড রেভিনিউ চার্ট */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>ভিউ এবং আয়ের পরিসংখ্যান</CardTitle>
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
                <LineChart
                  data={contentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="views" name="ভিউ" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" name="আয় (৳)" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>কন্টেন্ট বিভাজন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {contentTypes.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {contentTypes.map((entry, i) => (
                <div key={entry.name} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[i % COLORS.length] }} 
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
      
      {/* রিসেন্ট কন্টেন্ট এবং সাবস্ক্রাইবার ট্রেন্ড */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>সাম্প্রতিক কন্টেন্ট</CardTitle>
            <Button variant="outline" size="sm">
              সব কন্টেন্ট
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.map((content) => (
                <div key={content.id} className="flex gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Badge variant="outline" className="mr-2">
                        {content.type}
                      </Badge>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {content.duration}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{content.publishDate}</span>
                    </div>
                    <h3 className="font-medium leading-tight mb-1">{content.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {content.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {content.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {content.comments}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>সাবস্ক্রাইবার ট্রেন্ড</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={subscriberTrends}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="subscribers" 
                    name="নতুন সাবস্ক্রাইবার"
                    stroke="#8884d8" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="border rounded-md p-3 text-center">
                <p className="text-sm text-gray-500">মোট সাবস্ক্রাইবার</p>
                <p className="text-xl font-bold">২,১৫০</p>
              </div>
              <div className="border rounded-md p-3 text-center">
                <p className="text-sm text-gray-500">মাসিক বৃদ্ধি</p>
                <p className="text-xl font-bold text-green-600">+৮.৩%</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">টপ টিয়ার বিভাজন</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>ফ্রি</span>
                    <span>৫৫%</span>
                  </div>
                  <Progress value={55} className="h-2" style={{ backgroundColor: `${COLORS[0]}20` }} />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>বেসিক</span>
                    <span>২৫%</span>
                  </div>
                  <Progress value={25} className="h-2" style={{ backgroundColor: `${COLORS[1]}20` }} />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>প্রিমিয়াম</span>
                    <span>১৫%</span>
                  </div>
                  <Progress value={15} className="h-2" style={{ backgroundColor: `${COLORS[2]}20` }} />
                </div>
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>এন্টারপ্রাইজ</span>
                    <span>৫%</span>
                  </div>
                  <Progress value={5} className="h-2" style={{ backgroundColor: `${COLORS[3]}20` }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* এনগেজমেন্ট এনালাইসিস */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>এনগেজমেন্ট এনালাইসিস</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementRates.map((metric, i) => (
                <div key={metric.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{metric.name}</span>
                    <span className="text-sm font-medium">{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-2" style={{ backgroundColor: `${COLORS[i % COLORS.length]}20` }} />
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">অডিয়েন্স রিটেনশন</p>
                  <p className="text-xl font-bold">৬৮%</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              
              <div className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">গড় ভিউ সময়</p>
                  <p className="text-xl font-bold">৫:৪৫</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>সাম্প্রতিক কমেন্টস</CardTitle>
            <Button variant="outline" size="sm">
              সব কমেন্ট
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between">
                    <p className="font-medium">{comment.user}</p>
                    <p className="text-xs text-gray-500">{comment.time}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{comment.contentTitle}</p>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <div className="flex items-center mt-2 gap-3">
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <Heart className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      রিপ্লাই
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* মানিটাইজেশন এন্ড প্রমোশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>রাজস্ব স্ট্রিম</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">সাবস্ক্রিপশন</span>
                  <span className="text-sm font-medium">৳ ২৮,৫০০ (৬৫%)</span>
                </div>
                <Progress value={65} className="h-2" style={{ backgroundColor: `${COLORS[0]}20` }} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">এফিলিয়েট মার্কেটিং</span>
                  <span className="text-sm font-medium">৳ ৮,৮০০ (২০%)</span>
                </div>
                <Progress value={20} className="h-2" style={{ backgroundColor: `${COLORS[1]}20` }} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">ডোনেশন</span>
                  <span className="text-sm font-medium">৳ ৪,৪০০ (১০%)</span>
                </div>
                <Progress value={10} className="h-2" style={{ backgroundColor: `${COLORS[2]}20` }} />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">বিজ্ঞাপন</span>
                  <span className="text-sm font-medium">৳ ২,২০০ (৫%)</span>
                </div>
                <Progress value={5} className="h-2" style={{ backgroundColor: `${COLORS[3]}20` }} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">পেমেন্ট স্ট্যাটাস</h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-sm text-gray-500">পেন্ডিং</p>
                    <p className="font-medium">৳ ৫,৮০০</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">রিসিভড</p>
                    <p className="font-medium">৳ ৩৯,৪০০</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-1">চলতি মাসে</h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-sm text-gray-500">বৃদ্ধি</p>
                    <p className="font-medium text-green-600">+১৮.৫%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">অনুমান</p>
                    <p className="font-medium">৳ ৫৫K+</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>সাম্প্রতিক সাবস্ক্রাইবার</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscribers.map((subscriber) => (
                <div key={subscriber.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{subscriber.name}</h3>
                        {getContentTierBadge(subscriber.tier)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        সাবস্ক্রাইব: {subscriber.subscribed} • মোট খরচ: {subscriber.totalSpent}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        এনগেজমেন্ট: <span className={`font-medium ${subscriber.engagement === 'উচ্চ' ? 'text-green-600' : 'text-blue-600'}`}>{subscriber.engagement}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        মেসেজ
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব সাবস্ক্রাইবার দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* কন্টেন্ট ক্রিয়েশন টুলস */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>কন্টেন্ট ক্রিয়েশন টুলস</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Video className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">ভিডিও এডিটর</h3>
                  <p className="text-sm text-gray-500 mt-1">প্রফেশনাল ভিডিও এডিটিং টুলস</p>
                  <Button variant="link" className="px-0 h-6 text-blue-600 mt-1">এক্সেস করুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Upload className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">আপলোড সেন্টার</h3>
                  <p className="text-sm text-gray-500 mt-1">কন্টেন্ট আপলোড এবং শেডিউল করুন</p>
                  <Button variant="link" className="px-0 h-6 text-purple-600 mt-1">আপলোড করুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Download className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">কন্টেন্ট লাইব্রেরি</h3>
                  <p className="text-sm text-gray-500 mt-1">এসেট এবং আর্কাইভ এক্সেস করুন</p>
                  <Button variant="link" className="px-0 h-6 text-green-600 mt-1">লাইব্রেরি দেখুন</Button>
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

export default ContentDashboard;
