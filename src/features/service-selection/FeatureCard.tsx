
import React from 'react';
import { Check } from 'lucide-react';
import { Feature } from './types';

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  feature, 
  isSelected, 
  onToggle 
}) => {
  return (
    <div 
      className={`relative border rounded-lg transition-all cursor-pointer hover:shadow-md ${
        isSelected 
          ? 'border-primary bg-primary/5' 
          : 'hover:border-gray-300'
      }`}
      onClick={() => onToggle(feature.id)}
    >
      <div className="flex flex-col items-center text-center p-4">
        <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          {feature.icon}
        </div>
        <h3 className="font-medium mb-1">{feature.name}</h3>
        {feature.description && (
          <p className="text-xs text-muted-foreground">{feature.description}</p>
        )}
      </div>
      
      {isSelected && (
        <div className="absolute top-3 right-3 h-6 w-6 bg-primary rounded-full flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
};
