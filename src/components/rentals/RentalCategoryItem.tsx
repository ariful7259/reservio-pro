
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SubcategoryDropdown from './SubcategoryDropdown';

interface RentalCategoryItemProps {
  category: any;
  index: number;
  onCategoryClick: (category: any) => void;
  onSubcategoryClick: (subcategory: any) => void;
}

const RentalCategoryItem: React.FC<RentalCategoryItemProps> = ({
  category,
  index,
  onCategoryClick,
  onSubcategoryClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const handleSubcategorySelect = (subcategory: any) => {
    setSelectedSubcategory(subcategory.name);
    onSubcategoryClick(subcategory);
  };

  // Special handling for main categories with subcategories
  if (category.isMainCategory && category.subcategories) {
    return (
      <div key={index} className="space-y-2">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <div 
              className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer p-2 rounded-lg hover:bg-gray-50" 
              onClick={() => {
                onCategoryClick(category);
                setIsExpanded(!isExpanded);
              }}
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-xs text-center mb-1 font-medium">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}টি
              </Badge>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-3 space-y-2">
            {/* Subcategory Dropdown */}
            <div className="px-2">
              <SubcategoryDropdown
                category={category}
                selectedSubcategory={selectedSubcategory}
                onSubcategorySelect={handleSubcategorySelect}
              />
            </div>
            
            {/* Grid view of subcategories */}
            <div className="grid grid-cols-2 gap-2 text-xs px-2">
              {category.subcategories.slice(0, 4).map((sub: any, subIndex: number) => (
                <div 
                  key={subIndex} 
                  className="p-2 hover:bg-gray-50 rounded cursor-pointer text-center border border-gray-200"
                  onClick={() => handleSubcategorySelect(sub)}
                >
                  <div className="mb-1">{sub.icon}</div>
                  <span className="text-xs block truncate">{sub.name}</span>
                  <Badge variant="outline" className="text-xs mt-1">
                    {sub.count}
                  </Badge>
                </div>
              ))}
              {category.subcategories.length > 4 && (
                <div className="col-span-2 text-center py-2">
                  <Badge variant="outline" className="text-xs">
                    +{category.subcategories.length - 4} আরও সাব-ক্যাটাগরি
                  </Badge>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }

  // Regular categories with subcategories
  if (category.subcategories && category.subcategories.length > 0) {
    return (
      <div key={index} className="space-y-2">
        <div 
          className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
          onClick={() => {
            onCategoryClick(category);
            setIsExpanded(!isExpanded);
          }}
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            {category.icon}
          </div>
          <span className="text-xs text-center mb-1 font-medium">{category.name}</span>
          <Badge variant="secondary" className="text-xs">
            {category.count}টি
          </Badge>
        </div>
        
        {isExpanded && (
          <div className="px-2 space-y-2">
            <SubcategoryDropdown
              category={category}
              selectedSubcategory={selectedSubcategory}
              onSubcategorySelect={handleSubcategorySelect}
            />
          </div>
        )}
      </div>
    );
  }

  // Simple category without subcategories
  return (
    <Link key={index} to={category.path} className="flex flex-col items-center justify-center transition-all hover:scale-105 p-2 rounded-lg hover:bg-gray-50">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {category.icon}
      </div>
      <span className="text-xs text-center mb-1 font-medium">{category.name}</span>
      <Badge variant="secondary" className="text-xs">
        {category.count}টি
      </Badge>
    </Link>
  );
};

export default RentalCategoryItem;
