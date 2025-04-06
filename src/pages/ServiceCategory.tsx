
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { serviceCategories } from '@/utils/categoryData';
import CategoryCard from '@/components/categories/CategoryCard';
import SubCategoryList from '@/components/categories/SubCategoryList';
import ServiceCard from '@/components/ServiceCard';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const ServiceCategory = () => {
  const { id, subCategoryId } = useParams();
  const { language } = useApp();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  
  useEffect(() => {
    if (id) {
      const category = serviceCategories.find(cat => cat.slug === id || cat.id === id);
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
          type="service"
        />
      )}
      
      <Separator className="my-6" />
      
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">
          {selectedSubCategory 
            ? (language === 'bn' ? selectedSubCategory.nameBN : selectedSubCategory.nameEN)
            : (language === 'bn' ? 'জনপ্রিয় সার্ভিস' : 'Popular Services')
          }
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(num => (
            <ServiceCard
              key={num}
              id={`${selectedCategory.id}-${num}`}
              title={language === 'bn' 
                ? `${selectedCategory.nameBN} সার্ভিস ${num}` 
                : `${selectedCategory.nameEN} Service ${num}`
              }
              image={`https://source.unsplash.com/random/300x200?${selectedCategory.nameEN.toLowerCase()},${num}`}
              price={1000 + (num * 500)}
              rating={4.5 + (num * 0.1 > 0.5 ? 0.1 : 0)}
              location={language === 'bn' ? 'ঢাকা' : 'Dhaka'}
              onClick={() => {
                toast({
                  title: language === 'bn' ? "সার্ভিস বুক করা হয়েছে" : "Service Booked",
                  description: language === 'bn' 
                    ? `আপনি ${selectedCategory.nameBN} সার্ভিস ${num} বুক করেছেন` 
                    : `You have booked ${selectedCategory.nameEN} Service ${num}`
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCategory;
