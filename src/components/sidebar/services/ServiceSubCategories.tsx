
import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceSubCategory } from './serviceTypes';

interface ServiceSubCategoriesProps {
  subCategories: ServiceSubCategory[];
}

export const ServiceSubCategories = ({ subCategories }: ServiceSubCategoriesProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {subCategories.map((subCat, subIdx) => (
        <Link
          key={`sub-${subIdx}`}
          to={subCat.path}
          className="flex flex-col items-center text-center p-1 hover:bg-blue-100 rounded-md transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center mb-1 shadow-sm">
            {subCat.icon}
          </div>
          <span className="text-xs">{subCat.name}</span>
        </Link>
      ))}
    </div>
  );
};
