
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const WishlistComponent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { wishlist, toggleWishlist, addToCart, isInWishlist, clearWishlist } = useShoppingState();

  const handleRemoveFromWishlist = (id: string, title: string) => {
    toggleWishlist({ id, title, price: '', image: '' });
    
    toast({
      title: "উইশলিস্ট থেকে সরানো হয়েছে",
      description: `${title} উইশলিস্ট থেকে সফলভাবে সরানো হয়েছে।`,
    });
  };

  const handleAddToCart = (item: { id: string; title: string; price: string; image?: string }) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image
    });
    
    toast({
      title: "কার্টে যোগ করা হয়েছে",
      description: `${item.title} কার্টে যোগ করা হয়েছে।`,
    });
  };
  
  const handleClearWishlist = () => {
    if (wishlist.length === 0) return;
    
    clearWishlist();
    toast({
      title: "উইশলিস্ট খালি করা হয়েছে",
      description: "আপনার উইশলিস্ট থেকে সব আইটেম সরানো হয়েছে।",
    });
  };
  
  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;
    
    wishlist.forEach(item => {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        image: item.image
      });
    });
    
    toast({
      title: "সব আইটেম কার্টে যোগ করা হয়েছে",
      description: `${wishlist.length}টি আইটেম কার্টে যোগ করা হয়েছে।`,
    });
  };
  
  const handleBrowseProducts = () => {
    navigate('/digital-products');
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">উইশলিস্ট</h2>
          <Badge variant="secondary">{wishlist.length} আইটেম</Badge>
        </div>
        
        <Separator className="mb-4" />
        
        {wishlist.length === 0 ? (
          <div className="text-center py-8 flex flex-col flex-1 items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Heart className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-muted-foreground mb-4">আপনার উইশলিস্ট খালি</p>
            <Button 
              variant="outline" 
              onClick={handleBrowseProducts}
            >
              প্রোডাক্ট দেখুন
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-4 pr-3">
              {wishlist.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 p-3 rounded-lg border hover:border-primary transition-colors"
                >
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-16 w-16 object-cover rounded-md cursor-pointer" 
                      onClick={() => navigate(`/digital-products/${item.id}`)}
                    />
                  )}
                  <div className="flex-1">
                    <h3 
                      className="font-medium cursor-pointer hover:text-primary"
                      onClick={() => navigate(`/digital-products/${item.id}`)}
                    >
                      {item.title}
                    </h3>
                    <p className="text-primary font-bold">{item.price}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleRemoveFromWishlist(item.id, item.title)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8" 
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => navigate(`/digital-products/${item.id}`)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      
      {wishlist.length > 0 && (
        <CardFooter className="px-6 pb-6 pt-0 flex-col">
          <Separator className="mb-4" />
          
          <div className="flex gap-2 w-full">
            <Button 
              onClick={handleAddAllToCart}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              সব কার্টে যোগ করুন
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearWishlist}
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              সব মুছুন
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default WishlistComponent;

// Missing icon componet import
import { Heart } from 'lucide-react';
