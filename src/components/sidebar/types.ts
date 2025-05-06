
import { ReactNode } from 'react';

export interface MenuItem {
  icon: ReactNode;
  name: string;
  path?: string;
  url?: string;
  badge?: number;
  show?: boolean;
}

export interface ProfileMenuItem extends MenuItem {
  show?: boolean;
  badge?: number;
}
