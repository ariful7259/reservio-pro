import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BusinessType } from "./types";
import { BusinessTypeButton } from "./BusinessTypeButton";
import { FeatureList } from "./FeatureList";
import { CustomFeatureDialog } from "./CustomFeatureDialog";
import { useFeatureEnablement } from "./useFeatureEnablement";
import { BusinessFeatureProvider, useBusinessFeatureContext } from "./BusinessFeatureProvider";

type Props = {
  businessTypes: BusinessType[];
  activeType: string | null;
  onChange: (id: string | null) => void;
};

const BusinessTypeSelector: React.FC<Props> = ({
  businessTypes,
  activeType,
  onChange,
}) => {
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);

  const {
    enabledFeatures,
    onFeatureUse,
    canUseFeature,
    setEnabledFeatures,
  } = useFeatureEnablement();
  const {
    featureMap,
    filter,
    setFilter,
  } = useBusinessFeatureContext();

  const handleTypeClick = (typeId: string) => {
    const newActiveType = activeType === typeId ? null : typeId;
    onChange(newActiveType);

    if (expandedType === typeId) {
      setExpandedType(null);
    } else {
      setExpandedType(typeId);
    }
  };

  const handleCustomFeature = () => setCustomDialogOpen(true);

  const handleSupport = () => {
    toast({
      title: "সাপোর্ট",
      description: "সাপোর্ট পেজে রিডাইরেক্ট করা হচ্ছে...",
    });
    window.location.href = "/help";
  };

  // New: Filter/Search UI
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="space-y-4">
      {/* Main selector buttons */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button
          variant={activeType === null ? "default" : "outline"}
          className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          onClick={() => {
            onChange(null);
            setExpandedType(null);
          }}
        >
          সকল ব্যবসা
        </Button>
        {businessTypes.map((type) => (
          <BusinessTypeButton
            key={type.id}
            type={type}
            isActive={activeType === type.id}
            onClick={handleTypeClick}
            badgeCount={0}
          />
        ))}
      </div>
      {/* Filter/Search box */}
      {expandedType && (
        <div className="max-w-xs mt-2">
          <input
            type="text"
            className="w-full px-2 py-1 border text-sm rounded bg-background border-accent placeholder:text-muted-foreground"
            placeholder="ফিচার সার্চ করুন..."
            value={filter}
            onChange={handleSearchChange}
            aria-label="ফিচার সার্চ করুন"
          />
        </div>
      )}
      {/* Expanded features section */}
      {expandedType && (
        <Card className="animate-fade-in border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {businessTypes.find((t) => t.id === expandedType)?.icon}
                <h3 className="text-lg font-semibold">
                  {businessTypes.find((t) => t.id === expandedType)?.name} এর ফিচারসমূহ
                </h3>
              </div>
              <FeatureList
                features={featureMap[expandedType] || []}
                enabledFeatures={enabledFeatures}
                onFeatureUse={onFeatureUse}
                canUseFeature={canUseFeature}
              />
              {/* Additional info section */}
              <div className="mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-sm">আরো ফিচার প্রয়োজন?</h4>
                    <p className="text-xs text-muted-foreground">
                      কাস্টম ফিচার যোগ করুন অথবা আমাদের সাথে যোগাযোগ করুন
                    </p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none flex items-center gap-1"
                      onClick={handleCustomFeature}
                    >
                      <Settings className="h-3 w-3" />
                      কাস্টম ফিচার
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 sm:flex-none flex items-center gap-1"
                      onClick={handleSupport}
                    >
                      <MessageCircle className="h-3 w-3" />
                      সাপোর্ট
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* Custom Feature Dialog */}
      <CustomFeatureDialog
        open={customDialogOpen}
        onOpenChange={setCustomDialogOpen}
      />
    </div>
  );
};

// Provider wrap (with context)
const SelectorWithProvider: React.FC<Props> = (props) => (
  <BusinessFeatureProvider>
    <BusinessTypeSelector {...props} />
  </BusinessFeatureProvider>
);

export default SelectorWithProvider;
