
import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';

import { DashboardHeader } from './DashboardHeader';
import { DashboardMenuItems } from './DashboardMenuItems';
import { DashboardFooter } from './DashboardFooter';

interface DashboardSidebarProps {
  type: 'marketplace' | 'rental' | 'service' | 'content';
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  type,
  isMobileMenuOpen,
  toggleMobileMenu
}) => {
  return (
    <Sidebar className="bg-white shadow-sm">
      <SidebarHeader className="p-0">
        <DashboardHeader type={type} />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>মেনু</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <DashboardMenuItems 
                type={type} 
                onItemClick={() => {
                  if (isMobileMenuOpen) toggleMobileMenu();
                }} 
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-0">
        <DashboardFooter />
      </SidebarFooter>
    </Sidebar>
  );
};
