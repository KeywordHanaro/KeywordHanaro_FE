'use client';

import SelectAccount from '@/components/templates/SelectAccount';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementStep1() {
  const { formData, updateFormData } = useSettlementContext();
  const router = useRouter();
  // console.log(formData.fromAccount);

  const nextStep = () => {
    router.push('/keyword/edit/settlement/step2');
  };

  return (
    <>
      <SelectAccount
        onUpdate={(account) => updateFormData({ fromAccount: account })}
        onNext={nextStep}
        selectedAccount={formData.fromAccount}
      />
    </>
  );
}
