
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DragDropEditor from '@/components/store/DragDropEditor';
import LinkInBioBuilder from '@/components/store/LinkInBio/LinkInBioBuilder';
import { Paintbrush, Sparkles } from 'lucide-react';

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
        <TabsList className="w-full mb-4">
          <TabsTrigger value="store" className="flex-1">অনলাইন স্টোর</TabsTrigger>
          <TabsTrigger value="linkinbio" className="flex-1">লিংক ইন বায়ো</TabsTrigger>
        </TabsList>
        
        <TabsContent value="store" className="mt-0">
          <div className="min-h-[600px] border rounded-md p-0.5">
            <DragDropEditor />
          </div>
        </TabsContent>
        
        <TabsContent value="linkinbio" className="mt-0">
          <LinkInBioBuilder />
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPreviousTab}>
          আগের ধাপ
        </Button>
        <Button onClick={onNextTab}>
          পরবর্তী ধাপ
        </Button>
      </div>
    </div>
  );
};

export default DesignTabContent;
