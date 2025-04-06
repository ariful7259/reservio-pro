
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubCategory } from '@/utils/categoryData';

interface SubCategoryListProps {
  categoryId: string;
  subCategories: SubCategory[];
  type: 'service' | 'product';
}

const SubCategoryList: React.FC<SubCategoryListProps> = ({
  categoryId,
  subCategories,
  type
}) => {
  const navigate = useNavigate();
  const { language } = useApp();
  
  const handleClick = (slug: string) => {
    if (type === 'service') {
      navigate(`/services/category/${categoryId}/${slug}`);
    } else {
      navigate(`/shopping/category/${categoryId}/${slug}`);
    }
  };
  
  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">
          {language === 'bn' ? 'সাবক্যাটাগরি' : 'Subcategories'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {subCategories.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer transition-all"
              onClick={() => handleClick(sub.slug)}
            >
              {typeof sub.icon === 'string' && <span className="text-xl">{sub.icon}</span>}
              <div className="flex flex-col">
                <span className="text-xs font-medium">
                  {language === 'bn' ? sub.nameBN : sub.nameEN}
                </span>
                {sub.count !== undefined && (
                  <Badge variant="outline" className="text-[10px] mt-1 px-1 w-fit">
                    {sub.count}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubCategoryList;
