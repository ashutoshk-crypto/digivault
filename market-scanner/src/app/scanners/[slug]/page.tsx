import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getScanConfigs, fetchFundamentalData, fetchTechnicalData, mergeAssetData, mergeCryptoAssetData, fetchNewsData, fetchWhaleTransactions, fetchCredibilityScores } from '@/utils/data';
import { applyFilter, resetUsedStocks, applyAllFilters, defaultFilterState } from '@/utils/filters';
import { ScannerTable } from '@/components/ScannerTable';
import { FAQSection } from '@/components/FAQSection';
import { RelatedScans } from '@/components/RelatedScans';
import { JSONLDSchema } from '@/components/JSONLDSchema';
import { NewsFeed } from '@/components/NewsFeed';
import { WhaleTracker } from '@/components/WhaleTracker';
import { CredibilityScore } from '@/components/CredibilityScore';
import { ScannerPageWithFilters } from '@/components/ScannerPageWithFilters';

interface ScannerPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const scans = getScanConfigs();
  return scans.map((scan) => ({
    slug: scan.slug,
  }));
}

export async function generateMetadata({ params }: ScannerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const scans = getScanConfigs();
  const scan = scans.find(s => s.slug === slug);
  
  if (!scan) {
    return {
      title: 'Scanner Not Found',
    };
  }

  return {
    title: scan.title,
    description: scan.description,
    openGraph: {
      title: scan.title,
      description: scan.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: scan.title,
      description: scan.description,
    },
  };
}

export default async function ScannerPage({ params }: ScannerPageProps) {
  const { slug } = await params;
  const scans = getScanConfigs();
  const scan = scans.find(s => s.slug === slug);
  
  if (!scan) {
    notFound();
  }

  // Reset used stocks for diversity across scanners
  resetUsedStocks();

  // Fetch and merge data based on scan type
  let mergedData;
  
  if (scan.dataset === 'crypto') {
    mergedData = await mergeCryptoAssetData();
  } else if (scan.dataset === 'cross-asset') {
    // For cross-asset, combine both equity and crypto data
    const [equityData, cryptoData] = await Promise.all([
      (async () => {
        const [fundamentalData, technicalData] = await Promise.all([
          fetchFundamentalData(),
          fetchTechnicalData(),
        ]);
        return await mergeAssetData(fundamentalData, technicalData);
      })(),
      mergeCryptoAssetData()
    ]);
    mergedData = [...equityData, ...cryptoData];
  } else {
    // Default to equity
    const [fundamentalData, technicalData] = await Promise.all([
      fetchFundamentalData(),
      fetchTechnicalData(),
    ]);
    mergedData = await mergeAssetData(fundamentalData, technicalData);
  }
  
  // Fetch additional data for enhanced features
  const [newsData, whaleTransactions, credibilityScores] = await Promise.all([
    fetchNewsData(),
    fetchWhaleTransactions(),
    fetchCredibilityScores()
  ]);
  
  const lastUpdated = new Date().toISOString();

  // Get related scans (same category, excluding current)
  const relatedScans = scans
    .filter(s => s.category === scan.category && s.slug !== scan.slug)
    .slice(0, 5);

  // Get initial filtered data for JSON-LD schema
  const initialFilteredData = applyFilter(mergedData, scan.logic_key);

  return (
    <>
      <ScannerPageWithFilters
        scan={scan}
        allData={mergedData}
        newsData={newsData}
        whaleTransactions={whaleTransactions}
        credibilityScores={credibilityScores}
        relatedScans={relatedScans}
        lastUpdated={lastUpdated}
      />
      
      {/* JSON-LD Schema */}
      <JSONLDSchema scan={scan} data={initialFilteredData} lastUpdated={lastUpdated} />
    </>
  );
}
