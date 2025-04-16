
import React from 'react';
import { 
  Package, 
  Edit,
  Trash,
  Plus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProductManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>পণ্য ব্যবস্থাপনা</span>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            নতুন পণ্য
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Product list will be implemented here */}
          <div className="text-center text-muted-foreground">
            পণ্য তালিকা শীঘ্রই আসছে
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductManagement;
