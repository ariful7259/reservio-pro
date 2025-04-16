
import React, { useState } from 'react';
import { 
  ShoppingCart,
  Clock,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// মক ডেটা - বাস্তব অ্যাপ্লিকেশনে এটি API থেকে আসবে
const orderData = [
  { 
    id: 'ORD-001', 
    customer: 'রহিম আহমেদ', 
    products: 3, 
    total: '৳ 18,500', 
    status: 'পেন্ডিং', 
    date: '১৫ মিনিট আগে',
    address: 'মিরপুর-১০, ঢাকা'
  },
  { 
    id: 'ORD-002', 
    customer: 'ফাতেমা বেগম', 
    products: 1, 
    total: '৳ 2,400', 
    status: 'প্রসেসিং', 
    date: '১ ঘন্টা আগে',
    address: 'বনানী, ঢাকা'
  },
  { 
    id: 'ORD-003', 
    customer: 'করিম উদ্দিন', 
    products: 2, 
    total: '৳ 7,800', 
    status: 'শিপড', 
    date: '৪ ঘন্টা আগে',
    address: 'উত্তরা, ঢাকা'
  },
  { 
    id: 'ORD-004', 
    customer: 'জামিলা খাতুন', 
    products: 4, 
    total: '৳ 12,350', 
    status: 'ডেলিভারড', 
    date: '১ দিন আগে',
    address: 'মোহাম্মদপুর, ঢাকা'
  },
  { 
    id: 'ORD-005', 
    customer: 'সালাহউদ্দিন', 
    products: 1, 
    total: '৳ 5,500', 
    status: 'পেন্ডিং', 
    date: '১ দিন আগে',
    address: 'গুলশান, ঢাকা'
  },
];

// অর্ডার স্ট্যাটাস বেজ
const OrderStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'পেন্ডিং':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">পেন্ডিং</Badge>;
    case 'প্রসেসিং':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">প্রসেসিং</Badge>;
    case 'শিপড':
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">শিপড</Badge>;
    case 'ডেলিভারড':
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">ডেলিভারড</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

// অর্ডার আইটেম কম্পোনেন্ট
const OrderItem = ({ order }: { order: typeof orderData[0] }) => {
  return (
    <div className="border rounded-md p-4 mb-3 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{order.id}</p>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-sm font-medium mt-1">গ্রাহক: {order.customer}</p>
          <p className="text-sm text-gray-500">পণ্য: {order.products}টি</p>
          <p className="text-sm text-gray-500">ঠিকানা: {order.address}</p>
        </div>
        <div className="text-right">
          <p className="font-medium">{order.total}</p>
          <p className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
            <Clock className="h-3 w-3" />
            {order.date}
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-3">
        <Button size="sm" variant="outline">বিস্তারিত দেখুন</Button>
        <Button size="sm" variant="outline">স্ট্যাটাস আপডেট</Button>
      </div>
    </div>
  );
};

// অর্ডার ফিল্টার কম্পোনেন্ট
const OrderFilters = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <div className="flex-1 relative">
        <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="অর্ডার আইডি বা গ্রাহকের নাম" 
          className="pl-8"
        />
      </div>
      <Select defaultValue="all" onValueChange={onFilterChange}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="স্ট্যাটাস" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
          <SelectItem value="পেন্ডিং">পেন্ডিং</SelectItem>
          <SelectItem value="প্রসেসিং">প্রসেসিং</SelectItem>
          <SelectItem value="শিপড">শিপড</SelectItem>
          <SelectItem value="ডেলিভারড">ডেলিভারড</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

const OrderTracking = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('recent');
  
  // ফিল্টার করা অর্ডার
  const filteredOrders = activeFilter === 'all' 
    ? orderData 
    : orderData.filter(order => order.status === activeFilter);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>অর্ডার ট্র্যাকিং</CardTitle>
        <Tabs defaultValue="recent" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="recent">সাম্প্রতিক</TabsTrigger>
            <TabsTrigger value="all">সবগুলো</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <OrderFilters onFilterChange={setActiveFilter} />
        
        <div className="space-y-1">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="mx-auto h-8 w-8 mb-2" />
              <p>কোন অর্ডার পাওয়া যায়নি</p>
            </div>
          )}
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-4">
          সব অর্ডার দেখুন
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
