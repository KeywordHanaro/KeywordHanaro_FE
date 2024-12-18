'use client';

import SpeechToText from '@/components/SpeechToText';
import Header from '@/components/atoms/Header';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useMultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { useRouter } from 'next/navigation';

export default function Step3() {
  const { formData, updateFormData } = useMultiKeywordForm();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleNext = () => {
    router.push('/keyword/create/multiKeyword/step4');
  };

  return (
    <div className='flex flex-col h-full'>
      <Header
        text='멀티 키워드 생성하기'
        onBack={handleBack}
        actionLabel='다음'
        showActionButton={false}
      />
      <div className='h-full flex flex-col flex-grow overflow-hidden mt-[24px] px-[20px] pb-[34px]'>
        <KeywordInputButton
          title='키워드의 이름을 설정해주세요'
          placeHolder='키워드 이름을 작성해주세요'
          initialValue={formData.keywordName}
          onUpdate={(keywordName: string) => updateFormData({ keywordName })}
          onNext={handleNext}
        />
      </div>
      <SpeechToText />
    </div>
  );
}
