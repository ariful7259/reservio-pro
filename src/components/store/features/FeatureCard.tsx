
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Feature } from './featureData';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const IconComponent = feature.icon;
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md border", 
      feature.isPremium 
        ? "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50" 
        : "border-gray-200 bg-white"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-full flex-shrink-0",
            feature.isPremium 
              ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white" 
              : "bg-primary/10 text-primary"
          )}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{feature.emoji}</span>
              <h3 className="font-semibold text-sm">{feature.title}</h3>
              {feature.isPremium && (
                <Badge variant="outline" className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-amber-300 text-xs px-2 py-0.5 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  প্রিমিয়াম
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
