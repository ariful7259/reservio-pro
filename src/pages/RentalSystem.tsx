
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RentalCalendarBooking from '@/components/Rental/RentalCalendarBooking';
import RentalReturnSystem from '@/components/Rental/RentalReturnSystem';
import DepositManagement from '@/components/Rental/DepositManagement';
import OwnerDashboardTimeline from '@/components/Rental/OwnerDashboardTimeline';
import AvailabilityManager from '@/components/Rental/AvailabilityManager';
import RecurringPayment from '@/components/Payment/RecurringPayment';
import WalletExtension from '@/components/Payment/WalletExtension';
import { useToast } from "@/components/ui/use-toast";
import {
  BookOpen,
  CalendarClock,
  Calendar as CalendarIcon,
  CreditCard,
  RefreshCw,
  RotateCcw,
  Shield,
  ShoppingBag,
  Wallet
} from 'lucide-react';
import { format, addDays } from 'date-fns';

const RentalSystem = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('calendar-booking');
  const [walletBalance, setWalletBalance] = useState(12500);
  const [loyaltyPoints, setLoyaltyPoints] = useState(450);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Sample rental item data
  const rentalItem = {
    id: 'R1001',
    title: 'ক্যানন ডিএসএলআর ক্যামেরা',
    pricePerDay: 800,
    pricePerWeek: 5000,
    pricePerMonth: 18000,
    deposit: 5000,
    startDate: new Date(),
    endDate: addDays(new Date(), 7)
  };
  
  // Handle loyalty points redeemed
  const handlePointsRedeemed = (points: number) => {
    setLoyaltyPoints(prev => Math.max(0, prev - points));
    
    toast({
      title: "পয়েন্টস রিডিম সফল",
      description: `${points} পয়েন্টস সফলভাবে রিডিম করা হয়েছে। ওয়ালেট চেক করুন!`,
    });
  };
  
  // Handle bill payment
  const handleBillPayment = (billInfo: any) => {
    setWalletBalance(prev => prev - billInfo.amount);
    setLoyaltyPoints(prev => prev + 5); // Add 5 points for bill payment
    
    toast({
      title: "পেমেন্ট সফল",
      description: `${billInfo.amount}৳ সফলভাবে পরিশোধ করা হয়েছে। ৫ লয়ালটি পয়েন্টস অর্জন করেছেন!`,
    });
  };
  
  // Handle money transfer
  const handleTransfer = (transferInfo: any) => {
    setWalletBalance(prev => prev - transferInfo.amount);
    
    toast({
      title: "ট্রান্সফার সফল",
      description: `${transferInfo.recipient} নম্বরে ${transferInfo.amount}৳ সফলভাবে পাঠানো হয়েছে`,
    });
  };
  
  // Handle subscription
  const handleSubscribe = (plan: string, interval: string) => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      toast({
        title: "সাবস্ক্রিপশন সফল",
        description: `আপনি সফলভাবে ${plan} প্ল্যান ${interval} বিলিং সাইকেলে সাবস্ক্রাইব করেছেন`,
      });
    }, 2000);
  };
  
  return (
    <div className="container px-4 pt-20 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">উন্নত রেন্টাল সিস্টেম</h1>
          <p className="text-muted-foreground">ক্যালেন্ডার বুকিং, রিটার্ন প্রক্রিয়া, ডিপোজিট ম্যানেজমেন্ট এবং উন্নত পেমেন্ট সিস্টেম</p>
        </div>
        <Button className="shrink-0">
          <ShoppingBag className="mr-2 h-4 w-4" />
          নতুন লিস্টিং যোগ করুন
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="calendar-booking" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" /> বুকিং সিস্টেম
          </TabsTrigger>
          <TabsTrigger value="return-system" className="flex items-center gap-1">
            <RotateCcw className="h-4 w-4" /> রিটার্ন সিস্টেম
          </TabsTrigger>
          <TabsTrigger value="deposit-management" className="flex items-center gap-1">
            <Shield className="h-4 w-4" /> ডিপোজিট
          </TabsTrigger>
          <TabsTrigger value="owner-dashboard" className="flex items-center gap-1">
            <CalendarClock className="h-4 w-4" /> ড্যাশবোর্ড
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> এভেইলেবিলিটি
          </TabsTrigger>
          <TabsTrigger value="recurring-payment" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" /> রিকারিং পেমেন্ট
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-1">
            <Wallet className="h-4 w-4" /> ওয়ালেট ফিচার
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="calendar-booking">
            <Card>
              <CardHeader>
                <CardTitle>ক্যালেন্ডার-ভিত্তিক বুকিং সিস্টেম</CardTitle>
                <CardDescription>
                  দিন/সপ্তাহ/মাস হিসাবে রেন্টাল আইটেম বুকিং করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RentalCalendarBooking 
                  title={rentalItem.title}
                  pricePerDay={rentalItem.pricePerDay}
                  pricePerWeek={rentalItem.pricePerWeek}
                  pricePerMonth={rentalItem.pricePerMonth}
                  deposit={rentalItem.deposit}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="return-system">
            <Card>
              <CardHeader>
                <CardTitle>রেন্টাল রিটার্ন সিস্টেম</CardTitle>
                <CardDescription>
                  রেন্টাল আইটেম ফেরত প্রক্রিয়া সহজীকরণ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RentalReturnSystem 
                  rentalId={rentalItem.id}
                  itemName={rentalItem.title}
                  rentalStartDate={rentalItem.startDate}
                  rentalEndDate={rentalItem.endDate}
                  depositAmount={rentalItem.deposit}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="deposit-management">
            <Card>
              <CardHeader>
                <CardTitle>ডিপোজিট ম্যানেজমেন্ট</CardTitle>
                <CardDescription>
                  সিকিউরিটি ডিপোজিট হ্যান্ডলিং এবং সেটিংস
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DepositManagement rentalItemValue={25000} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="owner-dashboard">
            <Card>
              <CardHeader>
                <CardTitle>মালিকের ড্যাশবোর্ড</CardTitle>
                <CardDescription>
                  রেন্টাল লিস্টিংয়ের টাইমলাইন ভিউ এবং ম্যানেজমেন্ট
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OwnerDashboardTimeline />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>স্বয়ংক্রিয় এভেইলেবিলিটি আপডেট</CardTitle>
                <CardDescription>
                  রেন্টাল সময়সীমা অনুসারে উপলব্ধতা পরিবর্তন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AvailabilityManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recurring-payment">
            <Card>
              <CardHeader>
                <CardTitle>রিকারিং পেমেন্ট সিস্টেম</CardTitle>
                <CardDescription>
                  সাবস্ক্রিপশন বেস্ড সার্ভিসের জন্য পেমেন্ট সিস্টেম
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecurringPayment 
                  title="প্রিমিয়াম মেম্বারশীপ"
                  description="অতিরিক্ত সুবিধা পাওয়ার জন্য প্রিমিয়াম সদস্যতা নিন"
                  prices={{
                    monthly: 499,
                    quarterly: 1347, // 449 x 3 (10% discount)
                    yearly: 4788, // 399 x 12 (20% discount)
                  }}
                  onSubscribe={handleSubscribe}
                  isProcessing={isProcessing}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle>উন্নত ওয়ালেট ফিচার</CardTitle>
                <CardDescription>
                  লয়ালটি পয়েন্টস, মানি ট্রান্সফার ও বিল পেমেন্ট
                </CardDescription>
              </CardHeader>
              <CardContent>
                <WalletExtension 
                  balance={walletBalance}
                  points={loyaltyPoints}
                  onPointsRedeemed={handlePointsRedeemed}
                  onBillPayment={handleBillPayment}
                  onTransfer={handleTransfer}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default RentalSystem;
