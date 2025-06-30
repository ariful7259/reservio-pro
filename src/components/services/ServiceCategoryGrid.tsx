
import React from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ServiceCategoryGridProps {
  serviceCategories: any[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  isExpanded: boolean;
  setIsExpanded: (open: boolean) => void;
}

const ServiceCategoryGrid: React.FC<ServiceCategoryGridProps> = ({
  serviceCategories,
  selectedCategory,
  setSelectedCategory,
  isExpanded,
  setIsExpanded
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">ক্যাটাগরি সমূহ</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {serviceCategories.slice(0, 8).map((category) => (
          <div
            key={category.id}
            className={`flex flex-col items-center text-center p-4 rounded-lg transition-colors cursor-pointer ${
              selectedCategory === category.id
                ? 'bg-primary/10 border-2 border-primary'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
              <div className={category.iconColor}>
                {category.icon}
              </div>
            </div>
            <h3 className="font-medium text-sm mb-2">{category.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {category.count}টি
            </Badge>
            <div className="mt-2 text-xs text-muted-foreground">
              {category.subcategories.length} সাব-ক্যাটাগরি
            </div>
          </div>
        ))}
      </div>
      
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full mt-4">
        <CollapsibleContent className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceCategories.slice(8).map((category) => (
              <div
                key={category.id}
                className={`flex flex-col items-center text-center p-4 rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === category.id
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3`}>
                  <div className={category.iconColor}>
                    {category.icon}
                  </div>
                </div>
                <h3 className="font-medium text-sm mb-2">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.count}টি
                </Badge>
                <div className="mt-2 text-xs text-muted-foreground">
                  {category.subcategories.length} সাব-ক্যাটাগরি
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
        
        <div className="flex justify-center mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
              {isExpanded ? (
                <>∧ কম দেখুন</>
              ) : (
                <>∨ আরো দেখুন</>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
};

export default ServiceCategoryGrid;
