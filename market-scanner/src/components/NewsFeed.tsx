'use client';

import { NewsData } from '@/types';

interface NewsFeedProps {
  news: NewsData[];
  assetSymbol?: string;
}

export function NewsFeed({ news, assetSymbol }: NewsFeedProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400 bg-green-100';
      case 'negative': return 'text-red-400 bg-red-100';
      default: return 'text-gray-400 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '📈';
      case 'negative': return '📉';
      default: return '📊';
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

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">
          {assetSymbol ? `News for ${assetSymbol}` : 'Latest News'}
        </h3>
        <div className="text-sm text-gray-400">
          {news.length} articles
        </div>
      </div>
      
      <div className="space-y-4">
        {news.slice(0, 4).map((article) => (
          <div key={article.id} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getSentimentIcon(article.sentiment)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(article.sentiment)}`}>
                  {article.sentiment.charAt(0).toUpperCase() + article.sentiment.slice(1)}
                </span>
                <span className="text-xs text-gray-400">
                  {article.confidence}% confidence
                </span>
              </div>
              <span className="text-xs text-gray-400">
                {formatTimeAgo(article.published_at)}
              </span>
            </div>
            
            <h4 className="text-white font-medium mb-2 line-clamp-2">
              {article.title}
            </h4>
            
            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Source: {article.source}
              </span>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {news.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg">No news articles found</div>
        </div>
      )}
    </div>
  );
}
