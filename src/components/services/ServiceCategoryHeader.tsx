
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ServiceCategoryHeaderProps {
  title: string;
  itemCount: number;
}

const ServiceCategoryHeader: React.FC<ServiceCategoryHeaderProps> = ({
  title,
  itemCount
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/services')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          <span>{itemCount} সেবা পাওয়া গেছে</span>
        </div>
      </div>
    </>
  );
};

export default ServiceCategoryHeader;
