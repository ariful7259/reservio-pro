
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  address?: string;
  verified?: boolean;
  role?: string;
  sellerType?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate login - in real app, this would call an API
      const mockUser: User = { 
        id: '1', 
        email, 
        name: 'Demo User',
        avatar: 'https://i.pravatar.cc/150?img=1',
        phone: '+8801234567890',
        address: 'Dhaka, Bangladesh',
        verified: true,
        role: email === 'admin@example.com' ? 'admin' : 'user',
        sellerType: email.includes('seller') ? 'premium' : undefined
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate signup - in real app, this would call an API
      const mockUser: User = { 
        id: Date.now().toString(), 
        email, 
        name,
        avatar: 'https://i.pravatar.cc/150?img=2',
        phone: '',
        address: '',
        verified: false,
        role: 'user'
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isSeller = !!user?.sellerType || user?.role === 'seller';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup,
      updateUserProfile,
      isLoading,
      isAuthenticated,
      isAdmin,
      isSeller
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a default value instead of throwing an error
    return {
      user: null,
      login: async (email: string, password: string) => {
        console.warn('useAuth called outside of AuthProvider');
      },
      logout: () => {
        console.warn('useAuth called outside of AuthProvider');
      },
      signup: async (email: string, password: string, name: string) => {
        console.warn('useAuth called outside of AuthProvider');
      },
      updateUserProfile: async (data: Partial<User>) => {
        console.warn('useAuth called outside of AuthProvider');
      },
      isLoading: false,
      isAuthenticated: false,
      isAdmin: false,
      isSeller: false
    };
  }
  return context;
};
