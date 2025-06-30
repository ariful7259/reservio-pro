
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SubcategoryDropdownProps {
  category: any;
  selectedSubcategory: string | null;
  onSubcategorySelect: (subcategory: any) => void;
}

const SubcategoryDropdown: React.FC<SubcategoryDropdownProps> = ({
  category,
  selectedSubcategory,
  onSubcategorySelect
}) => {
  if (!category?.subcategories || category.subcategories.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {selectedSubcategory || 'সাব-ক্যাটাগরি নির্বাচন করুন'}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full min-w-[300px] bg-white border shadow-lg z-50">
        {category.subcategories.map((subcategory: any, index: number) => (
          <DropdownMenuItem
            key={index}
            onClick={() => onSubcategorySelect(subcategory)}
            className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {subcategory.icon && <span className="text-lg">{subcategory.icon}</span>}
              <span className="text-sm">{subcategory.name}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {subcategory.count}টি
            </Badge>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SubcategoryDropdown;
