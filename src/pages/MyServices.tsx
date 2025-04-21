
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const MyServices = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    
    if (user?.role === 'seller') {
      navigate('/seller-dashboard');
    } else {
      navigate('/create-store');
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

export default MyServices;
