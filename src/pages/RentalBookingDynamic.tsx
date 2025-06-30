
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import DynamicRentalBookingForm from '@/components/rental/DynamicRentalBookingForm';
import { getRentalCategoryById } from '@/utils/rentalCategoriesData';

const RentalBookingDynamic = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { subcategory, itemData } = location.state || {};
  const category = categoryId ? getRentalCategoryById(categoryId) : null;

  if (!categoryId || !category) {
    return (
      <div className="container pt-20 pb-10">
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <h2 className="text-2xl font-bold">ক্যাটাগরি পাওয়া যায়নি</h2>
          <p className="text-muted-foreground">দয়া করে সঠিক ক্যাটাগরি নির্বাচন করুন।</p>
          <Button onClick={() => navigate('/rentals')}>রেন্টাল পেজে ফিরে যান</Button>
        </div>
      </div>
    );
  }

  const handleBookingSuccess = (bookingData: any) => {
    console.log('Booking successful:', bookingData);
    navigate('/rental-confirmation', {
      state: { booking: bookingData }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container pt-20 pb-10">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> পিছনে যান
          </Button>
          <h1 className="text-2xl font-bold">
            {category.name} - বুকিং
          </h1>
        </div>
        
        <DynamicRentalBookingForm
          categoryId={categoryId}
          subcategory={subcategory}
          itemData={itemData}
          onBookingSubmit={handleBookingSuccess}
        />
      </div>
    </div>
  );
};

export default RentalBookingDynamic;
