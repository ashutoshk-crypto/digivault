import { MergedAssetData, FundamentalFilters, TechnicalFilters, FilterState } from '@/types';

export type FilterFunction = (data: MergedAssetData[]) => MergedAssetData[];

// Global state to track used stocks across scanners
let usedStocks = new Set<string>();

// Function to reset used stocks (call this when starting a new scan session)
export function resetUsedStocks(): void {
  usedStocks.clear();
}

// Function to get diversity-aware filter with minimum results guarantee
function getDiversityFilter(baseFilter: FilterFunction, maxResults: number = 50, minResults: number = 4): FilterFunction {
  return (data: MergedAssetData[]) => {
    const filtered = baseFilter(data);
    const available = filtered.filter(asset => !usedStocks.has(asset.symbol));
    
    // If we have enough diverse results, use them
    if (available.length >= Math.min(20, maxResults)) {
      const result = available.slice(0, maxResults);
      result.forEach(asset => usedStocks.add(asset.symbol));
      return result;
    }
    
    // If we don't have enough diverse results but have enough total results, 
    // use diverse results first, then fill with unused original results
    if (filtered.length >= minResults) {
      const diverseResults = available.slice(0, Math.min(available.length, Math.floor(maxResults * 0.7)));
      const remainingCount = Math.max(minResults - diverseResults.length, maxResults - diverseResults.length);
      
      const remainingResults = filtered
        .filter(asset => !diverseResults.some(d => d.symbol === asset.symbol))
        .slice(0, remainingCount);
      
      const result = [...diverseResults, ...remainingResults];
      result.forEach(asset => usedStocks.add(asset.symbol));
      return result;
    }
    
    // If we still don't have enough, use all available results
    const result = filtered.slice(0, Math.max(minResults, maxResults));
    result.forEach(asset => usedStocks.add(asset.symbol));
    return result;
  };
}

// Enhanced diversity filter that also considers sector diversity with minimum results guarantee
function getEnhancedDiversityFilter(baseFilter: FilterFunction, maxResults: number = 50, minResults: number = 4): FilterFunction {
  return (data: MergedAssetData[]) => {
    const filtered = baseFilter(data);
    const available = filtered.filter(asset => !usedStocks.has(asset.symbol));
    
    // If we don't have enough diverse results, use all available results to meet minimum
    if (available.length < minResults && filtered.length >= minResults) {
      const result = filtered.slice(0, Math.max(minResults, maxResults));
      result.forEach(asset => usedStocks.add(asset.symbol));
      return result;
    }
    
    // Group by sector for better diversity
    const sectorGroups = new Map<string, MergedAssetData[]>();
    available.forEach(asset => {
      const sector = asset.sector || 'Other';
      if (!sectorGroups.has(sector)) {
        sectorGroups.set(sector, []);
      }
      sectorGroups.get(sector)!.push(asset);
    });
    
    // Select diverse results from different sectors
    const result: MergedAssetData[] = [];
    const sectors = Array.from(sectorGroups.keys());
    let sectorIndex = 0;
    
    while (result.length < maxResults && result.length < available.length) {
      const currentSector = sectors[sectorIndex % sectors.length];
      const sectorAssets = sectorGroups.get(currentSector) || [];
      
      if (sectorAssets.length > 0) {
        const asset = sectorAssets.shift()!;
        result.push(asset);
        usedStocks.add(asset.symbol);
      }
      
      sectorIndex++;
      
      // If we've gone through all sectors and still need more, use remaining assets
      if (sectorIndex >= sectors.length && result.length < maxResults) {
        const remainingAssets = available.filter(asset => !result.some(r => r.symbol === asset.symbol));
        const needed = maxResults - result.length;
        const toAdd = remainingAssets.slice(0, needed);
        result.push(...toAdd);
        toAdd.forEach(asset => usedStocks.add(asset.symbol));
        break;
      }
    }
    
    // If we still don't have enough results, fill with original filtered results
    if (result.length < minResults) {
      const needed = minResults - result.length;
      const additionalResults = filtered
        .filter(asset => !result.some(r => r.symbol === asset.symbol))
        .slice(0, needed);
      result.push(...additionalResults);
      additionalResults.forEach(asset => usedStocks.add(asset.symbol));
    }
    
    return result;
  };
}

