
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { 
  Calendar as CalendarIcon, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Clock, 
  User, 
  Home, 
  Banknote,
  ChevronDown,
  Edit,
  Eye,
  BookOpen,
  Plus,
  Settings,
  BarChart3,
  Shield,
  GanttChart,
  MailQuestion,
  MapPin,
  Check
} from 'lucide-react';

interface RentalItem {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  location: string;
  status: 'available' | 'rented' | 'maintenance';
  image?: string;
  bookedDates?: {
    startDate: Date;
    endDate: Date;
    customerId: string;
  }[];
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  totalRentals: number;
  status: 'active' | 'blacklisted';
}

interface RentalRequest {
  id: string;
  itemId: string;
  itemName: string;
  customerName: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'approved' | 'rejected';
}

const SAMPLE_RENTAL_ITEMS: RentalItem[] = [
  {
    id: 'item-001',
    name: 'DSLR ক্যামেরা - Canon EOS 5D',
    category: 'ইলেকট্রনিক্স',
    pricePerDay: 1200,
    location: 'ধানমন্ডি, ঢাকা',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    bookedDates: []
  },
  {
    id: 'item-002',
    name: 'মাউন্টেন বাইক',
    category: 'স্পোর্টস',
    pricePerDay: 500,
    location: 'মিরপুর, ঢাকা',
    status: 'rented',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    bookedDates: [
      {
        startDate: new Date(2025, 3, 5),
        endDate: new Date(2025, 3, 10),
        customerId: 'cust-001'
      }
    ]
  },
  {
    id: 'item-003',
    name: 'পোর্টেবল জেনারেটর',
    category: 'টুলস',
    pricePerDay: 1500,
    location: 'উত্তরা, ঢাকা',
    status: 'maintenance',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    bookedDates: []
  }
];

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    name: 'রহিম আহমেদ',
    phone: '০১৭১২৩৪৫৬৭৮',
    totalRentals: 5,
    status: 'active'
  },
  {
    id: 'cust-002',
    name: 'সাদিয়া রহমান',
    phone: '০১৮১২৩৪৫৬৭৮',
    totalRentals: 2,
    status: 'active'
  },
  {
    id: 'cust-003',
    name: 'করিম মিয়া',
    phone: '০১৯১২৩৪৫৬৭৮',
    totalRentals: 1,
    status: 'blacklisted'
  }
];

const SAMPLE_REQUESTS: RentalRequest[] = [
  {
    id: 'req-001',
    itemId: 'item-001',
    itemName: 'DSLR ক্যামেরা - Canon EOS 5D',
    customerName: 'ফারিহা খান',
    startDate: new Date(2025, 3, 15),
    endDate: new Date(2025, 3, 18),
    status: 'pending'
  },
  {
    id: 'req-002',
    itemId: 'item-003',
    itemName: 'পোর্টেবল জেনারেটর',
    customerName: 'আসিফ হোসেন',
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 3, 25),
    status: 'approved'
  }
];

