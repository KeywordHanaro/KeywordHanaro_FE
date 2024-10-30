'use client';

import SetActionCategory from '@/components/templates/createKeyword/settlement/SetActionCategory';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementStep3() {
  const { formData, updateFormData } = useSettlementContext();
  const router = useRouter();

  const nextStep = () => {
    router.push('/keyword/edit/settlement/step4');
  };
  return (
    <SetActionCategory
      formData={formData}
      onUpdate={updateFormData}
      onNext={nextStep}
    />
  );
}
