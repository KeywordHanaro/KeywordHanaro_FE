'use client';

import SettlementMemberSetting from '@/components/templates/createKeyword/settlement/SettlementMemberSetting';
import { useSettlementContext } from '@/contexts/SettlementContext';

export default function SettlementStep2() {
  const { formData, updateFormData } = useSettlementContext();

  return (
    <>
      <SettlementMemberSetting
        formData={formData}
        onUpdate={(members) => updateFormData({ members })}
      />
    </>
  );
}
