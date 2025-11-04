import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommunityMenu } from './CommunityMenu';
import { CartDropdown } from './CartDropdown';


export const ActionButtons: React.FC = () => {
  const navigate = useNavigate();
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
      <CartDropdown />
    </div>;
};