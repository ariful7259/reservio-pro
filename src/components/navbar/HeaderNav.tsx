import React from 'react';
import { NavbarLogo } from './NavbarLogo';
import { NavbarSearch } from './NavbarSearch';
import { ActionButtons } from './ActionButtons';
export const HeaderNav: React.FC = () => {
  return <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between h-14 md:h-16 px-2 sm:px-3 md:px-6">
        <NavbarLogo />
        <div className="hidden sm:block flex-1 max-w-md mx-2 md:mx-4">
          <NavbarSearch />
        </div>
        <ActionButtons />
      </header>
      
      {/* Mobile search bar - show below header on mobile */}
      <div className="sm:hidden bg-white border-t border-gray-100 px-2 py-2">
        <NavbarSearch />
      </div>
    </div>;
};