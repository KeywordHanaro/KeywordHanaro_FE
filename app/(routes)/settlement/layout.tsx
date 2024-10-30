'use client';

import SettlementUsageLayout from '@/components/layouts/SettlementUsageLayout';
import { SettlementProvider } from '@/contexts/SettlementContext';

export default function SettlementUsagePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettlementProvider>
      <SettlementUsageLayout>{children}</SettlementUsageLayout>
    </SettlementProvider>
  );
}
