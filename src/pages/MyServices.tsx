
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MyServices = () => {
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-6">আমার সার্ভিস</h1>
      
      <div className="text-center py-10">
        <p className="text-muted-foreground">আপনি এখনো কোন সার্ভিস গ্রহণ করেননি</p>
      </div>
    </div>
  );
};

export default MyServices;
