
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

import { serviceCategories } from './services/serviceData';
import { ServiceCategoryItem } from './services/ServiceCategoryItem';
import { CustomServiceItem } from './services/CustomServiceItem';
import { CustomService } from './services/serviceTypes';
import { ServiceSelectionModal } from './services/ServiceSelectionModal';

export const ServiceCategoriesGrid = () => {
  const { language, t } = useApp();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [showModal, setShowModal] = useState(false);

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

  // Save custom services to localStorage when changed
  const saveCustomServices = (services: CustomService[]) => {
    setCustomServices(services);
    localStorage.setItem('customServices', JSON.stringify(services));
  }

  // Toggle category expansion
  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategory(prevExpanded => 
      prevExpanded === categoryName ? null : categoryName
    );
  };

  // Remove a custom service
  const handleRemoveCustomService = (id: string) => {
    const updatedServices = customServices.filter(service => service.id !== id);
    saveCustomServices(updatedServices);
    toast.info(language === 'bn' ? "সার্ভিস মুছে ফেলা হয়েছে" : "Service removed");
  };

  // Add a custom service (avoid duplicates, limit to 12 max)
  const handleAddCustomService = (service: CustomService) => {
    const exists = customServices.some(s => s.id === service.id);
    if (exists) {
      toast.error(language === 'bn' ? "এই সার্ভিস ইতিমধ্যে যোগ করা হয়েছে" : "This service has already been added");
      return;
    }
    if (customServices.length >= 12) {
      toast.error(language === 'bn' ? "সর্বাধিক ১২টি সার্ভিস যোগ করা যাবে" : "Maximum 12 services can be added");
      return;
    }
    const updated = [...customServices, service];
    saveCustomServices(updated);
    toast.success(language === 'bn' ? "নতুন সার্ভিস যোগ হয়েছে" : "New service added");
  };

  // Display limited number of categories based on showAllCategories state
  const displayedCategories = useMemo(() => 
    showAllCategories ? serviceCategories : serviceCategories.slice(0, 4),
  [showAllCategories, serviceCategories]);
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">
        {language === 'bn' ? 'সার্ভিস ক্যাটাগরি' : 'Service Categories'}
      </h3>
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

        {/* Add service button replaced by modal trigger */}
        <div className="flex flex-col">
          <button 
            onClick={() => setShowModal(true)}
            className="flex flex-col items-center justify-center p-2 border border-dashed rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors h-full min-h-[90px]"
          >
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
              +
            </div>
            <span className="text-xs font-medium text-center text-primary">
              {language === 'bn' ? 'সার্ভিস যোগ করুন' : 'Add Service'}
            </span>
          </button>
        </div>
      </div>
      
      {/* Toggle to show more/less categories */}
      <Button 
        variant="ghost" 
        className="w-full flex items-center justify-center gap-1 text-primary hover:bg-blue-50"
        onClick={() => setShowAllCategories(!showAllCategories)}
      >
        {showAllCategories 
          ? (language === 'bn' ? "কম দেখুন" : "Show Less")
          : (language === 'bn' ? "আরও দেখুন" : "Show More")
        }
        <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${showAllCategories ? 'rotate-90' : ''}`} />
      </Button>
      {/* Service select modal */}
      <ServiceSelectionModal
        open={showModal}
        onClose={() => setShowModal(false)}
        selectedServices={customServices}
        onAddService={handleAddCustomService}
        onRemoveService={handleRemoveCustomService}
      />
    </div>
  );
};
