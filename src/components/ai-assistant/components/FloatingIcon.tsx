
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';

interface FloatingIconProps {
  position: { x: number; y: number };
  isDragging: boolean;
  isSpeaking: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onClick: () => void;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({
  position,
  isDragging,
  isSpeaking,
  onMouseDown,
  onClick
}) => {
  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ 
        left: position.x, 
        top: position.y,
      }}
      onMouseDown={onMouseDown}
    >
      <Button
        onClick={onClick}
        className="bg-primary hover:bg-primary/90 text-white rounded-full h-12 w-12 md:h-14 md:w-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 drag-handle"
        size="icon"
      >
        <Bot className="h-5 w-5 md:h-6 md:w-6" />
        {isSpeaking && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </Button>
    </div>
  );
};
