import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import Cookies from 'js-cookie';
;
import { ErrorResponse } from '@/types/errorResponse';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  balance: number;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  fetchBalance: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Check for stored token in cookies
  //   const token = Cookies.get('auth_token');
  //   if (token) {
  //     fetchBalance();
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      
      setUser(response.data.data?.user);
     fetchBalance()
    } catch (error: any) {
      const errorResponse = error.response?.data as ErrorResponse;
      console.error('Login failed:', errorResponse?.message || 'Unknown error');
      throw errorResponse;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await authAPI.signup({ email, password, name });
      // Set HTTP-only cookie from backend response
      
    } catch (error: any) {
      const errorResponse = error.response?.data as ErrorResponse;
      console.error('Login failed:', errorResponse?.message || 'Unknown error');
      throw errorResponse;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout(); // Backend will clear the HTTP-only cookie
      setUser(null);
      setBalance(0);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await authAPI.getBalance();
      setBalance(response.data.data?.balance!);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      balance, 
      isLoading, 
      login, 
      signup, 
      logout,
      fetchBalance 
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