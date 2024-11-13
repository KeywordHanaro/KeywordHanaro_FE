'use client';

import SettlementRequest from '@/components/templates/settlement/SettlementRequest';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { Suspense } from 'react';

export default function SettlementUsageStep1() {
  const { formData, updateFormData } = useSettlementContext();

  return (
    <Suspense>
      <SettlementRequest formData={formData} onUpdate={updateFormData} />;
    </Suspense>
  );
}
