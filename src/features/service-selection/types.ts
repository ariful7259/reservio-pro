
import { ReactNode } from 'react';

export interface Feature {
  id: string;
  name: string;
  icon: ReactNode;
  description?: string;
  category?: string;
  isSelected?: boolean;
}

export interface SavedFeature {
  id: string;
  name: string;
  icon: string; // Icon ID stored as string
}
