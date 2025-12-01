'use client';

import { useWatchlist } from '@/contexts/WatchlistContext';
import { useUser } from '@/contexts/UserContext';

interface WatchlistSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentData?: any[];
}

export function WatchlistSidebar({ isOpen, onClose, currentData = [] }: WatchlistSidebarProps) {
  const { watchlist, removeFromWatchlist, clearWatchlist, getWatchlistWithCurrentData } = useWatchlist();
  const { user, isLoggedIn } = useUser();
  
  // Get watchlist with current data
  const dynamicWatchlist = getWatchlistWithCurrentData(currentData);

  if (!isLoggedIn) {
    return (
      <div className={`fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">My Watchlist</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Login Required Content */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-medium text-lg mb-2">Login Required</h3>
              <p className="text-gray-400 text-sm">Please log in to access your watchlist</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Click outside to close - only when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <h2 className="text-lg font-semibold text-white">My Watchlist</h2>
            <span className="bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-full">
              {dynamicWatchlist.length}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Clear All Button */}
        {dynamicWatchlist.length > 0 && (
          <div className="px-4 py-2 border-b border-gray-700">
            <button
              onClick={clearWatchlist}
              className="text-red-400 hover:text-red-300 text-sm transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Watchlist Items */}
        <div className="flex-1 overflow-y-auto">
          {dynamicWatchlist.length === 0 ? (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h4 className="text-gray-300 font-medium text-lg mb-2">No items in watchlist</h4>
                <p className="text-gray-500 text-sm">Add items from scanner results to track them</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {dynamicWatchlist.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium text-lg">{item.symbol}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          item.type === 'crypto' 
                            ? 'bg-orange-900 text-orange-300' 
                            : 'bg-blue-900 text-blue-300'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{item.name}</p>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs">Price:</span>
                          <span className="text-white font-medium">
                            {item.type === 'crypto' 
                              ? `₹${(item.price * 83).toFixed(2)}` 
                              : `₹${item.price.toFixed(2)}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs">Change:</span>
                          <span className={`text-sm font-medium ${
                            item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs">Market Cap:</span>
                          <span className="text-gray-300 text-sm">{item.marketCap}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs">Volume:</span>
                          <span className="text-gray-300 text-sm">{item.volume}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFromWatchlist(item.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1 ml-2"
                      title="Remove from watchlist"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Added: {new Date(item.addedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
            <span>{dynamicWatchlist.length} items</span>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
