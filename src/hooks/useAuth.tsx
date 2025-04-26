
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  bio?: string;
  role?: "user" | "admin" | "seller"; // রোল যুক্ত করলাম
  sellerType?: "marketplace" | "rental" | "service" | "content"; // সেলার টাইপ যুক্ত করলাম
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
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

// Define the interface for the mock user to include password field
interface MockUser extends User {
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean; // অ্যাডমিন চেক করার জন্য
  isSeller: boolean; // সেলার চেক করার জন্য
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    name: "আকাশ আহমেদ",
    email: "akash@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=1",
    phone: "01712345678",
    address: "ঢাকা, বাংলাদেশ",
    bio: "সফটওয়্যার ডেভেলপার এবং টেক এন্থুসিয়াস্ট",
    role: "user" as const,
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
  },
  {
    id: "2",
    name: "অ্যাডমিন",
    email: "admin@example.com",
    password: "admin123456",
    avatar: "https://i.pravatar.cc/150?img=2",
    role: "admin" as const,
    phone: "01712345679",
    address: "ঢাকা, বাংলাদেশ",
    bio: "সিস্টেম অ্যাডমিনিস্ট্রেটর",
    preferences: {
      notifications: true,
      newsletter: false,
      darkMode: true,
      language: "bn"
    },
    stats: {
      postsCount: 0,
      reviewsCount: 0,
      commentsCount: 0,
      bookingsCount: 0
    },
    joinDate: "2022-01-15T10:30:00Z",
    socialProfiles: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: ""
    }
  },
  {
    id: "3",
    name: "মার্কেটপ্লেস সেলার",
    email: "market@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "seller" as const,
    sellerType: "marketplace" as const,
    phone: "01712345680",
    address: "ঢাকা, বাংলাদেশ",
    bio: "প্রোডাক্ট বিক্রয়কারী",
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false,
      language: "bn"
    },
    joinDate: "2023-03-15T10:30:00Z"
  },
  {
    id: "4",
    name: "রেন্টাল সেলার",
    email: "rental@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=4",
    role: "seller" as const,
    sellerType: "rental" as const,
    phone: "01712345681",
    address: "ঢাকা, বাংলাদেশ",
    bio: "প্রোপার্টি ভাড়া প্রদানকারী",
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false,
      language: "bn"
    },
    joinDate: "2023-04-15T10:30:00Z"
  },
  {
    id: "5",
    name: "সার্ভিস সেলার",
    email: "service@example.com",
    password: "password123",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "seller" as const,
    sellerType: "service" as const,
    phone: "01712345682",
    address: "ঢাকা, বাংলাদেশ",
    bio: "সার্ভিস প্রদানকারী",
    preferences: {
      notifications: true,
      newsletter: true,
      darkMode: false,
      language: "bn"
    },
    joinDate: "2023-05-15T10:30:00Z"
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
      setUser(userWithoutPassword as User);
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
    const newUser: MockUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "user", // Explicitly typing as "user"
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
        // Find existing user to update
        const existingMockUser = MOCK_USERS[userIndex];
        
        // Update user with correct type handling
        MOCK_USERS[userIndex] = {
          ...existingMockUser,
          ...userData,
          // Preserve original password
          password: existingMockUser.password,
          // Preserve original role if not explicitly changed
          role: (userData.role ?? existingMockUser.role) as "user" | "admin" | "seller"
        };
      }
    }
  };

  // অ্যাডমিন এবং সেলার কিনা চেক
  const isAdmin = user?.role === "admin";
  const isSeller = user?.role === "seller";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAdmin,
        isSeller,
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
