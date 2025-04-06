
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithBiometric: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  requestTwoFactorCode: () => Promise<void>;
  isBiometricSupported: boolean;
  setBiometricAuth: (enabled: boolean) => void;
  isTwoFactorEnabled: boolean;
  setTwoFactorAuth: (enabled: boolean) => void;
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
    twoFactorEnabled: true,
    biometricEnabled: false
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  // Check if biometric auth is supported
  useEffect(() => {
    // This is just a mock implementation
    // In a real app, you would check if the device supports biometric auth
    const checkBiometricSupport = async () => {
      // Here we'd check browser/device capabilities
      // For this demo, we'll pretend it's supported on most browsers
      setIsBiometricSupported(true);
    };
    
    checkBiometricSupport();
  }, []);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const storedTwoFactor = localStorage.getItem("twoFactorEnabled");
    if (storedTwoFactor) {
      setIsTwoFactorEnabled(JSON.parse(storedTwoFactor));
    }
    
    const storedBiometric = localStorage.getItem("biometricEnabled");
    if (storedBiometric) {
      setIsBiometricEnabled(JSON.parse(storedBiometric));
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
      
      // In a real app with 2FA, here we would not fully log the user in
      // but instead return a challenge for 2FA
      if (isTwoFactorEnabled) {
        // Store user temporarily, waiting for 2FA verification
        sessionStorage.setItem("pendingUser", JSON.stringify(userWithoutPassword));
        
        // This would send the code to the user's phone or email
        // For demo, we just simulate success
      } else {
        // If 2FA is not enabled, log user in immediately
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      }
    } else {
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
    
    // Return whether 2FA is needed or not
    return;
  };

  const verifyTwoFactor = async (code: string): Promise<boolean> => {
    // For demo purposes, any 6-digit code is accepted
    if (code.length === 6) {
      // Get the pending user
      const pendingUser = sessionStorage.getItem("pendingUser");
      
      if (pendingUser) {
        const userObj = JSON.parse(pendingUser);
        setUser(userObj);
        localStorage.setItem("user", pendingUser);
        sessionStorage.removeItem("pendingUser");
        return true;
      }
    }
    
    return false;
  };

  const requestTwoFactorCode = async (): Promise<void> => {
    // Simulate sending a code
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would send the code to the user's phone or email
  };

  const loginWithBiometric = async () => {
    setIsLoading(true);
    
    // Simulate biometric authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, we'll just log in the first user
    if (isBiometricEnabled) {
      const mockUser = MOCK_USERS[0];
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    } else {
      throw new Error("Biometric authentication is not enabled");
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
      twoFactorEnabled: false,
      biometricEnabled: false
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
    sessionStorage.removeItem("pendingUser");
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

  const setTwoFactorAuth = (enabled: boolean) => {
    setIsTwoFactorEnabled(enabled);
    localStorage.setItem("twoFactorEnabled", JSON.stringify(enabled));
  };

  const setBiometricAuth = (enabled: boolean) => {
    setIsBiometricEnabled(enabled);
    localStorage.setItem("biometricEnabled", JSON.stringify(enabled));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithBiometric,
        signup,
        logout,
        updateUserProfile,
        verifyTwoFactor,
        requestTwoFactorCode,
        isBiometricSupported,
        setBiometricAuth,
        isTwoFactorEnabled,
        setTwoFactorAuth
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
