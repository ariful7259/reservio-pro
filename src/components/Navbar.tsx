
import React from 'react';
import { useLocation } from 'react-router-dom';
import { HeaderNav } from './navbar/HeaderNav';
import { BottomNav } from './navbar/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes("/admin-dashboard");
  
  // Don't render navbar on admin pages
  if (isAdminPage) {
    return null;
  }
  
  return (
    <>
      <HeaderNav />
      <BottomNav />
    </>
  );
};

export default Navbar;
