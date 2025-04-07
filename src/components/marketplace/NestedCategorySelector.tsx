
import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

interface Category {
  id: string;
  name: string;
  subCategories?: Category[];
  count?: number;
}

interface NestedCategorySelectorProps {
  categories: Category[];
  onSelect: (categoryPath: string[]) => void;
  maxDepth?: number;
}

const NestedCategorySelector: React.FC<NestedCategorySelectorProps> = ({ 
  categories, 
  onSelect,
  maxDepth = 3
}) => {
  const { language } = useApp();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const handleCategorySelect = (category: Category, path: string[]) => {
    const newPath = [...path, category.id];
    setSelectedPath(newPath);
    onSelect(newPath);
    
    // Auto-expand if has subcategories
    if (category.subCategories && category.subCategories.length > 0) {
      toggleCategory(category.id);
    }
  };

  const renderCategories = (categoryList: Category[], depth: number = 0, path: string[] = []) => {
    return (
      <ul className={`space-y-1 ${depth > 0 ? 'ml-4 mt-1' : ''}`}>
        {categoryList.map(category => {
          const isExpanded = expandedCategories.includes(category.id);
          const hasSubCategories = category.subCategories && category.subCategories.length > 0;
          const isSelected = selectedPath.includes(category.id);
          const currentPath = [...path];
          
          return (
            <li key={category.id}>
              <div className="flex items-center">
                {hasSubCategories && depth < maxDepth ? (
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={() => toggleCategory(category.id)}
                  >
                    {isExpanded ? 
                      <ChevronDown className="h-4 w-4" /> : 
                      <ChevronRight className="h-4 w-4" />
                    }
                  </Button>
                ) : (
                  <div className="w-6" />
                )}
                
                <Button
                  variant={isSelected ? "default" : "ghost"}
                  size="sm"
                  className="justify-start h-8 text-sm font-normal"
                  onClick={() => handleCategorySelect(category, currentPath)}
                >
                  {category.name}
                  {category.count !== undefined && (
                    <span className="ml-1 text-xs text-muted-foreground">({category.count})</span>
                  )}
                </Button>
              </div>
              
              {hasSubCategories && isExpanded && depth < maxDepth && (
                renderCategories(category.subCategories!, depth + 1, [...currentPath, category.id])
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-full">
      <h3 className="font-medium mb-3">
        {language === 'bn' ? 'ক্যাটাগরি' : 'Categories'}
      </h3>
      {renderCategories(categories)}
    </div>
  );
};

export default NestedCategorySelector;
