import React from 'react';
import { MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapMarkerProps {
  type: 'user' | 'item';
  title?: string;
  price?: number;
  distance?: string;
  onClick?: () => void;
  position: { x: number; y: number }; // Percentage position on map
  isSelected?: boolean;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  type,
  title,
  price,
  distance,
  onClick,
  position,
  isSelected = false
}) => {
  const isUser = type === 'user';

  return (
    <div
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200 z-10",
        isSelected && "z-20 scale-110"
      )}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onClick={onClick}
    >
      {/* মার্কার */}
      <div className={cn(
        "relative flex flex-col items-center",
        isUser ? "animate-pulse" : "hover:scale-110 transition-transform"
      )}>
        {/* মার্কার আইকন */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white",
          isUser 
            ? "bg-blue-500 text-white" 
            : "bg-red-500 text-white"
        )}>
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <MapPin className="w-4 h-4" />
          )}
        </div>
        
        {/* মার্কার পিন */}
        <div className={cn(
          "w-0 h-0 border-l-4 border-r-4 border-t-8 -mt-1",
          isUser 
            ? "border-l-transparent border-r-transparent border-t-blue-500"
            : "border-l-transparent border-r-transparent border-t-red-500"
        )} />
        
        {/* ইউজার লেবেল */}
        {isUser && (
          <div className="absolute -bottom-6 whitespace-nowrap bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
            আপনি এখানে
          </div>
        )}
        
        {/* আইটেম পপআপ */}
        {!isUser && isSelected && title && (
          <div className="absolute bottom-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 min-w-[150px] border">
            <p className="text-sm font-medium truncate">{title}</p>
            {price && (
              <p className="text-xs text-primary font-semibold">৳{price.toLocaleString('bn-BD')}</p>
            )}
            {distance && (
              <p className="text-xs text-muted-foreground">{distance} দূরে</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapMarker;
