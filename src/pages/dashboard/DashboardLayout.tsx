
import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider } from '@/components/ui/sidebar';

import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardAuthCheck } from '@/components/dashboard/DashboardAuthCheck';

interface DashboardLayoutProps {
  type?: 'marketplace' | 'rental' | 'service' | 'content';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ type = 'marketplace' }) => {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <SidebarProvider>
      <DashboardAuthCheck isAuthenticated={isAuthenticated}>
        <div className="flex w-full min-h-screen pt-16">
          {/* Mobile menu toggle button */}
          <div className="fixed top-16 left-0 z-40 p-4 lg:hidden">
            <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Sidebar - Desktop always visible, mobile conditionally */}
          <div className={cn(
            "fixed top-16 bottom-0 z-30 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <DashboardSidebar 
              type={type} 
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
          
          {/* Overlay for mobile menu */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/30 z-20 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          
          {/* Main content */}
          <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </div>
        </div>
      </DashboardAuthCheck>
    </SidebarProvider>
  );
};

export default DashboardLayout;
