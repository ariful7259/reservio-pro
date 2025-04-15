
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, BarChart } from 'recharts';
import {
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Layers,
  Users,
  Clock,
  MousePointer,
  Timer,
  EyeIcon,
  MousePointerClick,
  Target,
  Zap,
  Download,
  Save,
  FilterX,
} from 'lucide-react';

interface TrackingEvent {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  description: string;
}

interface TrackingCategory {
  id: string;
  name: string;
  enabled: boolean;
  events: string[]; // Event IDs
}

interface UserExperienceData {
  trackingEnabled: boolean;
  anonymizeData: boolean;
  storeLocalData: boolean;
  sessionTimeout: number;
  categories: TrackingCategory[];
  events: TrackingEvent[];
  dataRetentionDays: number;
  sampleRate: number;
  excludedPaths: string[];
}

// মক ডাটা
const mockPageviews = [
  { name: 'হোম', views: 4200, unique: 3100 },
  { name: 'সার্ভিস', views: 2800, unique: 2200 },
  { name: 'মার্কেটপ্লেস', views: 1900, unique: 1500 },
  { name: 'রেন্টাল', views: 2100, unique: 1800 },
  { name: 'প্রোফাইল', views: 1600, unique: 1200 },
  { name: 'ওয়ালেট', views: 1400, unique: 1100 },
];

const mockUserFlow = [
  { path: 'হোম → সার্ভিস → সার্ভিস বিস্তারিত', count: 1200 },
  { path: 'হোম → মার্কেটপ্লেস → প্রোডাক্ট', count: 850 },
  { path: 'হোম → রেন্টাল → হাউজিং', count: 720 },
  { path: 'হোম → ওয়ালেট → বিল পেমেন্ট', count: 650 },
  { path: 'হোম → প্রোফাইল → সেটিংস', count: 450 },
];

const mockDeviceData = [
  { name: 'মোবাইল', value: 65 },
  { name: 'ডেস্কটপ', value: 25 },
  { name: 'ট্যাবলেট', value: 10 },
];

const mockRecentEvents = [
  { user: 'user123', event: 'PAGE_VIEW', path: '/services', time: '2 মিনিট আগে' },
  { user: 'user456', event: 'BUTTON_CLICK', path: '/marketplace', time: '5 মিনিট আগে' },
  { user: 'user789', event: 'FORM_SUBMIT', path: '/rentals', time: '12 মিনিট আগে' },
  { user: 'user234', event: 'AUTH', path: '/login', time: '15 মিনিট আগে' },
  { user: 'user567', event: 'PURCHASE', path: '/checkout', time: '20 মিনিট আগে' },
];

