
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarDrawer } from '@/components/SidebarDrawer';

export const NavbarLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 md:gap-3 animate-fade-in">
      <SidebarDrawer />
      <Link to="/" className="flex items-center">
        <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text hover:opacity-90 transition-opacity">
          Reservio
        </span>
      </Link>
    </div>
  );
};
