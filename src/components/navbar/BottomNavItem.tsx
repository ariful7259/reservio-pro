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
      className={
        `relative flex flex-col items-center justify-center
        px-2 py-2 min-w-[60px] min-h-[56px] gap-1
        ${isActive ? 'text-primary bg-primary/5' : 'text-gray-500'}
        transition-all duration-200 touch-manipulation tap-highlight-none
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        hover:text-primary/80 active:scale-95 rounded-md
        `
      }
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
      tabIndex={0}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={`flex items-center justify-center h-6 w-6 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
        {icon}
      </span>
      <span className={`text-xs font-medium leading-tight max-w-[60px] whitespace-nowrap overflow-hidden text-ellipsis text-center ${isActive ? 'font-semibold' : ''}`}>
        {title}
      </span>
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
};
