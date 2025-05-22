
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, Layout, Type, Image, Box, Grid } from 'lucide-react';

const DragDropEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState("elements");
  const [previewMode, setPreviewMode] = useState("desktop");
  
  const elementCategories = [
    {
      id: "layout",
      name: "লেআউট",
      icon: <Layout className="h-4 w-4" />,
      items: ["সেকশন", "কন্টেইনার", "কলাম", "গ্রিড"]
    },
    {
      id: "content",
      name: "কন্টেন্ট",
      icon: <Type className="h-4 w-4" />,
      items: ["টেক্সট", "হেডিং", "বাটন", "লিস্ট"]
    },
    {
      id: "media",
      name: "মিডিয়া",
      icon: <Image className="h-4 w-4" />,
      items: ["ইমেজ", "ভিডিও", "আইকন", "স্লাইডার"]
    },
    {
      id: "components",
      name: "কম্পোনেন্টস",
      icon: <Box className="h-4 w-4" />,
      items: ["কার্ড", "টেবিল", "ফর্ম", "ন্যাভিগেশন"]
    },
  ];
  
  const templates = [
    {
      id: "header",
      name: "হেডার টেমপ্লেট",
      items: ["ন্যাভবার ১", "ন্যাভবার ২", "হেরো সেকশন", "ক্যাটেগরি হেডার"]
    },
    {
      id: "product",
      name: "প্রোডাক্ট টেমপ্লেট",
      items: ["প্রোডাক্ট গ্রিড", "প্রোডাক্ট লিস্ট", "ফিচারড প্রোডাক্ট", "সেল সেকশন"]
    },
    {
      id: "cta",
      name: "CTA সেকশন",
      items: ["নিউজলেটার সাইনআপ", "ফ্রি ট্রায়াল", "কনট্যাক্ট ফর্ম", "সোশ্যাল মিডিয়া"]
    },
    {
      id: "footer",
      name: "ফুটার",
      items: ["সিম্পল ফুটার", "মাল্টি-কলাম ফুটার", "কন্টাক্ট ইনফো", "লিংক সেকশন"]
    },
  ];
  
  const renderElementItems = (items: string[]) => {
    return (
      <div className="grid grid-cols-2 gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded p-2 text-xs text-center cursor-move hover:border-primary hover:bg-primary/5 transition-colors"
            draggable="true"
          >
            {item}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-medium">ড্র্যাগ এন্ড ড্রপ এডিটর</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPreviewMode("desktop")}>
            ডেস্কটপ
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPreviewMode("mobile")}>
            মোবাইল
          </Button>
          <Button size="sm">সংরক্ষণ করুন</Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 h-full">
        <div className="w-full md:w-64 border rounded-md overflow-hidden">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="elements">এলিমেন্টস</TabsTrigger>
              <TabsTrigger value="templates">টেমপ্লেটস</TabsTrigger>
            </TabsList>
            
            <div className="p-2 h-[500px] overflow-y-auto">
              <TabsContent value="elements" className="m-0">
                <div className="space-y-3">
                  {elementCategories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center gap-2 font-medium text-sm">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      {renderElementItems(category.items)}
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="templates" className="m-0">
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="space-y-2">
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="grid grid-cols-1 gap-2">
                        {template.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white border rounded p-2 text-xs cursor-move hover:border-primary hover:bg-primary/5 transition-colors"
                            draggable="true"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className={`flex-1 border rounded-md relative min-h-[500px] ${previewMode === 'mobile' ? 'max-w-[375px] mx-auto' : ''}`}>
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Layers className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>এখানে এলিমেন্টগুলো ড্র্যাগ করে আনুন</p>
              <p className="text-sm">অথবা বাম দিক থেকে একটি টেমপ্লেট সিলেক্ট করুন</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 border-t pt-4">
        <p className="text-sm text-muted-foreground">
          কোডিং ছাড়াই আপনার ওয়েবসাইট স্টাইল করুন। আমাদের ড্র্যাগ এন্ড ড্রপ এডিটর ব্যবহার করে সম্পূর্ণ রেস্পন্সিভ ডিজাইন তৈরি করুন।
        </p>
      </div>
    </div>
  );
};

export default DragDropEditor;
