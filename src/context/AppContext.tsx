
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContextType, Language } from './types';
import { getTranslation } from './translations';
import { useFavorites } from './hooks/useFavorites';
import { useReviews } from './hooks/useReviews';
import { useRewards } from './hooks/useRewards';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { useOnboarding } from './hooks/useOnboarding';

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return (localStorage.getItem('language') as Language) || 'bn';
    } catch {
      return 'bn';
    }
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Initialize all hooks
  const { userReward, addPoints, claimReward } = useRewards(language);
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites(language);
  const { reviews, addReview, getUserReviews, getItemReviews } = useReviews(language, addPoints);
  const isOnline = useOnlineStatus(language);
  const { hasCompletedOnboarding, completeOnboarding } = useOnboarding(language, addPoints);

  // Translation Function
  const t = (key: string) => {
    return getTranslation(language, key);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    
    reviews,
    addReview,
    getUserReviews,
    getItemReviews,
    
    userReward,
    addPoints,
    claimReward,
    
    language,
    setLanguage,
    t,
    
    isOnline,
    
    hasCompletedOnboarding,
    completeOnboarding,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};

// Re-export types for convenience
export type { Language, FavoriteItem, ReviewItem, UserReward } from './types';
