
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, MinusCircle, PlusCircle, ShoppingCart, PlusSquare, MinusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/components/ui/use-toast';

const CartComponent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    getCartTotal, 
    getCartItemsCount,
    clearCart 
  } = useShoppingState();

  const handleQuantityChange = (id: string, delta: number, currentQuantity: number) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    updateCartItemQuantity(id, newQuantity);
  };

  const handleRemoveFromCart = (id: string, title: string) => {
    removeFromCart(id);
    
    toast({
      title: "কার্ট থেকে সরানো হয়েছে",
      description: `${title} কার্ট থেকে সফলভাবে সরানো হয়েছে।`,
    });
  };

  const handleCheckout = () => {
    toast({
      title: "চেকআউট প্রক্রিয়া শুরু হয়েছে",
      description: "আপনার অর্ডার প্রক্রিয়াধীন। পেমেন্ট পেজে রিডাইরেক্ট করা হচ্ছে...",
    });
    
    // In a real app, you'd navigate to a checkout page
    // navigate('/checkout');
  };
  
  const handleClearCart = () => {
    if (cart.length === 0) return;
    
    clearCart();
    toast({
      title: "কার্ট খালি করা হয়েছে",
      description: "আপনার কার্ট থেকে সব আইটেম সরানো হয়েছে।",
    });
  };
  
  const handleContinueShopping = () => {
    navigate('/digital-products');
  };

  const formatPrice = (price: number): string => {
    return `৳${price.toLocaleString()}`;
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">শপিং কার্ট</h2>
          <Badge variant="secondary">{getCartItemsCount()} আইটেম</Badge>
        </div>
        
        <Separator className="mb-4" />
        
        {cart.length === 0 ? (
          <div className="text-center py-8 flex flex-col items-center flex-1 justify-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">আপনার কার্ট খালি</p>
            <p className="text-xs text-muted-foreground mb-4">কার্টে আইটেম যোগ করুন</p>
            <Button 
              variant="outline" 
              onClick={handleContinueShopping}
              className="mt-2"
            >
              শপিং করুন
            </Button>
          </div>
        ) : (
          <div className="space-y-4 mb-4 flex-1 overflow-auto">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-16 w-16 object-cover rounded-md" 
                    onClick={() => navigate(`/digital-products/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <div className="flex-1">
                  <h3 
                    className="font-medium hover:text-primary cursor-pointer"
                    onClick={() => navigate(`/digital-products/${item.id}`)}
                  >
                    {item.title}
                  </h3>
                  <p className="text-primary font-bold">{item.price}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      disabled={item.quantity <= 1}
                      onClick={() => handleQuantityChange(item.id, -1, item.quantity)}
                    >
                      <MinusSquare className="h-4 w-4" />
                    </Button>
                    <span className="text-sm px-2 min-w-[30px] text-center">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleQuantityChange(item.id, 1, item.quantity)}
                    >
                      <PlusSquare className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFromCart(item.id, item.title)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      {cart.length > 0 && (
        <CardFooter className="px-6 pb-6 pt-0 flex-col">
          <Separator className="mb-4" />
          
          <div className="w-full space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">সাবটোটাল</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ডেলিভারি</span>
              <span className="text-emerald-600 font-medium">বিনামূল্যে</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>মোট</span>
              <span>{formatPrice(getCartTotal())}</span>
            </div>
          </div>
          
          <div className="flex flex-col w-full gap-2">
            <Button className="w-full" onClick={handleCheckout}>
              চেকআউট করুন
            </Button>
            <div className="flex gap-2 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleContinueShopping}
              >
                শপিং করুন
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 text-red-500 hover:text-red-700"
                onClick={handleClearCart}
              >
                কার্ট খালি করুন
              </Button>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CartComponent;
