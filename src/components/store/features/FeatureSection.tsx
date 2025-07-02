
import React from 'react';
import FeatureCard from './FeatureCard';
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

interface FeatureSectionProps {
  title: string;
  description?: string;
  features: Feature[];
  columns?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  features,
  columns = { mobile: 1, tablet: 2, desktop: 3 }
}) => {
  const getGridClasses = () => {
    const mobileClass = `grid-cols-${columns.mobile}`;
    const tabletClass = `md:grid-cols-${columns.tablet}`;
    const desktopClass = `lg:grid-cols-${columns.desktop}`;
    return `grid ${mobileClass} ${tabletClass} ${desktopClass} gap-4 md:gap-6`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            {description}
          </p>
        )}
      </div>
      
      <div className={getGridClasses()}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            {...feature}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
