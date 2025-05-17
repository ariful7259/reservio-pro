
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const StoreFeaturesList: React.FC = () => {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">অনলাইন স্টোর ফিচারস</h2>
      <div className="mt-6">
        <Link to="/create-store/new">
          <Button size="lg">আপনার স্টোর তৈরি করুন</Button>
        </Link>
      </div>
    </div>
  );
};

export default StoreFeaturesList;
