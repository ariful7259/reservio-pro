
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RentalCategoryHeaderProps {
  title: string;
}

const RentalCategoryHeader: React.FC<RentalCategoryHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 mb-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate('/rentals')}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default RentalCategoryHeader;
