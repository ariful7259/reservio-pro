
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Extended user interface with additional properties
interface ExtendedUser extends User {
  name?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  verified?: boolean;
  role?: string;
  sellerType?: string;
}

interface AuthContextType {
  user: ExtendedUser | null;
  isAuthenticated: boolean;
  isSeller: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<ExtendedUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Create extended user with default values
        const extendedUser: ExtendedUser = {
          ...session.user,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          avatar: session.user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
          phone: session.user.user_metadata?.phone || '',
          address: session.user.user_metadata?.address || '',
          verified: session.user.email_confirmed_at !== null,
          role: session.user.user_metadata?.role || 'user',
          sellerType: session.user.user_metadata?.sellerType || 'individual'
        };
        setUser(extendedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Create extended user with default values
          const extendedUser: ExtendedUser = {
            ...session.user,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            avatar: session.user.user_metadata?.avatar_url || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 10) + 1}`,
            phone: session.user.user_metadata?.phone || '',
            address: session.user.user_metadata?.address || '',
            verified: session.user.email_confirmed_at !== null,
            role: session.user.user_metadata?.role || 'user',
            sellerType: session.user.user_metadata?.sellerType || 'individual'
          };
          setUser(extendedUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signup = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    return { data, error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateUserProfile = (data: Partial<ExtendedUser>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isSeller: user?.role === 'seller' || user?.sellerType !== 'individual',
    isAdmin: user?.role === 'admin',
    loading,
    login,
    signup,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
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
