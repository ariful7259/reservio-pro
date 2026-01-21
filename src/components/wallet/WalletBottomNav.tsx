import React from 'react';
import { Home, FileText, HelpCircle, LayoutGrid } from 'lucide-react';

type NavItem = 'home' | 'statement' | 'support' | 'more';

interface WalletBottomNavProps {
  activeItem?: NavItem;
  onItemClick?: (item: NavItem) => void;
}

const WalletBottomNav: React.FC<WalletBottomNavProps> = ({
  activeItem = 'home',
  onItemClick
}) => {
  const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'হোম', icon: <Home className="h-5 w-5" /> },
    { id: 'statement', label: 'স্টেটমেন্ট', icon: <FileText className="h-5 w-5" /> },
    { id: 'support', label: 'সাপোর্ট', icon: <HelpCircle className="h-5 w-5" /> },
    { id: 'more', label: 'আরো', icon: <LayoutGrid className="h-5 w-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-lg z-40">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick?.(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeItem === item.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
            {item.id === 'more' && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                ৳
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Safe area for mobile */}
      <div className="h-safe-area-bottom bg-white"></div>
    </div>
  );
};

export default WalletBottomNav;