const UserExperienceTracking: React.FC = () => {
  const { toast } = useToast();
  
  const [trackingConfig, setTrackingConfig] = useState<UserExperienceData>({
    trackingEnabled: true,
    anonymizeData: true,
    storeLocalData: true,
    sessionTimeout: 30,
    dataRetentionDays: 90,
    sampleRate: 100,
    excludedPaths: ['/admin-dashboard', '/profile/settings'],
    categories: [
      {
        id: 'page_views',
        name: 'পেজ ভিউ',
        enabled: true,
        events: ['page_load', 'page_exit']
      },
      {
        id: 'user_engagement',
        name: 'ইউজার এনগেজমেন্ট',
        enabled: true,
        events: ['scroll_depth', 'time_spent', 'click']
      },
      {
        id: 'conversion',
        name: 'কনভার্সন',
        enabled: true,
        events: ['purchase', 'signup', 'booking_complete']
      },
      {
        id: 'error_tracking',
        name: 'এরর ট্র্যাকিং',
        enabled: true,
        events: ['js_error', 'api_error', 'form_error']
      },
      {
        id: 'performance',
        name: 'পারফরম্যান্স',
        enabled: true,
        events: ['page_load_time', 'api_response_time']
      }
    ],
    events: [
      {
        id: 'page_load',
        name: 'পেজ লোড',
        category: 'page_views',
        enabled: true,
        description: 'যখন একটি পেজ সম্পূর্ণরূপে লোড হয়'
      },
      {
        id: 'page_exit',
        name: 'পেজ এক্সিট',
        category: 'page_views',
        enabled: true,
        description: 'যখন ব্যবহারকারী একটি পেজ ছেড়ে যায়'
      },
      {
        id: 'scroll_depth',
        name: 'স্ক্রল ডেপথ',
        category: 'user_engagement',
        enabled: true,
        description: 'কতটা গভীরে ব্যবহারকারী পেজে স্ক্রল করেছে'
      },
      {
        id: 'time_spent',
        name: 'টাইম স্পেন্ট',
        category: 'user_engagement',
        enabled: true,
        description: 'ব্যবহারকারী কতক্ষণ পেজে ছিল'
      },
      {
        id: 'click',
        name: 'ক্লিক',
        category: 'user_engagement',
        enabled: true,
        description: 'বিভিন্ন এলিমেন্টে ক্লিক'
      },
      {
        id: 'purchase',
        name: 'পারচেজ',
        category: 'conversion',
        enabled: true,
        description: 'কেনাকাটা সম্পন্ন'
      },
      {
        id: 'signup',
        name: 'সাইনআপ',
        category: 'conversion',
        enabled: true,
        description: 'নতুন একাউন্ট তৈরি'
      },
      {
        id: 'booking_complete',
        name: 'বুকিং কমপ্লিট',
        category: 'conversion',
        enabled: true,
        description: 'সার্ভিস বুকিং সম্পন্ন'
      },
      {
        id: 'js_error',
        name: 'জাভাস্ক্রিপ্ট এরর',
        category: 'error_tracking',
        enabled: true,
        description: 'ফ্রন্টএন্ড জাভাস্ক্রিপ্ট এরর'
      },
      {
        id: 'api_error',
        name: 'API এরর',
        category: 'error_tracking',
        enabled: true,
        description: 'API কল ব্যর্থ হওয়া'
      },
      {
        id: 'form_error',
        name: 'ফর্ম এরর',
        category: 'error_tracking',
        enabled: true,
        description: 'ফর্ম সাবমিশন এরর'
      },
      {
        id: 'page_load_time',
        name: 'পেজ লোড টাইম',
        category: 'performance',
        enabled: true,
        description: 'পেজ লোড হতে সময় লাগা'
      },
      {
        id: 'api_response_time',
        name: 'API রেসপন্স টাইম',
        category: 'performance',
        enabled: true,
        description: 'API কল রেসপন্স টাইম'
      }
    ]
  });
  
  const [filterDate, setFilterDate] = useState('last7days');
  
  // মেইন ট্র্যাকিং টগল ফাংশন
  const handleTrackingToggle = (enabled: boolean) => {
    setTrackingConfig({
      ...trackingConfig,
      trackingEnabled: enabled
    });
    
    toast({
      title: enabled ? "ব্যবহারকারী অভিজ্ঞতা ট্র্যাকিং চালু করা হয়েছে" : "ব্যবহারকারী অভিজ্ঞতা ট্র্যাকিং বন্ধ করা হয়েছে",
      description: enabled 
        ? "এখন আপনি ব্যবহারকারীদের আচরণ এবং অভিজ্ঞতা সম্পর্কে ডাটা দেখতে পারবেন।" 
        : "আপনি ব্যবহারকারীদের আচরণ এবং অভিজ্ঞতা সম্পর্কে ডাটা দেখতে পারবেন না।",
    });
  };
  
  // প্রাইভেসি সেটিংস টগল ফাংশন
  const handlePrivacySettingToggle = (setting: keyof UserExperienceData, value: boolean) => {
    setTrackingConfig({
      ...trackingConfig,
      [setting]: value
    });
  };
  
  // নিউমেরিক সেটিং পরিবর্তন ফাংশন
  const handleNumericSettingChange = (setting: keyof UserExperienceData, value: number) => {
    setTrackingConfig({
      ...trackingConfig,
      [setting]: value
    });
  };
  
  // ক্যাটাগরি টগল ফাংশন
  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    setTrackingConfig({
      ...trackingConfig,
      categories: trackingConfig.categories.map(category => 
        category.id === categoryId 
          ? { ...category, enabled } 
          : category
      )
    });
  };
  
  // ইভেন্ট টগল ফাংশন
  const handleEventToggle = (eventId: string, enabled: boolean) => {
    setTrackingConfig({
      ...trackingConfig,
      events: trackingConfig.events.map(event => 
        event.id === eventId 
          ? { ...event, enabled } 
          : event
      )
    });
  };
  
  // এক্সক্লুডেড পাথ অ্যাড ফাংশন
  const handleAddExcludedPath = (path: string) => {
    if (path && !trackingConfig.excludedPaths.includes(path)) {
      setTrackingConfig({
        ...trackingConfig,
        excludedPaths: [...trackingConfig.excludedPaths, path]
      });
    }
  };
  
  // এক্সক্লুডেড পাথ রিমুভ ফাংশন
  const handleRemoveExcludedPath = (path: string) => {
    setTrackingConfig({
      ...trackingConfig,
      excludedPaths: trackingConfig.excludedPaths.filter(p => p !== path)
    });
  };
  
  // কনফিগারেশন সেভ ফাংশন
  const handleSaveConfig = () => {
    console.log('Saving tracking configuration:', trackingConfig);
    
    toast({
      title: "ট্র্যাকিং কনফিগারেশন সেভ করা হয়েছে",
      description: "ব্যবহারকারী অভিজ্ঞতা ট্র্যাকিং সেটিংস আপডেট করা হয়েছে।",
    });
  };
  
  // ডাটা এক্সপোর্ট ফাংশন
  const handleExportData = () => {
    toast({
      title: "ট্র্যাকিং ডাটা এক্সপোর্ট করা হচ্ছে",
      description: "ট্র্যাকিং ডাটা CSV ফরম্যাটে ডাউনলোড শুরু হবে।",
    });
  };
  
  // ক্যাটাগরি অনুসারে ইভেন্ট ফিল্টার করার ফাংশন
  const getEventsByCategory = (categoryId: string) => {
    return trackingConfig.events.filter(event => event.category === categoryId);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            <span>ব্যবহারকারী অভিজ্ঞতা ট্র্যাকিং</span>
          </CardTitle>
          <CardDescription>
            আপনার অ্যাপের ব্যবহারকারীদের আচরণ এবং অ্যাপ ব্যবহারের অভিজ্ঞতা ট্র্যাক করুন এবং বিশ্লেষণ করুন।
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">ড্যাশবোর্ড</TabsTrigger>
              <TabsTrigger value="events">ইভেন্ট</TabsTrigger>
              <TabsTrigger value="settings">সেটিংস</TabsTrigger>
              <TabsTrigger value="privacy">প্রাইভেসি</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Select
                    value={filterDate}
                    onValueChange={setFilterDate}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">গত ৭ দিন</SelectItem>
                      <SelectItem value="last30days">গত ৩০ দিন</SelectItem>
                      <SelectItem value="last90days">গত ৯০ দিন</SelectItem>
                      <SelectItem value="lastyear">গত বছর</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm" onClick={handleExportData}>
                    <Download className="h-4 w-4 mr-2" />
                    এক্সপোর্ট
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">ট্র্যাকিং স্ট্যাটাস:</span>
                  <Badge variant={trackingConfig.trackingEnabled ? "success" : "destructive"}>
                    {trackingConfig.trackingEnabled ? "এনাবল" : "ডিজেবল"}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">ইউনিক ভিজিটর</p>
                        <h3 className="text-2xl font-bold">12,458</h3>
                        <p className="text-xs text-green-600">+12.5% গত সপ্তাহের থেকে</p>
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">পেজ ভিউ</p>
                        <h3 className="text-2xl font-bold">35,892</h3>
                        <p className="text-xs text-green-600">+8.3% গত সপ্তাহের থেকে</p>
                      </div>
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <EyeIcon className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">গড় সেশন সময়</p>
                        <h3 className="text-2xl font-bold">4:32</h3>
                        <p className="text-xs text-red-600">-2.1% গত সপ্তাহের থেকে</p>
                      </div>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">কনভার্সন রেট</p>
                        <h3 className="text-2xl font-bold">5.8%</h3>
                        <p className="text-xs text-green-600">+0.7% গত সপ্তাহের থেকে</p>
                      </div>
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Target className="h-5 w-5 text-amber-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">সর্বাধিক ভিজিটেড পেজ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <BarChart 
                        data={mockPageviews} 
                        width={500} 
                        height={250}
                        margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
                      >
                        {/* Chart would render here in a real implementation */}
                      </BarChart>
                    </div>
                    <div className="space-y-2 mt-2">
                      {mockPageviews.map((page, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{page.name}</span>
                          <div className="flex gap-4">
                            <span>{page.views.toLocaleString()} ভিউ</span>
                            <span className="text-muted-foreground">{page.unique.toLocaleString()} ইউনিক</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ডিভাইস ব্রেকডাউন</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-52 flex items-center justify-center">
                      <div className="w-36 h-36 rounded-full border-8 border-blue-500 relative flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">65%</div>
                          <div className="text-xs text-muted-foreground">মোবাইল</div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full border-4 border-purple-500 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-sm font-bold">25%</div>
                            <div className="text-[10px] text-muted-foreground">ডেস্কটপ</div>
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xs font-bold">10%</div>
                            <div className="text-[8px] text-muted-foreground">ট্যাব</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="flex justify-between w-full text-sm">
                          <span>মোবাইল</span>
                          <span className="font-medium">65%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <div className="flex justify-between w-full text-sm">
                          <span>ডেস্কটপ</span>
                          <span className="font-medium">25%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="flex justify-between w-full text-sm">
                          <span>ট্যাবলেট</span>
                          <span className="font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">ইউজার ফ্লো</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockUserFlow.map((flow, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{flow.path}</div>
                            <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                              <div 
                                className="h-2 bg-blue-500 rounded-full" 
                                style={{ width: `${(flow.count / mockUserFlow[0].count) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-4 text-sm font-medium">
                            {flow.count.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">সাম্প্রতিক ইভেন্ট</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left pb-2 font-medium text-sm">ইউজার</th>
                            <th className="text-left pb-2 font-medium text-sm">ইভেন্ট</th>
                            <th className="text-left pb-2 font-medium text-sm">পাথ</th>
                            <th className="text-right pb-2 font-medium text-sm">সময়</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockRecentEvents.map((event, index) => (
                            <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                              <td className="py-2 text-sm">{event.user}</td>
                              <td className="py-2 text-sm">
                                <Badge variant="outline" className="font-normal">
                                  {event.event}
                                </Badge>
                              </td>
                              <td className="py-2 text-sm">{event.path}</td>
                              <td className="py-2 text-sm text-right text-muted-foreground">{event.time}</td>
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
                  <CardTitle className="text-base">পারফরম্যান্স মেট্রিক্স</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">গড় পেজ লোড টাইম</span>
                        <span className="text-sm font-medium">1.8s</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full" 
                          style={{ width: '70%' }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        ইন্ডাস্ট্রি গড়: 2.5s
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ফার্স্ট কন্টেন্ট পেইন্ট</span>
                        <span className="text-sm font-medium">0.9s</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: '85%' }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        ইন্ডাস্ট্রি গড়: 1.2s
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">ইন্টারেকশন টু নেক্সট পেইন্ট</span>
                        <span className="text-sm font-medium">120ms</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full">
                        <div 
                          className="h-2 bg-purple-500 rounded-full" 
                          style={{ width: '90%' }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground text-right">
                        ইন্ডাস্ট্রি গড়: 150ms
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">ট্র্যাকিং ক্যাটাগরি</h3>
                  <span className="text-sm text-muted-foreground">
                    {trackingConfig.categories.filter(cat => cat.enabled).length} / {trackingConfig.categories.length} এনাবল করা
                  </span>
                </div>
                
                {trackingConfig.categories.map((category) => (
                  <div key={category.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={category.enabled}
                          onCheckedChange={(checked) => handleCategoryToggle(category.id, checked)}
                        />
                        <h4 className="font-medium">{category.name}</h4>
                      </div>
                      <Badge variant={category.enabled ? "default" : "outline"}>
                        {getEventsByCategory(category.id).length} ইভেন্ট
                      </Badge>
                    </div>
                    
                    <div className="pl-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {getEventsByCategory(category.id).map((event) => (
                        <div key={event.id} className="flex items-center justify-between border rounded-md p-2">
                          <div>
                            <div className="font-medium text-sm">{event.name}</div>
                            <div className="text-xs text-muted-foreground">{event.description}</div>
                          </div>
                          <Switch 
                            checked={event.enabled}
                            onCheckedChange={(checked) => handleEventToggle(event.id, checked)}
                            disabled={!category.enabled}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">কাস্টম ইভেন্ট ট্র্যাকিং</CardTitle>
                  <CardDescription>
                    আপনার অ্যাপে বিশেষ ইভেন্ট ট্র্যাক করতে নীচের কোড বিবরণ ব্যবহার করুন।
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                      <p className="text-gray-800">// কাস্টম ইভেন্ট ট্র্যাক করা</p>
                      <p className="text-green-600">trackEvent(<span className="text-purple-600">'event_name'</span>, {`{`}</p>
                      <p className="text-green-600 ml-4">category: <span className="text-purple-600">'category_name'</span>,</p>
                      <p className="text-green-600 ml-4">value: <span className="text-purple-600">value</span>,</p>
                      <p className="text-green-600 ml-4">properties: {`{`} <span className="text-purple-600">key: 'value'</span> {`}`}</p>
                      <p className="text-green-600">{`});`}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md text-sm font-mono">
                      <p className="text-gray-800">// উদাহরণ - পণ্য দেখা ট্র্যাক করা</p>
                      <p className="text-green-600">trackEvent(<span className="text-purple-600">'view_product'</span>, {`{`}</p>
                      <p className="text-green-600 ml-4">category: <span className="text-purple-600">'ecommerce'</span>,</p>
                      <p className="text-green-600 ml-4">value: <span className="text-purple-600">product.price</span>,</p>
                      <p className="text-green-600 ml-4">properties: {`{`}</p>
                      <p className="text-green-600 ml-8">product_id: <span className="text-purple-600">product.id</span>,</p>
                      <p className="text-green-600 ml-8">product_name: <span className="text-purple-600">product.name</span>,</p>
                      <p className="text-green-600 ml-8">category: <span className="text-purple-600">product.category</span></p>
                      <p className="text-green-600 ml-4">{`}`}</p>
                      <p className="text-green-600">{`});`}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="flex items-center justify-between border p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">ব্যবহারকারী অভিজ্ঞতা ট্র্যাকিং</h3>
                    <p className="text-sm text-muted-foreground">
                      ব্যবহারকারীদের আচরণ এবং অ্যাপের ব্যবহার ট্র্যাক করুন
                    </p>
                  </div>
                </div>
                <Switch
                  checked={trackingConfig.trackingEnabled}
                  onCheckedChange={handleTrackingToggle}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>সেশন টাইমআউট (মিনিট)</Label>
                  <Input 
                    type="number" 
                    value={trackingConfig.sessionTimeout}
                    onChange={(e) => handleNumericSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    ইনাক্টিভিটির পর সেশন শেষ হবে এই সময়ে।
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>ডাটা রিটেনশন (দিন)</Label>
                  <Input 
                    type="number" 
                    value={trackingConfig.dataRetentionDays}
                    onChange={(e) => handleNumericSettingChange('dataRetentionDays', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    ট্র্যাকিং ডাটা যতদিন সংরক্ষণ করা হবে।
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>স্যাম্পল রেট (%)</Label>
                  <Input 
                    type="number" 
                    value={trackingConfig.sampleRate}
                    onChange={(e) => handleNumericSettingChange('sampleRate', parseInt(e.target.value))}
                    min="1"
                    max="100"
                  />
                  <p className="text-xs text-muted-foreground">
                    ট্র্যাক করা ব্যবহারকারীদের শতাংশ। 100% = সব ব্যবহারকারী।
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="font-medium mb-3">এক্সক্লুডেড পাথ</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="/admin-dashboard, /profile/*"
                    id="excluded-path"
                  />
                  <Button 
                    onClick={() => {
                      const input = document.getElementById('excluded-path') as HTMLInputElement;
                      handleAddExcludedPath(input.value);
                      input.value = '';
                    }}
                  >
                    যোগ করুন
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {trackingConfig.excludedPaths.map((path) => (
                    <Badge key={path} variant="secondary" className="px-2 py-1">
                      {path}
                      <button 
                        className="ml-2 text-gray-400 hover:text-gray-500"
                        onClick={() => handleRemoveExcludedPath(path)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground">
                  এই পাথগুলি ট্র্যাকিং থেকে বাদ দেওয়া হবে। ওয়াইল্ডকার্ড ব্যবহার করতে * চিহ্ন ব্যবহার করুন।
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>প্রাইভেসি সেটিংস</CardTitle>
                  <CardDescription>
                    ব্যবহারকারীর প্রাইভেসি সংরক্ষণ এবং ডাটা সংগ্রহ সম্পর্কিত সেটিংস।
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="anonymize-data">ডাটা অ্যানোনিমাইজ করুন</Label>
                      <p className="text-sm text-muted-foreground">
                        ব্যবহারকারীর ব্যক্তিগত তথ্য ছাড়া ট্র্যাকিং ডাটা সংগ্রহ করুন।
                      </p>
                    </div>
                    <Switch 
                      id="anonymize-data"
                      checked={trackingConfig.anonymizeData}
                      onCheckedChange={(checked) => handlePrivacySettingToggle('anonymizeData', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="local-storage">লোকাল স্টোরেজ ব্যবহার করুন</Label>
                      <p className="text-sm text-muted-foreground">
                        অফলাইন মোডে ট্র্যাকিং ডাটা সংরক্ষণ করুন।
                      </p>
                    </div>
                    <Switch 
                      id="local-storage"
                      checked={trackingConfig.storeLocalData}
                      onCheckedChange={(checked) => handlePrivacySettingToggle('storeLocalData', checked)}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">প্রাইভেসি নোটিশ ডকুমেন্টেশন</h3>
                    <p className="text-sm text-muted-foreground">
                      আপনার অ্যাপে ব্যবহারকারীদের জন্য প্রাইভেসি নোটিশ নমুনা:
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-md text-sm">
                      <p className="font-medium mb-2">আমরা কী ডাটা সংগ্রহ করি?</p>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>আপনার ব্যবহারকৃত পেজ এবং ফিচার</li>
                        <li>আপনার সেশন সময় এবং অ্যাপ ব্যবহার প্যাটার্ন</li>
                        <li>ডিভাইস এবং ব্রাউজার তথ্য</li>
                        <li>অ্যাপ পারফরম্যান্স ডাটা</li>
                      </ul>
                      
                      <p className="font-medium mt-4 mb-2">আমরা এই ডাটা কেন ব্যবহার করি?</p>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>আপনার ব্যবহারকারী অভিজ্ঞতা উন্নত করতে</li>
                        <li>অ্যাপের পারফরম্যান্স মনিটর করতে</li>
                        <li>নতুন ফিচার এবং স্কেলেবিলিটি প্ল্যান করতে</li>
                        <li>ব্যবহারকারীদের সমস্যা সমাধান করতে</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => window.open('https://example.com/privacy-policy', '_blank')}>
                    প্রাইভেসি পলিসি দেখুন
                  </Button>
                  <Button variant="destructive">
                    <FilterX className="h-4 w-4 mr-2" />
                    সব ট্র্যাকিং ডাটা ক্লিয়ার করুন
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveConfig}>
              <Save className="h-4 w-4 mr-2" />
              কনফিগারেশন সেভ করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserExperienceTracking;
