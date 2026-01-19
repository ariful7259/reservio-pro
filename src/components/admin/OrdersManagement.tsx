import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Eye,
  Edit,
  Calendar,
  MapPin,
  CreditCard,
  User,
  RefreshCw,
} from 'lucide-react';

interface OrderData {
  items?: Array<{
    id: string;
    name?: string;
    title?: string;
    price: number | string;
    quantity: number;
    image?: string;
  }>;
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
    cost: number;
  };
  subtotal?: number;
  shippingCost?: number;
}

interface Order {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status: string;
  total_amount: number;
  final_price: number;
  margin_amount: number;
  payment_method: string;
  order_data: unknown;
  admin_notes: string | null;
}

const statusOptions = [
  { value: 'pending', label: 'অপেক্ষমান', icon: <Clock className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'confirmed', label: 'নিশ্চিত', icon: <CheckCircle className="h-4 w-4" />, color: 'bg-emerald-100 text-emerald-800' },
  { value: 'processing', label: 'প্রক্রিয়াধীন', icon: <RefreshCw className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' },
  { value: 'shipped', label: 'পাঠানো হয়েছে', icon: <Truck className="h-4 w-4" />, color: 'bg-indigo-100 text-indigo-800' },
  { value: 'delivered', label: 'ডেলিভার হয়েছে', icon: <CheckCircle className="h-4 w-4" />, color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'বাতিল', icon: <XCircle className="h-4 w-4" />, color: 'bg-red-100 text-red-800' },
];

const OrdersManagement: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  // Fetch all orders
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reseller_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });

  // Update order mutation
  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status, notes }: { orderId: string; status: string; notes: string }) => {
      const { error } = await supabase
        .from('reseller_orders')
        .update({
          status,
          admin_notes: notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId);

      if (error) throw error;

      // Send notification email
      if (selectedOrder) {
        const orderData = parseOrderData(selectedOrder.order_data);
        try {
          await supabase.functions.invoke('send-order-notification', {
            body: {
              orderId,
              type: status,
              customerEmail: orderData?.deliveryAddress?.phone || '',
              customerName: orderData?.deliveryAddress?.fullName || 'গ্রাহক',
              orderDetails: {
                items: orderData?.items || [],
                totalAmount: selectedOrder.total_amount,
                finalPrice: selectedOrder.final_price,
                deliveryAddress: orderData?.deliveryAddress,
                trackingId: `TRK${orderId.slice(0, 8).toUpperCase()}`,
              },
            },
          });
        } catch (emailError) {
          console.log('Email notification skipped:', emailError);
        }
      }
    },
    onSuccess: () => {
      toast({
        title: 'সফল!',
        description: 'অর্ডার স্ট্যাটাস আপডেট হয়েছে',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
      setIsEditDialogOpen(false);
      setSelectedOrder(null);
    },
    onError: (error: any) => {
      toast({
        title: 'সমস্যা হয়েছে',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const parseOrderData = (data: unknown): OrderData => {
    if (typeof data === 'object' && data !== null) {
      return data as OrderData;
    }
    return { items: [] };
  };

  const getStatusInfo = (status: string) => {
    return statusOptions.find((s) => s.value === status) || statusOptions[0];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => `৳${price.toLocaleString('bn-BD')}`;

  const getOrderCounts = () => {
    const counts: Record<string, number> = { all: orders.length };
    statusOptions.forEach((s) => {
      counts[s.value] = orders.filter((o) => o.status === s.value).length;
    });
    return counts;
  };

  const counts = getOrderCounts();

  const filteredOrders = orders.filter((order) => {
    const orderData = parseOrderData(order.order_data);
    const customerName = orderData?.deliveryAddress?.fullName?.toLowerCase() || '';
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setAdminNotes(order.admin_notes || '');
    setIsEditDialogOpen(true);
  };

  const handleUpdateOrder = () => {
    if (!selectedOrder) return;
    updateOrderMutation.mutate({
      orderId: selectedOrder.id,
      status: editStatus,
      notes: adminNotes,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">অর্ডার ম্যানেজমেন্ট</h2>
        <Button onClick={() => refetch()} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          রিফ্রেশ
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="অর্ডার আইডি বা গ্রাহকের নাম খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {statusOptions.map((status) => (
          <Card
            key={status.value}
            className={`cursor-pointer transition-all ${
              activeTab === status.value ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveTab(status.value)}
          >
            <CardContent className="p-4 text-center">
              <div className={`inline-flex p-2 rounded-full ${status.color} mb-2`}>
                {status.icon}
              </div>
              <p className="text-2xl font-bold">{counts[status.value] || 0}</p>
              <p className="text-xs text-muted-foreground">{status.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7 h-auto gap-1 p-1">
          <TabsTrigger value="all" className="text-xs">সব ({counts.all})</TabsTrigger>
          {statusOptions.map((status) => (
            <TabsTrigger key={status.value} value={status.value} className="text-xs">
              {status.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">কোন অর্ডার পাওয়া যায়নি</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const orderData = parseOrderData(order.order_data);
                const statusInfo = getStatusInfo(order.status);
                const firstItem = orderData?.items?.[0];

                return (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Order Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-sm font-medium">
                              #{order.id.slice(0, 8).toUpperCase()}
                            </span>
                            <Badge className={statusInfo.color}>
                              {statusInfo.icon}
                              <span className="ml-1">{statusInfo.label}</span>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {orderData?.deliveryAddress?.fullName || 'N/A'}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(order.created_at)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {orderData?.deliveryAddress?.city || 'N/A'}
                            </div>
                            <div className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              {order.payment_method}
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">
                            {formatPrice(order.final_price)}
                          </p>
                          {order.margin_amount > 0 && (
                            <p className="text-xs text-green-600">
                              মার্জিন: +{formatPrice(order.margin_amount)}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {orderData?.items?.length || 0} আইটেম
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleEditOrder(order)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            আপডেট
                          </Button>
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

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>অর্ডার বিস্তারিত</DialogTitle>
          </DialogHeader>
          {selectedOrder && <OrderDetailsView order={selectedOrder} />}
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>অর্ডার স্ট্যাটাস আপডেট</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">স্ট্যাটাস</label>
              <Select value={editStatus} onValueChange={setEditStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      <span className="flex items-center gap-2">
                        {status.icon}
                        {status.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">অ্যাডমিন নোট</label>
              <Textarea
                placeholder="অর্ডার সম্পর্কে নোট লিখুন..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              বাতিল
            </Button>
            <Button
              onClick={handleUpdateOrder}
              disabled={updateOrderMutation.isPending}
            >
              {updateOrderMutation.isPending ? 'আপডেট হচ্ছে...' : 'আপডেট করুন'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Order Details View Component
const OrderDetailsView: React.FC<{ order: Order }> = ({ order }) => {
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
        const bengaliToEnglish: Record<string, string> = {
          '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
          '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
        };
        return bengaliToEnglish[match] || match;
      });
    return parseFloat(cleanedStr) || 0;
  };

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'number' ? price : parsePrice(price);
    return `৳${numPrice.toLocaleString('bn-BD')}`;
  };

  return (
    <div className="space-y-6">
      {/* Order ID & Status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">অর্ডার আইডি</p>
          <p className="font-mono font-bold">#{order.id.slice(0, 8).toUpperCase()}</p>
        </div>
        <Badge className={statusOptions.find((s) => s.value === order.status)?.color}>
          {statusOptions.find((s) => s.value === order.status)?.label}
        </Badge>
      </div>

      {/* Customer Info */}
      {orderData?.deliveryAddress && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              গ্রাহক তথ্য
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p><strong>নাম:</strong> {orderData.deliveryAddress.fullName}</p>
            <p><strong>ফোন:</strong> {orderData.deliveryAddress.phone}</p>
            <p><strong>ঠিকানা:</strong> {orderData.deliveryAddress.address}</p>
            <p><strong>এলাকা:</strong> {orderData.deliveryAddress.area}, {orderData.deliveryAddress.city}</p>
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Package className="h-4 w-4" />
            অর্ডার আইটেম
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderData?.items?.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name || item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name || item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.price)} × {item.quantity}
                  </p>
                </div>
                <p className="font-bold">
                  {formatPrice(parsePrice(item.price) * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            পেমেন্ট সামারি
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <div className="flex justify-between">
            <span>সাবটোটাল</span>
            <span>{formatPrice(order.total_amount - (orderData?.shippingCost || 0))}</span>
          </div>
          <div className="flex justify-between">
            <span>শিপিং</span>
            <span>{formatPrice(orderData?.shippingCost || 0)}</span>
          </div>
          {order.margin_amount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>রিসেলার মার্জিন</span>
              <span>+{formatPrice(order.margin_amount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>সর্বমোট</span>
            <span className="text-primary">{formatPrice(order.final_price)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>পেমেন্ট মেথড</span>
            <span>{order.payment_method}</span>
          </div>
        </CardContent>
      </Card>

      {/* Admin Notes */}
      {order.admin_notes && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">অ্যাডমিন নোট</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{order.admin_notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersManagement;
