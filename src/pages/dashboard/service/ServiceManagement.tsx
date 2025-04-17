
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Search, 
  Filter, 
  ChevronDown,
  Plus,
  Calendar,
  DollarSign,
  Clock,
  Edit,
  Trash2,
  Star,
  Upload,
  X,
  Eye,
  MoreHorizontal,
  Check,
  Copy,
  Users
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, "সার্ভিসের নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  category: z.string().min(1, "ক্যাটেগরি সিলেক্ট করুন"),
  price: z.string().min(1, "মূল্য দিন"),
  duration: z.string().min(1, "সময়কাল দিন"),
  description: z.string().min(10, "বিবরণ কমপক্ষে ১০ অক্ষর হতে হবে"),
  status: z.string().min(1, "স্ট্যাটাস সিলেক্ট করুন"),
});

const ServiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      duration: "",
      description: "",
      status: "active",
    },
  });

  const mockServices = [
    { 
      id: 'S1001', 
      name: 'ইলেকট্রিক্যাল রিপেয়ার', 
      category: 'রিপেয়ার', 
      price: '১,৫০০', 
      duration: '২ ঘন্টা',
      status: 'active',
      rating: '4.7',
      bookings: '৮৭'
    },
    { 
      id: 'S1002', 
      name: 'প্লাম্বিং সার্ভিস', 
      category: 'রিপেয়ার', 
      price: '১,২০০', 
      duration: '১.৫ ঘন্টা',
      status: 'active',
      rating: '4.5',
      bookings: '৬৫'
    },
    { 
      id: 'S1003', 
      name: 'হোম ক্লিনিং', 
      category: 'ক্লিনিং', 
      price: '২,৫০০', 
      duration: '৪ ঘন্টা',
      status: 'active',
      rating: '4.8',
      bookings: '১১০'
    },
    { 
      id: 'S1004', 
      name: 'এয়ার কন্ডিশনার সার্ভিসিং', 
      category: 'রিপেয়ার', 
      price: '১,৮০০', 
      duration: '২ ঘন্টা',
      status: 'paused',
      rating: '4.6',
      bookings: '৭৫'
    },
    { 
      id: 'S1005', 
      name: 'লন কেয়ার', 
      category: 'গার্ডেনিং', 
      price: '১,০০০', 
      duration: '৩ ঘন্টা',
      status: 'paused',
      rating: '4.3',
      bookings: '৪২'
    },
    { 
      id: 'S1006', 
      name: 'ফার্নিচার রিপেয়ার', 
      category: 'রিপেয়ার', 
      price: '২,২০০', 
      duration: '৩ ঘন্টা',
      status: 'draft',
      rating: '-',
      bookings: '০'
    }
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && service.status === 'active';
    if (activeTab === 'paused') return matchesSearch && service.status === 'paused';
    if (activeTab === 'draft') return matchesSearch && service.status === 'draft';
    
    return false;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">অ্যাকটিভ</Badge>;
      case 'paused':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">পজ করা</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">ড্রাফট</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'রিপেয়ার':
        return <Wrench className="h-5 w-5 text-primary" />;
      case 'ক্লিনিং':
        return <Brush className="h-5 w-5 text-primary" />;
      case 'গার্ডেনিং':
        return <Flower className="h-5 w-5 text-primary" />;
      default:
        return <Wrench className="h-5 w-5 text-primary" />;
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically save the service to your database
    setIsAddServiceOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">সার্ভিস ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">আপনার সেবা যোগ করুন, সম্পাদনা করুন এবং ম্যানেজ করুন</p>
        </div>
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              নতুন সার্ভিস যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>নতুন সার্ভিস যোগ করুন</DialogTitle>
              <DialogDescription>
                আপনার নতুন সেবার বিবরণ দিন। সবগুলো তথ্য পূরণ করুন।
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>সার্ভিসের নাম</FormLabel>
                      <FormControl>
                        <Input placeholder="সার্ভিসের নাম লিখুন" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ক্যাটেগরি</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="ক্যাটেগরি সিলেক্ট করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="রিপেয়ার">রিপেয়ার</SelectItem>
                            <SelectItem value="ক্লিনিং">ক্লিনিং</SelectItem>
                            <SelectItem value="গার্ডেনিং">গার্ডেনিং</SelectItem>
                            <SelectItem value="ইলেকট্রনিক্স">ইলেকট্রনিক্স</SelectItem>
                            <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>স্ট্যাটাস</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="স্ট্যাটাস সিলেক্ট করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">অ্যাকটিভ</SelectItem>
                            <SelectItem value="paused">পজ করা</SelectItem>
                            <SelectItem value="draft">ড্রাফট</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>মূল্য (৳)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="১৫০০" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>সময়কাল (ঘন্টা)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="২" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>বিবরণ</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="সার্ভিসের বিস্তারিত বিবরণ লিখুন"
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border rounded-md p-4">
                  <FormLabel>সার্ভিসের ছবি</FormLabel>
                  <div className="mt-2 flex items-center justify-center border-2 border-dashed rounded-md p-6">
                    <div className="text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">ছবি আপলোড করতে ক্লিক করুন</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF সাপোর্টেড (মাক্স. ১০MB)</p>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddServiceOpen(false)}>বাতিল</Button>
                  <Button type="submit">সেভ করুন</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="সার্ভিস খুঁজুন"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                ফিল্টার
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuT>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                ক্যাটেগরি: রিপেয়ার
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                ক্যাটেগরি: ক্লিনিং
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                স্ট্যাটাস: অ্যাকটিভ
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                মূল্য: ১০০০ - ২০০০
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">সব সার্ভিস ({mockServices.length})</TabsTrigger>
          <TabsTrigger value="active">অ্যাকটিভ ({mockServices.filter(p => p.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="paused">পজ করা ({mockServices.filter(p => p.status === 'paused').length})</TabsTrigger>
          <TabsTrigger value="draft">ড্রাফট ({mockServices.filter(p => p.status === 'draft').length})</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>সার্ভিস</TableHead>
                  <TableHead>ক্যাটেগরি</TableHead>
                  <TableHead>মূল্য</TableHead>
                  <TableHead>সময়কাল</TableHead>
                  <TableHead>রেটিং</TableHead>
                  <TableHead>বুকিং</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Wrench className="h-8 w-8 mb-2" />
                        <p>কোন সার্ভিস পাওয়া যায়নি</p>
                        {searchTerm && (
                          <p className="text-sm mt-1">"{searchTerm}" এর জন্য কোন ফলাফল নেই</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                            {service.category === 'রিপেয়ার' && <Wrench className="h-5 w-5 text-primary" />}
                            {service.category === 'ক্লিনিং' && <Brush className="h-5 w-5 text-primary" />}
                            {service.category === 'গার্ডেনিং' && <Flower className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="font-medium">{service.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{service.category}</TableCell>
                      <TableCell>৳{service.price}</TableCell>
                      <TableCell>{service.duration}</TableCell>
                      <TableCell>
                        {service.rating !== '-' ? (
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1" />
                            <span>{service.rating}</span>
                          </div>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{service.bookings}</TableCell>
                      <TableCell>{getStatusBadge(service.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              বিস্তারিত দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              এডিট করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="h-4 w-4 mr-2" />
                              শিডিউল আপডেট
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              ডুপ্লিকেট করুন
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              ডিলিট করুন
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ServiceManagement;

// For UI demonstration purposes
const Brush = Wrench;
const Flower = Wrench;
