import React from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

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
  const [expandedType, setExpandedType] = React.useState<string | null>(null);
  const [customDialogOpen, setCustomDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  // Memoize to avoid re-renders
  const activeFeatureList = React.useMemo(() => 
    expandedType ? featureMap[expandedType] || [] : [], 
    [featureMap, expandedType]
  );

  // Calculate pending/new count for badge (demo logic)
  const badgeCounts = React.useMemo(() => {
    const res: Record<string, { pending: number, newCount: number }> = {};
    businessTypes.forEach(t => {
      const feats = featureMap[t.id] || [];
      res[t.id] = {
        pending: feats.filter(f => !enabledFeatures.has(f.id) && f.setupProgress !== 100).length,
        newCount: feats.filter(f => f.popular && !enabledFeatures.has(f.id)).length,
      };
    });
    return res;
  }, [featureMap, enabledFeatures, businessTypes]);

  // New: Filter/Search UI
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // Fake loading demo (simulate API fetch, can be replaced with SWR/react-query)
  React.useEffect(() => {
    if (expandedType) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 700);
      return () => clearTimeout(t);
    }
  }, [expandedType]);

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
          aria-pressed={activeType === null}
          aria-label="সকল ব্যবসা"
        >
          সকল ব্যবসা
        </Button>
        {businessTypes.map((type) => (
          <BusinessTypeButton
            key={type.id}
            type={type}
            isActive={activeType === type.id}
            onClick={id => {
              onChange(id);
              setExpandedType(id === expandedType ? null : id);
            }}
            pendingCount={badgeCounts[type.id]?.pending}
            newCount={badgeCounts[type.id]?.newCount}
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
        <div className="animate-fade-in">
          <div className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                {businessTypes.find((t) => t.id === expandedType)?.icon}
                <h3 className="text-lg font-semibold">
                  {businessTypes.find((t) => t.id === expandedType)?.name} এর ফিচারসমূহ
                </h3>
              </div>
              <FeatureList
                features={activeFeatureList}
                enabledFeatures={enabledFeatures}
                onFeatureUse={onFeatureUse}
                canUseFeature={canUseFeature}
                loading={loading}
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
                      onClick={() => setCustomDialogOpen(true)}
                      aria-label="কাস্টম ফিচার অনুরোধ"
                    >
                      <span className="sr-only">কাস্টম ফিচার</span>
                      ⚙
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 sm:flex-none flex items-center gap-1"
                      onClick={() => window.open("/help", "_blank")}
                      aria-label="সাপোর্ট"
                    >
                      <span className="sr-only">সাপোর্ট</span>
                      ℹ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Custom Feature Dialog */}
      <CustomFeatureDialog
        open={customDialogOpen}
        onOpenChange={setCustomDialogOpen}
      />
    </div>
  );
};

// Only export the wrapped Selector component! No named export.
const SelectorWithProvider: React.FC<Props> = (props) => (
  <BusinessFeatureProvider>
    <BusinessTypeSelector {...props} />
  </BusinessFeatureProvider>
);

export default SelectorWithProvider;
