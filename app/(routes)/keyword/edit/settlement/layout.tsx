'use client';

import SettlementEditLayout from '@/components/layouts/SettlementEditLayout';
import { SettlementProvider } from '@/contexts/SettlementContext';
import {
  KeywordDetailList,
  SettlementKeyword,
  SettlementAmountKeyword,
} from '@/data/keyword';

export default function SettlementPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const keyword = KeywordDetailList[7] as
    | SettlementKeyword
    | SettlementAmountKeyword;
  return (
    <SettlementProvider isEdit={true} originalData={keyword}>
      <SettlementEditLayout>{children}</SettlementEditLayout>
    </SettlementProvider>
  );
}
