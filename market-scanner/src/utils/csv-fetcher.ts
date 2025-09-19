import { FundamentalData, TechnicalData } from '@/types';

// Cache for storing fetched data
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export async function fetchCSVData<T>(url: string, parser: (row: Record<string, string | number>) => T): Promise<T[]> {
  const cacheKey = url;
  const cached = cache.get(cacheKey);
  
  // Check if we have valid cached data
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T[];
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
      headers: {
        'Cache-Control': 'public, max-age=1800',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    const data = parseCSV(csvText, parser);
    
    // Cache the data
    cache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error('Error fetching CSV data:', error);
    // Return cached data if available, even if expired
    if (cached) {
      return cached.data as T[];
    }
    throw error;
  }
}

function parseCSV<T>(csvText: string, parser: (row: Record<string, string | number>) => T): T[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
    const row: Record<string, string | number> = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      // Try to parse as number if it looks like one
      if (value && !isNaN(Number(value)) && value !== '') {
        row[header] = Number(value);
      } else {
        row[header] = value;
      }
    });
    
    return parser(row);
  });
}

// Production-ready CSV fetchers
export async function fetchFundamentalDataFromCSV(csvUrl: string): Promise<FundamentalData[]> {
  return fetchCSVData(csvUrl, (row): FundamentalData => ({
    symbol: String(row.symbol || ''),
    name: String(row.name || ''),
    sector: String(row.sector || ''),
    price: Number(row.price) || 0,
    market_cap: Number(row.market_cap) || 0,
    pe: Number(row.pe) || 0,
    roe: Number(row.roe) || 0,
    roce: Number(row.roce) || 0,
    div_yield: Number(row.div_yield) || 0,
    updated_at: String(row.updated_at || new Date().toISOString()),
  }));
}

export async function fetchTechnicalDataFromCSV(csvUrl: string): Promise<TechnicalData[]> {
  return fetchCSVData(csvUrl, (row): TechnicalData => ({
    date: String(row.date || ''),
    symbol: String(row.symbol || ''),
    close: Number(row.close) || 0,
    volume: Number(row.volume) || 0,
    ma50: Number(row.ma50) || 0,
    ma200: Number(row.ma200) || 0,
    rsi14: Number(row.rsi14) || 0,
    macd_line: Number(row.macd_line) || 0,
    macd_signal: Number(row.macd_signal) || 0,
    macd_hist: Number(row.macd_hist) || 0,
    '52w_high': Number(row['52w_high']) || 0,
    '52w_low': Number(row['52w_low']) || 0,
    pct_from_52w_high: Number(row.pct_from_52w_high) || 0,
    pct_from_52w_low: Number(row.pct_from_52w_low) || 0,
  }));
}

// Environment variables for CSV URLs
export const CSV_URLS = {
  FUNDAMENTALS: process.env.FUNDAMENTALS_CSV_URL || '',
  TECHNICALS: process.env.TECHNICALS_CSV_URL || '',
};
