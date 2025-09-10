
import React from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, Flame, Sparkles, Search } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

interface ServiceCategoryGridProps {
  serviceCategories: any[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  isExpanded: boolean;
  setIsExpanded: (open: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ServiceCategoryGrid: React.FC<ServiceCategoryGridProps> = ({
  serviceCategories,
  selectedCategory,
  setSelectedCategory,
  isExpanded,
  setIsExpanded,
  searchTerm,
  setSearchTerm
}) => {
  const { language, t } = useApp();
  const navigate = useNavigate();
  
  // Filter categories based on search term
  const filteredCategories = serviceCategories.filter(category =>
    (category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (category.nameEn && category.nameEn.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const initialDisplayCount = 7; // Changed from 8 to 7 as requested
  const displayedCategories = filteredCategories.slice(0, initialDisplayCount);
  const remainingCategories = filteredCategories.slice(initialDisplayCount);

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to service category page like rent section
    navigate(`/services/category/${categoryId}`);
  };

  const CategoryCard = ({ category }: { category: any }) => (
    <div 
      className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
      onClick={() => handleCategoryClick(category.id)}
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
        {React.cloneElement(category.icon, { className: "h-8 w-8" })}
      </div>
      
      {/* Category Name - Same as rental categories */}
      <span className="text-xs text-center mb-1">
        {language === 'bn' ? category.name : category.nameEn}
      </span>
      
      {/* Service Count Badge - Same as rental categories */}
      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
        {category.count}{language === 'bn' ? 'টি' : ' services'}
      </Badge>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {language === 'bn' ? 'ক্যাটাগরি সমূহ' : 'Categories'}
        </h2>
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={language === 'bn' ? 'ক্যাটাগরি খুঁজুন...' : 'Search categories...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
        
        {/* Categories Grid - 3 columns as requested */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {displayedCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
      
      {remainingCategories.length > 0 && (
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full">
          <CollapsibleContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {remainingCategories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
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
      )}
    </div>
  );
};

export default ServiceCategoryGrid;
