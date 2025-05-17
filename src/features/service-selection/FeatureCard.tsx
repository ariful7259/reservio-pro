
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
      className={`relative border rounded-lg p-4 transition-all ${
        isSelected ? 'border-primary bg-primary/5' : 'hover:border-gray-300'
      }`}
      onClick={() => onToggle(feature.id)}
    >
      <div className="flex flex-col items-center text-center gap-2">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
          {feature.icon}
        </div>
        <h3 className="font-medium">{feature.name}</h3>
        <p className="text-xs text-muted-foreground">{feature.description}</p>
      </div>
      
      {isSelected && (
        <div className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </div>
  );
};
