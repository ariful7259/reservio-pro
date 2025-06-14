
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { FeatureCardProps } from "./types";

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  enabledFeatures,
  onFeatureUse,
  canUseFeature,
}) => {
  const isEnabled = enabledFeatures.has(feature.id);
  const depsUnmet =
    feature.dependencies?.some((dep) => !enabledFeatures.has(dep)) || false;

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-105 group ${
        !canUseFeature(feature) ? "opacity-60" : ""
      }`}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-lg transition-colors ${
                  isEnabled
                    ? "bg-green-500 text-white"
                    : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                }`}
              >
                {isEnabled ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  feature.icon
                )}
              </div>
              {feature.popular && (
                <Badge variant="secondary" className="text-xs">
                  জনপ্রিয়
                </Badge>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">{feature.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">
              {feature.description}
            </p>
            {/* Progress bar */}
            {feature.setupProgress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>সেটআপ অগ্রগতি</span>
                  <span>{feature.setupProgress}%</span>
                </div>
                <Progress value={feature.setupProgress} className="h-1" />
              </div>
            )}
            {/* Dependencies */}
            {feature.dependencies && feature.dependencies.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-orange-600">
                  প্রয়োজন: {feature.dependencies.join(", ")}
                </p>
              </div>
            )}
          </div>
          <Button
            size="sm"
            className="w-full text-xs"
            variant={isEnabled ? "secondary" : "default"}
            disabled={!canUseFeature(feature)}
            aria-disabled={!canUseFeature(feature)}
            onClick={(e) => {
              e.stopPropagation();
              onFeatureUse(feature);
            }}
            title={
              depsUnmet
                ? "এটি চালু করতে আগে সব ডিপেন্ডেন্সি পূর্ণ করুন"
                : isEnabled
                ? "ফিচার কনফিগার করুন"
                : "ফিচার ব্যবহার করুন"
            }
          >
            {isEnabled ? "কনফিগার করুন" : "ব্যবহার করুন"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
