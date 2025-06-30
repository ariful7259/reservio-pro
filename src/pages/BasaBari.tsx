
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useApp } from '@/context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import EnhancedHousingSection from '@/components/housing/EnhancedHousingSection';

const BasaBari = () => {
  const { language } = useApp();
  const isMobile = useIsMobile();
  const { category } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="container px-4 pt-20 pb-20">
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/rentals')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">বাসা বাড়ি</h1>
      </div>
      
      {/* Enhanced Housing Section with all features */}
      <EnhancedHousingSection language={language || 'bn'} />
    </div>
  );
};

export default BasaBari;
