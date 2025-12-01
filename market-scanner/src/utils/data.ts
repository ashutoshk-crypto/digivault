import { FundamentalData, TechnicalData, MergedAssetData, ScanConfig, CryptoFundamentalData, NewsData, WhaleTransaction, CredibilityScore } from '@/types';
import { fetchFundamentalDataFromCSV, fetchTechnicalDataFromCSV, CSV_URLS } from './csv-fetcher';

// Utility function to convert market cap to crores format
export function convertToCrores(value: number): number {
  return value / 1e7; // Convert to crores (divide by 10 million)
}

// Utility function to format market cap in crores
export function formatMarketCapInCrores(value: number): string {
  // Since market cap values are already in crores format, format them with lakh crores for larger values
  const lakhCrores = value / 100000; // Convert to lakh crores
  
  if (lakhCrores >= 1) {
    return `₹${lakhCrores.toFixed(1)} lakh crores`;
  } else {
    // For values less than 1 lakh crores, show in crores with comma formatting
    return `₹${value.toLocaleString('en-IN')} crores`;
  }
}

// Fetch fundamental data - uses CSV if URL is provided, otherwise mock data
export async function fetchFundamentalData(): Promise<FundamentalData[]> {
  // Try to fetch from CSV if URL is provided
  if (CSV_URLS.FUNDAMENTALS) {
    try {
      return await fetchFundamentalDataFromCSV(CSV_URLS.FUNDAMENTALS);
    } catch (error) {
      console.warn('Failed to fetch fundamental data from CSV, using mock data:', error);
    }
  }
  
  // Fallback to mock data for development
  return [
    // Technology Sector
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services Ltd.',
      sector: 'Technology',
      price: 3750.50,
      market_cap: 1370000, // 13.7 lakh crores
      pe: 28.5,
      roe: 15.2,
      roce: 18.5,
      div_yield: 0.5,
      debt_equity: 0.15,
      eps_growth: 8.2,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'INFY',
      name: 'Infosys Ltd.',
      sector: 'Technology',
      price: 1580.25,
      market_cap: 650000, // 6.5 lakht l crores
      pe: 32.1,
      roe: 18.5,
      roce: 22.1,
      div_yield: 0.7,
      debt_equity: 0.22,
      eps_growth: 12.5,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'HCLTECH',
      name: 'HCL Technologies Ltd.',
      sector: 'Technology',
      price: 1250.80,
      market_cap: 340000, // 3.4 lakh crores
      pe: 25.8,
      roe: 12.8,
      roce: 16.2,
      div_yield: 0.0,
      debt_equity: 0.08,
      eps_growth: 15.3,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'WIPRO',
      name: 'Wipro Ltd.',
      sector: 'Technology',
      price: 420.30,
      market_cap: 240000, // 2.4 lakh crores
      pe: 65.8,
      roe: 25.5,
      roce: 28.9,
      div_yield: 0.1,
      debt_equity: 0.12,
      eps_growth: 45.2,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'TECHM',
      name: 'Tech Mahindra Ltd.',
      sector: 'Technology',
      price: 1185.20,
      market_cap: 115000, // 1.15 lakh crores
      pe: 22.5,
      roe: 18.2,
      roce: 20.1,
      div_yield: 0.0,
      debt_equity: 0.18,
      eps_growth: 22.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'LTIM',
      name: 'LTI Mindtree Ltd.',
      sector: 'Technology',
      price: 4850.80,
      market_cap: 145000, // 1.45 lakh crores
      pe: 35.2,
      roe: 8.5,
      roce: 12.3,
      div_yield: 0.0,
      debt_equity: 0.35,
      eps_growth: 18.7,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'MARUTI',
      name: 'Maruti Suzuki India Ltd.',
      sector: 'Automotive',
      price: 10250.15,
      market_cap: 310000, // 3.1 lakh crores
      pe: 45.2,
      roe: 8.5,
      roce: 12.1,
      div_yield: 0.0,
      debt_equity: 0.08,
      eps_growth: 35.4,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'TATAMOTORS',
      name: 'Tata Motors Ltd.',
      sector: 'Automotive',
      price: 485.45,
      market_cap: 160000, // 1.6 lakh crores
      pe: 8.2,
      roe: 5.8,
      roce: 7.2,
      div_yield: 4.8,
      debt_equity: 0.45,
      eps_growth: -2.1,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'M&M',
      name: 'Mahindra & Mahindra Ltd.',
      sector: 'Automotive',
      price: 1580.90,
      market_cap: 195000, // 1.95 lakh crores
      pe: 6.8,
      roe: 7.2,
      roce: 8.9,
      div_yield: 3.2,
      debt_equity: 0.52,
      eps_growth: 5.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    // Financial Sector
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd.',
      sector: 'Financial',
      price: 1650.20,
      market_cap: 1250000, // 12.5 lakh crores
      pe: 11.5,
      roe: 12.8,
      roce: 15.2,
      div_yield: 2.8,
      debt_equity: 0.85,
      eps_growth: 8.5,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Ltd.',
      sector: 'Financial',
      price: 985.45,
      market_cap: 680000, // 6.8 lakh crores
      pe: 9.8,
      roe: 10.2,
      roce: 12.5,
      div_yield: 3.1,
      debt_equity: 0.92,
      eps_growth: 6.2,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'SBIN',
      name: 'State Bank of India',
      sector: 'Financial',
      price: 585.80,
      market_cap: 520000, // 5.2 lakh crores
      pe: 8.5,
      roe: 8.9,
      roce: 10.8,
      div_yield: 3.5,
      debt_equity: 0.78,
      eps_growth: 4.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    // Healthcare Sector
    {
      symbol: 'SUNPHARMA',
      name: 'Sun Pharmaceutical Industries Ltd.',
      sector: 'Healthcare',
      price: 1085.75,
      market_cap: 260000, // 2.6 lakh crores
      pe: 15.2,
      roe: 18.5,
      roce: 22.1,
      div_yield: 2.9,
      debt_equity: 0.25,
      eps_growth: 7.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'DRREDDY',
      name: 'Dr. Reddy\'s Laboratories Ltd.',
      sector: 'Healthcare',
      price: 5850.90,
      market_cap: 98000, // 98,000 crores
      pe: 12.8,
      roe: 15.2,
      roce: 18.5,
      div_yield: 4.2,
      debt_equity: 0.35,
      eps_growth: -5.2,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'CIPLA',
      name: 'Cipla Ltd.',
      sector: 'Healthcare',
      price: 1250.20,
      market_cap: 101000, // 1.01 lakh crores
      pe: 18.5,
      roe: 22.8,
      roce: 25.2,
      div_yield: 1.5,
      debt_equity: 0.28,
      eps_growth: 12.5,
      updated_at: '2024-01-15T10:00:00Z'
    },
    // Energy Sector
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd.',
      sector: 'Energy',
      price: 2580.45,
      market_cap: 1750000, // 17.5 lakh crores
      pe: 14.2,
      roe: 18.5,
      roce: 22.1,
      div_yield: 3.8,
      debt_equity: 0.22,
      eps_growth: 15.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ONGC',
      name: 'Oil and Natural Gas Corporation Ltd.',
      sector: 'Energy',
      price: 185.80,
      market_cap: 230000, // 2.3 lakh crores
      pe: 12.5,
      roe: 15.8,
      roce: 18.9,
      div_yield: 4.2,
      debt_equity: 0.18,
      eps_growth: 18.2,
      updated_at: '2024-01-15T10:00:00Z'
    },
    // Consumer Goods
    {
      symbol: 'ITC',
      name: 'ITC Ltd.',
      sector: 'Consumer Goods',
      price: 485.20,
      market_cap: 600000, // 6 lakh crores
      pe: 22.5,
      roe: 28.5,
      roce: 32.1,
      div_yield: 3.2,
      debt_equity: 0.45,
      eps_growth: 5.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'NESTLEIND',
      name: 'Nestle India Ltd.',
      sector: 'Consumer Goods',
      price: 18550.80,
      market_cap: 178000, // 1.78 lakh crores
      pe: 25.8,
      roe: 32.1,
      roce: 35.2,
      div_yield: 2.8,
      debt_equity: 0.52,
      eps_growth: 8.5,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'HINDUNILVR',
      name: 'Hindustan Unilever Ltd.',
      sector: 'Consumer Goods',
      price: 2580.20,
      market_cap: 610000, // 6.1 lakh crores
      pe: 28.5,
      roe: 15.2,
      roce: 18.5,
      div_yield: 1.5,
      debt_equity: 0.35,
      eps_growth: 6.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    // Industrial
    {
      symbol: 'LT',
      name: 'Larsen & Toubro Ltd.',
      sector: 'Industrial',
      price: 3250.80,
      market_cap: 450000, // 4.5 lakh crores
      pe: 18.5,
      roe: 8.5,
      roce: 12.1,
      div_yield: 0.0,
      debt_equity: 0.85,
      eps_growth: -8.2,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'BHARTIARTL',
      name: 'Bharti Airtel Ltd.',
      sector: 'Telecommunications',
      price: 985.50,
      market_cap: 550000, // 5.5 lakh crores
      pe: 15.8,
      roe: 22.5,
      roce: 25.8,
      div_yield: 2.1,
      debt_equity: 0.45,
      eps_growth: 12.8,
      updated_at: '2024-01-15T10:00:00Z'
    },
    
    // Filter-Friendly Stocks - These will always match certain filter criteria
    {
      symbol: 'ZOMATO',
      name: 'Zomato Ltd.',
      sector: 'Technology',
      price: 2500.00,
      market_cap: 15000, // Small cap
      pe: 8.5, // Low P/E
      roe: 35.0, // High ROE
      roce: 40.0, // High ROCE
      div_yield: 4.5, // High dividend yield
      debt_equity: 0.1, // Low debt
      eps_growth: 45.0, // High EPS growth
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'PAYTM',
      name: 'One97 Communications Ltd.',
      sector: 'Financial',
      price: 1800.00,
      market_cap: 25000, // Mid cap
      pe: 12.0, // Moderate P/E
      roe: 25.0, // Good ROE
      roce: 30.0, // Good ROCE
      div_yield: 6.0, // Very high dividend yield
      debt_equity: 0.2, // Low debt
      eps_growth: 20.0, // Good EPS growth
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ADANIPORTS',
      name: 'Adani Ports and Special Economic Zone Ltd.',
      sector: 'Infrastructure',
      price: 4500.00,
      market_cap: 250000, // Large cap
      pe: 6.5, // Very low P/E
      roe: 20.0, // Moderate ROE
      roce: 25.0, // Moderate ROCE
      div_yield: 3.5, // Good dividend yield
      debt_equity: 0.3, // Moderate debt
      eps_growth: 15.0, // Moderate EPS growth
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'BIOCON',
      name: 'Biocon Ltd.',
      sector: 'Healthcare',
      price: 3200.00,
      market_cap: 8000, // Small cap
      pe: 15.0, // Moderate P/E
      roe: 45.0, // Very high ROE
      roce: 50.0, // Very high ROCE
      div_yield: 1.5, // Low dividend yield
      debt_equity: 0.05, // Very low debt
      eps_growth: 60.0, // Very high EPS growth
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'POWERGRID',
      name: 'Power Grid Corporation of India Ltd.',
      sector: 'Utilities',
      price: 1200.00,
      market_cap: 12000, // Small cap
      pe: 18.0, // Moderate P/E
      roe: 15.0, // Moderate ROE
      roce: 18.0, // Moderate ROCE
      div_yield: 8.5, // Very high dividend yield
      debt_equity: 0.4, // Moderate debt
      eps_growth: 8.0, // Low EPS growth
      updated_at: '2024-01-15T10:00:00Z'
    }
  ];
}

