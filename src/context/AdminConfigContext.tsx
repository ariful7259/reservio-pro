
import React, { createContext, useContext, useState, useEffect } from 'react';

// মোনিটাইজেশন কনফিগ টাইপ ডেফিনিশন
interface MonetizationSettings {
  rental: {
    listingFee: boolean;
    premiumListing: boolean;
    bookingCommission: boolean;
    subscriptionModel: boolean;
    insuranceFee: boolean;
    rates: {
      listingFee: number;
      premiumListing: number;
      bookingCommission: number;
      subscriptionModel: number;
      insuranceFee: number;
    };
  };
  service: {
    serviceFee: boolean;
    premiumListing: boolean;
    verificationFee: boolean;
    advertisement: boolean;
    referralProgram: boolean;
    rates: {
      serviceFee: number;
      premiumListing: number;
      verificationFee: number;
      advertisement: number;
      referralProgram: number;
    };
  };
  marketplace: {
    saleCommission: boolean;
    listingFee: boolean;
    premiumListing: boolean;
    affiliateProgram: boolean;
    verificationBadge: boolean;
    rates: {
      saleCommission: number;
      listingFee: number;
      premiumListing: number;
      affiliateProgram: number;
      verificationBadge: number;
    };
  };
  digitalCreator: {
    courseSaleCommission: boolean;
    subscriptionModel: boolean;
    premiumMembership: boolean;
    oneOnOneSession: boolean;
    digitalProductSale: boolean;
    rates: {
      courseSaleCommission: number;
      subscriptionModel: number;
      premiumMembership: number;
      oneOnOneSession: number;
      digitalProductSale: number;
    };
  };
  crossPlatform: {
    integratedPaymentGateway: boolean;
    advertisement: boolean;
    dataAnalytics: boolean;
    tieredMembership: boolean;
    rates: {
      integratedPaymentGateway: number;
      advertisement: number;
      dataAnalytics: number;
      tieredMembership: number;
    };
  };
}

interface AdminConfigContextType {
  monetizationSettings: MonetizationSettings;
  updateMonetizationSettings: (settings: Partial<MonetizationSettings>) => void;
  updateRentalSettings: (settings: Partial<MonetizationSettings['rental']>) => void;
  updateServiceSettings: (settings: Partial<MonetizationSettings['service']>) => void;
  updateMarketplaceSettings: (settings: Partial<MonetizationSettings['marketplace']>) => void; 
  updateDigitalCreatorSettings: (settings: Partial<MonetizationSettings['digitalCreator']>) => void;
  updateCrossPlatformSettings: (settings: Partial<MonetizationSettings['crossPlatform']>) => void;
}

// ডিফল্ট রেট সেটিংস
const defaultRates = {
  rental: {
    listingFee: 100,
    premiumListing: 500,
    bookingCommission: 5, // পারসেন্ট
    subscriptionModel: 299,
    insuranceFee: 2.5, // পারসেন্ট
  },
  service: {
    serviceFee: 5, // পারসেন্ট
    premiumListing: 300,
    verificationFee: 500,
    advertisement: 200,
    referralProgram: 10, // পারসেন্ট
  },
  marketplace: {
    saleCommission: 3, // পারসেন্ট
    listingFee: 50,
    premiumListing: 250, 
    affiliateProgram: 8, // পারসেন্ট
    verificationBadge: 400,
  },
  digitalCreator: {
    courseSaleCommission: 10, // পারসেন্ট
    subscriptionModel: 8, // পারসেন্ট
    premiumMembership: 15, // পারসেন্ট
    oneOnOneSession: 12, // পারসেন্ট
    digitalProductSale: 10, // পারসেন্ট
  },
  crossPlatform: {
    integratedPaymentGateway: 2, // পারসেন্ট
    advertisement: 0, // ফ্ল্যাট ফি
    dataAnalytics: 0, // ফ্ল্যাট ফি
    tieredMembership: 0, // ফ্ল্যাট ফি
  },
};

