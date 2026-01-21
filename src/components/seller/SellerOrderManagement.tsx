import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useSellerOrderStats } from '@/hooks/useSellerOrderStats';
import SellerOrderStatsCards from '@/components/seller/SellerOrderStatsCards';
import { 
  Package, Search, Filter, Clock, User, MapPin, Phone,
  CheckCircle, XCircle, Truck, AlertCircle, Eye, Edit,
  Send, RefreshCw, ChevronRight, Calendar, DollarSign,
  ShoppingBag, MoreVertical
} from 'lucide-react';

interface Order {
  id: string;
  status: string;
  total_amount: number;
  final_price: number;
  margin_amount: number;
  payment_method: string;
  order_data: any;
  created_at: string;
  updated_at: string;
  admin_notes: string | null;
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { 
    label: 'পেন্ডিং', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: <Clock className="h-3 w-3" />
  },
  processing: { 
    label: 'প্রসেসিং', 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: <Package className="h-3 w-3" />
  },
  shipped: { 
    label: 'শিপড', 
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: <Truck className="h-3 w-3" />
  },
  delivered: { 
    label: 'ডেলিভার্ড', 
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: <CheckCircle className="h-3 w-3" />
  },
  cancelled: { 
    label: 'বাতিল', 
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: <XCircle className="h-3 w-3" />
  },
  refunded: { 
    label: 'রিফান্ডেড', 
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: <RefreshCw className="h-3 w-3" />
  }
};

const SellerOrderManagement: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { orders, stats, isLoading, error: ordersError, refetch } = useSellerOrderStats({ userId: user?.id });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');

  useEffect(() => {
    if (!ordersError) return;
    toast({
      title: "অর্ডার লোড করতে সমস্যা",
      description: ordersError,
      variant: "destructive",
    });
  }, [ordersError, toast]);

  // Update order status
  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('reseller_orders')
        .update({
          status: newStatus,
          admin_notes: statusNote ? `${selectedOrder.admin_notes || ''}\n[${new Date().toLocaleDateString('bn-BD')}] ${statusNote}` : selectedOrder.admin_notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedOrder.id);

      if (error) throw error;

      toast({
        title: "স্ট্যাটাস আপডেট হয়েছে!",
        description: `অর্ডার #${selectedOrder.id.slice(0, 8)} এর স্ট্যাটাস "${statusConfig[newStatus]?.label}" এ পরিবর্তন হয়েছে`
      });

      refetch();
      setIsDetailsOpen(false);
      setNewStatus('');
      setStatusNote('');
    } catch (error: any) {
      toast({
        title: "আপডেট করতে সমস্যা",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_data?.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_data?.customerPhone?.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-12" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <SellerOrderStatsCards stats={stats} formatPrice={formatPrice} />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="অর্ডার আইডি বা গ্রাহকের নাম/ফোন দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব অর্ডার</SelectItem>
            {Object.entries(statusConfig).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={refetch}>
          <RefreshCw className="h-4 w-4 mr-2" />
          রিফ্রেশ
        </Button>
      </div>

      {/* Status Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
          <TabsTrigger value="all" className="flex-shrink-0">
            সব ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-shrink-0">
            পেন্ডিং ({stats.pending})
          </TabsTrigger>
          <TabsTrigger value="processing" className="flex-shrink-0">
            প্রসেসিং ({stats.processing})
          </TabsTrigger>
          <TabsTrigger value="shipped" className="flex-shrink-0">
            শিপড ({stats.shipped})
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex-shrink-0">
            ডেলিভার্ড ({stats.delivered})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">কোনো অর্ডার নেই</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery || statusFilter !== 'all' 
                ? 'আপনার সার্চ অনুযায়ী কোনো অর্ডার পাওয়া যায়নি'
                : 'এখনো কোনো অর্ডার আসেনি'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Card 
              key={order.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedOrder(order);
                setNewStatus(order.status);
                setIsDetailsOpen(true);
              }}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-medium text-sm">
                          #{order.id.slice(0, 8)}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${statusConfig[order.status]?.color}`}
                        >
                          {statusConfig[order.status]?.icon}
                          <span className="ml-1">{statusConfig[order.status]?.label}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {order.order_data?.customerName || 'অজানা'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.order_data?.customerPhone || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(order.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(order.final_price)}</p>
                      <p className="text-xs text-green-600">
                        লাভ: {formatPrice(order.margin_amount)}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              অর্ডার #{selectedOrder?.id.slice(0, 8)}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Current Status */}
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">বর্তমান স্ট্যাটাস</span>
                <Badge 
                  variant="outline" 
                  className={statusConfig[selectedOrder.status]?.color}
                >
                  {statusConfig[selectedOrder.status]?.icon}
                  <span className="ml-1">{statusConfig[selectedOrder.status]?.label}</span>
                </Badge>
              </div>

              {/* Customer Info */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  গ্রাহক তথ্য
                </h4>
                <div className="text-sm space-y-1 pl-6">
                  <p><strong>নাম:</strong> {selectedOrder.order_data?.customerName || 'N/A'}</p>
                  <p><strong>ফোন:</strong> {selectedOrder.order_data?.customerPhone || 'N/A'}</p>
                  <p><strong>ঠিকানা:</strong> {selectedOrder.order_data?.customerAddress || 'N/A'}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  অর্ডার আইটেম
                </h4>
                <div className="space-y-2 pl-6">
                  {selectedOrder.order_data?.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  )) || <p className="text-sm text-muted-foreground">কোনো আইটেম নেই</p>}
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>মোট মূল্য</span>
                  <span>{formatPrice(selectedOrder.total_amount)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>আপনার লাভ</span>
                  <span>+{formatPrice(selectedOrder.margin_amount)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>গ্রাহক থেকে নেওয়া</span>
                  <span>{formatPrice(selectedOrder.final_price)}</span>
                </div>
              </div>

              {/* Status Update */}
              <div className="space-y-3 border-t pt-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  স্ট্যাটাস আপডেট করুন
                </h4>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="নতুন স্ট্যাটাস নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(statusConfig).map(([key, { label, icon }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {icon}
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div>
                  <Label className="text-sm">নোট (ঐচ্ছিক)</Label>
                  <Textarea
                    placeholder="স্ট্যাটাস পরিবর্তনের কারণ বা বিস্তারিত..."
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    rows={2}
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleStatusUpdate} 
                  disabled={isUpdating || newStatus === selectedOrder.status}
                  className="w-full"
                >
                  {isUpdating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      আপডেট হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      স্ট্যাটাস আপডেট করুন
                    </>
                  )}
                </Button>
              </div>

              {/* Notes History */}
              {selectedOrder.admin_notes && (
                <div className="space-y-2 border-t pt-4">
                  <h4 className="font-medium text-sm">নোট হিস্টোরি</h4>
                  <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-line">
                    {selectedOrder.admin_notes}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerOrderManagement;
