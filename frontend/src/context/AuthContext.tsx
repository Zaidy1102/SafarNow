import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'passenger' | 'driver';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'passenger' | 'driver') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Implement actual login API call
      // For now, just simulate a successful login
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email,
        userType: 'passenger',
      };
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, userType: 'passenger' | 'driver') => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Implement actual registration API call
      // For now, just simulate a successful registration
      const mockUser: User = {
        id: '1',
        name,
        email,
        userType,
      };
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, error }}>
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