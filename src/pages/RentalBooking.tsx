
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CreditCard, Wallet2, Landmark } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';
import { bn } from 'date-fns/locale';

const RentalBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // লোকেশন থেকে রেন্টাল ডেটা পাওয়া
  const { rental } = location.state || {};
  
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 30));
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  
  if (!rental) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <h2 className="text-2xl font-bold">তথ্য পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">রেন্টাল সম্পর্কিত তথ্য পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।</p>
          <Button onClick={() => navigate('/rentals')}>রেন্টাল পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  // মাসিক ভাড়ার ক্ষেত্রে সংখ্যা বের করা
  const extractPrice = () => {
    const priceString = rental.price;
    const priceMatch = priceString.match(/৳([0-9,]+)/);
    if (priceMatch && priceMatch[1]) {
      return parseInt(priceMatch[1].replace(/,/g, ''), 10);
    }
    return 25000; // ডিফল্ট মূল্য
  };

  const basePrice = extractPrice();
  const deposit = parseInt((rental.rentDeposit || '৳50,000').replace(/৳|,/g, ''), 10) || 50000;
  const serviceFee = basePrice * 0.05; // ৫% সার্ভিস ফি
  const totalPrice = basePrice + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast({
        title: "ফোন নম্বর প্রয়োজন",
        description: "অনুগ্রহ করে আপনার ফোন নম্বর প্রদান করুন।",
        variant: "destructive"
      });
      return;
    }
    
    if (paymentMethod !== "cash" && !transactionId) {
      toast({
        title: "ট্রানজেকশন আইডি প্রয়োজন",
        description: "অনুগ্রহ করে ট্রানজেকশন আইডি প্রদান করুন।",
        variant: "destructive"
      });
      return;
    }
    
    // বুকিং ডেটা প্রেরণ
    const bookingData = {
      rentalId: id,
      rental: rental,
      startDate: startDate,
      endDate: endDate,
      paymentMethod: paymentMethod,
      phone: phone,
      transactionId: transactionId,
      specialRequirements: specialRequirements,
      totalAmount: totalPrice,
      deposit: deposit,
      serviceFee: serviceFee
    };
    
    // সাধারণত এখানে API কল হবে বুকিং সেভ করার জন্য
    // এখন আমরা শুধু কনফার্মেশন পেজে রিডিরেক্ট করবো
    toast({
      title: "বুকিং প্রক্রিয়াধীন",
      description: "আপনার বুকিং প্রক্রিয়া করা হচ্ছে...",
    });
    
    // কনফার্মেশন পেজে নেভিগেট করা
    navigate('/rental-confirmation', {
      state: { booking: bookingData }
    });
  };

  return (
    <div className="container pt-20 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-1" /> পিছনে যান
        </Button>
        <h1 className="text-2xl font-bold">রেন্টাল বুকিং</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>বুকিং তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">সময়কাল নির্বাচন করুন</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 block">শুরুর তারিখ</Label>
                      <div className="border rounded-md">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => date && setStartDate(date)}
                          disabled={(date) => date < new Date()}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="mb-2 block">শেষের তারিখ</Label>
                      <div className="border rounded-md">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => date && setEndDate(date)}
                          disabled={(date) => date <= startDate}
                          className="rounded-md border"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-muted-foreground text-sm">
                    <Clock className="h-4 w-4" />
                    <span>বর্তমানে নির্বাচিত: {format(startDate, 'PPP', { locale: bn })} থেকে {format(endDate, 'PPP', { locale: bn })}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">যোগাযোগের তথ্য</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="phone">ফোন নম্বর</Label>
                      <Input 
                        id="phone" 
                        placeholder="01XXXXXXXXX" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="special-req">বিশেষ চাহিদা (ঐচ্ছিক)</Label>
                      <Textarea 
                        id="special-req" 
                        placeholder="যদি কোন বিশেষ চাহিদা থাকে, তাহলে এখানে লিখুন"
                        value={specialRequirements}
                        onChange={(e) => setSpecialRequirements(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">পেমেন্ট পদ্ধতি</h3>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Label htmlFor="bkash" className="flex-1 flex items-center">
                        <Wallet2 className="h-5 w-5 mr-2 text-pink-500" />
                        বিকাশ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="nagad" id="nagad" />
                      <Label htmlFor="nagad" className="flex-1 flex items-center">
                        <Wallet2 className="h-5 w-5 mr-2 text-orange-500" />
                        নগদ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-500" />
                        ডেবিট/ক্রেডিট কার্ড
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-1 flex items-center">
                        <Landmark className="h-5 w-5 mr-2 text-green-500" />
                        ব্যাংক ট্রান্সফার
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1">ক্যাশ অন ডেলিভারি</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod !== "cash" && (
                    <div className="mt-4">
                      <Label htmlFor="transaction">ট্রানজেকশন আইডি</Label>
                      <Input 
                        id="transaction" 
                        placeholder="ট্রানজেকশন আইডি দিন" 
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {paymentMethod === "bkash" && "01712345678 এই নম্বরে সেন্ড মানি করুন (মার্চেন্ট)"}
                        {paymentMethod === "nagad" && "01712345678 এই নম্বরে সেন্ড মানি করুন (মার্চেন্ট)"}
                        {paymentMethod === "bank" && "ABC Bank: 1234567890, Branch: Main Branch"}
                        {paymentMethod === "card" && "পরবর্তী ধাপে কার্ড তথ্য দিন"}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="pt-6 flex justify-end">
                  <Button type="submit" className="w-full md:w-auto">বুকিং নিশ্চিত করুন</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>বুকিং সংক্ষেপ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 rounded-md overflow-hidden">
                  <img 
                    src={rental.images?.[0]} 
                    alt={rental.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{rental.title}</h3>
                  <p className="text-sm text-muted-foreground">{rental.location}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>মূল ভাড়া</span>
                  <span>৳{basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>সার্ভিস ফি</span>
                  <span>৳{serviceFee.toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>মোট মূল্য</span>
                  <span>৳{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>জামানত (রিফান্ডেবল)</span>
                  <span>৳{deposit.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <p className="text-xs text-muted-foreground">
                "বুকিং নিশ্চিত করুন" ক্লিক করে আপনি আমাদের সকল নিয়ম ও শর্তাবলী মেনে নিচ্ছেন।
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentalBooking;
