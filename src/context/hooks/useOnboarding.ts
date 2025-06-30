
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Language } from '../types';

export const useOnboarding = (language: Language, addPoints: (points: number) => void) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      return localStorage.getItem('hasCompletedOnboarding') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('hasCompletedOnboarding', String(hasCompletedOnboarding));
  }, [hasCompletedOnboarding]);

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

  return {
    hasCompletedOnboarding,
    completeOnboarding
  };
};
