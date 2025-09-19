// Data structure interfaces based on the PRD

export interface FundamentalData {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  market_cap: number;
  pe: number;
  roe: number;
  roce: number;
  div_yield: number;
  debt_equity?: number;
  eps_growth?: number;
  updated_at: string;
}

export interface CryptoFundamentalData {
  symbol: string;
  name: string;
  price: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply?: number;
  tokenomics_health: number; // 0-100 score
  active_addresses?: number;
  gas_fees?: number;
  tvl?: number;
  staking_ratio?: number;
  updated_at: string;
}

export interface NewsData {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number; // 0-100
  published_at: string;
  related_assets: string[];
}

export interface WhaleTransaction {
  id: string;
  asset_symbol: string;
  transaction_type: 'buy' | 'sell' | 'transfer';
  amount: number;
  value_usd: number;
  from_address: string;
  to_address: string;
  timestamp: string;
  credibility_score: number;
}

export interface CredibilityScore {
  asset_symbol: string;
  overall_score: number; // 0-100
  data_source_quality: number; // 0-100
  news_validation: number; // 0-100
  institutional_backing: number; // 0-100
  social_sentiment: number; // 0-100
  last_updated: string;
}

export interface TechnicalData {
  date: string;
  symbol: string;
  close: number;
  volume: number;
  ma50: number;
  ma200: number;
  rsi14: number;
  macd_line: number;
  macd_signal: number;
  macd_hist: number;
  '52w_high': number;
  '52w_low': number;
  pct_from_52w_high: number;
  pct_from_52w_low: number;
}

export interface ScanConfig {
  category: 'equity' | 'crypto' | 'cross-asset';
  scan_name: string;
  slug: string;
  dataset: 'equity' | 'crypto' | 'cross-asset';
  logic_key: string;
  title: string;
  description: string;
  faqs?: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MergedAssetData {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  market_cap: number;
  pe: number;
  roe: number;
  roce: number;
  div_yield: number;
  close: number;
  volume: number;
  ma50: number;
  ma200: number;
  rsi14: number;
  macd_line: number;
  macd_signal: number;
  macd_hist: number;
  '52w_high': number;
  '52w_low': number;
  pct_from_52w_high: number;
  pct_from_52w_low: number;
  daily_change?: number;
  daily_change_pct?: number;
  // Crypto-specific fields
  volume_24h?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  tokenomics_health?: number;
  active_addresses?: number;
  gas_fees?: number;
  tvl?: number;
  staking_ratio?: number;
  // Enhanced fields
  debt_equity?: number;
  eps_growth?: number;
  credibility_score?: number;
  news_sentiment?: 'positive' | 'negative' | 'neutral';
  whale_activity_score?: number;
  asset_type: 'equity' | 'crypto';
  
  // Fundamental Parameters
  pb_ratio?: number; // P/B Ratio
  ev_ebitda?: number; // EV/EBITDA
  current_ratio?: number; // Current Ratio
  quick_ratio?: number; // Quick Ratio
  revenue_growth_yoy?: number; // Revenue Growth YoY
  revenue_growth_qoq?: number; // Revenue Growth QoQ
  profit_margin_net?: number; // Net Profit Margin
  profit_margin_operating?: number; // Operating Profit Margin
  insider_buying?: number; // Insider Buying Score
  promoter_holding_change?: number; // Promoter Holding Change
  institutional_holdings_fii?: number; // FII Holdings
  institutional_holdings_dii?: number; // DII Holdings
  
  // Technical Parameters
  ma100?: number; // 100-day Moving Average
  ema12?: number; // 12-day EMA
  ema26?: number; // 26-day EMA
  ema50?: number; // 50-day EMA
  bollinger_upper?: number; // Bollinger Bands Upper
  bollinger_lower?: number; // Bollinger Bands Lower
  bollinger_middle?: number; // Bollinger Bands Middle
  atr?: number; // Average True Range
  volume_surge?: number; // Volume Surge (relative to average)
  gap_up?: boolean; // Gap Up at Open
  gap_down?: boolean; // Gap Down at Open
  price_above_vwap?: boolean; // Price Above VWAP
  price_below_vwap?: boolean; // Price Below VWAP
  vwap?: number; // Volume Weighted Average Price
}

export interface ScannerPageProps {
  scan: ScanConfig;
  data: MergedAssetData[];
  lastUpdated: string;
}

export interface HomePageProps {
  scans: ScanConfig[];
}

// Filter Interfaces
export interface FundamentalFilters {
  marketCapRange: 'large' | 'mid' | 'small' | 'all';
  peRatioMin?: number;
  peRatioMax?: number;
  pbRatioMin?: number;
  pbRatioMax?: number;
  evEbitdaMin?: number;
  evEbitdaMax?: number;
  dividendYieldMin?: number;
  dividendYieldMax?: number;
  debtEquityMin?: number;
  debtEquityMax?: number;
  currentRatioMin?: number;
  currentRatioMax?: number;
  quickRatioMin?: number;
  quickRatioMax?: number;
  roeMin?: number;
  roeMax?: number;
  roceMin?: number;
  roceMax?: number;
  epsGrowthMin?: number;
  epsGrowthMax?: number;
  revenueGrowthYoyMin?: number;
  revenueGrowthYoyMax?: number;
  revenueGrowthQoqMin?: number;
  revenueGrowthQoqMax?: number;
  profitMarginNetMin?: number;
  profitMarginNetMax?: number;
  profitMarginOperatingMin?: number;
  profitMarginOperatingMax?: number;
  insiderBuyingMin?: number;
  insiderBuyingMax?: number;
  promoterHoldingChangeMin?: number;
  promoterHoldingChangeMax?: number;
  institutionalHoldingsFiiMin?: number;
  institutionalHoldingsFiiMax?: number;
  institutionalHoldingsDiiMin?: number;
  institutionalHoldingsDiiMax?: number;
}

export interface TechnicalFilters {
  week52HighLow: 'breakout' | 'breakdown' | 'all';
  ma50Crossover: 'above' | 'below' | 'all';
  ma100Crossover: 'above' | 'below' | 'all';
  ma200Crossover: 'above' | 'below' | 'all';
  emaCrossover: 'golden_cross' | 'death_cross' | 'all';
  rsiOverbought: boolean;
  rsiOversold: boolean;
  rsiMin?: number;
  rsiMax?: number;
  macdSignal: 'bullish' | 'bearish' | 'all';
  bollingerBands: 'upper_break' | 'lower_break' | 'all';
  atrMin?: number;
  atrMax?: number;
  volumeSurgeMin?: number;
  volumeSurgeMax?: number;
  gapUp: boolean;
  gapDown: boolean;
  priceVwap: 'above' | 'below' | 'all';
}

export interface FilterState {
  fundamental: FundamentalFilters;
  technical: TechnicalFilters;
  activeFilters: string[];
}
