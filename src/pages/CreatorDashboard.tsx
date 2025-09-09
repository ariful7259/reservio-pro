import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye,
  Plus,
  BarChart3,
  Settings,
  Calendar,
  Star,
  FileText,
  Video,
  Download,
  CreditCard,
  Target,
  Percent,
  Clock,
  ArrowDownLeft,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const dashboardStats = {
    totalCourses: 5,
    totalProducts: 12,
    totalRevenue: 125000,
    totalStudents: 450,
    monthlyGrowth: 23.5,
    adSpend: 25000,
    adROI: 420,
    totalCommission: 6250
  };

  const recentCourses = [
    {
      id: 1,
      title: 'ডিজিটাল মার্কেটিং মাস্টারক্লাস',
      students: 120,
      revenue: 45000,
      status: 'published',
      progress: 95,
      rating: 4.8
    },
    {
      id: 2,
      title: 'ওয়েব ডেভেলপমেন্ট বেসিক',
      students: 85,
      revenue: 28000,
      status: 'draft',
      progress: 60,
      rating: 4.6
    },
    {
      id: 3,
      title: 'গ্রাফিক ডিজাইন ফান্ডামেন্টালস',
      students: 200,
      revenue: 52000,
      status: 'published',
      progress: 100,
      rating: 4.9
    }
  ];

  const recentProducts = [
    {
      id: 1,
      title: 'প্রো ডিজাইন টেমপ্লেট প্যাক',
      downloads: 340,
      revenue: 15000,
      type: 'template',
      status: 'active'
    },
    {
      id: 2,
      title: 'মার্কেটিং গাইড ইবুক',
      downloads: 156,
      revenue: 8500,
      type: 'ebook',
      status: 'active'
    },
    {
      id: 3,
      title: 'ব্র্যান্ডিং প্রিসেট কালেকশন',
      downloads: 89,
      revenue: 12000,
      type: 'preset',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template':
        return <FileText className="h-4 w-4" />;
      case 'ebook':
        return <BookOpen className="h-4 w-4" />;
      case 'preset':
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="container pt-20 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">ক্রিয়েটর ড্যাশবোর্ড</h1>
          <p className="text-muted-foreground mt-1">
            আপনার কোর্স এবং ডিজিটাল প্রোডাক্ট ম্যানেজ করুন
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => navigate('/course-builder')}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            নতুন কোর্স
          </Button>
          <Button 
            onClick={() => navigate('/create-digital-product')}
          >
            <Plus className="h-4 w-4 mr-2" />
            নতুন প্রোডাক্ট
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">ওভারভিউ</TabsTrigger>
          <TabsTrigger value="courses">কোর্স সমূহ</TabsTrigger>
          <TabsTrigger value="products">প্রোডাক্ট সমূহ</TabsTrigger>
          <TabsTrigger value="payments">পেমেন্ট</TabsTrigger>
          <TabsTrigger value="analytics">অ্যানালিটিক্স</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">মোট কোর্স</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">+১২% গত মাস থেকে</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">মোট প্রোডাক্ট</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">+৮% গত মাস থেকে</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">মোট আয়</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{dashboardStats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+{dashboardStats.monthlyGrowth}% গত মাস থেকে</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">মোট শিক্ষার্থী</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">+১৫% গত মাস থেকে</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">মাসিক বৃদ্ধি</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.monthlyGrowth}%</div>
                <p className="text-xs text-muted-foreground">স্থিতিশীল বৃদ্ধি</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">অ্যাড খরচ</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{dashboardStats.adSpend.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">এই মাসে</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">অ্যাড ROI</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.adROI}%</div>
                <p className="text-xs text-muted-foreground">+৫৫% গত মাস থেকে</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">মোট কমিশন</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{dashboardStats.totalCommission.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">প্ল্যাটফর্ম ফি</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">নেট আয়</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">৳{(dashboardStats.totalRevenue - dashboardStats.totalCommission).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">কমিশন বাদে</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  সাম্প্রতিক কোর্স সমূহ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{course.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </span>
                          <span>৳{course.revenue.toLocaleString()}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>অগ্রগতি</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge className={getStatusColor(course.status)}>
                          {course.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Products */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  সাম্প্রতিক প্রোডাক্ট সমূহ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-md">
                          {getTypeIcon(product.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{product.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {product.downloads}
                            </span>
                            <span>৳{product.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(product.status)}>
                          {product.status === 'active' ? 'সক্রিয়' : product.status === 'pending' ? 'অপেক্ষমান' : product.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">আপনার কোর্স সমূহ</h2>
            <Button onClick={() => navigate('/course-builder')}>
              <Plus className="h-4 w-4 mr-2" />
              নতুন কোর্স তৈরি করুন
            </Button>
          </div>
          
          <div className="grid gap-4">
            {recentCourses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <div className="flex items-center gap-6 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {course.students} শিক্ষার্থী
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {course.rating} রেটিং
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ৳{course.revenue.toLocaleString()} আয়
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span>কোর্স সম্পূর্ণতা</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                      <Badge className={getStatusColor(course.status)}>
                        {course.status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        এডিট
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        অ্যানালিটিক্স
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">আপনার ডিজিটাল প্রোডাক্ট সমূহ</h2>
            <Button onClick={() => navigate('/create-digital-product')}>
              <Plus className="h-4 w-4 mr-2" />
              নতুন প্রোডাক্ট তৈরি করুন
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {getTypeIcon(product.type)}
                    </div>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status === 'active' ? 'সক্রিয়' : product.status === 'pending' ? 'অপেক্ষমান' : product.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>ডাউনলোড:</span>
                      <span>{product.downloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>আয়:</span>
                      <span className="font-medium text-primary">৳{product.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-1" />
                      এডিট
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      ভিউ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                পেমেন্ট ওভারভিউ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">পেন্ডিং পেমেন্ট</p>
                      <p className="text-xl font-bold">৳১৫,৫০০</p>
                    </div>
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">এই মাসের আয়</p>
                      <p className="text-xl font-bold">৳৪৫,২০০</p>
                    </div>
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">মোট উইথড্রয়াল</p>
                      <p className="text-xl font-bold">৳৮৯,৭০০</p>
                    </div>
                    <ArrowDownLeft className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">উপলব্ধ ব্যালেন্স</p>
                      <p className="text-xl font-bold">৳২৩,৮০০</p>
                    </div>
                    <Wallet className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  উইথড্রয়াল রিকোয়েস্ট
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  পেমেন্ট হিস্টরি
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                অ্যানালিটিক্স ড্যাশবোর্ড
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>বিস্তারিত অ্যানালিটিক্স শীঘ্রই আসছে...</p>
                <p className="text-sm mt-2">আপনার কোর্স এবং প্রোডাক্টের পারফরমেন্স ট্র্যাক করুন</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreatorDashboard;