'use client';

import SettlementMemberSetting from '@/components/templates/createKeyword/settlement/SettlementMemberSetting';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SettlementStep2() {
  const { formData, updateFormData } = useSettlementContext();
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>();
  return (
    <>
      <SettlementMemberSetting
        formData={formData}
        onUpdate={(members) => updateFormData({ members })}
      />
    </>
  );
}
