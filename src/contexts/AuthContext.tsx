'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface User {
  id: number;
  email: string;
  phone?: string;
  name: string;
  address?: string;
  area?: string;
  city?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string,
    address?: string,
    area?: string,
    city?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', parseInt(userId))
          .single();

        if (data && !error) {
          setUser({
            id: data.id,
            email: data.email,
            phone: data.phone,
            name: data.name,
            address: data.address,
            area: data.area,
            city: data.city,
          });
        } else {
          localStorage.removeItem('user_id');
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (error || !data) {
        return { success: false, error: 'Invalid email or password' };
      }

      if (data.password_hash !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      setUser({
        id: data.id,
        email: data.email,
        phone: data.phone,
        name: data.name,
        address: data.address,
        area: data.area,
        city: data.city,
      });

      // LocalStorage for user session
      localStorage.setItem('user_id', data.id.toString());

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      phone: string,
      password: string,
      address?: string,
      area?: string,
      city?: string
    ) => {
      try {
        // Check if email already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('id')
          .eq('email', email.toLowerCase())
          .single();

        if (existingUser) {
          return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const { data, error } = await supabase
          .from('users')
          .insert({
            email: email.toLowerCase(),
            phone: phone || null,
            password_hash: password, // In production, hash this on server
            name,
            address: address || null,
            area: area || null,
            city: city || 'Karachi',
          })
          .select()
          .single();

        if (error || !data) {
          return { success: false, error: 'Failed to create account' };
        }

        setUser({
          id: data.id,
          email: data.email,
          phone: data.phone,
          name: data.name,
          address: data.address,
          area: data.area,
          city: data.city,
        });

        localStorage.setItem('user_id', data.id.toString());

        return { success: true };
      } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'An error occurred during registration' };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user_id');
    document.cookie = 'admin_password=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  }, []);

  const updateUser = useCallback(
    async (data: Partial<User>) => {
      if (!user) return { success: false, error: 'Not logged in' };

      try {
        const { error } = await supabase
          .from('users')
          .update({
            name: data.name,
            phone: data.phone,
            address: data.address,
            area: data.area,
            city: data.city,
          })
          .eq('id', user.id);

        if (error) {
          return { success: false, error: 'Failed to update profile' };
        }

        setUser({ ...user, ...data });
        return { success: true };
      } catch (error) {
        console.error('Update error:', error);
        return { success: false, error: 'An error occurred' };
      }
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
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
