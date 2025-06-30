
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Language } from '../types';

export const useOnlineStatus = (language: Language) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

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

  return isOnline;
};
