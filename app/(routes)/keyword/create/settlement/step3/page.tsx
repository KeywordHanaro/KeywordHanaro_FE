'use client';

import SpeechToText from '@/components/SpeechToText';
import SetActionCategory from '@/components/templates/createKeyword/settlement/SetActionCategory';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementStep3() {
  const { formData, updateFormData } = useSettlementContext();
  const router = useRouter();

  const nextStep = () => {
    router.push('/keyword/create/settlement/step4');
  };
  return (
    <>
      <SetActionCategory
        formData={formData}
        onUpdate={updateFormData}
        onNext={nextStep}
      />
      <SpeechToText autoStart placeholder='얼마를 요청할까요?' />
    </>
  );
}
