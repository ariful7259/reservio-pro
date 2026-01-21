import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface SavedLocation {
  id: string;
  name: string;
  label: 'home' | 'office' | 'custom';
  latitude: number;
  longitude: number;
  address?: string;
  createdAt: number;
}

interface UseSavedLocationsReturn {
  savedLocations: SavedLocation[];
  addLocation: (location: Omit<SavedLocation, 'id' | 'createdAt'>) => void;
  removeLocation: (id: string) => void;
  updateLocation: (id: string, updates: Partial<SavedLocation>) => void;
  getLocationById: (id: string) => SavedLocation | undefined;
  saveCurrentLocation: (name: string, label: SavedLocation['label']) => Promise<boolean>;
}

const STORAGE_KEY = 'saved-locations';

export const useSavedLocations = (): UseSavedLocationsReturn => {
  const { toast } = useToast();
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedLocations(parsed);
      } catch (e) {
        console.error('Failed to parse saved locations:', e);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Persist to localStorage
  const persistLocations = useCallback((locations: SavedLocation[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
    setSavedLocations(locations);
  }, []);

  const addLocation = useCallback(
    (location: Omit<SavedLocation, 'id' | 'createdAt'>) => {
      const newLocation: SavedLocation = {
        ...location,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      const updated = [...savedLocations, newLocation];
      persistLocations(updated);
      toast({
        title: 'লোকেশন সেভ হয়েছে',
        description: `${location.name} সফলভাবে সংরক্ষণ করা হয়েছে`,
      });
    },
    [savedLocations, persistLocations, toast]
  );

  const removeLocation = useCallback(
    (id: string) => {
      const updated = savedLocations.filter((loc) => loc.id !== id);
      persistLocations(updated);
      toast({
        title: 'লোকেশন মুছে ফেলা হয়েছে',
        description: 'সেভড লোকেশন সফলভাবে মুছে ফেলা হয়েছে',
      });
    },
    [savedLocations, persistLocations, toast]
  );

  const updateLocation = useCallback(
    (id: string, updates: Partial<SavedLocation>) => {
      const updated = savedLocations.map((loc) =>
        loc.id === id ? { ...loc, ...updates } : loc
      );
      persistLocations(updated);
    },
    [savedLocations, persistLocations]
  );

  const getLocationById = useCallback(
    (id: string): SavedLocation | undefined => {
      return savedLocations.find((loc) => loc.id === id);
    },
    [savedLocations]
  );

  const saveCurrentLocation = useCallback(
    async (name: string, label: SavedLocation['label']): Promise<boolean> => {
      return new Promise((resolve) => {
        if (!navigator.geolocation) {
          toast({
            title: 'সমর্থিত নয়',
            description: 'আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না',
            variant: 'destructive',
          });
          resolve(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            addLocation({
              name,
              label,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            resolve(true);
          },
          (error) => {
            toast({
              title: 'ত্রুটি',
              description: 'বর্তমান লোকেশন পেতে সমস্যা হয়েছে',
              variant: 'destructive',
            });
            resolve(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
          }
        );
      });
    },
    [addLocation, toast]
  );

  return {
    savedLocations,
    addLocation,
    removeLocation,
    updateLocation,
    getLocationById,
    saveCurrentLocation,
  };
};

export default useSavedLocations;
