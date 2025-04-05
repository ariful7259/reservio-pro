
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { SubCategory } from '@/utils/categoryData';

interface CategoryCardProps {
  id: string;
  name: string;
  nameBN: string;
  icon: string;
  count?: number;
  slug: string;
  type: 'service' | 'product';
  subCategories?: SubCategory[];
  onClick?: (id: string, type: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  nameBN,
  icon,
  count,
  slug,
  type,
  subCategories,
  onClick
}) => {
  const navigate = useNavigate();
  const { language } = useApp();
  
  const handleClick = () => {
    if (onClick) {
      onClick(id, type);
    } else {
      if (type === 'service') {
        navigate(`/services/category/${slug}`);
      } else {
        navigate(`/shopping/category/${slug}`);
      }
    }
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-center p-3 border rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="text-4xl mb-2">{icon}</div>
      <span className="text-xs text-center font-medium">
        {language === 'bn' ? nameBN : name}
      </span>
      {count !== undefined && (
        <Badge variant="outline" className="mt-2 text-xs">{count}</Badge>
      )}
      {subCategories && subCategories.length > 0 && (
        <Badge variant="secondary" className="mt-1 text-xs">
          {subCategories.length} {language === 'bn' ? 'সাবক্যাটাগরি' : 'subcategories'}
        </Badge>
      )}
    </div>
  );
};

export default CategoryCard;
