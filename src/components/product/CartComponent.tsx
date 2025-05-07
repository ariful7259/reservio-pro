
import React, { useState } from 'react';
import { Trash2, MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/components/ui/use-toast';

const CartComponent = () => {
  const { toast } = useToast();
  const { cart, removeFromCart } = useShoppingState();
  const [quantities, setQuantities] = useState<Record<string, number>>(
    Object.fromEntries(cart.map(item => [item.id, item.quantity]))
  );

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities(prev => {
      const newQuantity = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    
    toast({
      title: "কার্ট থেকে সরানো হয়েছে",
      description: "প্রোডাক্টটি কার্ট থেকে সফলভাবে সরানো হয়েছে।",
    });
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
      return acc + price * (quantities[item.id] || 1);
    }, 0);
  };

  const handleCheckout = () => {
    toast({
      title: "চেকআউট প্রক্রিয়া শুরু হয়েছে",
      description: "আপনার অর্ডার প্রক্রিয়াধীন। পেমেন্ট পেজে রিডাইরেক্ট করা হচ্ছে...",
    });
    
    // In a real app, you'd navigate to a checkout page or open a checkout modal
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">শপিং কার্ট</h2>
          <Badge variant="secondary">{cart.length} আইটেম</Badge>
        </div>
        
        <Separator className="mb-4" />
        
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-muted-foreground mb-2">আপনার কার্ট খালি</p>
            <p className="text-xs text-muted-foreground mb-4">কার্টে আইটেম যোগ করুন</p>
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg border">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-16 w-16 object-cover rounded-md" 
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
                    disabled={quantities[item.id] <= 1}
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span>{quantities[item.id] || 1}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
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
              <span>৳{calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ডেলিভারি</span>
              <span>৳0</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>মোট</span>
              <span>৳{calculateTotal().toLocaleString()}</span>
            </div>
          </div>
          
          <Button className="w-full" onClick={handleCheckout}>
            চেকআউট করুন
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CartComponent;
