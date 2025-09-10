
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Flame, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { marketplaceCategories, type MarketplaceCategory } from '@/utils/marketplaceData';

interface MarketplaceCategoryGridProps {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}

export const MarketplaceCategoryGrid: React.FC<MarketplaceCategoryGridProps> = ({
  selectedCategory,
  setSelectedCategory
}) => {
  const { language, t } = useApp();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const displayedCategories = showAllCategories 
    ? marketplaceCategories 
    : marketplaceCategories.slice(0, 8);

  const CategoryCard = ({ category }: { category: MarketplaceCategory }) => (
    <div
      className={`flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer relative ${
        selectedCategory === category.id
          ? 'ring-2 ring-primary bg-primary/5 rounded-lg p-2'
          : ''
      }`}
      onClick={() => setSelectedCategory(category.id)}
    >
      {/* New/Hot Badges */}
      {(category.isNew || category.isHot) && (
        <div className="absolute top-1 right-1 flex gap-1">
          {category.isNew && (
            <Badge variant="secondary" className="text-xs px-1 py-0 bg-blue-100 text-blue-600">
              <Sparkles className="h-2 w-2 mr-1" />
              নতুন
            </Badge>
          )}
          {category.isHot && (
            <Badge variant="secondary" className="text-xs px-1 py-0 bg-red-100 text-red-600">
              <Flame className="h-2 w-2 mr-1" />
              হট
            </Badge>
          )}
        </div>
      )}
      
      {/* Category Icon - Same as rental categories */}
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {category.icon}
      </div>
      
      {/* Category Name - Same as rental categories */}
      <span className="text-xs text-center mb-1">
        {language === 'bn' ? category.name : category.nameEn}
      </span>
      
      {/* Item Count Badge - Same as rental categories */}
      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
        {category.count}{language === 'bn' ? 'টি' : ' items'}
      </Badge>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-4">
          {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
        </h2>
        
        {/* Mobile: 4 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {displayedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      {/* Show More/Less Button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          className="text-primary border-primary hover:bg-primary/5"
          onClick={() => setShowAllCategories(!showAllCategories)}
        >
          {showAllCategories 
            ? (language === 'bn' ? 'কম দেখুন' : 'Show Less')
            : (language === 'bn' ? 'আরো দেখুন' : 'Show More')
          }
          <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-200 ${showAllCategories ? 'rotate-90' : ''}`} />
        </Button>
      </div>
    </div>
  );
};
