'use client';

import SettlementLayout from '@/components/layouts/SettlementLayout';
import { SettlementProvider } from '@/contexts/SettlementContext';

export default function SettlementPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettlementProvider>
      <SettlementLayout>{children}</SettlementLayout>
    </SettlementProvider>
  );
}
