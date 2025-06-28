
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/context/AppContext';

// Data imports
import { rentCategories } from '@/data/rentalCategoriesData';
import { featuredListings, bannerImages, generateMockResults } from '@/data/rentalMockData';

// Component imports
import MapView from '@/components/MapView';
import SocialShareModal from '@/components/SocialShareModal';
import EnhancedHousingSection from '@/components/housing/EnhancedHousingSection';
import CategoryGrid from '@/components/rentals/CategoryGrid';
import BannerCarousel from '@/components/rentals/BannerCarousel';
import FeaturedListings from '@/components/rentals/FeaturedListings';
import FilterSection from '@/components/rentals/FilterSection';
import SectionToggle from '@/components/rentals/SectionToggle';
import CategoryModal from '@/components/rentals/CategoryModal';
import SubcategoryResults from '@/components/rentals/SubcategoryResults';
import RentalsHeader from '@/components/rentals/RentalsHeader';
import RentalCategoryItem from '@/components/rentals/RentalCategoryItem';

const Rentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useApp();

  // State
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeSection, setActiveSection] = useState<'categories' | 'housing'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any | null>(null);
  const [subcategoryResults, setSubcategoryResults] = useState<any[]>([]);

  // Handler functions
  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleListingClick = (id: number) => {
    navigate(`/rent-details/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, rentalId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "রেন্টাল আইটেমটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে"
    });
  };

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    setShareItem({
      ...rental,
      type: 'rental'
    });
    setShowShareModal(true);
  };

  const handleCategoryClick = (category: any) => {
    if (category.name === "বাসা বাড়ি") {
      setActiveSection('housing');
      toast({
        title: "বাসা বাড়ি সেকশন",
        description: "হাউজিং সেকশনে স্বাগতম! এখানে সব ধরনের বাসা বাড়ি দেখুন।"
      });
      return;
    }
    
    // Set selected category and show modal
    setSelectedCategory(category);
    setShowCategoryModal(true);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory: any) => {
    setSelectedSubcategory(subcategory);
    
    // Generate mock results based on subcategory
    const mockResults = generateMockResults(subcategory);
    setSubcategoryResults(mockResults);
    
    toast({
      title: subcategory.name,
      description: `${mockResults.length}টি আইটেম পাওয়া গেছে`
    });
  };

  const renderCategoryItem = (category: any, index: number) => {
    return (
      <RentalCategoryItem
        key={index}
        category={category}
        index={index}
        onCategoryClick={handleCategoryClick}
        onSubcategoryClick={handleSubcategorySelect}
      />
    );
  };

  return (
    <div className="container px-4 pt-20 pb-20">
      <RentalsHeader 
        viewMode={viewMode}
        setViewMode={setViewMode}
        toggleFilter={toggleFilter}
      />

      {/* Section Toggle */}
      <SectionToggle activeSection={activeSection} setActiveSection={setActiveSection} />

      {activeSection === 'housing' ? (
        <EnhancedHousingSection language={language || 'bn'} />
      ) : selectedSubcategory ? (
        <>
          <Button 
            variant="outline" 
            onClick={() => setSelectedSubcategory(null)}
            className="mb-4"
          >
            ← ক্যাটাগরিতে ফিরে যান
          </Button>
          <SubcategoryResults
            subcategory={selectedSubcategory}
            results={subcategoryResults}
            onItemClick={(item) => navigate(`/rent-details/${item.id}`)}
            onBookmark={handleBookmark}
            onShare={handleShare}
          />
        </>
      ) : (
        <>
          <FilterSection 
            filterVisible={filterVisible} 
            toggleFilter={toggleFilter}
            selectedCategory={selectedCategory}
            onSubcategorySelect={handleSubcategorySelect}
          />
          <CategoryGrid 
            rentCategories={rentCategories} 
            isExpanded={isExpanded} 
            setIsExpanded={setIsExpanded} 
            renderCategoryItem={renderCategoryItem} 
          />
          <BannerCarousel bannerImages={bannerImages} />
          <Separator className="my-6" />
          <FeaturedListings 
            featuredListings={featuredListings} 
            viewMode={viewMode} 
            handleListingClick={handleListingClick} 
            handleBookmark={handleBookmark} 
            handleShare={handleShare} 
            MapViewComponent={MapView} 
          />
          <div className="mb-6">
            <div className="flex justify-center mt-4">
              <Button variant="outline" className="flex items-center gap-1" onClick={() => navigate('/services')}>
                আরও দেখুন <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Category Modal */}
      <CategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        category={selectedCategory}
        onSubcategoryClick={handleSubcategorySelect}
      />

      {shareItem && (
        <SocialShareModal 
          open={showShareModal} 
          onOpenChange={setShowShareModal} 
          item={shareItem} 
        />
      )}
    </div>
  );
};

export default Rentals;