// ডিফল্ট মোনিটাইজেশন সেটিংস
const defaultMonetizationSettings: MonetizationSettings = {
  rental: {
    listingFee: true,
    premiumListing: true,
    bookingCommission: true,
    subscriptionModel: false,
    insuranceFee: false,
    rates: defaultRates.rental,
  },
  service: {
    serviceFee: true,
    premiumListing: true,
    verificationFee: true,
    advertisement: false,
    referralProgram: false,
    rates: defaultRates.service,
  },
  marketplace: {
    saleCommission: true,
    listingFee: true,
    premiumListing: true,
    affiliateProgram: false,
    verificationBadge: true,
    rates: defaultRates.marketplace,
  },
  digitalCreator: {
    courseSaleCommission: true,
    subscriptionModel: true,
    premiumMembership: true,
    oneOnOneSession: false,
    digitalProductSale: true,
    rates: defaultRates.digitalCreator,
  },
  crossPlatform: {
    integratedPaymentGateway: true,
    advertisement: false,
    dataAnalytics: false,
    tieredMembership: false,
    rates: defaultRates.crossPlatform,
  },
};

// কনটেক্সট তৈরি
const AdminConfigContext = createContext<AdminConfigContextType | undefined>(undefined);

// LocalStorage কী
const STORAGE_KEY = 'admin_monetization_settings';

// প্রভাইডার কম্পোনেন্ট
export const AdminConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // স্টেট সেটআপ - লোকাল স্টোরেজ থেকে সেটিংস লোড করা হচ্ছে
  const [monetizationSettings, setMonetizationSettings] = useState<MonetizationSettings>(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    return savedSettings ? JSON.parse(savedSettings) : defaultMonetizationSettings;
  });

  // সেটিংস পরিবর্তন হলে লোকাল স্টোরেজে সেভ করা হচ্ছে
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(monetizationSettings));
  }, [monetizationSettings]);

  // সম্পূর্ণ মোনিটাইজেশন সেটিংস আপডেট
  const updateMonetizationSettings = (settings: Partial<MonetizationSettings>) => {
    setMonetizationSettings(prevSettings => ({
      ...prevSettings,
      ...settings,
    }));
  };

  // রেন্টাল সেটিংস আপডেট 
  const updateRentalSettings = (settings: Partial<MonetizationSettings['rental']>) => {
    setMonetizationSettings(prevSettings => ({
      ...prevSettings,
      rental: {
        ...prevSettings.rental,
        ...settings,
      },
    }));
  };

  // সার্ভিস সেটিংস আপডেট
  const updateServiceSettings = (settings: Partial<MonetizationSettings['service']>) => {
    setMonetizationSettings(prevSettings => ({
      ...prevSettings,
      service: {
        ...prevSettings.service,
        ...settings,
      },
    }));
  };

  // মার্কেটপ্লেস সেটিংস আপডেট
  const updateMarketplaceSettings = (settings: Partial<MonetizationSettings['marketplace']>) => {
    setMonetizationSettings(prevSettings => ({
      ...prevSettings,
      marketplace: {
        ...prevSettings.marketplace,
        ...settings,
      },
    }));
  };

  // ডিজিটাল ক্রিয়েটর সেটিংস আপডেট
  const updateDigitalCreatorSettings = (settings: Partial<MonetizationSettings['digitalCreator']>) => {
    setMonetizationSettings(prevSettings => ({
      ...prevSettings,
      digitalCreator: {
        ...prevSettings.digitalCreator,
        ...settings,
      },
    }));
  };

  // ক্রস-প্ল্যাটফর্ম সেটিংস আপডেট
  const updateCrossPlatformSettings = (settings: Partial<MonetizationSettings['crossPlatform']>) => {
    setMonetizationSettings(prevSettings => ({
      ...prevSettings,
      crossPlatform: {
        ...prevSettings.crossPlatform,
        ...settings,
      },
    }));
  };

  return (
    <AdminConfigContext.Provider
      value={{
        monetizationSettings,
        updateMonetizationSettings,
        updateRentalSettings,
        updateServiceSettings,
        updateMarketplaceSettings,
        updateDigitalCreatorSettings,
        updateCrossPlatformSettings
      }}
    >
      {children}
    </AdminConfigContext.Provider>
  );
};

// কনটেক্সট হুক
export const useAdminConfig = () => {
  const context = useContext(AdminConfigContext);
  if (context === undefined) {
    throw new Error('useAdminConfig must be used within an AdminConfigProvider');
  }
  return context;
};
