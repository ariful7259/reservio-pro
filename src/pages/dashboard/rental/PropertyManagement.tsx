
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Search, 
  Filter, 
  ChevronDown,
  Plus,
  Calendar,
  DollarSign,
  Home,
  Map,
  Edit,
  Trash2,
  Star,
  Upload,
  X,
  Eye,
  MoreHorizontal,
  Check,
  Copy,
  Clock
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
  title: z.string().min(2, "প্রপার্টির নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  type: z.string().min(1, "প্রপার্টির ধরন সিলেক্ট করুন"),
  price: z.string().min(1, "ভাড়ার পরিমাণ দিন"),
  address: z.string().min(5, "ঠিকানা দিন"),
  bedrooms: z.string().min(1, "বেডরুমের সংখ্যা দিন"),
  bathrooms: z.string().min(1, "বাথরুমের সংখ্যা দিন"),
  size: z.string().min(1, "আয়তন দিন"),
  description: z.string().min(10, "বিবরণ কমপক্ষে ১০ অক্ষর হতে হবে"),
  status: z.string().min(1, "স্ট্যাটাস সিলেক্ট করুন"),
});

const PropertyManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      price: "",
      address: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      description: "",
      status: "available",
    },
  });

  const mockProperties = [
    { 
      id: 'P1001', 
      title: '৩ বেডরুম অ্যাপার্টমেন্ট', 
      type: 'apartment', 
      address: 'ধানমন্ডি, ঢাকা', 
      price: '৩৫,০০০', 
      bedrooms: '৩',
      bathrooms: '২',
      size: '১৪০০ বর্গফুট',
      status: 'available',
      rating: '4.5'
    },
    { 
      id: 'P1002', 
      title: '৪ বেডরুম বিলাসবহুল বাড়ি', 
      type: 'house', 
      address: 'গুলশান, ঢাকা', 
      price: '৭৫,০০০', 
      bedrooms: '৪',
      bathrooms: '৩',
      size: '২৮০০ বর্গফুট',
      status: 'available',
      rating: '4.8'
    },
    { 
      id: 'P1003', 
      title: '২ বেডরুম ছোট অ্যাপার্টমেন্ট', 
      type: 'apartment', 
      address: 'মোহাম্মদপুর, ঢাকা', 
      price: '১৮,০০০', 
      bedrooms: '২',
      bathrooms: '১',
      size: '৯৫০ বর্গফুট',
      status: 'available',
      rating: '4.2'
    },
    { 
      id: 'P1004', 
      title: 'কমার্শিয়াল অফিস স্পেস', 
      type: 'office', 
      address: 'মতিঝিল, ঢাকা', 
      price: '৪৫,০০০', 
      bedrooms: '-',
      bathrooms: '১',
      size: '১২০০ বর্গফুট',
      status: 'booked',
      rating: '4.0'
    },
    { 
      id: 'P1005', 
      title: 'ছাদের বাগানসহ ডুপ্লেক্স', 
      type: 'house', 
      address: 'উত্তরা, ঢাকা', 
      price: '৫৫,০০০', 
      bedrooms: '৪',
      bathrooms: '৩',
      size: '২২০০ বর্গফুট',
      status: 'booked',
      rating: '4.7'
    },
    { 
      id: 'P1006', 
      title: 'ইভেন্ট সেন্টার', 
      type: 'commercial', 
      address: 'বনানী, ঢাকা', 
      price: '৬০,০০০', 
      bedrooms: '-',
      bathrooms: '২',
      size: '২৫০০ বর্গফুট',
      status: 'maintenance',
      rating: '4.3'
    }
  ];

  const filteredProperties = mockProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'available') return matchesSearch && property.status === 'available';
    if (activeTab === 'booked') return matchesSearch && property.status === 'booked';
    if (activeTab === 'maintenance') return matchesSearch && property.status === 'maintenance';
    
    return false;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">উপলব্ধ</Badge>;
      case 'booked':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">বুক করা আছে</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">মেইনটেনেন্সে</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'apartment':
        return <Building className="h-5 w-5 text-primary" />;
      case 'house':
        return <Home className="h-5 w-5 text-primary" />;
      case 'office':
        return <Briefcase className="h-5 w-5 text-primary" />;
      case 'commercial':
        return <Store className="h-5 w-5 text-primary" />;
      default:
        return <Building className="h-5 w-5 text-primary" />;
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically save the property to your database
    setIsAddPropertyOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">প্রপার্টি ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">আপনার সম্পত্তি যোগ করুন, সম্পাদনা করুন এবং ম্যানেজ করুন</p>
        </div>
        <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              নতুন প্রপার্টি যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>নতুন প্রপার্টি যোগ করুন</DialogTitle>
              <DialogDescription>
                আপনার নতুন প্রপার্টির বিবরণ দিন। সবগুলো তথ্য পূরণ করুন।
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>প্রপার্টির শিরোনাম</FormLabel>
                      <FormControl>
                        <Input placeholder="প্রপার্টির শিরোনাম লিখুন" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>প্রপার্টির ধরন</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="ধরন সিলেক্ট করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">অ্যাপার্টমেন্ট</SelectItem>
                            <SelectItem value="house">বাড়ি</SelectItem>
                            <SelectItem value="office">অফিস</SelectItem>
                            <SelectItem value="commercial">কমার্শিয়াল</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ভাড়া (৳/মাস)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="১৫০০০" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ঠিকানা</FormLabel>
                      <FormControl>
                        <Input placeholder="প্রপার্টির ঠিকানা" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>বেডরুম</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="২" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>বাথরুম</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="১" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>আয়তন (বর্গফুট)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="১২০০" {...field} />
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
                          placeholder="প্রপার্টির বিস্তারিত বিবরণ লিখুন"
                          className="min-h-24"
                          {...field} 
                        />
                      </FormControl>
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
                          <SelectItem value="available">উপলব্ধ</SelectItem>
                          <SelectItem value="booked">বুক করা আছে</SelectItem>
                          <SelectItem value="maintenance">মেইনটেনেন্সে</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border rounded-md p-4">
                  <FormLabel>প্রপার্টির ছবি</FormLabel>
                  <div className="mt-2 flex items-center justify-center border-2 border-dashed rounded-md p-6">
                    <div className="text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">ছবি আপলোড করতে ক্লিক করুন</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF সাপোর্টেড (মাক্স. ১০MB)</p>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddPropertyOpen(false)}>বাতিল</Button>
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
            placeholder="প্রপার্টি খুঁজুন"
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
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                ধরন: অ্যাপার্টমেন্ট
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                ধরন: বাড়ি
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                এলাকা: ধানমন্ডি
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                মূল্য: ১০০০০ - ৩০০০০
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">সব প্রপার্টি ({mockProperties.length})</TabsTrigger>
          <TabsTrigger value="available">উপলব্ধ ({mockProperties.filter(p => p.status === 'available').length})</TabsTrigger>
          <TabsTrigger value="booked">বুক করা ({mockProperties.filter(p => p.status === 'booked').length})</TabsTrigger>
          <TabsTrigger value="maintenance">মেইনটেনেন্সে ({mockProperties.filter(p => p.status === 'maintenance').length})</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>প্রপার্টি</TableHead>
                  <TableHead>ধরন</TableHead>
                  <TableHead>ঠিকানা</TableHead>
                  <TableHead>মূল্য/মাস</TableHead>
                  <TableHead>আয়তন</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Building className="h-8 w-8 mb-2" />
                        <p>কোন প্রপার্টি পাওয়া যায়নি</p>
                        {searchTerm && (
                          <p className="text-sm mt-1">"{searchTerm}" এর জন্য কোন ফলাফল নেই</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                            {property.type === 'apartment' && <Building className="h-5 w-5 text-primary" />}
                            {property.type === 'house' && <Home className="h-5 w-5 text-primary" />}
                            {property.type === 'office' && <Briefcase className="h-5 w-5 text-primary" />}
                            {property.type === 'commercial' && <Store className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {property.bedrooms !== '-' && `${property.bedrooms} বেড, `}
                              {property.bathrooms} বাথ
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {property.type === 'apartment' && 'অ্যাপার্টমেন্ট'}
                        {property.type === 'house' && 'বাড়ি'}
                        {property.type === 'office' && 'অফিস'}
                        {property.type === 'commercial' && 'কমার্শিয়াল'}
                      </TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>৳{property.price}</TableCell>
                      <TableCell>{property.size}</TableCell>
                      <TableCell>{getStatusBadge(property.status)}</TableCell>
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
                              এভেইলেবিলিটি আপডেট
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

export default PropertyManagement;

// This is needed because we're referencing these components in JSX but not importing them
const Briefcase = Building;
const Store = Building;
