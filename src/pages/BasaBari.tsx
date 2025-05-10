
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useApp } from '@/context/AppContext';
import { useParams } from 'react-router-dom';
import HouseSearchTab from '@/components/housing/HouseSearchTab';
import RoommateTab from '@/components/housing/RoommateTab';
import MessSeatTab from '@/components/housing/MessSeatTab';
import PropertyListingTab from '@/components/housing/PropertyListingTab';

const BasaBari = () => {
  const { language } = useApp();
  const isMobile = useIsMobile();
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState('house-search');
  
  // Set active tab based on URL parameter
  useEffect(() => {
    if (category) {
      switch (category) {
        case 'house':
          setActiveTab('house-search');
          break;
        case 'roommate':
          setActiveTab('roommate');
          break;
        case 'mess':
          setActiveTab('mess-seat');
          break;
        case 'property':
          setActiveTab('property-listing');
          break;
        default:
          setActiveTab('house-search');
      }
    }
  }, [category]);

  return (
    <div className="container px-4 pt-20 pb-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {language === 'bn' ? 'বাসা বাড়ি' : 'Housing'}
      </h1>
      
      <Tabs 
        defaultValue="house-search" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className={`w-full bg-secondary/50 mb-6 flex-wrap ${isMobile ? 'grid grid-cols-2 gap-1' : ''}`}>
          <TabsTrigger value="house-search" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
            {language === 'bn' ? 'বাড়ি খুঁজুন' : 'Find House'}
          </TabsTrigger>
          <TabsTrigger value="roommate" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
            {language === 'bn' ? 'রুমমেট' : 'Roommate'}
          </TabsTrigger>
          <TabsTrigger value="mess-seat" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
            {language === 'bn' ? 'মেস সীট' : 'Mess Seat'}
          </TabsTrigger>
          <TabsTrigger value="property-listing" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
            {language === 'bn' ? 'সম্পত্তি লিস্টিং' : 'Property Listing'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="house-search">
          <HouseSearchTab language={language} />
        </TabsContent>

        <TabsContent value="roommate">
          <RoommateTab language={language} />
        </TabsContent>

        <TabsContent value="mess-seat">
          <MessSeatTab language={language} />
        </TabsContent>

        <TabsContent value="property-listing">
          <PropertyListingTab language={language} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BasaBari;
