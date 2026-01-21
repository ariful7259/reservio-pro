import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DistanceBadgeProps {
  distanceKm: number;
  className?: string;
  showIcon?: boolean;
}

const DistanceBadge: React.FC<DistanceBadgeProps> = ({
  distanceKm,
  className,
  showIcon = true,
}) => {
  const getDistanceLabel = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)} মিটার`;
    }
    return `${distance.toFixed(1)} কিমি`;
  };

  const getDistanceColor = (distance: number): string => {
    if (distance < 2) return 'bg-green-100 text-green-700 hover:bg-green-100';
    if (distance < 5) return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
    if (distance < 10) return 'bg-orange-100 text-orange-700 hover:bg-orange-100';
    return 'bg-red-100 text-red-700 hover:bg-red-100';
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        'text-xs font-medium',
        getDistanceColor(distanceKm),
        className
      )}
    >
      {showIcon && <MapPin className="h-3 w-3 mr-1" />}
      {getDistanceLabel(distanceKm)}
    </Badge>
  );
};

export default DistanceBadge;