export async function fetchTechnicalData(): Promise<TechnicalData[]> {
  // Try to fetch from CSV if URL is provided
  if (CSV_URLS.TECHNICALS) {
    try {
      return await fetchTechnicalDataFromCSV(CSV_URLS.TECHNICALS);
    } catch (error) {
      console.warn('Failed to fetch technical data from CSV, using mock data:', error);
    }
  }
  
  // Fallback to mock data for development
  return [
    {
      date: '2024-01-15',
      symbol: 'TCS',
      close: 3750.50,
      volume: 45000000,
      ma50: 3700.25,
      ma200: 3650.80,
      rsi14: 45.2,
      macd_line: 2.15,
      macd_signal: 1.85,
      macd_hist: 0.30,
      '52w_high': 3980.23,
      '52w_low': 3240.17,
      pct_from_52w_high: -11.5,
      pct_from_52w_low: 41.3
    },
    {
      date: '2024-01-15',
      symbol: 'INFY',
      close: 1580.25,
      volume: 25000000,
      ma50: 1575.10,
      ma200: 1560.45,
      rsi14: 52.8,
      macd_line: 5.25,
      macd_signal: 4.80,
      macd_hist: 0.45,
      '52w_high': 1680.82,
      '52w_low': 1209.45,
      pct_from_52w_high: -9.6,
      pct_from_52w_low: 22.9
    },
    {
      date: '2024-01-15',
      symbol: 'HCLTECH',
      close: 1250.80,
      volume: 30000000,
      ma50: 1240.15,
      ma200: 1235.20,
      rsi14: 38.5,
      macd_line: 1.25,
      macd_signal: 1.45,
      macd_hist: -0.20,
      '52w_high': 1355.22,
      '52w_low': 1022.15,
      pct_from_52w_high: -8.0,
      pct_from_52w_low: 39.8
    },
    {
      date: '2024-01-15',
      symbol: 'WIPRO',
      close: 420.30,
      volume: 35000000,
      ma50: 410.45,
      ma200: 380.20,
      rsi14: 65.8,
      macd_line: 8.25,
      macd_signal: 6.80,
      macd_hist: 1.45,
      '52w_high': 474.00,
      '52w_low': 320.51,
      pct_from_52w_high: -12.7,
      pct_from_52w_low: 142.6
    },
    {
      date: '2024-01-15',
      symbol: 'TECHM',
      close: 1185.20,
      volume: 18000000,
      ma50: 1175.30,
      ma200: 1150.15,
      rsi14: 58.2,
      macd_line: 3.45,
      macd_signal: 2.80,
      macd_hist: 0.65,
      '52w_high': 1285.80,
      '52w_low': 985.25,
      pct_from_52w_high: -7.7,
      pct_from_52w_low: 70.1
    },
    {
      date: '2024-01-15',
      symbol: 'LTIM',
      close: 4850.80,
      volume: 22000000,
      ma50: 4820.45,
      ma200: 4780.20,
      rsi14: 42.8,
      macd_line: 1.85,
      macd_signal: 2.10,
      macd_hist: -0.25,
      '52w_high': 5255.45,
      '52w_low': 4250.80,
      pct_from_52w_high: -11.2,
      pct_from_52w_low: 23.8
    },
    {
      date: '2024-01-15',
      symbol: 'MARUTI',
      close: 10250.15,
      volume: 60000000,
      ma50: 10150.30,
      ma200: 10000.85,
      rsi14: 28.2,
      macd_line: -2.15,
      macd_signal: -1.80,
      macd_hist: -0.35,
      '52w_high': 11299.29,
      '52w_low': 8500.80,
      pct_from_52w_high: -26.4,
      pct_from_52w_low: 58.6
    },
    {
      date: '2024-01-15',
      symbol: 'TATAMOTORS',
      close: 485.45,
      volume: 85000000,
      ma50: 490.80,
      ma200: 495.25,
      rsi14: 35.8,
      macd_line: -0.15,
      macd_signal: -0.05,
      macd_hist: -0.10,
      '52w_high': 580.80,
      '52w_low': 380.45,
      pct_from_52w_high: -21.2,
      pct_from_52w_low: 31.7
    },
    {
      date: '2024-01-15',
      symbol: 'M&M',
      close: 1580.90,
      volume: 45000000,
      ma50: 1590.25,
      ma200: 1580.80,
      rsi14: 48.5,
      macd_line: 0.25,
      macd_signal: 0.30,
      macd_hist: -0.05,
      '52w_high': 1680.20,
      '52w_low': 1280.50,
      pct_from_52w_high: -13.9,
      pct_from_52w_low: 36.5
    },
    {
      date: '2024-01-15',
      symbol: 'HDFCBANK',
      close: 1650.20,
      volume: 12000000,
      ma50: 1640.80,
      ma200: 1620.45,
      rsi14: 55.2,
      macd_line: 1.25,
      macd_signal: 0.95,
      macd_hist: 0.30,
      '52w_high': 1750.50,
      '52w_low': 1450.80,
      pct_from_52w_high: -10.9,
      pct_from_52w_low: 31.3
    },
    {
      date: '2024-01-15',
      symbol: 'ICICIBANK',
      close: 985.45,
      volume: 35000000,
      ma50: 980.80,
      ma200: 960.25,
      rsi14: 52.8,
      macd_line: 0.45,
      macd_signal: 0.35,
      macd_hist: 0.10,
      '52w_high': 1080.90,
      '52w_low': 850.15,
      pct_from_52w_high: -16.6,
      pct_from_52w_low: 29.0
    },
    {
      date: '2024-01-15',
      symbol: 'SBIN',
      close: 585.80,
      volume: 28000000,
      ma50: 580.15,
      ma200: 570.85,
      rsi14: 48.5,
      macd_line: 0.35,
      macd_signal: 0.25,
      macd_hist: 0.10,
      '52w_high': 650.25,
      '52w_low': 480.80,
      pct_from_52w_high: -11.3,
      pct_from_52w_low: 30.5
    },
    {
      date: '2024-01-15',
      symbol: 'SUNPHARMA',
      close: 1085.75,
      volume: 8000000,
      ma50: 1080.20,
      ma200: 1060.80,
      rsi14: 58.2,
      macd_line: 1.45,
      macd_signal: 1.20,
      macd_hist: 0.25,
      '52w_high': 1180.80,
      '52w_low': 950.25,
      pct_from_52w_high: -9.7,
      pct_from_52w_low: 9.3
    },
    {
      date: '2024-01-15',
      symbol: 'DRREDDY',
      close: 5850.90,
      volume: 25000000,
      ma50: 5890.45,
      ma200: 5920.80,
      rsi14: 42.5,
      macd_line: -0.25,
      macd_signal: -0.15,
      macd_hist: -0.10,
      '52w_high': 6250.20,
      '52w_low': 5200.15,
      pct_from_52w_high: -17.9,
      pct_from_52w_low: 14.9
    },
    {
      date: '2024-01-15',
      symbol: 'CIPLA',
      close: 1250.20,
      volume: 3500000,
      ma50: 1240.50,
      ma200: 1220.25,
      rsi14: 62.8,
      macd_line: 2.85,
      macd_signal: 2.45,
      macd_hist: 0.40,
      '52w_high': 1350.80,
      '52w_low': 1100.15,
      pct_from_52w_high: -7.7,
      pct_from_52w_low: 15.5
    },
    {
      date: '2024-01-15',
      symbol: 'RELIANCE',
      close: 2580.45,
      volume: 15000000,
      ma50: 2550.80,
      ma200: 2520.25,
      rsi14: 68.5,
      macd_line: 1.85,
      macd_signal: 1.45,
      macd_hist: 0.40,
      '52w_high': 2750.80,
      '52w_low': 2200.20,
      pct_from_52w_high: -13.8,
      pct_from_52w_low: 27.3
    },
    {
      date: '2024-01-15',
      symbol: 'ONGC',
      close: 185.80,
      volume: 12000000,
      ma50: 180.25,
      ma200: 175.80,
      rsi14: 65.2,
      macd_line: 2.15,
      macd_signal: 1.80,
      macd_hist: 0.35,
      '52w_high': 220.25,
      '52w_low': 150.50,
      pct_from_52w_high: -12.8,
      pct_from_52w_low: 21.8
    },
    {
      date: '2024-01-15',
      symbol: 'ITC',
      close: 485.20,
      volume: 10000000,
      ma50: 480.80,
      ma200: 475.25,
      rsi14: 52.5,
      macd_line: 0.45,
      macd_signal: 0.35,
      macd_hist: 0.10,
      '52w_high': 520.80,
      '52w_low': 450.15,
      pct_from_52w_high: -11.6,
      pct_from_52w_low: 11.6
    },
    {
      date: '2024-01-15',
      symbol: 'NESTLEIND',
      close: 18550.80,
      volume: 8000000,
      ma50: 18450.25,
      ma200: 18200.80,
      rsi14: 55.8,
      macd_line: 1.25,
      macd_signal: 1.05,
      macd_hist: 0.20,
      '52w_high': 19500.50,
      '52w_low': 16500.25,
      pct_from_52w_high: -10.6,
      pct_from_52w_low: 14.2
    },
    {
      date: '2024-01-15',
      symbol: 'HINDUNILVR',
      close: 2580.20,
      volume: 12000000,
      ma50: 2570.80,
      ma200: 2550.45,
      rsi14: 48.5,
      macd_line: 0.85,
      macd_signal: 0.95,
      macd_hist: -0.10,
      '52w_high': 2750.80,
      '52w_low': 2350.25,
      pct_from_52w_high: -11.1,
      pct_from_52w_low: 13.7
    },
    {
      date: '2024-01-15',
      symbol: 'LT',
      close: 3250.80,
      volume: 18000000,
      ma50: 3280.50,
      ma200: 3300.80,
      rsi14: 38.2,
      macd_line: -1.25,
      macd_signal: -0.85,
      macd_hist: -0.40,
      '52w_high': 3650.50,
      '52w_low': 2850.25,
      pct_from_52w_high: -13.9,
      pct_from_52w_low: 32.7
    },
    {
      date: '2024-01-15',
      symbol: 'BHARTIARTL',
      close: 985.50,
      volume: 6000000,
      ma50: 980.25,
      ma200: 970.80,
      rsi14: 58.5,
      macd_line: 2.45,
      macd_signal: 2.15,
      macd_hist: 0.30,
      '52w_high': 1100.25,
      '52w_low': 850.80,
      pct_from_52w_high: -15.5,
      pct_from_52w_low: 32.4
    },
    
    // Filter-Friendly Technical Data - These will always match certain technical filter criteria
    {
      date: '2024-01-15',
      symbol: 'ZOMATO',
      close: 2500.00,
      volume: 5000000,
      ma50: 2400.00, // Price above MA50
      ma200: 2200.00, // Price above MA200
      rsi14: 25.0, // RSI oversold
      macd_line: 15.0,
      macd_signal: 10.0, // MACD bullish crossover
      macd_hist: 5.0,
      '52w_high': 2800.00,
      '52w_low': 2000.00,
      pct_from_52w_high: -10.7, // Near 52W high
      pct_from_52w_low: 25.0
    },
    {
      date: '2024-01-15',
      symbol: 'PAYTM',
      close: 1800.00,
      volume: 3000000,
      ma50: 1750.00, // Price above MA50
      ma200: 1600.00, // Price above MA200
      rsi14: 75.0, // RSI overbought
      macd_line: 8.0,
      macd_signal: 12.0, // MACD bearish crossover
      macd_hist: -4.0,
      '52w_high': 1900.00,
      '52w_low': 1500.00,
      pct_from_52w_high: -5.3, // Near 52W high
      pct_from_52w_low: 20.0
    },
    {
      date: '2024-01-15',
      symbol: 'ADANIPORTS',
      close: 4500.00,
      volume: 8000000,
      ma50: 4200.00, // Price above MA50
      ma200: 4000.00, // Price above MA200
      rsi14: 45.0, // Neutral RSI
      macd_line: 20.0,
      macd_signal: 15.0, // MACD bullish crossover
      macd_hist: 5.0,
      '52w_high': 4800.00,
      '52w_low': 3800.00,
      pct_from_52w_high: -6.3, // Near 52W high
      pct_from_52w_low: 18.4
    },
    {
      date: '2024-01-15',
      symbol: 'BIOCON',
      close: 3200.00,
      volume: 2000000,
      ma50: 3000.00, // Price above MA50
      ma200: 2800.00, // Price above MA200
      rsi14: 30.0, // RSI oversold
      macd_line: 25.0,
      macd_signal: 20.0, // MACD bullish crossover
      macd_hist: 5.0,
      '52w_high': 3500.00,
      '52w_low': 2500.00,
      pct_from_52w_high: -8.6, // Near 52W high
      pct_from_52w_low: 28.0
    },
    {
      date: '2024-01-15',
      symbol: 'POWERGRID',
      close: 1200.00,
      volume: 1500000,
      ma50: 1100.00, // Price above MA50
      ma200: 1000.00, // Price above MA200
      rsi14: 80.0, // RSI overbought
      macd_line: 5.0,
      macd_signal: 8.0, // MACD bearish crossover
      macd_hist: -3.0,
      '52w_high': 1300.00,
      '52w_low': 900.00,
      pct_from_52w_high: -7.7, // Near 52W high
      pct_from_52w_low: 33.3
    }
  ];
}

