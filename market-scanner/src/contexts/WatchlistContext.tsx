'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from './UserContext';
import { formatMarketCapInCrores } from '@/utils/data';

// Helper function to format numbers
const formatNumber = (value: number, decimals: number = 2) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(decimals)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(decimals)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(decimals)}K`;
  return value.toFixed(decimals);
};

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  volume: string;
  addedAt: string;
  type: 'equity' | 'crypto';
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: Omit<WatchlistItem, 'addedAt'>) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  clearWatchlist: () => void;
  getWatchlistWithCurrentData: (currentData: any[]) => WatchlistItem[];
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const { user, isLoggedIn } = useUser();

  // Load watchlist from localStorage when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      const savedWatchlist = localStorage.getItem(`watchlist_${user.number}`);
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } else {
      setWatchlist([]);
    }
  }, [isLoggedIn, user]);

  // Save watchlist to localStorage when it changes
  useEffect(() => {
    if (isLoggedIn && user && watchlist.length >= 0) {
      localStorage.setItem(`watchlist_${user.number}`, JSON.stringify(watchlist));
    }
  }, [watchlist, isLoggedIn, user]);

  const addToWatchlist = (item: Omit<WatchlistItem, 'addedAt'>) => {
    if (!isLoggedIn) {
      alert('Please log in to add items to your watchlist');
      return;
    }

    const newItem: WatchlistItem = {
      ...item,
      addedAt: new Date().toISOString()
    };

    setWatchlist(prev => {
      // Check if item already exists
      const exists = prev.some(watchlistItem => watchlistItem.id === item.id);
      if (exists) {
        return prev;
      }
      return [...prev, newItem];
    });
  };

  const removeFromWatchlist = (id: string) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWatchlist = (id: string): boolean => {
    return watchlist.some(item => item.id === id);
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  const getWatchlistWithCurrentData = (currentData: any[]): WatchlistItem[] => {
    return watchlist.map(watchlistItem => {
      // Find the current data for this item
      const currentItem = currentData.find(item => item.symbol === watchlistItem.symbol);
      
      if (currentItem) {
        // Return updated item with current data
        return {
          ...watchlistItem,
          price: currentItem.price,
          change: currentItem.daily_change || 0,
          changePercent: currentItem.daily_change_pct || 0,
          marketCap: currentItem.asset_type === 'crypto' 
            ? formatMarketCapInCrores(currentItem.market_cap * 83)
            : formatMarketCapInCrores(currentItem.market_cap),
          volume: currentItem.asset_type === 'crypto' 
            ? formatNumber(currentItem.volume_24h || 0)
            : formatNumber(currentItem.volume || 0),
        };
      }
      
      // Return original item if no current data found
      return watchlistItem;
    });
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      clearWatchlist,
      getWatchlistWithCurrentData
    }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
