
import React from 'react';
import { NavbarLogo } from './NavbarLogo';
import { NavbarSearch } from './NavbarSearch';
import { ActionButtons } from './ActionButtons';

export const HeaderNav: React.FC = () => {
  return (
    <div className="bg-white border-b fixed top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between h-16 px-4 md:px-6">
        <NavbarLogo />
        <NavbarSearch />
        <ActionButtons />
      </header>
    </div>
  );
};
