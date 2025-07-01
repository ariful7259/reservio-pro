
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Calendar as CalendarIcon, Clock, CreditCard, Wallet2, Landmark, MapPin, Users, Home } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { format, addDays } from 'date-fns';
import { bn } from 'date-fns/locale';

const ServiceBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { service } = location.state || {};
  
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1));
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  
  // Category specific states
  const [familyType, setFamilyType] = useState("family");
  const [peopleCount, setPeopleCount] = useState("");
  const [address, setAddress] = useState("");
  const [needDriver, setNeedDriver] = useState(false);
  const [fuelIncluded, setFuelIncluded] = useState(false);
  const [needSetup, setNeedSetup] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [pickupOption, setPickupOption] = useState("delivery");
  const [rentalDuration, setRentalDuration] = useState("monthly");
  const [businessType, setBusinessType] = useState("");
  const [needOperator, setNeedOperator] = useState(false);
  const [stayPurpose, setStayPurpose] = useState("");
  const [equipmentNeeded, setEquipmentNeeded] = useState(false);
  
  if (!service) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <h2 className="text-2xl font-bold">তথ্য পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">সেবা সম্পর্কিত তথ্য পাওয়া যায়নি। দয়া করে আবার চেষ্টা করুন।</p>
          <Button onClick={() => navigate('/services')}>সেবা পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  const extractPrice = () => {
    const priceString = service.price;
    const priceMatch = priceString.match(/৳([0-9,]+)/);
    if (priceMatch && priceMatch[1]) {
      return parseInt(priceMatch[1].replace(/,/g, ''), 10);
    }
    return 1000;
  };

  const basePrice = extractPrice();
  const serviceFee = basePrice * 0.05;
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
    
    const bookingData = {
      serviceId: id,
      service: service,
      startDate: startDate,
      endDate: endDate,
      paymentMethod: paymentMethod,
      phone: phone,
      transactionId: transactionId,
      specialRequirements: specialRequirements,
      totalAmount: totalPrice,
      serviceFee: serviceFee,
      // Category specific data
      familyType,
      peopleCount,
      address,
      needDriver,
      fuelIncluded,
      needSetup,
      quantity,
      pickupOption,
      rentalDuration,
      businessType,
      needOperator,
      stayPurpose,
      equipmentNeeded
    };
    
    toast({
      title: "বুকিং প্রক্রিয়াধীন",
      description: "আপনার বুকিং প্রক্রিয়া করা হচ্ছে...",
    });
    
    navigate('/service-confirmation', {
      state: { booking: bookingData }
    });
  };

  const renderCategorySpecificFields = () => {
    const category = service.category?.toLowerCase();
    
    if (category?.includes('বাসা') || category?.includes('house') || category?.includes('living')) {
      return (
        <>
          <div>
            <h3 className="text-lg font-medium mb-3">বাসা বাড়ি বুকিং তথ্য</h3>
            <div className="space-y-4">
              <div>
                <Label>পারিবারিক অবস্থা</Label>
                <RadioGroup value={familyType} onValueChange={setFamilyType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="family" id="family" />
                    <Label htmlFor="family">ফ্যামিলি</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bachelor" id="bachelor" />
                    <Label htmlFor="bachelor">ব্যাচেলর</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="people">কতজন থাকবে (ঐচ্ছিক)</Label>
                <Input 
                  id="people" 
                  type="number"
                  placeholder="যেমন: ৪"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="address">বিস্তারিত ঠিকানা</Label>
                <Textarea 
                  id="address" 
                  placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div>
                <Label>ভাড়ার মেয়াদ</Label>
                <Select value={rentalDuration} onValueChange={setRentalDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">মাসিক</SelectItem>
                    <SelectItem value="daily">দৈনিক</SelectItem>
                    <SelectItem value="hourly">ঘন্টায়</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </>
      );
    }
    
    if (category?.includes('transport') || category?.includes('গাড়ি') || category?.includes('পরিবহন')) {
      return (
        <>
          <div>
            <h3 className="text-lg font-medium mb-3">পরিবহন বুকিং তথ্য</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="driver" 
                  checked={needDriver}
                  onCheckedChange={setNeedDriver}
                />
                <Label htmlFor="driver">ড্রাইভার প্রয়োজন?</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fuel" 
                  checked={fuelIncluded}
                  onCheckedChange={setFuelIncluded}
                />
                <Label htmlFor="fuel">জ্বালানি অন্তর্ভুক্ত?</Label>
              </div>
              
              <div>
                <Label htmlFor="pickup-location">পিকআপ/ড্রপ লোকেশন</Label>
                <Input 
                  id="pickup-location" 
                  placeholder="পিকআপ ও ড্রপ অবস্থান"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
        </>
      );
    }
    
    if (category?.includes('event') || category?.includes('ইভেন্ট')) {
      return (
        <>
          <div>
            <h3 className="text-lg font-medium mb-3">ইভেন্ট সামগ্রী বুকিং</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">পরিমাণ</Label>
                <Input 
                  id="quantity" 
                  type="number"
                  placeholder="কয়টি প্রয়োজন"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="setup-location">সেটআপ লোকেশন</Label>
                <Input 
                  id="setup-location" 
                  placeholder="ইভেন্টের ঠিকানা"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="setup" 
                  checked={needSetup}
                  onCheckedChange={setNeedSetup}
                />
                <Label htmlFor="setup">সেটআপ সেবা প্রয়োজন?</Label>
              </div>
            </div>
          </div>
        </>
      );
    }
    
    return (
      <div>
        <h3 className="text-lg font-medium mb-3">সাধারণ বুকিং তথ্য</h3>
        <div className="space-y-4">
          <div>
            <Label>পিকআপ/ডেলিভারি</Label>
            <RadioGroup value={pickupOption} onValueChange={setPickupOption}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">নিজে নিয়ে যাব</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">ডেলিভারি চাই</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="location">ঠিকানা</Label>
            <Input 
              id="location" 
              placeholder="আপনার ঠিকানা"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container pt-20 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4 mr-1" /> পিছনে যান
        </Button>
        <h1 className="text-2xl font-bold">সেবা বুকিং</h1>
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
                </div>
                
                <Separator />
                
                {renderCategorySpecificFields()}
                
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
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.location}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>মূল মূল্য</span>
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

export default ServiceBooking;
