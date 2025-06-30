
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { ReviewItem, Language } from '../types';

export const useReviews = (language: Language, addPoints: (points: number) => void) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

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

  return {
    reviews,
    addReview,
    getUserReviews,
    getItemReviews
  };
};
