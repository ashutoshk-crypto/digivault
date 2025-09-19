import Link from "next/link";
import { getScanConfigs } from "@/utils/data";

export default function Home() {
  const scans = getScanConfigs();
  
  // Group scans by category
  const equityScans = scans.filter(scan => scan.category === 'equity');
  const cryptoScans = scans.filter(scan => scan.category === 'crypto');
  const crossAssetScans = scans.filter(scan => scan.category === 'cross-asset');

  return (
    <div className="min-h-screen bg-gray-900 scroll-smooth">
      {/* Header */}
      <header className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            Cross-Asset Market Scanner
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8">
            Discover investment opportunities across stocks and cryptocurrencies with advanced screening tools
          </p>
          
          {/* Interactive Scanner Navigation */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Quick Access to All Scanners</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Equity Scanners */}
              <div className="group">
                <a href="#equity-scanners" className="block">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="text-3xl mb-2">📈</div>
                    <h3 className="text-lg font-bold text-white mb-1">Equity Scanners</h3>
                    <p className="text-blue-100 text-xs mb-2">Stock market analysis tools</p>
                    <div className="text-blue-200 text-xs">
                      High Dividend • RSI Oversold • Debt Analysis
                    </div>
                  </div>
                </a>
              </div>

              {/* Crypto Scanners */}
              <div className="group">
                <a href="#crypto-scanners" className="block">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="text-3xl mb-2">₿</div>
                    <h3 className="text-lg font-bold text-white mb-1">Crypto Scanners</h3>
                    <p className="text-purple-100 text-xs mb-2">Cryptocurrency analysis tools</p>
                    <div className="text-purple-200 text-xs">
                      Top Gainers • Whale Tracking • Tokenomics
                    </div>
                  </div>
                </a>
              </div>

              {/* Universal Scanners */}
              <div className="group">
                <a href="#universal-scanners" className="block">
                  <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg p-4 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                    <div className="text-3xl mb-2">🌐</div>
                    <h3 className="text-lg font-bold text-white mb-1">Universal Scanners</h3>
                    <p className="text-teal-100 text-xs mb-2">Cross-asset analysis tools</p>
                    <div className="text-teal-200 text-xs">
                      Momentum • Value • Credibility
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-base font-semibold text-white mb-1">Real-time Data</h3>
              <p className="text-gray-400 text-xs">Live market data with 10-30 minute updates</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="text-base font-semibold text-white mb-1">Advanced Filters</h3>
              <p className="text-gray-400 text-xs">Technical, fundamental, and sentiment analysis</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-base font-semibold text-white mb-1">Credibility Layer</h3>
              <p className="text-gray-400 text-xs">AI-powered signal validation and risk assessment</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Equity Scanners */}
        <section id="equity-scanners" className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm mr-3">Equity</span>
            Stock Market Scanners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {equityScans.map((scan) => (
              <Link
                key={scan.slug}
                href={`/scanners/${scan.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                    {scan.scan_name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {scan.description}
                  </p>
                  
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    View Scanner
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Crypto Scanners */}
        <section id="crypto-scanners" className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm mr-3">Crypto</span>
            Cryptocurrency Scanners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cryptoScans.map((scan) => (
              <Link
                key={scan.slug}
                href={`/scanners/${scan.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-purple-300"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-3">
                    {scan.scan_name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {scan.description}
                  </p>
                  
                  <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    View Scanner
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-Asset Scanners */}
        <section id="universal-scanners" className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm mr-3">Cross-Asset</span>
            Universal Scanners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crossAssetScans.map((scan) => (
              <Link
                key={scan.slug}
                href={`/scanners/${scan.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-teal-300"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors mb-3">
                    {scan.scan_name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {scan.description}
                  </p>
                  
                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                    View Scanner
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-3">📈</div>
              <h3 className="text-lg font-semibold text-white mb-2">Technical Analysis</h3>
              <p className="text-gray-400 text-sm">RSI, MACD, Moving Averages, Chart Patterns</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="text-lg font-semibold text-white mb-2">Fundamental Analysis</h3>
              <p className="text-gray-400 text-sm">P/E, ROCE, Market Cap, Financial Health</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">🐋</div>
              <h3 className="text-lg font-semibold text-white mb-2">Whale Tracking</h3>
              <p className="text-gray-400 text-sm">Large Transactions, Institutional Activity</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-3">📰</div>
              <h3 className="text-lg font-semibold text-white mb-2">News Integration</h3>
              <p className="text-gray-400 text-sm">Sentiment Analysis, News-Driven Moves</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}