
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Flame, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const displayedCategories = showAllCategories 
    ? marketplaceCategories 
    : marketplaceCategories.slice(0, 8);

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to marketplace category page like rent section
    navigate(`/marketplace/category/${categoryId}`);
  };

  const CategoryCard = ({ category }: { category: MarketplaceCategory }) => (
    <Card
      className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:bg-gray-50 hover:scale-105`}
      onClick={() => handleCategoryClick(category.id)}
    >
      <CardContent className="p-3 flex flex-col items-center text-center">
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
        
        {/* Digital Round Icon Style */}
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${category.color} flex items-center justify-center mb-2 shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/20`}>
          <div className={`${category.iconColor} transition-transform duration-300 group-hover:scale-110`}>
            {category.icon}
          </div>
        </div>
        
        <h3 className="font-medium text-xs md:text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {language === 'bn' ? category.name : category.nameEn}
        </h3>
        
        <Badge variant="secondary" className="text-xs mb-1">
          {category.count} {language === 'bn' ? 'পণ্য' : 'items'}
        </Badge>
        
        <div className="text-xs text-muted-foreground">
          {category.subcategories.length} {language === 'bn' ? 'সাব-ক্যাটাগরি' : 'subcategories'}
        </div>

        {/* Click indicator */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="h-4 w-4 text-primary" />
        </div>
      </CardContent>
    </Card>
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
