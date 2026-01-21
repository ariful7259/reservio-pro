import React from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

interface HeroBannerProps {
  bannerImages: string[];
  scrollTargetId?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  bannerImages,
  scrollTargetId = "featured-listings",
}) => {
  const navigate = useNavigate();
  const { language } = useApp();

  const handleBrowse = () => {
    const el = document.getElementById(scrollTargetId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative animate-enter">
      <HeroCarousel bannerImages={bannerImages} />

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-x-4 top-3">
        <div className="pointer-events-auto rounded-xl border border-border bg-background/70 backdrop-blur-sm p-4 shadow-sm">
          <h1 className="text-xl font-semibold leading-tight tracking-tight text-foreground">
            {language === "bn"
              ? "সবকিছু এক জায়গায়—রেন্ট, সার্ভিস, মার্কেটপ্লেস"
              : "Everything in one place—Rent, Services, Marketplace"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {language === "bn"
              ? "ডিল, লোকাল ব্র্যান্ড আর ফিচার্ড আইটেম সহজে খুঁজুন।"
              : "Find deals, local brands and featured items fast."}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              className="button-pop"
              onClick={() => navigate("/login")}
            >
              {language === "bn" ? "লগইন / সাইন আপ" : "Login / Sign up"}
            </Button>
            <Button variant="outline" onClick={handleBrowse}>
              {language === "bn" ? "ব্রাউজ শুরু করুন" : "Start browsing"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
