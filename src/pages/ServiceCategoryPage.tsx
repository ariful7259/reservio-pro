
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import SocialShareModal from '@/components/SocialShareModal';
import ServiceCategoryHeader from '@/components/services/ServiceCategoryHeader';
import ServiceCategoryFilters from '@/components/services/ServiceCategoryFilters';
import ServiceCategoryList from '@/components/services/ServiceCategoryList';
import { serviceCategoryData } from '@/data/serviceCategoryData';

const ServiceCategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('recommended');
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const category = categoryId && serviceCategoryData[categoryId as keyof typeof serviceCategoryData];
  
  useEffect(() => {
    if (!categoryId) {
      toast({
        title: "ক্যাটাগরি আইডি পাওয়া যায়নি",
        description: "URL এ ক্যাটাগরি আইডি অনুপস্থিত। মূল পৃষ্ঠায় ফিরে যাচ্ছি।",
        variant: "destructive"
      });
      navigate('/services');
      return;
    }
    
    if (!category) {
      toast({
        title: "ক্যাটাগরি পাওয়া যায়নি",
        description: `দুঃখিত, "${categoryId}" ক্যাটাগরি পাওয়া যায়নি। মূল পৃষ্ঠায় ফিরে যাচ্ছি।`,
        variant: "destructive"
      });
      navigate('/services');
    }
  }, [category, categoryId, navigate, toast]);

  const handleShare = (e: React.MouseEvent, service: any) => {
    e.stopPropagation();
    setShareItem({
      ...service,
      type: 'service',
    });
    setShowShareModal(true);
  };

  if (!category) {
    return null;
  }

  return (
    <div className="container px-4 pt-20 pb-20">
      <ServiceCategoryHeader 
        title={category.title}
        itemCount={category.items.length}
      />

      <ServiceCategoryFilters
        categoryTitle={category.title}
        categoryId={categoryId}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedSubcategory={selectedSubcategory}
        selectedLocation={selectedLocation}
        priceRange={priceRange}
        onSubcategoryChange={setSelectedSubcategory}
        onLocationChange={setSelectedLocation}
        onPriceRangeChange={setPriceRange}
      />
      
      <ServiceCategoryList
        services={category.items}
        onShare={handleShare}
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

export default ServiceCategoryPage;
