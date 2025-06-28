
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Search,
  Filter,
  Star,
  MapPin,
  Calendar,
  Eye,
  RotateCcw
} from 'lucide-react';

const ShopSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const mockOrders = [
    {
      id: 'O001',
      productName: 'স্মার্ট ওয়াচ',
      seller: 'টেক স্টোর',
      orderDate: '২৫ এপ্রিল, ২০২৫',
      deliveryDate: '২৮ এপ্রিল, ২০২৫',
      amount: '৳৫,৫০০',
      status: 'delivered',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      rating: 4.5,
      trackingNumber: 'TRK001234567',
      paymentMethod: 'অনলাইন পেমেন্ট'
    },
    {
      id: 'O002',
      productName: 'ব্লুটুথ ইয়ারফোন',
      seller: 'অডিও হাব',
      orderDate: '২২ এপ্রিল, ২০২৫',
      deliveryDate: '২৬ এপ্রিল, ২০২৫',
      amount: '৳২,৮০০',
      status: 'shipped',
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
      rating: null,
      trackingNumber: 'TRK001234568',
      paymentMethod: 'ক্যাশ অন ডেলিভারি'
    },
    {
      id: 'O003',
      productName: 'মোবাইল ফোন কেস',
      seller: 'এক্সেসরিজ ওয়ার্ল্ড',
      orderDate: '২০ এপ্রিল, ২০২৫',
      deliveryDate: 'প্রসেসিং',
      amount: '৳৪৫০',
      status: 'processing',
      quantity: 3,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
      rating: null,
      trackingNumber: 'TRK001234569',
      paymentMethod: 'অনলাইন পেমেন্ট'
    },
    {
      id: 'O004',
      productName: 'ল্যাপটপ ব্যাগ',
      seller: 'ব্যাগ কালেকশন',
      orderDate: '১৮ এপ্রিল, ২০২৫',
      deliveryDate: 'বাতিল',
      amount: '৳১,২০০',
      status: 'cancelled',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      rating: null,
      trackingNumber: 'TRK001234570',
      paymentMethod: 'অনলাইন পেমেন্ট'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'ডেলিভার হয়েছে';
      case 'shipped': return 'পাঠানো হয়েছে';
      case 'processing': return 'প্রক্রিয়াধীন';
      case 'cancelled': return 'বাতিল';
      default: return status;
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">আমার শপ</h2>
          <p className="text-muted-foreground">আপনার সকল অর্ডার ও কেনাকাটার ইতিহাস দেখুন</p>
        </div>
        <Button>
          <ShoppingBag className="h-4 w-4 mr-2" />
          নতুন অর্ডার
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="প্রোডাক্ট বা বিক্রেতা খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              ফিল্টার
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">সব ({mockOrders.length})</TabsTrigger>
          <TabsTrigger value="processing">প্রসেসিং ({mockOrders.filter(o => o.status === 'processing').length})</TabsTrigger>
          <TabsTrigger value="shipped">পাঠানো ({mockOrders.filter(o => o.status === 'shipped').length})</TabsTrigger>
          <TabsTrigger value="delivered">ডেলিভার ({mockOrders.filter(o => o.status === 'delivered').length})</TabsTrigger>
          <TabsTrigger value="cancelled">বাতিল ({mockOrders.filter(o => o.status === 'cancelled').length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন অর্ডার পাওয়া যায়নি</p>
                <Button>কেনাকাটা শুরু করুন</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <img 
                            src={order.image} 
                            alt={order.productName}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{order.productName}</h3>
                              <p className="text-sm text-muted-foreground">বিক্রেতা: {order.seller}</p>
                              <p className="text-sm text-muted-foreground">কোয়ান্টিটি: {order.quantity}</p>
                            </div>
                            <Badge className={`${getStatusColor(order.status)} ml-4`}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {getStatusText(order.status)}
                              </span>
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="lg:text-right space-y-2">
                        <p className="text-2xl font-bold text-primary">{order.amount}</p>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2 lg:justify-end">
                            <Calendar className="h-4 w-4" />
                            <span>অর্ডার: {order.orderDate}</span>
                          </div>
                          {order.status === 'delivered' && (
                            <div className="flex items-center gap-2 lg:justify-end">
                              <CheckCircle className="h-4 w-4" />
                              <span>ডেলিভারি: {order.deliveryDate}</span>
                            </div>
                          )}
                          <p className="text-xs">ট্র্যাকিং: {order.trackingNumber}</p>
                          <p className="text-xs">পেমেন্ট: {order.paymentMethod}</p>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            বিস্তারিত
                          </Button>
                          {order.status === 'delivered' && !order.rating && (
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-2" />
                              রিভিউ
                            </Button>
                          )}
                          {(order.status === 'delivered' || order.status === 'cancelled') && (
                            <Button variant="outline" size="sm">
                              <RotateCcw className="h-4 w-4 mr-2" />
                              পুনরায় অর্ডার
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopSection;
