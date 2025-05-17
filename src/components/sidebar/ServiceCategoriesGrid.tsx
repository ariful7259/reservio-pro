
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import { serviceCategories } from './services/serviceData';
import { ServiceCategoryItem } from './services/ServiceCategoryItem';
import { CustomServiceItem } from './services/CustomServiceItem';
import { AddServiceButton } from './services/AddServiceButton';
import { CustomService } from './services/serviceTypes';

export const ServiceCategoriesGrid = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  
  // Load custom services from localStorage when component mounts
  useEffect(() => {
    const savedServices = localStorage.getItem('customServices');
    if (savedServices) {
      try {
        setCustomServices(JSON.parse(savedServices));
      } catch (error) {
        console.error('Error parsing stored services:', error);
      }
    }
  }, []);
  
  // Toggle category expansion
  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategory(prevExpanded => 
      prevExpanded === categoryName ? null : categoryName
    );
  };
  
  // Remove a custom service
  const handleRemoveCustomService = (id: string) => {
    const updatedServices = customServices.filter(service => service.id !== id);
    setCustomServices(updatedServices);
    localStorage.setItem('customServices', JSON.stringify(updatedServices));
    toast.info("সার্ভিস মুছে ফেলা হয়েছে");
  };
  
  // Display limited number of categories based on showAllCategories state
  const displayedCategories = useMemo(() => 
    showAllCategories ? serviceCategories : serviceCategories.slice(0, 4),
  [showAllCategories, serviceCategories]);
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">সার্ভিস ক্যাটাগরি</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Display service categories */}
        {displayedCategories.map((category, index) => (
          <ServiceCategoryItem 
            key={index}
            category={category}
            expandedCategory={expandedCategory}
            toggleCategoryExpansion={toggleCategoryExpansion}
          />
        ))}

        {/* Display custom services */}
        {customServices.map((service) => (
          <CustomServiceItem 
            key={service.id}
            service={service}
            onRemove={handleRemoveCustomService}
          />
        ))}

        {/* Add service button */}
        <AddServiceButton />
      </div>
      
      {/* Toggle to show more/less categories */}
      <Button 
        variant="ghost" 
        className="w-full flex items-center justify-center gap-1 text-primary hover:bg-blue-50"
        onClick={() => setShowAllCategories(!showAllCategories)}
      >
        {showAllCategories ? "কম দেখুন" : "আরও দেখুন"}
        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${showAllCategories ? 'rotate-90' : ''}`} />
      </Button>
    </div>
  );
};
