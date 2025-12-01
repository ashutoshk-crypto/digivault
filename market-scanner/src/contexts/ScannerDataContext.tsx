'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ScannerDataContextType {
  currentData: any[];
  setCurrentData: (data: any[]) => void;
}

const ScannerDataContext = createContext<ScannerDataContextType | undefined>(undefined);

export function ScannerDataProvider({ children }: { children: ReactNode }) {
  const [currentData, setCurrentData] = useState<any[]>([]);

  return (
    <ScannerDataContext.Provider value={{
      currentData,
      setCurrentData
    }}>
      {children}
    </ScannerDataContext.Provider>
  );
}

export function useScannerData() {
  const context = useContext(ScannerDataContext);
  if (context === undefined) {
    throw new Error('useScannerData must be used within a ScannerDataProvider');
  }
  return context;
}
