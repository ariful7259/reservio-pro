
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, Heart, ArrowRight, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { language } = useApp();
  const { toast } = useToast();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    saveForLater, 
    getSavedItems, 
    moveToCart, 
    clearCart,
    cartTotal,
    applyCoupon,
    activeCoupon,
    discountAmount
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');
  const [showSavedItems, setShowSavedItems] = useState(false);
  
  const savedItems = getSavedItems();
  
  const handleQuantityChange = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(id, newQuantity);
    }
  };
  
  const handleCouponApply = () => {
    if (!couponCode.trim()) {
      toast({
        title: language === 'bn' ? 'কুপন কোড লিখুন' : 'Enter coupon code',
        variant: 'destructive'
      });
      return;
    }
    
    const success = applyCoupon(couponCode.trim());
    
    if (success) {
      toast({
        title: language === 'bn' ? 'কুপন সফলভাবে প্রয়োগ করা হয়েছে!' : 'Coupon applied successfully!',
      });
    } else {
      toast({
        title: language === 'bn' ? 'অবৈধ কুপন কোড' : 'Invalid coupon code',
        variant: 'destructive'
      });
    }
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: language === 'bn' ? 'কার্ট খালি!' : 'Cart is empty!',
        variant: 'destructive'
      });
      return;
    }
    
    onClose();
    navigate('/checkout');
  };
  
  const finalTotal = cartTotal - discountAmount;
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart size={20} />
            {language === 'bn' ? 'আপনার কার্ট' : 'Your Cart'}
            {cartItems.length > 0 && (
              <Badge variant="secondary">{cartItems.length}</Badge>
            )}
          </SheetTitle>
          {cartItems.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                if (confirm(language === 'bn' ? 'আপনি কি কার্ট খালি করতে চান?' : 'Are you sure you want to clear the cart?')) {
                  clearCart();
                }
              }}
            >
              {language === 'bn' ? 'খালি করুন' : 'Clear'}
            </Button>
          )}
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <ShoppingCart size={48} className="text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {language === 'bn' ? 'আপনার কার্ট খালি!' : 'Your cart is empty!'}
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => {
                  onClose();
                  navigate('/shopping');
                }}
              >
                {language === 'bn' ? 'শপিং করুন' : 'Start Shopping'}
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 py-3">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image || 'https://via.placeholder.com/80'} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold">
                          ৳{item.discount ? 
                            (item.price - (item.price * item.discount / 100)).toFixed(0) : 
                            item.price.toFixed(0)}
                        </span>
                        {item.discount && (
                          <span className="text-xs text-muted-foreground line-through">
                            ৳{item.price.toFixed(0)}
                          </span>
                        )}
                      </div>
                      {/* Attributes if any */}
                      {item.attributes && Object.keys(item.attributes).length > 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          {Object.entries(item.attributes).map(([key, value]) => (
                            <span key={key}>
                              {key}: {value}{' '}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-muted-foreground hover:text-destructive" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-muted-foreground hover:text-primary" 
                          onClick={() => saveForLater(item.id)}
                        >
                          <Heart size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Coupon code input */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Ticket className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder={language === 'bn' ? 'কুপন কোড' : 'Coupon code'}
                    className="pl-8"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <Button onClick={handleCouponApply}>
                  {language === 'bn' ? 'প্রয়োগ করুন' : 'Apply'}
                </Button>
              </div>
              
              {activeCoupon && (
                <div className="bg-muted p-2 rounded-md mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium">{activeCoupon}</span>
                    <p className="text-xs text-muted-foreground">
                      {language === 'bn' ? 'প্রয়োগ করা হয়েছে' : 'Applied'}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      applyCoupon('');
                      setCouponCode('');
                    }}
                  >
                    {language === 'bn' ? 'সরান' : 'Remove'}
                  </Button>
                </div>
              )}
              
              {/* Cart summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}
                  </span>
                  <span>৳{cartTotal.toFixed(0)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>
                      {language === 'bn' ? 'ডিসকাউন্ট' : 'Discount'}
                    </span>
                    <span>-৳{discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {language === 'bn' ? 'শিপিং চার্জ' : 'Shipping'}
                  </span>
                  <span>
                    {language === 'bn' ? 'চেকআউটে নির্ধারণ করা হবে' : 'Calculated at checkout'}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>{language === 'bn' ? 'মোট' : 'Total'}</span>
                  <span>৳{finalTotal.toFixed(0)}</span>
                </div>
              </div>
            </>
          )}
          
          {/* Saved items section */}
          {savedItems.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="mt-4">
                <Button 
                  variant="ghost" 
                  className="flex w-full justify-between px-2 font-medium"
                  onClick={() => setShowSavedItems(!showSavedItems)}
                >
                  <span>
                    {language === 'bn' ? 'সংরক্ষিত আইটেম' : 'Saved for later'} ({savedItems.length})
                  </span>
                  <span>{showSavedItems ? '▲' : '▼'}</span>
                </Button>
                
                {showSavedItems && (
                  <div className="space-y-3 mt-3">
                    {savedItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 py-2 border-b">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image || 'https://via.placeholder.com/64'} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm line-clamp-2">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-semibold">
                              ৳{item.discount ? 
                                (item.price - (item.price * item.discount / 100)).toFixed(0) : 
                                item.price.toFixed(0)}
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="ml-auto"
                          onClick={() => moveToCart(item.id)}
                        >
                          {language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to cart'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        <SheetFooter className="pt-2">
          <Button 
            className="w-full gap-2" 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            {language === 'bn' ? 'চেকআউট করুন' : 'Proceed to Checkout'}
            <ArrowRight size={16} />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
