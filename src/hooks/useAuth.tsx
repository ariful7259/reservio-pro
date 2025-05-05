
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'seller';
  verified: boolean;
  sellerVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  // Mock login function (would use Supabase or other auth in real app)
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const userData: User = {
      id: '1',
      name: 'আহমেদ হাসান',
      email: email,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: email.includes('admin') ? 'admin' : email.includes('seller') ? 'seller' : 'user',
      verified: true,
      sellerVerified: email.includes('seller') ? true : false
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Similar to login but would actually create the user in a real app
    const userData: User = {
      id: '1',
      name: name,
      email: email,
      role: 'user',
      verified: false
    };
    
    setUser(userData);
    setIsAuthenticated(true);
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  // Compute isAdmin based on user role
  const isAdmin = user?.role === 'admin';
  
  // Compute isSeller based on user role
  const isSeller = user?.role === 'seller';
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      isSeller,
      login, 
      logout, 
      signup 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
