
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, Search, Filter, BarChart3, Calendar, 
  Clock, Target, Code, Upload, Download,
  Settings, Zap, Globe, Shield, MessageSquare
} from 'lucide-react';

const AdvancedFeatures = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'নতুন অর্ডার এসেছে', time: '৫ মিনিট আগে', type: 'order' },
    { id: 2, title: 'পেমেন্ট সম্পন্ন হয়েছে', time: '১০ মিনিট আগে', type: 'payment' },
    { id: 3, title: 'ডিসপিউট রিপোর্ট', time: '১ ঘন্টা আগে', type: 'dispute' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const analyticsData = [
    { label: 'মোট ভিউ', value: '২,৪৫০', change: '+১২%', color: 'text-blue-600' },
    { label: 'কনভার্শন রেট', value: '৮.৫%', change: '+৩%', color: 'text-green-600' },
    { label: 'গড় অর্ডার ভ্যালু', value: '৳৪,২০০', change: '+৭%', color: 'text-purple-600' },
    { label: 'রিটার্ন কাস্টমার', value: '৬৫%', change: '+৫%', color: 'text-orange-600' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Facebook Ads ক্যাম্পেইন শুরু', date: '২৮ নভেম্বর', time: '১০:০০ AM' },
    { id: 2, title: 'ক্লায়েন্ট মিটিং', date: '২৯ নভেম্বর', time: '২:৩০ PM' },
    { id: 3, title: 'প্রজেক্ট ডেলিভারি', date: '৩০ নভেম্বর', time: '৫:০০ PM' }
  ];

  const performanceMetrics = [
    { metric: 'রেসপন্স টাইম', value: '< ২ মিনিট', status: 'excellent' },
    { metric: 'ক্লায়েন্ট স্যাটিসফ্যাকশন', value: '৪.৮/৫.০', status: 'good' },
    { metric: 'প্রজেক্ট কমপ্লিশন', value: '৯৫%', status: 'excellent' },
    { metric: 'রিভিশন রেট', value: '১৫%', status: 'average' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'average': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">নোটিফিকেশন</span>
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">সার্চ & ফিল্টার</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">অ্যানালিটিক্স</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">ক্যালেন্ডার</span>
          </TabsTrigger>
        </TabsList>

        {/* Real-time Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                রিয়েল-টাইম নোটিফিকেশন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        notification.type === 'order' ? 'bg-green-500' :
                        notification.type === 'payment' ? 'bg-blue-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  সব দেখুন
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  সেটিংস
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Search & Filter */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-green-600" />
                অ্যাডভান্সড সার্চ ও ফিল্টার
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="অর্ডার, ক্লায়েন্ট বা সার্ভিস সার্চ করুন..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">ফিল্টার অপশন:</h4>
                <div className="flex flex-wrap gap-2">
                  {['সব অর্ডার', 'চলমান', 'সম্পন্ন', 'পেন্ডিং', 'রিভিউ', 'এই সপ্তাহ', 'এই মাস'].map((filter) => (
                    <Badge
                      key={filter}
                      variant={activeFilters.includes(filter) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        setActiveFilters(prev => 
                          prev.includes(filter) 
                            ? prev.filter(f => f !== filter)
                            : [...prev, filter]
                        );
                      }}
                    >
                      <Filter className="h-3 w-3 mr-1" />
                      {filter}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">তারিখ রেঞ্জ</label>
                  <div className="flex gap-2">
                    <Input type="date" className="flex-1" />
                    <Input type="date" className="flex-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">মূল্য রেঞ্জ</label>
                  <div className="flex gap-2">
                    <Input placeholder="মিন ৳" className="flex-1" />
                    <Input placeholder="ম্যাক্স ৳" className="flex-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Dashboard */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analyticsData.map((data, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{data.label}</p>
                      <p className={`text-2xl font-bold ${data.color}`}>{data.value}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{data.change}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                পারফরমেন্স ট্র্যাকিং
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{metric.metric}</span>
                    <Badge className={getStatusColor(metric.status)}>
                      {metric.value}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  রিপোর্ট ডাউনলোড
                </Button>
                <Button variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  বিস্তারিত চার্ট
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Calendar & Auto Reminder */}
        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  বুকিং ক্যালেন্ডার
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Clock className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  নতুন ইভেন্ট যোগ করুন
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  অটো রিমাইন্ডার
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>প্রজেক্ট ডেডলাইন রিমাইন্ডার</span>
                    <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>মিটিং নোটিফিকেশন</span>
                    <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>পেমেন্ট রিমাইন্ডার</span>
                    <Badge className="bg-gray-100 text-gray-800">বন্ধ</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  রিমাইন্ডার সেটিংস
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-indigo-600" />
                API ইন্টিগ্রেশন
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">উপলব্ধ API:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">পেমেন্ট API</span>
                      <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">অর্ডার API</span>
                      <Badge className="bg-green-100 text-green-800">সক্রিয়</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">নোটিফিকেশন API</span>
                      <Badge className="bg-gray-100 text-gray-800">বন্ধ</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">API Key ম্যানেজমেন্ট:</h4>
                  <Input type="password" value="sk_test_****" readOnly />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-1" />
                      নতুন Key
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Code className="h-4 w-4 mr-1" />
                      ডকুমেন্টেশন
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedFeatures;
