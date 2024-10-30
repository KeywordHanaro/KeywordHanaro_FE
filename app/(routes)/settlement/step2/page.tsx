'use client';

import SettlementCompletion from '@/components/templates/settlement/SettlementCompletion';
import { useSettlementContext } from '@/contexts/SettlementContext';

export default function SettlementUsageStep2() {
  const { formData } = useSettlementContext();

  return (
    <>
      <SettlementCompletion formData={formData} />
    </>
  );
}
