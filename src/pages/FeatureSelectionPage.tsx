
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { allFeatures } from '@/features/service-selection/featureData';
import { FeatureCard } from '@/features/service-selection/FeatureCard';
import { FeatureSelectionHeader } from '@/features/service-selection/FeatureSelectionHeader';
import { SaveSelectionButton } from '@/features/service-selection/SaveSelectionButton';
import { 
  FEATURE_LIMIT, 
  toggleFeatureSelection, 
  saveSelectedFeatures, 
  loadSelectedFeatures 
} from '@/features/service-selection/featureSelectionUtils';

export const FeatureSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  useEffect(() => {
    // Load existing selected features from local storage
    const selectedIds = loadSelectedFeatures();
    setSelectedFeatures(selectedIds);
  }, []);

  const handleToggleFeature = (featureId: string) => {
    toggleFeatureSelection(featureId, selectedFeatures, setSelectedFeatures);
  };
  
  const handleSaveSelection = () => {
    saveSelectedFeatures(selectedFeatures, allFeatures);
    navigate(-1);
  };

  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <FeatureSelectionHeader 
        selectedCount={selectedFeatures.length} 
        maxLimit={FEATURE_LIMIT} 
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
        {allFeatures.map((feature) => (
          <FeatureCard 
            key={feature.id}
            feature={feature}
            isSelected={selectedFeatures.includes(feature.id)}
            onToggle={handleToggleFeature}
          />
        ))}
      </div>
      
      <SaveSelectionButton onSave={handleSaveSelection} />
    </div>
  );
};

export default FeatureSelectionPage;
