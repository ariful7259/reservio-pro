
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Award, FileText, MessageSquare } from 'lucide-react';
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  setSelectedTemplate 
}) => {
  const templates: Template[] = [
    { id: 'default', name: 'স্ট্যান্ডার্ড', description: 'বেসিক থিম সহ স্ট্যান্ডার্ড টেমপ্লেট', icon: <Book className="h-8 w-8 text-primary"/> },
    { id: 'premium', name: 'প্রিমিয়াম', description: 'অ্যাডভান্সড ফিচার সহ প্রিমিয়াম টেমপ্লেট', icon: <Award className="h-8 w-8 text-amber-500"/> },
    { id: 'minimal', name: 'মিনিমাল', description: 'সাধারণ ও সহজ ডিজাইন', icon: <FileText className="h-8 w-8 text-gray-500"/> },
    { id: 'interactive', name: 'ইন্টারেক্টিভ', description: 'বেশি ইন্টারেকশন সহ ইমারসিভ অভিজ্ঞতা', icon: <MessageSquare className="h-8 w-8 text-blue-500"/> },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>টেমপ্লেট</CardTitle>
        <CardDescription>আপনার কোর্সের জন্য একটি টেমপ্লেট নির্বাচন করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer hover:border-primary transition-all h-full ${selectedTemplate === template.id ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => {
                setSelectedTemplate(template.id);
                toast.success(`${template.name} টেমপ্লেট সিলেক্ট করা হয়েছে!`);
              }}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary/10 mb-3">
                  {template.icon}
                </div>
                <h3 className="font-medium text-base mb-1">{template.name}</h3>
                <p className="text-xs text-muted-foreground">{template.description}</p>
                {selectedTemplate === template.id && (
                  <Badge className="mt-3 bg-primary">সিলেক্টেড</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
