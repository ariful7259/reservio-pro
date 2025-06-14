
import React, { useState, useContext, useMemo } from "react";
import { BusinessType, BusinessFeature } from "./types";
import { ShoppingBag, Building, Wrench, Pencil } from "lucide-react";

// DEMO: Feature Map—এখানে বসবে (চাইলে API ডেটা ভবিষ্যতে)
// Future: fetch features from API, just update here!
const staticFeatures: Record<string, BusinessFeature[]> = {
  marketplace: [
    {
      id: "products",
      name: "পণ্য যোগ করুন",
      description: "নতুন পণ্য যুক্ত করুন এবং Catalogue তৈরি করুন",
      icon: <ShoppingBag className="h-5 w-5 text-primary" />,
      popular: true,
      setupProgress: 100,
      dependencies: [],
      enabled: true,
    },
    {
      id: "orders",
      name: "অর্ডার ম্যানেজমেন্ট",
      description: "অর্ডার গুলো ট্র্যাক ও প্রসেস করুন",
      icon: <ShoppingBag className="h-5 w-5 text-primary" />,
      setupProgress: 40,
      dependencies: ["products"],
    },
  ],
  rental: [
    {
      id: "property-listing",
      name: "প্রপার্টি লিস্টিং",
      description: "নতুন প্রপার্টি যোগ করুন ও ম্যানেজ করুন",
      icon: <Building className="h-5 w-5 text-indigo-500" />,
      setupProgress: 100,
      enabled: true,
    },
    {
      id: "rental-booking",
      name: "বুকিং ব্যবস্থাপনা",
      description: "অতিরিক্ত বুকিং অপশন ম্যানেজ করুন",
      icon: <Building className="h-5 w-5 text-indigo-500" />,
      setupProgress: 0,
      dependencies: ["property-listing"],
    },
  ],
  service: [
    {
      id: "service-listing",
      name: "সার্ভিস যুক্ত করুন",
      description: "নতুন সার্ভিস যোগ করুন ও কাস্টমাইজ করুন",
      icon: <Wrench className="h-5 w-5 text-amber-500" />,
      popular: true,
      setupProgress: 80,
    },
    {
      id: "booking",
      name: "বুকিং/অ্যাপয়েন্টমেন্ট",
      description: "গ্রাহকের জন্য বুকিং চালু করুন",
      icon: <Wrench className="h-5 w-5 text-amber-500" />,
      setupProgress: 40,
      dependencies: ["service-listing"],
    },
  ],
  content: [
    {
      id: "post-content",
      name: "কন্টেন্ট পোস্ট",
      description: "নতুন কন্টেন্ট/ব্লগ/ভিডিও যোগ করুন",
      icon: <Pencil className="h-5 w-5 text-pink-500" />,
      setupProgress: 50,
      popular: true,
    },
    {
      id: "analytics",
      name: "কন্টেন্ট এনালিটিক্স",
      description: "আপনার কন্টেন্ট পারফরমেন্স বুঝুন",
      icon: <Pencil className="h-5 w-5 text-pink-500" />,
      setupProgress: 10,
      dependencies: ["post-content"],
    },
  ],
};

type FeatureContextType = {
  featureMap: Record<string, BusinessFeature[]>;
  enabledFeatures: Set<string>;
  setEnabledFeatures: React.Dispatch<React.SetStateAction<Set<string>>>;
  filter: string;
  setFilter: (s: string) => void;
};

const BusinessFeatureContext = React.createContext<FeatureContextType | undefined>(undefined);

export const BusinessFeatureProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [enabledFeatures, setEnabledFeatures] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>("");

  // It would be fetched dynamically from API in future
  const featureMap = useMemo(() => staticFeatures, []);

  const ctxValue = useMemo(() => ({
    featureMap,
    enabledFeatures,
    setEnabledFeatures,
    filter,
    setFilter,
  }), [featureMap, enabledFeatures, filter]);

  return (
    <BusinessFeatureContext.Provider value={ctxValue}>
      {children}
    </BusinessFeatureContext.Provider>
  );
};

export function useBusinessFeatureContext() {
  const ctx = useContext(BusinessFeatureContext);
  if (!ctx) {
    throw new Error("useBusinessFeatureContext must be used inside BusinessFeatureProvider");
  }
  return ctx;
}
