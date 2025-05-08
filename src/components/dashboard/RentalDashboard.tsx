
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
  Building, 
  Plus, 
  Edit, 
  Calendar, 
  Check, 
  Key, 
  Wrench, 
  AlarmClock, 
  AlertTriangle,
  Home,
  Users,
  MessageSquare,
  Star,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Clock,
  DollarSign,
  Receipt,
  Circle
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

// আয় ডেটা
const incomeData = [
  { name: 'জানু', income: 12000 },
  { name: 'ফেব্রু', income: 15000 },
  { name: 'মার্চ', income: 18000 },
  { name: 'এপ্রিল', income: 16000 },
  { name: 'মে', income: 21000 },
  { name: 'জুন', income: 19000 },
  { name: 'জুলাই', income: 22000 },
];

// অকুপেন্সি রেট ডেটা
const occupancyData = [
  { name: 'জানু', rate: 75 },
  { name: 'ফেব্রু', rate: 82 },
  { name: 'মার্চ', rate: 90 },
  { name: 'এপ্রিল', rate: 85 },
  { name: 'মে', rate: 88 },
  { name: 'জুন', rate: 92 },
  { name: 'জুলাই', rate: 80 },
];

// সম্পত্তি বিভাজন
const propertyTypeData = [
  { name: 'অ্যাপার্টমেন্ট', value: 45 },
  { name: 'হাউস', value: 25 },
  { name: 'কমার্শিয়াল', value: 15 },
  { name: 'অন্যান্য', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// রেন্টাল লিস্টিং
const rentalListings = [
  { 
    id: 1, 
    name: 'মডার্ন ২ বেড অ্যাপার্টমেন্ট', 
    type: 'অ্যাপার্টমেন্ট', 
    location: 'গুলশান, ঢাকা', 
    price: '৳ ৩৫,০০০/মাস', 
    status: 'অকুপাইড', 
    occupiedTill: '৩১ আগস্ট, ২০২৫', 
    rating: 4.8 
  },
  { 
    id: 2, 
    name: 'ফার্নিশড ১ বেড অ্যাপার্টমেন্ট', 
    type: 'অ্যাপার্টমেন্ট', 
    location: 'ধানমন্ডি, ঢাকা', 
    price: '৳ ২২,০০০/মাস', 
    status: 'অকুপাইড', 
    occupiedTill: '১৫ জুলাই, ২০২৫', 
    rating: 4.5 
  },
  { 
    id: 3, 
    name: '৩ বেড ফ্যামিলি হাউস', 
    type: 'হাউস', 
    location: 'উত্তরা, ঢাকা', 
    price: '৳ ৪৫,০০০/মাস', 
    status: 'এভেইলেবল', 
    occupiedTill: null, 
    rating: 4.9 
  },
  { 
    id: 4, 
    name: 'অফিস স্পেস', 
    type: 'কমার্শিয়াল', 
    location: 'বনানী, ঢাকা', 
    price: '৳ ৮০,০০০/মাস', 
    status: 'অকুপাইড', 
    occupiedTill: '৩১ ডিসেম্বর, ২০২৫', 
    rating: 4.7 
  },
  { 
    id: 5, 
    name: 'ইভেন্ট স্পেস', 
    type: 'অন্যান্য', 
    location: 'বসুন্ধরা, ঢাকা', 
    price: '৳ ১৫,০০০/দিন', 
    status: 'এভেইলেবল', 
    occupiedTill: null, 
    rating: 4.6 
  },
];

// সাম্প্রতিক বুকিং
const recentBookings = [
  { 
    id: 'BK-001', 
    property: 'মডার্ন ২ বেড অ্যাপার্টমেন্ট', 
    tenant: 'আবদুল করিম', 
    startDate: '০১ মে, ২০২৫', 
    endDate: '৩০ এপ্রিল, ২০২৬', 
    status: 'কনফার্মড', 
    amount: '৳ ৪,২০,০০০', 
    time: '১ দিন আগে' 
  },
  { 
    id: 'BK-002', 
    property: 'অফিস স্পেস', 
    tenant: 'টেক সলিউশনস লিমিটেড', 
    startDate: '০১ জুন, ২০২৫', 
    endDate: '৩১ মে, ২০২৬', 
    status: 'পেন্ডিং', 
    amount: '৳ ৯,৬০,০০০', 
    time: '৫ ঘন্টা আগে' 
  },
  { 
    id: 'BK-003', 
    property: 'ইভেন্ট স্পেস', 
    tenant: 'ইভেন্ট প্লানার্স', 
    startDate: '২৫ এপ্রিল, ২০২৫', 
    endDate: '২৬ এপ্রিল, ২০২৫', 
    status: 'কনফার্মড', 
    amount: '৳ ৩০,০০০', 
    time: '১২ ঘন্টা আগে' 
  },
  { 
    id: 'BK-004', 
    property: 'ফার্নিশড ১ বেড অ্যাপার্টমেন্ট', 
    tenant: 'ফারহানা রহমান', 
    startDate: '১৫ মে, ২০২৫', 
    endDate: '১৪ নভেম্বর, ২০২৫', 
    status: 'পেন্ডিং', 
    amount: '৳ ১,৩২,০০০', 
    time: '২ দিন আগে' 
  },
];

// মেইনটেনেন্স রিকোয়েস্ট
const maintenanceRequests = [
  { 
    id: 'MR-001', 
    property: 'মডার্ন ২ বেড অ্যাপার্টমেন্ট', 
    issue: 'এয়ার কন্ডিশনার সমস্যা', 
    priority: 'হাই', 
    requestedBy: 'আবদুল করিম', 
    status: 'পেন্ডিং', 
    requestedDate: '১৫ এপ্রিল, ২০২৫' 
  },
  { 
    id: 'MR-002', 
    property: 'ফার্নিশড ১ বেড অ্যাপার্টমেন্ট', 
    issue: 'পানির পাইপ লিক', 
    priority: 'মিডিয়াম', 
    requestedBy: 'মাহমুদা বেগম', 
    status: 'প্রসেসিং', 
    requestedDate: '১২ এপ্রিল, ২০২৫' 
  },
  { 
    id: 'MR-003', 
    property: 'অফিস স্পেস', 
    issue: 'ইন্টারনেট সংযোগ সমস্যা', 
    priority: 'হাই', 
    requestedBy: 'টেক সলিউশনস লিমিটেড', 
    status: 'কমপ্লিটেড', 
    requestedDate: '১০ এপ্রিল, ২০২৫' 
  },
];

// বুকিং স্ট্যাটাস বেজ
const bookingStatusBadge = (status: string) => {
  switch (status) {
    case 'কনফার্মড':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">কনফার্মড</Badge>;
    case 'পেন্ডিং':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">পেন্ডিং</Badge>;
    case 'ক্যানসেলড':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">ক্যানসেলড</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// মেইনটেনেন্স প্রায়োরিটি বেজ
const priorityBadge = (priority: string) => {
  switch (priority) {
    case 'হাই':
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">হাই</Badge>;
    case 'মিডিয়াম':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">মিডিয়াম</Badge>;
    case 'লো':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">লো</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

// মেইনটেনেন্স স্ট্যাটাস বেজ
const maintenanceStatusBadge = (status: string) => {
  switch (status) {
    case 'পেন্ডিং':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">পেন্ডিং</Badge>;
    case 'প্রসেসিং':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">প্রসেসিং</Badge>;
    case 'কমপ্লিটেড':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">কমপ্লিটেড</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const RentalDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">রেন্টাল ড্যাশবোর্ড</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            ক্যালেন্ডার ভিউ
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            নতুন প্রপার্টি
          </Button>
        </div>
      </div>
      
      {/* স্ট্যাটিসটিক কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="মোট আয়"
          value="৳ ১,২৫,০০০"
          change={{ value: 12, positive: true }}
          period="গত মাস থেকে"
          icon={<DollarSign className="h-5 w-5" />}
          color="emerald"
        />
        
        <StatCard 
          title="অকুপেন্সি রেট"
          value="৮৫%"
          change={{ value: 5, positive: true }}
          period="গত ত্রৈমাসিক থেকে"
          icon={<Home className="h-5 w-5" />}
          color="blue"
        />
        
        <StatCard 
          title="সক্রিয় লিজ"
          value="১২"
          change={{ value: 2, positive: true }}
          period="গত মাস থেকে"
          icon={<Key className="h-5 w-5" />}
          color="amber"
        />
        
        <StatCard 
          title="মেইনটেনেন্স রিকোয়েস্ট"
          value="৫"
          change={{ value: 1, positive: false }}
          period="গত সপ্তাহ থেকে"
          icon={<Wrench className="h-5 w-5" />}
          color="red"
        />
      </div>
      
      {/* আয় ও অকুপেন্সি চার্ট */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>আয় এবং অকুপেন্সি ট্রেন্ড</CardTitle>
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
              <LineChart
                data={incomeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="income" 
                  name="আয় (৳)" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="rate" 
                  name="অকুপেন্সি রেট (%)" 
                  stroke="#82ca9d" 
                  data={occupancyData} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* প্রপার্টি লিস্টিং এবং বুকিং */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle>প্রপার্টি লিস্টিং</CardTitle>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue placeholder="ফিল্টার" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব প্রপার্টি</SelectItem>
                  <SelectItem value="occupied">অকুপাইড</SelectItem>
                  <SelectItem value="available">এভেইলেবল</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue placeholder="টাইপ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব টাইপ</SelectItem>
                  <SelectItem value="apartment">অ্যাপার্টমেন্ট</SelectItem>
                  <SelectItem value="house">হাউস</SelectItem>
                  <SelectItem value="commercial">কমার্শিয়াল</SelectItem>
                  <SelectItem value="other">অন্যান্য</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rentalListings.map((property) => (
                <div key={property.id} className="border rounded-md p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{property.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={property.status === 'অকুপাইড' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-green-100 text-green-800 border-green-200'}
                        >
                          {property.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {property.type}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </span>
                        {property.status === 'অকুপাইড' && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {property.occupiedTill}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">{property.price}</p>
                      <p className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {property.rating}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button size="sm" variant="outline">বিস্তারিত দেখুন</Button>
                    <Button size="sm" variant="outline">এডিট করুন</Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব প্রপার্টি দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>প্রপার্টি টাইপ বিভাজন</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {propertyTypeData.map((entry, index) => (
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
      
      {/* বুকিং এবং মেইনটেনেন্স */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>সাম্প্রতিক বুকিং</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{booking.id}</p>
                        {bookingStatusBadge(booking.status)}
                      </div>
                      <p className="text-sm font-medium mt-1">{booking.property}</p>
                      <p className="text-sm text-gray-500">ভাড়াটিয়া: {booking.tenant}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {booking.startDate} - {booking.endDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{booking.amount}</p>
                      <p className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {booking.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব বুকিং দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>মেইনটেনেন্স রিকোয়েস্ট</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{request.id}</p>
                        {priorityBadge(request.priority)}
                        {maintenanceStatusBadge(request.status)}
                      </div>
                      <p className="text-sm font-medium mt-1">{request.property}</p>
                      <p className="text-sm text-gray-500">সমস্যা: {request.issue}</p>
                      <p className="text-sm text-gray-500">অনুরোধকারী: {request.requestedBy}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                        <Calendar className="h-3 w-3" />
                        {request.requestedDate}
                      </p>
                      {request.status !== 'কমপ্লিটেড' && (
                        <Button size="sm" variant="outline" className="mt-2">অ্যাকশন নিন</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              সব রিকোয়েস্ট দেখুন
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* এসেট ম্যানেজমেন্ট */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>এজেন্সি ড্যাশবোর্ড</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Receipt className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">পেমেন্ট স্ট্যাটাস</h3>
                  <p className="text-sm text-gray-500 mt-1">৩টি পেমেন্ট ডিউ আগামী সপ্তাহে</p>
                  <Button variant="link" className="px-0 h-6 text-blue-600 mt-1">পেমেন্ট চেক করুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">লিজ রিনিউয়াল</h3>
                  <p className="text-sm text-gray-500 mt-1">২টি লিজ শেষ হচ্ছে ৩০ দিনের মধ্যে</p>
                  <Button variant="link" className="px-0 h-6 text-green-600 mt-1">রিনিউয়াল শুরু করুন</Button>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium">টেনেন্ট রিকোয়েস্ট</h3>
                  <p className="text-sm text-gray-500 mt-1">৪টি নতুন ভাড়া অনুরোধ</p>
                  <Button variant="link" className="px-0 h-6 text-purple-600 mt-1">রিকোয়েস্ট রিভিউ করুন</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MapPin = ({ className }: { className?: string }) => (
  <Circle className={className} />
);

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
  color: 'blue' | 'emerald' | 'amber' | 'red';
}) => {
  
  const bgColors = {
    blue: 'bg-blue-100',
    emerald: 'bg-emerald-100',
    amber: 'bg-amber-100',
    red: 'bg-red-100'
  };
  
  const textColors = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    red: 'text-red-600'
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

export default RentalDashboard;
