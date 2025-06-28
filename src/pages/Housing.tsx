
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
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
      type: 'apartment',
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
      title: 'সুন্দর সিঙ্গেল রুম ভাড়া হবে',
      location: 'মিরপুর, ঢাকা',
      price: 8000,
      bedrooms: 1,
      bathrooms: 1,
      area: 250,
      image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'single',
      isAvailable: true,
    },
    {
      id: '4',
      title: 'নিউ মার্কেট এলাকায় শেয়ার্ড রুম',
      location: 'নিউ মার্কেট, ঢাকা',
      price: 6000,
      bedrooms: 1,
      bathrooms: 1,
      area: 200,
      image: 'https://images.unsplash.com/photo-1523688471150-efdd09f0f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'shared',
      isAvailable: true,
    },
    {
      id: '5',
      title: 'ছাত্রদের জন্য আদর্শ মেস',
      location: 'শাহবাগ, ঢাকা',
      price: 7500,
      bedrooms: 1,
      bathrooms: 1,
      area: 180,
      image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'mess',
      isAvailable: true,
    },
    {
      id: '6',
      title: 'ছাত্রী হোস্টেল - সকল সুবিধা সম্পন্ন',
      location: 'ধানমন্ডি, ঢাকা',
      price: 9000,
      bedrooms: 1,
      bathrooms: 1,
      area: 200,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'hostel',
      isAvailable: true,
    },
    {
      id: '7',
      title: 'মডার্ন ফ্ল্যাট - আরামদায়ক জীবনযাপন',
      location: 'মোহাম্মদপুর, ঢাকা',
      price: 18000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      image: 'https://images.unsplash.com/photo-1534595038511-9f219fe0c979?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'flat',
      isAvailable: true,
    },
    {
      id: '8',
      title: 'আধুনিক বাড়ি ঢাকা শহরে',
      location: 'বনানী, ঢাকা',
      price: 45000,
      bedrooms: 5,
      bathrooms: 3,
      area: 2500,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200&q=80',
      type: 'house',
      isAvailable: true,
    }
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
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          {language === 'bn' ? 'হাউজিং' : 'Housing'}
        </h1>
        <Link to="/basa-bari">
          <Button variant="outline" className="flex items-center gap-1">
            {language === 'bn' ? 'বাসা বাড়ি এপ্লিকেশন' : 'BasaBari App'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
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
        
        <TabsContent value="house">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'house')} 
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
        
        <TabsContent value="apartment">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'apartment')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>

        <TabsContent value="mess">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'mess')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="hostel">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'hostel')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="single">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'single')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
        
        <TabsContent value="shared">
          <HousingList 
            listings={housingListings.filter(listing => listing.type === 'shared')} 
            handleToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            language={language}
          />
        </TabsContent>
      </HousingTabs>
    </div>
  );
};

export default Housing;
