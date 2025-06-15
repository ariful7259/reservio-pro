
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useApp } from '@/context/AppContext';
import { useParams } from 'react-router-dom';
import EnhancedHousingSection from '@/components/housing/EnhancedHousingSection';

const BasaBari = () => {
  const { language } = useApp();
  const isMobile = useIsMobile();
  const { category } = useParams();
  
  return (
    <div className="container px-4 pt-20 pb-20">
      <EnhancedHousingSection language={language} />
    </div>
  );
};

export default BasaBari;
