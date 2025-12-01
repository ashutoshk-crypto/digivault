'use client';

import { useState } from 'react';
import { FundamentalFilters, TechnicalFilters, FilterState } from '@/types';

interface FilterPanelProps {
  filterState: FilterState;
  onFilterChange: (newFilterState: FilterState) => void;
  onReset: () => void;
  isCryptoScanner?: boolean;
}

export function FilterPanel({ filterState, onFilterChange, onReset, isCryptoScanner = false }: FilterPanelProps) {
  const [activeTab, setActiveTab] = useState<'fundamental' | 'technical'>(isCryptoScanner ? 'technical' : 'fundamental');
  const [isExpanded, setIsExpanded] = useState(true);

  const updateFundamentalFilter = (key: keyof FundamentalFilters, value: any) => {
    const newFilters = { ...filterState.fundamental, [key]: value };
    onFilterChange({ ...filterState, fundamental: newFilters });
  };

  const updateTechnicalFilter = (key: keyof TechnicalFilters, value: any) => {
    const newFilters = { ...filterState.technical, [key]: value };
    onFilterChange({ ...filterState, technical: newFilters });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    
    // Count fundamental filters
    if (filterState.fundamental.marketCapRange !== 'all') count++;
    if (filterState.fundamental.peRatioMin !== undefined || filterState.fundamental.peRatioMax !== undefined) count++;
    if (filterState.fundamental.pbRatioMin !== undefined || filterState.fundamental.pbRatioMax !== undefined) count++;
    if (filterState.fundamental.evEbitdaMin !== undefined || filterState.fundamental.evEbitdaMax !== undefined) count++;
    if (filterState.fundamental.dividendYieldMin !== undefined || filterState.fundamental.dividendYieldMax !== undefined) count++;
    if (filterState.fundamental.debtEquityMin !== undefined || filterState.fundamental.debtEquityMax !== undefined) count++;
    if (filterState.fundamental.currentRatioMin !== undefined || filterState.fundamental.currentRatioMax !== undefined) count++;
    if (filterState.fundamental.quickRatioMin !== undefined || filterState.fundamental.quickRatioMax !== undefined) count++;
    if (filterState.fundamental.roeMin !== undefined || filterState.fundamental.roeMax !== undefined) count++;
    if (filterState.fundamental.roceMin !== undefined || filterState.fundamental.roceMax !== undefined) count++;
    if (filterState.fundamental.epsGrowthMin !== undefined || filterState.fundamental.epsGrowthMax !== undefined) count++;
    if (filterState.fundamental.revenueGrowthYoyMin !== undefined || filterState.fundamental.revenueGrowthYoyMax !== undefined) count++;
    if (filterState.fundamental.revenueGrowthQoqMin !== undefined || filterState.fundamental.revenueGrowthQoqMax !== undefined) count++;
    if (filterState.fundamental.profitMarginNetMin !== undefined || filterState.fundamental.profitMarginNetMax !== undefined) count++;
    if (filterState.fundamental.profitMarginOperatingMin !== undefined || filterState.fundamental.profitMarginOperatingMax !== undefined) count++;
    if (filterState.fundamental.insiderBuyingMin !== undefined || filterState.fundamental.insiderBuyingMax !== undefined) count++;
    if (filterState.fundamental.promoterHoldingChangeMin !== undefined || filterState.fundamental.promoterHoldingChangeMax !== undefined) count++;
    if (filterState.fundamental.institutionalHoldingsFiiMin !== undefined || filterState.fundamental.institutionalHoldingsFiiMax !== undefined) count++;
    if (filterState.fundamental.institutionalHoldingsDiiMin !== undefined || filterState.fundamental.institutionalHoldingsDiiMax !== undefined) count++;

    // Count technical filters
    if (filterState.technical.week52HighLow !== 'all') count++;
    if (filterState.technical.ma50Crossover !== 'all') count++;
    if (filterState.technical.ma100Crossover !== 'all') count++;
    if (filterState.technical.ma200Crossover !== 'all') count++;
    if (filterState.technical.emaCrossover !== 'all') count++;
    if (filterState.technical.rsiOverbought || filterState.technical.rsiOversold) count++;
    if (filterState.technical.rsiMin !== undefined || filterState.technical.rsiMax !== undefined) count++;
    if (filterState.technical.macdSignal !== 'all') count++;
    if (filterState.technical.bollingerBands !== 'all') count++;
    if (filterState.technical.atrMin !== undefined || filterState.technical.atrMax !== undefined) count++;
    if (filterState.technical.volumeSurgeMin !== undefined || filterState.technical.volumeSurgeMax !== undefined) count++;
    if (filterState.technical.gapUp || filterState.technical.gapDown) count++;
    if (filterState.technical.priceVwap !== 'all') count++;

    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="bg-gray-800 rounded-lg shadow-md mb-6">
      <div className="px-6 py-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Advanced Filters</h3>
          <div className="flex items-center space-x-2">
            {activeFilterCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {activeFilterCount} active
              </span>
            )}
            <button
              onClick={onReset}
              className="text-gray-400 hover:text-white text-sm"
            >
              Reset All
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-700 rounded-lg p-1">
            {!isCryptoScanner && (
              <button
                onClick={() => setActiveTab('fundamental')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'fundamental'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Fundamental
              </button>
            )}
            <button
              onClick={() => setActiveTab('technical')}
              className={`${isCryptoScanner ? 'w-full' : 'flex-1'} py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'technical'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Technical
            </button>
          </div>

          {/* Fundamental Filters */}
          {activeTab === 'fundamental' && (
            <div className="space-y-6">
              {/* Market Cap */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Market Cap
                </label>
                <select
                  value={filterState.fundamental.marketCapRange}
                  onChange={(e) => updateFundamentalFilter('marketCapRange', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Market Caps</option>
                  <option value="large">Large Cap (₹20,000+ Cr)</option>
                  <option value="mid">Mid Cap (₹5,000-20,000 Cr)</option>
                  <option value="small">Small Cap (&lt;₹5,000 Cr)</option>
                </select>
              </div>

              {/* P/E Ratio */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    P/E Ratio Min
                  </label>
                  <input
                    type="number"
                    value={filterState.fundamental.peRatioMin || ''}
                    onChange={(e) => updateFundamentalFilter('peRatioMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min P/E"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    P/E Ratio Max
                  </label>
                  <input
                    type="number"
                    value={filterState.fundamental.peRatioMax || ''}
                    onChange={(e) => updateFundamentalFilter('peRatioMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max P/E"
                  />
                </div>
              </div>

              {/* P/B Ratio */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    P/B Ratio Min
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.pbRatioMin || ''}
                    onChange={(e) => updateFundamentalFilter('pbRatioMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min P/B"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    P/B Ratio Max
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.pbRatioMax || ''}
                    onChange={(e) => updateFundamentalFilter('pbRatioMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max P/B"
                  />
                </div>
              </div>

              {/* EV/EBITDA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    EV/EBITDA Min
                  </label>
                  <input
                    type="number"
                    value={filterState.fundamental.evEbitdaMin || ''}
                    onChange={(e) => updateFundamentalFilter('evEbitdaMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min EV/EBITDA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    EV/EBITDA Max
                  </label>
                  <input
                    type="number"
                    value={filterState.fundamental.evEbitdaMax || ''}
                    onChange={(e) => updateFundamentalFilter('evEbitdaMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max EV/EBITDA"
                  />
                </div>
              </div>

              {/* Dividend Yield */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dividend Yield Min (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.dividendYieldMin || ''}
                    onChange={(e) => updateFundamentalFilter('dividendYieldMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min Yield %"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Dividend Yield Max (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.dividendYieldMax || ''}
                    onChange={(e) => updateFundamentalFilter('dividendYieldMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max Yield %"
                  />
                </div>
              </div>

              {/* Debt-to-Equity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Debt-to-Equity Min
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.debtEquityMin || ''}
                    onChange={(e) => updateFundamentalFilter('debtEquityMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min D/E"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Debt-to-Equity Max
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.debtEquityMax || ''}
                    onChange={(e) => updateFundamentalFilter('debtEquityMax', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max D/E"
                  />
                </div>
              </div>

              {/* ROE & ROCE */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ROE Min (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.roeMin || ''}
                    onChange={(e) => updateFundamentalFilter('roeMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min ROE %"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ROCE Min (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.fundamental.roceMin || ''}
                    onChange={(e) => updateFundamentalFilter('roceMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min ROCE %"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Technical Filters */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              {/* 52-Week High/Low */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  52-Week High/Low
                </label>
                <select
                  value={filterState.technical.week52HighLow}
                  onChange={(e) => updateTechnicalFilter('week52HighLow', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="breakout">Near 52W High (Breakout)</option>
                  <option value="breakdown">Near 52W Low (Breakdown)</option>
                </select>
              </div>

              {/* Moving Average Crossovers */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    MA50 Crossover
                  </label>
                  <select
                    value={filterState.technical.ma50Crossover}
                    onChange={(e) => updateTechnicalFilter('ma50Crossover', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="above">Price Above MA50</option>
                    <option value="below">Price Below MA50</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    MA100 Crossover
                  </label>
                  <select
                    value={filterState.technical.ma100Crossover}
                    onChange={(e) => updateTechnicalFilter('ma100Crossover', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="above">Price Above MA100</option>
                    <option value="below">Price Below MA100</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    MA200 Crossover
                  </label>
                  <select
                    value={filterState.technical.ma200Crossover}
                    onChange={(e) => updateTechnicalFilter('ma200Crossover', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="above">Price Above MA200</option>
                    <option value="below">Price Below MA200</option>
                  </select>
                </div>
              </div>

              {/* EMA Crossovers */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  EMA Crossovers
                </label>
                <select
                  value={filterState.technical.emaCrossover}
                  onChange={(e) => updateTechnicalFilter('emaCrossover', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="golden_cross">Golden Cross (EMA50 &gt; EMA200)</option>
                  <option value="death_cross">Death Cross (EMA50 &lt; EMA200)</option>
                </select>
              </div>

              {/* RSI Filters */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterState.technical.rsiOverbought}
                      onChange={(e) => updateTechnicalFilter('rsiOverbought', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">RSI Overbought (&gt;70)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterState.technical.rsiOversold}
                      onChange={(e) => updateTechnicalFilter('rsiOversold', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">RSI Oversold (&lt;30)</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      RSI Min
                    </label>
                    <input
                      type="number"
                      value={filterState.technical.rsiMin || ''}
                      onChange={(e) => updateTechnicalFilter('rsiMin', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Min RSI"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      RSI Max
                    </label>
                    <input
                      type="number"
                      value={filterState.technical.rsiMax || ''}
                      onChange={(e) => updateTechnicalFilter('rsiMax', e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Max RSI"
                    />
                  </div>
                </div>
              </div>

              {/* MACD Signal */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  MACD Signal
                </label>
                <select
                  value={filterState.technical.macdSignal}
                  onChange={(e) => updateTechnicalFilter('macdSignal', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="bullish">Bullish Crossover</option>
                  <option value="bearish">Bearish Crossover</option>
                </select>
              </div>

              {/* Bollinger Bands */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bollinger Bands
                </label>
                <select
                  value={filterState.technical.bollingerBands}
                  onChange={(e) => updateTechnicalFilter('bollingerBands', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="upper_break">Upper Band Break</option>
                  <option value="lower_break">Lower Band Break</option>
                </select>
              </div>

              {/* Volume & Gap Filters */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Volume Surge Min (x)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.technical.volumeSurgeMin || ''}
                    onChange={(e) => updateTechnicalFilter('volumeSurgeMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min Volume Surge"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ATR Min
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={filterState.technical.atrMin || ''}
                    onChange={(e) => updateTechnicalFilter('atrMin', e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min ATR"
                  />
                </div>
              </div>

              {/* Gap & VWAP Filters */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterState.technical.gapUp}
                      onChange={(e) => updateTechnicalFilter('gapUp', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Gap Up at Open</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filterState.technical.gapDown}
                      onChange={(e) => updateTechnicalFilter('gapDown', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-300">Gap Down at Open</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price vs VWAP
                  </label>
                  <select
                    value={filterState.technical.priceVwap}
                    onChange={(e) => updateTechnicalFilter('priceVwap', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="above">Price Above VWAP</option>
                    <option value="below">Price Below VWAP</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