// Fetch crypto fundamental data
export async function fetchCryptoFundamentalData(): Promise<CryptoFundamentalData[]> {
  return [
    // Major Cryptocurrencies
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 42000.00,
      market_cap: 85000, // 85,000 crores
      volume_24h: 25000000000,
      circulating_supply: 19500000,
      total_supply: 19500000,
      max_supply: 21000000,
      tokenomics_health: 95,
      active_addresses: 850000,
      gas_fees: 15.50,
      tvl: 12000000000,
      staking_ratio: 0,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2800.00,
      market_cap: 38000, // 38,000 crores
      volume_24h: 15000000000,
      circulating_supply: 120000000,
      total_supply: 120000000,
      tokenomics_health: 88,
      active_addresses: 1200000,
      gas_fees: 25.30,
      tvl: 45000000000,
      staking_ratio: 0.15,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      price: 280.50,
      market_cap: 4800, // 4,800 crores
      volume_24h: 1200000000,
      circulating_supply: 150000000,
      total_supply: 200000000,
      tokenomics_health: 85,
      active_addresses: 280000,
      gas_fees: 0.50,
      tvl: 5000000000,
      staking_ratio: 0.25,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'XRP',
      name: 'XRP',
      price: 0.58,
      market_cap: 3500, // 3,500 crores
      volume_24h: 2000000000,
      circulating_supply: 54000000000,
      total_supply: 100000000000,
      tokenomics_health: 75,
      active_addresses: 320000,
      gas_fees: 0.001,
      tvl: 800000000,
      staking_ratio: 0,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 85.50,
      market_cap: 4000, // 4,000 crores
      volume_24h: 2000000000,
      circulating_supply: 420000000,
      total_supply: 500000000,
      tokenomics_health: 82,
      active_addresses: 180000,
      gas_fees: 0.001,
      tvl: 8000000000,
      staking_ratio: 0.65,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.45,
      market_cap: 1500, // 1,500 crores
      volume_24h: 800000000,
      circulating_supply: 35000000000,
      total_supply: 45000000000,
      tokenomics_health: 78,
      active_addresses: 450000,
      gas_fees: 0.15,
      tvl: 2000000000,
      staking_ratio: 0.70,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'DOT',
      name: 'Polkadot',
      price: 6.80,
      market_cap: 800, // 800 crores
      volume_24h: 500000000,
      circulating_supply: 1200000000,
      total_supply: 1200000000,
      tokenomics_health: 85,
      active_addresses: 95000,
      gas_fees: 0.05,
      tvl: 1500000000,
      staking_ratio: 0.55,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.85,
      market_cap: 800, // 800 crores
      volume_24h: 600000000,
      circulating_supply: 9500000000,
      total_supply: 10000000000,
      tokenomics_health: 80,
      active_addresses: 150000,
      gas_fees: 0.01,
      tvl: 1200000000,
      staking_ratio: 0.40,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'AVAX',
      name: 'Avalanche',
      price: 28.50,
      market_cap: 700, // 700 crores
      volume_24h: 400000000,
      circulating_supply: 250000000,
      total_supply: 720000000,
      tokenomics_health: 83,
      active_addresses: 120000,
      gas_fees: 0.25,
      tvl: 2500000000,
      staking_ratio: 0.60,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'LINK',
      name: 'Chainlink',
      price: 14.20,
      market_cap: 800, // 800 crores
      volume_24h: 300000000,
      circulating_supply: 560000000,
      total_supply: 1000000000,
      tokenomics_health: 88,
      active_addresses: 85000,
      gas_fees: 0.10,
      tvl: 500000000,
      staking_ratio: 0.30,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      price: 6.80,
      market_cap: 400, // 400 crores
      volume_24h: 200000000,
      circulating_supply: 600000000,
      total_supply: 1000000000,
      tokenomics_health: 85,
      active_addresses: 45000,
      gas_fees: 0.05,
      tvl: 800000000,
      staking_ratio: 0.20,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ATOM',
      name: 'Cosmos',
      price: 8.50,
      market_cap: 300, // 300 crores
      volume_24h: 150000000,
      circulating_supply: 350000000,
      total_supply: 400000000,
      tokenomics_health: 82,
      active_addresses: 65000,
      gas_fees: 0.01,
      tvl: 300000000,
      staking_ratio: 0.75,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'FTM',
      name: 'Fantom',
      price: 0.35,
      market_cap: 100, // 100 crores
      volume_24h: 80000000,
      circulating_supply: 2800000000,
      total_supply: 3175000000,
      tokenomics_health: 75,
      active_addresses: 35000,
      gas_fees: 0.001,
      tvl: 200000000,
      staking_ratio: 0.45,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'NEAR',
      name: 'NEAR Protocol',
      price: 2.80,
      market_cap: 250, // 250 crores
      volume_24h: 120000000,
      circulating_supply: 900000000,
      total_supply: 1000000000,
      tokenomics_health: 80,
      active_addresses: 55000,
      gas_fees: 0.001,
      tvl: 400000000,
      staking_ratio: 0.50,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ALGO',
      name: 'Algorand',
      price: 0.15,
      market_cap: 120, // 120 crores
      volume_24h: 60000000,
      circulating_supply: 8000000000,
      total_supply: 10000000000,
      tokenomics_health: 78,
      active_addresses: 40000,
      gas_fees: 0.001,
      tvl: 150000000,
      staking_ratio: 0.35,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'VET',
      name: 'VeChain',
      price: 0.025,
      market_cap: 180, // 180 crores
      volume_24h: 40000000,
      circulating_supply: 72000000000,
      total_supply: 86700000000,
      tokenomics_health: 72,
      active_addresses: 25000,
      gas_fees: 0.001,
      tvl: 80000000,
      staking_ratio: 0.25,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'ICP',
      name: 'Internet Computer',
      price: 12.50,
      market_cap: 550, // 550 crores
      volume_24h: 180000000,
      circulating_supply: 440000000,
      total_supply: 500000000,
      tokenomics_health: 70,
      active_addresses: 30000,
      gas_fees: 0.001,
      tvl: 300000000,
      staking_ratio: 0.40,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'FIL',
      name: 'Filecoin',
      price: 4.20,
      market_cap: 200, // 200 crores
      volume_24h: 100000000,
      circulating_supply: 480000000,
      total_supply: 2000000000,
      tokenomics_health: 68,
      active_addresses: 20000,
      gas_fees: 0.01,
      tvl: 100000000,
      staking_ratio: 0.15,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'THETA',
      name: 'Theta Network',
      price: 1.20,
      market_cap: 120, // 120 crores
      volume_24h: 50000000,
      circulating_supply: 1000000000,
      total_supply: 1000000000,
      tokenomics_health: 75,
      active_addresses: 15000,
      gas_fees: 0.001,
      tvl: 50000000,
      staking_ratio: 0.30,
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      symbol: 'HBAR',
      name: 'Hedera',
      price: 0.08,
      market_cap: 250, // 250 crores
      volume_24h: 80000000,
      circulating_supply: 32000000000,
      total_supply: 50000000000,
      tokenomics_health: 77,
      active_addresses: 18000,
      gas_fees: 0.001,
      tvl: 120000000,
      staking_ratio: 0.20,
      updated_at: '2024-01-15T10:00:00Z'
    }
  ];
}

