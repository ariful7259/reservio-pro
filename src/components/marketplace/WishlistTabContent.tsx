
import React from "react";
import WishlistComponent from "@/components/product/WishlistComponent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const WishlistTabContent: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => (
  <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
    <div className="lg:col-span-5">
      <WishlistComponent />
    </div>
    <div className="lg:col-span-2">
      <Card className="p-3 sm:p-4">
        <h3 className="font-medium mb-3 text-sm sm:text-base">সিমিলার প্রোডাক্টস</h3>
        <div className="text-xs sm:text-sm text-muted-foreground text-center py-4">
          আপনার উইশলিস্টের সাথে মিল আছে এমন প্রোডাক্ট এখানে দেখানো হবে
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-2 text-xs sm:text-sm"
          onClick={() => onTabChange('browse')}
        >
          আরও প্রোডাক্ট দেখুন
        </Button>
      </Card>
    </div>
  </div>
);

export default WishlistTabContent;
