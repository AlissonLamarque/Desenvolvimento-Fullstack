
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('vetClinicUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('vetClinicUsers') || '[]');
      const userExists = users.find((u: any) => u.email === userData.email);
      
      if (userExists) {
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password
      };

      users.push(newUser);
      localStorage.setItem('vetClinicUsers', JSON.stringify(users));
      
      const { password, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('vetClinicUser', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('vetClinicUsers') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password, ...userWithoutPassword } = user;
        setUser(userWithoutPassword);
        localStorage.setItem('vetClinicUser', JSON.stringify(userWithoutPassword));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vetClinicUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
