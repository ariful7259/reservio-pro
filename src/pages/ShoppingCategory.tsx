
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { productCategories } from '@/utils/categoryData';
import CategoryCard from '@/components/categories/CategoryCard';
import SubCategoryList from '@/components/categories/SubCategoryList';
import { Separator } from '@/components/ui/separator';
import ProductFilterSidebar from '@/components/product/ProductFilterSidebar';

const ShoppingCategory = () => {
  const { id, subCategoryId } = useParams();
  const { language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  
  useEffect(() => {
    if (id) {
      const category = productCategories.find(cat => cat.slug === id || cat.id === id);
      setSelectedCategory(category || null);
      
      if (subCategoryId && category) {
        const subCategory = category.subCategories?.find(
          sub => sub.slug === subCategoryId || sub.id === subCategoryId
        );
        setSelectedSubCategory(subCategory || null);
      } else {
        setSelectedSubCategory(null);
      }
    }
  }, [id, subCategoryId]);
  
  const handleFilterChange = (filters: any) => {
    console.log('Applied filters:', filters);
    // Implementation for filtering products
  };
  
  if (!selectedCategory) {
    return (
      <div className="container px-4 pt-20 pb-20">
        <h1 className="text-2xl font-bold mb-4">
          {language === 'bn' ? 'ক্যাটাগরি খুঁজে পাওয়া যায়নি' : 'Category Not Found'}
        </h1>
      </div>
    );
  }
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl font-bold mb-4">
        {language === 'bn' ? selectedCategory.nameBN : selectedCategory.nameEN}
      </h1>
      
      {!subCategoryId && selectedCategory.subCategories && (
        <SubCategoryList
          categoryId={selectedCategory.id}
          subCategories={selectedCategory.subCategories}
          type="product"
        />
      )}
      
      <Separator className="my-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ProductFilterSidebar 
            attributes={selectedCategory.attributes || []}
            priceRange={[0, 10000]}
            onFilterChange={handleFilterChange}
          />
        </div>
        
        <div className="md:col-span-3">
          <h2 className="text-lg font-medium mb-4">
            {selectedSubCategory 
              ? (language === 'bn' ? selectedSubCategory.nameBN : selectedSubCategory.nameEN)
              : (language === 'bn' ? 'জনপ্রিয় পণ্য' : 'Popular Products')
            }
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={num} className="border rounded-md p-4">
                <div className="aspect-square bg-gray-200 mb-3 rounded"></div>
                <h3 className="font-medium">
                  {language === 'bn' 
                    ? `${selectedCategory.nameBN} পণ্য ${num}` 
                    : `${selectedCategory.nameEN} Product ${num}`
                  }
                </h3>
                <p className="text-primary font-bold mt-1">৳{1500 + (num * 500)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCategory;
