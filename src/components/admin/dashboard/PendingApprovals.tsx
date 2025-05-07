
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { adminTheme } from '@/themes/adminTheme';
import { 
  ShoppingBag, 
  Truck, 
  Building, 
  BookOpen 
} from 'lucide-react';

interface PendingApprovalsProps {
  pendingItems: {
    products: number;
    services: number;
    rentalListings: number;
    contentCreators: number;
  };
}

const PendingApprovals: React.FC<PendingApprovalsProps> = ({ pendingItems }) => {
  return (
    <Card className="overflow-hidden shadow-md border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">অনুমোদন প্রয়োজন</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-md">
            <div className="flex items-center">
              <ShoppingBag className="h-5 w-5 text-blue-600 mr-2" />
              <span>প্রোডাক্ট</span>
            </div>
            <div>
              <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                {pendingItems.products}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-md">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-purple-600 mr-2" />
              <span>সার্ভিস</span>
            </div>
            <div>
              <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                {pendingItems.services}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-md">
            <div className="flex items-center">
              <Building className="h-5 w-5 text-green-600 mr-2" />
              <span>রেন্টাল</span>
            </div>
            <div>
              <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                {pendingItems.rentalListings}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-amber-50 rounded-md">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-amber-600 mr-2" />
              <span>কন্টেন্ট ক্রিয়েটর</span>
            </div>
            <div>
              <span className="bg-amber-200 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                {pendingItems.contentCreators}
              </span>
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full mt-4"
          style={{ 
            backgroundImage: adminTheme.gradients.primary,
            boxShadow: adminTheme.shadows.sm
          }}
        >
          সবগুলো দেখুন
        </Button>
      </CardContent>
    </Card>
  );
};

export default PendingApprovals;
