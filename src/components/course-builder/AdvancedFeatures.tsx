
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface AdvancedOption {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface AdvancedFeaturesProps {
  advancedOptions: AdvancedOption[];
  handleToggleAdvancedOption: (optionId: string) => void;
}

export const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({ 
  advancedOptions, 
  handleToggleAdvancedOption 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>অ্যাডভান্সড ফিচার</CardTitle>
        <CardDescription>অ্যাডভান্সড ফিচার এবং সেটিংস কনফিগার করুন</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {advancedOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <h4 className="font-medium">{option.name}</h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              <Switch 
                id={option.id} 
                checked={option.enabled} 
                onCheckedChange={() => handleToggleAdvancedOption(option.id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
