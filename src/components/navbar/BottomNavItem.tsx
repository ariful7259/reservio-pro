
import React from 'react';
import { Link } from 'react-router-dom';

interface BottomNavItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export const BottomNavItem: React.FC<BottomNavItemProps> = ({ title, path, icon, isActive }) => {
  return (
    <Link 
      to={path} 
      className={`flex flex-col items-center justify-center ${isActive ? 'text-primary' : 'text-gray-500'}`}
    >
      {icon}
      <span className="text-xs mt-1">{title}</span>
      {isActive && <div className="absolute top-0 h-1 w-10 rounded-full bg-primary" />}
    </Link>
  );
};
