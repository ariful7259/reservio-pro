import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Trash2, 
  MinusSquare, 
  PlusSquare,
  Loader2,
  CheckCircle2,
  CreditCard,
  Wallet,
  Building2,
  AlertCircle
} from 'lucide-react';
import DeliveryAddressForm, { DeliveryAddress } from './DeliveryAddressForm';
import ShippingMethodSelector, { getShippingMethodById } from './ShippingMethodSelector';
import MarginCalculator from './MarginCalculator';

const paymentMethods = [
  { id: 'bkash', name: 'বিকাশ', icon: <Wallet className="h-4 w-4" /> },
  { id: 'nagad', name: 'নগদ', icon: <Wallet className="h-4 w-4" /> },
  { id: 'rocket', name: 'রকেট', icon: <Wallet className="h-4 w-4" /> },
  { id: 'bank', name: 'ব্যাংক ট্রান্সফার', icon: <Building2 className="h-4 w-4" /> },
  { id: 'cod', name: 'ক্যাশ অন ডেলিভারি', icon: <CreditCard className="h-4 w-4" /> },
];

const ResellerCartCheckout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    getCartTotal, 
    getCartItemsCount,
    clearCart 
  } = useShoppingState();

  const [isReseller, setIsReseller] = useState(false);
  const [resellItems, setResellItems] = useState<Record<string, { isResell: boolean; margin: number }>>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    area: '',
    postalCode: ''
  });

  // Check if user is a reseller
  useEffect(() => {
    const checkResellerStatus = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_reseller, full_name, phone')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          if (data.is_reseller) {
            setIsReseller(true);
          }
          // Pre-fill delivery address with profile data
          if (data.full_name || data.phone) {
            setDeliveryAddress(prev => ({
              ...prev,
              fullName: data.full_name || prev.fullName,
              phone: data.phone || prev.phone
            }));
          }
        }
      } catch (error) {
        console.error('Error checking reseller status:', error);
      }
    };

    checkResellerStatus();
  }, [user?.id]);

  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    const cleanedStr = priceStr
      .replace(/[৳$€£₹]/g, '')
      .replace(/[,\s]/g, '')
      .replace(/[০-৯]/g, (match) => {
        const bengaliToEnglish: Record<string, string> = {'০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'};
        return bengaliToEnglish[match] || match;
      });
    return parseFloat(cleanedStr) || 0;
  };

  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  const handleToggleResell = (itemId: string, checked: boolean) => {
    setResellItems(prev => ({
      ...prev,
      [itemId]: { 
        ...prev[itemId],
        isResell: checked, 
        margin: prev[itemId]?.margin || 0 
      }
    }));
  };

  const handleMarginChange = (itemId: string, margin: number) => {
    setResellItems(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], isResell: true, margin: margin }
    }));
  };

  const calculateTotalMargin = (): number => {
    return cart.reduce((total, item) => {
      const resellInfo = resellItems[item.id];
      if (resellInfo?.isResell) {
        return total + (resellInfo.margin * item.quantity);
      }
      return total;
    }, 0);
  };

  const getShippingCost = (): number => {
    const method = getShippingMethodById(selectedShippingMethod, deliveryAddress.city);
    return method?.cost || 60;
  };

  const calculateFinalPrice = (): number => {
    return getCartTotal() + calculateTotalMargin() + getShippingCost();
  };

  const hasResellItems = (): boolean => {
    return cart.some(item => resellItems[item.id]?.isResell);
  };

  const isAddressValid = (): boolean => {
    return !!(
      deliveryAddress.fullName &&
      deliveryAddress.phone &&
      deliveryAddress.address &&
      deliveryAddress.city &&
      deliveryAddress.area
    );
  };

  const handleCheckout = async () => {
    if (!user?.id) {
      toast({
        title: "লগইন করুন",
        description: "অর্ডার করতে লগইন করতে হবে",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    if (!isAddressValid()) {
      toast({
        title: "ঠিকানা দিন",
        description: "ডেলিভারি ঠিকানার সব তথ্য পূরণ করুন",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "পেমেন্ট মেথড নির্বাচন করুন",
        description: "অর্ডার সম্পন্ন করতে পেমেন্ট মেথড নির্বাচন করুন",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const shippingMethod = getShippingMethodById(selectedShippingMethod, deliveryAddress.city);
      
      const orderData = cart.map(item => ({
        ...item,
        name: item.title,
        isResell: resellItems[item.id]?.isResell || false,
        margin: resellItems[item.id]?.margin || 0,
        finalPrice: parsePrice(item.price) * item.quantity + (resellItems[item.id]?.isResell ? (resellItems[item.id]?.margin || 0) * item.quantity : 0)
      }));

      let createdOrderId = '';

      if (hasResellItems()) {
        // Create reseller order
        const { data: insertedOrder, error } = await supabase
          .from('reseller_orders')
          .insert([{
            user_id: user.id,
            order_data: JSON.parse(JSON.stringify({
              items: orderData,
              deliveryAddress,
              shippingMethod: shippingMethod || { id: 'standard', name: 'স্ট্যান্ডার্ড ডেলিভারি', cost: 60 },
              subtotal: getCartTotal(),
              shippingCost: getShippingCost()
            })),
            payment_method: selectedPaymentMethod,
            margin_amount: calculateTotalMargin(),
            total_amount: getCartTotal() + getShippingCost(),
            final_price: calculateFinalPrice(),
            status: 'pending'
          }])
          .select()
          .single();

        if (error) throw error;
        createdOrderId = insertedOrder?.id || '';
      }

      // Also create regular orders for all items
      for (const item of cart) {
        const { data: regularOrder } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity,
            status: 'pending'
          })
          .select()
          .single();
        
        if (!createdOrderId && regularOrder) {
          createdOrderId = regularOrder.id;
        }
      }

      // Send email notification
      const { data: { session } } = await supabase.auth.getSession();
      const userEmail = user?.email || session?.user?.user_metadata?.email;
      const userName = deliveryAddress.fullName || session?.user?.user_metadata?.full_name || 'গ্রাহক';
      
      if (userEmail) {
        try {
          await supabase.functions.invoke('send-order-notification', {
            body: {
              orderId: createdOrderId,
              type: 'confirmation',
              customerEmail: userEmail,
              customerName: userName,
              orderDetails: {
                items: orderData.map(item => ({
                  name: item.title || item.name,
                  price: parsePrice(item.price),
                  quantity: item.quantity
                })),
                totalAmount: getCartTotal() + getShippingCost(),
                finalPrice: calculateFinalPrice(),
                deliveryAddress,
                trackingId: `TRK${createdOrderId.slice(0, 8).toUpperCase()}`
              }
            }
          });
        } catch (emailError) {
          console.log('Email notification skipped:', emailError);
        }
      }

      // Prepare confirmation data
      const confirmationData = {
        orderId: createdOrderId || `ORD-${Date.now().toString(36).toUpperCase()}`,
        items: orderData,
        deliveryAddress,
        shippingMethod: shippingMethod || {
          id: 'standard',
          name: 'স্ট্যান্ডার্ড ডেলিভারি',
          cost: 60,
          estimatedDays: '৩-৫ দিন'
        },
        paymentMethod: selectedPaymentMethod,
        subtotal: getCartTotal(),
        shippingCost: getShippingCost(),
        marginTotal: calculateTotalMargin(),
        total: calculateFinalPrice(),
        isReseller: hasResellItems(),
        createdAt: new Date().toISOString()
      };

      clearCart();

      toast({
        title: "অর্ডার সফল!",
        description: hasResellItems() 
          ? "আপনার রিসেল অর্ডার সম্পন্ন হয়েছে।"
          : "আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।"
      });

      // Navigate to order confirmation page
      navigate('/order-confirmation', { state: { orderData: confirmationData } });

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "সমস্যা হয়েছে",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">আপনার কার্ট খালি</h2>
          <p className="text-muted-foreground mb-4">কার্টে আইটেম যোগ করুন</p>
          <Button onClick={() => navigate('/marketplace-hub')}>
            শপিং করুন
          </Button>
        </CardContent>
      </Card>
    );
  }

  const shippingMethod = getShippingMethodById(selectedShippingMethod, deliveryAddress.city);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">চেকআউট</h1>
        {isReseller && (
          <Badge variant="secondary" className="text-sm">
            রিসেলার অ্যাকাউন্ট
          </Badge>
        )}
      </div>

      {/* Cart Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            কার্ট আইটেম ({getCartItemsCount()})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-4">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-primary font-bold">{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={item.quantity <= 1}
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                  >
                    <MinusSquare className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                  >
                    <PlusSquare className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Enhanced Margin Calculator for Resellers */}
              {isReseller && (
                <MarginCalculator
                  item={item}
                  resellInfo={resellItems[item.id] || { isResell: false, margin: 0 }}
                  onToggleResell={(checked) => handleToggleResell(item.id, checked)}
                  onMarginChange={(margin) => handleMarginChange(item.id, margin)}
                  parsePrice={parsePrice}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Delivery Address Form */}
      <DeliveryAddressForm
        address={deliveryAddress}
        onChange={setDeliveryAddress}
      />

      {/* Shipping Method Selector */}
      <ShippingMethodSelector
        selectedMethod={selectedShippingMethod}
        onSelect={setSelectedShippingMethod}
        city={deliveryAddress.city}
      />

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            পেমেন্ট মেথড
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {paymentMethods.map(method => (
              <Button
                key={method.id}
                variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                className="h-auto py-4 flex flex-col items-center gap-2"
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                {method.icon}
                <span>{method.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>অর্ডার সামারি</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">সাবটোটাল ({getCartItemsCount()} আইটেম)</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          
          {hasResellItems() && (
            <div className="flex justify-between text-green-600">
              <span>রিসেলার মার্জিন</span>
              <span>+{formatPrice(calculateTotalMargin())}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              শিপিং ({shippingMethod?.name || 'স্ট্যান্ডার্ড'})
            </span>
            <span>{formatPrice(getShippingCost())}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>সর্বমোট</span>
            <span className="text-primary">{formatPrice(calculateFinalPrice())}</span>
          </div>

          {hasResellItems() && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>রিসেলার নোট:</strong> অর্ডার সম্পন্ন হলে ৩-৫ কার্যদিবসের মধ্যে আপনার ড্যাশবোর্ড ব্যালেন্স আপডেট হবে।
              </p>
            </div>
          )}

          {!isAddressValid() && (
            <div className="flex items-center gap-2 text-sm text-amber-600">
              <AlertCircle className="h-4 w-4" />
              <span>ডেলিভারি ঠিকানা সম্পূর্ণ করুন</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleCheckout}
            disabled={isSubmitting || !selectedPaymentMethod || !isAddressValid()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                প্রক্রিয়াধীন...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                অর্ডার সম্পন্ন করুন ({formatPrice(calculateFinalPrice())})
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResellerCartCheckout;
