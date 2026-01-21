import React from 'react';
import { Search, Bell, QrCode, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WalletHeaderProps {
  userName?: string;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  onQrClick?: () => void;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({
  userName = 'User',
  onSearchClick,
  onNotificationClick,
  onQrClick
}) => {
  return (
    <div className="bg-gradient-to-r from-primary to-purple-600 text-white px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40">
              <User className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-white flex items-center justify-center">
              <span className="text-primary text-xs">✓</span>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">হ্যালো, {userName}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-full"
            onClick={onSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-full relative"
            onClick={onNotificationClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 rounded-full"
            onClick={onQrClick}
          >
            <QrCode className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletHeader;
