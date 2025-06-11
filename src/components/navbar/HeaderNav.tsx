
import React from 'react';
import { NavbarLogo } from './NavbarLogo';
import { NavbarSearch } from './NavbarSearch';
import { ActionButtons } from './ActionButtons';

export const HeaderNav: React.FC = () => {
  return (
    <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between h-14 md:h-16 px-3 md:px-6">
        <NavbarLogo />
        <div className="hidden sm:block flex-1 max-w-md mx-4">
          <NavbarSearch />
        </div>
        <ActionButtons />
      </header>
      
      {/* Mobile search bar - optimized spacing and visibility */}
      <div className="sm:hidden border-t bg-white px-3 py-3">
        <NavbarSearch />
      </div>
    </div>
  );
};
