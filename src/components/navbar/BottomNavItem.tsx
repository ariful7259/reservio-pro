
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
        px-3 py-2 min-w-[56px] min-h-[52px] gap-0.5
        ${isActive ? 'text-primary' : 'text-gray-500'}
        transition-colors duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30
        `
      }
      style={{
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
      tabIndex={0}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="flex items-center justify-center h-6 w-6 text-lg">{icon}</span>
      <span className="text-xs mt-1 font-medium leading-4 max-w-[56px] whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </span>
      {/* নিচের কালো/primary লাইনটি বাদ দিয়েছি */}
    </Link>
  );
};

