
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication check
    const checkAuth = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login
    const mockUser = { 
      id: '1',
      email, 
      name: 'Test User',
      avatar: null,
      phone: null,
      role: 'user' // Default role
    };
    setUser(mockUser);
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup
    const mockUser = { 
      id: '1',
      email, 
      name,
      avatar: null,
      phone: null,
      role: 'user' // Default role
    };
    setUser(mockUser);
    return { success: true };
  };

  const updateUserProfile = (profileData: any) => {
    if (user) {
      setUser({ ...user, ...profileData });
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Computed properties based on user
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller' || user?.role === 'admin';

  return {
    user,
    loading,
    login,
    signup,
    updateUserProfile,
    logout,
    isAuthenticated,
    isAdmin,
    isSeller
  };
};
