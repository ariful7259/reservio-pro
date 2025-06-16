
import React from 'react';
import FeatureCard from './FeatureCard';
import { Feature } from './featureData';

interface FeatureSectionProps {
  title: string;
  icon: React.ReactNode;
  emoji: string;
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ title, icon, emoji, features }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <div className="p-2 bg-blue-100 rounded-full">
          {icon}
        </div>
        {emoji} {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
