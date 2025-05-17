
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, StoreIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommunityMenu } from './CommunityMenu';
import { UserProfile } from './UserProfile';

export const ActionButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3">
      <CommunityMenu />
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative" 
        onClick={() => navigate('/wallet')}
      >
        <Wallet className="h-5 w-5" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon" 
        className="relative" 
        onClick={() => navigate('/digital-products')}
      >
        <StoreIcon className="h-5 w-5" />
      </Button>

      <UserProfile />
    </div>
  );
};
