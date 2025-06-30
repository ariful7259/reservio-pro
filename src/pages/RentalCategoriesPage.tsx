
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import RentalCategoriesShowcase from '@/components/rental/RentalCategoriesShowcase';

const RentalCategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container pt-20 pb-10">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <ChevronLeft className="h-4 w-4 mr-1" /> হোমে ফিরুন
          </Button>
        </div>
        
        <RentalCategoriesShowcase />
      </div>
    </div>
  );
};

export default RentalCategoriesPage;
