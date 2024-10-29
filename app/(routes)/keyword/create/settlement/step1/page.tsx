'use client';

import SelectAccount from '@/components/templates/SelectAccount';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementStep1() {
  const { updateFormData } = useSettlementContext();
  const router = useRouter();

  const nextStep = () => {
    router.push('/keyword/create/settlement/step2');
  };

  return (
    <>
      <SelectAccount
        onUpdate={(account) => updateFormData({ account })}
        onNext={nextStep}
      />
    </>
  );
}
