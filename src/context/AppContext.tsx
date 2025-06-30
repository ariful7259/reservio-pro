import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

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

// Enhanced translations with more keys
const translations = {
  en: {
    // Navigation
    'home': 'Home',
    'services': 'Services',
    'rentals': 'Rentals',
    'shopping': 'Shopping',
    'marketplace': 'Marketplace',
    'wallet': 'Wallet',
    'profile': 'Profile',
    'favorites': 'Favorites',
    'settings': 'Settings',
    
    // Common Actions
    'add_to_favorites': 'Add to favorites',
    'remove_from_favorites': 'Remove from favorites',
    'book_now': 'Book Now',
    'buy_now': 'Buy Now',
    'add_to_cart': 'Add to Cart',
    'view_details': 'View Details',
    'contact_seller': 'Contact Seller',
    'share': 'Share',
    'bookmark': 'Bookmark',
    'search': 'Search',
    'filter': 'Filter',
    'sort': 'Sort',
    'show_more': 'Show More',
    'show_less': 'Show Less',
    
    // Categories
    'all_categories': 'All Categories',
    'electronics': 'Electronics',
    'fashion': 'Fashion',
    'home_garden': 'Home & Garden',
    'books': 'Books & Stationery',
    'vehicles': 'Vehicles',
    'real_estate': 'Real Estate',
    'services_category': 'Services',
    
    // Service Categories
    'medical_services': 'Medical Services',
    'dental_care': 'Dental Care',
    'salon_beauty': 'Salon & Beauty',
    'electronics_repair': 'Electronics Repair',
    'mobile_gadgets': 'Mobile & Gadgets',
    'cooking_services': 'Cooking Services',
    'cleaning_services': 'Cleaning Services',
    'furniture_repair': 'Furniture Repair',
    'pest_control': 'Pest Control',
    'education_tutor': 'Education & Tutoring',
    'photography': 'Photography',
    'delivery_service': 'Delivery Service',
    'it_services': 'IT Services',
    'event_management': 'Event Management',
    'construction': 'Construction',
    'transport': 'Transport',
    
    // Common Labels
    'price': 'Price',
    'location': 'Location',
    'rating': 'Rating',
    'reviews': 'Reviews',
    'verified': 'Verified',
    'featured': 'Featured',
    'new': 'New',
    'popular': 'Popular',
    'trending': 'Trending',
    'top_rated': 'Top Rated',
    'near_you': 'Near You',
    'available': 'Available',
    'unavailable': 'Unavailable',
    'in_stock': 'In Stock',
    'out_of_stock': 'Out of Stock',
    
    // User Profile
    'my_profile': 'My Profile',
    'edit_profile': 'Edit Profile',
    'my_orders': 'My Orders',
    'my_bookings': 'My Bookings',
    'transaction_history': 'Transaction History',
    'logout': 'Logout',
    'login': 'Login',
    'register': 'Register',
    
    // Notifications
    'notifications': 'Notifications',
    'no_notifications': 'No notifications',
    'mark_as_read': 'Mark as read',
    'clear_all': 'Clear all',
    
    // Rewards & Loyalty
    'loyalty_points': 'Loyalty Points',
    'claim_reward': 'Claim Reward',
    'my_reviews': 'My Reviews',
    'submit_review': 'Submit Review',
    
    // Languages
    'language': 'Language',
    'english': 'English',
    'bengali': 'Bengali',
    'change_language': 'Change Language',
    'language_settings': 'Language Settings',
    'select_language': 'Select Language',
    'translation_status': 'Translation Status',
    'overall_completeness': 'Overall Completeness',
    'give_translation_feedback': 'Give feedback on translations',
    
    // Offline
    'offline_mode': 'Offline Mode',
    'back_online': 'Back online',
    'you_are_offline': 'You are offline',
    'limited_features': 'Some features may be limited',
    
    // Errors & Messages
    'something_went_wrong': 'Something went wrong',
    'please_try_again': 'Please try again',
    'loading': 'Loading',
    'no_results': 'No results found',
    'search_placeholder': 'Search for products, services...',
    
    // Booking & Orders
    'book_service': 'Book Service',
    'order_placed': 'Order Placed',
    'order_confirmed': 'Order Confirmed',
    'order_cancelled': 'Order Cancelled',
    'booking_confirmed': 'Booking Confirmed',
    'payment_successful': 'Payment Successful',
    'payment_failed': 'Payment Failed',
    
    // Service Categories Grid
    'service_categories': 'Service Categories',
    'add_service': 'Add Service',
    'categories': 'Categories',
    'subcategories': 'subcategories',
    'booking_types': 'Booking Types',
    'services_found': 'services found',
    'all_services': 'All Services',
    
    // Marketplace specific
    'flash_deals': 'Flash Deals',
    'used_products': 'Used Products',
    'local_brands': 'Local Brands',
    'post_item': 'Post Item',
    'buy_now': 'Buy Now',
    'add_to_cart': 'Add to Cart',
    'chat': 'Chat',
    'register_brand': 'Register Brand',
    'support_local': 'Support Local',
    'condition_excellent': 'Excellent',
    'condition_good': 'Good',
    'condition_fair': 'Fair',
    'posted_days_ago': 'days ago',
    'posted_week_ago': 'week ago',
    'sold': 'sold',
    'stock': 'stock',
    'discount': 'discount',
    'featured_products': 'Featured Products',
    'view_all': 'View All',
  },
  bn: {
    // Navigation
    'home': 'হোম',
    'services': 'সেবাসমূহ',
    'rentals': 'ভাড়া',
    'shopping': 'শপিং',
    'marketplace': 'মার্কেটপ্লেস',
    'wallet': 'ওয়ালেট',
    'profile': 'প্রোফাইল',
    'favorites': 'পছন্দসমূহ',
    'settings': 'সেটিংস',
    
    // Common Actions
    'add_to_favorites': 'পছন্দে যোগ করুন',
    'remove_from_favorites': 'পছন্দ থেকে সরান',
    'book_now': 'এখনই বুক করুন',
    'buy_now': 'এখনই কিনুন',
    'add_to_cart': 'কার্টে যোগ করুন',
    'view_details': 'বিস্তারিত দেখুন',
    'contact_seller': 'বিক্রেতার সাথে যোগাযোগ',
    'share': 'শেয়ার করুন',
    'bookmark': 'বুকমার্ক',
    'search': 'খুঁজুন',
    'filter': 'ফিল্টার',
    'sort': 'সাজান',
    'show_more': 'আরো দেখুন',
    'show_less': 'কম দেখুন',
    
    // Categories
    'all_categories': 'সব ক্যাটাগরি',
    'electronics': 'ইলেকট্রনিক্স',
    'fashion': 'ফ্যাশন',
    'home_garden': 'ঘর ও বাগান',
    'books': 'বই ও স্টেশনারি',
    'vehicles': 'যানবাহন',
    'real_estate': 'রিয়েল এস্টেট',
    'services_category': 'সেবাসমূহ',
    
    // Service Categories
    'medical_services': 'ডাক্তার ও স্বাস্থ্য সেবা',
    'dental_care': 'ডেন্টাল কেয়ার',
    'salon_beauty': 'সেলুন ও বিউটি সার্ভিস',
    'electronics_repair': 'ইলেকট্রনিক্স রিপেয়ার',
    'mobile_gadgets': 'মোবাইল ও গ্যাজেট সার্ভিস',
    'cooking_services': 'খাবার ও কুকিং সার্ভিস',
    'cleaning_services': 'হাউজ ক্লিনিং সার্ভিস',
    'furniture_repair': 'ফার্নিচার মেকিং/রিপেয়ার',
    'pest_control': 'পেস্ট কন্ট্রোল সার্ভিস',
    'education_tutor': 'শিক্ষা ও টিউটর সার্ভিস',
    'photography': 'ফটোগ্রাফি সার্ভিস',
    'delivery_service': 'ডেলিভারি সার্ভিস',
    'it_services': 'আইটি ও ডিজিটাল সার্ভিস',
    'event_management': 'ইভেন্ট ম্যানেজমেন্ট',
    'construction': 'কনস্ট্রাকশন ও হোম সার্ভিস',
    'transport': 'ট্রান্সপোর্ট/রেন্টাল সার্ভিস',
    
    // Common Labels
    'price': 'দাম',
    'location': 'অবস্থান',
    'rating': 'রেটিং',
    'reviews': 'রিভিউ',
    'verified': 'ভেরিফায়েড',
    'featured': 'ফিচার্ড',
    'new': 'নতুন',
    'popular': 'জনপ্রিয়',
    'trending': 'ট্রেন্ডিং',
    'top_rated': 'সর্বোচ্চ রেটেড',
    'near_you': 'আপনার কাছে',
    'available': 'উপলব্ধ',
    'unavailable': 'অনুপলব্ধ',
    'in_stock': 'স্টকে আছে',
    'out_of_stock': 'স্টকে নেই',
    
    // User Profile
    'my_profile': 'আমার প্রোফাইল',
    'edit_profile': 'প্রোফাইল সম্পাদনা',
    'my_orders': 'আমার অর্ডার',
    'my_bookings': 'আমার বুকিং',
    'transaction_history': 'লেনদেনের ইতিহাস',
    'logout': 'লগআউট',
    'login': 'লগইন',
    'register': 'নিবন্ধন',
    
    // Notifications
    'notifications': 'নোটিফিকেশন',
    'no_notifications': 'কোনো নোটিফিকেশন নেই',
    'mark_as_read': 'পড়া হয়েছে চিহ্নিত করুন',
    'clear_all': 'সব মুছে দিন',
    
    // Rewards & Loyalty
    'loyalty_points': 'লয়ালটি পয়েন্ট',
    'claim_reward': 'পুরস্কার দাবি করুন',
    'my_reviews': 'আমার রিভিউসমূহ',
    'submit_review': 'রিভিউ জমা দিন',
    
    // Languages
    'language': 'ভাষা',
    'english': 'ইংরেজি',
    'bengali': 'বাংলা',
    'change_language': 'ভাষা পরিবর্তন',
    'language_settings': 'ভাষা সেটিংস',
    'select_language': 'ভাষা নির্বাচন করুন',
    'translation_status': 'অনুবাদ স্ট্যাটাস',
    'overall_completeness': 'সামগ্রিক সম্পূর্ণতা',
    'give_translation_feedback': 'অনুবাদ সম্পর্কে প্রতিক্রিয়া দিন',
    
    // Offline
    'offline_mode': 'অফলাইন মোড',
    'back_online': 'অনলাইনে ফিরে আসা হয়েছে',
    'you_are_offline': 'আপনি অফলাইন মোডে আছেন',
    'limited_features': 'কিছু ফিচার সীমিত হতে পারে',
    
    // Errors & Messages
    'something_went_wrong': 'কিছু ভুল হয়েছে',
    'please_try_again': 'আবার চেষ্টা করুন',
    'loading': 'লোড হচ্ছে',
    'no_results': 'কোনো ফলাফল পাওয়া যায়নি',
    'search_placeholder': 'পণ্য, সেবা খুঁজুন...',
    
    // Booking & Orders
    'book_service': 'সেবা বুক করুন',
    'order_placed': 'অর্ডার দেওয়া হয়েছে',
    'order_confirmed': 'অর্ডার নিশ্চিত',
    'order_cancelled': 'অর্ডার বাতিল',
    'booking_confirmed': 'বুকিং নিশ্চিত',
    'payment_successful': 'পেমেন্ট সফল',
    'payment_failed': 'পেমেন্ট ব্যর্থ',
    
    // Service Categories Grid
    'service_categories': 'সেবা ক্যাটাগরি',
    'add_service': 'সেবা যোগ করুন',
    'categories': 'ক্যাটাগরি সমূহ',
    'subcategories': 'সাব-ক্যাটাগরি',
    'booking_types': 'বুকিং টাইপ',
    'services_found': 'টি সেবা পাওয়া গেছে',
    'all_services': 'সকল সেবা',
    
    // Marketplace specific
    'flash_deals': 'ফ্ল্যাশ ডিল',
    'used_products': 'পুরাতন পণ্য',
    'local_brands': 'লোকাল ব্র্যান্ড',
    'post_item': 'পোস্ট করুন',
    'buy_now': 'এখনই কিনুন',
    'add_to_cart': 'কার্টে যোগ করুন',
    'chat': 'চ্যাট',
    'register_brand': 'ব্র্যান্ড রেজিস্টার',
    'support_local': 'স্থানীয় সাপোর্ট',
    'condition_excellent': 'চমৎকার',
    'condition_good': 'ভালো',
    'condition_fair': 'মোটামুটি',
    'posted_days_ago': 'দিন আগে',
    'posted_week_ago': 'সপ্তাহ আগে',
    'sold': 'বিক্রিত',
    'stock': 'স্টক',
    'discount': 'ছাড়',
    'featured_products': 'ফিচার্ড প্রোডাক্ট',
    'view_all': 'সব দেখুন',
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
  // Don't use useToast here, use the imported toast function directly
  
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
  }, [language]);

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