// Fetch news data
export async function fetchNewsData(): Promise<NewsData[]> {
  return [
    // Crypto News
    {
      id: 'news-1',
      title: 'Bitcoin Surges Past $45,000 as Institutional Adoption Grows',
      summary: 'Major corporations announce Bitcoin treasury allocations, driving price momentum.',
      url: 'https://example.com/bitcoin-surge',
      source: 'CoinDesk',
      sentiment: 'positive',
      confidence: 85,
      published_at: '2024-01-15T08:30:00Z',
      related_assets: ['BTC']
    },
    {
      id: 'news-2',
      title: 'Ethereum Network Upgrade Boosts Transaction Efficiency',
      summary: 'Latest protocol update reduces gas fees and improves scalability.',
      url: 'https://example.com/ethereum-upgrade',
      source: 'Ethereum Foundation',
      sentiment: 'positive',
      confidence: 92,
      published_at: '2024-01-15T09:15:00Z',
      related_assets: ['ETH']
    },
    {
      id: 'news-3',
      title: 'Solana Ecosystem Sees Record TVL Growth',
      summary: 'DeFi protocols on Solana reach new all-time high in total value locked.',
      url: 'https://example.com/solana-tvl',
      source: 'DeFi Pulse',
      sentiment: 'positive',
      confidence: 88,
      published_at: '2024-01-15T10:20:00Z',
      related_assets: ['SOL']
    },
    {
      id: 'news-4',
      title: 'Cardano Smart Contract Activity Hits New Milestone',
      summary: 'Plutus-based applications show increased adoption and usage.',
      url: 'https://example.com/cardano-milestone',
      source: 'Cardano Foundation',
      sentiment: 'positive',
      confidence: 82,
      published_at: '2024-01-15T11:00:00Z',
      related_assets: ['ADA']
    },
    {
      id: 'news-5',
      title: 'Market Volatility Concerns Rise Amid Regulatory Uncertainty',
      summary: 'Regulatory announcements create mixed sentiment in crypto markets.',
      url: 'https://example.com/regulatory-uncertainty',
      source: 'Reuters',
      sentiment: 'negative',
      confidence: 78,
      published_at: '2024-01-15T07:45:00Z',
      related_assets: ['BTC', 'ETH', 'SOL']
    },
    {
      id: 'news-6',
      title: 'Binance Faces Regulatory Scrutiny in Multiple Jurisdictions',
      summary: 'Exchange operations under review as compliance requirements tighten.',
      url: 'https://example.com/binance-scrutiny',
      source: 'Financial Times',
      sentiment: 'negative',
      confidence: 75,
      published_at: '2024-01-15T06:30:00Z',
      related_assets: ['BNB']
    },
    {
      id: 'news-7',
      title: 'Polygon Network Achieves Carbon Neutrality',
      summary: 'Blockchain sustainability initiative reaches environmental milestone.',
      url: 'https://example.com/polygon-carbon-neutral',
      source: 'Polygon Blog',
      sentiment: 'positive',
      confidence: 90,
      published_at: '2024-01-15T12:15:00Z',
      related_assets: ['MATIC']
    },
    {
      id: 'news-8',
      title: 'Avalanche DeFi Protocol Suffers Smart Contract Exploit',
      summary: 'Security incident results in significant fund loss for users.',
      url: 'https://example.com/avalanche-exploit',
      source: 'The Block',
      sentiment: 'negative',
      confidence: 88,
      published_at: '2024-01-15T13:45:00Z',
      related_assets: ['AVAX']
    },
    {
      id: 'news-9',
      title: 'Chainlink Oracle Network Expands to New Blockchains',
      summary: 'Price feed integration brings reliable data to additional ecosystems.',
      url: 'https://example.com/chainlink-expansion',
      source: 'Chainlink Blog',
      sentiment: 'positive',
      confidence: 85,
      published_at: '2024-01-15T14:30:00Z',
      related_assets: ['LINK']
    },
    {
      id: 'news-10',
      title: 'Uniswap V4 Launch Delayed Due to Technical Issues',
      summary: 'Development team announces postponement of major protocol upgrade.',
      url: 'https://example.com/uniswap-v4-delay',
      source: 'Uniswap Labs',
      sentiment: 'negative',
      confidence: 82,
      published_at: '2024-01-15T15:20:00Z',
      related_assets: ['UNI']
    },
    // Indian Equity News
    {
      id: 'news-11',
      title: 'TCS Reports Strong Q3 Results with Bullish Outlook',
      summary: 'Revenue growth exceeds expectations as digital transformation demand surges.',
      url: 'https://example.com/tcs-earnings',
      source: 'Economic Times',
      sentiment: 'positive',
      confidence: 92,
      published_at: '2024-01-15T16:00:00Z',
      related_assets: ['TCS']
    },
    {
      id: 'news-12',
      title: 'Infosys Cloud Services See Record Adoption',
      summary: 'Enterprise clients increasingly adopt Infosys cloud solutions.',
      url: 'https://example.com/infosys-cloud',
      source: 'Business Standard',
      sentiment: 'positive',
      confidence: 88,
      published_at: '2024-01-15T16:30:00Z',
      related_assets: ['INFY']
    },
    {
      id: 'news-13',
      title: 'Maruti Suzuki Vehicle Sales Decline Amid Market Challenges',
      summary: 'Production constraints and supply chain issues impact monthly sales.',
      url: 'https://example.com/maruti-sales',
      source: 'Auto News India',
      sentiment: 'negative',
      confidence: 85,
      published_at: '2024-01-15T17:00:00Z',
      related_assets: ['MARUTI']
    },
    {
      id: 'news-14',
      title: 'HDFC Bank Digital Banking Revenues Surge',
      summary: 'Digital transformation drives record revenue growth in Q3.',
      url: 'https://example.com/hdfc-digital',
      source: 'Financial Express',
      sentiment: 'positive',
      confidence: 90,
      published_at: '2024-01-15T17:30:00Z',
      related_assets: ['HDFCBANK']
    },
    {
      id: 'news-15',
      title: 'Reliance Jio Expansion Plans Face Regulatory Hurdles',
      summary: '5G rollout delays impact telecom sector growth prospects.',
      url: 'https://example.com/reliance-jio',
      source: 'Telecom Today',
      sentiment: 'negative',
      confidence: 82,
      published_at: '2024-01-15T18:00:00Z',
      related_assets: ['RELIANCE']
    },
    {
      id: 'news-16',
      title: 'ITC FMCG Division Shows Mixed Performance',
      summary: 'Some segments grow while others face market headwinds.',
      url: 'https://example.com/itc-fmcg',
      source: 'Business Line',
      sentiment: 'neutral',
      confidence: 75,
      published_at: '2024-01-15T18:30:00Z',
      related_assets: ['ITC']
    },
    {
      id: 'news-17',
      title: 'Banking Sector Faces RBI Policy Rate Pressure',
      summary: 'RBI policy changes impact traditional banking margins.',
      url: 'https://example.com/banking-rbi-rates',
      source: 'Mint',
      sentiment: 'negative',
      confidence: 80,
      published_at: '2024-01-15T19:00:00Z',
      related_assets: ['HDFCBANK', 'ICICIBANK', 'SBIN']
    },
    {
      id: 'news-18',
      title: 'Pharmaceutical Sector Shows Strong Export Growth',
      summary: 'Generic drug exports to US and Europe reach new highs.',
      url: 'https://example.com/pharma-exports',
      source: 'Pharma Times',
      sentiment: 'positive',
      confidence: 85,
      published_at: '2024-01-15T19:30:00Z',
      related_assets: ['SUNPHARMA', 'DRREDDY', 'CIPLA']
    },
    {
      id: 'news-19',
      title: 'Oil & Gas Sector Benefits from Global Price Recovery',
      summary: 'Crude oil prices stabilize as global demand outlook improves.',
      url: 'https://example.com/oil-gas-recovery',
      source: 'Energy India',
      sentiment: 'positive',
      confidence: 83,
      published_at: '2024-01-15T20:00:00Z',
      related_assets: ['RELIANCE', 'ONGC']
    },
    {
      id: 'news-20',
      title: 'Consumer Goods Companies Navigate Supply Chain Challenges',
      summary: 'Companies adapt to changing consumer preferences and logistics.',
      url: 'https://example.com/consumer-goods-supply',
      source: 'Consumer News India',
      sentiment: 'neutral',
      confidence: 78,
      published_at: '2024-01-15T20:30:00Z',
      related_assets: ['ITC', 'NESTLEIND', 'HINDUNILVR']
    },
    {
      id: 'news-21',
      title: 'Infrastructure Sector Faces Continued Funding Challenges',
      summary: 'L&T and other infrastructure companies navigate funding headwinds.',
      url: 'https://example.com/infrastructure-funding',
      source: 'Infrastructure Today',
      sentiment: 'negative',
      confidence: 85,
      published_at: '2024-01-15T21:00:00Z',
      related_assets: ['LT']
    },
    {
      id: 'news-22',
      title: 'Telecom Sector Shows Mixed 5G Rollout Progress',
      summary: 'Some operators advance while others face spectrum allocation delays.',
      url: 'https://example.com/telecom-5g',
      source: 'Telecom India',
      sentiment: 'neutral',
      confidence: 80,
      published_at: '2024-01-15T21:30:00Z',
      related_assets: ['BHARTIARTL']
    },
    {
      id: 'news-23',
      title: 'HCL Technologies Wins Major US Client Contract',
      summary: 'Multi-year deal worth $500M boosts revenue visibility.',
      url: 'https://example.com/hcl-contract',
      source: 'IT News India',
      sentiment: 'positive',
      confidence: 88,
      published_at: '2024-01-15T22:00:00Z',
      related_assets: ['HCLTECH']
    },
    {
      id: 'news-24',
      title: 'Wipro Faces Margin Pressure in European Markets',
      summary: 'Currency fluctuations and competition impact European operations.',
      url: 'https://example.com/wipro-europe',
      source: 'Business Today',
      sentiment: 'negative',
      confidence: 82,
      published_at: '2024-01-15T22:30:00Z',
      related_assets: ['WIPRO']
    },
    {
      id: 'news-25',
      title: 'Tech Mahindra AI Services Division Shows Promise',
      summary: 'Early stage AI consulting revenues show strong growth potential.',
      url: 'https://example.com/techm-ai',
      source: 'AI Business India',
      sentiment: 'positive',
      confidence: 85,
      published_at: '2024-01-15T23:00:00Z',
      related_assets: ['TECHM']
    }
  ];
}

// Fetch whale transactions
export async function fetchWhaleTransactions(): Promise<WhaleTransaction[]> {
  return [
    {
      id: 'whale-1',
      asset_symbol: 'BTC',
      transaction_type: 'buy',
      amount: 500,
      value_usd: 22500000,
      from_address: '0x1234...5678',
      to_address: '0x8765...4321',
      timestamp: '2024-01-15T10:30:00Z',
      credibility_score: 95
    },
    {
      id: 'whale-2',
      asset_symbol: 'ETH',
      transaction_type: 'sell',
      amount: 10000,
      value_usd: 32000000,
      from_address: '0xabcd...efgh',
      to_address: '0xhgfe...dcba',
      timestamp: '2024-01-15T09:45:00Z',
      credibility_score: 88
    },
    {
      id: 'whale-3',
      asset_symbol: 'BTC',
      transaction_type: 'transfer',
      amount: 200,
      value_usd: 9000000,
      from_address: '0x1111...2222',
      to_address: '0x3333...4444',
      timestamp: '2024-01-15T11:15:00Z',
      credibility_score: 92
    },
    {
      id: 'whale-4',
      asset_symbol: 'ETH',
      transaction_type: 'buy',
      amount: 5000,
      value_usd: 16000000,
      from_address: '0x5555...6666',
      to_address: '0x7777...8888',
      timestamp: '2024-01-15T12:00:00Z',
      credibility_score: 85
    },
    {
      id: 'whale-5',
      asset_symbol: 'SOL',
      transaction_type: 'sell',
      amount: 100000,
      value_usd: 9550000,
      from_address: '0x9999...aaaa',
      to_address: '0xbbbb...cccc',
      timestamp: '2024-01-15T12:30:00Z',
      credibility_score: 78
    },
    {
      id: 'whale-6',
      asset_symbol: 'ADA',
      transaction_type: 'buy',
      amount: 50000000,
      value_usd: 22500000,
      from_address: '0xdddd...eeee',
      to_address: '0xffff...0000',
      timestamp: '2024-01-15T13:00:00Z',
      credibility_score: 82
    },
    {
      id: 'whale-7',
      asset_symbol: 'BNB',
      transaction_type: 'transfer',
      amount: 10000,
      value_usd: 3205000,
      from_address: '0x1111...3333',
      to_address: '0x4444...5555',
      timestamp: '2024-01-15T13:30:00Z',
      credibility_score: 90
    },
    {
      id: 'whale-8',
      asset_symbol: 'XRP',
      transaction_type: 'sell',
      amount: 10000000,
      value_usd: 6500000,
      from_address: '0x6666...7777',
      to_address: '0x8888...9999',
      timestamp: '2024-01-15T14:00:00Z',
      credibility_score: 75
    },
    {
      id: 'whale-9',
      asset_symbol: 'DOT',
      transaction_type: 'buy',
      amount: 500000,
      value_usd: 3400000,
      from_address: '0xaaaa...bbbb',
      to_address: '0xcccc...dddd',
      timestamp: '2024-01-15T14:30:00Z',
      credibility_score: 88
    },
    {
      id: 'whale-10',
      asset_symbol: 'MATIC',
      transaction_type: 'sell',
      amount: 20000000,
      value_usd: 17000000,
      from_address: '0xeeee...ffff',
      to_address: '0x0000...1111',
      timestamp: '2024-01-15T15:00:00Z',
      credibility_score: 80
    },
    {
      id: 'whale-11',
      asset_symbol: 'AVAX',
      transaction_type: 'buy',
      amount: 100000,
      value_usd: 2850000,
      from_address: '0x2222...3333',
      to_address: '0x4444...5555',
      timestamp: '2024-01-15T15:30:00Z',
      credibility_score: 85
    },
    {
      id: 'whale-12',
      asset_symbol: 'LINK',
      transaction_type: 'transfer',
      amount: 500000,
      value_usd: 7100000,
      from_address: '0x6666...8888',
      to_address: '0x9999...aaaa',
      timestamp: '2024-01-15T16:00:00Z',
      credibility_score: 87
    },
    {
      id: 'whale-13',
      asset_symbol: 'UNI',
      transaction_type: 'sell',
      amount: 1000000,
      value_usd: 6800000,
      from_address: '0xbbbb...cccc',
      to_address: '0xdddd...eeee',
      timestamp: '2024-01-15T16:30:00Z',
      credibility_score: 83
    },
    {
      id: 'whale-14',
      asset_symbol: 'ATOM',
      transaction_type: 'buy',
      amount: 200000,
      value_usd: 1700000,
      from_address: '0xffff...0000',
      to_address: '0x1111...2222',
      timestamp: '2024-01-15T17:00:00Z',
      credibility_score: 79
    },
    {
      id: 'whale-15',
      asset_symbol: 'FTM',
      transaction_type: 'sell',
      amount: 10000000,
      value_usd: 3500000,
      from_address: '0x3333...4444',
      to_address: '0x5555...6666',
      timestamp: '2024-01-15T17:30:00Z',
      credibility_score: 76
    },
    {
      id: 'whale-16',
      asset_symbol: 'NEAR',
      transaction_type: 'buy',
      amount: 500000,
      value_usd: 1400000,
      from_address: '0x7777...8888',
      to_address: '0x9999...aaaa',
      timestamp: '2024-01-15T18:00:00Z',
      credibility_score: 81
    },
    {
      id: 'whale-17',
      asset_symbol: 'ALGO',
      transaction_type: 'transfer',
      amount: 10000000,
      value_usd: 1500000,
      from_address: '0xbbbb...dddd',
      to_address: '0xeeee...ffff',
      timestamp: '2024-01-15T18:30:00Z',
      credibility_score: 84
    },
    {
      id: 'whale-18',
      asset_symbol: 'VET',
      transaction_type: 'sell',
      amount: 100000000,
      value_usd: 2500000,
      from_address: '0x0000...1111',
      to_address: '0x2222...3333',
      timestamp: '2024-01-15T19:00:00Z',
      credibility_score: 77
    },
    {
      id: 'whale-19',
      asset_symbol: 'ICP',
      transaction_type: 'buy',
      amount: 100000,
      value_usd: 1250000,
      from_address: '0x4444...5555',
      to_address: '0x6666...7777',
      timestamp: '2024-01-15T19:30:00Z',
      credibility_score: 86
    },
    {
      id: 'whale-20',
      asset_symbol: 'FIL',
      transaction_type: 'sell',
      amount: 200000,
      value_usd: 840000,
      from_address: '0x8888...9999',
      to_address: '0xaaaa...bbbb',
      timestamp: '2024-01-15T20:00:00Z',
      credibility_score: 80
    }
  ];
}

