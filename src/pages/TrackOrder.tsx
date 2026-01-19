import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ArrowLeft,
  MapPin,
  Calendar,
  CreditCard,
  Phone,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OrderData {
  items: Array<{
    id: string;
    title: string;
    price: string;
    quantity: number;
    image?: string;
  }>;
  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    area: string;
  };
  shippingMethod: {
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
  };
  subtotal: number;
  shippingCost: number;
  total: number;
}

interface TrackedOrder {
  id: string;
  status: string;
  created_at: string;
  updated_at: string;
  total_amount: number;
  payment_method: string;
  order_data: OrderData;
}

const TrackOrder = () => {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    if (!trackingId.trim()) {
      toast.error('ট্র্যাকিং আইডি দিন');
      return;
    }

    setIsLoading(true);
    setNotFound(false);
    setOrder(null);

    try {
      // Extract order ID from tracking ID (format: TRK-XXXXX-YYYY where XXXXX is first 5 chars of order ID)
      const trackingParts = trackingId.toUpperCase().split('-');
      
      if (trackingParts.length < 2) {
        // Try direct order ID search
        const { data, error } = await supabase
          .from('reseller_orders')
          .select('*')
          .eq('id', trackingId)
          .single();

        if (error || !data) {
          setNotFound(true);
          return;
        }

        setOrder({
          ...data,
          order_data: parseOrderData(data.order_data)
        });
      } else {
        // Search by tracking pattern
        const orderIdPrefix = trackingParts[1];
        
        const { data, error } = await supabase
          .from('reseller_orders')
          .select('*')
          .ilike('id', `${orderIdPrefix}%`)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error || !data) {
          setNotFound(true);
          return;
        }

        setOrder({
          ...data,
          order_data: parseOrderData(data.order_data)
        });
      }
    } catch (error) {
      console.error('Error searching order:', error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const parseOrderData = (data: unknown): OrderData => {
    if (typeof data === 'object' && data !== null) {
      return data as OrderData;
    }
    return {
      items: [],
      deliveryAddress: { fullName: '', phone: '', address: '', city: '', area: '' },
      shippingMethod: { id: '', name: '', price: 0, estimatedDays: '' },
      subtotal: 0,
      shippingCost: 0,
      total: 0
    };
  };

  const generateTrackingId = (orderId: string): string => {
    const prefix = orderId.substring(0, 5).toUpperCase();
    const suffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TRK-${prefix}-${suffix}`;
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { 
      label: string; 
      labelBn: string;
      color: string; 
      icon: React.ReactNode;
      step: number;
    }> = {
      pending: { 
        label: 'Pending', 
        labelBn: 'অপেক্ষমান',
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
        icon: <Clock className="h-5 w-5" />,
        step: 1
      },
      processing: { 
        label: 'Processing', 
        labelBn: 'প্রক্রিয়াধীন',
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: <Package className="h-5 w-5" />,
        step: 2
      },
      shipped: { 
        label: 'Shipped', 
        labelBn: 'শিপ করা হয়েছে',
        color: 'bg-purple-100 text-purple-800 border-purple-200', 
        icon: <Truck className="h-5 w-5" />,
        step: 3
      },
      delivered: { 
        label: 'Delivered', 
        labelBn: 'ডেলিভারি হয়েছে',
        color: 'bg-green-100 text-green-800 border-green-200', 
        icon: <CheckCircle className="h-5 w-5" />,
        step: 4
      },
      cancelled: { 
        label: 'Cancelled', 
        labelBn: 'বাতিল',
        color: 'bg-red-100 text-red-800 border-red-200', 
        icon: <XCircle className="h-5 w-5" />,
        step: -1
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
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

  const trackingSteps = [
    { step: 1, label: 'অর্ডার করা হয়েছে', icon: <Package className="h-5 w-5" /> },
    { step: 2, label: 'প্রক্রিয়াধীন', icon: <Clock className="h-5 w-5" /> },
    { step: 3, label: 'শিপ করা হয়েছে', icon: <Truck className="h-5 w-5" /> },
    { step: 4, label: 'ডেলিভারি হয়েছে', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            হোমে ফিরুন
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">অর্ডার ট্র্যাক করুন</h1>
          <p className="text-primary-foreground/80 mt-1">ট্র্যাকিং আইডি দিয়ে আপনার অর্ডারের বর্তমান অবস্থা জানুন</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Box */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="ট্র্যাকিং আইডি বা অর্ডার আইডি লিখুন..."
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="h-12 px-6"
              >
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    খুঁজুন
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              উদাহরণ: TRK-A1B2C-X9Y8 অথবা সম্পূর্ণ অর্ডার আইডি
            </p>
          </CardContent>
        </Card>

        {/* Not Found */}
        {notFound && (
          <Card className="max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <Package className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">অর্ডার পাওয়া যায়নি</h3>
              <p className="text-muted-foreground">
                এই ট্র্যাকিং আইডি দিয়ে কোনো অর্ডার খুঁজে পাওয়া যায়নি। 
                অনুগ্রহ করে সঠিক আইডি দিয়ে আবার চেষ্টা করুন।
              </p>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {order && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Status Timeline */}
            <Card className="shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">ট্র্যাকিং আইডি: {generateTrackingId(order.id)}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      অর্ডার আইডি: {order.id.substring(0, 8)}...
                    </p>
                  </div>
                  <Badge className={`${getStatusInfo(order.status).color} px-4 py-2 text-sm font-medium`}>
                    {getStatusInfo(order.status).icon}
                    <span className="ml-2">{getStatusInfo(order.status).labelBn}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {order.status !== 'cancelled' ? (
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-6 left-0 right-0 h-1 bg-muted mx-10">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${((getStatusInfo(order.status).step - 1) / 3) * 100}%` }}
                      />
                    </div>
                    
                    {/* Steps */}
                    <div className="flex justify-between relative">
                      {trackingSteps.map((step) => {
                        const currentStep = getStatusInfo(order.status).step;
                        const isCompleted = step.step <= currentStep;
                        const isCurrent = step.step === currentStep;
                        
                        return (
                          <div key={step.step} className="flex flex-col items-center">
                            <div className={`
                              w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300
                              ${isCompleted 
                                ? 'bg-primary text-primary-foreground shadow-lg' 
                                : 'bg-muted text-muted-foreground'
                              }
                              ${isCurrent ? 'ring-4 ring-primary/30 scale-110' : ''}
                            `}>
                              {step.icon}
                            </div>
                            <span className={`
                              mt-3 text-xs md:text-sm text-center font-medium
                              ${isCompleted ? 'text-primary' : 'text-muted-foreground'}
                            `}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                      <XCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-lg font-semibold text-destructive">অর্ডার বাতিল করা হয়েছে</h3>
                    <p className="text-muted-foreground mt-1">
                      এই অর্ডারটি বাতিল করা হয়েছে। আরো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Delivery Address */}
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    ডেলিভারি ঠিকানা
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{order.order_data.deliveryAddress?.fullName || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{order.order_data.deliveryAddress?.phone || 'N/A'}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {order.order_data.deliveryAddress?.address}, {order.order_data.deliveryAddress?.area}, {order.order_data.deliveryAddress?.city}
                  </p>
                </CardContent>
              </Card>

              {/* Order Info */}
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    অর্ডার তথ্য
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">অর্ডারের তারিখ</span>
                    <span className="font-medium">{formatDate(order.created_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">পেমেন্ট মেথড</span>
                    <span className="font-medium flex items-center gap-1">
                      <CreditCard className="h-4 w-4" />
                      {order.payment_method === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.payment_method}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">শিপিং</span>
                    <span>{order.order_data.shippingMethod?.name || 'Standard'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  অর্ডার আইটেম
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.order_data.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          পরিমাণ: {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-primary">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Total */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">সাবটোটাল</span>
                    <span>{formatPrice(order.order_data.subtotal || 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">শিপিং</span>
                    <span>{formatPrice(order.order_data.shippingCost || 0)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>মোট</span>
                    <span className="text-primary">{formatPrice(order.total_amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="bg-muted/50 border-dashed">
              <CardContent className="py-6 text-center">
                <h3 className="font-semibold mb-2">সাহায্য প্রয়োজন?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  আপনার অর্ডার সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের সাথে যোগাযোগ করুন।
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    +880 1XXX-XXXXXX
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/support')}>
                    সাপোর্টে যোগাযোগ করুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
