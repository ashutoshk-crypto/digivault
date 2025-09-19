'use client';

import { WhaleTransaction } from '@/types';

interface WhaleTrackerProps {
  transactions: WhaleTransaction[];
  assetSymbol?: string;
}

export function WhaleTracker({ transactions, assetSymbol }: WhaleTrackerProps) {
  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'buy': return 'text-green-400 bg-green-100';
      case 'sell': return 'text-red-400 bg-red-100';
      default: return 'text-blue-400 bg-blue-100';
    }
  };

  const getTransactionTypeIcon = (type: string) => {
    switch (type) {
      case 'buy': return '📈';
      case 'sell': return '📉';
      default: return '🔄';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const formatValue = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          {assetSymbol ? `Whale Activity for ${assetSymbol}` : 'Whale Transactions'}
        </h3>
        <div className="text-sm text-gray-400">
          {transactions.length} transactions
        </div>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTransactionTypeIcon(transaction.transaction_type)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionTypeColor(transaction.transaction_type)}`}>
                  {transaction.transaction_type.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">
                  {transaction.asset_symbol}
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {formatTimeAgo(transaction.timestamp)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-gray-400 mb-1">Amount</div>
                <div className="text-white font-medium">
                  {transaction.amount.toLocaleString()} {transaction.asset_symbol}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Value</div>
                <div className="text-white font-medium">
                  {formatValue(transaction.value_usd)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="text-sm text-gray-400 mb-1">From</div>
                <div className="text-white text-sm font-mono">
                  {transaction.from_address}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">To</div>
                <div className="text-white text-sm font-mono">
                  {transaction.to_address}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Credibility:</span>
                <span className={`text-sm font-medium ${getCredibilityColor(transaction.credibility_score)}`}>
                  {transaction.credibility_score.toFixed(0)}%
                </span>
              </div>
              <div className="text-xs text-gray-400">
                ID: {transaction.id}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {transactions.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg">No whale transactions found</div>
        </div>
      )}
    </div>
  );
}