const RentalManagementDashboard: React.FC = () => {
  const { toast } = useToast();
  const [rentalItems, setRentalItems] = useState<RentalItem[]>(SAMPLE_RENTAL_ITEMS);
  const [customers, setCustomers] = useState<Customer[]>(SAMPLE_CUSTOMERS);
  const [requests, setRequests] = useState<RentalRequest[]>(SAMPLE_REQUESTS);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedItem, setSelectedItem] = useState<RentalItem | null>(null);
  const [availabilityMode, setAvailabilityMode] = useState(false);

  const totalItems = rentalItems.length;
  const availableItems = rentalItems.filter(item => item.status === 'available').length;
  const activeCustomers = customers.filter(customer => customer.status === 'active').length;
  const pendingRequests = requests.filter(req => req.status === 'pending').length;

  const todayEarnings = 3500;
  const weeklyEarnings = 22500;
  const monthlyEarnings = 95000;

  const handleStatusChange = (itemId: string, newStatus: 'available' | 'rented' | 'maintenance') => {
    setRentalItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
    
    toast({
      title: "স্ট্যাটাস আপডেট হয়েছে",
      description: `আইটেমের স্ট্যাটাস ${newStatus === 'available' ? 'উপলব্ধ' : newStatus === 'rented' ? 'ভাড়া দেওয়া' : 'মেইনটেনেন্সে'} হিসেবে আপডেট করা হয়েছে।`,
    });
  };

  const handleRequestAction = (requestId: string, action: 'approve' | 'reject') => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req
      )
    );
    
    if (action === 'approve') {
      const request = requests.find(r => r.id === requestId);
      if (request) {
        setRentalItems(prev => 
          prev.map(item => 
            item.id === request.itemId ? { 
              ...item, 
              bookedDates: [...(item.bookedDates || []), {
                startDate: request.startDate,
                endDate: request.endDate,
                customerId: 'cust-new'
              }]
            } : item
          )
        );
      }
    }
    
    toast({
      title: action === 'approve' ? "রিকোয়েস্ট এপ্রুভ করা হয়েছে" : "রিকোয়েস্ট রিজেক্ট করা হয়েছে",
      description: action === 'approve' ? 
        "বুকিং রিকোয়েস্ট এপ্রুভ করা হয়েছে এবং ক্যালেন্ডার আপডেট করা হয়েছে।" :
        "বুকিং রিকোয়েস্ট রিজেক্ট করা হয়েছে।",
    });
  };

  const toggleItemAvailability = () => {
    if (!selectedItem) return;
    
    setAvailabilityMode(!availabilityMode);
    
    toast({
      title: availabilityMode ? "উপলব্ধতা আপডেট করা হয়েছে" : "উপলব্ধতা আপডেট মোড চালু",
      description: availabilityMode ? 
        "আইটেমের উপলব্ধতা সফলভাবে আপডেট করা হয়েছে" : 
        "ক্যালেন্ডারে ক্লিক করে উপলব্ধতা আপডেট করুন",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">মোট আইটেম</p>
              <p className="text-2xl font-bold">{totalItems}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Home className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">উপলব্ধ</p>
              <p className="text-2xl font-bold">{availableItems}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">গ্রাহক</p>
              <p className="text-2xl font-bold">{activeCustomers}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">পেন্ডিং</p>
              <p className="text-2xl font-bold">{pendingRequests}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>আয়</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">আজকের আয়</p>
              <p className="text-xl font-bold">৳{todayEarnings}</p>
            </div>
            
            <div className="p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">সাপ্তাহিক আয়</p>
              <p className="text-xl font-bold">৳{weeklyEarnings}</p>
            </div>
            
            <div className="p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">মাসিক আয়</p>
              <p className="text-xl font-bold">৳{monthlyEarnings}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="items">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="items">আইটেম</TabsTrigger>
          <TabsTrigger value="calendar">ক্যালেন্ডার</TabsTrigger>
          <TabsTrigger value="customers">গ্রাহক</TabsTrigger>
          <TabsTrigger value="requests">রিকোয়েস্ট</TabsTrigger>
        </TabsList>
        
        <TabsContent value="items" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>রেন্টাল আইটেম</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" /> নতুন আইটেম
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {rentalItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  {item.image && (
                    <div className="h-16 w-16 overflow-hidden rounded-md">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{item.category}</span>
                      <span>৳{item.pricePerDay}/দিন</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant={
                        item.status === 'available' ? 'default' :
                        item.status === 'rented' ? 'secondary' : 'outline'
                      }
                    >
                      {item.status === 'available' ? 'উপলব্ধ' :
                       item.status === 'rented' ? 'ভাড়া দেওয়া' : 'মেইনটেনেন্সে'}
                    </Badge>
                    
                    <Select 
                      defaultValue={item.status}
                      onValueChange={(value) => 
                        handleStatusChange(item.id, value as 'available' | 'rented' | 'maintenance')
                      }
                    >
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue placeholder="স্ট্যাটাস" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">উপলব্ধ</SelectItem>
                        <SelectItem value="rented">ভাড়া দেওয়া</SelectItem>
                        <SelectItem value="maintenance">মেইনটেনেন্সে</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>উপলব্ধতা ক্যালেন্ডার</CardTitle>
              <Select 
                onValueChange={(value) => setSelectedItem(rentalItems.find(item => item.id === value) || null)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="আইটেম নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {rentalItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {selectedItem ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{selectedItem.name}</h3>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="edit-mode" 
                        checked={availabilityMode}
                        onCheckedChange={toggleItemAvailability}
                      />
                      <Label htmlFor="edit-mode">উপলব্ধতা এডিট</Label>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-1">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md pointer-events-auto"
                      modifiers={{
                        booked: selectedItem.bookedDates?.flatMap(range => {
                          const dates = [];
                          const currentDate = new Date(range.startDate);
                          while (currentDate <= range.endDate) {
                            dates.push(new Date(currentDate));
                            currentDate.setDate(currentDate.getDate() + 1);
                          }
                          return dates;
                        }) || [],
                      }}
                      modifiersClassNames={{
                        booked: "bg-red-100 text-red-900",
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-red-100"></div>
                      <span className="text-sm">ভাড়া দেওয়া</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-green-100"></div>
                      <span className="text-sm">উপলব্ধ</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">ক্যালেন্ডার দেখতে আইটেম নির্বাচন করুন</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>গ্রাহক তালিকা</CardTitle>
              <div className="flex gap-2">
                <Input placeholder="গ্রাহক খুঁজুন" className="w-[200px]" />
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> নতুন গ্রাহক
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map(customer => (
                  <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">{customer.name}</h3>
                        <p className="text-sm text-muted-foreground">{customer.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{customer.totalRentals} বার ভাড়া নিয়েছেন</span>
                      </div>
                      
                      <Badge 
                        variant={customer.status === 'active' ? 'outline' : 'destructive'}
                      >
                        {customer.status === 'active' ? 'সক্রিয়' : 'ব্ল্যাকলিস্টেড'}
                      </Badge>
                      
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>বুকিং রিকোয়েস্ট</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.length > 0 ? requests.map(request => (
                  <div key={request.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">{request.itemName}</h3>
                      <Badge 
                        variant={
                          request.status === 'pending' ? 'outline' :
                          request.status === 'approved' ? 'default' : 'destructive'
                        }
                      >
                        {request.status === 'pending' ? 'পেন্ডিং' :
                         request.status === 'approved' ? 'অনুমোদিত' : 'বাতিল'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">গ্রাহক</p>
                        <p>{request.customerName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">তারিখ</p>
                        <p>
                          {request.startDate.toLocaleDateString('bn-BD')} - {request.endDate.toLocaleDateString('bn-BD')}
                        </p>
                      </div>
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleRequestAction(request.id, 'approve')}
                        >
                          অনুমোদন করুন
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleRequestAction(request.id, 'reject')}
                        >
                          বাতিল করুন
                        </Button>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">কোন পেন্ডিং রিকোয়েস্ট নেই</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">দ্রুত লিংক</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-auto py-2 justify-start">
                <Settings className="h-4 w-4 mr-2" />
                <span className="text-sm">সেটিংস</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                <span className="text-sm">রিপোর্ট</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 justify-start">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm">প্রিমিয়াম</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 justify-start">
                <GanttChart className="h-4 w-4 mr-2" />
                <span className="text-sm">প্ল্যান</span>
              </Button>
              <Button variant="outline" className="h-auto py-2 justify-start">
                <MailQuestion className="h-4 w-4 mr-2" />
                <span className="text-sm">সাপোর্ট</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">সাম্প্রতিক কার্যক্রম</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">মাউন্টেন বাইক ভাড়া দেওয়া হয়েছে</p>
                  <p className="text-xs text-muted-foreground">৩০ মিনিট আগে</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">নতুন গ্রাহক যোগ হয়েছে</p>
                  <p className="text-xs text-muted-foreground">২ ঘন্টা আগে</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">৩,৫০০৳ আয় হয়েছে</p>
                  <p className="text-xs text-muted-foreground">আজ</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RentalManagementDashboard;
