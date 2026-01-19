import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  ShoppingCart, 
  Trash2, 
  MinusSquare, 
  PlusSquare,
  Loader2,
  CheckCircle2,
  Package,
  CreditCard,
  Wallet,
  Building2,
  Percent
} from 'lucide-react';

interface CartItemWithResell {
  id: string;
  title: string;
  price: string;
  quantity: number;
  image?: string;
  isResell?: boolean;
  margin?: number;
}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Check if user is a reseller
  useEffect(() => {
    const checkResellerStatus = async () => {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('is_reseller')
          .eq('id', user.id)
          .single();

        if (!error && data?.is_reseller) {
          setIsReseller(true);
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

  const handleMarginChange = (itemId: string, margin: string) => {
    const marginValue = parseFloat(margin) || 0;
    setResellItems(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], margin: marginValue }
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

  const calculateFinalPrice = (): number => {
    return getCartTotal() + calculateTotalMargin();
  };

  const hasResellItems = (): boolean => {
    return cart.some(item => resellItems[item.id]?.isResell);
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
      const orderData = cart.map(item => ({
        ...item,
        isResell: resellItems[item.id]?.isResell || false,
        margin: resellItems[item.id]?.margin || 0,
        finalPrice: parsePrice(item.price) * item.quantity + (resellItems[item.id]?.isResell ? (resellItems[item.id]?.margin || 0) * item.quantity : 0)
      }));

      if (hasResellItems()) {
        // Create reseller order
        const { error } = await supabase
          .from('reseller_orders')
          .insert({
            user_id: user.id,
            order_data: orderData,
            payment_method: selectedPaymentMethod,
            margin_amount: calculateTotalMargin(),
            total_amount: getCartTotal(),
            final_price: calculateFinalPrice(),
            status: 'pending'
          });

        if (error) throw error;
      }

      // Also create regular orders for all items
      for (const item of cart) {
        await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity,
            status: 'pending'
          });
      }

      setOrderComplete(true);
      clearCart();

      toast({
        title: "অর্ডার সফল!",
        description: hasResellItems() 
          ? "আপনার রিসেল অর্ডার সম্পন্ন হয়েছে। ৩-৫ দিনের মধ্যে ব্যালেন্স আপডেট হবে।"
          : "আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।"
      });

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

  if (orderComplete) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">অর্ডার সফল!</h2>
          <p className="text-muted-foreground mb-4">
            আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।
          </p>
          {hasResellItems() && (
            <div className="bg-primary/10 rounded-lg p-4 mb-4">
              <Badge className="mb-2">রিসেলার অর্ডার</Badge>
              <p className="text-sm">
                ৩-৫ কার্যদিবসের মধ্যে আপনার ড্যাশবোর্ডে ব্যালেন্স আপডেট হবে।
              </p>
            </div>
          )}
          <Button onClick={() => navigate('/')}>
            হোমে ফিরুন
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (cart.length === 0) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">আপনার কার্ট খালি</h2>
          <p className="text-muted-foreground mb-4">কার্টে আইটেম যোগ করুন</p>
          <Button onClick={() => navigate('/digital-products')}>
            শপিং করুন
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">চেকআউট</h1>

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

              {/* Reseller Option - Only show if user is reseller */}
              {isReseller && (
                <div className="bg-muted/50 rounded-lg p-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`resell-${item.id}`}
                      checked={resellItems[item.id]?.isResell || false}
                      onCheckedChange={(checked) => handleToggleResell(item.id, checked as boolean)}
                    />
                    <Label 
                      htmlFor={`resell-${item.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Percent className="h-4 w-4 text-primary" />
                      এটি রিসেল করবেন?
                    </Label>
                    {resellItems[item.id]?.isResell && (
                      <Badge variant="secondary" className="ml-auto">রিসেল</Badge>
                    )}
                  </div>

                  {resellItems[item.id]?.isResell && (
                    <div className="flex items-center gap-3">
                      <Label className="whitespace-nowrap">মার্জিন যোগ করুন:</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="0"
                        value={resellItems[item.id]?.margin || ''}
                        onChange={(e) => handleMarginChange(item.id, e.target.value)}
                        className="w-32"
                      />
                      <span className="text-sm text-muted-foreground">৳</span>
                      {resellItems[item.id]?.margin > 0 && (
                        <span className="text-sm text-green-600 font-medium">
                          +{formatPrice(resellItems[item.id].margin * item.quantity)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

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
            <span className="text-muted-foreground">সাবটোটাল</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          
          {hasResellItems() && (
            <div className="flex justify-between text-green-600">
              <span>মার্জিন</span>
              <span>+{formatPrice(calculateTotalMargin())}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">ডেলিভারি</span>
            <span className="text-green-600">বিনামূল্যে</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>মোট</span>
            <span className="text-primary">{formatPrice(calculateFinalPrice())}</span>
          </div>

          {hasResellItems() && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm">
              <p className="text-amber-800 dark:text-amber-200">
                <strong>রিসেলার নোট:</strong> অর্ডার সম্পন্ন হলে ৩-৫ কার্যদিবসের মধ্যে আপনার ড্যাশবোর্ড ব্যালেন্স আপডেট হবে।
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleCheckout}
            disabled={isSubmitting || !selectedPaymentMethod}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                প্রক্রিয়াধীন...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                অর্ডার সম্পন্ন করুন
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResellerCartCheckout;
