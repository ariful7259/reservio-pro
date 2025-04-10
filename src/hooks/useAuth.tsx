
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    darkMode: boolean;
    language: string;
  };
  stats?: {
    postsCount: number;
    reviewsCount: number;
    commentsCount: number;
    bookingsCount: number;
  };
  joinDate?: string;
  socialProfiles?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "আকাশ আহমেদ",
    email: "akash@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "01712345678",
    address: "ঢাকা, বাংলাদেশ",
    bio: "সফটওয়্যার ডেভেলপার এবং টেক এন্থুসিয়াস্ট",
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false,
      language: "bn"
    },
    stats: {
      postsCount: 12,
      reviewsCount: 8,
      commentsCount: 24,
      bookingsCount: 5
    },
    joinDate: "2023-01-15T10:30:00Z",
    socialProfiles: {
      facebook: "https://facebook.com/akashahmed",
      twitter: "https://twitter.com/akashahmed",
      instagram: "https://instagram.com/akashahmed",
      linkedin: "https://linkedin.com/in/akashahmed"
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock database
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } else {
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.find(u => u.email === email)) {
      setIsLoading(false);
      throw new Error("User already exists");
    }
    
    // Create new user with all required properties
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      phone: "",
      address: "",
      bio: "",
      preferences: {
        notifications: true,
        newsletter: true,
        darkMode: false,
        language: "bn"
      },
      stats: {
        postsCount: 0,
        reviewsCount: 0,
        commentsCount: 0,
        bookingsCount: 0
      },
      joinDate: new Date().toISOString(),
      socialProfiles: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: ""
      }
    };
    
    // In a real app, you would send this to your backend
    // For demo, we'll just push to our mock array
    MOCK_USERS.push(newUser);
    
    // Set the user in state (without the password)
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Update mock database
      const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
      if (userIndex >= 0) {
        MOCK_USERS[userIndex] = {
          ...MOCK_USERS[userIndex],
          ...userData
        };
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
