
import React from 'react';
import { X } from 'lucide-react';
import { CustomService } from './serviceTypes';
import { renderServiceIcon } from './serviceIconUtils';

interface CustomServiceItemProps {
  service: CustomService;
  onRemove: (id: string) => void;
}

export const CustomServiceItem = ({ service, onRemove }: CustomServiceItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm relative">
        <button 
          onClick={() => onRemove(service.id)}
          className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
          aria-label="Remove service"
        >
          <X className="h-3 w-3 text-red-600" />
        </button>
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mb-2 shadow-inner">
          {renderServiceIcon(service.id)}
        </div>
        <span className="text-xs font-medium text-center line-clamp-2">{service.name}</span>
      </div>
    </div>
  );
};