export const filterLogic: Record<string, FilterFunction> = {
  // Common Scans (Equity + Crypto)
  topGainers: (data) => 
    data
      .filter(asset => asset.daily_change_pct !== undefined && asset.asset_type === 'equity' && (asset.daily_change_pct || 0) > 0)
      .sort((a, b) => (b.daily_change_pct || 0) - (a.daily_change_pct || 0))
      .slice(0, 50),

  topLosers: (data) => 
    data
      .filter(asset => asset.daily_change_pct !== undefined && asset.asset_type === 'equity' && (asset.daily_change_pct || 0) < 0)
      .sort((a, b) => (a.daily_change_pct || 0) - (b.daily_change_pct || 0))
      .slice(0, 50),

  cryptoTopGainers: (data) => 
    data
      .filter(asset => asset.daily_change_pct !== undefined && asset.asset_type === 'crypto' && (asset.daily_change_pct || 0) > 0)
      .sort((a, b) => (b.daily_change_pct || 0) - (a.daily_change_pct || 0))
      .slice(0, 50),

  cryptoTopLosers: (data) => 
    data
      .filter(asset => asset.daily_change_pct !== undefined && asset.asset_type === 'crypto' && (asset.daily_change_pct || 0) < 0)
      .sort((a, b) => (a.daily_change_pct || 0) - (b.daily_change_pct || 0))
      .slice(0, 50),

  mostActive: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity')
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 50),

  cryptoMostActive: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto')
      .sort((a, b) => (b.volume_24h || 0) - (a.volume_24h || 0))
      .slice(0, 50),

  near52wHigh: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.close >= 0.95 * asset['52w_high'])
      .sort((a, b) => b.pct_from_52w_high - a.pct_from_52w_high)
      .slice(0, 50),

  nearATH: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && asset.close >= 0.95 * asset['52w_high'])
      .sort((a, b) => b.pct_from_52w_high - a.pct_from_52w_high)
      .slice(0, 50),

  largeDeals: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.volume > 1000000)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 50),

  whaleMovements: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && (asset.whale_activity_score || 0) > 70)
      .sort((a, b) => (b.whale_activity_score || 0) - (a.whale_activity_score || 0))
      .slice(0, 50),

  newsLinkedMoves: (data) => 
    data
      .filter(asset => Math.abs(asset.daily_change_pct || 0) > 5)
      .sort((a, b) => Math.abs(b.daily_change_pct || 0) - Math.abs(a.daily_change_pct || 0))
      .slice(0, 50),

  // Equity Screener Parameters
  lowPE_highROCE: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.pe < 20 && asset.roce > 15)
      .sort((a, b) => b.roce - a.roce)
      .slice(0, 50),

  highDividendYield: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.div_yield > 3)
      .sort((a, b) => b.div_yield - a.div_yield)
      .slice(0, 50),

  // New scanner filters with enhanced diversity and minimum 4 stocks guarantee
  highDividend: getEnhancedDiversityFilter((data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.div_yield > 2.5)
      .sort((a, b) => b.div_yield - a.div_yield)
      .slice(0, 50)
  , 50, 4),

  rsiOversoldScan: getEnhancedDiversityFilter((data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.rsi14 < 35)
      .sort((a, b) => a.rsi14 - b.rsi14)
      .slice(0, 50)
  , 50, 4),

  debtAllTimeLow: getEnhancedDiversityFilter((data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && (asset.debt_equity || 0) < 0.3)
      .sort((a, b) => (a.debt_equity || 0) - (b.debt_equity || 0))
      .slice(0, 50)
  , 50, 4),

  priceAllTimeHigh: getEnhancedDiversityFilter((data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.close >= 0.98 * asset['52w_high'])
      .sort((a, b) => b.pct_from_52w_high - a.pct_from_52w_high)
      .slice(0, 50)
  , 50, 4),

  ipoGainers: getEnhancedDiversityFilter((data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && (asset.eps_growth || 0) > 30 && (asset.daily_change_pct || 0) > 0)
      .sort((a, b) => (b.eps_growth || 0) - (a.eps_growth || 0))
      .slice(0, 50)
  , 50, 4),

  lowDebtEquity: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && (asset.debt_equity || 0) < 0.5)
      .sort((a, b) => (a.debt_equity || 0) - (b.debt_equity || 0))
      .slice(0, 50),

  highEPSGrowth: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && (asset.eps_growth || 0) > 20)
      .sort((a, b) => (b.eps_growth || 0) - (a.eps_growth || 0))
      .slice(0, 50),

  rsiOversold: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.rsi14 < 30)
      .sort((a, b) => a.rsi14 - b.rsi14)
      .slice(0, 50),

  macdBullishCrossover: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.macd_line > asset.macd_signal && asset.macd_hist > 0)
      .sort((a, b) => b.macd_hist - a.macd_hist)
      .slice(0, 50),

  smaGoldenCross: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.ma50 > asset.ma200)
      .sort((a, b) => (b.ma50 - b.ma200) - (a.ma50 - a.ma200))
      .slice(0, 50),

  highVolume: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity')
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 50),

  // Crypto Screener Parameters
  highMarketCapCrypto: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && asset.market_cap > 1000000000)
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, 50),

  highVolume24h: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && (asset.volume_24h || 0) > 100000000)
      .sort((a, b) => (b.volume_24h || 0) - (a.volume_24h || 0))
      .slice(0, 50),

  healthyTokenomics: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && (asset.tokenomics_health || 0) > 80)
      .sort((a, b) => (b.tokenomics_health || 0) - (a.tokenomics_health || 0))
      .slice(0, 50),

  highActiveAddresses: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && (asset.active_addresses || 0) > 100000)
      .sort((a, b) => (b.active_addresses || 0) - (a.active_addresses || 0))
      .slice(0, 50),

  lowGasFees: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && (asset.gas_fees || 0) < 1)
      .sort((a, b) => (a.gas_fees || 0) - (b.gas_fees || 0))
      .slice(0, 50),

  highTVL: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && (asset.tvl || 0) > 1000000000)
      .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
      .slice(0, 50),

  highStakingRatio: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && (asset.staking_ratio || 0) > 0.5)
      .sort((a, b) => (b.staking_ratio || 0) - (a.staking_ratio || 0))
      .slice(0, 50),

  cryptoRSIOversold: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && asset.rsi14 < 30)
      .sort((a, b) => a.rsi14 - b.rsi14)
      .slice(0, 50),

  cryptoMACDBullish: (data) => 
    data
      .filter(asset => asset.asset_type === 'crypto' && asset.macd_line > asset.macd_signal && asset.macd_hist > 0)
      .sort((a, b) => b.macd_hist - a.macd_hist)
      .slice(0, 50),

  // Cross-Asset Filters
  momentum: (data) => 
    data
      .filter(asset => asset.rsi14 > 50 && asset.close > asset.ma50)
      .sort((a, b) => b.rsi14 - a.rsi14)
      .slice(0, 50),

  value: (data) => 
    data
      .filter(asset => asset.asset_type === 'equity' && asset.pe > 0 && asset.pe < 15 && asset.roce > 10)
      .sort((a, b) => a.pe - b.pe)
      .slice(0, 50),

  highCredibility: (data) => 
    data
      .filter(asset => (asset.credibility_score || 0) > 80)
      .sort((a, b) => (b.credibility_score || 0) - (a.credibility_score || 0))
      .slice(0, 50),

  newsSentimentPositive: (data) => 
    data
      .filter(asset => asset.news_sentiment === 'positive')
      .sort((a, b) => (b.credibility_score || 0) - (a.credibility_score || 0))
      .slice(0, 50),
};

