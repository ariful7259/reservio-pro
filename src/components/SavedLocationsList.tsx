import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Home, 
  Building2, 
  MapPin, 
  Plus, 
  Trash2, 
  Navigation,
  Check,
  X
} from 'lucide-react';
import { useSavedLocations, SavedLocation } from '@/hooks/useSavedLocations';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SavedLocationsListProps {
  onSelectLocation: (latitude: number, longitude: number) => void;
  compact?: boolean;
}

const labelIcons = {
  home: Home,
  office: Building2,
  custom: MapPin,
};

const labelNames = {
  home: 'বাসা',
  office: 'অফিস',
  custom: 'অন্যান্য',
};

const SavedLocationsList: React.FC<SavedLocationsListProps> = ({
  onSelectLocation,
  compact = false,
}) => {
  const { savedLocations, addLocation, removeLocation, saveCurrentLocation } = useSavedLocations();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLabel, setNewLabel] = useState<SavedLocation['label']>('home');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddLocation = async () => {
    if (!newName.trim()) return;
    
    setIsSaving(true);
    const success = await saveCurrentLocation(newName.trim(), newLabel);
    setIsSaving(false);
    
    if (success) {
      setNewName('');
      setNewLabel('home');
      setIsAddingNew(false);
    }
  };

  const handleSelectLocation = (location: SavedLocation) => {
    onSelectLocation(location.latitude, location.longitude);
  };

  if (compact) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">সেভড লোকেশন</span>
          <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <Plus className="h-3 w-3 mr-1" />
                যোগ করুন
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>নতুন লোকেশন সেভ করুন</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">নাম</label>
                  <Input
                    placeholder="যেমন: আমার বাসা"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ধরন</label>
                  <Select value={newLabel} onValueChange={(v) => setNewLabel(v as SavedLocation['label'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          বাসা
                        </div>
                      </SelectItem>
                      <SelectItem value="office">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          অফিস
                        </div>
                      </SelectItem>
                      <SelectItem value="custom">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          অন্যান্য
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleAddLocation} 
                  className="w-full"
                  disabled={!newName.trim() || isSaving}
                >
                  {isSaving ? (
                    <>
                      <Navigation className="h-4 w-4 mr-2 animate-pulse" />
                      লোকেশন নেওয়া হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      বর্তমান লোকেশন সেভ করুন
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {savedLocations.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-2">
            কোনো সেভড লোকেশন নেই
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {savedLocations.map((location) => {
              const IconComponent = labelIcons[location.label];
              return (
                <Button
                  key={location.id}
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5"
                  onClick={() => handleSelectLocation(location)}
                >
                  <IconComponent className="h-3.5 w-3.5" />
                  {location.name}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">সেভড লোকেশন</h4>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              নতুন যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>নতুন লোকেশন সেভ করুন</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">নাম</label>
                <Input
                  placeholder="যেমন: আমার বাসা"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">ধরন</label>
                <Select value={newLabel} onValueChange={(v) => setNewLabel(v as SavedLocation['label'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        বাসা
                      </div>
                    </SelectItem>
                    <SelectItem value="office">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        অফিস
                      </div>
                    </SelectItem>
                    <SelectItem value="custom">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        অন্যান্য
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAddLocation} 
                className="w-full"
                disabled={!newName.trim() || isSaving}
              >
                {isSaving ? (
                  <>
                    <Navigation className="h-4 w-4 mr-2 animate-pulse" />
                    লোকেশন নেওয়া হচ্ছে...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    বর্তমান লোকেশন সেভ করুন
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {savedLocations.length === 0 ? (
        <div className="text-center py-4 bg-muted/30 rounded-lg">
          <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">কোনো সেভড লোকেশন নেই</p>
          <p className="text-xs text-muted-foreground mt-1">
            বাসা বা অফিসের লোকেশন সেভ করে দ্রুত সার্চ করুন
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {savedLocations.map((location) => {
            const IconComponent = labelIcons[location.label];
            return (
              <div
                key={location.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <button
                  className="flex items-center gap-3 flex-1 text-left"
                  onClick={() => handleSelectLocation(location)}
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <IconComponent className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{location.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {labelNames[location.label]}
                    </p>
                  </div>
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeLocation(location.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedLocationsList;