// Fetch credibility scores
export async function fetchCredibilityScores(): Promise<CredibilityScore[]> {
  return [
    // Crypto Assets
    {
      asset_symbol: 'BTC',
      overall_score: 95,
      data_source_quality: 98,
      news_validation: 92,
      institutional_backing: 96,
      social_sentiment: 94,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ETH',
      overall_score: 88,
      data_source_quality: 90,
      news_validation: 85,
      institutional_backing: 82,
      social_sentiment: 89,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'BNB',
      overall_score: 82,
      data_source_quality: 85,
      news_validation: 78,
      institutional_backing: 88,
      social_sentiment: 80,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'XRP',
      overall_score: 75,
      data_source_quality: 80,
      news_validation: 70,
      institutional_backing: 85,
      social_sentiment: 72,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'SOL',
      overall_score: 85,
      data_source_quality: 88,
      news_validation: 82,
      institutional_backing: 75,
      social_sentiment: 87,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ADA',
      overall_score: 78,
      data_source_quality: 82,
      news_validation: 75,
      institutional_backing: 70,
      social_sentiment: 80,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'DOT',
      overall_score: 80,
      data_source_quality: 85,
      news_validation: 78,
      institutional_backing: 75,
      social_sentiment: 82,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'MATIC',
      overall_score: 83,
      data_source_quality: 85,
      news_validation: 80,
      institutional_backing: 78,
      social_sentiment: 85,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'AVAX',
      overall_score: 79,
      data_source_quality: 82,
      news_validation: 75,
      institutional_backing: 72,
      social_sentiment: 80,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'LINK',
      overall_score: 87,
      data_source_quality: 90,
      news_validation: 85,
      institutional_backing: 80,
      social_sentiment: 88,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'UNI',
      overall_score: 84,
      data_source_quality: 88,
      news_validation: 82,
      institutional_backing: 75,
      social_sentiment: 86,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ATOM',
      overall_score: 76,
      data_source_quality: 80,
      news_validation: 72,
      institutional_backing: 70,
      social_sentiment: 78,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'FTM',
      overall_score: 72,
      data_source_quality: 75,
      news_validation: 68,
      institutional_backing: 65,
      social_sentiment: 75,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'NEAR',
      overall_score: 78,
      data_source_quality: 82,
      news_validation: 75,
      institutional_backing: 70,
      social_sentiment: 80,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ALGO',
      overall_score: 74,
      data_source_quality: 78,
      news_validation: 70,
      institutional_backing: 68,
      social_sentiment: 76,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'VET',
      overall_score: 71,
      data_source_quality: 75,
      news_validation: 68,
      institutional_backing: 65,
      social_sentiment: 73,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ICP',
      overall_score: 69,
      data_source_quality: 72,
      news_validation: 65,
      institutional_backing: 62,
      social_sentiment: 70,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'FIL',
      overall_score: 73,
      data_source_quality: 76,
      news_validation: 70,
      institutional_backing: 68,
      social_sentiment: 75,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'THETA',
      overall_score: 70,
      data_source_quality: 73,
      news_validation: 67,
      institutional_backing: 65,
      social_sentiment: 72,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'HBAR',
      overall_score: 75,
      data_source_quality: 78,
      news_validation: 72,
      institutional_backing: 70,
      social_sentiment: 77,
      last_updated: '2024-01-15T10:00:00Z'
    },
    // Indian Equity Assets
    {
      asset_symbol: 'TCS',
      overall_score: 96,
      data_source_quality: 98,
      news_validation: 94,
      institutional_backing: 97,
      social_sentiment: 95,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'INFY',
      overall_score: 94,
      data_source_quality: 96,
      news_validation: 92,
      institutional_backing: 95,
      social_sentiment: 93,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'HCLTECH',
      overall_score: 92,
      data_source_quality: 94,
      news_validation: 90,
      institutional_backing: 93,
      social_sentiment: 91,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'WIPRO',
      overall_score: 89,
      data_source_quality: 92,
      news_validation: 87,
      institutional_backing: 90,
      social_sentiment: 88,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'TECHM',
      overall_score: 85,
      data_source_quality: 88,
      news_validation: 82,
      institutional_backing: 86,
      social_sentiment: 84,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'LTIM',
      overall_score: 91,
      data_source_quality: 93,
      news_validation: 89,
      institutional_backing: 92,
      social_sentiment: 90,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'MARUTI',
      overall_score: 87,
      data_source_quality: 90,
      news_validation: 84,
      institutional_backing: 88,
      social_sentiment: 86,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'TATAMOTORS',
      overall_score: 78,
      data_source_quality: 82,
      news_validation: 75,
      institutional_backing: 80,
      social_sentiment: 77,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'M&M',
      overall_score: 80,
      data_source_quality: 83,
      news_validation: 77,
      institutional_backing: 82,
      social_sentiment: 79,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'HDFCBANK',
      overall_score: 93,
      data_source_quality: 95,
      news_validation: 91,
      institutional_backing: 94,
      social_sentiment: 92,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ICICIBANK',
      overall_score: 90,
      data_source_quality: 92,
      news_validation: 88,
      institutional_backing: 91,
      social_sentiment: 89,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'SBIN',
      overall_score: 88,
      data_source_quality: 90,
      news_validation: 85,
      institutional_backing: 89,
      social_sentiment: 87,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'SUNPHARMA',
      overall_score: 95,
      data_source_quality: 97,
      news_validation: 93,
      institutional_backing: 96,
      social_sentiment: 94,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'DRREDDY',
      overall_score: 89,
      data_source_quality: 91,
      news_validation: 87,
      institutional_backing: 90,
      social_sentiment: 88,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'CIPLA',
      overall_score: 92,
      data_source_quality: 94,
      news_validation: 90,
      institutional_backing: 93,
      social_sentiment: 91,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'RELIANCE',
      overall_score: 86,
      data_source_quality: 88,
      news_validation: 84,
      institutional_backing: 87,
      social_sentiment: 85,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ONGC',
      overall_score: 88,
      data_source_quality: 90,
      news_validation: 86,
      institutional_backing: 89,
      social_sentiment: 87,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'ITC',
      overall_score: 94,
      data_source_quality: 96,
      news_validation: 92,
      institutional_backing: 95,
      social_sentiment: 93,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'NESTLEIND',
      overall_score: 92,
      data_source_quality: 94,
      news_validation: 90,
      institutional_backing: 93,
      social_sentiment: 91,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'HINDUNILVR',
      overall_score: 96,
      data_source_quality: 98,
      news_validation: 94,
      institutional_backing: 97,
      social_sentiment: 95,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'LT',
      overall_score: 82,
      data_source_quality: 85,
      news_validation: 78,
      institutional_backing: 84,
      social_sentiment: 81,
      last_updated: '2024-01-15T10:00:00Z'
    },
    {
      asset_symbol: 'BHARTIARTL',
      overall_score: 90,
      data_source_quality: 92,
      news_validation: 88,
      institutional_backing: 91,
      social_sentiment: 89,
      last_updated: '2024-01-15T10:00:00Z'
    }
  ];
}

