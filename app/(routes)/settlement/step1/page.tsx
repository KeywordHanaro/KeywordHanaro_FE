'use client';

import SettlementRequest from '@/components/templates/settlement/SettlementRequest';
import { useSettlementContext } from '@/contexts/SettlementContext';

export default function SettlementUsageStep1() {
  const { formData, updateFormData } = useSettlementContext();

  return <SettlementRequest formData={formData} onUpdate={updateFormData} />;
}
