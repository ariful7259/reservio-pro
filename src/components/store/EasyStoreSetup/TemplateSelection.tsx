
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Link } from 'lucide-react';
import { StoreTemplate } from './types';
import { storeTemplates } from './templateData';
import { ProductSearchBar } from ".";
import { useState, useMemo } from "react";

interface TemplateSelectionProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  selectedTemplate,
  onTemplateSelect
}) => {
  const [search, setSearch] = useState("");
  const filteredTemplates = useMemo(
    () =>
      storeTemplates.filter((template) =>
        template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.category.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">আপনার প্রয়োজন নির্বাচন করুন</h2>
        <p className="text-muted-foreground">অনলাইন স্টোর নাকি লিংক ইন বায়ো পেজ তৈরি করতে চান?</p>
      </div>

      <ProductSearchBar value={search} onChange={setSearch} placeholder="টেমপ্লেট নাম বা ক্যাটেগরি লিখুন…" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.id ? 'ring-2 ring-primary border-primary' : ''
            } ${template.type === 'linkinbio' ? 'border-purple-200 bg-purple-50/50' : ''}`}
            onClick={() => onTemplateSelect(template.id)}
            aria-label={`Select template ${template.name}`}
          >
            <div className="relative">
              <img 
                src={template.image} 
                alt={template.name}
                className="w-full h-32 object-cover rounded-t-md"
              />
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-6 w-6 text-primary bg-white rounded-full" />
                </div>
              )}
              {template.type === 'linkinbio' && (
                <Badge className="absolute top-2 left-2 bg-purple-600 text-white">
                  <Link className="h-3 w-3 mr-1" />
                  নতুন
                </Badge>
              )}
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                {template.type === 'linkinbio' && <Link className="h-4 w-4 text-purple-600" />}
                {template.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
