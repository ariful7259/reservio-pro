
import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface CategoryModalHeaderProps {
  category: any;
}

const CategoryModalHeader: React.FC<CategoryModalHeaderProps> = ({ category }) => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2 text-xl">
        {category.icon}
        <span>{category.name}</span>
        <Badge variant="secondary">{category.count}টি</Badge>
      </DialogTitle>
    </DialogHeader>
  );
};

export default CategoryModalHeader;
