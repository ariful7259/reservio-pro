import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExploreSection from '@/components/ExploreSection';
import ServiceProviderCard from '@/components/ServiceProviderCard';
import { Badge } from '@/components/ui/badge';
import SmartSearch from '@/components/SmartSearch';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';
import PersonalizedRecommendations from '@/components/PersonalizedRecommendations';
import CustomizableHomeScreen from '@/components/CustomizableHomeScreen';
import OfflineModeManager from '@/components/OfflineModeManager';
import { Button } from '@/components/ui/button';
import { Settings, BarChart2 } from 'lucide-react';

function Index() {
  const navigate = useNavigate();
  const { language } = useApp();
  const { isAuthenticated } = useAuth();
  
  // Mock service provider data with safe defaults
  const mockServiceProviders = [
    {
      id: "sp1",
      name: language === 'bn' ? "রহিম মিস্ত্রি" : "Rahim Mistri",
      specialty: language === 'bn' ? "প্লাম্বিং সার্ভিসেস" : "Plumbing Services",
      imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      reviewCount: 124,
      availability: language === 'bn' ? "আজ উপলব্ধ" : "Available today"
    },
    {
      id: "sp2",
      name: language === 'bn' ? "করিম আলি" : "Karim Ali",
      specialty: language === 'bn' ? "ইলেক্ট্রিশিয়ান" : "Electrician",
      imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 4.5,
      reviewCount: 98,
      availability: language === 'bn' ? "কাল উপলব্ধ" : "Available tomorrow"
    },
    {
      id: "sp3",
      name: language === 'bn' ? "সালমা বেগম" : "Salma Begum",
      specialty: language === 'bn' ? "হোম ক্লিনিং" : "Home Cleaning",
      imageUrl: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 4.9,
      reviewCount: 156,
      availability: language === 'bn' ? "আজ উপলব্ধ" : "Available today"
    },
    {
      id: "sp4",
      name: language === 'bn' ? "আমির খান" : "Amir Khan",
      specialty: language === 'bn' ? "পেইন্টিং সার্ভিস" : "Painting Service",
      imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 4.3,
      reviewCount: 78,
      availability: language === 'bn' ? "৩ দিন পরে উপলব্ধ" : "Available in 3 days"
    }
  ];

  const handleServiceProviderClick = (id: string) => {
    navigate(`/services/${id}`);
  };
  
  return (
    <div className="container pb-20 pt-16">
      <div className="px-4 mb-6">
        <SmartSearch />
        
        {isAuthenticated && (
          <div className="flex gap-2 mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => navigate('/customized-home')}
            >
              <Settings className="h-4 w-4 mr-1" />
              {language === 'bn' ? 'কাস্টমাইজ' : 'Customize'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => navigate('/analytics')}
            >
              <BarChart2 className="h-4 w-4 mr-1" />
              {language === 'bn' ? 'অ্যানালিটিকস' : 'Analytics'}
            </Button>
          </div>
        )}
      </div>
      
      {isAuthenticated ? (
        <div className="px-4">
          <CustomizableHomeScreen />
          <OfflineModeManager />
          <PersonalizedRecommendations />
        </div>
      ) : (
        <ExploreSection />
      )}

      <div className="px-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          {language === 'bn' ? 'সার্ভিস প্রোভাইডারস' : 'Service Providers'}
        </h2>
        <div className="mb-4 flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          <Badge variant="secondary" className="rounded-full px-4 py-1 cursor-pointer whitespace-nowrap">
            {language === 'bn' ? 'সকল' : 'All'}
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 cursor-pointer whitespace-nowrap">
            {language === 'bn' ? 'শীর্ষ রেটেড' : 'Top Rated'}
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 cursor-pointer whitespace-nowrap">
            {language === 'bn' ? 'সাম্প্রতিক' : 'Recent'}
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 cursor-pointer whitespace-nowrap">
            {language === 'bn' ? 'জনপ্রিয়' : 'Popular'}
          </Badge>
          <Badge variant="outline" className="rounded-full px-4 py-1 cursor-pointer whitespace-nowrap">
            {language === 'bn' ? 'কাছাকাছি' : 'Nearby'}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockServiceProviders.map((provider) => (
            <ServiceProviderCard 
              key={provider.id}
              id={provider.id}
              name={provider.name}
              specialty={provider.specialty}
              imageUrl={provider.imageUrl}
              rating={provider.rating}
              reviewCount={provider.reviewCount}
              availability={provider.availability}
              onClick={handleServiceProviderClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
