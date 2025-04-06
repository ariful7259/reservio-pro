
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
          {[1, 2, 3, 4].map((provider) => (
            <ServiceProviderCard key={provider} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Index;
