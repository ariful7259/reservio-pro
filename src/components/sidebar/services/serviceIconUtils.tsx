
import React from 'react';
import { 
  PaintBucket, Truck, Home, AirVent, Hammer, 
  Wrench, Pipette, HousePlus, Building, User, 
  DoorOpen, Hotel
} from 'lucide-react';

// Helper function to render the proper icon based on stored icon ID
export const renderServiceIcon = (iconId: string) => {
  switch (iconId) {
    case 'feature-1':
      return <PaintBucket className="h-6 w-6 text-pink-500" />;
    case 'feature-2':
      return <Truck className="h-6 w-6 text-blue-500" />;
    case 'feature-3':
      return <Home className="h-6 w-6 text-green-500" />;
    case 'feature-4':
      return <AirVent className="h-6 w-6 text-purple-500" />;
    case 'feature-5':
      return <Wrench className="h-6 w-6 text-amber-500" />;
    case 'feature-6':
      return <Hammer className="h-6 w-6 text-yellow-500" />;
    case 'feature-7':
      return <Pipette className="h-6 w-6 text-teal-500" />;
    case 'feature-8':
      return <HousePlus className="h-6 w-6 text-indigo-500" />;
    case 'feature-9':
      return <Building className="h-6 w-6 text-primary" />;
    case 'feature-10':
      return <Hotel className="h-6 w-6 text-green-500" />;
    case 'feature-11':
      return <DoorOpen className="h-6 w-6 text-purple-500" />;
    case 'feature-12':
      return <User className="h-6 w-6 text-red-500" />;
    default:
      return <Wrench className="h-6 w-6 text-primary" />;
  }
};
