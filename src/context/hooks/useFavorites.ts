
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { FavoriteItem, Language } from '../types';

export const useFavorites = (language: Language) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === item.id)) {
        return prev;
      }
      
      toast({
        title: language === 'bn' ? "পছন্দে যোগ করা হয়েছে" : "Added to favorites",
        description: item.title,
      });
      
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => {
      const item = prev.find(fav => fav.id === id);
      
      if (item) {
        toast({
          title: language === 'bn' ? "পছন্দ থেকে সরানো হয়েছে" : "Removed from favorites",
          description: item.title,
        });
      }
      
      return prev.filter(fav => fav.id !== id);
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some(fav => fav.id === id);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  };
};
