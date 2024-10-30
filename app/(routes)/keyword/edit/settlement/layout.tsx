'use client';
import SettlementEditLayout from '@/components/layouts/SettlementEditLayout';
import { SettlementProvider } from '@/contexts/SettlementContext';
import {
  KeywordDetailList,
  SettlementKeyword,
  SettlementAmountKeyword,
} from '@/data/keyword';
import { useSearchParams } from 'next/navigation';


export default function SettlementPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useSearchParams();
  const id = params.get('id');
  const keyword = KeywordDetailList.find((item) => item.id === Number(id)) as
    | SettlementKeyword
    | SettlementAmountKeyword;

  return (
    <SettlementProvider isEdit={true} originalData={keyword}>
      <SettlementEditLayout>
        <>{children}</>
      </SettlementEditLayout>
    </SettlementProvider>
  );
}
