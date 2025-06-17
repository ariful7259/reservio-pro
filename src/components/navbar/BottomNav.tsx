
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Building, Search, ShoppingBag, Plus } from 'lucide-react';
import { BottomNavItem } from './BottomNavItem';
import { CreatePostPopover } from './CreatePostPopover';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  
  const navLinks = [
    {
      title: 'হোম',
      path: '/',
      icon: <Home className="h-5 w-5" />
    }, 
    {
      title: 'রেন্ট',
      path: '/rentals',
      icon: <Building className="h-5 w-5" />
    }, 
    {
      title: 'পোস্ট করুন',
      path: '/create-post',
      icon: <Plus className="h-5 w-5" />
    }, 
    {
      title: 'সার্ভিস',
      path: '/services',
      icon: <Search className="h-5 w-5" />
    }, 
    {
      title: 'মার্কেটপ্লেস',
      path: '/marketplace',
      icon: <ShoppingBag className="h-5 w-5" />
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 z-40">
      <div className="grid grid-cols-5 h-full">
        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.path;
          
          if (link.title === 'পোস্ট করুন') {
            return <CreatePostPopover key={link.path} />;
          }
          
          return (
            <BottomNavItem
              key={link.path}
              title={link.title}
              path={link.path}
              icon={link.icon}
              isActive={isActive}
            />
          );
        })}
      </div>
    </nav>
  );
};
