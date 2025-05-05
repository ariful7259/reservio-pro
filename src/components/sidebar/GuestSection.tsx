
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DrawerTitle } from '@/components/ui/drawer';

export const GuestSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between w-full">
      <DrawerTitle className="text-lg">Reservio</DrawerTitle>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => navigate("/login")}>
          <LogIn className="h-4 w-4 mr-2" />
          লগইন
        </Button>
        <Button onClick={() => navigate("/signup")}>
          সাইন আপ
        </Button>
      </div>
    </div>
  );
};
