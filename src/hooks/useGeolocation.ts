import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GeoLocation {
  latitude: number;
  longitude: number;
}

interface LocationItem {
  latitude?: number;
  longitude?: number;
  [key: string]: any;
}

interface UseGeolocationReturn {
  userLocation: GeoLocation | null;
  isGettingLocation: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<GeoLocation | null>;
  calculateDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
  filterByDistance: <T extends LocationItem>(items: T[], maxDistanceKm: number) => T[];
  sortByDistance: <T extends LocationItem>(items: T[]) => T[];
  getDistanceLabel: (distanceKm: number) => string;
}

// Haversine formula to calculate distance between two GPS coordinates
const haversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useGeolocation = (): UseGeolocationReturn => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<GeoLocation | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Try to get cached location on mount
  useEffect(() => {
    const cached = localStorage.getItem('userLocation');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Check if cached location is less than 30 minutes old
        if (parsed.timestamp && Date.now() - parsed.timestamp < 30 * 60 * 1000) {
          setUserLocation({ latitude: parsed.latitude, longitude: parsed.longitude });
        }
      } catch (e) {
        localStorage.removeItem('userLocation');
      }
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<GeoLocation | null> => {
    setIsGettingLocation(true);
    setError(null);

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        const errorMsg = 'আপনার ব্রাউজার জিওলোকেশন সমর্থন করে না';
        setError(errorMsg);
        setIsGettingLocation(false);
        toast({
          title: 'সমর্থিত নয়',
          description: errorMsg,
          variant: 'destructive',
        });
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(location);
          setIsGettingLocation(false);
          
          // Cache location with timestamp
          localStorage.setItem('userLocation', JSON.stringify({
            ...location,
            timestamp: Date.now(),
          }));
          
          toast({
            title: 'লোকেশন পাওয়া গেছে',
            description: 'আপনার বর্তমান লোকেশন সংরক্ষিত হয়েছে',
          });
          
          resolve(location);
        },
        (err) => {
          let errorMsg = 'লোকেশন পেতে সমস্যা হয়েছে';
          if (err.code === err.PERMISSION_DENIED) {
            errorMsg = 'লোকেশন অ্যাক্সেস অনুমতি দেওয়া হয়নি';
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            errorMsg = 'লোকেশন তথ্য পাওয়া যাচ্ছে না';
          } else if (err.code === err.TIMEOUT) {
            errorMsg = 'লোকেশন পেতে সময়সীমা শেষ';
          }
          
          setError(errorMsg);
          setIsGettingLocation(false);
          toast({
            title: 'ত্রুটি',
            description: errorMsg,
            variant: 'destructive',
          });
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }, [toast]);

  const calculateDistance = useCallback(
    (lat1: number, lng1: number, lat2: number, lng2: number): number => {
      return haversineDistance(lat1, lng1, lat2, lng2);
    },
    []
  );

  const filterByDistance = useCallback(
    <T extends LocationItem>(items: T[], maxDistanceKm: number): T[] => {
      if (!userLocation) return items;

      return items.filter((item) => {
        if (item.latitude === undefined || item.longitude === undefined) return true;
        const distance = haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          item.latitude,
          item.longitude
        );
        return distance <= maxDistanceKm;
      });
    },
    [userLocation]
  );

  const sortByDistance = useCallback(
    <T extends LocationItem>(items: T[]): T[] => {
      if (!userLocation) return items;

      return [...items].sort((a, b) => {
        // Items without coordinates go to the end
        if (a.latitude === undefined || a.longitude === undefined) return 1;
        if (b.latitude === undefined || b.longitude === undefined) return -1;

        const distanceA = haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          a.latitude,
          a.longitude
        );
        const distanceB = haversineDistance(
          userLocation.latitude,
          userLocation.longitude,
          b.latitude,
          b.longitude
        );

        return distanceA - distanceB;
      });
    },
    [userLocation]
  );

  const getDistanceLabel = useCallback(
    (distanceKm: number): string => {
      if (distanceKm < 1) {
        return `${Math.round(distanceKm * 1000)} মিটার`;
      }
      return `${distanceKm.toFixed(1)} কিমি`;
    },
    []
  );

  return {
    userLocation,
    isGettingLocation,
    error,
    getCurrentLocation,
    calculateDistance,
    filterByDistance,
    sortByDistance,
    getDistanceLabel,
  };
};

export default useGeolocation;
