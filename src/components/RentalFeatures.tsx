
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  RotateCcw, 
  DollarSign, 
  PieChart,
  BarChart3,
  Wallet,
  Truck,
  Clock,
  Calendar as CalendarIcon,
  Settings,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RentalBookingCalendar from './rental/RentalBookingCalendar';
import RentalReturnSystem from './rental/RentalReturnSystem';
import RentalManagementDashboard from './rental/RentalManagementDashboard';

interface RentalItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  deposit: number;
  minRental: number;
}

const RentalFeatures = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('booking');
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);

  const demoRentalItem: RentalItem = {
    id: 'item-001',
    name: 'DSLR ক্যামেরা - Canon EOS 5D',
    description: 'প্রফেশনাল ফটোগ্রাফি এবং ভিডিওগ্রাফির জন্য উচ্চ মানের DSLR ক্যামেরা',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
    deposit: 30, // deposit percentage
    minRental: 1 // minimum rental days
  };

  const handleBookingComplete = (bookingData: any) => {
    console.log('Booking completed:', bookingData);
    // In a real app, this would save to database and redirect
  };

  const handleReturnComplete = (returnData: any) => {
    console.log('Return completed:', returnData);
    // In a real app, this would update database
  };

  const handleViewAllFeatures = () => {
    navigate('/rent-anything');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>রেন্টাল ফিচার</span>
          <Button variant="link" className="flex items-center gap-1 text-sm" onClick={handleViewAllFeatures}>
            সব দেখুন <ArrowRight className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="booking" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> বুকিং
            </TabsTrigger>
            <TabsTrigger value="return" className="flex items-center gap-1">
              <RotateCcw className="h-4 w-4" /> রিটার্ন
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-1">
              <Settings className="h-4 w-4" /> ম্যানেজমেন্ট
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ক্যালেন্ডার ভিত্তিক বুকিং সিস্টেমের মাধ্যমে আপনার পছন্দের তারিখে আইটেম বুক করুন। 
                ডিপোজিট সিস্টেম নিশ্চিত করে অর্থের নিরাপত্তা।
              </p>
              
              <RentalBookingCalendar 
                itemName={demoRentalItem.name}
                pricePerDay={demoRentalItem.price}
                onBookingComplete={handleBookingComplete}
                depositRequired={demoRentalItem.deposit}
                minRentalDays={demoRentalItem.minRental}
              />
            </div>
          </TabsContent>

          <TabsContent value="return">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                রেন্টাল আইটেম সহজেই ফেরত দিন। আইটেমের অবস্থা অনুযায়ী ডিপোজিট ফেরত পান।
              </p>
              
              <RentalReturnSystem 
                rentalId="rent-1234"
                itemName={demoRentalItem.name}
                startDate={new Date(2025, 3, 10)}
                endDate={new Date(2025, 3, 15)}
                depositAmount={demoRentalItem.price * demoRentalItem.deposit / 100}
                onReturnComplete={handleReturnComplete}
              />
            </div>
          </TabsContent>

          <TabsContent value="management">
            {showDashboardPreview ? (
              <RentalManagementDashboard />
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  রেন্টাল বিজনেসের জন্য সম্পূর্ণ ম্যানেজমেন্ট সিস্টেম। আপনার প্রোডাক্ট স্টক, বুকিং, এবং পেমেন্ট ট্র্যাক করুন।
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <CalendarIcon className="h-8 w-8 text-primary mb-2" />
                      <h3 className="text-sm font-medium">স্বয়ংক্রিয় ক্যালেন্ডার</h3>
                      <p className="text-xs text-muted-foreground mt-1">বুকিংয়ের সাথে সাথে আপডেট</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Truck className="h-8 w-8 text-blue-500 mb-2" />
                      <h3 className="text-sm font-medium">ডেলিভারি ট্র্যাকিং</h3>
                      <p className="text-xs text-muted-foreground mt-1">প্রোডাক্ট মুভমেন্ট ট্র্যাক করুন</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Wallet className="h-8 w-8 text-green-500 mb-2" />
                      <h3 className="text-sm font-medium">পেমেন্ট প্রসেসিং</h3>
                      <p className="text-xs text-muted-foreground mt-1">স্বয়ংক্রিয় হিসাব নিকাশ</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <BarChart3 className="h-8 w-8 text-purple-500 mb-2" />
                      <h3 className="text-sm font-medium">বিজনেস অ্যানালিটিক্স</h3>
                      <p className="text-xs text-muted-foreground mt-1">আপনার ব্যবসার প্রবৃদ্ধি দেখুন</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button onClick={() => setShowDashboardPreview(true)}>
                    ড্যাশবোর্ড দেখুন
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RentalFeatures;
