import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Game } from '../types/game.types';
import { useAuth } from './AuthContext';

interface FavoritesContextValue {
  favorites: Game[];
  toggleFavorite: (game: Game) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Game[]>([]);

  const storageKey = useMemo(() => {
    return user?.id ? `videogames_favorites_${user.id}` : 'videogames_favorites_guest';
  }, [user?.id]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored) as Game[]);
      } catch {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  const toggleFavorite = (game: Game) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === game.id);
      if (exists) {
        return prev.filter((item) => item.id !== game.id);
      }
      return [game, ...prev];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((item) => item.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
