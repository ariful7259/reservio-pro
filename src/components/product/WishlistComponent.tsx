
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useShoppingState } from '@/hooks/useShoppingState';
import { useToast } from '@/components/ui/use-toast';

const WishlistComponent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { wishlist, toggleWishlist, addToCart } = useShoppingState();

  const handleRemoveFromWishlist = (id: string) => {
    toggleWishlist({ id, title: '', price: '', image: '' });
    
    toast({
      title: "উইশলিস্ট থেকে সরানো হয়েছে",
      description: "প্রোডাক্টটি উইশলিস্ট থেকে সফলভাবে সরানো হয়েছে।",
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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">উইশলিস্ট</h2>
          <Badge variant="secondary">{wishlist.length} আইটেম</Badge>
        </div>
        
        <Separator className="mb-4" />
        
        {wishlist.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">আপনার উইশলিস্ট খালি</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/digital-products')}
            >
              প্রোডাক্ট দেখুন
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlist.map(item => (
              <div 
                key={item.id} 
                className="flex items-center gap-4 p-3 rounded-lg border"
              >
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="h-16 w-16 object-cover rounded-md" 
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
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WishlistComponent;
