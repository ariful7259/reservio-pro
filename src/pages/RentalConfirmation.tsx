
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CalendarRange, MapPin, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { bn } from 'date-fns/locale';
import QRCode from 'react-qr-code';

const RentalConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};
  
  if (!booking) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <h2 className="text-2xl font-bold">তথ্য পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">বুকিং সম্পর্কিত তথ্য পাওয়া যায়নি।</p>
          <Button onClick={() => navigate('/rentals')}>রেন্টাল পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  const { rental, startDate, endDate, paymentMethod, totalAmount, deposit, serviceFee } = booking;
  
  // রেন্ডম বুকিং আইডি তৈরি
  const bookingId = `BK${Math.floor(100000 + Math.random() * 900000)}`;
  
  const getPaymentMethodName = () => {
    switch(paymentMethod) {
      case 'bkash': return 'বিকাশ';
      case 'nagad': return 'নগদ';
      case 'card': return 'ডেবিট/ক্রেডিট কার্ড';
      case 'bank': return 'ব্যাংক ট্রান্সফার';
      case 'cash': return 'ক্যাশ অন ডেলিভারি';
      default: return paymentMethod;
    }
  };

  return (
    <div className="container pt-20 pb-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">বুকিং সফল হয়েছে!</h1>
          <p className="text-muted-foreground">আপনার রেন্টাল বুকিং সফলভাবে সম্পন্ন হয়েছে</p>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="flex justify-between items-center">
              <span>বুকিং সংক্ষেপ</span>
              <span className="text-sm">বুকিং আইডি: {bookingId}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-square rounded-md overflow-hidden">
                  <img 
                    src={rental.images?.[0]} 
                    alt={rental.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-xl font-bold mb-1">{rental.title}</h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{rental.location}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">সময়কাল</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <CalendarRange className="h-4 w-4" />
                      <span>
                        {format(new Date(startDate), 'PPP', { locale: bn })} - 
                        {format(new Date(endDate), 'PPP', { locale: bn })}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">পেমেন্ট পদ্ধতি</h3>
                    <p className="text-muted-foreground">{getPaymentMethodName()}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">মূল্য বিবরণী</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">মূল ভাড়া</span>
                      <span>৳{(totalAmount - serviceFee).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">সার্ভিস ফি</span>
                      <span>৳{serviceFee.toLocaleString()}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>মোট মূল্য</span>
                      <span>৳{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>জামানত (রিফান্ডেবল)</span>
                      <span>৳{deposit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>বুকিং ভিউ কোড</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="bg-white p-4 rounded-md">
              <QRCode value={bookingId} size={150} />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              এই QR কোডটি আপনার বুকিং নিশ্চিতকরণের সময় স্ক্যান করুন
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>পরবর্তী ধাপসমূহ</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</div>
                <div>
                  <h3 className="font-medium">বুকিং কনফার্মেশন</h3>
                  <p className="text-muted-foreground text-sm">আমরা আপনার বুকিং যাচাই করে আপনাকে একটি ইমেইল পাঠাবো</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</div>
                <div>
                  <h3 className="font-medium">মালিকের সাথে যোগাযোগ</h3>
                  <p className="text-muted-foreground text-sm">মালিক আপনার সাথে যোগাযোগ করে বিস্তারিত আলোচনা করবেন</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">3</div>
                <div>
                  <h3 className="font-medium">রেন্টাল হস্তান্তর</h3>
                  <p className="text-muted-foreground text-sm">নির্ধারিত সময়ে রেন্টাল আইটেম হস্তান্তর করা হবে</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-3 justify-center bg-gray-50 p-6">
            <Button onClick={() => navigate('/')}>হোম পেজে যান</Button>
            <Button variant="outline" onClick={() => navigate('/rentals')}>আরো রেন্টাল দেখুন</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RentalConfirmation;