export async function mergeAssetData(
  fundamentalData: FundamentalData[],
  technicalData: TechnicalData[]
): Promise<MergedAssetData[]> {
  const [newsData, credibilityScores] = await Promise.all([
    fetchNewsData(),
    fetchCredibilityScores()
  ]);

  const merged: MergedAssetData[] = [];
  
  // Create a map of technical data by symbol for quick lookup
  const technicalMap = new Map<string, TechnicalData>();
  technicalData.forEach(tech => {
    technicalMap.set(tech.symbol, tech);
  });

  // Merge fundamental and technical data
  fundamentalData.forEach(fund => {
    const tech = technicalMap.get(fund.symbol);
    if (tech) {
      // Calculate daily change percentage (mock calculation)
      const dailyChangePct = Math.random() * 20 - 10; // Random between -10% and +10%
      
      // Find related news for sentiment calculation
      const relatedNews = newsData.filter(news => 
        news.related_assets.includes(fund.symbol)
      );
      
      // Find credibility score
      const credibility = credibilityScores.find(score => 
        score.asset_symbol === fund.symbol
      );
      
      // Calculate news sentiment
      const positiveNews = relatedNews.filter(news => 
        news.sentiment === 'positive'
      ).length;
      const negativeNews = relatedNews.filter(news => 
        news.sentiment === 'negative'
      ).length;
      const newsSentiment = positiveNews > negativeNews ? 'positive' : 
                           negativeNews > positiveNews ? 'negative' : 'neutral';
      
      merged.push({
        ...fund,
        ...tech,
        daily_change: fund.price - tech.close,
        daily_change_pct: dailyChangePct,
        asset_type: 'equity' as const,
        // Enhanced fields
        credibility_score: credibility?.overall_score || 50,
        news_sentiment: newsSentiment,
        
        // Fundamental Parameters - Create diverse data that matches common filter criteria
        pb_ratio: (() => {
          const rand = Math.random();
          if (rand < 0.2) return Math.random() * 0.5 + 0.5; // 20% chance: 0.5-1.0 (low P/B)
          if (rand < 0.4) return Math.random() * 1 + 1; // 20% chance: 1.0-2.0 (moderate P/B)
          if (rand < 0.7) return Math.random() * 2 + 2; // 30% chance: 2.0-4.0 (normal P/B)
          return Math.random() * 3 + 4; // 30% chance: 4.0-7.0 (high P/B)
        })(),
        ev_ebitda: (() => {
          const rand = Math.random();
          if (rand < 0.3) return Math.random() * 5 + 5; // 30% chance: 5-10 (low EV/EBITDA)
          if (rand < 0.6) return Math.random() * 10 + 10; // 30% chance: 10-20 (moderate)
          return Math.random() * 15 + 20; // 40% chance: 20-35 (high)
        })(),
        current_ratio: (() => {
          const rand = Math.random();
          if (rand < 0.2) return Math.random() * 0.5 + 0.5; // 20% chance: 0.5-1.0 (low)
          if (rand < 0.5) return Math.random() * 1 + 1; // 30% chance: 1.0-2.0 (good)
          if (rand < 0.8) return Math.random() * 1.5 + 2; // 30% chance: 2.0-3.5 (strong)
          return Math.random() * 2 + 3.5; // 20% chance: 3.5-5.5 (very strong)
        })(),
        quick_ratio: (() => {
          const rand = Math.random();
          if (rand < 0.3) return Math.random() * 0.5 + 0.3; // 30% chance: 0.3-0.8 (low)
          if (rand < 0.7) return Math.random() * 0.7 + 0.8; // 40% chance: 0.8-1.5 (good)
          return Math.random() * 1.5 + 1.5; // 30% chance: 1.5-3.0 (strong)
        })(),
        revenue_growth_yoy: (() => {
          const rand = Math.random();
          if (rand < 0.2) return Math.random() * 20 - 20; // 20% chance: -20% to 0% (negative)
          if (rand < 0.4) return Math.random() * 10; // 20% chance: 0% to 10% (low growth)
          if (rand < 0.7) return Math.random() * 15 + 10; // 30% chance: 10% to 25% (moderate)
          return Math.random() * 30 + 25; // 30% chance: 25% to 55% (high growth)
        })(),
        revenue_growth_qoq: (() => {
          const rand = Math.random();
          if (rand < 0.3) return Math.random() * 10 - 5; // 30% chance: -5% to 5% (low)
          if (rand < 0.7) return Math.random() * 10 + 5; // 40% chance: 5% to 15% (moderate)
          return Math.random() * 15 + 15; // 30% chance: 15% to 30% (high)
        })(),
        profit_margin_net: (() => {
          const rand = Math.random();
          if (rand < 0.2) return Math.random() * 5; // 20% chance: 0-5% (low margin)
          if (rand < 0.5) return Math.random() * 10 + 5; // 30% chance: 5-15% (moderate)
          if (rand < 0.8) return Math.random() * 10 + 15; // 30% chance: 15-25% (good)
          return Math.random() * 15 + 25; // 20% chance: 25-40% (high margin)
        })(),
        profit_margin_operating: (() => {
          const rand = Math.random();
          if (rand < 0.1) return Math.random() * 10; // 10% chance: 0-10% (low)
          if (rand < 0.4) return Math.random() * 15 + 10; // 30% chance: 10-25% (moderate)
          if (rand < 0.8) return Math.random() * 15 + 25; // 40% chance: 25-40% (good)
          return Math.random() * 20 + 40; // 20% chance: 40-60% (high margin)
        })(),
        insider_buying: (() => {
          const rand = Math.random();
          if (rand < 0.3) return Math.random() * 30; // 30% chance: 0-30 (low activity)
          if (rand < 0.6) return Math.random() * 40 + 30; // 30% chance: 30-70 (moderate)
          return Math.random() * 30 + 70; // 40% chance: 70-100 (high activity)
        })(),
        promoter_holding_change: (() => {
          const rand = Math.random();
          if (rand < 0.3) return Math.random() * 5 - 5; // 30% chance: -5% to 0% (decreasing)
          if (rand < 0.6) return Math.random() * 2; // 30% chance: 0% to 2% (stable)
          return Math.random() * 8 + 2; // 40% chance: 2% to 10% (increasing)
        })(),
        institutional_holdings_fii: (() => {
          const rand = Math.random();
          if (rand < 0.2) return Math.random() * 10 + 5; // 20% chance: 5-15% (low FII)
          if (rand < 0.6) return Math.random() * 20 + 15; // 40% chance: 15-35% (moderate)
          return Math.random() * 25 + 35; // 40% chance: 35-60% (high FII)
        })(),
        institutional_holdings_dii: (() => {
          const rand = Math.random();
          if (rand < 0.3) return Math.random() * 10 + 5; // 30% chance: 5-15% (low DII)
          if (rand < 0.7) return Math.random() * 15 + 15; // 40% chance: 15-30% (moderate)
          return Math.random() * 20 + 30; // 30% chance: 30-50% (high DII)
        })(),
        
        // Technical Parameters - Create diverse data that matches common filter criteria
        ma100: (() => {
          const rand = Math.random();
          if (rand < 0.3) return tech.close * (0.9 + Math.random() * 0.05); // 30% chance: below current price
          if (rand < 0.7) return tech.close * (0.95 + Math.random() * 0.1); // 40% chance: near current price
          return tech.close * (1.05 + Math.random() * 0.1); // 30% chance: above current price
        })(),
        ema12: (() => {
          const rand = Math.random();
          if (rand < 0.4) return tech.close * (0.95 + Math.random() * 0.05); // 40% chance: below current
          return tech.close * (1.0 + Math.random() * 0.05); // 60% chance: at or above current
        })(),
        ema26: (() => {
          const rand = Math.random();
          if (rand < 0.3) return tech.close * (0.9 + Math.random() * 0.1); // 30% chance: below current
          if (rand < 0.7) return tech.close * (0.95 + Math.random() * 0.1); // 40% chance: near current
          return tech.close * (1.05 + Math.random() * 0.1); // 30% chance: above current
        })(),
        ema50: tech.ma50, // Use existing MA50
        bollinger_upper: tech.close * (1.02 + Math.random() * 0.08), // Upper band 2-10% above price
        bollinger_lower: tech.close * (0.9 + Math.random() * 0.08), // Lower band 2-10% below price
        bollinger_middle: tech.close * (0.95 + Math.random() * 0.1), // Middle band near current price
        atr: (() => {
          const rand = Math.random();
          if (rand < 0.3) return tech.close * (0.01 + Math.random() * 0.02); // 30% chance: 1-3% (low volatility)
          if (rand < 0.7) return tech.close * (0.03 + Math.random() * 0.04); // 40% chance: 3-7% (moderate)
          return tech.close * (0.07 + Math.random() * 0.05); // 30% chance: 7-12% (high volatility)
        })(),
        volume_surge: (() => {
          const rand = Math.random();
          if (rand < 0.4) return Math.random() * 2 + 1; // 40% chance: 1-3x (normal volume)
          if (rand < 0.7) return Math.random() * 3 + 3; // 30% chance: 3-6x (high volume)
          return Math.random() * 5 + 6; // 30% chance: 6-11x (very high volume)
        })(),
        gap_up: Math.random() > 0.85, // 15% chance of gap up
        gap_down: Math.random() > 0.85, // 15% chance of gap down
        price_above_vwap: (() => {
          const rand = Math.random();
          if (rand < 0.3) return false; // 30% chance below VWAP
          return true; // 70% chance above VWAP
        })(),
        price_below_vwap: (() => {
          const rand = Math.random();
          if (rand < 0.3) return true; // 30% chance below VWAP
          return false; // 70% chance above VWAP
        })(),
        vwap: tech.close * (0.95 + Math.random() * 0.1) // VWAP within 5% of current price
      });
    }
  });

  return merged;
}

