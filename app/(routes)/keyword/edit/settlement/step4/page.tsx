'use client';

import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementStep4() {
  const { formData, updateFormData } = useSettlementContext();
  const router = useRouter();

  const nextStep = () => router.push('/keyword/edit/settlement/step5');
  return (
    <KeywordInputButton
      placeHolder={'키워드 이름을 작성해주세요'}
      title={'키워드 이름을 설정해주세요'}
      onUpdate={(keywordName) => updateFormData({ keywordName })}
      onNext={nextStep}
      initialValue={formData.keywordName}
    />
  );
}
