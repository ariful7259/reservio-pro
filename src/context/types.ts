
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

export type AppContextType = {
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
  setLanguage: (Language: Language) => void;
  t: (key: string) => string;
  
  // Offline Support
  isOnline: boolean;
  
  // Onboarding
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
};
