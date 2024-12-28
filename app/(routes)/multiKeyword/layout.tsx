'use client';

import { UseMultiKeywordProvider } from '@/contexts/MultiKeywordUseContext';

export default function SettlementUsagePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UseMultiKeywordProvider>
      <div className='w-full h-full relative flex flex-col'>{children}</div>
    </UseMultiKeywordProvider>
  );
}
