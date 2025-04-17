
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Search, 
  Filter, 
  ChevronDown,
  Truck,
  CheckCircle,
  Clock,
  ShoppingBag,
  Download,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const OrderTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">অপেক্ষারত</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">প্রসেসিং</Badge>;
      case 'shipped':
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50">শিপড</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">ডেলিভারড</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">বাতিল</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">পেইড</Badge>;
      case 'unpaid':
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">আনপেইড</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">রিফান্ডেড</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'processing':
        return <RefreshCw className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-indigo-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const mockOrders = [
    { 
      id: 'ODR-1001', 
      customer: 'রহিম আহমেদ', 
      date: '২৫ এপ্রিল ২০২৩', 
      total: '১২,৫৫০', 
      items: '৩',
      payment: 'paid',
      status: 'delivered',
      phone: '০১৭১২-৩৪৫৬৭৮',
      address: 'মিরপুর-১০, ঢাকা',
      paymentMethod: 'বিকাশ',
      products: [
        { id: 'P1', name: 'স্মার্টফোন', quantity: '১', price: '১০,০০০' },
        { id: 'P2', name: 'হেডফোন', quantity: '১', price: '২,০০০' },
        { id: 'P3', name: 'চার্জার', quantity: '১', price: '৫৫০' },
      ],
      timeline: [
        { time: '২৫ এপ্রিল, ১০:৩০ AM', status: 'অর্ডার প্লেসড', description: 'অর্ডার সাকসেসফুলি প্লেস করা হয়েছে' },
        { time: '২৫ এপ্রিল, ১১:১৫ AM', status: 'পেমেন্ট কনফার্মড', description: 'বিকাশ পেমেন্ট কনফার্ম হয়েছে' },
        { time: '২৫ এপ্রিল, ০৩:০০ PM', status: 'প্রসেসিং', description: 'অর্ডার প্রসেস করা হচ্ছে' },
        { time: '২৬ এপ্রিল, ১১:০০ AM', status: 'শিপড', description: 'অর্ডার শিপিং করা হয়েছে' },
        { time: '২৭ এপ্রিল, ০২:৩০ PM', status: 'ডেলিভারড', description: 'অর্ডার সফলভাবে ডেলিভারি করা হয়েছে' },
      ]
    },
    { 
      id: 'ODR-1002', 
      customer: 'করিম মিয়া', 
      date: '২৬ এপ্রিল ২০২৩', 
      total: '৩,৫০০', 
      items: '২',
      payment: 'paid',
      status: 'shipped',
      phone: '০১৮১৫-৬৭৮৯১০',
      address: 'বনানী, ঢাকা',
      paymentMethod: 'নগদ',
      products: [
        { id: 'P4', name: 'টি-শার্ট', quantity: '২', price: '১,৫০০' },
        { id: 'P5', name: 'ক্যাপ', quantity: '১', price: '৫০০' },
      ],
      timeline: [
        { time: '২৬ এপ্রিল, ০৯:৪৫ AM', status: 'অর্ডার প্লেসড', description: 'অর্ডার সাকসেসফুলি প্লেস করা হয়েছে' },
        { time: '২৬ এপ্রিল, ১০:৩০ AM', status: 'পেমেন্ট কনফার্মড', description: 'নগদ পেমেন্ট কনফার্ম হয়েছে' },
        { time: '২৬ এপ্রিল, ০৪:১৫ PM', status: 'প্রসেসিং', description: 'অর্ডার প্রসেস করা হচ্ছে' },
        { time: '২৭ এপ্রিল, ১০:৩০ AM', status: 'শিপড', description: 'অর্ডার শিপিং করা হয়েছে' },
      ]
    },
    { 
      id: 'ODR-1003', 
      customer: 'ফাতেমা খাতুন', 
      date: '২৭ এপ্রিল ২০২৩', 
      total: '৮,০০০', 
      items: '১',
      payment: 'unpaid',
      status: 'pending',
      phone: '০১৯১২-৩৪৫৬৭৮',
      address: 'গুলশান, ঢাকা',
      paymentMethod: 'ক্যাশ অন ডেলিভারি',
      products: [
        { id: 'P6', name: 'ল্যাপটপ ব্যাগ', quantity: '১', price: '৮,০০০' },
      ],
      timeline: [
        { time: '২৭ এপ্রিল, ০৩:২০ PM', status: 'অর্ডার প্লেসড', description: 'অর্ডার সাকসেসফুলি প্লেস করা হয়েছে' },
        { time: '২৭ এপ্রিল, ০৩:৩০ PM', status: 'অপেক্ষারত', description: 'পেমেন্টের জন্য অপেক্ষা করা হচ্ছে' },
      ]
    },
    { 
      id: 'ODR-1004', 
      customer: 'আলী হাসান', 
      date: '২৮ এপ্রিল ২০২৩', 
      total: '৪,৫০০', 
      items: '৩',
      payment: 'refunded',
      status: 'cancelled',
      phone: '০১৬১৭-৮৯১০১১',
      address: 'মতিঝিল, ঢাকা',
      paymentMethod: 'ক্রেডিট কার্ড',
      products: [
        { id: 'P7', name: 'কফি মেকার', quantity: '১', price: '৩,০০০' },
        { id: 'P8', name: 'কফি মগ', quantity: '২', price: '৭৫০' },
      ],
      timeline: [
        { time: '২৮ এপ্রিল, ১১:০০ AM', status: 'অর্ডার প্লেসড', description: 'অর্ডার সাকসেসফুলি প্লেস করা হয়েছে' },
        { time: '২৮ এপ্রিল, ১১:১০ AM', status: 'পেমেন্ট কনফার্মড', description: 'ক্রেডিট কার্ড পেমেন্ট কনফার্ম হয়েছে' },
        { time: '২৮ এপ্রিল, ০৩:০০ PM', status: 'প্রসেসিং', description: 'অর্ডার প্রসেস করা হচ্ছে' },
        { time: '২৮ এপ্রিল, ০৭:৩০ PM', status: 'বাতিল', description: 'কাস্টমারের অনুরোধে অর্ডার বাতিল করা হয়েছে' },
        { time: '২৯ এপ্রিল, ১০:০০ AM', status: 'রিফান্ড', description: 'পেমেন্ট রিফান্ড করা হয়েছে' },
      ]
    },
    { 
      id: 'ODR-1005', 
      customer: 'সাদিয়া বেগম', 
      date: '২৯ এপ্রিল ২০২৩', 
      total: '৬,৩০০', 
      items: '২',
      payment: 'paid',
      status: 'processing',
      phone: '০১৫১৪-১২১৩১৪',
      address: 'ধানমন্ডি, ঢাকা',
      paymentMethod: 'বিকাশ',
      products: [
        { id: 'P9', name: 'ব্লেন্ডার', quantity: '১', price: '৪,৮০০' },
        { id: 'P10', name: 'কাটিং বোর্ড', quantity: '১', price: '১,৫০০' },
      ],
      timeline: [
        { time: '২৯ এপ্রিল, ০৯:১৫ AM', status: 'অর্ডার প্লেসড', description: 'অর্ডার সাকসেসফুলি প্লেস করা হয়েছে' },
        { time: '২৯ এপ্রিল, ০৯:৩০ AM', status: 'পেমেন্ট কনফার্মড', description: 'বিকাশ পেমেন্ট কনফার্ম হয়েছে' },
        { time: '২৯ এপ্রিল, ০২:৪৫ PM', status: 'প্রসেসিং', description: 'অর্ডার প্রসেস করা হচ্ছে' },
      ]
    },
  ];

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = (
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && order.status === 'pending';
    if (activeTab === 'processing') return matchesSearch && order.status === 'processing';
    if (activeTab === 'shipped') return matchesSearch && order.status === 'shipped';
    if (activeTab === 'delivered') return matchesSearch && order.status === 'delivered';
    if (activeTab === 'cancelled') return matchesSearch && order.status === 'cancelled';
    
    return false;
  });

  const handleViewOrder = (id: string) => {
    setSelectedOrderId(id);
  };

  const selectedOrder = mockOrders.find(order => order.id === selectedOrderId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">অর্ডার ট্র্যাকিং</h1>
          <p className="text-muted-foreground">অর্ডারগুলি ট্র্যাক করুন এবং আপডেট করুন</p>
        </div>
        <Button className="flex gap-2 items-center">
          <Download className="h-4 w-4 mr-2" />
          অর্ডার রিপোর্ট ডাউনলোড
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="অর্ডার ID, গ্রাহক, ফোন নম্বর খুঁজুন"
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
              <DropdownMenuItem>তারিখ: আজ</DropdownMenuItem>
              <DropdownMenuItem>তারিখ: এই সপ্তাহ</DropdownMenuItem>
              <DropdownMenuItem>তারিখ: এই মাস</DropdownMenuItem>
              <DropdownMenuItem>পেমেন্ট: পেইড</DropdownMenuItem>
              <DropdownMenuItem>পেমেন্ট: আনপেইড</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">সব অর্ডার</TabsTrigger>
          <TabsTrigger value="pending">অপেক্ষারত</TabsTrigger>
          <TabsTrigger value="processing">প্রসেসিং</TabsTrigger>
          <TabsTrigger value="shipped">শিপড</TabsTrigger>
          <TabsTrigger value="delivered">ডেলিভারড</TabsTrigger>
          <TabsTrigger value="cancelled">বাতিল</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>অর্ডার</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead>গ্রাহক</TableHead>
                  <TableHead>মূল্য</TableHead>
                  <TableHead>পেমেন্ট</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <ShoppingBag className="h-8 w-8 mb-2" />
                        <p>কোন অর্ডার পাওয়া যায়নি</p>
                        {searchTerm && (
                          <p className="text-sm mt-1">"{searchTerm}" এর জন্য কোন ফলাফল নেই</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-xs text-muted-foreground">{order.items} আইটেম</div>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.phone}</div>
                      </TableCell>
                      <TableCell>৳{order.total}</TableCell>
                      <TableCell>{getPaymentBadge(order.payment)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewOrder(order.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          বিস্তারিত
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Tabs>

      {selectedOrder && (
        <Dialog open={!!selectedOrderId} onOpenChange={(open) => !open && setSelectedOrderId(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                অর্ডার বিস্তারিত
                <Badge variant="outline" className="ml-2">{selectedOrder.id}</Badge>
              </DialogTitle>
              <DialogDescription>
                অর্ডার তারিখ: {selectedOrder.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">অর্ডার স্ট্যাটাস</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">পেমেন্ট স্ট্যাটাস</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex items-center gap-2">
                    {getPaymentBadge(selectedOrder.payment)}
                    <span className="text-xs text-muted-foreground">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">মোট মূল্য</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="text-lg font-bold">৳{selectedOrder.total}</div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">গ্রাহকের তথ্য</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <div>
                      <div className="font-medium">{selectedOrder.customer}</div>
                      <div className="text-sm text-muted-foreground">{selectedOrder.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">ডেলিভারি ঠিকানা:</div>
                      <div className="text-sm">{selectedOrder.address}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">পেমেন্টের তথ্য</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium">পেমেন্ট মেথড:</div>
                      <div className="text-sm">{selectedOrder.paymentMethod}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">পেমেন্ট স্ট্যাটাস:</div>
                      <div>{getPaymentBadge(selectedOrder.payment)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Accordion type="single" collapsible defaultValue="products">
              <AccordionItem value="products">
                <AccordionTrigger>অর্ডার আইটেম</AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>পণ্য</TableHead>
                          <TableHead className="text-right">পরিমাণ</TableHead>
                          <TableHead className="text-right">মূল্য</TableHead>
                          <TableHead className="text-right">সাবটোটাল</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell className="text-right">{product.quantity}</TableCell>
                            <TableCell className="text-right">৳{product.price}</TableCell>
                            <TableCell className="text-right">
                              ৳{parseInt(product.price.replace(/,/g, '')) * parseInt(product.quantity)}
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} className="text-right font-medium">
                            মোট
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            ৳{selectedOrder.total}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="timeline">
                <AccordionTrigger>অর্ডার টাইমলাইন</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 py-2">
                    {selectedOrder.timeline.map((event, index) => (
                      <div key={index} className="relative pl-6 pb-4">
                        {index !== selectedOrder.timeline.length - 1 && (
                          <div className="absolute top-2 left-2 bottom-0 w-0.5 bg-gray-200"></div>
                        )}
                        <div className="absolute top-1 left-0 w-4 h-4 rounded-full bg-primary"></div>
                        <div className="text-sm font-medium">{event.status}</div>
                        <div className="text-xs text-muted-foreground mb-1">{event.time}</div>
                        <div className="text-sm">{event.description}</div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">স্ট্যাটাস আপডেট করুন</h3>
                <div className="flex gap-2">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option>স্ট্যাটাস সিলেক্ট করুন</option>
                    <option value="processing">প্রসেসিং</option>
                    <option value="shipped">শিপড</option>
                    <option value="delivered">ডেলিভারড</option>
                    <option value="cancelled">বাতিল</option>
                  </select>
                  <Button>আপডেট</Button>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  ইনভয়েস ডাউনলোড
                </Button>
                <Button variant="outline">
                  <Truck className="h-4 w-4 mr-2" />
                  ট্র্যাকিং আপডেট
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderTracking;
