
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { categoryData } from '@/data/rentalCategoryData';

export const useRentalCategory = (categoryId: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [shareItem, setShareItem] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  // ক্যাটাগরি ডেটা লোড করা
  const category = categoryId && categoryData[categoryId as keyof typeof categoryData];
  
  useEffect(() => {
    console.log("Current categoryId from URL:", categoryId);
    console.log("Available categories:", Object.keys(categoryData));
    console.log("Category found:", categoryId && categoryData[categoryId as keyof typeof categoryData] ? "Yes" : "No");
  }, [categoryId]);
  
  useEffect(() => {
    if (!categoryId) {
      toast({
        title: "ক্যাটাগরি আইডি পাওয়া যায়নি",
        description: "URL এ ক্যাটাগরি আইডি অনুপস্থিত। মূল পৃষ্ঠায় ফিরে যাচ্ছি।",
        variant: "destructive"
      });
      navigate('/rentals');
      return;
    }
    
    if (!category) {
      toast({
        title: "ক্যাটাগরি পাওয়া যায়নি",
        description: `দুঃখিত, "${categoryId}" ক্যাটাগরি পাওয়া যায়নি। মূল পৃষ্ঠায় ফিরে যাচ্ছি।`,
        variant: "destructive"
      });
      navigate('/rentals');
    }
  }, [category, categoryId, navigate, toast]);

  const handleListingClick = (id: number) => {
    console.log(`Navigating to rent details for item ID: ${id}`);
    navigate(`/rent-details/${id}`);
  };

  const handleBookmark = (e: React.MouseEvent, rentalId: number) => {
    e.stopPropagation();
    toast({
      title: "সংরক্ষিত হয়েছে",
      description: "রেন্টাল আইটেমটি আপনার পছন্দের তালিকায় যোগ করা হয়েছে",
    });
  };

  const handleShare = (e: React.MouseEvent, rental: any) => {
    e.stopPropagation();
    setShareItem({
      ...rental,
      type: 'rental',
    });
    setShowShareModal(true);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleBookNow = (e: React.MouseEvent, rentalId: number) => {
    e.stopPropagation();
    console.log(`Booking now for item ID: ${rentalId}`);
    navigate(`/rent-details/${rentalId}`);
  };

  return {
    category,
    sortBy,
    selectedSubcategory,
    selectedLocation,
    priceRange,
    shareItem,
    showShareModal,
    setSortBy,
    setSelectedSubcategory,
    setSelectedLocation,
    setPriceRange,
    setShareItem,
    setShowShareModal,
    handleListingClick,
    handleBookmark,
    handleShare,
    handleSortChange,
    handleBookNow
  };
};
