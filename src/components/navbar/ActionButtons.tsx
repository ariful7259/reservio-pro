
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommunityMenu } from './CommunityMenu';
import { UserProfile } from './UserProfile';

export const ActionButtons: React.FC = () => {
  const navigate = useNavigate();

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
        onClick={() => navigate('/digital-products')}
      >
        <StoreIcon className="h-4 w-4 md:h-5 md:w-5" />
      </Button>

      <UserProfile />
    </div>
  );
};
