import React from 'react';
import { LayoutGrid } from 'lucide-react';

interface WalletFloatingButtonProps {
  onClick: () => void;
}

const WalletFloatingButton: React.FC<WalletFloatingButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={onClick}
        className="relative group"
      >
        {/* Outer ring with shadow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-200 to-gray-300 shadow-lg transform scale-110"></div>
        
        {/* Main button */}
        <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-105 group-active:scale-95">
          <LayoutGrid className="h-7 w-7 text-white" />
        </div>
      </button>
    </div>
  );
};

export default WalletFloatingButton;
