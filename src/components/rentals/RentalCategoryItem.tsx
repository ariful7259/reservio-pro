
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface RentalCategoryItemProps {
  category: any;
  index?: number;
  onClick?: () => void;
  isSelected?: boolean;
  onCategoryClick?: (category: any) => void;
  onSubcategoryClick?: (subcategory: any) => void;
}

const RentalCategoryItem: React.FC<RentalCategoryItemProps> = ({
  category,
  index,
  onClick,
  isSelected = false,
  onCategoryClick,
  onSubcategoryClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  if (category.isMainCategory && category.subcategories) {
    return (
      <div key={index}>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div 
              className={`flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}
              onClick={handleClick}
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
                  onClick={() => onSubcategoryClick && onSubcategoryClick(sub)}
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
          className={`flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}
          onClick={handleClick}
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
    <Link key={index} to={category.path} className={`flex flex-col items-center justify-center transition-all hover:scale-105 ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {category.icon}
      </div>
      <span className="text-xs text-center mb-1">{category.name}</span>
      <Badge variant="secondary" className="text-xs">
        {category.count}টি
      </Badge>
    </Link>
  );
};

export default RentalCategoryItem;
