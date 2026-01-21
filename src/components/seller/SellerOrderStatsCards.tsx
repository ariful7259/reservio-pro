import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import type { SellerOrderStats } from "@/hooks/useSellerOrderStats";

type Props = {
  stats: SellerOrderStats;
  formatPrice: (price: number) => string;
};

const SellerOrderStatsCards: React.FC<Props> = ({ stats, formatPrice }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">মোট অর্ডার</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-primary/20" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">পেন্ডিং</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-200" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">সম্পন্ন</p>
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">মোট আয়</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(stats.revenue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary/20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOrderStatsCards;
