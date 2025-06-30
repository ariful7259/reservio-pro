
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { Language, FavoriteItem, ReviewItem, UserReward, AppContextType } from './types';

const AppContext = createContext<AppContextType | undefined>(undefined);

// Translation function
const translations = {
  bn: {
    // Add Bengali translations here
    search: 'খুঁজুন',
    services: 'সেবা সমূহ',
    // Add more as needed
  },
  en: {
    // Add English translations here
    search: 'Search',
    services: 'Services',
    // Add more as needed
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn');
  const [currency, setCurrency] = useState('BDT');
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [userReward, setUserReward] = useState<UserReward>({
    points: 0,
    level: 'bronze',
    rewards: []
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  const isOnline = useOnlineStatus(language);

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  // Favorites functions
  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => [...prev, item]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: string): boolean => {
    return favorites.some(item => item.id === id);
  };

  // Reviews functions
  const addReview = (review: Omit<ReviewItem, 'id' | 'createdAt'>) => {
    const newReview: ReviewItem = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setReviews(prev => [...prev, newReview]);
  };

  const getUserReviews = (userId: string): ReviewItem[] => {
    return reviews.filter(review => review.userId === userId);
  };

  const getItemReviews = (itemId: string): ReviewItem[] => {
    return reviews.filter(review => review.itemId === itemId);
  };

  // Reward functions
  const addPoints = (points: number) => {
    setUserReward(prev => ({
      ...prev,
      points: prev.points + points
    }));
  };

  const claimReward = (rewardId: string) => {
    setUserReward(prev => ({
      ...prev,
      rewards: prev.rewards.map(reward => 
        reward.id === rewardId ? { ...reward, claimed: true } : reward
      )
    }));
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      currency,
      setCurrency: () => {}, // Placeholder
      user,
      setUser,
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
      t,
      isOnline,
      hasCompletedOnboarding,
      completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
