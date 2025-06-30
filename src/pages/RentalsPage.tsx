
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import RentalCategoriesShowcase from '@/components/rental/RentalCategoriesShowcase';

const RentalsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container pt-20 pb-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">রেন্ট সেকশন</h1>
          <p className="text-muted-foreground mb-6">আপনার প্রয়োজনীয় যেকোনো জিনিস ভাড়া নিন</p>
          <Button onClick={() => navigate('/rental-categories')}>
            বিস্তারিত ক্যাটাগরি দেখুন
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <RentalCategoriesShowcase />
      </div>
    </div>
  );
};

export default RentalsPage;
