
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RentalCategoryItem from './RentalCategoryItem';

interface CategoryGridProps {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryPath: string) => {
    // Extract category ID from path and navigate to rental category page
    const categoryId = categoryPath.split('/').pop();
    if (categoryId) {
      navigate(`/rental-category/${categoryId}`);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <RentalCategoryItem
          key={index}
          category={category}
          onClick={() => handleCategoryClick(category.path)}
          isSelected={selectedCategory === category.path}
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
