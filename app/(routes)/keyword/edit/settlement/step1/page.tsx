'use client';

import SelectAccount from '@/components/templates/SelectAccount';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementStep1() {
  const { formData, updateFormData } = useSettlementContext();
  const router = useRouter();
  console.log(formData.account);

  const nextStep = () => {
    router.push('/keyword/edit/settlement/step2');
  };

  return (
    <>
      <SelectAccount
        onUpdate={(account) => updateFormData({ account })}
        onNext={nextStep}
        selectedAccount={formData.account}
      />
    </>
  );
}
