import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommunityMenu } from './CommunityMenu';
import { CartDropdown } from './CartDropdown';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
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
  return <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
      <div className="hidden md:block">
        <CommunityMenu />
      </div>
      
      <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" onClick={() => navigate('/wallet')}>
        <Wallet className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
      </Button>

      <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" onClick={handleMarketplaceClick}>
        <StoreIcon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
      </Button>

      {/* Cart Dropdown */}
      <NotificationCenter />
      <CartDropdown />

      {/* Wish2Earn Feature Button */}
      

      {/* নিচের Profile (avatar) বাদ দিয়ে Wish2EarnBadge লাগানো হলো */}
      <div className="ml-0 sm:ml-1 md:ml-2">
        <Wish2EarnBadge onClick={handleWish2EarnClick} />
      </div>
    </div>;
};