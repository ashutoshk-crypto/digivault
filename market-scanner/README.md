# Market Scanners - Prototype

A web-based market scanner for equities and crypto that allows users to filter assets based on fundamental and technical parameters.

## Features

- **Real-time Market Data**: Get the latest market data updated every 10-30 minutes
- **Advanced Filters**: Use technical and fundamental analysis to find the best opportunities
- **SEO Optimized**: Each scanner page is optimized for search engines and organic discovery
- **Responsive Design**: Modern UI that works on all devices
- **Static Generation**: Fast page loads with ISR (Incremental Static Regeneration)

## Scanner Types

### Equity Scanners
- Top Gainers - Best performing stocks today
- Top Losers - Worst performing stocks today
- Low PE High ROCE - Value stocks with strong returns
- RSI Oversold - Potentially oversold stocks
- Near 52W High Breakout - Stocks approaching 52-week highs
- High Volume - Stocks with unusual trading volume

### Crypto Scanners
- Crypto Top Gainers - Best performing cryptocurrencies
- Crypto RSI Oversold - Oversold cryptocurrencies
- Crypto High Volume - High volume crypto assets

### Cross-Asset Scanners
- Momentum Scanner - Assets with strong momentum
- Value Scanner - Undervalued assets with strong fundamentals

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd market-scanner
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env.local
```

Add your Google Sheets CSV URLs to the environment file:
```env
FUNDAMENTALS_CSV_URL=https://docs.google.com/spreadsheets/d/your-sheet-id/export?format=csv&gid=0
TECHNICALS_CSV_URL=https://docs.google.com/spreadsheets/d/your-sheet-id/export?format=csv&gid=1
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Data Sources

The application supports two data sources:

1. **Google Sheets CSV** (Production): Set up your Google Sheets with the required columns and publish as CSV
2. **Mock Data** (Development): Built-in sample data for testing

### Google Sheets Setup

#### Fundamentals Sheet
Required columns:
- symbol, name, sector, price, market_cap, pe, roe, roce, div_yield, updated_at

#### Technicals Sheet  
Required columns:
- date, symbol, close, volume, ma50, ma200, rsi14, macd_line, macd_signal, macd_hist, 52w_high, 52w_low, pct_from_52w_high, pct_from_52w_low

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm start
```

## SEO Features

- **Meta Tags**: Optimized title, description, and Open Graph tags
- **JSON-LD Schema**: Structured data for search engines
- **Sitemap**: Auto-generated sitemap for all scanner pages
- **Robots.txt**: Search engine crawling instructions
- **Performance**: Optimized for Core Web Vitals

## Customization

### Adding New Scanners

1. Update the `getScanConfigs()` function in `src/utils/data.ts`
2. Add new filter logic in `src/utils/filters.ts`
3. The scanner page will be automatically generated

### Styling

The application uses Tailwind CSS. Custom styles can be added to `src/app/globals.css`.

## Performance

- **Static Generation**: Pages are pre-built for fast loading
- **ISR**: Data is refreshed every 30 minutes
- **Caching**: Multiple layers of caching for optimal performance
- **Image Optimization**: Next.js automatic image optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Disclaimer

This is a prototype for demonstration purposes. Not financial advice. Always do your own research before making investment decisions.