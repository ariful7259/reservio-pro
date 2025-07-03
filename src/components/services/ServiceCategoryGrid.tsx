
import React from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Flame, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

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
  const { language, t } = useApp();
  const navigate = useNavigate();
  
  const displayedCategories = isExpanded ? serviceCategories : serviceCategories.slice(0, 8);

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to service category page like rent section
    navigate(`/services/category/${categoryId}`);
  };

  const CategoryCard = ({ category }: { category: any }) => (
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
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${category.color} flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-white/20`}>
          <div className={`${category.iconColor} transition-transform duration-300 group-hover:scale-110`}>
            {React.cloneElement(category.icon, { className: "h-8 w-8 md:h-10 md:w-10" })}
          </div>
        </div>
        
        <h3 className="font-semibold text-sm md:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {language === 'bn' ? category.name : category.nameEn}
        </h3>
        
        <Badge variant="secondary" className="text-xs mb-1">
          {category.count} {language === 'bn' ? 'সার্ভিস' : 'services'}
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
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
        </h2>
        
        {/* Mobile: 4 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {displayedCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
        <CollapsibleContent className="mt-4">
          
        </CollapsibleContent>
        
        <div className="flex justify-center mt-6">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
              {isExpanded ? (
                <>{language === 'bn' ? '∧ কম দেখুন' : '∧ Show Less'}</>
              ) : (
                <>{language === 'bn' ? '∨ আরো দেখুন' : '∨ Show More'}</>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
};

export default ServiceCategoryGrid;
