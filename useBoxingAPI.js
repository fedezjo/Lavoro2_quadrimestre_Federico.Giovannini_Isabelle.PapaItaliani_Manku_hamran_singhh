import { useState, useCallback } from 'react';

// API-Sports Boxing API
const API_KEY = 'YOUR_API_KEY_HERE'; // ← Inserisci qui la tua chiave API
const BASE_URL = 'https://v1.boxing.api-sports.io';

const headers = {
  'x-apisports-key': API_KEY,
};

// Mock data per sviluppo quando l'API key non è disponibile
const MOCK_FIGHTERS = [
  { id: 1, name: 'Canelo Alvarez', weight: '168 lbs', birth_date: '1990-07-18', nationality: 'Mexico', wins: 60, losses: 2, draws: 2, wins_ko: 39 },
  { id: 2, name: 'Tyson Fury', weight: '256 lbs', birth_date: '1988-08-12', nationality: 'UK', wins: 34, losses: 0, draws: 1, wins_ko: 24 },
  { id: 3, name: 'Oleksandr Usyk', weight: '215 lbs', birth_date: '1987-01-17', nationality: 'Ukraine', wins: 22, losses: 2, draws: 0, wins_ko: 14 },
  { id: 4, name: 'Naoya Inoue', weight: '122 lbs', birth_date: '1993-04-10', nationality: 'Japan', wins: 27, losses: 0, draws: 0, wins_ko: 24 },
  { id: 5, name: 'David Benavidez', weight: '168 lbs', birth_date: '1996-12-17', nationality: 'USA', wins: 28, losses: 0, draws: 0, wins_ko: 24 },
  { id: 6, name: 'Errol Spence Jr', weight: '147 lbs', birth_date: '1990-03-03', nationality: 'USA', wins: 28, losses: 1, draws: 0, wins_ko: 22 },
];

export function useBoxingAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const useMock = API_KEY === 'YOUR_API_KEY_HERE';

  const searchFighters = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      if (useMock) {
        await new Promise((r) => setTimeout(r, 500));
        const filtered = query
          ? MOCK_FIGHTERS.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
          : MOCK_FIGHTERS;
        return filtered;
      }
      const res = await fetch(`${BASE_URL}/boxers?search=${encodeURIComponent(query)}`, { headers });
      const data = await res.json();
      return data.response || [];
    } catch (err) {
      setError('Errore nel recupero dei dati');
      return useMock ? MOCK_FIGHTERS : [];
    } finally {
      setLoading(false);
    }
  }, [useMock]);

  const getFighterById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      if (useMock) {
        await new Promise((r) => setTimeout(r, 300));
        return MOCK_FIGHTERS.find((f) => f.id === parseInt(id)) || null;
      }
      const res = await fetch(`${BASE_URL}/boxers?id=${id}`, { headers });
      const data = await res.json();
      return data.response?.[0] || null;
    } catch (err) {
      setError('Errore nel recupero del fighter');
      return null;
    } finally {
      setLoading(false);
    }
  }, [useMock]);

  const getTrendingFighters = useCallback(async () => {
    setLoading(true);
    try {
      if (useMock) {
        await new Promise((r) => setTimeout(r, 400));
        return MOCK_FIGHTERS.slice(0, 6);
      }
      const res = await fetch(`${BASE_URL}/boxers`, { headers });
      const data = await res.json();
      return (data.response || []).slice(0, 6);
    } catch (err) {
      return useMock ? MOCK_FIGHTERS.slice(0, 6) : [];
    } finally {
      setLoading(false);
    }
  }, [useMock]);

  const getFightersByIds = useCallback(async (ids) => {
    if (useMock) {
      return MOCK_FIGHTERS.filter((f) => ids.includes(f.id));
    }
    const results = await Promise.all(ids.map((id) => getFighterById(id)));
    return results.filter(Boolean);
  }, [getFighterById, useMock]);

  return { searchFighters, getFighterById, getTrendingFighters, getFightersByIds, loading, error };
}
