
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ShoppingBag, Wrench, MessageSquare, ChevronRight } from 'lucide-react';

interface AlertNotificationsProps {
  alertsCount: {
    lowStock: number;
    pendingOrders: number;
    maintenanceRequests: number;
    newMessages: number;
  };
}

const AlertNotifications = ({ alertsCount }: AlertNotificationsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium">লো স্টক আইটেম</p>
              <p className="text-xl font-bold">{alertsCount.lowStock}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">পেন্ডিং অর্ডার</p>
              <p className="text-xl font-bold">{alertsCount.pendingOrders}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-violet-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-violet-100 flex items-center justify-center">
              <Wrench className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm font-medium">মেইনটেনেন্স রিকোয়েস্ট</p>
              <p className="text-xl font-bold">{alertsCount.maintenanceRequests}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">নতুন মেসেজ</p>
              <p className="text-xl font-bold">{alertsCount.newMessages}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertNotifications;
