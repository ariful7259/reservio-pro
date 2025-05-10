
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
      <TabsList className={`w-full bg-secondary/50 mb-4 flex-wrap ${isMobile ? 'grid grid-cols-2 gap-1' : ''}`}>
        <TabsTrigger value="all" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'সব' : 'All'}
        </TabsTrigger>
        <TabsTrigger value="flat" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'ফ্ল্যাট' : 'Flat'}
        </TabsTrigger>
        <TabsTrigger value="apartment" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'অ্যাপার্টমেন্ট' : 'Apartment'}
        </TabsTrigger>
        <TabsTrigger value="mess" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'মেস' : 'Mess'}
        </TabsTrigger>
        <TabsTrigger value="hostel" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'হোস্টেল' : 'Hostel'}
        </TabsTrigger>
        <TabsTrigger value="single" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'সিঙ্গেল রুম' : 'Single Room'}
        </TabsTrigger>
        <TabsTrigger value="shared" className={`flex-1 ${isMobile ? 'text-xs py-1' : ''}`}>
          {language === 'bn' ? 'শেয়ার্ড রুম' : 'Shared Room'}
        </TabsTrigger>
      </TabsList>

      {children}
    </Tabs>
  );
};

export default HousingTabs;
