import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, API_BASE } from './AuthContext';
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) { setFavorites([]); return; }

    fetch(`${API_BASE}/favorites.php?user_id=${user.id}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setFavorites(data.map(Number));
      })
      .catch(() => {
        const stored = localStorage.getItem(`jablab_fav_${user.id}`);
        if (stored) setFavorites(JSON.parse(stored));
      });
  }, [user]);

  const addFavorite = async (fighterId) => {
    if (favorites.includes(fighterId)) return;
    const newList = [...favorites, fighterId];
    setFavorites(newList);

    if (user) {
      try {
        await fetch(`${API_BASE}/favorites.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id, fighter_id: fighterId }),
        });
      } catch {
        localStorage.setItem(`jablab_fav_${user.id}`, JSON.stringify(newList));
      }
    }
  };

  const removeFavorite = async (fighterId) => {
    const newList = favorites.filter(id => id !== fighterId);
    setFavorites(newList);

    if (user) {
      try {
        await fetch(`${API_BASE}/favorites.php`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id, fighter_id: fighterId }),
        });
      } catch {
        localStorage.setItem(`jablab_fav_${user.id}`, JSON.stringify(newList));
      }
    }
  };

  const isFavorite = (fighterId) => favorites.includes(Number(fighterId));

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}