// Enhanced merge function for crypto assets
export async function mergeCryptoAssetData(): Promise<MergedAssetData[]> {
  const [cryptoFundamental, newsData, whaleTransactions, credibilityScores] = await Promise.all([
    fetchCryptoFundamentalData(),
    fetchNewsData(),
    fetchWhaleTransactions(),
    fetchCredibilityScores()
  ]);

  const merged: MergedAssetData[] = [];
  
  cryptoFundamental.forEach(crypto => {
    // Find related news
    const relatedNews = newsData.filter(news => 
      news.related_assets.includes(crypto.symbol)
    );
    
    // Find whale activity
    const whaleActivity = whaleTransactions.filter(whale => 
      whale.asset_symbol === crypto.symbol
    );
    
    // Find credibility score
    const credibility = credibilityScores.find(score => 
      score.asset_symbol === crypto.symbol
    );
    
    // Calculate whale activity score
    const whaleActivityScore = whaleActivity.length > 0 
      ? whaleActivity.reduce((sum, whale) => sum + whale.credibility_score, 0) / whaleActivity.length
      : 50;
    
    // Calculate news sentiment
    const positiveNews = relatedNews.filter(news => news.sentiment === 'positive').length;
    const negativeNews = relatedNews.filter(news => news.sentiment === 'negative').length;
    const newsSentiment = positiveNews > negativeNews ? 'positive' : 
                         negativeNews > positiveNews ? 'negative' : 'neutral';
    
    // Mock technical data for crypto
    const mockTechnical = {
      date: '2024-01-15',
      symbol: crypto.symbol,
      close: crypto.price,
      volume: crypto.volume_24h,
      ma50: crypto.price * 0.95,
      ma200: crypto.price * 0.90,
      rsi14: Math.random() * 100,
      macd_line: (Math.random() - 0.5) * 10,
      macd_signal: (Math.random() - 0.5) * 8,
      macd_hist: (Math.random() - 0.5) * 2,
      '52w_high': crypto.price * 1.5,
      '52w_low': crypto.price * 0.5,
      pct_from_52w_high: -20 + Math.random() * 40,
      pct_from_52w_low: 20 + Math.random() * 60
    };
    
    merged.push({
      symbol: crypto.symbol,
      name: crypto.name,
      sector: 'Cryptocurrency',
      price: crypto.price,
      market_cap: crypto.market_cap,
      pe: 0, // Not applicable for crypto
      roe: 0, // Not applicable for crypto
      roce: 0, // Not applicable for crypto
      div_yield: 0, // Not applicable for crypto
      close: mockTechnical.close,
      volume: mockTechnical.volume,
      ma50: mockTechnical.ma50,
      ma200: mockTechnical.ma200,
      rsi14: mockTechnical.rsi14,
      macd_line: mockTechnical.macd_line,
      macd_signal: mockTechnical.macd_signal,
      macd_hist: mockTechnical.macd_hist,
      '52w_high': mockTechnical['52w_high'],
      '52w_low': mockTechnical['52w_low'],
      pct_from_52w_high: mockTechnical.pct_from_52w_high,
      pct_from_52w_low: mockTechnical.pct_from_52w_low,
      daily_change: Math.random() * 20 - 10,
      daily_change_pct: Math.random() * 20 - 10,
      // Crypto-specific fields
      volume_24h: crypto.volume_24h,
      circulating_supply: crypto.circulating_supply,
      total_supply: crypto.total_supply,
      max_supply: crypto.max_supply,
      tokenomics_health: crypto.tokenomics_health,
      active_addresses: crypto.active_addresses,
      gas_fees: crypto.gas_fees,
      tvl: crypto.tvl,
      staking_ratio: crypto.staking_ratio,
      // Enhanced fields
      credibility_score: credibility?.overall_score || 50,
      news_sentiment: newsSentiment,
      whale_activity_score: whaleActivityScore,
      asset_type: 'crypto' as const,
      
      // Fundamental Parameters (for crypto, these are calculated differently)
      pb_ratio: (() => {
        const rand = Math.random();
        if (rand < 0.2) return Math.random() * 2 + 1; // 20% chance: 1-3 (low P/B)
        if (rand < 0.5) return Math.random() * 3 + 3; // 30% chance: 3-6 (moderate)
        if (rand < 0.8) return Math.random() * 4 + 6; // 30% chance: 6-10 (high)
        return Math.random() * 5 + 10; // 20% chance: 10-15 (very high)
      })(),
      ev_ebitda: (() => {
        const rand = Math.random();
        if (rand < 0.3) return Math.random() * 20 + 10; // 30% chance: 10-30 (low)
        if (rand < 0.6) return Math.random() * 30 + 30; // 30% chance: 30-60 (moderate)
        return Math.random() * 40 + 60; // 40% chance: 60-100 (high)
      })(),
      current_ratio: (() => {
        const rand = Math.random();
        if (rand < 0.2) return Math.random() * 2 + 1; // 20% chance: 1-3 (low)
        if (rand < 0.6) return Math.random() * 3 + 3; // 40% chance: 3-6 (good)
        return Math.random() * 4 + 6; // 40% chance: 6-10 (strong)
      })(),
      quick_ratio: (() => {
        const rand = Math.random();
        if (rand < 0.3) return Math.random() * 2 + 1; // 30% chance: 1-3 (low)
        if (rand < 0.7) return Math.random() * 2 + 3; // 40% chance: 3-5 (good)
        return Math.random() * 3 + 5; // 30% chance: 5-8 (strong)
      })(),
      revenue_growth_yoy: (() => {
        const rand = Math.random();
        if (rand < 0.2) return Math.random() * 50 - 30; // 20% chance: -30% to +20% (volatile)
        if (rand < 0.5) return Math.random() * 40 + 20; // 30% chance: 20% to 60% (high growth)
        if (rand < 0.8) return Math.random() * 60 + 60; // 30% chance: 60% to 120% (very high)
        return Math.random() * 80 + 120; // 20% chance: 120% to 200% (extreme growth)
      })(),
      revenue_growth_qoq: (() => {
        const rand = Math.random();
        if (rand < 0.3) return Math.random() * 20 - 10; // 30% chance: -10% to +10% (volatile)
        if (rand < 0.7) return Math.random() * 30 + 10; // 40% chance: 10% to 40% (high)
        return Math.random() * 40 + 40; // 30% chance: 40% to 80% (very high)
      })(),
      profit_margin_net: (() => {
        const rand = Math.random();
        if (rand < 0.2) return Math.random() * 20 + 10; // 20% chance: 10-30% (moderate)
        if (rand < 0.6) return Math.random() * 30 + 30; // 40% chance: 30-60% (high)
        return Math.random() * 40 + 60; // 40% chance: 60-100% (very high)
      })(),
      profit_margin_operating: (() => {
        const rand = Math.random();
        if (rand < 0.1) return Math.random() * 20 + 15; // 10% chance: 15-35% (moderate)
        if (rand < 0.5) return Math.random() * 35 + 35; // 40% chance: 35-70% (high)
        return Math.random() * 30 + 70; // 50% chance: 70-100% (very high)
      })(),
      insider_buying: (() => {
        const rand = Math.random();
        if (rand < 0.2) return Math.random() * 30; // 20% chance: 0-30 (low)
        if (rand < 0.6) return Math.random() * 40 + 30; // 40% chance: 30-70 (moderate)
        return Math.random() * 30 + 70; // 40% chance: 70-100 (high)
      })(),
      promoter_holding_change: (() => {
        const rand = Math.random();
        if (rand < 0.3) return Math.random() * 10 - 10; // 30% chance: -10% to 0% (decreasing)
        if (rand < 0.6) return Math.random() * 5; // 30% chance: 0% to 5% (stable)
        return Math.random() * 15 + 5; // 40% chance: 5% to 20% (increasing)
      })(),
      institutional_holdings_fii: (() => {
        const rand = Math.random();
        if (rand < 0.2) return Math.random() * 20 + 20; // 20% chance: 20-40% (moderate)
        if (rand < 0.6) return Math.random() * 30 + 40; // 40% chance: 40-70% (high)
        return Math.random() * 30 + 70; // 40% chance: 70-100% (very high)
      })(),
      institutional_holdings_dii: (() => {
        const rand = Math.random();
        if (rand < 0.3) return Math.random() * 20 + 10; // 30% chance: 10-30% (moderate)
        if (rand < 0.7) return Math.random() * 30 + 30; // 40% chance: 30-60% (high)
        return Math.random() * 40 + 60; // 30% chance: 60-100% (very high)
      })(),
      
      // Technical Parameters - Create diverse crypto data
      ma100: (() => {
        const rand = Math.random();
        if (rand < 0.3) return mockTechnical.close * (0.85 + Math.random() * 0.1); // 30% chance: below current
        if (rand < 0.7) return mockTechnical.close * (0.95 + Math.random() * 0.1); // 40% chance: near current
        return mockTechnical.close * (1.05 + Math.random() * 0.15); // 30% chance: above current
      })(),
      ema12: (() => {
        const rand = Math.random();
        if (rand < 0.4) return mockTechnical.close * (0.9 + Math.random() * 0.1); // 40% chance: below current
        return mockTechnical.close * (1.0 + Math.random() * 0.1); // 60% chance: at or above current
      })(),
      ema26: (() => {
        const rand = Math.random();
        if (rand < 0.3) return mockTechnical.close * (0.85 + Math.random() * 0.15); // 30% chance: below current
        if (rand < 0.7) return mockTechnical.close * (0.95 + Math.random() * 0.15); // 40% chance: near current
        return mockTechnical.close * (1.05 + Math.random() * 0.15); // 30% chance: above current
      })(),
      ema50: mockTechnical.ma50, // Use existing MA50
      bollinger_upper: mockTechnical.close * (1.02 + Math.random() * 0.12), // Upper band 2-14% above price
      bollinger_lower: mockTechnical.close * (0.8 + Math.random() * 0.12), // Lower band 8-20% below price
      bollinger_middle: mockTechnical.close * (0.9 + Math.random() * 0.2), // Middle band 10-30% range
      atr: (() => {
        const rand = Math.random();
        if (rand < 0.2) return mockTechnical.close * (0.02 + Math.random() * 0.03); // 20% chance: 2-5% (low volatility)
        if (rand < 0.6) return mockTechnical.close * (0.05 + Math.random() * 0.05); // 40% chance: 5-10% (moderate)
        return mockTechnical.close * (0.1 + Math.random() * 0.1); // 40% chance: 10-20% (high volatility)
      })(),
      volume_surge: (() => {
        const rand = Math.random();
        if (rand < 0.3) return Math.random() * 3 + 1; // 30% chance: 1-4x (normal volume)
        if (rand < 0.6) return Math.random() * 5 + 4; // 30% chance: 4-9x (high volume)
        return Math.random() * 10 + 9; // 40% chance: 9-19x (very high volume)
      })(),
      gap_up: Math.random() > 0.8, // 20% chance of gap up (higher for crypto)
      gap_down: Math.random() > 0.8, // 20% chance of gap down (higher for crypto)
      price_above_vwap: (() => {
        const rand = Math.random();
        if (rand < 0.3) return false; // 30% chance below VWAP
        return true; // 70% chance above VWAP
      })(),
      price_below_vwap: (() => {
        const rand = Math.random();
        if (rand < 0.3) return true; // 30% chance below VWAP
        return false; // 70% chance above VWAP
      })(),
      vwap: mockTechnical.close * (0.9 + Math.random() * 0.2) // VWAP within 20% range of current price
    });
  });

  return merged;
}

