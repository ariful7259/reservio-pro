
import React from 'react';
import { WifiOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from '@/components/ui/use-toast';

interface OfflineIndicatorProps {
  customPosition?: string;
  customMessage?: {
    bn: string;
    en: string;
  };
  customDuration?: number;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  customPosition,
  customMessage,
  customDuration
}) => {
  const { isOnline, language } = useApp();
  
  // অ্যাডমিন সেটিংসের জন্য ডিফল্ট কনফিগ
  // প্রোডাকশনে এটি স্টোর থেকে বা context থেকে আসবে
  const defaultMessage = {
    bn: "আপনি অফলাইন মোডে আছেন। কিছু ফিচার সীমিত হতে পারে। ইন্টারনেট সংযোগ পুনরায় স্থাপন করুন।",
    en: "You are offline. Some features may be limited. Please restore your internet connection."
  };
  
  // কাস্টম কনফিগ বা ডিফল্ট ভ্যালু ব্যবহার করা
  const message = customMessage?.[language as 'bn' | 'en'] || (language === 'bn' ? defaultMessage.bn : defaultMessage.en);
  const duration = customDuration || 5000; // ডিফল্ট 5 সেকেন্ড
  
  // পজিশন ক্লাস ক্যালকুলেশন
  const getPositionClass = () => {
    switch (customPosition) {
      case 'top':
        return 'top-4 left-0 right-0 mx-auto';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-16 right-4';
      case 'bottom-left':
        return 'bottom-16 left-4';
      case 'bottom':
      default:
        return 'bottom-16 left-0 right-0 mx-auto';
    }
  };

  // Show toast when going offline
  React.useEffect(() => {
    if (!isOnline) {
      toast({
        title: language === 'bn' ? "আপনি অফলাইন মোডে আছেন" : "You are offline",
        description: message,
        variant: "destructive",
        duration: duration || 5000,
      });
    }
  }, [isOnline, language, message, duration]);
  
  if (isOnline) return null;
  
  return (
    <div className={`fixed ${getPositionClass()} w-max z-50`}>
      <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          {language === 'bn' ? 'অফলাইন মোড' : 'Offline Mode'}
        </span>
      </div>
    </div>
  );
};

export default OfflineIndicator;
