'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface Address {
  id: number;
  label: string;
  full_address: string;
  area: string;
  city: string;
  is_default: boolean;
}

interface AddressContextType {
  addresses: Address[];
  loading: boolean;
  addAddress: (address: Omit<Address, 'id'>) => Promise<{ success: boolean; error?: string }>;
  updateAddress: (id: number, address: Partial<Address>) => Promise<{ success: boolean; error?: string }>;
  deleteAddress: (id: number) => Promise<{ success: boolean; error?: string }>;
  setDefaultAddress: (id: number) => Promise<{ success: boolean; error?: string }>;
  fetchAddresses: () => Promise<void>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export function AddressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (data && !error) {
        setAddresses(data);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addAddress = useCallback(async (address: Omit<Address, 'id'>) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      // If this is the first address or marked as default, unset other defaults
      if (address.is_default || addresses.length === 0) {
        await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);
      }

      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          label: address.label,
          full_address: address.full_address,
          area: address.area,
          city: address.city,
          is_default: address.is_default || addresses.length === 0,
        })
        .select()
        .single();

      if (error || !data) {
        return { success: false, error: 'Failed to add address' };
      }

      await fetchAddresses();
      return { success: true };
    } catch (error) {
      console.error('Error adding address:', error);
      return { success: false, error: 'An error occurred' };
    }
  }, [user, addresses, fetchAddresses]);

  const updateAddress = useCallback(async (id: number, address: Partial<Address>) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      const { error } = await supabase
        .from('addresses')
        .update(address)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        return { success: false, error: 'Failed to update address' };
      }

      await fetchAddresses();
      return { success: true };
    } catch (error) {
      console.error('Error updating address:', error);
      return { success: false, error: 'An error occurred' };
    }
  }, [user, fetchAddresses]);

  const deleteAddress = useCallback(async (id: number) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        return { success: false, error: 'Failed to delete address' };
      }

      await fetchAddresses();
      return { success: true };
    } catch (error) {
      console.error('Error deleting address:', error);
      return { success: false, error: 'An error occurred' };
    }
  }, [user, fetchAddresses]);

  const setDefaultAddress = useCallback(async (id: number) => {
    if (!user) return { success: false, error: 'Not logged in' };

    try {
      // Unset all defaults
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);

      // Set new default
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        return { success: false, error: 'Failed to set default address' };
      }

      await fetchAddresses();
      return { success: true };
    } catch (error) {
      console.error('Error setting default address:', error);
      return { success: false, error: 'An error occurred' };
    }
  }, [user, fetchAddresses]);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        loading,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        fetchAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddresses() {
  const context = useContext(AddressContext);
  if (context === undefined) {
    throw new Error('useAddresses must be used within an AddressProvider');
  }
  return context;
}
