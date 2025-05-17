
import { toast } from "sonner";
import { Feature, SavedFeature } from "./types";

export const FEATURE_LIMIT = 10;
export const CUSTOM_SERVICES_STORAGE_KEY = 'customServices';

// Toggle selection of a feature
export const toggleFeatureSelection = (
  featureId: string,
  selectedFeatures: string[],
  setSelectedFeatures: (features: string[]) => void
): void => {
  if (selectedFeatures.includes(featureId)) {
    setSelectedFeatures(prev => prev.filter(id => id !== featureId));
  } else {
    // Check if max limit is reached
    if (selectedFeatures.length >= FEATURE_LIMIT) {
      toast.error(`সর্বাধিক ${FEATURE_LIMIT}টি সার্ভিস যোগ করা যাবে`);
      return;
    }
    setSelectedFeatures(prev => [...prev, featureId]);
  }
};

// Save selected features to localStorage
export const saveSelectedFeatures = (
  selectedFeatures: string[],
  allFeatures: Feature[]
): void => {
  const selectedFeatureObjects = allFeatures
    .filter(feature => selectedFeatures.includes(feature.id))
    .map(feature => ({
      id: feature.id,
      name: feature.name,
      icon: feature.id // We'll recreate icons on the grid page
    }));
  
  localStorage.setItem(CUSTOM_SERVICES_STORAGE_KEY, JSON.stringify(selectedFeatureObjects));
  toast.success("সার্ভিস লিস্ট আপডেট করা হয়েছে");
};

// Load selected features from localStorage
export const loadSelectedFeatures = (): string[] => {
  const savedCustomServices = localStorage.getItem(CUSTOM_SERVICES_STORAGE_KEY);
  if (savedCustomServices) {
    try {
      const parsedServices = JSON.parse(savedCustomServices);
      return parsedServices.map((service: SavedFeature) => service.id);
    } catch (error) {
      console.error('Error parsing stored services:', error);
      return [];
    }
  }
  return [];
};
