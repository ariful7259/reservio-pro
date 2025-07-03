import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import GlobalAIAssistant from '@/components/GlobalAIAssistant';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      <Outlet />
      <GlobalAIAssistant />
    </div>
  );
};

export default Layout;