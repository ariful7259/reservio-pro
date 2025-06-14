
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Plus } from "lucide-react";
import Wish2EarnBadge from "@/components/wish2earn/Wish2EarnBadge";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useShoppingState } from "@/hooks/useShoppingState";

interface MarketplaceHeaderProps {
  onTabChange: (tab: string) => void;
  wishlistCount: number;
  cartCount: number;
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({ onTabChange, wishlistCount, cartCount }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
      <div className="flex items-center gap-3">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight flex items-center gap-3">
          <span>ডিজিটাল প্রোডাক্টস মার্কেটপ্লেস</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size={isMobile ? "sm" : "icon"}
          className="relative"
          onClick={() => onTabChange('wishlist')}
        >
          <Heart className="h-4 w-4" />
          {!isMobile && wishlistCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]"
            >
              {wishlistCount}
            </Badge>
          )}
          {isMobile && <span className="ml-1 text-xs">{wishlistCount}</span>}
        </Button>
        <Button
          variant="outline"
          size={isMobile ? "sm" : "icon"}
          className="relative"
          onClick={() => onTabChange('cart')}
        >
          <ShoppingCart className="h-4 w-4" />
          {!isMobile && cartCount > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[10px]"
            >
              {cartCount}
            </Badge>
          )}
          {isMobile && <span className="ml-1 text-xs">{cartCount}</span>}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="gap-1"
          onClick={() => onTabChange('sell')}
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs sm:text-sm">
            {isMobile ? 'বিক্রি' : 'প্রোডাক্ট বিক্রি করুন'}
          </span>
        </Button>
        {/* Profile/Image section রিমুভড, তার পরিবর্তে Wish2Earn badge */}
        <div className="ml-2">
          <Wish2EarnBadge onClick={() => onTabChange('wish2earn')} />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;

