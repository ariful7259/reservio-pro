
import React from "react";

export interface BusinessType {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface BusinessFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
  enabled?: boolean;
  setupProgress?: number;
  dependencies?: string[];
  route?: string;
}

export interface FeatureCardProps {
  feature: BusinessFeature;
  enabledFeatures: Set<string>;
  onFeatureUse: (feature: BusinessFeature) => void;
  canUseFeature: (feature: BusinessFeature) => boolean;
}

export interface FeatureListProps {
  features: BusinessFeature[];
  enabledFeatures: Set<string>;
  onFeatureUse: (feature: BusinessFeature) => void;
  canUseFeature: (feature: BusinessFeature) => boolean;
}

export interface BusinessTypeButtonProps {
  type: BusinessType;
  isActive: boolean;
  onClick: (id: string) => void;
  badgeCount?: number;
}

