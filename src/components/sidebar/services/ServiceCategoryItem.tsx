
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ServiceCategory } from './serviceTypes';
import { ServiceSubCategories } from './ServiceSubCategories';

interface ServiceCategoryItemProps {
  category: ServiceCategory;
  expandedCategory: string | null;
  toggleCategoryExpansion: (categoryName: string) => void;
}

export const ServiceCategoryItem = ({ 
  category, 
  expandedCategory, 
  toggleCategoryExpansion 
}: ServiceCategoryItemProps) => {
  
  if (category.subCategories) {
    return (
      <div className="flex flex-col">
        <Collapsible
          open={expandedCategory === category.name}
          onOpenChange={() => toggleCategoryExpansion(category.name)}
        >
          <CollapsibleTrigger className="w-full" asChild>
            <div className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-inner">
                {category.icon}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-center line-clamp-1">{category.name}</span>
                {expandedCategory === category.name ? 
                  <ChevronDown className="h-3 w-3 text-primary" /> : 
                  <ChevronRight className="h-3 w-3 text-gray-500" />
                }
              </div>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 bg-gray-50 rounded-lg p-2 shadow-sm border border-gray-100 animate-in slide-in-from-top-2 duration-200">
            <ServiceSubCategories subCategories={category.subCategories} />
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col">
      <Link 
        to={category.path}
        className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm"
      >
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-inner">
          {category.icon}
        </div>
        <span className="text-xs font-medium text-center line-clamp-2">{category.name}</span>
      </Link>
    </div>
  );
};
