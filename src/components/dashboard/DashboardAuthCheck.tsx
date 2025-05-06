
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardAuthCheckProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const DashboardAuthCheck: React.FC<DashboardAuthCheckProps> = ({ 
  isAuthenticated, 
  children 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col gap-4">
        <h2 className="text-xl">ড্যাশবোর্ড ব্যবহারের জন্য লগইন করুন</h2>
        <Button onClick={() => navigate('/login', { state: { from: location.pathname } })}>
          <LogIn className="h-4 w-4 mr-2" />
          লগইন করুন
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
