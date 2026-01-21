import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MiniMapPreviewProps {
  latitude: number;
  longitude: number;
  showUserMarker?: boolean;
  height?: string;
}

export const MiniMapPreview: React.FC<MiniMapPreviewProps> = ({
  latitude,
  longitude,
  showUserMarker = true,
  height = "150px"
}) => {
  // Dhaka center for reference
  const centerLat = 23.8103;
  const centerLng = 90.4125;
  
  // Calculate position percentage (simplified for demo)
  const latRange = 0.15; // ~15km range
  const lngRange = 0.2;
  
  const posX = Math.min(90, Math.max(10, 50 + ((longitude - centerLng) / lngRange) * 50));
  const posY = Math.min(90, Math.max(10, 50 - ((latitude - centerLat) / latRange) * 50));

  return (
    <div 
      className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-green-100 via-green-50 to-blue-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
      style={{ height }}
    >
      {/* Map grid lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-gray-400" />
          ))}
        </div>
      </div>
      
      {/* Simulated roads */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-500" />
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-500" />
        <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-600 opacity-50" />
        <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600 opacity-50" />
        <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600 opacity-50" />
      </div>
      
      {/* User location marker */}
      {showUserMarker && (
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${posX}%`, top: `${posY}%` }}
        >
          {/* Pulse effect */}
          <div className="absolute inset-0 w-10 h-10 -ml-3 -mt-3">
            <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping" />
          </div>
          
          {/* Marker */}
          <div className="relative w-6 h-6 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
            <Navigation className="w-3 h-3 text-white fill-white" />
          </div>
        </div>
      )}
      
      {/* Coordinates display */}
      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
        <MapPin className="w-3 h-3 inline mr-1" />
        {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </div>
      
      {/* Compass */}
      <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center text-xs font-bold shadow">
        N
      </div>
    </div>
  );
};

export default MiniMapPreview;
