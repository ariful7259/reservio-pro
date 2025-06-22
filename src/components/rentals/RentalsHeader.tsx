
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, LayoutGrid, Map as MapIcon } from 'lucide-react';

interface RentalsHeaderProps {
  viewMode: 'grid' | 'map';
  setViewMode: (mode: 'grid' | 'map') => void;
  toggleFilter: () => void;
}

const RentalsHeader: React.FC<RentalsHeaderProps> = ({
  viewMode,
  setViewMode,
  toggleFilter
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">রেন্ট</h1>
      <div className="flex gap-2">
        <Tabs value={viewMode} onValueChange={value => setViewMode(value as 'grid' | 'map')} className="w-[180px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grid" className="flex items-center gap-1">
              <LayoutGrid className="h-4 w-4" /> গ্রিড
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-1">
              <MapIcon className="h-4 w-4" /> মানচিত্র
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="icon" onClick={toggleFilter}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RentalsHeader;
