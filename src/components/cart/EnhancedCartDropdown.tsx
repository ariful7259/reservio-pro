import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useEnhancedWishlist } from '@/hooks/useEnhancedWishlist';
import { WishlistCounter } from '@/components/wishlist/WishlistCounter';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/utils/currencyUtils';

export const EnhancedCartDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    cart, 
    removeFromCart,
    updateCartItemQuantity, 
    getCartTotal, 
    getCartItemsCount 
  } = useShoppingState();
  
  const { addToWishlist, isInWishlist, wishlistCount } = useEnhancedWishlist();

  const cartItemsCount = getCartItemsCount();
  const cartTotal = getCartTotal();

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

  const handleMoveToWishlist = async (item: any) => {
    await addToWishlist({
      product_id: item.id,
      item_type: 'product',
      metadata: {
        title: item.title,
        price: item.price,
        image: item.image
      }
    });
    handleRemoveFromCart(item.id, item.title);
    toast({
      title: "Moved to Wishlist",
      description: `${item.title} moved to your wishlist`,
    });
  };

  const handleCheckout = () => {
    navigate('/marketplace-hub', { state: { activeTab: 'cart' } });
  };

  const parsePrice = (priceStr: string): number => {
    const cleanedStr = priceStr.replace(/[^\d.]/g, '');
    return parseFloat(cleanedStr) || 0;
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
      <PopoverContent className="w-80 mr-4" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">আপনার কার্ট</h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{cartItemsCount} টি আইটেম</Badge>
              <WishlistCounter 
                onClick={() => navigate('/marketplace-hub', { state: { activeTab: 'wishlist' } })}
              />
            </div>
          </div>
          
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
        </div>
      </PopoverContent>
    </Popover>
  );
};