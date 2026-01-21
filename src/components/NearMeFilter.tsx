import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { MapPin, Navigation, Loader2, X } from 'lucide-react';
import SavedLocationsList from './SavedLocationsList';

interface NearMeFilterProps {
  isActive: boolean;
  isLoading: boolean;
  radius: number;
  itemCount?: number;
  onToggle: () => void;
  onRadiusChange: (radius: number) => void;
  onClose?: () => void;
  onSelectSavedLocation?: (latitude: number, longitude: number) => void;
}

const NearMeFilter: React.FC<NearMeFilterProps> = ({
  isActive,
  isLoading,
  radius,
  itemCount,
  onToggle,
  onRadiusChange,
  onClose,
  onSelectSavedLocation,
}) => {
  const handleSelectSavedLocation = (lat: number, lng: number) => {
    if (onSelectSavedLocation) {
      onSelectSavedLocation(lat, lng);
    }
  };

  return (
    <Card className="mb-4 border-primary/20 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">আপনার কাছে</span>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {!isActive ? (
          <div className="space-y-4">
            <Button
              onClick={onToggle}
              disabled={isLoading}
              className="w-full"
              variant="outline"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  লোকেশন খোঁজা হচ্ছে...
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4 mr-2" />
                  বর্তমান লোকেশন ব্যবহার করুন
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-primary/5 px-2 text-muted-foreground">অথবা</span>
              </div>
            </div>

            <SavedLocationsList 
              onSelectLocation={handleSelectSavedLocation}
              compact
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">রেডিয়াস</span>
                <span className="text-sm font-medium">{radius} কিমি</span>
              </div>
              <Slider
                value={[radius]}
                min={1}
                max={20}
                step={1}
                onValueChange={([value]) => onRadiusChange(value)}
              />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>১ কিমি</span>
                <span>১০ কিমি</span>
                <span>২০ কিমি</span>
              </div>
            </div>

            {itemCount !== undefined && (
              <div className="text-center py-2 bg-background rounded-md">
                <span className="text-sm">
                  <span className="font-bold text-primary">{itemCount}</span>টি আইটেম পাওয়া গেছে
                </span>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-primary/5 px-2 text-muted-foreground">সেভড লোকেশন</span>
              </div>
            </div>

            <SavedLocationsList 
              onSelectLocation={handleSelectSavedLocation}
              compact
            />

            <Button
              variant="outline"
              size="sm"
              onClick={onToggle}
              className="w-full"
            >
              Near Me বন্ধ করুন
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearMeFilter;
