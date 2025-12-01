'use client';

import { useWatchlist } from '@/contexts/WatchlistContext';
import { useUser } from '@/contexts/UserContext';

interface WatchlistIconProps {
  item: {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: string;
    volume: string;
    type: 'equity' | 'crypto';
  };
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function WatchlistIcon({ item, size = 'md', showText = false }: WatchlistIconProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { isLoggedIn } = useUser();

  const isWatched = isInWatchlist(item.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      // Trigger login modal by clicking the login button
      const loginButton = document.querySelector('[data-login-button]') as HTMLButtonElement;
      if (loginButton) {
        loginButton.click();
      }
      return;
    }

    if (isWatched) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center space-x-1 transition-all duration-200 hover:scale-110 ${
        isWatched 
          ? 'text-yellow-400 hover:text-yellow-300' 
          : 'text-gray-400 hover:text-yellow-400'
      }`}
      title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {isWatched ? (
        <svg 
          className={`${sizeClasses[size]} fill-current`} 
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ) : (
        <svg 
          className={`${sizeClasses[size]} fill-current`} 
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )}
      
      {showText && (
        <span className={`${textSizeClasses[size]} font-medium`}>
          {isWatched ? 'Watching' : 'Watch'}
        </span>
      )}
    </button>
  );
}
