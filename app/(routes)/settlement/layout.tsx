'use client';

import Header from '@/components/atoms/Header';
import { SettlementProvider } from '@/contexts/SettlementContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';

export default function SettlementUsagePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettlementProvider>
      <VoiceInputProvider>
        <div className='w-full h-full relative flex flex-col'>
          <Header text={'키워드 정산'} showActionButton={false} />
          {children}
        </div>
      </VoiceInputProvider>
    </SettlementProvider>
  );
}
