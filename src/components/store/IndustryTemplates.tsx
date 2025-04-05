
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const IndustryTemplates = () => {
  const { toast } = useToast();
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  
  const templates = [
    {
      id: 'fashion',
      name: 'ফ্যাশন এবং ক্লোদিং',
      description: 'আধুনিক এবং সহজবোধ্য ইন্টারফেস, স্লাইডার, ফিল্টার সুবিধা',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      features: ['প্রোডাক্ট কালার সুইচার', 'সাইজ গাইড', 'স্টাইল টিপস', 'কমপ্লিট লুক']
    },
    {
      id: 'electronics',
      name: 'ইলেকট্রনিক্স',
      description: 'টেকনিক্যাল স্পেসিফিকেশন, তুলনা সুবিধা, রিভিউ',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      features: ['স্পেক কম্পেয়ার', 'তুলনামূলক চার্ট', 'ভিডিও ডেমো', 'ওয়ারেন্টি ট্র্যাকার']
    },
    {
      id: 'food',
      name: 'ফুড এবং রেস্টুরেন্ট',
      description: 'মেনু, অর্ডার ট্র্যাকিং, টেবিল রিজার্ভেশন',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      features: ['মেনু সার্চ', 'অনলাইন অর্ডার', 'ডেলিভারি ট্র্যাকিং', 'টেবিল বুকিং']
    },
    {
      id: 'beauty',
      name: 'বিউটি এবং কসমেটিকস',
      description: 'প্রোডাক্ট ফিচার, টিউটোরিয়াল, বিউটি টিপস',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      features: ['ভার্চুয়াল ট্রাইঅন', 'ইনগ্রিডিয়েন্ট লিস্ট', 'বিউটি কনসাল্টেশন', 'লুক বুক']
    },
    {
      id: 'furniture',
      name: 'ফার্নিচার এবং হোম ডেকোর',
      description: 'রুম সেটআপ, AR দিয়ে প্রিভিউ, ইন্টেরিয়র টিপস',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      features: ['AR প্লেসমেন্ট', 'রুম প্ল্যানার', 'মেজারমেন্ট গাইড', 'ডিজাইন ইন্সপিরেশন']
    },
    {
      id: 'digital',
      name: 'ডিজিটাল প্রোডাক্ট',
      description: 'ডিজিটাল কন্টেন্ট ডেলিভারি, সাবস্ক্রিপশন মডেল',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      features: ['অটো ডেলিভারি', 'সাবস্ক্রিপশন', 'একসেস ম্যানেজমেন্ট', 'ডাউনলোড ট্র্যাকিং']
    }
  ];
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedIndustry(templateId);
    
    toast({
      title: "টেম্পলেট সিলেক্ট করা হয়েছে",
      description: `${templates.find(t => t.id === templateId)?.name} টেম্পলেট সিলেক্ট করা হয়েছে।`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`cursor-pointer overflow-hidden transition-all ${
              selectedIndustry === template.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={template.image} 
                alt={template.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
              <div className="space-y-1">
                {template.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <Button disabled={!selectedIndustry}>টেম্পলেট অ্যাপ্লাই করুন</Button>
        <p className="text-xs text-muted-foreground mt-2">টেম্পলেট অ্যাপ্লাই করলে আপনার মূল বিষয়বস্তু অপরিবর্তিত থাকবে</p>
      </div>
    </div>
  );
};

export default IndustryTemplates;
