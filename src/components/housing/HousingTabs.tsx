
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

interface HousingTabsProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
  language: 'bn' | 'en';
}

const HousingTabs: React.FC<HousingTabsProps> = ({ 
  children, 
  activeTab = 'all',
  onTabChange,
  language 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className={`w-full bg-secondary/50 mb-4 ${isMobile ? 'grid grid-cols-4' : ''}`}>
        <TabsTrigger value="all" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'সব' : 'All'}
        </TabsTrigger>
        <TabsTrigger value="flat" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'ফ্ল্যাট' : 'Flat'}
        </TabsTrigger>
        <TabsTrigger value="house" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'বাড়ি' : 'House'}
        </TabsTrigger>
        <TabsTrigger value="room" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'রুম' : 'Room'}
        </TabsTrigger>
      </TabsList>

      {children}
    </Tabs>
  );
};

export default HousingTabs;
