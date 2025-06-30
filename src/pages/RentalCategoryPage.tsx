
import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { useRentalCategory } from '@/hooks/useRentalCategory';
import RentalCategoryHeader from '@/components/rentals/RentalCategoryHeader';
import RentalCategoryFilterForm from '@/components/rentals/RentalCategoryFilterForm';
import SubcategoryFilters from '@/components/rentals/SubcategoryFilters';
import SortAndFilterControls from '@/components/rentals/SortAndFilterControls';
import RentalListingsGrid from '@/components/rentals/RentalListingsGrid';
import SocialShareModal from '@/components/SocialShareModal';
import EnhancedHousingSection from '@/components/housing/EnhancedHousingSection';

const RentalCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { language } = useApp();
  
  const {
    category,
    sortBy,
    selectedSubcategory,
    selectedLocation,
    priceRange,
    shareItem,
    showShareModal,
    setSelectedSubcategory,
    setSelectedLocation,
    setPriceRange,
    setShowShareModal,
    handleListingClick,
    handleBookmark,
    handleShare,
    handleSortChange,
    handleBookNow
  } = useRentalCategory(categoryId);

  if (!category) {
    return null;
  }

  // Check if this is a housing category
  const isHousingCategory = categoryId && ['apartment', 'house', 'hostel', 'room', 'commercial', 'guesthouse', 'rural', 'studio', 'housing', 'বাসা-বাড়ি'].includes(categoryId);

  // If it's housing category, show enhanced housing section
  if (isHousingCategory) {
    return (
      <div className="container px-4 pt-20 pb-20">
        <RentalCategoryHeader title="বাসা বাড়ি" />
        <EnhancedHousingSection language={language} />
      </div>
    );
  }

  // Check if category has items property
  const hasItems = 'items' in category;
  const categoryItems = hasItems ? category.items : [];

  // Filter items based on selected subcategory
  const filteredItems = selectedSubcategory === 'all' 
    ? categoryItems 
    : categoryItems.filter(item => {
        const subcategoryName = category.subcategories?.find(sub => sub.id === selectedSubcategory)?.name;
        return subcategoryName && item.title.includes(subcategoryName);
      });

  return (
    <div className="container px-4 pt-20 pb-20">
      <RentalCategoryHeader title={category.title} />
      
      {/* Rental Category Filter Form - Only show for non-housing categories */}
      <RentalCategoryFilterForm
        category={category}
        selectedSubcategory={selectedSubcategory}
        selectedLocation={selectedLocation}
        priceRange={priceRange}
        onSubcategoryChange={setSelectedSubcategory}
        onLocationChange={setSelectedLocation}
        onPriceRangeChange={setPriceRange}
      />
      
      {/* Subcategory Filter */}
      <SubcategoryFilters
        subcategories={category.subcategories}
        selectedSubcategory={selectedSubcategory}
        onSubcategoryChange={setSelectedSubcategory}
      />
      
      {/* Sort and Filter Controls */}
      <SortAndFilterControls
        sortBy={sortBy}
        onSortChange={handleSortChange}
        itemCount={filteredItems.length}
      />
      
      {/* Rental Listings Grid */}
      <RentalListingsGrid
        listings={filteredItems}
        onListingClick={handleListingClick}
        onBookmark={handleBookmark}
        onShare={handleShare}
        onBookNow={handleBookNow}
      />
      
      {/* Social Share Modal */}
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

export default RentalCategoryPage;
