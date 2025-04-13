
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Home, Building, Car, ShoppingBag, Camera, Briefcase, Globe } from 'lucide-react';

interface RentalFeaturesProps {
  category: string;
  featureList: string[];
}

const RentalFeatures: React.FC<RentalFeaturesProps> = ({ category, featureList }) => {
  // Category-specific icon rendering
  const getCategoryIcon = () => {
    switch (category) {
      case 'apartment':
        return <Home className="h-5 w-5 text-primary" />;
      case 'office':
        return <Building className="h-5 w-5 text-primary" />;
      case 'car':
        return <Car className="h-5 w-5 text-primary" />;
      case 'equipment':
        return <Camera className="h-5 w-5 text-primary" />;
      case 'shop':
        return <ShoppingBag className="h-5 w-5 text-primary" />;
      case 'commercial':
        return <Briefcase className="h-5 w-5 text-primary" />;
      default:
        return <Globe className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          {getCategoryIcon()}
          <h3 className="text-lg font-medium capitalize">{category} বৈশিষ্ট্য</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {featureList.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RentalFeatures;
