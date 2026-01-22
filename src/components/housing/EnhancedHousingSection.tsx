
import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, Grid3X3, MapIcon, TrendingUp } from 'lucide-react';
import AdvancedSearchFilter from './AdvancedSearchFilter';
import EnhancedPropertyCard from './EnhancedPropertyCard';
import { enhancedProperties, EnhancedProperty } from '@/data/enhanced-property-data';
import { useToast } from '@/hooks/use-toast';

interface SearchFilters {
  location: string;
  propertyType: string;
  budget: string;
  furnishing: string;
  amenities: string[];
  priceRange: [number, number];
  bedrooms: string;
  keywords: string;
}

interface EnhancedHousingSectionProps {
  language: 'bn' | 'en';
}

const EnhancedHousingSection: React.FC<EnhancedHousingSectionProps> = ({ language }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    propertyType: 'all',
    budget: 'all',
    furnishing: 'all',
    amenities: [],
    priceRange: [5000, 50000],
    bedrooms: 'all',
    keywords: ''
  });

  const handleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    toast({
      title: "ফিল্টার প্রয়োগ করা হয়েছে",
      description: "নতুন ফিল্টার অনুযায়ী ফলাফল দেখানো হচ্ছে"
    });
  };

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    let filtered = enhancedProperties;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(property => property.type === activeTab);
    }

    // Filter by location
    if (searchFilters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    // Filter by property type
    if (searchFilters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.type === searchFilters.propertyType);
    }

    // Filter by budget
    if (searchFilters.budget !== 'all') {
      const [min, max] = searchFilters.budget.split('-').map(Number);
      if (max) {
        filtered = filtered.filter(property => property.price >= min && property.price <= max);
      } else if (searchFilters.budget.includes('+')) {
        const minPrice = parseInt(searchFilters.budget.replace('+', ''));
        filtered = filtered.filter(property => property.price >= minPrice);
      } else {
        const maxPrice = parseInt(searchFilters.budget.replace('0-', ''));
        filtered = filtered.filter(property => property.price <= maxPrice);
      }
    }

    // Filter by furnishing
    if (searchFilters.furnishing !== 'all') {
      filtered = filtered.filter(property => property.furnishing === searchFilters.furnishing);
    }

    // Filter by bedrooms
    if (searchFilters.bedrooms !== 'all') {
      if (searchFilters.bedrooms.includes('+')) {
        const minBeds = parseInt(searchFilters.bedrooms.replace('+', ''));
        filtered = filtered.filter(property => property.bedrooms >= minBeds);
      } else {
        filtered = filtered.filter(property => property.bedrooms === parseInt(searchFilters.bedrooms));
      }
    }

    // Filter by price range
    filtered = filtered.filter(property => 
      property.price >= searchFilters.priceRange[0] && 
      property.price <= searchFilters.priceRange[1]
    );

    // Filter by amenities
    if (searchFilters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        searchFilters.amenities.every(amenity => property.amenities.includes(amenity))
      );
    }

    // Filter by keywords
    if (searchFilters.keywords) {
      const keywords = searchFilters.keywords.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(keywords) ||
        property.description.toLowerCase().includes(keywords) ||
        property.location.toLowerCase().includes(keywords) ||
        property.address.toLowerCase().includes(keywords)
      );
    }

    return filtered;
  }, [activeTab, searchFilters]);

  const featuredProperties = filteredProperties.filter(p => p.featured);
  const regularProperties = filteredProperties.filter(p => !p.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {language === 'bn' ? 'বাসা বাড়ি' : 'Housing'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'bn' 
              ? `${filteredProperties.length}টি সম্পত্তি পাওয়া গেছে`
              : `${filteredProperties.length} properties found`}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Advanced Search */}
      <AdvancedSearchFilter 
        onSearch={handleSearch}
        language={language}
      />

      {/* Property Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full bg-secondary/50 flex-wrap justify-start">
          <TabsTrigger value="all" className="flex items-center gap-2">
            সব ধরন
            <Badge variant="secondary" className="text-xs">
              {enhancedProperties.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="apartment" className="flex items-center gap-2">
            অ্যাপার্টমেন্ট
            <Badge variant="secondary" className="text-xs">
              {enhancedProperties.filter(p => p.type === 'apartment').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="house" className="flex items-center gap-2">
            বাসা/বাড়ি
            <Badge variant="secondary" className="text-xs">
              {enhancedProperties.filter(p => p.type === 'house').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="mess" className="flex items-center gap-2">
            মেস
            <Badge variant="secondary" className="text-xs">
              {enhancedProperties.filter(p => p.type === 'mess').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="single" className="flex items-center gap-2">
            সিঙ্গেল রুম
            <Badge variant="secondary" className="text-xs">
              {enhancedProperties.filter(p => p.type === 'single').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex items-center gap-2">
            শেয়ারড
            <Badge variant="secondary" className="text-xs">
              {enhancedProperties.filter(p => p.type === 'shared').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="hostel" className="flex items-center gap-2">
            হোস্টেল
            <Badge variant="secondary" className="text-xs">
              {enhancedProperties.filter(p => p.type === 'hostel').length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Featured Properties */}
          {featuredProperties.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">বিশেষ প্রস্তাব</h2>
                <Badge className="bg-primary/10 text-primary">
                  {featuredProperties.length}টি
                </Badge>
              </div>
              
               <div className={`grid gap-4 ${
                 viewMode === 'grid' 
                   ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3' 
                   : 'grid-cols-1'
               }`}>
                {featuredProperties.map(property => (
                  <EnhancedPropertyCard
                    key={property.id}
                    property={property}
                    language={language}
                    onFavorite={handleFavorite}
                    isFavorite={favorites.includes(property.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Regular Properties */}
          {regularProperties.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">সব সম্পত্তি</h2>
                <span className="text-sm text-muted-foreground">
                  {regularProperties.length}টি সম্পত্তি
                </span>
              </div>
              
               <div className={`grid gap-4 ${
                 viewMode === 'grid' 
                   ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3' 
                   : 'grid-cols-1'
               }`}>
                {regularProperties.map(property => (
                  <EnhancedPropertyCard
                    key={property.id}
                    property={property}
                    language={language}
                    onFavorite={handleFavorite}
                    isFavorite={favorites.includes(property.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-lg font-medium mb-2">কোন সম্পত্তি পাওয়া যায়নি</h3>
              <p className="text-muted-foreground mb-4">
                আপনার ফিল্টার অনুযায়ী কোন সম্পত্তি খুঁজে পাওয়া যায়নি। 
                ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchFilters({
                  location: '',
                  propertyType: 'all',
                  budget: 'all',
                  furnishing: 'all',
                  amenities: [],
                  priceRange: [5000, 50000],
                  bedrooms: 'all',
                  keywords: ''
                })}
              >
                সব ফিল্টার মুছুন
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedHousingSection;
