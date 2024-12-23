'use client';

import SpeechToText from '@/components/SpeechToText';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useInquiry } from '@/contexts/InquiryContext';
import { useRouter } from 'next/navigation';

export default function Step2() {
  const router = useRouter();
  const { formData, updateFormData } = useInquiry();

  const nextStep = () => {
    router.push('/keyword/create/inquiry/step4');
  };

  return (
    <>
      <KeywordInputButton
        title='키워드 이름을 설정해주세요'
        placeHolder='키워드 이름을 작성해주세요'
        initialValue={formData.keywordName}
        onUpdate={(keywordName) => updateFormData({ keywordName })}
        onNext={nextStep}
      />
      <SpeechToText autoStart placeholder='키워드 이름을 설정해주세요' />
    </>
  );
}