export function getScanConfigs(): ScanConfig[] {
  return [
    // New Priority Scanners (Added to top)
    {
      category: 'equity',
      scan_name: 'High Dividend',
      slug: 'high-dividend',
      dataset: 'equity',
      logic_key: 'highDividend',
      title: 'High Dividend Yield Stocks – Income Scanner',
      description: 'Find stocks with attractive dividend yields for income-focused investors.',
      faqs: [
        {
          question: 'What is a high dividend yield?',
          answer: 'High dividend yield stocks typically offer dividend yields above 3-4% annually.'
        },
        {
          question: 'Why invest in dividend stocks?',
          answer: 'Dividend stocks provide regular income and often indicate financially stable companies.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'RSI Oversold Scan',
      slug: 'rsi-oversold-scan',
      dataset: 'equity',
      logic_key: 'rsiOversoldScan',
      title: 'RSI Oversold Stocks – Technical Scanner',
      description: 'Identify potentially oversold stocks using RSI technical indicator for potential bounce opportunities.',
      faqs: [
        {
          question: 'What is RSI oversold?',
          answer: 'RSI below 30 typically indicates oversold conditions, suggesting potential for price recovery.'
        },
        {
          question: 'How reliable is RSI oversold?',
          answer: 'RSI oversold signals work best in ranging markets and should be combined with other indicators.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Debt - All time low',
      slug: 'debt-all-time-low',
      dataset: 'equity',
      logic_key: 'debtAllTimeLow',
      title: 'Lowest Debt-to-Equity Stocks – Financial Health Scanner',
      description: 'Find companies with historically low debt levels indicating strong financial health.',
      faqs: [
        {
          question: 'What does all-time low debt mean?',
          answer: 'Companies with debt-to-equity ratios at historical lows show strong balance sheet management.'
        },
        {
          question: 'Why is low debt important?',
          answer: 'Low debt reduces financial risk and provides flexibility for growth investments.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Price - All time high',
      slug: 'price-all-time-high',
      dataset: 'equity',
      logic_key: 'priceAllTimeHigh',
      title: 'All-Time High Price Stocks – Momentum Scanner',
      description: 'Track stocks trading at or near their all-time highs for momentum opportunities.',
      faqs: [
        {
          question: 'What are all-time high stocks?',
          answer: 'Stocks trading at or very close to their highest prices ever recorded.'
        },
        {
          question: 'Should I buy stocks at all-time highs?',
          answer: 'All-time highs can indicate strong momentum, but consider valuation and market conditions.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'IPO Gainers',
      slug: 'ipo-gainers',
      dataset: 'equity',
      logic_key: 'ipoGainers',
      title: 'IPO Gainers – New Listing Performance Scanner',
      description: 'Track recently listed stocks showing strong performance post-IPO.',
      faqs: [
        {
          question: 'What are IPO gainers?',
          answer: 'Recently listed stocks that have gained significantly since their initial public offering.'
        },
        {
          question: 'How long after IPO should I track?',
          answer: 'IPO performance is typically tracked for 3-12 months after listing to assess initial market response.'
        }
      ]
    },
    
    // Common Scans (Equity + Crypto)
    {
      category: 'equity',
      scan_name: 'Top Gainers',
      slug: 'top-gainers',
      dataset: 'equity',
      logic_key: 'topGainers',
      title: 'Top Gainer Stocks Today – Live Screener',
      description: 'Discover the best performing stocks today with our real-time top gainers scanner.',
      faqs: [
        {
          question: 'What are top gainers?',
          answer: 'Top gainers are stocks that have increased in price the most during the current trading session.'
        },
        {
          question: 'How often is this data updated?',
          answer: 'Our data is updated every 10-30 minutes during market hours.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Top Losers',
      slug: 'top-losers',
      dataset: 'equity',
      logic_key: 'topLosers',
      title: 'Top Loser Stocks Today – Live Screener',
      description: 'Track the worst performing stocks today with our real-time top losers scanner.',
      faqs: [
        {
          question: 'What are top losers?',
          answer: 'Top losers are stocks that have decreased in price the most during the current trading session.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Crypto Top Gainers',
      slug: 'crypto-top-gainers',
      dataset: 'crypto',
      logic_key: 'cryptoTopGainers',
      title: 'Top Gaining Cryptocurrencies Today',
      description: 'Track the best performing cryptocurrencies with our real-time crypto scanner.',
      faqs: [
        {
          question: 'How is crypto performance calculated?',
          answer: 'Crypto performance is calculated based on 24-hour price changes.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Crypto Top Losers',
      slug: 'crypto-top-losers',
      dataset: 'crypto',
      logic_key: 'cryptoTopLosers',
      title: 'Top Losing Cryptocurrencies Today',
      description: 'Track the worst performing cryptocurrencies with our real-time crypto scanner.',
      faqs: [
        {
          question: 'Why do crypto prices drop?',
          answer: 'Crypto prices can drop due to market sentiment, regulatory news, or technical factors.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Most Active',
      slug: 'most-active',
      dataset: 'equity',
      logic_key: 'mostActive',
      title: 'Most Active Stocks Today – Volume Scanner',
      description: 'Find stocks with the highest trading volume indicating strong market interest.',
      faqs: [
        {
          question: 'What does most active mean?',
          answer: 'Most active stocks have the highest trading volume, indicating strong investor interest.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Crypto Most Active',
      slug: 'crypto-most-active',
      dataset: 'crypto',
      logic_key: 'cryptoMostActive',
      title: 'Most Active Cryptocurrencies – Volume Scanner',
      description: 'Find cryptocurrencies with the highest 24h trading volume.',
      faqs: [
        {
          question: 'Why is volume important in crypto?',
          answer: 'High volume in crypto indicates strong market interest and liquidity.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Near 52W Low',
      slug: 'near-52w-low',
      dataset: 'equity',
      logic_key: 'near52wLow',
      title: 'Near 52-Week Low Stocks',
      description: 'Find stocks approaching their 52-week lows for potential value opportunities.',
      faqs: [
        {
          question: 'What is a 52-week low?',
          answer: 'The lowest price a stock has traded at during the past 52 weeks.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Near All-Time High',
      slug: 'near-ath',
      dataset: 'crypto',
      logic_key: 'nearATH',
      title: 'Near All-Time High Cryptocurrencies',
      description: 'Find cryptocurrencies approaching their all-time highs.',
      faqs: [
        {
          question: 'What is an all-time high?',
          answer: 'The highest price a cryptocurrency has ever reached.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Large Deals',
      slug: 'large-deals',
      dataset: 'equity',
      logic_key: 'largeDeals',
      title: 'Large Block Deals Today',
      description: 'Track significant block deals and institutional trading activity.',
      faqs: [
        {
          question: 'What are block deals?',
          answer: 'Block deals are large transactions typically involving institutional investors.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Whale Movements',
      slug: 'whale-movements',
      dataset: 'crypto',
      logic_key: 'whaleMovements',
      title: 'Whale Transaction Tracker',
      description: 'Monitor large cryptocurrency transactions and whale activity.',
      faqs: [
        {
          question: 'What are whale transactions?',
          answer: 'Whale transactions are large cryptocurrency movements that can impact market prices.'
        }
      ]
    },
    {
      category: 'cross-asset',
      scan_name: 'News-Linked Moves',
      slug: 'news-linked-moves',
      dataset: 'cross-asset',
      logic_key: 'newsLinkedMoves',
      title: 'News-Driven Price Movements',
      description: 'Find assets with significant price movements linked to recent news.',
      faqs: [
        {
          question: 'How do we track news impact?',
          answer: 'We analyze price movements and correlate them with recent news sentiment.'
        }
      ]
    },
    
    // Equity Screener Parameters
    {
      category: 'equity',
      scan_name: 'Low PE High ROCE',
      slug: 'low-pe-high-roce',
      dataset: 'equity',
      logic_key: 'lowPE_highROCE',
      title: 'Low PE High ROCE Stocks – Value Scanner',
      description: 'Find undervalued stocks with strong returns on capital employed.',
      faqs: [
        {
          question: 'What is PE ratio?',
          answer: 'Price-to-Earnings ratio measures a company\'s current share price relative to its per-share earnings.'
        },
        {
          question: 'What is ROCE?',
          answer: 'Return on Capital Employed measures how efficiently a company uses its capital to generate profits.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Dividend Growth',
      slug: 'dividend-growth',
      dataset: 'equity',
      logic_key: 'dividendGrowth',
      title: 'Dividend Growth Stocks',
      description: 'Find stocks with consistent dividend growth over time.',
      faqs: [
        {
          question: 'What is dividend growth?',
          answer: 'Dividend growth refers to companies that consistently increase their dividend payments year over year.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'Debt Reduction',
      slug: 'debt-reduction',
      dataset: 'equity',
      logic_key: 'debtReduction',
      title: 'Debt Reduction Stocks',
      description: 'Find companies actively reducing their debt levels.',
      faqs: [
        {
          question: 'What is debt reduction?',
          answer: 'Companies that are actively paying down debt and improving their balance sheet health.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'High EPS Growth',
      slug: 'high-eps-growth',
      dataset: 'equity',
      logic_key: 'highEPSGrowth',
      title: 'High EPS Growth Stocks',
      description: 'Find companies with strong earnings growth.',
      faqs: [
        {
          question: 'What is EPS growth?',
          answer: 'Earnings per Share growth measures the rate of increase in company profits.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'RSI Overbought',
      slug: 'rsi-overbought',
      dataset: 'equity',
      logic_key: 'rsiOverbought',
      title: 'RSI Overbought Stocks – Technical Scanner',
      description: 'Identify potentially overbought stocks using RSI technical indicator.',
      faqs: [
        {
          question: 'What is RSI overbought?',
          answer: 'RSI above 70 typically indicates overbought conditions, suggesting potential for price correction.'
        },
        {
          question: 'What does overbought mean?',
          answer: 'Overbought typically means a stock may be overvalued and could potentially decline.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'MACD Bullish Crossover',
      slug: 'macd-bullish-crossover',
      dataset: 'equity',
      logic_key: 'macdBullishCrossover',
      title: 'MACD Bullish Crossover Stocks',
      description: 'Find stocks with bullish MACD crossover signals.',
      faqs: [
        {
          question: 'What is MACD?',
          answer: 'Moving Average Convergence Divergence is a trend-following momentum indicator.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'SMA Golden Cross',
      slug: 'sma-golden-cross',
      dataset: 'equity',
      logic_key: 'smaGoldenCross',
      title: 'SMA Golden Cross Stocks',
      description: 'Find stocks with 50-day SMA crossing above 200-day SMA.',
      faqs: [
        {
          question: 'What is a golden cross?',
          answer: 'A golden cross occurs when a short-term moving average crosses above a long-term moving average.'
        }
      ]
    },
    {
      category: 'equity',
      scan_name: 'High Volume',
      slug: 'high-volume',
      dataset: 'equity',
      logic_key: 'highVolume',
      title: 'High Volume Stocks Today',
      description: 'Find stocks with unusually high trading volume indicating strong interest.',
      faqs: [
        {
          question: 'Why is volume important?',
          answer: 'High volume often indicates strong investor interest and can signal potential price movements.'
        }
      ]
    },
    
    // Crypto Screener Parameters
    {
      category: 'crypto',
      scan_name: 'High Market Cap',
      slug: 'high-market-cap-crypto',
      dataset: 'crypto',
      logic_key: 'highMarketCapCrypto',
      title: 'High Market Cap Cryptocurrencies',
      description: 'Find cryptocurrencies with large market capitalizations.',
      faqs: [
        {
          question: 'What is market cap in crypto?',
          answer: 'Market cap is the total value of all coins in circulation.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'High Volume 24h',
      slug: 'high-volume-24h',
      dataset: 'crypto',
      logic_key: 'highVolume24h',
      title: 'High 24h Volume Cryptocurrencies',
      description: 'Find cryptocurrencies with high 24-hour trading volume.',
      faqs: [
        {
          question: 'Why is 24h volume important?',
          answer: 'High 24h volume indicates strong trading activity and liquidity.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Healthy Tokenomics',
      slug: 'healthy-tokenomics',
      dataset: 'crypto',
      logic_key: 'healthyTokenomics',
      title: 'Healthy Tokenomics Cryptocurrencies',
      description: 'Find cryptocurrencies with strong tokenomics and supply dynamics.',
      faqs: [
        {
          question: 'What are tokenomics?',
          answer: 'Tokenomics refers to the economic model and supply mechanics of a cryptocurrency.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'High Active Addresses',
      slug: 'high-active-addresses',
      dataset: 'crypto',
      logic_key: 'highActiveAddresses',
      title: 'High Active Addresses Cryptocurrencies',
      description: 'Find cryptocurrencies with high network activity.',
      faqs: [
        {
          question: 'What are active addresses?',
          answer: 'Active addresses are unique addresses that have sent or received transactions.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Low Gas Fees',
      slug: 'low-gas-fees',
      dataset: 'crypto',
      logic_key: 'lowGasFees',
      title: 'Low Gas Fees Cryptocurrencies',
      description: 'Find cryptocurrencies with low transaction costs.',
      faqs: [
        {
          question: 'What are gas fees?',
          answer: 'Gas fees are transaction costs paid to process transactions on blockchain networks.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'High TVL',
      slug: 'high-tvl',
      dataset: 'crypto',
      logic_key: 'highTVL',
      title: 'High Total Value Locked (TVL)',
      description: 'Find cryptocurrencies with high total value locked in DeFi protocols.',
      faqs: [
        {
          question: 'What is TVL?',
          answer: 'Total Value Locked is the total value of assets locked in DeFi protocols.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'High Staking Ratio',
      slug: 'high-staking-ratio',
      dataset: 'crypto',
      logic_key: 'highStakingRatio',
      title: 'High Staking Ratio Cryptocurrencies',
      description: 'Find cryptocurrencies with high staking participation.',
      faqs: [
        {
          question: 'What is staking ratio?',
          answer: 'Staking ratio is the percentage of total supply that is staked.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Crypto RSI Oversold',
      slug: 'crypto-rsi-oversold',
      dataset: 'crypto',
      logic_key: 'cryptoRSIOversold',
      title: 'Oversold Cryptocurrencies – RSI Scanner',
      description: 'Find potentially oversold cryptocurrencies using RSI technical analysis.',
      faqs: [
        {
          question: 'Is crypto RSI different from stock RSI?',
          answer: 'The RSI calculation is the same, but crypto markets are more volatile and trade 24/7.'
        }
      ]
    },
    {
      category: 'crypto',
      scan_name: 'Crypto MACD Bullish',
      slug: 'crypto-macd-bullish',
      dataset: 'crypto',
      logic_key: 'cryptoMACDBullish',
      title: 'Crypto MACD Bullish Signals',
      description: 'Find cryptocurrencies with bullish MACD signals.',
      faqs: [
        {
          question: 'How does MACD work in crypto?',
          answer: 'MACD works the same in crypto as in stocks, but crypto markets are more volatile.'
        }
      ]
    },
    
    // Cross-Asset Scanners
    {
      category: 'cross-asset',
      scan_name: 'Momentum Scanner',
      slug: 'momentum-scanner',
      dataset: 'cross-asset',
      logic_key: 'momentum',
      title: 'Momentum Scanner – Stocks & Crypto',
      description: 'Find assets with strong momentum across stocks and cryptocurrencies.',
      faqs: [
        {
          question: 'What is momentum investing?',
          answer: 'Momentum investing involves buying assets that have shown upward price trends.'
        }
      ]
    },
    {
      category: 'cross-asset',
      scan_name: 'Value Scanner',
      slug: 'value-scanner',
      dataset: 'cross-asset',
      logic_key: 'value',
      title: 'Value Scanner – Undervalued Assets',
      description: 'Discover undervalued stocks and assets with strong fundamentals.',
      faqs: [
        {
          question: 'What makes an asset undervalued?',
          answer: 'An asset is considered undervalued when its market price is below its intrinsic value.'
        }
      ]
    },
    {
      category: 'cross-asset',
      scan_name: 'High Credibility',
      slug: 'high-credibility',
      dataset: 'cross-asset',
      logic_key: 'highCredibility',
      title: 'High Credibility Assets',
      description: 'Find assets with high credibility scores based on multiple data sources.',
      faqs: [
        {
          question: 'What is credibility score?',
          answer: 'Credibility score measures the reliability of data sources and signals for an asset.'
        }
      ]
    },
    {
      category: 'cross-asset',
      scan_name: 'News Sentiment Positive',
      slug: 'news-sentiment-positive',
      dataset: 'cross-asset',
      logic_key: 'newsSentimentPositive',
      title: 'Positive News Sentiment Assets',
      description: 'Find assets with positive news sentiment and strong fundamentals.',
      faqs: [
        {
          question: 'How is news sentiment calculated?',
          answer: 'News sentiment is calculated using AI analysis of news headlines and social media.'
        }
      ]
    }
  ];
}
