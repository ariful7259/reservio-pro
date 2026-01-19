import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  Search,
  Filter,
  Star,
  Eye,
  RotateCcw,
  MessageSquare,
  MapPin,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface OrderItem {
  id: string;
  name?: string;
  title?: string;
  price: number | string;
  quantity: number;
  image?: string;
}

interface OrderData {
  items?: OrderItem[];
  deliveryAddress?: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    area: string;
  };
  shippingMethod?: {
    id: string;
    name: string;
    price: number;
  };
  subtotal?: number;
  shippingCost?: number;
  margin?: number;
  finalPrice?: number;
  [key: string]: unknown;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  final_price: number;
  margin_amount: number;
  payment_method: string;
  order_data: unknown;
  updated_at: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch orders from database
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('reseller_orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
      
      return (data || []).map(item => ({
        ...item,
        order_data: item.order_data as unknown
      })) as Order[];
    },
    enabled: !!user?.id
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'processing': 
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'confirmed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing':
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'ডেলিভার হয়েছে';
      case 'shipped': return 'পাঠানো হয়েছে';
      case 'processing': return 'প্রক্রিয়াধীন';
      case 'pending': return 'অপেক্ষমান';
      case 'cancelled': return 'বাতিল';
      case 'confirmed': return 'নিশ্চিত';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  const getOrderStatusCounts = () => {
    const counts = {
      all: orders.length,
      pending: 0,
      processing: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };
    
    orders.forEach(order => {
      if (counts.hasOwnProperty(order.status)) {
        counts[order.status as keyof typeof counts]++;
      }
    });
    
    return counts;
  };

  const statusCounts = getOrderStatusCounts();

  const parseOrderData = (data: unknown): OrderData => {
    if (typeof data === 'object' && data !== null) {
      return data as OrderData;
    }
    return { items: [] };
  };

  const filteredOrders = orders.filter(order => {
    const orderData = parseOrderData(order.order_data);
    const productNames = orderData?.items?.map(item => item.name || item.title).join(' ') || '';
    const matchesSearch = productNames.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const generateTrackingId = (orderId: string) => {
    return `TRK${orderId.slice(0, 8).toUpperCase()}`;
  };

  if (isLoading) {
    return (
      <div className="container px-4 pt-16 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-20 w-full mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 pt-16 pb-20">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">আমার অর্ডার</h1>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="অর্ডার বা প্রোডাক্ট খুঁজুন..."
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
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-6 gap-1 h-auto p-1">
          <TabsTrigger value="all" className="text-xs px-2 py-1.5">সব ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs px-2 py-1.5">অপেক্ষমান ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="confirmed" className="text-xs px-2 py-1.5">নিশ্চিত ({statusCounts.confirmed})</TabsTrigger>
          <TabsTrigger value="shipped" className="text-xs px-2 py-1.5">পাঠানো ({statusCounts.shipped})</TabsTrigger>
          <TabsTrigger value="delivered" className="text-xs px-2 py-1.5">ডেলিভার ({statusCounts.delivered})</TabsTrigger>
          <TabsTrigger value="cancelled" className="text-xs px-2 py-1.5">বাতিল ({statusCounts.cancelled})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">কোন অর্ডার পাওয়া যায়নি</p>
                <Button onClick={() => navigate('/marketplace')}>
                  কেনাকাটা শুরু করুন
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const orderData = parseOrderData(order.order_data);
                const firstItem = orderData?.items?.[0];
                const itemCount = orderData?.items?.length || 0;
                
                return (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              অর্ডার #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {getStatusText(order.status)}
                            </span>
                          </Badge>
                        </div>

                        {/* Product Preview */}
                        <div className="flex gap-4">
                          {firstItem?.image && (
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <img 
                                src={firstItem.image} 
                                alt={firstItem.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              {itemCount > 1 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                                  +{itemCount - 1}
                                </span>
                              )}
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold line-clamp-2 text-sm sm:text-base">
                              {firstItem?.name || 'পণ্য'}
                            </h3>
                            {itemCount > 1 && (
                              <p className="text-sm text-muted-foreground">
                                এবং আরও {itemCount - 1}টি আইটেম
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <CreditCard className="h-3 w-3" />
                              {order.payment_method === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.payment_method}
                            </p>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t">
                          <div className="space-y-1">
                            <p className="text-xl font-bold text-primary">
                              {formatPrice(order.final_price)}
                            </p>
                            {order.margin_amount > 0 && (
                              <p className="text-xs text-green-600 dark:text-green-400">
                                মার্জিন: +{formatPrice(order.margin_amount)}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              ট্র্যাকিং: {generateTrackingId(order.id)}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  বিস্তারিত
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>অর্ডার বিস্তারিত</DialogTitle>
                                </DialogHeader>
                                {selectedOrder && (
                                  <OrderDetails order={selectedOrder} />
                                )}
                              </DialogContent>
                            </Dialog>

                            {order.status === 'delivered' && (
                              <Button variant="outline" size="sm">
                                <Star className="h-4 w-4 mr-2" />
                                রিভিউ
                              </Button>
                            )}
                            
                            {order.status === 'shipped' && (
                              <Button variant="outline" size="sm">
                                <Truck className="h-4 w-4 mr-2" />
                                ট্র্যাক
                              </Button>
                            )}
                            
                            {(order.status === 'delivered' || order.status === 'cancelled') && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  // Re-add items to cart
                                  navigate('/marketplace');
                                }}
                              >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                পুনরায়
                              </Button>
                            )}
                            
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              সাপোর্ট
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Order Details Component
const OrderDetails = ({ order }: { order: Order }) => {
  const parseOrderData = (data: unknown): OrderData => {
    if (typeof data === 'object' && data !== null) {
      return data as OrderData;
    }
    return { items: [] };
  };
  
  const orderData = parseOrderData(order.order_data);
  
  const parsePrice = (price: string | number): number => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    const cleanedStr = String(price)
      .replace(/[৳$€£₹]/g, '')
      .replace(/[,\s]/g, '')
      .replace(/[০-৯]/g, (match) => {
        const bengaliToEnglish: Record<string, string> = {'০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'};
        return bengaliToEnglish[match] || match;
      });
    return parseFloat(cleanedStr) || 0;
  };
  
  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'number' ? price : parsePrice(price);
    return `৳${numPrice.toLocaleString('bn-BD')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'ডেলিভার হয়েছে';
      case 'shipped': return 'পাঠানো হয়েছে';
      case 'processing': return 'প্রক্রিয়াধীন';
      case 'pending': return 'অপেক্ষমান';
      case 'cancelled': return 'বাতিল';
      case 'confirmed': return 'নিশ্চিত';
      default: return status;
    }
  };

  // Timeline steps
  const timelineSteps = [
    { status: 'pending', label: 'অর্ডার করা হয়েছে', icon: Package },
    { status: 'confirmed', label: 'নিশ্চিত করা হয়েছে', icon: CheckCircle },
    { status: 'shipped', label: 'পাঠানো হয়েছে', icon: Truck },
    { status: 'delivered', label: 'ডেলিভার হয়েছে', icon: CheckCircle },
  ];

  const currentStepIndex = timelineSteps.findIndex(step => step.status === order.status);

  return (
    <div className="space-y-6">
      {/* Order Status */}
      <div className="space-y-2">
        <h4 className="font-semibold">অর্ডার স্ট্যাটাস</h4>
        <Badge className="text-sm">{getStatusText(order.status)}</Badge>
        
        {/* Timeline */}
        {order.status !== 'cancelled' && (
          <div className="flex items-center justify-between mt-4 px-2">
            {timelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.status} className="flex flex-col items-center relative">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                    ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={`text-xs mt-1 text-center ${isCompleted ? 'text-primary' : 'text-muted-foreground'}`}>
                    {step.label}
                  </p>
                  {index < timelineSteps.length - 1 && (
                    <div className={`
                      absolute top-4 left-8 w-16 h-0.5
                      ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Separator />

      {/* Order Items */}
      <div className="space-y-3">
        <h4 className="font-semibold">অর্ডার আইটেম</h4>
        {orderData?.items?.map((item, index) => (
          <div key={index} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
            {item.image && (
              <img 
                src={item.image} 
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
            )}
            <div className="flex-1">
              <p className="font-medium text-sm">{item.name || item.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatPrice(item.price)} × {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              {formatPrice(parsePrice(item.price) * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <Separator />

      {/* Delivery Address */}
      {orderData?.deliveryAddress && (
        <>
          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              ডেলিভারি ঠিকানা
            </h4>
            <div className="p-3 bg-muted/50 rounded-lg text-sm space-y-1">
              <p className="font-medium">{orderData.deliveryAddress.fullName}</p>
              <p>{orderData.deliveryAddress.phone}</p>
              <p>{orderData.deliveryAddress.address}</p>
              <p>{orderData.deliveryAddress.area}, {orderData.deliveryAddress.city}</p>
            </div>
          </div>
          <Separator />
        </>
      )}

      {/* Payment Summary */}
      <div className="space-y-2">
        <h4 className="font-semibold">পেমেন্ট সামারি</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">সাবটোটাল</span>
            <span>{formatPrice(order.total_amount)}</span>
          </div>
          {orderData?.shippingCost && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">শিপিং</span>
              <span>{formatPrice(orderData.shippingCost)}</span>
            </div>
          )}
          {order.margin_amount > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>মার্জিন</span>
              <span>+{formatPrice(order.margin_amount)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>মোট</span>
            <span className="text-primary">{formatPrice(order.final_price)}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Order Info */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">অর্ডার ID</span>
          <span className="font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">অর্ডার তারিখ</span>
          <span>{formatDate(order.created_at)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">পেমেন্ট মেথড</span>
          <span>{order.payment_method === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.payment_method}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">ট্র্যাকিং ID</span>
          <span className="font-mono">TRK{order.id.slice(0, 8).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
