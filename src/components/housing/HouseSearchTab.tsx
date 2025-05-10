
import React, { useState } from 'react';
import PropertyCard from '@/components/housing/PropertyCard';
import SearchFilter from '@/components/housing/SearchFilter';
import { sampleProperties } from '@/data/property-data';
import { useIsMobile } from '@/hooks/use-mobile';

interface HouseSearchTabProps {
  language: 'bn' | 'en';
}

const HouseSearchTab: React.FC<HouseSearchTabProps> = ({ language }) => {
  const isMobile = useIsMobile();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [budget, setBudget] = useState('all');

  const handleSearch = () => {
    // Implement actual search functionality
    console.log('Searching with filters:', { location, propertyType, budget });
  };

  // Filter featured properties for the special offers section
  const featuredProperties = sampleProperties.filter(property => property.featured);
  
  return (
    <div>
      {/* Search Filter Section */}
      <SearchFilter
        location={location}
        propertyType={propertyType}
        budget={budget}
        onLocationChange={setLocation}
        onPropertyTypeChange={setPropertyType}
        onBudgetChange={setBudget}
        onSearch={handleSearch}
        language={language}
      />

      {/* Special Offers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{language === 'bn' ? "বিশেষ প্রস্তাব" : "Special Offers"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              language={language} 
              featured={true} 
            />
          ))}
        </div>
      </div>

      {/* All Properties Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{language === 'bn' ? "সব সম্পত্তি" : "All Properties"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              language={language} 
              featured={false} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseSearchTab;
