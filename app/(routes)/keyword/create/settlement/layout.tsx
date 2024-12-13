'use client';

import SettlementLayout from '@/components/layouts/SettlementLayout';
import { SettlementProvider } from '@/contexts/SettlementContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';

export default function SettlementPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <VoiceInputProvider>
      <SettlementProvider>
        <SettlementLayout>{children}</SettlementLayout>
      </SettlementProvider>
    </VoiceInputProvider>
  );
}
