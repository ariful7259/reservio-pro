
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  Search, 
  Filter, 
  ChevronDown,
  Plus,
  Eye,
  Edit,
  Trash2,
  Upload,
  X,
  MoreHorizontal,
  Check,
  Copy,
  FileText,
  Image,
  Music,
  File,
  ExternalLink,
  Play,
  ThumbsUp,
  MessageSquare
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
  title: z.string().min(2, "কন্টেন্টের শিরোনাম কমপক্ষে ২ অক্ষর হতে হবে"),
  type: z.string().min(1, "কন্টেন্টের ধরন সিলেক্ট করুন"),
  category: z.string().min(1, "ক্যাটেগরি সিলেক্ট করুন"),
  description: z.string().min(10, "বিবরণ কমপক্ষে ১০ অক্ষর হতে হবে"),
  tags: z.string().optional(),
  price: z.string().optional(),
  status: z.string().min(1, "স্ট্যাটাস সিলেক্ট করুন"),
});

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      category: "",
      description: "",
      tags: "",
      price: "",
      status: "published",
    },
  });

  const mockContents = [
    { 
      id: 'C1001', 
      title: 'বাংলাদেশের ইতিহাস', 
      type: 'video', 
      category: 'শিক্ষা', 
      date: '১০ এপ্রিল ২০২৩',
      views: '১২,৫৬৭', 
      likes: '৮২৫',
      comments: '৫৬',
      status: 'published',
      price: 'ফ্রি'
    },
    { 
      id: 'C1002', 
      title: 'ডিজিটাল মার্কেটিং কোর্স', 
      type: 'course', 
      category: 'শিক্ষা', 
      date: '১৫ এপ্রিল ২০২৩',
      views: '৮,৯৪৫', 
      likes: '৬৫৪',
      comments: '৭৫',
      status: 'published',
      price: '৳৫,০০০'
    },
    { 
      id: 'C1003', 
      title: 'পরীক্ষার প্রস্তুতি গাইড', 
      type: 'ebook', 
      category: 'শিক্ষা', 
      date: '২০ এপ্রিল ২০২৩',
      views: '৭,২৩৪', 
      likes: '৪১২',
      comments: '৩৬',
      status: 'published',
      price: '৳৩০০'
    },
    { 
      id: 'C1004', 
      title: 'ফটোগ্রাফি টিপস', 
      type: 'video', 
      category: 'আর্ট', 
      date: '২৫ এপ্রিল ২০২৩',
      views: '৫,৬৭৮', 
      likes: '৩৪৫',
      comments: '৪২',
      status: 'draft',
      price: 'ফ্রি'
    },
    { 
      id: 'C1005', 
      title: 'মেডিটেশন গাইড', 
      type: 'audio', 
      category: 'লাইফস্টাইল', 
      date: '২৮ এপ্রিল ২০২৩',
      views: '৩,৪৫৬', 
      likes: '২৮৭',
      comments: '১৮',
      status: 'unpublished',
      price: '৳১৫০'
    },
    { 
      id: 'C1006', 
      title: 'প্রোগ্রামিং বেসিক', 
      type: 'course', 
      category: 'শিক্ষা', 
      date: '১ মে ২০২৩',
      views: '৬,৭৮৯', 
      likes: '৫৪৩',
      comments: '৮৯',
      status: 'published',
      price: '৳৪,৫০০'
    }
  ];

  const filteredContents = mockContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          content.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'published') return matchesSearch && content.status === 'published';
    if (activeTab === 'draft') return matchesSearch && content.status === 'draft';
    if (activeTab === 'unpublished') return matchesSearch && content.status === 'unpublished';
    
    return false;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">প্রকাশিত</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50">ড্রাফট</Badge>;
      case 'unpublished':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">অপ্রকাশিত</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-primary" />;
      case 'ebook':
        return <FileText className="h-5 w-5 text-primary" />;
      case 'audio':
        return <Music className="h-5 w-5 text-primary" />;
      case 'course':
        return <File className="h-5 w-5 text-primary" />;
      default:
        return <File className="h-5 w-5 text-primary" />;
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would typically save the content to your database
    setIsAddContentOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">কন্টেন্ট ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground">আপনার কন্টেন্ট যোগ করুন, সম্পাদনা করুন এবং ম্যানেজ করুন</p>
        </div>
        <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              নতুন কন্টেন্ট যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>নতুন কন্টেন্ট যোগ করুন</DialogTitle>
              <DialogDescription>
                আপনার নতুন কন্টেন্টের বিবরণ দিন। সবগুলো তথ্য পূরণ করুন।
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>কন্টেন্টের শিরোনাম</FormLabel>
                      <FormControl>
                        <Input placeholder="কন্টেন্টের শিরোনাম লিখুন" {...field} />
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
                        <FormLabel>কন্টেন্টের ধরন</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="ধরন সিলেক্ট করুন" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="video">ভিডিও</SelectItem>
                            <SelectItem value="ebook">ই-বুক</SelectItem>
                            <SelectItem value="audio">অডিও</SelectItem>
                            <SelectItem value="course">কোর্স</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                            <SelectItem value="শিক্ষা">শিক্ষা</SelectItem>
                            <SelectItem value="লাইফস্টাইল">লাইফস্টাইল</SelectItem>
                            <SelectItem value="আর্ট">আর্ট</SelectItem>
                            <SelectItem value="বিজনেস">বিজনেস</SelectItem>
                            <SelectItem value="টেকনোলজি">টেকনোলজি</SelectItem>
                          </SelectContent>
                        </Select>
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
                          placeholder="কন্টেন্টের বিস্তারিত বিবরণ লিখুন"
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
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ট্যাগস</FormLabel>
                      <FormControl>
                        <Input placeholder="কমা দিয়ে আলাদা করে লিখুন (যেমন: শিক্ষা, টিউটোরিয়াল)" {...field} />
                      </FormControl>
                      <FormDescription>
                        কমা দিয়ে ট্যাগ আলাদা করুন
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>মূল্য (ফ্রি হলে ০ লিখুন)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="৫০০" {...field} />
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
                            <SelectItem value="published">প্রকাশিত</SelectItem>
                            <SelectItem value="draft">ড্রাফট</SelectItem>
                            <SelectItem value="unpublished">অপ্রকাশিত</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="border rounded-md p-4">
                  <FormLabel>কন্টেন্ট আপলোড</FormLabel>
                  <div className="mt-2 flex items-center justify-center border-2 border-dashed rounded-md p-6">
                    <div className="text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">ফাইল আপলোড করতে ক্লিক করুন</p>
                      <p className="text-xs text-muted-foreground mt-1">MP4, MP3, PDF, DOCX (মাক্স. ১GB)</p>
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddContentOpen(false)}>বাতিল</Button>
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
            placeholder="কন্টেন্ট খুঁজুন"
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
                ক্যাটেগরি: শিক্ষা
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                ধরন: ভিডিও
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                স্ট্যাটাস: প্রকাশিত
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Check className="h-4 w-4 mr-2" />
                মূল্য: ফ্রি
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">সব কন্টেন্ট ({mockContents.length})</TabsTrigger>
          <TabsTrigger value="published">প্রকাশিত ({mockContents.filter(p => p.status === 'published').length})</TabsTrigger>
          <TabsTrigger value="draft">ড্রাফট ({mockContents.filter(p => p.status === 'draft').length})</TabsTrigger>
          <TabsTrigger value="unpublished">অপ্রকাশিত ({mockContents.filter(p => p.status === 'unpublished').length})</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>কন্টেন্ট</TableHead>
                  <TableHead>ধরন</TableHead>
                  <TableHead>ক্যাটেগরি</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead>মূল্য</TableHead>
                  <TableHead>ভিউস</TableHead>
                  <TableHead>এনগেজমেন্ট</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <File className="h-8 w-8 mb-2" />
                        <p>কোন কন্টেন্ট পাওয়া যায়নি</p>
                        {searchTerm && (
                          <p className="text-sm mt-1">"{searchTerm}" এর জন্য কোন ফলাফল নেই</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredContents.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                            {content.type === 'video' && <Video className="h-5 w-5 text-primary" />}
                            {content.type === 'ebook' && <FileText className="h-5 w-5 text-primary" />}
                            {content.type === 'audio' && <Music className="h-5 w-5 text-primary" />}
                            {content.type === 'course' && <File className="h-5 w-5 text-primary" />}
                          </div>
                          <div className="font-medium">{content.title}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {content.type === 'video' && 'ভিডিও'}
                        {content.type === 'ebook' && 'ই-বুক'}
                        {content.type === 'audio' && 'অডিও'}
                        {content.type === 'course' && 'কোর্স'}
                      </TableCell>
                      <TableCell>{content.category}</TableCell>
                      <TableCell>{content.date}</TableCell>
                      <TableCell>{content.price}</TableCell>
                      <TableCell>{content.views}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>{content.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>{content.comments}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(content.status)}</TableCell>
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
                              <Play className="h-4 w-4 mr-2" />
                              প্রিভিউ দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              শেয়ার করুন
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

export default ContentManagement;
