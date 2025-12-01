'use client';

import { CredibilityScore as CredibilityScoreType } from '@/types';

interface CredibilityScoreProps {
  score: CredibilityScoreType;
}

export function CredibilityScore({ score }: CredibilityScoreProps) {
  const getScoreColor = (value: number) => {
    if (value >= 80) return 'text-green-400';
    if (value >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBarColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">AI Score Analysis</h3>
        <div className={`text-2xl font-bold ${getScoreColor(score.overall_score)}`}>
          {score.overall_score.toFixed(0)}%
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Data Source Quality</span>
            <span className={getScoreColor(score.data_source_quality)}>
              {score.data_source_quality.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreBarColor(score.data_source_quality)}`}
              style={{ width: `${score.data_source_quality}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>News Validation</span>
            <span className={getScoreColor(score.news_validation)}>
              {score.news_validation.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreBarColor(score.news_validation)}`}
              style={{ width: `${score.news_validation}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Institutional Backing</span>
            <span className={getScoreColor(score.institutional_backing)}>
              {score.institutional_backing.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreBarColor(score.institutional_backing)}`}
              style={{ width: `${score.institutional_backing}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>Social Sentiment</span>
            <span className={getScoreColor(score.social_sentiment)}>
              {score.social_sentiment.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreBarColor(score.social_sentiment)}`}
              style={{ width: `${score.social_sentiment}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        Last updated: {new Date(score.last_updated).toLocaleString()}
      </div>
    </div>
  );
}
