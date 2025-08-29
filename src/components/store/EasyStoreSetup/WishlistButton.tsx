
import React from "react";
import { Heart } from "lucide-react";
import { useEnhancedWishlist } from "@/hooks/useEnhancedWishlist";
import { useToast } from "@/hooks/use-toast";

interface WishlistButtonProps {
  productId: string;
  productTitle?: string;
  productPrice?: string;
  productImage?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  productTitle = '',
  productPrice = '0',
  productImage = ''
}) => {
  const { toast } = useToast();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useEnhancedWishlist();
  const wished = isInWishlist(productId);

  const handleToggle = async () => {
    try {
      if (wished) {
        // Find the wishlist item to remove
        const wishlistItem = await removeFromWishlist(productId);
        toast({
          title: "উইশলিস্ট থেকে সরানো হয়েছে",
          description: `${productTitle} উইশলিস্ট থেকে সরানো হয়েছে`,
          variant: "destructive",
        });
      } else {
        await addToWishlist({
          product_id: productId,
          item_type: 'product',
          metadata: {
            title: productTitle,
            price: productPrice,
            image: productImage
          }
        });
        toast({
          title: "উইশলিস্টে যোগ করা হয়েছে",
          description: `${productTitle} উইশলিস্টে যোগ করা হয়েছে`,
        });
      }
    } catch (error) {
      toast({
        title: "সমস্যা হয়েছে",
        description: "অনুগ্রহ করে আবার চেষ্টা করুন",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      className={`p-1 rounded-full border ${wished ? "bg-pink-200 text-pink-600" : "bg-white text-gray-400"} transition hover:scale-105`}
      onClick={handleToggle}
      type="button"
    >
      <Heart fill={wished ? "#f472b6" : "none"} />
    </button>
  );
};
export default WishlistButton;
