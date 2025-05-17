
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeatureSelectionHeaderProps {
  selectedCount: number;
  maxLimit: number;
}

export const FeatureSelectionHeader: React.FC<FeatureSelectionHeaderProps> = ({ 
  selectedCount, 
  maxLimit 
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="h-9 w-9 rounded-full button-pop"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">সার্ভিস নির্বাচন করুন</h1>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-700">
          আপনার পছন্দের সার্ভিসগুলো সিলেক্ট করুন। সর্বাধিক {maxLimit}টি সার্ভিস যোগ করতে পারবেন। বর্তমানে {selectedCount}টি সিলেক্ট করা আছে।
        </p>
      </div>
    </div>
  );
};
