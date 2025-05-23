
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DragDropEditor from '@/components/store/DragDropEditor';
import LinkInBioBuilder from '@/components/store/LinkInBio/LinkInBioBuilder';
import { Paintbrush, Sparkles, MessageSquareText } from 'lucide-react';
import TrackingIntegrations from '@/components/store/TrackingIntegrations';

interface DesignTabContentProps {
  onNextTab: () => void;
  onPreviousTab: () => void;
  businessName: string;
}

const DesignTabContent: React.FC<DesignTabContentProps> = ({ 
  onNextTab,
  onPreviousTab,
  businessName
}) => {
  const [designTab, setDesignTab] = useState('store');
  
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-md p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Paintbrush className="h-6 w-6 text-primary shrink-0" />
        <div className="flex-grow">
          <h3 className="font-medium">স্টোর ডিজাইন</h3>
          <p className="text-sm text-muted-foreground">
            নিচের এডিটর ব্যবহার করে আপনার পছন্দ মত স্টোরের ডিজাইন তৈরি করুন। টেমপ্লেট থেকে শুরু করে ধাপে ধাপে কাস্টমাইজ করুন।
          </p>
        </div>
        <Badge variant="outline" className="bg-primary/5 border-primary/20 text-sm">
          <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" /> নতুন ফিচার
        </Badge>
      </div>
      
      <Tabs value={designTab} onValueChange={setDesignTab} className="w-full">
        <TabsList className="w-full mb-4 grid grid-cols-3">
          <TabsTrigger value="store" className="flex-1">অনলাইন স্টোর</TabsTrigger>
          <TabsTrigger value="linkinbio" className="flex-1">লিংক ইন বায়ো</TabsTrigger>
          <TabsTrigger value="tracking" className="flex-1">ট্র্যাকিং & ইন্টিগ্রেশন</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="mt-0">
          <div className="min-h-[600px] border rounded-md p-0.5">
            <DragDropEditor storeName={businessName || "আমার দোকান"} />
          </div>
        </TabsContent>
        
        <TabsContent value="linkinbio" className="mt-0">
          <LinkInBioBuilder />
        </TabsContent>

        <TabsContent value="tracking" className="mt-0">
          <TrackingIntegrations />
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <Button variant="outline" onClick={onPreviousTab} className="w-full sm:w-auto order-2 sm:order-1">
          আগের ধাপ
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 order-1 sm:order-2">
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquareText className="h-4 w-4" />
            <span>সাহায্য চাই</span>
          </Button>
          <Button onClick={onNextTab} className="w-full sm:w-auto">
            পরবর্তী ধাপ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignTabContent;
