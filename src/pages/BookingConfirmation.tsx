
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PaymentDemo from '@/components/store/PaymentDemo';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  return (
    <div className="container pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4 pl-0"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          ফিরে যান
        </Button>
        
        <Card className="mb-6">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl">বুকিং কনফার্ম করুন</CardTitle>
            <p className="text-muted-foreground">আইডি: {id}</p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <p className="text-center">
                আপনার বুকিং প্রসেস করার জন্য পেমেন্ট সম্পূর্ণ করুন।
              </p>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>সাবটোটাল</span>
                  <span>৳২,৫০০</span>
                </div>
                <div className="flex justify-between">
                  <span>সার্ভিস চার্জ</span>
                  <span>৳৯৯</span>
                </div>
                <div className="flex justify-between">
                  <span>ভ্যাট (১৫%)</span>
                  <span>৳৪০০</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>মোট</span>
                  <span>৳২,৯৯৯</span>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex-col">
            <PaymentDemo />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;
