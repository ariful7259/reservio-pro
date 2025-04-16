
import React from 'react';
import { 
  ShoppingCart,
  Clock,
  Truck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderTracking = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>অর্ডার ট্র্যাকিং</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Order tracking interface will be implemented here */}
          <div className="text-center text-muted-foreground">
            অর্ডার ট্র্যাকিং শীঘ্রই আসছে
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