export function applyFilter(data: MergedAssetData[], logicKey: string): MergedAssetData[] {
  const filter = filterLogic[logicKey];
  if (!filter) {
    console.warn(`Filter logic not found for key: ${logicKey}`);
    return data.slice(0, 50); // Default to first 50 items
  }
  
  const result = filter(data);
  
  // Ensure minimum 4 results for all scanners
  if (result.length < 4 && data.length >= 4) {
    const additionalResults = data
      .filter(asset => !result.some(r => r.symbol === asset.symbol))
      .slice(0, 4 - result.length);
    return [...result, ...additionalResults];
  }
  
  return result;
}

// Comprehensive Filter Functions
export function applyFundamentalFilters(data: MergedAssetData[], filters: FundamentalFilters): MergedAssetData[] {
  return data.filter(asset => {
    // Market Cap Filter
    if (filters.marketCapRange !== 'all') {
      const marketCap = asset.market_cap;
      if (filters.marketCapRange === 'large' && marketCap < 20000) return false;
      if (filters.marketCapRange === 'mid' && (marketCap < 5000 || marketCap >= 20000)) return false;
      if (filters.marketCapRange === 'small' && marketCap >= 5000) return false;
    }

    // P/E Ratio Filter
    if (filters.peRatioMin !== undefined && asset.pe < filters.peRatioMin) return false;
    if (filters.peRatioMax !== undefined && asset.pe > filters.peRatioMax) return false;

    // P/B Ratio Filter
    if (filters.pbRatioMin !== undefined && (asset.pb_ratio || 0) < filters.pbRatioMin) return false;
    if (filters.pbRatioMax !== undefined && (asset.pb_ratio || 0) > filters.pbRatioMax) return false;

    // EV/EBITDA Filter
    if (filters.evEbitdaMin !== undefined && (asset.ev_ebitda || 0) < filters.evEbitdaMin) return false;
    if (filters.evEbitdaMax !== undefined && (asset.ev_ebitda || 0) > filters.evEbitdaMax) return false;

    // Dividend Yield Filter
    if (filters.dividendYieldMin !== undefined && asset.div_yield < filters.dividendYieldMin) return false;
    if (filters.dividendYieldMax !== undefined && asset.div_yield > filters.dividendYieldMax) return false;

    // Debt-to-Equity Filter
    if (filters.debtEquityMin !== undefined && (asset.debt_equity || 0) < filters.debtEquityMin) return false;
    if (filters.debtEquityMax !== undefined && (asset.debt_equity || 0) > filters.debtEquityMax) return false;

    // Current Ratio Filter
    if (filters.currentRatioMin !== undefined && (asset.current_ratio || 0) < filters.currentRatioMin) return false;
    if (filters.currentRatioMax !== undefined && (asset.current_ratio || 0) > filters.currentRatioMax) return false;

    // Quick Ratio Filter
    if (filters.quickRatioMin !== undefined && (asset.quick_ratio || 0) < filters.quickRatioMin) return false;
    if (filters.quickRatioMax !== undefined && (asset.quick_ratio || 0) > filters.quickRatioMax) return false;

    // ROE Filter
    if (filters.roeMin !== undefined && asset.roe < filters.roeMin) return false;
    if (filters.roeMax !== undefined && asset.roe > filters.roeMax) return false;

    // ROCE Filter
    if (filters.roceMin !== undefined && asset.roce < filters.roceMin) return false;
    if (filters.roceMax !== undefined && asset.roce > filters.roceMax) return false;

    // EPS Growth Filter
    if (filters.epsGrowthMin !== undefined && (asset.eps_growth || 0) < filters.epsGrowthMin) return false;
    if (filters.epsGrowthMax !== undefined && (asset.eps_growth || 0) > filters.epsGrowthMax) return false;

    // Revenue Growth YoY Filter
    if (filters.revenueGrowthYoyMin !== undefined && (asset.revenue_growth_yoy || 0) < filters.revenueGrowthYoyMin) return false;
    if (filters.revenueGrowthYoyMax !== undefined && (asset.revenue_growth_yoy || 0) > filters.revenueGrowthYoyMax) return false;

    // Revenue Growth QoQ Filter
    if (filters.revenueGrowthQoqMin !== undefined && (asset.revenue_growth_qoq || 0) < filters.revenueGrowthQoqMin) return false;
    if (filters.revenueGrowthQoqMax !== undefined && (asset.revenue_growth_qoq || 0) > filters.revenueGrowthQoqMax) return false;

    // Net Profit Margin Filter
    if (filters.profitMarginNetMin !== undefined && (asset.profit_margin_net || 0) < filters.profitMarginNetMin) return false;
    if (filters.profitMarginNetMax !== undefined && (asset.profit_margin_net || 0) > filters.profitMarginNetMax) return false;

    // Operating Profit Margin Filter
    if (filters.profitMarginOperatingMin !== undefined && (asset.profit_margin_operating || 0) < filters.profitMarginOperatingMin) return false;
    if (filters.profitMarginOperatingMax !== undefined && (asset.profit_margin_operating || 0) > filters.profitMarginOperatingMax) return false;

    // Insider Buying Filter
    if (filters.insiderBuyingMin !== undefined && (asset.insider_buying || 0) < filters.insiderBuyingMin) return false;
    if (filters.insiderBuyingMax !== undefined && (asset.insider_buying || 0) > filters.insiderBuyingMax) return false;

    // Promoter Holding Change Filter
    if (filters.promoterHoldingChangeMin !== undefined && (asset.promoter_holding_change || 0) < filters.promoterHoldingChangeMin) return false;
    if (filters.promoterHoldingChangeMax !== undefined && (asset.promoter_holding_change || 0) > filters.promoterHoldingChangeMax) return false;

    // FII Holdings Filter
    if (filters.institutionalHoldingsFiiMin !== undefined && (asset.institutional_holdings_fii || 0) < filters.institutionalHoldingsFiiMin) return false;
    if (filters.institutionalHoldingsFiiMax !== undefined && (asset.institutional_holdings_fii || 0) > filters.institutionalHoldingsFiiMax) return false;

    // DII Holdings Filter
    if (filters.institutionalHoldingsDiiMin !== undefined && (asset.institutional_holdings_dii || 0) < filters.institutionalHoldingsDiiMin) return false;
    if (filters.institutionalHoldingsDiiMax !== undefined && (asset.institutional_holdings_dii || 0) > filters.institutionalHoldingsDiiMax) return false;

    return true;
  });
}

