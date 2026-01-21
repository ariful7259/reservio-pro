import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NearMeButtonProps {
  isActive: boolean;
  isLoading: boolean;
  onClick: () => void;
  className?: string;
  showLabel?: boolean;
}

const NearMeButton: React.FC<NearMeButtonProps> = ({
  isActive,
  isLoading,
  onClick,
  className,
  showLabel = true,
}) => {
  return (
    <Button
      variant={isActive ? 'default' : 'outline'}
      size={showLabel ? 'default' : 'icon'}
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        'transition-all duration-200',
        isActive && 'bg-primary text-primary-foreground',
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isActive ? (
        <Navigation className="h-4 w-4" />
      ) : (
        <MapPin className="h-4 w-4" />
      )}
      {showLabel && (
        <span className="ml-1">
          {isLoading ? 'খোঁজা হচ্ছে...' : isActive ? 'Near Me' : 'Near Me'}
        </span>
      )}
    </Button>
  );
};

export default NearMeButton;
