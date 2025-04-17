
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceTabsProps {
  activeTab: string;
  onChange: (value: string) => void;
  totalServices: number;
  activeCount: number;
  pausedCount: number;
  draftCount: number;
  children: React.ReactNode;
}

const ServiceTabs: React.FC<ServiceTabsProps> = ({
  activeTab,
  onChange,
  totalServices,
  activeCount,
  pausedCount,
  draftCount,
  children
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={onChange}>
      <TabsList className={`${isMobile ? 'grid grid-cols-2 gap-2 mb-2' : ''}`}>
        <TabsTrigger value="all" className={isMobile ? 'text-xs py-1' : ''}>
          সব সার্ভিস ({totalServices})
        </TabsTrigger>
        <TabsTrigger value="active" className={isMobile ? 'text-xs py-1' : ''}>
          অ্যাকটিভ ({activeCount})
        </TabsTrigger>
        <TabsTrigger value="paused" className={isMobile ? 'text-xs py-1' : ''}>
          পজ করা ({pausedCount})
        </TabsTrigger>
        <TabsTrigger value="draft" className={isMobile ? 'text-xs py-1' : ''}>
          ড্রাফট ({draftCount})
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-4">
        {children}
      </div>
    </Tabs>
  );
};

export default ServiceTabs;
