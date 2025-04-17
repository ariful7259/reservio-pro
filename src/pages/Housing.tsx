
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TabsContent } from '@/components/ui/tabs';
import OfflineIndicator from '@/components/housing/OfflineIndicator';
import HousingHeader from '@/components/housing/HousingHeader';
import HousingTabs from '@/components/housing/HousingTabs';
import HousingList from '@/components/housing/HousingList';

const Housing = () => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite, language, isOnline } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Sample housing listing data
  const housingListings = [
    {
      id: '1',
      title: 'সুন্দর আবাসিক অ্যাপার্টমেন্ট',
      location: 'গুলশান, ঢাকা',
      price: 20000,
      bedrooms: 3,
      bathrooms: 2,
      area: 1450,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'flat',
      isAvailable: true,
    },
    {
      id: '2',
      title: 'ফ্যামিলি হোম উত্তরা সেক্টর-১১',
      location: 'উত্তরা, ঢাকা',
      price: 35000,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'house',
      isAvailable: true,
    },
    {
      id: '3',
      title: 'বাণিজ্যিক স্পেস ক্যান্টনমেন্ট',
      location: 'মিরপুর, ঢাকা',
      price: 15000,
      bedrooms: 2,
      bathrooms: 1,
      area: 1000,
      image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'flat',
      isAvailable: true,
    },
  ];

  const handleToggleFavorite = (e: React.MouseEvent, listing: any) => {
    e.stopPropagation();
    
    if (isFavorite(listing.id)) {
      removeFromFavorites(listing.id);
    } else {
      addToFavorites({
        id: listing.id,
        type: 'housing',
        title: listing.title,
        image: listing.image,
        price: `${listing.price}/মাস`,
        location: listing.location
      });
    }
  };

  const handleFilterClick = () => {
    // TODO: Implement filter modal for mobile
    console.log("Open filter modal");
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <OfflineIndicator isOnline={isOnline} language={language} />
      
      <HousingHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterClick={handleFilterClick}
        language={language}
      />

      <HousingTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
      >
        <TabsContent value="all">
          <HousingList 
            listings={housingListings} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="flat">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'flat')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="house">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'house')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="room">
          <div className="text-center py-10 text-muted-foreground">
            {language === 'bn' ? 'কোনো রুম এখনো উপলব্ধ নেই' : 'No rooms available yet'}
          </div>
        </TabsContent>
      </HousingTabs>
    </div>
  );
};

export default Housing;
