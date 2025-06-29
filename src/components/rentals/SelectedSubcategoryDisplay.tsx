
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SelectedSubcategoryDisplayProps {
  selectedSubcategory: string;
  category: any;
}

const SelectedSubcategoryDisplay: React.FC<SelectedSubcategoryDisplayProps> = ({
  selectedSubcategory,
  category
}) => {
  if (!selectedSubcategory) return null;

  return (
    <div className="p-4 border rounded-lg bg-blue-50">
      <h3 className="text-lg font-semibold mb-2">নির্বাচিত সাব-ক্যাটাগরি</h3>
      <div className="flex items-center gap-2">
        <span className="font-medium">{selectedSubcategory}</span>
        <Badge variant="secondary">
          {category?.subcategories?.find((sub: any) => sub.name === selectedSubcategory)?.count}টি আইটেম
        </Badge>
      </div>
    </div>
  );
};

export default SelectedSubcategoryDisplay;
