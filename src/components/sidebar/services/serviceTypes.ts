
import { ReactNode } from 'react';

export interface ServiceCategory {
  name: string;
  icon: ReactNode;
  path: string;
  subCategories?: ServiceSubCategory[];
}

export interface ServiceSubCategory {
  name: string;
  icon: ReactNode;
  path: string;
}

export interface CustomService {
  id: string;
  name: string;
  icon: string; // Icon ID stored as string
}
