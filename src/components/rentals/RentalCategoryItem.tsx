
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    // Navigate to category-specific page with filters
    const categoryId = category.id || category.name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/rental-category/${categoryId}`);
  };

  if (category.isMainCategory && category.subcategories) {
    return (
      <div key={index}>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div 
              className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer" 
              onClick={handleCategoryClick}
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-xs text-center mb-1">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}টি
              </Badge>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {category.subcategories.map((sub: any, subIndex: number) => (
                <div 
                  key={subIndex} 
                  className="p-2 hover:bg-gray-50 rounded cursor-pointer text-center"
                  onClick={() => onSubcategoryClick(sub)}
                >
                  <div className="mb-1">{sub.icon}</div>
                  <span className="text-xs">{sub.name}</span>
                  <Badge variant="outline" className="text-xs ml-1">
                    {sub.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }

  if (category.subcategories) {
    return (
      <div key={index}>
        <div 
          className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
          onClick={handleCategoryClick}
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            {category.icon}
          </div>
          <span className="text-xs text-center mb-1">{category.name}</span>
          <Badge variant="secondary" className="text-xs">
            {category.count}টি
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div 
      key={index} 
      className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
      onClick={handleCategoryClick}
    >
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {category.icon}
      </div>
      <span className="text-xs text-center mb-1">{category.name}</span>
      <Badge variant="secondary" className="text-xs">
        {category.count}টি
      </Badge>
    </div>
  );
};

export default RentalCategoryItem;
