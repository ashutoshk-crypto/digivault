'use client';

import { useState } from 'react';
import { MergedAssetData } from '@/types';
import { formatMarketCapInCrores } from '@/utils/data';

interface ScannerTableProps {
  data: MergedAssetData[];
  scanType: string;
}

export function ScannerTable({ data }: ScannerTableProps) {
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField as keyof MergedAssetData];
    const bValue = b[sortField as keyof MergedAssetData];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    return 0;
  });

  const formatNumber = (value: number, decimals: number = 2) => {
    if (value >= 1e9) return `${(value / 1e9).toFixed(decimals)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(decimals)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(decimals)}K`;
    return value.toFixed(decimals);
  };

  const formatCryptoPrice = (value: number) => {
    // Crypto prices are already in USD, convert to INR
    const inrValue = value * 83; // Convert USD to INR
    if (inrValue >= 1000) return `₹${inrValue.toFixed(0)}`;
    if (inrValue >= 1) return `₹${inrValue.toFixed(2)}`;
    return `₹${inrValue.toFixed(4)}`;
  };

  const getCredibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto">
      {/* Single scrollable container with both header and body */}
      <div className="max-h-96 overflow-y-auto bg-gray-800">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700 sticky top-0 z-10">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('symbol')}
              >
                Symbol {getSortIcon('symbol')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('name')}
              >
                Name {getSortIcon('name')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('asset_type')}
              >
                Type {getSortIcon('asset_type')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('price')}
              >
                Price {getSortIcon('price')}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('market_cap')}
              >
                <div className="flex items-center whitespace-nowrap">
                  <span>Market Cap</span>
                  <span className="ml-1">{getSortIcon('market_cap')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('daily_change_pct')}
              >
                <div className="flex items-center whitespace-nowrap">
                  <span>% Change</span>
                  <span className="ml-1">{getSortIcon('daily_change_pct')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('credibility_score')}
              >
                <div className="flex items-center whitespace-nowrap">
                  <span>Credibility</span>
                  <span className="ml-1">{getSortIcon('credibility_score')}</span>
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600"
                onClick={() => handleSort('news_sentiment')}
              >
                <div className="flex items-center whitespace-nowrap">
                  <span>Sentiment</span>
                  <span className="ml-1">{getSortIcon('news_sentiment')}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {sortedData.map((asset, index) => (
              <tr 
                key={asset.symbol} 
                className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} cursor-pointer hover:bg-gray-600`}
                onClick={() => {
                  if (asset.asset_type === 'equity') {
                    window.open(`https://lemonn.co.in/charts/stocks/${asset.symbol.toLowerCase()}`, '_blank');
                  } else if (asset.asset_type === 'crypto') {
                    const cryptoName = asset.name.toLowerCase().replace(/\s+/g, '-');
                    window.open(`https://coinswitch.co/coins/${cryptoName}`, '_blank');
                  }
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{asset.symbol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{asset.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    asset.asset_type === 'crypto' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {asset.asset_type === 'crypto' ? 'Crypto' : 'Equity'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {asset.asset_type === 'crypto' 
                      ? formatCryptoPrice(asset.price)
                      : `₹${asset.price.toFixed(2)}`
                    }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {asset.asset_type === 'crypto' 
                      ? formatMarketCapInCrores(asset.market_cap * 83)
                      : formatMarketCapInCrores(asset.market_cap)
                    }
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium flex items-center ${
                    (asset.daily_change_pct || 0) >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {(asset.daily_change_pct || 0) >= 0 ? '↗' : '↘'}
                    {formatPercentage(asset.daily_change_pct || 0)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${getCredibilityColor(asset.credibility_score || 0)}`}>
                    {asset.credibility_score ? `${asset.credibility_score.toFixed(0)}%` : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${getSentimentColor(asset.news_sentiment || 'neutral')}`}>
                    {asset.news_sentiment ? asset.news_sentiment.charAt(0).toUpperCase() + asset.news_sentiment.slice(1) : 'Neutral'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No assets found matching the criteria</div>
        </div>
      )}
    </div>
  );
}
