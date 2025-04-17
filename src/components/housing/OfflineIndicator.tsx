
import React from 'react';
import { WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  isOnline: boolean;
  language: 'bn' | 'en';
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline, language }) => {
  if (isOnline) return null;
  
  return (
    <div className="mb-4 p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-center">
      <WifiOff className="h-5 w-5 mr-2 flex-shrink-0" />
      <div>
        <p className="text-sm font-medium">
          {language === 'bn' ? 'অফলাইন মোড' : 'Offline Mode'}
        </p>
        <p className="text-xs">
          {language === 'bn' 
            ? 'আপনি অফলাইন মোডে আছেন। কিছু ফিচার সীমিত হতে পারে।' 
            : 'You are in offline mode. Some features may be limited.'}
        </p>
      </div>
    </div>
  );
};

export default OfflineIndicator;
