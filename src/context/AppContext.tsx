
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'bn';

// Review type definition
interface Review {
  id: string;
  userId: string;
  itemId: string;
  itemType: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Favorite item type definition
interface FavoriteItem {
  id: string;
  type: string;
  title: string;
  image: string;
  price: string | number;
  location?: string;
}

// Reward type definition
interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  claimed: boolean;
}

// User reward type definition
interface UserReward {
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  rewards: Reward[];
}

interface AppContextType {
  isOnline: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Translation helper
  t: (key: string) => string;
  
  // Favorites functionality
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Points and rewards functionality
  addPoints: (points: number) => void;
  userReward: UserReward;
  claimReward: (rewardId: string) => void;
  
  // Onboarding functionality
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  
  // Reviews functionality
  reviews: Review[];
  getUserReviews: (userId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [language, setLanguage] = useState<Language>('bn');
  
  // State for favorites
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  
  // State for rewards
  const [userReward, setUserReward] = useState<UserReward>({
    points: 0,
    level: 'bronze',
    rewards: [
      {
        id: 'reward-1',
        title: 'ডিসকাউন্ট কুপন',
        description: 'পরবর্তী অর্ডারে ১০% ছাড়',
        pointsRequired: 100,
        claimed: false
      },
      {
        id: 'reward-2',
        title: 'ফ্রি ডেলিভারি',
        description: 'যেকোনো অর্ডারে ফ্রি ডেলিভারি',
        pointsRequired: 200,
        claimed: false
      }
    ]
  });
  
  // State for onboarding
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
  
  // State for reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  // Event listeners for online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Simple translation function based on language
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        favorites: 'Favorites',
        // Add more translations as needed
      },
      bn: {
        favorites: 'পছন্দ',
        // Add more translations as needed
      }
    };
    
    return translations[language][key] || key;
  };

  // Favorites methods
  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => [...prev, item]);
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: string): boolean => {
    return favorites.some(item => item.id === id);
  };

  // Points and rewards methods
  const addPoints = (points: number) => {
    setUserReward(prev => ({
      ...prev,
      points: prev.points + points
    }));
  };

  const claimReward = (rewardId: string) => {
    setUserReward(prev => {
      const reward = prev.rewards.find(r => r.id === rewardId);
      
      if (!reward || reward.claimed || prev.points < reward.pointsRequired) {
        return prev;
      }
      
      return {
        ...prev,
        points: prev.points - reward.pointsRequired,
        rewards: prev.rewards.map(r => 
          r.id === rewardId ? { ...r, claimed: true } : r
        )
      };
    });
  };

  // Onboarding methods
  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    // Could add persistent storage here
  };

  // Reviews methods
  const getUserReviews = (userId: string): Review[] => {
    return reviews.filter(review => review.userId === userId);
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setReviews(prev => [...prev, newReview]);
    addPoints(10); // Reward user for submitting a review
  };

  return (
    <AppContext.Provider value={{ 
      isOnline, 
      language, 
      setLanguage,
      t,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      addPoints,
      userReward,
      claimReward,
      hasCompletedOnboarding,
      completeOnboarding,
      reviews,
      getUserReviews,
      addReview
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
