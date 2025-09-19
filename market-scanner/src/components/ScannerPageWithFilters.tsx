'use client';

import { useState, useMemo } from 'react';
import { MergedAssetData, FilterState, ScanConfig } from '@/types';
import { applyFilter, applyAllFilters, defaultFilterState } from '@/utils/filters';
import { ScannerTable } from './ScannerTable';
import { FilterPanel } from './FilterPanel';
import { FAQSection } from './FAQSection';
import { RelatedScans } from './RelatedScans';
import { NewsFeed } from './NewsFeed';
import { WhaleTracker } from './WhaleTracker';
import { CredibilityScore } from './CredibilityScore';

interface ScannerPageWithFiltersProps {
  scan: ScanConfig;
  allData: MergedAssetData[];
  newsData: any[];
  whaleTransactions: any[];
  credibilityScores: any[];
  relatedScans: ScanConfig[];
  lastUpdated: string;
}

export function ScannerPageWithFilters({
  scan,
  allData,
  newsData,
  whaleTransactions,
  credibilityScores,
  relatedScans,
  lastUpdated
}: ScannerPageWithFiltersProps) {
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);
  const [showFilters, setShowFilters] = useState(false);

  // Apply both the original scanner logic and the new filters
  const filteredData = useMemo(() => {
    // First apply the original scanner filter
    const scannerFilteredData = applyFilter(allData, scan.logic_key);
    
    // Then apply the additional filters
    return applyAllFilters(scannerFilteredData, filterState);
  }, [allData, scan.logic_key, filterState]);

  const handleFilterChange = (newFilterState: FilterState) => {
    setFilterState(newFilterState);
  };

  const handleResetFilters = () => {
    setFilterState(defaultFilterState);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
            <a href="/" className="hover:text-white">Home</a>
            <span>/</span>
            <span className="text-white">Scanners</span>
            <span>/</span>
            <span className="text-white">{scan.scan_name}</span>
          </nav>
          <h1 className="text-4xl font-bold text-white">{scan.title}</h1>
          <p className="mt-2 text-lg text-gray-300">{scan.description}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>Advanced Filters</span>
            {showFilters && <span className="text-xs">(Hide)</span>}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div>
            <FilterPanel
              filterState={filterState}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>
        )}

        {/* Results Table */}
        <div className="bg-gray-800 rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Scanner Results ({filteredData.length} assets found)
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Last updated: {new Date(lastUpdated).toLocaleString()}
                </p>
              </div>
              <div className="text-sm text-gray-400">
                Showing {filteredData.length} of {allData.length} total assets
              </div>
            </div>
          </div>
          <ScannerTable data={filteredData} scanType={scan.logic_key} />
        </div>

        {/* Enhanced Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* News Feed */}
          <div className="lg:col-span-2">
            <NewsFeed news={newsData} />
          </div>
          
          {/* Credibility Score */}
          <div>
            {credibilityScores.length > 0 && (
              <CredibilityScore score={credibilityScores[0]} />
            )}
          </div>
        </div>

        {/* Whale Tracker for Crypto Scans */}
        {scan.category === 'crypto' && (
          <div className="mb-8">
            <WhaleTracker transactions={whaleTransactions} />
          </div>
        )}

        {/* FAQ Section */}
        {scan.faqs && scan.faqs.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">FAQ</h2>
            <FAQSection faqs={scan.faqs} />
          </div>
        )}

        {/* Related Scans */}
        {relatedScans.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Related Scanners</h2>
            <RelatedScans scans={relatedScans} />
          </div>
        )}
      </main>
    </div>
  );
}
