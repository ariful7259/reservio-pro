// ফিচার লিস্ট এখন কনটেক্সট ও ফিল্টার ব্যবহার করবে
import React, { useMemo, ReactElement } from "react";
import { FeatureCard } from "./FeatureCard";
import { useBusinessFeatureContext } from "./BusinessFeatureProvider";
import { FeatureListProps } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

export const FeatureList: React.FC<FeatureListProps & { loading?: boolean }> = ({
  features, // এই props কাজে লাগবে filter করার জন্য
  onFeatureUse,
  canUseFeature,
  enabledFeatures,
  loading = false,
}) => {
  const { filter } = useBusinessFeatureContext();

  // Filter/search সাপোর্ট
  const filtered = useMemo(() => {
    if (!filter.trim()) return features;
    return features.filter(
      (f) =>
        f.name?.toLowerCase().includes(filter.toLowerCase()) ||
        f.description?.toLowerCase().includes(filter.toLowerCase())
    );
  }, [features, filter]);

  // Skeleton Loader
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-lg bg-muted/60" />
        ))}
      </div>
    );
  }

  if (!filtered.length)
    return <div className="py-4 text-center text-muted-foreground">কোনও ফিচার খুঁজে পাওয়া যায়নি</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {filtered.map((feature) => (
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
};