export function applyTechnicalFilters(data: MergedAssetData[], filters: TechnicalFilters): MergedAssetData[] {
  return data.filter(asset => {
    // 52-Week High/Low Filter
    if (filters.week52HighLow === 'breakout' && asset.close < asset['52w_high'] * 0.95) return false;
    if (filters.week52HighLow === 'breakdown' && asset.close > asset['52w_low'] * 1.05) return false;

    // Moving Average Crossovers
    if (filters.ma50Crossover === 'above' && asset.close <= asset.ma50) return false;
    if (filters.ma50Crossover === 'below' && asset.close >= asset.ma50) return false;

    if (filters.ma100Crossover === 'above' && asset.close <= (asset.ma100 || 0)) return false;
    if (filters.ma100Crossover === 'below' && asset.close >= (asset.ma100 || 0)) return false;

    if (filters.ma200Crossover === 'above' && asset.close <= asset.ma200) return false;
    if (filters.ma200Crossover === 'below' && asset.close >= asset.ma200) return false;

    // EMA Crossovers (Golden Cross / Death Cross)
    if (filters.emaCrossover === 'golden_cross' && (!asset.ema50 || !asset.ema200 || asset.ema50 <= asset.ema200)) return false;
    if (filters.emaCrossover === 'death_cross' && (!asset.ema50 || !asset.ema200 || asset.ema50 >= asset.ema200)) return false;

    // RSI Filters
    if (filters.rsiOverbought && asset.rsi14 < 70) return false;
    if (filters.rsiOversold && asset.rsi14 > 30) return false;
    if (filters.rsiMin !== undefined && asset.rsi14 < filters.rsiMin) return false;
    if (filters.rsiMax !== undefined && asset.rsi14 > filters.rsiMax) return false;

    // MACD Signal Filter
    if (filters.macdSignal === 'bullish' && (asset.macd_line <= asset.macd_signal || asset.macd_hist <= 0)) return false;
    if (filters.macdSignal === 'bearish' && (asset.macd_line >= asset.macd_signal || asset.macd_hist >= 0)) return false;

    // Bollinger Bands Filter
    if (filters.bollingerBands === 'upper_break' && asset.close <= (asset.bollinger_upper || 0)) return false;
    if (filters.bollingerBands === 'lower_break' && asset.close >= (asset.bollinger_lower || 0)) return false;

    // ATR Filter
    if (filters.atrMin !== undefined && (asset.atr || 0) < filters.atrMin) return false;
    if (filters.atrMax !== undefined && (asset.atr || 0) > filters.atrMax) return false;

    // Volume Surge Filter
    if (filters.volumeSurgeMin !== undefined && (asset.volume_surge || 0) < filters.volumeSurgeMin) return false;
    if (filters.volumeSurgeMax !== undefined && (asset.volume_surge || 0) > filters.volumeSurgeMax) return false;

    // Gap Up/Down Filter
    if (filters.gapUp && !asset.gap_up) return false;
    if (filters.gapDown && !asset.gap_down) return false;

    // Price vs VWAP Filter
    if (filters.priceVwap === 'above' && !asset.price_above_vwap) return false;
    if (filters.priceVwap === 'below' && !asset.price_below_vwap) return false;

    return true;
  });
}

export function applyAllFilters(data: MergedAssetData[], filterState: FilterState): MergedAssetData[] {
  let filteredData = [...data];
  
  // Apply fundamental filters
  filteredData = applyFundamentalFilters(filteredData, filterState.fundamental);
  
  // Apply technical filters
  filteredData = applyTechnicalFilters(filteredData, filterState.technical);
  
  return filteredData;
}

// Default filter states
export const defaultFundamentalFilters: FundamentalFilters = {
  marketCapRange: 'all',
};

export const defaultTechnicalFilters: TechnicalFilters = {
  week52HighLow: 'all',
  ma50Crossover: 'all',
  ma100Crossover: 'all',
  ma200Crossover: 'all',
  emaCrossover: 'all',
  rsiOverbought: false,
  rsiOversold: false,
  macdSignal: 'all',
  bollingerBands: 'all',
  gapUp: false,
  gapDown: false,
  priceVwap: 'all',
};

export const defaultFilterState: FilterState = {
  fundamental: defaultFundamentalFilters,
  technical: defaultTechnicalFilters,
  activeFilters: [],
};
