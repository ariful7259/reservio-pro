
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface RentalCategoryItemProps {
  category: any;
  index: number;
  onCategoryClick: (category: any) => void;
  onSubcategoryClick: (subcategory: any) => void;
}

// Category name mapping from Bengali to English IDs
const categoryNameToId: { [key: string]: string } = {
  'ইলেকট্রনিক্স': 'electronics',
  'পরিবহন': 'transport',
  'ইভেন্ট সামগ্রী': 'event',
  'ঘরোয়া সামগ্রী': 'home',
  'শিক্ষা সামগ্রী': 'education',
  'কৃষি যন্ত্রপাতি': 'agriculture',
  'ব্যবসায়িক সামগ্রী': 'business',
  'কারিগরি টুলস': 'tools',
  'অ্যাপার্টমেন্ট/ফ্ল্যাট': 'apartment',
  'বাসা/বাড়ি': 'house',
  'মেস/হোস্টেল': 'hostel',
  'সিঙ্গেল রুম/শেয়ারড': 'room',
  'কমার্শিয়াল স্পেস': 'commercial',
  'গেস্ট হাউস/স্বল্পমেয়াদী': 'guesthouse',
  'গ্রামীণ বাসস্থান': 'rural',
  'স্টুডিও/স্পেশাল স্পেস': 'studio',
  'বাসা বাড়ি': 'housing'
};

const RentalCategoryItem: React.FC<RentalCategoryItemProps> = ({
  category,
  index,
  onCategoryClick,
  onSubcategoryClick
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    // Generate proper category ID
    const categoryId = category.id || categoryNameToId[category.name] || category.name.toLowerCase().replace(/\s+/g, '-');
    console.log(`Navigating to category: ${category.name} -> ${categoryId}`);
    
    // Special handling for housing category
    if (category.name === 'বাসা বাড়ি' || categoryId === 'housing') {
      navigate(`/rental-category/housing`);
    } else {
      navigate(`/rental-category/${categoryId}`);
    }
  };

  if (category.isMainCategory && category.subcategories) {
    return (
      <div key={index}>
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div 
              className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer" 
              onClick={handleCategoryClick}
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {category.icon}
              </div>
              <span className="text-xs text-center mb-1">{category.name}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}টি
              </Badge>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {category.subcategories.map((sub: any, subIndex: number) => (
                <div 
                  key={subIndex} 
                  className="p-2 hover:bg-gray-50 rounded cursor-pointer text-center"
                  onClick={() => onSubcategoryClick(sub)}
                >
                  <div className="mb-1">{sub.icon}</div>
                  <span className="text-xs">{sub.name}</span>
                  <Badge variant="outline" className="text-xs ml-1">
                    {sub.count}
                  </Badge>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }

  if (category.subcategories) {
    return (
      <div key={index}>
        <div 
          className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
          onClick={handleCategoryClick}
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            {category.icon}
          </div>
          <span className="text-xs text-center mb-1">{category.name}</span>
          <Badge variant="secondary" className="text-xs">
            {category.count}টি
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div 
      key={index} 
      className="flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
      onClick={handleCategoryClick}
    >
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {category.icon}
      </div>
      <span className="text-xs text-center mb-1">{category.name}</span>
      <Badge variant="secondary" className="text-xs">
        {category.count}টি
      </Badge>
    </div>
  );
};

export default RentalCategoryItem;
