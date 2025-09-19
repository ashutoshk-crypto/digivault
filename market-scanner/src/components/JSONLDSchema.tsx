import { ScanConfig, MergedAssetData } from '@/types';

interface JSONLDSchemaProps {
  scan: ScanConfig;
  data: MergedAssetData[];
  lastUpdated: string;
}

export function JSONLDSchema({ scan, data, lastUpdated }: JSONLDSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": scan.title,
    "description": scan.description,
    "dateModified": lastUpdated,
    "numberOfItems": data.length,
    "itemListElement": data.slice(0, 10).map((asset, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "FinancialProduct",
        "name": asset.name,
        "tickerSymbol": asset.symbol,
        "price": asset.price,
        "description": `${asset.sector} stock with P/E ratio of ${asset.pe.toFixed(1)} and ROCE of ${asset.roce.toFixed(1)}%`
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
