
import React from "react";
import { FeatureCard } from "./FeatureCard";
import { FeatureListProps } from "./types";

export const FeatureList: React.FC<FeatureListProps> = ({
  features,
  enabledFeatures,
  onFeatureUse,
  canUseFeature,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
    {features.map((feature) => (
      <FeatureCard
        key={feature.id}
        feature={feature}
        enabledFeatures={enabledFeatures}
        onFeatureUse={onFeatureUse}
        canUseFeature={canUseFeature}
      />
    ))}
  </div>
);
