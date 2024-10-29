'use client';

import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useTransferForm } from '@/contexts/TransferContext';
import { useRouter } from 'next/navigation';

export default function Step5() {
  const { updateFormData } = useTransferForm();
  const router = useRouter();

  const handleNext = () => {
    router.push('/keyword/create/transfer/step6');
  };

  return (
    <KeywordInputButton
      title='키워드의 이름을 설정해주세요'
      placeHolder='키워드 이름을 작성해주세요'
      onUpdate={(keyword: string) => updateFormData({ keyword })}
      onNext={handleNext}
    />
  );
}
