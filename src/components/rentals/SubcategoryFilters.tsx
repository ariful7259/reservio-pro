
import React from 'react';
import { Button } from '@/components/ui/button';

interface Subcategory {
  id: string;
  name: string;
  count: number;
}

interface SubcategoryFiltersProps {
  subcategories?: Subcategory[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
}

const SubcategoryFilters: React.FC<SubcategoryFiltersProps> = ({
  subcategories,
  selectedSubcategory,
  onSubcategoryChange
}) => {
  return (
    <div className="mb-6">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSubcategoryChange('all')}
        >
          সব দেখুন
        </Button>
        {subcategories?.map((sub) => (
          <Button
            key={sub.id}
            variant={selectedSubcategory === sub.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSubcategoryChange(sub.id)}
          >
            {sub.name} ({sub.count})
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryFilters;
