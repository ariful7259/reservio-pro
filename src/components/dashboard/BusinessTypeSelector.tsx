
import React from 'react';
import { Button } from '@/components/ui/button';

interface BusinessType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface BusinessTypeSelectorProps {
  businessTypes: BusinessType[];
  activeType: string | null;
  onChange: (id: string | null) => void;
}

const BusinessTypeSelector = ({ 
  businessTypes, 
  activeType, 
  onChange 
}: BusinessTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button 
        variant={activeType === null ? "default" : "outline"}
        className="flex items-center gap-2"
        onClick={() => onChange(null)}
      >
        সকল ব্যবসা
      </Button>
      
      {businessTypes.map((type) => (
        <Button
          key={type.id}
          variant={activeType === type.id ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => onChange(type.id)}
        >
          {type.icon}
          {type.name}
        </Button>
      ))}
    </div>
  );
};

export default BusinessTypeSelector;
