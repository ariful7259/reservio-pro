
import React from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CategoryGridProps {
  rentCategories: any[];
  isExpanded: boolean;
  setIsExpanded: (open: boolean) => void;
  renderCategoryItem: (category: any, index: number) => React.ReactNode;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  rentCategories,
  isExpanded,
  setIsExpanded,
  renderCategoryItem
}) => (
  <div className="mb-8">
    <h2 className="text-lg font-medium mb-4">ক্যাটাগরি</h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {rentCategories.slice(0, 8).map((category, index) =>
        renderCategoryItem(category, index)
      )}
    </div>
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded} className="w-full mt-3">
      <CollapsibleContent className="mt-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {rentCategories.slice(8).map((category, index) =>
            renderCategoryItem(category, index + 8)
          )}
        </div>
      </CollapsibleContent>
      <div className="w-full flex justify-center mt-4">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            {isExpanded ? (
              <>
                <span className="inline-block transform rotate-180">˄</span> কম দেখুন
              </>
            ) : (
              <>
                <span className="inline-block">˅</span> আরও দেখুন
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  </div>
);

export default CategoryGrid;
