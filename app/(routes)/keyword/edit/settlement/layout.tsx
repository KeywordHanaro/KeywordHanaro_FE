'use client';

import SettlementEditLayout from '@/components/layouts/SettlementEditLayout';
import { SettlementProvider } from '@/contexts/SettlementContext';

export default function SettlementPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SettlementProvider isEdit={true}>
      <SettlementEditLayout>
        <>{children}</>
      </SettlementEditLayout>
    </SettlementProvider>
  );
}
