
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
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-medium">সার্ভিস নির্বাচন করুন</h1>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        সর্বাধিক {maxLimit}টি সার্ভিস যোগ করতে পারবেন। বর্তমানে {selectedCount}টি সিলেক্ট করা আছে।
      </p>
    </>
  );
};
