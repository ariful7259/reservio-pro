
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const MyServices = () => {
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">আমার সার্ভিস</h1>
      
      <div className="text-center py-10 flex flex-col items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">আপনি এখনো কোন সার্ভিস গ্রহণ করেননি</p>
        <Button>সার্ভিস খুঁজুন</Button>
      </div>
    </div>
  );
};

export default MyServices;
