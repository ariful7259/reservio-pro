
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategoriesByType, getSubcategories } from '@/utils/categoryData';
import { CreatePostFormData } from '@/hooks/useCreatePostForm';

interface CategorySelectorProps {
  postType: string;
  formData: CreatePostFormData;
  onCategoryChange: (category: string) => void;
  onSubcategoryChange: (subcategory: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  postType,
  formData,
  onCategoryChange,
  onSubcategoryChange
}) => {
  const categories = getCategoriesByType(postType);
  const subcategories = getSubcategories(formData.category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium mb-2 block">
          ক্যাটাগরি <span className="text-red-500">*</span>
        </label>
        <Select
          value={formData.category}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.category && subcategories.length > 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            সাব-ক্যাটাগরি
          </label>
          <Select
            value={formData.subcategory}
            onValueChange={onSubcategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="সাব-ক্যাটাগরি নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory} value={subcategory}>
                  {subcategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
