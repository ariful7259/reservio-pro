
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Trash, 
  Save, 
  Plus, 
  Minus, 
  Check, 
  Tag, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useApp } from '@/context/AppContext';
import { Progress } from '@/components/ui/progress';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface SavedCart {
  id: string;
  name: string;
  items: CartItem[];
  createdAt: Date;
}

interface SavedCartSystemProps {
  onCheckout?: () => void;
}

const SavedCartSystem: React.FC<SavedCartSystemProps> = ({ onCheckout = () => {} }) => {
  const { language } = useApp();
  const [currentCart, setCurrentCart] = useState<CartItem[]>([
    {
      id: 'p1',
      name: language === 'bn' ? 'স্মার্ট ওয়াচ' : 'Smart Watch',
      price: 2499,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
      id: 'p2',
      name: language === 'bn' ? 'ওয়্যারলেস হেডফোন' : 'Wireless Headphones',
      price: 1899,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    }
  ]);
  
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([
    {
      id: 'sc1',
      name: language === 'bn' ? 'পছন্দের পণ্য' : 'Favorite Items',
      items: [
        {
          id: 'p3',
          name: language === 'bn' ? 'স্মার্টফোন' : 'Smartphone',
          price: 18999,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    }
  ]);
  
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [saveCartDialogOpen, setSaveCartDialogOpen] = useState<boolean>(false);
  const [newCartName, setNewCartName] = useState<string>('');
  const [viewSavedCart, setViewSavedCart] = useState<SavedCart | null>(null);
  
  const calculateSubtotal = () => {
    return currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const discount = promoApplied ? subtotal * 0.10 : 0;
  const shipping = 100;
  const total = subtotal - discount + shipping;
  
  const updateItemQuantity = (itemId: string, amount: number) => {
    setCurrentCart(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          const newQty = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };
  
  const removeItem = (itemId: string) => {
    setCurrentCart(prev => prev.filter(item => item.id !== itemId));
  };
  
  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'DISCOUNT10') {
      setPromoApplied(true);
      return true;
    }
    return false;
  };
  
  const saveCurrentCart = () => {
    if (newCartName.trim() && currentCart.length > 0) {
      const newSavedCart: SavedCart = {
        id: `sc${Date.now()}`,
        name: newCartName,
        items: [...currentCart],
        createdAt: new Date()
      };
      
      setSavedCarts(prev => [...prev, newSavedCart]);
      setSaveCartDialogOpen(false);
      setNewCartName('');
    }
  };
  
  const loadSavedCart = (cartId: string) => {
    const cartToLoad = savedCarts.find(cart => cart.id === cartId);
    if (cartToLoad) {
      setCurrentCart(cartToLoad.items);
      setViewSavedCart(null);
    }
  };
  
  const deleteSavedCart = (cartId: string) => {
    setSavedCarts(prev => prev.filter(cart => cart.id !== cartId));
    if (viewSavedCart?.id === cartId) {
      setViewSavedCart(null);
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };
  
  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Current Cart */}
        <div className="flex-1">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                {language === 'bn' ? 'আপনার কার্ট' : 'Your Cart'}
                <Badge className="ml-2" variant="secondary">
                  {currentCart.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              {currentCart.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {language === 'bn' ? 'আপনার কার্টে কোন আইটেম নেই' : 'Your cart is empty'}
                </div>
              ) : (
                <div className="space-y-4">
                  {currentCart.map(item => (
                    <div key={item.id} className="flex gap-4 py-2">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-primary font-bold mt-1">৳{item.price}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2 items-center">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateItemQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center">{item.quantity}</span>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateItemQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm"
                className="flex gap-1 items-center"
                onClick={() => setSaveCartDialogOpen(true)}
                disabled={currentCart.length === 0}
              >
                <Save className="h-4 w-4" />
                {language === 'bn' ? 'সেভ করুন' : 'Save Cart'}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                className="flex gap-1 items-center"
                onClick={() => setCurrentCart([])}
                disabled={currentCart.length === 0}
              >
                <Trash className="h-4 w-4" />
                {language === 'bn' ? 'কার্ট খালি করুন' : 'Empty Cart'}
              </Button>
            </CardFooter>
          </Card>
          
          {/* Saved Carts */}
          {savedCarts.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  {language === 'bn' ? 'সেভ করা কার্ট' : 'Saved Carts'}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {savedCarts.map(cart => (
                    <div 
                      key={cart.id} 
                      className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                      onClick={() => setViewSavedCart(cart)}
                    >
                      <div>
                        <h4 className="font-medium">{cart.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {language === 'bn' ? 'সংরক্ষিত' : 'Saved'}: {formatDate(cart.createdAt)} • 
                          {language === 'bn' ? ' আইটেম' : ' Items'}: {cart.items.length}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          loadSavedCart(cart.id);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="w-full md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'bn' ? 'অর্ডার সামারি' : 'Order Summary'}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}
                </span>
                <span>৳{subtotal}</span>
              </div>
              
              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>{language === 'bn' ? 'ডিসকাউন্ট (10%)' : 'Discount (10%)'}</span>
                  <span>-৳{discount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {language === 'bn' ? 'শিপিং' : 'Shipping'}
                </span>
                <span>৳{shipping}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>{language === 'bn' ? 'মোট' : 'Total'}</span>
                <span>৳{total}</span>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">
                  {language === 'bn' ? 'প্রোমো কোড' : 'Promo Code'}
                </h4>
                <div className="flex gap-2">
                  <Input 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder={language === 'bn' ? 'প্রোমো কোড লিখুন' : 'Enter promo code'}
                    disabled={promoApplied}
                  />
                  <Button 
                    onClick={applyPromoCode} 
                    variant={promoApplied ? "default" : "outline"}
                    disabled={promoApplied || !promoCode}
                  >
                    {promoApplied ? <Check className="h-4 w-4" /> : <Tag className="h-4 w-4" />}
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    {language === 'bn' ? 'প্রোমো কোড সফলভাবে যুক্ত হয়েছে!' : 'Promo code successfully applied!'}
                  </p>
                )}
              </div>
              
              <div className="pt-4">
                <Button className="w-full" onClick={onCheckout} disabled={currentCart.length === 0}>
                  {language === 'bn' ? 'চেকআউট করুন' : 'Proceed to Checkout'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Save Cart Dialog */}
      <Dialog open={saveCartDialogOpen} onOpenChange={setSaveCartDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {language === 'bn' ? 'কার্ট সংরক্ষণ করুন' : 'Save Your Cart'}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'আপনার কার্ট সংরক্ষণ করুন যাতে আপনি পরে এটি পুনরায় ব্যবহার করতে পারেন।' 
                : 'Save your cart so you can use it again later.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              value={newCartName}
              onChange={(e) => setNewCartName(e.target.value)}
              placeholder={language === 'bn' ? 'কার্টের নাম দিন' : 'Give your cart a name'}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveCartDialogOpen(false)}>
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </Button>
            <Button onClick={saveCurrentCart} disabled={!newCartName.trim() || currentCart.length === 0}>
              {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Saved Cart Dialog */}
      <Dialog open={!!viewSavedCart} onOpenChange={(open) => !open && setViewSavedCart(null)}>
        {viewSavedCart && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{viewSavedCart.name}</DialogTitle>
              <DialogDescription>
                {language === 'bn'
                  ? `সংরক্ষিত: ${formatDate(viewSavedCart.createdAt)}`
                  : `Saved on: ${formatDate(viewSavedCart.createdAt)}`
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 max-h-[300px] overflow-y-auto">
              {viewSavedCart.items.map(item => (
                <div key={item.id} className="flex gap-3 py-2 border-b last:border-0">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>৳{item.price}</span>
                      <span>✕ {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteSavedCart(viewSavedCart.id)}
              >
                <Trash className="h-4 w-4 mr-1" />
                {language === 'bn' ? 'মুছে ফেলুন' : 'Delete'}
              </Button>
              
              <Button onClick={() => loadSavedCart(viewSavedCart.id)}>
                <ShoppingCart className="h-4 w-4 mr-1" />
                {language === 'bn' ? 'কার্টে লোড করুন' : 'Load to Cart'}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default SavedCartSystem;
