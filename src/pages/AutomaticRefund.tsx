
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AutomaticRefund: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6">
      {/* Back navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="gap-2"
          onClick={() => navigate('/payment/refund-management')}
        >
          <ArrowLeft className="h-4 w-4" />
          রিফান্ড ম্যানেজমেন্ট
        </Button>
      </div>
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">অটোমেটিক রিফান্ড</h1>
        <p className="text-muted-foreground mt-2">
          অটোমেটিক রিফান্ড সিস্টেম কনফিগার করুন এবং পরিচালনা করুন
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>অটোমেটিক রিফান্ড সিস্টেম</CardTitle>
          </CardHeader>
          <CardContent>
            <p>অটোমেটিক রিফান্ড সিস্টেম কনফিগারেশন এবং পরিচালনা করতে সম্পূর্ণ রিফান্ড ম্যানেজমেন্ট পেজে যান।</p>
            <Button
              className="mt-4"
              onClick={() => navigate('/payment/refund-management')}
            >
              রিফান্ড ম্যানেজমেন্টে যান
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutomaticRefund;
