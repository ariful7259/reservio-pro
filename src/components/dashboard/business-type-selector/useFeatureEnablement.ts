import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { BusinessFeature } from "./types";
import { useNavigate } from "react-router-dom";

/**
 * Hook to manage feature enabling/disabling, checking dependencies, and navigation.
 */
export function useFeatureEnablement() {
  const [enabledFeatures, setEnabledFeatures] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const canUseFeature = (feature: BusinessFeature) => {
    if (!feature.dependencies) return true;
    return feature.dependencies.every((dep) => enabledFeatures.has(dep));
  };

  const onFeatureUse = (feature: BusinessFeature) => {
    // Check dependencies
    if (feature.dependencies && feature.dependencies.length > 0) {
      const unmetDependencies = feature.dependencies.filter(
        (dep) => !enabledFeatures.has(dep)
      );
      if (unmetDependencies.length > 0) {
        toast({
          title: "ডিপেন্ডেন্সি প্রয়োজন",
          description: `প্রথমে ${unmetDependencies.join(", ")} সেটআপ করুন`,
          variant: "destructive",
        });
        return;
      }
    }

    // Navigate to setup page if specified
    if (feature.route) {
      navigate(feature.route);
      return;
    }

    // Otherwise, enable/disable
    const newFeatures = new Set(enabledFeatures);
    if (enabledFeatures.has(feature.id)) {
      newFeatures.delete(feature.id);
      toast({
        title: "ফিচার বন্ধ করা হয়েছে",
        description: `${feature.name} বন্ধ করা হয়েছে`,
      });
    } else {
      newFeatures.add(feature.id);
      toast({
        title: "ফিচার চালু করা হয়েছে",
        description: `${feature.name} সফলভাবে চালু করা হয়েছে`,
      });
    }
    setEnabledFeatures(newFeatures);
  };

  return { enabledFeatures, onFeatureUse, canUseFeature, setEnabledFeatures };
}
