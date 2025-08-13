
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommunityMenu } from './CommunityMenu';
// import { UserProfile } from './UserProfile'; // পুরনো প্রোফাইল ইমেজ সরানো হয়েছে
import Wish2EarnBadge from '@/components/wish2earn/Wish2EarnBadge';

export const ActionButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleWish2EarnClick = () => {
    // এখন Wish2Earn-এর ফুলপেজে যাবে
    navigate('/wish2earn');
  };

  const handleMarketplaceClick = () => {
    // MarketplaceHub এ নিয়ে যাবে
    navigate('/marketplace-hub');
  };

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <div className="hidden md:block">
        <CommunityMenu />
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative h-8 w-8 md:h-10 md:w-10" 
        onClick={() => navigate('/wallet')}
      >
        <Wallet className="h-4 w-4 md:h-5 md:w-5" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        className="relative h-8 w-8 md:h-10 md:w-10" 
        onClick={handleMarketplaceClick}
      >
        <StoreIcon className="h-4 w-4 md:h-5 md:w-5" />
      </Button>

      {/* Wish2Earn Feature Button */}
      <Button 
        variant="ghost" 
        size="sm" 
        className="relative h-8 md:h-10 px-2 md:px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-xs md:text-sm rounded-lg shadow-md"
        onClick={handleWish2EarnClick}
      >
        🎯 Wish2Earn
      </Button>

      {/* নিচের Profile (avatar) বাদ দিয়ে Wish2EarnBadge লাগানো হলো */}
      <div className="ml-0 md:ml-2">
        <Wish2EarnBadge onClick={handleWish2EarnClick} />
      </div>
    </div>
  );
};
