
import { ReactNode } from 'react';

export interface MenuItem {
  icon: ReactNode;
  name: string;
  path?: string;  // Ensure path is optional
  url?: string;   // Maintain url as optional
  badge?: number;
  show?: boolean;
}

export interface ProfileMenuItem extends MenuItem {
  // No need to redefine properties already in MenuItem
  // path property is already optional from MenuItem
}
