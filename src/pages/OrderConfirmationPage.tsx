import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Phone,
  User,
  CreditCard,
  Copy,
  Home,
  ShoppingBag,
  Clock,
  Calendar,
  Receipt
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
  isResell?: boolean;
  margin?: number;
}

interface OrderData {
  orderId: string;
  items: OrderItem[];
  deliveryAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    area: string;
    postalCode?: string;
  };
  shippingMethod: {
    id: string;
    name: string;
    cost: number;
    estimatedDays: string;
  };
  paymentMethod: string;
  subtotal: number;
  shippingCost: number;
  marginTotal: number;
  total: number;
  isReseller: boolean;
  createdAt: string;
}

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [trackingProgress, setTrackingProgress] = useState(25);

  useEffect(() => {
    if (location.state?.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // Demo data for testing
      setOrderData({
        orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
        items: [],
        deliveryAddress: {
          fullName: 'ডেমো ইউজার',
          phone: '01700000000',
          address: 'ডেমো ঠিকানা',
          city: 'ঢাকা',
          area: 'ধানমন্ডি'
        },
        shippingMethod: {
          id: 'standard',
          name: 'স্ট্যান্ডার্ড ডেলিভারি',
          cost: 60,
          estimatedDays: '৩-৫ দিন'
        },
        paymentMethod: 'bkash',
        subtotal: 0,
        shippingCost: 60,
        marginTotal: 0,
        total: 60,
        isReseller: false,
        createdAt: new Date().toISOString()
      });
    }
  }, [location.state]);

  const copyOrderId = () => {
    if (orderData?.orderId) {
      navigator.clipboard.writeText(orderData.orderId);
      toast({
        title: "কপি করা হয়েছে",
        description: "অর্ডার আইডি ক্লিপবোর্ডে কপি করা হয়েছে"
      });
    }
  };

  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodName = (id: string): string => {
    const methods: Record<string, string> = {
      bkash: 'বিকাশ',
      nagad: 'নগদ',
      rocket: 'রকেট',
      bank: 'ব্যাংক ট্রান্সফার',
      cod: 'ক্যাশ অন ডেলিভারি'
    };
    return methods[id] || id;
  };

  if (!orderData) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8 text-center">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">অর্ডার তথ্য পাওয়া যায়নি</h2>
        <Button onClick={() => navigate('/')}>হোমে ফিরুন</Button>
      </div>
    );
  }

  const trackingSteps = [
    { id: 1, label: 'অর্ডার নিশ্চিত', icon: CheckCircle2, completed: true },
    { id: 2, label: 'প্রক্রিয়াধীন', icon: Package, completed: false },
    { id: 3, label: 'শিপিং', icon: Truck, completed: false },
    { id: 4, label: 'ডেলিভারি', icon: MapPin, completed: false }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Success Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
            অর্ডার সফলভাবে সম্পন্ন হয়েছে!
          </h1>
          <p className="text-muted-foreground mb-4">
            আপনার অর্ডার নিশ্চিত করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </p>
          
          <div className="inline-flex items-center gap-2 bg-background rounded-lg px-4 py-2 border">
            <Receipt className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono font-bold">{orderData.orderId}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyOrderId}>
              <Copy className="h-3 w-3" />
            </Button>
          </div>

          {orderData.isReseller && (
            <div className="mt-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg p-3 inline-block">
              <Badge className="bg-amber-500">রিসেলার অর্ডার</Badge>
              <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                ৩-৫ কার্যদিবসের মধ্যে আপনার ড্যাশবোর্ড ব্যালেন্স আপডেট হবে।
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            অর্ডার ট্র্যাকিং
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Progress value={trackingProgress} className="h-2" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {trackingSteps.map((step) => (
              <div key={step.id} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  step.completed 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs ${step.completed ? 'font-medium' : 'text-muted-foreground'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>আনুমানিক ডেলিভারি: {orderData.shippingMethod.estimatedDays}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Delivery Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              ডেলিভারি ঠিকানা
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{orderData.deliveryAddress.fullName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{orderData.deliveryAddress.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>
                {orderData.deliveryAddress.address}, {orderData.deliveryAddress.area}, {orderData.deliveryAddress.city}
                {orderData.deliveryAddress.postalCode && ` - ${orderData.deliveryAddress.postalCode}`}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment & Shipping Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4" />
              পেমেন্ট ও শিপিং
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">পেমেন্ট মেথড</span>
              <span className="font-medium">{getPaymentMethodName(orderData.paymentMethod)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">শিপিং মেথড</span>
              <span className="font-medium">{orderData.shippingMethod.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">অর্ডারের তারিখ</span>
              <span className="font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(orderData.createdAt)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      {orderData.items.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              অর্ডার আইটেম ({orderData.items.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.price} × {item.quantity}
                    </p>
                    {item.isResell && item.margin && item.margin > 0 && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        মার্জিন: +{formatPrice(item.margin * item.quantity)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>অর্ডার সামারি</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">সাবটোটাল</span>
            <span>{formatPrice(orderData.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">শিপিং ({orderData.shippingMethod.name})</span>
            <span>{orderData.shippingCost === 0 ? 'বিনামূল্যে' : formatPrice(orderData.shippingCost)}</span>
          </div>
          {orderData.marginTotal > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>রিসেলার মার্জিন</span>
              <span>+{formatPrice(orderData.marginTotal)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>সর্বমোট</span>
            <span className="text-primary">{formatPrice(orderData.total)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => navigate('/')}
        >
          <Home className="h-4 w-4 mr-2" />
          হোমে ফিরুন
        </Button>
        <Button 
          className="flex-1"
          onClick={() => navigate('/marketplace-hub')}
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          আরো শপিং করুন
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
