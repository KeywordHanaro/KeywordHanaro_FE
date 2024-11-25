'use client';

import Header from '@/components/atoms/Header';
import ConfirmOrder from '@/components/templates/createKeyword/multiKeyword/ConfirmOrder';
import { useMultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { useRouter } from 'next/navigation';

export default function Step2() {
  // TODO: 키워드 순서 변경
  const { formData, updateFormData } = useMultiKeywordForm();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/keyword/create/multiKeyword/step3');
  };

  return (
    <div className='flex flex-col h-full'>
      {/* 헤더 */}
      <Header
        text='멀티 키워드 생성하기'
        onBack={handleBack}
        actionLabel='다음'
        onAction={handleNext}
      />
      <ConfirmOrder
        formData={formData}
        onUpdate={() => {
          // updateFormData({ keywordIdArr });
        }}
      />
    </div>
  );
}
