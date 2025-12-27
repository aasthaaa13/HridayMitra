import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateAvatar: (avatarUrl: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('hridaymitra_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('hridaymitra_users') || '[]');
    const existingUser = storedUsers.find((u: any) => u.email === email);
    
    if (!existingUser) {
      throw new Error('User not found. Please sign up first.');
    }
    
    if (existingUser.password !== password) {
      throw new Error('Invalid password.');
    }
    
    const userData: User = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      avatar: existingUser.avatar,
    };
    
    setUser(userData);
    localStorage.setItem('hridaymitra_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const storedUsers = JSON.parse(localStorage.getItem('hridaymitra_users') || '[]');
    const existingUser = storedUsers.find((u: any) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      throw new Error('User already exists. Please login instead.');
    }
    
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      avatar: undefined,
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('hridaymitra_users', JSON.stringify(storedUsers));
    
    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    
    setUser(userData);
    localStorage.setItem('hridaymitra_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userData: User = {
      id: crypto.randomUUID(),
      name: 'Google User',
      email: 'user@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    };
    
    setUser(userData);
    localStorage.setItem('hridaymitra_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hridaymitra_user');
  };

  const updateAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      localStorage.setItem('hridaymitra_user', JSON.stringify(updatedUser));
      
      // Update in users list too
      const storedUsers = JSON.parse(localStorage.getItem('hridaymitra_users') || '[]');
      const updatedUsers = storedUsers.map((u: any) => 
        u.id === user.id ? { ...u, avatar: avatarUrl } : u
      );
      localStorage.setItem('hridaymitra_users', JSON.stringify(updatedUsers));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
