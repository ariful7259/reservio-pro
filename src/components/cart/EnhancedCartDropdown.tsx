import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/currencyUtils';

export const EnhancedCartDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("cart");
  
  const { 
    cart, 
    wishlist,
    addToCart,
    removeFromCart,
    updateCartItemQuantity, 
    getCartTotal, 
    getCartItemsCount,
    toggleWishlist,
    isInWishlist 
  } = useShoppingState();

  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();
  const wishlistCount = wishlist.length;

  const handleQuantityChange = (id: string, delta: number, currentQuantity: number) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    updateCartItemQuantity(id, newQuantity);
  };

  const handleRemoveFromCart = (id: string, title: string) => {
    removeFromCart(id);
    toast({
      title: "পণ্য সরানো হয়েছে",
      description: `${title} কার্ট থেকে সরানো হয়েছে`,
      variant: "destructive",
    });
  };

  const handleMoveToWishlist = (item: any) => {
    toggleWishlist({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image
    });
    handleRemoveFromCart(item.id, item.title);
    toast({
      title: "উইশলিস্টে সরানো হয়েছে",
      description: `${item.title} উইশলিস্টে সরানো হয়েছে`,
    });
  };

  const handleCheckout = () => {
    if (cartItemsCount === 0) {
      toast({
        title: "কার্ট খালি",
        description: "প্রথমে কিছু পণ্য কার্টে যোগ করুন",
        variant: "destructive",
      });
      return;
    }
    
    // পেমেন্ট গেটওয়েতে নিয়ে যান
    toast({
      title: "পেমেন্ট গেটওয়েতে নিয়ে যাওয়া হচ্ছে",
      description: `মোট ৳${cartTotal.toLocaleString()} টাকার পেমেন্ট করুন`,
    });
    
    // পেমেন্ট গেটওয়ে পেজে নিয়ে যান
    navigate('/payment-gateway', { 
      state: { 
        amount: cartTotal,
        items: cart,
        totalItems: cartItemsCount
      } 
    });
  };

  // Helper function to parse price strings correctly
  const parsePrice = (priceStr: string): number => {
    if (!priceStr) return 0;
    
    if (typeof priceStr === 'number') {
      return priceStr;
    }
    
    // Handle various price formats including Bengali digits
    let cleanPrice = priceStr
      // Convert Bengali digits to English
      .replace(/০/g, '0').replace(/১/g, '1').replace(/২/g, '2')
      .replace(/৩/g, '3').replace(/৪/g, '4').replace(/৫/g, '5')
      .replace(/৬/g, '6').replace(/৭/g, '7').replace(/৮/g, '8').replace(/৯/g, '9')
      // Remove all non-digit, non-decimal characters
      .replace(/[^\d.,]/g, '')
      // Handle comma as decimal separator
      .replace(/,/g, '.');
    
    // Extract the first valid number found
    const match = cleanPrice.match(/\d+\.?\d*/);
    if (match) {
      const price = parseFloat(match[0]);
      // Ensure we have a valid price greater than 0
      return price > 0 ? price : 100; // Default minimum price
    }
    
    return 100; // Default minimum price if no valid number found
  };

  const formatPrice = (price: number) => {
    return formatCurrency(price, 'BDT');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
          <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
          {cartItemsCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {cartItemsCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 mr-4" align="end">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cart" className="relative">
              <ShoppingCart className="h-4 w-4 mr-1" />
              কার্ট
              {cartItemsCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="relative">
              <Heart className="h-4 w-4 mr-1" />
              উইশলিস্ট
              {wishlistCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Cart Tab Content */}
          <TabsContent value="cart" className="space-y-4 mt-4">
            {cart.length === 0 ? (
              <div className="text-center py-6">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">আপনার কার্ট খালি</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => navigate('/marketplace-hub')}
                >
                  শপিং শুরু করুন
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <Card key={item.id} className="p-3">
                        <div className="flex items-start gap-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{formatPrice(parsePrice(item.price))}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleQuantityChange(item.id, -1, item.quantity)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm min-w-[20px] text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleQuantityChange(item.id, 1, item.quantity)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleMoveToWishlist(item)}
                                title="Move to Wishlist"
                              >
                                <Heart className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => handleRemoveFromCart(item.id, item.title)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between font-medium">
                    <span>মোট:</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/marketplace-hub', { state: { activeTab: 'cart' } })}
                    >
                      কার্ট দেখুন
                    </Button>
                    <Button
                      onClick={handleCheckout}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      কিনুন
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Wishlist Tab Content */}
          <TabsContent value="wishlist" className="space-y-4 mt-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-6">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">আপনার উইশলিস্ট খালি</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => navigate('/marketplace-hub')}
                >
                  শপিং শুরু করুন
                </Button>
              </div>
            ) : (
              <>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {wishlist.map((item) => (
                      <Card key={item.id} className="p-3">
                        <div className="flex items-start gap-3">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{formatPrice(parsePrice(item.price))}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Add to cart from wishlist
                                  addToCart({
                                    id: item.id,
                                    title: item.title,
                                    price: item.price,
                                    image: item.image,
                                  });
                                  toast({
                                    title: "কার্টে যোগ করা হয়েছে",
                                    description: `${item.title} কার্টে যোগ করা হয়েছে`,
                                  });
                                }}
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                কার্টে যোগ করুন
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => {
                                  toggleWishlist(item);
                                  toast({
                                    title: "উইশলিস্ট থেকে সরানো হয়েছে",
                                    description: `${item.title} উইশলিস্ট থেকে সরানো হয়েছে`,
                                    variant: "destructive",
                                  });
                                }}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
                
                <Separator />
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/marketplace-hub', { state: { activeTab: 'wishlist' } })}
                >
                  সব উইশলিস্ট দেখুন
                </Button>
              </>
            )}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};