import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'seller';
  verified: boolean;
  sellerVerified?: boolean;
  sellerType?: 'marketplace' | 'rental' | 'service' | 'content';
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  login: (email: string, password: string) => Promise<{ isAdmin: boolean }>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  
  const isAuthenticated = !!session;

  // Check user role from user_roles table using has_role function
  const checkUserRole = useCallback(async (userId: string): Promise<{ isAdmin: boolean; isSeller: boolean }> => {
    try {
      // Check admin role
      const { data: adminCheck } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });
      
      // Check if user has seller profile
      const { data: sellerProfile } = await supabase
        .from('seller_profiles')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      return {
        isAdmin: !!adminCheck,
        isSeller: !!sellerProfile
      };
    } catch (error) {
      console.error('Error checking user role:', error);
      return { isAdmin: false, isSeller: false };
    }
  }, []);

  // Fetch user profile from database
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      // Check roles from user_roles table
      const roles = await checkUserRole(userId);
      setIsAdmin(roles.isAdmin);
      setIsSeller(roles.isSeller);

      if (profile) {
        const userData: User = {
          id: profile.id,
          name: profile.full_name || profile.email?.split('@')[0] || 'User',
          email: profile.email || '',
          avatar: profile.avatar_url || undefined,
          role: roles.isAdmin ? 'admin' : roles.isSeller ? 'seller' : 'user',
          verified: true,
          phone: profile.phone || undefined,
        };
        setUser(userData);
        return { isAdmin: roles.isAdmin };
      }
      return { isAdmin: false };
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { isAdmin: false };
    }
  }, [checkUserRole]);

  // Login with Supabase - returns admin status for redirect
  const login = async (email: string, password: string): Promise<{ isAdmin: boolean }> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    
    // Fetch profile and roles immediately after login
    if (data.user) {
      const result = await fetchUserProfile(data.user.id);
      return { isAdmin: result.isAdmin };
    }
    
    return { isAdmin: false };
  };
  
  // Signup with Supabase
  const signup = async (name: string, email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: name,
        }
      }
    });

    if (error) throw error;
  };
  
  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setIsSeller(false);
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: data.name,
        phone: data.phone,
        avatar_url: data.avatar,
      })
      .eq('id', user.id);

    if (error) throw error;

    setUser({ ...user, ...data });
  };
  
  // Set up auth state listener
  useEffect(() => {
    let mounted = true;
    
    const timeout = setTimeout(() => {
      if (mounted && loading) {
        console.log('Auth timeout - setting loading to false');
        setLoading(false);
      }
    }, 3000);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        setSession(session);
        
        if (session?.user) {
          setTimeout(() => {
            if (mounted) {
              fetchUserProfile(session.user.id).finally(() => {
                if (mounted) setLoading(false);
              });
            }
          }, 0);
        } else {
          setUser(null);
          setIsAdmin(false);
          setIsSeller(false);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id).then(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, [fetchUserProfile]);
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin,
      isSeller,
      login, 
      logout, 
      signup,
      updateUserProfile,
      loading
    }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
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
