
import React from 'react';
import { WifiOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const OfflineIndicator: React.FC = () => {
  const { isOnline, language } = useApp();
  
  if (isOnline) return null;
  
  return (
    <div className="fixed bottom-16 left-0 right-0 mx-auto w-max z-50">
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
