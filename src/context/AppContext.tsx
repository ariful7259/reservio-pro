
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type Language = 'bn' | 'en';

export type FavoriteItem = {
  id: string;
  type: 'service' | 'product' | 'rental' | 'housing';
  title: string;
  image: string;
  price: string | number;
  location?: string;
};

export type ReviewItem = {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'service' | 'product' | 'rental' | 'housing';
  rating: number;
  comment: string;
  createdAt: Date;
};

export type UserReward = {
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  rewards: {
    id: string;
    title: string;
    description: string;
    pointsRequired: number;
    claimed: boolean;
  }[];
};

type AppContextType = {
  // Wishlist/Favorites
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  
  // Reviews & Ratings
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'createdAt'>) => void;
  getUserReviews: (userId: string) => ReviewItem[];
  getItemReviews: (itemId: string) => ReviewItem[];
  
  // User Reward System
  userReward: UserReward;
  addPoints: (points: number) => void;
  claimReward: (rewardId: string) => void;
  
  // Multilingual Support
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  // Offline Support
  isOnline: boolean;
  
  // Onboarding
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
};

// Mock translations
const translations = {
  en: {
    'home': 'Home',
    'services': 'Services',
    'rentals': 'Rentals',
    'shopping': 'Shopping',
    'wallet': 'Wallet',
    'profile': 'Profile',
    'favorites': 'Favorites',
    'settings': 'Settings',
    'add_to_favorites': 'Add to favorites',
    'remove_from_favorites': 'Remove from favorites',
    'rating': 'Rating',
    'submit_review': 'Submit Review',
    'loyalty_points': 'Loyalty Points',
    'claim_reward': 'Claim Reward',
    'my_reviews': 'My Reviews',
    'offline_mode': 'Offline Mode',
    'language': 'Language',
    'english': 'English',
    'bengali': 'Bengali',
  },
  bn: {
    'home': 'হোম',
    'services': 'সেবাসমূহ',
    'rentals': 'ভাড়া',
    'shopping': 'শপিং',
    'wallet': 'ওয়ালেট',
    'profile': 'প্রোফাইল',
    'favorites': 'পছন্দসমূহ',
    'settings': 'সেটিংস',
    'add_to_favorites': 'পছন্দে যোগ করুন',
    'remove_from_favorites': 'পছন্দ থেকে সরান',
    'rating': 'রেটিং',
    'submit_review': 'রিভিউ জমা দিন',
    'loyalty_points': 'লয়ালটি পয়েন্ট',
    'claim_reward': 'পুরস্কার দাবি করুন',
    'my_reviews': 'আমার রিভিউসমূহ',
    'offline_mode': 'অফলাইন মোড',
    'language': 'ভাষা',
    'english': 'ইংরেজি',
    'bengali': 'বাংলা',
  }
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Sample initial rewards
const initialRewards = [
  {
    id: '1',
    title: 'ডিসকাউন্ট কুপন',
    description: '১০% ছাড় পাবেন যেকোন সেবার জন্য',
    pointsRequired: 100,
    claimed: false
  },
  {
    id: '2',
    title: 'ফ্রি ডেলিভারি',
    description: '৫ বার ফ্রি ডেলিভারি সুবিধা',
    pointsRequired: 200,
    claimed: false
  },
  {
    id: '3',
    title: 'প্রিমিয়াম সদস্যতা',
    description: '১ মাসের প্রিমিয়াম সদস্যতা',
    pointsRequired: 500,
    claimed: false
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  
  // Initialize state from localStorage or defaults
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  const [userReward, setUserReward] = useState<UserReward>(() => {
    try {
      const saved = localStorage.getItem('userReward');
      return saved ? JSON.parse(saved) : {
        points: 0,
        level: 'bronze',
        rewards: initialRewards
      };
    } catch {
      return {
        points: 0,
        level: 'bronze',
        rewards: initialRewards
      };
    }
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return (localStorage.getItem('language') as Language) || 'bn';
    } catch {
      return 'bn';
    }
  });
  
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hasCompletedOnboarding') === 'true';
    } catch {
      return false;
    }
  });

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);
  
  useEffect(() => {
    localStorage.setItem('userReward', JSON.stringify(userReward));
  }, [userReward]);
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  useEffect(() => {
    localStorage.setItem('hasCompletedOnboarding', String(hasCompletedOnboarding));
  }, [hasCompletedOnboarding]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({ title: language === 'bn' ? "অনলাইন মোডে ফিরে আসা হয়েছে" : "Back online" });
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast({ 
        title: language === 'bn' ? "আপনি অফলাইন মোডে আছেন" : "You are offline", 
        description: language === 'bn' ? "কিছু ফিচার সীমিত হতে পারে" : "Some features may be limited"
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [language, toast]);

  // Favorites Functions
  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev;
      }
      
      toast({
        title: language === 'bn' ? "পছন্দে যোগ করা হয়েছে" : "Added to favorites",
        description: item.title,
      });
      
      return [...prev, item];
    });
  };
  
  const removeFromFavorites = (id: string) => {
    setFavorites(prev => {
      const item = prev.find(fav => fav.id === id);
      
      if (item) {
        toast({
          title: language === 'bn' ? "পছন্দ থেকে সরানো হয়েছে" : "Removed from favorites",
          description: item.title,
        });
      }
      
      return prev.filter(fav => fav.id !== id);
    });
  };
  
  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  // Reviews Functions
  const addReview = (review: Omit<ReviewItem, 'id' | 'createdAt'>) => {
    const newReview = {
      ...review,
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    
    setReviews(prev => [...prev, newReview]);
    
    // Add points for leaving a review
    addPoints(10);
    
    toast({
      title: language === 'bn' ? "রিভিউ জমা দেওয়া হয়েছে" : "Review submitted",
      description: language === 'bn' ? "আপনার মতামতের জন্য ধন্যবাদ" : "Thank you for your feedback",
    });
  };
  
  const getUserReviews = (userId: string) => {
    return reviews.filter(review => review.userId === userId);
  };
  
  const getItemReviews = (itemId: string) => {
    return reviews.filter(review => review.itemId === itemId);
  };

  // User Reward Functions
  const addPoints = (points: number) => {
    setUserReward(prev => {
      const newPoints = prev.points + points;
      let newLevel = prev.level;
      
      if (newPoints >= 500) newLevel = 'platinum';
      else if (newPoints >= 300) newLevel = 'gold';
      else if (newPoints >= 100) newLevel = 'silver';
      
      if (newLevel !== prev.level) {
        toast({
          title: language === 'bn' ? "অভিনন্দন!" : "Congratulations!",
          description: language === 'bn' 
            ? `আপনি ${newLevel === 'silver' ? 'সিলভার' : newLevel === 'gold' ? 'গোল্ড' : 'প্লাটিনাম'} লেভেলে উন্নীত হয়েছেন!`
            : `You've been promoted to ${newLevel} level!`,
        });
      }
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel,
      };
    });
  };
  
  const claimReward = (rewardId: string) => {
    setUserReward(prev => {
      const reward = prev.rewards.find(r => r.id === rewardId);
      
      if (!reward) return prev;
      
      if (reward.claimed) {
        toast({
          title: language === 'bn' ? "ইতিমধ্যে দাবি করা হয়েছে" : "Already claimed",
          description: language === 'bn' ? "এই পুরস্কার ইতিমধ্যে দাবি করা হয়েছে" : "This reward has already been claimed",
          variant: "destructive",
        });
        return prev;
      }
      
      if (prev.points < reward.pointsRequired) {
        toast({
          title: language === 'bn' ? "পর্যাপ্ত পয়েন্ট নেই" : "Not enough points",
          description: language === 'bn' 
            ? `এই পুরস্কার দাবি করতে আরও ${reward.pointsRequired - prev.points} পয়েন্ট প্রয়োজন`
            : `You need ${reward.pointsRequired - prev.points} more points to claim this reward`,
          variant: "destructive",
        });
        return prev;
      }
      
      toast({
        title: language === 'bn' ? "পুরস্কার দাবি করা হয়েছে" : "Reward claimed",
        description: reward.title,
      });
      
      return {
        ...prev,
        points: prev.points - reward.pointsRequired,
        rewards: prev.rewards.map(r => 
          r.id === rewardId ? { ...r, claimed: true } : r
        ),
      };
    });
  };

  // Translation Function
  const t = (key: string) => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  // Onboarding Function
  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    
    // Give initial points for completing onboarding
    addPoints(50);
    
    toast({
      title: language === 'bn' ? "অভিনন্দন!" : "Congratulations!",
      description: language === 'bn' 
        ? "অনবোর্ডিং সম্পূর্ণ করার জন্য আপনি ৫০ পয়েন্ট পেয়েছেন"
        : "You've earned 50 points for completing onboarding",
    });
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
