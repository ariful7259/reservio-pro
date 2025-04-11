
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Building, 
  Briefcase, 
  ShoppingBag, 
  BookOpen,
  DollarSign, 
  Tag, 
  Star, 
  Shield, 
  CreditCard, 
  PieChart, 
  TrendingUp,
  BadgePercent,
  Medal,
  Users,
  BarChart4,
  Gift,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import RentalMonetization from './monetization/RentalMonetization';
import ServiceMonetization from './monetization/ServiceMonetization';
import MarketplaceMonetization from './monetization/MarketplaceMonetization';
import DigitalCreatorMonetization from './monetization/DigitalCreatorMonetization';
import CrossPlatformMonetization from './monetization/CrossPlatformMonetization';

const MonetizationDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("rental");

  const handleSave = () => {
    toast({
      title: "সেটিংস সংরক্ষিত হয়েছে",
      description: "মানিটাইজেশন সেটিংস সফলভাবে আপডেট করা হয়েছে",
    });
  };

  const handleEnable = (feature: string) => {
    toast({
      title: `${feature} সক্রিয় করা হয়েছে`,
      description: "এই ফিচারটি এখন লাইভ আছে এবং ব্যবহারকারীরা এটি দেখতে পাবে",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">মানিটাইজেশন ড্যাশবোর্ড</h2>
          <p className="text-muted-foreground mt-1">আপনার প্ল্যাটফর্মের আয়ের বিভিন্ন উৎস পরিচালনা করুন</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => handleSave()}>
            <Settings className="mr-2 h-4 w-4" /> সেটিংস
          </Button>
          <Button onClick={() => handleSave()}>
            <DollarSign className="mr-2 h-4 w-4" /> সকল সেটিংস সংরক্ষণ করুন
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-none">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-green-50 border-green-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">মোট আয়</p>
                    <h3 className="text-3xl font-bold text-green-700">৳১,৫৪,৫০০</h3>
                    <Badge variant="success" className="mt-2">+১২% গত মাস থেকে</Badge>
                  </div>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">রেন্টাল আয়</p>
                    <h3 className="text-2xl font-bold">৳৫৮,৪০০</h3>
                    <Badge variant="success" className="mt-2">+৮% গত মাস থেকে</Badge>
                  </div>
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">সার্ভিস আয়</p>
                    <h3 className="text-2xl font-bold">৳৪২,৮৫০</h3>
                    <Badge variant="success" className="mt-2">+১৫% গত মাস থেকে</Badge>
                  </div>
                  <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">মার্কেটপ্লেস আয়</p>
                    <h3 className="text-2xl font-bold">৳৩৬,৭২০</h3>
                    <Badge variant="warning" className="mt-2">+৪% গত মাস থেকে</Badge>
                  </div>
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">ডিজিটাল কন্টেন্ট আয়</p>
                    <h3 className="text-2xl font-bold">৳১৬,৫৩০</h3>
                    <Badge variant="success" className="mt-2">+১৮% গত মাস থেকে</Badge>
                  </div>
                  <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-indigo-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <CardHeader>
            <CardTitle>মানিটাইজেশন সেটিংস</CardTitle>
            <CardDescription>বিভিন্ন সেক্টরের জন্য আয়ের উৎস কনফিগার করুন</CardDescription>
            
            <TabsList className="grid grid-cols-5 mt-4">
              <TabsTrigger value="rental" className="flex items-center gap-2">
                <Building className="h-4 w-4" /> রেন্ট সেক্টর
              </TabsTrigger>
              <TabsTrigger value="service" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" /> সার্ভিস সেক্টর
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" /> মার্কেটপ্লেস
              </TabsTrigger>
              <TabsTrigger value="digital" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> ডিজিটাল কন্টেন্ট
              </TabsTrigger>
              <TabsTrigger value="platform" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" /> ক্রস-প্ল্যাটফর্ম
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="rental" className="mt-0">
              <RentalMonetization onSave={handleSave} onEnable={handleEnable} />
            </TabsContent>
            
            <TabsContent value="service" className="mt-0">
              <ServiceMonetization onSave={handleSave} onEnable={handleEnable} />
            </TabsContent>
            
            <TabsContent value="marketplace" className="mt-0">
              <MarketplaceMonetization onSave={handleSave} onEnable={handleEnable} />
            </TabsContent>
            
            <TabsContent value="digital" className="mt-0">
              <DigitalCreatorMonetization onSave={handleSave} onEnable={handleEnable} />
            </TabsContent>
            
            <TabsContent value="platform" className="mt-0">
              <CrossPlatformMonetization onSave={handleSave} onEnable={handleEnable} />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MonetizationDashboard;
