'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: number[];
  loading: boolean;
  toggleFavorite: (menuItemId: number) => Promise<void>;
  isFavorite: (menuItemId: number) => boolean;
  fetchFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('menu_item_id')
        .eq('user_id', user.id);

      if (data && !error) {
        setFavorites(data.map((f) => f.menu_item_id));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const toggleFavorite = useCallback(async (menuItemId: number) => {
    if (!user) return;

    const isFav = favorites.includes(menuItemId);

    try {
      if (isFav) {
        // Remove from favorites
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('menu_item_id', menuItemId);
        setFavorites(favorites.filter((id) => id !== menuItemId));
      } else {
        // Add to favorites
        await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            menu_item_id: menuItemId,
          });
        setFavorites([...favorites, menuItemId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [user, favorites]);

  const isFavorite = useCallback(
    (menuItemId: number) => {
      return favorites.includes(menuItemId);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        toggleFavorite,
        isFavorite,
        fetchFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
