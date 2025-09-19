import Link from 'next/link';
import { ScanConfig } from '@/types';

interface RelatedScansProps {
  scans: ScanConfig[];
}

export function RelatedScans({ scans }: RelatedScansProps) {
  return (
    <div className="space-y-2">
      {scans.map((scan) => (
        <Link
          key={scan.slug}
          href={`/scanners/${scan.slug}`}
          className="block text-white hover:text-gray-300 transition-colors"
        >
          <div className="flex items-center">
            <span className="mr-2">-</span>
            <span>{scan.scan_name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
