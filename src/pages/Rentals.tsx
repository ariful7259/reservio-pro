
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

const Rentals = () => {
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">রেন্টাল</h1>
      
      <div className="text-center py-10 flex flex-col items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
          <Building className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">আপনি এখনো কোন রেন্টাল সার্ভিস গ্রহণ করেননি</p>
        <Button>রেন্টাল খুঁজুন</Button>
      </div>
    </div>
  );
};

export default Rentals;
