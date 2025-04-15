
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

import { 
  Sparkles, 
  Palette, 
  Languages, 
  Calendar, 
  WifiOff, 
  Layout, 
  Cog,
  Zap,
  RefreshCw
} from 'lucide-react';

import ServiceCardCustomization from '@/components/admin/ServiceCardCustomization';
import OfflineConfiguration from '@/components/admin/OfflineConfiguration';
import LanguageManager from '@/components/admin/LanguageManager';
import RentalCalendarConfiguration from '@/components/admin/RentalCalendarConfiguration';

const AdvancedFeatures = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('service-card');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">অ্যাডভান্স ফিচার</h2>
          <p className="text-muted-foreground">অ্যাপের অ্যাডভান্স ফিচার কাস্টমাইজেশন এবং কনফিগারেশন করুন।</p>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => {
            toast({
              title: "অ্যাডভান্স ফিচার রিফ্রেশ করা হয়েছে",
              description: "অ্যাডভান্স ফিচার এবং সেটিংস রিফ্রেশ করা হয়েছে।"
            });
          }}
        >
          <RefreshCw className="h-4 w-4" />
          <span>রিফ্রেশ</span>
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full rounded-none p-0 border-b flex overflow-x-auto">
              <TabsTrigger value="service-card" className="rounded-none flex-1">
                <div className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  <span>সার্ভিস কার্ড</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="offline-mode" className="rounded-none flex-1">
                <div className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4" />
                  <span>অফলাইন মোড</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="language" className="rounded-none flex-1">
                <div className="flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  <span>ভাষা</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="rounded-none flex-1">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>ক্যালেন্ডার</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="service-card" className="p-0">
              <ServiceCardCustomization />
            </TabsContent>
            
            <TabsContent value="offline-mode" className="p-0">
              <OfflineConfiguration />
            </TabsContent>
            
            <TabsContent value="language" className="p-0">
              <LanguageManager />
            </TabsContent>
            
            <TabsContent value="calendar" className="p-0">
              <RentalCalendarConfiguration />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedFeatures;
